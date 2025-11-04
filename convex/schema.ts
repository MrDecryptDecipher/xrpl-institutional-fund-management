import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  // User Profiles
  users: defineTable({
    fullName: v.optional(v.string()),
    email: v.optional(v.string()),
    xrplAccount: v.optional(v.string()),
    networkPreference: v.optional(v.union(
      v.literal("demo"),
      v.literal("testnet"),
      v.literal("mainnet")
    )),
    xamanUserToken: v.optional(v.string()), // Xaman user token for push notifications
    xamanTokenExpiry: v.optional(v.number()), // Token expiry timestamp
    createdAt: v.optional(v.number()),
    lastLogin: v.optional(v.number()),
    // Legacy auth fields
    isAnonymous: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_xrpl_account", ["xrplAccount"]),

  // Core Fund Management
  funds: defineTable({
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
      v.literal("hedge_fund"),
      v.literal("money_market"),
      v.literal("structured_credit"),
      v.literal("securities"),
      v.literal("multi_strategy"),
      v.literal("quantitative"),
      v.literal("distressed_debt"),
      v.literal("infrastructure")
    ),
    managerId: v.id("users"),
    status: v.union(
      v.literal("draft"),
      v.literal("pending_approval"),
      v.literal("active"),
      v.literal("suspended"),
      v.literal("liquidating"),
      v.literal("closed"),
      v.literal("pending")
    ),
    aum: v.number(),
    nav: v.number(),
    sharePrice: v.number(),
    totalShares: v.number(),
    totalSupply: v.string(),
    outstandingShares: v.number(),
    minimumInvestment: v.number(),
    managementFee: v.number(),
    performanceFee: v.number(),
    
    // XRPL Integration
    xrplAccount: v.string(),
    mptTokenId: v.optional(v.string()),
    domainId: v.optional(v.string()),
    didDocument: v.optional(v.string()),
    
    // Compliance
    jurisdictions: v.array(v.string()),
    regulatoryStatus: v.object({
      mas: v.optional(v.string()),
      finma: v.optional(v.string()),
      esma: v.optional(v.string()),
      vara: v.optional(v.string()),
      sfc: v.optional(v.string()),
      sec: v.optional(v.string())
    }),
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
    complianceRules: v.object({
      kycRequired: v.boolean(),
      amlRequired: v.boolean(),
      accreditedOnly: v.boolean(),
      minimumInvestment: v.number(),
      maximumInvestment: v.optional(v.number()),
      jurisdictionRestrictions: v.array(v.string())
    }),
    
    // Risk Management
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
    
    // Operational
    inceptionDate: v.number(),
    fiscalYearEnd: v.string(),
    baseCurrency: v.string(),
    custodian: v.optional(v.string()),
    administrator: v.optional(v.string()),
    auditor: v.optional(v.string()),
    
    // Metadata
    prospectusHash: v.optional(v.string()),
    factsheetHash: v.optional(v.string()),
    lastValuation: v.number(),
    nextValuation: v.number()
  })
    .index("by_manager", ["managerId"])
    .index("by_status", ["status"])
    .index("by_type", ["fundType"])
    .index("by_jurisdictions", ["jurisdictions"])
    .searchIndex("search_funds", {
      searchField: "name",
      filterFields: ["fundType", "status", "jurisdictions"]
    }),

  // Institutional Fund Metadata
  institutionalFundMetadata: defineTable({
    fundId: v.id("funds"),
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
    }),
    performanceMetrics: v.object({
      inception: v.number(),
      highWaterMark: v.number(),
      totalReturn: v.number(),
      annualizedReturn: v.number(),
      volatility: v.number(),
      sharpeRatio: v.number(),
      sortinoRatio: v.number(),
      calmarRatio: v.number(),
      maxDrawdown: v.number(),
      var95: v.number(),
      var99: v.number(),
      beta: v.number(),
      alpha: v.number(),
      informationRatio: v.number(),
      trackingError: v.number()
    }),
    subscriptionSchedule: v.array(v.object({
      date: v.number(),
      cutoffDate: v.number(),
      settlementDate: v.number(),
      status: v.union(v.literal("open"), v.literal("closed"), v.literal("processing"))
    })),
    redemptionSchedule: v.array(v.object({
      date: v.number(),
      cutoffDate: v.number(),
      settlementDate: v.number(),
      status: v.union(v.literal("open"), v.literal("closed"), v.literal("processing"))
    })),
    feeSchedule: v.array(v.object({
      date: v.number(),
      type: v.union(v.literal("management"), v.literal("performance"), v.literal("admin")),
      amount: v.number(),
      status: v.union(v.literal("accrued"), v.literal("charged"), v.literal("paid"))
    })),
    auditSchedule: v.array(v.object({
      date: v.number(),
      type: v.string(),
      auditor: v.string(),
      status: v.union(v.literal("scheduled"), v.literal("in_progress"), v.literal("completed"))
    }))
  })
    .index("by_fund", ["fundId"]),

  // Investor Management
  investors: defineTable({
    userId: v.id("users"),
    investorType: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("qualified_purchaser"),
      v.literal("institutional"),
      v.literal("sovereign_wealth"),
      v.literal("pension_fund"),
      v.literal("insurance_company"),
      v.literal("bank"),
      v.literal("family_office")
    ),
    
    // XRPL Integration
    xrplAccount: v.string(),
    didDocument: v.string(),
    credentialHash: v.string(),
    
    // KYC/AML
    kycStatus: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("expired"),
      v.literal("verified")
    ),
    amlStatus: v.union(
      v.literal("pending"),
      v.literal("cleared"),
      v.literal("flagged"),
      v.literal("blocked")
    ),
    kycProvider: v.optional(v.string()),
    kycCompletedAt: v.optional(v.number()),
    kycExpiresAt: v.optional(v.number()),
    
    // Compliance
    jurisdictionOfResidence: v.string(),
    jurisdiction: v.string(),
    taxResidency: v.array(v.string()),
    sanctionsScreening: v.object({
      status: v.union(v.literal("clear"), v.literal("flagged"), v.literal("blocked")),
      lastScreened: v.number(),
      provider: v.string()
    }),
    pepStatus: v.boolean(),
    
    // Financial Information
    netWorth: v.optional(v.number()),
    annualIncome: v.optional(v.number()),
    accreditationStatus: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("qualified_purchaser"),
      v.literal("institutional")
    ),
    
    // Credentials and Memberships
    credentials: v.array(v.object({
      id: v.string(),
      type: v.string(),
      issuer: v.string(),
      issuedAt: v.number(),
      expiresAt: v.optional(v.number()),
      status: v.union(v.literal("active"), v.literal("revoked"), v.literal("expired"))
    })),
    domainMemberships: v.array(v.string()),
    
    // Status
    status: v.union(v.literal("active"), v.literal("suspended"), v.literal("closed")),
    onboardingCompletedAt: v.optional(v.number()),
    lastActivity: v.number()
  })
    .index("by_user", ["userId"])
    .index("by_type", ["investorType"])
    .index("by_kyc_status", ["kycStatus"])
    .index("by_jurisdictionOfResidence", ["jurisdictionOfResidence"])
    .searchIndex("search_investors", {
      searchField: "xrplAccount",
      filterFields: ["investorType", "kycStatus", "jurisdictionOfResidence"]
    }),

  // Holdings Management
  holdings: defineTable({
    investorId: v.id("investors"),
    fundId: v.id("funds"),
    shareTokens: v.number(),
    costBasis: v.number(),
    currentValue: v.number(),
    unrealizedGainLoss: v.number(),
    realizedGainLoss: v.number(),
    dividendsReceived: v.number(),
    feesAccrued: v.number(),
    
    // Lockup and Restrictions
    lockupExpiry: v.optional(v.number()),
    lockupPeriod: v.optional(v.number()),
    subscriptionDate: v.number(),
    
    // Valuation
    lastValuationDate: v.number(),
    averageCost: v.number(),
    totalReturn: v.number(),
    annualizedReturn: v.number(),
    internalRateOfReturn: v.number(),
    
    // Status
    status: v.union(
      v.literal("active"),
      v.literal("closed"),
      v.literal("locked"),
      v.literal("redemption_pending"),
      v.literal("redeemed")
    )
  })
    .index("by_investor", ["investorId"])
    .index("by_fund", ["fundId"])
    .index("by_status", ["status"]),

  // Asset Management
  assets: defineTable({
    fundId: v.id("funds"),
    symbol: v.string(),
    name: v.string(),
    assetType: v.union(
      v.literal("equity"),
      v.literal("real_estate"),
      v.literal("commodity"),
      v.literal("crypto"),
      v.literal("bond"),
      v.literal("derivative"),
      v.literal("cash"),
      v.literal("alternative"),
      v.literal("security"),
      v.literal("credit")
    ),
    quantity: v.number(),
    currentPrice: v.number(),
    currentValue: v.number(),
    costBasis: v.number(),
    unrealizedGainLoss: v.number(),
    
    // XRPL Integration
    mptTokenId: v.optional(v.string()),
    custodian: v.optional(v.string()),
    
    // Identifiers
    isin: v.optional(v.string()),
    cusip: v.optional(v.string()),
    xrplIssuer: v.optional(v.string()),
    
    // Metadata
    onChainMetadata: v.optional(v.object({
      uri: v.string(),
      hash: v.string(),
      flags: v.number()
    })),
    
    // Compliance
    jurisdictions: v.array(v.string()),
    complianceFlags: v.array(v.string()),
    restrictedInvestors: v.array(v.string()),
    
    // Valuation
    lastValuation: v.number(),
    valuationSource: v.string(),
    pricingModel: v.string(),
    
    // Risk
    riskRating: v.string(),
    volatility: v.number(),
    beta: v.number(),
    correlation: v.number()
  })
    .index("by_fund", ["fundId"])
    .index("by_type", ["assetType"])
    .index("by_symbol", ["symbol"]),

  // Transaction Management
  transactions: defineTable({
    fundId: v.id("funds"),
    type: v.union(
      v.literal("subscription"),
      v.literal("redemption"),
      v.literal("transfer"),
      v.literal("dividend"),
      v.literal("fee"),
      v.literal("rebalancing"),
      v.literal("rebalance"),
      v.literal("compliance_action")
    ),
    amount: v.number(),
    shareTokens: v.number(),
    pricePerShare: v.number(),
    
    // Parties
    investorId: v.optional(v.id("investors")),
    counterparty: v.optional(v.string()),
    
    // XRPL Integration
    xrplTransactionHash: v.optional(v.string()),
    xrplLedgerIndex: v.optional(v.number()),
    
    // Settlement
    tradeDate: v.number(),
    settlementDate: v.optional(v.number()),
    
    // Status
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("settled"),
      v.literal("failed"),
      v.literal("cancelled"),
      v.literal("confirmed"),
      v.literal("reversed")
    ),
    
    // Compliance
    complianceChecks: v.object({
      kycVerified: v.boolean(),
      amlCleared: v.boolean(),
      sanctionsScreened: v.boolean(),
      jurisdictionAllowed: v.boolean(),
      limitsRespected: v.boolean(),
      accreditationVerified: v.boolean()
    }),
    
    // Metadata
    reference: v.string(),
    notes: v.optional(v.string()),
    metadata: v.optional(v.object({
      source: v.string(),
      channel: v.string(),
      fees: v.number()
    })),
    
    // Fees
    managementFee: v.number(),
    performanceFee: v.number(),
    transactionFee: v.number()
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorId"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),

  // Compliance Reports
  complianceReports: defineTable({
    fundId: v.optional(v.id("funds")),
    reportType: v.string(),
    jurisdiction: v.string(),
    reportingPeriod: v.object({
      start: v.number(),
      end: v.number()
    }),
    generatedAt: v.number(),
    submittedAt: v.optional(v.number()),
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("submitted"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    reportHash: v.string(),
    submissionReference: v.optional(v.string())
  })
    .index("by_fund", ["fundId"])
    .index("by_jurisdiction", ["jurisdiction"])
    .index("by_type", ["reportType"]),

  // Audit Logs
  auditLogs: defineTable({
    eventId: v.string(),
    eventType: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    action: v.string(),
    actor: v.string(),
    timestamp: v.number(),
    changes: v.object({
      before: v.optional(v.string()),
      after: v.optional(v.string()),
      proposalType: v.optional(v.string()),
      executionData: v.optional(v.string())
    }),
    xrplTxHash: v.optional(v.string()),
    xrplLedgerIndex: v.optional(v.number()),
    complianceRules: v.array(v.string()),
    jurisdictions: v.array(v.string()),
    hash: v.string()
  })
    .index("by_entity", ["entityType", "entityId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_event_type", ["eventType"]),

  // XRPL MPT Tokens
  mptTokens: defineTable({
    tokenId: v.string(),
    fundId: v.optional(v.id("funds")),
    assetId: v.optional(v.id("assets")),
    flags: v.number(),
    transferFee: v.number(),
    maxSupply: v.optional(v.string()),
    outstandingAmount: v.string(),
    symbol: v.string(),
    metadata: v.object({
      name: v.string(),
      symbol: v.string(),
      description: v.string(),
      image: v.optional(v.string()),
      externalUrl: v.optional(v.string()),
      attributes: v.array(v.object({
        traitType: v.string(),
        value: v.string()
      }))
    }),
    authorizedHolders: v.array(v.string()),
    requiresAuthorization: v.boolean(),
    jurisdictionRestrictions: v.array(v.string()),
    investorTypeRestrictions: v.array(v.string()),
    issuer: v.string(),
    createdLedger: v.number(),
    lastModified: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("frozen"),
      v.literal("clawback_enabled"),
      v.literal("retired"),
      v.literal("locked"),
      v.literal("partially_locked")
    )
  })
    .index("by_issuer", ["issuer"])
    .index("by_token_id", ["tokenId"])
    .index("by_fund", ["fundId"])
    .index("by_symbol", ["symbol"]),

  // XRPL Permissioned Domains
  permissionedDomains: defineTable({
    domainId: v.string(),
    name: v.string(),
    owner: v.string(),
    status: v.string(),
    accessRules: v.array(v.object({
      ruleType: v.string(),
      parameters: v.record(v.string(), v.any())
    })),
    authorizedIssuers: v.array(v.string()),
    authorizedHolders: v.array(v.string()),
    fundId: v.optional(v.id("funds")),
    xrplTxHash: v.string(),
    network: v.string(),
    createdAt: v.number()
  })
    .index("by_owner", ["owner"])
    .index("by_domain_id", ["domainId"])
    .index("by_fund", ["fundId"]),

  // XRPL Connections
  xrplConnections: defineTable({
    network: v.string(),
    server: v.string(),
    isConnected: v.boolean(),
    lastPing: v.number(),
    networkId: v.number()
  })
    .index("by_network", ["network"]),

  // XRPL Transactions
  xrplTransactions: defineTable({
    network: v.string(),
    hash: v.string(),
    transactionType: v.string(),
    account: v.string(),
    destination: v.optional(v.string()),
    amount: v.optional(v.string()),
    fee: v.string(),
    result: v.string(),
    ledgerIndex: v.number(),
    submittedAt: v.number(),
    validated: v.boolean(),
    mptokenIssuanceId: v.optional(v.string()),
    holder: v.optional(v.string()),
    flags: v.optional(v.number())
  })
    .index("by_network", ["network"])
    .index("by_account", ["account"])
    .index("by_hash", ["hash"])
    .index("by_transaction_type", ["transactionType"]),

  // Lending Pools
  lendingPools: defineTable({
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
    createdAt: v.number(),
    lastUpdate: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("paused"),
      v.literal("deprecated")
    )
  })
    .index("by_fund", ["fundId"])
    .index("by_asset", ["asset"])
    .index("by_pool_id", ["poolId"])
    .index("by_status", ["status"]),

  // Lending Positions
  lendingPositions: defineTable({
    positionId: v.string(),
    poolId: v.id("lendingPools"),
    investorId: v.id("investors"),
    type: v.union(v.literal("supply"), v.literal("borrow")),
    amount: v.string(),
    shares: v.string(),
    accruedInterest: v.string(),
    lastInterestUpdate: v.number(),
    collateralAmount: v.optional(v.string()),
    collateralTokenId: v.optional(v.string()),
    healthFactor: v.optional(v.number()),
    lastTxHash: v.string(),
    lastLedgerIndex: v.number(),
    openedAt: v.number(),
    lastUpdate: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("liquidated"),
      v.literal("closed")
    )
  })
    .index("by_pool", ["poolId"])
    .index("by_investor", ["investorId"])
    .index("by_position_id", ["positionId"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),

  // Subscription Management
  subscriptions: defineTable({
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    subscriptionAmount: v.number(),
    sharePrice: v.number(),
    sharesIssued: v.number(),
    currency: v.string(),
    subscriptionType: v.string(),
    paymentMethod: v.string(),
    settlementInstructions: v.any(),
    clientReference: v.string(),
    status: v.union(
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    complianceValidation: v.any(),
    currentNAV: v.any(),
    failureReason: v.optional(v.string())
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorId"])
    .index("by_status", ["status"]),

  // Redemption Management
  redemptions: defineTable({
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    redemptionShares: v.number(),
    redemptionValue: v.number(),
    sharePrice: v.number(),
    redemptionType: v.string(),
    redemptionReason: v.string(),
    settlementInstructions: v.any(),
    clientReference: v.string(),
    status: v.union(
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    complianceValidation: v.any(),
    currentNAV: v.any(),
    failureReason: v.optional(v.string())
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorId"])
    .index("by_status", ["status"]),

  // Portfolio Rebalancing Records
  rebalancingRecords: defineTable({
    fundId: v.id("funds"),
    rebalancingStrategy: v.string(),
    targetAllocations: v.any(),
    rebalancingConstraints: v.any(),
    currentPortfolioMetrics: v.any(),
    riskAssessment: v.any(),
    complianceValidation: v.any(),
    tradingInstructions: v.any(),
    executionMode: v.string(),
    approvalRequired: v.boolean(),
    status: v.union(
      v.literal("PENDING_APPROVAL"),
      v.literal("PROCESSING"),
      v.literal("COMPLETED"),
      v.literal("FAILED"),
      v.literal("CANCELLED")
    ),
    createdAt: v.number(),
    executedAt: v.optional(v.number()),
    executionResults: v.optional(v.any())
  })
    .index("by_fund", ["fundId"])
    .index("by_status", ["status"]),

  // Oracle Price Feeds
  priceFeeds: defineTable({
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
  })
    .index("by_symbol", ["symbol"])
    .index("by_source", ["source"])
    .index("by_timestamp", ["timestamp"]),

  // Settlement Processing
  settlements: defineTable({
    subscriptionId: v.optional(v.id("subscriptions")),
    redemptionId: v.optional(v.id("redemptions")),
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    settlementType: v.union(
      v.literal("SUBSCRIPTION"),
      v.literal("REDEMPTION"),
      v.literal("DIVIDEND"),
      v.literal("FEE")
    ),
    originalAmount: v.number(),
    originalCurrency: v.string(),
    settlementAmount: v.number(),
    settlementCurrency: v.string(),
    fxRate: v.number(),
    fxCost: v.number(),
    settlementInstructions: v.any(),
    settlementDate: v.number(),
    crossBorderTransaction: v.boolean(),
    custodyResult: v.optional(v.any()),
    status: v.union(
      v.literal("PROCESSING"),
      v.literal("COMPLETED"),
      v.literal("FAILED"),
      v.literal("CANCELLED")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    xrplTxHash: v.optional(v.string()),
    xrplLedgerIndex: v.optional(v.number()),
    executionTimestamp: v.optional(v.number()),
    failureReason: v.optional(v.string())
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorId"])
    .index("by_type", ["settlementType"])
    .index("by_status", ["status"]),

  // XRPL Hooks Registry
  hookRegistry: defineTable({
    fundId: v.id("funds"),
    hookAccount: v.string(),
    hookNamespace: v.string(),
    hookCode: v.string(),
    complianceRules: v.any(),
    auditConfiguration: v.any(),
    deploymentTxHash: v.string(),
    deploymentLedger: v.number(),
    initializationTxHash: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("upgrading"),
      v.literal("deprecated")
    ),
    network: v.string(),
    createdAt: v.number(),
    lastActivity: v.number(),
    auditTriggers: v.optional(v.any()),
    upgradeHistory: v.optional(v.any())
  })
    .index("by_fund", ["fundId"])
    .index("by_status", ["status"]),

  // Bridge Registry
  bridgeRegistry: defineTable({
    fundId: v.id("funds"),
    sourceChain: v.string(),
    destinationChain: v.string(),
    gatewayConfig: v.any(),
    complianceContracts: v.any(),
    bridgeConfiguration: v.any(),
    complianceConfig: v.any(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("maintenance")
    ),
    createdAt: v.number(),
    lastActivity: v.number(),
    assetMappings: v.optional(v.any())
  })
    .index("by_fund", ["fundId"])
    .index("by_chains", ["sourceChain", "destinationChain"]),

  // Bridge Transactions
  bridgeTransactions: defineTable({
    bridgeId: v.id("bridgeRegistry"),
    fundId: v.id("funds"),
    assetId: v.id("assets"),
    amount: v.number(),
    sourceAccount: v.string(),
    destinationAccount: v.string(),
    bridgeDirection: v.union(
      v.literal("to_evm"),
      v.literal("from_evm")
    ),
    sourceTxHash: v.string(),
    destinationTxHash: v.string(),
    bridgeCosts: v.any(),
    complianceValidation: v.any(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    createdAt: v.number()
  })
    .index("by_bridge", ["bridgeId"])
    .index("by_fund", ["fundId"]),

  // HSM/MPC Key Management
  keyManagement: defineTable({
    fundId: v.id("funds"),
    hsmProvider: v.string(),
    hsmConfiguration: v.any(),
    hsmConnection: v.any(),
    masterKeyHierarchy: v.any(),
    complianceRequirements: v.any(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("rotating")
    ),
    createdAt: v.number(),
    lastActivity: v.number(),
    rotationSchedule: v.optional(v.any())
  })
    .index("by_fund", ["fundId"]),

  // MPC Management
  mpcManagement: defineTable({
    fundId: v.id("funds"),
    mpcProvider: v.string(),
    mpcConfiguration: v.any(),
    mpcSession: v.any(),
    dkgResult: v.any(),
    xrplKeyPairs: v.any(),
    securityPolicy: v.any(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("refreshing")
    ),
    createdAt: v.number(),
    lastActivity: v.number(),
    refreshSchedule: v.optional(v.any())
  })
    .index("by_fund", ["fundId"]),

  // DID Documents
  didDocuments: defineTable({
    did: v.string(),
    userId: v.optional(v.id("users")),
    investorId: v.optional(v.id("investors")),
    document: v.any(),
    verifiableCredentials: v.array(v.any()),
    xrplAccount: v.string(),
    anchorLedger: v.number(),
    anchorHash: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("revoked"),
      v.literal("expired")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    version: v.number()
  })
    .index("by_did", ["did"])
    .index("by_user", ["userId"])
    .index("by_investor", ["investorId"]),

  // MPT Mint Records
  mptMintRecords: defineTable({
    fundId: v.id("funds"),
    investorAccount: v.string(),
    shareTokens: v.number(),
    subscriptionId: v.id("subscriptions"),
    txHash: v.string(),
    ledgerIndex: v.number(),
    complianceHash: v.string(),
    timestamp: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    )
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorAccount"]),

  // MPT Burn Records
  mptBurnRecords: defineTable({
    fundId: v.id("funds"),
    investorAccount: v.string(),
    shareTokens: v.number(),
    redemptionId: v.id("redemptions"),
    txHash: v.string(),
    ledgerIndex: v.number(),
    complianceHash: v.string(),
    timestamp: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    )
  })
    .index("by_fund", ["fundId"])
    .index("by_investor", ["investorAccount"])
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
