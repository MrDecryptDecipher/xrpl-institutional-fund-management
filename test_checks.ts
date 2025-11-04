/**
 * Test file for Checks functionality
 * 
 * This file tests the checks functionality.
 */

import { createChecks, generateSampleConfig } from './src/lib/checks';

async function testChecks() {
  console.log('Testing Checks functionality...');
  
  // Create Checks instance
  const config = generateSampleConfig();
  const checks = createChecks(config);
  
  try {
    // Connect to the XRPL server
    await checks.connect();
    console.log('✓ Connected to checks');
    
    // Test 1: Show available methods
    console.log('\n1. Available Checks methods:');
    console.log('- connect(): Connect to XRPL server');
    console.log('- disconnect(): Disconnect from XRPL server');
    console.log('- createCheck(senderWallet, params): Create a check');
    console.log('- cashCheck(recipientWallet, params): Cash a check');
    console.log('- cancelCheck(senderWallet, params): Cancel a check');
    console.log('- getCheckInfo(checkId): Get check information');
    console.log('- getAccountChecks(address): Get account checks');
    console.log('- isConnected(): Check connection status');
    
    // Test 2: Show configuration options
    console.log('\n2. Configuration options:');
    console.log('ChecksConfig:');
    console.log('- server: string (WebSocket server URL)');
    console.log('- network: "Testnet" | "Devnet" | "Mainnet" (optional)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- network: ${config.network}`);
    
    // Test 3: Show create parameters
    console.log('\n3. CheckCreateParams:');
    console.log('- destination: string (Destination address)');
    console.log('- sendMax: string | { currency: string; value: string; issuer: string } (Maximum amount to send)');
    console.log('- destinationTag: number (optional, Destination tag)');
    console.log('- expiration: number (optional, Expiration ledger index)');
    console.log('- invoiceId: string (optional, Invoice ID)');
    
    // Test 4: Show cash parameters
    console.log('\n4. CheckCashParams:');
    console.log('- checkId: string (Check ID)');
    console.log('- amount: string | { currency: string; value: string; issuer: string } (optional, Amount to cash)');
    console.log('- deliverMin: string | { currency: string; value: string; issuer: string } (optional, Minimum delivery amount)');
    
    // Test 5: Show cancel parameters
    console.log('\n5. CheckCancelParams:');
    console.log('- checkId: string (Check ID)');
    
    // Test 6: Show result structure
    console.log('\n6. CheckResult:');
    console.log('- success: boolean (whether transaction succeeded)');
    console.log('- transactionHash: string (transaction hash, if successful)');
    console.log('- result: any (full transaction result, if successful)');
    console.log('- error: string (error message, if failed)');
    console.log('- checkId: string (check ID, for create operations)');
    
    // Test 7: Show example usage
    console.log('\n7. Example usage:');
    console.log('const checks = createChecks(generateSampleConfig());');
    console.log('await checks.connect();');
    console.log('// Create check');
    console.log('const createResult = await checks.createCheck(wallet, {');
    console.log('  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",');
    console.log('  sendMax: "100000000" // 100 XRP');
    console.log('});');
    console.log('// Cash check');
    console.log('const cashResult = await checks.cashCheck(wallet, {');
    console.log('  checkId: "838766BA2B995C0342EDE3986A1E1FF7D77DE908A7F8086A64A3964060B48376",');
    console.log('  amount: "50000000" // 50 XRP');
    console.log('});');
    console.log('// Cancel check');
    console.log('const cancelResult = await checks.cancelCheck(wallet, {');
    console.log('  checkId: "838766BA2B995C0342EDE3986A1E1FF7D77DE908A7F8086A64A3964060B48376"');
    console.log('});');
    console.log('await checks.disconnect();');
    
    // Test 8: Show important notes
    console.log('\n8. Important notes:');
    console.log('- Requires connection to XRPL server');
    console.log('- Testnet/Devnet recommended for testing');
    console.log('- Amounts can be in drops (XRP) or IOU objects');
    console.log('- Check IDs are returned from successful create operations');
    console.log('- Only the destination can cash a check');
    console.log('- Only the sender can cancel a check');
    console.log('- Checks can have expiration dates');
    console.log('- Private keys must be kept secure');
    
    // Disconnect from the server
    await checks.disconnect();
    console.log('\n✓ Disconnected from checks');
    
    console.log('\nChecks functionality tests completed!');
    console.log('Note: Actual check functions require a connection to an XRPL server');
    console.log('and valid wallet credentials for transaction signing.');
  } catch (error) {
    console.error('Error during Checks tests:', error);
    
    // Try to disconnect if still connected
    try {
      await checks.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testChecks().catch(console.error);/**
 * Test file for Checks functionality
 * 
 * This file tests the checks functionality.
 */

import { createChecks, generateSampleConfig } from './src/lib/checks';

async function testChecks() {
  console.log('Testing Checks functionality...');
  
  // Create Checks instance
  const config = generateSampleConfig();
  const checks = createChecks(config);
  
  try {
    // Connect to the XRPL server
    await checks.connect();
    console.log('✓ Connected to checks');
    
    // Test 1: Show available methods
    console.log('\n1. Available Checks methods:');
    console.log('- connect(): Connect to XRPL server');
    console.log('- disconnect(): Disconnect from XRPL server');
    console.log('- createCheck(senderWallet, params): Create a check');
    console.log('- cashCheck(recipientWallet, params): Cash a check');
    console.log('- cancelCheck(senderWallet, params): Cancel a check');
    console.log('- getCheckInfo(checkId): Get check information');
    console.log('- getAccountChecks(address): Get account checks');
    console.log('- isConnected(): Check connection status');
    
    // Test 2: Show configuration options
    console.log('\n2. Configuration options:');
    console.log('ChecksConfig:');
    console.log('- server: string (WebSocket server URL)');
    console.log('- network: "Testnet" | "Devnet" | "Mainnet" (optional)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- network: ${config.network}`);
    
    // Test 3: Show create parameters
    console.log('\n3. CheckCreateParams:');
    console.log('- destination: string (Destination address)');
    console.log('- sendMax: string | { currency: string; value: string; issuer: string } (Maximum amount to send)');
    console.log('- destinationTag: number (optional, Destination tag)');
    console.log('- expiration: number (optional, Expiration ledger index)');
    console.log('- invoiceId: string (optional, Invoice ID)');
    
    // Test 4: Show cash parameters
    console.log('\n4. CheckCashParams:');
    console.log('- checkId: string (Check ID)');
    console.log('- amount: string | { currency: string; value: string; issuer: string } (optional, Amount to cash)');
    console.log('- deliverMin: string | { currency: string; value: string; issuer: string } (optional, Minimum delivery amount)');
    
    // Test 5: Show cancel parameters
    console.log('\n5. CheckCancelParams:');
    console.log('- checkId: string (Check ID)');
    
    // Test 6: Show result structure
    console.log('\n6. CheckResult:');
    console.log('- success: boolean (whether transaction succeeded)');
    console.log('- transactionHash: string (transaction hash, if successful)');
    console.log('- result: any (full transaction result, if successful)');
    console.log('- error: string (error message, if failed)');
    console.log('- checkId: string (check ID, for create operations)');
    
    // Test 7: Show example usage
    console.log('\n7. Example usage:');
    console.log('const checks = createChecks(generateSampleConfig());');
    console.log('await checks.connect();');
    console.log('// Create check');
    console.log('const createResult = await checks.createCheck(wallet, {');
    console.log('  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",');
    console.log('  sendMax: "100000000" // 100 XRP');
    console.log('});');
    console.log('// Cash check');
    console.log('const cashResult = await checks.cashCheck(wallet, {');
    console.log('  checkId: "838766BA2B995C0342EDE3986A1E1FF7D77DE908A7F8086A64A3964060B48376",');
    console.log('  amount: "50000000" // 50 XRP');
    console.log('});');
    console.log('// Cancel check');
    console.log('const cancelResult = await checks.cancelCheck(wallet, {');
    console.log('  checkId: "838766BA2B995C0342EDE3986A1E1FF7D77DE908A7F8086A64A3964060B48376"');
    console.log('});');
    console.log('await checks.disconnect();');
    
    // Test 8: Show important notes
    console.log('\n8. Important notes:');
    console.log('- Requires connection to XRPL server');
    console.log('- Testnet/Devnet recommended for testing');
    console.log('- Amounts can be in drops (XRP) or IOU objects');
    console.log('- Check IDs are returned from successful create operations');
    console.log('- Only the destination can cash a check');
    console.log('- Only the sender can cancel a check');
    console.log('- Checks can have expiration dates');
    console.log('- Private keys must be kept secure');
    
    // Disconnect from the server
    await checks.disconnect();
    console.log('\n✓ Disconnected from checks');
    
    console.log('\nChecks functionality tests completed!');
    console.log('Note: Actual check functions require a connection to an XRPL server');
    console.log('and valid wallet credentials for transaction signing.');
  } catch (error) {
    console.error('Error during Checks tests:', error);
    
    // Try to disconnect if still connected
    try {
      await checks.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testChecks().catch(console.error);