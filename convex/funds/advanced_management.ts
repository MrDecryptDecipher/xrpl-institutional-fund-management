import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

// Advanced Fund Management with Full XRPL Integration

export const createInstitutionalFund = action({
  args: {
    fundDetails: v.object({
      name: v.string(),
      symbol: v.string(),
      description: v.string(),
      fundType: v.union(
        v.literal("equity"),
        v.literal("fixed_income"),
        v.literal("hybrid"),
        v.literal("real_estate"),
        v.literal("commodity"),
        v.literal("crypto"),
        v.literal("private_equity"),
        v.literal("hedge_fund")
      ),
      minimumInvestment: v.number(),
      managementFee: v.number(),
      performanceFee: v.number(),
      baseCurrency: v.string(),
      fiscalYearEnd: v.string()
    }),
    xrplConfig: v.object({
      network: v.string(),
      fundAccount: v.string(),
      requiresAuthorization: v.boolean()
    }),
    complianceConfig: v.object({
      jurisdictions: v.array(v.string()),
      kycRequired: v.boolean(),
      amlRequired: v.boolean(),
      accreditedOnly: v.boolean(),
      geographicRestrictions: v.array(v.string()),
      maxInvestors: v.number(),
      maxRetailPercentage: v.number()
    }),
    riskProfile: v.union(
      v.literal("conservative"),
      v.literal("moderate"),
      v.literal("aggressive"),
      v.literal("speculative")
    ),
    serviceProviders: v.object({
      custodian: v.optional(v.string()),
      administrator: v.optional(v.string()),
      auditor: v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    try {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        throw new Error("Authentication required");
      }

      // Create fund share token (MPT)
      const shareTokenResult = await ctx.runAction(api.xrpl.mpt_advanced.createMPToken, {
        tokenConfig: {
          flags: args.xrplConfig.requiresAuthorization ? 0x00000001 : 0x00000000,
          transferFee: Math.floor(args.fundDetails.managementFee * 1000), // Convert to basis points
          metadata: {
            name: `${args.fundDetails.name} Shares`,
            symbol: args.fundDetails.symbol,
            description: `Tokenized shares of ${args.fundDetails.name}`,
            attributes: [
              { traitType: "Fund Type", value: args.fundDetails.fundType },
              { traitType: "Base Currency", value: args.fundDetails.baseCurrency },
              { traitType: "Management Fee", value: `${args.fundDetails.managementFee}%` },
              { traitType: "Performance Fee", value: `${args.fundDetails.performanceFee}%` }
            ]
          }
        },
        issuerAccount: args.xrplConfig.fundAccount,
        network: args.xrplConfig.network,
        requiresAuthorization: args.xrplConfig.requiresAuthorization,
        jurisdictionRestrictions: args.complianceConfig.geographicRestrictions,
        investorTypeRestrictions: args.complianceConfig.accreditedOnly ? ["accredited", "institutional"] : []
      });

      if (!shareTokenResult.success) {
        throw new Error(`Share token creation failed: ${shareTokenResult.error}`);
      }

      // Create permissioned domain for fund access
      const domainResult = await ctx.runAction(api.xrpl.permissioned_domains.createPermissionedDomain, {
        domain: `${args.fundDetails.symbol.toLowerCase()}.fund`,
        owner: args.xrplConfig.fundAccount,
        network: args.xrplConfig.network,
        accessRules: [
          {
            credentialType: "KYCCredential",
            issuer: args.xrplConfig.fundAccount,
            required: args.complianceConfig.kycRequired,
            expiryCheck: true
          },
          {
            credentialType: "AMLCredential", 
            issuer: args.xrplConfig.fundAccount,
            required: args.complianceConfig.amlRequired,
            expiryCheck: true
          },
          {
            credentialType: "AccreditationCredential",
            issuer: args.xrplConfig.fundAccount,
            required: args.complianceConfig.accreditedOnly,
            expiryCheck: true
          }
        ],
        kycRequired: args.complianceConfig.kycRequired,
        amlRequired: args.complianceConfig.amlRequired,
        jurisdictionRestrictions: args.complianceConfig.geographicRestrictions
      });

      if (!domainResult.success) {
        throw new Error(`Domain creation failed: ${domainResult.error}`);
      }

      // Store fund record
      const fundId = await ctx.runMutation(api.funds.advanced_management.storeFund, {
        name: args.fundDetails.name,
        symbol: args.fundDetails.symbol,
        description: args.fundDetails.description,
        fundType: args.fundDetails.fundType,
        managerId: userId,
        status: "draft",
        aum: 0,
        nav: 1.0, // Initial NAV
        sharePrice: 1.0,
        totalShares: 0,
        outstandingShares: 0,
        minimumInvestment: args.fundDetails.minimumInvestment,
        managementFee: args.fundDetails.managementFee,
        performanceFee: args.fundDetails.performanceFee,
        xrplAccount: args.xrplConfig.fundAccount,
        mptTokenId: shareTokenResult.tokenId,
        domainId: domainResult.domainId,
        jurisdictions: args.complianceConfig.jurisdictions,
        complianceMatrix: {
          kycRequired: args.complianceConfig.kycRequired,
          amlRequired: args.complianceConfig.amlRequired,
          accreditedOnly: args.complianceConfig.accreditedOnly,
          geographicRestrictions: args.complianceConfig.geographicRestrictions,
          investorLimits: {
            maxInvestors: args.complianceConfig.maxInvestors,
            maxRetailPercentage: args.complianceConfig.maxRetailPercentage
          }
        },
        riskProfile: args.riskProfile,
        riskMetrics: {
          var95: 0,
          sharpeRatio: 0,
          maxDrawdown: 0,
          beta: 1.0,
          volatility: 0
        },
        inceptionDate: Date.now(),
        fiscalYearEnd: args.fundDetails.fiscalYearEnd,
        baseCurrency: args.fundDetails.baseCurrency,
        custodian: args.serviceProviders.custodian,
        administrator: args.serviceProviders.administrator,
        auditor: args.serviceProviders.auditor,
        lastValuation: Date.now(),
        nextValuation: Date.now() + 24 * 60 * 60 * 1000 // Next day
      });

      // Create audit log
      await ctx.runMutation(api.funds.advanced_management.logFundCreation, {
        fundId,
        shareTokenId: shareTokenResult.tokenId,
        domainId: domainResult.domainId,
        createdBy: userId,
        xrplTxHash: shareTokenResult.txHash
      });

      return {
        success: true,
        fundId,
        shareTokenId: shareTokenResult.tokenId,
        domainId: domainResult.domainId,
        txHash: shareTokenResult.txHash,
        ledgerIndex: shareTokenResult.ledgerIndex
      };
    } catch (error) {
      console.error("Fund creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Fund creation failed"
      };
    }
  }
});

export const storeFund = mutation({
  args: {
    name: v.string(),
    symbol: v.string(),
    description: v.string(),
    fundType: v.union(
      v.literal("equity"),
      v.literal("fixed_income"),
      v.literal("hybrid"),
      v.literal("real_estate"),
      v.literal("commodity"),
      v.literal("crypto"),
      v.literal("private_equity"),
      v.literal("hedge_fund")
    ),
    managerId: v.id("users"),
    status: v.union(
      v.literal("draft"),
      v.literal("pending_approval"),
      v.literal("active"),
      v.literal("suspended"),
      v.literal("liquidating"),
      v.literal("closed")
    ),
    aum: v.number(),
    nav: v.number(),
    sharePrice: v.number(),
    totalShares: v.number(),
    outstandingShares: v.number(),
    minimumInvestment: v.number(),
    managementFee: v.number(),
    performanceFee: v.number(),
    xrplAccount: v.string(),
    mptTokenId: v.string(),
    domainId: v.string(),
    jurisdictions: v.array(v.string()),
    complianceMatrix: v.object({
      kycRequired: v.boolean(),
      amlRequired: v.boolean(),
      accreditedOnly: v.boolean(),
      geographicRestrictions: v.array(v.string()),
      investorLimits: v.object({
        maxInvestors: v.number(),
        maxRetailPercentage: v.number()
      })
    }),
    riskProfile: v.union(
      v.literal("conservative"),
      v.literal("moderate"),
      v.literal("aggressive"),
      v.literal("speculative")
    ),
    riskMetrics: v.object({
      var95: v.number(),
      sharpeRatio: v.number(),
      maxDrawdown: v.number(),
      beta: v.number(),
      volatility: v.number()
    }),
    inceptionDate: v.number(),
    fiscalYearEnd: v.string(),
    baseCurrency: v.string(),
    custodian: v.optional(v.string()),
    administrator: v.optional(v.string()),
    auditor: v.optional(v.string()),
    lastValuation: v.number(),
    nextValuation: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("funds", {
      name: args.name,
      symbol: args.symbol,
      description: args.description,
      fundType: args.fundType,
      managerId: args.managerId,
      status: args.status,
      aum: args.aum,
      nav: args.nav,
      sharePrice: args.sharePrice,
      totalShares: args.totalShares,
      outstandingShares: args.outstandingShares,
      minimumInvestment: args.minimumInvestment,
      managementFee: args.managementFee,
      performanceFee: args.performanceFee,
      xrplAccount: args.xrplAccount,
      mptTokenId: args.mptTokenId,
      domainId: args.domainId,
      didDocument: undefined,
      jurisdictions: args.jurisdictions,
      regulatoryStatus: {
        mas: undefined,
        finma: undefined,
        esma: undefined,
        vara: undefined,
        sfc: undefined,
        sec: undefined
      },
      complianceMatrix: args.complianceMatrix,
      riskProfile: args.riskProfile,
      riskMetrics: args.riskMetrics,
      inceptionDate: args.inceptionDate,
      fiscalYearEnd: args.fiscalYearEnd,
      baseCurrency: args.baseCurrency,
      custodian: args.custodian,
      administrator: args.administrator,
      auditor: args.auditor,
      prospectusHash: undefined,
      factsheetHash: undefined,
      lastValuation: args.lastValuation,
      nextValuation: args.nextValuation
    });
  }
});

export const logFundCreation = mutation({
  args: {
    fundId: v.id("funds"),
    shareTokenId: v.string(),
    domainId: v.string(),
    createdBy: v.id("users"),
    xrplTxHash: v.string()
  },
  handler: async (ctx, args) => {
    const eventId = `fund_creation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return await ctx.db.insert("auditLogs", {
      eventId,
      eventType: "fund_creation",
      entityType: "fund",
      entityId: args.fundId,
      action: "create_fund",
      actor: args.createdBy,
      timestamp: Date.now(),
      changes: {
        shareTokenId: args.shareTokenId,
        domainId: args.domainId,
        status: "draft"
      },
      xrplTxHash: args.xrplTxHash,
      xrplLedgerIndex: undefined,
      complianceRules: ["fund_creation", "token_issuance"],
      jurisdictions: [],
      hash: Buffer.from(`${eventId}_${args.xrplTxHash}_${Date.now()}`).toString('hex')
    });
  }
});

export const processSubscription = action({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    amount: v.number(),
    investorAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const fund = await ctx.db.get(args.fundId);
      if (!fund || fund.status !== "active") {
        throw new Error("Fund not available for investment");
      }

      const investor = await ctx.db.get(args.investorId);
      if (!investor || investor.status !== "active") {
        throw new Error("Investor not eligible");
      }

      // Verify compliance
      const complianceResult = await ctx.runAction(api.funds.advanced_management.verifyInvestorCompliance, {
        fundId: args.fundId,
        investorId: args.investorId
      });

      if (!complianceResult.compliant) {
        throw new Error(`Compliance check failed: ${complianceResult.reason}`);
      }

      // Check minimum investment
      if (args.amount < fund.minimumInvestment) {
        throw new Error(`Investment amount below minimum of ${fund.minimumInvestment}`);
      }

      // Calculate shares to issue
      const sharesToIssue = args.amount / fund.sharePrice;

      // Submit subscription transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.investorAccount,
        destination: fund.xrplAccount,
        amount: args.amount.toString(),
        memos: [{
          data: Buffer.from(JSON.stringify({
            fundId: args.fundId,
            investorId: args.investorId,
            action: "subscription",
            amount: args.amount,
            shares: sharesToIssue,
            sharePrice: fund.sharePrice
          })).toString('hex').toUpperCase(),
          type: Buffer.from("fund_subscription").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Subscription transaction failed: ${txResult.error}`);
      }

      // Issue share tokens to investor
      const shareIssuanceResult = await ctx.runAction(api.xrpl.mpt_advanced.authorizeMPTokenHolder, {
        tokenId: fund.mptTokenId!,
        holderAccount: args.investorAccount,
        issuerAccount: fund.xrplAccount,
        network: args.network,
        authorize: true
      });

      if (!shareIssuanceResult.success) {
        throw new Error(`Share token authorization failed: ${shareIssuanceResult.error}`);
      }

      // Create transaction record
      const transactionId = await ctx.runMutation(api.funds.advanced_management.createTransaction, {
        type: "subscription",
        fundId: args.fundId,
        investorId: args.investorId,
        amount: args.amount,
        shares: sharesToIssue,
        pricePerShare: fund.sharePrice,
        xrplTransactionHash: txResult.hash,
        xrplLedgerIndex: txResult.ledgerIndex,
        status: "settled",
        complianceChecks: {
          kycVerified: true,
          amlCleared: true,
          sanctionsScreened: true,
          jurisdictionAllowed: true,
          limitsRespected: true,
          accreditationVerified: complianceResult.accredited
        },
        managementFee: 0,
        performanceFee: 0,
        transactionFee: 0,
        custodyFee: 0,
        reference: `SUB_${Date.now()}`
      });

      // Update or create holding
      await ctx.runMutation(api.funds.advanced_management.updateHolding, {
        investorId: args.investorId,
        fundId: args.fundId,
        additionalShares: sharesToIssue,
        additionalInvestment: args.amount,
        transactionType: "subscription"
      });

      // Update fund totals
      await ctx.runMutation(api.funds.advanced_management.updateFundTotals, {
        fundId: args.fundId,
        additionalAUM: args.amount,
        additionalShares: sharesToIssue
      });

      return {
        success: true,
        transactionId,
        sharesIssued: sharesToIssue,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Subscription processing failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Subscription failed"
      };
    }
  }
});

