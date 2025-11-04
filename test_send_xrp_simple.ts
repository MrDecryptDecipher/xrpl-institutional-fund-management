/**
 * Simple test file for Send XRP functionality
 * 
 * This file tests the basic send XRP functionality.
 */

import { createSendXRP, generateSampleConfig } from './src/lib/send-xrp';

async function testSendXRPSimple() {
  console.log('Testing Send XRP simple functionality...');
  
  // Create Send XRP instance
  const config = generateSampleConfig();
  const sendXRP = createSendXRP(config);
  
  try {
    // Connect to the XRPL server
    await sendXRP.connect();
    console.log('✓ Connected to XRPL server');
    
    // Create two accounts
    console.log('Creating two test accounts...');
    const account1 = await sendXRP.createAccount();
    console.log(`✓ Account 1 created: ${account1.address}`);
    
    const account2 = await sendXRP.createAccount();
    console.log(`✓ Account 2 created: ${account2.address}`);
    
    // Send a small amount (1 XRP) from account 1 to account 2
    console.log('Sending 1 XRP from Account 1 to Account 2...');
    const sendResult = await sendXRP.sendXRP(account1.seed, account2.address, 1);
    
    if (sendResult.success) {
      console.log(`✓ Successfully sent XRP`);
      console.log(`Transaction hash: ${sendResult.transactionHash}`);
    } else {
      console.log(`✗ Failed to send XRP: ${sendResult.error}`);
    }
    
    // Get final balances
    console.log('Getting final account balances...');
    const finalBalance1 = await sendXRP.getXRPBalance(account1.address);
    console.log(`Account 1 final balance: ${finalBalance1} XRP`);
    
    const finalBalance2 = await sendXRP.getXRPBalance(account2.address);
    console.log(`Account 2 final balance: ${finalBalance2} XRP`);
    
    // Disconnect from the server
    await sendXRP.disconnect();
    console.log('✓ Disconnected from XRPL server');
    
    console.log('\nSimple Send XRP test completed!');
  } catch (error) {
    console.error('Error during Send XRP test:', error);
    
    // Try to disconnect if still connected
    try {
      await sendXRP.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the test
testSendXRPSimple().catch(console.error);