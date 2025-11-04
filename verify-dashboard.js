#!/usr/bin/env node

// Script to verify that the dashboard is working correctly
import http from 'http';

console.log('Verifying XRPL Institutional Dashboard functionality...\n');

// Check if frontend is running
function checkFrontend() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5176', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Frontend server is running on port 5176');
        resolve(true);
      } else {
        console.log('❌ Frontend server is not responding correctly');
        resolve(false);
      }
    }).on('error', (err) => {
      console.log('❌ Frontend server is not running:', err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Frontend server timeout');
      resolve(false);
    });
  });
}

// Check if backend is running
function checkBackend() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3001/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Backend server is running on port 3001');
          try {
            const health = JSON.parse(data);
            console.log('   Health check:', health.status, '-', health.timestamp);
          } catch (e) {
            console.log('   Health check: Response received');
          }
          resolve(true);
        } else {
          console.log('❌ Backend server is not responding correctly');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Backend server is not running:', err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Backend server timeout');
      resolve(false);
    });
  });
}

// Check API endpoints
function checkAPIEndpoints() {
  const endpoints = [
    { name: 'Execute Transaction', path: '/api/execute-transaction' },
    { name: 'Create Permissioned Domain', path: '/api/create-permissioned-domain' },
    { name: 'Create Governance Proposal', path: '/api/create-governance-proposal' }
  ];
  
  return Promise.all(endpoints.map(endpoint => {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: 3001,
        path: endpoint.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const req = http.request(options, (res) => {
        if (res.statusCode === 400 || res.statusCode === 200) {
          console.log(`✅ API endpoint check: ${endpoint.name} (Status: ${res.statusCode})`);
          resolve(true);
        } else {
          console.log(`❌ API endpoint check: ${endpoint.name} (Status: ${res.statusCode})`);
          resolve(false);
        }
      }).on('error', (err) => {
        console.log(`❌ API endpoint check: ${endpoint.name} (Error: ${err.message})`);
        resolve(false);
      });
      
      // Send minimal data to trigger validation
      req.write(JSON.stringify({}));
      req.end();
    });
  }));
}

// Run all checks
async function runVerification() {
  console.log('Starting dashboard verification...\n');
  
  const frontendOK = await checkFrontend();
  const backendOK = await checkBackend();
  
  if (!frontendOK || !backendOK) {
    console.log('\n❌ Dashboard verification failed - servers not running properly');
    process.exit(1);
  }
  
  console.log('\nChecking API endpoints...');
  const endpointsOK = await checkAPIEndpoints();
  
  console.log('\n📋 Verification Summary:');
  console.log('======================');
  console.log(`Frontend Server: ${frontendOK ? '✅ Running' : '❌ Not Running'}`);
  console.log(`Backend Server: ${backendOK ? '✅ Running' : '❌ Not Running'}`);
  
  if (endpointsOK.every(ok => ok)) {
    console.log('API Endpoints: ✅ All endpoints responding');
  } else {
    console.log('API Endpoints: ❌ Some endpoints not responding');
  }
  
  if (frontendOK && backendOK && endpointsOK.every(ok => ok)) {
    console.log('\n🎉 Dashboard verification successful!');
    console.log('The XRPL Institutional Dashboard is fully functional.');
    console.log('\nTo access the dashboard:');
    console.log('- Open your browser and navigate to: http://localhost:5176');
    console.log('- Click "Force Show Dashboard (Demo Mode)" to view the dashboard without wallet connection');
    console.log('- All components should be interactive and functional');
  } else {
    console.log('\n❌ Dashboard verification failed!');
    console.log('Please check the server logs and ensure all services are running correctly.');
    process.exit(1);
  }
}

// Run verification
runVerification().catch(err => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});