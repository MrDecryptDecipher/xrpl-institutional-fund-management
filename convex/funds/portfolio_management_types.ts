import { v } from "convex/values";

// Factory functions to create complex objects without causing deep type instantiation
// These functions help create properly structured objects while avoiding TypeScript issues

/**
 * Creates portfolio metrics object
 * @param options - Portfolio metrics options
 * @returns Properly structured portfolio metrics object
 */
export function createPortfolioMetrics(
  options: any = {}
): any {
  return {
    calculationId: options.calculationId,
    fundId: options.fundId,
    asOfDate: options.asOfDate,
    totalPortfolioValue: options.totalPortfolioValue,
    totalAssets: options.totalAssets,
    currentAllocations: options.currentAllocations,
    riskMetrics: options.riskMetrics,
    diversificationMetrics: options.diversificationMetrics,
    marketVolatility: options.marketVolatility,
    timestamp: options.timestamp
  };
}

/**
 * Creates trading instruction object
 * @param options - Trading instruction options
 * @returns Properly structured trading instruction object
 */
export function createTradingInstruction(
  options: any = {}
): any {
  return {
    assetId: options.assetId,
    symbol: options.symbol,
    tradeType: options.tradeType,
    shares: options.shares,
    dollarAmount: options.dollarAmount,
    currentPrice: options.currentPrice,
    currentWeight: options.currentWeight,
    targetWeight: options.targetWeight,
    weightDifference: options.weightDifference,
    priority: options.priority,
    expectedImpact: options.expectedImpact,
    liquidityAssessment: options.liquidityAssessment
  };
}

/**
 * Creates rebalancing record data object
 * @param options - Rebalancing record options
 * @returns Properly structured rebalancing record data object
 */
export function createRebalancingRecordData(
  options: any = {}
): any {
  return {
    fundId: options.fundId,
    rebalancingStrategy: options.rebalancingStrategy,
    targetAllocations: options.targetAllocations,
    rebalancingConstraints: options.rebalancingConstraints,
    currentPortfolioMetrics: options.currentPortfolioMetrics,
    riskAssessment: options.riskAssessment,
    complianceValidation: options.complianceValidation,
    tradingInstructions: options.tradingInstructions,
    executionMode: options.executionMode,
    approvalRequired: options.approvalRequired,
    status: options.status,
    createdAt: options.createdAt
  };
}

/**
 * Creates execution result object
 * @param options - Execution result options
 * @returns Properly structured execution result object
 */
export function createExecutionResult(
  options: any = {}
): any {
  return {
    assetId: options.assetId,
    symbol: options.symbol,
    status: options.status,
    executedShares: options.executedShares,
    executedPrice: options.executedPrice,
    executionCost: options.executionCost,
    txHash: options.txHash,
    error: options.error,
    timestamp: options.timestamp
  };
}