# Use the official Python image as the base image
FROM python:3.9

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

# Collect static files
RUN python manage.py collectstatic --noinput

# Run database migrations
RUN python manage.py migrate

# Expose the port that the Django application will listen on
EXPOSE 8000

# Define the command to start the Django development server
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

CMD ["bash", "-c", "celery -A llmapp worker -l info & python manage.py runserver 0.0.0.0:8000"]
