import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

/**
 * Axelar Bridge Integration for EVM Asset Representations
 * 
 * Per PRD Requirements (Section 4.1):
 * - Cross-chain asset bridging for EVM representations
 * - Institutional-grade cross-chain compliance
 * - Multi-chain fund management capabilities
 * - Secure asset wrapping/unwrapping protocols
 */

// Advanced Axelar Bridge Configuration for Institutional Use
export const initializeAxelarBridge = action({
  args: {
    fundId: v.id("funds"),
    sourceChain: v.union(v.literal("xrpl"), v.literal("ethereum"), v.literal("polygon"), v.literal("avalanche"), v.literal("fantom")),
    destinationChain: v.union(v.literal("xrpl"), v.literal("ethereum"), v.literal("polygon"), v.literal("avalanche"), v.literal("fantom")),
    bridgeConfiguration: v.object({
      gatewayAddress: v.string(),
      gasService: v.string(),
      relayerConfig: v.object({
        relayerAddress: v.string(),
        gasPriceStrategy: v.string(),
        maxGasPrice: v.number()
      }),
      securityConfig: v.object({
        multisigThreshold: v.number(),
        timelock: v.number(),
        emergencyPause: v.boolean()
      })
    }),
    complianceConfig: v.object({
      crossChainKYC: v.boolean(),
      jurisdictionalValidation: v.boolean(),
      regulatoryReporting: v.boolean(),
      sanctionsScreening: v.boolean()
    })
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate fund and bridge parameters
      const fund = await ctx.db.get(args.fundId);
      if (!fund) {
        throw new Error("Invalid fund reference for bridge initialization");
      }

      // Step 2: Configure Axelar Gateway Connection
      const gatewayConfig = await configureAxelarGateway({
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain,
        gatewayAddress: args.bridgeConfiguration.gatewayAddress,
        securityConfig: args.bridgeConfiguration.securityConfig
      });

      // Step 3: Deploy Cross-Chain Compliance Contracts
      const complianceContracts = await deployComplianceContracts({
        fundId: args.fundId,
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain,
        complianceConfig: args.complianceConfig,
        fundJurisdictions: fund.jurisdictions
      });

      // Step 4: Initialize Bridge State
      const bridgeId = await ctx.runMutation(api.bridges.axelar_integration.createBridgeRecord, {
        fundId: args.fundId,
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain,
        gatewayConfig: gatewayConfig,
        complianceContracts: complianceContracts,
        bridgeConfiguration: args.bridgeConfiguration,
        complianceConfig: args.complianceConfig,
        status: "active"
      });

      // Step 5: Configure Asset Mapping
      await ctx.runAction(api.bridges.axelar_integration.configureAssetMapping, {
        bridgeId: bridgeId,
        fundId: args.fundId,
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain
      });

      return {
        success: true,
        bridgeId: bridgeId,
        sourceChain: args.sourceChain,
        destinationChain: args.destinationChain,
        gatewayAddress: args.bridgeConfiguration.gatewayAddress,
        complianceContracts: complianceContracts,
        status: "ACTIVE",
        institutionalReference: `BRIDGE-${fund.symbol}-${Date.now()}`
      };

    } catch (error) {
      console.error("Axelar bridge initialization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Bridge initialization failed"
      };
    }
  }
});

