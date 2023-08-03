# Minio Server - Local Development

This utility enables you to run Minio Server locally, a lightweight, self-hosted object storage server compatible with Amazon S3. It exposes port `9001` for easy access. You can quickly set up and manage buckets, as well as create new user identities for secure access.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Accessing Minio](#accessing-minio)
- [Managing Buckets](#managing-buckets)
- [Creating a New User Identity](#creating-a-new-user-identity)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Minio is a powerful tool for managing object storage locally, allowing you to have full control over your data. This utility provides an easy way to run Minio Server in a local development environment using Docker and Docker Compose.

## Installation
Ensure you have Docker and Docker Compose installed on your system before proceeding.

1. Clone or download this repository to your local machine.

2. Navigate to the repository folder containing the Dockerfile and docker-compose.yml.

3. Build and start the Minio Server using Docker Compose:
   ```
   docker-compose up -d
   ```

## Usage
Once you have the Minio Server running, you can access the Minio web interface to manage your object storage.

## Accessing Minio
To access the Minio web interface, open your web browser and go to `http://localhost:9001`.

Login with the following credentials:
- **Username:** admin
- **Password:** password

## Managing Buckets
After logging in to Minio, you can create buckets to organize your data. Buckets are similar to directories or folders, allowing you to segregate your objects (files) logically.

Follow these steps to create a new bucket:

1. Click on the "+" button (Create Bucket) in the web interface.
2. Enter a unique name for your bucket.
3. Choose the region or leave it as the default.
4. Click on the "Create" button to create the bucket.

## Creating a New User Identity
Minio allows you to create new user identities with limited access to specific buckets. This enhances security by granting access only to the necessary resources.

To create a new user identity:

1. Click on the "Add User" link in the web interface.
2. Provide a unique username for the new user.
3. Generate a new access key and secret key or enter your custom keys.
4. Choose the desired permissions for the user, such as read-only or read-write access to specific buckets.
5. Click on the "Add" button to create the new user.

## Contributing
We welcome contributions to improve this utility. If you want to contribute, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local development environment.
3. Implement your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository, explaining your changes.

## License
This utility is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license. If you find the utility useful, we appreciate acknowledgment and attribution.