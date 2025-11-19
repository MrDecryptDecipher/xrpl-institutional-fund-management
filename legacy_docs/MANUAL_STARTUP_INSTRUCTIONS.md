# Manual Startup Instructions for XRPL Institutional Fund Management Protocol

## Prerequisites
- Node.js and npm installed
- Project dependencies installed (`npm install`)

## Step-by-Step Startup

### 1. Build the Project
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
npm run build
```

### 2. Start Xaman Payload Server (Terminal 1)
Open a new terminal and run:
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
npx tsx fixed-xaman-payload-server.ts
```

You should see output similar to:
```
Initializing Xaman payload server on port 3001
Xaman API Key: b53edeaf-0046-49a6-a100-4bb284be3682
Xaman API Secret is set: true
Initializing Xumm SDK...
Xaman payload server running at http://0.0.0.0:3001
Server address: {"address":"0.0.0.0","family":"IPv4","port":3001}
Process is still running
Server is now listening
Xumm SDK is ready
```

### 3. Start Frontend Server (Terminal 2)
Open another terminal and run:
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
node simple-server.js
```

You should see output similar to:
```
XRPL Frontend Server running at http://0.0.0.0:5002/
Serving files from ./dist
```

### 4. Update Nginx Configuration (Optional but Recommended)
To access the application via the public IP with proper routing:

1. Edit the nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/all-projects
```

2. Add the XRPL configuration before the default location block:
```nginx
    # XRPL Fund Management Frontend
    location /xrpl/ {
        proxy_pass http://localhost:5002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # XRPL Fund Management API
    location /xrpl-api/ {
        proxy_pass http://localhost:5002/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

3. Restart nginx:
```bash
sudo systemctl restart nginx
```

## Access the Application

Once both servers are running:

- **Local Access**: http://localhost:5002/
- **Public Access**: http://3.111.22.56/xrpl/ (after nginx configuration)
- **Xaman API Health Check**: http://localhost:3001/health

## Troubleshooting

### If you get "Port already in use" errors:
```bash
sudo lsof -i :3001
sudo lsof -i :5002
kill -9 <PID>
```

### If nginx fails to restart:
```bash
sudo nginx -t  # Test configuration
sudo systemctl status nginx  # Check status
```

### If services don't respond to requests:
This may be due to system-level networking issues. Try:
```bash
curl -v http://localhost:3001/health
curl -v http://localhost:5002/
```

## Created by Sandeep Kumar Sahoo
This institutional-grade XRPL implementation follows XRPL standards XLS-33, XLS-40, XLS-65/66, and XLS-80.# Manual Startup Instructions for XRPL Institutional Fund Management Protocol

## Prerequisites
- Node.js and npm installed
- Project dependencies installed (`npm install`)

## Step-by-Step Startup

### 1. Build the Project
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
npm run build
```

### 2. Start Xaman Payload Server (Terminal 1)
Open a new terminal and run:
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
npx tsx fixed-xaman-payload-server.ts
```

You should see output similar to:
```
Initializing Xaman payload server on port 3001
Xaman API Key: b53edeaf-0046-49a6-a100-4bb284be3682
Xaman API Secret is set: true
Initializing Xumm SDK...
Xaman payload server running at http://0.0.0.0:3001
Server address: {"address":"0.0.0.0","family":"IPv4","port":3001}
Process is still running
Server is now listening
Xumm SDK is ready
```

### 3. Start Frontend Server (Terminal 2)
Open another terminal and run:
```bash
cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
node simple-server.js
```

You should see output similar to:
```
XRPL Frontend Server running at http://0.0.0.0:5002/
Serving files from ./dist
```

### 4. Update Nginx Configuration (Optional but Recommended)
To access the application via the public IP with proper routing:

1. Edit the nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/all-projects
```

2. Add the XRPL configuration before the default location block:
```nginx
    # XRPL Fund Management Frontend
    location /xrpl/ {
        proxy_pass http://localhost:5002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # XRPL Fund Management API
    location /xrpl-api/ {
        proxy_pass http://localhost:5002/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

3. Restart nginx:
```bash
sudo systemctl restart nginx
```

## Access the Application

Once both servers are running:

- **Local Access**: http://localhost:5002/
- **Public Access**: http://3.111.22.56/xrpl/ (after nginx configuration)
- **Xaman API Health Check**: http://localhost:3001/health

## Troubleshooting

### If you get "Port already in use" errors:
```bash
sudo lsof -i :3001
sudo lsof -i :5002
kill -9 <PID>
```

### If nginx fails to restart:
```bash
sudo nginx -t  # Test configuration
sudo systemctl status nginx  # Check status
```

### If services don't respond to requests:
This may be due to system-level networking issues. Try:
```bash
curl -v http://localhost:3001/health
curl -v http://localhost:5002/
```

## Created by Sandeep Kumar Sahoo
This institutional-grade XRPL implementation follows XRPL standards XLS-33, XLS-40, XLS-65/66, and XLS-80.