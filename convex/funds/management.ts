import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createFund = mutation({
  args: {
    name: v.string(),
    symbol: v.string(),
    description: v.string(),
    fundType: v.union(
      v.literal("money_market"),
      v.literal("real_estate"),
      v.literal("structured_credit"),
      v.literal("hybrid"),
      v.literal("securities")
    ),
    jurisdiction: v.string(),
    totalSupply: v.number(),
    complianceRules: v.object({
      kycRequired: v.boolean(),
      amlRequired: v.boolean(),
      accreditedOnly: v.boolean(),
      jurisdictionRestrictions: v.array(v.string()),
      minimumInvestment: v.number(),
      maximumInvestment: v.optional(v.number())
    }),
    metadata: v.object({
      prospectusHash: v.string(),
      isin: v.optional(v.string()),
      custodian: v.string(),
      auditor: v.string()
    })
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fundId = await ctx.db.insert("funds", {
      name: args.name,
      symbol: args.symbol,
      description: args.description,
      fundType: args.fundType,
      jurisdictions: [args.jurisdiction],
      managerId: userId,
      xrplAccount: "", // Will be set after XRPL account creation
      totalSupply: args.totalSupply.toString(),
      nav: 1.0, // Initial NAV
      aum: 0, // Initial AUM
      sharePrice: 1.0,
      totalShares: 0,
      outstandingShares: 0,
      minimumInvestment: args.complianceRules.minimumInvestment,
      managementFee: 2.0,
      performanceFee: 20.0,
      status: "pending",
      regulatoryStatus: {
        sec: "pending"
      },
      complianceMatrix: {
        kycRequired: args.complianceRules.kycRequired,
        amlRequired: args.complianceRules.amlRequired,
        accreditedOnly: args.complianceRules.accreditedOnly,
        geographicRestrictions: args.complianceRules.jurisdictionRestrictions,
        investorLimits: {
          maxInvestors: 100,
          maxRetailPercentage: 25
        }
      },
      complianceRules: args.complianceRules,
      riskProfile: "moderate",
      riskMetrics: {
        var95: 5.0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        beta: 1.0,
        volatility: 0
      },
      prospectusHash: args.metadata.prospectusHash,
      custodian: args.metadata.custodian,
      auditor: args.metadata.auditor,
      inceptionDate: Date.now(),
      fiscalYearEnd: "12-31",
      baseCurrency: "USD",
      lastValuation: Date.now(),
      nextValuation: Date.now() + (30 * 24 * 60 * 60 * 1000)
    });

    return fundId;
  }
});

export const updateFundStatus = mutation({
  args: {
    fundId: v.id("funds"),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("suspended"),
      v.literal("closed")
    ),
    xrplAccount: v.optional(v.string()),
    mptTokenId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    if (fund.managerId !== userId) {
      throw new Error("Only fund manager can update status");
    }

    await ctx.db.patch(args.fundId, {
      status: args.status,
      ...(args.xrplAccount && { xrplAccount: args.xrplAccount }),
      ...(args.mptTokenId && { mptTokenId: args.mptTokenId })
    });

    return { success: true };
  }
});

export const getFunds = query({
  args: {
    managerId: v.optional(v.id("users")),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("suspended"),
      v.literal("closed")
    )),
    jurisdiction: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (args.managerId) {
      return await ctx.db
        .query("funds")
        .withIndex("by_manager", q => q.eq("managerId", args.managerId!))
        .collect();
    }
    if (args.status) {
      return await ctx.db
        .query("funds")
        .withIndex("by_status", q => q.eq("status", args.status!))
        .collect();
    }
    if (args.jurisdiction) {
      return await ctx.db
        .query("funds")
        .withIndex("by_jurisdictions", q => q.eq("jurisdictions", args.jurisdiction!))
        .collect();
    }

    return await ctx.db.query("funds").collect();
  }
});

export const getFund = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.fundId);
  }
});

export const updateFundNAV = mutation({
  args: {
    fundId: v.id("funds"),
    nav: v.number(),
    aum: v.number()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    if (fund.managerId !== userId) {
      throw new Error("Only fund manager can update NAV");
    }

    await ctx.db.patch(args.fundId, {
      nav: args.nav,
      aum: args.aum
    });

    return { success: true };
  }
});

export const addAssetToFund = mutation({
  args: {
    fundId: v.id("funds"),
    name: v.string(),
    symbol: v.string(),
    assetType: v.union(
      v.literal("security"),
      v.literal("real_estate"),
      v.literal("commodity"),
      v.literal("cash"),
      v.literal("derivative"),
      v.literal("credit")
    ),
    xrplTokenId: v.string(),
    totalSupply: v.number(),
    currentValue: v.number(),
    weight: v.number(),
    metadata: v.object({
      issuer: v.string(),
      maturityDate: v.optional(v.number()),
      couponRate: v.optional(v.number()),
      creditRating: v.optional(v.string()),
      location: v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    if (fund.managerId !== userId) {
      throw new Error("Only fund manager can add assets");
    }

    const assetId = await ctx.db.insert("assets", {
      fundId: args.fundId,
      name: args.name,
      symbol: args.symbol,
      assetType: args.assetType,
      quantity: 0,
      currentPrice: args.currentValue,
      currentValue: args.currentValue,
      costBasis: args.currentValue,
      unrealizedGainLoss: 0,
      jurisdictions: [],
      complianceFlags: [],
      restrictedInvestors: [],
      lastValuation: Date.now(),
      valuationSource: "manual",
      pricingModel: "market",
      riskRating: "medium",
      volatility: 0,
      beta: 1.0,
      correlation: 0
    });

    return assetId;
  }
});

export const getFundAssets = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assets")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .collect();
  }
});

export const updateAssetValue = mutation({
  args: {
    assetId: v.id("assets"),
    currentValue: v.number(),
    weight: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const asset = await ctx.db.get(args.assetId);
    if (!asset) {
      throw new Error("Asset not found");
    }

    const fund = await ctx.db.get(asset.fundId);
    if (!fund || fund.managerId !== userId) {
      throw new Error("Only fund manager can update asset values");
    }

    await ctx.db.patch(args.assetId, {
      currentValue: args.currentValue,
      ...(args.weight !== undefined && { weight: args.weight })
    });

    return { success: true };
  }
});
