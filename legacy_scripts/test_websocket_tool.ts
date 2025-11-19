/**
 * Test file for WebSocket Tool functionality
 * 
 * This file tests the WebSocket API tool functionality.
 */

import { createWebSocketTool } from './src/lib/websocket-tool';

async function testWebSocketTool() {
  console.log('Testing WebSocket Tool functionality...');
  
  // Create WebSocket Tool instance
  const wsTool = createWebSocketTool({
    server: 's1.ripple.com',
    secure: true
  });
  
  // Test 1: Show available methods
  console.log('\n1. Available WebSocket Tool methods:');
  console.log('- connect(): Connect to WebSocket server');
  console.log('- disconnect(): Disconnect from WebSocket server');
  console.log('- sendRequest(command, params): Send request to server');
  console.log('- subscribeAccount(account): Subscribe to account changes');
  console.log('- subscribeLedger(): Subscribe to ledger changes');
  console.log('- unsubscribeAccount(account): Unsubscribe from account changes');
  console.log('- unsubscribeLedger(): Unsubscribe from ledger changes');
  console.log('- getAccountInfo(account, ledgerIndex?): Get account information');
  console.log('- getServerInfo(): Get server information');
  console.log('- getLedger(ledgerIndex?): Get ledger information');
  console.log('- getTransaction(transaction): Get transaction information');
  console.log('- submitTransaction(txBlob): Submit a transaction');
  console.log('- getAccountTransactions(account, ...): Get account transactions');
  console.log('- ping(): Ping the server');
  console.log('- isConnected(): Check connection status');
  
  // Test 2: Show example usage
  console.log('\n2. Example usage:');
  console.log('const wsTool = createWebSocketTool({ server: "s1.ripple.com", secure: true });');
  console.log('await wsTool.connect();');
  console.log('const serverInfo = await wsTool.getServerInfo();');
  console.log('const accountInfo = await wsTool.getAccountInfo("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV");');
  console.log('await wsTool.disconnect();');
  
  // Test 3: Show WebSocket configuration options
  console.log('\n3. WebSocket configuration options:');
  console.log('- server: Server hostname (e.g., "s1.ripple.com")');
  console.log('- port: Port number (default: 51233 for secure, 51232 for insecure)');
  console.log('- secure: Whether to use wss:// (true) or ws:// (false)');
  
  // Test 4: Show common WebSocket commands
  console.log('\n4. Common WebSocket commands:');
  console.log('- server_info: Get server information');
  console.log('- ledger: Get ledger information');
  console.log('- account_info: Get account information');
  console.log('- tx: Get transaction information');
  console.log('- account_tx: Get account transactions');
  console.log('- submit: Submit a transaction');
  console.log('- ping: Ping the server');
  console.log('- subscribe: Subscribe to streams');
  console.log('- unsubscribe: Unsubscribe from streams');
  
  // Test 5: Show subscription streams
  console.log('\n5. Subscription streams:');
  console.log('- ledger: Ledger close notifications');
  console.log('- transactions: Transaction notifications');
  console.log('- validations: Validation notifications');
  console.log('- manifests: Manifest notifications');
  console.log('- account: Account transaction notifications');
  
  console.log('\nWebSocket Tool functionality tests completed.');
  console.log('Note: Actual WebSocket functions require a running connection to an XRPL server.');
}

// Run the tests
testWebSocketTool().catch(console.error);