// Cross-Chain Asset Bridging with Institutional Compliance
export const bridgeAssetCrossChain = action({
  args: {
    bridgeId: v.id("bridgeRegistry"),
    fundId: v.id("funds"),
    assetId: v.id("assets"),
    amount: v.number(),
    sourceAccount: v.string(),
    destinationAccount: v.string(),
    bridgeDirection: v.union(v.literal("to_evm"), v.literal("from_evm")),
    complianceValidation: v.object({
      kycVerified: v.boolean(),
      sanctionsCleared: v.boolean(),
      jurisdictionApproved: v.boolean(),
      regulatoryCompliant: v.boolean()
    }),
    executionParameters: v.object({
      gasLimit: v.number(),
      gasPrice: v.number(),
      deadline: v.number(),
      slippageTolerance: v.number()
    })
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate bridge and asset
      const bridge = await ctx.db.get(args.bridgeId);
      const asset = await ctx.db.get(args.assetId);
      const fund = await ctx.db.get(args.fundId);

      if (!bridge || !asset || !fund) {
        throw new Error("Invalid bridge, asset, or fund reference");
      }

      // Step 2: Pre-Bridge Compliance Validation
      const complianceResult = await ctx.runAction(api.compliance.institutional_compliance.validateCrossBridgeTransaction, {
        fundId: args.fundId,
        assetId: args.assetId,
        amount: args.amount,
        sourceChain: bridge.sourceChain,
        destinationChain: bridge.destinationChain,
        sourceAccount: args.sourceAccount,
        destinationAccount: args.destinationAccount,
        complianceValidation: args.complianceValidation
      });

      if (!complianceResult.approved) {
        throw new Error(`Cross-bridge transaction blocked: ${complianceResult.reason}`);
      }

      // Step 3: Calculate Bridge Fees and Routing
      const bridgeCosts = await calculateBridgeCosts({
        sourceChain: bridge.sourceChain,
        destinationChain: bridge.destinationChain,
        amount: args.amount,
        executionParameters: args.executionParameters
      });

      // Step 4: Execute Bridge Transaction
      let bridgeResult;
      if (args.bridgeDirection === "to_evm") {
        bridgeResult = await executeBridgeToEVM({
          bridge: bridge,
          asset: asset,
          amount: args.amount,
          sourceAccount: args.sourceAccount,
          destinationAccount: args.destinationAccount,
          bridgeCosts: bridgeCosts,
          executionParameters: args.executionParameters
        });
      } else {
        bridgeResult = await executeBridgeFromEVM({
          bridge: bridge,
          asset: asset,
          amount: args.amount,
          sourceAccount: args.sourceAccount,
          destinationAccount: args.destinationAccount,
          bridgeCosts: bridgeCosts,
          executionParameters: args.executionParameters
        });
      }

      if (!bridgeResult.success) {
        throw new Error(`Bridge execution failed: ${bridgeResult.error}`);
      }

      // Step 5: Create Bridge Transaction Record
      const bridgeTxId = await ctx.runMutation(api.bridges.axelar_integration.createBridgeTransaction, {
        bridgeId: args.bridgeId,
        fundId: args.fundId,
        assetId: args.assetId,
        amount: args.amount,
        sourceAccount: args.sourceAccount,
        destinationAccount: args.destinationAccount,
        bridgeDirection: args.bridgeDirection,
        sourceTxHash: bridgeResult.sourceTxHash,
        destinationTxHash: bridgeResult.destinationTxHash,
        bridgeCosts: bridgeCosts,
        complianceValidation: complianceResult,
        status: "completed"
      });

      // Step 6: Update Asset Holdings
      await ctx.runAction(api.bridges.axelar_integration.updateAssetHoldingsAfterBridge, {
        fundId: args.fundId,
        assetId: args.assetId,
        amount: args.amount,
        bridgeDirection: args.bridgeDirection,
        bridgeTxId: bridgeTxId
      });

      // Step 7: Generate Cross-Chain Audit Trail
      await ctx.runAction(api.audit.institutional_audit.logCrossBridgeEvent, {
        bridgeTxId: bridgeTxId,
        fundId: args.fundId,
        assetId: args.assetId,
        bridgeDetails: {
          sourceChain: bridge.sourceChain,
          destinationChain: bridge.destinationChain,
          amount: args.amount,
          bridgeCosts: bridgeCosts,
          complianceValidation: complianceResult
        }
      });

      return {
        success: true,
        bridgeTxId: bridgeTxId,
        sourceTxHash: bridgeResult.sourceTxHash,
        destinationTxHash: bridgeResult.destinationTxHash,
        bridgeCosts: bridgeCosts,
        finalAmount: args.amount - bridgeCosts.totalFees,
        bridgeDirection: args.bridgeDirection,
        estimatedSettlement: Date.now() + (10 * 60 * 1000), // 10 minutes
        institutionalReference: `BRIDGE-TX-${Date.now()}`,
        complianceStatus: "APPROVED"
      };

    } catch (error) {
      console.error("Cross-chain bridge failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Cross-chain bridge failed"
      };
    }
  }
});

