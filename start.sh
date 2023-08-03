#!/bin/bash

# Wait for the database to be ready
while ! nc -z $POSTGRESHOST $POSTGRESPORT; do
  echo "Waiting for the database..."
  sleep 1
done

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Celery worker
celery -A llmapp worker -l info &

# Start Celery beat (if needed)
# celery -A your_project_name beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler &

# Start Gunicorn server with the appropriate number of workers
gunicorn llmapp.wsgi:application --bind 0.0.0.0:8000 --workers 4 -k uvicorn.workers.UvicornWorker

