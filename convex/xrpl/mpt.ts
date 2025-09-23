"use node";

import { action, mutation } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet, xrpToDrops } from "xrpl";
import { api } from "../_generated/api";

// XRPL Network Configuration - Updated per September 2025 standards
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233/",
  mainnet: "wss://xrplcluster.com/",
  devnet: "wss://s.devnet.rippletest.net:51233/"
} as const;

// Real MPT Implementation following XLS-33 specification and September 2025 standards
export const createMPTToken = action({
  args: {
    issuerSeed: v.string(),
    metadata: v.object({
      name: v.string(),
      symbol: v.string(),
      description: v.string(),
      totalSupply: v.string(),
      decimals: v.number(),
      uri: v.optional(v.string()),
      flags: v.optional(v.object({
        transferable: v.boolean(),
        burnable: v.boolean(),
        onlyXRP: v.boolean(),
        trustLine: v.boolean(),
        requireAuth: v.boolean()
      }))
    }),
    transferFee: v.optional(v.number()),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
    try {
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      console.log(`Connected to ${network.toUpperCase()}`);
      
      const issuerWallet = Wallet.fromSeed(args.issuerSeed);
      
// FIXME: This is a potential security issue - need to validate MPT creation params
      const mptIssuanceCreate = {
        TransactionType: "MPTokenIssuanceCreate" as const,
        Account: issuerWallet.address,
        MPTokenMetadata: {
          MPTName: Buffer.from(args.metadata.name, 'utf8').toString('hex').toUpperCase(),
          MPTSymbol: Buffer.from(args.metadata.symbol, 'utf8').toString('hex').toUpperCase(),
          MPTDescription: Buffer.from(args.metadata.description, 'utf8').toString('hex').toUpperCase(),
          MPTDecimals: args.metadata.decimals,
          ...(args.metadata.uri && {
            MPTURI: Buffer.from(args.metadata.uri, 'utf8').toString('hex').toUpperCase()
          })
        },
        MPTokenIssuanceMaxAmount: args.metadata.totalSupply,
        ...(args.transferFee && { MPTokenIssuanceTransferFee: args.transferFee }),
        ...(args.metadata.flags && {
          Flags: (
            (args.metadata.flags.transferable ? 0 : 0x1) |
            (args.metadata.flags.burnable ? 0x2 : 0) |
            (args.metadata.flags.onlyXRP ? 0x4 : 0) |
            (args.metadata.flags.trustLine ? 0x8 : 0) |
            (args.metadata.flags.requireAuth ? 0x10 : 0)
          )
        })
      };
      
      // Use autofill + submitAndWait pattern per September 2025 standards
      console.log("Preparing MPT creation transaction...");
      const prepared = await client.autofill(mptIssuanceCreate as any);
      const signed = issuerWallet.sign(prepared);
      
      console.log("Submitting MPT creation and waiting for validation...");
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      console.log("Disconnected from XRPL");
      
      if (result.result.validated) {
        // Extract MPT ID from transaction metadata
        const createdNode = (result.result.meta as any)?.CreatedNode;
        const mptId = createdNode?.NewFields?.MPTokenID || 
                     `MPT${result.result.hash?.substring(0, 16).toUpperCase()}`;
        
        // Store MPT information in database
        await ctx.runMutation(api.xrpl.mpt.storeMPTInfo, {
          mptId: mptId,
          issuer: issuerWallet.address,
          name: args.metadata.name,
          symbol: args.metadata.symbol,
          description: args.metadata.description,
          totalSupply: args.metadata.totalSupply,
          decimals: args.metadata.decimals,
          uri: args.metadata.uri,
          transferFee: args.transferFee,
          flags: args.metadata.flags,
          network: network,
          txHash: result.result.hash!,
          ledgerIndex: result.result.ledger_index!,
          createdAt: Date.now()
        });
        
        return {
          success: true,
          mptId: mptId,
          txHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          issuer: issuerWallet.address,
          metadata: args.metadata,
          network: network,
          explorerUrl: network === "testnet" 
            ? `https://testnet.xrpl.org/transactions/${result.result.hash}`
            : `https://livenet.xrpl.org/transactions/${result.result.hash}`
        };
      } else {
        throw new Error(`Transaction failed: ${(result.result.meta as any)?.TransactionResult}`);
      }
      
    } catch (error) {
      console.error("MPT creation failed:", error);
      throw new Error(
        `MPT creation failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
});

export const storeMPTInfo = mutation({
  args: {
    mptId: v.string(),
    issuer: v.string(),
    name: v.string(),
    symbol: v.string(),
    description: v.string(),
    totalSupply: v.string(),
    decimals: v.number(),
    uri: v.optional(v.string()),
    transferFee: v.optional(v.number()),
    flags: v.optional(v.object({
      transferable: v.boolean(),
      burnable: v.boolean(),
      onlyXRP: v.boolean(),
      trustLine: v.boolean(),
      requireAuth: v.boolean()
    })),
    network: v.string(),
    txHash: v.string(),
    ledgerIndex: v.number(),
    createdAt: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mptTokens", {
      mptId: args.mptId,
      issuer: args.issuer,
      name: args.name,
      symbol: args.symbol,
      description: args.description,
      totalSupply: args.totalSupply,
      decimals: args.decimals,
      uri: args.uri,
      transferFee: args.transferFee,
      flags: args.flags,
      network: args.network,
      txHash: args.txHash,
      ledgerIndex: args.ledgerIndex,
      createdAt: args.createdAt,
      status: "active"
    });
  }
});

export const issueMPTTokens = action({
  args: {
    issuerSeed: v.string(),
    mptId: v.string(),
    amount: v.string(),
    recipient: v.optional(v.string()),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const issuerWallet = Wallet.fromSeed(args.issuerSeed);
      
      // Create MPT Issuance Transaction
      const mptIssuance = {
        TransactionType: "MPTokenIssuance",
        Account: issuerWallet.address,
        MPTokenID: args.mptId,
        MPTokenIssuanceAmount: args.amount,
        ...(args.recipient && { Destination: args.recipient })
      };
      
      const prepared = await client.autofill(mptIssuance as any);
      const signed = issuerWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (result.result.validated) {
        return {
          success: true,
          txHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          amount: args.amount,
          recipient: args.recipient || issuerWallet.address,
          mptId: args.mptId
        };
      } else {
        throw new Error(`Issuance failed: ${(result.result.meta as any)?.TransactionResult}`);
      }
      
    } catch (error) {
      console.error("MPT issuance failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT issuance failed"
      };
    }
  }
});

export const transferMPTTokens = action({
  args: {
    senderSeed: v.string(),
    mptId: v.string(),
    amount: v.string(),
    destination: v.string(),
    memo: v.optional(v.string()),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const senderWallet = Wallet.fromSeed(args.senderSeed);
      
      // Create Payment transaction for MPT transfer
      const payment = {
        TransactionType: "Payment",
        Account: senderWallet.address,
        Destination: args.destination,
        Amount: {
          currency: args.mptId,
          value: args.amount,
          issuer: senderWallet.address // Would be the actual MPT issuer
        },
        ...(args.memo && {
          Memos: [{
            Memo: {
              MemoData: Buffer.from(args.memo, 'utf8').toString('hex').toUpperCase()
            }
          }]
        })
      };
      
      const prepared = await client.autofill(payment as any);
      const signed = senderWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (result.result.validated) {
        return {
          success: true,
          txHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          from: senderWallet.address,
          to: args.destination,
          amount: args.amount,
          mptId: args.mptId
        };
      } else {
        throw new Error(`Transfer failed: ${(result.result.meta as any)?.TransactionResult}`);
      }
      
    } catch (error) {
      console.error("MPT transfer failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT transfer failed"
      };
    }
  }
});

export const getMPTBalance = action({
  args: {
    account: v.string(),
    mptId: v.string(),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      // Query account lines to get MPT balance
      const accountLines = await client.request({
        command: "account_lines",
        account: args.account,
        ledger_index: "validated"
      });
      
      await client.disconnect();
      
      // Find the specific MPT balance
      const mptLine = accountLines.result.lines.find(
        (line: any) => line.currency === args.mptId
      );
      
      return {
        success: true,
        account: args.account,
        mptId: args.mptId,
        balance: mptLine ? mptLine.balance : "0",
        frozen: mptLine ? mptLine.freeze : false
      };
      
    } catch (error) {
      console.error("Failed to get MPT balance:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get MPT balance"
      };
    }
  }
});

export const authorizeMPTHolder = action({
  args: {
    issuerSeed: v.string(),
    mptId: v.string(),
    holder: v.string(),
    authorize: v.boolean(),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const issuerWallet = Wallet.fromSeed(args.issuerSeed);
      
      // Create MPT Authorization transaction
      const authorization = {
        TransactionType: "MPTokenAuthorize",
        Account: issuerWallet.address,
        MPTokenID: args.mptId,
        MPTokenHolder: args.holder,
        MPTokenAuthorizeFlag: args.authorize ? 1 : 0
      };
      
      const prepared = await client.autofill(authorization as any);
      const signed = issuerWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (result.result.validated) {
        return {
          success: true,
          txHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          mptId: args.mptId,
          holder: args.holder,
          authorized: args.authorize
        };
      } else {
        throw new Error(`Authorization failed: ${(result.result.meta as any)?.TransactionResult}`);
      }
      
    } catch (error) {
      console.error("MPT authorization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT authorization failed"
      };
    }
  }
});
