from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from tision.users.models.user_model import User
from tision.users.serializers.user_serializer import UserSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse
from django.utils.translation import gettext_lazy as _


@extend_schema(
    tags=["Users"],
    summary="Manage Users (No Creation)",
    description=(
        "This endpoint allows authenticated users to view and update profiles, including changing passwords. "
        "User creation is handled separately via the SigninView. "
        "The UserSerializer provides field descriptions and example payloads."
    ),
    request=UserSerializer,
    responses={200: UserSerializer},
)
class UserViewSet(ModelViewSet):
    """
    ViewSet for listing, retrieving, updating, and deleting users.
    - Creation is disabled (handled via SigninView).
    - Authenticated users can access `me` and `change_password`.
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Disable create
    def create(self, request, *args, **kwargs):
        from rest_framework.exceptions import MethodNotAllowed
        raise MethodNotAllowed("POST", detail="Use SigninView to create users.")

    @extend_schema(
        summary="Get or update current user",
        description="Retrieve or update the authenticated user's profile.",
        request=UserSerializer,
        responses={
            200: OpenApiResponse(description="Successfully retrieved or updated user profile."),
            400: OpenApiResponse(description="Invalid data."),
        },
    )
    @action(detail=False, methods=["get", "put", "patch"], permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user
        if request.method in ["PUT", "PATCH"]:
            serializer = self.get_serializer(user, data=request.data, partial=(request.method == "PATCH"))
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Change user password",
        description="Allows the authenticated user to change their password by providing the current and new passwords.",
        request={
            "type": "object",
            "properties": {
                "current_password": {"type": "string", "description": "Current password of the user"},
                "new_password": {"type": "string", "description": "New password to set"},
            },
            "required": ["current_password", "new_password"],
        },
        responses={
            200: OpenApiResponse(description="Password changed successfully."),
            400: OpenApiResponse(description="Invalid data or incorrect current password."),
        },
    )
    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not current_password or not new_password:
            return Response(
                {"error": _("Both current_password and new_password are required.")},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(current_password):
            return Response({"error": _("Current password is incorrect.")}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"message": _("Password changed successfully.")}, status=status.HTTP_200_OK)
