# Xaman Wallet Integration

## Overview
This document describes the integration of Xaman wallet (formerly XUMM) with the XRPL Institutional Fund Management Protocol for transaction signing.

## Components

### XamanTransactionSigner
The `XamanTransactionSigner` component handles the creation of Xumm payloads and provides a QR code interface for users to sign transactions with their Xaman wallet.

Key features:
- Creates transaction payloads via Xumm SDK
- Displays QR code for wallet scanning
- Polls for transaction status updates
- Provides callback mechanisms for parent components

### Integration with TransactionExecutor
The `TransactionExecutor` component integrates with `XamanTransactionSigner` to:
- Prepare transaction data
- Display QR code when ready
- Handle transaction outcomes (success/error/cancelled)
- Update UI based on transaction status

## Implementation Details

### State Management
```typescript
// In TransactionExecutor.tsx
const [isWaitingForSignature, setIsWaitingForSignature] = useState<boolean>(false);
const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

// QR code callback
const handleQrCodeReady = (qrCodeUrl: string) => {
  setQrCodeUrl(qrCodeUrl);
  setIsWaitingForSignature(true);
};
```

### Transaction Flow
1. User selects transaction type and inputs parameters
2. User clicks "Execute Transaction" button
3. `XamanTransactionSigner` creates payload and generates QR code
4. User scans QR code with Xaman wallet
5. User approves or rejects transaction in wallet
6. Application receives status update and displays result

## Error Handling
- Connection failures are caught and displayed to the user
- Transaction rejections are handled gracefully
- Timeout mechanisms prevent indefinite waiting

## Security Considerations
- No sensitive data is stored in the application
- All signing occurs in the user's wallet
- Transaction details are verified by the user before signing