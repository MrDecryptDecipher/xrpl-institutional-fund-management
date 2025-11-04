# Detailed Implementation Plan: Critical Fixes

## Phase 1: Critical Xaman Integration Fixes

### 1.1 Fix Xaman Payload Creation

**File**: `convex/router.ts`
**Current Issue**: Basic payload creation without proper options
**Fix Required**:

```typescript
// Replace the current /xaman/payload endpoint with:
http.route({
  path: "/xaman/payload",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();

      // Get API credentials from environment variables
      const apiKey = process.env.VITE_XUMM_API_KEY;
      const apiSecret = process.env.XUMM_API_SECRET;

      if (!apiKey || !apiSecret) {
        return new Response(JSON.stringify({
          success: false,
          error: "Xaman API credentials not configured"
        }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }

      // Initialize Xumm SDK
      const xumm = new Xumm(apiKey, apiSecret);

      try {
        // Create comprehensive payload with proper options
        const payloadData = {
          txjson: body.transaction || { TransactionType: "SignIn" },
          options: {
            return_url: {
              app: `${process.env.FRONTEND_URL || 'http://localhost:5002'}/callback`,
              web: `${process.env.FRONTEND_URL || 'http://localhost:5002'}/callback?id={id}`
            },
            force_network: body.network || "TESTNET",
            submit: true,
            multisign: false
          },
          custom_meta: {
            identifier: body.identifier || `fund-${Date.now()}`,
            instruction: body.instruction || "Please sign this transaction to proceed",
            blob: body.blob || null
          },
          user_token: body.user_token || null
        };

        const payload = await xumm.payload?.create(payloadData);

        if (!payload) {
          throw new Error("Failed to create Xaman payload");
        }

        return new Response(JSON.stringify({
          success: true,
          uuid: payload.uuid,
          refs: payload.refs,
          pushed: payload.pushed,
          next: payload.next,
          custom_meta: payload.custom_meta
        }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (error) {
        console.error("Error creating Xaman payload:", error);
        return new Response(JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error creating Xaman payload"
        }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});
```

### 1.2 Fix Xaman Payload Verification

**File**: `convex/router.ts`
**Current Issue**: Basic verification without proper status handling
**Fix Required**:

```typescript
// Replace the current /xaman/verify endpoint with:
http.route({
  path: "/xaman/verify",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();

      // Get API credentials from environment variables
      const apiKey = process.env.VITE_XUMM_API_KEY;
      const apiSecret = process.env.XUMM_API_SECRET;

      if (!apiKey || !apiSecret) {
        return new Response(JSON.stringify({
          success: false,
          error: "Xaman API credentials not configured"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Initialize Xumm SDK
      const xumm = new Xumm(apiKey, apiSecret);

      try {
        // Get payload with full status information
        const payload = await xumm.payload?.get(body.uuid);

        if (!payload) {
          throw new Error("Payload not found");
        }

        // Comprehensive response with all payload information
        const response = {
          success: true,
          uuid: payload.uuid,
          meta: {
            signed: payload.meta.signed,
            cancelled: payload.meta.cancelled,
            expired: payload.meta.expired,
            pushed: payload.meta.pushed,
            resolved: payload.meta.resolved,
            resolved_at: payload.meta.resolved_at,
            return_url_app: payload.meta.return_url_app,
            return_url_web: payload.meta.return_url_web
          },
          response: payload.response,
          custom_meta: payload.custom_meta,
          refs: payload.refs
        };

        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (error) {
        console.error("Error verifying Xaman signature:", error);
        return new Response(JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error verifying signature"
        }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});
```

## Phase 2: XRPL MPT Implementation Fixes

### 2.1 Create MPT Authorization Function

**File**: `convex/xrpl/mpt.ts` (New file)
**Purpose**: Handle MPT authorization and sending

```typescript
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from 'xrpl';

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

export const authorizeMPT = internalAction({
  args: {
    accountSeed: v.string(),
    mptIssuanceId: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    transactionHash: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Create MPT authorization transaction
        const authTx = {
          "TransactionType": "MPTokenAuthorize",
          "Account": wallet.address,
          "MPTokenIssuanceID": args.mptIssuanceId,
        };

        const prepared = await client.autofill(authTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          return {
            success: true,
            transactionHash: result.result.hash
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const sendMPT = internalAction({
  args: {
    accountSeed: v.string(),
    mptIssuanceId: v.string(),
    amount: v.string(),
    destination: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    transactionHash: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Create MPT payment transaction
        const sendTx = {
          "TransactionType": "Payment",
          "Account": wallet.address,
          "Amount": {
            "mpt_issuance_id": args.mptIssuanceId,
            "value": args.amount,
          },
          "Destination": args.destination,
        };

        const prepared = await client.autofill(sendTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          return {
            success: true,
            transactionHash: result.result.hash
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const getMPTs = internalAction({
  args: {
    accountSeed: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    mpts: v.optional(v.array(v.any())),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Get MPT objects for the account
        const mpts = await client.request({
          command: "account_objects",
          account: wallet.address,
          ledger_index: "validated",
          type: "mptoken"
        });

        await client.disconnect();

        return {
          success: true,
          mpts: mpts.result.account_objects
        };
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});
```

### 2.2 Update Router with MPT Endpoints

**File**: `convex/router.ts`
**Add these endpoints**:

