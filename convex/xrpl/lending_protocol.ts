import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Native Lending Protocol Implementation (XLS-65/66)
// Supports pooled lending with full on-chain lifecycle and compliance gating

export const createLendingPool = action({
  args: {
    fundId: v.optional(v.id("funds")),
    asset: v.string(),
    poolConfig: v.object({
      utilizationRate: v.number(),
      supplyRate: v.number(),
      borrowRate: v.number(),
      reserveFactor: v.number(),
      collateralFactor: v.number(),
      liquidationThreshold: v.number(),
      liquidationPenalty: v.number()
    }),
    poolOwner: v.string(),
    network: v.string(),
    eligibleBorrowers: v.array(v.string()),
    jurisdictionRestrictions: v.array(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Generate unique pool ID
      const poolId = `pool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create pool token for liquidity providers
      const poolTokenResult = await ctx.runAction(api.xrpl.mpt_advanced.createMPToken, {
        fundId: args.fundId,
        tokenConfig: {
          flags: 0x00000001, // lsfRequireAuth
          transferFee: 0,
          metadata: {
            name: `${args.asset} Pool Token`,
            symbol: `p${args.asset}`,
            description: `Liquidity pool token for ${args.asset} lending pool`,
            attributes: [
              { traitType: "Pool Type", value: "Lending" },
              { traitType: "Underlying Asset", value: args.asset },
              { traitType: "Pool ID", value: poolId }
            ]
          }
        },
        issuerAccount: args.poolOwner,
        network: args.network,
        requiresAuthorization: true,
        jurisdictionRestrictions: args.jurisdictionRestrictions,
        investorTypeRestrictions: []
      });

      if (!poolTokenResult.success) {
        throw new Error(`Pool token creation failed: ${poolTokenResult.error}`);
      }

      // Create lending pool transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.poolOwner,
        destination: args.poolOwner,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            poolId,
            asset: args.asset,
            poolTokenId: poolTokenResult.tokenId,
            config: args.poolConfig,
            eligibleBorrowers: args.eligibleBorrowers,
            action: "pool_create"
          })).toString('hex').toUpperCase(),
          type: Buffer.from("lending_pool_create").toString('hex').toUpperCase(),
          format: Buffer.from("application/json").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Pool creation failed: ${txResult.error}`);
      }

      // Store pool record
      await ctx.runMutation(api.xrpl.lending_protocol.storeLendingPool, {
        poolId,
        fundId: args.fundId,
        asset: args.asset,
        totalSupply: "0",
        totalBorrow: "0",
        utilizationRate: 0,
        supplyRate: args.poolConfig.supplyRate,
        borrowRate: args.poolConfig.borrowRate,
        reserveFactor: args.poolConfig.reserveFactor,
        collateralFactor: args.poolConfig.collateralFactor,
        liquidationThreshold: args.poolConfig.liquidationThreshold,
        liquidationPenalty: args.poolConfig.liquidationPenalty,
        poolTokenId: poolTokenResult.tokenId,
        collateralTokenIds: [],
        eligibleBorrowers: args.eligibleBorrowers,
        jurisdictionRestrictions: args.jurisdictionRestrictions,
        status: "active"
      });

      return {
        success: true,
        poolId,
        poolTokenId: poolTokenResult.tokenId,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Lending pool creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Pool creation failed"
      };
    }
  }
});

export const storeLendingPool = mutation({
  args: {
    poolId: v.string(),
    fundId: v.optional(v.id("funds")),
    asset: v.string(),
    totalSupply: v.string(),
    totalBorrow: v.string(),
    utilizationRate: v.number(),
    supplyRate: v.number(),
    borrowRate: v.number(),
    reserveFactor: v.number(),
    collateralFactor: v.number(),
    liquidationThreshold: v.number(),
    liquidationPenalty: v.number(),
    poolTokenId: v.string(),
    collateralTokenIds: v.array(v.string()),
    eligibleBorrowers: v.array(v.string()),
    jurisdictionRestrictions: v.array(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("paused"),
      v.literal("deprecated")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lendingPools", {
      poolId: args.poolId,
      fundId: args.fundId,
      asset: args.asset,
      totalSupply: args.totalSupply,
      totalBorrow: args.totalBorrow,
      utilizationRate: args.utilizationRate,
      supplyRate: args.supplyRate,
      borrowRate: args.borrowRate,
      reserveFactor: args.reserveFactor,
      collateralFactor: args.collateralFactor,
      liquidationThreshold: args.liquidationThreshold,
      liquidationPenalty: args.liquidationPenalty,
      poolTokenId: args.poolTokenId,
      collateralTokenIds: args.collateralTokenIds,
      eligibleBorrowers: args.eligibleBorrowers,
      jurisdictionRestrictions: args.jurisdictionRestrictions,
      createdAt: Date.now(),
      lastUpdate: Date.now(),
      status: args.status
    });
  }
});

