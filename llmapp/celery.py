import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'llmapp.settings.production')
# Celery configuration


app = Celery('llmapp')
app.config_from_object("django.conf:settings", namespace="CELERY")
# Load task modules from all registered Django app configs. 
app.autodiscover_tasks()