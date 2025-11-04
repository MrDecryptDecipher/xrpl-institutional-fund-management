import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Advanced Multi-Purpose Token (MPT) Management
// Implements XLS-33 and XLS-89 specifications

const createMPTokenArgs: any = {
  fundId: v.any(),
  assetId: v.any(),
  tokenConfig: v.any(),
  issuerAccount: v.string(),
  network: v.string(),
  requiresAuthorization: v.boolean(),
  jurisdictionRestrictions: v.any(),
  investorTypeRestrictions: v.any()
};

export const createMPToken = action({
  args: createMPTokenArgs,
  handler: async (ctx, args: any) => {
    try {
      // Generate unique token ID
      const tokenId = `mpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Submit to XRPL
      const txResult: any = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
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
        symbol: args.tokenConfig.metadata.symbol,
        metadata: args.tokenConfig.metadata,
        authorizedHolders: [],
        requiresAuthorization: args.requiresAuthorization,
        jurisdictionRestrictions: args.jurisdictionRestrictions,
        investorTypeRestrictions: args.investorTypeRestrictions,
        issuer: args.issuerAccount,
        createdLedger: txResult.ledgerIndex,
        status: "active"
      });

      // Return a simple object to avoid deep type instantiation
      return {
        success: true,
        tokenId,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error: any) {
      console.error("MPT creation failed:", error);
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Token creation failed"
      };
    }
  }
});

const storeMPTokenArgs: any = {
  tokenId: v.any(),
  fundId: v.any(),
  assetId: v.any(),
  flags: v.any(),
  transferFee: v.any(),
  maxSupply: v.any(),
  outstandingAmount: v.any(),
  symbol: v.any(),
  metadata: v.any(),
  authorizedHolders: v.any(),
  requiresAuthorization: v.any(),
  jurisdictionRestrictions: v.any(),
  investorTypeRestrictions: v.any(),
  issuer: v.any(),
  createdLedger: v.any(),
  status: v.any()
};

export const storeMPToken = mutation({
  args: storeMPTokenArgs,
  handler: async (ctx, args: any) => {
    try {
      await ctx.db.insert("mptTokens", {
        tokenId: args.tokenId,
        fundId: args.fundId,
        assetId: args.assetId,
        flags: args.flags,
        transferFee: args.transferFee,
        maxSupply: args.maxSupply,
        outstandingAmount: args.outstandingAmount,
        symbol: args.symbol,
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
      
      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Store MPT token failed"
      };
    }
  }
});

const authorizeMPTokenHolderArgs: any = {
  tokenId: v.any(),
  holderAccount: v.any(),
  issuerAccount: v.any(),
  network: v.any(),
  authorize: v.any()
};

export const authorizeMPTokenHolder = action({
  args: authorizeMPTokenHolderArgs,
  handler: async (ctx, args: any) => {
    try {
      // Submit MPTokenAuthorize transaction
      const txResult: any = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenAuthorize",
        account: args.issuerAccount,
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

      // Return a simple object to avoid deep type instantiation
      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error: any) {
      console.error("MPT authorization failed:", error);
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authorization failed"
      };
    }
  }
});

const updateMPTokenAuthorizationArgs: any = {
  tokenId: v.any(),
  holderAccount: v.any(),
  authorize: v.any()
};

export const updateMPTokenAuthorization = mutation({
  args: updateMPTokenAuthorizationArgs,
  handler: async (ctx, args: any) => {
    try {
      const token: any = await ctx.db
        .query("mptTokens")
        .filter((q: any) => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        const authorizedHolders = token.authorizedHolders || [];
        const updatedHolders = args.authorize
          ? [...authorizedHolders, args.holderAccount]
          : authorizedHolders.filter((holder: string) => holder !== args.holderAccount);

        await ctx.db.patch(token._id, {
          authorizedHolders: updatedHolders,
          lastModified: Date.now()
        });
      }

      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update MPT token authorization failed"
      };
    }
  }
});

const lockMPTokenIssuanceArgs: any = {
  tokenId: v.any(),
  issuerAccount: v.any(),
  network: v.any(),
  lock: v.any()
};

export const lockMPTokenIssuance = action({
  args: lockMPTokenIssuanceArgs,
  handler: async (ctx, args: any) => {
    try {
      // Submit MPTokenIssuanceSet transaction to lock/unlock
      const txResult: any = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceSet",
        account: args.issuerAccount,
        mptokenIssuanceId: args.tokenId,
        flags: args.lock ? 0x00000002 : 0x00000000, // lsfMPTLocked flag
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            action: args.lock ? "lock" : "unlock"
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_lock_status").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT lock status update failed: ${txResult.error}`);
      }

      // Update token record
      await ctx.runMutation(api.xrpl.mpt_advanced.updateMPTokenLockStatus, {
        tokenId: args.tokenId,
        locked: args.lock
      });

      // Return a simple object to avoid deep type instantiation
      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error: any) {
      console.error("MPT lock status update failed:", error);
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Lock status update failed"
      };
    }
  }
});

