import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getRiskManagementData = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    // Return mock risk management data
    return {
      portfolioRisk: {
        var95: 3.2,
        var99: 5.1,
        expectedShortfall: 6.8,
        stressTestResults: [
          { scenario: "Market Crash", impact: -12.4 },
          { scenario: "Interest Rate Spike", impact: -8.7 },
          { scenario: "Liquidity Crisis", impact: -15.2 },
          { scenario: "Regulatory Change", impact: -4.3 },
          { scenario: "Geopolitical Event", impact: -7.9 }
        ]
      },
      riskExposures: {
        marketRisk: 68,
        creditRisk: 42,
        liquidityRisk: 35,
        operationalRisk: 28,
        counterpartyRisk: 45
      },
      riskAlerts: [
        { severity: "high", description: "Concentration risk in technology sector exceeds threshold", timestamp: "2024-01-15T08:23:45Z" },
        { severity: "medium", description: "Liquidity ratio below target for Fund XYZ", timestamp: "2024-01-14T16:42:12Z" },
        { severity: "medium", description: "Volatility increasing in emerging markets exposure", timestamp: "2024-01-13T11:05:33Z" },
        { severity: "low", description: "Minor deviation in duration target for fixed income portfolio", timestamp: "2024-01-12T09:18:27Z" }
      ]
    };
  }
});

export const getInstitutionalReports = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    // Return mock institutional reports data
    return {
      recentReports: [
        { id: "rep1", title: "Q4 2023 Performance Summary", type: "quarterly", date: "2024-01-15T10:00:00Z", status: "published" },
        { id: "rep2", title: "Annual Risk Assessment 2023", type: "annual", date: "2024-01-10T14:30:00Z", status: "published" },
        { id: "rep3", title: "ESG Impact Report", type: "special", date: "2023-12-20T09:15:00Z", status: "published" },
        { id: "rep4", title: "Regulatory Compliance Audit", type: "compliance", date: "2023-12-15T11:45:00Z", status: "published" },
        { id: "rep5", title: "Q1 2024 Outlook", type: "quarterly", date: "2024-01-20T08:00:00Z", status: "draft" }
      ],
      reportMetrics: {
        published: 42,
        inProgress: 8,
        scheduled: 12
      },
      regulatoryFilings: {
        completed: 18,
        upcoming: 3,
        overdue: 0
      }
    };
  }
});

export const getAdvancedFundAnalytics = query({
  args: {
    fundId: v.id("funds"),
    timeframe: v.union(
      v.literal("24h"),
      v.literal("7d"),
      v.literal("30d"),
      v.literal("90d"),
      v.literal("1y"),
      v.literal("all")
    ),
    metrics: v.optional(v.array(v.union(
      v.literal("performance"),
      v.literal("risk"),
      v.literal("liquidity"),
      v.literal("compliance"),
      v.literal("investor_behavior")
    )))
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) return null;

    // Calculate timeframe
    const now = Date.now();
    const timeframes = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "90d": 90 * 24 * 60 * 60 * 1000,
      "1y": 365 * 24 * 60 * 60 * 1000,
      "all": now
    };

    const startTime = args.timeframe === "all" ? 0 : now - timeframes[args.timeframe];

    // Get comprehensive data
    const [transactions, holdings, assets, priceFeeds] = await Promise.all([
      ctx.db.query("transactions")
        .withIndex("by_fund", q => q.eq("fundId", args.fundId))
        .filter(q => q.gte(q.field("_creationTime"), startTime))
        .collect(),
      ctx.db.query("holdings")
        .withIndex("by_fund", q => q.eq("fundId", args.fundId))
        .collect(),
      ctx.db.query("assets")
        .withIndex("by_fund", q => q.eq("fundId", args.fundId))
        .collect(),
      ctx.db.query("priceFeeds")
        .collect()
    ]);

    // Performance Analytics
    const performanceMetrics = calculatePerformanceMetrics(transactions, holdings, fund, startTime);
    
    // Risk Analytics
    const riskMetrics = calculateRiskMetrics(assets, priceFeeds, holdings, transactions);
    
    // Liquidity Analytics
    const liquidityMetrics = calculateLiquidityMetrics(transactions, holdings, fund);
    
    // Compliance Analytics
    const complianceMetrics = calculateComplianceMetrics(transactions, holdings);
    
    // Investor Behavior Analytics
    const behaviorMetrics = calculateInvestorBehaviorMetrics(transactions, holdings);

    return {
      fund: {
        id: fund._id,
        name: fund.name,
        symbol: fund.symbol,
        type: fund.fundType,
        status: fund.status
      },
      timeframe: args.timeframe,
      performance: performanceMetrics,
      risk: riskMetrics,
      liquidity: liquidityMetrics,
      compliance: complianceMetrics,
      investorBehavior: behaviorMetrics,
      summary: {
        totalTransactions: transactions.length,
        totalHolders: holdings.length,
        totalAssets: assets.length,
        lastUpdated: now
      }
    };
  }
});

