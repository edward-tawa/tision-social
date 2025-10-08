from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from tision.institutions.models.institution_model import Institution
from tision.institutions.serializers.institution_serializer import InstitutionSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Institutions"],
    summary="Manage Institutions",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on institutions. "
        "Users can list all registered institutions, retrieve details of a specific institution, "
        "create new institutions, update existing ones, and delete institutions. "
        "All fields are documented with descriptions and an example payload is available."
    ),
    request=InstitutionSerializer,
    responses={200: InstitutionSerializer},
)
class InstitutionViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting institutions.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
