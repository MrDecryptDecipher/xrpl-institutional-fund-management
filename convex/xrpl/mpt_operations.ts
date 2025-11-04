import { action, mutation } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

/**
 * Additional MPT Operations
 * Implements missing MPT transaction types: MPTokenIssuanceSet, MPTokenIssuanceDestroy, and proper Clawback
 */

export const lockMPTokenIssuance = action({
  args: {
    mptokenIssuanceId: v.string(),
    issuerAccount: v.string(),
    network: v.string(),
    lockForHolder: v.optional(v.string()) // If specified, lock only for this holder
  },
  handler: async (ctx, args) => {
    try {
      // Submit MPTokenIssuanceSet transaction to lock MPT
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceSet",
        account: args.issuerAccount,
        mptokenIssuanceId: args.mptokenIssuanceId,
        holder: args.lockForHolder,
        flags: 0x00000001, // tfMPTLock
        fee: "12"
      });

      if (!txResult.success) {
        throw new Error(`MPT lock failed: ${txResult.error}`);
      }

      // Log lock event
      await ctx.runAction(api.xrpl.mpt.logMPTOperationEvent, {
        tokenId: args.mptokenIssuanceId,
        operation: "lock",
        account: args.issuerAccount,
        holder: args.lockForHolder,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        lockedForHolder: args.lockForHolder || "all"
      };
    } catch (error) {
      console.error("MPT lock failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT lock failed"
      };
    }
  }
});

export const unlockMPTokenIssuance = action({
  args: {
    mptokenIssuanceId: v.string(),
    issuerAccount: v.string(),
    network: v.string(),
    unlockForHolder: v.optional(v.string()) // If specified, unlock only for this holder
  },
  handler: async (ctx, args) => {
    try {
      // Submit MPTokenIssuanceSet transaction to unlock MPT
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceSet",
        account: args.issuerAccount,
        mptokenIssuanceId: args.mptokenIssuanceId,
        holder: args.unlockForHolder,
        flags: 0x00000002, // tfMPTUnlock
        fee: "12"
      });

      if (!txResult.success) {
        throw new Error(`MPT unlock failed: ${txResult.error}`);
      }

      // Log unlock event
      await ctx.runAction(api.xrpl.mpt.logMPTOperationEvent, {
        tokenId: args.mptokenIssuanceId,
        operation: "unlock",
        account: args.issuerAccount,
        holder: args.unlockForHolder,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        unlockedForHolder: args.unlockForHolder || "all"
      };
    } catch (error) {
      console.error("MPT unlock failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT unlock failed"
      };
    }
  }
});

export const destroyMPTokenIssuance = action({
  args: {
    mptokenIssuanceId: v.string(),
    issuerAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit MPTokenIssuanceDestroy transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTokenIssuanceDestroy",
        account: args.issuerAccount,
        mptokenIssuanceId: args.mptokenIssuanceId,
        fee: "12"
      });

      if (!txResult.success) {
        throw new Error(`MPT destroy failed: ${txResult.error}`);
      }

      // Log destroy event
      await ctx.runAction(api.xrpl.mpt.logMPTOperationEvent, {
        tokenId: args.mptokenIssuanceId,
        operation: "destroy",
        account: args.issuerAccount,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        destroyedMptId: args.mptokenIssuanceId
      };
    } catch (error) {
      console.error("MPT destroy failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT destroy failed"
      };
    }
  }
});

export const clawbackMPTokenProper = action({
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
      // Submit proper Clawback transaction (not Payment)
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Clawback",
        account: args.issuerAccount,
        amount: {
          mpt_issuance_id: args.tokenId,
          value: args.amount
        },
        holder: args.fromAccount,
        fee: "12",
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
      await ctx.runAction(api.xrpl.mpt.logMPTOperationEvent, {
        tokenId: args.tokenId,
        operation: "clawback",
        account: args.issuerAccount,
        holder: args.fromAccount,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        amount: args.amount,
        reason: args.reason
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

export const authorizeMPTHolder = action({
  args: {
    mptId: v.string(),
    holder: v.string(),
    authorization: v.number(), // 1 for authorize, 0 for revoke
    issuerAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const issuerWallet = await ctx.runAction(api.xrpl.enhanced_client.getWallet, {
        network: args.network,
        account: args.issuerAccount
      });

      const result = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "MPTHolderAuthorize",
        account: issuerWallet.address,
        mpt_issuance_id: args.mptId,
        holder: args.holder,
        authorization: args.authorization,
        fee: "12"
      });

      if (!result.success) {
        throw new Error(`MPT holder authorization failed: ${result.error}`);
      }

      // Log the operation using the action
      await ctx.runAction(api.xrpl.mpt.logMPTOperationEvent, {
        tokenId: args.mptId,
        operation: "clawback",
        account: issuerWallet.address,
        holder: args.fromAccount,
        txHash: result.result.hash!,
        ledgerIndex: result.result.ledger_index!,
        amount: args.amount,
        reason: "Issuer clawback"
      });

      return {
        success: true,
        txHash: result.result.hash!,
        ledgerIndex: result.result.ledger_index!
      };
    } catch (error) {
      console.error("MPT holder authorization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPT holder authorization failed"
      };
    }
  }
});