export const getPortfolioRiskAnalysis = query({
  args: {
    investorId: v.optional(v.id("investors")),
    includeStressTest: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    let investorId = args.investorId;
    
    if (!investorId) {
      const userId = await getAuthUserId(ctx);
      if (!userId) return null;
      
      const investor = await ctx.db
        .query("investors")
        .withIndex("by_user", q => q.eq("userId", userId))
        .unique();
      
      if (!investor) return null;
      investorId = investor._id;
    }

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_investor", q => q.eq("investorId", investorId))
      .filter(q => q.gt(q.field("shareTokens"), 0))
      .collect();

    if (holdings.length === 0) {
      return {
        totalValue: 0,
        riskScore: 0,
        diversificationScore: 0,
        volatility: 0,
        holdings: [],
        riskBreakdown: {},
        recommendations: []
      };
    }

    // Get fund data for each holding
    const enrichedHoldings = await Promise.all(
      holdings.map(async (holding) => {
        const fund = await ctx.db.get(holding.fundId);
        const assets = await ctx.db
          .query("assets")
          .withIndex("by_fund", q => q.eq("fundId", holding.fundId))
          .collect();
        
        return { ...holding, fund, assets };
      })
    );

    // Calculate portfolio metrics
    const totalValue = enrichedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
    
    // Risk calculations
    const riskMetrics = calculatePortfolioRisk(enrichedHoldings, totalValue);
    
    // Diversification analysis
    const diversificationMetrics = calculateDiversification(enrichedHoldings, totalValue);
    
    // Stress testing (if requested)
    const stressTestResults = args.includeStressTest ? 
      performStressTest(enrichedHoldings, totalValue) : null;

    return {
      totalValue,
      riskScore: riskMetrics.overallRisk,
      diversificationScore: diversificationMetrics.score,
      volatility: riskMetrics.volatility,
      holdings: enrichedHoldings.map(h => ({
        fundName: h.fund?.name || "Unknown",
        value: h.currentValue,
        weight: (h.currentValue / totalValue) * 100,
        riskContribution: riskMetrics.individualRisks[h.fundId] || 0
      })),
      riskBreakdown: {
        byAssetType: diversificationMetrics.byAssetType,
        byGeography: diversificationMetrics.byGeography,
        byRiskLevel: riskMetrics.riskLevels
      },
      stressTest: stressTestResults,
      recommendations: generateRiskRecommendations(riskMetrics, diversificationMetrics)
    };
  }
});

export const getMarketIntelligence = query({
  args: {
    includeForecasts: v.optional(v.boolean()),
    includeSentiment: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    // Get all active funds and their data
    const funds = await ctx.db
      .query("funds")
      .withIndex("by_status", q => q.eq("status", "active"))
      .collect();

    const allTransactions = await ctx.db.query("transactions").collect();
    const allHoldings = await ctx.db.query("holdings").collect();
    const priceFeeds = await ctx.db.query("priceFeeds").collect();

    // Market overview metrics
    const marketMetrics = calculateMarketMetrics(funds, allTransactions, allHoldings);
    
    // Trend analysis
    const trendAnalysis = calculateMarketTrends(allTransactions, funds);
    
    // Sector analysis
    const sectorAnalysis = calculateSectorAnalysis(funds, allHoldings);
    
    // Performance rankings
    const performanceRankings = calculatePerformanceRankings(funds, allHoldings);

    // Market sentiment (if requested)
    const sentimentAnalysis = args.includeSentiment ? 
      calculateMarketSentiment(allTransactions, funds) : null;

    // Market forecasts (if requested)
    const forecasts = args.includeForecasts ? 
      generateMarketForecasts(trendAnalysis, marketMetrics) : null;

    return {
      overview: marketMetrics,
      trends: trendAnalysis,
      sectors: sectorAnalysis,
      rankings: performanceRankings,
      sentiment: sentimentAnalysis,
      forecasts: forecasts,
      lastUpdated: Date.now()
    };
  }
});

// Helper functions for calculations
function calculatePerformanceMetrics(transactions: any[], holdings: any[], fund: any, startTime: number) {
  const subscriptions = transactions.filter(t => t.type === "subscription");
  const redemptions = transactions.filter(t => t.type === "redemption");
  
  const totalInflow = subscriptions.reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = redemptions.reduce((sum, t) => sum + t.amount, 0);
  const netFlow = totalInflow - totalOutflow;
  
  const currentAUM = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.totalInvested, 0);
  
  return {
    netFlow,
    totalInflow,
    totalOutflow,
    currentAUM,
    totalReturn: currentAUM - totalInvested,
    returnPercentage: totalInvested > 0 ? ((currentAUM - totalInvested) / totalInvested) * 100 : 0,
    nav: fund.nav,
    navChange: 0, // Would calculate from historical data
    sharpeRatio: 0, // Would calculate with risk-free rate
    volatility: 0 // Would calculate from price history
  };
}

