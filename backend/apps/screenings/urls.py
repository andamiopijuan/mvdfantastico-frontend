from rest_framework.routers import DefaultRouter
from .views import ScreeningViewSet

router = DefaultRouter()
router.register("screenings", ScreeningViewSet, basename="screening")

urlpatterns = router.urls
