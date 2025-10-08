from jobs.models.job_model import Job
from rest_framework import serializers
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Job Example",
            value={
                "id": 1,
                "title": "Backend Developer",
                "location": "Bulawayo, Zimbabwe",
                "category": "Software Engineering",
                "date_posted": "28/08/2025",
                "expiry_date": "15/09/2025",
                "duration": "6 months",
                "created_at": "28/08/2025",
                "updated_at": "28/08/2025"
            },
        )
    ]
)
class JobSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, help_text="Unique identifier of the job.")
    title = serializers.CharField(help_text="The job title, e.g., 'Backend Developer'.")
    location = serializers.CharField(help_text="The location where the job is based.")
    category = serializers.CharField(help_text="The category or department of the job, e.g., 'Software Engineering'.")
    date_posted = serializers.DateField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The date when the job was posted (DD/MM/YYYY)."
    )
    expiry_date = serializers.DateField(
        required=False,
        format='%d/%m/%Y',
        help_text="The date when the job listing expires (DD/MM/YYYY)."
    )
    duration = serializers.CharField(help_text="The duration of the job contract, e.g., '6 months'.")
    created_at = serializers.DateTimeField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The date when the job entry was created (DD/MM/YYYY)."
    )
    updated_at = serializers.DateTimeField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The last date when the job entry was updated (DD/MM/YYYY)."
    )

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'location',
            'category',
            'date_posted',
            'expiry_date',
            'duration',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id']
        extra_kwargs = {
            'expiry_date': {'required': False, 'allow_null': True},
        }