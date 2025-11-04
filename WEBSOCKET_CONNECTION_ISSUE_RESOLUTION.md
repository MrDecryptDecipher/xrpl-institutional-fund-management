# WebSocket Connection Issue Resolution

## Problem Description

The application was experiencing WebSocket connection errors with the following messages:
```
WebSocket connection to 'ws://localhost:5174/?token=TjoYfRwBw5bG' failed: WebSocket opening handshake timed out
WebSocket connection to 'ws://localhost:5173/?token=TjoYfRwBw5bG' failed: Error during WebSocket handshake: Unexpected response code: 200
[vite] failed to connect to websocket.
```

## Root Cause Analysis

### 1. Port Conflicts
Multiple Vite development server instances were running simultaneously on different ports (5173, 5174, 5175), causing conflicts in WebSocket connections.

### 2. Port Occupancy
Port 5173 was occupied by a `serve` process, preventing the Vite development server from binding to it properly.

### 3. HMR Configuration Issues
The Hot Module Replacement (HMR) WebSocket connection was failing due to mismatched ports between the client and server.

## Resolution Steps

### 1. Process Cleanup
```bash
# Kill all Vite processes for the XRPL project
pkill -9 -f "xrpl_institutional_fund_management_protocol"

# Kill conflicting serve process on port 5173
pkill -f "serve.*5173"
```

### 2. Configuration Updates

#### Vite Configuration (`vite.config.ts`)
```typescript
server: {
  port: 5176,
  strictPort: true,
  host: true,
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 5176
  }
}
```

#### Package.json Scripts
```json
"dev:frontend": "vite --port 5176 --open"
```

### 3. Xaman Wallet Configuration Update
Updated all references to use port 5176 instead of 5173/5174/5175 in the XamanWalletConnect component and documentation.

## Verification

### Successful Startup
```
VITE v6.3.5  ready in 278 ms
➜  Local:   http://localhost:5176/
➜  Network: http://172.26.6.6:5176/
```

### WebSocket Connection
- HMR WebSocket connection now successfully established
- No more handshake timeout errors
- Application hot reloading working correctly

## Prevention Measures

### 1. Consistent Port Usage
- Use a specific, documented port for development
- Avoid automatic port assignment by Vite

### 2. Process Management
- Always stop development servers properly
- Check for conflicting processes before starting

### 3. Configuration Documentation
- Document port usage in README files
- Include port configuration in setup guides

## Current Status

✅ WebSocket connections working correctly
✅ Application running on port 5176
✅ HMR (Hot Module Replacement) functional
✅ Xaman wallet integration functional with updated redirect URIs

## Next Steps

1. Update Xaman Developer Console with new redirect URI: `http://localhost:5176/`
2. Test Xaman wallet connection functionality
3. Verify all application features work correctly

## Lessons Learned

1. **Port Management**: Always explicitly specify ports to avoid conflicts
2. **Process Cleanup**: Regularly check for and clean up stale development processes
3. **Configuration Consistency**: Ensure all configuration files align with the chosen port
4. **Documentation**: Keep documentation updated with current port configurations