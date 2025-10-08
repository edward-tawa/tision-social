from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from user_profile.models.interest.interest_model import Interest
from user_profile.serializers.interest.interest_serializer import InterestSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Interests"],
    summary="Manage User Interests",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on user interests. "
        "Users can list all interests, retrieve a specific interest, create new interests, update existing ones, and delete interests. "
        "Each field is documented with descriptions and example payloads are provided via the InterestSerializer."
    ),
    request=InterestSerializer,
    responses={200: InterestSerializer},
)
class InterestViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting user interests.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
