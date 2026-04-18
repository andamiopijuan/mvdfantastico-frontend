from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Asset
from .serializers import AssetSerializer


class AssetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Asset.objects.filter(lifecycle="final").select_related("edition")
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["asset_type", "edition__year", "variant"]
