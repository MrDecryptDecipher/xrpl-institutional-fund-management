# Xaman SDK Implementation Guide

## Overview

This guide provides a comprehensive overview of the proper implementation of the Xaman SDK based on official documentation and best practices. It addresses the issues identified in the previous implementation and provides a correct approach for integrating Xaman wallet functionality.

## Key Principles

### 1. Authentication
- For browser environments, only the **API Key** should be used for SDK initialization
- **API Secret** should never be exposed in frontend code - it's only for backend use
- OAuth2 flow requires proper redirect URI configuration in the Xaman Developer Console

### 2. SDK Initialization
```javascript
// Correct initialization for browser environments
import { Xumm } from "xumm";
const xumm = new Xumm('your-api-key');
```

### 3. Event Handling
The SDK provides several important events:
- `ready`: SDK is initialized and ready to use
- `success`: User successfully authorized/sign in
- `error`: An error occurred
- `logout`: User logged out

### 4. User Information
User information can be accessed through promises:
```javascript
xumm.user.account.then(account => {
  console.log("User account:", account);
});
```

## Browser Integration Best Practices

### 1. Proper SDK Setup
```html
<script src="https://xaman.app/assets/cdn/xumm.min.js"></script>
<script>
  var xumm = new Xumm('your-api-key');
  
  xumm.on("ready", () => console.log("SDK Ready"));
  xumm.on("success", () => console.log("Authorization Successful"));
  xumm.on("error", (error) => console.error("Error:", error));
  xumm.on("logout", () => console.log("User Logged Out"));
</script>
```

### 2. Sign In Flow
For browser environments, there are two main flows:

#### Mobile Flow
- Uses deeplinking to open Xaman app directly
- Requires proper return URLs for user to return to the web app

#### Desktop Flow
- Shows QR code for user to scan with Xaman app on their phone
- Can use `createAndSubscribe` method for real-time updates

### 3. Payload Creation
Payloads are sign requests that can be created in two ways:

#### Simple Creation
```javascript
xumm.payload.create({
  txjson: {
    TransactionType: "Payment",
    Destination: "r...",
    Amount: "1000000"
  }
}).then(payload => {
  // Handle payload response
  console.log("Payload URL:", payload.next.always);
  console.log("Payload QR:", payload.refs.qr_png);
});
```

#### Creation with Subscription
```javascript
xumm.payload.createAndSubscribe({
  TransactionType: 'Payment',
  Destination: 'rfHn6cB5mmqZ6fHZ4fdemCDSxqLTijgMwo',
  Amount: String(1000000) // one million drops, 1 XRP
}, eventMessage => {
  if ('opened' in eventMessage.data) {
    // Update UI - payload was opened
  }
  if ('signed' in eventMessage.data) {
    // Handle signed/rejected payload
    return eventMessage;
  }
}).then(({ created, resolved }) => {
  console.log('Payload URL:', created.next.always);
  console.log('Payload QR:', created.refs.qr_png);
  return resolved;
}).then(payload => console.log('Payload resolved', payload));
```

## Security Considerations

### 1. API Credential Protection
- Never expose API Secret in frontend code
- Use only API Key for browser integrations
- Store API Secret securely on backend servers

### 2. CORS Configuration
- Xaman API endpoints allow cross-origin requests
- When using JWT tokens, ensure proper CORS headers are used
- For backend integrations, CORS is irrelevant

### 3. OAuth2 Implementation
- PKCE flow is the most secure option
- Proper redirect URIs must be configured in Xaman Developer Console
- JWT tokens are valid for 24 hours and cannot be refreshed

## Common Issues and Solutions

### 1. Payload Creation Timeout
**Causes:**
- Incorrect redirect URI configuration
- Network connectivity issues
- SDK not properly initialized

**Solutions:**
- Verify redirect URIs in Xaman Developer Console
- Ensure API Key is correct
- Check network connectivity
- Verify SDK initialization

### 2. WebSocket Connection Issues
**Causes:**
- Incorrect HMR configuration in development environments
- Network restrictions
- Browser security settings

