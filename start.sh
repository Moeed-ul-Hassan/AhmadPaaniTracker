#!/bin/bash

# Start script for Ahmad Paani Waala HTML/CSS/JS application

echo "Starting Ahmad Paani Waala water delivery website..."
echo "---------------------------------------------"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Error: Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi

# Set environment variables
export PORT=3000

# Start the server
echo "Starting the server on port $PORT..."
node server.js

# In case the server exits
echo "Server stopped."