/**
 * Test file for ledger history implementation
 */

import { createLedgerHistoryManager, LedgerHistoryConfig } from './src/lib/ledger-history';
import { createRippledManager, RippledConfig } from './src/lib/rippled-manager';

async function testLedgerHistory() {
  console.log('Testing Ledger History Implementation...\n');

  // Create rippled manager
  const rippledConfig: RippledConfig = {
    configPath: '/etc/rippled/rippled.cfg',
    dataPath: '/var/lib/rippled',
    logPath: '/var/log/rippled/debug.log'
  };
  
  const rippledManager = createRippledManager(rippledConfig);

  // Create ledger history configuration
  const ledgerHistoryConfig: LedgerHistoryConfig = {
    maxLedgersToKeep: 10000,
    fullHistory: false,
    backfillHistory: true,
    onlineDeletion: true
  };

  // Create ledger history manager
  const ledgerHistoryManager = createLedgerHistoryManager(rippledManager, ledgerHistoryConfig);

  try {
    // Test getting ledger range
    console.log('1. Testing ledger range retrieval...');
    const ledgerRange = await ledgerHistoryManager.getLedgerRange();
    console.log('Ledger range:', JSON.stringify(ledgerRange, null, 2));
    console.log();

    // Test checking full history status
    console.log('2. Testing full history status...');
    const hasFullHistory = await ledgerHistoryManager.hasFullHistory();
    console.log(`Has full history: ${hasFullHistory}\n`);

    // Test configuring full history
    console.log('3. Testing full history configuration...');
    await ledgerHistoryManager.configureFullHistory(true);
    console.log('Full history enabled\n');

    // Test configuring online deletion
    console.log('4. Testing online deletion configuration...');
    await ledgerHistoryManager.configureOnlineDeletion(false);
    console.log('Online deletion disabled\n');

    // Test getting history statistics
    console.log('5. Testing history statistics...');
    const stats = await ledgerHistoryManager.getHistoryStats();
    console.log('History statistics:', JSON.stringify(stats, null, 2));
    console.log();

    // Test clearing cache
    console.log('6. Testing cache clearing...');
    ledgerHistoryManager.clearCache();
    console.log('Cache cleared\n');

    // Test getting ledger (this would normally fetch from rippled)
    console.log('7. Testing ledger retrieval...');
    // Mock the rippled manager's runCommand method for testing
    (rippledManager as any).runCommand = async (command: string, params?: any) => {
      if (command === 'ledger') {
        return {
          result: {
            ledger: {
              ledger_index: params.ledger_index || 12345,
              hash: 'ABC123DEF456',
              parent_hash: 'DEF456GHI789',
              transactions: params.transactions ? [{ hash: 'TX123' }] : [],
              close_time_human: new Date().toISOString(),
              total_coins: '99999999999999999'
            }
          }
        };
      }
      return { result: {} };
    };
    
    const ledgerInfo = await ledgerHistoryManager.getLedger(12345);
    console.log('Ledger info:', JSON.stringify(ledgerInfo, null, 2));
    console.log();

    // Test getting transaction (this would normally fetch from rippled)
    console.log('8. Testing transaction retrieval...');
    // Mock the rippled manager's runCommand method for testing
    (rippledManager as any).runCommand = async (command: string, params?: any) => {
      if (command === 'tx') {
        return {
          result: {
            hash: params.transaction || 'TX123',
            ledger_index: 12345,
            Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            TransactionType: 'Payment'
          }
        };
      }
      return { result: {} };
    };
    
    const transaction = await ledgerHistoryManager.getTransaction('TX123');
    console.log('Transaction info:', JSON.stringify(transaction, null, 2));
    console.log();

    console.log('All ledger history tests passed!');
  } catch (error) {
    console.error('Ledger history test failed:', error);
  }
}

// Run the test
testLedgerHistory().catch(console.error);/**
 * Test file for ledger history implementation
 */

import { createLedgerHistoryManager, LedgerHistoryConfig } from './src/lib/ledger-history';
import { createRippledManager, RippledConfig } from './src/lib/rippled-manager';

async function testLedgerHistory() {
  console.log('Testing Ledger History Implementation...\n');

  // Create rippled manager
  const rippledConfig: RippledConfig = {
    configPath: '/etc/rippled/rippled.cfg',
    dataPath: '/var/lib/rippled',
    logPath: '/var/log/rippled/debug.log'
  };
  
  const rippledManager = createRippledManager(rippledConfig);

  // Create ledger history configuration
  const ledgerHistoryConfig: LedgerHistoryConfig = {
    maxLedgersToKeep: 10000,
    fullHistory: false,
    backfillHistory: true,
    onlineDeletion: true
  };

  // Create ledger history manager
  const ledgerHistoryManager = createLedgerHistoryManager(rippledManager, ledgerHistoryConfig);

  try {
    // Test getting ledger range
    console.log('1. Testing ledger range retrieval...');
    const ledgerRange = await ledgerHistoryManager.getLedgerRange();
    console.log('Ledger range:', JSON.stringify(ledgerRange, null, 2));
    console.log();

    // Test checking full history status
    console.log('2. Testing full history status...');
    const hasFullHistory = await ledgerHistoryManager.hasFullHistory();
    console.log(`Has full history: ${hasFullHistory}\n`);

    // Test configuring full history
    console.log('3. Testing full history configuration...');
    await ledgerHistoryManager.configureFullHistory(true);
    console.log('Full history enabled\n');

    // Test configuring online deletion
    console.log('4. Testing online deletion configuration...');
    await ledgerHistoryManager.configureOnlineDeletion(false);
    console.log('Online deletion disabled\n');

    // Test getting history statistics
    console.log('5. Testing history statistics...');
    const stats = await ledgerHistoryManager.getHistoryStats();
    console.log('History statistics:', JSON.stringify(stats, null, 2));
    console.log();

    // Test clearing cache
    console.log('6. Testing cache clearing...');
    ledgerHistoryManager.clearCache();
    console.log('Cache cleared\n');

    // Test getting ledger (this would normally fetch from rippled)
    console.log('7. Testing ledger retrieval...');
    // Mock the rippled manager's runCommand method for testing
    (rippledManager as any).runCommand = async (command: string, params?: any) => {
      if (command === 'ledger') {
        return {
          result: {
            ledger: {
              ledger_index: params.ledger_index || 12345,
              hash: 'ABC123DEF456',
              parent_hash: 'DEF456GHI789',
              transactions: params.transactions ? [{ hash: 'TX123' }] : [],
              close_time_human: new Date().toISOString(),
              total_coins: '99999999999999999'
            }
          }
        };
      }
      return { result: {} };
    };
    
    const ledgerInfo = await ledgerHistoryManager.getLedger(12345);
    console.log('Ledger info:', JSON.stringify(ledgerInfo, null, 2));
    console.log();

    // Test getting transaction (this would normally fetch from rippled)
    console.log('8. Testing transaction retrieval...');
    // Mock the rippled manager's runCommand method for testing
    (rippledManager as any).runCommand = async (command: string, params?: any) => {
      if (command === 'tx') {
        return {
          result: {
            hash: params.transaction || 'TX123',
            ledger_index: 12345,
            Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            TransactionType: 'Payment'
          }
        };
      }
      return { result: {} };
    };
    
    const transaction = await ledgerHistoryManager.getTransaction('TX123');
    console.log('Transaction info:', JSON.stringify(transaction, null, 2));
    console.log();

    console.log('All ledger history tests passed!');
  } catch (error) {
    console.error('Ledger history test failed:', error);
  }
}

// Run the test
testLedgerHistory().catch(console.error);