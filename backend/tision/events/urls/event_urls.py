from rest_framework.routers import DefaultRouter
from events.views.event_views import EventViewSet


router = DefaultRouter()
router.register(r'event', EventViewSet)
urlpatterns = router.urls

# Generated URLs by DefaultRouter for EventViewSet:
# GET      /event/           -> list all events
# POST     /event/           -> create new event
# GET      /event/<pk>/      -> retrieve event with id=<pk>
# PUT      /event/<pk>/      -> update event with id=<pk>
# PATCH     /event/<pk>/      -> partial update event with id=<pk>
