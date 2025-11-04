# Xaman Push Notification Testing Guide

## ✅ Implementation Complete!

All three phases have been successfully implemented:

### Phase 1: Backend User Token Management ✅
**File**: `src/xaman-payload-server.ts`

**Changes Made**:
1. ✅ Added `UserTokenData` interface for type safety
2. ✅ Added `userTokens` Map for in-memory storage
3. ✅ Added `isTokenExpired()` helper function
4. ✅ Added `getUserToken()` helper function with expiration check
5. ✅ Modified `/api/create-xaman-payload` to accept `xrplAccount` and include `user_token`
6. ✅ Created new `/api/payload-result/:uuid` endpoint to retrieve and store user tokens

**Key Features**:
- User tokens stored with 30-day expiration
- Automatic expiration validation before use
- Comprehensive logging for debugging

---

### Phase 2: Frontend Sign-In Flow Enhancement ✅
**File**: `src/components/XamanWalletConnect.tsx`

**Changes Made**:
1. ✅ Added `waitForPayloadResult()` polling function (5-second intervals, 5-minute timeout)
2. ✅ Modified desktop QR flow to wait for payload resolution
3. ✅ Extract `user_token` from `result.application.issued_user_token`
4. ✅ Store user token in localStorage with key `xaman_user_token_${xrplAccount}`
5. ✅ Added comprehensive error handling and logging

**Key Features**:
- Polls backend every 5 seconds for payload result
- Automatically stores user token after first successful sign
- Graceful timeout handling (5 minutes)

---

### Phase 3: Frontend Transaction Flow Integration ✅
**File**: `src/components/TransactionExecutor.tsx`

**Changes Made**:
1. ✅ Added `xrplAccount` field to payload creation request
2. ✅ Added logging to show push notification status (`pushed: true/false`)
3. ✅ Backend automatically looks up and includes user_token

**Key Features**:
- Transparent user token inclusion
- Clear console logging for debugging
- No changes to user experience (automatic)

---

## 🧪 Testing Instructions

### Prerequisites
- ✅ Backend server running on port 3001
- ✅ Frontend running on port 5002
- ✅ Xaman mobile app installed on your phone
- ✅ XRPL testnet account with some XRP

### Test 1: First Sign-In (No Push - QR Code Only)

**Expected Behavior**: First interaction MUST use QR code (no push notification possible)

1. **Open Application**:
   ```
   http://3.111.22.56:5002
   ```

2. **Click "Connect with Xaman"**

3. **Observe Console Logs**:
   ```
   Creating sign-in payload using Xaman SDK...
   Sign-in payload created successfully: {...}
   ℹ️ No valid user_token available - payload will use QR code only
   Starting to poll for payload result: <uuid>
   ```

4. **Scan QR Code** with Xaman mobile app

5. **Approve Sign-In** in Xaman app

6. **Observe Console Logs**:
   ```
   Attempt 1: Payload result: {...}
   ✅ Payload resolved successfully!
   Sign-in successful! { account: 'rXXXXXX...', has_user_token: true }
   ✅ User token stored in localStorage for account: rXXXXXX...
   Successfully connected to Xaman wallet!
   ```

7. **Verify localStorage**:
   - Open DevTools → Application → Local Storage
   - Look for key: `xaman_user_token_rXXXXXX...`
   - Should contain a UUID value

8. **Verify Backend Logs**:
   ```bash
   tail -50 /tmp/xaman-payload-server.log
   ```
   Should show:
   ```
   ✅ User token stored for account: rXXXXXX...
   📊 Total stored tokens: 1
   ```

**✅ Test 1 PASS Criteria**:
- QR code displayed
- User token stored in localStorage
- Backend logs show token storage
- Connection successful

---

### Test 2: Second Transaction (WITH Push Notification!)

**Expected Behavior**: Second transaction should send push notification (`pushed: true`)

1. **Navigate to "Execute Transactions" Tab**

2. **Enter Transaction Details**:
   - Amount: 1 XRP
   - Transaction Type: Subscribe (or any type)

3. **Click "Execute Transaction"**

4. **Observe Console Logs**:
   ```
   Creating Xaman payload via backend API...
   Payload data: { xrplAccount: 'rXXXXXX...', transactionType: 'Payment', ... }
   🔑 XRPL Account for user token lookup: rXXXXXX...
   ```

5. **Backend Logs** (check `/tmp/xaman-payload-server.log`):
   ```
   Valid user token found for account: rXXXXXX...
   ✅ Adding user_token to payload for push notification
   ```

6. **Observe Console Logs**:
   ```
   Payload created: { uuid: '...', pushed: true, ... }
   ✅ PUSH NOTIFICATION SENT! User will receive notification on mobile device.
   ```

7. **Check Mobile Device**:
   - Should receive push notification from Xaman app
   - Notification should show transaction details
   - Can approve directly from notification

8. **Approve Transaction** in Xaman app

9. **Verify Transaction Success**

**✅ Test 2 PASS Criteria**:
- Console shows `pushed: true`
- Push notification received on mobile device
- Transaction approved successfully
- No QR code needed (optional fallback)

---

### Test 3: Token Persistence Across Page Refresh

**Expected Behavior**: User token should persist after page refresh

