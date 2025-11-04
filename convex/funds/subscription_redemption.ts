import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

/**
 * Advanced Institutional Fund Subscription/Redemption Workflow Engine
 * Per PRD Requirements: Multi-jurisdictional compliance, Real-time NAV, MPT minting/burning
 */

// Advanced Subscription Workflow with Institutional Compliance Framework
export const initiateSubscription: any = action({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    subscriptionAmount: v.number(),
    currency: v.string(),
    subscriptionType: v.union(v.literal("initial"), v.literal("additional"), v.literal("systematic"), v.literal("institutional_block")),
    paymentMethod: v.string(),
    settlementInstructions: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // settlementInstructions should contain: { custodian?: string, account?: string, reference?: string, settlementDate?: number, deliveryVersusPayment?: boolean }
    clientReference: v.string(),
    network: v.string()
  },
  handler: async (ctx: any, args: any) => {
    try {
      // Step 1: Validate fund and investor
      const fund: any = await ctx.runQuery(api.funds.management.getFund, {
        fundId: args.fundId
      });
      const investor: any = await ctx.runQuery(api.investors.management.getInvestor, {
        investorId: args.investorId
      });
      
      if (!fund || !investor) {
        throw new Error("Invalid fund or investor reference");
      }

      // Step 2: Compliance validation
      const complianceValidation: any = await ctx.runAction(api.compliance.institutional_compliance.validateInvestorSubscription, {
        fundId: args.fundId,
        investorId: args.investorId,
        subscriptionAmount: args.subscriptionAmount,
        jurisdictions: fund.jurisdictions,
        investorType: investor.investorType
      });

      if (!complianceValidation.approved) {
        throw new Error(`Subscription blocked: ${complianceValidation.reason}`);
      }

      // Step 3: Real-time NAV calculation
      const currentNAV: any = await ctx.runAction(api.funds.xrpl_fund_management.calculateRealTimeNAV, {
        fundId: args.fundId,
        includeOracleData: true,
        adjustForSubscription: args.subscriptionAmount
      });

      const sharePrice = currentNAV.navPerShare;
      const sharesIssued = Math.floor((args.subscriptionAmount / sharePrice) * 1e6) / 1e6;

      // Step 4: Validate minimum investment
      if (args.subscriptionAmount < fund.minimumInvestment) {
        throw new Error(`Below minimum investment: ${fund.minimumInvestment}`);
      }

      // Step 5: Create subscription record
      const subscriptionId: any = await ctx.runMutation(api.funds.subscription_redemption.createSubscriptionRecord, {
        fundId: args.fundId,
        investorId: args.investorId,
        subscriptionAmount: args.subscriptionAmount,
        sharePrice: sharePrice,
        sharesIssued: sharesIssued,
        currency: args.currency,
        subscriptionType: args.subscriptionType,
        paymentMethod: args.paymentMethod,
        settlementInstructions: args.settlementInstructions,
        clientReference: args.clientReference,
        complianceValidation: complianceValidation,
        currentNAV: currentNAV
      });

      // Step 6: MPT token minting
      const mptMintResult: any = await ctx.runAction(api.xrpl.mpt_advanced.mintInstitutionalShares, {
        fundId: args.fundId,
        investorAccount: investor.xrplAccount,
        shareTokens: sharesIssued,
        subscriptionId: subscriptionId,
        complianceHash: complianceValidation.complianceHash,
        auditTrail: {
          subscriptionAmount: args.subscriptionAmount,
          sharePrice: sharePrice,
          navCalculation: currentNAV.calculationId
        },
        network: args.network
      });

      if (!mptMintResult.success) {
        await ctx.runMutation(api.funds.subscription_redemption.updateSubscriptionStatus, {
          subscriptionId: subscriptionId,
          status: "failed",
          failureReason: mptMintResult.error
        });
        throw new Error(`MPT minting failed: ${mptMintResult.error}`);
      }

      // Step 7: Update holdings
      await ctx.runMutation(api.funds.subscription_redemption.updateFundHoldings, {
        fundId: args.fundId,
        investorId: args.investorId,
        subscriptionAmount: args.subscriptionAmount,
        sharesIssued: sharesIssued,
        sharePrice: sharePrice,
        mptTxHash: mptMintResult.txHash
      });

      // Step 8: Audit trail
      await ctx.runAction(api.audit.institutional_audit.logSubscriptionEvent, {
        subscriptionId: subscriptionId,
        fundId: args.fundId,
        investorId: args.investorId,
        transactionDetails: {
          amount: args.subscriptionAmount,
          shares: sharesIssued,
          price: sharePrice,
          mptTxHash: mptMintResult.txHash
        }
      });

      return {
        success: true,
        subscriptionId: subscriptionId,
        sharesIssued: sharesIssued,
        sharePrice: sharePrice,
        mptTxHash: mptMintResult.txHash,
        settlementDate: Date.now() + (2 * 24 * 60 * 60 * 1000), // T+2
        institutionalReference: `SUB-${fund.symbol}-${Date.now()}`,
        complianceStatus: "approved"
      };

    } catch (error) {
      console.error("Institutional subscription failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription processing failed"
      };
    }
  }
});

