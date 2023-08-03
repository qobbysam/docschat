# Use a lightweight Linux base image
FROM alpine:latest

# Copy the binary file into the image
RUN mkdir -p /mnt/data

COPY . /usr/local/bin/

# Set the working directory
WORKDIR /usr/local/bin

# Make the binary executable (if needed)
RUN chmod +x minio

EXPOSE 9001
# Define the command to run your binary (update this according to your binary's execution command)
CMD ["MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password ./usr/local/bin/minio server /usr/local/bin/mnt/data --console-address ":9001""]
