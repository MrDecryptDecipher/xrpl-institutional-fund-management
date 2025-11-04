// Simple verification script to test Xaman connection
const http = require('http');

console.log('Testing Xaman connection through proxy...');

// Test the proxy endpoint directly
const options = {
  hostname: '3.111.22.56',
  port: 5002,
  path: '/api/create-xaman-payload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const postData = JSON.stringify({
  transactionType: 'SignIn'
});

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('Success! Xaman payload creation response:');
      console.log(JSON.stringify(result, null, 2));
      
      if (result.success) {
        console.log('✅ Xaman connection is working properly!');
        console.log(`Payload UUID: ${result.uuid}`);
        console.log(`QR Code URL: ${result.refs.qr_png}`);
      } else {
        console.log('❌ Xaman connection failed:');
        console.log(`Error: ${result.error}`);
      }
    } catch (error) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error connecting to Xaman proxy:');
  console.error(error.message);
});

req.write(postData);
req.end();

// Also test direct connection to Xaman payload server
console.log('\nTesting direct connection to Xaman payload server...');

const directOptions = {
  hostname: '3.111.22.56',
  port: 3001,
  path: '/api/create-xaman-payload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    }
};

const directReq = http.request(directOptions, (res) => {
  console.log(`Direct Status Code: ${res.statusCode}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('Direct connection response:');
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.log('Raw response:', data);
    }
  });
});

directReq.on('error', (error) => {
  console.error('❌ Error connecting to Xaman payload server directly:');
  console.error(error.message);
});

directReq.write(postData);
directReq.end();