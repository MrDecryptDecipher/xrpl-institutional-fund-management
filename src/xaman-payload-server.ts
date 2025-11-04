import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.XAMAN_PAYLOAD_PORT || '3001', 10);

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

// In-memory storage for user tokens (use database in production)
interface UserTokenData {
  user_token: string;
  xrpl_account: string;
  token_issued: number;
  token_expiration: number;
}

const userTokens = new Map<string, UserTokenData>();

// Helper function to check if token is expired
function isTokenExpired(tokenData: UserTokenData): boolean {
  return Date.now() > tokenData.token_expiration;
}

// Helper function to get valid user token for account
function getUserToken(xrplAccount: string): string | null {
  const tokenData = userTokens.get(xrplAccount);
  if (!tokenData) {
    console.log(`No user token found for account: ${xrplAccount}`);
    return null;
  }

  if (isTokenExpired(tokenData)) {
    console.log(`User token expired for account: ${xrplAccount}`);
    userTokens.delete(xrplAccount); // Clean up expired token
    return null;
  }

  console.log(`Valid user token found for account: ${xrplAccount}`);
  return tokenData.user_token;
}

// Add error handling for the Xumm SDK
xumm.on('error', (error) => {
  console.error('Xumm SDK error:', error);
});

xumm.on('ready', () => {
  console.log('Xumm SDK is ready');
});

// Test the SDK connection
xumm.ping().then((pong) => {
  console.log('Xumm SDK ping successful:', pong);
}).catch((error) => {
  console.error('Xumm SDK ping failed:', error);
});

// Health check endpoint
app.get('/health', (_req, res) => {
  console.log('Health check endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// HTTP endpoint for creating Xaman payloads
app.post('/api/create-xaman-payload', async (req, res) => {
  try {
    const body = req.body;

    console.log('Creating Xaman payload with body:', JSON.stringify(body, null, 2));

    // Create the payload with txjson wrapper (required by Xaman API)
    const payloadData: any = {
      txjson: {
        TransactionType: body.transactionType || 'SignIn',
        // Add any additional transaction data from the body
        ...body.transactionData
      }
    };

    // Add user_token if available for this account (enables push notifications)
    if (body.xrplAccount) {
      const userToken = getUserToken(body.xrplAccount);
      if (userToken) {
        payloadData.user_token = userToken;
        console.log('✅ Adding user_token to payload for push notification');
      } else {
        console.log('ℹ️ No valid user_token available - payload will use QR code only');
      }
    }

    // Validate payloadData
    if (!payloadData.txjson.TransactionType) {
      return res.status(400).json({
        success: false,
        error: 'TransactionType is required'
      });
    }

    console.log('Creating payload with data:', JSON.stringify(payloadData, null, 2));

    // Create the payload using the Xumm SDK
    if (!xumm.payload) {
      throw new Error('Xumm payload service is not available');
    }

    console.log('Calling xumm.payload.create...');
    console.log('Payload data being sent:', JSON.stringify(payloadData, null, 2));

    // Try calling the API directly to get better error messages
    const apiUrl = 'https://xumm.app/api/v1/platform/payload';
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey!,
        'X-API-Secret': apiSecret!,
      },
      body: JSON.stringify(payloadData),
    });

    console.log('API response status:', apiResponse.status);
    const responseText = await apiResponse.text();
    console.log('API response body:', responseText);

    if (!apiResponse.ok) {
      throw new Error(`Xaman API error (${apiResponse.status}): ${responseText}`);
    }

    const payload = JSON.parse(responseText);
    console.log('Payload parsed:', payload);

    if (!payload.uuid) {
      console.error('Payload missing uuid:', payload);
      throw new Error('Payload response missing uuid');
    }

    console.log('Payload created successfully:', payload.uuid);
    console.log('Payload details:', JSON.stringify(payload, null, 2));

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

// HTTP endpoint for executing transactions
app.post('/api/execute-transaction', async (req, res) => {
  try {
    const body = req.body;
    
    console.log('Executing transaction with body:', JSON.stringify(body, null, 2));
    
    // Create a Payment transaction
    const transaction: any = {
      TransactionType: "Payment",
      Account: body.account,
      Amount: body.amount, // Already in drops from frontend
      Destination: body.recipient
    };
    
    console.log('Creating payload with transaction:', JSON.stringify(transaction, null, 2));
    
    // Validate transaction
    if (!transaction.Account || !transaction.Amount || !transaction.Destination) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required transaction fields' 
      });
    }
    
    // Create the payload using the Xumm SDK
    if (!xumm.payload) {
      throw new Error('Xumm payload service is not available');
    }
    
    const payload = await xumm.payload.create(transaction);
    
    if (!payload) {
      throw new Error('Failed to create payload');
    }
    
    console.log('Payload created successfully:', payload.uuid);
    console.log('Payload details:', JSON.stringify(payload, null, 2));
    
    // Return the payload data to the frontend
    res.status(200).json({
      success: true,
      amount: body.amount,
      recipient: body.recipient,
      transactionType: body.transactionType,
      uuid: payload.uuid,
      qrCodeUrl: payload.refs?.qr_png
    });
  } catch (error) {
    console.error('Error executing transaction:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error executing transaction" 
    });
  }
});

