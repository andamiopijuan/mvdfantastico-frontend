from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .models import AwardCategory, AwardWinner
from .serializers import AwardCategorySerializer, AwardWinnerSerializer


class AwardCategoryViewSet(ReadOnlyModelViewSet):
    queryset = AwardCategory.objects.all()
    serializer_class = AwardCategorySerializer


class AwardWinnerViewSet(ReadOnlyModelViewSet):
    serializer_class = AwardWinnerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["edition__year", "category", "is_special_mention"]

    def get_queryset(self):
        return AwardWinner.objects.select_related(
            "edition", "category", "work"
        ).all()
