from rest_framework.routers import DefaultRouter
from scholarships.views.scholarship_views import ScholarshipViewSet


router = DefaultRouter()
router.register(r'scholarship', ScholarshipViewSet)
urlpatterns = router.urls