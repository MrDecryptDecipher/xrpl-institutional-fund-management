# Ledger History Implementation for XRP Ledger

## Overview

This document describes the implementation of ledger history management for XRP Ledger servers. The implementation provides functionality for managing and querying ledger history in rippled servers.

## Features

### 1. Ledger Range Management
Track and query the range of available ledger history on a server.

### 2. Ledger Information Retrieval
Retrieve detailed information about specific ledgers.

### 3. Transaction History
Access historical transaction data with metadata.

### 4. Backfilling
Support for backfilling missing ledger history.

### 5. Full History Configuration
Configure servers for full history retention.

### 6. Online Deletion
Manage online deletion settings for ledger data.

## Implementation Details

### LedgerHistoryManager Class

The `LedgerHistoryManager` class provides the main interface for managing ledger history.

#### Constructor
```typescript
const ledgerHistoryManager = new LedgerHistoryManager(rippledManager, config?: LedgerHistoryConfig);
```

#### Key Methods

1. **getLedgerRange()** - Get the available ledger range
2. **getLedger()** - Get ledger information
3. **getTransaction()** - Get transaction information
4. **getLedgerTransactions()** - Get transactions for a specific ledger
5. **backfillHistory()** - Backfill ledger history
6. **configureFullHistory()** - Configure full history mode
7. **configureOnlineDeletion()** - Configure online deletion
8. **getHistoryStats()** - Get ledger history statistics
9. **clearCache()** - Clear all cached data
10. **hasFullHistory()** - Check if server has full history

### Configuration

The ledger history configuration includes:
- Maximum ledgers to keep in cache
- Full history mode flag
- Backfill history flag
- Online deletion flag

### Data Structures

#### LedgerRange
```typescript
interface LedgerRange {
  minLedger: number;
  maxLedger: number;
  completeLedgers: string;
}
```

#### LedgerInfo
```typescript
interface LedgerInfo {
  ledgerIndex: number;
  ledgerHash: string;
  parentHash: string;
  transactionCount: number;
  closeTime: Date;
  totalCoins: string;
}
```

#### HistoricalTransaction
```typescript
interface HistoricalTransaction {
  transactionHash: string;
  ledgerIndex: number;
  transaction: any;
  meta: any;
}
```

### Usage Example

```typescript
import { createLedgerHistoryManager } from './src/lib/ledger-history';
import { createRippledManager } from './src/lib/rippled-manager';

const rippledManager = createRippledManager();
const ledgerHistoryManager = createLedgerHistoryManager(rippledManager);

// Get ledger range
const ledgerRange = await ledgerHistoryManager.getLedgerRange();
console.log(`Available ledgers: ${ledgerRange.completeLedgers}`);

// Get specific ledger
const ledgerInfo = await ledgerHistoryManager.getLedger(12345);
console.log(`Ledger hash: ${ledgerInfo?.ledgerHash}`);

// Get transaction
const transaction = await ledgerHistoryManager.getTransaction('TX123ABC');
console.log(`Transaction type: ${transaction?.transaction.TransactionType}`);
```

## Caching

The implementation includes intelligent caching to improve performance:
- Ledgers are cached locally for quick access
- Transactions are cached to avoid repeated queries
- Automatic cache cleanup when limits are exceeded

## Backfilling

The implementation supports backfilling of ledger history:
- Configurable backfilling enabled/disabled
- Progress tracking during backfill operations
- Rate limiting to avoid overwhelming servers

## Full History Support

Servers can be configured for full history retention:
- Complete XRP Ledger history collection
- No online deletion of historical data
- Optimized for archival purposes

## Testing

A comprehensive test suite is included in `test_ledger_history.ts` that validates all ledger history functionality.

## Integration with rippled

The implementation integrates with rippled servers through:
- `ledger` RPC command for ledger data
- `tx` RPC command for transaction data
- Server info queries for ledger range information