const updateMPTokenLockStatusArgs: any = {
  tokenId: v.any(),
  locked: v.any()
};

export const updateMPTokenLockStatus = mutation({
  args: updateMPTokenLockStatusArgs,
  handler: async (ctx, args: any) => {
    try {
      const token: any = await ctx.db
        .query("mptTokens")
        .filter((q: any) => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        // Update status based on lock status
        let newStatus = token.status;
        if (args.locked && token.status === "active") {
          newStatus = "locked";
        } else if (!args.locked && token.status === "locked") {
          newStatus = "active";
        }

        await ctx.db.patch(token._id, {
          status: newStatus,
          lastModified: Date.now()
        });
      }

      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update MPT token lock status failed"
      };
    }
  }
});

const clawbackMPTokensArgs: any = {
  tokenId: v.any(),
  issuerAccount: v.any(),
  holderAccount: v.any(),
  network: v.any(),
  amount: v.any()
};

export const clawbackMPTokens = action({
  args: clawbackMPTokensArgs,
  handler: async (ctx, args: any) => {
    try {
      // Submit Payment transaction with MPT amount for clawback
      const txResult: any = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.issuerAccount,
        destination: args.holderAccount,
        amount: {
          mpt_issuance_id: args.tokenId,
          value: `-${args.amount}` // Negative amount for clawback
        },
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            action: "clawback",
            amount: args.amount,
            holder: args.holderAccount
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_clawback").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT clawback failed: ${txResult.error}`);
      }

      // Update token record
      await ctx.runMutation(api.xrpl.mpt_advanced.updateMPTokenAfterClawback, {
        tokenId: args.tokenId,
        holderAccount: args.holderAccount,
        amount: args.amount
      });

      // Return a simple object to avoid deep type instantiation
      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error: any) {
      console.error("MPT clawback failed:", error);
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Clawback failed"
      };
    }
  }
});

const updateMPTokenAfterClawbackArgs: any = {
  tokenId: v.any(),
  holderAccount: v.any(),
  amount: v.any()
};

export const updateMPTokenAfterClawback = mutation({
  args: updateMPTokenAfterClawbackArgs,
  handler: async (ctx, args: any) => {
    try {
      const token: any = await ctx.db
        .query("mptTokens")
        .filter((q: any) => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        // Update outstanding amount
        const currentOutstanding = parseFloat(token.outstandingAmount);
        const clawbackAmount = parseFloat(args.amount);
        const newOutstanding = Math.max(0, currentOutstanding - clawbackAmount);
        
        await ctx.db.patch(token._id, {
          outstandingAmount: newOutstanding.toString(),
          lastModified: Date.now()
        });
      }

      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update MPT token after clawback failed"
      };
    }
  }
});

const destroyMPTokenIssuanceArgs: any = {
  tokenId: v.any(),
  issuerAccount: v.any(),
  network: v.any()
};