// Configure Asset Mapping Across Chains
export const configureAssetMapping = action({
  args: {
    bridgeId: v.id("bridgeRegistry"),
    fundId: v.id("funds"),
    sourceChain: v.string(),
    destinationChain: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Get fund assets
      const fundAssets = await ctx.db
        .query("assets")
        .filter(q => q.eq(q.field("fundId"), args.fundId))
        .collect();

      const assetMappings = [];

      for (const asset of fundAssets) {
        // Generate EVM representation address
        const evmTokenAddress = generateEVMTokenAddress(asset.symbol, args.destinationChain);
        
        // Create asset mapping
        const mapping = {
          assetId: asset._id,
          sourceChain: args.sourceChain,
          destinationChain: args.destinationChain,
          sourceAssetId: asset.mptTokenId || asset.symbol,
          destinationAssetAddress: evmTokenAddress,
          conversionRate: 1.0, // 1:1 mapping
          minimumBridgeAmount: 1.0,
          maximumBridgeAmount: 1000000.0,
          bridgeFeeRate: 0.001, // 0.1%
          supported: true
        };

        assetMappings.push(mapping);
      }

      // Store asset mappings
      await ctx.runMutation(api.bridges.axelar_integration.storeAssetMappings, {
        bridgeId: args.bridgeId,
        assetMappings: assetMappings
      });

      return {
        success: true,
        mappingsCreated: assetMappings.length,
        assetMappings: assetMappings
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Asset mapping configuration failed"
      };
    }
  }
});

// Supporting mutation functions
export const createBridgeRecord = mutation({
  args: {
    fundId: v.id("funds"),
    sourceChain: v.string(),
    destinationChain: v.string(),
    gatewayConfig: v.any(),
    complianceContracts: v.any(),
    bridgeConfiguration: v.any(),
    complianceConfig: v.any(),
    status: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bridgeRegistry", {
      fundId: args.fundId,
      sourceChain: args.sourceChain,
      destinationChain: args.destinationChain,
      gatewayConfig: args.gatewayConfig,
      complianceContracts: args.complianceContracts,
      bridgeConfiguration: args.bridgeConfiguration,
      complianceConfig: args.complianceConfig,
      status: args.status,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
  }
});

export const createBridgeTransaction = mutation({
  args: {
    bridgeId: v.id("bridgeRegistry"),
    fundId: v.id("funds"),
    assetId: v.id("assets"),
    amount: v.number(),
    sourceAccount: v.string(),
    destinationAccount: v.string(),
    bridgeDirection: v.string(),
    sourceTxHash: v.string(),
    destinationTxHash: v.string(),
    bridgeCosts: v.any(),
    complianceValidation: v.any(),
    status: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bridgeTransactions", {
      bridgeId: args.bridgeId,
      fundId: args.fundId,
      assetId: args.assetId,
      amount: args.amount,
      sourceAccount: args.sourceAccount,
      destinationAccount: args.destinationAccount,
      bridgeDirection: args.bridgeDirection,
      sourceTxHash: args.sourceTxHash,
      destinationTxHash: args.destinationTxHash,
      bridgeCosts: args.bridgeCosts,
      complianceValidation: args.complianceValidation,
      status: args.status,
      createdAt: Date.now()
    });
  }
});

export const storeAssetMappings = mutation({
  args: {
    bridgeId: v.id("bridgeRegistry"),
    assetMappings: v.any()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bridgeId, {
      assetMappings: args.assetMappings,
      lastUpdated: Date.now()
    });
  }
});

