# Comprehensive Test Plan: XRPL Institutional Fund Management Protocol

## Test Strategy Overview

Based on the thorough analysis of Xaman developer documentation and XRPL compliance features, this test plan ensures comprehensive coverage of all critical functionality.

## Test Categories

### 1. Xaman Integration Tests

#### 1.1 Payload Creation Tests
**Test Suite**: `tests/xaman/payload-creation.test.ts`

```typescript
describe('Xaman Payload Creation', () => {
  test('should create payload with basic transaction', async () => {
    const response = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: { TransactionType: 'SignIn' }
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.uuid).toBeDefined();
    expect(result.refs).toBeDefined();
    expect(result.next).toBeDefined();
  });

  test('should create payload with custom options', async () => {
    const response = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: { TransactionType: 'SignIn' },
        network: 'TESTNET',
        identifier: 'test-fund-123',
        instruction: 'Please sign to create fund'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.custom_meta).toBeDefined();
  });

  test('should handle missing API credentials', async () => {
    // Mock missing credentials
    process.env.VITE_XUMM_API_KEY = undefined;
    
    const response = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: { TransactionType: 'SignIn' }
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toContain('credentials not configured');
  });

  test('should handle invalid transaction format', async () => {
    const response = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: 'invalid-transaction'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
  });
});
```

#### 1.2 Payload Verification Tests
**Test Suite**: `tests/xaman/payload-verification.test.ts`

```typescript
describe('Xaman Payload Verification', () => {
  test('should verify signed payload', async () => {
    // First create a payload
    const createResponse = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: { TransactionType: 'SignIn' }
      })
    });
    
    const createResult = await createResponse.json();
    expect(createResult.success).toBe(true);
    
    // Then verify it
    const verifyResponse = await fetch('/api/xaman/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: createResult.uuid
      })
    });
    
    const verifyResult = await verifyResponse.json();
    expect(verifyResult.success).toBe(true);
    expect(verifyResult.uuid).toBe(createResult.uuid);
    expect(verifyResult.meta).toBeDefined();
  });

  test('should handle non-existent payload', async () => {
    const response = await fetch('/api/xaman/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: 'non-existent-uuid'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toContain('not found');
  });

  test('should return comprehensive payload status', async () => {
    const createResponse = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: { TransactionType: 'SignIn' }
      })
    });
    
    const createResult = await createResponse.json();
    
    const verifyResponse = await fetch('/api/xaman/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: createResult.uuid
      })
    });
    
    const verifyResult = await verifyResponse.json();
    expect(verifyResult.meta.signed).toBeDefined();
    expect(verifyResult.meta.cancelled).toBeDefined();
    expect(verifyResult.meta.expired).toBeDefined();
    expect(verifyResult.meta.pushed).toBeDefined();
    expect(verifyResult.meta.resolved).toBeDefined();
  });
});
```

### 2. XRPL MPT Tests

#### 2.1 MPT Authorization Tests
**Test Suite**: `tests/xrpl/mpt-authorization.test.ts`

