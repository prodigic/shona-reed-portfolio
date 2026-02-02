#!/bin/bash

if [ ! -f .server.pid ]; then
    echo "No server PID file found. Server may not be running."
    exit 1
fi

SERVER_PID=$(cat .server.pid)
echo "Stopping server with PID: $SERVER_PID"

if kill $SERVER_PID 2>/dev/null; then
    echo "Server stopped successfully."
    rm .server.pid
else
    echo "Failed to stop server. Process may have already exited."
    rm .server.pid
    exit 1
fi
