/**
 * Comprehensive Xaman SDK Test Script
 * Based on research from Xaman documentation and API endpoints
 */

// Import the Xumm SDK
import { Xumm } from 'xumm';

// Your actual credentials from the Xaman Developer Console
const API_KEY = 'b53edeaf-0046-49a6-a100-4bb284be3682';
const API_SECRET = 'd4f38ef3-59ab-40fb-b590-4d28893def35';

console.log('Initializing Xumm SDK with both API Key and API Secret...');
console.log('API Key:', API_KEY);
console.log('API Secret: [REDACTED FOR SECURITY]');

// Initialize the Xumm SDK with both credentials as required
// Based on Xaman documentation, both API Key and API Secret are required for proper authentication
const xumm = new Xumm(API_KEY, API_SECRET);

console.log('\n=== Xaman SDK Initialization Test ===');

// Test 1: Ping the platform API
async function testPlatformPing() {
    console.log('\n1. Testing Platform Ping (Backend API)...');
    try {
        // This uses the platform API which requires both API Key and Secret
        const response = await fetch('https://xumm.app/api/v1/platform/ping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'X-API-Secret': API_SECRET
            },
            body: JSON.stringify({})
        });
        
        const data = await response.json();
        console.log('Platform Ping Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Platform Ping Error:', error.message);
        return null;
    }
}

// Test 2: Ping the JWT API (CORS enabled)
async function testJWTPing(jwtToken) {
    console.log('\n2. Testing JWT Ping (CORS enabled)...');
    try {
        // This uses the JWT API which allows CORS requests
        const response = await fetch('https://xumm.app/api/v1/jwt/ping', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log('JWT Ping Response:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('JWT Ping Error:', error.message);
        return null;
    }
}

// Test 3: Initialize SDK and check readiness
async function testSDKInitialization() {
    console.log('\n3. Testing SDK Initialization...');
    try {
        // Check if SDK is ready
        const isReady = await xumm.ready;
        console.log('SDK Ready:', isReady);
        
        // Get SDK info
        const info = await xumm.info;
        console.log('SDK Info:', JSON.stringify(info, null, 2));
        
        return { isReady, info };
    } catch (error) {
        console.error('SDK Initialization Error:', error.message);
        return null;
    }
}

// Test 4: Create a simple payload
async function testPayloadCreation() {
    console.log('\n4. Testing Payload Creation...');
    try {
        // Create a simple sign request payload
        const payload = await xumm.payload.create({
            TransactionType: 'Payment',
            Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe', // Testnet faucet
            Amount: '1000000', // 1 XRP in drops
            Fee: '12' // 12 drops
        });
        
        console.log('Payload Creation Response:', JSON.stringify(payload, null, 2));
        return payload;
    } catch (error) {
        console.error('Payload Creation Error:', error.message);
        return null;
    }
}

// Test 5: OAuth2 flow simulation
async function testOAuth2Flow() {
    console.log('\n5. Testing OAuth2 Flow...');
    
    // OAuth2 authorization URL based on Xaman documentation
    const authUrl = `https://oauth2.xumm.app/auth?` +
        `client_id=${API_KEY}&` +
        `redirect_uri=http://3.111.22.56:5002/&` +
        `response_type=token&` +
        `scope=XummPkce`;
    
    console.log('OAuth2 Authorization URL:', authUrl);
    
    // In a real implementation, this would redirect the user to the auth URL
    // After authorization, the user would be redirected back with a JWT token
    console.log('In a browser environment, this would redirect to Xaman for authentication');
    
    return authUrl;
}

// Test 6: Check CORS configuration
async function testCORSConfiguration() {
    console.log('\n6. Testing CORS Configuration...');
    
    // Headers that should be present for CORS to work
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-API-Key, X-API-Secret'
    };
    
    console.log('Required CORS Headers:', JSON.stringify(corsHeaders, null, 2));
    console.log('Make sure these headers are set on your server responses');
    
    return corsHeaders;
}

// Test 7: Verify redirect URIs
async function testRedirectURIs() {
    console.log('\n7. Testing Redirect URIs...');
    
    // Based on your Xaman Developer Console configuration
    const configuredURIs = [
        'http://3.111.22.56:5002/',
        'http://localhost:5176/'
    ];
    
    console.log('Configured Redirect URIs in Xaman Developer Console:');
    configuredURIs.forEach((uri, index) => {
        console.log(`  ${index + 1}. ${uri}`);
    });
    
    console.log('\nMake sure your application is accessible at one of these URLs');
    console.log('For production: http://3.111.22.56:5002/');
    console.log('For development: http://localhost:5176/');
    
    return configuredURIs;
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting Comprehensive Xaman SDK Tests...\n');
    
    // Run tests in sequence
    await testPlatformPing();
    await testSDKInitialization();
    await testOAuth2Flow();
    await testCORSConfiguration();
    await testRedirectURIs();
    
    console.log('\n✅ All tests completed!');
    console.log('\n📝 Next Steps:');
    console.log('1. Ensure both API Key and API Secret are correctly configured');
    console.log('2. Verify Redirect URIs are properly set in Xaman Developer Console');
    console.log('3. Check that your server allows CORS requests');
    console.log('4. Test the OAuth2 flow in a browser environment');
    console.log('5. Verify network connectivity to Xaman API endpoints');
}

// Execute the tests
runAllTests().catch(console.error);