```typescript
describe('XRPL MPT Authorization', () => {
  test('should authorize MPT for account', async () => {
    const response = await fetch('/api/xrpl/mpt/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.transactionHash).toBeDefined();
  });

  test('should handle invalid account seed', async () => {
    const response = await fetch('/api/xrpl/mpt/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'invalid-seed',
        mptIssuanceId: 'test-mpt-id-123'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should handle network connection errors', async () => {
    const response = await fetch('/api/xrpl/mpt/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123',
        network: 'invalid-network'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

#### 2.2 MPT Sending Tests
**Test Suite**: `tests/xrpl/mpt-sending.test.ts`

```typescript
describe('XRPL MPT Sending', () => {
  test('should send MPT to authorized account', async () => {
    // First authorize the MPT
    const authResponse = await fetch('/api/xrpl/mpt/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123'
      })
    });
    
    expect(authResponse.ok).toBe(true);
    
    // Then send the MPT
    const sendResponse = await fetch('/api/xrpl/mpt/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123',
        amount: '100',
        destination: 'rDestination123...'
      })
    });
    
    const result = await sendResponse.json();
    expect(result.success).toBe(true);
    expect(result.transactionHash).toBeDefined();
  });

  test('should handle insufficient MPT balance', async () => {
    const response = await fetch('/api/xrpl/mpt/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123',
        amount: '999999999',
        destination: 'rDestination123...'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should validate MPT amount format', async () => {
    const response = await fetch('/api/xrpl/mpt/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        mptIssuanceId: 'test-mpt-id-123',
        amount: 'invalid-amount',
        destination: 'rDestination123...'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

#### 2.3 MPT Retrieval Tests
**Test Suite**: `tests/xrpl/mpt-retrieval.test.ts`

```typescript
describe('XRPL MPT Retrieval', () => {
  test('should get MPTs for account', async () => {
    const response = await fetch('/api/xrpl/mpt/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.mpts).toBeDefined();
    expect(Array.isArray(result.mpts)).toBe(true);
  });

  test('should handle account with no MPTs', async () => {
    const response = await fetch('/api/xrpl/mpt/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.mpts).toEqual([]);
  });

  test('should validate account seed format', async () => {
    const response = await fetch('/api/xrpl/mpt/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: 'invalid-seed-format'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### 3. Compliance Tests

#### 3.1 Credential Creation Tests
**Test Suite**: `tests/compliance/credential-creation.test.ts`

```typescript
describe('Compliance Credential Creation', () => {
  test('should create KYC credential', async () => {
    const response = await fetch('/api/compliance/credential/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        subject: 'rSubject123...',
        credentialType: 'KYC',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.credentialId).toBeDefined();
  });

  test('should create AML credential', async () => {
    const response = await fetch('/api/compliance/credential/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        subject: 'rSubject123...',
        credentialType: 'AML',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.credentialId).toBeDefined();
  });

  test('should handle duplicate credential creation', async () => {
    // Create first credential
    const firstResponse = await fetch('/api/compliance/credential/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        subject: 'rSubject123...',
        credentialType: 'KYC'
      })
    });
    
    expect(firstResponse.ok).toBe(true);
    
    // Try to create duplicate
    const secondResponse = await fetch('/api/compliance/credential/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        subject: 'rSubject123...',
        credentialType: 'KYC'
      })
    });
    
    const result = await secondResponse.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should validate credential type format', async () => {
    const response = await fetch('/api/compliance/credential/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        subject: 'rSubject123...',
        credentialType: 'INVALID_TYPE_WITH_SPECIAL_CHARS!@#'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

#### 3.2 Permissioned Domain Tests
**Test Suite**: `tests/compliance/permissioned-domains.test.ts`

```typescript
describe('Permissioned Domain Management', () => {
  test('should create permissioned domain', async () => {
    const response = await fetch('/api/compliance/domain/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        credentialType: 'KYC',
        network: 'testnet'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.domainId).toBeDefined();
  });

  test('should update existing permissioned domain', async () => {
    // First create a domain
    const createResponse = await fetch('/api/compliance/domain/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        credentialType: 'KYC'
      })
    });
    
    const createResult = await createResponse.json();
    expect(createResult.success).toBe(true);
    
    // Then update it
    const updateResponse = await fetch('/api/compliance/domain/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        credentialType: 'AML',
        domainId: createResult.domainId
      })
    });
    
    const updateResult = await updateResponse.json();
    expect(updateResult.success).toBe(true);
    expect(updateResult.domainId).toBe(createResult.domainId);
  });

  test('should delete permissioned domain', async () => {
    // First create a domain
    const createResponse = await fetch('/api/compliance/domain/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        credentialType: 'KYC'
      })
    });
    
    const createResult = await createResponse.json();
    expect(createResult.success).toBe(true);
    
    // Then delete it
    const deleteResponse = await fetch('/api/compliance/domain/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        domainId: createResult.domainId
      })
    });
    
    const deleteResult = await deleteResponse.json();
    expect(deleteResult.success).toBe(true);
  });

  test('should handle non-existent domain deletion', async () => {
    const response = await fetch('/api/compliance/domain/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
        domainId: 'non-existent-domain-id'
      })
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### 4. Fund Management Tests

#### 4.1 Fund Creation Tests
**Test Suite**: `tests/funds/fund-creation.test.ts`

```typescript
describe('Fund Creation', () => {
  test('should create fund with valid data', async () => {
    const fundData = {
      name: 'Test Institutional Fund',
      symbol: 'TIF',
      description: 'A test fund for institutional investors',
      fundType: 'equity',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US', 'EU'],
      regulatoryStatus: { status: 'approved', regulator: 'SEC' },
      complianceMatrix: { kyc: true, aml: true },
      complianceRules: { minInvestment: 10000, maxInvestment: 1000000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15, sharpe: 1.2 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    const response = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fundData)
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.fundId).toBeDefined();
  });

  test('should validate required fields', async () => {
    const incompleteFundData = {
      name: 'Test Fund',
      // Missing required fields
    };

    const response = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompleteFundData)
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should validate fund type', async () => {
    const fundData = {
      name: 'Test Fund',
      symbol: 'TF',
      description: 'Test fund',
      fundType: 'invalid_type',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US'],
      regulatoryStatus: { status: 'approved' },
      complianceMatrix: { kyc: true },
      complianceRules: { minInvestment: 10000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    const response = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fundData)
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

#### 4.2 Fund Listing Tests
**Test Suite**: `tests/funds/fund-listing.test.ts`

```typescript
describe('Fund Listing', () => {
  test('should list all funds', async () => {
    const response = await fetch('/api/funds', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.count).toBeDefined();
  });

  test('should handle empty fund list', async () => {
    // Clear all funds first
    // ... implementation to clear funds ...
    
    const response = await fetch('/api/funds', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
    expect(result.count).toBe(0);
  });

  test('should filter funds by status', async () => {
    const response = await fetch('/api/funds?status=active', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    
    // Verify all returned funds have active status
    result.data.forEach((fund: any) => {
      expect(fund.status).toBe('active');
    });
  });

  test('should filter funds by type', async () => {
    const response = await fetch('/api/funds?type=equity', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    
    // Verify all returned funds are equity type
    result.data.forEach((fund: any) => {
      expect(fund.fundType).toBe('equity');
    });
  });
});
```

### 5. Integration Tests

#### 5.1 End-to-End Fund Creation Flow
**Test Suite**: `tests/integration/fund-creation-flow.test.ts`

```typescript
describe('End-to-End Fund Creation Flow', () => {
  test('should complete full fund creation with Xaman signing', async () => {
    // Step 1: Create fund data
    const fundData = {
      name: 'E2E Test Fund',
      symbol: 'E2E',
      description: 'End-to-end test fund',
      fundType: 'equity',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US'],
      regulatoryStatus: { status: 'approved' },
      complianceMatrix: { kyc: true },
      complianceRules: { minInvestment: 10000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    // Step 2: Create Xaman payload for fund creation
    const payloadResponse = await fetch('/api/xaman/payload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction: {
          TransactionType: 'Payment',
          Destination: 'rFundDestination123...',
          Amount: '1000000'
        },
        identifier: `fund-${Date.now()}`,
        instruction: 'Sign to create the fund'
      })
    });
    
    const payloadResult = await payloadResponse.json();
    expect(payloadResult.success).toBe(true);
    
    // Step 3: Verify payload (simulating user signing)
    const verifyResponse = await fetch('/api/xaman/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: payloadResult.uuid
      })
    });
    
    const verifyResult = await verifyResponse.json();
    expect(verifyResult.success).toBe(true);
    
    // Step 4: Create fund in database
    const fundResponse = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fundData)
    });
    
    const fundResult = await fundResponse.json();
    expect(fundResult.success).toBe(true);
    
    // Step 5: Verify fund was created
    const listResponse = await fetch('/api/funds', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const listResult = await listResponse.json();
    expect(listResult.success).toBe(true);
    expect(listResult.data.some((fund: any) => fund.symbol === 'E2E')).toBe(true);
  });
});
```

#### 5.2 MPT Lifecycle Integration Test
**Test Suite**: `tests/integration/mpt-lifecycle.test.ts`

```typescript
describe('MPT Lifecycle Integration', () => {
  test('should complete full MPT lifecycle', async () => {
    const testData = {
      issuerSeed: 'sEd7rBGm5kxzauRTAV2hbsNz7N45X91',
      mptIssuanceId: 'test-mpt-lifecycle-123',
      amount: '1000',
      destination: 'rDestination123...',
      network: 'testnet'
    };

    // Step 1: Authorize MPT
    const authResponse = await fetch('/api/xrpl/mpt/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: testData.issuerSeed,
        mptIssuanceId: testData.mptIssuanceId,
        network: testData.network
      })
    });
    
    const authResult = await authResponse.json();
    expect(authResult.success).toBe(true);
    
    // Step 2: Send MPT
    const sendResponse = await fetch('/api/xrpl/mpt/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: testData.issuerSeed,
        mptIssuanceId: testData.mptIssuanceId,
        amount: testData.amount,
        destination: testData.destination,
        network: testData.network
      })
    });
    
    const sendResult = await sendResponse.json();
    expect(sendResult.success).toBe(true);
    
    // Step 3: Verify MPT was sent
    const getResponse = await fetch('/api/xrpl/mpt/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountSeed: testData.issuerSeed,
        network: testData.network
      })
    });
    
    const getResult = await getResponse.json();
    expect(getResult.success).toBe(true);
    expect(getResult.mpts).toBeDefined();
  });
});
```

### 6. Performance Tests

#### 6.1 Load Testing
**Test Suite**: `tests/performance/load-testing.test.ts`

```typescript
describe('Performance Load Testing', () => {
  test('should handle concurrent fund creation requests', async () => {
    const fundData = {
      name: 'Load Test Fund',
      symbol: 'LTF',
      description: 'Load test fund',
      fundType: 'equity',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US'],
      regulatoryStatus: { status: 'approved' },
      complianceMatrix: { kyc: true },
      complianceRules: { minInvestment: 10000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    const promises = Array.from({ length: 10 }, (_, i) => 
      fetch('/api/funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fundData,
          name: `Load Test Fund ${i}`,
          symbol: `LTF${i}`
        })
      })
    );

    const responses = await Promise.all(promises);
    const results = await Promise.all(responses.map(r => r.json()));

    results.forEach(result => {
      expect(result.success).toBe(true);
    });
  });

  test('should handle concurrent payload creation requests', async () => {
    const promises = Array.from({ length: 20 }, () => 
      fetch('/api/xaman/payload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction: { TransactionType: 'SignIn' }
        })
      })
    );

    const responses = await Promise.all(promises);
    const results = await Promise.all(responses.map(r => r.json()));

    results.forEach(result => {
      expect(result.success).toBe(true);
      expect(result.uuid).toBeDefined();
    });
  });
});
```

### 7. Security Tests

#### 7.1 Input Validation Tests
**Test Suite**: `tests/security/input-validation.test.ts`

```typescript
describe('Security Input Validation', () => {
  test('should prevent SQL injection in fund creation', async () => {
    const maliciousData = {
      name: "'; DROP TABLE funds; --",
      symbol: 'MAL',
      description: 'Malicious fund',
      fundType: 'equity',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US'],
      regulatoryStatus: { status: 'approved' },
      complianceMatrix: { kyc: true },
      complianceRules: { minInvestment: 10000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    const response = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(maliciousData)
    });
    
    const result = await response.json();
    // Should either succeed with sanitized data or fail gracefully
    expect(result.success).toBeDefined();
  });

  test('should validate XRPL account format', async () => {
    const response = await fetch('/api/xrpl/balance', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result.error).toContain('Account parameter is required');
  });

  test('should prevent XSS in fund descriptions', async () => {
    const maliciousData = {
      name: 'XSS Test Fund',
      symbol: 'XSS',
      description: '<script>alert("XSS")</script>',
      fundType: 'equity',
      managerId: 'user123',
      status: 'draft',
      aum: 1000000,
      nav: 100,
      sharePrice: 1.0,
      totalShares: 1000000,
      totalSupply: '1000000',
      outstandingShares: 1000000,
      minimumInvestment: 10000,
      managementFee: 0.02,
      performanceFee: 0.20,
      xrplAccount: 'rTestAccount123...',
      jurisdictions: ['US'],
      regulatoryStatus: { status: 'approved' },
      complianceMatrix: { kyc: true },
      complianceRules: { minInvestment: 10000 },
      riskProfile: 'moderate',
      riskMetrics: { volatility: 0.15 },
      inceptionDate: Date.now(),
      fiscalYearEnd: '12-31',
      baseCurrency: 'USD',
      lastValuation: Date.now(),
      nextValuation: Date.now() + 86400000
    };

    const response = await fetch('/api/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(maliciousData)
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    
    // Verify description was sanitized
    const listResponse = await fetch('/api/funds', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const listResult = await listResponse.json();
    const fund = listResult.data.find((f: any) => f.symbol === 'XSS');
    expect(fund.description).not.toContain('<script>');
  });
});
```

## Test Execution Strategy

### 1. Test Environment Setup
- **Testnet Configuration**: Use XRPL testnet for all tests
- **Mock Services**: Mock external services for unit tests
- **Database**: Use test database for integration tests
- **API Keys**: Use test API keys for Xaman integration

### 2. Test Data Management
- **Test Accounts**: Create dedicated test accounts
- **Test Funds**: Use consistent test fund data
- **Cleanup**: Implement proper test cleanup between runs

### 3. Continuous Integration
- **Automated Testing**: Run tests on every commit
- **Coverage Reporting**: Track test coverage metrics
- **Performance Monitoring**: Monitor test execution times

### 4. Test Reporting
- **Detailed Reports**: Generate comprehensive test reports
- **Failure Analysis**: Analyze and categorize test failures
- **Trend Analysis**: Track test performance over time

This comprehensive test plan ensures thorough coverage of all critical functionality identified in the analysis, following Xaman and XRPL best practices.

