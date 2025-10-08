from rest_framework import serializers
from scholarships.models.scholarship_model import Scholarship
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Scholarship Example",
            value={
                "id": 1,
                "poster": 5,
                "name": "Tech Excellence Scholarship",
                "description": "A scholarship for outstanding students in technology fields.",
                "requirements": "GPA >= 3.5, Recommendation letters, Essay submission",
                "deadline": "30/09/2025",
                "amount": 1000.00,
                "is_active": True,
                "created_at": "28/08/2025 14:30",
                "updated_at": "28/08/2025 14:30"
            },
        )
    ]
)
class ScholarshipSerializer(serializers.ModelSerializer):
    id = serializers.AutoField(read_only=True, help_text="Unique identifier of the scholarship.")
    poster = serializers.PrimaryKeyRelatedField(
        queryset=None,  # Adjust queryset depending on your user model
        help_text="ID of the user who posted the scholarship."
    )
    name = serializers.CharField(help_text="The name/title of the scholarship.")
    description = serializers.CharField(help_text="Detailed description of the scholarship.")
    requirements = serializers.CharField(help_text="Requirements needed to apply for the scholarship.")
    deadline = serializers.DateField(help_text="Application deadline for the scholarship (DD/MM/YYYY).")
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, help_text="Amount awarded for the scholarship.")
    is_active = serializers.BooleanField(help_text="Indicates if the scholarship is currently active.")
    created_at = serializers.DateTimeField(read_only=True, format='%d/%m/%Y %H:%M', help_text="Timestamp when the scholarship was created.")
    updated_at = serializers.DateTimeField(read_only=True, format='%d/%m/%Y %H:%M', help_text="Timestamp when the scholarship was last updated.")

    class Meta:
        model = Scholarship
        fields = [
            'id',
            'poster',
            'name',
            'description',
            'requirements',
            'deadline',
            'amount',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
