from rest_framework import serializers
from tision.users.models.user_model import User
from django.db.models import Q
from tision.connections.models.connection_model import Connection
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            name="Pending Connection Example",
            description="A sample pending connection between two users.",
            value={
                "id": 1,
                "senderId": 10,
                "receiverId": 20,
                "senderName": "Alice Johnson",
                "receiverName": "Bob Smith",
                "status": "pending",
                "timestamp": "2025-08-27T07:15:00Z"
            }
        ),
        OpenApiExample(
            name="Accepted Connection Example",
            description="A sample accepted connection between two users.",
            value={
                "id": 2,
                "senderId": 30,
                "receiverId": 40,
                "senderName": "Charlie Brown",
                "receiverName": "Dana White",
                "status": "accepted",
                "timestamp": "2025-08-27T08:45:00Z"
            }
        ),
    ]
)
class ConnectionSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(
        read_only=True,
        help_text="Unique identifier for the connection."
    )
    sender = serializers.PrimaryKeyRelatedField(
        source='sender',
        queryset=User.objects.all(),
        help_text="The ID of the user sending the connection request."
    )
    receiver = serializers.PrimaryKeyRelatedField(
        source='receiver',
        queryset=User.objects.all(),
        help_text="The ID of the user receiving the connection request."
    )
    senderName = serializers.CharField(
        source='sender_name',
        read_only=True,
        help_text="Full name of the user who sent the request."
    )
    receiverName = serializers.CharField(
        source='receiver_name',
        read_only=True,
        help_text="Full name of the user who received the request."
    )
    status = serializers.CharField(
        read_only=True,
        help_text="Current status of the connection (pending, accepted, rejected)."
    )
    timestamp = serializers.DateTimeField(
        source='timestamp',
        read_only=True,
        help_text="Date and time when the connection request was created."
    )

    class Meta:
        model = Connection
        fields = [
            'id',
            'sender',
            'receiver',
            'senderName',
            'receiverName',
            'status',
            'timestamp',
        ]


