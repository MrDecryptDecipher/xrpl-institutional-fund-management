import { action, query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "../_generated/api";

// Enhanced KYC/AML Provider Integration
interface KYCProvider {
  name: string;
  apiEndpoint: string;
  supportedDocuments: string[];
  supportedCountries: string[];
  features: string[];
}

const KYC_PROVIDERS: Record<string, KYCProvider> = {
  jumio: {
    name: "Jumio",
    apiEndpoint: "https://api.jumio.com/api/v4",
    supportedDocuments: ["passport", "drivers_license", "national_id"],
    supportedCountries: ["US", "EU", "UK", "CA", "AU", "SG", "JP"],
    features: ["identity_verification", "document_verification", "biometric_matching", "liveness_detection"]
  },
  onfido: {
    name: "Onfido",
    apiEndpoint: "https://api.onfido.com/v3.6",
    supportedDocuments: ["passport", "drivers_license", "national_id", "residence_permit"],
    supportedCountries: ["US", "EU", "UK", "CA", "AU", "SG", "JP", "IN", "BR"],
    features: ["identity_verification", "document_verification", "facial_recognition", "address_verification"]
  },
  sumsub: {
    name: "Sum&Substance",
    apiEndpoint: "https://api.sumsub.com",
    supportedDocuments: ["passport", "drivers_license", "national_id", "utility_bill"],
    supportedCountries: ["US", "EU", "UK", "CA", "AU", "SG", "JP", "IN", "BR", "MX"],
    features: ["identity_verification", "aml_screening", "ongoing_monitoring", "risk_assessment"]
  }
};

export const initiateEnhancedKYC = action({
  args: {
    investorId: v.id("investors"),
    provider: v.union(
      v.literal("jumio"),
      v.literal("onfido"),
      v.literal("sumsub")
    ),
    verificationType: v.union(
      v.literal("basic_kyc"),
      v.literal("enhanced_kyc"),
      v.literal("institutional_kyc")
    ),
    documentTypes: v.array(v.string()),
    jurisdiction: v.string(),
    riskLevel: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high")
    )
  },
  handler: async (ctx, args) => {
    try {
      const provider = KYC_PROVIDERS[args.provider];
      if (!provider) {
        throw new Error(`Unsupported KYC provider: ${args.provider}`);
      }

      // Validate jurisdiction support
      if (!provider.supportedCountries.includes(args.jurisdiction)) {
        throw new Error(`Provider ${provider.name} does not support jurisdiction: ${args.jurisdiction}`);
      }

      // Generate session ID
      const sessionId = `kyc_${args.provider}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // In production, this would make actual API calls to the KYC provider
      const mockKYCSession = {
        sessionId: sessionId,
        status: "initiated",
        verificationUrl: `https://verify.${args.provider}.com/session/${sessionId}`,
        webhookUrl: `${process.env.CONVEX_SITE_URL}/api/kyc/webhook/${args.provider}`,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        requirements: {
          documentsRequired: args.documentTypes,
          biometricRequired: args.verificationType !== "basic_kyc",
          addressVerificationRequired: args.verificationType === "enhanced_kyc",
          sourceOfFundsRequired: args.verificationType === "institutional_kyc"
        }
      };

      // Store enhanced KYC session
      await ctx.runMutation(api.compliance.enhanced_kyc.storeEnhancedKYCSession, {
        investorId: args.investorId,
        sessionId: sessionId,
        provider: args.provider,
        verificationType: args.verificationType,
        status: "initiated",
        verificationUrl: mockKYCSession.verificationUrl,
        expiresAt: mockKYCSession.expiresAt,
        requirements: mockKYCSession.requirements,
        jurisdiction: args.jurisdiction,
        riskLevel: args.riskLevel
      });

      return {
        success: true,
        session: mockKYCSession
      };
    } catch (error) {
      console.error("Enhanced KYC initiation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "KYC initiation failed"
      };
    }
  }
});

export const storeEnhancedKYCSession = mutation({
  args: {
    investorId: v.id("investors"),
    sessionId: v.string(),
    provider: v.string(),
    verificationType: v.string(),
    status: v.string(),
    verificationUrl: v.string(),
    expiresAt: v.number(),
    requirements: v.object({
      documentsRequired: v.array(v.string()),
      biometricRequired: v.boolean(),
      addressVerificationRequired: v.boolean(),
      sourceOfFundsRequired: v.boolean()
    }),
    jurisdiction: v.string(),
    riskLevel: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("kycSessions", {
      investorId: args.investorId,
      sessionId: args.sessionId,
      provider: args.provider,
      status: args.status,
      verificationUrl: args.verificationUrl,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
      verificationType: args.verificationType,
      requirements: args.requirements,
      jurisdiction: args.jurisdiction,
      riskLevel: args.riskLevel
    });
  }
});

