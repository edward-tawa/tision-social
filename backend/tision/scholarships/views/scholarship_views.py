from rest_framework.viewsets import ModelViewSet
from scholarships.models.scholarship_model import Scholarship
from scholarships.serializers.scholarship_serializer import ScholarshipSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Scholarships"],
    summary="Manage Scholarships",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on scholarships. "
        "Users can list all scholarships, retrieve details of a specific scholarship, "
        "create new scholarships, update existing ones, and delete scholarships. "
        "Each field is documented with descriptions and example payloads are provided via the ScholarshipSerializer."
    ),
    request=ScholarshipSerializer,
    responses={200: ScholarshipSerializer},
)
class ScholarshipViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting scholarships.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ScholarshipSerializer
    queryset = Scholarship.objects.all()
