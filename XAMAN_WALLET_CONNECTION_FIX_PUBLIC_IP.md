# Xaman Wallet Connection Fix - Public IP Configuration

## Problem Summary

Based on your request, we're configuring the application to be accessible via your public IP (3.111.22.56) with specific ports:
- Frontend: 5002
- Middleware: 5003
- Backend: 5004

## Configuration Changes Made

### 1. Updated Vite Configuration

Modified [vite.config.ts](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/vite.config.ts) to listen on all interfaces for both local and public access:

```typescript
server: {
  port: 5176,
  host: '0.0.0.0', // Listen on all interfaces for both localhost and public IP access
  strictPort: true,
  hmr: {
    protocol: 'ws',
    host: '0.0.0.0',
    port: 5176
  }
}
```

### 2. Updated Xaman Wallet Connection Component

Modified the error message in [XamanWalletConnect.tsx](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/src/components/XamanWalletConnect.tsx) to reference the correct public IP and port:

```typescript
const errorMessage = "Redirect URI not configured. Please ensure http://3.111.22.56:5002/ is added to your Xaman app settings in the Developer Console.";
```

### 3. Added Environment Variables

Updated [.env](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/.env) to include public IP configuration:

```bash
# Public IP Configuration
VITE_PUBLIC_IP=3.111.22.56
VITE_PUBLIC_PORT=5002
```

### 4. Added Support Page

Created a dedicated support page with your contact information:
- Developer: Sandeep Kumar Sahoo
- Email: sandeep.savethem2@gmail.com
- Accessible via the "Need Support? Contact Developer" link on the main page
- Also available through the "Support" button in the dashboard

## Required Configuration Steps

### 1. Verify Xaman Developer Console

Ensure your Xaman Developer Console is configured with the correct redirect URI:

1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
4. In the application settings, find the "Origin/Redirect URIs" section
5. Verify the following URI is added:
   ```
   http://3.111.22.56:5002/
   ```
6. Click "Save" to apply the changes

### 2. Set Up Reverse Proxy

To make your application accessible via your public IP, you need to set up a reverse proxy. We've created a comprehensive [DEPLOYMENT_GUIDE.md](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/DEPLOYMENT_GUIDE.md) with detailed instructions.

Example Nginx configuration:
```nginx
server {
    listen 5002;
    server_name 3.111.22.56;

    location / {
        proxy_pass http://localhost:5176;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Configure Firewall

Ensure your server firewall allows inbound connections on port 5002:

```bash
# Example for UFW firewall
sudo ufw allow 5002

# Example for iptables
sudo iptables -A INPUT -p tcp --dport 5002 -j ACCEPT
```

## Testing the Setup

### Local Development Testing

1. Start the application in development mode:
   ```bash
   npm run dev
   ```

2. Access http://localhost:5176/ in your browser
3. Click "Connect with Xaman" button
4. You should see either:
   - A QR code for desktop connections
   - The Xaman mobile authentication flow for mobile devices
5. After authentication, you should be connected to your XRPL wallet

### Public Access Testing

After setting up the reverse proxy:

1. Access http://3.111.22.56:5002/ in your browser
2. Click "Connect with Xaman" button
3. The Xaman OAuth flow should work correctly with your configured redirect URI

## Additional Considerations

### Security

When deploying to a public IP, consider these security measures:
1. Use HTTPS in production (consider Let's Encrypt for free SSL certificates)
2. Implement proper authentication and authorization
3. Regularly update dependencies
4. Monitor access logs for suspicious activity

### Performance

For production deployment:
1. Use PM2 for process management
2. Implement caching strategies
3. Optimize asset delivery
4. Set up proper error handling and monitoring

This configuration enables your application to be accessible via your public IP while maintaining proper development workflows.