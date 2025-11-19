# XRPL Institutional Fund Management Protocol - Application Access

## Services Status

Both required services are now running correctly:

1. **Xaman Payload Server** - Running on port 3001
   - Handles Xaman wallet authentication and payload creation
   - Accessible at: http://localhost:3001

2. **Frontend Server** - Running on port 5002
   - Serves the React application and proxies API requests
   - Accessible at: http://localhost:5002

## Access Instructions

### Local Access
- Open your browser and navigate to: http://localhost:5002

### Remote Access
- Use your server's IP address: http://3.111.22.56:5002
- This is your public IP for external access

## Key Features Working

1. **Xaman Wallet Integration**
   - The XamanWalletConnect component is properly configured
   - Uses proxy endpoint `/api/create-xaman-payload` for API calls
   - No longer attempts to connect directly to public IP

2. **API Proxying**
   - Frontend server correctly proxies `/api/*` requests to the Xaman payload server
   - This resolves CORS issues and enables proper communication

3. **External Accessibility**
   - Both servers bind to `0.0.0.0` allowing external connections
   - No longer restricted to localhost-only access

## Process Management

The services are managed by the `run-services.cjs` script which:
- Starts both the Xaman payload server and frontend server
- Runs both services in a single terminal
- Handles process lifecycle management

To stop the services, use Ctrl+C in the terminal where they're running.

## Troubleshooting

If you encounter issues:

1. **Port Conflicts**
   - Check if services are already running: `lsof -i :5002` and `lsof -i :3001`
   - Kill conflicting processes if needed

2. **Xaman Connection Issues**
   - Verify the redirect URI is configured in Xaman Developer Console
   - Ensure `http://localhost:5177/` is added to "Origin/Redirect URIs"

3. **Service Not Starting**
   - Check that all required environment variables are set in `.env`
   - Verify the Xaman API key and secret are correct

## Created by
Sandeep Kumar Sahoo