export const destroyMPTokenIssuance = action({
  args: destroyMPTokenIssuanceArgs,
  handler: async (ctx, args: any) => {
    try {
      // Submit MPTokenIssuanceDestroy transaction
      const txResult: any = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceDestroy",
        account: args.issuerAccount,
        mptokenIssuanceId: args.tokenId,
        memos: [{
          data: Buffer.from(JSON.stringify({
            tokenId: args.tokenId,
            action: "destroy"
          })).toString('hex').toUpperCase(),
          type: Buffer.from("mpt_destruction").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`MPT destruction failed: ${txResult.error}`);
      }

      // Update token record status
      await ctx.runMutation(api.xrpl.mpt_advanced.updateMPTokenDestructionStatus, {
        tokenId: args.tokenId
      });

      // Return a simple object to avoid deep type instantiation
      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error: any) {
      console.error("MPT destruction failed:", error);
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Destruction failed"
      };
    }
  }
});

const updateMPTokenDestructionStatusArgs: any = {
  tokenId: v.any()
};

export const updateMPTokenDestructionStatus = mutation({
  args: updateMPTokenDestructionStatusArgs,
  handler: async (ctx, args: any) => {
    try {
      const token: any = await ctx.db
        .query("mptTokens")
        .filter((q: any) => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      if (token) {
        await ctx.db.patch(token._id, {
          status: "retired",
          lastModified: Date.now()
        });
      }

      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update MPT token destruction status failed"
      };
    }
  }
});

const getMPTokenDetailsArgs: any = {
  tokenId: v.any()
};

export const getMPTokenDetails = query({
  args: getMPTokenDetailsArgs,
  handler: async (ctx, args: any) => {
    try {
      const token: any = await ctx.db
        .query("mptTokens")
        .filter((q: any) => q.eq(q.field("tokenId"), args.tokenId))
        .unique();

      // Return a simple object to avoid deep type instantiation
      return token || null;
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Get MPT token details failed"
      };
    }
  }
});

const listMPTokensArgs: any = {
  issuer: v.any(),
  fundId: v.any()
};

export const listMPTokens = query({
  args: listMPTokensArgs,
  handler: async (ctx, args: any) => {
    try {
      let queryBuilder: any = ctx.db.query("mptTokens");

      if (args.issuer) {
        queryBuilder = queryBuilder.filter((q: any) => q.eq(q.field("issuer"), args.issuer));
      }

      if (args.fundId) {
        queryBuilder = queryBuilder.filter((q: any) => q.eq(q.field("fundId"), args.fundId));
      }

      const tokens: any[] = await queryBuilder.collect();
      
      // Return a simple object to avoid deep type instantiation
      return tokens;
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "List MPT tokens failed"
      };
    }
  }
});

const logMPTOperationEventArgs: any = {
  tokenId: v.any(),
  operation: v.any(),
  account: v.any(),
  holder: v.any(),
  txHash: v.any(),
  ledgerIndex: v.any(),
  amount: v.any(),
  reason: v.any()
};

export const logMPTOperationEvent = mutation({
  args: logMPTOperationEventArgs,
  handler: async (ctx, args: any) => {
    try {
      const eventId = `${args.operation}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await ctx.db.insert("auditLogs", {
        eventId,
        eventType: `mpt_${args.operation}`,
        entityType: "mptToken",
        entityId: args.tokenId,
        action: args.operation,
        actor: args.account,
        timestamp: Date.now(),
        changes: {
          before: undefined,
          after: undefined,
          proposalType: undefined,
          executionData: JSON.stringify({
            holder: args.holder || "all",
            operation: args.operation,
            amount: args.amount,
            reason: args.reason
          })
        },
        xrplTxHash: args.txHash,
        xrplLedgerIndex: args.ledgerIndex,
        complianceRules: [`${args.operation}_authority`],
        jurisdictions: [],
        hash: Buffer.from(`${eventId}_${args.txHash}_${Date.now()}`).toString('hex')
      });
      
      // Return a simple object to avoid deep type instantiation
      return { success: true };
    } catch (error: any) {
      // Return a simple object to avoid deep type instantiation
      return {
        success: false,
        error: error instanceof Error ? error.message : "Log MPT operation event failed"
      };
    }
  }
});