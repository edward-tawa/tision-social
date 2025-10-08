from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from user_profile.models.experience.experience_model import Experience
from user_profile.serializers.experience.experience_serializer import ExperienceSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Experience"],
    summary="Manage User Work Experience",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on user work experience records. "
        "Users can list all experience entries, retrieve a specific entry, create new records, update existing records, and delete records. "
        "Each field is documented with descriptions and example payloads are provided via the ExperienceSerializer."
    ),
    request=ExperienceSerializer,
    responses={200: ExperienceSerializer},
)
class ExperienceViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting user work experience records.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
