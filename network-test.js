import http from 'http';

// Test if we can create a simple HTTP server and connect to it
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3003, '127.0.0.1', () => {
  console.log('Test server running on http://127.0.0.1:3003');
  
  // Try to connect to ourselves
  http.get('http://127.0.0.1:3003', (res) => {
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