export const verifyInvestorCompliance = action({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors")
  },
  handler: async (ctx, args) => {
    try {
      const fund = await ctx.db.get(args.fundId);
      const investor = await ctx.db.get(args.investorId);

      if (!fund || !investor) {
        return {
          compliant: false,
          reason: "Fund or investor not found"
        };
      }

      // Check KYC status
      if (fund.complianceMatrix.kycRequired && investor.kycStatus !== "approved") {
        return {
          compliant: false,
          reason: "KYC verification required"
        };
      }

      // Check AML status
      if (fund.complianceMatrix.amlRequired && investor.amlStatus !== "cleared") {
        return {
          compliant: false,
          reason: "AML clearance required"
        };
      }

      // Check accreditation
      const isAccredited = ["accredited", "qualified_purchaser", "institutional"].includes(investor.investorType);
      if (fund.complianceMatrix.accreditedOnly && !isAccredited) {
        return {
          compliant: false,
          reason: "Accredited investor status required"
        };
      }

      // Check geographic restrictions
      if (fund.complianceMatrix.geographicRestrictions.includes(investor.jurisdictionOfResidence)) {
        return {
          compliant: false,
          reason: "Geographic restriction applies"
        };
      }

      // Check sanctions screening
      if (investor.sanctionsScreening.status !== "clear") {
        return {
          compliant: false,
          reason: "Sanctions screening not cleared"
        };
      }

      return {
        compliant: true,
        accredited: isAccredited,
        reason: "All compliance checks passed"
      };
    } catch (error) {
      console.error("Compliance verification failed:", error);
      return {
        compliant: false,
        reason: "Compliance verification error"
      };
    }
  }
});

