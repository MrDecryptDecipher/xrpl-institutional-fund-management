import axios from 'axios';

async function testPayloadEndpoint() {
  try {
    console.log('Testing Xaman payload endpoint...');
    
    const response = await axios.post('http://localhost:3001/api/create-xaman-payload', {
      transactionType: 'SignIn'
    }, {
      timeout: 10000
    });
    
    console.log('Response received:', response.data);
  } catch (error) {
    console.error('Error testing endpoint:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testPayloadEndpoint();