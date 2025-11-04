import { httpRouter, httpActionGeneric as httpAction } from "convex/server";
import { Client, Wallet, xrpToDrops } from 'xrpl';
import { internal } from "./_generated/api";

const http = httpRouter();

// Add Xumm SDK import for backend payload creation
import { Xumm } from 'xumm';

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

// HTTP endpoint for creating MPT tokens
http.route({
  path: "/api/create-mpt-token",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Connect to XRPL Testnet
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
      
      try {
        // Create wallet from seed
        const issuerWallet = Wallet.fromSeed(body.issuerSeed);
        
        // Prepare MPT metadata
        const metadataJson = JSON.stringify({
          name: body.metadata.name,
          symbol: body.metadata.symbol,
          description: body.metadata.description || "Institutional Fund Token",
          decimals: body.metadata.decimals,
          uri: body.metadata.uri || ""
        });
        
        const metadataHex = Buffer.from(metadataJson).toString('hex').toUpperCase();
        
        // Create MPTokenIssuanceCreate transaction
        const mptIssuanceCreate = {
          TransactionType: "MPTokenIssuanceCreate",
          Account: issuerWallet.address,
          AssetScale: body.metadata.decimals,
          MaximumAmount: body.metadata.totalSupply,
          TransferFee: body.transferFee || 0,
          MPTokenMetadata: metadataHex,
          Flags: body.flags || 0
        };
        
        // Autofill and sign transaction
        const prepared = await client.autofill(mptIssuanceCreate as any);
        const signed = issuerWallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);
        
        // Extract MPT ID from metadata
        let mptId = null;
        if (result.result.meta) {
          const meta = result.result.meta as any;
          if (meta.AffectedNodes) {
            for (const node of meta.AffectedNodes) {
              if (node.CreatedNode && node.CreatedNode.LedgerEntryType === "MPTokenIssuance") {
                mptId = node.CreatedNode.LedgerIndex;
                break;
              }
            }
          }
        }
        
        await client.disconnect();
        
        if (result.result.validated) {
          return new Response(JSON.stringify({
            success: true,
            mptId: mptId,
            txHash: result.result.hash,
            ledgerIndex: result.result.ledger_index,
            explorerUrl: `https://testnet.xrpl.org/transactions/${result.result.hash}`
          }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } else {
          throw new Error(`MPTokenIssuanceCreate failed: ${(result.result.meta as any)?.TransactionResult}`);
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// Simple test endpoint
http.route({
  path: "/api/test",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    return new Response(JSON.stringify({ success: true, message: "Test endpoint working!" }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        // Add CORS headers
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  })
});

// Environment variables test endpoint
http.route({
  path: "/api/test-env",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    return new Response(JSON.stringify({ 
      success: true, 
      VITE_XUMM_API_KEY: process.env.VITE_XUMM_API_KEY ? "SET" : "NOT SET",
      XUMM_API_SECRET: process.env.XUMM_API_SECRET ? "SET" : "NOT SET"
    }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        // Add CORS headers
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  })
});

// HTTP endpoint for executing transactions
http.route({
  path: "/api/execute-transaction",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Get API credentials from environment variables
      // These are available in the backend but not exposed to frontend
      const apiKey = process.env.VITE_XUMM_API_KEY;
      const apiSecret = process.env.XUMM_API_SECRET;
      
      console.log("API credentials check:", { 
        apiKey: apiKey ? "SET" : "NOT SET", 
        apiSecret: apiSecret ? "SET" : "NOT SET" 
      });
      
      if (!apiKey) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Xaman API key not configured" 
        }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            // Add CORS headers
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
      
      try {
        // Create a Payment transaction
        const transaction: any = {
          TransactionType: "Payment",
          Account: body.account,
          Amount: xrpToDrops(body.amount), // Convert XRP to drops
          Destination: body.recipient
        };
        
        console.log("Creating payload with transaction:", transaction);
        
        // Try to initialize Xumm SDK with error handling
        let xumm;
        try {
          console.log("Initializing Xumm SDK with API key and secret...");
          xumm = new Xumm(apiKey, apiSecret);
          console.log("Xumm SDK initialized successfully");
        } catch (initError) {
          console.error("Error initializing Xumm SDK:", initError);
          throw new Error("Failed to initialize Xumm SDK: " + (initError instanceof Error ? initError.message : "Unknown error"));
        }
        
        // Add error handling for the Xumm SDK
        xumm.on('error', (error) => {
          console.error('Xumm SDK error event:', error);
        });
        
        // Wait a bit for the SDK to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if payload service is available
        if (!xumm.payload) {
          throw new Error("Xumm payload service is not available after initialization");
        }
        
        console.log("Xumm payload service is available");
        
        // Create the payload using the Xumm SDK with timeout
        let payload;
        try {
          console.log("Creating payload...");
          const payloadPromise = xumm.payload.create(transaction);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Payload creation timeout')), 10000)
          );
          
          payload = await Promise.race([payloadPromise, timeoutPromise]);
          console.log("Payload created successfully");
        } catch (createError) {
          console.error("Error creating payload:", createError);
          throw new Error("Failed to create Xaman payload: " + (createError instanceof Error ? createError.message : "Unknown error"));
        }
        
        console.log("Payload created:", { 
          hasPayload: !!payload, 
          payloadType: typeof payload,
          payloadKeys: payload ? Object.keys(payload) : null
        });
        
        if (!payload) {
          throw new Error("Failed to create Xaman payload - empty response");
        }
        
        // Validate payload structure
        if (!payload.uuid || !payload.refs) {
          throw new Error("Payload missing required properties");
        }
        
        return new Response(JSON.stringify({
          success: true,
          amount: body.amount,
          recipient: body.recipient,
          transactionType: body.transactionType,
          uuid: payload.uuid, // The actual UUID from Xaman
          qrCodeUrl: payload.refs?.qr_png // QR code for signing
        }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            // Add CORS headers
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (error) {
        console.error("Error creating Xaman payload:", error);
        return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error creating payload" }), {
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            // Add CORS headers
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
    } catch (error) {
      console.error("Error in execute-transaction endpoint:", error);
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error in endpoint" }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// HTTP endpoint for creating permissioned domains
http.route({
  path: "/api/create-permissioned-domain",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Connect to XRPL Testnet
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
      
      try {
        // For XLS-80 Permissioned Domains, we would need to implement the proper transaction
        // This is a simplified example - in reality XLS-80 uses specific domain management transactions
        const domainId = `DOM${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        
        await client.disconnect();
        
        // In a real implementation, this would create an actual XRPL permissioned domain
        const result = {
          success: true,
          domainId: domainId,
          domainName: body.domainName,
          owner: body.owner,
          explorerUrl: `https://testnet.xrpl.org/accounts/${body.owner}`
        };
        
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// HTTP endpoint for creating governance proposals
http.route({
  path: "/api/create-governance-proposal",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // In a real implementation, this would create a governance proposal on XRPL
      // For now, we'll simulate the proposal creation
      const proposalId = `PROP${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      const result = {
        success: true,
        proposalId: proposalId,
        title: body.title,
        creator: body.creator,
        explorerUrl: `https://testnet.xrpl.org/accounts/${body.creator}`
      };
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// HTTP endpoint for submitting votes
http.route({
  path: "/api/submit-vote",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // In a real implementation, this would submit a vote on XRPL
      // For now, we'll simulate the vote submission
      const result = {
        success: true,
        proposalId: body.proposalId,
        voter: body.voter,
        vote: body.vote,
        explorerUrl: `https://testnet.xrpl.org/accounts/${body.voter}`
      };
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// HTTP endpoint for generating reports
http.route({
  path: "/api/generate-report",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // In a real implementation, this would generate a report
      // For now, we'll simulate the report generation
      const reportId = `REP${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      const result = {
        success: true,
        reportId: reportId,
        requester: body.requester,
        reportType: body.reportType,
        explorerUrl: `https://testnet.xrpl.org/accounts/${body.requester}`
      };
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// HTTP endpoint for downloading reports
http.route({
  path: "/api/download-report",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      // In a real implementation, this would retrieve the report from storage
      // For now, we'll return a mock PDF
      const reportContent = "Mock report content";
      const buffer = Buffer.from(reportContent, 'utf-8');
      
      return new Response(buffer, {
        status: 200,
        headers: { 
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=report.pdf",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// HTTP endpoint for creating DIDs
http.route({
  path: "/api/create-did",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Connect to XRPL Testnet
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
      
      try {
        // Create DID document
        const didDocument = {
          "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/v1"
          ],
          id: `did:xrpl:testnet:${body.account}`,
          controller: body.account
        };
        
        const didDocumentStr = JSON.stringify(didDocument);
        const documentBuffer = Buffer.from(didDocumentStr, 'utf8');
        
        // Create DIDSet transaction
        const didSetTransaction = {
          TransactionType: "DIDSet",
          Account: body.account,
          DIDDocument: documentBuffer.toString('hex').toUpperCase()
        };
        
        // Prepare the transaction
        const prepared = await client.autofill(didSetTransaction as any);
        
        await client.disconnect();
        
        // Instead of returning the transaction for signing, we'll create a Xaman payload
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
        
        // Initialize Xumm SDK with both credentials (only safe in backend)
        const xumm = new Xumm(apiKey, apiSecret);
        
        // Create a payload for the DIDSet transaction
        const payload = await xumm.payload?.create({
          txjson: prepared
        });
        
        if (!payload) {
          throw new Error("Failed to create Xaman payload");
        }
        
        return new Response(JSON.stringify({
          success: true,
          didId: `did:xrpl:testnet:${body.account}`,
          account: body.account,
          payloadUuid: payload.uuid,
          qrCodeUrl: payload.refs?.qr_png,
          explorerUrl: `https://testnet.xrpl.org/accounts/${body.account}`
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  })
});

// HTTP endpoint for creating Xaman payloads
http.route({
  path: "/api/create-xaman-payload",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Get API credentials from environment variables
      // These are available in the backend but not exposed to frontend
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
      
      // Initialize Xumm SDK with both credentials (only safe in backend)
      const xumm = new Xumm(apiKey, apiSecret);
      
      try {
        // Create the payload based on the transaction type
        const payloadData = {
          TransactionType: body.transactionType || 'SignIn',
          // Add any additional transaction data from the body
          ...body.transactionData
        };
        
        // Create the payload using the Xumm SDK
        const payload: any = await xumm.payload?.create(payloadData);
        
        if (!payload) {
          throw new Error("Failed to create Xaman payload");
        }
        
        // Return the payload data to the frontend
        return new Response(JSON.stringify({
          success: true,
          uuid: payload.uuid,
          refs: payload.refs,
          pushed: payload.pushed,
          next: payload.next
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Error creating Xaman payload:", error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error creating Xaman payload" 
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (error) {
      console.error("Error in create-xaman-payload endpoint:", error);
      return new Response(JSON.stringify({ 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
    }
  })
});

// Add missing endpoints that TestSprite tests expect
// These endpoints should match the API documentation in the code summary

// Fund Management Endpoints
http.route({
  path: "/funds",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      // Get funds from the database
      const funds = await ctx.runQuery(internal.funds.list.list, {});
      
      return new Response(JSON.stringify({
        success: true,
        data: funds,
        count: funds.length
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
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
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

http.route({
  path: "/funds",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Create fund in the database
      const fundId = await ctx.runMutation(internal.funds.create.create, body);
      
      return new Response(JSON.stringify({
        success: true,
        fundId: fundId,
        message: "Fund created successfully"
      }), {
        status: 201,
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

// XRPL Integration Endpoints
http.route({
  path: "/xrpl/transaction",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Connect to XRPL and submit transaction
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
      
      try {
        const result = await client.submitAndWait(body.transaction);
        await client.disconnect();
        
        return new Response(JSON.stringify({
          success: true,
          transactionHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          validated: result.result.validated
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
        await client.disconnect();
        throw error;
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

http.route({
  path: "/xrpl/balance",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const url = new URL(req.url);
      const account = url.searchParams.get('account');
      
      if (!account) {
        return new Response(JSON.stringify({
          success: false,
          error: "Account parameter is required"
        }), {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
      
      // Connect to XRPL and get account balance
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
      
      try {
        const accountInfo = await client.request({
          command: "account_info",
          account: account
        });
        
        await client.disconnect();
        
        return new Response(JSON.stringify({
          success: true,
          account: account,
          balance: accountInfo.result.account_data.Balance,
          ledgerIndex: accountInfo.result.ledger_index
        }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (error) {
        await client.disconnect();
        throw error;
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
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// Xaman Wallet Integration Endpoints
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
        // Validate required fields
        if (!body.transaction) {
          return new Response(JSON.stringify({
            success: false,
            error: "Transaction is required"
          }), {
            status: 400,
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }

        // Create comprehensive payload with proper options following Xaman documentation
        const payloadData = {
          txjson: body.transaction,
          options: {
            return_url: {
              app: body.returnUrl?.app || `${process.env.FRONTEND_URL || 'http://localhost:5002'}/callback?txid={txid}&id={id}`,
              web: body.returnUrl?.web || `${process.env.FRONTEND_URL || 'http://localhost:5002'}/callback?txid={txid}&id={id}`
            },
            force_network: body.network || "TESTNET",
            submit: true,
            multisign: false,
            expire: body.expire || 1440, // 24 hours in minutes
            signers: body.signers || []
          },
          custom_meta: {
            identifier: body.identifier || `fund-${Date.now()}`,
            instruction: body.instruction || "Please sign this transaction to proceed with the fund management operation",
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

// Compliance Credential Creation Endpoint
http.route({
  path: "/compliance/credential/create",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      const result = await ctx.runAction(internal["compliance/credentials"].createCredential, body);
      
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

// Compliance Domain Creation Endpoint
http.route({
  path: "/compliance/domain/create",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      const result = await ctx.runAction(internal["compliance/credentials"].createPermissionedDomain, body);
      
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

// Investor Management Endpoints
http.route({
  path: "/investors",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      // Get investors from the database
      const investors = await ctx.runQuery(internal.investors.list.list, {});
      
      return new Response(JSON.stringify({
        success: true,
        data: investors,
        count: investors.length
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
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
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

http.route({
  path: "/investors",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Create investor in the database
      const investorId = await ctx.runMutation(internal.investors.create.create, body);
      
      return new Response(JSON.stringify({
        success: true,
        investorId: investorId,
        message: "Investor registered successfully"
      }), {
        status: 201,
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

// Compliance Endpoints
http.route({
  path: "/compliance/check",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Run compliance check
      const complianceResult = await ctx.runAction(internal["compliance/check"] as any, body);
      
      return new Response(JSON.stringify({
        success: true,
        result: complianceResult,
        message: "Compliance check completed"
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

// Portfolio Management Endpoints
http.route({
  path: "/portfolio/rebalance",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();
      
      // Rebalance portfolio
      const rebalanceResult = await ctx.runAction(internal.funds.portfolio.rebalance, body);
      
      return new Response(JSON.stringify({
        success: true,
        result: rebalanceResult,
        message: "Portfolio rebalancing completed"
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

// Simple test endpoint for Xumm SDK
http.route({
  path: "/api/test-xumm",
  method: "GET",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
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
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }

      // Initialize Xumm SDK
      const xumm = new Xumm(apiKey, apiSecret);

      // Test ping
      try {
        const pingResult = await xumm.ping();
        return new Response(JSON.stringify({
          success: true,
          ping: pingResult,
          xummInstance: {
            hasPayload: !!xumm.payload,
            payloadType: typeof xumm.payload
          }
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      } catch (pingError) {
        return new Response(JSON.stringify({
          success: false,
          error: pingError instanceof Error ? pingError.message : "Unknown ping error",
          xummInstance: {
            hasPayload: !!xumm.payload,
            payloadType: typeof xumm.payload
          }
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
    } catch (error) {
      console.error("Error in test-xumm endpoint:", error);
      return new Response(JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
  })
});

// Xaman User Token Management Endpoints
http.route({
  path: "/api/xaman/store-user-token",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();

      if (!body.xrplAccount || !body.userToken) {
        return new Response(JSON.stringify({
          success: false,
          error: "xrplAccount and userToken are required"
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }

      // Store user token in Convex database
      const result = await ctx.runMutation(internal.users.storeXamanUserToken, {
        xrplAccount: body.xrplAccount,
        userToken: body.userToken,
      });

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    } catch (error) {
      console.error("Error storing Xaman user token:", error);
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

http.route({
  path: "/api/xaman/get-user-token",
  method: "POST",
  handler: httpAction(async (ctx: any, req: any) => {
    try {
      const body = await req.json();

      if (!body.xrplAccount) {
        return new Response(JSON.stringify({
          success: false,
          error: "xrplAccount is required"
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }

      // Get user token from Convex database
      const tokenData = await ctx.runQuery(internal.users.getXamanUserToken, {
        xrplAccount: body.xrplAccount,
      });

      return new Response(JSON.stringify({
        success: true,
        tokenData: tokenData
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
      console.error("Error getting Xaman user token:", error);
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

export default http;