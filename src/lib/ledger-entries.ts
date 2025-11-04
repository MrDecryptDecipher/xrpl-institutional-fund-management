import { Client } from 'xrpl';

/**
 * Common fields for all ledger entries
 */
export interface LedgerEntryCommon {
  index: string;
  LedgerEntryType: string;
  PreviousTxnID: string;
  PreviousTxnLgrSeq: number;
}

/**
 * AccountRoot ledger entry
 * Describes a single account, its settings, and XRP balance
 */
export interface AccountRoot extends LedgerEntryCommon {
  LedgerEntryType: 'AccountRoot';
  Account: string;
  Balance: string;
  Flags: number;
  OwnerCount: number;
  Sequence: number;
  AccountTxnID?: string;
  AMMID?: string;
  BurnedNFTokens?: number;
  Domain?: string;
  EmailHash?: string;
  FirstNFTokenSequence?: number;
  MessageKey?: string;
  MintedNFTokens?: number;
  NFTokenMinter?: string;
  RegularKey?: string;
  TicketCount?: number;
  TickSize?: number;
  TransferRate?: number;
  WalletLocator?: string;
  WalletSize?: number;
}

/**
 * AMM ledger entry
 * Describes a single Automated Market Maker instance
 */
export interface AMM extends LedgerEntryCommon {
  LedgerEntryType: 'AMM';
  Account: string;
  Asset: {
    currency: string;
    issuer?: string;
  };
  Asset2: {
    currency: string;
    issuer?: string;
  };
  LPTokenBalance: {
    currency: string;
    issuer: string;
    value: string;
  };
  TradingFee: number;
  AuctionSlot?: {
    Account: string;
    AuthAccounts?: Array<{
      AuthAccount: {
        Account: string;
      }
    }>;
    DiscountedFee: number;
    Price: {
      currency: string;
      issuer: string;
      value: string;
    };
    Expiration: number;
  };
  VoteSlots?: Array<{
    VoteEntry: {
      Account: string;
      TradingFee: number;
      VoteWeight: number;
    }
  }>;
}

/**
 * Check ledger entry
 * Describes a check that can be cashed by its destination
 */
export interface Check extends LedgerEntryCommon {
  LedgerEntryType: 'Check';
  Account: string;
  Destination: string;
  SendMax: string | {
    currency: string;
    issuer?: string;
    value: string;
  };
  Sequence: number;
  DestinationNode?: string;
  DestinationTag?: number;
  Expiration?: number;
  InvoiceID?: string;
  OwnerNode: string;
  SourceTag?: number;
}

/**
 * Credential ledger entry
 * Represents a credential issued to an account
 */
export interface Credential extends LedgerEntryCommon {
  LedgerEntryType: 'Credential';
  Subject: {
    Issuer: string;
    Subject: string;
    CredentialType: string;
  };
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
}

/**
 * DepositPreauth ledger entry
 * Tracks preauthorization for deposits from one account to another
 */
export interface DepositPreauth extends LedgerEntryCommon {
  LedgerEntryType: 'DepositPreauth';
  Account: string;
  Authorize: string;
  OwnerNode: string;
  PreviousOwnerNode?: string;
}

/**
 * DID ledger entry
 * Stores decentralized identity information
 */
export interface DID extends LedgerEntryCommon {
  LedgerEntryType: 'DID';
  Account: string;
  DIDDocument?: string;
  URI?: string;
  Data?: string;
}

/**
 * DirectoryNode ledger entry
 * Contains links to other objects in the ledger
 */
export interface DirectoryNode extends LedgerEntryCommon {
  LedgerEntryType: 'DirectoryNode';
  Owner?: string;
  RootIndex?: string;
  Indexes: string[];
  IndexNext?: number;
  IndexPrevious?: number;
  OwnerNode?: string;
  PreviousOwnerNode?: string;
}

/**
 * Escrow ledger entry
 * Tracks escrowed payments
 */
