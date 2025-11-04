# Xaman Wallet Connection Fix Instructions

## Problem
You're experiencing "Payload creation timeout after 10 seconds" when trying to connect your Xaman wallet. This is caused by the Xumm SDK being unable to make API calls due to misconfigured redirect URIs in the Xaman Developer Console.

## Solution

### Step 1: Configure Redirect URIs in Xaman Developer Console

1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
4. In the application settings, find the "Origin/Redirect URIs" section
5. Add the following URIs:

#### For Development Environment:
```
http://localhost:5177/
```

#### For More Flexible Development (if supported):
```
http://localhost:*/
```

6. Click "Save" to apply the changes

### Step 2: Verify API Key

Ensure your API key is active and valid:
1. In the Xaman Developer Console, check that your application is not suspended
2. Verify the API key `b53edeaf-0046-49a6-a100-4bb284be3682` has the necessary permissions

### Step 3: Test the Connection

1. Refresh your application at http://localhost:5177/
2. Click "Connect with Xaman" button
3. The OAuth flow should now work correctly
4. You should see a QR code for desktop users or authentication screen for mobile users
5. Connection should complete successfully

## Why This Fix Works

The Xumm SDK uses OAuth2 for authentication, which requires explicit whitelisting of redirect URIs for security reasons. When the SDK generates a dynamic redirect URI (like `http://localhost:54271/`), it must be allowed in the Xaman Developer Console.

By adding `http://localhost:5177/` to the whitelist, you're allowing the SDK to complete the OAuth flow successfully, which enables all subsequent API calls including payload creation.

## Troubleshooting

### If the Issue Persists:

1. **Check Network Connectivity**:
   - Ensure your development machine can access `https://xumm.app`
   - Test with: `curl -X GET "https://xumm.app/api/v1/platform/zap" -H "accept: application/json"`

2. **Verify Environment Variables**:
   - Check that your `.env` file contains:
     ```
     VITE_XUMM_API_KEY=b53edeaf-0046-49a6-a100-4bb284be3682
     ```

3. **Check for Firewall Issues**:
   - Ensure your firewall is not blocking outbound connections to `xumm.app`

4. **Review Xaman Developer Console Logs**:
   - Check for any rate limiting or suspension notices
   - Verify your application has not exceeded quota limits

## Additional Notes

### Development vs Production

- **Development**: Use `http://localhost:5177/` or `http://localhost:*/`
- **Production**: Use your actual domain with HTTPS (e.g., `https://yourdomain.com/`)

### Multiple Developers

If you have multiple developers or environments, you may want to add multiple redirect URIs:
```
http://localhost:5177/
http://localhost:5176/
http://localhost:5175/
http://localhost:*/
```

## Support

If you continue to experience issues after following these steps, please:

1. Check the browser console for detailed error messages
2. Verify all steps in this guide have been completed
3. Contact Xaman support through the Developer Console
4. Review the comprehensive research in `FINAL-IN-DEPTH-XAMAN-RESEARCH-COMPLETION.md` for additional insights