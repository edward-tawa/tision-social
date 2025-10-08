from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from user_profile.models.education.education_model import Education
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Education Example",
            value={
                "id": 1,
                "user": 5,
                "institution": "Harare Institute of Technology",
                "role": "Student",
                "location": "Harare, Zimbabwe",
                "start_date": "01/02/2020",
                "end_date": "30/11/2023",
                "qualifications": "BSc Computer Science",
                "created_at": "28/08/2025 14:30"
            },
        )
    ]
)
class EducationSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier of the education record.")
    user = serializers.PrimaryKeyRelatedField(read_only=True, help_text="ID of the user this education belongs to.")
    institution = serializers.CharField(help_text="Name of the educational institution.")
    role = serializers.CharField(help_text="Role at the institution (e.g., Student, Researcher).")
    location = serializers.CharField(help_text="Location of the institution.")
    start_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="Start date of education (DD/MM/YYYY). Optional."
    )
    end_date = serializers.DateField(
        required=False,
        allow_null=True,
        format='%d/%m/%Y',
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="End date of education (DD/MM/YYYY). Optional."
    )
    qualifications = serializers.CharField(help_text="Qualifications obtained or expected.")
    created_at = serializers.DateTimeField(read_only=True, help_text="Timestamp when the education record was created.")

    class Meta:
        model = Education
        fields = (
            'id',
            'user',
            'institution',
            'role',
            'location',
            'start_date',
            'end_date',
            'qualifications',
            'created_at',
        )
        read_only_fields = ['id', 'user', 'created_at']

    def create(self, validated_data):
        try:
            user = self.context['request'].user
            return Education.objects.create(user=user, **validated_data)
        except Exception:
            raise serializers.ValidationError({'error': _(f'Error creating Education record.')})
