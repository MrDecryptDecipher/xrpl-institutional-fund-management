/**
 * Extended XRPL TypeScript definitions for institutional-grade features
 * Covers XLS-33 (MPT), XLS-40 (DID), XLS-80 (Permissioned Domains)
 * Used to properly type advanced XRPL transactions not yet in xrpl.js core
 */

import { Transaction, TransactionMetadata } from "xrpl";

// XLS-33 Multi-Purpose Token (MPT) Transactions
export interface MPTokenIssuanceCreateTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenIssuanceCreate";
  MPTokenMetadata: {
    MPTName: string;
    MPTSymbol: string;
    MPTDescription: string;
    MPTDecimals: number;
    MPTURI?: string;
  };
  MPTokenIssuanceMaxAmount: string;
  MPTokenIssuanceTransferFee?: number;
  Flags?: number;
}

export interface MPTokenIssuanceTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenIssuance";
  MPTokenID: string;
  MPTokenIssuanceAmount: string;
  Destination?: string;
}

export interface MPTokenAuthorizeTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "MPTokenAuthorize";
  MPTokenID: string;
  MPTokenHolder: string;
  MPTokenAuthorizeFlag: number;
}

// XLS-40 Decentralized Identity (DID) Transactions  
export interface DIDSetTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DIDSet";
  DIDDocument: string;
  URI?: string;
}

export interface DIDDeleteTransaction extends Omit<Transaction, 'TransactionType'> {
  TransactionType: "DIDDelete";
}

// XLS-80 Permissioned Domains Transactions
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

// Extended Transaction Metadata with XLS amendment support
export interface ExtendedTransactionMetadata extends TransactionMetadata {
  TransactionResult?: string;
  CreatedNodes?: Array<{
    CreatedNode?: {
      NewFields?: {
        MPTokenID?: string;
        DomainID?: string;
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
  | DIDSetTransaction
  | DIDDeleteTransaction
  | DomainCreateTransaction
  | DomainMemberAddTransaction;

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