import { v } from "convex/values";

// Factory functions to create objects without causing deep type instantiation
// These functions help create properly structured objects while avoiding TypeScript issues

/**
 * Creates settlement instructions following XRPL standards
 * @param options - Settlement instruction options
 * @returns Properly structured settlement instructions object
 */
export function createSettlementInstructions(
  options: any = {}
): any {
  return {
    custodian: options.custodian,
    account: options.account
  };
}

/**
 * Creates compliance validation result object
 * @param approved - Whether the compliance validation passed
 * @param options - Additional validation details
 * @returns Properly structured compliance validation object
 */
export function createComplianceValidation(
  approved: boolean,
  options: any = {}
): any {
  return {
    approved,
    reason: options.reason
  };
}

/**
 * Creates NAV calculation result object
 * @param navPerShare - Net Asset Value per share
 * @param totalAUM - Total Assets Under Management
 * @returns Properly structured NAV calculation object
 */
export function createNAVCalculation(
  navPerShare: number,
  totalAUM: number
): any {
  return {
    navPerShare,
    totalAUM
  };
}

/**
 * Creates audit trail entry object
 * @param subscriptionAmount - Subscription amount
 * @param sharePrice - Share price
 * @returns Properly structured audit trail object
 */
export function createAuditTrail(
  subscriptionAmount: number,
  sharePrice: number
): any {
  return {
    subscriptionAmount,
    sharePrice
  };
}

/**
 * Creates transaction details object
 * @param amount - Transaction amount
 * @param shares - Number of shares
 * @returns Properly structured transaction details object
 */
export function createTransactionDetails(
  amount: number,
  shares: number
): any {
  return {
    amount,
    shares
  };
}

/**
 * Creates current NAV object
 * @param navPerShare - Net Asset Value per share
 * @param totalAUM - Total Assets Under Management
 * @returns Properly structured current NAV object
 */
export function createCurrentNAV(
  navPerShare: number,
  totalAUM: number
): any {
  return {
    navPerShare,
    totalAUM
  };
}