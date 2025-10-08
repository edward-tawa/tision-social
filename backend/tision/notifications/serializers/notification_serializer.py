from rest_framework import serializers
from notifications.models.notification_model import Notification
from notifications.utils.model_serializer_mapping import MODEL_SERIALIZER_MAPPING




class NotificationSerializer(serializers.ModelSerializer):
    actor_content_type = serializers.PrimaryKeyRelatedField(read_only=True)
    actor_id = serializers.IntegerField(read_only=True)
    actor = serializers.SerializerMethodField()
    verb = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True, format='%d/%m/%Y')
    updated_at = serializers.DateTimeField(read_only=True, format='%d/%m/%Y')


    class Meta:
        model = Notification
        fields = [
            'id',
            'actor_content_type',
            'actor_id',
            'actor',
            'verb',
            'created_at',
            'updated_at',
        ]

    
    def get_actor(self, obj):
        if not obj.actor:
            return None
        actor_model_class = obj.actor.__class__

        actor_serializer_class = MODEL_SERIALIZER_MAPPING.get(actor_model_class)

        if actor_serializer_class:
            return actor_serializer_class(obj.actor).data
        return str(obj.actor)
