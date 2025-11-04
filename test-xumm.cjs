const { Xumm } = require('xumm');
require('dotenv').config();

// Get API credentials from environment variables
const apiKey = process.env.VITE_XUMM_API_KEY;
const apiSecret = process.env.XUMM_API_SECRET;

console.log('API Key:', apiKey ? 'Set' : 'Not set');
console.log('API Secret:', apiSecret ? 'Set' : 'Not set');

if (!apiKey || !apiSecret) {
  console.error('Xaman API credentials not configured');
  process.exit(1);
}

// Initialize Xumm SDK with both credentials (only safe in backend)
const xumm = new Xumm(apiKey, apiSecret);

xumm.on('error', (error) => {
  console.error('Xumm SDK error:', error);
});

console.log('Xumm SDK initialized');

// Test creating a simple payload
xumm.payload.create({ TransactionType: 'SignIn' })
  .then(payload => {
    console.log('Payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
  })
  .catch(error => {
    console.error('Error creating payload:', error);
  });