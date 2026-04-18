from django.db import models
from apps.editions.models import Edition


class AssetType(models.TextChoices):
    LOGO = "logo", "Logo"
    POSTER = "poster", "Poster"
    KEY_VISUAL = "key_visual", "Key Visual"
    GALLERY = "gallery", "Gallery Image"


class AssetLifecycle(models.TextChoices):
    DRAFT = "draft", "Draft"
    FINAL = "final", "Final"
    ARCHIVED = "archived", "Archived"


class Asset(models.Model):
    title = models.CharField(max_length=200)
    file = models.ImageField(upload_to="assets/")
    asset_type = models.CharField(max_length=50, choices=AssetType.choices)
    lifecycle = models.CharField(
        max_length=20, choices=AssetLifecycle.choices, default=AssetLifecycle.DRAFT
    )
    # null edition = festival-level asset (e.g. logo)
    edition = models.ForeignKey(
        Edition, on_delete=models.SET_NULL, null=True, blank=True, related_name="assets"
    )
    # For logo variants: "light" / "dark"
    variant = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Asset"
        verbose_name_plural = "Assets"

    def __str__(self):
        return f"{self.title} [{self.asset_type}]"
