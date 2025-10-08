from rest_framework import serializers
from tision.institutions.models.institution_model import Institution
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Institution Example",
            value={
                "id": 1,
                "name": "Tech University",
                "location": "Harare, Zimbabwe",
                "description": "A leading institution offering computer science and engineering programs.",
                "offers": {
                    "programs": ["BSc Computer Science", "BEng Software Engineering"],
                    "services": ["Online Learning", "Career Support"]
                },
                "logo_url": "https://example.com/logos/techuni.png",
                "website_url": "https://techuni.ac.zw",
                "address": "123 Innovation Drive, Harare",
                "phone": "+263 777 123 456",
                "email": "info@techuni.ac.zw",
                "created_at": "28/08/2025",
                "updated_at": "28/08/2025",
                "is_active": True,
                "verified": True
            },
        )
    ]
)
class InstitutionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, help_text="Unique identifier of the institution.")
    name = serializers.CharField(help_text="The official name of the institution.")
    location = serializers.CharField(help_text="The general location or city where the institution is based.")
    description = serializers.CharField(help_text="A brief description or overview of the institution.")
    offers = serializers.JSONField(help_text="A JSON object describing the services, programs, or offers provided by the institution.")
    logo_url = serializers.URLField(
        required=False,
        allow_null=True,
        allow_blank=True,
        help_text="Optional URL to the institution's logo."
    )
    website_url = serializers.URLField(
        required=False,
        allow_blank=True,
        allow_null=True,
        help_text="Optional URL to the institution's website."
    )
    address = serializers.CharField(help_text="The physical address of the institution.")
    phone = serializers.CharField(help_text="The institution's contact phone number.")
    email = serializers.EmailField(help_text="The institution's contact email address.")
    created_at = serializers.DateField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The date when the institution entry was created (DD/MM/YYYY)."
    )
    updated_at = serializers.DateField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The last date when the institution entry was updated (DD/MM/YYYY)."
    )
    is_active = serializers.BooleanField(help_text="Indicates whether the institution is active in the system.")
    verified = serializers.BooleanField(help_text="Indicates whether the institution has been verified.")

    class Meta:
        model = Institution
        fields = [
            'id',
            'name',
            'location',
            'description',
            'offers',
            'logo_url',
            'website_url',
            'address',
            'phone',
            'email',
            'created_at',
            'updated_at',
            'is_active',
            'verified',
        ]
        read_only_fields = ['id']
