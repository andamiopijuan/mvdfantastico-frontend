from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Screening
from .serializers import ScreeningSerializer


class ScreeningViewSet(ReadOnlyModelViewSet):
    serializer_class = ScreeningSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["edition__year", "date", "venue"]
    ordering_fields = ["date", "time"]
    ordering = ["date", "time"]

    def get_queryset(self):
        return Screening.objects.select_related("work", "venue", "edition")
