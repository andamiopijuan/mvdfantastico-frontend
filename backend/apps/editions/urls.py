from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EditionViewSet

router = DefaultRouter()
router.register(r"editions", EditionViewSet, basename="edition")

urlpatterns = [
    path("", include(router.urls)),
]
