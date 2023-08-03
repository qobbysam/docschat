# syntax = docker/dockerfile:1.2


# Use the official Python image as the base image

FROM python:3.9

RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory in the container
WORKDIR /app

# Install system dependencies (if needed)
# For example, if your Django project requires PostgreSQL, you may need to install the PostgreSQL client
# RUN apt-get update && apt-get install -y libpq-dev

# Copy the requirements file and install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the entire Django project into the container's /app directory
COPY . /app/

# Set the ALLOWED_HOST environment variable during build
ARG ALLOWED_HOST
ENV ALLOWED_HOST $ALLOWED_HOST

ARG SECRET_KEY
ENV SECRET_KEY $SECRET_KEY

ARG DEBUG
ENV DEBUG $DEBUG

ARG POSTGRESDB
ENV POSTGRESDB $POSTGRESDB

ARG POSTGRESUSER 
ENV POSTGRESUSER $POSTGRESUSER

ARG POSTGRESPASSWORD 
ENV POSTGRESPASSWORD $POSTGRESPASSWORD

ARG POSTGRESPORT 
ENV POSTGRESPORT $POSTGRESPORT

ARG AWS_S3_ENDPOINT_URL 
ENV AWS_S3_ENDPOINT_URL $AWS_S3_ENDPOINT_URL

ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID

ARG AWS_SECRET_ACCESS_KEY 
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY


ARG AWS_STORAGE_BUCKET_NAME 
ENV AWS_STORAGE_BUCKET_NAME $AWS_STORAGE_BUCKET_NAME

ARG AWS_S3_CLOUD_URL 
ENV AWS_S3_CLOUD_URL $AWS_S3_CLOUD_URL

ARG CELERY_BROKER_URL 
ENV CELERY_BROKER_URL $CELERY_BROKER_URL

ARG CHANNELS_REDIS_URL 
ENV CHANNELS_REDIS_URL $CHANNELS_REDIS_URL

ARG EMBEDDING_ENGINE 
ENV EMBEDDING_ENGINE $EMBEDDING_ENGINE


ARG CHAT_MODEL 
ENV CHAT_MODEL $CHAT_MODEL

ARG OPENAI_API_KEY 
ENV OPENAI_API_KEY $OPENAI_API_KEY

# # Collect static files
# RUN python manage.py collectstatic --noinput

# # Run database migrations
# RUN python manage.py migrate

# Expose the port that the Django application will listen on
EXPOSE 8000

# Define the command to start the Django development server
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

COPY start.sh /app/start.sh
ENTRYPOINT ["/app/start.sh"]
#CMD ["bash", "-c", "celery -A llmapp worker -l info & python manage.py runserver 0.0.0.0:8000"]
