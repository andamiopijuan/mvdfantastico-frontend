from rest_framework.routers import DefaultRouter
from .views import AwardCategoryViewSet, AwardWinnerViewSet

router = DefaultRouter()
router.register("award-categories", AwardCategoryViewSet, basename="awardcategory")
router.register("award-winners", AwardWinnerViewSet, basename="awardwinner")

urlpatterns = router.urls
