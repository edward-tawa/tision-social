from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from jobs.models.job_model import Job
from jobs.serializers.job_serializer import JobSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Jobs"],
    summary="Manage Jobs",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on jobs. "
        "Users can list available jobs, retrieve details of a specific job, create new jobs, "
        "update existing jobs, and delete jobs. "
        "Each field is documented with descriptions, and an example payload is provided via the serializer."
    ),
    request=JobSerializer,
    responses={200: JobSerializer},
)
class JobViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting jobs.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = JobSerializer
    queryset = Job.objects.all()
