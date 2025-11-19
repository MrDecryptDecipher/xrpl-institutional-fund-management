/**
 * Test file for Payment Monitor functionality
 * 
 * This file tests the payment monitor functionality for monitoring incoming payments.
 */

import { createPaymentMonitor, generateSampleConfig } from './src/lib/payment-monitor';

async function testPaymentMonitor() {
  console.log('Testing Payment Monitor functionality...');
  
  // Create Payment Monitor instance
  const config = generateSampleConfig();
  const paymentMonitor = createPaymentMonitor(config);
  
  try {
    // Connect to the WebSocket server
    await paymentMonitor.connect();
    console.log('✓ Connected to payment monitor');
    
    // Test 1: Show available methods
    console.log('\n1. Available Payment Monitor methods:');
    console.log('- connect(): Connect to WebSocket server');
    console.log('- disconnect(): Disconnect from WebSocket server');
    console.log('- subscribeAccount(account): Subscribe to payments for an account');
    console.log('- unsubscribeAccount(account): Unsubscribe from payments for an account');
    console.log('- addPaymentHandler(handler): Add a payment handler');
    console.log('- removePaymentHandler(handler): Remove a payment handler');
    console.log('- getMonitoredAccounts(): Get list of monitored accounts');
    console.log('- isConnected(): Check connection status');
    console.log('- processMessage(message): Process a WebSocket message');
    
    // Test 2: Add a payment handler
    console.log('\n2. Adding payment handler...');
    paymentMonitor.addPaymentHandler((payment) => {
      console.log(`💰 Payment received!`);
      console.log(`   From: ${payment.from}`);
      console.log(`   To: ${payment.account}`);
      console.log(`   Amount: ${payment.amount} ${payment.currency}`);
      console.log(`   Transaction: ${payment.transactionHash}`);
    });
    
    // Test 3: Show configuration options
    console.log('\n3. Configuration options:');
    console.log('PaymentMonitorConfig:');
    console.log('- server: string (WebSocket server hostname)');
    console.log('- port: number (optional, default: 51233 for secure)');
    console.log('- secure: boolean (optional, default: true for wss://)');
    
    console.log('\nSample configuration:');
    console.log(`- server: ${config.server}`);
    console.log(`- port: ${config.port}`);
    console.log(`- secure: ${config.secure}`);
    
    // Test 4: Show payment event structure
    console.log('\n4. Payment event structure:');
    console.log('PaymentEvent:');
    console.log('- type: "payment"');
    console.log('- account: string (destination account)');
    console.log('- amount: string (payment amount)');
    console.log('- currency: string (currency code)');
    console.log('- issuer: string (optional, issuer for IOUs)');
    console.log('- from: string (source account)');
    console.log('- transactionHash: string (transaction hash)');
    console.log('- ledgerIndex: number (ledger index)');
    console.log('- timestamp: number (timestamp in milliseconds)');
    
    // Test 5: Show important notes
    console.log('\n5. Important notes:');
    console.log('- Requires connection to XRPL WebSocket server');
    console.log('- Supports monitoring XRP and IOU payments');
    console.log('- Handles both secure (wss://) and insecure (ws://) connections');
    console.log('- Automatically unsubscribes from accounts when disconnecting');
    console.log('- Supports multiple payment handlers');
    console.log('- Processes transaction notifications from WebSocket messages');
    
    // Test 6: Show example usage
    console.log('\n6. Example usage:');
    console.log('const paymentMonitor = createPaymentMonitor({ server: "s.altnet.rippletest.net", secure: true });');
    console.log('await paymentMonitor.connect();');
    console.log('paymentMonitor.addPaymentHandler((payment) => {');
    console.log('  console.log(`Received ${payment.amount} ${payment.currency} from ${payment.from}`);');
    console.log('});');
    console.log('await paymentMonitor.subscribeAccount("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV");');
    
    // Disconnect from the server
    paymentMonitor.disconnect();
    console.log('\n✓ Disconnected from payment monitor');
    
    console.log('\nPayment Monitor functionality tests completed!');
    console.log('Note: Actual payment monitoring requires a running connection to an XRPL server');
    console.log('and processing of real WebSocket transaction notifications.');
  } catch (error) {
    console.error('Error during Payment Monitor tests:', error);
    
    // Try to disconnect if still connected
    try {
      paymentMonitor.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the tests
testPaymentMonitor().catch(console.error);