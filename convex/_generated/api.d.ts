/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analytics_enhanced_reporting from "../analytics/enhanced_reporting.js";
import type * as analytics_reporting from "../analytics/reporting.js";
import type * as audit_audit_logging from "../audit/audit_logging.js";
import type * as auth from "../auth.js";
import type * as compliance_enhanced_kyc from "../compliance/enhanced_kyc.js";
import type * as compliance_institutional_compliance from "../compliance/institutional_compliance.js";
import type * as compliance_jurisdictional_matrix from "../compliance/jurisdictional_matrix.js";
import type * as compliance_kyc from "../compliance/kyc.js";
import type * as compliance_regulatory from "../compliance/regulatory.js";
import type * as funds_advanced_management from "../funds/advanced_management.js";
import type * as funds_institutional_management from "../funds/institutional_management.js";
import type * as funds_management from "../funds/management.js";
import type * as funds_xrpl_fund_management from "../funds/xrpl_fund_management.js";
import type * as governance_multisig from "../governance/multisig.js";
import type * as http from "../http.js";
import type * as investors_management from "../investors/management.js";
import type * as oracles_price_feeds from "../oracles/price_feeds.js";
import type * as risk_risk_management from "../risk/risk_management.js";
import type * as router from "../router.js";
import type * as transactions_subscriptions from "../transactions/subscriptions.js";
import type * as xrpl_client from "../xrpl/client.js";
import type * as xrpl_did from "../xrpl/did.js";
import type * as xrpl_did_management from "../xrpl/did_management.js";
import type * as xrpl_domains from "../xrpl/domains.js";
import type * as xrpl_enhanced_client from "../xrpl/enhanced_client.js";
import type * as xrpl_lending_protocol from "../xrpl/lending_protocol.js";
import type * as xrpl_mpt from "../xrpl/mpt.js";
import type * as xrpl_mpt_advanced from "../xrpl/mpt_advanced.js";
import type * as xrpl_permissioned_domains from "../xrpl/permissioned_domains.js";
import type * as xrpl_types_errors from "../xrpl/types/errors.js";
import type * as xrpl_types_xrpl_extended from "../xrpl/types/xrpl-extended.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "analytics/enhanced_reporting": typeof analytics_enhanced_reporting;
  "analytics/reporting": typeof analytics_reporting;
  "audit/audit_logging": typeof audit_audit_logging;
  auth: typeof auth;
  "compliance/enhanced_kyc": typeof compliance_enhanced_kyc;
  "compliance/institutional_compliance": typeof compliance_institutional_compliance;
  "compliance/jurisdictional_matrix": typeof compliance_jurisdictional_matrix;
  "compliance/kyc": typeof compliance_kyc;
  "compliance/regulatory": typeof compliance_regulatory;
  "funds/advanced_management": typeof funds_advanced_management;
  "funds/institutional_management": typeof funds_institutional_management;
  "funds/management": typeof funds_management;
  "funds/xrpl_fund_management": typeof funds_xrpl_fund_management;
  "governance/multisig": typeof governance_multisig;
  http: typeof http;
  "investors/management": typeof investors_management;
  "oracles/price_feeds": typeof oracles_price_feeds;
  "risk/risk_management": typeof risk_risk_management;
  router: typeof router;
  "transactions/subscriptions": typeof transactions_subscriptions;
  "xrpl/client": typeof xrpl_client;
  "xrpl/did": typeof xrpl_did;
  "xrpl/did_management": typeof xrpl_did_management;
  "xrpl/domains": typeof xrpl_domains;
  "xrpl/enhanced_client": typeof xrpl_enhanced_client;
  "xrpl/lending_protocol": typeof xrpl_lending_protocol;
  "xrpl/mpt": typeof xrpl_mpt;
  "xrpl/mpt_advanced": typeof xrpl_mpt_advanced;
  "xrpl/permissioned_domains": typeof xrpl_permissioned_domains;
  "xrpl/types/errors": typeof xrpl_types_errors;
  "xrpl/types/xrpl-extended": typeof xrpl_types_xrpl_extended;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
