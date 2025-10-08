from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from user_profile.models.project.project_model import Project
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Project Example",
            value={
                "id": 1,
                "user": 5,
                "title": "Portfolio Website",
                "description": "A personal portfolio website to showcase projects.",
                "role": "Full-Stack Developer",
                "repo_link": "https://github.com/username/portfolio",
                "start_date": "01/06/2024",
                "end_date": "30/08/2024",
                "is_ongoing": False,
                "created_at": "28/08/2025 14:30",
                "updated_at": "28/08/2025 14:30"
            },
        )
    ]
)
class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier of the project.")
    user = serializers.PrimaryKeyRelatedField(read_only=True, help_text="ID of the user who owns this project.")
    title = serializers.CharField(help_text="Title of the project.")
    description = serializers.CharField(help_text="Brief description of the project.")
    role = serializers.CharField(help_text="Role of the user in the project.")
    repo_link = serializers.URLField(required=False, allow_blank=True, help_text="URL to the project's repository (optional).")
    start_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="Start date of the project (DD/MM/YYYY). Optional."
    )
    end_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="End date of the project (DD/MM/YYYY). Optional."
    )
    is_ongoing = serializers.BooleanField(help_text="Indicates if the project is still ongoing.")
    created_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the project was created.")
    updated_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the project was last updated.")

    class Meta:
        model = Project
        fields = [
            'id',
            'user',
            'title',
            'description',
            'role',
            'repo_link',
            'start_date',
            'end_date',
            'is_ongoing',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        try:
            user = self.context['request'].user
            return Project.objects.create(user=user, **validated_data)
        except Exception as e:
            raise serializers.ValidationError({'error': _(f'Error creating project: {str(e)}')})