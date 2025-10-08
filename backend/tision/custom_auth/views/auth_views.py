from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers.user_serializer import UserSerializer
from users.models.user_model import User
from django.utils.translation import gettext_lazy as _
from custom_auth.auth.token_generation import CustomTokenObtainPairSerializer
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from custom_auth.utils.email_util import Util
import jwt
from datetime import date
from drf_spectacular.utils import extend_schema, OpenApiResponse


class SigninView(APIView):
    """
    User registration view.
    Creates a new user, sends an email with a verification link.
    """
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Register a new user",
        description=(
            "Creates a new user account. "
            "A verification email will be sent with a link to activate the account."
        ),
        request=UserSerializer,
        responses={
            201: OpenApiResponse(description="User created successfully. Verification email sent."),
            400: OpenApiResponse(description="Invalid input data."),
        },
        tags=["Authentication"],
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.date_joined = date.today().strftime("%d/%m/%Y")
            email = serializer.validated_data.get('email')
            username = serializer.validated_data.get('username')
            token = RefreshToken.for_user(user)
            current_site = get_current_site(request).domain
            absolute_url = 'http://' + current_site + reverse('email-verify') + '?token=' + str(token)
            email_body = f'Dear {username}, please verify your account by clicking the following link:\n {absolute_url}'
            email_data = {
                'email_body': email_body,
                'to': email,
                'email_subject': 'Email Verification'
            }
            Util.send_email(email_data)
            return Response({"message": _("User created. Verification email sent.")}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerificationView(APIView):
    """
    Email verification view.
    Verifies a user account by setting `is_active=True`.
    """

    @extend_schema(
        summary="Verify user email",
        description="Activate a user account by validating the verification token sent via email.",
        parameters=[],
        responses={
            200: OpenApiResponse(description="User account verified successfully."),
            400: OpenApiResponse(description="Invalid or expired token."),
            404: OpenApiResponse(description="User not found."),
        },
        tags=["Authentication"],
    )
    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({'message': _('Token is required for verification')}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payload = jwt.decode(token, options={'verify_signature': False})
            user_id = payload.get('user_id')
            if not user_id:
                return Response({'error': _('Invalid token payload')}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get(id=user_id)
            user.is_active = True
            user.save()
            return Response({'message': _('User account verified successfully')}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': _('User not found')}, status=status.HTTP_404_NOT_FOUND)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Activation expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    User login view.
    Authenticates user and returns JWT access/refresh tokens in cookies.
    """
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Login user",
        description="Authenticate a user and return JWT tokens in cookies (access_token, refresh_token).",
        request=CustomTokenObtainPairSerializer,
        responses={
            200: OpenApiResponse(description="Login successful. Tokens set in cookies."),
            400: OpenApiResponse(description="Invalid credentials."),
        },
        tags=["Authentication"],
    )
    def post(self, request):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            response = Response({'message': 'Log in successful'}, status=status.HTTP_200_OK)
            response.set_cookie(
                key='access_token',
                value=serializer.validated_data.get('access'),
                httponly=True,
                secure=False,  # set True in production
                samesite='Lax',
                max_age=604800
            )
            response.set_cookie(
                key='refresh_token',
                value=serializer.validated_data.get('refresh'),
                httponly=True,
                secure=False,  # set True in production
                samesite='Lax',
                max_age=604800
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    User logout view.
    Blacklists refresh token and clears cookies.
    """
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Logout user",
        description="Logout user by blacklisting the refresh token and clearing access/refresh cookies.",
        responses={
            200: OpenApiResponse(description="Logged out successfully."),
            400: OpenApiResponse(description="Invalid or missing token."),
        },
        tags=["Authentication"],
    )
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'message': 'Token must be present in the cookies'}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token')
        response.delete_cookie('access_token')
        return response