#!/usr/bin/env node

// Demo script showing that Xaman connection is working properly
console.log('🚀 XRPL Institutional Fund Management Protocol - Xaman Connection Demo');
console.log('=====================================================================\n');

const http = require('http');

// Test 1: Direct connection to Xaman payload server
console.log('Test 1: Direct connection to Xaman payload server (port 3001)');
console.log('----------------------------------------------------------------');

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
  console.log(`✅ Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (result.success) {
        console.log(`✅ Payload UUID: ${result.uuid}`);
        console.log(`✅ QR Code: ${result.refs.qr_png}`);
      } else {
        console.log(`❌ Error: ${result.error}`);
      }
      
      // Test 2: Proxy connection through frontend server
      console.log('\nTest 2: Proxy connection through frontend server (port 5002)');
      console.log('----------------------------------------------------------------');
      
      const proxyOptions = {
        hostname: '3.111.22.56',
        port: 5002,
        path: '/api/create-xaman-payload',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const proxyReq = http.request(proxyOptions, (res) => {
        console.log(`✅ Status: ${res.statusCode}`);
        
        let proxyData = '';
        res.on('data', (chunk) => {
          proxyData += chunk;
        });
        
        res.on('end', () => {
          try {
            const proxyResult = JSON.parse(proxyData);
            if (proxyResult.success) {
              console.log(`✅ Payload UUID: ${proxyResult.uuid}`);
              console.log(`✅ QR Code: ${proxyResult.refs.qr_png}`);
              console.log('\n🎉 ALL TESTS PASSED - Xaman connection is working properly!');
              console.log('\n📝 Next step: Add http://localhost:5177/ to Xaman Developer Console');
            } else {
              console.log(`❌ Error: ${proxyResult.error}`);
            }
          } catch (error) {
            console.log('❌ Proxy response error:', error.message);
          }
        });
      });
      
      proxyReq.on('error', (error) => {
        console.log('❌ Proxy connection error:', error.message);
      });
      
      proxyReq.write(JSON.stringify({ transactionType: 'SignIn' }));
      proxyReq.end();
      
    } catch (error) {
      console.log('❌ Direct response error:', error.message);
    }
  });
});

directReq.on('error', (error) => {
  console.log('❌ Direct connection error:', error.message);
});

directReq.write(JSON.stringify({ transactionType: 'SignIn' }));
directReq.end();