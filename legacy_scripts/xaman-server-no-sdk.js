import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = parseInt(process.env.VITE_XAMAN_PAYLOAD_PORT || process.env.XAMAN_PAYLOAD_PORT || '3001', 10);

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

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// HTTP endpoint for creating Xaman payloads
app.post('/api/create-xaman-payload', (req, res) => {
  try {
    const body = req.body;
    
    console.log('Creating Xaman payload with body:', JSON.stringify(body, null, 2));
    
    // Create the payload based on the transaction type
    const payloadData = {
      TransactionType: body.transactionType || 'SignIn',
      // Add any additional transaction data from the body
      ...body.transactionData
    };
    
    console.log('Creating payload with data:', JSON.stringify(payloadData, null, 2));
    
    // Return a mock payload data to the frontend
    res.status(200).json({
      success: true,
      uuid: 'mock-uuid-12345',
      refs: {
        qr_png: 'http://example.com/qr.png',
        qr_matrix: 'matrix-data',
        qr_uri_quality_opts: {
          q: 'http://example.com/qr',
          r: 'http://example.com/redirect'
        }
      },
      pushed: true,
      next: {
        always: 'http://example.com/always',
        no_push_msg_received: 'http://example.com/no-push'
      }
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
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Xaman payload server running at http://127.0.0.1:${port}`);
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