// Advanced Redemption Workflow
export const initiateRedemption: any = action({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    redemptionType: v.union(v.literal("full"), v.literal("partial"), v.literal("systematic"), v.literal("emergency")),
    redemptionAmount: v.optional(v.number()),
    shareTokens: v.optional(v.number()),
    redemptionReason: v.string(),
    settlementInstructions: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // settlementInstructions should contain: { custodian?: string, account?: string, reference?: string, settlementDate?: number, deliveryVersusPayment?: boolean }
    clientReference: v.string(),
    network: v.string()
  },
  handler: async (ctx: any, args: any) => {
    try {
      const fund: any = await ctx.runQuery(api.funds.management.getFund, {
        fundId: args.fundId
      });
      const investor: any = await ctx.runQuery(api.investors.management.getInvestor, {
        investorId: args.investorId
      });
      
      if (!fund || !investor) {
        throw new Error("Invalid fund or investor reference");
      }

      // Get current holdings
      const holdings: any = await ctx.runQuery(api.investors.management.getInvestorHoldings, {
        fundId: args.fundId,
        investorId: args.investorId
      });

      if (!holdings) {
        throw new Error("No active holdings found");
      }

      // Calculate redemption parameters
      let redemptionShares: number;
      if (args.redemptionType === "full") {
        redemptionShares = holdings.shareTokens;
      } else if (args.shareTokens) {
        redemptionShares = Math.min(args.shareTokens, holdings.shareTokens);
      } else if (args.redemptionAmount) {
        const currentNAV: any = await ctx.runAction(api.funds.xrpl_fund_management.calculateRealTimeNAV, {
          fundId: args.fundId,
          includeOracleData: true
        });
        redemptionShares = Math.min(args.redemptionAmount / currentNAV.navPerShare, holdings.shareTokens);
      } else {
        throw new Error("Invalid redemption parameters");
      }

      // Lockup validation
      const currentTime = Date.now();
      if (holdings.lockupExpiry && currentTime < holdings.lockupExpiry && args.redemptionType !== "emergency") {
        throw new Error(`Holdings subject to lockup until ${new Date(holdings.lockupExpiry).toISOString()}`);
      }

      // Compliance validation
      const complianceValidation: any = await ctx.runAction(api.compliance.institutional_compliance.validateInvestorRedemption, {
        fundId: args.fundId,
        investorId: args.investorId,
        redemptionShares: redemptionShares,
        redemptionType: args.redemptionType,
        jurisdictions: fund.jurisdictions
      });

      if (!complianceValidation.approved) {
        throw new Error(`Redemption blocked: ${complianceValidation.reason}`);
      }

      // Current NAV calculation
      const currentNAV: any = await ctx.runAction(api.funds.xrpl_fund_management.calculateRealTimeNAV, {
        fundId: args.fundId,
        includeOracleData: true,
        adjustForRedemption: redemptionShares
      });

      const redemptionValue = redemptionShares * currentNAV.navPerShare;

      // Create redemption record
      const redemptionId: any = await ctx.runMutation(api.funds.subscription_redemption.createRedemptionRecord, {
        fundId: args.fundId,
        investorId: args.investorId,
        redemptionShares: redemptionShares,
        redemptionValue: redemptionValue,
        sharePrice: currentNAV.navPerShare,
        redemptionType: args.redemptionType,
        redemptionReason: args.redemptionReason,
        settlementInstructions: args.settlementInstructions,
        clientReference: args.clientReference,
        complianceValidation: complianceValidation,
        currentNAV: currentNAV
      });

      // MPT token burning
      const mptBurnResult: any = await ctx.runAction(api.xrpl.mpt_advanced.burnInstitutionalShares, {
        fundId: args.fundId,
        investorAccount: investor.xrplAccount,
        shareTokens: redemptionShares,
        redemptionId: redemptionId,
        complianceHash: complianceValidation.complianceHash,
        network: args.network
      });

      if (!mptBurnResult.success) {
        await ctx.runMutation(api.funds.subscription_redemption.updateRedemptionStatus, {
          redemptionId: redemptionId,
          status: "failed",
          failureReason: mptBurnResult.error
        });
        throw new Error(`MPT burning failed: ${mptBurnResult.error}`);
      }

      // Update holdings
      await ctx.runMutation(api.funds.subscription_redemption.updateHoldingsAfterRedemption, {
        fundId: args.fundId,
        investorId: args.investorId,
        redeemedShares: redemptionShares,
        redemptionValue: redemptionValue,
        mptTxHash: mptBurnResult.txHash
      });

      // Audit trail
      await ctx.runAction(api.audit.institutional_audit.logRedemptionEvent, {
        redemptionId: redemptionId,
        fundId: args.fundId,
        investorId: args.investorId,
        transactionDetails: {
          shares: redemptionShares,
          value: redemptionValue,
          price: currentNAV.navPerShare,
          mptTxHash: mptBurnResult.txHash
        }
      });

      return {
        success: true,
        redemptionId: redemptionId,
        redeemedShares: redemptionShares,
        redemptionValue: redemptionValue,
        sharePrice: currentNAV.navPerShare,
        mptTxHash: mptBurnResult.txHash,
        settlementDate: Date.now() + (3 * 24 * 60 * 60 * 1000), // T+3
        institutionalReference: `RED-${fund.symbol}-${Date.now()}`,
        complianceStatus: "approved"
      };

    } catch (error) {
      console.error("Institutional redemption failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Redemption processing failed"
      };
    }
  }
});

