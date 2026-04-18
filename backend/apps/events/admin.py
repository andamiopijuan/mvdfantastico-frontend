from django.contrib import admin
from .models import SpecialEvent
from apps.accounts.permissions import ContentAdminMixin


@admin.register(SpecialEvent)
class SpecialEventAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = ("title", "category", "edition", "date", "time", "venue", "is_featured")
    list_filter = ("edition__year", "category", "is_featured")
    search_fields = ("title", "description_es")
    ordering = ("edition__year", "date", "time", "order")
    autocomplete_fields = ["venue"]
    fieldsets = (
        (None, {"fields": ("edition", "title", "category", "is_featured", "order")}),
        ("Schedule", {"fields": ("date", "time", "venue")}),
        ("Description (ES / EN / PT)", {
            "fields": ("description_es", "description_en", "description_pt"),
            "classes": ("collapse",),
        }),
        ("Media", {"fields": ("poster",)}),
    )
    readonly_fields = ("created_at", "updated_at")
