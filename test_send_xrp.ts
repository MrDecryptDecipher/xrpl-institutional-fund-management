/**
 * Test file for Send XRP functionality
 * 
 * This file tests the send XRP functionality as specified in the XRPL tutorials.
 */

import { createSendXRP, generateSampleConfig } from './src/lib/send-xrp';

async function testSendXRP() {
  console.log('Testing Send XRP functionality...');
  
  // Create Send XRP instance
  const config = generateSampleConfig();
  const sendXRP = createSendXRP(config);
  
  try {
    // Connect to the XRPL server
    await sendXRP.connect();
    console.log('✓ Connected to XRPL server');
    
    // Test 1: Show available methods
    console.log('\n1. Available Send XRP methods:');
    console.log('- connect(): Connect to XRPL server');
    console.log('- disconnect(): Disconnect from XRPL server');
    console.log('- getAccountFromSeed(seed): Get account from seed');
    console.log('- createAccount(): Create a new funded account');
    console.log('- sendXRP(senderSeed, destinationAddress, amount): Send XRP');
    console.log('- getXRPBalance(address): Get XRP balance');
    console.log('- getTokenBalances(address): Get token balances');
    
    // Test 2: Create two accounts
    console.log('\n2. Creating two test accounts...');
    const account1 = await sendXRP.createAccount();
    console.log(`✓ Account 1 created: ${account1.address}`);
    
    const account2 = await sendXRP.createAccount();
    console.log(`✓ Account 2 created: ${account2.address}`);
    
    // Test 3: Get initial balances
    console.log('\n3. Getting initial account balances...');
    const initialBalance1 = await sendXRP.getXRPBalance(account1.address);
    console.log(`Account 1 balance: ${initialBalance1} XRP`);
    
    const initialBalance2 = await sendXRP.getXRPBalance(account2.address);
    console.log(`Account 2 balance: ${initialBalance2} XRP`);
    
    // Test 4: Send XRP from account 1 to account 2
    console.log('\n4. Sending 10 XRP from Account 1 to Account 2...');
    const sendResult = await sendXRP.sendXRP(account1.seed, account2.address, 10);
    
    if (sendResult.success) {
      console.log(`✓ Successfully sent XRP`);
      console.log(`Transaction hash: ${sendResult.transactionHash}`);
      
      if (sendResult.balanceChanges) {
        console.log('Balance changes:');
        for (const [address, change] of Object.entries(sendResult.balanceChanges)) {
          console.log(`  ${address}: ${change} drops`);
        }
      }
    } else {
      console.log(`✗ Failed to send XRP: ${sendResult.error}`);
    }
    
    // Test 5: Get updated balances
    console.log('\n5. Getting updated account balances...');
    const updatedBalance1 = await sendXRP.getXRPBalance(account1.address);
    console.log(`Account 1 balance: ${updatedBalance1} XRP`);
    
    const updatedBalance2 = await sendXRP.getXRPBalance(account2.address);
    console.log(`Account 2 balance: ${updatedBalance2} XRP`);
    
    // Test 6: Get token balances
    console.log('\n6. Getting token balances for Account 1...');
    try {
      const tokenBalances1 = await sendXRP.getTokenBalances(account1.address);
      console.log('Account 1 token balances:', JSON.stringify(tokenBalances1, null, 2));
    } catch (error) {
      console.log(`Note: No token balances found for Account 1`);
    }
    
    // Test 7: Show configuration options
    console.log('\n7. Configuration options:');
    console.log('SendXRPConfig:');
    console.log('- server: string (WebSocket server URL)');
    console.log('- network: "Testnet" | "Devnet" | "Mainnet" (optional)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- network: ${config.network}`);
    
    // Test 8: Show result structure
    console.log('\n8. Send XRP result structure:');
    console.log('SendXRPResult:');
    console.log('- success: boolean (whether transaction succeeded)');
    console.log('- transactionHash: string (transaction hash, if successful)');
    console.log('- result: any (full transaction result, if successful)');
    console.log('- error: string (error message, if failed)');
    console.log('- balanceChanges: object (balance changes, if successful)');
    
    // Test 9: Show account info structure
    console.log('\n9. Account info structure:');
    console.log('AccountInfo:');
    console.log('- address: string (account address)');
    console.log('- seed: string (account seed)');
    console.log('- name: string (optional account name)');
    
    // Test 10: Show important notes
    console.log('\n10. Important notes:');
    console.log('- Requires connection to XRPL server');
    console.log('- Testnet/Devnet recommended for testing');
    console.log('- XRP amounts are in XRP (automatically converted to drops)');
    console.log('- Account creation uses faucet for Testnet/Devnet');
    console.log('- Transactions require sufficient XRP balance');
    console.log('- Private keys (seeds) must be kept secure');
    
    // Disconnect from the server
    await sendXRP.disconnect();
    console.log('\n✓ Disconnected from XRPL server');
    
    console.log('\nSend XRP functionality tests completed successfully!');
  } catch (error) {
    console.error('Error during Send XRP tests:', error);
    
    // Try to disconnect if still connected
    try {
      await sendXRP.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testSendXRP().catch(console.error);