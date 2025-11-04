/**
 * Test file for RPC Tool functionality
 * 
 * This file tests the RPC tool functionality for printing raw information
 * about accounts, transactions, and ledgers.
 */

import { createRPCTool } from './src/lib/rpc-tool';

async function testRPCTool() {
  console.log('Testing RPC Tool functionality...');
  
  // Create RPC Tool instance
  const rpcTool = createRPCTool({
    configPath: '/etc/opt/ripple/rippled.cfg'
  });
  
  // Test 1: Show available methods
  console.log('\n1. Available RPC Tool methods:');
  console.log('- getAccountInfo(account, ledgerIndex?): Get raw account information');
  console.log('- getTransactionInfo(transactionHash, binary?): Get raw transaction information');
  console.log('- getLedgerInfo(ledgerIndex, transactions?, expand?, accounts?): Get raw ledger information');
  console.log('- printAccountInfo(account, ledgerIndex?): Print formatted account information');
  console.log('- printTransactionInfo(transactionHash): Print formatted transaction information');
  console.log('- printLedgerInfo(ledgerIndex): Print formatted ledger information');
  console.log('- getAccountTransactions(account, ledgerIndexMin?, ledgerIndexMax?, limit?): Get account transactions');
  console.log('- getLedgerEntry(index, ledgerIndex?): Get ledger entry');
  
  // Test 2: Show example usage
  console.log('\n2. Example usage:');
  console.log('const rpcTool = createRPCTool();');
  console.log('const accountInfo = await rpcTool.getAccountInfo("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV");');
  console.log('const txInfo = await rpcTool.getTransactionInfo("transaction_hash_here");');
  console.log('const ledgerInfo = await rpcTool.getLedgerInfo(123456);');
  
  // Test 3: Show account information fields
  console.log('\n3. Account information fields:');
  console.log('- account: Account address');
  console.log('- balance: Account balance in drops');
  console.log('- sequence: Next transaction sequence number');
  console.log('- owner_count: Number of ledger objects owned by account');
  console.log('- previous_txn_id: Last transaction hash');
  console.log('- previous_txn_lgr_seq: Ledger sequence of last transaction');
  console.log('- domain: Domain associated with account (optional)');
  console.log('- regular_key: Regular key for account (optional)');
  
  // Test 4: Show transaction information fields
  console.log('\n4. Transaction information fields:');
  console.log('- hash: Transaction hash');
  console.log('- ledger_index: Ledger sequence containing transaction');
  console.log('- date: Unix timestamp of transaction');
  console.log('- tx: Transaction details');
  console.log('- meta: Transaction metadata');
  
  // Test 5: Show ledger information fields
  console.log('\n5. Ledger information fields:');
  console.log('- ledger_index: Ledger sequence number');
  console.log('- ledger_hash: SHA512Half of this ledger version');
  console.log('- parent_hash: SHA512Half of previous ledger version');
  console.log('- transaction_hash: SHA512Half of transaction tree');
  console.log('- state_hash: SHA512Half of state tree');
  console.log('- close_time: Unix timestamp when ledger was closed');
  console.log('- close_time_resolution: Resolution of close time');
  console.log('- close_flags: Flags indicating how ledger was closed');
  console.log('- transactions: Transactions in ledger (optional)');
  console.log('- accountState: Account state objects (optional)');
  
  // Test 6: Show common RPC commands
  console.log('\n6. Common RPC commands:');
  console.log('- account_info: Get account information');
  console.log('- tx: Get transaction information');
  console.log('- ledger: Get ledger information');
  console.log('- account_tx: Get account transactions');
  console.log('- ledger_entry: Get ledger entry');
  
  console.log('\nRPC Tool functionality tests completed.');
  console.log('Note: Actual RPC functions require a running rippled installation.');
}

// Run the tests
testRPCTool().catch(console.error);/**
 * Test file for RPC Tool functionality
 * 
 * This file tests the RPC tool functionality for printing raw information
 * about accounts, transactions, and ledgers.
 */

import { createRPCTool } from './src/lib/rpc-tool';

async function testRPCTool() {
  console.log('Testing RPC Tool functionality...');
  
  // Create RPC Tool instance
  const rpcTool = createRPCTool({
    configPath: '/etc/opt/ripple/rippled.cfg'
  });
  
  // Test 1: Show available methods
  console.log('\n1. Available RPC Tool methods:');
  console.log('- getAccountInfo(account, ledgerIndex?): Get raw account information');
  console.log('- getTransactionInfo(transactionHash, binary?): Get raw transaction information');
  console.log('- getLedgerInfo(ledgerIndex, transactions?, expand?, accounts?): Get raw ledger information');
  console.log('- printAccountInfo(account, ledgerIndex?): Print formatted account information');
  console.log('- printTransactionInfo(transactionHash): Print formatted transaction information');
  console.log('- printLedgerInfo(ledgerIndex): Print formatted ledger information');
  console.log('- getAccountTransactions(account, ledgerIndexMin?, ledgerIndexMax?, limit?): Get account transactions');
  console.log('- getLedgerEntry(index, ledgerIndex?): Get ledger entry');
  
  // Test 2: Show example usage
  console.log('\n2. Example usage:');
  console.log('const rpcTool = createRPCTool();');
  console.log('const accountInfo = await rpcTool.getAccountInfo("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV");');
  console.log('const txInfo = await rpcTool.getTransactionInfo("transaction_hash_here");');
  console.log('const ledgerInfo = await rpcTool.getLedgerInfo(123456);');
  
  // Test 3: Show account information fields
  console.log('\n3. Account information fields:');
  console.log('- account: Account address');
  console.log('- balance: Account balance in drops');
  console.log('- sequence: Next transaction sequence number');
  console.log('- owner_count: Number of ledger objects owned by account');
  console.log('- previous_txn_id: Last transaction hash');
  console.log('- previous_txn_lgr_seq: Ledger sequence of last transaction');
  console.log('- domain: Domain associated with account (optional)');
  console.log('- regular_key: Regular key for account (optional)');
  
  // Test 4: Show transaction information fields
  console.log('\n4. Transaction information fields:');
  console.log('- hash: Transaction hash');
  console.log('- ledger_index: Ledger sequence containing transaction');
  console.log('- date: Unix timestamp of transaction');
  console.log('- tx: Transaction details');
  console.log('- meta: Transaction metadata');
  
  // Test 5: Show ledger information fields
  console.log('\n5. Ledger information fields:');
  console.log('- ledger_index: Ledger sequence number');
  console.log('- ledger_hash: SHA512Half of this ledger version');
  console.log('- parent_hash: SHA512Half of previous ledger version');
  console.log('- transaction_hash: SHA512Half of transaction tree');
  console.log('- state_hash: SHA512Half of state tree');
  console.log('- close_time: Unix timestamp when ledger was closed');
  console.log('- close_time_resolution: Resolution of close time');
  console.log('- close_flags: Flags indicating how ledger was closed');
  console.log('- transactions: Transactions in ledger (optional)');
  console.log('- accountState: Account state objects (optional)');
  
  // Test 6: Show common RPC commands
  console.log('\n6. Common RPC commands:');
  console.log('- account_info: Get account information');
  console.log('- tx: Get transaction information');
  console.log('- ledger: Get ledger information');
  console.log('- account_tx: Get account transactions');
  console.log('- ledger_entry: Get ledger entry');
  
  console.log('\nRPC Tool functionality tests completed.');
  console.log('Note: Actual RPC functions require a running rippled installation.');
}

// Run the tests
testRPCTool().catch(console.error);