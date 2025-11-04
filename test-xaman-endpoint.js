// Test script to verify the Xaman payload server endpoint
async function testXamanEndpoint() {
    try {
        console.log('Testing Xaman payload endpoint...');
        
        // Test the health endpoint first
        console.log('\n1. Testing health endpoint...');
        const healthResponse = await fetch('http://localhost:3001/health');
        console.log('Health response status:', healthResponse.status);
        const healthData = await healthResponse.json();
        console.log('Health response data:', healthData);
        
        // Test the create payload endpoint
        console.log('\n2. Testing create payload endpoint...');
        const payloadResponse = await fetch('http://localhost:3001/api/create-xaman-payload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transactionType: 'SignIn'
            })
        });
        
        console.log('Payload response status:', payloadResponse.status);
        
        if (payloadResponse.ok) {
            const payloadData = await payloadResponse.json();
            console.log('Payload response data:', JSON.stringify(payloadData, null, 2));
            
            if (payloadData.success) {
                console.log('✅ Payload creation successful!');
                console.log('Payload UUID:', payloadData.uuid);
                console.log('QR Code URL:', payloadData.refs?.qr_png);
            } else {
                console.log('❌ Payload creation failed:', payloadData.error);
            }
        } else {
            const errorData = await payloadResponse.json();
            console.log('❌ Payload creation failed with status', payloadResponse.status);
            console.log('Error data:', errorData);
        }
    } catch (error) {
        console.error('❌ Error testing endpoint:', error.message);
        console.error('Error details:', error);
    }
}

testXamanEndpoint();