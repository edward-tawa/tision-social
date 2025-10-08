from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from gigs.models.gig_model import Gig
from gigs.serializers.gig_serializer import GigSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Gigs"],
    summary="Manage Gigs",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on gigs. "
        "Users can list available gigs, retrieve details of a specific gig, create new gigs, "
        "update existing gigs, and delete gigs."
    ),
    request=GigSerializer,
    responses={200: GigSerializer},
)
class GigViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting gigs.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = GigSerializer
    queryset = Gig.objects.all()
