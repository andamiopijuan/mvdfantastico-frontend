from django.db import models


class Work(models.Model):
    class Type(models.TextChoices):
        SHORT = "short", "Short Film"        # < 30 min
        MEDIUM = "medium", "Medium-length"   # 30–70 min
        FEATURE = "feature", "Feature Film"  # > 70 min

    class Section(models.TextChoices):
        COMPETITION_INT = "competition_int", "International Competition"
        COMPETITION_NAT = "competition_nat", "National Competition"
        SHORT_COMPETITION = "short_competition", "Short Film Competition"
        PANORAMA = "panorama", "Panorama"
        SPECIAL = "special", "Special Screening"
        RETROSPECTIVE = "retrospective", "Retrospective"
        TRIBUTE = "tribute", "Tribute"

    class ParticipationStatus(models.TextChoices):
        SELECTED = "selected", "Official Selection"
        WORLD_PREMIERE = "world_premiere", "World Premiere"
        LATAM_PREMIERE = "latam_premiere", "Latin American Premiere"
        REGIONAL_PREMIERE = "regional_premiere", "Regional Premiere"
        SPECIAL_SCREENING = "special_screening", "Special Screening"

    # Edition link
    edition = models.ForeignKey(
        "editions.Edition", on_delete=models.CASCADE, related_name="works"
    )

    # Identity
    title = models.CharField(max_length=300)
    original_title = models.CharField(max_length=300, blank=True)
    type = models.CharField(max_length=20, choices=Type.choices)
    section = models.CharField(
        max_length=30, choices=Section.choices, default=Section.COMPETITION_INT
    )
    participation_status = models.CharField(
        max_length=30,
        choices=ParticipationStatus.choices,
        default=ParticipationStatus.SELECTED,
    )

    # Film metadata
    country = models.CharField(max_length=100)
    production_year = models.PositiveSmallIntegerField()
    runtime = models.PositiveSmallIntegerField(help_text="Runtime in minutes")
    language = models.CharField(max_length=100, blank=True)
    subtitles = models.CharField(max_length=100, blank=True)

    # Credits
    director = models.CharField(max_length=300)
    cast = models.TextField(blank=True, help_text="Cast list, comma-separated")
    producers = models.CharField(max_length=500, blank=True)

    # Multilingual synopsis
    synopsis_es = models.TextField(blank=True)
    synopsis_en = models.TextField(blank=True)
    synopsis_pt = models.TextField(blank=True)

    # Media
    still = models.ImageField(upload_to="works/stills/", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["section", "title"]
        verbose_name = "Work"
        verbose_name_plural = "Works"

    def __str__(self):
        return f"{self.title} ({self.production_year}) — {self.edition}"
