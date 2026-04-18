"""
Seed script — Montevideo Fantástico full archive (editions I–XIV).
Real data only. No simulation.

Run:
  docker exec mvdfantastico-backend-1 python /app/seed_archive_full.py
"""
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.editions.models import Edition
from apps.works.models import Work

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def get_edition(year):
    try:
        return Edition.objects.get(year=year)
    except Edition.DoesNotExist:
        return None


def upsert_work(edition, **fields):
    obj, created = Work.objects.get_or_create(
        edition=edition,
        title=fields["title"],
        director=fields.get("director", ""),
        defaults=fields,
    )
    if not created:
        for k, v in fields.items():
            setattr(obj, k, v)
        obj.save()
    status = "created" if created else "updated"
    print(f"  [{status}] {fields['title']}")
    return obj


# ─────────────────────────────────────────────────────────────────────────────
# Edition I — 2005
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2005)
if e:
    e.description_es = (
        "Primera edición del festival, celebrada en 2005. Primer encuentro de cine fantástico, "
        "de terror y ciencia ficción independiente de Uruguay, con películas de España, Argentina, "
        "Alemania, Canadá y Estados Unidos."
    )
    e.description_en = (
        "First edition of the festival, held in 2005. Uruguay's first independent fantasy, horror "
        "and science fiction film gathering, with films from Spain, Argentina, Germany, Canada and USA."
    )
    e.save()

    works_i = [
        dict(title="Darkness", director="Jaume Balagueró", country="España",
             production_year=2002, runtime=102, type="feature", section="competition_int",
             synopsis_es="Una familia americana se muda a una antigua mansión española donde ocurrieron rituales ocultos."),
        dict(title="Habitaciones para turistas", director="Adrián García Bogliano", country="Argentina",
             production_year=2004, runtime=80, type="feature", section="competition_int",
             synopsis_es="Dos chicas piden alojamiento en una mansión en la que vive una siniestra familia."),
        dict(title="Night Fangs", director="Ricardo Islas", country="EEUU",
             production_year=2005, runtime=90, type="feature", section="competition_int",
             synopsis_es="Vampiros en la ciudad de Nueva York."),
        dict(title="Rojo Sangre", director="Christian Molina", country="España",
             production_year=2004, runtime=90, type="feature", section="competition_int",
             synopsis_es="Un actor que nunca logró el éxito decide tomarse la justicia por su mano."),
        dict(title="The Final Cut", director="Omar Naïm", country="Alemania/Canadá",
             production_year=2004, runtime=95, type="feature", section="competition_int",
             synopsis_es="Un montador de memorias descubre un oscuro secreto en los recuerdos de un hombre fallecido."),
        dict(title="Sangre en La Mondiola", director="Guzmán Vila", country="Uruguay",
             production_year=2005, runtime=70, type="feature", section="competition_nat",
             synopsis_es="Película nacional de terror fantástico."),
    ]
    for w in works_i:
        upsert_work(e, **w)
    print(f"Edition I (2005): {len(works_i)} works seeded.")
