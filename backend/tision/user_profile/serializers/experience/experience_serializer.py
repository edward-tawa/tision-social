from rest_framework import serializers
from user_profile.models.experience.experience_model import Experience
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Experience Example",
            value={
                "id": 1,
                "user": 5,
                "company": "Tech Solutions Ltd",
                "role": "Software Engineer",
                "location": "Harare, Zimbabwe",
                "technologies": "Python, Django, React",
                "description": "Developed and maintained web applications.",
                "start_date": "01/03/2020",
                "end_date": "31/12/2023",
                "created_at": "28/08/2025 14:30",
                "updated_at": "28/08/2025 14:30"
            },
        )
    ]
)
class ExperienceSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier of the experience record.")
    user = serializers.PrimaryKeyRelatedField(read_only=True, help_text="ID of the user this experience belongs to.")
    company = serializers.CharField(help_text="Name of the company where the experience took place.")
    role = serializers.CharField(help_text="Role or position held at the company.")
    location = serializers.CharField(help_text="Location of the company.")
    technologies = serializers.CharField(required=False, help_text="Technologies used or learned during this experience.")
    description = serializers.CharField(help_text="Description of the work performed or responsibilities.")
    start_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="Start date of the experience (DD/MM/YYYY). Optional."
    )
    end_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="End date of the experience (DD/MM/YYYY). Optional."
    )
    created_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the experience record was created.")
    updated_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the experience record was last updated.")

    class Meta:
        model = Experience
        fields = [
            'id',
            'user',
            'company',
            'role',
            'location',
            'technologies',
            'description',
            'start_date',
            'end_date',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            return Experience.objects.create(user=user, **validated_data)
        except Exception as e:
            raise serializers.ValidationError({'error': _(f'Error creating Experience: {str(e)}')})
