# Use the official MinIO image from Quay.io as the base image
FROM quay.io/minio/minio

# Set environment variables for MinIO
ENV MINIO_ROOT_USER=admin
ENV MINIO_ROOT_PASSWORD=password
#ENV MINIO_SERVER_URL="https://minio.qobbysam.com:9000"


# Expose ports for MinIO service and console
EXPOSE 9000
EXPOSE 9001

# Define the command to run MinIO server with the specified options
CMD ["server", "/data", "--console-address", ":9001"]
