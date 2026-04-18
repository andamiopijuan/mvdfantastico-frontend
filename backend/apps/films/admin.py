from django.contrib import admin
from .models import Film


@admin.register(Film)
class FilmAdmin(admin.ModelAdmin):
    list_display = ("title", "director", "country", "duration", "section", "edition", "is_featured")
    list_filter = ("edition", "section", "is_featured", "country")
    search_fields = ("title", "original_title", "director")
    ordering = ("edition__year", "title")
    autocomplete_fields = ["edition"]
