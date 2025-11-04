# Xaman Connection Troubleshooting Guide

## Problem Analysis

Based on the console logs you provided:
```
XamanWalletConnect.tsx:352 Triggering Xumm authorization flow...
XamanWalletConnect.tsx:371 Using desktop QR code flow
XamanWalletConnect.tsx:417 Creating sign-in payload...
XamanWalletConnect.tsx:437 Error creating sign-in payload: Error: Payload creation timeout after 10 seconds
```

The issue is occurring specifically during payload creation, which typically indicates one of these problems:
1. OAuth2 redirect URI misconfiguration in Xaman Developer Console
2. Network connectivity issues
3. API key issues
4. Xaman service issues

## Immediate Steps to Resolve

### 1. Verify Xaman Developer Console Configuration

1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
4. In the application settings, find the "Origin/Redirect URIs" section
5. Ensure the following URIs are added:
   - For development: `http://localhost:5176/`
   - For production: `http://3.111.22.56:5002/`
6. Click "Save" to apply the changes

### 2. Restart Your Application

After updating the Xaman Developer Console:
```bash
pm2 restart all
```

### 3. Test with Debug Tools

Use the debug tools we created:
1. Access http://3.111.22.56:5002/debug_xaman_connection.html
2. Click "Test SDK Initialization"
3. Click "Test Payload Creation"
4. Observe the results

## Detailed Troubleshooting

### If Payload Creation Still Fails

#### Check Network Connectivity
```bash
# Test if your server can reach Xaman services
curl -I https://xumm.app
curl -I https://oauth2.xumm.app

# Check if your firewall is blocking connections
sudo ufw status
```

#### Verify API Key
Ensure your API key is correct in the [.env](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/.env) file:
```bash
VITE_XUMM_API_KEY=b53edeaf-0046-49a6-a100-4bb284be3682
```

#### Check Xaman Service Status
Visit https://status.xrpl-labs.com/ to see if there are any ongoing issues with Xaman services.

### Alternative Payload Creation Method

If the current payload creation method continues to fail, try using `createAndSubscribe` instead:

```typescript
const { created } = await xumm.payload.createAndSubscribe({
  TransactionType: "SignIn"
}, event => {
  // Handle events if needed
  console.log("Payload event:", event);
});

return created;
```

## Code-Level Debugging

### Add More Detailed Logging

Update the createSignInPayload function to include more detailed logging:

```typescript
const createSignInPayload = async () => {
  try {
    console.log("Creating sign-in payload...");
    
    // Log the xumm instance to verify it's properly initialized
    console.log("Xumm instance:", xumm);
    console.log("Xumm payload object:", xumm.payload);
    
    // Add timeout to payload creation
    const payloadPromise = xumm.payload.create({
      TransactionType: 'SignIn',
    });
    
    console.log("Payload promise created, waiting for response...");
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Payload creation timeout after 10 seconds')), 10000)
    );
    
    const payload: any = await Promise.race([payloadPromise, timeoutPromise]);
    console.log("Sign-in payload created successfully:", payload);
    
    // Validate payload structure
    if (!payload || !payload.uuid || !payload.refs || !payload.refs.qr_png) {
      throw new Error("Payload missing required properties");
    }
    
    return payload;
  } catch (error) {
    console.error("Error creating sign-in payload:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
};
```

## Common Solutions

### 1. Redirect URI Issues
The most common cause of payload creation timeouts is incorrect redirect URI configuration. Ensure:
- Both `http://localhost:5176/` and `http://3.111.22.56:5002/` are added
- No extra spaces or characters
- Exact match including trailing slash

### 2. Firewall/Network Issues
If you're running on a server:
```bash
# Allow outbound connections to Xaman services
sudo ufw allow out 443
sudo iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
```

### 3. API Key Issues
- Verify the API key hasn't been revoked
- Ensure you're using the correct API key (not the secret)
- Check that the application hasn't been disabled

## Testing with Simple HTML Page

Use the test_xaman_browser.html file to verify basic functionality:
1. Access http://3.111.22.56:5002/test_xaman_browser.html
2. Click the "Test Xaman Connection" button
3. Observe the results

## Support Information

**Developer**: Sandeep Kumar Sahoo
**Email**: sandeep.savethem2@gmail.com

If none of these solutions work, please provide:
1. The exact error messages from the browser console
2. Screenshots of your Xaman Developer Console redirect URI settings
3. Results from the debug tools
4. Output of network connectivity tests

This troubleshooting guide provides a systematic approach to resolving Xaman wallet connection issues in your XRPL Institutional Fund Management Protocol application.