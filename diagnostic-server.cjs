const http = require('http');
const os = require('os');

console.log('Network interfaces:');
const interfaces = os.networkInterfaces();
for (const name in interfaces) {
  console.log(`  ${name}:`);
  interfaces[name].forEach(iface => {
    console.log(`    ${iface.address} (${iface.family})`);
  });
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Diagnostic server response\n');
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Try binding to different addresses
console.log('Attempting to bind to 0.0.0.0:3004');
server.listen(3004, '0.0.0.0', () => {
  console.log('Server started successfully');
});