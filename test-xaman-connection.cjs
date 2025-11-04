const { Xumm } = require('xumm');

// Test Xaman SDK connection
async function testXamanConnection() {
  try {
    console.log('Testing Xaman SDK connection...');
    
    // Get API key and secret from environment
    const apiKey = process.env.VITE_XUMM_API_KEY || 'b53edeaf-0046-49a6-a100-4bb284be3682';
    const apiSecret = process.env.XUMM_API_SECRET || 'd4f38ef3-59ab-40fb-b590-4d28893def35';
    console.log('Using API Key:', apiKey.substring(0, 8) + '...');
    console.log('Using API Secret:', apiSecret.substring(0, 8) + '...');
    
    // Initialize Xaman SDK with both key and secret
    const xumm = new Xumm(apiKey, apiSecret);
    
    // Test ping
    console.log('Sending ping to Xaman API...');
    const pong = await xumm.ping();
    console.log('Ping response:', pong);
    
    console.log('Xaman SDK connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Xaman SDK connection test failed:', error.message);
    process.exit(1);
  }
}

testXamanConnection();