# Clustering Implementation for rippled Servers

## Overview

This document describes the implementation of clustering functionality for rippled servers. The clustering implementation allows multiple rippled servers to work together efficiently within the same data center to maximize efficiency among mutually trusted servers.

## Features

### 1. Shared Cryptographic Work
Clustered servers share the work of cryptography. If one server has verified the authenticity of a message, the other servers in the cluster trust it and do not re-verify.

### 2. Misbehaving Peer Information Sharing
Clustered servers share information about peers and API clients that are misbehaving or abusing the network. This makes it harder to attack all servers of the cluster at once.

### 3. Transaction Relaying
Clustered servers always propagate transactions throughout the cluster, even if the transaction does not meet the current load-based transaction fee on some of them.

## Implementation Details

### ClusterManager Class

The `ClusterManager` class provides the main interface for managing a cluster of rippled servers.

#### Constructor
```typescript
const clusterManager = new ClusterManager(config: ClusterConfig);
```

#### Key Methods

1. **connect()** - Connect all servers in the cluster
2. **disconnect()** - Disconnect all servers in the cluster
3. **getClusterInfo()** - Get information about the cluster
4. **shareCryptographicWork()** - Share cryptographic work among cluster members
5. **shareMisbehavingPeerInfo()** - Share information about misbehaving peers
6. **relayTransaction()** - Relay transaction throughout the cluster
7. **generateClusterConfig()** - Generate cluster configuration
8. **addServer()** - Add a server to the cluster
9. **removeServer()** - Remove a server from the cluster

### Configuration

The cluster configuration includes:
- Server details (ID, host, port, public key, validator status)
- Shared secret for cluster authentication

### Usage Example

```typescript
import { createClusterManager, ClusterConfig } from './src/lib/clustering';

const config: ClusterConfig = {
  servers: [
    {
      id: 'server1',
      host: '192.168.1.10',
      port: 51235,
      publicKey: 'n9M6C5FnX5DvAfDnY4NjK8u8XqCt6fG5n9M6C5FnX5DvAfDnY4NjK8u8XqCt',
      isValidator: true
    },
    // ... more servers
  ],
  sharedSecret: 'cluster_secret_12345'
};

const clusterManager = createClusterManager(config);
await clusterManager.connect();
```

## Benefits

1. **Efficiency** - Reduced cryptographic work through sharing
2. **Security** - Better detection and handling of misbehaving peers
3. **Reliability** - Improved transaction propagation
4. **Scalability** - Easy addition and removal of cluster members

## Validator Proxies

If you are running a validator as a private peer, it's recommended to run a cluster of servers as proxies, since a cluster is more resilient to failure than individual servers.

## Testing

A comprehensive test suite is included in `test_clustering.ts` that validates all clustering functionality.# Clustering Implementation for rippled Servers

## Overview

This document describes the implementation of clustering functionality for rippled servers. The clustering implementation allows multiple rippled servers to work together efficiently within the same data center to maximize efficiency among mutually trusted servers.

## Features

### 1. Shared Cryptographic Work
Clustered servers share the work of cryptography. If one server has verified the authenticity of a message, the other servers in the cluster trust it and do not re-verify.

### 2. Misbehaving Peer Information Sharing
Clustered servers share information about peers and API clients that are misbehaving or abusing the network. This makes it harder to attack all servers of the cluster at once.

### 3. Transaction Relaying
Clustered servers always propagate transactions throughout the cluster, even if the transaction does not meet the current load-based transaction fee on some of them.

## Implementation Details

### ClusterManager Class

The `ClusterManager` class provides the main interface for managing a cluster of rippled servers.

#### Constructor
```typescript
const clusterManager = new ClusterManager(config: ClusterConfig);
```

#### Key Methods

1. **connect()** - Connect all servers in the cluster
2. **disconnect()** - Disconnect all servers in the cluster
3. **getClusterInfo()** - Get information about the cluster
4. **shareCryptographicWork()** - Share cryptographic work among cluster members
5. **shareMisbehavingPeerInfo()** - Share information about misbehaving peers
6. **relayTransaction()** - Relay transaction throughout the cluster
7. **generateClusterConfig()** - Generate cluster configuration
8. **addServer()** - Add a server to the cluster
9. **removeServer()** - Remove a server from the cluster

### Configuration

The cluster configuration includes:
- Server details (ID, host, port, public key, validator status)
- Shared secret for cluster authentication

### Usage Example

```typescript
import { createClusterManager, ClusterConfig } from './src/lib/clustering';

const config: ClusterConfig = {
  servers: [
    {
      id: 'server1',
      host: '192.168.1.10',
      port: 51235,
      publicKey: 'n9M6C5FnX5DvAfDnY4NjK8u8XqCt6fG5n9M6C5FnX5DvAfDnY4NjK8u8XqCt',
      isValidator: true
    },
    // ... more servers
  ],
  sharedSecret: 'cluster_secret_12345'
};

const clusterManager = createClusterManager(config);
await clusterManager.connect();
```

## Benefits

1. **Efficiency** - Reduced cryptographic work through sharing
2. **Security** - Better detection and handling of misbehaving peers
3. **Reliability** - Improved transaction propagation
4. **Scalability** - Easy addition and removal of cluster members

## Validator Proxies

If you are running a validator as a private peer, it's recommended to run a cluster of servers as proxies, since a cluster is more resilient to failure than individual servers.

## Testing

A comprehensive test suite is included in `test_clustering.ts` that validates all clustering functionality.