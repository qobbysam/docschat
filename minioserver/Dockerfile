# Use the official MinIO image from Quay.io as the base image
FROM quay.io/minio/minio

# Set environment variables for MinIO
ENV MINIO_ROOT_USER=minio99
ENV MINIO_ROOT_PASSWORD=minio123

# Expose ports for MinIO service and console
EXPOSE 9000
EXPOSE 9001

# Define the command to run MinIO server with the specified options
CMD ["server", "/data", "--console-address", ":9001"]