export const supplyToPool = action({
  args: {
    poolId: v.string(),
    investorId: v.id("investors"),
    amount: v.string(),
    supplierAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const pool = await ctx.db
        .query("lendingPools")
        .filter(q => q.eq(q.field("poolId"), args.poolId))
        .unique();

      if (!pool || pool.status !== "active") {
        throw new Error("Pool not found or not active");
      }

      // Calculate pool tokens to mint
      const supplyAmount = parseFloat(args.amount);
      const currentSupply = parseFloat(pool.totalSupply);
      const poolTokensToMint = currentSupply === 0 ? supplyAmount : 
        (supplyAmount * currentSupply) / (currentSupply + parseFloat(pool.totalBorrow));

      // Submit supply transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.supplierAccount,
        amount: {
          currency: pool.asset,
          value: args.amount,
          issuer: args.supplierAccount
        },
        memos: [{
          data: Buffer.from(JSON.stringify({
            poolId: args.poolId,
            action: "supply",
            amount: args.amount,
            poolTokensToMint: poolTokensToMint.toString(),
            investorId: args.investorId
          })).toString('hex').toUpperCase(),
          type: Buffer.from("lending_supply").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Supply transaction failed: ${txResult.error}`);
      }

      // Create or update position
      const positionId = `${args.poolId}_${args.investorId}_supply`;
      
      const existingPosition = await ctx.db
        .query("lendingPositions")
        .filter(q => q.eq(q.field("positionId"), positionId))
        .unique();

      if (existingPosition) {
        await ctx.runMutation(api.xrpl.lending_protocol.updateLendingPosition, {
          positionId,
          amount: (parseFloat(existingPosition.amount) + supplyAmount).toString(),
          shares: (parseFloat(existingPosition.shares) + poolTokensToMint).toString(),
          lastTxHash: txResult.hash,
          lastLedgerIndex: txResult.ledgerIndex
        });
      } else {
        await ctx.runMutation(api.xrpl.lending_protocol.createLendingPosition, {
          positionId,
          poolId: pool._id,
          investorId: args.investorId,
          type: "supply",
          amount: args.amount,
          shares: poolTokensToMint.toString(),
          accruedInterest: "0",
          lastTxHash: txResult.hash,
          lastLedgerIndex: txResult.ledgerIndex,
          status: "active"
        });
      }

      // Update pool totals
      await ctx.runMutation(api.xrpl.lending_protocol.updatePoolTotals, {
        poolId: args.poolId,
        totalSupply: (currentSupply + supplyAmount).toString(),
        totalBorrow: pool.totalBorrow
      });

      return {
        success: true,
        positionId,
        poolTokensMinted: poolTokensToMint.toString(),
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Supply to pool failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Supply failed"
      };
    }
  }
});

export const borrowFromPool = action({
  args: {
    poolId: v.string(),
    investorId: v.id("investors"),
    borrowAmount: v.string(),
    collateralAmount: v.string(),
    collateralTokenId: v.string(),
    borrowerAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const pool = await ctx.db
        .query("lendingPools")
        .filter(q => q.eq(q.field("poolId"), args.poolId))
        .unique();

      if (!pool || pool.status !== "active") {
        throw new Error("Pool not found or not active");
      }

      // Check if borrower is eligible
      if (!pool.eligibleBorrowers.includes(args.borrowerAccount)) {
        throw new Error("Borrower not eligible for this pool");
      }

      // Calculate health factor
      const borrowValue = parseFloat(args.borrowAmount);
      const collateralValue = parseFloat(args.collateralAmount);
      const healthFactor = (collateralValue * pool.collateralFactor) / borrowValue;

      if (healthFactor < pool.liquidationThreshold) {
        throw new Error("Insufficient collateral for borrow amount");
      }

      // Submit borrow transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.borrowerAccount,
        amount: {
          currency: pool.asset,
          value: args.borrowAmount,
          issuer: pool.poolTokenId
        },
        memos: [{
          data: Buffer.from(JSON.stringify({
            poolId: args.poolId,
            action: "borrow",
            borrowAmount: args.borrowAmount,
            collateralAmount: args.collateralAmount,
            collateralTokenId: args.collateralTokenId,
            healthFactor: healthFactor.toString(),
            investorId: args.investorId
          })).toString('hex').toUpperCase(),
          type: Buffer.from("lending_borrow").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Borrow transaction failed: ${txResult.error}`);
      }

      // Create borrow position
      const positionId = `${args.poolId}_${args.investorId}_borrow_${Date.now()}`;
      
      await ctx.runMutation(api.xrpl.lending_protocol.createLendingPosition, {
        positionId,
        poolId: pool._id,
        investorId: args.investorId,
        type: "borrow",
        amount: args.borrowAmount,
        shares: "0",
        accruedInterest: "0",
        collateralAmount: args.collateralAmount,
        collateralTokenId: args.collateralTokenId,
        healthFactor,
        lastTxHash: txResult.hash,
        lastLedgerIndex: txResult.ledgerIndex,
        status: "active"
      });

      // Update pool totals
      const newTotalBorrow = parseFloat(pool.totalBorrow) + borrowValue;
      const newUtilizationRate = parseFloat(pool.totalSupply) > 0 ? 
        newTotalBorrow / parseFloat(pool.totalSupply) : 0;

      await ctx.runMutation(api.xrpl.lending_protocol.updatePoolTotals, {
        poolId: args.poolId,
        totalSupply: pool.totalSupply,
        totalBorrow: newTotalBorrow.toString(),
        utilizationRate: newUtilizationRate
      });

      return {
        success: true,
        positionId,
        healthFactor,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Borrow from pool failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Borrow failed"
      };
    }
  }
});