```typescript
// MPT Authorization Endpoint
http.route({
  path: "/xrpl/mpt/authorize",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      const result = await ctx.runAction(internal.xrpl.mpt.authorizeMPT, body);
      
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// MPT Send Endpoint
http.route({
  path: "/xrpl/mpt/send",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      const result = await ctx.runAction(internal.xrpl.mpt.sendMPT, body);
      
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// MPT Get Endpoint
http.route({
  path: "/xrpl/mpt/get",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      const result = await ctx.runAction(internal.xrpl.mpt.getMPTs, body);
      
      return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});
```

## Phase 3: Compliance Implementation

### 3.1 Create Compliance Functions

**File**: `convex/compliance/credentials.ts` (New file)

```typescript
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from 'xrpl';

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

export const createCredential = internalAction({
  args: {
    issuerSeed: v.string(),
    subject: v.string(),
    credentialType: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    credentialId: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.issuerSeed);

        // Convert credential type to hex if needed
        let credentialType = args.credentialType;
        if (!/^[0-9A-F]+$/i.test(credentialType)) {
          let hex = '';
          for (let i = 0; i < credentialType.length; i++) {
            const charCode = credentialType.charCodeAt(i);
            const hexCharCode = charCode.toString(16).padStart(2, '0');
            hex += hexCharCode;
          }
          credentialType = hex.toUpperCase();
        }

        // Create credential transaction
        const credentialTx = {
          "TransactionType": "CredentialCreate",
          "Account": wallet.address,
          "Subject": args.subject,
          "CredentialType": credentialType
        };

        const prepared = await client.autofill(credentialTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          // Parse for credential info
          const parsedResponse = JSON.parse(JSON.stringify(result.result.meta.AffectedNodes, null, 2));
          const credentialInfo = parsedResponse.find((node: any) => 
            node.CreatedNode && node.CreatedNode.LedgerEntryType === "Credential"
          );
          
          return {
            success: true,
            credentialId: credentialInfo?.CreatedNode?.index
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const createPermissionedDomain = internalAction({
  args: {
    issuerSeed: v.string(),
    credentialType: v.string(),
    domainId: v.optional(v.string()),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    domainId: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.issuerSeed);

        // Convert credential type to hex if needed
        let credentialType = args.credentialType;
        if (!/^[0-9A-F]+$/i.test(credentialType)) {
          let hex = '';
          for (let i = 0; i < credentialType.length; i++) {
            const charCode = credentialType.charCodeAt(i);
            const hexCharCode = charCode.toString(16).padStart(2, '0');
            hex += hexCharCode;
          }
          credentialType = hex.toUpperCase();
        }

        // Create permissioned domain transaction
        const domainTx = {
          "TransactionType": "PermissionedDomainSet",
          "Account": wallet.address,
          "AcceptedCredentials": [
            {
              "Credential": {
                "Issuer": wallet.address,
                "CredentialType": credentialType
              }
            }
          ]
        };

        if (args.domainId) {
          domainTx.DomainID = args.domainId;
        }

        const prepared = await client.autofill(domainTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          let domainId;
          if (args.domainId) {
            domainId = args.domainId;
          } else {
            // Parse for domain info
            const parsedResponse = JSON.parse(JSON.stringify(result.result.meta.AffectedNodes, null, 2));
            const domainInfo = parsedResponse.find((node: any) => 
              node.CreatedNode && node.CreatedNode.LedgerEntryType === "PermissionedDomain"
            );
            domainId = domainInfo?.CreatedNode?.index;
          }
          
          return {
            success: true,
            domainId: domainId
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});
```

## Phase 4: Enhanced Error Handling

### 4.1 Create Error Handling Utility

**File**: `convex/utils/errorHandler.ts` (New file)

```typescript
import { v } from "convex/values";

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp: number;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  timestamp: number;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

export function createErrorResponse(
  error: string, 
  code?: string, 
  details?: any
): ErrorResponse {
  return {
    success: false,
    error,
    code,
    details,
    timestamp: Date.now()
  };
}

export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: Date.now()
  };
}

export function createHttpResponse<T>(
  response: ApiResponse<T>,
  status?: number
): Response {
  const httpStatus = response.success ? (status || 200) : (status || 400);
  
  return new Response(JSON.stringify(response), {
    status: httpStatus,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
```

## Implementation Checklist

### Immediate Actions (Today)
- [ ] Fix Xaman payload creation with proper options
- [ ] Fix Xaman payload verification with full status
- [ ] Create MPT authorization and sending functions
- [ ] Update router with MPT endpoints
- [ ] Test all endpoints with proper error handling

### Week 1
- [ ] Implement compliance credential creation
- [ ] Implement permissioned domain management
- [ ] Add comprehensive error handling
- [ ] Update all Convex functions with proper validation
- [ ] Add audit logging

### Week 2
- [ ] Implement comprehensive testing
- [ ] Add security enhancements
- [ ] Performance optimization
- [ ] Documentation updates
- [ ] Integration testing

### Week 3
- [ ] Advanced compliance features
- [ ] Reporting and analytics
- [ ] Multi-signature support
- [ ] Production deployment
- [ ] Monitoring and alerting

This implementation plan addresses all the critical issues identified in the comprehensive analysis and provides a clear roadmap for bringing the system into full compliance with Xaman and XRPL standards.

