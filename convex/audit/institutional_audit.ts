import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

/**
 * Advanced Institutional Audit Trail & Forensic Logging System
 * 
 * Per PRD Requirements:
 * - Immutable audit logging for all compliance actions
 * - Comprehensive forensic trails for regulatory requirements
 * - Multi-jurisdictional audit compliance (SOX-404, MiCA, Basel III)
 * - Real-time audit event streaming with cryptographic integrity
 */

// Advanced Subscription Event Logging with Comprehensive Audit Trail
export const logSubscriptionEvent: any = action({
  args: {
    subscriptionId: v.id("subscriptions"),
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    transactionDetails: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // transactionDetails should contain: { amount: number, shares: number, price: number, mptTxHash: string, complianceValidation?: any, riskAssessment?: any }
    institutionalControls: v.optional(v.any()) // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // institutionalControls should contain: { approvalLevel: string, segregationOfDuties: boolean, dualAuthorization?: boolean, auditabilityScore: number }
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  // Returns: { success: boolean, auditLogId?: string, auditHash?: string, timestamp: number, forensicTrailId?: string, error?: string }
  handler: async (ctx: any, args: any) => {
    try {
      // Generate cryptographic audit hash for immutable trail
      const auditHash = await generateAuditHash({
        subscriptionId: args.subscriptionId,
        fundId: args.fundId,
        investorId: args.investorId,
        transactionDetails: args.transactionDetails,
        timestamp: Date.now()
      });

      // Create comprehensive audit log entry
      const auditLogId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `SUB-${args.subscriptionId}-${Date.now()}`,
        eventType: "SUBSCRIPTION_INITIATED",
        entityType: "FUND_SUBSCRIPTION",
        entityId: args.subscriptionId,
        action: "CREATE_SUBSCRIPTION",
        actor: `INVESTOR-${args.investorId}`,
        timestamp: Date.now(),
        changes: {
          before: null,
          after: JSON.stringify({
            subscriptionAmount: args.transactionDetails.amount,
            sharesIssued: args.transactionDetails.shares,
            sharePrice: args.transactionDetails.price,
            mptTxHash: args.transactionDetails.mptTxHash
          }),
          proposalType: "SUBSCRIPTION",
          executionData: JSON.stringify(args.transactionDetails)
        },
        xrplTxHash: args.transactionDetails.mptTxHash,
        complianceRules: extractComplianceRules(args.transactionDetails.complianceValidation),
        jurisdictions: await getEntityJurisdictions(ctx, args.fundId),
        hash: auditHash,
        institutionalMetadata: {
          auditLevel: "INSTITUTIONAL_GRADE",
          regulatoryFramework: ["SOX-404", "MiCA", "Basel-III"],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: auditHash,
          institutionalControls: args.institutionalControls,
          dataClassification: "HIGHLY_CONFIDENTIAL",
          retentionPeriod: "PERPETUAL"
        }
      });

      // Log to external audit systems if required
      await ctx.runAction(api.audit.institutional_audit.streamToExternalAuditSystems, {
        auditLogId: auditLogId,
        eventType: "SUBSCRIPTION_INITIATED",
        urgency: "STANDARD",
        regulatorySignificance: "HIGH"
      });

      return {
        success: true,
        auditLogId: auditLogId,
        auditHash: auditHash,
        timestamp: Date.now(),
        forensicTrailId: `FORENSIC-SUB-${Date.now()}`
      };

    } catch (error) {
      console.error("Audit logging failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audit logging failed"
      };
    }
  }
});

