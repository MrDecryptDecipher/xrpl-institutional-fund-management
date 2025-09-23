import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createInstitutionalFund = mutation({
  args: {
    name: v.string(),
    symbol: v.string(),
    description: v.string(),
    fundType: v.union(
      v.literal("hedge_fund"),
      v.literal("private_equity"),
      v.literal("real_estate"),
      v.literal("structured_credit"),
      v.literal("multi_strategy"),
      v.literal("quantitative"),
      v.literal("distressed_debt"),
      v.literal("infrastructure")
    ),
    strategy: v.object({
      primary: v.string(),
      secondary: v.optional(v.string()),
      benchmark: v.string(),
      targetReturn: v.number(),
      riskBudget: v.number()
    }),
    structure: v.object({
      domicile: v.string(),
      legalStructure: v.union(
        v.literal("limited_partnership"),
        v.literal("corporation"),
        v.literal("trust"),
        v.literal("llc")
      ),
      masterFeeder: v.boolean(),
      sidePockets: v.boolean()
    }),
    terms: v.object({
      minimumInvestment: v.number(),
      managementFee: v.number(),
      performanceFee: v.number(),
      hurdle: v.optional(v.number()),
      highWaterMark: v.boolean(),
      lockupPeriod: v.number(),
      redemptionFrequency: v.union(
        v.literal("monthly"),
        v.literal("quarterly"),
        v.literal("semi_annual"),
        v.literal("annual")
      ),
      noticePeriod: v.number(),
      gatePeriod: v.optional(v.number())
    }),
    compliance: v.object({
      regulatoryFramework: v.array(v.string()),
      investorRestrictions: v.object({
        maxInvestors: v.number(),
        accreditedOnly: v.boolean(),
        institutionalOnly: v.boolean(),
        geographicRestrictions: v.array(v.string())
      }),
      reportingRequirements: v.array(v.string()),
      auditRequirements: v.object({
        auditor: v.string(),
        frequency: v.string(),
        standards: v.array(v.string())
      })
    }),
    riskManagement: v.object({
      var95: v.number(),
      var99: v.number(),
      maxDrawdown: v.number(),
      leverageLimit: v.number(),
      concentrationLimits: v.object({
        singlePosition: v.number(),
        sector: v.number(),
        geography: v.number()
      }),
      stressTestScenarios: v.array(v.string())
    }),
    operationalSetup: v.object({
      administrator: v.string(),
      custodian: v.string(),
      primebroker: v.optional(v.string()),
      legalCounsel: v.string(),
      complianceOfficer: v.string()
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
      managerId: userId,
      status: "pending_approval",
      aum: 0,
      nav: 100.0,
      sharePrice: 100.0,
      totalShares: 0,
      totalSupply: "0",
      outstandingShares: 0,
      minimumInvestment: args.terms.minimumInvestment,
      managementFee: args.terms.managementFee,
      performanceFee: args.terms.performanceFee,
      xrplAccount: "",
      jurisdictions: [args.structure.domicile],
      regulatoryStatus: {
        sec: "pending",
        finma: "pending",
        mas: "pending"
      },
      complianceMatrix: {
        kycRequired: true,
        amlRequired: true,
        accreditedOnly: args.compliance.investorRestrictions.accreditedOnly,
        geographicRestrictions: args.compliance.investorRestrictions.geographicRestrictions,
        investorLimits: {
          maxInvestors: args.compliance.investorRestrictions.maxInvestors,
          maxRetailPercentage: args.compliance.investorRestrictions.institutionalOnly ? 0 : 25
        }
      },
      complianceRules: {
        kycRequired: true,
        amlRequired: true,
        accreditedOnly: args.compliance.investorRestrictions.accreditedOnly,
        minimumInvestment: args.terms.minimumInvestment,
        jurisdictionRestrictions: args.compliance.investorRestrictions.geographicRestrictions
      },
      riskProfile: args.riskManagement.var95 > 5 ? "aggressive" : 
                   args.riskManagement.var95 > 3 ? "moderate" : "conservative",
      riskMetrics: {
        var95: args.riskManagement.var95,
        sharpeRatio: 0,
        maxDrawdown: args.riskManagement.maxDrawdown,
        beta: 1.0,
        volatility: 0
      },
      inceptionDate: Date.now(),
      fiscalYearEnd: "12-31",
      baseCurrency: "USD",
      custodian: args.operationalSetup.custodian,
      administrator: args.operationalSetup.administrator,
      auditor: args.operationalSetup.legalCounsel,
      lastValuation: Date.now(),
      nextValuation: Date.now() + (30 * 24 * 60 * 60 * 1000)
    });

    // Create institutional fund metadata
    await ctx.db.insert("institutionalFundMetadata", {
      fundId,
      strategy: args.strategy,
      structure: args.structure,
      terms: args.terms,
      compliance: args.compliance,
      riskManagement: args.riskManagement,
      operationalSetup: args.operationalSetup,
      performanceMetrics: {
        inception: Date.now(),
        highWaterMark: 100.0,
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        sortinoRatio: 0,
        calmarRatio: 0,
        maxDrawdown: 0,
        var95: 0,
        var99: 0,
        beta: 1.0,
        alpha: 0,
        informationRatio: 0,
        trackingError: 0
      },
      subscriptionSchedule: [],
      redemptionSchedule: [],
      feeSchedule: [],
      auditSchedule: []
    });

    return fundId;
  }
});

