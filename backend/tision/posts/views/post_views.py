from posts.models.post_model import Post
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from posts.serializers.post_serializer import PostSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Posts"],
    summary="Manage Posts",
    description=(
        "This endpoint allows authenticated users to perform CRUD operations on posts. "
        "Users can list all posts, retrieve a specific post, create new posts, update existing posts, and delete posts. "
        "Each field is documented with descriptions, and example payloads are provided via the PostSerializer."
    ),
    request=PostSerializer,
    responses={200: PostSerializer},
)
class PostViewSet(ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting posts.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