// Supporting mutation functions
export const createSubscriptionRecord = mutation({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    subscriptionAmount: v.number(),
    sharePrice: v.number(),
    sharesIssued: v.number(),
    currency: v.string(),
    subscriptionType: v.string(),
    paymentMethod: v.string(),
    settlementInstructions: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // settlementInstructions should contain: { custodian?: string, account?: string, reference?: string, settlementDate?: number, deliveryVersusPayment?: boolean }
    clientReference: v.string(),
    complianceValidation: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // complianceValidation should contain: { approved: boolean, reason?: string, complianceHash?: string, timestamp: number, validator: string }
    currentNAV: v.any() // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // currentNAV should contain: { navPerShare: number, totalAUM: number, calculationId: string, timestamp: number }
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("subscriptions", {
      fundId: args.fundId,
      investorId: args.investorId,
      subscriptionAmount: args.subscriptionAmount,
      sharePrice: args.sharePrice,
      sharesIssued: args.sharesIssued,
      currency: args.currency,
      subscriptionType: args.subscriptionType,
      paymentMethod: args.paymentMethod,
      settlementInstructions: args.settlementInstructions,
      clientReference: args.clientReference,
      status: "processing",
      createdAt: Date.now(),
      complianceValidation: args.complianceValidation,
      currentNAV: args.currentNAV
    });
  }
});

export const createRedemptionRecord = mutation({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    redemptionShares: v.number(),
    redemptionValue: v.number(),
    sharePrice: v.number(),
    redemptionType: v.string(),
    redemptionReason: v.string(),
    settlementInstructions: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // settlementInstructions should contain: { custodian?: string, account?: string, reference?: string, settlementDate?: number, deliveryVersusPayment?: boolean }
    clientReference: v.string(),
    complianceValidation: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // complianceValidation should contain: { approved: boolean, reason?: string, complianceHash?: string, timestamp: number, validator: string }
    currentNAV: v.any() // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // currentNAV should contain: { navPerShare: number, totalAUM: number, calculationId: string, timestamp: number }
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("redemptions", {
      fundId: args.fundId,
      investorId: args.investorId,
      redemptionShares: args.redemptionShares,
      redemptionValue: args.redemptionValue,
      sharePrice: args.sharePrice,
      redemptionType: args.redemptionType,
      redemptionReason: args.redemptionReason,
      settlementInstructions: args.settlementInstructions,
      clientReference: args.clientReference,
      status: "processing",
      createdAt: Date.now(),
      complianceValidation: args.complianceValidation,
      currentNAV: args.currentNAV
    });
  }
});

