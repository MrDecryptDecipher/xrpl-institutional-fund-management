import { createServer } from 'vite';

// Create a minimal Vite server for testing
createServer({
  server: {
    port: 5178,
    host: '127.0.0.1'
  }
}).then((server) => {
  server.listen().then(() => {
    console.log('Minimal Vite server running on http://127.0.0.1:5178');
  });
});