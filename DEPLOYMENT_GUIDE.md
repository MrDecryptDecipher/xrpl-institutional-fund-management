# XRPL Institutional Fund Management Protocol - Deployment Guide

## Overview

This guide explains how to deploy the XRPL Institutional Fund Management Protocol application to make it accessible via your public IP (3.111.22.56) with the specified ports:
- Frontend: 5002
- Middleware: 5003
- Backend: 5004

## Prerequisites

1. Your Xaman Developer Console is already configured with the correct redirect URI: `http://3.111.22.56:5002/`
2. Your API credentials are properly set in the [.env](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/.env) file
3. Firewall rules are configured to allow traffic on the required ports

## Deployment Steps

### 1. Environment Configuration

Ensure your environment variables are properly set in the [.env](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/.env) file:

```bash
# Xumm API Key - Get one from https://apps.xumm.dev
VITE_XUMM_API_KEY=b53edeaf-0046-49a6-a100-4bb284be3682

# Xumm API Secret - Keep this secure and never expose it in frontend code
XUMM_API_SECRET=d4f38ef3-59ab-40fb-b590-4d28893def35

# XRPL Network Configuration
VITE_XRPL_NETWORK=testnet
VITE_XRPL_ENDPOINT=wss://testnet.xrpl-labs.com

# Public IP Configuration
VITE_PUBLIC_IP=3.111.22.56
VITE_PUBLIC_PORT=5002
```

### 2. Process Management with PM2

The application is configured to run with PM2 using the following setup:

1. Create an ecosystem configuration file `ecosystem.config.cjs`:
   ```javascript
   module.exports = {
     apps: [
       {
         name: 'xrpl-frontend',
         script: 'node_modules/vite/bin/vite.js',
         args: '--port 5002 --host 0.0.0.0',
         cwd: './',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
           NODE_ENV: 'production',
           PORT: 5002
         }
       },
       {
         name: 'xrpl-middleware',
         script: 'node_modules/.bin/convex',
         args: 'dev --typecheck=disable',
         cwd: './',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
           NODE_ENV: 'production'
         }
       },
       {
         name: 'xrpl-backend',
         script: 'node_modules/.bin/convex',
         args: 'dev --typecheck=disable',
         cwd: './',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
           NODE_ENV: 'production'
         }
       }
     ]
   };
   ```

2. Start the application with PM2:
   ```bash
   pm2 start ecosystem.config.cjs
   ```

3. Save the PM2 configuration:
   ```bash
   pm2 save
   ```

4. Set PM2 to start on system boot:
   ```bash
   pm2 startup
   ```

### 3. Set Up Reverse Proxy with Nginx

To make your application accessible via your public IP, you'll need to set up a reverse proxy. Here's how to do it with Nginx:

1. Install Nginx if not already installed:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Create an Nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/xrpl-fund-management
   ```

3. Add the following configuration:
   ```nginx
   # Frontend configuration
   server {
       listen 80;
       server_name 3.111.22.56;

       location / {
           proxy_pass http://localhost:5002;
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
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
       add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
   }

   # Middleware configuration
   server {
       listen 5003;
       server_name 3.111.22.56;

       location / {
           proxy_pass http://localhost:5003;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }

   # Backend configuration
   server {
       listen 5004;
       server_name 3.111.22.56;

       location / {
           proxy_pass http://localhost:5004;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/xrpl-fund-management /etc/nginx/sites-enabled/
   ```

5. Test the Nginx configuration:
   ```bash
   sudo nginx -t
   ```

6. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

### 4. Configure Firewall

Ensure your firewall allows traffic on the required ports:

```bash
# For UFW
sudo ufw allow 80
sudo ufw allow 5002
sudo ufw allow 5003
sudo ufw allow 5004

# For iptables
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 5002 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 5003 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 5004 -j ACCEPT
```

### 5. SSL Certificate (Recommended)

For production use, you should secure your application with HTTPS. You can use Let's Encrypt to get a free SSL certificate:

1. Install Certbot:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. Obtain and install the certificate:
   ```bash
   sudo certbot --nginx -d 3.111.22.56
   ```

3. Follow the prompts to complete the installation.

## Testing the Deployment

After completing the above steps:

1. Access your application at http://3.111.22.56:5002/
2. Click "Connect with Xaman" to test the wallet connection
3. Verify that the Xaman OAuth flow works correctly
4. Test all functionality to ensure proper operation

## Troubleshooting

### Common Issues

1. **Port conflicts**: Check what's running on the ports:
   ```bash
   sudo lsof -i :5002
   ```

2. **Nginx configuration errors**: Test your Nginx configuration:
   ```bash
   sudo nginx -t
   ```

3. **Firewall issues**: Check if the port is accessible:
   ```bash
   sudo ufw status
   ```

4. **Xaman redirect URI errors**: Ensure the redirect URI in Xaman Developer Console matches exactly:
   - `http://3.111.22.56:5002/` (note the trailing slash)

### Logs

Check application logs for debugging:

1. PM2 logs:
   ```bash
   pm2 logs
   ```

2. Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

## Maintenance

### Updating the Application

1. Pull the latest code:
   ```bash
   git pull
   ```

2. Install any new dependencies:
   ```bash
   npm install
   ```

3. Rebuild the application:
   ```bash
   npm run build
   ```

4. Restart the PM2 process:
   ```bash
   pm2 restart all
   ```

### Monitoring

Set up monitoring to ensure your application stays online:

1. Enable PM2 monitoring:
   ```bash
   pm2 monit
   ```

2. Set up health checks in your load balancer or monitoring system.

## Security Considerations

1. Always use HTTPS in production
2. Keep dependencies updated
3. Regularly review firewall rules
4. Monitor access logs for suspicious activity
5. Use strong authentication for server access

## Backup and Recovery

1. Regularly backup your database and configuration files
2. Test your backup restoration process
3. Keep copies of your SSL certificates
4. Document your deployment process for recovery scenarios

## Support

For support, contact Sandeep Kumar Sahoo at sandeep.savethem2@gmail.com, the sole creator of this institutional-grade XRPL fund management protocol.