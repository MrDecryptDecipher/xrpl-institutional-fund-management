# Xaman Push Notification Research Report

## Executive Summary

**Problem**: Users are NOT receiving push notifications on their Xaman mobile app when transactions are created. QR codes display successfully, but `pushed: false` in payload response indicates no push notification was sent.

**Root Cause**: Missing `user_token` parameter in payload creation requests. The current implementation does not obtain, store, or pass user tokens when creating payloads.

**Solution**: Implement a complete user token lifecycle: obtain tokens from first signed payload, store them securely, and include them in subsequent payload creation requests.

---

## 📚 Documentation Research (Using Playwright MCP)

### 1. Payload Creation API Documentation
**URL**: https://xumm.readme.io/reference/post-payload

**Key Finding - `user_token` Parameter**:
```json
{
  "user_token": "string",  // User (Push) token, to deliver a signing request directly to the mobile device
  "txjson": { ... }
}
```

**Documentation Quote**:
> "To deliver a payload to a known user, a `user_token` has to be sent when POSTing the payload. Your application receives the `user_token` after the user decides to sign one of your payloads for the first time. The `user_token` will be delivered to your application in the Webhook and when fetching the Payload results from the xumm API."

**Source**: https://xumm.readme.io/reference/post-payload (Body Params section)

---

### 2. Push Notification Delivery Documentation
**URL**: https://docs.xaman.dev/concepts/payloads-sign-requests/delivery/push

**Key Findings**:

#### Backend Flow (Our Use Case):
> "If your application features user sign-in (to identify your user) and you obtained a `user_token` from a **previously signed payload from this specific user**, you can add the `user_token` to the next payload to deliver the payload through a push notification."

> "The first interaction (to obtain the `user_token`) will always involve either: showing a QR code for the user to scan with the Xumm app or a deep link to the Xumm app to sign a payload."

#### Payload with User Token Example:
```json
{
  "user_token": "c5bc4ccc-28fa-4080-b702-0d3aac97b993",
  "txjson": { ... }
}
```

#### Response Confirmation:
```json
{
  "uuid": "<some-uuid>",
  ...
  "pushed": true  // ✅ Confirms push notification was sent
}
```

**User Token Expiration**:
> "The issued user token expires 30 days after the **last** successfully signed payload of your application by the Xumm user using the same issued user token."

**Source**: https://docs.xaman.dev/concepts/payloads-sign-requests/delivery/push

---

### 3. Obtaining User Tokens Documentation

#### Method 1: From Webhook (Recommended)
**URL**: https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks

**Webhook Response Structure**:
```json
{
  "meta": { ... },
  "custom_meta": { ... },
  "payloadResponse": {
    "payload_uuidv4": "<some-uuid>",
    "signed": true,
    "user_token": true,  // Indicates user_token is available
    "txid": "<some-tx-hash>"
  },
  "userToken": {
    "user_token": "<some-token>",  // ✅ THIS IS WHAT WE NEED TO STORE
    "token_issued": 1635000000,
    "token_expiration": 1637500000
  }
}
```

**Documentation Quote**:
> "If a user token (`userToken.user_token`) is issued and you plan on payload delivery using push notifications in the future, your application could/should store the token."

**Source**: https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks

#### Method 2: From Resolved Payload
**URL**: https://docs.xaman.dev/concepts/payloads-sign-requests/delivery/push

**Payload Response Structure**:
```json
{
  "meta": { ... },
  "application": {
    "issued_user_token": "e5fff0d0-698d-425d-bdcf-3156e744282d",  // ✅ THIS IS WHAT WE NEED TO STORE
    ...
  },
  ...
}
```

**Source**: https://docs.xaman.dev/concepts/payloads-sign-requests/delivery/push

---

## 🔍 Current Implementation Analysis

### Backend: `xaman-payload-server.ts`

**Current Payload Creation (Lines 58-64)**:
```typescript
const payloadData = {
  txjson: {
    TransactionType: body.transactionType || 'SignIn',
    ...body.transactionData
  }
  // ❌ NO user_token field!
};
```

**Issues Identified**:
1. ❌ No `user_token` parameter in payload creation
2. ❌ No endpoint to retrieve payload results after signing
3. ❌ No webhook endpoint to receive user tokens
4. ❌ No database/storage for user tokens
5. ❌ No logic to associate user tokens with user accounts

