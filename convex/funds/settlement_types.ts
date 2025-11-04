import { v } from "convex/values";

// Factory functions to create complex objects without causing deep type instantiation
// These functions help create properly structured objects while avoiding TypeScript issues

/**
 * Creates settlement instructions following XRPL Memo Format Standard #103
 * @param options - Settlement instruction options
 * @returns Properly structured settlement instructions object
 */
export function createSettlementInstructions(
  options: {
    custodian?: string,
    account?: string,
    reference?: string,
    settlementDate?: number,
    deliveryVersusPayment?: boolean
  } = {}
) {
  return {
    custodian: options.custodian,
    account: options.account,
    reference: options.reference,
    settlementDate: options.settlementDate,
    deliveryVersusPayment: options.deliveryVersusPayment
  };
}

/**
 * Creates custody result object for tracking custody operations
 * @param success - Whether the custody operation was successful
 * @param options - Additional custody result details
 * @returns Properly structured custody result object
 */
export function createCustodyResult(
  success: boolean,
  options: {
    custodyTxId?: string,
    custodianName?: string,
    operation?: string,
    amount?: number,
    currency?: string,
    account?: string,
    reference?: string,
    settlementDate?: number,
    confirmationTime?: number,
    error?: string
  } = {}
) {
  return {
    success,
    custodyTxId: options.custodyTxId,
    custodianName: options.custodianName,
    operation: options.operation,
    amount: options.amount,
    currency: options.currency,
    account: options.account,
    reference: options.reference,
    settlementDate: options.settlementDate,
    confirmationTime: options.confirmationTime,
    error: options.error
  };
}

/**
 * Creates FX conversion result object for tracking currency conversions
 * @param success - Whether the FX conversion was successful
 * @param options - Additional FX conversion details
 * @returns Properly structured FX conversion result object
 */
export function createFXConversionResult(
  success: boolean,
  options: {
    convertedAmount?: number,
    fxRate?: number,
    fxCost?: number,
    fxRateTimestamp?: number,
    netAmount?: number,
    error?: string
  } = {}
) {
  return {
    success,
    convertedAmount: options.convertedAmount,
    fxRate: options.fxRate,
    fxCost: options.fxCost,
    fxRateTimestamp: options.fxRateTimestamp,
    netAmount: options.netAmount,
    error: options.error
  };
}

/**
 * Creates cross-border validation result object
 * @param approved - Whether the cross-border transaction is approved
 * @param options - Additional validation details
 * @returns Properly structured cross-border validation result object
 */
export function createCrossBorderValidation(
  approved: boolean,
  options: {
    reason?: string,
    complianceHash?: string,
    timestamp?: number,
    validator?: string
  } = {}
) {
  return {
    approved,
    reason: options.reason,
    complianceHash: options.complianceHash,
    timestamp: options.timestamp,
    validator: options.validator
  };
}

/**
 * Creates reconciliation result object for settlement verification
 * @param settlementId - ID of the settlement being reconciled
 * @param expectedAmount - Expected settlement amount
 * @param actualAmount - Actual settlement amount
 * @param options - Additional reconciliation details
 * @returns Properly structured reconciliation result object
 */
export function createReconciliationResult(
  settlementId: string,
  expectedAmount: number,
  actualAmount: number,
  options: {
    difference?: number,
    withinTolerance?: boolean,
    status?: string,
    timestamp?: number
  } = {}
) {
  const difference = options.difference !== undefined ? options.difference : expectedAmount - actualAmount;
  const withinTolerance = options.withinTolerance !== undefined ? options.withinTolerance : Math.abs(difference) < 0.01;
  const status = options.status || (withinTolerance ? "RECONCILED" : "BREAK");
  const timestamp = options.timestamp || Date.now();
  
  return {
    settlementId,
    expectedAmount,
    actualAmount,
    difference,
    withinTolerance,
    status,
    timestamp
  };
}

/**
 * Creates settlement confirmation object
 * @param confirmationId - Unique confirmation identifier
 * @param settlementId - ID of the confirmed settlement
 * @param settlementType - Type of settlement (SUBSCRIPTION, REDEMPTION, etc.)
 * @param amount - Settlement amount
 * @param currency - Settlement currency
 * @param settlementDate - Settlement date
 * @param options - Additional confirmation details
 * @returns Properly structured settlement confirmation object
 */
export function createSettlementConfirmation(
  confirmationId: string,
  settlementId: string,
  settlementType: string,
  amount: number,
  currency: string,
  settlementDate: number,
  options: {
    status?: string,
    generatedAt?: number,
    deliveryMethod?: string
  } = {}
) {
  return {
    confirmationId,
    settlementId,
    settlementType,
    amount,
    currency,
    settlementDate,
    status: options.status || "CONFIRMED",
    generatedAt: options.generatedAt || Date.now(),
    deliveryMethod: options.deliveryMethod || "XRPL_MEMO"
  };
}