export const createLendingPosition = mutation({
  args: {
    positionId: v.string(),
    poolId: v.id("lendingPools"),
    investorId: v.id("investors"),
    type: v.union(v.literal("supply"), v.literal("borrow")),
    amount: v.string(),
    shares: v.string(),
    accruedInterest: v.string(),
    collateralAmount: v.optional(v.string()),
    collateralTokenId: v.optional(v.string()),
    healthFactor: v.optional(v.number()),
    lastTxHash: v.string(),
    lastLedgerIndex: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("liquidated"),
      v.literal("closed")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lendingPositions", {
      positionId: args.positionId,
      poolId: args.poolId,
      investorId: args.investorId,
      type: args.type,
      amount: args.amount,
      shares: args.shares,
      accruedInterest: args.accruedInterest,
      lastInterestUpdate: Date.now(),
      collateralAmount: args.collateralAmount,
      collateralTokenId: args.collateralTokenId,
      healthFactor: args.healthFactor,
      lastTxHash: args.lastTxHash,
      lastLedgerIndex: args.lastLedgerIndex,
      openedAt: Date.now(),
      lastUpdate: Date.now(),
      status: args.status
    });
  }
});

export const updateLendingPosition = mutation({
  args: {
    positionId: v.string(),
    amount: v.string(),
    shares: v.string(),
    lastTxHash: v.string(),
    lastLedgerIndex: v.number()
  },
  handler: async (ctx, args) => {
    const position = await ctx.db
      .query("lendingPositions")
      .filter(q => q.eq(q.field("positionId"), args.positionId))
      .unique();

    if (!position) {
      throw new Error("Position not found");
    }

    await ctx.db.patch(position._id, {
      amount: args.amount,
      shares: args.shares,
      lastTxHash: args.lastTxHash,
      lastLedgerIndex: args.lastLedgerIndex,
      lastUpdate: Date.now()
    });

    return { success: true };
  }
});

export const updatePoolTotals = mutation({
  args: {
    poolId: v.string(),
    totalSupply: v.string(),
    totalBorrow: v.string(),
    utilizationRate: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const pool = await ctx.db
      .query("lendingPools")
      .filter(q => q.eq(q.field("poolId"), args.poolId))
      .unique();

    if (!pool) {
      throw new Error("Pool not found");
    }

    const utilizationRate = args.utilizationRate ?? 
      (parseFloat(args.totalSupply) > 0 ? parseFloat(args.totalBorrow) / parseFloat(args.totalSupply) : 0);

    await ctx.db.patch(pool._id, {
      totalSupply: args.totalSupply,
      totalBorrow: args.totalBorrow,
      utilizationRate,
      lastUpdate: Date.now()
    });

    return { success: true };
  }
});

