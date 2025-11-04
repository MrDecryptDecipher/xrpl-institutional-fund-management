import { v } from "convex/values";

// Factory functions to create complex objects without causing deep type instantiation
// These functions help create properly structured objects while avoiding TypeScript issues

/**
 * Creates KYC data object following institutional compliance standards
 * @param options - KYC data options
 * @returns Properly structured KYC data object
 */
export function createKYCData(
  options: any = {}
): any {
  return {
    personalInfo: options.personalInfo,
    identityDocuments: options.identityDocuments,
    financialProfile: options.financialProfile,
    pepStatus: options.pepStatus,
    sanctionsScreening: options.sanctionsScreening
  };
}

/**
 * Creates investor data object for jurisdictional compliance checks
 * @param options - Investor data options
 * @returns Properly structured investor data object
 */
export function createInvestorData(
  options: any = {}
): any {
  return {
    personalInfo: options.personalInfo,
    identityDocuments: options.identityDocuments,
    financialProfile: options.financialProfile,
    pepStatus: options.pepStatus,
    sanctionsScreening: options.sanctionsScreening
  };
}

/**
 * Creates simplified KYC data object for credential issuance
 * @param options - Simplified KYC data options
 * @returns Properly structured simplified KYC data object
 */
export function createSimplifiedKYCData(
  options: any = {}
): any {
  return {
    personalInfo: options.personalInfo,
    financialProfile: options.financialProfile
  };
}

/**
 * Creates compliance check result object
 * @param rule - Compliance rule name
 * @param passed - Whether the check passed
 * @param details - Check details
 * @returns Properly structured compliance check result object
 */
export function createComplianceCheck(
  rule: string,
  passed: boolean,
  details: string
): any {
  return {
    rule,
    passed,
    details
  };
}

/**
 * Creates jurisdictional compliance result object
 * @param jurisdiction - Jurisdiction name
 * @param compliant - Whether compliant
 * @param checks - Compliance checks performed
 * @param riskScore - Risk score
 * @returns Properly structured jurisdictional compliance result object
 */
export function createJurisdictionalComplianceResult(
  jurisdiction: string,
  compliant: boolean,
  checks: any[],
  riskScore: number
): any {
  return {
    jurisdiction,
    compliant,
    checks,
    riskScore
  };
}

/**
 * Creates KYC credential object
 * @param options - KYC credential options
 * @returns Properly structured KYC credential object
 */
export function createKYCCredential(
  options: any = {}
): any {
  return {
    id: options.id,
    type: options.type,
    issuer: options.issuer,
    issuanceDate: options.issuanceDate,
    expirationDate: options.expirationDate,
    credentialSubject: options.credentialSubject,
    proof: options.proof
  };
}

/**
 * Creates AML screening result object
 * @param options - AML screening options
 * @returns Properly structured AML screening result object
 */
export function createAMLScreeningResult(
  options: any = {}
): any {
  return {
    provider: options.provider,
    screeningDate: options.screeningDate,
    level: options.level,
    result: options.result,
    riskScore: options.riskScore,
    alerts: options.alerts,
    recommendations: options.recommendations
  };
}

/**
 * Creates compliance report data object
 * @param options - Compliance report data options
 * @returns Properly structured compliance report data object
 */
export function createComplianceReportData(
  options: any = {}
): any {
  return {
    totalInvestors: options.totalInvestors,
    approvedInvestors: options.approvedInvestors,
    pendingInvestors: options.pendingInvestors,
    rejectedInvestors: options.rejectedInvestors,
    expiringCredentials: options.expiringCredentials,
    totalScreenings: options.totalScreenings,
    clearedScreenings: options.clearedScreenings,
    flaggedScreenings: options.flaggedScreenings,
    averageRiskScore: options.averageRiskScore,
    highRiskInvestors: options.highRiskInvestors,
    totalTransactions: options.totalTransactions,
    flaggedTransactions: options.flaggedTransactions,
    suspiciousActivityReports: options.suspiciousActivityReports,
    averageTransactionSize: options.averageTransactionSize,
    filingPeriod: options.filingPeriod,
    jurisdiction: options.jurisdiction,
    fundDetails: options.fundDetails,
    investorSummary: options.investorSummary,
    transactionSummary: options.transactionSummary,
    totalEvents: options.totalEvents,
    eventsByType: options.eventsByType,
    complianceEvents: options.complianceEvents,
    systemEvents: options.systemEvents
  };
}

/**
 * Creates compliance rules object for jurisdictional compliance
 * @param options - Compliance rules options
 * @returns Properly structured compliance rules object
 */
export function createComplianceRules(
  options: any = {}
): any {
  return {
    requiresGovernmentId: options.requiresGovernmentId,
    requiresAddressVerification: options.requiresAddressVerification,
    minimumNetWorth: options.minimumNetWorth,
    minimumIncome: options.minimumIncome,
    pepRestrictions: options.pepRestrictions,
    sanctionsScreeningRequired: options.sanctionsScreeningRequired,
    minimumExperience: options.minimumExperience
  };
}

/**
 * Creates audit log entry for compliance events
 * @param options - Audit log entry options
 * @returns Properly structured audit log entry object
 */
export function createComplianceAuditLog(
  options: any
): any {
  return {
    eventId: options.eventId,
    eventType: options.eventType,
    entityType: options.entityType,
    entityId: options.entityId,
    action: options.action,
    actor: options.actor,
    timestamp: options.timestamp,
    changes: options.changes,
    complianceRules: options.complianceRules,
    jurisdictions: options.jurisdictions,
    hash: options.hash
  };
}