export const createTransaction = mutation({
  args: {
    type: v.union(
      v.literal("subscription"),
      v.literal("redemption"),
      v.literal("transfer"),
      v.literal("dividend"),
      v.literal("fee"),
      v.literal("rebalancing")
    ),
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    amount: v.number(),
    shares: v.number(),
    pricePerShare: v.number(),
    xrplTransactionHash: v.string(),
    xrplLedgerIndex: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("settled"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    complianceChecks: v.object({
      kycVerified: v.boolean(),
      amlCleared: v.boolean(),
      sanctionsScreened: v.boolean(),
      jurisdictionAllowed: v.boolean(),
      limitsRespected: v.boolean(),
      accreditationVerified: v.boolean()
    }),
    managementFee: v.number(),
    performanceFee: v.number(),
    transactionFee: v.number(),
    custodyFee: v.number(),
    reference: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", {
      type: args.type,
      fundId: args.fundId,
      investorId: args.investorId,
      amount: args.amount,
      shares: args.shares,
      pricePerShare: args.pricePerShare,
      xrplTransactionHash: args.xrplTransactionHash,
      xrplLedgerIndex: args.xrplLedgerIndex,
      mptTransfers: [],
      status: args.status,
      settlementDate: Date.now(),
      complianceChecks: args.complianceChecks,
      managementFee: args.managementFee,
      performanceFee: args.performanceFee,
      transactionFee: args.transactionFee,
      custodyFee: args.custodyFee,
      reference: args.reference,
      notes: undefined,
      processedBy: undefined
    });
  }
});

