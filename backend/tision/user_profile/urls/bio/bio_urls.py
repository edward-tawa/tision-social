from rest_framework.routers import DefaultRouter
from user_profile.views.bio.bio_views import BioViewSet


router = DefaultRouter()
router.register(r'bio', BioViewSet)

urlpatterns = router.urls



# Generated URLs by DefaultRouter for BioViewSet:
# GET      /bio/           -> list all bios
# POST     /bio/           -> create new bio
# GET      /bio/<pk>/      -> retrieve bio with id=<pk>
# PUT      /bio/<pk>/      -> update bio with id=<pk> (full update)
# PATCH    /bio/<pk>/      -> partial update bio with id=<pk>
# DELETE   /bio/<pk>/      -> delete bio with id=<pk>