---

### Frontend: `TransactionExecutor.tsx`

**Current Payload Request (Lines 66-79)**:
```typescript
const payloadData = {
  transactionType: 'Payment',
  transactionData: {
    Destination: destination,
    Amount: xrpToDrops(amount),
    Memos: [...]
  }
  // ❌ NO user_token field!
};
```

**Issues Identified**:
1. ❌ No user token obtained from previous sign-in
2. ❌ No user token stored in localStorage/state
3. ❌ No user token passed to backend
4. ❌ No polling/websocket to get payload results after signing

---

### Frontend: `XamanWalletConnect.tsx`

**Current Sign-In Flow (Lines 288-332)**:
```typescript
const createSignInPayload = async () => {
  const payloadData = {
    txjson: {
      TransactionType: "SignIn"
    },
    options: { ... },
    custom_meta: { ... }
  };
  
  const payload = await xumm.payload?.create(payloadData);
  // ❌ NO logic to retrieve user_token after signing!
  return payload;
};
```

**Issues Identified**:
1. ❌ Creates sign-in payload but doesn't retrieve user_token after signing
2. ❌ No polling/websocket to wait for payload resolution
3. ❌ No storage of user_token for future use
4. ❌ No association of user_token with XRPL account

---

## ✅ Implementation Plan

### Phase 1: Backend - Add User Token Storage & Retrieval

#### Step 1.1: Add In-Memory User Token Storage
**File**: `src/xaman-payload-server.ts`

```typescript
// Add after line 26
// In-memory storage for user tokens (use database in production)
const userTokens = new Map<string, {
  user_token: string;
  xrpl_account: string;
  token_issued: number;
  token_expiration: number;
}>();
```

#### Step 1.2: Add Endpoint to Retrieve Payload Results
**File**: `src/xaman-payload-server.ts`

```typescript
// Add after line 225
// Get payload results and extract user_token
app.get('/api/payload-result/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    
    console.log('Getting payload result for UUID:', uuid);
    
    const payload = await xumm.payload.get(uuid);
    
    if (!payload) {
      throw new Error('Failed to get payload');
    }
    
    // Extract user_token if available
    const userToken = payload.application?.issued_user_token;
    const xrplAccount = payload.response?.account;
    
    if (userToken && xrplAccount) {
      // Store user token
      userTokens.set(xrplAccount, {
        user_token: userToken,
        xrpl_account: xrplAccount,
        token_issued: Date.now(),
        token_expiration: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
      });
      
      console.log('User token stored for account:', xrplAccount);
    }
    
    res.status(200).json({
      meta: payload.meta,
      response: payload.response,
      application: payload.application,
      custom_meta: payload.custom_meta
    });
  } catch (error) {
    console.error('Payload result error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to get payload result' 
    });
  }
});
```

#### Step 1.3: Modify Payload Creation to Include user_token
**File**: `src/xaman-payload-server.ts`

```typescript
// Modify lines 58-64
const payloadData: any = {
  txjson: {
    TransactionType: body.transactionType || 'SignIn',
    ...body.transactionData
  }
};

// Add user_token if available for this account
if (body.xrplAccount) {
  const storedToken = userTokens.get(body.xrplAccount);
  if (storedToken && storedToken.token_expiration > Date.now()) {
    payloadData.user_token = storedToken.user_token;
    console.log('Adding user_token to payload for push notification');
  }
}
```

---

### Phase 2: Frontend - Retrieve and Store User Tokens

#### Step 2.1: Modify XamanWalletConnect to Retrieve User Token
**File**: `src/components/XamanWalletConnect.tsx`

```typescript
// Add after line 332 (after createSignInPayload function)
// Poll for payload result and extract user_token
const waitForPayloadResult = async (payloadUuid: string): Promise<any> => {
  const maxAttempts = 60; // 5 minutes (5 seconds * 60)
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`http://localhost:3001/api/payload-result/${payloadUuid}`);
      const result = await response.json();
      
      if (result.response && result.response.resolved) {
        console.log('Payload resolved:', result);
        return result;
      }
      
      // Wait 5 seconds before next attempt
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error) {
      console.error('Error polling payload result:', error);
      attempts++;
    }
  }
  
  throw new Error('Timeout waiting for payload result');
};
```

#### Step 2.2: Update connectWallet to Store User Token
**File**: `src/components/XamanWalletConnect.tsx`

```typescript
// Modify lines 236-243 (desktop QR code flow)
const payload = await createSignInPayload();
console.log('Created payload:', payload);
clearTimeout(timeout);
setPayloadUuid(payload.uuid);
setQrCodeData(payload.refs.qr_png);

