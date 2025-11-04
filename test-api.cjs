const http = require('http');

// Test GET request
function testHealth() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Health Check - Status Code: ${res.statusCode}`);
    
    res.on('data', (chunk) => {
      console.log(`Body: ${chunk}`);
    });
    
    res.on('end', () => {
      console.log('Health check completed');
    });
  });

  req.on('error', (error) => {
    console.error('Health Check Error:', error);
  });

  req.end();
}

// Test POST request
function testCreatePayload() {
  const postData = JSON.stringify({
    transactionType: 'SignIn'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/create-xaman-payload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Create Payload - Status Code: ${res.statusCode}`);
    
    res.on('data', (chunk) => {
      console.log(`Body: ${chunk}`);
    });
    
    res.on('end', () => {
      console.log('Payload creation completed');
    });
  });

  req.on('error', (error) => {
    console.error('Payload Creation Error:', error);
  });

  req.write(postData);
  req.end();
}

// Run tests
console.log('Testing Health Endpoint:');
testHealth();

setTimeout(() => {
  console.log('\nTesting Create Payload Endpoint:');
  testCreatePayload();
}, 2000);