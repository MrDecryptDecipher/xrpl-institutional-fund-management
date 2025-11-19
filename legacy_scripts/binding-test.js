import express from 'express';
import http from 'http';

const app = express();
const port = 3006;

// Simple endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test different binding options
console.log('Testing different binding options...');

// Option 1: Bind to localhost
console.log('\nOption 1: Binding to localhost...');
const server1 = app.listen(port, 'localhost', () => {
  console.log(`Server 1 listening on http://localhost:${port}`);
  
  // Test connection
  http.get(`http://localhost:${port}/health`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Server 1 connection test result:', data);
      server1.close();
    });
  }).on('error', (err) => {
    console.error('Server 1 connection test failed:', err.message);
    server1.close();
  });
});

// Option 2: Bind to 127.0.0.1
setTimeout(() => {
  console.log('\nOption 2: Binding to 127.0.0.1...');
  const server2 = app.listen(port + 1, '127.0.0.1', () => {
    console.log(`Server 2 listening on http://127.0.0.1:${port + 1}`);
    
    // Test connection
    http.get(`http://127.0.0.1:${port + 1}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Server 2 connection test result:', data);
        server2.close();
      });
    }).on('error', (err) => {
      console.error('Server 2 connection test failed:', err.message);
      server2.close();
    });
  });
}, 1000);

// Option 3: Bind to 0.0.0.0
setTimeout(() => {
  console.log('\nOption 3: Binding to 0.0.0.0...');
  const server3 = app.listen(port + 2, '0.0.0.0', () => {
    console.log(`Server 3 listening on http://0.0.0.0:${port + 2}`);
    
    // Test connection
    http.get(`http://127.0.0.1:${port + 2}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Server 3 connection test result:', data);
        server3.close();
      });
    }).on('error', (err) => {
      console.error('Server 3 connection test failed:', err.message);
      server3.close();
    });
  });
}, 2000);

// Option 4: Bind without specifying host
setTimeout(() => {
  console.log('\nOption 4: Binding without specifying host...');
  const server4 = app.listen(port + 3, () => {
    console.log(`Server 4 listening on port ${port + 3}`);
    console.log('Server 4 address:', server4.address());
    
    // Test connection
    http.get(`http://127.0.0.1:${port + 3}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Server 4 connection test result:', data);
        server4.close();
      });
    }).on('error', (err) => {
      console.error('Server 4 connection test failed:', err.message);
      server4.close();
    });
  });
}, 3000);