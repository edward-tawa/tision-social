from rest_framework.routers import DefaultRouter
from tision.institutions.views.institution_views import InstitutionViewSet


router = DefaultRouter()
router.register(r'institution', InstitutionViewSet)
urlpatterns = router.urls
