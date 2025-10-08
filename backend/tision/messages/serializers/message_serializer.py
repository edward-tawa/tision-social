from rest_framework import serializers
from tision.messages.models import Message
from tision.users.models.user_model import User
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Text Message Example",
            value={
                "id": 1,
                "sender": 10,
                "receiver": 15,
                "timestamp": "2025-08-28T14:30:00Z",
                "type": "TEXT",
                "content": {"content": "Hello! How are you?"}
            },
        ),
        OpenApiExample(
            "Image Message Example",
            value={
                "id": 2,
                "sender": 10,
                "receiver": 15,
                "timestamp": "2025-08-28T14:32:00Z",
                "type": "IMAGE",
                "content": {"image": "https://example.com/image.png", "text": "Check this out!"}
            },
        ),
    ]
)
class MessageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, help_text="Unique identifier of the message.")
    sender = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        help_text="The ID of the user sending the message."
    )
    receiver = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        help_text="The ID of the user receiving the message."
    )
    timestamp = serializers.DateTimeField(
        read_only=True,
        help_text="The date and time when the message was created (read-only)."
    )
    type = serializers.CharField(
        source='message_type',
        help_text="The type of the message: TEXT, IMAGE, VIDEO, AUDIO."
    )
    content = serializers.JSONField(
        help_text=(
            "The content of the message. "
            "For TEXT: {'content': 'message text'}, "
            "For IMAGE: {'image': 'url', 'text': 'optional caption'}, "
            "For VIDEO: {'video': 'url', 'text': 'optional caption'}, "
            "For AUDIO: {'audio': 'url', 'text': 'optional caption'}"
        )
    )

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'timestamp', 'type', 'content']
        read_only_fields = ['id', 'timestamp']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['content'] = instance.content
        return data

    def create(self, validated_data):
        content = validated_data.pop('content')
        message_type = validated_data.get('message_type', Message.TEXT)

        if message_type == Message.TEXT:
            text = content.get('content')
            if not text:
                raise serializers.ValidationError("Text content is required for text messages.")
            validated_data['text'] = text

        elif message_type == Message.IMAGE:
            validated_data['image'] = content.get('image')
            validated_data['text'] = content.get('text')

        elif message_type == Message.VIDEO:
            validated_data['video'] = content.get('video')
            validated_data['text'] = content.get('text')

        elif message_type == Message.AUDIO:
            validated_data['audio'] = content.get('audio')
            validated_data['text'] = content.get('text')

        else:
            raise serializers.ValidationError(f"Unsupported message type: {message_type}")

        return Message.objects.create(**validated_data)