export const updateHolding = mutation({
  args: {
    investorId: v.id("investors"),
    fundId: v.id("funds"),
    additionalShares: v.number(),
    additionalInvestment: v.number(),
    transactionType: v.union(v.literal("subscription"), v.literal("redemption"))
  },
  handler: async (ctx, args) => {
    const existingHolding = await ctx.db
      .query("holdings")
      .filter(q => q.and(
        q.eq(q.field("investorId"), args.investorId),
        q.eq(q.field("fundId"), args.fundId)
      ))
      .unique();

    if (existingHolding) {
      // Update existing holding
      const newShares = args.transactionType === "subscription" 
        ? existingHolding.shareTokens + args.additionalShares
        : existingHolding.shareTokens - args.additionalShares;
      
      const newTotalInvested = args.transactionType === "subscription"
        ? existingHolding.totalInvested + args.additionalInvestment
        : existingHolding.totalInvested;

      const newCurrentValue = newShares * (existingHolding.currentValue / existingHolding.shareTokens);
      const newAverageCost = newTotalInvested / newShares;

      await ctx.db.patch(existingHolding._id, {
        shareTokens: newShares,
        totalInvested: newTotalInvested,
        currentValue: newCurrentValue,
        averageCost: newAverageCost,
        unrealizedGainLoss: newCurrentValue - newTotalInvested,
        lastTransaction: Date.now(),
        totalSubscriptions: args.transactionType === "subscription" 
          ? existingHolding.totalSubscriptions + args.additionalInvestment
          : existingHolding.totalSubscriptions,
        totalRedemptions: args.transactionType === "redemption"
          ? existingHolding.totalRedemptions + args.additionalInvestment
          : existingHolding.totalRedemptions
      });
    } else if (args.transactionType === "subscription") {
      // Create new holding
      await ctx.db.insert("holdings", {
        investorId: args.investorId,
        fundId: args.fundId,
        shareTokens: args.additionalShares,
        totalInvested: args.additionalInvestment,
        currentValue: args.additionalInvestment,
        averageCost: args.additionalInvestment / args.additionalShares,
        unrealizedGainLoss: 0,
        realizedGainLoss: 0,
        mptHoldings: [],
        firstInvestment: Date.now(),
        lastTransaction: Date.now(),
        totalSubscriptions: args.additionalInvestment,
        totalRedemptions: 0,
        holdingPeriod: 0,
        lockupExpiry: undefined,
        transferRestrictions: [],
        timeWeightedReturn: 0,
        internalRateOfReturn: 0,
        status: "active"
      });
    }

    return { success: true };
  }
});

