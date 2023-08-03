# Django Application for Large Language Models with Document Query

This Django application allows you to leverage the power of Large Language Models using document queries. It enables users to interact with advanced natural language processing capabilities through a user-friendly web interface.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Building Assets](#building-assets)
  - [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Large Language Models have revolutionized natural language understanding tasks, and this Django application provides a seamless way to utilize them for document queries. It can be integrated into your existing Django projects or used as a standalone application.

## Installation
### Prerequisites
Before installing the application, ensure you have the following installed:

- Python (>= 3.6)
- Node.js and npm
- AWS Storage(minioserver locally refer minioserver/readme.md)

### Building Assets
The application uses webpack to bundle assets located in the `assets/` folder. To build the assets, follow these steps:

1. Navigate to the `assets/` directory:
   ```
   cd assets
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Build the assets:
   ```
   npm run build
   ```

### Environment Setup
Before running the application, you need to create a copy of `.env.sample` and fill in all the required environment variables. Make sure to save it as `.env` in the root directory of the project.

## Usage
To run the Django application, use the following command:

```
python manage.py runserver
```

Before running the server, you need to start a Celery worker to handle background tasks. To start the Celery worker, use the following command:

```
celery -A llmapp worker --loglevel=info
```

Once the server is up and running, visit `http://localhost:8000` in your web browser to access the application.

If you created a superuser during installation, you can access the Django admin panel at `http://localhost:8000/admin` to manage the application's data.

## Features
- **Document Query:** Users can submit queries to the application, and it will use large language models to process and generate relevant results.
- **User Management:** Users can register and log in to the application to access advanced features.
- **Query History:** Logged-in users can view their query history and revisit previous results.
- **Model Selection:** The application allows users to choose from different pre-trained language models or even upload and use their own models.
- **Scalability:** The application is designed to scale and handle multiple concurrent requests efficiently.

## Dependencies
The application relies on the following key dependencies:

- Django: Web framework for building the application.
- Django REST framework: Enables API functionality for document queries.
- Django Allauth: Authentication and authorization.
- Django Channels: Required for handling asynchronous tasks with WebSockets.
- Django Bootstrap: Front-end framework for designing the user interface.
- Celery: Task queue for processing background tasks.
- Langchain: Python package for language model integration.


## Configuration
To configure the application and adapt it to your needs, you can modify the following files:

- `settings.py`: Configure Django settings such as database, static files, and installed apps.
- `models.py`: Define the database models, if necessary.
- `views.py`: Implement the logic for processing user queries and interacting with language models.
- `urls.py`: Define the application's URL patterns.

## Contributing
We welcome contributions from the community to improve this application. If you want to contribute, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local development environment.
3. Create a new branch for your feature/fix:
   ```
   git checkout -b feature/your-feature
   ```
4. Implement your changes and commit them with descriptive messages.
5. Push your changes to your forked repository.
6. Submit a pull request to the original repository, explaining your changes.

## License
This Django application is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license. If you find the application useful, we appreciate acknowledgment and attribution.