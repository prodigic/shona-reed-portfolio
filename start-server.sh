#!/bin/bash

# Default port is 8080, but can be overridden with PORT environment variable
PORT=${PORT:-8080}

echo "Starting server on port $PORT..."
npx http-server -p $PORT &
SERVER_PID=$!

echo $SERVER_PID > .server.pid
echo "Server started with PID: $SERVER_PID"
echo "Access at: http://localhost:$PORT"
echo ""
echo "To stop the server, run: ./stop-server.sh"
