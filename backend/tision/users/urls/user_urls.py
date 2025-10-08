from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views.user_views import UserViewSet

# Create a DRF router
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]