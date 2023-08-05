#!/bin/bash

# Wait for the database to be ready
# while ! nc -z $POSTGRESHOST $POSTGRESPORT; do
#   echo "Waiting for the database..."
#   sleep 1
# done

echo $POSTGRESHOST
echo $POSTGRESPORT

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Celery worker


# Start Gunicorn server with the appropriate number of workers
gunicorn llmapp.asgi:application --bind 0.0.0.0:8000 --workers 2 -k uvicorn.workers.UvicornWorker

