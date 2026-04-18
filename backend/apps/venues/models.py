from django.db import models


class Venue(models.Model):
    """
    A physical venue that belongs to a specific Edition.
    Venues are not globally normalized — each edition defines its own set.
    """

    edition = models.ForeignKey(
        "editions.Edition",
        on_delete=models.CASCADE,
        related_name="venues",
    )
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    description = models.TextField(blank=True)
    capacity = models.PositiveIntegerField(null=True, blank=True)
    map_url = models.URLField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Venue"
        verbose_name_plural = "Venues"

    def __str__(self):
        return f"{self.name} ({self.edition.year})"
