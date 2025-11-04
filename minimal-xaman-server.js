import express from 'express';
import http from 'http';

const app = express();
const port = 3005;

app.use(express.json());

app.get('/health', (req, res) => {
  console.log('Health endpoint called');
  res.json({ status: 'ok' });
});

app.post('/api/create-xaman-payload', (req, res) => {
  console.log('Create payload endpoint called with body:', req.body);
  res.json({ success: true, uuid: 'test-uuid' });
});

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Minimal Xaman server running at http://127.0.0.1:${port}`);
  
  // Test connection to ourselves
  http.get(`http://127.0.0.1:${port}/health`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response from health endpoint:', data);
    });
  }).on('error', (err) => {
    console.error('Error connecting to health endpoint:', err.message);
  });
});