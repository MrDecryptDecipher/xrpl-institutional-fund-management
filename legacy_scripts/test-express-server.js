import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || process.env.VITE_XAMAN_PAYLOAD_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

console.log('Server setup complete, about to start listening...');

app.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Start the server
console.log(`About to start server on port ${port}`);
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://0.0.0.0:${port}`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
});
console.log('Server listen call completed');