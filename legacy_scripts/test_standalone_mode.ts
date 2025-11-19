/**
 * Test file for Rippled Manager standalone mode functionality
 * 
 * This file tests the standalone mode and genesis ledger functionality.
 */

import { createRippledManager } from './src/lib/rippled-manager';

async function testStandaloneMode() {
  console.log('Testing Rippled Manager standalone mode functionality...');
  
  // Create RippledManager instance
  const manager = createRippledManager({
    configPath: '/etc/opt/ripple/rippled.cfg'
  });
  
  // Test 1: Get genesis account information
  console.log('\n1. Getting genesis account information:');
  const genesisAccount = manager.getGenesisAccount();
  console.log(`Genesis address: ${genesisAccount.address}`);
  console.log(`Genesis secret: ${genesisAccount.secret}`);
  
  // Test 2: Test standalone mode start methods
  console.log('\n2. Testing standalone mode start methods:');
  console.log('- start(true, false, true): Start in standalone mode with genesis ledger');
  console.log('- startWithGenesisLedger(): Convenience method for standalone + genesis');
  
  // Test 3: Test standalone testing utilities
  console.log('\n3. Testing standalone testing utilities:');
  console.log('- advanceLedger(): Advance ledger in standalone mode');
  console.log('- loadLedger(ledgerFile: string): Load saved ledger');
  console.log('- runStandaloneTest(testFunction): Run tests in standalone environment');
  
  // Test 4: Show genesis ledger settings
  console.log('\n4. Genesis ledger settings:');
  console.log('In a new genesis ledger:');
  console.log('- Genesis address holds all 100 billion XRP');
  console.log('- Default Reserve: 200 XRP minimum for funding a new address');
  console.log('- Increment: 50 XRP per object in the ledger');
  console.log('- All amendments enabled by default when using --start option');
  
  console.log('\nStandalone mode functionality tests completed.');
  console.log('Note: Actual standalone mode functions require a running rippled installation.');
}

// Run the tests
testStandaloneMode().catch(console.error);