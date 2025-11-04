import { query } from "../_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("funds"),
    _creationTime: v.number(),
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
    xrplAccount: v.string(),
    mptTokenId: v.optional(v.string()),
    domainId: v.optional(v.string()),
    didDocument: v.optional(v.string()),
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
    prospectusHash: v.optional(v.string()),
    factsheetHash: v.optional(v.string()),
    lastValuation: v.number(),
    nextValuation: v.number()
  })),
  handler: async (ctx) => {
    return await ctx.db.query("funds").collect();
  },
});

