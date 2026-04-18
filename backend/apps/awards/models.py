from django.db import models


class AwardCategory(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    is_audience_award = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Award Category"
        verbose_name_plural = "Award Categories"

    def __str__(self):
        return self.name


class AwardWinner(models.Model):
    edition = models.ForeignKey(
        "editions.Edition", on_delete=models.CASCADE, related_name="award_winners"
    )
    category = models.ForeignKey(
        AwardCategory, on_delete=models.CASCADE, related_name="winners"
    )
    work = models.ForeignKey(
        "works.Work",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="awards_won",
    )
    is_special_mention = models.BooleanField(default=False)
    notes = models.TextField(blank=True, help_text="e.g. 'Best Director: John Doe'")

    class Meta:
        ordering = ["category__order", "category__name"]
        verbose_name = "Award Winner"
        verbose_name_plural = "Award Winners"

    def __str__(self):
        label = "Special Mention" if self.is_special_mention else "Winner"
        work_title = self.work.title if self.work else "—"
        return f"{self.category} — {work_title} ({label}) [{self.edition.year}]"
