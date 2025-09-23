"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet, Transaction } from "xrpl";

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

/**
 * Jurisdictional Compliance Matrix Implementation
 * Following PRD specifications for multi-jurisdictional compliance
 * Supports MAS, FINMA, ESMA, VARA, SFC, SEC regulatory frameworks
 */

// Regulatory Framework Definitions
const REGULATORY_FRAMEWORKS = {
  MAS: { // Monetary Authority of Singapore
    country: "Singapore",
    kycRequirements: ["individual_kyc", "corporate_kyc", "enhanced_due_diligence"],
    amlRequirements: ["transaction_monitoring", "sanctions_screening", "pep_screening"],
    accreditationTypes: ["accredited_investor", "institutional_investor"],
    reportingRequirements: ["monthly_reports", "suspicious_activity_reports"],
    investorLimits: { maxInvestors: 50, maxRetailPercentage: 0 },
    minimumCapital: 250000 // SGD
  },
  FINMA: { // Swiss Financial Market Supervisory Authority
    country: "Switzerland",
    kycRequirements: ["enhanced_kyc", "beneficial_ownership", "source_of_funds"],
    amlRequirements: ["transaction_monitoring", "sanctions_screening", "suspicious_activity_reporting"],
    accreditationTypes: ["qualified_investor", "institutional_investor"],
    reportingRequirements: ["quarterly_reports", "annual_audit"],
    investorLimits: { maxInvestors: 99, maxRetailPercentage: 20 },
    minimumCapital: 100000 // CHF
  },
  ESMA: { // European Securities and Markets Authority
    country: "EU",
    kycRequirements: ["mifid_kyc", "gdpr_compliance", "beneficial_ownership"],
    amlRequirements: ["5amld_compliance", "transaction_monitoring", "sanctions_screening"],
    accreditationTypes: ["professional_investor", "eligible_counterparty"],
    reportingRequirements: ["mifir_reporting", "emir_reporting"],
    investorLimits: { maxInvestors: 149, maxRetailPercentage: 30 },
    minimumCapital: 125000 // EUR
  },
  VARA: { // Virtual Assets Regulatory Authority (UAE)
    country: "UAE",
    kycRequirements: ["digital_identity_verification", "corporate_kyc", "enhanced_due_diligence"],
    amlRequirements: ["blockchain_monitoring", "virtual_asset_compliance", "sanctions_screening"],
    accreditationTypes: ["qualified_investor", "institutional_investor"],
    reportingRequirements: ["monthly_vara_reports", "suspicious_transaction_reports"],
    investorLimits: { maxInvestors: 100, maxRetailPercentage: 25 },
    minimumCapital: 500000 // AED
  },
  SFC: { // Securities and Futures Commission (Hong Kong)
    country: "Hong Kong",
    kycRequirements: ["individual_kyc", "corporate_kyc", "politically_exposed_person_screening"],
    amlRequirements: ["transaction_monitoring", "sanctions_screening", "suspicious_activity_reporting"],
    accreditationTypes: ["professional_investor", "institutional_professional_investor"],
    reportingRequirements: ["monthly_returns", "annual_audit"],
    investorLimits: { maxInvestors: 50, maxRetailPercentage: 0 },
    minimumCapital: 1000000 // HKD
  },
  SEC: { // Securities and Exchange Commission (USA)
    country: "USA",
    kycRequirements: ["individual_kyc", "accredited_investor_verification", "beneficial_ownership"],
    amlRequirements: ["bsa_compliance", "ofac_screening", "suspicious_activity_reporting"],
    accreditationTypes: ["accredited_investor", "qualified_institutional_buyer"],
    reportingRequirements: ["form_pf", "form_d", "quarterly_reports"],
    investorLimits: { maxInvestors: 100, maxRetailPercentage: 35 },
    minimumCapital: 1000000 // USD
  }
};

