import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Advanced Multi-Purpose Token (MPT) Management
// Implements XLS-33 and XLS-89 specifications

export const createMPToken = action({
  args: {
    fundId: v.optional(v.id("funds")),
    assetId: v.optional(v.id("assets")),
    tokenConfig: v.object({
      flags: v.number(),
      transferFee: v.number(),
      maxSupply: v.optional(v.string()),
      metadata: v.object({
        name: v.string(),
        symbol: v.string(),
        description: v.string(),
        image: v.optional(v.string()),
        externalUrl: v.optional(v.string()),
        attributes: v.array(v.object({
          traitType: v.string(),
          value: v.string()
        }))
      })
    }),
    issuerAccount: v.string(),
    network: v.string(),
    requiresAuthorization: v.boolean(),
    jurisdictionRestrictions: v.array(v.string()),
    investorTypeRestrictions: v.array(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Generate unique token ID
      const tokenId = `mpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare MPTokenIssuanceCreate transaction
      const mptTransaction = {
        TransactionType: "MPTokenIssuanceCreate",
        Account: args.issuerAccount,
        MPTokenIssuanceID: tokenId,
        Flags: args.tokenConfig.flags,
        TransferFee: args.tokenConfig.transferFee,
        MaximumAmount: args.tokenConfig.maxSupply,
        MPTokenMetadata: Buffer.from(JSON.stringify(args.tokenConfig.metadata)).toString('hex').toUpperCase()
      };

      // Submit to XRPL
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceCreate",
        account: args.issuerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId,
            fundId: args.fundId,
            assetId: args.assetId,
            metadata: args.tokenConfig.metadata
          })).toString('hex').toUpperCase(),
          type: Buffer.from("fund_token_creation").toString('hex').toUpperCase(),
          format: Buffer.from("application/json").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT creation failed: ${txResult.error}`);
      }

      // Store token record
      await ctx.runMutation(api.xrpl.mpt_advanced.storeMPToken, {
        tokenId,
        fundId: args.fundId,
        assetId: args.assetId,
        flags: args.tokenConfig.flags,
        transferFee: args.tokenConfig.transferFee,
        maxSupply: args.tokenConfig.maxSupply,
        outstandingAmount: "0",
        metadata: args.tokenConfig.metadata,
        authorizedHolders: [],
        requiresAuthorization: args.requiresAuthorization,
        jurisdictionRestrictions: args.jurisdictionRestrictions,
        investorTypeRestrictions: args.investorTypeRestrictions,
        issuer: args.issuerAccount,
        createdLedger: txResult.ledgerIndex,
        status: "active"
      });

      return {
        success: true,
        tokenId,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("MPT creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Token creation failed"
      };
    }
  }
});

export const storeMPToken = mutation({
  args: {
    tokenId: v.string(),
    fundId: v.optional(v.id("funds")),
    assetId: v.optional(v.id("assets")),
    flags: v.number(),
    transferFee: v.number(),
    maxSupply: v.optional(v.string()),
    outstandingAmount: v.string(),
    metadata: v.object({
      name: v.string(),
      symbol: v.string(),
      description: v.string(),
      image: v.optional(v.string()),
      externalUrl: v.optional(v.string()),
      attributes: v.array(v.object({
        traitType: v.string(),
        value: v.string()
      }))
    }),
    authorizedHolders: v.array(v.string()),
    requiresAuthorization: v.boolean(),
    jurisdictionRestrictions: v.array(v.string()),
    investorTypeRestrictions: v.array(v.string()),
    issuer: v.string(),
    createdLedger: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("frozen"),
      v.literal("clawback_enabled"),
      v.literal("retired")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mptTokens", {
      tokenId: args.tokenId,
      fundId: args.fundId,
      assetId: args.assetId,
      flags: args.flags,
      transferFee: args.transferFee,
      maxSupply: args.maxSupply,
      outstandingAmount: args.outstandingAmount,
      metadata: args.metadata,
      authorizedHolders: args.authorizedHolders,
      requiresAuthorization: args.requiresAuthorization,
      jurisdictionRestrictions: args.jurisdictionRestrictions,
      investorTypeRestrictions: args.investorTypeRestrictions,
      issuer: args.issuer,
      createdLedger: args.createdLedger,
      lastModified: Date.now(),
      status: args.status
    });
  }
});

