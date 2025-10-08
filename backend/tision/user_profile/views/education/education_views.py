from user_profile.serializers.education.education_serializer import EducationSerializer
from user_profile.models.education.education_model import Education
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Education"],
    summary="Manage User Education Records",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on user education records. "
        "Users can list all education entries, retrieve a specific entry, create new records, update existing records, and delete records. "
        "Each field is documented with descriptions and example payloads are provided via the EducationSerializer."
    ),
    request=EducationSerializer,
    responses={200: EducationSerializer},
)
class EducationViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting user education records.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
