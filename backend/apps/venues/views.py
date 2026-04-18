from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Venue
from .serializers import VenueSerializer


class VenueViewSet(ReadOnlyModelViewSet):
    serializer_class = VenueSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["edition__year"]
    ordering_fields = ["order", "name"]
    ordering = ["order", "name"]

    def get_queryset(self):
        return Venue.objects.select_related("edition").all()
