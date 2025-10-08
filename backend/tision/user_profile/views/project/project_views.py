from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from user_profile.models.project.project_model import Project
from user_profile.serializers.project.project_serializer import ProjectSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Projects"],
    summary="Manage User Projects",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on user projects. "
        "Users can list all projects, retrieve a specific project, create new projects, update existing projects, and delete projects. "
        "Each field is documented with descriptions and example payloads are provided via the ProjectSerializer."
    ),
    request=ProjectSerializer,
    responses={200: ProjectSerializer},
)
class ProjectViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting user projects.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
