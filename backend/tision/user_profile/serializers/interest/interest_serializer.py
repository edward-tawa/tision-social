from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from user_profile.models.interest.interest_model import Interest
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Interest Example",
            value={
                "id": 1,
                "user": 5,
                "name": "Software Development",
                "created_at": "28/08/2025 14:30",
                "updated_at": "28/08/2025 14:30"
            },
        )
    ]
)
class InterestSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier of the interest.")
    user = serializers.PrimaryKeyRelatedField(read_only=True, help_text="ID of the user who owns this interest.")
    name = serializers.CharField(help_text="Name of the interest or hobby.")
    created_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the interest was created.")
    updated_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the interest was last updated.")

    class Meta:
        model = Interest
        fields = ['id', 'user', 'name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        try:
            user = self.context['request'].user
            return Interest.objects.create(user=user, **validated_data)
        except Exception as e:
            raise serializers.ValidationError({'error': _(f'Error creating interest: {str(e)}')})

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
