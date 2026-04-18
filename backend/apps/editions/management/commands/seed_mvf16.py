"""
Management command: seed_mvf16
Updates MVF XVI (2026) edition with real content:
  - Edition name, descriptions (ES/EN/PT), clears submission_url
  - 8 confirmed venues (4 with schedule, 4 schedule-pending)
  - AboutContent seed (Spanish base for admin)

Usage: python manage.py seed_mvf16
"""
from django.core.management.base import BaseCommand
from django.db import transaction
from apps.editions.models import Edition
from apps.venues.models import Venue
from apps.pages.models import AboutContent


DESCRIPTION_ES = (
    "La edición XVI mantiene la estructura del festival: competencias por categorías, "
    "funciones en distintas salas y votación del público en cada proyección.\n\n"
    "La programación reúne películas de varios países y convive con retrospectivas, "
    "muestras paralelas y actividades vinculadas al cine de género."
)

DESCRIPTION_EN = (
    "Edition XVI maintains the festival's structure: category competitions, "
    "screenings at multiple venues, and audience voting at every showing.\n\n"
    "The programme brings together films from several countries alongside "
    "retrospectives, parallel showcases, and genre film activities."
)

DESCRIPTION_PT = (
    "A edição XVI mantém a estrutura do festival: competições por categorias, "
    "sessões em diversas salas e votação do público em cada exibição.\n\n"
    "A programação reúne filmes de vários países junto a retrospectivas, "
    "mostras paralelas e atividades ligadas ao cinema de gênero."
)

ABOUT_MISSION = (
    "Montevideo Fantástico es el primer festival de cine de género del Uruguay, "
    "dedicado al terror, la fantasía y la ciencia ficción.\n\n"
    "Desde 2005 trabaja con películas nacionales e internacionales, con foco en "
    "producciones independientes y ultra independientes que suelen quedar fuera "
    "de los circuitos de exhibición tradicionales."
)

ABOUT_HISTORY = (
    "A lo largo de sus ediciones, el festival ha crecido en cantidad de películas, "
    "sedes y público.\n\n"
    "Las funciones se han realizado en distintas salas y centros culturales de "
    "Montevideo, manteniendo un formato que combina programación diversa con "
    "participación activa del público."
)

ABOUT_PHILOSOPHY = (
    "El festival se organiza en competencias por categorías y en cada función el "
    "público vota las películas.\n\n"
    "Esa dinámica define el resultado de cada edición y forma parte central de la "
    "experiencia.\n\n"
    "La programación combina producciones nacionales e internacionales, y funciona "
    "como un espacio de circulación para el cine de género independiente."
)

# Confirmed venues with scheduled dates
SCHEDULED_VENUES = [
    {
        "name": "Centro Cultural Florencio Sánchez",
        "address": "Montevideo",
        "description": "8 may 20:00 · 9 may 20:00",
        "order": 1,
    },
    {
        "name": "Sala Lazaroff",
        "address": "Montevideo",
        "description": "15 may 20:00 · 16 may 20:00",
        "order": 2,
    },
    {
        "name": "Centro Cultural Artesano",
        "address": "Montevideo",
        "description": "8 may 19:30 · 15 may 19:30",
        "order": 3,
    },
    {
        "name": "Centro Cultural La Experimental",
        "address": "Montevideo",
        "description": "9 may 16:00–22:00 · 16 may 16:00–22:00",
        "order": 4,
    },
]

# Confirmed venues, schedule pending
PENDING_VENUES = [
    {"name": "Casa INJU",               "address": "Montevideo", "order": 11},
    {"name": "Centro Cultural Crece",   "address": "Montevideo", "order": 12},
    {"name": "Flores",                  "address": "Departamento de Flores", "order": 13},
    {"name": "Río Negro",               "address": "Departamento de Río Negro", "order": 14},
]

PENDING_DESC = "Programación a confirmar"


class Command(BaseCommand):
    help = "Seeds MVF XVI (2026) edition data: venues, descriptions, and about content"

    @transaction.atomic
    def handle(self, *args, **options):
        # ── 1. Update current edition ─────────────────────────────────
        edition = Edition.objects.filter(year=2026, is_current=True).first()
        if not edition:
            edition = Edition.objects.filter(year=2026).first()
        if not edition:
            self.stdout.write(self.style.ERROR("No 2026 edition found. Run seed_demo first."))
            return

        edition.name = "Montevideo Fantástico XVI"
        edition.description_es = DESCRIPTION_ES
        edition.description_en = DESCRIPTION_EN
        edition.description_pt = DESCRIPTION_PT
        edition.submission_url = ""  # Convocatoria cerrada
        edition.save()
        self.stdout.write(self.style.SUCCESS(f"✓ Edition updated: {edition.name} ({edition.year})"))

        # ── 2. Clear existing venues for this edition ─────────────────
        deleted, _ = Venue.objects.filter(edition=edition).delete()
        self.stdout.write(f"  Removed {deleted} existing venues")

        # ── 3. Create scheduled venues ────────────────────────────────
        for data in SCHEDULED_VENUES:
            Venue.objects.create(edition=edition, **data)
        self.stdout.write(self.style.SUCCESS(f"✓ Created {len(SCHEDULED_VENUES)} scheduled venues"))

        # ── 4. Create pending venues ──────────────────────────────────
        for data in PENDING_VENUES:
            Venue.objects.create(
                edition=edition,
                name=data["name"],
                address=data["address"],
                description=PENDING_DESC,
                order=data["order"],
            )
        self.stdout.write(self.style.SUCCESS(f"✓ Created {len(PENDING_VENUES)} pending venues"))

        # ── 5. Seed AboutContent ──────────────────────────────────────
        about, created = AboutContent.objects.get_or_create(pk=1)
        about.history = ABOUT_HISTORY
        about.mission = ABOUT_MISSION
        about.philosophy = ABOUT_PHILOSOPHY
        about.save()
        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"✓ {action} AboutContent"))

        self.stdout.write(self.style.SUCCESS("\n✓ seed_mvf16 complete."))
