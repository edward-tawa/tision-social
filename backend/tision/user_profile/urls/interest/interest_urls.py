from rest_framework.routers import DefaultRouter
from user_profile.views.interest.interest_views import InterestViewSet


router = DefaultRouter()
router.register(r'interest', InterestViewSet, basename='interest')
urlpatterns = router.urls

# Generated URLs by DefaultRouter for EducatioViewSet:
# GET      /interest/           -> list all interests
# POST     /interest/           -> create new interest
# GET      /interest/<pk>/      -> retrieve interest with id=<pk>
# PUT      /interest/<pk>/      -> update interest with id=<pk>
# PATCH     /interest/<pk>/      -> partial update interest with id=<pk>
# DELETE      /interest/<pk>/      -> delete interest with id=<pk>