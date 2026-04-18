from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN = "super_admin", "Super Admin"
        ADMIN = "admin", "Admin"
        EDITOR = "editor", "Editor"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EDITOR,
        db_index=True,
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def save(self, *args, **kwargs):
        # Any user with a festival role automatically gets Django admin access.
        # We do NOT set is_superuser — our permission mixins handle Super Admin.
        if self.role:
            self.is_staff = True
        super().save(*args, **kwargs)

    @property
    def is_super_admin(self):
        return self.role == self.Role.SUPER_ADMIN

    @property
    def is_admin_level(self):
        return self.role in (self.Role.SUPER_ADMIN, self.Role.ADMIN)
