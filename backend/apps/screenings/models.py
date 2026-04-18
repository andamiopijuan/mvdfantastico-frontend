from django.db import models


class Screening(models.Model):
    edition = models.ForeignKey(
        "editions.Edition", on_delete=models.CASCADE, related_name="screenings"
    )
    work = models.ForeignKey(
        "works.Work", on_delete=models.CASCADE, related_name="screenings"
    )
    venue = models.ForeignKey(
        "venues.Venue",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="screenings",
    )
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True, help_text="Q&A, presentation, special notes, etc.")

    class Meta:
        ordering = ["date", "time"]
        verbose_name = "Screening"
        verbose_name_plural = "Screenings"

    def __str__(self):
        venue_str = self.venue.name if self.venue else "TBD"
        return f"{self.work.title} — {self.date} {self.time} @ {venue_str}"
