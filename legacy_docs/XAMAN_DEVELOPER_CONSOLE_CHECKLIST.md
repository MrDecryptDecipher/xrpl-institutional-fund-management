# Xaman Developer Console Configuration Checklist

## Application Information
- **API Key**: b53edeaf-0046-49a6-a100-4bb284be3682
- **Application Name**: [Your application name]
- **Application Status**: Active

## Required Configuration

### 1. Origin/Redirect URIs
Ensure the following URIs are added to the "Origin/Redirect URIs" field:
- [ ] `http://localhost:5176/` (for local development)
- [ ] `http://3.111.22.56:5002/` (for production/public access)

### 2. Application Settings
- [ ] Application is not disabled
- [ ] API Key is active
- [ ] No rate limiting issues

### 3. OAuth2 Settings
- [ ] OAuth2 is enabled for the application
- [ ] Redirect URIs are properly formatted (exact match required)
- [ ] No extra spaces or characters in URIs

## Verification Steps

### Step 1: Access Xaman Developer Console
1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`

### Step 2: Verify Redirect URIs
1. In the application settings, find the "Origin/Redirect URIs" section
2. Check that both required URIs are present:
   - `http://localhost:5176/`
   - `http://3.111.22.56:5002/`
3. Ensure there are no extra spaces or characters
4. Click "Save" to apply the changes

### Step 3: Test Configuration
1. Restart your application:
   ```bash
   pm2 restart all
   ```
2. Access your application at http://3.111.22.56:5002/
3. Click "Connect with Xaman" button
4. Verify that the connection works correctly

## Common Issues and Solutions

### 1. Redirect URI Mismatch
**Symptoms**: "Payload creation timeout" or "access_denied" errors
**Solution**: 
- Ensure exact match of URIs including trailing slash
- No extra spaces or characters
- Both development and production URIs are added

### 2. Application Disabled
**Symptoms**: "Invalid API key" or "Unauthorized" errors
**Solution**:
- Check that the application is not disabled in the Developer Console
- Verify that the API key is active

### 3. Network Connectivity Issues
**Symptoms**: Timeouts or "Failed to fetch" errors
**Solution**:
- Check server internet connectivity
- Verify firewall settings
- Test connectivity to Xaman services

## Testing Tools

### 1. Network Connectivity Test
Run the network connectivity test:
```bash
node test_network_connectivity.js
```

### 2. Simple SDK Test
Run the simple SDK test:
```bash
node test_xaman_sdk_simple.js
```

### 3. Browser Test
Access the browser test pages:
- http://3.111.22.56:5002/test_xaman_browser.html
- http://3.111.22.56:5002/test_xaman_official_pattern.html

## Support Information

**Developer**: Sandeep Kumar Sahoo
**Email**: sandeep.savethem2@gmail.com

This checklist provides a systematic approach to verifying and configuring your Xaman Developer Console settings to resolve connection issues.