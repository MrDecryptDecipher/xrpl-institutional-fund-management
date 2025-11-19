import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.VITE_XAMAN_PAYLOAD_PORT || process.env.VITE_PUBLIC_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoint
app.post('/api/execute-transaction', (req, res) => {
  res.json({ success: true, message: 'Endpoint is working' });
});

// Start the server
app.listen(port, () => {
  console.log(`Test Xaman payload server running at http://localhost:${port}`);
});