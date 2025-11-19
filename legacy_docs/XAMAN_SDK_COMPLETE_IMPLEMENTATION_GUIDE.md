# Xaman SDK Complete Implementation Guide

Based on comprehensive research using Playwright MCP to analyze Xaman documentation and API endpoints.

## Table of Contents
1. [Authentication Requirements](#authentication-requirements)
2. [SDK Initialization](#sdk-initialization)
3. [API Endpoints](#api-endpoints)
4. [OAuth2 Flow](#oauth2-flow)
5. [CORS Configuration](#cors-configuration)
6. [Redirect URI Setup](#redirect-uri-setup)
7. [Payload Creation](#payload-creation)
8. [Error Handling](#error-handling)
9. [Browser vs Backend Usage](#browser-vs-backend-usage)
10. [Security Best Practices](#security-best-practices)

## Authentication Requirements

### API Credentials
Based on Xaman documentation, the SDK requires **both** API Key and API Secret for proper authentication:

```javascript
// Correct initialization (requires both credentials)
const { Xumm } = require('xumm');
const xumm = new Xumm('YOUR_API_KEY', 'YOUR_API_SECRET');
```

### Credential Storage
- **API Key**: Can be exposed in frontend code (used as client_id in OAuth2)
- **API Secret**: Should NEVER be exposed in frontend code in production
- Store API Secret securely on your backend server

## SDK Initialization

### Backend Implementation
```javascript
const { Xumm } = require('xumm');

// Both credentials required for full SDK functionality
const xumm = new Xumm(
    process.env.XUMM_API_KEY,     // API Key
    process.env.XUMM_API_SECRET   // API Secret
);

// Wait for SDK to be ready
xumm.on('ready', () => {
    console.log('Xumm SDK is ready');
});

// Handle errors
xumm.on('error', (error) => {
    console.error('Xumm SDK Error:', error);
});
```

### Browser Implementation
```html
<!-- For browser environments, use the CDN version -->
<script src="https://xumm.app/assets/cdn/xumm.min.js"></script>
<script>
    // Only API Key is used in browser (for OAuth2 flow)
    const xumm = new Xumm('YOUR_API_KEY');
    
    // Handle SDK events
    xumm.on('ready', () => {
        console.log('Xumm SDK ready for browser use');
    });
    
    xumm.on('success', async () => {
        // User successfully authenticated
        const account = await xumm.user.account;
        console.log('User account:', account);
    });
    
    xumm.on('error', (error) => {
        console.error('Xumm SDK Error:', error);
    });
</script>
```

## API Endpoints

### Platform API (Backend Only)
These endpoints require both API Key and API Secret:

```
POST https://xumm.app/api/v1/platform/ping
POST https://xumm.app/api/v1/platform/payload
GET https://xumm.app/api/v1/platform/payload/{uuid}
```

Headers required:
```
X-API-Key: YOUR_API_KEY
X-API-Secret: YOUR_API_SECRET
Content-Type: application/json
```

### JWT API (CORS Enabled)
These endpoints work in browser environments with a JWT token:

```
GET https://xumm.app/api/v1/jwt/ping
GET https://xumm.app/api/v1/jwt/curated-assets
POST https://xumm.app/api/v1/jwt/payload
GET https://xumm.app/api/v1/jwt/payload/{uuid}
```

Headers required:
```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

## OAuth2 Flow

### Authorization URL
```
https://oauth2.xumm.app/auth?
    client_id=YOUR_API_KEY&
    redirect_uri=YOUR_REDIRECT_URI&
    response_type=token&
    scope=XummPkce
```

### Flow Steps
1. Redirect user to authorization URL
2. User authenticates in Xaman app
3. User is redirected back to your app with JWT token
4. Use JWT token to call JWT API endpoints

### PKCE Flow (Recommended)
For enhanced security, use the PKCE flow with the `xumm-oauth2-pkce` package:

```javascript
import { XummPkce } from 'xumm-oauth2-pkce';

const pkce = new XummPkce('YOUR_API_KEY');

// Start authorization flow
pkce.authorize().then(jwt => {
    console.log('JWT Token:', jwt);
    // Use JWT to call Xaman APIs
});
```

## CORS Configuration

### Required Headers
For browser environments to work properly, your server must return these headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, X-API-Key, X-API-Secret
Access-Control-Allow-Credentials: true
```

### Xaman CORS Support
- Xaman JWT endpoints allow CORS requests
- Platform API endpoints do NOT allow CORS (backend only)
- Always use the appropriate endpoint for your environment

## Redirect URI Setup

### Configuration in Xaman Developer Console
1. Go to https://apps.xumm.dev/
2. Select your application
3. Add your URIs to "Origin/Redirect URIs" field:
   ```
   http://3.111.22.56:5002/
   http://localhost:5176/
   ```

### URI Requirements
- Must be exact match (including trailing slash)
- Both HTTP and HTTPS supported
- Multiple URIs allowed (one per line)
- Used for OAuth2 redirect after authentication

## Payload Creation

### Simple Payment Payload
```javascript
const payload = await xumm.payload.create({
    TransactionType: 'Payment',
    Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    Amount: '1000000', // 1 XRP in drops
    Fee: '12'
});
```

### Complex Transaction Payload
```javascript
const payload = await xumm.payload.create({
    txjson: {
        TransactionType: 'Payment',
        Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
        Amount: {
            currency: 'USD',
            value: '100',
            issuer: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'
        },
        Fee: '12',
        Memos: [
            {
                Memo: {
                    MemoType: Buffer.from('Message', 'utf8').toString('hex'),
                    MemoData: Buffer.from('Payment for services', 'utf8').toString('hex')
                }
            }
        ]
    },
    options: {
        submit: true,
        multisign: false,
        expire: 600 // 10 minutes
    }
});
```

## Error Handling

### Common Errors and Solutions

#### Payload Creation Timeout
```javascript
try {
    const payload = await xumm.payload.create(tx);
} catch (error) {
    if (error.message.includes('Payload creation timeout')) {
        console.error('Check:', {
            'API credentials': 'Both API Key and Secret required',
            'Network connectivity': 'Ensure access to xumm.app',
            'Redirect URIs': 'Verify configuration in Developer Console',
            'CORS settings': 'Check server headers'
        });
    }
    throw error;
}
```

#### Authentication Errors
```javascript
xumm.on('error', (error) => {
    if (error.code === 'AUTH_FAILED') {
        console.error('Authentication failed - check API credentials');
    } else if (error.code === 'INVALID_JWT') {
        console.error('Invalid JWT token - re-authenticate user');
    }
});
```

## Browser vs Backend Usage

### Backend Usage
- Full SDK functionality available
- Requires both API Key and API Secret
- Can create payloads directly
- No CORS restrictions

### Browser Usage
- Limited to OAuth2 flow
- Only API Key required
- Must use JWT tokens for API calls
- CORS-enabled endpoints only
- Better for user authentication flows

## Security Best Practices

### Credential Management
1. Never expose API Secret in frontend code
2. Use environment variables for credentials
3. Rotate credentials regularly
4. Restrict API key permissions when possible

### JWT Token Handling
1. Store JWT tokens securely (HttpOnly cookies)
2. Implement token refresh mechanisms
3. Validate token expiration before use
4. Use short-lived tokens (24h validity)

### Redirect URI Security
1. Use HTTPS in production
2. Validate redirect URIs server-side
3. Implement state parameter for CSRF protection
4. Whitelist only necessary URIs

### Network Security
1. Use HTTPS for all API calls
2. Implement proper error handling
3. Log security-relevant events
4. Monitor API usage for anomalies

## Implementation Checklist

### ✅ Pre-Implementation
- [ ] Obtain API Key and API Secret from Xaman Developer Console
- [ ] Configure Redirect URIs in Developer Console
- [ ] Set up environment variables for credentials
- [ ] Install required npm packages

### ✅ Backend Setup
- [ ] Initialize SDK with both API Key and Secret
- [ ] Implement payload creation endpoints
- [ ] Set up proper error handling
- [ ] Configure logging and monitoring

### ✅ Frontend Setup
- [ ] Implement OAuth2 flow
- [ ] Handle JWT token storage and retrieval
- [ ] Create user authentication UI
- [ ] Implement proper error messages

### ✅ Security Configuration
- [ ] Set up CORS headers correctly
- [ ] Implement token refresh mechanisms
- [ ] Add CSRF protection for OAuth2 flows
- [ ] Configure HTTPS for production

### ✅ Testing
- [ ] Test payload creation with testnet accounts
- [ ] Verify OAuth2 flow works in browser
- [ ] Check error handling for common scenarios
- [ ] Validate security measures are working

## Troubleshooting Guide

### Common Issues

#### 1. Payload Creation Timeout
**Causes:**
- Missing API Secret in SDK initialization
- Incorrect Redirect URI configuration
- Network connectivity issues
- CORS configuration problems

**Solutions:**
- Ensure SDK is initialized with both API Key and API Secret
- Verify Redirect URIs in Xaman Developer Console
- Check network connectivity to xumm.app
- Validate CORS headers on your server

#### 2. CORS Errors
**Causes:**
- Calling platform API endpoints from browser
- Missing or incorrect CORS headers
- Using wrong API endpoints for browser usage

**Solutions:**
- Use JWT API endpoints for browser requests
- Configure proper CORS headers on your server
- Ensure you're using the correct authentication method

#### 3. Invalid Credentials
**Causes:**
- Incorrect API Key or API Secret
- Credentials not properly configured
- Using production credentials in development

**Solutions:**
- Verify credentials in Xaman Developer Console
- Check environment variable configuration
- Use appropriate credentials for environment

### Debugging Steps

1. **Check SDK Initialization**
   ```javascript
   console.log('API Key:', process.env.XUMM_API_KEY);
   console.log('API Secret:', process.env.XUMM_API_SECRET ? '[SET]' : '[NOT SET]');
   ```

2. **Test Platform API Directly**
   ```bash
   curl -X POST https://xumm.app/api/v1/platform/ping \
     -H "X-API-Key: YOUR_API_KEY" \
     -H "X-API-Secret: YOUR_API_SECRET" \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

3. **Verify Redirect URIs**
   - Check exact match in Developer Console
   - Include trailing slashes
   - Test both HTTP and HTTPS if applicable

4. **Check Network Connectivity**
   ```bash
   ping xumm.app
   curl -v https://xumm.app/api/v1/platform/ping
   ```

This guide provides a comprehensive approach to implementing the Xaman SDK correctly based on official documentation and API endpoint analysis.