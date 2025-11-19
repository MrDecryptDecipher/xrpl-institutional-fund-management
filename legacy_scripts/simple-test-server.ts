import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.json({ message: 'Simple test server is running' });
});

app.get('/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = app.listen(port, 'localhost', () => {
  console.log(`Simple test server running at http://localhost:${port}`);
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