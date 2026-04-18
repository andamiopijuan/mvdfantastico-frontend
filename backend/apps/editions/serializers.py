from rest_framework import serializers
from .models import Edition, EditionImage


class EditionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditionImage
        fields = ["id", "image", "caption", "order"]


class EditionListSerializer(serializers.ModelSerializer):
    work_count = serializers.IntegerField(read_only=True)
    has_legacy = serializers.SerializerMethodField()

    class Meta:
        model = Edition
        fields = [
            "id",
            "name",
            "number",
            "year",
            "slug",
            "start_date",
            "end_date",
            "status",
            "is_current",
            "poster",
            "work_count",
            "has_legacy",
        ]

    def get_has_legacy(self, obj) -> bool:
        return obj.legacy_json is not None


class EditionDetailSerializer(serializers.ModelSerializer):
    gallery = EditionImageSerializer(many=True, read_only=True)
    work_count = serializers.IntegerField(read_only=True)
    venue_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Edition
        fields = [
            "id",
            "name",
            "number",
            "year",
            "slug",
            "start_date",
            "end_date",
            "status",
            "is_current",
            "poster",
            "key_visual",
            "pdf_catalog",
            "description_es",
            "description_en",
            "description_pt",
            "rules_es",
            "rules_en",
            "rules_pt",
            "submission_url",
            "gallery",
            "work_count",
            "venue_count",
            "legacy_json",
            "created_at",
            "updated_at",
        ]
