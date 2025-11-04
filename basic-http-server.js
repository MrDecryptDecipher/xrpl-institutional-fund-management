import http from 'http';

const port = 3002;

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Basic HTTP server is running' }));
});

console.log(`About to start server on port ${port}`);
const serverInstance = server.listen(port, '0.0.0.0', () => {
  console.log(`Basic HTTP server running at http://0.0.0.0:${port}/`);
  console.log(`Server address: ${JSON.stringify(serverInstance.address())}`);
});
console.log('Server listen call completed');

server.on('error', (error) => {
  console.error('Server error:', error);
});