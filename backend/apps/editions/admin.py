from django.contrib import admin
from .models import Edition, EditionImage
from apps.accounts.permissions import StructureAdminMixin


class EditionImageInline(admin.TabularInline):
    model = EditionImage
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(Edition)
class EditionAdmin(StructureAdminMixin, admin.ModelAdmin):
    list_display = ("name", "number", "year", "status", "is_current", "start_date", "end_date")
    list_filter = ("status", "is_current")
    search_fields = ("name", "year")
    ordering = ("-year",)
    prepopulated_fields = {"slug": ("year",)}
    readonly_fields = ("created_at", "updated_at")
    inlines = [EditionImageInline]
    fieldsets = (
        (None, {"fields": ("name", "number", "year", "slug", "status", "is_current")}),
        ("Dates", {"fields": ("start_date", "end_date")}),
        ("Media", {"fields": ("poster", "key_visual", "pdf_catalog")}),
        ("Description (ES / EN / PT)", {"fields": ("description_es", "description_en", "description_pt"), "classes": ("collapse",)}),
        ("Rules (ES / EN / PT)", {"fields": ("rules_es", "rules_en", "rules_pt"), "classes": ("collapse",)}),
        ("Submissions", {"fields": ("submission_url",)}),
        ("Metadata", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(EditionImage)
class EditionImageAdmin(StructureAdminMixin, admin.ModelAdmin):
    list_display = ("edition", "caption", "order")
    list_filter = ("edition__year",)
    ordering = ("edition__year", "order")
