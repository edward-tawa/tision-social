from rest_framework.routers import DefaultRouter
from user_profile.views.experience.experience_views import ExperienceViewSet


router = DefaultRouter()
router.register(r'experience', ExperienceViewSet, basename='experience')
urlpatterns = router.urls


# Generated URLs by DefaultRouter for EducatioViewSet:
# GET      /experience/           -> list all experiences
# POST     /experience/           -> create new experience
# GET      /experience/<pk>/      -> retrieve experience with id=<pk>
# PUT      /experience/<pk>/      -> update experience with id=<pk>
# PATCH     /experience/<pk>/      -> partial update experience with id=<pk>
# DELETE      /experience/<pk>/      -> delete experience with id=<pk>
# This allows for CRUD operations on the Experience model through the API.
