/**
 * Test file for XRPL Pseudo-Transactions functionality
 * 
 * This file tests the pseudo-transactions implementation.
 */

import { 
  createPseudoTransactionManager, 
  PseudoTransactionManager,
  EnableAmendmentPseudoTransaction,
  SetFeePseudoTransaction,
  UNLModifyPseudoTransaction,
  isPseudoTransaction,
  getAmendmentStatusFromFlags
} from './src/lib/pseudo-transactions';

async function testPseudoTransactionsFunctionality() {
  console.log('Testing XRPL Pseudo-Transactions functionality...');
  
  // Test 1: Create PseudoTransactionManager
  console.log('\n1. Creating PseudoTransactionManager:');
  const pseudoTxManager = createPseudoTransactionManager({
    server: 'wss://s.altnet.rippletest.net:51233'
  });
  console.log('PseudoTransactionManager created successfully');
  
  // Test 2: Test EnableAmendment processing
  console.log('\n2. Testing EnableAmendment processing:');
  const enableAmendmentTx: EnableAmendmentPseudoTransaction = {
    Account: 'rrrrrrrrrrrrrrrrrrrrrhoLvTp',
    Fee: '0',
    Sequence: 0,
    SigningPubKey: '',
    TransactionType: 'EnableAmendment',
    Amendment: '42426C4D4F1009EE67080A9B7965B44656D7714D104A72F9B4369F97ABF044EE',
    LedgerSequence: 21225473,
    Flags: 0
  };
  
  const enableAmendmentResult = pseudoTxManager.processEnableAmendment(enableAmendmentTx);
  console.log(`EnableAmendment processing result: ${enableAmendmentResult.success ? 'Success' : 'Failed'}`);
  if (enableAmendmentResult.error) {
    console.log(`Error: ${enableAmendmentResult.error}`);
  }
  
  // Test 3: Test SetFee processing
  console.log('\n3. Testing SetFee processing:');
  const setFeeTx: SetFeePseudoTransaction = {
    Account: 'rrrrrrrrrrrrrrrrrrrrrhoLvTp',
    Fee: '0',
    Sequence: 0,
    SigningPubKey: '',
    TransactionType: 'SetFee',
    BaseFeeDrops: '10',
    ReserveBaseDrops: '1000000',
    ReserveIncrementDrops: '200000',
    LedgerSequence: 92508417,
    date: 786494751,
    ledger_index: 92508417
  };
  
  const setFeeResult = pseudoTxManager.processSetFee(setFeeTx);
  console.log(`SetFee processing result: ${setFeeResult.success ? 'Success' : 'Failed'}`);
  if (setFeeResult.error) {
    console.log(`Error: ${setFeeResult.error}`);
  }
  
  // Test 4: Test UNLModify processing
  console.log('\n4. Testing UNLModify processing:');
  const unlModifyTx: UNLModifyPseudoTransaction = {
    Account: '',
    Fee: '0',
    Sequence: 0,
    SigningPubKey: '',
    TransactionType: 'UNLModify',
    LedgerSequence: 1600000,
    UNLModifyDisabling: 1,
    UNLModifyValidator: 'ED6629D456285AE3613B285F65BBFF168D695BA3921F309949AFCD2CA7AFEC16FE'
  };
  
  const unlModifyResult = pseudoTxManager.processUNLModify(unlModifyTx);
  console.log(`UNLModify processing result: ${unlModifyResult.success ? 'Success' : 'Failed'}`);
  if (unlModifyResult.error) {
    console.log(`Error: ${unlModifyResult.error}`);
  }
  
  // Test 5: Test generic pseudo-transaction processing
  console.log('\n5. Testing generic pseudo-transaction processing:');
  const genericResult = pseudoTxManager.processPseudoTransaction(enableAmendmentTx);
  console.log(`Generic processing result: ${genericResult.success ? 'Success' : 'Failed'}`);
  
  // Test 6: Test isPseudoTransaction helper
  console.log('\n6. Testing isPseudoTransaction helper:');
  const isPseudo1 = isPseudoTransaction(enableAmendmentTx);
  const isPseudo2 = isPseudoTransaction({ TransactionType: 'Payment', Account: 'r123' });
  console.log(`EnableAmendment is pseudo-transaction: ${isPseudo1}`);
  console.log(`Payment is pseudo-transaction: ${isPseudo2}`);
  
  // Test 7: Test amendment status helper
  console.log('\n7. Testing amendment status helper:');
  console.log(`Flags 0 status: ${getAmendmentStatusFromFlags(0)}`);
  console.log(`Flags 65536 status: ${getAmendmentStatusFromFlags(65536)}`);
  console.log(`Flags 131072 status: ${getAmendmentStatusFromFlags(131072)}`);
  console.log(`No flags status: ${getAmendmentStatusFromFlags()}`);
  
  // Test 8: Show available functionality
  console.log('\n8. Available pseudo-transaction functionality:');
  console.log('- processEnableAmendment(): Process EnableAmendment pseudo-transactions');
  console.log('- processSetFee(): Process SetFee pseudo-transactions');
  console.log('- processUNLModify(): Process UNLModify pseudo-transactions');
  console.log('- processPseudoTransaction(): Generic pseudo-transaction processor');
  console.log('- getPseudoTransactionsFromLedger(): Get pseudo-transactions from a ledger');
  console.log('- monitorPseudoTransactions(): Monitor for new pseudo-transactions');
  console.log('- isPseudoTransaction(): Check if a transaction is a pseudo-transaction');
  console.log('- getAmendmentStatusFromFlags(): Get amendment status from flags');
  
  console.log('\nPseudo-transactions functionality tests completed.');
  console.log('Note: Some functions require a running rippled installation to work fully.');
}

// Run the tests
testPseudoTransactionsFunctionality().catch(console.error);