**Solutions:**
- Use 'localhost' instead of '0.0.0.0' for WebSocket connections
- Ensure proper network configuration
- Check browser console for specific error messages

### 3. Authentication Failures
**Causes:**
- Using API Secret in frontend code
- Incorrect API Key
- Misconfigured OAuth2 settings

**Solutions:**
- Use only API Key for browser integrations
- Verify API Key in Xaman Developer Console
- Check OAuth2 redirect URI configuration

## Implementation Checklist

### ✅ Browser Integration
- [ ] SDK initialized with API Key only
- [ ] Proper event handlers implemented
- [ ] User information accessed through promises
- [ ] Correct sign in flow for mobile/desktop
- [ ] Payload creation with proper error handling

### ✅ Security
- [ ] API Secret not exposed in frontend
- [ ] Proper redirect URI configuration
- [ ] Secure storage of backend credentials
- [ ] JWT token handling (if applicable)

### ✅ Error Handling
- [ ] Timeout protection for async operations
- [ ] Clear error messages for users
- [ ] Proper cleanup of event listeners
- [ ] Graceful degradation for network issues

## API Endpoints Reference

### Authentication
- Auth URL: `https://oauth2.xumm.app/auth`
- Token URL: `https://oauth2.xumm.app/token`
- Userinfo URL: `https://oauth2.xumm.app/userinfo`

### Payload Management
- Create payload: `POST /payload`
- Get payload: `GET /payload/:payload_uuid`
- Cancel payload: `DELETE /payload/:payload_uuid`

### JWT Compatible Endpoints
- Ping: `GET /jwt/ping`
- Curated assets: `GET /jwt/curated-assets`
- Rates: `GET /jwt/rates/:currency`

## Sample Implementation

### React Component Example
```javascript
import { useState, useEffect } from "react";
import { Xumm } from "xumm";

const XamanWalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Initialize SDK
  useEffect(() => {
    const xumm = new Xumm(import.meta.env.VITE_XUMM_API_KEY);
    
    xumm.on("success", async () => {
      try {
        const account = await xumm.user.account;
        setAccount(account);
        setIsConnected(true);
        setIsConnecting(false);
      } catch (error) {
        console.error("Error getting user account:", error);
      }
    });
    
    xumm.on("logout", () => {
      setIsConnected(false);
      setAccount("");
    });
    
    // Cleanup
    return () => {
      xumm.removeAllListeners();
    };
  }, []);
  
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // This will trigger the appropriate flow based on device
      await xumm.authorize();
    } catch (error) {
      console.error("Connection error:", error);
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    xumm.logout();
  };
  
  if (isConnected) {
    return (
      <div>
        <p>Connected to Xaman Wallet</p>
        <p>Account: {account}</p>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
  }
  
  return (
    <button onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Xaman"}
    </button>
  );
};

export default XamanWalletConnect;
```

## Environment Configuration

### Xaman Developer Console Settings
1. Add redirect URIs to "Origin/Redirect URIs" field:
   - For localhost development: `http://localhost:5176/`
   - For production: `https://yourdomain.com/`

2. Ensure API Key is correct and active

3. Verify application settings match your implementation

### Vite Configuration
```javascript
// vite.config.ts
export default defineConfig({
  server: {
    port: 5176,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost', // Use localhost instead of 0.0.0.0
      port: 5176
    }
  }
});
```

## Testing and Debugging

### 1. Console Logging
Enable detailed logging to track SDK events:
```javascript
xumm.on("retrieving", () => console.log("Retrieving user data"));
xumm.on("retrieved", () => console.log("User data retrieved"));
```

### 2. Error Handling
Implement comprehensive error handling:
```javascript
xumm.on("error", (error) => {
  console.error("Xaman SDK Error:", error);
  // Display user-friendly error message
});
```

### 3. Network Testing
Verify connectivity with ping:
```javascript
xumm.ping().then(response => {
  console.log("Xaman API connectivity:", response);
});
```

This guide provides a comprehensive approach to implementing the Xaman SDK correctly, addressing both the WebSocket connection issues and the payload creation timeout problems that were previously encountered.# Xaman SDK Implementation Guide

