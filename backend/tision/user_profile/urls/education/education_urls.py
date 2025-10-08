from user_profile.views.education.education_views import EducationViewSet
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'education', EducationViewSet)
urlpatterns = router.urls

# Generated URLs by DefaultRouter for EducatioViewSet:
# GET      /education/           -> list all educations
# POST     /education/           -> create new education
# GET      /education/<pk>/      -> retrieve education with id=<pk>
# PUT      /education/<pk>/      -> update education with id=<pk>
# PATCH     /education/<pk>/      -> partial update education with id=<pk>
# DELETE      /education/<pk>/      -> delete education with id=<pk>
