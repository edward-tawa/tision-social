from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            await self.accept()
            await self.send(text_data = json.dumps({
                'error': 'You must be logged in to chat.'
            }))
            await self.close()
            return
        self.user2_id = self.scope['url_route']['kwargs']['user2_id']
        self.chat_key = sorted([str(self.user.id), str(self.user2_id)])
        self.room_group_name = f'chat_{self.chat_key[0]}_{self.chat_key[1]}'

        #join group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        # Notify the group that a new user has joined
        print(f'User joined room: {self.room_group_name}')

    #receive message from websocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Broadcast message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': self.user.username
            }
        )

    #receive message from room group
    async def chat_message(self, data):
        message = data['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': data['sender']
        }))

    # disconnect from the group
    async def disconnect(self, close_code):
        # leave group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
