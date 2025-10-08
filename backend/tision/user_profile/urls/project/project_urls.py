from rest_framework.routers import DefaultRouter
from user_profile.views.project.project_views import ProjectViewSet



router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename='project')
urlpatterns = router.urls


# Generated URLs by DefaultRouter for EducatioViewSet:
# GET      /project/           -> list all projects
# POST     /project/           -> create new project
# GET      /project/<pk>/      -> retrieve project with id=<pk>
# PUT      /project/<pk>/      -> update project with id=<pk>
# PATCH     /project/<pk>/      -> partial update project with id=<pk>
# DELETE      /project/<pk>/      -> delete project with id=<pk>
