/**
 * Extended XRPL TypeScript definitions for institutional-grade features
 * Covers XLS-33 (MPT), XLS-40 (DID), XLS-80 (Permissioned Domains)
 * Used to properly type advanced XRPL transactions not yet in xrpl.js core
 */

import { Transaction, TransactionMetadata } from "xrpl";

// XLS-33 Multi-Purpose Token (MPT) Transactions
export interface MPTokenIssuanceCreateTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenIssuanceCreate";
  AssetScale?: number;
  MaximumAmount?: string;
  TransferFee?: number;
  MPTokenMetadata?: string;
  Flags?: number;
  Fee?: string;
}

export interface MPTokenIssuanceTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "Payment";
  Amount: {
    mpt_issuance_id: string;
    value: string;
  };
  Destination?: string;
}

export interface MPTokenAuthorizeTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenAuthorize";
  MPTokenIssuanceID: string;
  Holder?: string;
  Flags?: number;
}

export interface MPTokenIssuanceSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenIssuanceSet";
  MPTokenIssuanceID: string;
  Holder?: string;
  Flags?: number;
}

export interface MPTokenIssuanceDestroyTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenIssuanceDestroy";
  MPTokenIssuanceID: string;
}

export interface ClawbackTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "Clawback";
  Amount: {
    currency: string;
    issuer: string;
    value: string;
  } | {
    mpt_issuance_id: string;
    value: string;
  };
  Holder?: string;
}

// XLS-40 Decentralized Identity (DID) Transactions  
export interface DIDSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DIDSet";
  DIDDocument: string;
  URI?: string;
  Data?: string;
}

export interface DIDDeleteTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DIDDelete";
}

// XLS-80 Permissioned Domains Transactions
export interface PermissionedDomainSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "PermissionedDomainSet";
  DomainID?: string;
  AcceptedCredentials: Array<{
    Credential: {
      Issuer: string;
      CredentialType: string;
    }
  }>;
}

export interface PermissionedDomainDeleteTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "PermissionedDomainDelete";
  DomainID: string;
}

export interface DomainCreateTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DomainCreate";
  DomainName: string;
  DomainRules: string;
  DomainMetadata?: string;
}

export interface DomainMemberAddTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DomainMemberAdd";
  DomainID: string;
  MemberAccount: string;
  MembershipData: string;
}

// XLS-65/66 Lending Protocol Transactions
export interface LoanSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanSet";
  LoanID: string;
  Principal: {
    currency: string;
    issuer: string;
    value: string;
  };
  InterestRate: number;
  Term: number;
  Flags?: number;
}

export interface LoanDeleteTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanDelete";
  LoanID: string;
}

export interface LoanDrawTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanDraw";
  LoanID: string;
  Amount: {
    currency: string;
    issuer: string;
    value: string;
  };
}

export interface LoanPayTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanPay";
  LoanID: string;
  Amount: {
    currency: string;
    issuer: string;
    value: string;
  };
}

export interface LoanManageTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanManage";
  LoanID: string;
  Flags: number;
}

export interface LoanBrokerSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanBrokerSet";
  VaultID: string;
  ManagementFee: number;
  Flags?: number;
}

export interface LoanBrokerDeleteTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "LoanBrokerDelete";
  LoanBrokerID: string;
}

// Extended Transaction Metadata with XLS amendment support
export interface ExtendedTransactionMetadata {
  TransactionResult?: string;
  CreatedNodes?: Array<{
    CreatedNode?: {
      NewFields?: {
        MPTokenID?: string;
        DomainID?: string;
        LoanID?: string;
        LoanBrokerID?: string;
        [key: string]: any;
      };
    };
  }>;
  ModifiedNodes?: Array<{
    ModifiedNode?: {
      FinalFields?: any;
      PreviousFields?: any;
    };
  }>;
  DeletedNodes?: Array<{
    DeletedNode?: any;
  }>;
}

// Union type for all advanced XRPL transactions
export type AdvancedXRPLTransaction = 
  | MPTokenIssuanceCreateTransaction
  | MPTokenIssuanceTransaction  
  | MPTokenAuthorizeTransaction
  | MPTokenIssuanceSetTransaction
  | MPTokenIssuanceDestroyTransaction
  | ClawbackTransaction
  | DIDSetTransaction
  | DIDDeleteTransaction
  | PermissionedDomainSetTransaction
  | PermissionedDomainDeleteTransaction
  | DomainCreateTransaction
  | DomainMemberAddTransaction
  | LoanSetTransaction
  | LoanDeleteTransaction
  | LoanDrawTransaction
  | LoanPayTransaction
  | LoanManageTransaction
  | LoanBrokerSetTransaction
  | LoanBrokerDeleteTransaction;

// Type helpers for transaction result validation
export interface XRPLTransactionResult {
  result: {
    hash?: string;
    ledger_index?: number;
    validated?: boolean;
    meta?: ExtendedTransactionMetadata;
  };
}

// Network type definitions
export type XRPLNetwork = "testnet" | "mainnet" | "devnet";

export const XRPL_NETWORK_ENDPOINTS: Record<XRPLNetwork, string> = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com", 
  devnet: "wss://s.devnet.rippletest.net:51233"
} as const;