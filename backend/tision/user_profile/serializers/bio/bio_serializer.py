from rest_framework import serializers
from user_profile.models.bio.bio_model import Bio
from users.models.user_model import User
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Bio Example",
            value={
                "id": 1,
                "user": 5,
                "name": "Edward Taguma Tawa",
                "location": "Harare, Zimbabwe",
                "email": "edward@example.com",
                "description": "Software engineer with 5 years experience in full-stack development.",
                "website": "https://edward.dev",
                "employment_status": "Employed"
            },
        )
    ]
)
class BioSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier for the bio entry.")
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        help_text="The ID of the user this bio belongs to."
    )
    name = serializers.CharField(help_text="Full name of the user.")
    location = serializers.CharField(help_text="The city or location of the user.")
    email = serializers.EmailField(help_text="User's email address.")
    description = serializers.CharField(help_text="A brief description or biography of the user.")
    website = serializers.URLField(required=False, allow_blank=True, help_text="Optional personal or professional website URL.")
    employment_status = serializers.CharField(help_text="Current employment status of the user (e.g., Employed, Unemployed, Student).")

    class Meta:
        model = Bio
        fields = [
            'id',
            'user',
            'name',
            'location',
            'email',
            'description',
            'website',
            'employment_status',
        ]
        read_only_fields = ['id']
