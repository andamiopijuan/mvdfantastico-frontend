from rest_framework import serializers
from .models import Film


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = [
            "id", "title", "original_title", "director", "country",
            "duration", "synopsis", "year_produced", "language",
            "poster", "section", "is_featured", "edition",
        ]
