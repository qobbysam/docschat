# # Use a lightweight Linux base image
# FROM alpine:latest

# Use the official Bitnami MinIO image as the base image
FROM minio/minio:latest

# Set environment variables for MinIO root user and password
ENV MINIO_ROOT_USER="admin"
ENV MINIO_ROOT_PASSWORD="password"
#ENV MINIO_VOLUMES="/mnt/data"
ENV MINIO_SERVER_URL="http://minio.qobbysam.com"

#RUN mkdir -p /mnt/data

# Expose the default MinIO port
EXPOSE 9000

# Define the command to start the MinIO server
#CMD [ "server",  "--console-address :9001" ,"/data"]
CMD [ "server", "--console-address ':9005'",  "/data" ]


