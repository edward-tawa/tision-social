from rest_framework import serializers
from gigs.models.gig_model import Gig


class GigSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True, help_text="Unique identifier of the gig.")
    title = serializers.CharField(help_text="The title of the gig, e.g., 'Frontend Developer'.")
    location = serializers.CharField(help_text="The location where the gig is offered.")
    category = serializers.CharField(help_text="The category or industry of the gig, e.g., 'Software Development'.")
    datePosted = serializers.DateField(
        source='date_posted',
        help_text="The date when the gig was posted (format: YYYY-MM-DD)."
    )
    expiryDate = serializers.DateField(
        source='expiry_date',
        help_text="The date when the gig expires (format: YYYY-MM-DD)."
    )
    created_at = serializers.DateTimeField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The date the gig entry was created in the system (DD/MM/YYYY)."
    )
    updated_at = serializers.DateTimeField(
        read_only=True,
        format='%d/%m/%Y',
        help_text="The last date the gig entry was updated in the system (DD/MM/YYYY)."
    )
    duration = serializers.CharField(help_text="The duration of the gig, e.g., '3 months'.")

    class Meta:
        model = Gig
        fields = [
            'id',
            'title',
            'location',
            'category',
            'datePosted',
            'expiryDate',
            'created_at',
            'updated_at',
            'duration',
        ]
        read_only_fields = ['id']
