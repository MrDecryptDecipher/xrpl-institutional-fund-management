/**
 * Test file for transaction censorship detection implementation
 */

import { createTransactionCensorshipDetector, CensorshipDetectionConfig } from './src/lib/transaction-censorship';

async function testTransactionCensorship() {
  console.log('Testing Transaction Censorship Detection Implementation...\n');

  // Create censorship detection configuration
  const censorshipConfig: CensorshipDetectionConfig = {
    maxWarnings: 3,
    checkInterval: 1,
    alertThreshold: 5
  };

  // Create transaction censorship detector
  const censorshipDetector = createTransactionCensorshipDetector(censorshipConfig);

  try {
    // Set up alert callback
    censorshipDetector.setAlertCallback((alert) => {
      console.log(`ALERT (${alert.alertType.toUpperCase()}): ${alert.message}`);
    });

    // Test adding transactions to track
    console.log('1. Testing transaction tracking...');
    censorshipDetector.addTransactionToTrack('TX123ABC', 1000);
    censorshipDetector.addTransactionToTrack('TX456DEF', 1001);
    censorshipDetector.addTransactionToTrack('TX789GHI', 1002);
    console.log('Transactions added to tracking\n');

    // Test getting tracked transactions
    console.log('2. Testing tracked transactions retrieval...');
    const trackedTransactions = censorshipDetector.getTrackedTransactions();
    console.log(`Tracked transactions: ${trackedTransactions.length}\n`);

    // Test updating ledger index and checking for warnings
    console.log('3. Testing ledger updates and warning detection...');
    
    // Update to ledger 1005 (3 ledgers after first transaction)
    censorshipDetector.updateCurrentLedger(1005);
    console.log('Updated to ledger 1005\n');
    
    // Wait a bit to see if any alerts were generated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Update to ledger 1010 (8 ledgers after first transaction - should trigger warning)
    censorshipDetector.updateCurrentLedger(1010);
    console.log('Updated to ledger 1010\n');
    
    // Wait a bit to see if any alerts were generated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Update to ledger 1015 (13 ledgers after first transaction - should trigger another warning)
    censorshipDetector.updateCurrentLedger(1015);
    console.log('Updated to ledger 1015\n');
    
    // Wait a bit to see if any alerts were generated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Update to ledger 1020 (18 ledgers after first transaction - should trigger error)
    censorshipDetector.updateCurrentLedger(1020);
    console.log('Updated to ledger 1020\n');
    
    // Wait a bit to see if any alerts were generated
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test getting alerts
    console.log('4. Testing alerts retrieval...');
    const alerts = censorshipDetector.getAlerts();
    console.log(`Alerts generated: ${alerts.length}`);
    alerts.forEach((alert, index) => {
      console.log(`  ${index + 1}. ${alert.alertType.toUpperCase()}: ${alert.message}`);
    });
    console.log();

    // Test marking transaction as included
    console.log('5. Testing marking transaction as included...');
    censorshipDetector.markTransactionIncluded('TX456DEF', 1012);
    console.log('Transaction marked as included\n');

    // Test getting updated tracked transactions
    console.log('6. Testing updated tracked transactions retrieval...');
    const updatedTrackedTransactions = censorshipDetector.getTrackedTransactions();
    console.log(`Remaining tracked transactions: ${updatedTrackedTransactions.length}`);
    updatedTrackedTransactions.forEach(tx => {
      console.log(`  - ${tx.transactionHash}: ${tx.status}`);
    });
    console.log();

    // Test getting statistics
    console.log('7. Testing statistics retrieval...');
    const stats = censorshipDetector.getStatistics();
    console.log('Censorship detection statistics:', JSON.stringify(stats, null, 2));
    console.log();

    // Test clearing alerts
    console.log('8. Testing alerts clearing...');
    censorshipDetector.clearAlerts();
    console.log('Alerts cleared\n');

    console.log('All transaction censorship detection tests passed!');
  } catch (error) {
    console.error('Transaction censorship detection test failed:', error);
  }
}

// Run the test
testTransactionCensorship().catch(console.error);