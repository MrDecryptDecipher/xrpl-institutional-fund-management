# Xaman Connection Debugging Guide

## Overview

This guide explains how to use the debug tools to troubleshoot Xaman wallet connection issues in your XRPL Institutional Fund Management Protocol application.

## Debugging Tools

### 1. debug_xaman_connection.html

This is a comprehensive debugging tool that allows you to test different aspects of the Xaman connection:

1. **Test SDK Initialization** - Verifies that the Xumm SDK can be properly initialized
2. **Test API Ping** - Checks connectivity to the Xumm API
3. **Test Payload Creation** - Tests the ability to create payloads (QR codes)
4. **Test Authorization Flow** - Tests the OAuth2 authorization flow

### 2. test_xaman_browser.html

A simpler test that focuses on basic SDK functionality and payload creation.

## How to Use the Debug Tools

### Accessing the Debug Tools

1. Start your application:
   ```bash
   npm run dev
   ```

2. Access the debug tools through your browser:
   - For local development: http://localhost:5176/debug_xaman_connection.html
   - For public access: http://3.111.22.56:5002/debug_xaman_connection.html

### Running the Tests

1. **Initialize the SDK first** by clicking "Test SDK Initialization"
2. **Test API connectivity** by clicking "Test API Ping"
3. **Test payload creation** by clicking "Test Payload Creation"
4. **Test authorization flow** by clicking "Test Authorization Flow"

### Interpreting Results

#### Successful Tests
- Green success messages indicate that each step completed correctly
- JSON responses show the actual data returned by the API

#### Error Messages
- Red error messages indicate issues that need to be addressed
- Common errors include:
  - "Payload creation timeout" - Usually indicates redirect URI issues
  - "Invalid API key" - Check that your API key is correct
  - "Network error" - Check your internet connectivity

## Common Issues and Solutions

### 1. Payload Creation Timeout

**Symptoms:**
- "Payload creation timeout after 10 seconds" error
- No QR code is generated

**Solutions:**
1. Verify Xaman Developer Console configuration:
   - Go to https://apps.xumm.dev
   - Log in with your credentials
   - Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
   - Ensure `http://3.111.22.56:5002/` is added to "Origin/Redirect URIs"
   - Save the configuration

2. Check network connectivity:
   - Ensure your server can reach https://xumm.app
   - Check firewall settings

3. Restart your application:
   ```bash
   pm2 restart all
   ```

### 2. Invalid API Key

**Symptoms:**
- "Invalid API key" or "Unauthorized" errors
- SDK initialization fails

**Solutions:**
1. Verify your API key in the [.env](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/.env) file:
   ```bash
   VITE_XUMM_API_KEY=b53edeaf-0046-49a6-a100-4bb284be3682
   ```

2. Ensure you're using the correct API key from the Xaman Developer Console

### 3. Network Connectivity Issues

**Symptoms:**
- "Network error" or "Failed to fetch" errors
- API ping fails

**Solutions:**
1. Check internet connectivity on your server:
   ```bash
   ping xumm.app
   ```

2. Verify firewall settings:
   ```bash
   sudo ufw status
   ```

3. Check if your server can reach the Xumm API:
   ```bash
   curl -I https://xumm.app
   ```

## Xaman Developer Console Configuration

### Required Redirect URIs

For your application to work correctly, you must configure the following redirect URIs in your Xaman Developer Console:

1. **Development Environment:**
   - `http://localhost:5176/`

2. **Production Environment:**
   - `http://3.111.22.56:5002/`

### Configuration Steps

1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
4. In the application settings, find the "Origin/Redirect URIs" section
5. Add both URIs listed above
6. Click "Save" to apply the changes

## Support Information

**Developer**: Sandeep Kumar Sahoo
**Email**: sandeep.savethem2@gmail.com

This debugging guide provides tools and procedures to identify and resolve common Xaman wallet connection issues in your XRPL Institutional Fund Management Protocol application.