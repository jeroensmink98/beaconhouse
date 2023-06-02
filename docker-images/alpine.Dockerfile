# Use Alpine Linux as the base image
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Run hello world
CMD  echo "Hello World"
