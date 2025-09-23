import { query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getInstitutionalAnalytics = query({
  args: {
    managerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }
    
    const managerId = args.managerId || userId;
    
    // Return mock analytics data for institutional dashboard
    return {
      performanceMetrics: {
        aum: 15750000000,
        returns: {
          ytd: 18.4,
          "1m": 2.7,
          "3m": 8.9,
          "6m": 12.3,
          "1y": 18.4,
          "3y": 42.8,
          "5y": 76.5
        },
        riskMetrics: {
          sharpeRatio: 2.34,
          sortino: 2.87,
          maxDrawdown: -4.2,
          alpha: 5.7,
          beta: 0.89,
          informationRatio: 1.67,
          trackingError: 3.2,
          var95: 2.8,
          var99: 4.1,
          leverageRatio: 1.85,
          concentrationRisk: 8.3
        }
      },
      assetAllocation: {
        byAssetClass: {
          equity: 42,
          fixedIncome: 28,
          alternatives: 18,
          cash: 7,
          commodities: 5
        },
        byGeography: {
          northAmerica: 45,
          europe: 25,
          asiaPacific: 20,
          emergingMarkets: 10
        },
        bySector: {
          technology: 22,
          financials: 18,
          healthcare: 15,
          consumerDiscretionary: 12,
          industrials: 10,
          communication: 8,
          utilities: 5,
          materials: 5,
          energy: 3,
          consumerStaples: 2
        }
      },
      investorMetrics: {
        totalInvestors: 847,
        newInvestors: 42,
        redemptionRequests: 12,
        averageInvestmentSize: 18600000
      }
    };
  }
});

export const getFundAnalytics = query({
  args: {
    fundId: v.id("funds"),
    timeframe: v.union(
      v.literal("7d"),
      v.literal("30d"),
      v.literal("90d"),
      v.literal("1y"),
      v.literal("all")
    )
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      return null;
    }
    
    // Calculate timeframe
    const now = Date.now();
    const timeframes = {
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "90d": 90 * 24 * 60 * 60 * 1000,
      "1y": 365 * 24 * 60 * 60 * 1000,
      "all": now
    };
    
    const startTime = args.timeframe === "all" ? 0 : now - timeframes[args.timeframe];
    
    // Get transactions in timeframe
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .filter(q => q.gte(q.field("_creationTime"), startTime))
      .collect();
    
    // Get current holdings
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_fund", q => q.eq("fundId", args.fundId))
      .filter(q => q.gt(q.field("shareTokens"), 0))
      .collect();
    
    // Calculate metrics
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
    
    // Investor metrics
    const uniqueInvestors = new Set(holdings.map(h => h.investorId)).size;
    const averageHolding = holdings.length > 0 ? currentValue / holdings.length : 0;
    
    // Transaction volume by day (for charts)
    const dailyVolume = transactions.reduce((acc, t) => {
      const date = new Date(t._creationTime).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      fund: {
        name: fund.name,
        symbol: fund.symbol,
        nav: fund.nav,
        aum: fund.aum,
        totalSupply: fund.totalSupply
      },
      performance: {
        currentValue,
        totalInvested,
        totalReturn,
        returnPercentage,
        nav: fund.nav
      },
      flows: {
        totalSubscriptions,
        totalRedemptions,
        netFlow,
        subscriptionCount: subscriptions.length,
        redemptionCount: redemptions.length
      },
      investors: {
        total: uniqueInvestors,
        averageHolding,
        holdings: holdings.length
      },
      transactions: {
        total: transactions.length,
        volume: transactions.reduce((sum, t) => sum + t.amount, 0),
        dailyVolume: Object.entries(dailyVolume).map(([date, volume]) => ({
          date,
          volume
        }))
      },
      timeframe: args.timeframe
    };
  }
});