## Overview

This guide provides a comprehensive overview of the proper implementation of the Xaman SDK based on official documentation and best practices. It addresses the issues identified in the previous implementation and provides a correct approach for integrating Xaman wallet functionality.

## Key Principles

### 1. Authentication
- For browser environments, only the **API Key** should be used for SDK initialization
- **API Secret** should never be exposed in frontend code - it's only for backend use
- OAuth2 flow requires proper redirect URI configuration in the Xaman Developer Console

### 2. SDK Initialization
```javascript
// Correct initialization for browser environments
import { Xumm } from "xumm";
const xumm = new Xumm('your-api-key');
```

### 3. Event Handling
The SDK provides several important events:
- `ready`: SDK is initialized and ready to use
- `success`: User successfully authorized/sign in
- `error`: An error occurred
- `logout`: User logged out

### 4. User Information
User information can be accessed through promises:
```javascript
xumm.user.account.then(account => {
  console.log("User account:", account);
});
```

## Browser Integration Best Practices

### 1. Proper SDK Setup
```html
<script src="https://xaman.app/assets/cdn/xumm.min.js"></script>
<script>
  var xumm = new Xumm('your-api-key');
  
  xumm.on("ready", () => console.log("SDK Ready"));
  xumm.on("success", () => console.log("Authorization Successful"));
  xumm.on("error", (error) => console.error("Error:", error));
  xumm.on("logout", () => console.log("User Logged Out"));
</script>
```

### 2. Sign In Flow
For browser environments, there are two main flows:

#### Mobile Flow
- Uses deeplinking to open Xaman app directly
- Requires proper return URLs for user to return to the web app

#### Desktop Flow
- Shows QR code for user to scan with Xaman app on their phone
- Can use `createAndSubscribe` method for real-time updates

### 3. Payload Creation
Payloads are sign requests that can be created in two ways:

#### Simple Creation
```javascript
xumm.payload.create({
  txjson: {
    TransactionType: "Payment",
    Destination: "r...",
    Amount: "1000000"
  }
}).then(payload => {
  // Handle payload response
  console.log("Payload URL:", payload.next.always);
  console.log("Payload QR:", payload.refs.qr_png);
});
```

#### Creation with Subscription
```javascript
xumm.payload.createAndSubscribe({
  TransactionType: 'Payment',
  Destination: 'rfHn6cB5mmqZ6fHZ4fdemCDSxqLTijgMwo',
  Amount: String(1000000) // one million drops, 1 XRP
}, eventMessage => {
  if ('opened' in eventMessage.data) {
    // Update UI - payload was opened
  }
  if ('signed' in eventMessage.data) {
    // Handle signed/rejected payload
    return eventMessage;
  }
}).then(({ created, resolved }) => {
  console.log('Payload URL:', created.next.always);
  console.log('Payload QR:', created.refs.qr_png);
  return resolved;
}).then(payload => console.log('Payload resolved', payload));
```

## Security Considerations

### 1. API Credential Protection
- Never expose API Secret in frontend code
- Use only API Key for browser integrations
- Store API Secret securely on backend servers

### 2. CORS Configuration
- Xaman API endpoints allow cross-origin requests
- When using JWT tokens, ensure proper CORS headers are used
- For backend integrations, CORS is irrelevant

### 3. OAuth2 Implementation
- PKCE flow is the most secure option
- Proper redirect URIs must be configured in Xaman Developer Console
- JWT tokens are valid for 24 hours and cannot be refreshed

## Common Issues and Solutions

### 1. Payload Creation Timeout
**Causes:**
- Incorrect redirect URI configuration
- Network connectivity issues
- SDK not properly initialized

**Solutions:**
- Verify redirect URIs in Xaman Developer Console
- Ensure API Key is correct
- Check network connectivity
- Verify SDK initialization

### 2. WebSocket Connection Issues
**Causes:**
- Incorrect HMR configuration in development environments
- Network restrictions
- Browser security settings

