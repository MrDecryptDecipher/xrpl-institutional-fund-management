import { action, query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Enhanced XRPL Client with advanced features
interface XRPLConnection {
  server: string;
  isConnected: boolean;
  lastPing: number;
  networkId: number;
}

const XRPL_NETWORKS = {
  mainnet: {
    servers: [
      "wss://xrplcluster.com",
      "wss://s1.ripple.com",
      "wss://s2.ripple.com"
    ],
    networkId: 0
  },
  testnet: {
    servers: [
      "wss://s.altnet.rippletest.net:51233",
      "wss://testnet.xrpl-labs.com"
    ],
    networkId: 1
  },
  devnet: {
    servers: [
      "wss://s.devnet.rippletest.net:51233"
    ],
    networkId: 2
  }
};

export const connectToXRPL = action({
  args: {
    network: v.union(
      v.literal("mainnet"),
      v.literal("testnet"),
      v.literal("devnet")
    ),
    preferredServer: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      const networkConfig = XRPL_NETWORKS[args.network];
      const server = args.preferredServer || networkConfig.servers[0];
      
      // Use the actual XRPL client for real connections
      const clientResult: any = await ctx.runAction(api.xrpl.client.initializeXRPLClient, {
        network: args.network
      });

      if (!clientResult.success) {
        throw new Error(clientResult.error || "Failed to connect to XRPL");
      }

      const connectionResult: any = {
        success: true,
        network: args.network,
        connection: {
          server: server,
          networkId: clientResult.serverInfo?.networkId || networkConfig.networkId,
          ledgerIndex: clientResult.serverInfo?.ledgerIndex || Math.floor(Math.random() * 1000000) + 80000000,
          serverVersion: clientResult.serverInfo?.serverVersion || "1.12.0",
          reserveBase: 10
        }
      };

      // Store connection status
      await ctx.runMutation(api.xrpl.enhanced_client.updateConnectionStatus, {
        network: args.network,
        server: server,
        isConnected: true,
        lastPing: Date.now(),
        networkId: connectionResult.connection.networkId
      });

      return connectionResult;
    } catch (error) {
      console.error("XRPL connection failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Connection failed"
      };
    }
  }
});

export const updateConnectionStatus = mutation({
  args: {
    network: v.string(),
    server: v.string(),
    isConnected: v.boolean(),
    lastPing: v.number(),
    networkId: v.number()
  },
  handler: async (ctx, args) => {
    // Check if connection status exists
    const existing = await ctx.db
      .query("xrplConnections")
      .filter(q => q.eq(q.field("network"), args.network))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        server: args.server,
        isConnected: args.isConnected,
        lastPing: args.lastPing,
        networkId: args.networkId
      });
    } else {
      await ctx.db.insert("xrplConnections", {
        network: args.network,
        server: args.server,
        isConnected: args.isConnected,
        lastPing: args.lastPing,
        networkId: args.networkId
      });
    }

    return { success: true };
  }
});

export const getXRPLStatus = query({
  args: {
    network: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (args.network) {
      const connection = await ctx.db
        .query("xrplConnections")
        .filter(q => q.eq(q.field("network"), args.network))
        .unique();
      
      return connection ? {
        network: connection.network,
        server: connection.server,
        isConnected: connection.isConnected,
        lastPing: connection.lastPing,
        networkId: connection.networkId
      } : null;
    }

    // Return all connections
    const connections = await ctx.db.query("xrplConnections").collect();
    return connections.map(conn => ({
      network: conn.network,
      server: conn.server,
      isConnected: conn.isConnected,
      lastPing: conn.lastPing,
      networkId: conn.networkId
    }));
  }
});

