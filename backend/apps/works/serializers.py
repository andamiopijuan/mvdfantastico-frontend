from rest_framework import serializers
from .models import Work


class WorkListSerializer(serializers.ModelSerializer):
    edition_year = serializers.IntegerField(source="edition.year", read_only=True)

    class Meta:
        model = Work
        fields = [
            "id",
            "title",
            "original_title",
            "type",
            "section",
            "country",
            "production_year",
            "runtime",
            "director",
            "still",
            "participation_status",
            "edition_year",
        ]


class WorkScreeningSerializer(serializers.Serializer):
    """Lightweight screening representation embedded inside WorkDetailSerializer."""
    id = serializers.IntegerField()
    date = serializers.DateField()
    time = serializers.TimeField()
    venue = serializers.IntegerField(source="venue_id", allow_null=True)
    venue_name = serializers.CharField(source="venue.name", allow_null=True)
    notes = serializers.CharField()


class WorkDetailSerializer(serializers.ModelSerializer):
    edition_year = serializers.IntegerField(source="edition.year", read_only=True)
    screenings = WorkScreeningSerializer(many=True, read_only=True)

    class Meta:
        model = Work
        fields = [
            "id",
            "edition",
            "edition_year",
            "title",
            "original_title",
            "type",
            "section",
            "participation_status",
            "country",
            "production_year",
            "runtime",
            "language",
            "subtitles",
            "director",
            "cast",
            "producers",
            "synopsis_es",
            "synopsis_en",
            "synopsis_pt",
            "still",
            "screenings",
            "created_at",
        ]
