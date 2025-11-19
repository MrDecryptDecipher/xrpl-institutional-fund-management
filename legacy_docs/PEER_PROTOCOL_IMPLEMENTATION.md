# Peer Protocol Implementation for XRP Ledger

## Overview

This document describes the implementation of the XRP Ledger peer protocol. The peer protocol is the main mode of communication between servers in the XRP Ledger, handling all information about the behavior, progress, and connectivity of the XRP Ledger network.

## Features

### 1. Peer Discovery
The implementation includes a gossip protocol to help servers find others to connect to in the XRP Ledger network.

### 2. Peer-to-Peer Communication
Servers communicate using the XRPL/2.0 protocol over WebSocket connections.

### 3. Transaction Propagation
Candidate transactions are shared with the rest of the network through the peer protocol.

### 4. Ledger Data Exchange
Servers can request and provide historical ledger data.

### 5. Consensus Participation
Servers can propose transaction sets and share consensus outcomes.

### 6. Fixed Peers and Reservations
Support for fixed peer connections and peer reservations.

## Implementation Details

### PeerProtocolManager Class

The `PeerProtocolManager` class provides the main interface for managing peer-to-peer communications.

#### Constructor
```typescript
const peerManager = new PeerProtocolManager(config: PeerConfig);
```

#### Key Methods

1. **start()** - Start the peer protocol manager
2. **stop()** - Stop the peer protocol manager
3. **getPeers()** - Get information about all connected peers
4. **getPeerCount()** - Get the number of connected peers
5. **broadcastMessage()** - Broadcast a message to all peers
6. **addPeerReservation()** - Add a peer reservation
7. **removePeerReservation()** - Remove a peer reservation
8. **getTransactionCandidates()** - Get transaction candidates
9. **getNodePublicKey()** - Get node public key

### Configuration

The peer protocol configuration includes:
- Host and port for listening
- Maximum number of peers
- Fixed peers to connect to
- Peer reservations
- Node private key

### Message Types

The implementation handles several message types:
1. **handshake** - Initial connection handshake
2. **ledgerData** - Ledger data exchange
3. **transaction** - Transaction propagation
4. **consensus** - Consensus participation
5. **ping/pong** - Connection keepalive

### Usage Example

```typescript
import { createPeerProtocolManager, PeerConfig } from './src/lib/peer-protocol';

const config: PeerConfig = {
  host: 'localhost',
  port: 51235,
  maxPeers: 100,
  fixedPeers: [
    '192.168.1.10:51235',
    '192.168.1.11:51235'
  ]
};

const peerManager = createPeerProtocolManager(config);

peerManager.on('peerConnected', (peerInfo) => {
  console.log(`Peer connected: ${peerInfo.id}`);
});

await peerManager.start();
```

## Security Features

### Node Key Pair
Each server generates a node key pair to identify itself in peer protocol communications. This makes it possible to reliably identify and verify the integrity of messages from another server.

### Private Peers
Support for private peer configuration to keep server IP addresses hidden from the general public.

## Event Handling

The PeerProtocolManager extends EventEmitter and emits the following events:
- **peerConnected** - When a new peer connects
- **peerDisconnected** - When a peer disconnects
- **peerMessage** - When a message is received from a peer
- **transactionReceived** - When a transaction is received
- **handshakeCompleted** - When a handshake is completed
- **consensusMessage** - When a consensus message is received
- **ledgerData** - When ledger data is received
- **messageBroadcast** - When a message is broadcast

## Testing

A comprehensive test suite is included in `test_peer_protocol.ts` that validates all peer protocol functionality.# Peer Protocol Implementation for XRP Ledger

## Overview

This document describes the implementation of the XRP Ledger peer protocol. The peer protocol is the main mode of communication between servers in the XRP Ledger, handling all information about the behavior, progress, and connectivity of the XRP Ledger network.

## Features

### 1. Peer Discovery
The implementation includes a gossip protocol to help servers find others to connect to in the XRP Ledger network.

### 2. Peer-to-Peer Communication
Servers communicate using the XRPL/2.0 protocol over WebSocket connections.

### 3. Transaction Propagation
Candidate transactions are shared with the rest of the network through the peer protocol.

### 4. Ledger Data Exchange
Servers can request and provide historical ledger data.

### 5. Consensus Participation
Servers can propose transaction sets and share consensus outcomes.

### 6. Fixed Peers and Reservations
Support for fixed peer connections and peer reservations.

## Implementation Details

### PeerProtocolManager Class

The `PeerProtocolManager` class provides the main interface for managing peer-to-peer communications.

#### Constructor
```typescript
const peerManager = new PeerProtocolManager(config: PeerConfig);
```

#### Key Methods

1. **start()** - Start the peer protocol manager
2. **stop()** - Stop the peer protocol manager
3. **getPeers()** - Get information about all connected peers
4. **getPeerCount()** - Get the number of connected peers
5. **broadcastMessage()** - Broadcast a message to all peers
6. **addPeerReservation()** - Add a peer reservation
7. **removePeerReservation()** - Remove a peer reservation
8. **getTransactionCandidates()** - Get transaction candidates
9. **getNodePublicKey()** - Get node public key

### Configuration

The peer protocol configuration includes:
- Host and port for listening
- Maximum number of peers
- Fixed peers to connect to
- Peer reservations
- Node private key

### Message Types

The implementation handles several message types:
1. **handshake** - Initial connection handshake
2. **ledgerData** - Ledger data exchange
3. **transaction** - Transaction propagation
4. **consensus** - Consensus participation
5. **ping/pong** - Connection keepalive

### Usage Example

```typescript
import { createPeerProtocolManager, PeerConfig } from './src/lib/peer-protocol';

const config: PeerConfig = {
  host: 'localhost',
  port: 51235,
  maxPeers: 100,
  fixedPeers: [
    '192.168.1.10:51235',
    '192.168.1.11:51235'
  ]
};

const peerManager = createPeerProtocolManager(config);

peerManager.on('peerConnected', (peerInfo) => {
  console.log(`Peer connected: ${peerInfo.id}`);
});

await peerManager.start();
```

## Security Features

### Node Key Pair
Each server generates a node key pair to identify itself in peer protocol communications. This makes it possible to reliably identify and verify the integrity of messages from another server.

### Private Peers
Support for private peer configuration to keep server IP addresses hidden from the general public.

## Event Handling

The PeerProtocolManager extends EventEmitter and emits the following events:
- **peerConnected** - When a new peer connects
- **peerDisconnected** - When a peer disconnects
- **peerMessage** - When a message is received from a peer
- **transactionReceived** - When a transaction is received
- **handshakeCompleted** - When a handshake is completed
- **consensusMessage** - When a consensus message is received
- **ledgerData** - When ledger data is received
- **messageBroadcast** - When a message is broadcast

## Testing

A comprehensive test suite is included in `test_peer_protocol.ts` that validates all peer protocol functionality.