1. **After Test 2, Refresh the Page** (Ctrl + Shift + R)

2. **Verify localStorage Still Contains Token**:
   - DevTools → Application → Local Storage
   - Key `xaman_user_token_rXXXXXX...` should still exist

3. **Execute Another Transaction**

4. **Verify Push Notification Still Works**:
   - Should see `pushed: true` in console
   - Should receive push notification on mobile

**✅ Test 3 PASS Criteria**:
- Token persists after refresh
- Push notifications continue to work
- No need to reconnect wallet

---

### Test 4: Multiple Accounts

**Expected Behavior**: Each account should have its own user token

1. **Disconnect Current Wallet**

2. **Connect with Different XRPL Account**

3. **Verify New Token Stored**:
   - localStorage should have TWO keys:
     - `xaman_user_token_rACCOUNT1...`
     - `xaman_user_token_rACCOUNT2...`

4. **Execute Transaction with Second Account**

5. **Verify Push Notification Works for Second Account**

**✅ Test 4 PASS Criteria**:
- Multiple tokens stored in localStorage
- Each account receives push notifications
- No token conflicts

---

### Test 5: Token Expiration (30 Days)

**Expected Behavior**: Expired tokens should be rejected and fallback to QR

**Note**: This test requires waiting 30 days OR manually modifying the token expiration in backend

**Manual Test (Modify Backend)**:
1. In `xaman-payload-server.ts`, temporarily change expiration to 1 minute:
   ```typescript
   token_expiration: Date.now() + (60 * 1000) // 1 minute instead of 30 days
   ```

2. Restart backend server

3. Connect wallet and get user token

4. Wait 2 minutes

5. Execute transaction

6. **Verify Fallback to QR**:
   - Console should show: `User token expired for account: rXXXXXX...`
   - Console should show: `ℹ️ No valid user_token available - payload will use QR code only`
   - `pushed: false` in response
   - QR code displayed

**✅ Test 5 PASS Criteria**:
- Expired tokens detected
- Automatic fallback to QR code
- No errors or crashes

---

## 🐛 Troubleshooting

### Issue: `pushed: false` on Second Transaction

**Possible Causes**:
1. User token not stored in localStorage
2. Backend server restarted (in-memory storage lost)
3. Wrong XRPL account passed to backend

**Debug Steps**:
```javascript
// Check localStorage
console.log(localStorage.getItem('xaman_user_token_rYOURACCOUNT'));

// Check backend logs
tail -50 /tmp/xaman-payload-server.log
```

---

### Issue: Polling Timeout During Sign-In

**Possible Causes**:
1. User didn't scan QR code within 5 minutes
2. Network issues between frontend and backend
3. Backend not responding

**Debug Steps**:
```bash
# Check backend is running
curl http://localhost:3001/health

# Check backend logs
tail -50 /tmp/xaman-payload-server.log
```

---

### Issue: No Push Notification on Mobile

**Possible Causes**:
1. Xaman app notifications disabled
2. User token not included in payload
3. Network issues

**Debug Steps**:
1. Check console for `pushed: true`
2. Check Xaman app notification settings
3. Verify backend logs show "Adding user_token to payload"

---

## 📊 Expected Console Output

### First Sign-In (QR Code):
```
Creating sign-in payload using Xaman SDK...
ℹ️ No valid user_token available - payload will use QR code only
Starting to poll for payload result: abc-123-def
Attempt 1: Payload not resolved yet, waiting...
Attempt 2: Payload not resolved yet, waiting...
Attempt 3: Payload result: {...}
✅ Payload resolved successfully!
✅ User token stored in localStorage for account: rXXXXXX...
Successfully connected to Xaman wallet!
```

### Second Transaction (Push Notification):
```
Creating Xaman payload via backend API...
🔑 XRPL Account for user token lookup: rXXXXXX...
Payload created: { uuid: '...', pushed: true, ... }
✅ PUSH NOTIFICATION SENT! User will receive notification on mobile device.
```

---

## 🎯 Success Criteria Summary

- [x] Phase 1: Backend user token management implemented
- [x] Phase 2: Frontend sign-in flow enhanced
- [x] Phase 3: Frontend transaction flow integrated
- [ ] Test 1: First sign-in with QR code (no push)
- [ ] Test 2: Second transaction with push notification
- [ ] Test 3: Token persistence across refresh
- [ ] Test 4: Multiple accounts support
- [ ] Test 5: Token expiration handling

---

## 🚀 Next Steps for Production

1. **Replace In-Memory Storage with Database**:
   - Use Convex database to store user tokens
   - Implement proper user authentication
   - Associate tokens with user accounts

2. **Add Webhook Support** (Optional but Recommended):
   - Configure webhook URL in Xaman Developer Console
   - Create webhook endpoint to receive user tokens
   - More reliable than polling

3. **Add Token Refresh Logic**:
   - Automatically refresh tokens before expiration
   - Handle token refresh failures gracefully

4. **Add Security Enhancements**:
   - Encrypt user tokens in storage
   - Implement rate limiting
   - Add CSRF protection

---

**Implementation Date**: 2025-10-14  
**Status**: ✅ COMPLETE - Ready for Testing  
**Backend Server**: http://localhost:3001 (Running)  
**Frontend**: http://3.111.22.56:5002 (Running)

