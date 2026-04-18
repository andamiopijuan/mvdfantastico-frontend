from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id", "title", "description",
            "date", "time", "venue",
            "poster", "category", "category_display",
            "edition", "film",
        ]


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "title", "description",
            "date", "time", "venue",
            "poster", "category", "edition", "film",
        ]

    def validate(self, data):
        if not data.get("title"):
            raise serializers.ValidationError({"title": "This field is required."})
        if not data.get("date"):
            raise serializers.ValidationError({"date": "This field is required."})
        if not data.get("time"):
            raise serializers.ValidationError({"time": "This field is required."})
        if not data.get("venue"):
            raise serializers.ValidationError({"venue": "This field is required."})
        return data