export const updateFundTotals = mutation({
  args: {
    fundId: v.id("funds"),
    additionalAUM: v.number(),
    additionalShares: v.number()
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    await ctx.db.patch(args.fundId, {
      aum: fund.aum + args.additionalAUM,
      totalShares: fund.totalShares + args.additionalShares,
      outstandingShares: fund.outstandingShares + args.additionalShares
    });

    return { success: true };
  }
});

export const calculateNAV = action({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    try {
      const fund = await ctx.db.get(args.fundId);
      if (!fund) {
        throw new Error("Fund not found");
      }

      // Get all fund assets
      const assets = await ctx.db
        .query("assets")
        .filter(q => q.eq(q.field("fundId"), args.fundId))
        .collect();

      // Calculate total asset value
      const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

      // Get liabilities (simplified - in production, include all liabilities)
      const totalLiabilities = 0;

      // Calculate net asset value
      const netAssetValue = totalAssetValue - totalLiabilities;
      const navPerShare = fund.outstandingShares > 0 ? netAssetValue / fund.outstandingShares : 1.0;

      // Update fund NAV
      await ctx.db.patch(args.fundId, {
        nav: navPerShare,
        sharePrice: navPerShare,
        lastValuation: Date.now(),
        nextValuation: Date.now() + 24 * 60 * 60 * 1000 // Next day
      });

      // Log NAV calculation
      await ctx.runMutation(api.funds.advanced_management.logNAVCalculation, {
        fundId: args.fundId,
        previousNAV: fund.nav,
        newNAV: navPerShare,
        totalAssetValue,
        totalLiabilities,
        outstandingShares: fund.outstandingShares
      });

      return {
        success: true,
        nav: navPerShare,
        totalAssetValue,
        totalLiabilities,
        netAssetValue
      };
    } catch (error) {
      console.error("NAV calculation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "NAV calculation failed"
      };
    }
  }
});

