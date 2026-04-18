"""
Role-based admin permission mixins for Montevideo Fantástico.

Two tiers:
  StructureAdminMixin  — Editors: view only. Admin+: add/change/delete.
  ContentAdminMixin    — Editors: add/change (no delete). Admin+: full write.

Both tiers also allow Django superusers (initial setup account) full access.
"""


def _role(user):
    return getattr(user, "role", None)


def _can(user, *roles):
    """True if the user is a Django superuser OR has one of the given MVF roles."""
    return user.is_superuser or _role(user) in roles


class StructureAdminMixin:
    """
    For structural / editorial-control content:
      Edition, Venue, AwardCategory, AwardWinner

    - Editor    : view only
    - Admin     : view + add + change + delete
    - Super Admin: full access
    """

    def has_view_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin", "editor")

    def has_add_permission(self, request):
        return _can(request.user, "super_admin", "admin")

    def has_change_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin")

    def has_delete_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin")

    def has_module_perms(self, request):
        return _can(request.user, "super_admin", "admin", "editor")


class ContentAdminMixin:
    """
    For day-to-day editable content:
      Work, Screening, SpecialEvent, Pages, TeamMember, Partner, SocialLink, SiteContent

    - Editor    : view + add + change  (no delete)
    - Admin     : view + add + change + delete
    - Super Admin: full access
    """

    def has_view_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin", "editor")

    def has_add_permission(self, request):
        return _can(request.user, "super_admin", "admin", "editor")

    def has_change_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin", "editor")

    def has_delete_permission(self, request, obj=None):
        return _can(request.user, "super_admin", "admin")

    def has_module_perms(self, request):
        return _can(request.user, "super_admin", "admin", "editor")
