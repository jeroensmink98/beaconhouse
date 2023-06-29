#!/bin/bash

# Define the image name and tag
IMAGE_NAME="unlighthouse"
TAG="2.3"

# Build the Docker container
docker build -t "$IMAGE_NAME:$TAG" .

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Docker container built successfully!"
else
    echo "Failed to build Docker container."
    exit 1
fi