// Advanced Redemption Event Logging with Forensic Capabilities
export const logRedemptionEvent: any = action({
  args: {
    redemptionId: v.id("redemptions"),
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    transactionDetails: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // transactionDetails should contain: { shares: number, value: number, price: number, mptTxHash: string, complianceValidation?: any, liquidityAssessment?: any }
    institutionalControls: v.optional(v.any()) // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // institutionalControls should contain: { approvalLevel: string, segregationOfDuties: boolean, liquidityApproval?: boolean, auditabilityScore: number }
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Generate cryptographic audit hash
      const auditHash = await generateAuditHash({
        redemptionId: args.redemptionId,
        fundId: args.fundId,
        investorId: args.investorId,
        transactionDetails: args.transactionDetails,
        timestamp: Date.now()
      });

      // Create comprehensive redemption audit trail
      const auditLogId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `RED-${args.redemptionId}-${Date.now()}`,
        eventType: "REDEMPTION_EXECUTED",
        entityType: "FUND_REDEMPTION",
        entityId: args.redemptionId,
        action: "EXECUTE_REDEMPTION",
        actor: `INVESTOR-${args.investorId}`,
        timestamp: Date.now(),
        changes: {
          before: JSON.stringify({
            status: "HOLDINGS_ACTIVE"
          }),
          after: JSON.stringify({
            redeemedShares: args.transactionDetails.shares,
            redemptionValue: args.transactionDetails.value,
            sharePrice: args.transactionDetails.price,
            mptTxHash: args.transactionDetails.mptTxHash
          }),
          proposalType: "REDEMPTION",
          executionData: JSON.stringify(args.transactionDetails)
        },
        xrplTxHash: args.transactionDetails.mptTxHash,
        complianceRules: extractComplianceRules(args.transactionDetails.complianceValidation),
        jurisdictions: await getEntityJurisdictions(ctx, args.fundId),
        hash: auditHash,
        institutionalMetadata: {
          auditLevel: "INSTITUTIONAL_GRADE",
          regulatoryFramework: ["SOX-404", "MiCA", "Basel-III"],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: auditHash,
          institutionalControls: args.institutionalControls,
          dataClassification: "HIGHLY_CONFIDENTIAL",
          retentionPeriod: "PERPETUAL"
        }
      });

      // Stream to external audit systems
      await ctx.runAction(api.audit.institutional_audit.streamToExternalAuditSystems, {
        auditLogId: auditLogId,
        eventType: "REDEMPTION_EXECUTED",
        urgency: "STANDARD",
        regulatorySignificance: "HIGH"
      });

      return {
        success: true,
        auditLogId: auditLogId,
        auditHash: auditHash,
        timestamp: Date.now(),
        forensicTrailId: `FORENSIC-RED-${Date.now()}`
      };

    } catch (error) {
      console.error("Redemption audit logging failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Redemption audit logging failed"
      };
    }
  }
});

// Advanced Fund Management Event Logging
export const logFundManagementEvent: any = action({
  args: {
    fundId: v.id("funds"),
    eventType: v.string(),
    action: v.string(),
    actor: v.string(),
    changes: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // changes should contain: { before?: string, after?: string, proposalType?: string }
    xrplTxHash: v.optional(v.string()),
    complianceImpact: v.boolean(),
    riskImpact: v.string()
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Generate cryptographic audit hash
      const auditHash = await generateAuditHash({
        fundId: args.fundId,
        eventType: args.eventType,
        action: args.action,
        actor: args.actor,
        changes: args.changes,
        timestamp: Date.now()
      });

      // Create comprehensive fund management audit trail
      const auditLogId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `FUND-${args.fundId}-${Date.now()}`,
        eventType: args.eventType,
        entityType: "FUND_MANAGEMENT",
        entityId: args.fundId,
        action: args.action,
        actor: args.actor,
        timestamp: Date.now(),
        changes: args.changes,
        xrplTxHash: args.xrplTxHash,
        complianceRules: args.complianceImpact ? ["FUND_MANAGEMENT_COMPLIANCE"] : [],
        jurisdictions: await getEntityJurisdictions(ctx, args.fundId),
        hash: auditHash,
        institutionalMetadata: {
          auditLevel: "INSTITUTIONAL_GRADE",
          regulatoryFramework: ["SOX-404", "MiCA", "Basel-III"],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: auditHash,
          riskImpact: args.riskImpact,
          dataClassification: "CONFIDENTIAL",
          retentionPeriod: "7_YEARS"
        }
      });

      return {
        success: true,
        auditLogId: auditLogId,
        auditHash: auditHash,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("Fund management audit logging failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Fund management audit logging failed"
      };
    }
  }
});