else:
    print("Edition 2005 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition II — 2007
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2007)
if e:
    e.description_es = (
        "Segunda edición, celebrada del 2 al 9 de marzo de 2007 en el Cine Universitario. "
        "14 largometrajes, 24 cortometrajes y 13 países participantes. "
        "Mejor Película: The Last Horror Movie (Reino Unido, Julian Richards)."
    )
    e.description_en = (
        "Second edition, held March 2–9, 2007 at Cine Universitario. "
        "14 features, 24 shorts, 13 countries. "
        "Best Film: The Last Horror Movie (UK, Julian Richards)."
    )
    e.save()

    works_ii = [
        dict(title="The Last Horror Movie", director="Julian Richards", country="Reino Unido",
             production_year=2003, runtime=80, type="feature", section="competition_int",
             synopsis_es="Un asesino en serie filma sus crímenes y reemplaza el contenido de un videoclub con su material."),
        dict(title="A Tale of Two Sisters", director="Kim Ji-woon", country="Corea del Sur",
             production_year=2003, runtime=115, type="feature", section="competition_int",
             synopsis_es="Dos hermanas regresan a casa de su padre tras una estancia en un psiquiátrico, donde descubren la hostilidad de su madrastra."),
        dict(title="Beneath the Cogon", director="Rico María Ilarde", country="Filipinas",
             production_year=2005, runtime=83, type="feature", section="competition_int",
             synopsis_es="Terror sobrenatural filipino."),
        dict(title="El Marfil", director="Bergandi/Méndez", country="Argentina",
             production_year=2004, runtime=80, type="feature", section="competition_int",
             synopsis_es="Thriller fantástico argentino."),
        dict(title="En Silencio", director="Millán", country="España",
             production_year=2005, runtime=85, type="feature", section="competition_int",
             synopsis_es="Terror psicológico español."),
        dict(title="Encuentros Solitarios", director="Benítez Farah", country="Argentina",
             production_year=2004, runtime=92, type="feature", section="competition_int",
             synopsis_es="Drama fantástico argentino."),
        dict(title="FAQ", director="Carlos Atanes", country="España",
             production_year=2004, runtime=82, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción experimental española."),
        dict(title="Grité una Noche", director="Adrián García Bogliano", country="Argentina",
             production_year=2005, runtime=100, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Jennifer's Shadow", director="De la Vega/Parés", country="Argentina/EEUU",
             production_year=2004, runtime=95, type="feature", section="competition_int",
             synopsis_es="Coproducción de terror."),
        dict(title="Koma", director="Law Chi-Leung", country="Hong Kong",
             production_year=2004, runtime=88, type="feature", section="competition_int",
             synopsis_es="Thriller de terror de Hong Kong sobre un par de mujeres."),
        dict(title="Lockout", director="Ricardo Islas", country="EEUU",
             production_year=2006, runtime=90, type="feature", section="competition_int",
             synopsis_es="Terror estadounidense de Ricardo Islas."),
        dict(title="The Dark Hours", director="Paul Fox", country="Canadá",
             production_year=2005, runtime=80, type="feature", section="competition_int",
             synopsis_es="Thriller psicológico canadiense."),
        dict(title="The Great Yokai War", director="Takashi Miike", country="Japón",
             production_year=2005, runtime=124, type="feature", section="competition_int",
             synopsis_es="Un niño es elegido guerrero en la guerra entre los yōkai."),
        dict(title="TL-1: Mi Reino por un Platillo Volador", director="Tetsuo Lumière", country="Argentina",
             production_year=2004, runtime=112, type="feature", section="competition_int",
             synopsis_es="Comedia de ciencia ficción argentina."),
    ]
    for w in works_ii:
        upsert_work(e, **w)
    print(f"Edition II (2007): {len(works_ii)} works seeded.")
else:
    print("Edition 2007 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition III — 2008
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2008)
if e:
    e.description_es = (
        "Tercera edición, 16–23 de mayo de 2008, Cine Universitario. "
        "22 largometrajes, 40 cortometrajes, 14 países. "
        "Mejor Película: The Man from Earth (USA, Richard Schenkman). "
        "Mejor Latinoamericana: Filmatrón (Argentina, Pablo Parés)."
    )
    e.description_en = (
        "Third edition, May 16–23, 2008, Cine Universitario. "
        "22 features, 40 shorts, 14 countries. "
        "Best Film: The Man from Earth (USA, Richard Schenkman). "
        "Best Latin American: Filmatrón (Argentina, Pablo Parés)."
    )
    e.save()

    works_iii = [
        dict(title="The Man from Earth", director="Richard Schenkman", country="EEUU",
             production_year=2007, runtime=88, type="feature", section="competition_int",
             synopsis_es="Un académico revela a sus amigos que ha vivido 14.000 años. Debate intelectual de ciencia ficción."),
        dict(title="Filmatrón", director="Pablo Parés", country="Argentina",
             production_year=2007, runtime=94, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción y humor argentino."),
        dict(title="Carnal", director="Fabián Forte", country="Argentina",
             production_year=2007, runtime=81, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Crepúsculum", director="Gabriel Grieco", country="Argentina",
             production_year=2007, runtime=61, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Currículum", director="Patricio Valladares", country="Chile",
             production_year=2006, runtime=61, type="feature", section="competition_int",
             synopsis_es="Terror chileno."),
        dict(title="Dark Remains", director="Brian Avenet-Bradley", country="EEUU",
             production_year=2005, runtime=91, type="feature", section="competition_int",
             synopsis_es="Terror estadounidense."),
        dict(title="Death Knows Your Name", director="Daniel de la Vega", country="Argentina",
             production_year=2007, runtime=89, type="feature", section="competition_int",
             synopsis_es="Terror argentino de Daniel de la Vega."),
        dict(title="Doctor Infierno", director="Paco Limón", country="España",
             production_year=2007, runtime=84, type="feature", section="competition_int",
             synopsis_es="Terror español."),
        dict(title="El Propietario", director="Diment/Ziembrowski", country="Argentina",
             production_year=2007, runtime=77, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Fausta", director="Ernesto Aguilar", country="Argentina",
             production_year=2007, runtime=69, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Mati", director="Melo/Di Paolo/Rodríguez", country="Uruguay",
             production_year=2008, runtime=52, type="medium", section="competition_nat",
             synopsis_es="Cortometraje/mediometraje de terror uruguayo."),
        dict(title="Nocturnos", director="Medina/Ricciardi/Vitullo", country="Argentina",
             production_year=2008, runtime=110, type="feature", section="competition_int",
             synopsis_es="Antología de terror argentina."),
        dict(title="Próxima", director="Carlos Atanes", country="España",
             production_year=2007, runtime=115, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción experimental española."),
        dict(title="Song of the Dead", director="Chip Gubera", country="EEUU",
             production_year=2005, runtime=87, type="feature", section="competition_int",
             synopsis_es="Comedia de zombis musical."),
        dict(title="The Day of the Dead", director="Ricardo Islas", country="EEUU",
             production_year=2007, runtime=102, type="feature", section="competition_int",
             synopsis_es="Remake del clásico de Romero dirigida por Ricardo Islas."),
        dict(title="The Last Gateway", director="Demian Rugna", country="Argentina",
             production_year=2007, runtime=105, type="feature", section="competition_int",
             synopsis_es="Terror argentino de Demian Rugna."),
    ]
    for w in works_iii:
        upsert_work(e, **w)
    print(f"Edition III (2008): {len(works_iii)} works seeded.")
else:
    print("Edition 2008 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition IV — 2009
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2009)
if e:
    e.description_es = (
        "Cuarta edición, culminó el 22 de mayo de 2009. "
        "Aproximadamente 100 obras, 20 países. "
        "Mejor Película: Altar (Filipinas, Rico María Ilarde). "
        "Mejor Latinoamericana: No Moriré Sola (Argentina, Adrián García Bogliano)."
    )
    e.description_en = (
        "Fourth edition, concluded May 22, 2009. "
        "Approximately 100 works, 20 countries. "
        "Best Film: Altar (Philippines, Rico María Ilarde). "
        "Best Latin American: No Moriré Sola (Argentina, Adrián García Bogliano)."
    )
    e.save()

    works_iv = [
        dict(title="Altar", director="Rico María Ilarde", country="Filipinas",
             production_year=2007, runtime=90, type="feature", section="competition_int",
             synopsis_es="Película de terror filipino ganadora del festival."),
        dict(title="No Moriré Sola", director="Adrián García Bogliano", country="Argentina",
             production_year=2008, runtime=84, type="feature", section="competition_int",
             synopsis_es="Dos chicas son atrapadas por un asesino en el campo argentino."),
        dict(title="Academy of Doom", director="Chip Gubera", country="EEUU",
             production_year=2008, runtime=85, type="feature", section="competition_int",
             synopsis_es="Comedia de terror estadounidense."),
        dict(title="La Balada de Vlad Tepes", director="Guzmán Vila", country="Uruguay",
             production_year=2009, runtime=90, type="feature", section="competition_nat",
             synopsis_es="Largometraje de terror nacional con temática vampírica."),
        dict(title="La Granja", director="Ernesto Aguilar", country="Argentina",
             production_year=2008, runtime=88, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Morgue Story", director="Paulo Biscaia Filho", country="Brasil",
             production_year=2009, runtime=78, type="feature", section="competition_int",
             synopsis_es="Terror brasileño de Paulo Biscaia Filho."),
        dict(title="Mangue Negro (Mud Zombies)", director="Rodrigo Aragão", country="Brasil",
             production_year=2008, runtime=105, type="feature", section="competition_int",
             synopsis_es="En las costas del Nordeste de Brasil, la contaminación ambiental desata una plaga de muertos vivientes."),
        dict(title="Muñeco Viviente V", director="Maxi Contenti", country="Uruguay",
             production_year=2008, runtime=90, type="feature", section="competition_nat",
             synopsis_es="Quinta entrega de la saga nacional de terror."),
        dict(title="Nadie Inquietó Más: Narciso Ibáñez Menta", director="Gustavo Mendoza", country="Argentina",
             production_year=2008, runtime=105, type="feature", section="panorama",
             synopsis_es="Documental sobre el legendario actor de terror uruguayo-argentino."),
        dict(title="Shadowland", director="Wyatt Weed", country="EEUU",
             production_year=2009, runtime=99, type="feature", section="competition_int",
             synopsis_es="Terror psicológico estadounidense."),
        dict(title="Sonámbulos", director="Christian Aylwin", country="Chile",
             production_year=2009, runtime=71, type="feature", section="competition_int",
             synopsis_es="Terror chileno."),
        dict(title="Yesterday", director="Rob Grant", country="Canadá",
             production_year=2009, runtime=98, type="feature", section="competition_int",
             synopsis_es="Thriller canadiense de zombis donde los muertos vivientes no son el mayor peligro."),
    ]
    for w in works_iv:
        upsert_work(e, **w)
    print(f"Edition IV (2009): {len(works_iv)} works seeded.")
else:
    print("Edition 2009 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition V — 2010
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2010)
if e:
    e.description_es = (
        "Quinta edición, 2010. "
        "Mejor Película: Strigoi (Reino Unido, Faye Jackson). "
        "Mejor Latinoamericana: TL-2: La Felicidad es una Leyenda Urbana (Argentina, Tetsuo Lumière)."
    )
    e.description_en = (
        "Fifth edition, 2010. "
        "Best Film: Strigoi (UK, Faye Jackson). "
        "Best Latin American: TL-2: La Felicidad es una Leyenda Urbana (Argentina, Tetsuo Lumière)."
    )
    e.save()

    works_v = [
        dict(title="Strigoi", director="Faye Jackson", country="Reino Unido",
             production_year=2009, runtime=101, type="feature", section="competition_int",
             synopsis_es="Un joven regresa a su pueblo natal en Rumanía y descubre que el terrateniente local se ha convertido en un vampiro comunista."),
        dict(title="TL-2: La Felicidad es una Leyenda Urbana", director="Tetsuo Lumière", country="Argentina",
             production_year=2009, runtime=85, type="feature", section="competition_int",
             synopsis_es="Secuela de la comedia de ciencia ficción argentina."),
        dict(title="Abandonados", director="David Contreras", country="Chile",
             production_year=2009, runtime=90, type="feature", section="competition_int",
             synopsis_es="Terror chileno."),
        dict(title="Porto dos Mortos (Beyond the Grave)", director="Davi de Oliveira Pinheiro", country="Brasil",
             production_year=2010, runtime=85, type="feature", section="competition_int",
             synopsis_es="Post-apocalíptico brasileño de terror. Un oficial persigue a un demonio que posee cuerpos."),
        dict(title="El Monstro del Mar!", director="Stuart Simpson", country="Australia",
             production_year=2010, runtime=75, type="feature", section="competition_int",
             synopsis_es="Terror australiano de serie B."),
        dict(title="Humanimal", director="Francesc Morales", country="Chile",
             production_year=2010, runtime=82, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción chilena."),
        dict(title="La Pantera Negra", director="Iyari Wertta", country="México",
             production_year=2010, runtime=108, type="feature", section="competition_int",
             synopsis_es="Terror mexicano."),
        dict(title="Molina's Ferozz", director="Jorge Molina", country="Costa Rica/Cuba",
             production_year=2010, runtime=71, type="feature", section="competition_int",
             synopsis_es="Reinterpretación latinoamericana del cuento de Caperucita Roja."),
        dict(title="Recortadas", director="Sebastián De Caro", country="Argentina",
             production_year=2009, runtime=76, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Stingray Sam", director="Cory McAbee", country="EEUU",
             production_year=2009, runtime=61, type="feature", section="competition_int",
             synopsis_es="Musical de ciencia ficción western."),
        dict(title="They Want My Eyes", director="Sergio Esquenazi", country="Argentina/EEUU",
             production_year=2009, runtime=73, type="feature", section="competition_int",
             synopsis_es="Terror argentino-americano."),
        dict(title="The Life and Death of a Porno Gang", director="Mladen Djordjevic", country="Serbia",
             production_year=2009, runtime=107, type="feature", section="competition_int",
             synopsis_es="Terror transgresor serbio."),
        dict(title="Transmission", director="Roland Vranik", country="Hungría",
             production_year=2009, runtime=89, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción húngara."),
        dict(title="Zone of the Dead", director="Todorovic/Konjevic", country="España/Italia/Serbia",
             production_year=2009, runtime=102, type="feature", section="competition_int",
             synopsis_es="Terror de zombis serbio-español."),
    ]
    for w in works_v:
        upsert_work(e, **w)
    print(f"Edition V (2010): {len(works_v)} works seeded.")
else:
    print("Edition 2010 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition VI — 2011
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2011)
if e:
    e.description_es = (
        "Sexta edición, 12–18 de octubre de 2011. Más de 20 países, 30 largometrajes, ~50 cortometrajes. "
        "Mejor Película: Die Farbe (Alemania, Huan Vu). "
        "Mejor Latinoamericana: Alucardos (México, Ulises Guzmán). "
        "Premio del Público: Toque de Queda (Guatemala)."
    )
    e.description_en = (
        "Sixth edition, October 12–18, 2011. Over 20 countries, 30 features, ~50 shorts. "
        "Best Film: Die Farbe (Germany, Huan Vu). "
        "Best Latin American: Alucardos (Mexico, Ulises Guzmán). "
        "Audience Award: Toque de Queda (Guatemala)."
    )
    e.save()

    works_vi = [
        dict(title="Die Farbe (El Color que Cayó del Cielo)", director="Huan Vu", country="Alemania",
             production_year=2010, runtime=85, type="feature", section="competition_int",
             synopsis_es="Adaptación del cuento de Lovecraft 'El color que cayó del espacio'. En blanco y negro y sepia."),
        dict(title="Alucardos", director="Ulises Guzmán", country="México",
             production_year=2010, runtime=89, type="feature", section="competition_int",
             synopsis_es="Comedia de vampiros mexicana."),
        dict(title="Toque de Queda", director="Desconocido", country="Guatemala",
             production_year=2011, runtime=96, type="feature", section="competition_int",
             synopsis_es="Terror guatemalteco. Premio del Público."),
        dict(title="1", director="Pater Sparrow", country="Hungría",
             production_year=2009, runtime=90, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción húngara."),
        dict(title="Alas", director="Ariel Martínez Herrera", country="Argentina",
             production_year=2010, runtime=67, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="De Día y de Noche", director="Alejandro Molina", country="México",
             production_year=2010, runtime=96, type="feature", section="competition_int",
             synopsis_es="Terror mexicano."),
        dict(title="El Último Fin de Semana", director="Norberto Ramos del Val", country="España/Suecia",
             production_year=2011, runtime=82, type="feature", section="competition_int",
             synopsis_es="Terror sueco-español."),
        dict(title="Krokodyle", director="Stéfano Bessoni", country="Italia",
             production_year=2010, runtime=78, type="feature", section="competition_int",
             synopsis_es="Terror italiano de Stéfano Bessoni."),
        dict(title="La Noche del Chupacabras", director="Rodrigo Aragão", country="Brasil",
             production_year=2011, runtime=107, type="feature", section="competition_int",
             synopsis_es="Eco-terror brasileño de Rodrigo Aragão. La codicia humana despierta al chupacabras."),
        dict(title="The Whisperer in Darkness", director="Sean Branney", country="EEUU",
             production_year=2011, runtime=103, type="feature", section="competition_int",
             synopsis_es="Adaptación de Lovecraft en blanco y negro al estilo del cine clásico de los años 30."),
        dict(title="True Nature", director="Patrick Steele", country="EEUU",
             production_year=2010, runtime=91, type="feature", section="competition_int",
             synopsis_es="Terror estadounidense."),
        dict(title="Un Ovni Sobre Mi Cama", director="Pablo Oliverio", country="Argentina",
             production_year=2011, runtime=120, type="feature", section="competition_int",
             synopsis_es="Comedia de ciencia ficción argentina."),
        dict(title="Villa Estrella", director="Rico María Ilarde", country="Filipinas",
             production_year=2009, runtime=97, type="feature", section="competition_int",
             synopsis_es="Terror filipino."),
        dict(title="Detrás del Horror", director="Diego Adrián de Llano", country="Argentina",
             production_year=2011, runtime=91, type="feature", section="competition_int",
             synopsis_es="Documental argentino sobre cine de terror."),
        dict(title="Incidente", director="Mariano Cattaneo", country="Argentina",
             production_year=2010, runtime=71, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="Lluvia de Luna", director="Maryse Sistach", country="México",
             production_year=2011, runtime=91, type="feature", section="competition_int",
             synopsis_es="Terror mexicano."),
        dict(title="Marihuana Radioactiva", director="Marcelo Leguiza", country="Argentina",
             production_year=2010, runtime=82, type="feature", section="competition_int",
             synopsis_es="Terror/comedia argentina."),
        dict(title="Muerte Ciega", director="Rojas/Toledo", country="Chile",
             production_year=2011, runtime=82, type="feature", section="competition_int",
             synopsis_es="Terror chileno."),
        dict(title="Post: La Aventura Completa", director="Parés/Rojas", country="Argentina",
             production_year=2010, runtime=88, type="feature", section="competition_int",
             synopsis_es="Aventura fantástica argentina."),
        dict(title="Sadomaster: Locura General", director="Germán Magariños", country="Argentina",
             production_year=2011, runtime=70, type="feature", section="competition_int",
             synopsis_es="Comedia de acción argentina."),
        dict(title="Trash", director="Alejo Rébora", country="Argentina",
             production_year=2010, runtime=68, type="feature", section="competition_int",
             synopsis_es="Terror argentino de Alejo Rébora."),
    ]
    for w in works_vi:
        upsert_work(e, **w)
    print(f"Edition VI (2011): {len(works_vi)} works seeded.")
else:
    print("Edition 2011 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition VII — 2012
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2012)
if e:
    e.description_es = (
        "Séptima edición, 21–25 de noviembre de 2012. ~13 países, ~30 largometrajes, ~30 cortometrajes. "
        "Mejor Película: Nervio Craneal Cero (Brasil, Paulo Biscaia Filho). "
        "Mejor Director: Todd E. Freeman (Cell Count). "
        "Mejor Iberoamericana: Goretech (Argentina, Germán Magariños). "
        "Premio del Público: Topos y Ballena Blanca (Argentina)."
    )
    e.description_en = (
        "Seventh edition, November 21–25, 2012. ~13 countries, ~30 features, ~30 shorts. "
        "Best Film: Nervio Craneal Cero (Brazil, Paulo Biscaia Filho). "
        "Best Director: Todd E. Freeman (Cell Count). "
        "Best Iberoamerican: Goretech (Argentina, Germán Magariños). "
        "Audience: Topos and Ballena Blanca (Argentina)."
    )
    e.save()

    works_vii = [
        dict(title="Nervio Craneal Cero", director="Paulo Biscaia Filho", country="Brasil",
             production_year=2012, runtime=88, type="feature", section="competition_int",
             synopsis_es="Cine de terror experimental y visceral de Paulo Biscaia Filho."),
        dict(title="Cell Count", director="Todd E. Freeman", country="EEUU",
             production_year=2012, runtime=96, type="feature", section="competition_int",
             synopsis_es="Terror de ciencia ficción. Un hombre somete a su esposa enferma a un tratamiento experimental clandestino."),
        dict(title="Goretech", director="Germán Magariños", country="Argentina",
             production_year=2012, runtime=77, type="feature", section="competition_int",
             synopsis_es="Thriller de acción con toques fantásticos, ganadora del premio iberoamericano."),
        dict(title="Topos", director="Emiliano Romero", country="Argentina",
             production_year=2012, runtime=100, type="feature", section="competition_int",
             synopsis_es="Terror fantástico argentino. Premio del Público."),
        dict(title="Altered States of Plaine", director="Nick Gaglia", country="EEUU",
             production_year=2012, runtime=88, type="feature", section="competition_int",
             synopsis_es="Terror experimental estadounidense."),
        dict(title="Drácula 0.9", director="Schargorodsky", country="España",
             production_year=2012, runtime=81, type="feature", section="competition_int",
             synopsis_es="Comedia de vampiros española."),
        dict(title="En las Afueras de la Ciudad", director="Patricio Valladares", country="Chile",
             production_year=2012, runtime=96, type="feature", section="competition_int",
             synopsis_es="Terror chileno de Patricio Valladares."),
        dict(title="Frankenstein: Day of the Beast", director="Ricardo Islas", country="EEUU",
             production_year=2011, runtime=92, type="feature", section="competition_int",
             synopsis_es="Nueva versión del clásico de Mary Shelley."),
        dict(title="¡Malditos Sean!", director="Rugna/Forte", country="Argentina",
             production_year=2011, runtime=119, type="feature", section="competition_int",
             synopsis_es="Antología de terror argentino de Demian Rugna y Fabián Forte."),
        dict(title="Pushin' Up Daisies", director="Patrick Franklin", country="EEUU",
             production_year=2010, runtime=87, type="feature", section="competition_int",
             synopsis_es="Terror estadounidense."),
        dict(title="Reacciones Adversas", director="David Michan", country="México",
             production_year=2011, runtime=74, type="feature", section="competition_int",
             synopsis_es="Terror mexicano."),
        dict(title="Ballena Blanca", director="Cardini/DiStéfano", country="Argentina",
             production_year=2011, runtime=52, type="medium", section="competition_int",
             synopsis_es="Mediometraje fantástico argentino. Premio del Público."),
        dict(title="Carne Cruda", director="Tirso Calero", country="España",
             production_year=2010, runtime=90, type="feature", section="competition_int",
             synopsis_es="Terror español."),
        dict(title="Sonríe", director="Marcelo Leguiza", country="Argentina",
             production_year=2012, runtime=86, type="feature", section="competition_int",
             synopsis_es="Terror argentino de Marcelo Leguiza."),
        dict(title="Supay", director="José Guerrero Urzúa", country="Chile",
             production_year=2012, runtime=103, type="feature", section="competition_int",
             synopsis_es="Terror chileno basado en mitología andina."),
        dict(title="Somos lo que Hay", director="Jorge Michel Grau", country="México",
             production_year=2010, runtime=89, type="feature", section="competition_int",
             synopsis_es="Terror mexicano sobre una familia caníbal."),
    ]
    for w in works_vii:
        upsert_work(e, **w)
    print(f"Edition VII (2012): {len(works_vii)} works seeded.")
else:
    print("Edition 2012 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition VIII — 2013
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2013)
if e:
    e.description_es = (
        "Octava edición, 9–15 de diciembre de 2013, Cine Universitario. "
        "Más de 20 largometrajes, 50 cortometrajes, 16 países, 6 días, 2 salas. "
        "Mejor Película y Mejor Guión: El Cosmonauta (España/Letonia/Rusia, Nicolás Alcalá). "
        "Mejor Director: David León Sofía (Sin Señal). "
        "Mejor Actor: Zaid Baqaeen (When Time Becomes a Woman). "
        "Mejor Actriz: Jasna Kohoutova (Chimères/Quimeras). "
        "Mejor Iberoamericana: Volver a Morir (Colombia, Miguel Urrutia)."
    )
    e.description_en = (
        "Eighth edition, December 9–15, 2013, Cine Universitario. "
        "20+ features, 50+ shorts, 16 countries, 6 days, 2 screens. "
        "Best Film & Best Screenplay: El Cosmonauta (Spain/Latvia/Russia, Nicolás Alcalá). "
        "Best Director: David León Sofía (Sin Señal). "
        "Best Actor: Zaid Baqaeen (When Time Becomes a Woman). "
        "Best Actress: Jasna Kohoutova (Chimères/Quimeras). "
        "Best Iberoamerican: Volver a Morir (Colombia, Miguel Urrutia)."
    )
    e.save()

    works_viii = [
        dict(title="El Cosmonauta", director="Nicolás Alcalá", country="España/Letonia/Rusia",
             production_year=2013, runtime=96, type="feature", section="competition_int",
             synopsis_es="Un cosmonauta soviético es enviado al espacio y regresa cambiado, con algo desconocido adherido a él. Producida de forma colaborativa a través de internet."),
        dict(title="Chimères (Quimeras)", director="Olivier Beguin", country="Suiza",
             production_year=2013, runtime=79, type="feature", section="competition_int",
             synopsis_es="Un hombre necesita transfusiones de sangre de vampiro para sobrevivir."),
        dict(title="Sin Señal", director="David León Sofía", country="Argentina",
             production_year=2012, runtime=68, type="feature", section="competition_int",
             synopsis_es="Terror argentino de David León Sofía."),
        dict(title="When Time Becomes a Woman", director="Ahmad Alyaseer", country="Jordania",
             production_year=2012, runtime=73, type="feature", section="competition_int",
             synopsis_es="Drama de terror jordano."),
        dict(title="Buscando la Esfera del Poder", director="Tetsuo Lumière", country="Argentina",
             production_year=2013, runtime=110, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción argentina de Tetsuo Lumière."),
        dict(title="Frankenstein No Asusta en Colombia", director="Erik Zúñiga", country="Colombia",
             production_year=2013, runtime=63, type="feature", section="competition_int",
             synopsis_es="Comedia de terror colombiana."),
        dict(title="Gut", director="Elias", country="EEUU",
             production_year=2012, runtime=90, type="feature", section="competition_int",
             synopsis_es="Thriller psicológico de terror."),
        dict(title="Mar Negro", director="Rodrigo Aragão", country="Brasil",
             production_year=2013, runtime=99, type="feature", section="competition_int",
             synopsis_es="Eco-terror brasileño. La contaminación marina desata una plaga de muertos vivientes en el litoral nordestino."),
        dict(title="El Peso de la Culpa", director="Ariel Sanna", country="Argentina",
             production_year=2012, runtime=91, type="feature", section="competition_int",
             synopsis_es="Terror psicológico argentino."),
        dict(title="KV 62", director="Marcelo Leguiza", country="Argentina",
             production_year=2013, runtime=87, type="feature", section="competition_int",
             synopsis_es="Terror argentino sobre una tumba egipcia."),
        dict(title="Sonno Profondo", director="Luciano Onetti", country="Argentina",
             production_year=2013, runtime=65, type="feature", section="competition_int",
             synopsis_es="Giallo argentino. Premio del Público Iberoamericana."),
        dict(title="Trash Dos: Las Tetas de Ana L.", director="Alejo Rébora", country="Argentina",
             production_year=2013, runtime=88, type="feature", section="competition_int",
             synopsis_es="Terror/comedia argentina de Alejo Rébora."),
        dict(title="Volver a Morir", director="Miguel Urrutia", country="Colombia",
             production_year=2012, runtime=84, type="feature", section="competition_int",
             synopsis_es="Terror colombiano ganador de la Mejor Película Iberoamericana."),
        dict(title="Zombio 2: Chimarrao Zombies", director="Petter Baiestorf", country="Brasil",
             production_year=2013, runtime=84, type="feature", section="competition_int",
             synopsis_es="Terror de serie B brasileño."),
        dict(title="Adormecidos", director="Metlikovec", country="Argentina",
             production_year=2012, runtime=98, type="feature", section="panorama",
             synopsis_es="Terror argentino en muestra informativa."),
        dict(title="Curas Zombies en Azul", director="Osvaldo Sudak", country="Argentina",
             production_year=2013, runtime=80, type="feature", section="panorama",
             synopsis_es="Comedia de zombis argentina."),
        dict(title="Hijos de Puta por Elección", director="Georgina Zanardi", country="Argentina",
             production_year=2013, runtime=82, type="feature", section="panorama",
             synopsis_es="Largometraje de Georgina Zanardi."),
    ]
    for w in works_viii:
        upsert_work(e, **w)
    print(f"Edition VIII (2013): {len(works_viii)} works seeded.")
else:
    print("Edition 2013 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition IX — 2015
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2015)
if e:
    e.description_es = (
        "Novena edición, 2–6 de septiembre de 2015, Cine Universitario del Uruguay. "
        "~100 obras, 22 países, 5 días, 2 salas. "
        "Mejor Película (4 premios): La Casa del Fin de los Tiempos (Venezuela, Alejandro Hidalgo). "
        "Mejor Director: Alejandro Hidalgo. "
        "Mejor Actor: Glenn Maynard (Chocolate, Strawberry, Vanilla). "
        "Mejor Actriz: Ruddy Rodríguez (La Casa del Fin de los Tiempos). "
        "Mejor Guión: Dimitris Bavellas (Runaway Day). "
        "Premio del Público: Chocolate, Strawberry, Vanilla (Australia). "
        "Premio Iberoamericano del Público: Impétigo (Uruguay, Silvia Antúnez)."
    )
    e.description_en = (
        "Ninth edition, September 2–6, 2015, Cine Universitario del Uruguay. "
        "~100 works, 22 countries, 5 days, 2 screens. "
        "Best Film (4 awards): La Casa del Fin de los Tiempos (Venezuela, Alejandro Hidalgo). "
        "Best Director: Alejandro Hidalgo. "
        "Best Actor: Glenn Maynard (Chocolate, Strawberry, Vanilla). "
        "Best Actress: Ruddy Rodríguez (La Casa del Fin de los Tiempos). "
        "Best Screenplay: Dimitris Bavellas (Runaway Day). "
        "Audience Award: Chocolate, Strawberry, Vanilla (Australia). "
        "Iberoamerican Audience: Impétigo (Uruguay, Silvia Antúnez)."
    )
    e.save()

    works_ix = [
        dict(title="La Casa del Fin de los Tiempos", director="Alejandro Hidalgo", country="Venezuela",
             production_year=2013, runtime=101, type="feature", section="competition_int",
             synopsis_es="Una madre es encarcelada acusada de asesinar a su familia en una vieja mansión. 30 años después regresa a la misma casa y descubre la verdad sobrenatural."),
        dict(title="Chocolate, Strawberry, Vanilla", director="Stuart Simpson", country="Australia",
             production_year=2014, runtime=77, type="feature", section="competition_int",
             synopsis_es="Un vendedor ambulante de helados relata su trágica historia de obsesión y venganza. Terror australiano."),
        dict(title="Corazón Muerto", director="Mariano Cattaneo", country="Argentina",
             production_year=2014, runtime=75, type="feature", section="competition_int",
             synopsis_es="Terror argentino."),
        dict(title="El Círculo de Raynard", director="Valle/Vidal", country="España",
             production_year=2014, runtime=92, type="feature", section="competition_int",
             synopsis_es="Terror español."),
        dict(title="Fábulas Negras", director="Aragão/Baiestorf/Caetano/Mojica Marins", country="Brasil",
             production_year=2014, runtime=93, type="feature", section="competition_int",
             synopsis_es="Antología de terror brasileña con Zé do Caixão."),
        dict(title="Runaway Day", director="Dimitris Bavellas", country="Grecia",
             production_year=2013, runtime=83, type="feature", section="competition_int",
             synopsis_es="Terror griego. Guionista Dimitris Bavellas ganó Mejor Guión."),
        dict(title="Solos a Bordo", director="Jean-François Guay", country="Bélgica",
             production_year=2013, runtime=93, type="feature", section="competition_int",
             synopsis_es="Terror belga."),
        dict(title="The Sacrifice", director="Ricardo Islas", country="EEUU",
             production_year=2015, runtime=111, type="feature", section="competition_int",
             synopsis_es="Terror de Ricardo Islas."),
        dict(title="Impétigo", director="Silvia Antúnez", country="Uruguay",
             production_year=2014, runtime=78, type="feature", section="competition_nat",
             synopsis_es="Largometraje uruguayo de terror. Premio del Público Iberoamericana."),
        dict(title="El Onanista Perturbado", director="Georgina Zanardi", country="Argentina",
             production_year=2014, runtime=61, type="feature", section="panorama",
             synopsis_es="Largometraje de Georgina Zanardi."),
        dict(title="Historias de Nunca Acabar", director="Catanzaro/Miani/Moreno", country="Argentina",
             production_year=2014, runtime=64, type="feature", section="panorama",
             synopsis_es="Antología de terror argentina."),
        dict(title="Los Súper Bonaerenses", director="Germán Magariños", country="Argentina",
             production_year=2014, runtime=84, type="feature", section="panorama",
             synopsis_es="Comedia de superhéroes argentina."),
        dict(title="Ulises", director="Abel Amador Alcalá", country="México",
             production_year=2013, runtime=97, type="feature", section="panorama",
             synopsis_es="Terror mexicano."),
    ]
    for w in works_ix:
        upsert_work(e, **w)
    print(f"Edition IX (2015): {len(works_ix)} works seeded.")
else:
    print("Edition 2015 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition X — 2017
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2017)
if e:
    e.description_es = (
        "Décima edición, 6–13 de diciembre de 2017. 8 días, 2 ciudades (Montevideo y San Carlos/Maldonado), "
        "5 salas, ~30 largometrajes, 70+ cortometrajes, ~40 países. "
        "Mejor Película: Aterrados (Argentina, Demian Rugna). "
        "Mejor Director: Gyula Nemes (Zero). "
        "Mejor Guión: Laura Casabé, Lisandro Bera (La Valija de Benavidez). "
        "Mejor Actor: Maxi Ghione (Aterrados). "
        "Mejor Actriz: Jeanne Heckmann-Adam (Nathaly Furiosa). "
        "Premio del Público: Tacuaremboense Inmortal (Uruguay, Fabricio Camargo/Jimena Crujeira)."
    )
    e.description_en = (
        "Tenth edition, December 6–13, 2017. 8 days, 2 cities (Montevideo and San Carlos/Maldonado), "
        "5 venues, ~30 features, 70+ shorts, ~40 countries. "
        "Best Film: Aterrados (Argentina, Demian Rugna). "
        "Best Director: Gyula Nemes (Zero). "
        "Best Screenplay: Laura Casabé, Lisandro Bera (La Valija de Benavidez). "
        "Best Actor: Maxi Ghione (Aterrados). "
        "Best Actress: Jeanne Heckmann-Adam (Nathaly Furiosa). "
        "Audience Award: Tacuaremboense Inmortal (Uruguay, Fabricio Camargo/Jimena Crujeira)."
    )
    e.save()

    works_x = [
        dict(title="Aterrados", director="Demian Rugna", country="Argentina",
             production_year=2017, runtime=88, type="feature", section="competition_int",
             synopsis_es="Fenómenos paranormales aterrorizan un barrio de Buenos Aires mientras un investigador, un médico forense y un científico tratan de encontrar una explicación."),
        dict(title="Zero", director="Gyula Nemes", country="Alemania/Hungría/República Checa",
             production_year=2015, runtime=83, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción. Un hombre sin hogar descubre que ha perdido su identidad."),
        dict(title="La Valija de Benavidez", director="Laura Casabé", country="Argentina/México",
             production_year=2016, runtime=80, type="feature", section="competition_int",
             synopsis_es="Una joven hereda una valija que pertenece a una mujer muerta en el siglo XIX."),
        dict(title="Tacuaremboense Inmortal", director="Fabricio Camargo/Jimena Crujeira", country="Uruguay",
             production_year=2017, runtime=105, type="feature", section="competition_int",
             synopsis_es="Comedia de terror uruguaya sobre una heroína inmortal. Premio del Público."),
        dict(title="13 Dolls in Darkness", director="Zeda Müller", country="Australia",
             production_year=2017, runtime=76, type="feature", section="competition_int",
             synopsis_es="Terror atmosférico australiano."),
        dict(title="El Archipiélago", director="Benoit Maestre", country="Francia",
             production_year=2016, runtime=83, type="feature", section="competition_int",
             synopsis_es="Terror francés."),
        dict(title="El Maleficio de la Serpiente", director="Addison Heath/Jasmine Jakupi", country="Japón",
             production_year=2017, runtime=90, type="feature", section="competition_int",
             synopsis_es="Terror japonés filmado con estética tradicional."),
        dict(title="Nathaly Furiosa", director="Juan José Cea Escobar", country="Canadá",
             production_year=2015, runtime=91, type="feature", section="competition_int",
             synopsis_es="Terror canadiense. Jeanne Heckmann-Adam ganó Mejor Actriz."),
        dict(title="Noche", director="Inti Carrizo-Ortiz", country="Chile",
             production_year=2017, runtime=89, type="feature", section="competition_int",
             synopsis_es="Terror chileno."),
        dict(title="Los Olvidados", director="Luciano Onetti/Nicolás Onetti", country="Argentina",
             production_year=2017, runtime=98, type="feature", section="competition_int",
             synopsis_es="Western de terror argentino estilo spaghetti. Mención especial: Elvira Onetto y Mirta Busnelli."),
        dict(title="Tangent Room", director="Björn Engström", country="Suecia",
             production_year=2017, runtime=66, type="feature", section="competition_int",
             synopsis_es="Ciencia ficción sueca. Cuatro científicos están atrapados en un cuarto infinito."),
        dict(title="Virgin Cheerleaders in Chains", director="Paulo Biscaia Filho/Gary McClain Gannaway", country="EEUU",
             production_year=2017, runtime=94, type="feature", section="competition_int",
             synopsis_es="Terror de serie B coproducido por Brasil y EEUU."),
        dict(title="Culto al Terror", director="Gustavo Mendoza", country="Argentina/España/Nueva Zelanda",
             production_year=2017, runtime=114, type="feature", section="panorama",
             synopsis_es="Documental sobre el cine de terror hispanoparlante."),
        dict(title="En Realidad", director="Paul Gabriel-Hollweg", country="Bolivia",
             production_year=2016, runtime=142, type="feature", section="panorama",
             synopsis_es="Ciencia ficción boliviana de larga duración."),
        dict(title="Escaping the Dead", director="Pedersen/Sonntag", country="Dinamarca",
             production_year=2017, runtime=75, type="feature", section="panorama",
             synopsis_es="Terror de zombis danés."),
        dict(title="Fantasticozzi", director="Felipe M. Guerra", country="Brasil",
             production_year=2016, runtime=70, type="feature", section="panorama",
             synopsis_es="Documental brasileño sobre cine fantástico."),
        dict(title="The Theta Girl", director="Christopher Bickel", country="EEUU",
             production_year=2017, runtime=98, type="feature", section="panorama",
             synopsis_es="Terror psicodélico estadounidense."),
        dict(title="The Wake (El Velorio)", director="Gustavo Arteaga", country="Reino Unido",
             production_year=2017, runtime=62, type="feature", section="panorama",
             synopsis_es="Terror britànico dirigido por Gustavo Arteaga."),
        dict(title="Animal Moribus", director="Octavio Revol", country="Argentina",
             production_year=2017, runtime=68, type="feature", section="panorama",
             synopsis_es="Terror argentino."),
        dict(title="Astaroth", director="Larissa Anzoategui", country="Brasil",
             production_year=2017, runtime=75, type="feature", section="panorama",
             synopsis_es="Terror brasileño."),
        dict(title="La Lista de la Muerte", director="Miguel Torena", country="Uruguay",
             production_year=2016, runtime=100, type="feature", section="panorama",
             synopsis_es="Thriller uruguayo de Miguel Torena."),
        dict(title="La Máquina del Diablo", director="Edin Alain Martínez Aguirre", country="México",
             production_year=2017, runtime=80, type="feature", section="panorama",
             synopsis_es="Terror mexicano."),
        dict(title="El Silbón: Orígenes", director="Gisberg Bermúdez Molero", country="México/Venezuela",
             production_year=2017, runtime=78, type="feature", section="panorama",
             synopsis_es="Terror basado en la leyenda venezolana del Silbón."),
    ]
    for w in works_x:
        upsert_work(e, **w)
    print(f"Edition X (2017): {len(works_x)} works seeded.")
else:
    print("Edition 2017 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition XI — 2018
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2018)
if e:
    e.description_es = (
        "Undécima edición, comenzó en octubre de 2018 y se extendió hasta abril de 2019. "
        "La edición más extensa del festival: 6 meses. Múltiples salas en Montevideo e interior. "
        "Mejor Película: Lost in Apocalypse (China, Sky Wang). "
        "Mejor Director: Sky Wang. "
        "Mejor Guión: Rob Grant (Fake Blood). "
        "Mejor Actor: Jamie Cymbal (Polterheist). "
        "Mejor Actriz: Mahtab Dehghan (Mahtab, Irán). "
        "Mejor Latinoamericana: Mirada de Cristal (Argentina, Endelman/Montejano). "
        "Premio del Público: Abrakadabra (Argentina/Nueva Zelanda, Onetti)."
    )
    e.description_en = (
        "Eleventh edition, began October 2018 and ran until April 2019. "
        "The festival's longest edition: 6 months. Multiple venues in Montevideo and the interior. "
        "Best Film: Lost in Apocalypse (China, Sky Wang). "
        "Best Director: Sky Wang. "
        "Best Screenplay: Rob Grant (Fake Blood). "
        "Best Actor: Jamie Cymbal (Polterheist). "
        "Best Actress: Mahtab Dehghan (Mahtab, Iran). "
        "Best Latin American: Mirada de Cristal (Argentina, Endelman/Montejano). "
        "Audience Award: Abrakadabra (Argentina/New Zealand, Onetti)."
    )
    e.save()

    works_xi = [
        dict(title="Lost in Apocalypse (Perdidos en el Apocalipsis)", director="Sky Wang", country="China",
             production_year=2018, runtime=90, type="feature", section="competition_int",
             synopsis_es="Un virus encierra a un grupo de desconocidos en un hotel. Basado en una novela gráfica. Mejor Película y Mejor Director."),
        dict(title="Abrakadabra", director="Luciano Onetti/Nicolás Onetti", country="Argentina/Nueva Zelanda",
             production_year=2018, runtime=71, type="feature", section="competition_int",
             synopsis_es="Giallo de los hermanos Onetti. Un mago muere en un truco y 35 años después su hijo es sospechoso de asesinatos. Seleccionada para Cannes y Sitges."),
        dict(title="Atraco Fantasmal (Polterheist)", director="David Gilbank", country="Reino Unido",
             production_year=2018, runtime=86, type="feature", section="competition_int",
             synopsis_es="Dos ladrones secuestran a una médium para contactar al gánster que asesinaron. Comedia negra."),
        dict(title="Fake Blood (Sangre Falsa)", director="Rob Grant", country="Canadá",
             production_year=2017, runtime=81, type="feature", section="competition_int",
             synopsis_es="Docudrama sobre si los realizadores de terror son responsables por la violencia que muestran."),
        dict(title="Ghost Mask – Scar (La Máscara Fantasma: Cicatriz)", director="Takeshi Sone", country="Japón",
             production_year=2018, runtime=80, type="feature", section="competition_int",
             synopsis_es="Drama japonés que se convierte en terror. Una joven busca a su hermana desaparecida en Seúl."),
        dict(title="Mahtab", director="Vahid Pakzad", country="Irán",
             production_year=2017, runtime=86, type="feature", section="competition_int",
             synopsis_es="Filmada en un solo plano. Una joven recibe mensajes misteriosos que la obligan a cumplir fases. Primera película iraní en el festival."),
        dict(title="No Sabés con Quién Estás Hablando", director="Demian Rugna", country="Argentina",
             production_year=2016, runtime=95, type="feature", section="competition_int",
             synopsis_es="Comedia negra de Demian Rugna sobre dos hombres que planean provocarle un infarto a un gitano."),
        dict(title="The Psychics (Los Psíquicos)", director="Tomas Sem Løkke-Sørensen", country="Noruega",
             production_year=2018, runtime=73, type="feature", section="competition_int",
             synopsis_es="Una documentalista investiga psíquicos y descubre un caso sin resolver de 20 años. Terror found footage."),
        dict(title="Mirada de Cristal", director="Ezequiel Endelman/Leandro Montejano", country="Argentina",
             production_year=2017, runtime=81, type="feature", section="competition_int",
             synopsis_es="Buenos Aires, 1985. Los miembros de una agencia de modas son asesinados uno a uno. Giallo/slasher de alta factura técnica."),
        dict(title="El Bosque Negro (A Mata Negra)", director="Rodrigo Aragão", country="Brasil",
             production_year=2018, runtime=99, type="feature", section="competition_int",
             synopsis_es="Quinto largo de Rodrigo Aragão. Una joven encuentra el Libro de Cipriano y desata un mal en el Mato Grosso."),
        dict(title="Clementina", director="Jimena Monteoliva", country="Argentina",
             production_year=2017, runtime=89, type="feature", section="competition_int",
             synopsis_es="Una mujer golpeada regresa sola a su casa y no sabe si hay un fantasma, o si todo es su imaginación. Drama de violencia de género con elementos sobrenaturales."),
        dict(title="La Jaula", director="José Ignacio Salaverría", country="Venezuela",
             production_year=2017, runtime=82, type="feature", section="competition_int",
             synopsis_es="Primera película de ciencia ficción venezolana. La Tierra fue despoblada por una inteligencia superior."),
        dict(title="En la Esquina del Ojo (No Canto do Olho)", director="Sérgio Gomes", country="Brasil",
             production_year=2018, runtime=104, type="feature", section="competition_int",
             synopsis_es="Terror sobrenatural brasileño. Una pareja recién mudada padece fenómenos extraños."),
        dict(title="Trauma", director="Lucio A. Rojas", country="Chile",
             production_year=2017, runtime=107, type="feature", section="competition_int",
             synopsis_es="Chile, 1973. Lo que iba a ser un fin de semana en el campo para un grupo de mujeres se convierte en un encuentro con sombras del pasado dictatorial."),
        dict(title="Inner Ghosts (Fantasmas Interiores)", director="Paulo Leite", country="Portugal",
             production_year=2018, runtime=88, type="feature", section="panorama",
             synopsis_es="Una neuróloga realiza pruebas cognitivas con fantasmas benignos pero la cosa se complica."),
        dict(title="Tokusatsu Grindhouse", director="Bueno/Pablo Praino", country="Japón/Uruguay",
             production_year=2018, runtime=58, type="medium", section="panorama",
             synopsis_es="Coproducción uruguayo-japonesa. Doble programa de acción y fantasía con superhéroes orientales."),
    ]
    for w in works_xi:
        upsert_work(e, **w)
    print(f"Edition XI (2018): {len(works_xi)} works seeded.")
else:
    print("Edition 2018 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition XII — 2019
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2019)
if e:
    e.description_es = (
        "Duodécima edición, culminó el 28 de diciembre de 2019. 17 largometrajes, 52 cortos en competencia, "
        "71 cortos informativos, 140 trabajos totales, 12 días, 6 departamentos, 36 países. "
        "Mejor Película: Stay Out, Stay Alive (EEUU, Dean Yurke). "
        "Mejor Director: Thorsten Fleisch (Flesh City). "
        "Mejor Guión: Karabache/Kassem (Vortex). "
        "Mejor Actor: Julien Romano (Vortex). "
        "Mejor Actriz: Claudia Fortunato (Vortex). "
        "Mejor Latinoamericana: Diablo Rojo PTY (Panamá, Sol Moreno). "
        "Premio del Público Nacional: La Sospecha (Uruguay, Miguel Torena)."
    )
    e.description_en = (
        "Twelfth edition, concluded December 28, 2019. 17 features, 52 shorts in competition, "
        "71 informative shorts, 140 total works, 12 days, 6 departments, 36 countries. "
        "Best Film: Stay Out, Stay Alive (USA, Dean Yurke). "
        "Best Director: Thorsten Fleisch (Flesh City). "
        "Best Screenplay: Karabache/Kassem (Vortex). "
        "Best Actor: Julien Romano (Vortex). "
        "Best Actress: Claudia Fortunato (Vortex). "
        "Best Latin American: Diablo Rojo PTY (Panama, Sol Moreno). "
        "National Audience Award: La Sospecha (Uruguay, Miguel Torena)."
    )
    e.save()

    works_xii = [
        dict(title="Stay Out, Stay Alive", director="Dean Yurke", country="EEUU",
             production_year=2019, runtime=83, type="feature", section="competition_int",
             synopsis_es="Cinco excursionistas descubren una mina de oro abandonada y la codicia desata lo peor de ellos. Director de efectos de Star Wars, Harry Potter y Avatar."),
        dict(title="Vortex", director="Christophe Karabache", country="Francia",
             production_year=2019, runtime=83, type="feature", section="competition_int",
             synopsis_es="Un asesino y una bruja se encuentran en el campo. Película inclasificable del francés-libanés Karabache. Ganó Guión, Actor y Actriz."),
        dict(title="Flesh City", director="Thorsten Fleisch", country="Alemania",
             production_year=2019, runtime=85, type="feature", section="competition_int",
             synopsis_es="Un organismo en crecimiento infecta una ciudad tecno. Cyberpunk experimental rodada en 4 años con presupuesto de €2.000. Ya considerada un culto."),
        dict(title="Atacama", director="Enrique Bencomo", country="Venezuela",
             production_year=2019, runtime=67, type="feature", section="competition_int",
             synopsis_es="Tres historias convergen en el desierto de Atacama. Terror venezolano filmado en 21 días por 5 personas."),
        dict(title="Beneath the Trees (Bajo los Árboles)", director="Marco De Luca", country="Reino Unido",
             production_year=2019, runtime=76, type="feature", section="competition_int",
             synopsis_es="Un fin de semana de camping acaba en terror cuando una estudiante descubre que sus amigos no son lo que parecen. Premiada en EEUU y Holanda."),
        dict(title="Bullets of Justice", director="Valeri Milev", country="Bulgaria/Kazajistán",
             production_year=2019, runtime=76, type="feature", section="competition_int",
             synopsis_es="Post-apocalíptico: una raza de humanos-cerdo domina el mundo. Con Danny Trejo. Primera película kazaja en el festival."),
        dict(title="Diablo Rojo PTY", director="Sol Moreno", country="Panamá",
             production_year=2019, runtime=77, type="feature", section="competition_int",
             synopsis_es="Un chofer de autobús cae víctima de un hechizo en la selva de Chiriquí. La primera película de terror panameña. Mejor Latinoamericana."),
        dict(title="El Diablo Me Dijo Qué Hacer", director="Alejandro G. Alegre", country="México",
             production_year=2019, runtime=83, type="feature", section="competition_int",
             synopsis_es="Un joven secuestra a un médico corrupto para atormentarlo psicológicamente."),
        dict(title="Luz", director="Juan Diego Escobar Alzate", country="Colombia",
             production_year=2019, runtime=104, type="feature", section="competition_int",
             synopsis_es="En una comunidad aislada, la llegada de un supuesto mesías desata el mal. Seleccionada para Sitges."),
        dict(title="Rebobinado: La Película", director="Juan Francisco Otaño", country="Argentina",
             production_year=2018, runtime=101, type="feature", section="competition_int",
             synopsis_es="Un hombre descubre una vieja grabadora que lo transporta a 1998. Comedia retro fantástica argentina."),
        dict(title="Sorgalim", director="Romano/Taboada", country="Argentina",
             production_year=2018, runtime=81, type="feature", section="competition_int",
             synopsis_es="Una pareja se muda al campo tras un accidente. Algo sobrenatural comienza a rodearles. Demandó 4 años de producción."),
        dict(title="Vesanica", director="Lucas Gutiérrez", country="Argentina",
             production_year=2019, runtime=87, type="feature", section="competition_int",
             synopsis_es="Terror platense sobre espíritus indígenas que regresa para vengarse del hombre blanco."),
        dict(title="La Sospecha", director="Miguel Torena", country="Uruguay",
             production_year=2019, runtime=128, type="feature", section="panorama",
             synopsis_es="Un investigador trata de probar la inocencia de la principal sospechosa de dos muertes. Thriller uruguayo. Premio del Público Latinoameriano."),
        dict(title="Creeping Out", director="Jakub Mateusz Boruń", country="Polonia",
             production_year=2019, runtime=170, type="feature", section="panorama",
             synopsis_es="Dos amigos exploran una cueva prohibida en los Tatras. Solo uno regresa. Thriller polaco de casi 3 horas. Primera película polaca en el festival."),
        dict(title="Deathcember", director="Múltiples directores", country="Alemania",
             production_year=2019, runtime=145, type="feature", section="panorama",
             synopsis_es="24 cortometrajes oscuros con directores internacionales incluyendo a Ruggero Deodato y Julian Richards."),
        dict(title="George Hilton: El Mundo es de los Audaces", director="Daniel Camargo", country="Brasil/Italia",
             production_year=2019, runtime=107, type="feature", section="panorama",
             synopsis_es="Documental biográfico sobre el mítico actor uruguayo de westerns y giallo italianos. Seleccionado para Sitges."),
        dict(title="TR3SH", director="Alejo Rébora", country="Argentina",
             production_year=2019, runtime=75, type="feature", section="panorama",
             synopsis_es="Mamá Bruselas sale en su silla de ruedas a buscar a sus hijos. Argentina. Muestra informativa."),
    ]
    for w in works_xii:
        upsert_work(e, **w)
    print(f"Edition XII (2019): {len(works_xii)} works seeded.")
else:
    print("Edition 2019 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition XIII — 2022
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2022)
if e:
    e.description_es = (
        "Decimotercera edición, 2022. Realizada en dos partes por segunda vez (pandemia). "
        "80 cortometrajes, 26 largometrajes, más de 100 películas en total. "
        "Más de 3.000 asistentes: la edición con mayor concurrencia de la historia del festival. "
        "90% de funciones con entrada libre. "
        "Mejor Película: Alien Outbreak (Reino Unido, Neil Rowe). "
        "Mejor Director: Hyun Yang Choi (El Sótano, Corea del Sur). "
        "Mejor Guión: Agustín Rubio (La Desvida, España). "
        "Mejor Actor: Julio Perillán (La Desvida). "
        "Mejor Actriz: Marta Megías (Nikolina, España). "
        "Mejor Iberoamericana: Jacinto (España, Javi Camino). "
        "Premio del Público: Nikolina (España). "
        "Premio del Público Latinoamericano: El Cementerio de las Almas Perdidas (Brasil, Rodrigo Aragão)."
    )
    e.description_en = (
        "Thirteenth edition, 2022. Held in two parts for the second time (pandemic). "
        "80 short films, 26 features, over 100 films total. "
        "Over 3,000 attendees: the best-attended edition in the festival's history. "
        "90% of screenings with free admission. "
        "Best Film: Alien Outbreak (UK, Neil Rowe). "
        "Best Director: Hyun Yang Choi (El Sótano, South Korea). "
        "Best Screenplay: Agustín Rubio (La Desvida, Spain). "
        "Best Actor: Julio Perillán (La Desvida). "
        "Best Actress: Marta Megías (Nikolina, Spain). "
        "Best Iberoamerican: Jacinto (Spain, Javi Camino). "
        "Audience Award: Nikolina (Spain). "
        "Latin American Audience: El Cementerio de las Almas Perdidas (Brazil, Rodrigo Aragão)."
    )
    e.save()

    works_xiii = [
        dict(title="Alien Outbreak (Brote Alienígena)", director="Neil Rowe", country="Reino Unido",
             production_year=2020, runtime=85, type="feature", section="competition_int",
             synopsis_es="Una comunidad rural es asediada por una presencia alienígena. Los oficiales Zoe y Patrick luchan contra el pánico masivo. Ganadora de Mejor Película."),
        dict(title="La Alquimia del Espíritu (Alchemy of the Spirit)", director="Steve Balderson", country="EEUU",
             production_year=2021, runtime=91, type="feature", section="competition_int",
             synopsis_es="Un gran artista descubre que su esposa ha muerto en su cama. Poema de amor visual y sobrenatural. Con Xander Berkeley y Sarah Clarke."),
        dict(title="La Canción del Mar (Kan Ar Mor)", director="Pierre-André Le Leuch", country="Francia",
             production_year=2020, runtime=75, type="feature", section="competition_int",
             synopsis_es="En un pueblo celta, jóvenes desaparecen en el mar. Un grupo decide investigar el misterio. Premiada en 6 países."),
        dict(title="La Desvida", director="Agustín Rubio", country="España",
             production_year=2020, runtime=87, type="feature", section="competition_int",
             synopsis_es="Una pareja regresa a su casa tras perder a su hijo. Los mensajes que él dejó los llevan a un descenso a los infiernos. Mejor Guión y Mejor Actor."),
        dict(title="Nemm: Súper Tuber", director="David León Sofía", country="Argentina",
             production_year=2021, runtime=88, type="feature", section="competition_int",
             synopsis_es="Un adulto agotado es reclutado por un misterioso superhéroe para hacer justicia. Comedia con suspenso del director de Sin Señal."),
        dict(title="Nikolina", director="Eva Libertad/Nuria Muñóz", country="España",
             production_year=2020, runtime=73, type="feature", section="competition_int",
             synopsis_es="Una camarera y un fantasma atrapado en un cuadro deben saldar una deuda con el pasado. Comedia con fantasma filmada en 11 días. Mejor Actriz y Premio del Público."),
        dict(title="El Sótano (The Basement)", director="Hyun Yang Choi", country="Corea del Sur",
             production_year=2020, runtime=94, type="feature", section="competition_int",
             synopsis_es="Una familia se encierra en un búnker antibombas tras un ataque nuclear norcoreano. La lucha por sobrevivir transforma a las personas. Mejor Director."),
        dict(title="El Amigo Visible", director="Cristian Bidone", country="Argentina",
             production_year=2020, runtime=71, type="feature", section="competition_int",
             synopsis_es="Juan, 50 años, con problemas de visión y tartamudez, sin amigos. Todo se complica cuando muere su madre. Terror independiente argentino."),
        dict(title="Bella", director="Laura Dariomerlo", country="Argentina",
             production_year=2021, runtime=65, type="feature", section="competition_int",
             synopsis_es="El padre de una joven maestra violada y desaparecida contrata a dos asesinas para vengarse. Western femenino de venganza."),
        dict(title="El Cementerio de las Almas Perdidas", director="Rodrigo Aragão", country="Brasil",
             production_year=2020, runtime=94, type="feature", section="competition_int",
             synopsis_es="Un jesuita corrompido por el Libro Negro de Cipriano es condenado a vivir bajo el cementerio. Siglos después, está listo para liberarse. Premio del Público Latinoamericano."),
        dict(title="Ecos", director="Tommy Llorens", country="España",
             production_year=2020, runtime=88, type="feature", section="competition_int",
             synopsis_es="6 historias de amor convergen el 22/02/2022 en La Palma en una tarde sin final. Ciencia ficción atmosférica con presupuesto de 100 dólares."),
        dict(title="Jacinto", director="Javi Camino", country="España",
             production_year=2021, runtime=95, type="feature", section="competition_int",
             synopsis_es="Jacinto, 50 años con mente de niño, vive con sus padres en un pueblo en ruinas. La llegada de vecinas metaleras pone su mundo patas arriba. Mejor Iberoamericana."),
        dict(title="Pandemonium", director="Emmanuel Panizzo", country="México",
             production_year=2020, runtime=80, type="feature", section="competition_int",
             synopsis_es="Un grupo viaja a una isla abandonada para investigar un viejo video de desapariciones. Found footage mexicano."),
        dict(title="Punk Horror", director="David González Rudiez", country="España",
             production_year=2021, runtime=62, type="feature", section="competition_int",
             synopsis_es="Un inadaptado encuentra un libro poderoso y viaja al borde del multiverso. Aventura cósmica de baja fidelidad española."),
        dict(title="Urubú", director="Alejandro Ibáñez Nauta", country="Brasil/España",
             production_year=2019, runtime=89, type="feature", section="competition_int",
             synopsis_es="Un fotógrafo lleva a su familia a la Amazonía a fotografiar el urubú albino. Homenaje de Alejandro Ibáñez (hijo de Chicho Ibáñez Serrador) a su padre."),
        dict(title="Aspiradoras Sobreexcitadas de Marte (Oversexed Rugsuckers from Mars)", director="Michael Paul Girard", country="EEUU",
             production_year=1989, runtime=84, type="feature", section="panorama",
             synopsis_es="Marcianos emparejan a humanos con aspiradoras con resultados caóticos. Película de culto de 1988, ópera prima con $1.000 de presupuesto. Novedad especial."),
        dict(title="Historias del Después (Narrativas do Pós)", director="Graubi García/Jairo Neto", country="Brasil",
             production_year=2021, runtime=58, type="medium", section="panorama",
             synopsis_es="Documental sobre posibles escenarios de un mundo pospandemia. Entrevistas a escritores, filósofos y politólogos."),
        dict(title="La Sabiduría", director="Eduardo Pinto", country="Argentina",
             production_year=2019, runtime=92, type="feature", section="panorama",
             synopsis_es="Tres jóvenes pasan un fin de semana en una estancia del siglo XIX y viajan al pasado. Reflexión sobre machismo y racismo."),
        dict(title="Lo Inevitable", director="Fercks Castellani", country="Argentina",
             production_year=2021, runtime=72, type="feature", section="panorama",
             synopsis_es="Una familia religiosa espera el Juicio Final en el campo. La aparición de un 'salvador' pone en riesgo su fe. Con Juana Viale."),
        dict(title="Urpus: Leyendas de Terror", director="Catanzaro/Celiz Sayah/Gómez/Turzi/Zanardi", country="Argentina",
             production_year=2021, runtime=62, type="feature", section="panorama",
             synopsis_es="Cinco directoras argentinas presentan cinco leyendas de terror. 3 años de producción."),
        dict(title="La Última Fase", director="Gabriel Díaz", country="Argentina/EEUU/Uruguay",
             production_year=2020, runtime=80, type="feature", section="panorama",
             synopsis_es="Una joven busca a su padre desaparecido misteriosamente. Un ufólogo sugiere una conexión con el fenómeno ovni. Del director uruguayo Gabriel Díaz."),
        dict(title="Víctima del Amor (Victim of Love)", director="Jesper Isaksen", country="Dinamarca",
             production_year=2019, runtime=94, type="feature", section="panorama",
             synopsis_es="Un hombre vuelve a Copenhague a resolver el misterio de su novia desaparecida. Thriller de terror psicológico danés ganador de varios premios."),
    ]
    for w in works_xiii:
        upsert_work(e, **w)
    print(f"Edition XIII (2022): {len(works_xiii)} works seeded.")
else:
    print("Edition 2022 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Edition XIV — 2023 (previously seeded with partial data, update descriptions)
# ─────────────────────────────────────────────────────────────────────────────

e = get_edition(2023)
if e:
    if not e.description_es:
        e.description_es = (
            "Decimocuarta edición del Montevideo Fantástico, celebrada en 2023. "
            "Competencia internacional de largometrajes, cortometrajes y novedades del cine fantástico, "
            "de terror y ciencia ficción de todo el mundo."
        )
        e.description_en = (
            "Fourteenth edition of Montevideo Fantástico, held in 2023. "
            "International competition of features, short films and premieres of fantastic, "
            "horror and science fiction cinema from around the world."
        )
        e.save()
        print("Edition XIV (2023): descriptions updated.")
    else:
        print("Edition XIV (2023): descriptions already set.")
else:
    print("Edition 2023 not found — skipping.")


# ─────────────────────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────────────────────

total_works = Work.objects.count()
print(f"\n✓ Done. Total works in DB: {total_works}")
print("Editions with works:")
for ed in Edition.objects.order_by("year"):
    count = ed.works.count()
    print(f"  {ed.year} ({ed.name}): {count} works")
