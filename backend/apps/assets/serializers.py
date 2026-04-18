from rest_framework import serializers
from .models import Asset


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ["id", "title", "file", "asset_type", "lifecycle", "edition", "variant"]
