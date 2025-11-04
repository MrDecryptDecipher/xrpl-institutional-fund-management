/**
 * Test file for parallel networks implementation
 */

import { createParallelNetworksManager } from './src/lib/parallel-networks';

async function testParallelNetworks() {
  console.log('Testing Parallel Networks Implementation...\n');

  // Create parallel networks manager
  const networksManager = createParallelNetworksManager();

  try {
    // Test getting all networks
    console.log('1. Testing network list retrieval...');
    const networks = networksManager.getAllNetworks();
    console.log(`Available networks: ${networks.length}`);
    networks.forEach(network => {
      console.log(`  - ${network.name}: ${network.description}`);
    });
    console.log();

    // Test getting network by name
    console.log('2. Testing network retrieval by name...');
    const testnet = networksManager.getNetwork('Testnet');
    console.log('Testnet configuration:', JSON.stringify(testnet, null, 2));
    console.log();

    // Test connecting to a network
    console.log('3. Testing network connection...');
    await networksManager.connectToNetwork('Testnet');
    console.log('Connected to Testnet\n');

    // Test getting network status
    console.log('4. Testing network status retrieval...');
    const testnetStatus = networksManager.getNetworkStatus('Testnet');
    console.log('Testnet status:', JSON.stringify(testnetStatus, null, 2));
    console.log();

    // Test getting active network
    console.log('5. Testing active network retrieval...');
    const activeNetwork = networksManager.getActiveNetwork();
    console.log(`Active network: ${activeNetwork}\n`);

    // Test getting all network statuses
    console.log('6. Testing all network statuses retrieval...');
    const allStatuses = networksManager.getAllNetworkStatuses();
    console.log('All network statuses:');
    allStatuses.forEach(status => {
      console.log(`  - ${status.networkName}: ${status.status}`);
    });
    console.log();

    // Test checking if network is production
    console.log('7. Testing production network check...');
    const isMainnetProduction = networksManager.isProductionNetwork('Mainnet');
    const isTestnetProduction = networksManager.isProductionNetwork('Testnet');
    console.log(`Is Mainnet production: ${isMainnetProduction}`);
    console.log(`Is Testnet production: ${isTestnetProduction}\n`);

    // Test generating test accounts
    console.log('8. Testing test account generation...');
    const testAccounts = await networksManager.generateTestAccounts('Testnet', 2);
    console.log(`Generated ${testAccounts.length} test accounts:`);
    testAccounts.forEach((account, index) => {
      console.log(`  ${index + 1}. Address: ${account.address}`);
      console.log(`      Secret: ${account.secret}`);
      console.log(`      Balance: ${account.balance}\n`);
    });

    // Test requesting XRP from faucet
    console.log('9. Testing XRP faucet request...');
    if (testAccounts.length > 0) {
      await networksManager.requestXRPFromFaucet('Testnet', testAccounts[0].address);
      console.log('XRP requested from faucet\n');
    }

    // Test switching networks
    console.log('10. Testing network switching...');
    await networksManager.switchNetwork('Devnet');
    console.log('Switched to Devnet\n');

    // Test getting updated active network
    console.log('11. Testing updated active network retrieval...');
    const newActiveNetwork = networksManager.getActiveNetwork();
    console.log(`Active network: ${newActiveNetwork}\n`);

    // Test disconnecting from network
    console.log('12. Testing network disconnection...');
    await networksManager.disconnectFromNetwork('Devnet');
    console.log('Disconnected from Devnet\n');

    // Test getting updated network status
    console.log('13. Testing updated network status retrieval...');
    const devnetStatus = networksManager.getNetworkStatus('Devnet');
    console.log('Devnet status:', JSON.stringify(devnetStatus, null, 2));
    console.log();

    // Test getting network statistics
    console.log('14. Testing network statistics retrieval...');
    const stats = networksManager.getNetworkStatistics();
    console.log('Network statistics:', JSON.stringify(stats, null, 2));
    console.log();

    // Test adding a custom network
    console.log('15. Testing custom network addition...');
    networksManager.addNetwork({
      name: 'CustomNet',
      serverUrl: 'wss://custom.net:51233',
      description: 'A custom test network',
      isProduction: false
    });
    console.log('Custom network added\n');

    // Test getting updated network list
    console.log('16. Testing updated network list retrieval...');
    const updatedNetworks = networksManager.getAllNetworks();
    console.log(`Available networks: ${updatedNetworks.length}`);
    updatedNetworks.forEach(network => {
      console.log(`  - ${network.name}: ${network.description}`);
    });
    console.log();

    // Test removing a custom network
    console.log('17. Testing custom network removal...');
    networksManager.removeNetwork('CustomNet');
    console.log('Custom network removed\n');

    console.log('All parallel networks tests passed!');
  } catch (error) {
    console.error('Parallel networks test failed:', error);
  }
}

// Run the test
testParallelNetworks().catch(console.error);