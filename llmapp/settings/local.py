
from .base import *
import os




DEBUG = True

ENV_ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS')

ALLOWED_HOSTS = ENV_ALLOWED_HOSTS.split(",")

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
ACCOUNT_AUTHENTICATION_METHOD= 'email'
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_SIGNUP_REDIRECT_URL =  '/accounts/login'
ACCOUNT_EMAIL_REQUIRED=True
ACCOUNT_EMAIL_VERIFICATION='none'
ACCOUNT_ADAPTER = 'customuser.adapter.CustomAccountAdapter'

SITE_ID = 1

# DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.postgres',
#             'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         }
#     }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRESDB'),
        'USER': os.environ.get('POSTGRESUSER'),
        'PASSWORD': os.environ.get('POSTGRESPASSWORD'),
        'HOST': os.environ.get('POSTGRESHOST'),
        'PORT': os.environ.get('POSTGRESPORT'),
    }
}
INSTALLED_APPS += [
#'storages',
        'allauth',
         'allauth.account',
         'allauth.socialaccount',
    'bootstrap5',
    "crispy_forms",
    "crispy_bootstrap5",
    'customuser',
    'company',
    #'app',
    'siteapp',
    'userapp',
    'apiapp',
    'sciencepaper'
]

BOOTSTRAP5 = {

    # The complete URL to the Bootstrap CSS file
    # Note that a URL can be either a string,
    # e.g. "https://stackpath.bootstrapcdn.com/bootstrap/5.1.1/css/bootstrap.min.css",
    # or a dict like the default value below.
    "css_url": {
        "href": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css",
        "integrity": "sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB",
        "crossorigin": "anonymous",
    },

    # The complete URL to the Bootstrap JavaScript file
    "javascript_url": {
        "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js",
        "integrity": "sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T",
        "crossorigin": "anonymous",
    },

    # The complete URL to the Bootstrap CSS file (None means no theme)
    "theme_url": None,

    # Put JavaScript in the HEAD section of the HTML document (only relevant if you use bootstrap5.html)
    'javascript_in_head': False,

    # Label class to use in horizontal forms
    'horizontal_label_class': 'col-md-3',

    # Field class to use in horizontal forms
    'horizontal_field_class': 'col-md-9',

    # Set placeholder attributes to label if no placeholder is provided
    'set_placeholder': True,

    # Class to indicate required (better to set this in your Django form)
    'required_css_class': '',

    # Class to indicate error (better to set this in your Django form)
    'error_css_class': 'is-invalid',

    # Class to indicate success, meaning the field has valid input (better to set this in your Django form)
    'success_css_class': 'is-valid',

    # Renderers (only set these if you have studied the source and understand the inner workings)
    'formset_renderers':{
        'default': 'bootstrap5.renderers.FormsetRenderer',
    },
    'form_renderers': {
        'default': 'bootstrap5.renderers.FormRenderer',
    },
    'field_renderers': {
        'default': 'bootstrap5.renderers.FieldRenderer',
        'inline': 'bootstrap5.renderers.InlineFieldRenderer',
    },
}

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

ASGI_APPLICATION = 'djangolitbot.asgi.application'
#DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
# DEFAULT_FILE_STORAGE = 'storages.backends.filestorage.FileStorage'
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
        'OPTIONS': {},
    },

    'staticfiles': {
                "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

# Celery configuration
CELERY_BROKER_URL = "redis://localhost:6379"
CELERY_RESULT_BACKEND = "redis://localhost:6379"
# Celery task settings
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ACCEPT_CONTENT = ['json']


CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"

CRISPY_TEMPLATE_PACK = "bootstrap5"