export const getPortfolioAnalytics = query({
  args: {
    investorId: v.optional(v.id("investors"))
  },
  handler: async (ctx, args) => {
    let investorId = args.investorId;
    
    if (!investorId) {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        return null;
      }
      
      const investor = await ctx.db
        .query("investors")
        .withIndex("by_user", q => q.eq("userId", userId))
        .unique();
      
      if (!investor) {
        return null;
      }
      
      investorId = investor._id;
    }
    
    // Get all holdings
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_investor", q => q.eq("investorId", investorId))
      .filter(q => q.gt(q.field("shareTokens"), 0))
      .collect();
    
    if (holdings.length === 0) {
      return {
        totalValue: 0,
        totalInvested: 0,
        totalReturn: 0,
        returnPercentage: 0,
        holdings: [],
        allocation: [],
        performance: []
      };
    }
    
    // Enrich with fund data
    const enrichedHoldings = await Promise.all(
      holdings.map(async (holding) => {
        const fund = await ctx.db.get(holding.fundId);
        return {
          ...holding,
          fund: fund
        };
      })
    );
    
    // Calculate totals
    const totalValue = enrichedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
    const totalInvested = enrichedHoldings.reduce((sum, h) => sum + h.costBasis, 0);
    const totalReturn = totalValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
    
    // Calculate allocation
    const allocation = enrichedHoldings.map(h => ({
      fundName: h.fund?.name || "Unknown",
      fundSymbol: h.fund?.symbol || "N/A",
      value: h.currentValue,
      percentage: totalValue > 0 ? (h.currentValue / totalValue) * 100 : 0,
      fundType: h.fund?.fundType || "unknown"
    }));
    
    // Performance by fund
    const performance = enrichedHoldings.map(h => {
      const fundReturn = h.currentValue - h.costBasis;
      const fundReturnPercentage = h.costBasis > 0 ? (fundReturn / h.costBasis) * 100 : 0;
      
      return {
        fundName: h.fund?.name || "Unknown",
        fundSymbol: h.fund?.symbol || "N/A",
        invested: h.costBasis,
        currentValue: h.currentValue,
        return: fundReturn,
        returnPercentage: fundReturnPercentage,
        shares: h.shareTokens
      };
    });
    
    return {
      totalValue,
      totalInvested,
      totalReturn,
      returnPercentage,
      holdings: enrichedHoldings,
      allocation,
      performance
    };
  }
});

export const getMarketOverview = query({
  args: {},
  handler: async (ctx) => {
    // Get all active funds
    const funds = await ctx.db
      .query("funds")
      .withIndex("by_status", q => q.eq("status", "active"))
      .collect();
    
    if (funds.length === 0) {
      return {
        totalFunds: 0,
        totalAUM: 0,
        totalInvestors: 0,
        averageNAV: 0,
        fundsByType: [],
        topPerformers: []
      };
    }
    
    // Calculate market metrics
    const totalAUM = funds.reduce((sum, f) => sum + f.aum, 0);
    const averageNAV = funds.reduce((sum, f) => sum + f.nav, 0) / funds.length;
    
    // Get total unique investors across all funds
    const allHoldings = await ctx.db.query("holdings").collect();
    const uniqueInvestors = new Set(allHoldings.map(h => h.investorId)).size;
    
    // Fund distribution by type
    const fundsByType = funds.reduce((acc, fund) => {
      const type = fund.fundType;
      const existing = acc.find(item => item.type === type);
      if (existing) {
        existing.count += 1;
        existing.aum += fund.aum;
      } else {
        acc.push({
          type,
          count: 1,
          aum: fund.aum
        });
      }
      return acc;
    }, [] as Array<{ type: string; count: number; aum: number }>);
    
    // Top performing funds (by AUM for now, could be by returns)
    const topPerformers = funds
      .sort((a, b) => b.aum - a.aum)
      .slice(0, 5)
      .map(fund => ({
        name: fund.name,
        symbol: fund.symbol,
        aum: fund.aum,
        nav: fund.nav,
        type: fund.fundType
      }));
    
    return {
      totalFunds: funds.length,
      totalAUM,
      totalInvestors: uniqueInvestors,
      averageNAV,
      fundsByType,
      topPerformers
    };
  }
});