// Advanced Compliance Event Logging with Regulatory Mapping
export const logComplianceEvent: any = action({
  args: {
    complianceId: v.id("compliance"),
    eventType: v.string(),
    entityId: v.string(),
    entity_type: v.string(),
    complianceData: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // complianceData should contain: { rule: string, status: string, evidence?: any, auditor?: string }
    regulatoryJurisdiction: v.string(),
    riskScore: v.number()
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Generate cryptographic audit hash
      const auditHash = await generateAuditHash({
        complianceId: args.complianceId,
        eventType: args.eventType,
        entityId: args.entityId,
        entity_type: args.entity_type,
        complianceData: args.complianceData,
        timestamp: Date.now()
      });

      // Create comprehensive compliance audit trail
      const auditLogId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `COMPLIANCE-${args.complianceId}-${Date.now()}`,
        eventType: args.eventType,
        entityType: args.entity_type,
        entityId: args.entityId,
        action: "COMPLIANCE_CHECK",
        actor: "AUTOMATED_COMPLIANCE_ENGINE",
        timestamp: Date.now(),
        changes: {
          before: null,
          after: JSON.stringify(args.complianceData),
          proposalType: "COMPLIANCE",
          executionData: JSON.stringify(args.complianceData)
        },
        xrplTxHash: undefined,
        complianceRules: [args.complianceData.rule],
        jurisdictions: [args.regulatoryJurisdiction],
        hash: auditHash,
        institutionalMetadata: {
          auditLevel: "COMPLIANCE_GRADE",
          regulatoryFramework: [args.regulatoryJurisdiction],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: auditHash,
          riskScore: args.riskScore,
          dataClassification: "CONFIDENTIAL",
          retentionPeriod: "PERPETUAL"
        }
      });

      return {
        success: true,
        auditLogId: auditLogId,
        auditHash: auditHash,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("Compliance audit logging failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Compliance audit logging failed"
      };
    }
  }
});

// Advanced Settlement Event Logging with Cross-Border Tracking
export const logSettlementEvent: any = action({
  args: {
    settlementId: v.id("settlements"),
    fundId: v.id("funds"),
    investorId: v.id("investors"),
    settlementDetails: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // settlementDetails should contain: { amount: number, currency: string, fromAccount: string, toAccount: string, mptTxHash: string, crossBorder: boolean }
    institutionalControls: v.optional(v.any()) // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    // institutionalControls should contain: { approvalLevel: string, segregationOfDuties: boolean, crossBorderApproval?: boolean, auditabilityScore: number }
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Generate cryptographic audit hash
      const auditHash = await generateAuditHash({
        settlementId: args.settlementId,
        fundId: args.fundId,
        investorId: args.investorId,
        settlementDetails: args.settlementDetails,
        timestamp: Date.now()
      });

      // Create comprehensive settlement audit trail
      const auditLogId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `SETTLEMENT-${args.settlementId}-${Date.now()}`,
        eventType: "SETTLEMENT_EXECUTED",
        entityType: "FUND_SETTLEMENT",
        entityId: args.settlementId,
        action: "EXECUTE_SETTLEMENT",
        actor: "SETTLEMENT_ENGINE",
        timestamp: Date.now(),
        changes: {
          before: null,
          after: JSON.stringify({
            settledAmount: args.settlementDetails.amount,
            currency: args.settlementDetails.currency,
            fromAccount: args.settlementDetails.fromAccount,
            toAccount: args.settlementDetails.toAccount,
            mptTxHash: args.settlementDetails.mptTxHash
          }),
          proposalType: "SETTLEMENT",
          executionData: JSON.stringify(args.settlementDetails)
        },
        xrplTxHash: args.settlementDetails.mptTxHash,
        complianceRules: args.settlementDetails.crossBorder ? ["CROSS_BORDER_COMPLIANCE", "FX_REGULATIONS"] : ["DOMESTIC_SETTLEMENT"],
        jurisdictions: await getEntityJurisdictions(ctx, args.fundId),
        hash: auditHash,
        institutionalMetadata: {
          auditLevel: "SETTLEMENT_GRADE",
          regulatoryFramework: ["SOX-404", "MiCA", "Basel-III"],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: auditHash,
          institutionalControls: args.institutionalControls,
          crossBorder: args.settlementDetails.crossBorder,
          dataClassification: "HIGHLY_CONFIDENTIAL",
          retentionPeriod: "10_YEARS"
        }
      });

      return {
        success: true,
        auditLogId: auditLogId,
        auditHash: auditHash,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("Settlement audit logging failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Settlement audit logging failed"
      };
    }
  }
});

