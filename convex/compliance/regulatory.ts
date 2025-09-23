import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Jurisdiction-specific regulatory requirements
const REGULATORY_FRAMEWORKS = {
  US: {
    name: "United States",
    requirements: {
      kycRequired: true,
      amlRequired: true,
      accreditedInvestorRules: true,
      maximumRetailInvestors: 2000,
      minimumInvestment: 25000,
      reportingRequirements: ["SEC Form D", "Form ADV"],
      taxReporting: "1099-DIV"
    },
    restrictedStates: ["NY", "TX"], // Example restrictions
    restrictedCountries: []
  },
  EU: {
    name: "European Union",
    requirements: {
      kycRequired: true,
      amlRequired: true,
      mifidCompliance: true,
      gdprCompliance: true,
      minimumInvestment: 100000,
      reportingRequirements: ["AIFMD", "MiFID II"],
      taxReporting: "DAC6"
    },
    restrictedCountries: [],
    restrictedStates: []
  },
  UK: {
    name: "United Kingdom",
    requirements: {
      kycRequired: true,
      amlRequired: true,
      fcaAuthorization: true,
      minimumInvestment: 10000,
      reportingRequirements: ["FCA Handbook", "CASS Rules"],
      taxReporting: "UK Tax Return"
    },
    restrictedCountries: [],
    restrictedStates: []
  },
  SG: {
    name: "Singapore",
    requirements: {
      kycRequired: true,
      amlRequired: true,
      masLicense: true,
      minimumInvestment: 200000,
      reportingRequirements: ["MAS Notice", "Securities and Futures Act"],
      taxReporting: "IRAS Form"
    },
    restrictedCountries: [],
    restrictedStates: []
  }
};

export const getJurisdictionRequirements = query({
  args: {
    jurisdiction: v.string()
  },
  handler: async (ctx, args) => {
    const framework = REGULATORY_FRAMEWORKS[args.jurisdiction as keyof typeof REGULATORY_FRAMEWORKS];
    
    if (!framework) {
      return {
        jurisdiction: args.jurisdiction,
        supported: false,
        requirements: null
      };
    }
    
    return {
      jurisdiction: args.jurisdiction,
      supported: true,
      name: framework.name,
      requirements: framework.requirements,
      restrictions: {
        restrictedStates: framework.restrictedStates || [],
        restrictedCountries: framework.restrictedCountries || []
      }
    };
  }
});

export const validateFundCompliance = query({
  args: {
    fundId: v.id("funds"),
    jurisdiction: v.string()
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      return {
        isCompliant: false,
        errors: ["Fund not found"]
      };
    }
    
    const framework = REGULATORY_FRAMEWORKS[args.jurisdiction as keyof typeof REGULATORY_FRAMEWORKS];
    if (!framework) {
      return {
        isCompliant: false,
        errors: [`Jurisdiction ${args.jurisdiction} not supported`]
      };
    }
    
    const errors: string[] = [];
    
    // Check minimum investment requirements
    if (fund.complianceRules.minimumInvestment < framework.requirements.minimumInvestment) {
      errors.push(`Minimum investment must be at least ${framework.requirements.minimumInvestment} for ${framework.name}`);
    }
    
    // Check KYC/AML requirements
    if (framework.requirements.kycRequired && !fund.complianceRules.kycRequired) {
      errors.push("KYC verification is required for this jurisdiction");
    }
    
    if (framework.requirements.amlRequired && !fund.complianceRules.amlRequired) {
      errors.push("AML screening is required for this jurisdiction");
    }
    
    // Check accredited investor requirements (US specific)
    if (args.jurisdiction === "US" && "accreditedInvestorRules" in framework.requirements && framework.requirements.accreditedInvestorRules) {
      // Additional US-specific checks would go here
    }
    
    return {
      isCompliant: errors.length === 0,
      errors: errors,
      framework: framework,
      requiredReporting: framework.requirements.reportingRequirements
    };
  }
});

export const generateComplianceReport = mutation({
  args: {
    fundId: v.id("funds"),
    reportType: v.union(
      v.literal("nav_calculation"),
      v.literal("investor_registry"),
      v.literal("transaction_summary"),
      v.literal("compliance_breach"),
      v.literal("regulatory_filing")
    ),
    jurisdiction: v.string(),
    periodStart: v.number(),
    periodEnd: v.number()
  },
  handler: async (ctx, args) => {
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }
    
    // Get relevant data based on report type
    let reportData: any = {};
    
    switch (args.reportType) {
      case "investor_registry":
        const holdings = await ctx.db
          .query("holdings")
          .withIndex("by_fund", q => q.eq("fundId", args.fundId))
          .collect();
        
        reportData = {
          totalInvestors: holdings.length,
          totalShares: holdings.reduce((sum, h) => sum + h.shareTokens, 0),
          totalValue: holdings.reduce((sum, h) => sum + h.currentValue, 0),
          investors: holdings.map(h => ({
            investorId: h.investorId,
            shares: h.shareTokens,
            value: h.currentValue,
            subscriptionDate: h.subscriptionDate
          }))
        };
        break;
        
      case "transaction_summary":
        const transactions = await ctx.db
          .query("transactions")
          .withIndex("by_fund", q => q.eq("fundId", args.fundId))
          .filter(q => 
            q.and(
              q.gte(q.field("_creationTime"), args.periodStart),
              q.lte(q.field("_creationTime"), args.periodEnd)
            )
          )
          .collect();
        
        reportData = {
          totalTransactions: transactions.length,
          subscriptions: transactions.filter(t => t.type === "subscription").length,
          redemptions: transactions.filter(t => t.type === "redemption").length,
          totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0)
        };
        break;
    }
    
    // Generate audit hash
    const auditHash = `report_${args.reportType}_${args.fundId}_${Date.now()}`;
    
    // Store compliance report
    const reportId = await ctx.db.insert("complianceReports", {
      fundId: args.fundId,
      reportType: args.reportType,
      jurisdiction: args.jurisdiction,
      reportingPeriod: {
        startDate: args.periodStart,
        endDate: args.periodEnd
      },
      data: JSON.stringify(reportData),
      auditHash: auditHash,
      submittedToRegulator: false,
      status: "draft"
    });
    
    return {
      reportId: reportId,
      auditHash: auditHash,
      data: reportData
    };
  }
});
