from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilmViewSet

router = DefaultRouter()
router.register(r"films", FilmViewSet, basename="film")

urlpatterns = [
    path("", include(router.urls)),
]