**Solutions:**
- Use 'localhost' instead of '0.0.0.0' for WebSocket connections
- Ensure proper network configuration
- Check browser console for specific error messages

### 3. Authentication Failures
**Causes:**
- Using API Secret in frontend code
- Incorrect API Key
- Misconfigured OAuth2 settings

**Solutions:**
- Use only API Key for browser integrations
- Verify API Key in Xaman Developer Console
- Check OAuth2 redirect URI configuration

## Implementation Checklist

### ✅ Browser Integration
- [ ] SDK initialized with API Key only
- [ ] Proper event handlers implemented
- [ ] User information accessed through promises
- [ ] Correct sign in flow for mobile/desktop
- [ ] Payload creation with proper error handling

### ✅ Security
- [ ] API Secret not exposed in frontend
- [ ] Proper redirect URI configuration
- [ ] Secure storage of backend credentials
- [ ] JWT token handling (if applicable)

### ✅ Error Handling
- [ ] Timeout protection for async operations
- [ ] Clear error messages for users
- [ ] Proper cleanup of event listeners
- [ ] Graceful degradation for network issues

## API Endpoints Reference

### Authentication
- Auth URL: `https://oauth2.xumm.app/auth`
- Token URL: `https://oauth2.xumm.app/token`
- Userinfo URL: `https://oauth2.xumm.app/userinfo`

### Payload Management
- Create payload: `POST /payload`
- Get payload: `GET /payload/:payload_uuid`
- Cancel payload: `DELETE /payload/:payload_uuid`

### JWT Compatible Endpoints
- Ping: `GET /jwt/ping`
- Curated assets: `GET /jwt/curated-assets`
- Rates: `GET /jwt/rates/:currency`

## Sample Implementation

### React Component Example
```javascript
import { useState, useEffect } from "react";
import { Xumm } from "xumm";

const XamanWalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Initialize SDK
  useEffect(() => {
    const xumm = new Xumm(import.meta.env.VITE_XUMM_API_KEY);
    
    xumm.on("success", async () => {
      try {
        const account = await xumm.user.account;
        setAccount(account);
        setIsConnected(true);
        setIsConnecting(false);
      } catch (error) {
        console.error("Error getting user account:", error);
      }
    });
    
    xumm.on("logout", () => {
      setIsConnected(false);
      setAccount("");
    });
    
    // Cleanup
    return () => {
      xumm.removeAllListeners();
    };
  }, []);
  
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // This will trigger the appropriate flow based on device
      await xumm.authorize();
    } catch (error) {
      console.error("Connection error:", error);
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    xumm.logout();
  };
  
  if (isConnected) {
    return (
      <div>
        <p>Connected to Xaman Wallet</p>
        <p>Account: {account}</p>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
  }
  
  return (
    <button onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Xaman"}
    </button>
  );
};

export default XamanWalletConnect;
```

## Environment Configuration

### Xaman Developer Console Settings
1. Add redirect URIs to "Origin/Redirect URIs" field:
   - For localhost development: `http://localhost:5176/`
   - For production: `https://yourdomain.com/`

2. Ensure API Key is correct and active

3. Verify application settings match your implementation

### Vite Configuration
```javascript
// vite.config.ts
export default defineConfig({
  server: {
    port: 5176,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost', // Use localhost instead of 0.0.0.0
      port: 5176
    }
  }
});
```

## Testing and Debugging

### 1. Console Logging
Enable detailed logging to track SDK events:
```javascript
xumm.on("retrieving", () => console.log("Retrieving user data"));
xumm.on("retrieved", () => console.log("User data retrieved"));
```

### 2. Error Handling
Implement comprehensive error handling:
```javascript
xumm.on("error", (error) => {
  console.error("Xaman SDK Error:", error);
  // Display user-friendly error message
});
```

### 3. Network Testing
Verify connectivity with ping:
```javascript
xumm.ping().then(response => {
  console.log("Xaman API connectivity:", response);
});
```

This guide provides a comprehensive approach to implementing the Xaman SDK correctly, addressing both the WebSocket connection issues and the payload creation timeout problems that were previously encountered.