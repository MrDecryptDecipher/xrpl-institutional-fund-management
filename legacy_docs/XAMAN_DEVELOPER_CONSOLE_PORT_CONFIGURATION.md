# Xaman Developer Console Port Configuration Guide

## Overview

This guide provides step-by-step instructions for configuring redirect URIs in the Xaman Developer Console to support dynamic ports for OAuth2 flows, based on the comprehensive research in FINAL-IN-DEPTH-XAMAN-RESEARCH-COMPLETION.md.

## Understanding the Issue

When using the Xumm SDK for OAuth2 authentication, the SDK dynamically generates redirect URIs with ephemeral ports (e.g., `http://localhost:54271/`). If these URIs are not whitelisted in the Xaman Developer Console, users will encounter the error:

```
XRPL Labs
Error: access_denied
Invalid client/redirect URL.
```

## Xaman Developer Console Configuration

### Step 1: Access the Xaman Developer Console

1. Navigate to https://apps.xumm.dev
2. Log in with your Xaman credentials
3. Select your application (API Key: b53edeaf-0046-49a6-a100-4bb284be3682)

### Step 2: Configure Redirect URIs

In your application settings, locate the "Origin/Redirect URIs" section and add the following URIs based on your environment:

#### For Development Environment

Add specific ports you're using:
```
http://localhost:5176/
```

Or use a wildcard for flexibility (if supported):
```
http://localhost:*/
```

#### For Production Environment

Add your specific domain with HTTPS:
```
https://yourdomain.com/
https://www.yourdomain.com/
```

### Step 3: Save Configuration

Click "Save" or "Update" to apply the changes.

## Port Configuration Strategies

### Strategy 1: Specific Port Registration (Most Secure)

Register only the ports you're actively using:
```
http://localhost:5176/
```

**Pros**:
- Most secure approach
- Explicit control over allowed ports
- Clear configuration

**Cons**:
- Need to update when port changes
- Less flexible for team development

### Strategy 2: Port Range Registration

Register a range of common development ports:
```
http://localhost:5173/
http://localhost:5174/
http://localhost:5175/
http://localhost:5176/
http://localhost:3000/
http://localhost:8080/
```

**Pros**:
- Supports multiple development environments
- Accommodates different development tools
- Reasonable security

**Cons**:
- More entries to manage
- Still requires updates for new ports

### Strategy 3: Wildcard Port Registration (If Supported)

Use wildcard syntax for maximum flexibility:
```
http://localhost:*/
```

**Pros**:
- Maximum flexibility
- No need to update for port changes
- Ideal for development teams

**Cons**:
- May not be supported by all OAuth2 providers
- Less secure (broader allowance)
- Not recommended for production

## Testing Configuration

### After Configuration:

1. Refresh your application
2. Click "Connect with Xaman" button
3. Verify the OAuth flow works without "access_denied" error
4. Check that users can authenticate with Xaman wallet
5. Confirm connection completes successfully

### Verification Steps:

1. **Browser Console Check**:
   - Open developer tools
   - Check for redirect URI errors
   - Verify network requests to OAuth2 endpoints

2. **Application Logs**:
   - Check for successful SDK initialization
   - Verify event handling (success, error, logout)
   - Monitor account retrieval

3. **User Flow**:
   - Complete sign-in process
   - Verify account information display
   - Test disconnect functionality

## Troubleshooting Common Issues

### Issue 1: "access_denied - Invalid client/redirect URL"

**Solution**:
1. Verify redirect URI format (include trailing slash)
2. Check that URI is exactly registered in Developer Console
3. Ensure "Save" was clicked after adding URI
4. Try hard refresh of application

### Issue 2: Port Conflicts

**Solution**:
1. Use Vite's port configuration to specify exact port:
   ```bash
   npm run dev
   ```
2. Add multiple common ports to whitelist
3. Use wildcard if supported

### Issue 3: CORS Errors

**Solution**:
1. Verify CORS configuration in application
2. Check browser console for specific CORS errors
3. Ensure proper headers in development server

## Best Practices

### Security Considerations

1. **Never use wildcards in production**:
   - Avoid `https://*.yourdomain.com/` for production environments
   - Use specific domains and paths

2. **Always use HTTPS for production**:
   - HTTP should only be used for localhost development
   - Production environments must use HTTPS

3. **Regular review**:
   - Periodically review redirect URI whitelist
   - Remove unused or outdated entries

### Development Practices

1. **Consistent port usage**:
   - Use consistent ports across development team
   - Document port usage in team guidelines

2. **Environment-specific configuration**:
   - Use different configurations for dev, staging, production
   - Implement environment-based URI registration

3. **Version control**:
   - Document redirect URI changes
   - Include configuration in project documentation

## Advanced Configuration

### Multiple Environments

For complex development setups, consider:

#### Development:
```
http://localhost:5176/
http://localhost:3000/
```

#### Staging:
```
https://staging.yourdomain.com/
```

#### Production:
```
https://yourdomain.com/
https://www.yourdomain.com/
```

### Team Development

For teams with multiple developers:

1. **Shared Development Ports**:
   ```
   http://localhost:5173/
   http://localhost:5174/
   http://localhost:5175/
   http://localhost:5176/
   ```

2. **Individual Developer Setup**:
   - Each developer uses assigned port range
   - Document port assignments in team wiki

3. **Docker Development**:
   - Use consistent port mapping in docker-compose
   - Register container ports in Developer Console

## Integration with XamanWalletConnect Component

The updated XamanWalletConnect component includes:

### Enhanced Error Handling
```typescript
// Check if this is a redirect URI error
if (error.message && error.message.includes("access_denied")) {
  const errorMessage = "Redirect URI not configured. Please add http://localhost:5176/ to your Xaman app settings in the Developer Console. See XAMAN_OAUTH_REDIRECT_URI_FIX.md for detailed instructions.";
  toast.error(errorMessage);
  setInitError("Redirect URI not configured in Xaman Developer Console");
  console.error("Xaman OAuth Redirect URI Error: Please configure redirect URIs in Xaman Developer Console");
}
```

### User Guidance
- Clear error messages with resolution steps
- References to documentation files
- Prominent refresh button after configuration

## References

This configuration guide is based on:

1. **FINAL-IN-DEPTH-XAMAN-RESEARCH-COMPLETION.md** - Comprehensive research of all 56 Xaman documentation links
2. **RFC 8252** - OAuth 2.0 for Native Apps standard
3. **Xaman Developer Documentation** - Official guidelines for OAuth2 integration
4. **Industry Best Practices** - Standard approaches for OAuth2 redirect URI management

## Conclusion

Proper configuration of redirect URIs in the Xaman Developer Console is essential for successful OAuth2 integration. By following this guide and implementing the recommended strategies, you can ensure a smooth authentication experience for your users while maintaining security best practices.

The key is to balance security with flexibility:
- Use specific ports for production environments
- Allow flexibility for development with appropriate safeguards
- Regularly review and update configurations
- Follow the comprehensive research guidelines for implementation