function calculateRiskMetrics(assets: any[], priceFeeds: any[], holdings: any[], transactions: any[]) {
  const assetTypes: Record<string, number> = assets.reduce((acc, asset) => {
    acc[asset.assetType] = (acc[asset.assetType] || 0) + asset.currentValue;
    return acc;
  }, {});

  const values = Object.values(assetTypes);
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const totalValue = values.reduce((sum, val) => sum + val, 0);
  const concentrationRisk = totalValue > 0 ? maxValue / totalValue : 0;

  return {
    concentrationRisk,
    assetTypeDistribution: assetTypes,
    liquidityRisk: 0.2, // Mock calculation
    creditRisk: 0.15, // Mock calculation
    marketRisk: 0.25, // Mock calculation
    overallRiskScore: (concentrationRisk + 0.2 + 0.15 + 0.25) / 4
  };
}

function calculateLiquidityMetrics(transactions: any[], holdings: any[], fund: any) {
  const recentRedemptions = transactions
    .filter(t => t.type === "redemption" && t._creationTime > Date.now() - 30 * 24 * 60 * 60 * 1000)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAUM = fund.aum;
  const redemptionRate = totalAUM > 0 ? (recentRedemptions / totalAUM) * 100 : 0;

  return {
    redemptionRate,
    liquidityRatio: 0.85, // Mock calculation
    averageHoldingPeriod: 180, // Mock: 180 days
    turnoverRate: 0.25 // Mock calculation
  };
}

function calculateComplianceMetrics(transactions: any[], holdings: any[]) {
  const complianceChecks = transactions.map(t => t.complianceChecks).filter(Boolean);
  const totalChecks = complianceChecks.length;
  const passedChecks = complianceChecks.filter(c => 
    c && c.kycVerified && c.amlCleared && c.jurisdictionAllowed && c.limitsRespected
  ).length;

  return {
    complianceRate: totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 100,
    kycComplianceRate: totalChecks > 0 ? complianceChecks.filter(c => c && c.kycVerified).length / totalChecks * 100 : 100,
    amlComplianceRate: totalChecks > 0 ? complianceChecks.filter(c => c && c.amlCleared).length / totalChecks * 100 : 100,
    jurisdictionComplianceRate: totalChecks > 0 ? complianceChecks.filter(c => c && c.jurisdictionAllowed).length / totalChecks * 100 : 100
  };
}

function calculateInvestorBehaviorMetrics(transactions: any[], holdings: any[]) {
  const investorIds = [...new Set(transactions.map(t => t.investorId).filter(Boolean))];
  
  return {
    totalInvestors: investorIds.length,
    activeInvestors: holdings.length,
    averageInvestment: holdings.length > 0 ? holdings.reduce((sum, h) => sum + h.totalInvested, 0) / holdings.length : 0,
    investorRetentionRate: 0.85, // Mock calculation
    newInvestorRate: 0.15 // Mock calculation
  };
}

function calculatePortfolioRisk(holdings: any[], totalValue: number) {
  // Mock risk calculations - in production, use actual risk models
  const weights = holdings.map(h => h.currentValue / totalValue);
  const risks = holdings.map(() => Math.random() * 0.3 + 0.1); // Mock individual risks
  
  const portfolioRisk = Math.sqrt(
    weights.reduce((sum, w, i) => sum + Math.pow(w * risks[i], 2), 0)
  );

  return {
    overallRisk: portfolioRisk,
    volatility: portfolioRisk * 100,
    individualRisks: holdings.reduce((acc, h, i) => {
      acc[h.fundId] = risks[i];
      return acc;
    }, {} as Record<string, number>),
    riskLevels: {
      low: weights.filter((_, i) => risks[i] < 0.2).reduce((sum, w) => sum + w, 0) * 100,
      medium: weights.filter((_, i) => risks[i] >= 0.2 && risks[i] < 0.35).reduce((sum, w) => sum + w, 0) * 100,
      high: weights.filter((_, i) => risks[i] >= 0.35).reduce((sum, w) => sum + w, 0) * 100
    }
  };
}

