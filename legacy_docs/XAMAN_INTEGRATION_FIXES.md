# Xaman Integration Fixes

## Issues Identified

1. **Port Configuration Mismatch**: 
   - Frontend configured to run on port 5176 (package.json)
   - Xaman integration expects port 5177 (XamanWalletConnect component)
   - This mismatch causes OAuth2 redirect URI errors

2. **Xaman Payload Server Not Responding**:
   - Server appears to start but doesn't respond to requests
   - Possible network/firewall/environment issues

3. **Xaman Developer Console Configuration**:
   - Redirect URIs need to match actual frontend URL

## Solutions

### 1. Fix Port Configuration Mismatch

Update the Vite configuration to use port 5177 to match the Xaman integration:

```javascript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    port: 5177, // Changed from 5176 to 5177
    host: '0.0.0.0',
    // ... rest of configuration
  },
  // ... rest of configuration
}));
```

### 2. Fix Xaman Payload Server

Create a working Xaman payload server implementation:

```typescript
// fixed-xaman-payload-server.ts
import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.VITE_XAMAN_PAYLOAD_PORT || process.env.XAMAN_PAYLOAD_PORT || '3001', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Get API credentials from environment variables
const apiKey = process.env.VITE_XUMM_API_KEY;
const apiSecret = process.env.XUMM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('Xaman API credentials not configured');
  process.exit(1);
}

// Initialize Xumm SDK with both credentials (only safe in backend)
const xumm = new Xumm(apiKey, apiSecret);

// Add error handling for the Xumm SDK
xumm.on('error', (error) => {
  console.error('Xumm SDK error:', error);
});

xumm.on('ready', () => {
  console.log('Xumm SDK is ready');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// HTTP endpoint for creating Xaman payloads
app.post('/api/create-xaman-payload', async (req, res) => {
  try {
    const body = req.body;
    
    // Create the payload based on the transaction type
    const payloadData = {
      TransactionType: body.transactionType || 'SignIn',
      // Add any additional transaction data from the body
      ...body.transactionData
    };
    
    // Create the payload using the Xumm SDK
    if (!xumm.payload) {
      throw new Error('Xumm payload is not available');
    }
    const payload = await xumm.payload.create(payloadData);
    
    if (!payload) {
      throw new Error('Failed to create payload');
    }
    
    // Return the payload data to the frontend
    res.status(200).json({
      success: true,
      uuid: payload.uuid,
      refs: payload.refs,
      pushed: payload.pushed,
      next: payload.next
    });
  } catch (error) {
    console.error('Error creating Xaman payload:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error creating Xaman payload" 
    });
  }
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Xaman payload server running at http://0.0.0.0:${port}`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

Update package.json to use the fixed server:

```json
{
  "scripts": {
    "dev:xaman": "npx tsx fixed-xaman-payload-server.ts"
  }
}
```

### 3. Update Xaman Developer Console Configuration

Add the following URIs to the "Origin/Redirect URIs" field in the Xaman Developer Console:

```
http://localhost:5177/
http://3.111.22.56:5002/
```

## Testing Steps

1. Update the Vite configuration to use port 5177
2. Add the redirect URIs to Xaman Developer Console
3. Start the development server: `npm run dev`
4. Navigate to http://localhost:5177/
5. Click "Connect with Xaman" and verify the OAuth flow works
6. Test payload creation functionality

## Additional Considerations

1. **Environment Variables**: Ensure all required environment variables are set in `.env`:
   ```
   VITE_XUMM_API_KEY=your_api_key
   XUMM_API_SECRET=your_api_secret
   VITE_XAMAN_PAYLOAD_PORT=3001
   ```

2. **Network Configuration**: Ensure port 3001 is accessible for the payload server

3. **Security**: Never expose API secrets in frontend code - only use them in backend services

4. **Error Handling**: Implement comprehensive error handling for all Xaman SDK operations

This solution addresses the core issues preventing the Xaman integration from working properly.