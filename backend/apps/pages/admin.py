from django.contrib import admin
from .models import AboutContent, TeamMember, Partner, ContactMessage, SocialLink, SiteContent
from apps.accounts.permissions import ContentAdminMixin


@admin.register(SiteContent)
class SiteContentAdmin(ContentAdminMixin, admin.ModelAdmin):
    fieldsets = (
        ("Homepage Intro Text", {
            "fields": ("homepage_intro_es", "homepage_intro_en", "homepage_intro_pt"),
            "description": "Text displayed in the homepage hero/intro area.",
        }),
        ("Metadata", {"fields": ("updated_at",)}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if not super().has_add_permission(request):
            return False
        return not SiteContent.objects.exists()


@admin.register(SocialLink)
class SocialLinkAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = ("platform", "label", "url", "is_active", "order")
    list_filter = ("platform", "is_active")
    ordering = ("order", "platform")


@admin.register(AboutContent)
class AboutContentAdmin(ContentAdminMixin, admin.ModelAdmin):
    fieldsets = (
        (None, {"fields": ("history", "mission", "philosophy")}),
        ("Metadata", {"fields": ("updated_at",)}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if not super().has_add_permission(request):
            return False
        return not AboutContent.objects.exists()


@admin.register(TeamMember)
class TeamMemberAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = ("name", "role", "order")
    ordering = ("order", "name")
    search_fields = ("name", "role")


@admin.register(Partner)
class PartnerAdmin(ContentAdminMixin, admin.ModelAdmin):
    list_display = ("name", "partner_type", "order")
    list_filter = ("partner_type",)
    ordering = ("order", "name")
    search_fields = ("name",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at", "is_read")
    list_filter = ("is_read",)
    readonly_fields = ("name", "email", "message", "created_at")
    ordering = ("-created_at",)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        from apps.accounts.permissions import _can
        return _can(request.user, "super_admin", "admin")
