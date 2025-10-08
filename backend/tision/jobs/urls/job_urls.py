from rest_framework.routers import DefaultRouter
from jobs.views.job_views import JobViewSet


router = DefaultRouter()
router.register(r'job', JobViewSet)
urlpatterns = router.urls