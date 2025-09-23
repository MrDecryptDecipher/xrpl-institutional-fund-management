import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const subscribeToFund = mutation({
  args: {
    fundId: v.id("funds"),
    amount: v.number(),
    xrplTxHash: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    // Get investor record
    const investor = await ctx.db
      .query("investors")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();

    if (!investor) {
      throw new Error("Investor registration required");
    }

    // Get fund details
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    if (fund.status !== "active") {
      throw new Error("Fund is not active for subscriptions");
    }

    // Validate compliance
    const complianceCheck = {
      kycVerified: !fund.complianceRules.kycRequired || investor.kycStatus === "verified",
      amlCleared: !fund.complianceRules.amlRequired || investor.amlStatus === "cleared",
      jurisdictionAllowed: !fund.complianceRules.jurisdictionRestrictions.includes(investor.jurisdiction),
      limitsRespected: args.amount >= fund.complianceRules.minimumInvestment &&
        (!fund.complianceRules.maximumInvestment || args.amount <= fund.complianceRules.maximumInvestment)
    };

    const isCompliant = Object.values(complianceCheck).every(check => check === true);

    if (!isCompliant) {
      throw new Error("Compliance requirements not met");
    }

    // Calculate share tokens based on NAV
    const shareTokens = args.amount / fund.nav;

    // Create transaction record
    const transactionId = await ctx.db.insert("transactions", {
      fundId: args.fundId,
      investorId: investor._id,
      type: "subscription",
      amount: args.amount,
      shareTokens: shareTokens,
      xrplTransactionHash: args.xrplTxHash,
      status: "pending",
      complianceChecks: {
        kycVerified: complianceCheck.kycVerified,
        amlCleared: complianceCheck.amlCleared,
        sanctionsScreened: true,
        jurisdictionAllowed: complianceCheck.jurisdictionAllowed,
        limitsRespected: complianceCheck.limitsRespected,
        accreditationVerified: true
      },
      reference: `sub_${Date.now()}_${args.fundId}_${investor._id}`,
      metadata: {
        source: "subscription",
        channel: "web",
        fees: 0
      },
      managementFee: 0,
      performanceFee: 0,
      transactionFee: 0
    });

    // Check if investor already has holdings in this fund
    const existingHolding = await ctx.db
      .query("holdings")
      .withIndex("by_investor", q => q.eq("investorId", investor._id))
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .unique();

    if (existingHolding) {
      // Update existing holding
      await ctx.db.patch(existingHolding._id, {
        shareTokens: existingHolding.shareTokens + shareTokens,
        costBasis: existingHolding.costBasis + args.amount,
        currentValue: (existingHolding.shareTokens + shareTokens) * fund.nav,
        lastValuationDate: Date.now()
      });
    } else {
      // Create new holding
      await ctx.db.insert("holdings", {
        investorId: investor._id,
        fundId: args.fundId,
        shareTokens: shareTokens,
        costBasis: args.amount,
        currentValue: shareTokens * fund.nav,
        unrealizedGainLoss: 0,
        realizedGainLoss: 0,
        dividendsReceived: 0,
        feesAccrued: 0,
        subscriptionDate: Date.now(),
        lastValuationDate: Date.now(),
        averageCost: args.amount / shareTokens,
        totalReturn: 0,
        annualizedReturn: 0,
        internalRateOfReturn: 0,
        status: "active"
      });
    }

    // Update fund AUM
    await ctx.db.patch(args.fundId, {
      aum: fund.aum + args.amount
    });

    return {
      transactionId: transactionId,
      shareTokens: shareTokens,
      success: true
    };
  }
});