export const updateFundHoldings = mutation({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    subscriptionAmount: v.number(),
    sharesIssued: v.number(),
    sharePrice: v.number(),
    mptTxHash: v.string()
  },
  handler: async (ctx: any, args: any) => {
    const existingHoldings: any = await ctx.db
      .query("holdings")
      .filter((q: any) => q.and(
        q.eq(q.field("fundId"), args.fundId),
        q.eq(q.field("investorId"), args.investorId),
        q.eq(q.field("status"), "active")
      ))
      .unique();

    if (existingHoldings) {
      const newTotalShares = existingHoldings.shareTokens + args.sharesIssued;
      const newCostBasis = existingHoldings.costBasis + args.subscriptionAmount;
      const newCurrentValue = newTotalShares * args.sharePrice;
      
      await ctx.db.patch(existingHoldings._id, {
        shareTokens: newTotalShares,
        costBasis: newCostBasis,
        currentValue: newCurrentValue,
        averageCost: newCostBasis / newTotalShares,
        unrealizedGainLoss: newCurrentValue - newCostBasis,
        lastValuationDate: Date.now()
      });
    } else {
      await ctx.db.insert("holdings", {
        investorId: args.investorId,
        fundId: args.fundId,
        shareTokens: args.sharesIssued,
        costBasis: args.subscriptionAmount,
        currentValue: args.sharesIssued * args.sharePrice,
        unrealizedGainLoss: 0,
        realizedGainLoss: 0,
        dividendsReceived: 0,
        feesAccrued: 0,
        subscriptionDate: Date.now(),
        lastValuationDate: Date.now(),
        averageCost: args.sharePrice,
        totalReturn: 0,
        annualizedReturn: 0,
        internalRateOfReturn: 0,
        status: "active"
      });
    }

    // Update fund metrics
    const fund: any = await ctx.db.get(args.fundId);
    if (fund) {
      await ctx.db.patch(args.fundId, {
        aum: fund.aum + args.subscriptionAmount,
        totalShares: fund.totalShares + args.sharesIssued,
        outstandingShares: fund.outstandingShares + args.sharesIssued,
        lastValuation: Date.now()
      });
    }
  }
});

export const updateHoldingsAfterRedemption = mutation({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    redeemedShares: v.number(),
    redemptionValue: v.number(),
    mptTxHash: v.string()
  },
  handler: async (ctx: any, args: any) => {
    const holdings: any = await ctx.runQuery(api.investors.management.getInvestorHoldings, {
      fundId: args.fundId,
      investorId: args.investorId
    });

    if (holdings) {
      const remainingShares = holdings.shareTokens - args.redeemedShares;
      const redeemedCostBasis = (args.redeemedShares / holdings.shareTokens) * holdings.costBasis;
      const remainingCostBasis = holdings.costBasis - redeemedCostBasis;
      const realizedGainLoss = args.redemptionValue - redeemedCostBasis;

      if (remainingShares <= 0) {
        await ctx.db.patch(holdings._id, {
          status: "redeemed",
          shareTokens: 0,
          currentValue: 0,
          realizedGainLoss: holdings.realizedGainLoss + realizedGainLoss
        });
      } else {
        await ctx.db.patch(holdings._id, {
          shareTokens: remainingShares,
          costBasis: remainingCostBasis,
          currentValue: remainingShares * (args.redemptionValue / args.redeemedShares),
          realizedGainLoss: holdings.realizedGainLoss + realizedGainLoss,
          lastValuationDate: Date.now()
        });
      }
    }

    // Update fund metrics
    const fund: any = await ctx.db.get(args.fundId);
    if (fund) {
      await ctx.db.patch(args.fundId, {
        aum: fund.aum - args.redemptionValue,
        totalShares: fund.totalShares - args.redeemedShares,
        outstandingShares: fund.outstandingShares - args.redeemedShares,
        lastValuation: Date.now()
      });
    }
  }
});

export const updateSubscriptionStatus = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    status: v.union(
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    failureReason: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.subscriptionId, {
      status: args.status,
      failureReason: args.failureReason,
      updatedAt: Date.now()
    });
  }
});

export const updateRedemptionStatus = mutation({
  args: {
    redemptionId: v.id("redemptions"),
    status: v.union(
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    failureReason: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.redemptionId, {
      status: args.status,
      failureReason: args.failureReason,
      updatedAt: Date.now()
    });
  }
});

// Query functions to fetch subscription and redemption data
export const getSubscription = query({
  args: {
    subscriptionId: v.id("subscriptions")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.subscriptionId);
  }
});

export const getRedemption = query({
  args: {
    redemptionId: v.id("redemptions")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.redemptionId);
  }
});