from django.contrib import admin
from .models import Work
from apps.accounts.permissions import ContentAdminMixin


@admin.register(Work)
class WorkAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = (
        "title",
        "director",
        "country",
        "production_year",
        "type",
        "section",
        "participation_status",
        "edition",
    )
    list_filter = ("edition__year", "type", "section", "participation_status", "country")
    search_fields = ("title", "original_title", "director", "cast")
    ordering = ("edition__year", "section", "title")
    readonly_fields = ("created_at",)
    fieldsets = (
        (None, {"fields": ("edition", "title", "original_title", "type", "section", "participation_status")}),
        ("Film Data", {"fields": ("country", "production_year", "runtime", "language", "subtitles")}),
        ("Credits", {"fields": ("director", "cast", "producers")}),
        ("Synopsis", {"fields": ("synopsis_es", "synopsis_en", "synopsis_pt")}),
        ("Media", {"fields": ("still",)}),
        ("Metadata", {"fields": ("created_at",)}),
    )
