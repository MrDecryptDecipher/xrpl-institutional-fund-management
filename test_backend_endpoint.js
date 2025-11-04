// Test script to verify the backend endpoint is working
async function testBackendEndpoint() {
    try {
        console.log('Testing backend endpoint for Xaman payload creation...');
        
        const response = await fetch('http://localhost:5176/api/create-xaman-payload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transactionType: 'SignIn'
            })
        });
        
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));
        
        if (data.success) {
            console.log('✅ Backend endpoint is working correctly!');
            console.log('Payload UUID:', data.uuid);
            console.log('QR Code URL:', data.refs?.qr_png);
        } else {
            console.log('❌ Backend endpoint failed:', data.error);
        }
    } catch (error) {
        console.error('❌ Error testing backend endpoint:', error.message);
    }
}

testBackendEndpoint();