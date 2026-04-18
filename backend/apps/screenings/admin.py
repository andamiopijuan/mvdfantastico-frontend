from django.contrib import admin
from .models import Screening
from apps.accounts.permissions import ContentAdminMixin


@admin.register(Screening)
class ScreeningAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = ("work", "edition", "date", "time", "venue", "notes_preview")
    list_filter = ("edition__year", "date", "venue")
    search_fields = ("work__title", "venue__name", "notes")
    ordering = ("edition__year", "date", "time")
    autocomplete_fields = ["work", "venue"]

    def notes_preview(self, obj):
        return obj.notes[:60] + "…" if len(obj.notes) > 60 else obj.notes

    notes_preview.short_description = "Notes"
