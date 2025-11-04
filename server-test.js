import express from 'express';
import http from 'http';

const app = express();
const port = 3004;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Test server running at http://127.0.0.1:${port}`);
  
  // Try to connect to ourselves
  http.get(`http://127.0.0.1:${port}/health`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response from server:', data);
      server.close();
    });
  }).on('error', (err) => {
    console.error('Error connecting to server:', err.message);
    server.close();
  });
});