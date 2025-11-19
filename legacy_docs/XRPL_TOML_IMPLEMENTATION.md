# XRPL xrp-ledger.toml Implementation

## Overview

This document describes the implementation of xrp-ledger.toml functionality in the XRPL Institutional Fund Management Protocol. The implementation provides tools for parsing, validating, and verifying domain ownership claims made through xrp-ledger.toml files as specified in the XRPL documentation.

## Features Implemented

1. **TOML Parsing**: Parse xrp-ledger.toml files according to XRPL specifications
2. **Domain Verification**: Verify that domains claim ownership of validators and accounts
3. **Structure Validation**: Validate the structure of xrp-ledger.toml files
4. **Sample Generation**: Generate sample xrp-ledger.toml content for reference

## Implementation Details

### File Structure

The implementation is located in `src/lib/xrpl-toml.ts` and includes:

- `fetchXRPLToml(domain: string)`: Fetch and parse an xrp-ledger.toml file from a domain
- `verifyValidatorDomain(domain: string, validatorPublicKey: string)`: Verify that a validator is claimed by a domain
- `verifyAccountDomain(domain: string, accountAddress: string)`: Verify that an account is claimed by a domain
- `validateXRPLTomlStructure(tomlData: XRPLTomlData)`: Validate the structure of an xrp-ledger.toml file
- `generateSampleXRPLToml()`: Generate a sample xrp-ledger.toml content

### Supported Sections

The implementation supports all sections defined in the XRPL xrp-ledger.toml specification:

1. **METADATA**: File metadata including modification and expiration dates
2. **VALIDATORS**: Validator information including public keys and attestations
3. **ACCOUNTS**: Account information including addresses and descriptions
4. **PRINCIPALS**: Contact information for principals
5. **SERVERS**: Server information including RPC and WebSocket endpoints
6. **CURRENCIES**: Currency information including codes and issuers

### Domain Verification Process

The domain verification process implements the two-way link verification as specified in the XRPL documentation:

1. **Domain Claims Ownership**: The domain serves an xrp-ledger.toml file that lists the validator public key or account address
2. **Validator/Account Claims Ownership**: The validator or account has its Domain field set to match the domain

Our implementation focuses on the first part of this process, verifying that a domain claims ownership of a validator or account by checking the xrp-ledger.toml file.

## Usage Examples

### Fetching and Parsing TOML

```typescript
import { fetchXRPLToml } from './src/lib/xrpl-toml';

const tomlData = await fetchXRPLToml('ripple.com');
console.log(tomlData.VALIDATORS);
```

### Verifying Validator Domain

```typescript
import { verifyValidatorDomain } from './src/lib/xrpl-toml';

const isClaimed = await verifyValidatorDomain('ripple.com', 'n9KJb7NMxGy5WF4xBb8G25ME5f4M2Urcz7AfVv463ZCTzf6jvsHP');
console.log(`Validator claimed by domain: ${isClaimed}`);
```

### Verifying Account Domain

```typescript
import { verifyAccountDomain } from './src/lib/xrpl-toml';

const isClaimed = await verifyAccountDomain('ripple.com', 'r9NpyVfLfUG8hatuCCHKzosyDtKnBdsEN3');
console.log(`Account claimed by domain: ${isClaimed}`);
```

## Testing

The implementation includes comprehensive tests in:

1. `test_xrpl_toml.ts`: Basic functionality tests
2. `test_domain_verification.ts`: Domain verification tests using real data

## Dependencies

The implementation uses the following npm packages:

- `toml`: For parsing TOML files
- `axios`: For HTTP requests

## XRPL Documentation Compliance

This implementation follows the specifications detailed in:
- Section AC: xrp-ledger.toml File
- Section AG5: Domain Verifier

The implementation correctly handles all required fields and follows the RFC specifications for:
- File serving location: `https://{DOMAIN}/.well-known/xrp-ledger.toml`
- Content-Type: `application/toml` or `text/plain`
- CORS headers: `Access-Control-Allow-Origin: *`
- File structure and formatting according to TOML specification

## Future Enhancements

Possible future enhancements include:
1. Implementing the validator-side of domain verification (checking that accounts have the correct Domain field)
2. Adding support for internationalized domain names (Punycode)
3. Implementing caching for fetched TOML files
4. Adding more comprehensive validation for field values (e.g., validating public key formats)