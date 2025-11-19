/**
 * Test file for peer protocol implementation
 */

import { createPeerProtocolManager, PeerConfig, PeerReservation } from './src/lib/peer-protocol';

async function runPeerProtocolTest() {
  console.log('Testing Peer Protocol Implementation...\n');

  // Create peer protocol configuration
  const peerConfig: PeerConfig = {
    host: 'localhost',
    port: 51736,
    maxPeers: 100,
    fixedPeers: [
      '192.168.1.10:51235',
      '192.168.1.11:51235'
    ],
    peerReservations: [
      {
        nodePublicKey: 'n9M6C5FnX5DvAfDnY4NjK8u8XqCt6fG5n9M6C5FnX5DvAfDnY4NjK8u8XqCt',
        description: 'Trusted validator node'
      }
    ]
  };

  // Create peer protocol manager
  const peerManager = createPeerProtocolManager(peerConfig);

  try {
    // Set up event listeners
    peerManager.on('peerConnected', (peerInfo) => {
      console.log(`Peer connected: ${peerInfo.id} (${peerInfo.address}:${peerInfo.port})`);
    });

    peerManager.on('peerDisconnected', (peerId) => {
      console.log(`Peer disconnected: ${peerId}`);
    });

    peerManager.on('transactionReceived', (transactionCandidate) => {
      console.log(`Transaction received from peer ${transactionCandidate.sourcePeer}`);
    });

    peerManager.on('handshakeCompleted', (peerInfo) => {
      console.log(`Handshake completed with peer ${peerInfo.id}`);
    });

    // Test starting the peer protocol manager
    console.log('1. Testing peer protocol manager startup...');
    await peerManager.start();
    console.log('Peer protocol manager started successfully\n');

    // Test getting node public key
    console.log('2. Testing node public key retrieval...');
    const publicKey = peerManager.getNodePublicKey();
    console.log(`Node public key: ${publicKey}\n`);

    // Test getting peer count
    console.log('3. Testing peer count retrieval...');
    const peerCount = peerManager.getPeerCount();
    console.log(`Connected peers: ${peerCount}\n`);

    // Test getting peers
    console.log('4. Testing peer list retrieval...');
    const peers = peerManager.getPeers();
    console.log(`Peers: ${JSON.stringify(peers, null, 2)}\n`);

    // Test broadcasting a message
    console.log('5. Testing message broadcasting...');
    const broadcastMessage = {
      type: 'ledgerData',
      data: {
        ledgerIndex: 12345,
        ledgerHash: 'ABC123DEF456'
      }
    };
    peerManager.broadcastMessage(broadcastMessage);
    console.log('Message broadcast\n');

    // Test adding a peer reservation
    console.log('6. Testing adding peer reservation...');
    const newReservation: PeerReservation = {
      nodePublicKey: 'n9L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgtu5L81uNCaPgt',
      description: 'New trusted node'
    };
    peerManager.addPeerReservation(newReservation);
    console.log('Peer reservation added\n');

    // Test removing a peer reservation
    console.log('7. Testing removing peer reservation...');
    peerManager.removePeerReservation('n9M6C5FnX5DvAfDnY4NjK8u8XqCt6fG5n9M6C5FnX5DvAfDnY4NjK8u8XqCt');
    console.log('Peer reservation removed\n');

    // Test getting transaction candidates
    console.log('8. Testing transaction candidates retrieval...');
    const transactionCandidates = peerManager.getTransactionCandidates();
    console.log(`Transaction candidates: ${transactionCandidates.size}\n`);

    // Test getting peer protocol statistics
    console.log('9. Testing peer protocol statistics...');
    console.log(`Peer count: ${peerManager.getPeerCount()}`);
    console.log(`Transaction candidates: ${peerManager.getTransactionCandidates().size}`);
    console.log();

    console.log('All peer protocol tests passed!');
  } catch (error) {
    console.error('Peer protocol test failed:', error);
  } finally {
    // Test stopping the peer protocol manager
    console.log('10. Testing peer protocol manager shutdown...');
    try {
      await peerManager.stop();
      console.log('Peer protocol manager stopped successfully\n');
    } catch (error) {
      console.error('Failed to stop peer protocol manager:', error);
    }
  }
}

// Run the test
runPeerProtocolTest().catch(console.error);