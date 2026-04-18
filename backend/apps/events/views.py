from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.select_related("edition", "film").all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["edition__year", "category", "date", "venue"]
    ordering_fields = ["date", "time"]

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return EventCreateSerializer
        return EventSerializer
