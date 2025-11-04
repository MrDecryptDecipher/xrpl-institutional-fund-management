// Test complete flow: Frontend -> Backend -> Xaman API
console.log("=== Complete Flow Test ===");

// Test 1: Backend server health check
console.log("\n1. Testing backend server health check...");
fetch('http://localhost:3001/health')
  .then(response => response.json())
  .then(data => {
    console.log("✅ Backend health check:", data);
    
    // Test 2: Create payload via backend
    console.log("\n2. Testing payload creation via backend...");
    return fetch('http://localhost:3001/api/create-xaman-payload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionType: 'SignIn',
      }),
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log("✅ Payload creation result:", data);
    
    if (data.success && data.uuid && data.refs && data.refs.qr_png) {
      console.log("✅ Payload structure validation passed!");
      
      // Test 3: Verify QR code is accessible
      console.log("\n3. Testing QR code accessibility...");
      return fetch(data.refs.qr_png, { method: 'HEAD' });
    } else {
      throw new Error("Payload structure validation failed");
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("✅ QR code is accessible!");
      console.log("\n🎉 All tests passed! The complete flow is working correctly.");
    } else {
      throw new Error(`QR code not accessible: ${response.status}`);
    }
  })
  .catch(error => {
    console.error("❌ Test failed:", error.message);
    console.error("Error details:", error);
  });

// Helper function to simulate fetch in Node.js
function fetch(url, options = {}) {
  const https = require('https');
  const http = require('http');
  const { URL } = require('url');
  
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const lib = urlObj.protocol === 'https:' ? https : http;
    
    const req = lib.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(jsonData),
            text: () => Promise.resolve(data)
          });
        } catch (e) {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.reject(new Error('Invalid JSON')),
            text: () => Promise.resolve(data)
          });
        }
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}