export const authorizeMPTokenHolder = action({
  args: {
    tokenId: v.string(),
    holderAccount: v.string(),
    issuerAccount: v.string(),
    network: v.string(),
    authorize: v.boolean()
  },
  handler: async (ctx, args) => {
    try {
      // Submit MPTokenAuthorize transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenAuthorize",
        account: args.issuerAccount,
        destination: args.holderAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            action: args.authorize ? "authorize" : "unauthorize",
            holder: args.holderAccount
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_authorization").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT authorization failed: ${txResult.error}`);
      }

      // Update token record
      await ctx.runMutation(api.xrpl.mpt_advanced.updateMPTokenAuthorization, {
        tokenId: args.tokenId,
        holderAccount: args.holderAccount,
        authorize: args.authorize
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("MPT authorization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authorization failed"
      };
    }
  }
});

export const updateMPTokenAuthorization = mutation({
  args: {
    tokenId: v.string(),
    holderAccount: v.string(),
    authorize: v.boolean()
  },
  handler: async (ctx, args) => {
    const token = await ctx.db
      .query("mptTokens")
      .filter(q => q.eq(q.field("tokenId"), args.tokenId))
      .unique();

    if (!token) {
      throw new Error("Token not found");
    }

    let authorizedHolders = [...token.authorizedHolders];
    
    if (args.authorize) {
      if (!authorizedHolders.includes(args.holderAccount)) {
        authorizedHolders.push(args.holderAccount);
      }
    } else {
      authorizedHolders = authorizedHolders.filter(holder => holder !== args.holderAccount);
    }

    await ctx.db.patch(token._id, {
      authorizedHolders,
      lastModified: Date.now()
    });

    return { success: true };
  }
});

export const clawbackMPToken = action({
  args: {
    tokenId: v.string(),
    fromAccount: v.string(),
    amount: v.string(),
    issuerAccount: v.string(),
    network: v.string(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit clawback transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Clawback",
        account: args.issuerAccount,
        amount: {
          currency: args.tokenId,
          value: args.amount,
          issuer: args.issuerAccount
        },
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            reason: args.reason,
            clawbackFrom: args.fromAccount,
            amount: args.amount
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_clawback").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT clawback failed: ${txResult.error}`);
      }

      // Log clawback event
      await ctx.runMutation(api.xrpl.mpt_advanced.logClawbackEvent, {
        tokenId: args.tokenId,
        fromAccount: args.fromAccount,
        amount: args.amount,
        reason: args.reason,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("MPT clawback failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Clawback failed"
      };
    }
  }
});

export const logClawbackEvent = mutation({
  args: {
    tokenId: v.string(),
    fromAccount: v.string(),
    amount: v.string(),
    reason: v.string(),
    txHash: v.string(),
    ledgerIndex: v.number()
  },
  handler: async (ctx, args) => {
    const eventId = `clawback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return await ctx.db.insert("auditLogs", {
      eventId,
      eventType: "mpt_clawback",
      entityType: "mptToken",
      entityId: args.tokenId,
      action: "clawback",
      actor: "system",
      timestamp: Date.now(),
      changes: {
        fromAccount: args.fromAccount,
        amount: args.amount,
        reason: args.reason
      },
      xrplTxHash: args.txHash,
      xrplLedgerIndex: args.ledgerIndex,
      complianceRules: ["clawback_authority"],
      jurisdictions: [],
      hash: Buffer.from(`${eventId}_${args.txHash}_${Date.now()}`).toString('hex')
    });
  }
});

export const getMPTokenInfo = query({
  args: {
    tokenId: v.string()
  },
  handler: async (ctx, args) => {
    const token = await ctx.db
      .query("mptTokens")
      .filter(q => q.eq(q.field("tokenId"), args.tokenId))
      .unique();

    if (!token) {
      return null;
    }

    // Get associated fund/asset info
    let fundInfo = null;
    let assetInfo = null;

    if (token.fundId) {
      fundInfo = await ctx.db.get(token.fundId);
    }

    if (token.assetId) {
      assetInfo = await ctx.db.get(token.assetId);
    }

    return {
      ...token,
      fund: fundInfo,
      asset: assetInfo
    };
  }
});

export const listMPTokensByFund = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mptTokens")
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .collect();
  }
});

export const updateMPTokenMetadata = action({
  args: {
    tokenId: v.string(),
    metadata: v.object({
      name: v.string(),
      symbol: v.string(),
      description: v.string(),
      image: v.optional(v.string()),
      externalUrl: v.optional(v.string()),
      attributes: v.array(v.object({
        traitType: v.string(),
        value: v.string()
      }))
    }),
    issuerAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit metadata update transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceSet",
        account: args.issuerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            metadata: args.metadata,
            action: "update_metadata"
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_metadata_update").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Metadata update failed: ${txResult.error}`);
      }

      // Update database record
      const token = await ctx.db
        .query("mptTokens")
        .filter(q => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        await ctx.db.patch(token._id, {
          metadata: args.metadata,
          lastModified: Date.now()
        });
      }

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Metadata update failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Metadata update failed"
      };
    }
  }
});

export const freezeMPToken = action({
  args: {
    tokenId: v.string(),
    issuerAccount: v.string(),
    network: v.string(),
    freeze: v.boolean(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit freeze/unfreeze transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceSet",
        account: args.issuerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            action: args.freeze ? "freeze" : "unfreeze",
            reason: args.reason
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_freeze").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Token ${args.freeze ? 'freeze' : 'unfreeze'} failed: ${txResult.error}`);
      }

      // Update token status
      const token = await ctx.db
        .query("mptTokens")
        .filter(q => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        await ctx.db.patch(token._id, {
          status: args.freeze ? "frozen" : "active",
          lastModified: Date.now()
        });
      }

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Token freeze operation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Freeze operation failed"
      };
    }
  }
});