function calculateDiversification(holdings: any[], totalValue: number) {
  const typeDistribution: Record<string, number> = holdings.reduce((acc, h) => {
    const type = h.fund?.fundType || "unknown";
    acc[type] = (acc[type] || 0) + h.currentValue;
    return acc;
  }, {});

  const typeWeights = Object.values(typeDistribution).map((val) => val / totalValue);
  const diversificationScore = 1 - typeWeights.reduce((sum, w) => sum + w * w, 0);

  return {
    score: diversificationScore * 100,
    byAssetType: Object.entries(typeDistribution).map(([type, value]) => ({
      type,
      value,
      percentage: (value / totalValue) * 100
    })),
    byGeography: [
      { region: "North America", percentage: 40 },
      { region: "Europe", percentage: 30 },
      { region: "Asia Pacific", percentage: 20 },
      { region: "Other", percentage: 10 }
    ]
  };
}

function performStressTest(holdings: any[], totalValue: number) {
  const scenarios = [
    { name: "Market Crash (-30%)", impact: -0.3 },
    { name: "Interest Rate Spike", impact: -0.15 },
    { name: "Liquidity Crisis", impact: -0.25 },
    { name: "Regulatory Change", impact: -0.1 }
  ];

  return scenarios.map(scenario => ({
    name: scenario.name,
    portfolioImpact: scenario.impact * 100,
    newValue: totalValue * (1 + scenario.impact),
    worstCaseDrawdown: Math.abs(scenario.impact) * 100
  }));
}

function generateRiskRecommendations(riskMetrics: any, diversificationMetrics: any) {
  const recommendations = [];

  if (riskMetrics.overallRisk > 0.3) {
    recommendations.push("Consider reducing portfolio risk through diversification");
  }

  if (diversificationMetrics.score < 50) {
    recommendations.push("Improve diversification across asset types and geographies");
  }

  if (riskMetrics.riskLevels.high > 40) {
    recommendations.push("Reduce exposure to high-risk investments");
  }

  return recommendations;
}

function calculateMarketMetrics(funds: any[], transactions: any[], holdings: any[]) {
  const totalAUM = funds.reduce((sum, f) => sum + (f.aum || 0), 0);
  const totalFunds = funds.length;
  const totalInvestors = new Set(holdings.map(h => h.investorId)).size;
  const averageNAV = funds.length > 0 ? funds.reduce((sum, f) => sum + (f.nav || 0), 0) / funds.length : 0;

  return {
    totalAUM,
    totalFunds,
    totalInvestors,
    averageNAV,
    marketGrowth: 12.5, // Mock percentage
    volumeGrowth: 8.3 // Mock percentage
  };
}

function calculateMarketTrends(transactions: any[], funds: any[]) {
  // Mock trend calculations
  return {
    subscriptionTrend: "increasing",
    redemptionTrend: "stable",
    navTrend: "increasing",
    volumeTrend: "increasing"
  };
}

function calculateSectorAnalysis(funds: any[], holdings: any[]) {
  const sectorDistribution: Record<string, number> = funds.reduce((acc, fund) => {
    const fundType = fund.fundType || "unknown";
    acc[fundType] = (acc[fundType] || 0) + (fund.aum || 0);
    return acc;
  }, {});

  return Object.entries(sectorDistribution).map(([sector, aum]) => ({
    sector: sector.replace('_', ' '),
    aum,
    fundCount: funds.filter(f => f.fundType === sector).length,
    growth: Math.random() * 20 - 5 // Mock growth rate
  }));
}

function calculatePerformanceRankings(funds: any[], holdings: any[]) {
  return funds
    .map(fund => ({
      name: fund.name || "Unknown Fund",
      symbol: fund.symbol || "N/A",
      aum: fund.aum || 0,
      nav: fund.nav || 0,
      performance: Math.random() * 30 - 10 // Mock performance
    }))
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 10);
}

function calculateMarketSentiment(transactions: any[], funds: any[]) {
  const recentTransactions = transactions.filter(
    t => t._creationTime > Date.now() - 7 * 24 * 60 * 60 * 1000
  );

  const subscriptions = recentTransactions.filter(t => t.type === "subscription").length;
  const redemptions = recentTransactions.filter(t => t.type === "redemption").length;

  const sentimentScore = subscriptions > redemptions ? "bullish" : 
                        subscriptions < redemptions ? "bearish" : "neutral";

  return {
    overall: sentimentScore,
    confidence: 0.75,
    factors: [
      "Increased institutional adoption",
      "Regulatory clarity improvements",
      "Technology advancement"
    ]
  };
}

function generateMarketForecasts(trends: any, metrics: any) {
  return {
    nextQuarter: {
      aumGrowth: "8-12%",
      newFunds: "15-20",
      investorGrowth: "20-25%"
    },
    nextYear: {
      aumGrowth: "25-35%",
      newFunds: "50-75",
      investorGrowth: "100-150%"
    }
  };
}
