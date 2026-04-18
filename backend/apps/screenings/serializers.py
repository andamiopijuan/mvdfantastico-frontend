from rest_framework import serializers
from .models import Screening


class ScreeningWorkSerializer(serializers.Serializer):
    """Lightweight work info embedded inside ScreeningSerializer."""
    id = serializers.IntegerField()
    title = serializers.CharField()
    type = serializers.CharField()
    section = serializers.CharField()
    director = serializers.CharField()
    runtime = serializers.IntegerField()
    still = serializers.ImageField()


class ScreeningSerializer(serializers.ModelSerializer):
    work = ScreeningWorkSerializer(read_only=True)
    work_id = serializers.IntegerField(source="work.id", read_only=True)
    venue_name = serializers.CharField(source="venue.name", read_only=True, allow_null=True)

    class Meta:
        model = Screening
        fields = [
            "id",
            "edition",
            "work",
            "work_id",
            "venue",
            "venue_name",
            "date",
            "time",
            "notes",
        ]