export const liquidatePosition = action({
  args: {
    positionId: v.string(),
    liquidatorAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const position = await ctx.db
        .query("lendingPositions")
        .filter(q => q.eq(q.field("positionId"), args.positionId))
        .unique();

      if (!position || position.type !== "borrow") {
        throw new Error("Invalid position for liquidation");
      }

      const pool = await ctx.db.get(position.poolId);
      if (!pool) {
        throw new Error("Pool not found");
      }

      // Check if position is eligible for liquidation
      if (!position.healthFactor || position.healthFactor >= pool.liquidationThreshold) {
        throw new Error("Position is not eligible for liquidation");
      }

      // Calculate liquidation amounts
      const borrowAmount = parseFloat(position.amount);
      const collateralAmount = parseFloat(position.collateralAmount || "0");
      const liquidationPenalty = collateralAmount * pool.liquidationPenalty;
      const liquidatorReward = liquidationPenalty * 0.5; // 50% to liquidator
      const protocolFee = liquidationPenalty * 0.5; // 50% to protocol

      // Submit liquidation transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.liquidatorAccount,
        amount: {
          currency: pool.asset,
          value: borrowAmount.toString(),
          issuer: pool.poolTokenId
        },
        memos: [{
          data: Buffer.from(JSON.stringify({
            positionId: args.positionId,
            action: "liquidate",
            borrowAmount: borrowAmount.toString(),
            collateralSeized: collateralAmount.toString(),
            liquidatorReward: liquidatorReward.toString(),
            protocolFee: protocolFee.toString()
          })).toString('hex').toUpperCase(),
          type: Buffer.from("lending_liquidation").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Liquidation transaction failed: ${txResult.error}`);
      }

      // Update position status
      await ctx.db.patch(position._id, {
        status: "liquidated",
        lastUpdate: Date.now()
      });

      // Update pool totals
      const newTotalBorrow = parseFloat(pool.totalBorrow) - borrowAmount;
      await ctx.runMutation(api.xrpl.lending_protocol.updatePoolTotals, {
        poolId: pool.poolId,
        totalSupply: pool.totalSupply,
        totalBorrow: newTotalBorrow.toString()
      });

      return {
        success: true,
        liquidatorReward: liquidatorReward.toString(),
        protocolFee: protocolFee.toString(),
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Position liquidation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Liquidation failed"
      };
    }
  }
});

export const getLendingPoolInfo = query({
  args: {
    poolId: v.string()
  },
  handler: async (ctx, args) => {
    const pool = await ctx.db
      .query("lendingPools")
      .filter(q => q.eq(q.field("poolId"), args.poolId))
      .unique();

    if (!pool) {
      return null;
    }

    // Get associated fund info if applicable
    let fundInfo = null;
    if (pool.fundId) {
      fundInfo = await ctx.db.get(pool.fundId);
    }

    // Get pool positions
    const positions = await ctx.db
      .query("lendingPositions")
      .filter(q => q.eq(q.field("poolId"), pool._id))
      .collect();

    return {
      ...pool,
      fund: fundInfo,
      positions: positions.length,
      activeSuppliers: positions.filter(p => p.type === "supply" && p.status === "active").length,
      activeBorrowers: positions.filter(p => p.type === "borrow" && p.status === "active").length
    };
  }
});

export const getInvestorLendingPositions = query({
  args: {
    investorId: v.id("investors")
  },
  handler: async (ctx, args) => {
    const positions = await ctx.db
      .query("lendingPositions")
      .filter(q => q.eq(q.field("investorId"), args.investorId))
      .collect();

    // Enrich with pool information
    const enrichedPositions = await Promise.all(
      positions.map(async (position) => {
        const pool = await ctx.db.get(position.poolId);
        return {
          ...position,
          pool
        };
      })
    );

    return enrichedPositions;
  }
});

export const calculateInterest = action({
  args: {
    positionId: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const position = await ctx.db
        .query("lendingPositions")
        .filter(q => q.eq(q.field("positionId"), args.positionId))
        .unique();

      if (!position) {
        throw new Error("Position not found");
      }

      const pool = await ctx.db.get(position.poolId);
      if (!pool) {
        throw new Error("Pool not found");
      }

      // Calculate time elapsed since last interest update
      const timeElapsed = Date.now() - position.lastInterestUpdate;
      const timeElapsedInYears = timeElapsed / (365 * 24 * 60 * 60 * 1000);

      // Calculate interest based on position type
      const principal = parseFloat(position.amount);
      const rate = position.type === "supply" ? pool.supplyRate : pool.borrowRate;
      const newInterest = principal * rate * timeElapsedInYears;
      const totalAccruedInterest = parseFloat(position.accruedInterest) + newInterest;

      // Update position with new accrued interest
      await ctx.db.patch(position._id, {
        accruedInterest: totalAccruedInterest.toString(),
        lastInterestUpdate: Date.now()
      });

      return {
        success: true,
        newInterest: newInterest.toString(),
        totalAccruedInterest: totalAccruedInterest.toString()
      };
    } catch (error) {
      console.error("Interest calculation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Interest calculation failed"
      };
    }
  }
});