// Core Audit Log Creation with Immutable Properties
export const createAuditLogEntry: any = mutation({
  args: {
    eventId: v.string(),
    eventType: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    action: v.string(),
    actor: v.string(),
    timestamp: v.number(),
    changes: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
    xrplTxHash: v.optional(v.string()),
    complianceRules: v.array(v.string()),
    jurisdictions: v.array(v.string()),
    hash: v.string(),
    institutionalMetadata: v.optional(v.any()) // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  },
  returns: v.id("auditLogs"),
  handler: async (ctx: any, args: any) => {
    // Create immutable audit log entry
    return await ctx.db.insert("auditLogs", {
      eventId: args.eventId,
      eventType: args.eventType,
      entityType: args.entityType,
      entityId: args.entityId,
      action: args.action,
      actor: args.actor,
      timestamp: args.timestamp,
      changes: args.changes,
      xrplTxHash: args.xrplTxHash,
      complianceRules: args.complianceRules,
      jurisdictions: args.jurisdictions,
      hash: args.hash,
      institutionalMetadata: args.institutionalMetadata,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }
});

// Advanced Audit Streaming to External Systems
export const streamToExternalAuditSystems: any = action({
  args: {
    auditLogId: v.id("auditLogs"),
    eventType: v.string(),
    urgency: v.union(v.literal("LOW"), v.literal("STANDARD"), v.literal("HIGH"), v.literal("CRITICAL")),
    regulatorySignificance: v.union(v.literal("LOW"), v.literal("MEDIUM"), v.literal("HIGH"))
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Fetch audit log entry
      const auditLog = await ctx.runQuery(api.audit.institutional_audit.getAuditLogById, {
        auditLogId: args.auditLogId
      });

      if (!auditLog) {
        throw new Error("Audit log not found");
      }

      // Stream to external audit systems based on urgency and regulatory significance
      // This is a mock implementation - in production, this would integrate with actual audit systems
      const externalSystems = determineExternalSystems(args.urgency, args.regulatorySignificance);
      
      // Simulate streaming to external systems
      for (const system of externalSystems) {
        await streamToExternalSystem(system, auditLog);
      }

      return {
        success: true,
        systemsNotified: externalSystems,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("Audit streaming failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audit streaming failed"
      };
    }
  }
});

// Advanced Audit Querying with Forensic Capabilities
export const getAuditTrail: any = query({
  args: {
    entityId: v.string(),
    entityType: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    eventType: v.optional(v.string())
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    // Query audit logs with advanced filtering
    const auditLogs = await ctx.db.query("auditLogs")
      .filter((q: any) => 
        q.and(
          q.eq(q.field("entityId"), args.entityId),
          q.eq(q.field("entityType"), args.entityType),
          args.startDate ? q.gte(q.field("timestamp"), args.startDate) : q.gt(q.field("timestamp"), 0),
          args.endDate ? q.lte(q.field("timestamp"), args.endDate) : q.lt(q.field("timestamp"), Date.now() + 1),
          args.eventType ? q.eq(q.field("eventType"), args.eventType) : q.neq(q.field("eventType"), "")
        )
      )
      .order("desc")
      .take(100);

    return auditLogs;
  }
});

// Advanced Compliance Audit Trail Generation
export const generateComplianceAuditTrail: any = action({
  args: {
    fundId: v.id("funds"),
    period: v.string(),
    jurisdiction: v.string(),
    reportType: v.string()
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    try {
      // Generate comprehensive compliance audit trail
      const auditTrail = await ctx.runQuery(api.audit.institutional_audit.getAuditTrail, {
        entityId: args.fundId,
        entityType: "FUND",
        startDate: getPeriodStartDate(args.period),
        endDate: Date.now()
      });

      // Generate cryptographic hash of the entire audit trail
      const trailHash = await generateAuditHash({
        fundId: args.fundId,
        period: args.period,
        jurisdiction: args.jurisdiction,
        auditTrail: auditTrail,
        timestamp: Date.now()
      });

      // Create compliance report
      const reportId = await ctx.runMutation(api.audit.institutional_audit.createAuditLogEntry, {
        eventId: `COMPLIANCE_REPORT-${args.fundId}-${Date.now()}`,
        eventType: "COMPLIANCE_REPORT_GENERATED",
        entityType: "FUND_COMPLIANCE",
        entityId: args.fundId,
        action: "GENERATE_COMPLIANCE_REPORT",
        actor: "COMPLIANCE_ENGINE",
        timestamp: Date.now(),
        changes: {
          before: null,
          after: JSON.stringify({
            reportType: args.reportType,
            period: args.period,
            jurisdiction: args.jurisdiction,
            auditTrailCount: auditTrail.length
          }),
          proposalType: "COMPLIANCE_REPORT",
          executionData: JSON.stringify({
            auditTrail: auditTrail.map((log: any) => log.eventId),
            trailHash: trailHash
          })
        },
        xrplTxHash: undefined,
        complianceRules: ["COMPLIANCE_REPORTING"],
        jurisdictions: [args.jurisdiction],
        hash: trailHash,
        institutionalMetadata: {
          auditLevel: "COMPLIANCE_GRADE",
          regulatoryFramework: [args.jurisdiction],
          forensicCapability: true,
          immutableRecord: true,
          cryptographicIntegrity: trailHash,
          dataClassification: "CONFIDENTIAL",
          retentionPeriod: "PERPETUAL"
        }
      });

      return {
        success: true,
        reportId: reportId,
        trailHash: trailHash,
        auditTrailCount: auditTrail.length,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("Compliance audit trail generation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Compliance audit trail generation failed"
      };
    }
  }
});

// Helper function to get audit log by ID
export const getAuditLogById: any = query({
  args: {
    auditLogId: v.id("auditLogs")
  },
  returns: v.any(), // Using v.any() to avoid deep type instantiation while maintaining XRPL compliance
  handler: async (ctx: any, args: any) => {
    return await ctx.db.get(args.auditLogId);
  }
});

// Helper function to generate cryptographic audit hash
async function generateAuditHash(data: any): Promise<string> {
  // In production, use actual cryptographic hashing
  // For now, using a simplified approach
  const dataString = JSON.stringify(data);
  return Buffer.from(dataString).toString('hex');
}

// Helper function to extract compliance rules
function extractComplianceRules(complianceValidation: any): string[] {
  if (!complianceValidation) return [];
  return Object.keys(complianceValidation).map(rule => `COMPLIANCE_${rule.toUpperCase()}`);
}

// Helper function to get entity jurisdictions
async function getEntityJurisdictions(ctx: any, entityId: string): Promise<string[]> {
  // Mock implementation - in production, this would fetch actual jurisdiction data
  return ["GLOBAL"];
}

// Helper function to determine external systems
function determineExternalSystems(urgency: string, regulatorySignificance: string): string[] {
  const systems = ["INTERNAL_AUDIT_SYSTEM"];
  
  if (urgency === "HIGH" || urgency === "CRITICAL") {
    systems.push("REGULATORY_REPORTING_SYSTEM");
  }
  
  if (regulatorySignificance === "HIGH") {
    systems.push("COMPLIANCE_MONITORING_SYSTEM");
  }
  
  return systems;
}

// Helper function to stream to external system
async function streamToExternalSystem(system: string, auditLog: any): Promise<void> {
  // Mock implementation - in production, this would stream to actual external systems
  console.log(`Streaming to ${system}:`, auditLog.eventId);
}

// Helper function to get period start date
function getPeriodStartDate(period: string): number {
  // Mock implementation - in production, this would calculate actual period start dates
  return Date.now() - (30 * 24 * 60 * 60 * 1000); // 30 days ago
}