from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Work
from .serializers import WorkListSerializer, WorkDetailSerializer


class WorkViewSet(ReadOnlyModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["edition__year", "type", "section", "country", "participation_status"]
    search_fields = ["title", "original_title", "director"]
    ordering_fields = ["title", "production_year", "section", "type"]
    ordering = ["section", "title"]

    def get_queryset(self):
        return Work.objects.select_related("edition").prefetch_related(
            "screenings__venue"
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return WorkDetailSerializer
        return WorkListSerializer
