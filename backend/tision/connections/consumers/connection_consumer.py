from channels.generic.websocket import AsyncWebsocketConsumer
from users.models.user_model import User
from connections.models.connection_model import Connection
from channels.db import database_sync_to_async
import json
import logging

logger = logging.getLogger(__name__)

class ConnectionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            await self.close()
            return

        # Personal notification group for this user
        self.notification_group = f'connection_notification_{self.user.id}'
        await self.channel_layer.group_add(
            self.notification_group,
            self.channel_name
        )
        await self.accept()
        logger.info(f'User {self.user.id} has joined room: {self.notification_group}')

        # Send all pending connection requests to the user
        pending_connections = await self.get_pending_connections()
        for connection in pending_connections:
            await self.send(json.dumps({
                'status': connection.status,
                'sender': connection.sender.id,
                'sender_name': connection.sender.username,
                'receiver': connection.receiver.id,
                'receiver_name': connection.receiver.username,
                'timestamp': str(connection.timestamp)
            }))

    async def receive(self, text_data):
        data = json.loads(text_data)
        status = data.get('status')
        receiver_id = data.get('receiver')

        if not status or not receiver_id:
            await self.send(json.dumps({'error': 'Missing status or receiver.'}))
            return

        # Prevent sending a connection request to self
        if receiver_id == self.user.id:
            await self.send(json.dumps({'error': 'Cannot send connection request to yourself.'}))
            return

        connection = await self.connection_save({'status': status, 'receiver': receiver_id})
        if not connection:
            await self.send(json.dumps({'error': 'Receiver not found.'}))
            return

        # Notify the receiver in real-time
        await self.channel_layer.group_send(
            f'connection_notification_{receiver_id}',
            {
                'type': 'connection_request',
                'status': connection.status,
                'sender': connection.sender.id,
                'sender_name': connection.sender.username,
                'receiver': connection.receiver.id,
                'receiver_name': connection.receiver.username,
                'timestamp': str(connection.timestamp)
            }
        )

    async def connection_request(self, event):
        # Handler for group_send messages
        await self.send(json.dumps({
            'status': event['status'],
            'sender': event['sender'],
            'sender_name': event['sender_name'],
            'receiver': event['receiver'],
            'receiver_name': event['receiver_name'],
            'timestamp': event['timestamp']
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.notification_group,
            self.channel_name
        )
        logger.info(f'User {self.user.id} disconnected from room: {self.notification_group}')

    @database_sync_to_async
    def connection_save(self, connection_data):
        try:
            receiver = User.objects.get(id=connection_data['receiver'])
        except User.DoesNotExist:
            return None

        # Prevent duplicate requests and update status if exists
        obj, created = Connection.objects.update_or_create(
            sender=self.user,
            receiver=receiver,
            defaults={'status': connection_data['status']}
        )
        return obj

    @database_sync_to_async
    def get_pending_connections(self):
        return Connection.objects.filter(
            receiver=self.user,
            status=Connection.PENDING
        ).select_related('sender', 'receiver').order_by('-timestamp')