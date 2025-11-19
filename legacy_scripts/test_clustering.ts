/**
 * Test file for clustering implementation
 */

import { createClusterManager, ClusterConfig, ClusterServer } from './src/lib/clustering';

// Create cluster configuration
const clusterConfig: ClusterConfig = {
  servers: [
    {
      id: 'server1',
      host: '192.168.1.10',
      port: 51235,
      publicKey: 'n9M6C5FnX5DvAfDnY4NjK8u8XqCt6fG5n9M6C5FnX5DvAfDnY4NjK8u8XqCt',
      isValidator: true
    },
    {
      id: 'server2',
      host: '192.168.1.11',
      port: 51235,
      publicKey: 'n9L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgt',
      isValidator: false
    },
    {
      id: 'server3',
      host: '192.168.1.12',
      port: 51235,
      publicKey: 'n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7n949f75e',
      isValidator: true
    }
  ],
  sharedSecret: 'cluster_secret_12345'
};

// Create cluster manager
const clusterManager = createClusterManager(clusterConfig);

async function runClusteringTest() {
  console.log('Testing Clustering Implementation...\n');

  try {
    // Test generating cluster configuration
    console.log('1. Testing cluster configuration generation...');
    const config = clusterManager.generateClusterConfig();
    console.log('Generated cluster configuration:');
    console.log(config);
    console.log();

    // Test connecting to cluster
    console.log('2. Testing cluster connection...');
    await clusterManager.connect();
    console.log('Cluster connected successfully\n');

    // Test getting cluster info
    console.log('3. Testing cluster info retrieval...');
    const clusterInfo = await clusterManager.getClusterInfo();
    console.log('Cluster info:', JSON.stringify(clusterInfo, null, 2));
    console.log();

    // Test sharing cryptographic work
    console.log('4. Testing cryptographic work sharing...');
    await clusterManager.shareCryptographicWork('work_12345');
    console.log('Cryptographic work shared\n');

    // Test sharing misbehaving peer info
    console.log('5. Testing misbehaving peer info sharing...');
    await clusterManager.shareMisbehavingPeerInfo('peer_bad_123');
    console.log('Misbehaving peer info shared\n');

    // Test relaying transaction
    console.log('6. Testing transaction relaying...');
    const mockTransaction = {
      TransactionType: 'Payment',
      Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
      Destination: 'r4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
      Amount: '1000000'
    };
    await clusterManager.relayTransaction(mockTransaction);
    console.log('Transaction relayed\n');

    // Test adding a server
    console.log('7. Testing adding a server...');
    const newServer: ClusterServer = {
      id: 'server4',
      host: '192.168.1.13',
      port: 51235,
      publicKey: 'n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUjn9MD5h24'
    };
    await clusterManager.addServer(newServer);
    console.log('Server added\n');

    // Test removing a server
    console.log('8. Testing removing a server...');
    await clusterManager.removeServer('server2');
    console.log('Server removed\n');

    // Get updated cluster info
    console.log('9. Testing updated cluster info...');
    const updatedClusterInfo = await clusterManager.getClusterInfo();
    console.log('Updated cluster info:', JSON.stringify(updatedClusterInfo, null, 2));
    console.log();

    console.log('All clustering tests passed!');
  } catch (error) {
    console.error('Clustering test failed:', error);
  }
}

// Run the test
runClusteringTest().catch(console.error);
