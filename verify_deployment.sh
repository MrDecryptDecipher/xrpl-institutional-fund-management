#!/bin/bash

echo "Verifying XRPL Institutional Fund Management Protocol Deployment"
echo "=================================================================="

echo "Checking PM2 processes..."
pm2 list

echo ""
echo "Checking if frontend is accessible on port 5002..."
curl -s -o /dev/null -w "Frontend (port 5002): %{http_code}\n" http://localhost:5002

echo ""
echo "Checking if middleware is accessible..."
# The middleware runs on a random port, so we just check if the process is running
if pm2 list | grep -q "xrpl-middleware.*online"; then
  echo "Middleware: Running"
else
  echo "Middleware: Not running"
fi

echo ""
echo "Checking if backend is accessible..."
# The backend runs on a random port, so we just check if the process is running
if pm2 list | grep -q "xrpl-backend.*online"; then
  echo "Backend: Running"
else
  echo "Backend: Not running"
fi

echo ""
echo "Checking public IP accessibility..."
curl -s -o /dev/null -w "Public IP (3.111.22.56:5002): %{http_code}\n" http://3.111.22.56:5002

echo ""
echo "Checking Nginx status..."
sudo systemctl is-active nginx

echo ""
echo "Deployment verification complete!"
echo "Your application should now be accessible at: http://3.111.22.56:5002"