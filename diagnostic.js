// Diagnostic script to check network connectivity issues
import http from 'http';

console.log('Starting diagnostic tests...');

// Test 1: Can we create a simple HTTP server?
console.log('\nTest 1: Creating simple HTTP server on port 3005...');
const testServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server is working');
});

testServer.listen(3005, '127.0.0.1', () => {
  console.log('Test server listening on http://127.0.0.1:3005');
  
  // Test 2: Can we connect to our own server?
  console.log('\nTest 2: Connecting to our own server...');
  http.get('http://127.0.0.1:3005', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Successfully connected to test server. Response:', data);
      testServer.close(() => {
        console.log('Test server closed');
      });
    });
  }).on('error', (err) => {
    console.error('Failed to connect to test server:', err.message);
    testServer.close(() => {
      console.log('Test server closed');
    });
  });
});

// Test 3: Check network interfaces
import os from 'os';
console.log('\nTest 3: Network interfaces:');
const interfaces = os.networkInterfaces();
for (const [name, nets] of Object.entries(interfaces)) {
  console.log(`  ${name}:`);
  for (const net of nets) {
    console.log(`    ${net.address} (${net.family})`);
  }
}

// Test 4: Check localhost resolution
import dns from 'dns';
console.log('\nTest 4: Resolving localhost...');
dns.lookup('localhost', (err, address, family) => {
  if (err) {
    console.error('Failed to resolve localhost:', err.message);
  } else {
    console.log(`localhost resolves to ${address} (IPv${family})`);
  }
});