export const logNAVCalculation = mutation({
  args: {
    fundId: v.id("funds"),
    previousNAV: v.number(),
    newNAV: v.number(),
    totalAssetValue: v.number(),
    totalLiabilities: v.number(),
    outstandingShares: v.number()
  },
  handler: async (ctx, args) => {
    const eventId = `nav_calculation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return await ctx.db.insert("auditLogs", {
      eventId,
      eventType: "nav_calculation",
      entityType: "fund",
      entityId: args.fundId,
      action: "calculate_nav",
      actor: "system",
      timestamp: Date.now(),
      changes: {
        previousNAV: args.previousNAV.toString(),
        newNAV: args.newNAV.toString(),
        totalAssetValue: args.totalAssetValue.toString(),
        totalLiabilities: args.totalLiabilities.toString(),
        outstandingShares: args.outstandingShares.toString()
      },
      complianceRules: ["nav_calculation", "valuation_policy"],
      jurisdictions: [],
      hash: Buffer.from(`${eventId}_${args.newNAV}_${Date.now()}`).toString('hex')
    });
  }
});

export const getFundDetails = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      return null;
    }

    // Get fund manager
    const manager = await ctx.db.get(fund.managerId);

    // Get fund assets
    const assets = await ctx.db
      .query("assets")
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .collect();

    // Get fund holdings
    const holdings = await ctx.db
      .query("holdings")
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .collect();

    // Get recent transactions
    const recentTransactions = await ctx.db
      .query("transactions")
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .order("desc")
      .take(10);

    // Get MPT token info
    let tokenInfo = null;
    if (fund.mptTokenId) {
      tokenInfo = await ctx.runQuery(api.xrpl.mpt_advanced.getMPTokenInfo, {
        tokenId: fund.mptTokenId
      });
    }

    // Get domain info
    let domainInfo = null;
    if (fund.domainId) {
      domainInfo = await ctx.runQuery(api.xrpl.permissioned_domains.getDomainInfo, {
        domainId: fund.domainId
      });
    }

    return {
      ...fund,
      manager,
      assets,
      holdings: holdings.length,
      totalInvestors: new Set(holdings.map(h => h.investorId)).size,
      recentTransactions,
      tokenInfo,
      domainInfo,
      performance: {
        totalReturn: fund.aum > 0 ? ((fund.nav - 1.0) / 1.0) * 100 : 0,
        annualizedReturn: 0, // Would calculate based on inception date
        volatility: fund.riskMetrics.volatility,
        sharpeRatio: fund.riskMetrics.sharpeRatio,
        maxDrawdown: fund.riskMetrics.maxDrawdown
      }
    };
  }
});
