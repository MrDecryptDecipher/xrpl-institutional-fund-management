const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.write('Hello from TCP server\n');
  socket.pipe(socket); // Echo back
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8082, '127.0.0.1', () => {
  console.log('TCP server listening on 127.0.0.1:8082');
});

// Test connection
setTimeout(() => {
  const client = net.connect({ port: 8082, host: '127.0.0.1' }, () => {
    console.log('Connected to server');
    client.write('Hello server\n');
  });
  
  client.on('data', (data) => {
    console.log('Received from server:', data.toString());
    client.end();
  });
  
  client.on('end', () => {
    console.log('Client disconnected from server');
    server.close();
  });
}, 1000);