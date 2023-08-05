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
celery -A llmapp worker -l DEBUG  