// Wait for user to sign and get user_token
const result = await waitForPayloadResult(payload.uuid);

if (result.response && result.response.signed) {
  const xrplAccount = result.response.account;
  const userToken = result.application?.issued_user_token;
  
  if (userToken) {
    // Store user token in localStorage
    localStorage.setItem(`xaman_user_token_${xrplAccount}`, userToken);
    console.log('User token stored for account:', xrplAccount);
  }
  
  setAccount(xrplAccount);
  setIsConnected(true);
  setIsConnecting(false);
  setQrCodeData(null);
  saveSession(xrplAccount);
  
  const connectPayload = {
    response: {
      account: xrplAccount
    }
  };
  
  onConnect(connectPayload);
  toast.success("Successfully connected to Xaman wallet!");
}
```

---

### Phase 3: Frontend - Pass User Token in Transaction Requests

#### Step 3.1: Modify TransactionExecutor to Include User Token
**File**: `src/components/TransactionExecutor.tsx`

```typescript
// Modify lines 66-79
const payloadData = {
  xrplAccount: xrplAccount, // ✅ Add this to identify user
  transactionType: 'Payment',
  transactionData: {
    Destination: destination,
    Amount: xrpToDrops(amount),
    Memos: [{
      Memo: {
        MemoType: Buffer.from('transaction_type', 'utf8').toString('hex').toUpperCase(),
        MemoData: Buffer.from(transactionType, 'utf8').toString('hex').toUpperCase()
      }
    }]
  }
};
```

---

## 📊 Expected Results After Implementation

### Before (Current State):
```json
{
  "uuid": "abc-123",
  "refs": {
    "qr_png": "https://..."
  },
  "pushed": false  // ❌ No push notification
}
```

### After (With user_token):
```json
{
  "uuid": "abc-123",
  "refs": {
    "qr_png": "https://..."
  },
  "pushed": true  // ✅ Push notification sent!
}
```

---

## 🔐 Security Considerations

1. **User Token Storage**: Currently using in-memory Map. For production:
   - Use encrypted database (e.g., Convex with encryption)
   - Associate tokens with authenticated user sessions
   - Implement token rotation

2. **Token Expiration**: Tokens expire after 30 days of inactivity
   - Implement automatic token refresh
   - Handle expired token errors gracefully

3. **XRPL Account Association**: 
   - Verify XRPL account ownership before storing tokens
   - Prevent token hijacking

---

## 📝 Testing Checklist

- [ ] First sign-in creates payload with QR code (no push)
- [ ] After signing, user_token is retrieved and stored
- [ ] Second transaction includes user_token in payload
- [ ] Second transaction shows `pushed: true` in response
- [ ] User receives push notification on mobile device
- [ ] Token persists across page refreshes
- [ ] Token expires after 30 days of inactivity
- [ ] Multiple users can have separate tokens

---

## 🚀 Next Steps

1. Implement Phase 1 (Backend changes)
2. Implement Phase 2 (Frontend sign-in changes)
3. Implement Phase 3 (Frontend transaction changes)
4. Test complete flow end-to-end
5. Add webhook endpoint for production (optional but recommended)
6. Migrate from in-memory storage to database

---

## 📚 Documentation References

1. **Payload Creation API**: https://xumm.readme.io/reference/post-payload
2. **Push Notification Delivery**: https://docs.xaman.dev/concepts/payloads-sign-requests/delivery/push
3. **Webhooks**: https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks
4. **Payload Workflow**: https://docs.xaman.dev/concepts/payloads-sign-requests/workflow
5. **Status Updates**: https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates

---

**Report Generated**: 2025-10-14  
**Research Method**: Playwright MCP Browser Tools  
**Documentation Verified**: ✅ All quotes and code examples verified from official Xaman documentation