export const submitXRPLTransaction = action({
  args: {
    network: v.string(),
    transactionType: v.union(
      v.literal("Payment"),
      v.literal("TrustSet"),
      v.literal("OfferCreate"),
      v.literal("MPTokenIssuanceCreate"),
      v.literal("MPTokenAuthorize")
    ),
    account: v.string(),
    destination: v.optional(v.string()),
    amount: v.optional(v.union(v.string(), v.object({
      currency: v.string(),
      value: v.string(),
      issuer: v.string()
    }))),
    memos: v.optional(v.array(v.object({
      data: v.string(),
      format: v.optional(v.string()),
      type: v.optional(v.string())
    }))),
    fee: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Mock transaction submission - in production, use actual xrpl library
      const txHash = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const transactionResult = {
        success: true,
        hash: txHash,
        ledgerIndex: Math.floor(Math.random() * 1000) + 80000000,
        fee: args.fee || "12",
        result: "tesSUCCESS",
        submittedAt: Date.now(),
        validated: true
      };

      // Store transaction record
      await ctx.runMutation(api.xrpl.enhanced_client.storeTransactionRecord, {
        network: args.network,
        hash: txHash,
        transactionType: args.transactionType,
        account: args.account,
        destination: args.destination,
        amount: typeof args.amount === "string" ? args.amount : JSON.stringify(args.amount),
        fee: args.fee || "12",
        result: "tesSUCCESS",
        ledgerIndex: transactionResult.ledgerIndex,
        submittedAt: Date.now()
      });

      return transactionResult;
    } catch (error) {
      console.error("XRPL transaction submission failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Transaction failed"
      };
    }
  }
});

export const storeTransactionRecord = mutation({
  args: {
    network: v.string(),
    hash: v.string(),
    transactionType: v.string(),
    account: v.string(),
    destination: v.optional(v.string()),
    amount: v.optional(v.string()),
    fee: v.string(),
    result: v.string(),
    ledgerIndex: v.number(),
    submittedAt: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("xrplTransactions", {
      network: args.network,
      hash: args.hash,
      transactionType: args.transactionType,
      account: args.account,
      destination: args.destination,
      amount: args.amount,
      fee: args.fee,
      result: args.result,
      ledgerIndex: args.ledgerIndex,
      submittedAt: args.submittedAt,
      validated: true
    });
  }
});

export const getAccountInfo = action({
  args: {
    network: v.string(),
    account: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Mock account info - in production, query actual XRPL
      const accountInfo = {
        success: true,
        account: args.account,
        balance: (Math.random() * 10000 + 1000).toFixed(6),
        sequence: Math.floor(Math.random() * 1000) + 1,
        ownerCount: Math.floor(Math.random() * 10),
        reserve: "10000000",
        flags: 0,
        ledgerIndex: Math.floor(Math.random() * 1000) + 80000000
      };

      return accountInfo;
    } catch (error) {
      console.error("Failed to get account info:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get account info"
      };
    }
  }
});

export const getTransactionHistory = query({
  args: {
    network: v.optional(v.string()),
    account: v.optional(v.string()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("xrplTransactions");

    if (args.network) {
      query = query.filter(q => q.eq(q.field("network"), args.network));
    }

    if (args.account) {
      query = query.filter(q => 
        q.or(
          q.eq(q.field("account"), args.account),
          q.eq(q.field("destination"), args.account)
        )
      );
    }

    const transactions = await query
      .order("desc")
      .take(args.limit || 50);

    return transactions.map(tx => ({
      hash: tx.hash,
      transactionType: tx.transactionType,
      account: tx.account,
      destination: tx.destination,
      amount: tx.amount,
      fee: tx.fee,
      result: tx.result,
      ledgerIndex: tx.ledgerIndex,
      submittedAt: tx.submittedAt,
      validated: tx.validated
    }));
  }
});

export const monitorLedger = action({
  args: {
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Mock ledger monitoring - in production, subscribe to ledger stream
      const ledgerInfo = {
        success: true,
        ledgerIndex: Math.floor(Math.random() * 1000) + 80000000,
        ledgerHash: `ledger_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        closeTime: Date.now(),
        totalCoins: "99988000000000000",
        validatedLedgers: "32570-80000000",
        reserveBase: 10000000,
        reserveInc: 2000000
      };

      return ledgerInfo;
    } catch (error) {
      console.error("Ledger monitoring failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Ledger monitoring failed"
      };
    }
  }
});
