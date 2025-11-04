# Fixing Xaman OAuth Redirect URI Error

## Problem
When clicking "Connect with Xaman", you get the error:
```
XRPL Labs
Error: access_denied
Invalid client/redirect URL.
```

## Root Cause
The Xumm SDK generates a dynamic redirect URI (like `http://localhost:54271/`) that is not whitelisted in your Xaman Developer Console application settings.

## Solution

### Step 1: Configure Redirect URIs in Xaman Developer Console

1. Go to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application with API Key: `b53edeaf-0046-49a6-a100-4bb284be3682`
4. In the application settings, find the "Origin/Redirect URIs" section
5. Add the following URIs:

#### For Development (based on your current setup):
```
http://localhost:5175/
```

#### For More Flexible Development:
```
http://localhost:*/
```

#### For Production (replace with your actual domain):
```
https://yourdomain.com/
```

6. Click "Save" to apply the changes

### Step 2: Refresh Your Application

After configuring the redirect URIs:
1. Refresh your application at http://localhost:5175/
2. Click "Connect with Xaman" button
3. The OAuth flow should now work correctly

### Step 3: Verify the Fix

If the fix is successful:
1. You should see the Xaman authentication screen
2. After authentication, you should be redirected back to your application
3. The wallet connection should complete successfully

## Troubleshooting

If you still encounter issues:

1. **Double-check the URI format**: Ensure trailing slash is included (`http://localhost:5175/`)
2. **Verify the save action**: Make sure you clicked "Save" in the Developer Console
3. **Check for typos**: Ensure the URI matches exactly
4. **Try a hard refresh**: Clear browser cache and refresh the application
5. **Check browser console**: Look for any additional error messages

## Additional Resources

- `XAMAN_OAUTH_REDIRECT_URI_FIX.md` - Detailed explanation of the issue and solution
- `XAMAN_REDIRECT_URI_CONFIGURATION.md` - Step-by-step configuration guide
- `XAMAN_WALLET_CONNECTION_COMPLETE_SOLUTION.md` - Complete solution documentation

## Security Considerations

1. **Never use wildcards in production**: `https://*.yourdomain.com/` should be avoided for production environments
2. **Always use HTTPS for production**: HTTP should only be used for localhost development
3. **Regular review**: Periodically review your redirect URI whitelist for unused entries