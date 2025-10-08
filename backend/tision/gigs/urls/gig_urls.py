from rest_framework.routers import DefaultRouter
from gigs.views.gig_views import GigViewSet




router = DefaultRouter()
router.register(r'gig', GigViewSet)
urlpatterns = router.urls