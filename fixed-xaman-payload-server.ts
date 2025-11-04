import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.VITE_XAMAN_PAYLOAD_PORT || process.env.XAMAN_PAYLOAD_PORT || '3001', 10); // Restored original port

console.log(`Initializing Xaman payload server on port ${port}`);

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

console.log('Xaman API Key:', apiKey);
console.log('Xaman API Secret is set:', !!apiSecret);

// Initialize Xumm SDK with both credentials (only safe in backend)
console.log('Initializing Xumm SDK...');
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
  console.log('Health check endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.json({ message: 'Xaman payload server is running' });
});

// HTTP endpoint for creating Xaman payloads
app.post('/api/create-xaman-payload', async (req, res) => {
  try {
    const body = req.body;
    
    console.log('Creating Xaman payload with body:', JSON.stringify(body, null, 2));
    
    // Create the payload based on the transaction type
    const payloadData = {
      TransactionType: body.transactionType || 'SignIn',
      // Add any additional transaction data from the body
      ...body.transactionData
    };
    
    // Create the payload using the Xumm SDK
    console.log('Creating payload with data:', JSON.stringify(payloadData, null, 2));
    if (!xumm.payload) {
      throw new Error('Xumm payload is not available');
    }
    const payload = await xumm.payload.create(payloadData);
    
    if (!payload) {
      throw new Error('Failed to create payload');
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

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Xaman payload server running at http://0.0.0.0:${port}`);
  console.log(`Server address: ${JSON.stringify(server.address())}`);
  console.log('Process is still running');
  
  // Keep the process alive
  setInterval(() => {
    console.log('Server heartbeat');
  }, 30000);
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