export const getInstitutionalFundDetails = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      return null;
    }

    const metadata = await ctx.db
      .query("institutionalFundMetadata")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .unique();

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .collect();

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .order("desc")
      .take(50);

    const assets = await ctx.db
      .query("assets")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .collect();

    // Calculate advanced metrics
    const totalInvestors = new Set(holdings.map(h => h.investorId)).size;
    const averageHolding = holdings.length > 0 ? fund.aum / holdings.length : 0;
    
    // Performance calculations
    const subscriptions = transactions.filter(t => t.type === "subscription");
    const redemptions = transactions.filter(t => t.type === "redemption");
    const netFlow = subscriptions.reduce((sum, t) => sum + t.amount, 0) - 
                   redemptions.reduce((sum, t) => sum + t.amount, 0);

    return {
      fund,
      metadata,
      metrics: {
        totalInvestors,
        averageHolding,
        netFlow,
        assetCount: assets.length,
        transactionVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
        utilizationRate: fund.aum > 0 ? (fund.aum / parseFloat(fund.totalSupply || "1")) * 100 : 0
      },
      holdings,
      assets,
      recentTransactions: transactions
    };
  }
});

export const updateFundStrategy = mutation({
  args: {
    fundId: v.id("funds"),
    strategy: v.object({
      primary: v.string(),
      secondary: v.optional(v.string()),
      benchmark: v.string(),
      targetReturn: v.number(),
      riskBudget: v.number()
    })
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund || fund.managerId !== userId) {
      throw new Error("Unauthorized");
    }

    const metadata = await ctx.db
      .query("institutionalFundMetadata")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .unique();

    if (metadata) {
      await ctx.db.patch(metadata._id, {
        strategy: args.strategy
      });
    }

    return { success: true };
  }
});

