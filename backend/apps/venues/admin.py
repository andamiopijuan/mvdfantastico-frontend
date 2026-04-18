from django.contrib import admin
from .models import Venue
from apps.accounts.permissions import StructureAdminMixin


@admin.register(Venue)
class VenueAdmin(StructureAdminMixin, admin.ModelAdmin):
    list_display = ("name", "edition", "address", "capacity", "order")
    list_filter = ("edition__year",)
    search_fields = ("name", "address")
    ordering = ("edition__year", "order", "name")
    fieldsets = (
        (None, {"fields": ("edition", "name", "address", "order")}),
        ("Details", {"fields": ("description", "capacity", "map_url")}),
    )
