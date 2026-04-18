from django.db import models
from django.utils.text import slugify


class Edition(models.Model):
    class Status(models.TextChoices):
        UPCOMING = "upcoming", "Upcoming"
        ACTIVE = "active", "Active"
        PAST = "past", "Past"

    # Identity
    name = models.CharField(max_length=200)
    number = models.PositiveSmallIntegerField(
        help_text="Edition number (e.g., 16 for the 16th edition)"
    )
    year = models.PositiveSmallIntegerField(unique=True)
    slug = models.SlugField(unique=True, blank=True)

    # Dates & status
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.UPCOMING
    )
    is_current = models.BooleanField(default=False, db_index=True)

    # Media
    poster = models.ImageField(upload_to="editions/posters/", blank=True)
    key_visual = models.ImageField(upload_to="editions/visuals/", blank=True)

    # Multilingual descriptions
    description_es = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_pt = models.TextField(blank=True)

    # Regulations & submissions
    rules_es = models.TextField(blank=True)
    rules_en = models.TextField(blank=True)
    rules_pt = models.TextField(blank=True)
    submission_url = models.URLField(blank=True)

    # Downloadable catalog
    pdf_catalog = models.FileField(upload_to="editions/catalogs/", blank=True)

    # Legacy rich content (film catalog, awards, editorial) for past editions
    legacy_json = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-year"]
        verbose_name = "Edition"
        verbose_name_plural = "Editions"

    def __str__(self):
        return f"{self.name} ({self.year})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"mvf-{self.year}")
        if self.is_current:
            Edition.objects.exclude(pk=self.pk).update(is_current=False)
        super().save(*args, **kwargs)


class EditionImage(models.Model):
    edition = models.ForeignKey(
        Edition, on_delete=models.CASCADE, related_name="gallery"
    )
    image = models.ImageField(upload_to="editions/gallery/")
    caption = models.CharField(max_length=300, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Edition Image"
        verbose_name_plural = "Edition Images"

    def __str__(self):
        return f"{self.edition.name} — image {self.order}"