export interface Escrow extends LedgerEntryCommon {
  LedgerEntryType: 'Escrow';
  Account: string;
  Destination: string;
  Amount: string | {
    currency: string;
    issuer: string;
    value: string;
  };
  Condition?: string;
  CancelAfter?: number;
  FinishAfter?: number;
  Flags: number;
  SourceTag?: number;
  DestinationTag?: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  DestinationNode?: string;
}

/**
 * LedgerHashes ledger entry
 * Tracks hashes of historical ledgers
 */
export interface LedgerHashes extends LedgerEntryCommon {
  LedgerEntryType: 'LedgerHashes';
  FirstLedgerSequence?: number;
  LastLedgerSequence?: number;
  Hashes: string[];
}

/**
 * MPToken ledger entry
 * Represents a Multi-Purpose Token
 */
export interface MPToken extends LedgerEntryCommon {
  LedgerEntryType: 'MPToken';
  Account: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
}

/**
 * MPTokenIssuance ledger entry
 * Represents the issuance of a Multi-Purpose Token
 */
export interface MPTokenIssuance extends LedgerEntryCommon {
  LedgerEntryType: 'MPTokenIssuance';
  MPTokenIssuanceID: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
  Issuer: string;
  TokenID: string;
  Sequence: number;
  AssetScale?: number;
  MaxAmount?: string;
  OutstandingAmount?: string;
  HoldCount?: number;
}

/**
 * NFTokenOffer ledger entry
 * Represents an offer to buy or sell an NFT
 */
export interface NFTokenOffer extends LedgerEntryCommon {
  LedgerEntryType: 'NFTokenOffer';
  Owner: string;
  NFTokenID: string;
  Amount: string | {
    currency: string;
    issuer: string;
    value: string;
  };
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
  Destination?: string;
  Expiration?: number;
}

/**
 * NFTokenPage ledger entry
 * Contains a page of NFTs
 */
export interface NFTokenPage extends LedgerEntryCommon {
  LedgerEntryType: 'NFTokenPage';
  NFTokenOffers?: string[];
  PreviousPageMin?: string;
  NextPageMin?: string;
  PreviousPage?: string;
  NextPage?: string;
}

/**
 * Offer ledger entry
 * Represents an offer to exchange currencies
 */
export interface Offer extends LedgerEntryCommon {
  LedgerEntryType: 'Offer';
  Account: string;
  BookDirectory: string;
  BookNode: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
  Sequence: number;
  TakerGets: string | {
    currency: string;
    issuer: string;
    value: string;
  };
  TakerPays: string | {
    currency: string;
    issuer: string;
    value: string;
  };
  Expiration?: number;
}

/**
 * PayChannel ledger entry
 * Represents a payment channel
 */
export interface PayChannel extends LedgerEntryCommon {
  LedgerEntryType: 'PayChannel';
  Account: string;
  Destination: string;
  Amount: string;
  Balance: string;
  PublicKey: string;
  SettleDelay: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  IndexNext?: string;
  IndexPrevious?: string;
  CancelAfter?: number;
  SourceTag?: number;
  DestinationTag?: number;
}

/**
 * RippleState ledger entry
 * Tracks trust lines between accounts
 */
export interface RippleState extends LedgerEntryCommon {
  LedgerEntryType: 'RippleState';
  Flags: number;
  Balance: {
    currency: string;
    issuer: string;
    value: string;
  };
  LowLimit: {
    currency: string;
    issuer: string;
    value: string;
  };
  HighLimit: {
    currency: string;
    issuer: string;
    value: string;
  };
  LowNode?: string;
  HighNode?: string;
  LowQualityIn?: number;
  LowQualityOut?: number;
  HighQualityIn?: number;
  HighQualityOut?: number;
}

/**
 * SignerList ledger entry
 * Tracks a list of signers for multi-signature transactions
 */