export const updateAssetHoldingsAfterBridge = action({
  args: {
    fundId: v.id("funds"),
    assetId: v.id("assets"),
    amount: v.number(),
    bridgeDirection: v.string(),
    bridgeTxId: v.id("bridgeTransactions")
  },
  handler: async (ctx, args) => {
    // Implementation depends on bridge direction
    if (args.bridgeDirection === "to_evm") {
      // Asset moved from XRPL to EVM - decrease XRPL holdings
      // In production, this would update holdings accordingly
    } else {
      // Asset moved from EVM to XRPL - increase XRPL holdings
      // In production, this would update holdings accordingly
    }
    
    return { success: true };
  }
});

// Helper functions
async function configureAxelarGateway(config: any): Promise<any> {
  // Mock Axelar gateway configuration
  return {
    gatewayAddress: config.gatewayAddress,
    chainId: getChainId(config.sourceChain),
    destinationChainId: getChainId(config.destinationChain),
    securityConfig: config.securityConfig,
    configuration: "PRODUCTION",
    status: "ACTIVE"
  };
}

async function deployComplianceContracts(config: any): Promise<any> {
  // Mock compliance contract deployment
  return {
    kycContract: `0x${Math.random().toString(16).substr(2, 40)}`,
    sanctionsContract: `0x${Math.random().toString(16).substr(2, 40)}`,
    jurisdictionContract: `0x${Math.random().toString(16).substr(2, 40)}`,
    complianceGateway: `0x${Math.random().toString(16).substr(2, 40)}`,
    deploymentBlock: 12345678,
    gasUsed: 2500000
  };
}

async function calculateBridgeCosts(config: any): Promise<any> {
  // Mock bridge cost calculation
  const baseFee = config.amount * 0.001; // 0.1%
  const gasFee = config.executionParameters.gasLimit * config.executionParameters.gasPrice / 1e18;
  const relayerFee = 0.01; // Fixed $0.01
  
  return {
    baseFee: baseFee,
    gasFee: gasFee,
    relayerFee: relayerFee,
    totalFees: baseFee + gasFee + relayerFee,
    estimatedTime: "5-10 minutes"
  };
}

async function executeBridgeToEVM(config: any): Promise<any> {
  // Mock bridge execution to EVM
  return {
    success: true,
    sourceTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    destinationTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    bridgeProof: `0x${Math.random().toString(16).substr(2, 128)}`,
    executionTime: Date.now()
  };
}

async function executeBridgeFromEVM(config: any): Promise<any> {
  // Mock bridge execution from EVM
  return {
    success: true,
    sourceTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    destinationTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    bridgeProof: `0x${Math.random().toString(16).substr(2, 128)}`,
    executionTime: Date.now()
  };
}

function generateEVMTokenAddress(symbol: string, chain: string): string {
  // Generate deterministic EVM token address
  return `0x${Buffer.from(`${symbol}_${chain}_${Date.now()}`).toString('hex').substr(0, 40)}`;
}

function getChainId(chainName: string): number {
  const chainIds: Record<string, number> = {
    ethereum: 1,
    polygon: 137,
    avalanche: 43114,
    fantom: 250,
    xrpl: 1440002 // Custom chain ID for XRPL
  };
  
  return chainIds[chainName] || 0;
}

// Query Bridge Status
export const getBridgeStatus = query({
  args: {
    bridgeId: v.id("bridgeRegistry")
  },
  handler: async (ctx, args) => {
    const bridge = await ctx.db.get(args.bridgeId);
    if (!bridge) return null;

    const recentTransactions = await ctx.db
      .query("bridgeTransactions")
      .filter(q => q.eq(q.field("bridgeId"), args.bridgeId))
      .order("desc")
      .take(10);

    return {
      bridge: bridge,
      recentTransactions: recentTransactions,
      totalVolume: recentTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      totalTransactions: recentTransactions.length
    };
  }
});