export const createComplianceFramework = action({
  args: {
    managerSeed: v.string(),
    fundId: v.string(),
    jurisdictions: v.array(v.union(
      v.literal("MAS"),
      v.literal("FINMA"),
      v.literal("ESMA"),
      v.literal("VARA"),
      v.literal("SFC"),
      v.literal("SEC")
    )),
    complianceSettings: v.object({
      strictestStandard: v.boolean(), // Apply strictest standard across all jurisdictions
      crossBorderReporting: v.boolean(),
      automaticCompliance: v.boolean(),
      auditTrail: v.boolean()
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const managerWallet = Wallet.fromSeed(args.managerSeed);
      
      // Compile compliance requirements from all selected jurisdictions
      const complianceMatrix = {
        fundId: args.fundId,
        jurisdictions: args.jurisdictions,
        requirements: {} as any,
        combinedLimits: {
          maxInvestors: Math.min(...args.jurisdictions.map(j => REGULATORY_FRAMEWORKS[j].investorLimits.maxInvestors)),
          maxRetailPercentage: args.complianceSettings.strictestStandard 
            ? Math.min(...args.jurisdictions.map(j => REGULATORY_FRAMEWORKS[j].investorLimits.maxRetailPercentage))
            : Math.max(...args.jurisdictions.map(j => REGULATORY_FRAMEWORKS[j].investorLimits.maxRetailPercentage)),
          minimumCapital: Math.max(...args.jurisdictions.map(j => REGULATORY_FRAMEWORKS[j].minimumCapital))
        }
      };
      
      // Aggregate all requirements
      const allKycRequirements = new Set<string>();
      const allAmlRequirements = new Set<string>();
      const allAccreditationTypes = new Set<string>();
      const allReportingRequirements = new Set<string>();
      
      args.jurisdictions.forEach(jurisdiction => {
        const framework = REGULATORY_FRAMEWORKS[jurisdiction];
        framework.kycRequirements.forEach(req => allKycRequirements.add(req));
        framework.amlRequirements.forEach(req => allAmlRequirements.add(req));
        framework.accreditationTypes.forEach(type => allAccreditationTypes.add(type));
        framework.reportingRequirements.forEach(req => allReportingRequirements.add(req));
      });
      
      complianceMatrix.requirements = {
        kycRequirements: Array.from(allKycRequirements),
        amlRequirements: Array.from(allAmlRequirements),
        accreditationTypes: Array.from(allAccreditationTypes),
        reportingRequirements: Array.from(allReportingRequirements)
      };
      
      // Create compliance framework transaction on XRPL
      const complianceFrameworkTx = {
        TransactionType: "Payment",
        Account: managerWallet.address,
        Destination: managerWallet.address,
        Amount: "1",
        Memos: [{
          Memo: {
            MemoType: Buffer.from('ComplianceFramework', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify({
              action: 'CREATE_COMPLIANCE_FRAMEWORK',
              fundId: args.fundId,
              complianceMatrix: complianceMatrix,
              settings: args.complianceSettings,
              createdBy: managerWallet.address,
              createdAt: new Date().toISOString()
            }), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(complianceFrameworkTx as any);
      const signed = managerWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Compliance framework creation failed");
      }
      
      return {
        success: true,
        complianceFrameworkId: result.result.hash,
        fundId: args.fundId,
        complianceMatrix: complianceMatrix,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        network: network
      };
      
    } catch (error) {
      console.error("Compliance framework creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Compliance framework creation failed"
      };
    }
  }
});

export const validateInvestorCompliance = action({
  args: {
    complianceFrameworkId: v.string(),
    investorAccount: v.string(),
    investorCredentials: v.object({
      kycCredentials: v.array(v.string()),
      amlCredentials: v.array(v.string()),
      accreditationCredentials: v.array(v.string()),
      jurisdictionOfResidence: v.string(),
      investmentAmount: v.number()
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      // Get compliance framework from XRPL transaction
      const frameworkTx = await client.request({
        command: "tx",
        transaction: args.complianceFrameworkId,
        binary: false
      });
      
      await client.disconnect();
      
      let complianceMatrix: any = null;
      const validationResult = {
        isCompliant: false,
        missingRequirements: [] as string[],
        jurisdictionRestrictions: [] as string[],
        investmentLimitViolations: [] as string[]
      };
      
      // Parse compliance framework from transaction memo
      const txData = frameworkTx.result as any;
      if (txData.Memos) {
        for (const memo of txData.Memos) {
          if (memo.Memo?.MemoType) {
            const memoType = Buffer.from(memo.Memo.MemoType, 'hex').toString('utf8');
            if (memoType === 'ComplianceFramework' && memo.Memo.MemoData) {
              try {
                const memoData = JSON.parse(Buffer.from(memo.Memo.MemoData, 'hex').toString('utf8'));
                if (memoData.action === 'CREATE_COMPLIANCE_FRAMEWORK') {
                  complianceMatrix = memoData.complianceMatrix;
                }
              } catch (parseError) {
                console.warn("Failed to parse compliance framework memo:", parseError);
              }
            }
          }
        }
      }
      
      if (!complianceMatrix) {
        throw new Error("Compliance framework not found");
      }
      
      // Validate KYC requirements
      const missingKyc = complianceMatrix.requirements.kycRequirements.filter(
        (req: string) => !args.investorCredentials.kycCredentials.includes(req)
      );
      validationResult.missingRequirements.push(...missingKyc.map((req: string) => `KYC: ${req}`));
      
      // Validate AML requirements
      const missingAml = complianceMatrix.requirements.amlRequirements.filter(
        (req: string) => !args.investorCredentials.amlCredentials.includes(req)
      );
      validationResult.missingRequirements.push(...missingAml.map((req: string) => `AML: ${req}`));
      
      // Validate accreditation requirements
      const hasRequiredAccreditation = complianceMatrix.requirements.accreditationTypes.some(
        (type: string) => args.investorCredentials.accreditationCredentials.includes(type)
      );
      if (!hasRequiredAccreditation) {
        validationResult.missingRequirements.push("Accreditation: Required investor accreditation missing");
      }
      
      // Check investment limits
      if (args.investorCredentials.investmentAmount < complianceMatrix.combinedLimits.minimumCapital) {
        validationResult.investmentLimitViolations.push(
          `Investment amount below minimum: ${complianceMatrix.combinedLimits.minimumCapital}`
        );
      }
      
      // Determine overall compliance
      validationResult.isCompliant = 
        validationResult.missingRequirements.length === 0 &&
        validationResult.jurisdictionRestrictions.length === 0 &&
        validationResult.investmentLimitViolations.length === 0;
      
      return {
        success: true,
        investorAccount: args.investorAccount,
        complianceFrameworkId: args.complianceFrameworkId,
        validationResult: validationResult,
        complianceMatrix: complianceMatrix
      };
      
    } catch (error) {
      console.error("Investor compliance validation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Compliance validation failed"
      };
    }
  }
});

export const generateComplianceReport = action({
  args: {
    managerSeed: v.string(),
    fundId: v.string(),
    reportType: v.union(
      v.literal("monthly"),
      v.literal("quarterly"),
      v.literal("annual"),
      v.literal("suspicious_activity"),
      v.literal("cross_border")
    ),
    reportingJurisdiction: v.union(
      v.literal("MAS"),
      v.literal("FINMA"),
      v.literal("ESMA"),
      v.literal("VARA"),
      v.literal("SFC"),
      v.literal("SEC")
    ),
    reportPeriod: v.object({
      startDate: v.string(),
      endDate: v.string()
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const managerWallet = Wallet.fromSeed(args.managerSeed);
      
      // Generate compliance report data (would query actual fund transactions)
      const reportData = {
        fundId: args.fundId,
        reportType: args.reportType,
        jurisdiction: args.reportingJurisdiction,
        reportPeriod: args.reportPeriod,
        generatedBy: managerWallet.address,
        generatedAt: new Date().toISOString(),
        // Mock data - would be actual fund metrics
        fundMetrics: {
          totalInvestors: 25,
          totalAUM: 5000000,
          newInvestors: 3,
          redemptions: 1,
          complianceViolations: 0,
          suspiciousTransactions: 0
        },
        regulatoryRequirements: REGULATORY_FRAMEWORKS[args.reportingJurisdiction]
      };
      
      // Submit compliance report to XRPL for immutable audit trail
      const complianceReportTx = {
        TransactionType: "Payment",
        Account: managerWallet.address,
        Destination: managerWallet.address,
        Amount: "1",
        Memos: [{
          Memo: {
            MemoType: Buffer.from('ComplianceReport', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify({
              action: 'COMPLIANCE_REPORT',
              reportData: reportData
            }), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(complianceReportTx as any);
      const signed = managerWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Compliance report submission failed");
      }
      
      return {
        success: true,
        reportId: result.result.hash,
        fundId: args.fundId,
        reportType: args.reportType,
        jurisdiction: args.reportingJurisdiction,
        reportData: reportData,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index
      };
      
    } catch (error) {
      console.error("Compliance report generation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Compliance report generation failed"
      };
    }
  }
});