"""
Seed historical MVF archive editions.
Editions X (2017), XIII (2022), XIV (2023), XV (2024) are seeded from the
JSON files in backend/seed_data/ — their full legacy_json is stored for
rich-content rendering on the frontend.
All other past editions get basic metadata only.

Safe to run multiple times (update_or_create).
"""
import datetime
import json
import os
from django.core.management.base import BaseCommand
from apps.editions.models import Edition

SEED_DATA_DIR = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "..", "seed_data"
)

# ── Editions with full JSON data ──────────────────────────────────────────────
JSON_EDITIONS = [
    {
        "json_file": "mvf-x.json",
        "number": 10,
        "year": 2017,
        "slug": "x",
        "name": "Montevideo Fantástico X",
        "start_date": datetime.date(2017, 12, 6),
        "end_date": datetime.date(2017, 12, 13),
    },
    {
        "json_file": "mvf-xiii.json",
        "number": 13,
        "year": 2022,
        "slug": "xiii",
        "name": "Montevideo Fantástico XIII",
        "start_date": datetime.date(2022, 10, 5),
        "end_date": datetime.date(2022, 11, 19),
    },
    {
        "json_file": "mvf-xiv.json",
        "number": 14,
        "year": 2023,
        "slug": "xiv",
        "name": "Montevideo Fantástico XIV",
        "start_date": datetime.date(2023, 8, 26),
        "end_date": datetime.date(2023, 9, 10),
    },
    {
        "json_file": "mvf-xv.json",
        "number": 15,
        "year": 2024,
        "slug": "xv",
        "name": "Montevideo Fantástico XV",
        "start_date": datetime.date(2024, 9, 21),
        "end_date": datetime.date(2024, 10, 10),
    },
]


class Command(BaseCommand):
    help = "Seed past MVF editions (X=2017, XIII=2022, XIV=2023, XV=2024) with full legacy JSON."

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for meta in JSON_EDITIONS:
            json_path = os.path.join(SEED_DATA_DIR, meta["json_file"])
            if not os.path.exists(json_path):
                self.stderr.write(self.style.ERROR(f"  Missing: {json_path}"))
                continue

            with open(json_path, encoding="utf-8") as f:
                legacy_data = json.load(f)

            edition_node = legacy_data.get("edition", {})
            obj, is_new = Edition.objects.update_or_create(
                year=meta["year"],
                defaults={
                    "number": meta["number"],
                    "name": meta["name"],
                    "slug": meta["slug"],
                    "start_date": meta["start_date"],
                    "end_date": meta["end_date"],
                    "status": Edition.Status.PAST,
                    "is_current": False,
                    "poster": edition_node.get("poster", ""),
                    "description_es": edition_node.get("description_es", ""),
                    "description_en": edition_node.get("description_en", ""),
                    "description_pt": edition_node.get("description_pt", ""),
                    "legacy_json": legacy_data,
                },
            )

            if is_new:
                created_count += 1
                self.stdout.write(f"  Created: {obj.name} ({obj.year})")
            else:
                updated_count += 1
                self.stdout.write(f"  Updated: {obj.name} ({obj.year})")

        self.stdout.write(self.style.SUCCESS(
            f"\n✓ seed_archive complete. Created: {created_count}, Updated: {updated_count}"
        ))
