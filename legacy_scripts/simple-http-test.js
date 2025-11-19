import http from 'http';

const port = 3010;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Simple HTTP server running on port ${port}`);
  console.log(`Server address: ${JSON.stringify(server.address())}`);
});

// Check if server is actually listening
setTimeout(() => {
  console.log('Checking if server is listening...');
  import('net').then(net => {
    const client = net.createConnection({ port: port }, () => {
      console.log('Successfully connected to server');
      client.end();
      server.close();
    });
    client.on('error', (err) => {
      console.error('Failed to connect to server:', err.message);
      server.close();
    });
  });
}, 2000);