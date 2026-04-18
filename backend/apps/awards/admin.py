from django.contrib import admin
from .models import AwardCategory, AwardWinner
from apps.accounts.permissions import StructureAdminMixin


class AwardWinnerInline(admin.TabularInline):
    model = AwardWinner
    extra = 1
    fields = ("category", "work", "is_special_mention", "notes")
    autocomplete_fields = ["work"]


@admin.register(AwardCategory)
class AwardCategoryAdmin(StructureAdminMixin, admin.ModelAdmin):
    list_display = ("name", "is_audience_award", "order")
    search_fields = ("name",)
    ordering = ("order", "name")


@admin.register(AwardWinner)
class AwardWinnerAdmin(StructureAdminMixin, admin.ModelAdmin):
    list_display = ("category", "work", "edition", "is_special_mention")
    list_filter = ("edition__year", "category", "is_special_mention")
    search_fields = ("work__title", "category__name", "notes")
    autocomplete_fields = ["work"]
    ordering = ("edition__year", "category__order")
