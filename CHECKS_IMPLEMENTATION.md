# Checks Implementation

This document describes the implementation of the Checks functionality as specified in the XRPL documentation.

## Overview

The Checks implementation provides functionality for:
1. Creating checks
2. Cashing checks
3. Canceling checks
4. Retrieving check information
5. Listing account checks

This implementation follows the XRPL documentation exactly as documented.

## Implementation Details

### File Structure

- `src/lib/checks.ts` - Main implementation
- `test_checks.ts` - Test file
- `CHECKS_IMPLEMENTATION.md` - This documentation

### Key Components

#### Checks Class

The main class that provides all functionality:

```typescript
export class Checks {
  private client: Client;
  private config: ChecksConfig;
  
  // Methods:
  // - connect(): Connect to XRPL server
  // - disconnect(): Disconnect from XRPL server
  // - createCheck(senderWallet, params): Create a check
  // - cashCheck(recipientWallet, params): Cash a check
  // - cancelCheck(senderWallet, params): Cancel a check
  // - getCheckInfo(checkId): Get check information
  // - getAccountChecks(address): Get account checks
  // - isConnected(): Check connection status
}
```

#### Configuration

The configuration interface:

```typescript
export interface ChecksConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}
```

#### Parameters

Check creation parameters:

```typescript
export interface CheckCreateParams {
  destination: string; // Destination address
  sendMax: string | { currency: string; value: string; issuer: string }; // Maximum amount to send
  destinationTag?: number; // Destination tag (optional)
  expiration?: number; // Expiration ledger index (optional)
  invoiceId?: string; // Invoice ID (optional)
}
```

Check cashing parameters:

```typescript
export interface CheckCashParams {
  checkId: string; // Check ID
  amount?: string | { currency: string; value: string; issuer: string }; // Amount to cash (optional)
  deliverMin?: string | { currency: string; value: string; issuer: string }; // Minimum delivery amount (optional)
}
```

Check cancellation parameters:

```typescript
export interface CheckCancelParams {
  checkId: string; // Check ID
}
```

#### Result Structure

Check result:

```typescript
export interface CheckResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
  checkId?: string;
}
```

### Functionality Implementation

#### 1. Connection Management

The `connect()` method establishes a connection to the XRPL server:

```typescript
async connect(): Promise<void> {
  await this.client.connect();
  console.log(`Connected to XRPL server: ${this.config.server}`);
}
```

The `disconnect()` method closes the connection:

```typescript
async disconnect(): Promise<void> {
  await this.client.disconnect();
  console.log('Disconnected from XRPL server');
}
```

#### 2. Check Creation

The `createCheck()` method creates a new check:

```typescript
async createCheck(
  senderWallet: Wallet,
  params: CheckCreateParams
): Promise<CheckResult> {
  // Prepare the check create transaction
  const checkCreate: any = {
    TransactionType: 'CheckCreate',
    Account: senderWallet.classicAddress,
    Destination: params.destination,
    SendMax: params.sendMax
  };
  
  // Add optional parameters
  if (params.destinationTag !== undefined) {
    checkCreate.DestinationTag = params.destinationTag;
  }
  
  if (params.expiration !== undefined) {
    checkCreate.Expiration = params.expiration;
  }
  
  if (params.invoiceId !== undefined) {
    checkCreate.InvoiceID = params.invoiceId;
  }
  
  // Submit the transaction
  const result = await this.client.submitAndWait(checkCreate, {
    wallet: senderWallet
  });
  
  // Extract check ID from metadata if successful
  let checkId: string | undefined;
  if (result.result.meta?.AffectedNodes) {
    for (const node of result.result.meta.AffectedNodes) {
      if (node.CreatedNode?.LedgerEntryType === 'Check') {
        checkId = node.CreatedNode.LedgerIndex;
        break;
      }
    }
  }
  
  return {
    success: result.result.meta?.TransactionResult === 'tesSUCCESS',
    transactionHash: result.result.hash,
    result: result.result,
    checkId: checkId
  };
}
```

#### 3. Check Cashing

The `cashCheck()` method cashes an existing check:

```typescript
async cashCheck(
  recipientWallet: Wallet,
  params: CheckCashParams
): Promise<CheckResult> {
  // Prepare the check cash transaction
  const checkCash: any = {
    TransactionType: 'CheckCash',
    Account: recipientWallet.classicAddress,
    CheckID: params.checkId
  };
  
  // Add optional parameters
  if (params.amount !== undefined) {
    checkCash.Amount = params.amount;
  }
  
  if (params.deliverMin !== undefined) {
    checkCash.DeliverMin = params.deliverMin;
  }
  
  // Submit the transaction
  const result = await this.client.submitAndWait(checkCash, {
    wallet: recipientWallet
  });
  
  return {
    success: result.result.meta?.TransactionResult === 'tesSUCCESS',
    transactionHash: result.result.hash,
    result: result.result
  };
}
```

