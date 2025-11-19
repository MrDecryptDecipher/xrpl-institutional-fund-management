#!/bin/bash

# XRPL Institutional Fund Management Protocol - Complete Startup Script
# Created by Sandeep Kumar Sahoo

echo "==============================================="
echo "XRPL Institutional Fund Management Protocol"
echo "Starting All Services"
echo "==============================================="
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if sudo netstat -tulnp | grep :$port > /dev/null; then
        echo "Port $port is already in use"
        return 0
    else
        echo "Port $port is available"
        return 1
    fi
}

# Function to kill processes on specific ports
kill_port_processes() {
    local port=$1
    local pids=$(sudo netstat -tulnp | grep :$port | awk '{print $7}' | cut -d'/' -f1)
    if [ ! -z "$pids" ]; then
        echo "Killing processes on port $port: $pids"
        sudo kill $pids 2>/dev/null
        sleep 2
    fi
}

# Stop any existing services on our ports
echo "Checking for existing services..."
kill_port_processes 3001
kill_port_processes 5002

# Change to project directory
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"

# Build the project if dist directory doesn't exist
if [ ! -d "dist" ]; then
    echo "Building project..."
    npm run build
fi

# Start Xaman Payload Server
echo ""
echo "Starting Xaman Payload Server..."
npx tsx fixed-xaman-payload-server.ts > /tmp/xaman.log 2>&1 &
XAMAN_PID=$!
echo "Xaman Payload Server PID: $XAMAN_PID"

# Start Frontend Server
echo ""
echo "Starting Frontend Server..."
node simple-server.js > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend Server PID: $FRONTEND_PID"

# Wait a few seconds for services to start
echo ""
echo "Waiting for services to start..."
sleep 5

# Check if services are running
echo ""
echo "Checking service status..."
if ps -p $XAMAN_PID > /dev/null; then
    echo "✅ Xaman Payload Server: Running (PID: $XAMAN_PID)"
else
    echo "❌ Xaman Payload Server: Failed to start"
    echo "Xaman server log:"
    cat /tmp/xaman.log
fi

if ps -p $FRONTEND_PID > /dev/null; then
    echo "✅ Frontend Server: Running (PID: $FRONTEND_PID)"
else
    echo "❌ Frontend Server: Failed to start"
    echo "Frontend server log:"
    cat /tmp/frontend.log
fi

# Show port status
echo ""
echo "Port status:"
check_port 3001
check_port 5002

echo ""
echo "==============================================="
echo "Services started!"
echo "Frontend: http://localhost:5002/ or http://3.111.22.56:5002/"
echo "Xaman API: http://localhost:3001/"
echo ""
echo "To stop services, run: kill $XAMAN_PID $FRONTEND_PID"
echo "==============================================="