export interface SignerList extends LedgerEntryCommon {
  LedgerEntryType: 'SignerList';
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  SignerEntries: Array<{
    SignerEntry: {
      Account: string;
      SignerWeight: number;
    }
  }>;
  SignerListID: number;
  SignerQuorum: number;
}

/**
 * Ticket ledger entry
 * Represents a ticket for future transactions
 */
export interface Ticket extends LedgerEntryCommon {
  LedgerEntryType: 'Ticket';
  Account: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  TicketSequence: number;
}

/**
 * XChainOwnedClaimID ledger entry
 * Tracks claim IDs for cross-chain transactions
 */
export interface XChainOwnedClaimID extends LedgerEntryCommon {
  LedgerEntryType: 'XChainOwnedClaimID';
  Account: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  XChainClaimID: string;
  OtherChainSource: string;
  PublicKey: string;
  SignatureReward: string;
}

/**
 * XChainOwnedCreateAccountClaimID ledger entry
 * Tracks account creation claim IDs for cross-chain transactions
 */
export interface XChainOwnedCreateAccountClaimID extends LedgerEntryCommon {
  LedgerEntryType: 'XChainOwnedCreateAccountClaimID';
  Account: string;
  Flags: number;
  OwnerNode: string;
  PreviousOwnerNode?: string;
  XChainAccountCreateCount: string;
  OtherChainSource: string;
  PublicKey: string;
  SignatureReward: string;
}

/**
 * Ledger Entries Manager
 * Provides methods for retrieving and working with ledger entries
 */
export class LedgerEntriesManager {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Get a ledger entry by its index
   * @param index The index of the ledger entry to retrieve
   * @returns Promise that resolves with the ledger entry
   */
  async getLedgerEntry(index: string): Promise<any> {
    try {
      const response = await this.client.request({
        command: 'ledger_entry',
        index: index,
        ledger_index: 'validated'
      });
      
      return response.result.node || null;
    } catch (error) {
      throw new Error(`Failed to get ledger entry: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get an AccountRoot entry
   * @param account The account address
   * @returns Promise that resolves with the AccountRoot entry
   */
  async getAccountRoot(account: string): Promise<AccountRoot | null> {
    try {
      const response = await this.client.request({
        command: 'account_info',
        account: account,
        ledger_index: 'validated'
      });
      
      if ((response.result as any).account_data) {
        return (response.result as any).account_data as AccountRoot;
      }
      
      return null;
    } catch (error) {
      throw new Error(`Failed to get AccountRoot: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get account objects of a specific type
   * @param account The account address
   * @param type The type of objects to retrieve
   * @returns Promise that resolves with the account objects
   */
  async getAccountObjects(account: string, type?: string): Promise<any[]> {
    try {
      const params: any = {
        command: 'account_objects',
        account: account,
        ledger_index: 'validated'
      };
      
      if (type) {
        params.type = type;
      }
      
      const response = await this.client.request(params);
      
      return (response.result as any).account_objects || [];
    } catch (error) {
      throw new Error(`Failed to get account objects: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all ledger entry types supported by this implementation
   * @returns Array of supported ledger entry types
   */
  getSupportedLedgerEntryTypes(): string[] {
    return [
      'AccountRoot',
      'AMM',
      'Check',
      'Credential',
      'DepositPreauth',
      'DID',
      'DirectoryNode',
      'Escrow',
      'LedgerHashes',
      'MPToken',
      'MPTokenIssuance',
      'NFTokenOffer',
      'NFTokenPage',
      'Offer',
      'PayChannel',
      'RippleState',
      'SignerList',
      'Ticket',
      'XChainOwnedClaimID',
      'XChainOwnedCreateAccountClaimID'
    ];
  }
}

/**
 * Create a new LedgerEntriesManager instance
 * @param client XRPL client instance
 * @returns A new LedgerEntriesManager instance
 */
export function createLedgerEntriesManager(client: Client): LedgerEntriesManager {
  return new LedgerEntriesManager(client);
}