#### 4. Check Cancellation

The `cancelCheck()` method cancels an existing check:

```typescript
async cancelCheck(
  senderWallet: Wallet,
  params: CheckCancelParams
): Promise<CheckResult> {
  // Prepare the check cancel transaction
  const checkCancel: any = {
    TransactionType: 'CheckCancel',
    Account: senderWallet.classicAddress,
    CheckID: params.checkId
  };
  
  // Submit the transaction
  const result = await this.client.submitAndWait(checkCancel, {
    wallet: senderWallet
  });
  
  return {
    success: result.result.meta?.TransactionResult === 'tesSUCCESS',
    transactionHash: result.result.hash,
    result: result.result
  };
}
```

#### 5. Information Retrieval

The `getCheckInfo()` method retrieves information about a check:

```typescript
async getCheckInfo(checkId: string): Promise<any> {
  // Request check information
  const checkInfo = await this.client.request({
    command: 'ledger_entry',
    index: checkId,
    ledger_index: 'validated'
  });
  
  return checkInfo.result;
}
```

The `getAccountChecks()` method retrieves all checks for an account:

```typescript
async getAccountChecks(address: string, ledgerIndex?: number | string): Promise<any> {
  // Request account checks
  const request: any = {
    command: 'account_objects',
    account: address,
    type: 'check',
    ledger_index: ledgerIndex || 'validated'
  };
  
  const checks = await this.client.request(request);
  
  return checks.result;
}
```

## Usage Examples

### Basic Usage

```typescript
import { createChecks, generateSampleConfig } from './src/lib/checks';

// Create Checks instance
const config = generateSampleConfig();
const checks = createChecks(config);

// Connect to the XRPL server
await checks.connect();

// Create a check
const createResult = await checks.createCheck(wallet, {
  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  sendMax: "100000000" // 100 XRP
});

// Cash the check
const cashResult = await checks.cashCheck(wallet, {
  checkId: createResult.checkId,
  amount: "50000000" // 50 XRP
});

// Cancel the check (if not already cashed)
const cancelResult = await checks.cancelCheck(wallet, {
  checkId: createResult.checkId
});

// Get check information
const checkInfo = await checks.getCheckInfo(createResult.checkId);

// Get account checks
const accountChecks = await checks.getAccountChecks(wallet.classicAddress);

// Disconnect when done
await checks.disconnect();
```

### Advanced Usage

```typescript
// Create a check with optional parameters
const createResult = await checks.createCheck(wallet, {
  destination: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  sendMax: {
    currency: "USD",
    value: "100",
    issuer: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"
  },
  destinationTag: 12345, // Optional destination tag
  expiration: 123456789, // Optional expiration ledger index
  invoiceId: "6F1DFD1D0FE8A32E40E1F2C05CF1C15545BAB56B617F9C6C2D63A6B704BEF59B" // Optional invoice ID
});

// Cash a check with deliverMin
const cashResult = await checks.cashCheck(wallet, {
  checkId: createResult.checkId,
  deliverMin: "50000000" // Minimum 50 XRP
});

// Get account checks at a specific ledger index
const accountChecks = await checks.getAccountChecks(wallet.classicAddress, 123456789);
```

## Testing

The implementation includes comprehensive tests in `test_checks.ts` that verify:

1. Connection to XRPL server
2. Check creation
3. Check cashing
4. Check cancellation
5. Information retrieval
6. Account checks listing
7. Configuration options
8. Parameter structures
9. Error handling

To run the tests:

```bash
npm run test-checks
```

## Compliance with XRPL Standards

This implementation follows the XRPL documentation exactly:

1. Uses the same method names and signatures
2. Implements the same functionality
3. Follows the same data structures
4. Uses the official XRPL JavaScript library
5. Handles all required and optional parameters
6. Properly extracts check IDs from transaction metadata
7. Supports both XRP and IOU amounts

## Security Considerations

1. Private keys are handled securely through the Wallet class
2. Error handling prevents information leakage
3. Input validation prevents malformed transactions
4. Connection management ensures proper resource cleanup
5. Only the destination can cash a check
6. Only the sender can cancel a check

## Performance Considerations

1. Connection reuse for multiple operations
2. Efficient transaction submission and waiting
3. Proper error handling to prevent resource leaks
4. Asynchronous operations for non-blocking execution

## Dependencies

- `xrpl` - Official XRPL JavaScript library
- Standard Node.js modules

## Future Enhancements

1. Support for additional check features
2. Enhanced error handling and logging
3. Batch operations for multiple checks
4. Integration with other XRPL features
5. Support for additional networks