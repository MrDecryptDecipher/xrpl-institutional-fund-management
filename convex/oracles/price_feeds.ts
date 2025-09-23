import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Oracle Integration for Real-time Price Feeds and Market Data

export const updatePriceFeed = action({
  args: {
    symbol: v.string(),
    price: v.number(),
    source: v.string(),
    currency: v.string(),
    confidence: v.number(),
    spread: v.number(),
    volume: v.number(),
    network: v.string(),
    oracleAccount: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit price update to XRPL
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.oracleAccount,
        destination: args.oracleAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            symbol: args.symbol,
            price: args.price,
            source: args.source,
            currency: args.currency,
            confidence: args.confidence,
            timestamp: Date.now(),
            action: "price_update"
          })).toString('hex').toUpperCase(),
          type: Buffer.from("oracle_price_feed").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Price feed update failed: ${txResult.error}`);
      }

      // Store price feed data
      await ctx.runMutation(api.oracles.price_feeds.storePriceFeed, {
        symbol: args.symbol,
        source: args.source,
        price: args.price,
        currency: args.currency,
        timestamp: Date.now(),
        oracleId: txResult.hash,
        xrplLedgerIndex: txResult.ledgerIndex,
        confidence: args.confidence,
        spread: args.spread,
        volume: args.volume,
        lastUpdate: Date.now(),
        updateFrequency: 60000 // 1 minute
      });

      // Update asset prices for funds
      await ctx.runAction(api.oracles.price_feeds.updateAssetPrices, {
        symbol: args.symbol,
        newPrice: args.price
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("Price feed update failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Price feed update failed"
      };
    }
  }
});

export const storePriceFeed = mutation({
  args: {
    symbol: v.string(),
    source: v.string(),
    price: v.number(),
    currency: v.string(),
    timestamp: v.number(),
    oracleId: v.string(),
    xrplLedgerIndex: v.number(),
    confidence: v.number(),
    spread: v.number(),
    volume: v.number(),
    lastUpdate: v.number(),
    updateFrequency: v.number()
  },
  handler: async (ctx, args) => {
    // Check if price feed already exists
    const existingFeed = await ctx.db
      .query("priceFeeds")
      .filter(q => q.and(
        q.eq(q.field("symbol"), args.symbol),
        q.eq(q.field("source"), args.source)
      ))
      .unique();

    if (existingFeed) {
      // Update existing feed
      await ctx.db.patch(existingFeed._id, {
        price: args.price,
        timestamp: args.timestamp,
        oracleId: args.oracleId,
        xrplLedgerIndex: args.xrplLedgerIndex,
        confidence: args.confidence,
        spread: args.spread,
        volume: args.volume,
        lastUpdate: args.lastUpdate
      });
      return existingFeed._id;
    } else {
      // Create new feed
      return await ctx.db.insert("priceFeeds", {
        symbol: args.symbol,
        source: args.source,
        price: args.price,
        currency: args.currency,
        timestamp: args.timestamp,
        oracleId: args.oracleId,
        xrplLedgerIndex: args.xrplLedgerIndex,
        confidence: args.confidence,
        spread: args.spread,
        volume: args.volume,
        lastUpdate: args.lastUpdate,
        updateFrequency: args.updateFrequency
      });
    }
  }
});

export const updateAssetPrices = action({
  args: {
    symbol: v.string(),
    newPrice: v.number()
  },
  handler: async (ctx, args) => {
    try {
      // Get all assets with this symbol
      const assets = await ctx.db
        .query("assets")
        .filter(q => q.eq(q.field("symbol"), args.symbol))
        .collect();

      // Update asset prices and calculate new values
      for (const asset of assets) {
        const oldPrice = asset.currentPrice;
        const newValue = asset.quantity * args.newPrice;
        const unrealizedGainLoss = newValue - asset.costBasis;

        await ctx.db.patch(asset._id, {
          currentPrice: args.newPrice,
          currentValue: newValue,
          unrealizedGainLoss,
          lastValuation: Date.now()
        });

        // Trigger NAV recalculation for the fund
        if (Math.abs(args.newPrice - oldPrice) / oldPrice > 0.01) { // 1% price change threshold
          await ctx.runAction(api.funds.advanced_management.calculateNAV, {
            fundId: asset.fundId
          });
        }
      }

      return {
        success: true,
        assetsUpdated: assets.length
      };
    } catch (error) {
      console.error("Asset price update failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Asset price update failed"
      };
    }
  }
});

export const getLatestPrice = query({
  args: {
    symbol: v.string(),
    source: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("priceFeeds")
      .filter(q => q.eq(q.field("symbol"), args.symbol));

    if (args.source) {
      query = query.filter(q => q.eq(q.field("source"), args.source));
    }

    const priceFeeds = await query
      .order("desc")
      .take(1);

    return priceFeeds[0] || null;
  }
});

export const getPriceHistory = query({
  args: {
    symbol: v.string(),
    source: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("priceFeeds")
      .filter(q => q.eq(q.field("symbol"), args.symbol));

    if (args.source) {
      query = query.filter(q => q.eq(q.field("source"), args.source));
    }

    const priceFeeds = await query
      .filter(q => q.and(
        q.gte(q.field("timestamp"), args.startTime),
        q.lte(q.field("timestamp"), args.endTime)
      ))
      .order("desc")
      .take(args.limit || 1000);

    return priceFeeds.map(feed => ({
      timestamp: feed.timestamp,
      price: feed.price,
      volume: feed.volume,
      confidence: feed.confidence
    }));
  }
});

export const aggregatePrices = query({
  args: {
    symbol: v.string(),
    sources: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const priceFeeds = await Promise.all(
      args.sources.map(source =>
        ctx.db
          .query("priceFeeds")
          .filter(q => q.and(
            q.eq(q.field("symbol"), args.symbol),
            q.eq(q.field("source"), source)
          ))
          .order("desc")
          .take(1)
      )
    );

    const validFeeds = priceFeeds
      .flat()
      .filter(feed => feed && Date.now() - feed.timestamp < 300000); // 5 minutes freshness

    if (validFeeds.length === 0) {
      return null;
    }

    // Calculate weighted average based on confidence
    const totalWeight = validFeeds.reduce((sum, feed) => sum + feed.confidence, 0);
    const weightedPrice = validFeeds.reduce((sum, feed) => 
      sum + (feed.price * feed.confidence), 0) / totalWeight;

    const prices = validFeeds.map(feed => feed.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const spread = ((maxPrice - minPrice) / weightedPrice) * 100;

    return {
      symbol: args.symbol,
      aggregatedPrice: weightedPrice,
      minPrice,
      maxPrice,
      spread,
      confidence: totalWeight / validFeeds.length,
      sourceCount: validFeeds.length,
      timestamp: Date.now(),
      sources: validFeeds.map(feed => ({
        source: feed.source,
        price: feed.price,
        confidence: feed.confidence,
        timestamp: feed.timestamp
      }))
    };
  }
});

export const validatePriceFeed = action({
  args: {
    symbol: v.string(),
    price: v.number(),
    source: v.string(),
    timestamp: v.number()
  },
  handler: async (ctx, args) => {
    try {
      // Get recent prices for comparison
      const recentFeeds = await ctx.db
        .query("priceFeeds")
        .filter(q => q.eq(q.field("symbol"), args.symbol))
        .filter(q => q.gte(q.field("timestamp"), args.timestamp - 3600000)) // Last hour
        .order("desc")
        .take(10);

      if (recentFeeds.length === 0) {
        return {
          valid: true,
          confidence: 0.5,
          reason: "No recent data for comparison"
        };
      }

      const recentPrices = recentFeeds.map(feed => feed.price);
      const avgPrice = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length;
      const priceDeviation = Math.abs(args.price - avgPrice) / avgPrice;

      // Validation rules
      const maxDeviation = 0.1; // 10% maximum deviation
      const isValid = priceDeviation <= maxDeviation;
      
      let confidence = 1.0;
      if (priceDeviation > 0.05) { // 5% deviation reduces confidence
        confidence = Math.max(0.1, 1.0 - (priceDeviation - 0.05) * 10);
      }

      // Check for source reliability
      const sourceFeeds = recentFeeds.filter(feed => feed.source === args.source);
      const sourceReliability = sourceFeeds.length > 0 ? 
        sourceFeeds.reduce((sum, feed) => sum + feed.confidence, 0) / sourceFeeds.length : 0.5;

      confidence *= sourceReliability;

      return {
        valid: isValid,
        confidence: Math.max(0.1, Math.min(1.0, confidence)),
        priceDeviation,
        avgPrice,
        reason: isValid ? "Price within acceptable range" : "Price deviation too high"
      };
    } catch (error) {
      console.error("Price validation failed:", error);
      return {
        valid: false,
        confidence: 0.1,
        reason: "Validation error"
      };
    }
  }
});

export const createPriceAlert = mutation({
  args: {
    symbol: v.string(),
    targetPrice: v.number(),
    condition: v.union(v.literal("above"), v.literal("below")),
    userId: v.id("users"),
    active: v.boolean()
  },
  handler: async (ctx, args) => {
    // In a full implementation, this would create price alerts
    // For now, we'll just return success
    return {
      success: true,
      alertId: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }
});

export const getMarketSummary = query({
  args: {
    symbols: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const summaries = await Promise.all(
      args.symbols.map(async (symbol) => {
        const latestPrice = await ctx.runQuery(api.oracles.price_feeds.getLatestPrice, {
          symbol
        });

        if (!latestPrice) {
          return {
            symbol,
            price: null,
            change24h: null,
            volume24h: null,
            lastUpdate: null
          };
        }

        // Get 24h ago price for change calculation
        const price24hAgo = await ctx.db
          .query("priceFeeds")
          .filter(q => q.eq(q.field("symbol"), symbol))
          .filter(q => q.lte(q.field("timestamp"), Date.now() - 24 * 60 * 60 * 1000))
          .order("desc")
          .take(1);

        const change24h = price24hAgo.length > 0 ? 
          ((latestPrice.price - price24hAgo[0].price) / price24hAgo[0].price) * 100 : null;

        return {
          symbol,
          price: latestPrice.price,
          change24h,
          volume24h: latestPrice.volume,
          confidence: latestPrice.confidence,
          lastUpdate: latestPrice.timestamp,
          source: latestPrice.source
        };
      })
    );

    return summaries;
  }
});
