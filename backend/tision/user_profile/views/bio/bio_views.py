from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from user_profile.serializers.bio.bio_serializer import BioSerializer
from user_profile.models.bio.bio_model import Bio
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Bios"],
    summary="Manage User Bios",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on user bios. "
        "Users can list all bios, retrieve a specific bio, create new bios, update existing bios, and delete bios. "
        "Each field is documented with descriptions and example payloads are provided via the BioSerializer."
    ),
    request=BioSerializer,
    responses={200: BioSerializer},
)
class BioViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting user bios.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Bio.objects.all()
    serializer_class = BioSerializer
