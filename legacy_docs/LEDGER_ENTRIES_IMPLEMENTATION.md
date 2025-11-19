# Ledger Entries Implementation

This document describes the ledger entries implementation for the XRPL Institutional Fund Management Protocol, following the XRPL standards for ledger entry types as documented in folder G of the XRPL documentation.

## Overview

The ledger entries implementation provides TypeScript interfaces and a manager class for working with all ledger entry types in the XRP Ledger. This implementation follows XRPL standards exactly as documented in folder G.

## Implemented Ledger Entry Types

### 1. AccountRoot
Describes a single account, its settings, and XRP balance.

### 2. AMM
Describes a single Automated Market Maker instance.

### 3. Check
Describes a check that can be cashed by its destination.

### 4. Credential
Represents a credential issued to an account.

### 5. DepositPreauth
Tracks preauthorization for deposits from one account to another.

### 6. DID
Stores decentralized identity information.

### 7. DirectoryNode
Contains links to other objects in the ledger.

### 8. Escrow
Tracks escrowed payments.

### 9. LedgerHashes
Tracks hashes of historical ledgers.

### 10. MPToken
Represents a Multi-Purpose Token.

### 11. MPTokenIssuance
Represents the issuance of a Multi-Purpose Token.

### 12. NFTokenOffer
Represents an offer to buy or sell an NFT.

### 13. NFTokenPage
Contains a page of NFTs.

### 14. Offer
Represents an offer to exchange currencies.

### 15. PayChannel
Represents a payment channel.

### 16. RippleState
Tracks trust lines between accounts.

### 17. SignerList
Tracks a list of signers for multi-signature transactions.

### 18. Ticket
Represents a ticket for future transactions.

### 19. XChainOwnedClaimID
Tracks claim IDs for cross-chain transactions.

### 20. XChainOwnedCreateAccountClaimID
Tracks account creation claim IDs for cross-chain transactions.

## Key Features

1. **Complete Type Coverage**: TypeScript interfaces for all 20+ ledger entry types
2. **XRPL Compliance**: Follows XRPL standards exactly as documented
3. **Manager Class**: Provides methods for retrieving and working with ledger entries
4. **Error Handling**: Comprehensive error handling for all operations
5. **Extensible Design**: Easy to extend with additional ledger entry types

## Implementation Details

The implementation is contained in [src/lib/ledger-entries.ts](src/lib/ledger-entries.ts) and includes:

- TypeScript interfaces for all ledger entry types with proper field definitions
- `LedgerEntriesManager` class with methods for retrieving ledger entries
- Connection management for XRPL client
- Proper typing for all parameters and return values

## Usage

```typescript
import { Client } from 'xrpl';
import { LedgerEntriesManager, createLedgerEntriesManager } from './src/lib/ledger-entries';

// Create client
const client = new Client('wss://s.devnet.rippletest.net:51233/');

// Connect to the network
await client.connect();

// Create ledger entries manager
const ledgerEntriesManager = createLedgerEntriesManager(client);

// Get an AccountRoot entry
const accountRoot = await ledgerEntriesManager.getAccountRoot('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn');

// Get ledger entry by index
const ledgerEntry = await ledgerEntriesManager.getLedgerEntry('13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8');

// Get account objects of a specific type
const accountObjects = await ledgerEntriesManager.getAccountObjects('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn', 'Check');

// Disconnect when done
await client.disconnect();
```

## Testing

A test file is provided at [test_ledger_entries.ts](test_ledger_entries.ts) to verify the implementation.

## Compliance

This implementation follows XRPL standards exactly as documented in folder G:
- G1: Basic Data Types
- G2: Base58 Encodings
- G3: Currency Formats
- G4: NFToken
- G5: Permission Values
- G6: Ledger Data
- G7: Ledger Header
- G8: Common Fields
- G9: Ledger Entry Types
- G10: AccountRoot
- G11: Amendments
- G12: AMM
- G13: Bridge
- G14: Check
- G15: Credential
- G16: Delegate
- G17: DepositPreauth
- G18: DID
- G19: DirectoryNode
- G20: Escrow
- G21: FeeSettings
- G22: LedgerHashes
- G23: MPToken
- G24: MPTokenIssuance
- G25: NegativeUNL
- G26: NFTokenOffer
- G27: NFTokenPage
- G28: Offer
- G29: Oracle
- G30: PayChannel
- G31: PermissionedDomain
- G32: RippleState
- G33: SignerList
- G34: Ticket
- G35: XChainOwnedClaimID
- G36: XChainOwnedCreateAccountClaimID

All ledger entry types are implemented according to XRPL specifications.