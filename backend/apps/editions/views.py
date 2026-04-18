from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Edition
from .serializers import EditionListSerializer, EditionDetailSerializer


class EditionViewSet(viewsets.ReadOnlyModelViewSet):
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["year", "status", "is_current"]
    lookup_field = "year"

    def get_queryset(self):
        return Edition.objects.annotate(
            work_count=Count("works", distinct=True),
            venue_count=Count("venues", distinct=True),
        ).prefetch_related("gallery")

    def get_serializer_class(self):
        if self.action == "list":
            return EditionListSerializer
        return EditionDetailSerializer

    @action(detail=False, methods=["get"], url_path="current")
    def current(self, request):
        edition = self.get_queryset().filter(is_current=True).first()
        if not edition:
            return Response(
                {"detail": "No active edition found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = EditionDetailSerializer(edition, context={"request": request})
        return Response(serializer.data)
