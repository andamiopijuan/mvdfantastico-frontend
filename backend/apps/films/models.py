from django.db import models
from apps.editions.models import Edition


class Film(models.Model):
    title = models.CharField(max_length=150)
    original_title = models.CharField(max_length=150, blank=True)
    director = models.CharField(max_length=200, blank=True)
    country = models.CharField(max_length=100, blank=True)
    duration = models.IntegerField(blank=True, null=True, help_text="Duration in minutes")
    synopsis = models.TextField(blank=True)
    year_produced = models.IntegerField(blank=True, null=True)
    language = models.CharField(max_length=100, blank=True)
    poster = models.ImageField(upload_to="films/posters/", blank=True, null=True)
    section = models.CharField(max_length=100, blank=True, help_text="Festival section or category")
    is_featured = models.BooleanField(default=False)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, related_name="films")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]
        verbose_name = "Film"
        verbose_name_plural = "Films"

    def __str__(self):
        return f"{self.title} ({self.edition.year})"
