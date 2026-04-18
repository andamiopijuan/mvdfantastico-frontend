from django.db import models


class SpecialEvent(models.Model):
    """
    Non-screening events tied to an edition: masterclasses, panels,
    opening/closing ceremonies, award presentations, etc.
    """

    class Category(models.TextChoices):
        MASTERCLASS = "masterclass", "Masterclass"
        PANEL = "panel", "Panel"
        EXHIBITION = "exhibition", "Exhibición"
        OPENING = "opening", "Apertura"
        CLOSING = "closing", "Cierre"
        AWARDS = "awards", "Entrega de Premios"
        PRESENTATION = "presentation", "Presentación"
        OTHER = "other", "Otro"

    edition = models.ForeignKey(
        "editions.Edition",
        on_delete=models.CASCADE,
        related_name="special_events",
    )
    venue = models.ForeignKey(
        "venues.Venue",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="special_events",
    )

    title = models.CharField(max_length=300)
    category = models.CharField(max_length=30, choices=Category.choices, default=Category.OTHER)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)

    description_es = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_pt = models.TextField(blank=True)

    poster = models.ImageField(upload_to="events/posters/", blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["date", "time", "order"]
        verbose_name = "Special Event"
        verbose_name_plural = "Special Events"

    def __str__(self):
        return f"{self.title} — {self.edition.year}"

