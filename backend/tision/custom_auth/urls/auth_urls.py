from django.urls import path
from custom_auth.views.auth_views import LoginView, LogoutView, SigninView, VerificationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
        path('auth/login/', LoginView.as_view(), name='login'),
        path('auth/logout/', LogoutView.as_view(), name='logout'),
        path('auth/signin/', SigninView.as_view(), name='signin'),
        path('auth/email-verify/', VerificationView.as_view(), name='email-verify'),
        path('auth/token-refresh/', TokenRefreshView.as_view(), name='refresh'),
    ]