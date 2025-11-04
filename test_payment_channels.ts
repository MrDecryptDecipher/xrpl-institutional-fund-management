/**
 * Test file for Payment Channels functionality
 * 
 * This file tests the payment channels functionality.
 */

import { createPaymentChannels, generateSampleConfig } from './src/lib/payment-channels';

async function testPaymentChannels() {
  console.log('Testing Payment Channels functionality...');
  
  // Create Payment Channels instance
  const config = generateSampleConfig();
  const paymentChannels = createPaymentChannels(config);
  
  try {
    // Connect to the XRPL server
    await paymentChannels.connect();
    console.log('✓ Connected to payment channels');
    
    // Test 1: Show available methods
    console.log('\n1. Available Payment Channels methods:');
    console.log('- connect(): Connect to XRPL server');
    console.log('- disconnect(): Disconnect from XRPL server');
    console.log('- createChannel(senderWallet, params): Create a payment channel');
    console.log('- fundChannel(senderWallet, params): Fund a payment channel');
    console.log('- claimChannel(senderWallet, params): Claim from a payment channel');
    console.log('- getChannelInfo(channelId): Get payment channel information');
    console.log('- isConnected(): Check connection status');
    
    // Test 2: Show configuration options
    console.log('\n2. Configuration options:');
    console.log('PaymentChannelConfig:');
    console.log('- server: string (WebSocket server URL)');
    console.log('- network: "Testnet" | "Devnet" | "Mainnet" (optional)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- network: ${config.network}`);
    
    // Test 3: Show create parameters
    console.log('\n3. PaymentChannelCreateParams:');
    console.log('- amount: string (Amount in drops)');
    console.log('- destination: string (Destination address)');
    console.log('- settleDelay: number (Settle delay in seconds)');
    console.log('- publicKey: string (Public key in hex format)');
    console.log('- cancelAfter: number (optional, Cancel after ledger index)');
    console.log('- destinationTag: number (optional, Destination tag)');
    console.log('- sourceTag: number (optional, Source tag)');
    
    // Test 4: Show fund parameters
    console.log('\n4. PaymentChannelFundParams:');
    console.log('- channel: string (Channel ID)');
    console.log('- amount: string (Amount in drops)');
    console.log('- expiration: number (optional, Expiration ledger index)');
    
    // Test 5: Show claim parameters
    console.log('\n5. PaymentChannelClaimParams:');
    console.log('- channel: string (Channel ID)');
    console.log('- amount: string (Amount in drops)');
    console.log('- signature: string (optional, Signature)');
    console.log('- publicKey: string (optional, Public key)');
    
    // Test 6: Show result structure
    console.log('\n6. PaymentChannelResult:');
    console.log('- success: boolean (whether transaction succeeded)');
    console.log('- transactionHash: string (transaction hash, if successful)');
    console.log('- result: any (full transaction result, if successful)');
    console.log('- error: string (error message, if failed)');
    console.log('- channelId: string (channel ID, for create operations)');
    
    // Test 7: Show example usage
    console.log('\n7. Example usage:');
    console.log('const paymentChannels = createPaymentChannels(generateSampleConfig());');
    console.log('await paymentChannels.connect();');
    console.log('// Create channel');
    console.log('const createResult = await paymentChannels.createChannel(wallet, {');
    console.log('  amount: "100000000", // 100 XRP');
    console.log('  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",');
    console.log('  settleDelay: 86400, // 1 day');
    console.log('  publicKey: "023693F15967AE357D0327974AD46FE3C127113B1110D6044FD41E723689F81CC6"');
    console.log('});');
    console.log('// Fund channel');
    console.log('const fundResult = await paymentChannels.fundChannel(wallet, {');
    console.log('  channel: "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",');
    console.log('  amount: "50000000" // 50 XRP');
    console.log('});');
    console.log('// Claim from channel');
    console.log('const claimResult = await paymentChannels.claimChannel(wallet, {');
    console.log('  channel: "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",');
    console.log('  amount: "10000000" // 10 XRP');
    console.log('});');
    console.log('await paymentChannels.disconnect();');
    
    // Test 8: Show important notes
    console.log('\n8. Important notes:');
    console.log('- Requires connection to XRPL server');
    console.log('- Testnet/Devnet recommended for testing');
    console.log('- Amounts are in drops (1 XRP = 1,000,000 drops)');
    console.log('- Public keys should be in hex format');
    console.log('- Settle delay is in seconds');
    console.log('- Channel IDs are returned from successful create operations');
    console.log('- Private keys must be kept secure');
    
    // Disconnect from the server
    await paymentChannels.disconnect();
    console.log('\n✓ Disconnected from payment channels');
    
    console.log('\nPayment Channels functionality tests completed!');
    console.log('Note: Actual payment channel functions require a connection to an XRPL server');
    console.log('and valid wallet credentials for transaction signing.');
  } catch (error) {
    console.error('Error during Payment Channels tests:', error);
    
    // Try to disconnect if still connected
    try {
      await paymentChannels.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testPaymentChannels().catch(console.error);/**
 * Test file for Payment Channels functionality
 * 
 * This file tests the payment channels functionality.
 */

import { createPaymentChannels, generateSampleConfig } from './src/lib/payment-channels';

async function testPaymentChannels() {
  console.log('Testing Payment Channels functionality...');
  
  // Create Payment Channels instance
  const config = generateSampleConfig();
  const paymentChannels = createPaymentChannels(config);
  
  try {
    // Connect to the XRPL server
    await paymentChannels.connect();
    console.log('✓ Connected to payment channels');
    
    // Test 1: Show available methods
    console.log('\n1. Available Payment Channels methods:');
    console.log('- connect(): Connect to XRPL server');
    console.log('- disconnect(): Disconnect from XRPL server');
    console.log('- createChannel(senderWallet, params): Create a payment channel');
    console.log('- fundChannel(senderWallet, params): Fund a payment channel');
    console.log('- claimChannel(senderWallet, params): Claim from a payment channel');
    console.log('- getChannelInfo(channelId): Get payment channel information');
    console.log('- isConnected(): Check connection status');
    
    // Test 2: Show configuration options
    console.log('\n2. Configuration options:');
    console.log('PaymentChannelConfig:');
    console.log('- server: string (WebSocket server URL)');
    console.log('- network: "Testnet" | "Devnet" | "Mainnet" (optional)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- network: ${config.network}`);
    
    // Test 3: Show create parameters
    console.log('\n3. PaymentChannelCreateParams:');
    console.log('- amount: string (Amount in drops)');
    console.log('- destination: string (Destination address)');
    console.log('- settleDelay: number (Settle delay in seconds)');
    console.log('- publicKey: string (Public key in hex format)');
    console.log('- cancelAfter: number (optional, Cancel after ledger index)');
    console.log('- destinationTag: number (optional, Destination tag)');
    console.log('- sourceTag: number (optional, Source tag)');
    
    // Test 4: Show fund parameters
    console.log('\n4. PaymentChannelFundParams:');
    console.log('- channel: string (Channel ID)');
    console.log('- amount: string (Amount in drops)');
    console.log('- expiration: number (optional, Expiration ledger index)');
    
    // Test 5: Show claim parameters
    console.log('\n5. PaymentChannelClaimParams:');
    console.log('- channel: string (Channel ID)');
    console.log('- amount: string (Amount in drops)');
    console.log('- signature: string (optional, Signature)');
    console.log('- publicKey: string (optional, Public key)');
    
    // Test 6: Show result structure
    console.log('\n6. PaymentChannelResult:');
    console.log('- success: boolean (whether transaction succeeded)');
    console.log('- transactionHash: string (transaction hash, if successful)');
    console.log('- result: any (full transaction result, if successful)');
    console.log('- error: string (error message, if failed)');
    console.log('- channelId: string (channel ID, for create operations)');
    
    // Test 7: Show example usage
    console.log('\n7. Example usage:');
    console.log('const paymentChannels = createPaymentChannels(generateSampleConfig());');
    console.log('await paymentChannels.connect();');
    console.log('// Create channel');
    console.log('const createResult = await paymentChannels.createChannel(wallet, {');
    console.log('  amount: "100000000", // 100 XRP');
    console.log('  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",');
    console.log('  settleDelay: 86400, // 1 day');
    console.log('  publicKey: "023693F15967AE357D0327974AD46FE3C127113B1110D6044FD41E723689F81CC6"');
    console.log('});');
    console.log('// Fund channel');
    console.log('const fundResult = await paymentChannels.fundChannel(wallet, {');
    console.log('  channel: "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",');
    console.log('  amount: "50000000" // 50 XRP');
    console.log('});');
    console.log('// Claim from channel');
    console.log('const claimResult = await paymentChannels.claimChannel(wallet, {');
    console.log('  channel: "5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3",');
    console.log('  amount: "10000000" // 10 XRP');
    console.log('});');
    console.log('await paymentChannels.disconnect();');
    
    // Test 8: Show important notes
    console.log('\n8. Important notes:');
    console.log('- Requires connection to XRPL server');
    console.log('- Testnet/Devnet recommended for testing');
    console.log('- Amounts are in drops (1 XRP = 1,000,000 drops)');
    console.log('- Public keys should be in hex format');
    console.log('- Settle delay is in seconds');
    console.log('- Channel IDs are returned from successful create operations');
    console.log('- Private keys must be kept secure');
    
    // Disconnect from the server
    await paymentChannels.disconnect();
    console.log('\n✓ Disconnected from payment channels');
    
    console.log('\nPayment Channels functionality tests completed!');
    console.log('Note: Actual payment channel functions require a connection to an XRPL server');
    console.log('and valid wallet credentials for transaction signing.');
  } catch (error) {
    console.error('Error during Payment Channels tests:', error);
    
    // Try to disconnect if still connected
    try {
      await paymentChannels.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testPaymentChannels().catch(console.error);