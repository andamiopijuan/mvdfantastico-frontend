from .base import *  # noqa

DEBUG = True

# Allow all in development
CORS_ALLOW_ALL_ORIGINS = True

# Django debug toolbar (optional)
INTERNAL_IPS = ["127.0.0.1"]

# Simpler email backend for dev
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Contact form recipient
CONTACT_EMAIL = "montevideofan@gmail.com"
