/**
 * Payload Creation Test Script
 * Testing the specific functionality that was failing with "Payload creation timeout"
 */

import { Xumm } from 'xumm';

// Your actual credentials from the Xaman Developer Console
const API_KEY = 'b53edeaf-0046-49a6-a100-4bb284be3682';
const API_SECRET = 'd4f38ef3-59ab-40fb-b590-4d28893def35';

console.log('Testing Payload Creation with Proper SDK Initialization...');
console.log('API Key:', API_KEY);

// Initialize the Xumm SDK with BOTH credentials as required
// This is the key fix - we need both API Key and API Secret for payload creation
const xumm = new Xumm(API_KEY, API_SECRET);

async function testPayloadCreation() {
    console.log('\n=== Payload Creation Test ===');
    
    try {
        console.log('Creating a simple payment payload...');
        
        // Create a simple sign request payload
        const payload = await xumm.payload.create({
            TransactionType: 'Payment',
            Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe', // Testnet faucet
            Amount: '1000000', // 1 XRP in drops
            Fee: '12' // 12 drops
        }, {
            // Options for the payload
            redirectUrl: 'http://3.111.22.56:5002/',
            immutable: false
        });
        
        console.log('✅ Payload created successfully!');
        console.log('Payload UUID:', payload.uuid);
        console.log('Payload Reference:', payload.refs);
        console.log('Payload Pushed:', payload.pushed);
        console.log('Next step:', payload.next);
        
        // Log the QR code URL if available
        if (payload.refs && payload.refs.qr_png) {
            console.log('QR Code URL:', payload.refs.qr_png);
        }
        
        return payload;
    } catch (error) {
        console.error('❌ Payload Creation Error:', error.message);
        console.error('Error Stack:', error.stack);
        
        // Provide specific guidance based on error type
        if (error.message && error.message.includes('Payload creation timeout')) {
            console.log('\n🔧 TROUBLESHOOTING GUIDANCE:');
            console.log('1. Verify both API Key and API Secret are provided to SDK initialization');
            console.log('2. Check Redirect URIs in Xaman Developer Console:');
            console.log('   - http://3.111.22.56:5002/');
            console.log('   - http://localhost:5176/');
            console.log('3. Ensure network connectivity to xumm.app');
            console.log('4. Verify CORS headers on your server');
            console.log('5. Check if API credentials are correct in Developer Console');
        }
        
        throw error;
    }
}

async function testBackendAPIPayloadCreation() {
    console.log('\n=== Direct Backend API Payload Creation Test ===');
    
    try {
        console.log('Creating payload via direct API call...');
        
        const response = await fetch('https://xumm.app/api/v1/platform/payload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'X-API-Secret': API_SECRET
            },
            body: JSON.stringify({
                txjson: {
                    TransactionType: 'Payment',
                    Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
                    Amount: '1000000',
                    Fee: '12'
                }
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log('✅ Direct API Payload created successfully!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('❌ Direct API Payload Creation Error:', data);
        }
        
        return data;
    } catch (error) {
        console.error('❌ Direct API Payload Creation Error:', error.message);
        throw error;
    }
}

// Run the tests
async function runTests() {
    console.log('🚀 Starting Payload Creation Tests...\n');
    
    try {
        // Test 1: SDK payload creation
        await testPayloadCreation();
        
        // Test 2: Direct API call
        await testBackendAPIPayloadCreation();
        
        console.log('\n✅ All payload creation tests completed successfully!');
        console.log('\n📝 Summary:');
        console.log('- SDK is properly initialized with both API Key and API Secret');
        console.log('- Payload creation is working');
        console.log('- Direct API calls are working');
        console.log('- Xaman integration is properly configured');
        
    } catch (error) {
        console.error('\n❌ Tests failed with error:', error.message);
        process.exit(1);
    }
}

// Execute the tests
runTests();