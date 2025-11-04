/**
 * Test file for Rippled Manager functionality
 * 
 * This file tests the rippled server management functionality.
 */

import { createRippledManager, generateSampleConfig } from './src/lib/rippled-manager';

async function testRippledManager() {
  console.log('Testing Rippled Manager functionality...');
  
  // Test 1: Generate sample configuration
  console.log('\n1. Generating sample rippled configuration:');
  const sampleConfig = generateSampleConfig();
  console.log(sampleConfig.substring(0, 200) + '...'); // Show first 200 characters
  
  // Test 2: Create RippledManager instance
  console.log('\n2. Creating RippledManager instance:');
  const manager = createRippledManager({
    configPath: '/etc/opt/ripple/rippled.cfg'
  });
  
  console.log('RippledManager created with config path: /etc/opt/ripple/rippled.cfg');
  
  // Test 3: Get version (this will fail if rippled is not installed)
  console.log('\n3. Testing version retrieval:');
  try {
    const version = await manager.getVersion();
    console.log(`Rippled version: ${version}`);
  } catch (error) {
    console.log(`Failed to get rippled version (expected if not installed): ${error instanceof Error ? error.message : String(error)}`);
  }
  
  // Test 4: Show available methods
  console.log('\n4. Available RippledManager methods:');
  console.log('- start(standalone?: boolean, importLedger?: boolean, startWithGenesis?: boolean): Promise<void>');
  console.log('- startWithGenesisLedger(): Promise<void>');
  console.log('- stop(): Promise<void>');
  console.log('- getServerInfo(): Promise<ServerInfo>');
  console.log('- getPeers(): Promise<PeerInfo[]>');
  console.log('- getValidatorInfo(): Promise<ValidatorInfo[]>');
  console.log('- isSynced(): Promise<boolean>');
  console.log('- getVersion(): Promise<string>');
  console.log('- createValidatorToken(keyfilePath: string): Promise<string>');
  console.log('- setValidatorDomain(domain: string, keyfilePath: string): Promise<string>');
  console.log('- advanceLedger(): Promise<void>');
  console.log('- getGenesisAccount(): { address: string; secret: string }');
  console.log('- loadLedger(ledgerFile: string): Promise<void>');
  console.log('- runStandaloneTest(testFunction: () => Promise<any>): Promise<any>');
  console.log('- analyzeServerState(): Promise<any>');
  console.log('- checkSyncIssues(): Promise<any>');
  console.log('- getServerLogs(lines: number): Promise<string>');
  console.log('- setLogLevel(level: string): Promise<void>');
  console.log('- runDiagnostics(): Promise<any>');
  console.log('- generateDiagnosticReport(): Promise<string>');
  
  console.log('\nRippled Manager functionality tests completed.');
  console.log('Note: Actual server management functions require a running rippled installation.');
}

// Run the tests
testRippledManager().catch(console.error);