export const performEnhancedAMLScreening = action({
  args: {
    investorId: v.id("investors"),
    personalInfo: v.object({
      fullName: v.string(),
      dateOfBirth: v.string(),
      nationality: v.string(),
      address: v.object({
        street: v.string(),
        city: v.string(),
        state: v.string(),
        country: v.string(),
        postalCode: v.string()
      }),
      identificationNumber: v.string()
    }),
    screeningLevel: v.union(
      v.literal("basic"),
      v.literal("enhanced"),
      v.literal("ongoing")
    )
  },
  handler: async (ctx, args) => {
    try {
      // Enhanced AML screening simulation
      // In production, integrate with Chainalysis, Elliptic, ComplyAdvantage, etc.
      
      const sanctionsLists = [
        "OFAC SDN List",
        "EU Consolidated List", 
        "UN Security Council Sanctions",
        "UK HM Treasury Sanctions",
        "FATF High-Risk Jurisdictions"
      ];

      const pepDatabases = [
        "World-Check",
        "Dow Jones Risk & Compliance",
        "LexisNexis Political Exposure"
      ];

      const adverseMediaSources = [
        "Global News Sources",
        "Regulatory Enforcement Actions",
        "Court Records",
        "Financial Crime Reports"
      ];

      // Simulate comprehensive screening
      const screeningResults = {
        sanctionsScreening: {
          matches: [], // No matches in demo
          listsChecked: sanctionsLists,
          confidence: 0.95
        },
        pepScreening: {
          isPEP: Math.random() < 0.05, // 5% chance of PEP status
          matches: [],
          databasesChecked: pepDatabases
        },
        adverseMediaScreening: {
          hits: Math.floor(Math.random() * 3), // 0-2 hits
          sourcesChecked: adverseMediaSources,
          riskIndicators: []
        },
        riskAssessment: {
          overallRiskScore: Math.floor(Math.random() * 100),
          riskFactors: [],
          jurisdictionRisk: args.personalInfo.address.country === "US" ? "low" : "medium",
          transactionRisk: "low"
        }
      };

      // Calculate final risk level
      let finalRiskLevel = "low";
      if (screeningResults.riskAssessment.overallRiskScore > 70 || screeningResults.pepScreening.isPEP) {
        finalRiskLevel = "high";
      } else if (screeningResults.riskAssessment.overallRiskScore > 40 || screeningResults.adverseMediaScreening.hits > 1) {
        finalRiskLevel = "medium";
      }

      // Determine AML status
      const amlStatus = finalRiskLevel === "high" ? "flagged" : 
                      finalRiskLevel === "medium" ? "pending" : "cleared";

      return {
        success: true,
        screening: {
          status: amlStatus,
          riskLevel: finalRiskLevel,
          riskScore: screeningResults.riskAssessment.overallRiskScore,
          results: screeningResults,
          completedAt: Date.now(),
          nextReviewDate: Date.now() + (args.screeningLevel === "ongoing" ? 30 : 365) * 24 * 60 * 60 * 1000
        }
      };
    } catch (error) {
      console.error("Enhanced AML screening failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "AML screening failed"
      };
    }
  }
});

export const validateJurisdictionCompliance = query({
  args: {
    investorJurisdiction: v.string(),
    fundJurisdiction: v.string(),
    investmentAmount: v.number(),
    investorType: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("institutional")
    )
  },
  handler: async (ctx, args) => {
    // Enhanced jurisdiction compliance validation
    const complianceRules = {
      "US": {
        retailLimit: 25000,
        accreditedRequired: true,
        restrictedStates: ["NY", "TX"],
        reportingThreshold: 10000,
        taxReporting: "1099-DIV"
      },
      "EU": {
        retailLimit: 100000,
        mifidCompliance: true,
        gdprRequired: true,
        reportingThreshold: 50000,
        taxReporting: "DAC6"
      },
      "UK": {
        retailLimit: 10000,
        fcaAuthorization: true,
        reportingThreshold: 25000,
        taxReporting: "UK Tax Return"
      },
      "SG": {
        retailLimit: 200000,
        masLicense: true,
        reportingThreshold: 100000,
        taxReporting: "IRAS Form"
      }
    };

    const investorRules = complianceRules[args.investorJurisdiction as keyof typeof complianceRules];
    const fundRules = complianceRules[args.fundJurisdiction as keyof typeof complianceRules];

    const violations: string[] = [];

    if (!investorRules) {
      violations.push(`Investor jurisdiction ${args.investorJurisdiction} not supported`);
    }

    if (!fundRules) {
      violations.push(`Fund jurisdiction ${args.fundJurisdiction} not supported`);
    }

    if (investorRules && args.investorType === "retail" && args.investmentAmount > investorRules.retailLimit) {
      violations.push(`Investment amount exceeds retail limit for ${args.investorJurisdiction}`);
    }

    if (investorRules && args.investorType === "retail") {
      const usRules = investorRules as any;
      if (usRules.accreditedRequired) {
        violations.push(`Accredited investor status required for ${args.investorJurisdiction}`);
      }
    }

    return {
      isCompliant: violations.length === 0,
      violations: violations,
      requirements: {
        investor: investorRules,
        fund: fundRules
      },
      recommendedActions: violations.length > 0 ? [
        "Complete accredited investor verification",
        "Reduce investment amount to comply with limits",
        "Provide additional documentation"
      ] : []
    };
  }
});
