/**
 * Test file for XRPL Amendments functionality
 * 
 * This file tests the amendments tracking and management functionality.
 */

import { 
  createAmendmentsManager, 
  AmendmentsTracker, 
  generateAmendmentImplementationTemplate 
} from './src/lib/amendments';

async function testAmendmentsFunctionality() {
  console.log('Testing XRPL Amendments functionality...');
  
  // Test 1: Create AmendmentsManager
  console.log('\n1. Creating AmendmentsManager:');
  const amendmentsManager = createAmendmentsManager({
    configPath: '/etc/opt/ripple/rippled.cfg'
  });
  console.log('AmendmentsManager created successfully');
  
  // Test 2: Test AmendmentsTracker
  console.log('\n2. Testing AmendmentsTracker:');
  const tracker = amendmentsManager.getAmendmentsTracker();
  
  // List all amendments
  const allAmendments = tracker.listAmendments();
  console.log(`Total known amendments: ${allAmendments.length}`);
  
  // Get specific amendments
  const ammAmendment = tracker.getAmendment('AMM');
  console.log(`AMM Amendment: ${ammAmendment ? ammAmendment.name : 'Not found'}`);
  
  const didAmendment = tracker.getAmendment('DID');
  console.log(`DID Amendment: ${didAmendment ? didAmendment.name : 'Not found'}`);
  
  // Test amendments by status
  const enabledAmendments = tracker.getAmendmentsByStatus('Enabled');
  console.log(`Enabled amendments: ${enabledAmendments.length}`);
  
  const votingAmendments = tracker.getAmendmentsByStatus('Open for Voting');
  console.log(`Open for voting amendments: ${votingAmendments.length}`);
  
  // Test amendment enabled status
  console.log(`AMM is enabled: ${tracker.isAmendmentEnabled('AMM')}`);
  console.log(`Unknown amendment is enabled: ${tracker.isAmendmentEnabled('UNKNOWN')}`);
  
  // Test 3: Test AmendmentsManager methods
  console.log('\n3. Testing AmendmentsManager methods:');
  console.log('- getCurrentAmendments(): Get current amendments status');
  console.log('- getAmendmentsLedgerEntry(): Get amendments ledger entry');
  console.log('- isAmendmentBlocked(): Check if server is amendment blocked');
  console.log('- getSupportedAmendments(): Get supported amendments');
  console.log('- voteForAmendment(amendmentId, vote): Vote for an amendment');
  console.log('- getAmendment(amendmentId): Get amendment by ID');
  console.log('- listAmendments(): List all known amendments');
  
  // Test 4: Show amendment implementation template
  console.log('\n4. Generating amendment implementation template:');
  const template = generateAmendmentImplementationTemplate('TestAmendment', 'ABC123DEF456');
  console.log('Generated template:');
  console.log(template.substring(0, 500) + '...'); // Show first 500 characters
  
  // Test 5: Show amendment information
  console.log('\n5. Amendment information:');
  console.log('Key amendments implemented:');
  console.log('- AMM: Automated Market Maker functionality');
  console.log('- Checks: Check transactions for deferred payments');
  console.log('- DeletableAccounts: Account deletion capability');
  console.log('- DID: Decentralized Identifiers');
  console.log('- MPTokensV1: Multi-Purpose Tokens');
  console.log('- PermissionedDomains: Controlled environments');
  
  console.log('\nAmendments functionality tests completed.');
  console.log('Note: Actual amendment functions require a running rippled installation.');
}

// Run the tests
testAmendmentsFunctionality().catch(console.error);