export const generateComplianceReport = mutation({
  args: {
    fundId: v.id("funds"),
    reportType: v.union(
      v.literal("monthly_nav"),
      v.literal("quarterly_holdings"),
      v.literal("annual_audit"),
      v.literal("regulatory_filing"),
      v.literal("risk_report"),
      v.literal("performance_attribution")
    ),
    jurisdiction: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund || fund.managerId !== userId) {
      throw new Error("Unauthorized");
    }

    const reportId = await ctx.db.insert("complianceReports", {
      fundId: args.fundId,
      reportType: args.reportType,
      jurisdiction: args.jurisdiction,
      reportingPeriod: {
        start: Date.now() - (30 * 24 * 60 * 60 * 1000),
        end: Date.now()
      },
      generatedAt: Date.now(),
      status: "draft",
      reportHash: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    return reportId;
  }
});

export const getInstitutionalAnalytics = query({
  args: {
    fundId: v.id("funds"),
    timeframe: v.union(
      v.literal("1m"),
      v.literal("3m"),
      v.literal("6m"),
      v.literal("1y"),
      v.literal("3y"),
      v.literal("5y"),
      v.literal("inception")
    )
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      return null;
    }

    const metadata = await ctx.db
      .query("institutionalFundMetadata")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .unique();

    // Calculate timeframe
    const now = Date.now();
    const timeframes = {
      "1m": 30 * 24 * 60 * 60 * 1000,
      "3m": 90 * 24 * 60 * 60 * 1000,
      "6m": 180 * 24 * 60 * 60 * 1000,
      "1y": 365 * 24 * 60 * 60 * 1000,
      "3y": 3 * 365 * 24 * 60 * 60 * 1000,
      "5y": 5 * 365 * 24 * 60 * 60 * 1000,
      "inception": now - fund.inceptionDate
    };

    const startTime = args.timeframe === "inception" ? fund.inceptionDate : 
                     now - timeframes[args.timeframe];

    // Get transactions and holdings for analysis
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .filter(q => q.gte(q.field("_creationTime"), startTime))
      .collect();

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .collect();

    const assets = await ctx.db
      .query("assets")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .collect();

    // Advanced analytics calculations
    const subscriptions = transactions.filter(t => t.type === "subscription");
    const redemptions = transactions.filter(t => t.type === "redemption");
    
    const totalSubscriptions = subscriptions.reduce((sum, t) => sum + t.amount, 0);
    const totalRedemptions = redemptions.reduce((sum, t) => sum + t.amount, 0);
    const netFlow = totalSubscriptions - totalRedemptions;

    // Performance metrics
    const currentValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
    const totalInvested = holdings.reduce((sum, h) => sum + h.costBasis, 0);
    const totalReturn = currentValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    // Risk metrics
    const assetAllocation = assets.reduce((acc, asset) => {
      const type = asset.assetType;
      acc[type] = (acc[type] || 0) + asset.currentValue;
      return acc;
    }, {} as Record<string, number>);

    // Concentration analysis
    const topHoldings = assets
      .sort((a, b) => b.currentValue - a.currentValue)
      .slice(0, 10)
      .map(asset => ({
        name: asset.name,
        symbol: asset.symbol,
        value: asset.currentValue,
        weight: currentValue > 0 ? (asset.currentValue / currentValue) * 100 : 0,
        type: asset.assetType
      }));

    return {
      fund: {
        name: fund.name,
        symbol: fund.symbol,
        nav: fund.nav,
        aum: fund.aum,
        status: fund.status
      },
      performance: {
        currentValue,
        totalInvested,
        totalReturn,
        returnPercentage,
        nav: fund.nav,
        highWaterMark: metadata?.performanceMetrics.highWaterMark || fund.nav,
        sharpeRatio: metadata?.performanceMetrics.sharpeRatio || 0,
        sortinoRatio: metadata?.performanceMetrics.sortinoRatio || 0,
        maxDrawdown: metadata?.performanceMetrics.maxDrawdown || 0,
        volatility: metadata?.performanceMetrics.volatility || 0,
        beta: metadata?.performanceMetrics.beta || 1.0,
        alpha: metadata?.performanceMetrics.alpha || 0
      },
      flows: {
        totalSubscriptions,
        totalRedemptions,
        netFlow,
        subscriptionCount: subscriptions.length,
        redemptionCount: redemptions.length
      },
      risk: {
        var95: fund.riskMetrics.var95,
        var99: metadata?.performanceMetrics.var99 || 0,
        maxDrawdown: fund.riskMetrics.maxDrawdown,
        volatility: fund.riskMetrics.volatility,
        beta: fund.riskMetrics.beta,
        concentrationRisk: Math.max(...Object.values(assetAllocation)) / currentValue * 100
      },
      allocation: {
        byAssetType: Object.entries(assetAllocation).map(([type, value]) => ({
          type,
          value,
          percentage: currentValue > 0 ? (value / currentValue) * 100 : 0
        })),
        topHoldings
      },
      investors: {
        total: new Set(holdings.map(h => h.investorId)).size,
        averageHolding: holdings.length > 0 ? currentValue / holdings.length : 0,
        totalHoldings: holdings.length
      },
      timeframe: args.timeframe,
      metadata: metadata?.strategy
    };
  }
});
