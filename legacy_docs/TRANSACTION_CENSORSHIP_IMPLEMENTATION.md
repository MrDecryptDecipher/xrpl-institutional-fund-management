# Transaction Censorship Detection Implementation for XRP Ledger

## Overview

This document describes the implementation of transaction censorship detection for the XRP Ledger. The implementation provides automated detection of potential transaction censorship by tracking transactions through the consensus process.

## Features

### 1. Transaction Tracking
Track transactions from initial consensus proposal through validation.

### 2. Warning System
Issue warning messages for transactions that remain unvalidated for extended periods.

### 3. Error Reporting
Issue final error messages for transactions that appear to be censored.

### 4. Alert Generation
Generate alerts that can be handled by callback functions.

### 5. Statistics
Provide detailed statistics about censorship detection.

## Implementation Details

### TransactionCensorshipDetector Class

The `TransactionCensorshipDetector` class provides the main interface for detecting potential transaction censorship.

#### Constructor
```typescript
const censorshipDetector = new TransactionCensorshipDetector(config?: CensorshipDetectionConfig);
```

#### Key Methods

1. **addTransactionToTrack()** - Add a transaction to track for censorship
2. **markTransactionIncluded()** - Mark a transaction as included in a validated ledger
3. **updateCurrentLedger()** - Update the current ledger index
4. **getTrackedTransactions()** - Get all tracked transactions
5. **getAlerts()** - Get all alerts
6. **clearAlerts()** - Clear alerts
7. **setAlertCallback()** - Set alert callback function
8. **getStatistics()** - Get statistics about censorship detection
9. **reset()** - Reset the detector

### Configuration

The censorship detection configuration includes:
- Maximum warnings before error (default: 5)
- Check interval in ledgers (default: 1)
- Alert threshold in ledgers (default: 15)

### Data Structures

#### TrackedTransaction
```typescript
interface TrackedTransaction {
  transactionHash: string;
  initialProposalLedger: number;
  firstWarningLedger?: number;
  warningCount: number;
  status: 'tracking' | 'warning' | 'error' | 'included' | 'expired';
  lastChecked: Date;
}
```

#### CensorshipAlert
```typescript
interface CensorshipAlert {
  transactionHash: string;
  alertType: 'warning' | 'error';
  message: string;
  ledgerRange: {
    start: number;
    end: number;
  };
  timestamp: Date;
}
```

### Detection Process

1. **Tracking** - Transactions are added to tracking when first proposed in consensus
2. **Monitoring** - Detector checks tracked transactions every ledger
3. **Warning** - First warning issued after 15 ledgers without inclusion
4. **Additional Warnings** - Subsequent warnings every 15 ledgers
5. **Error** - Final error after 5 warnings (75 ledgers)
6. **Removal** - Transactions removed when included or expired

### Usage Example

```typescript
import { createTransactionCensorshipDetector } from './src/lib/transaction-censorship';

const censorshipDetector = createTransactionCensorshipDetector({
  maxWarnings: 3,
  alertThreshold: 10
});

// Set up alert callback
censorshipDetector.setAlertCallback((alert) => {
  console.log(`CENSORSHIP ALERT: ${alert.message}`);
});

// Add transaction to track
censorshipDetector.addTransactionToTrack('TX123ABC', 1000);

// Update ledger index as network progresses
censorshipDetector.updateCurrentLedger(1020);
```

## Alert Messages

The implementation generates standard XRP Ledger censorship detection messages:

### Warning Message
```
LedgerConsensus:WRN Potential Censorship: Eligible tx E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7, which we are tracking since ledger 18851530 has not been included as of ledger 18851545.
```

### Error Message
```
LedgerConsensus:ERR Potential Censorship: Eligible tx E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7, which we are tracking since ledger 18851530 has not been included as of ledger 18851605. Additional warnings suppressed.
```

## False Positive Handling

The implementation is designed to minimize false positives:
- Transactions automatically removed when included in validated ledgers
- Expired transactions (older than 200 ledgers) automatically removed
- Configurable thresholds to adjust sensitivity

## Testing

A comprehensive test suite is included in `test_transaction_censorship.ts` that validates all censorship detection functionality.

## Integration

The implementation can be integrated with rippled servers to:
- Monitor consensus proposals
- Track transaction validation
- Generate alerts for potential censorship
- Provide statistics for network health monitoring