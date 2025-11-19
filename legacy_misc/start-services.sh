#!/bin/bash

# XRPL Institutional Fund Management Protocol - Service Starter
# Created by Sandeep Kumar Sahoo

echo "Starting XRPL Institutional Fund Management Protocol services..."

# Start Xaman Payload Server
echo "Starting Xaman Payload Server on port 3001..."
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
npx tsx fixed-xaman-payload-server.ts > /tmp/xaman-payload-server.log 2>&1 &
XAMAN_PID=$!

# Wait a moment for the server to start
sleep 3

# Check if Xaman server is running
if ps -p $XAMAN_PID > /dev/null; then
    echo "✅ Xaman Payload Server started successfully (PID: $XAMAN_PID)"
else
    echo "❌ Failed to start Xaman Payload Server"
    exit 1
fi

# Start Frontend Server
echo "Starting Frontend Server on port 5002..."
npx serve -s dist -l 5002 > /tmp/frontend-server.log 2>&1 &
FRONTEND_PID=$!

# Wait a moment for the server to start
sleep 3

# Check if frontend server is running
if ps -p $FRONTEND_PID > /dev/null; then
    echo "✅ Frontend Server started successfully (PID: $FRONTEND_PID)"
else
    echo "❌ Failed to start Frontend Server"
    exit 1
fi

echo ""
echo "Services started successfully!"
echo "Frontend: http://localhost:5002/"
echo "Xaman Payload API: http://localhost:3001/"
echo ""
echo "To stop the services, run: kill $XAMAN_PID $FRONTEND_PID"
echo ""

# Keep the script running
wait $XAMAN_PID $FRONTEND_PID