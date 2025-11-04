# Bridge Implementation

This document describes the cross-chain bridge implementation for the XRPL Institutional Fund Management Protocol, following the XRPL standards for XChain transactions as documented in folder F of the XRPL documentation.

## Overview

The bridge implementation enables cross-chain operations between XRPL networks, supporting both XRP-XRP and IOU-IOU bridges. It implements all the necessary XChain transaction types according to XRPL standards.

## Implemented Transaction Types

### 1. XChainCreateBridge
Creates a bridge between two XRPL chains (locking and issuing chains).

### 2. XChainAccountCreateCommit
Commits to creating an account on the destination chain.

### 3. XChainCreateClaimID
Creates a claim ID for cross-chain transfers.

### 4. XChainCommit
Commits funds for cross-chain transfer.

### 5. XChainAddAccountCreateAttestation
Adds an attestation for account creation.

### 6. XChainAddClaimAttestation
Adds an attestation for fund claims.

### 7. SignerListSet
Sets up signer lists for multi-signature operations.

### 8. AccountSet
Configures account settings including disabling master keys.

## Key Features

1. **Dual Chain Support**: Connects to both locking and issuing chains simultaneously
2. **XRP-XRP Bridge**: Supports XRP transfers between chains
3. **IOU-IOU Bridge**: Supports token transfers between chains
4. **Witness Attestation**: Handles witness server attestations for cross-chain operations
5. **Security Features**: Implements proper account security with master key disabling
6. **Error Handling**: Comprehensive error handling for all operations

## Implementation Details

The implementation is contained in [src/lib/bridge.ts](src/lib/bridge.ts) and includes:

- `Bridge` class with methods for all XChain operations
- Proper TypeScript typing for all parameters and return values
- Connection management for both chains
- Transaction submission and result handling
- Metadata extraction for claim IDs and other information

## Usage

```typescript
import { Bridge } from './src/lib/bridge';
import { Wallet } from 'xrpl';

// Configure the bridge
const config = {
  lockingChainUrl: 'wss://s.devnet.rippletest.net:51233/',
  issuingChainUrl: 'wss://sidechain-net2.devnet.rippletest.net:51233/',
  lockingChainDoor: 'rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ',
  issuingChainDoor: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  lockingChainIssue: {
    currency: 'XRP'
  },
  issuingChainIssue: {
    currency: 'XRP'
  }
};

// Create bridge instance
const bridge = new Bridge(config);

// Connect to both chains
await bridge.connect();

// Perform bridge operations...

// Disconnect when done
await bridge.disconnect();
```

## Testing

A test file is provided at [test_bridge.ts](test_bridge.ts) to verify the implementation.

## Compliance

This implementation follows XRPL standards exactly as documented in:
- F1: Set Up an XRP-XRP Bridge
- F2: Set Up an IOU-IOU Bridge
- F3: Submit Cross-chain Transactions
- F4: Test Pre-Release Transaction Types

All XChain transaction types are implemented according to XRPL specifications.# Bridge Implementation

This document describes the cross-chain bridge implementation for the XRPL Institutional Fund Management Protocol, following the XRPL standards for XChain transactions as documented in folder F of the XRPL documentation.

## Overview

The bridge implementation enables cross-chain operations between XRPL networks, supporting both XRP-XRP and IOU-IOU bridges. It implements all the necessary XChain transaction types according to XRPL standards.

## Implemented Transaction Types

### 1. XChainCreateBridge
Creates a bridge between two XRPL chains (locking and issuing chains).

### 2. XChainAccountCreateCommit
Commits to creating an account on the destination chain.

### 3. XChainCreateClaimID
Creates a claim ID for cross-chain transfers.

### 4. XChainCommit
Commits funds for cross-chain transfer.

### 5. XChainAddAccountCreateAttestation
Adds an attestation for account creation.

### 6. XChainAddClaimAttestation
Adds an attestation for fund claims.

### 7. SignerListSet
Sets up signer lists for multi-signature operations.

### 8. AccountSet
Configures account settings including disabling master keys.

## Key Features

1. **Dual Chain Support**: Connects to both locking and issuing chains simultaneously
2. **XRP-XRP Bridge**: Supports XRP transfers between chains
3. **IOU-IOU Bridge**: Supports token transfers between chains
4. **Witness Attestation**: Handles witness server attestations for cross-chain operations
5. **Security Features**: Implements proper account security with master key disabling
6. **Error Handling**: Comprehensive error handling for all operations

## Implementation Details

The implementation is contained in [src/lib/bridge.ts](src/lib/bridge.ts) and includes:

- `Bridge` class with methods for all XChain operations
- Proper TypeScript typing for all parameters and return values
- Connection management for both chains
- Transaction submission and result handling
- Metadata extraction for claim IDs and other information

## Usage

```typescript
import { Bridge } from './src/lib/bridge';
import { Wallet } from 'xrpl';

// Configure the bridge
const config = {
  lockingChainUrl: 'wss://s.devnet.rippletest.net:51233/',
  issuingChainUrl: 'wss://sidechain-net2.devnet.rippletest.net:51233/',
  lockingChainDoor: 'rnQAXXWoFNN6PEqwqsdTngCtFPCrmfuqFJ',
  issuingChainDoor: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  lockingChainIssue: {
    currency: 'XRP'
  },
  issuingChainIssue: {
    currency: 'XRP'
  }
};

// Create bridge instance
const bridge = new Bridge(config);

// Connect to both chains
await bridge.connect();

// Perform bridge operations...

// Disconnect when done
await bridge.disconnect();
```

## Testing

A test file is provided at [test_bridge.ts](test_bridge.ts) to verify the implementation.

## Compliance

This implementation follows XRPL standards exactly as documented in:
- F1: Set Up an XRP-XRP Bridge
- F2: Set Up an IOU-IOU Bridge
- F3: Submit Cross-chain Transactions
- F4: Test Pre-Release Transaction Types

All XChain transaction types are implemented according to XRPL specifications.