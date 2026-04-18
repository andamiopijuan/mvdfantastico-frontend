from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User
from .permissions import _can


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "first_name", "last_name", "role", "is_active", "is_staff")
    list_filter = ("role", "is_active")
    search_fields = ("username", "email", "first_name", "last_name")
    ordering = ("username",)

    fieldsets = BaseUserAdmin.fieldsets + (
        ("Festival Role", {"fields": ("role",)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ("Festival Role", {"fields": ("role",)}),
    )

    # ── Visibility ──────────────────────────────────────────────────────────

    def has_view_permission(self, request, obj=None):
        # Editors cannot manage users at all.
        return _can(request.user, "super_admin", "admin")

    def has_module_perms(self, request):
        return _can(request.user, "super_admin", "admin")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser or request.user.role == User.Role.SUPER_ADMIN:
            return qs
        # Admins can only see Editors
        return qs.filter(role=User.Role.EDITOR)

    # ── Add / Change ─────────────────────────────────────────────────────────

    def has_add_permission(self, request):
        return _can(request.user, "super_admin", "admin")

    def has_change_permission(self, request, obj=None):
        if not _can(request.user, "super_admin", "admin"):
            return False
        if obj is None:
            return True
        if request.user.is_superuser or request.user.role == User.Role.SUPER_ADMIN:
            return obj != request.user  # Super Admin cannot demote themselves
        # Admins can only edit Editors
        return obj.role == User.Role.EDITOR

    # ── Delete ───────────────────────────────────────────────────────────────

    def has_delete_permission(self, request, obj=None):
        if not _can(request.user, "super_admin"):
            return False
        if obj is None:
            return True
        return obj != request.user  # Cannot delete yourself
