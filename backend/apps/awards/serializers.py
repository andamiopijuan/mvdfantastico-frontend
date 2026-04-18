from rest_framework import serializers
from .models import AwardCategory, AwardWinner


class AwardCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AwardCategory
        fields = ["id", "name", "description", "is_audience_award", "order"]


class AwardWinnerSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    work_title = serializers.CharField(source="work.title", read_only=True, allow_null=True)
    work_director = serializers.CharField(
        source="work.director", read_only=True, allow_null=True
    )

    class Meta:
        model = AwardWinner
        fields = [
            "id",
            "edition",
            "category",
            "category_name",
            "work",
            "work_title",
            "work_director",
            "is_special_mention",
            "notes",
        ]