export const redeemFromFund = mutation({
  args: {
    fundId: v.id("funds"),
    shareTokens: v.number(),
    xrplTxHash: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    // Get investor record
    const investor = await ctx.db
      .query("investors")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();

    if (!investor) {
      throw new Error("Investor not found");
    }

    // Get fund details
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    // Get investor's holding
    const holding = await ctx.db
      .query("holdings")
      .withIndex("by_investor", q => q.eq("investorId", investor._id))
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .unique();

    if (!holding) {
      throw new Error("No holdings found for this fund");
    }

    if (holding.shareTokens < args.shareTokens) {
      throw new Error("Insufficient share tokens for redemption");
    }

    // Check lockup period
    if (holding.lockupPeriod && Date.now() < holding.subscriptionDate + holding.lockupPeriod) {
      throw new Error("Holdings are still in lockup period");
    }

    // Calculate redemption amount based on current NAV
    const redemptionAmount = args.shareTokens * fund.nav;

    // Create transaction record
    const transactionId = await ctx.db.insert("transactions", {
      fundId: args.fundId,
      investorId: investor._id,
      type: "redemption",
      amount: redemptionAmount,
      shareTokens: args.shareTokens,
      xrplTransactionHash: args.xrplTxHash,
      status: "pending",
      complianceChecks: {
        kycVerified: true,
        amlCleared: true,
        sanctionsScreened: true,
        jurisdictionAllowed: true,
        limitsRespected: true,
        accreditationVerified: true
      },
      reference: `red_${Date.now()}_${args.fundId}_${investor._id}`,
      metadata: {
        source: "redemption",
        channel: "web",
        fees: 0
      },
      managementFee: 0,
      performanceFee: 0,
      transactionFee: 0
    });

    // Update holding
    const remainingTokens = holding.shareTokens - args.shareTokens;
    if (remainingTokens > 0) {
      await ctx.db.patch(holding._id, {
        shareTokens: remainingTokens,
        currentValue: remainingTokens * fund.nav,
        lastValuationDate: Date.now()
      });
    } else {
      await ctx.db.patch(holding._id, {
        shareTokens: 0,
        currentValue: 0,
        status: "redeemed",
        lastValuationDate: Date.now()
      });
    }

    // Update fund AUM
    await ctx.db.patch(args.fundId, {
      aum: fund.aum - redemptionAmount
    });

    return {
      transactionId: transactionId,
      redemptionAmount: redemptionAmount,
      success: true
    };
  }
});

export const confirmTransaction = mutation({
  args: {
    transactionId: v.id("transactions"),
    status: v.union(
      v.literal("confirmed"),
      v.literal("failed"),
      v.literal("reversed")
    ),
    gasUsed: v.optional(v.number()),
    feesPaid: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await ctx.db.patch(args.transactionId, {
      status: args.status,
      ...(args.gasUsed && {
        metadata: {
          source: transaction.metadata?.source || "subscription",
          channel: transaction.metadata?.channel || "web",
          fees: args.gasUsed
        }
      }),
      ...(args.feesPaid && {
        metadata: {
          source: transaction.metadata?.source || "subscription",
          channel: transaction.metadata?.channel || "web",
          fees: args.feesPaid
        }
      })
    });

    return { success: true };
  }
});

export const getInvestorHoldings = query({
  args: {
    investorId: v.optional(v.id("investors"))
  },
  handler: async (ctx, args) => {
    let investorId = args.investorId;

    if (!investorId) {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        return [];
      }

      const investor = await ctx.db
        .query("investors")
        .withIndex("by_user", q => q.eq("userId", userId))
        .unique();

      if (!investor) {
        return [];
      }

      investorId = investor._id;
    }

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_investor", q => q.eq("investorId", investorId))
      .collect();

    // Enrich with fund details
    const enrichedHoldings = await Promise.all(
      holdings.map(async (holding) => {
        const fund = await ctx.db.get(holding.fundId);
        return {
          ...holding,
          fund: fund
        };
      })
    );

    return enrichedHoldings;
  }
});

export const getFundHolders = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .filter(q => q.gt(q.field("shareTokens"), 0))
      .collect();

    // Enrich with investor details
    const enrichedHoldings = await Promise.all(
      holdings.map(async (holding) => {
        const investor = await ctx.db.get(holding.investorId);
        return {
          ...holding,
          investor: investor
        };
      })
    );

    return enrichedHoldings;
  }
});

export const getTransactionHistory = query({
  args: {
    fundId: v.optional(v.id("funds")),
    investorId: v.optional(v.id("investors")),
    type: v.optional(v.union(
      v.literal("subscription"),
      v.literal("redemption"),
      v.literal("transfer"),
      v.literal("dividend"),
      v.literal("fee"),
      v.literal("rebalance"),
      v.literal("compliance_action")
    )),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    if (args.fundId) {
      return await ctx.db
        .query("transactions")
        .withIndex("by_fund", q => q.eq("fundId", args.fundId))
        .order("desc")
        .take(args.limit || 50);
    }
    if (args.investorId) {
      return await ctx.db
        .query("transactions")
        .withIndex("by_investor", q => q.eq("investorId", args.investorId))
        .order("desc")
        .take(args.limit || 50);
    }
    if (args.type) {
      return await ctx.db
        .query("transactions")
        .withIndex("by_type", q => q.eq("type", args.type))
        .order("desc")
        .take(args.limit || 50);
    }
    return await ctx.db.query("transactions").order("desc").take(args.limit || 50);
  }
});
