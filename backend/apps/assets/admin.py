from django.contrib import admin
from .models import Asset


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ("title", "asset_type", "lifecycle", "edition", "variant")
    list_filter = ("asset_type", "lifecycle", "edition")
    search_fields = ("title",)
