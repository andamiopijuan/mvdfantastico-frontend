from django.db import models


class AboutContent(models.Model):
    """Singleton-style model for the About page content."""
    history = models.TextField()
    mission = models.TextField()
    philosophy = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Content"
        verbose_name_plural = "About Content"

    def __str__(self):
        return "About Page Content"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    bio = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return f"{self.name} — {self.role}"


class PartnerType(models.TextChoices):
    FESTIVAL = "festival", "Festival"
    MEDIA = "media", "Media Partner"
    SPONSOR = "sponsor", "Sponsor"
    INSTITUTIONAL = "institutional", "Institutional Support"


class Partner(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="partners/")
    url = models.URLField(blank=True)
    partner_type = models.CharField(max_length=50, choices=PartnerType.choices)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"Message from {self.name} <{self.email}>"


class SocialLink(models.Model):
    class Platform(models.TextChoices):
        INSTAGRAM = "instagram", "Instagram"
        FACEBOOK = "facebook", "Facebook"
        TWITTER = "twitter", "X (Twitter)"
        YOUTUBE = "youtube", "YouTube"
        TIKTOK = "tiktok", "TikTok"
        LETTERBOXD = "letterboxd", "Letterboxd"
        OTHER = "other", "Other"

    platform = models.CharField(max_length=30, choices=Platform.choices)
    label = models.CharField(max_length=100, blank=True, help_text="Display label (optional override)")
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "platform"]
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.get_platform_display()}: {self.url}"


class SiteContent(models.Model):
    """Singleton: global site-level text content (homepage intro, etc.)."""

    homepage_intro_es = models.TextField(
        blank=True,
        help_text="Hero / intro text shown on the homepage (Spanish)",
    )
    homepage_intro_en = models.TextField(blank=True, help_text="Hero intro text (English)")
    homepage_intro_pt = models.TextField(blank=True, help_text="Hero intro text (Portuguese)")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Content"
        verbose_name_plural = "Site Content"

    def __str__(self):
        return "Site Content"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