// Get payload status endpoint
app.get('/api/payload-status/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ error: 'Payload UUID is required' });
    }

    console.log('Getting payload status for UUID:', uuid);

    // Get the payload status using the Xumm SDK
    if (!xumm.payload) {
      throw new Error('Xumm payload service is not available');
    }

    const payload = await xumm.payload.get(uuid);

    if (!payload) {
      throw new Error('Failed to get payload');
    }

    console.log('Payload status retrieved successfully:', payload);

    // Return the payload data to the frontend
    res.status(200).json({
      meta: payload.meta,
      response: payload.response,
      custom_meta: payload.custom_meta
    });
  } catch (error) {
    console.error('Payload status error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get payload status'
    });
  }
});

// Get payload result and extract user_token (NEW ENDPOINT)
app.get('/api/payload-result/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ error: 'Payload UUID is required' });
    }

    console.log('Getting payload result for UUID:', uuid);

    // Get the payload using the Xumm SDK
    if (!xumm.payload) {
      throw new Error('Xumm payload service is not available');
    }

    const payload = await xumm.payload.get(uuid);

    if (!payload) {
      throw new Error('Failed to get payload');
    }

    console.log('Payload result retrieved:', {
      resolved_at: payload.response?.resolved_at,
      account: payload.response?.account,
      has_user_token: !!payload.application?.issued_user_token
    });

    // Extract and store user_token if available
    const userToken = payload.application?.issued_user_token;
    const xrplAccount = payload.response?.account;

    if (userToken && xrplAccount) {
      const tokenData: UserTokenData = {
        user_token: userToken,
        xrpl_account: xrplAccount,
        token_issued: Date.now(),
        token_expiration: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
      };

      userTokens.set(xrplAccount, tokenData);
      console.log('✅ User token stored for account:', xrplAccount);
      console.log('📊 Total stored tokens:', userTokens.size);
    } else {
      console.log('ℹ️ No user token in payload result');
    }

    // Return the complete payload data to the frontend
    res.status(200).json({
      meta: payload.meta,
      response: payload.response,
      application: payload.application,
      custom_meta: payload.custom_meta
    });
  } catch (error) {
    console.error('Payload result error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to get payload result'
    });
  }
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Xaman payload server running at http://0.0.0.0:${port}`);
  console.log(`Server address: ${JSON.stringify(server.address())}`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
});

server.on('listening', () => {
  console.log('Server is now listening');
});

server.on('close', () => {
  console.log('Server has been closed');
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

export default app;