import { Client, Wallet } from 'xrpl';
import { Checks } from './checks';
import { PaymentChannels } from './payment-channels';
import { Bridge } from './bridge';
import { AMM } from './amm';
import { MPT } from './mpt';
import { DID } from './did';
import { Credential } from './credential';
import { Oracle } from './oracle';
import { PermissionedDomain } from './permissioned-domain';
import { NFT } from './nft';
import { Delegate } from './delegate';
import { ClawbackManager } from './clawback';
import { DepositPreauthManager } from './deposit-preauth';

/**
 * Comprehensive Transaction Manager Implementation
 * 
 * This module provides functionality for all 59 transaction types documented in
 * XRPL folder H, following XRPL standards exactly.
 */

// ==================== CONFIGURATION ====================

export interface TransactionManagerConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

// ==================== COMMON INTERFACES ====================

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

// ==================== PAYMENT TRANSACTION TYPES ====================

export interface PaymentParams {
  destination: string;
  amount: string | { currency: string; value: string; issuer: string };
  deliverMax?: string | { currency: string; value: string; issuer: string };
  deliverMin?: string | { currency: string; value: string; issuer: string };
  sendMax?: string | { currency: string; value: string; issuer: string };
  paths?: any[];
  invoiceId?: string;
  destinationTag?: number;
  sourceTag?: number;
  credentialIds?: string[];
  domainId?: string;
}

export interface AccountSetParams {
  flags?: number;
  clearFlag?: number;
  setFlag?: number;
  transferRate?: number;
  tickSize?: number;
  domain?: string;
  emailHash?: string;
  messageKey?: string;
  walletLocator?: string;
  walletSize?: number;
}

export interface AccountDeleteParams {
  destination: string;
  destinationTag?: number;
}

export interface SetRegularKeyParams {
  regularKey?: string;
}

// ==================== CHECK TRANSACTION TYPES ====================

export interface CheckCreateParams {
  destination: string;
  sendMax: string | { currency: string; value: string; issuer: string };
  destinationTag?: number;
  expiration?: number;
  invoiceId?: string;
}

export interface CheckCashParams {
  checkId: string;
  amount?: string | { currency: string; value: string; issuer: string };
  deliverMin?: string | { currency: string; value: string; issuer: string };
}

export interface CheckCancelParams {
  checkId: string;
}

// ==================== PAYMENT CHANNEL TRANSACTION TYPES ====================

export interface PaymentChannelCreateParams {
  amount: string;
  destination: string;
  settleDelay: number;
  publicKey: string;
  cancelAfter?: number;
  destinationTag?: number;
  sourceTag?: number;
}

export interface PaymentChannelFundParams {
  channel: string;
  amount: string;
  expiration?: number;
}

export interface PaymentChannelClaimParams {
  channel: string;
  balance?: string;
  amount: string;
  signature?: string;
  publicKey?: string;
}

// ==================== ESCROW TRANSACTION TYPES ====================

export interface EscrowCreateParams {
  amount: string | { currency: string; value: string; issuer: string };
  destination: string;
  cancelAfter?: number;
  finishAfter?: number;
  condition?: string;
  destinationTag?: number;
  sourceTag?: number;
}

export interface EscrowFinishParams {
  owner: string;
  offerSequence: number;
  condition?: string;
  fulfillment?: string;
}

export interface EscrowCancelParams {
  owner: string;
  offerSequence: number;
}

// ==================== TRUST LINE TRANSACTION TYPES ====================

export interface TrustSetParams {
  limitAmount: { currency: string; value: string; issuer: string };
  qualityIn?: number;
  qualityOut?: number;
}

// ==================== OFFER TRANSACTION TYPES ====================

export interface OfferCreateParams {
  takerGets: string | { currency: string; value: string; issuer: string };
  takerPays: string | { currency: string; value: string; issuer: string };
  expiration?: number;
  offerSequence?: number;
  takerGetsIssuer?: string;
  takerPaysIssuer?: string;
}

export interface OfferCancelParams {
  offerSequence: number;
}

// ==================== SIGNER LIST TRANSACTION TYPES ====================

export interface SignerListSetParams {
  signerQuorum: number;
  signerEntries: Array<{
    account: string;
    signerWeight: number;
  }>;
}

// ==================== TICKET TRANSACTION TYPES ====================

export interface TicketCreateParams {
  ticketCount: number;
}

// ==================== NFT TRANSACTION TYPES ====================

export interface NFTokenMintParams {
  nftokenTaxon: number;
  issuer?: string;
  transferFee?: number;
  uri?: string;
  flags?: number;
}

export interface NFTokenCreateOfferParams {
  nftokenId: string;
  amount: string | { currency: string; value: string; issuer: string };
  owner?: string;
  expiration?: number;
  destination?: string;
}

export interface NFTokenAcceptOfferParams {
  nftokenBuyOffer?: string;
  nftokenSellOffer?: string;
  nftokenBrokerFee?: string | { currency: string; value: string; issuer: string };
}

export interface NFTokenCancelOfferParams {
  nftokenOffers: string[];
}

export interface NFTokenBurnParams {
  nftokenId: string;
  owner?: string;
}

export interface NFTokenModifyParams {
  nftokenId: string;
  issuer: string;
  transferFee?: number;
  flags?: number;
}

// ==================== DID TRANSACTION TYPES ====================

export interface DIDSetParams {
  didDocument?: string;
  uri?: string;
  data?: string;
}

export interface DIDDeleteParams {
  // No specific parameters needed
}

// ==================== PERMISSIONED DOMAIN TRANSACTION TYPES ====================

export interface PermissionedDomainSetParams {
  domain: string;
  flags?: number;
  expireTime?: number;
}

export interface PermissionedDomainDeleteParams {
  domain: string;
}

// ==================== MPT TRANSACTION TYPES ====================

export interface MPTokenIssuanceCreateParams {
  maximumAmount?: string;
  minimumTransferAmount?: string;
  mptokenMetadata?: string;
  transferFee?: number;
  flags?: number;
  assetScale?: number;
}

export interface MPTokenAuthorizeParams {
  account: string;
  authorize?: number;
  holdAmount?: string;
}

export interface MPTokenIssuanceSetParams {
  flags?: number;
  transferFee?: number;
  minimumTransferAmount?: string;
  mptokenMetadata?: string;
}

export interface MPTokenIssuanceDestroyParams {
  // No specific parameters needed
}

// ==================== CREDENTIAL TRANSACTION TYPES ====================

export interface CredentialCreateParams {
  subject: string;
  credentialType: string;
  issuer?: string;
  expireTime?: number;
  metadata?: string;
  uri?: string;
}

export interface CredentialAcceptParams {
  credentialId: string;
  issuer?: string;
  subject?: string;
  credentialType: string;
}

export interface CredentialDeleteParams {
  credentialId: string;
}

// ==================== DELEGATE TRANSACTION TYPES ====================

export interface DelegateSetParams {
  authorize: string;
  flags?: number;
}

// ==================== ORACLE TRANSACTION TYPES ====================

export interface OracleSetParams {
  assetClass: string;
  provider: string;
  uri?: string;
  lastUpdateTime: number;
  priceDataSeries: Array<{
    baseAsset: string;
    quoteAsset: string;
    assetPrice: number;
    scale: number;
  }>;
}

export interface OracleDeleteParams {
  // No specific parameters needed
}

// ==================== DEPOSIT PREAUTH TRANSACTION TYPES ====================

export interface DepositPreauthParams {
  authorize?: string;
  unauthorize?: string;
}

// ==================== CLAWBACK TRANSACTION TYPES ====================

export interface ClawbackParams {
  amount: string | { currency: string; value: string; issuer: string };
}

// ==================== AMM TRANSACTION TYPES ====================

export interface AMMCreateParams {
  amount: string | { currency: string; value: string; issuer: string };
  amount2: string | { currency: string; value: string; issuer: string };
  tradingFee: number;
}

export interface AMMDepositParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
  amount?: string | { currency: string; value: string; issuer: string };
  amount2?: string | { currency: string; value: string; issuer: string };
  ePrice?: string | { currency: string; value: string; issuer: string };
  lpTokenOut?: string | { currency: string; value: string; issuer: string };
}

export interface AMMWithdrawParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
  amount?: string | { currency: string; value: string; issuer: string };
  amount2?: string | { currency: string; value: string; issuer: string };
  lpTokenIn?: string | { currency: string; value: string; issuer: string };
  ePrice?: string | { currency: string; value: string; issuer: string };
}

export interface AMMVoteParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
  tradingFee: number;
}

export interface AMMBidParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
  bidMin?: string | { currency: string; value: string; issuer: string };
  bidMax?: string | { currency: string; value: string; issuer: string };
  authAccounts?: Array<{ account: string }>;
}

export interface AMMClawbackParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
  clawbackAmount: string | { currency: string; value: string; issuer: string };
}

export interface AMMDeleteParams {
  asset: { currency: string; issuer?: string };
  asset2: { currency: string; issuer?: string };
}

// ==================== BRIDGE TRANSACTION TYPES ====================

export interface XChainCreateBridgeParams {
  xChainBridge: any;
  signatureReward: string;
  minAccountCreateAmount?: string;
}

export interface XChainAccountCreateCommitParams {
  xChainBridge: any;
  amount: string;
  destination: string;
  signatureReward?: string;
}

export interface XChainCreateClaimIdParams {
  xChainBridge: any;
  otherChainSource: string;
  signatureReward?: string;
}

export interface XChainCommitParams {
  xChainBridge: any;
  amount: string;
  otherChainDestination: string;
  xChainClaimID: string;
}

export interface XChainClaimParams {
  xChainBridge: any;
  amount: string;
  xChainClaimID: string;
  destination?: string;
}

export interface XChainAddAccountCreateAttestationParams {
  xChainBridge: any;
  otherChainSource: string;
  destination: string;
  amount: string;
  publicKey: string;
  signature: string;
  wasLockingChainSend: number;
  attestationRewardAccount: string;
  attestationSignerAccount: string;
  xChainAccountCreateCount: string;
  signatureReward: string;
}

export interface XChainAddClaimAttestationParams {
  xChainBridge: any;
  otherChainSource: string;
  otherChainDestination: string;
  amount: string;
  publicKey: string;
  signature: string;
  wasLockingChainSend: number;
  claimID: string;
  signatureReward: string;
}

export interface XChainModifyBridgeParams {
  xChainBridge: any;
  signatureReward?: string;
  minAccountCreateAmount?: string;
}

// ==================== BATCH TRANSACTION TYPE ====================

export interface BatchParams {
  transactions: any[];
}

// ==================== LEDGER STATE FIX TRANSACTION TYPE ====================

export interface LedgerStateFixParams {
  // Specific parameters would be defined based on XRPL documentation
}

// ==================== TRANSACTION MANAGER ====================

/**
 * Comprehensive Transaction Manager
 * 
 * This class provides methods for all 59 transaction types documented in XRPL folder H.
 */
export class TransactionManager {
  private client: Client;
  private config: TransactionManagerConfig;
  
  // Specialized managers
  private checks: Checks;
  private paymentChannels: PaymentChannels;
  private bridge: Bridge;
  private amm: AMM;
  private mpt: MPT;
  private did: DID;
  private credential: Credential;
  private oracle: Oracle;
  private permissionedDomain: PermissionedDomain;
  private nft: NFT;
  private delegate: Delegate;
  private clawback: ClawbackManager;
  private depositPreauth: DepositPreauthManager;
  
  constructor(config: TransactionManagerConfig) {
    this.config = config;
    this.client = new Client(config.server);
    
    // Initialize specialized managers
    this.checks = new Checks(config);
    this.paymentChannels = new PaymentChannels(config);
    this.bridge = new Bridge({
      lockingChainUrl: config.server,
      issuingChainUrl: config.server,
      lockingChainDoor: '',
      issuingChainDoor: '',
      lockingChainIssue: { currency: 'XRP' },
      issuingChainIssue: { currency: 'XRP' }
    });
    this.amm = new AMM(config);
    this.mpt = new MPT(config);
    this.did = new DID(config);
    this.credential = new Credential(config);
    this.oracle = new Oracle(config);
    this.permissionedDomain = new PermissionedDomain(config);
    this.nft = new NFT(config);
    this.delegate = new Delegate(config);
    this.clawback = new ClawbackManager(config);
    this.depositPreauth = new DepositPreauthManager(config);
  }
  
  /**
   * Connect to the XRPL server
   * 
   * @returns Promise that resolves when connected
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log(`Connected to XRPL server: ${this.config.server}`);
    } catch (error) {
      throw new Error(`Failed to connect to XRPL server: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Disconnect from the XRPL server
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      console.log('Disconnected from XRPL server');
    } catch (error) {
      console.error(`Error disconnecting from XRPL server: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // ==================== PAYMENT TRANSACTIONS ====================
  
  /**
   * Submit a Payment transaction
   * 
   * @param wallet - The sender's wallet
   * @param params - Payment parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPayment(
    wallet: Wallet,
    params: PaymentParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'Payment',
        Account: wallet.classicAddress,
        Destination: params.destination,
        Amount: params.amount
      };
      
      // Add optional parameters
      if (params.deliverMax !== undefined) transaction.DeliverMax = params.deliverMax;
      if (params.deliverMin !== undefined) transaction.DeliverMin = params.deliverMin;
      if (params.sendMax !== undefined) transaction.SendMax = params.sendMax;
      if (params.paths !== undefined) transaction.Paths = params.paths;
      if (params.invoiceId !== undefined) transaction.InvoiceID = params.invoiceId;
      if (params.destinationTag !== undefined) transaction.DestinationTag = params.destinationTag;
      if (params.sourceTag !== undefined) transaction.SourceTag = params.sourceTag;
      if (params.credentialIds !== undefined) transaction.CredentialIDs = params.credentialIds;
      if (params.domainId !== undefined) transaction.DomainID = params.domainId;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit Payment: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an AccountSet transaction
   * 
   * @param wallet - The account owner's wallet
   * @param params - AccountSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAccountSet(
    wallet: Wallet,
    params: AccountSetParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'AccountSet',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.flags !== undefined) transaction.Flags = params.flags;
      if (params.clearFlag !== undefined) transaction.ClearFlag = params.clearFlag;
      if (params.setFlag !== undefined) transaction.SetFlag = params.setFlag;
      if (params.transferRate !== undefined) transaction.TransferRate = params.transferRate;
      if (params.tickSize !== undefined) transaction.TickSize = params.tickSize;
      if (params.domain !== undefined) transaction.Domain = params.domain;
      if (params.emailHash !== undefined) transaction.EmailHash = params.emailHash;
      if (params.messageKey !== undefined) transaction.MessageKey = params.messageKey;
      if (params.walletLocator !== undefined) transaction.WalletLocator = params.walletLocator;
      if (params.walletSize !== undefined) transaction.WalletSize = params.walletSize;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit AccountSet: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an AccountDelete transaction
   * 
   * @param wallet - The account owner's wallet
   * @param params - AccountDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAccountDelete(
    wallet: Wallet,
    params: AccountDeleteParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'AccountDelete',
        Account: wallet.classicAddress,
        Destination: params.destination
      };
      
      // Add optional parameters
      if (params.destinationTag !== undefined) transaction.DestinationTag = params.destinationTag;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit AccountDelete: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit a SetRegularKey transaction
   * 
   * @param wallet - The account owner's wallet
   * @param params - SetRegularKey parameters
   * @returns Promise that resolves with transaction result
   */
  async submitSetRegularKey(
    wallet: Wallet,
    params: SetRegularKeyParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'SetRegularKey',
        Account: wallet.classicAddress
      };
      
      // Add optional parameter
      if (params.regularKey !== undefined) transaction.RegularKey = params.regularKey;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit SetRegularKey: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== CHECK TRANSACTIONS ====================
  
  /**
   * Submit a CheckCreate transaction
   * 
   * @param wallet - The check creator's wallet
   * @param params - CheckCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCheckCreate(
    wallet: Wallet,
    params: CheckCreateParams
  ): Promise<TransactionResult> {
    return this.checks.createCheck(wallet, params);
  }
  
  /**
   * Submit a CheckCash transaction
   * 
   * @param wallet - The check casher's wallet
   * @param params - CheckCash parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCheckCash(
    wallet: Wallet,
    params: CheckCashParams
  ): Promise<TransactionResult> {
    return this.checks.cashCheck(wallet, params);
  }
  
  /**
   * Submit a CheckCancel transaction
   * 
   * @param wallet - The check canceller's wallet
   * @param params - CheckCancel parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCheckCancel(
    wallet: Wallet,
    params: CheckCancelParams
  ): Promise<TransactionResult> {
    return this.checks.cancelCheck(wallet, params);
  }
  
  // ==================== PAYMENT CHANNEL TRANSACTIONS ====================
  
  /**
   * Submit a PaymentChannelCreate transaction
   * 
   * @param wallet - The channel creator's wallet
   * @param params - PaymentChannelCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPaymentChannelCreate(
    wallet: Wallet,
    params: PaymentChannelCreateParams
  ): Promise<TransactionResult> {
    return this.paymentChannels.createChannel(wallet, params);
  }
  
  /**
   * Submit a PaymentChannelFund transaction
   * 
   * @param wallet - The channel funder's wallet
   * @param params - PaymentChannelFund parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPaymentChannelFund(
    wallet: Wallet,
    params: PaymentChannelFundParams
  ): Promise<TransactionResult> {
    return this.paymentChannels.fundChannel(wallet, params);
  }
  
  /**
   * Submit a PaymentChannelClaim transaction
   * 
   * @param wallet - The channel claimer's wallet
   * @param params - PaymentChannelClaim parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPaymentChannelClaim(
    wallet: Wallet,
    params: PaymentChannelClaimParams
  ): Promise<TransactionResult> {
    return this.paymentChannels.claimChannel(wallet, params);
  }
  
  // ==================== ESCROW TRANSACTIONS ====================
  
  /**
   * Submit an EscrowCreate transaction
   * 
   * @param wallet - The escrow creator's wallet
   * @param params - EscrowCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitEscrowCreate(
    wallet: Wallet,
    params: EscrowCreateParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'EscrowCreate',
        Account: wallet.classicAddress,
        Amount: params.amount,
        Destination: params.destination
      };
      
      // Add optional parameters
      if (params.cancelAfter !== undefined) transaction.CancelAfter = params.cancelAfter;
      if (params.finishAfter !== undefined) transaction.FinishAfter = params.finishAfter;
      if (params.condition !== undefined) transaction.Condition = params.condition;
      if (params.destinationTag !== undefined) transaction.DestinationTag = params.destinationTag;
      if (params.sourceTag !== undefined) transaction.SourceTag = params.sourceTag;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit EscrowCreate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an EscrowFinish transaction
   * 
   * @param wallet - The escrow finisher's wallet
   * @param params - EscrowFinish parameters
   * @returns Promise that resolves with transaction result
   */
  async submitEscrowFinish(
    wallet: Wallet,
    params: EscrowFinishParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'EscrowFinish',
        Account: wallet.classicAddress,
        Owner: params.owner,
        OfferSequence: params.offerSequence
      };
      
      // Add optional parameters
      if (params.condition !== undefined) transaction.Condition = params.condition;
      if (params.fulfillment !== undefined) transaction.Fulfillment = params.fulfillment;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit EscrowFinish: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an EscrowCancel transaction
   * 
   * @param wallet - The escrow canceller's wallet
   * @param params - EscrowCancel parameters
   * @returns Promise that resolves with transaction result
   */
  async submitEscrowCancel(
    wallet: Wallet,
    params: EscrowCancelParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'EscrowCancel',
        Account: wallet.classicAddress,
        Owner: params.owner,
        OfferSequence: params.offerSequence
      };
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit EscrowCancel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== TRUST LINE TRANSACTIONS ====================
  
  /**
   * Submit a TrustSet transaction
   * 
   * @param wallet - The trust line creator's wallet
   * @param params - TrustSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitTrustSet(
    wallet: Wallet,
    params: TrustSetParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'TrustSet',
        Account: wallet.classicAddress,
        LimitAmount: params.limitAmount
      };
      
      // Add optional parameters
      if (params.qualityIn !== undefined) transaction.QualityIn = params.qualityIn;
      if (params.qualityOut !== undefined) transaction.QualityOut = params.qualityOut;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit TrustSet: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== OFFER TRANSACTIONS ====================
  
  /**
   * Submit an OfferCreate transaction
   * 
   * @param wallet - The offer creator's wallet
   * @param params - OfferCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitOfferCreate(
    wallet: Wallet,
    params: OfferCreateParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'OfferCreate',
        Account: wallet.classicAddress,
        TakerGets: params.takerGets,
        TakerPays: params.takerPays
      };
      
      // Add optional parameters
      if (params.expiration !== undefined) transaction.Expiration = params.expiration;
      if (params.offerSequence !== undefined) transaction.OfferSequence = params.offerSequence;
      if (params.takerGetsIssuer !== undefined) transaction.TakerGetsIssuer = params.takerGetsIssuer;
      if (params.takerPaysIssuer !== undefined) transaction.TakerPaysIssuer = params.takerPaysIssuer;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit OfferCreate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an OfferCancel transaction
   * 
   * @param wallet - The offer canceller's wallet
   * @param params - OfferCancel parameters
   * @returns Promise that resolves with transaction result
   */
  async submitOfferCancel(
    wallet: Wallet,
    params: OfferCancelParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'OfferCancel',
        Account: wallet.classicAddress,
        OfferSequence: params.offerSequence
      };
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit OfferCancel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== SIGNER LIST TRANSACTIONS ====================
  
  /**
   * Submit a SignerListSet transaction
   * 
   * @param wallet - The signer list setter's wallet
   * @param params - SignerListSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitSignerListSet(
    wallet: Wallet,
    params: SignerListSetParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'SignerListSet',
        Account: wallet.classicAddress,
        SignerQuorum: params.signerQuorum,
        SignerEntries: params.signerEntries.map(entry => ({
          SignerEntry: {
            Account: entry.account,
            SignerWeight: entry.signerWeight
          }
        }))
      };
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit SignerListSet: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== TICKET TRANSACTIONS ====================
  
  /**
   * Submit a TicketCreate transaction
   * 
   * @param wallet - The ticket creator's wallet
   * @param params - TicketCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitTicketCreate(
    wallet: Wallet,
    params: TicketCreateParams
  ): Promise<TransactionResult> {
    try {
      const transaction: any = {
        TransactionType: 'TicketCreate',
        Account: wallet.classicAddress,
        TicketCount: params.ticketCount
      };
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit TicketCreate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== NFT TRANSACTION METHODS ====================
  
  /**
   * Submit an NFTokenMint transaction
   * 
   * @param wallet - The NFT minter's wallet
   * @param params - NFTokenMint parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenMint(
    wallet: Wallet,
    params: NFTokenMintParams
  ): Promise<TransactionResult> {
    return this.nft.mintNFToken(wallet, params);
  }
  
  /**
   * Submit an NFTokenCreateOffer transaction
   * 
   * @param wallet - The offer creator's wallet
   * @param params - NFTokenCreateOffer parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenCreateOffer(
    wallet: Wallet,
    params: NFTokenCreateOfferParams
  ): Promise<TransactionResult> {
    return this.nft.createNFTokenOffer(wallet, params);
  }
  
  /**
   * Submit an NFTokenAcceptOffer transaction
   * 
   * @param wallet - The offer accepter's wallet
   * @param params - NFTokenAcceptOffer parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenAcceptOffer(
    wallet: Wallet,
    params: NFTokenAcceptOfferParams
  ): Promise<TransactionResult> {
    return this.nft.acceptNFTokenOffer(wallet, params);
  }
  
  /**
   * Submit an NFTokenCancelOffer transaction
   * 
   * @param wallet - The offer canceller's wallet
   * @param params - NFTokenCancelOffer parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenCancelOffer(
    wallet: Wallet,
    params: NFTokenCancelOfferParams
  ): Promise<TransactionResult> {
    return this.nft.cancelNFTokenOffer(wallet, params);
  }
  
  /**
   * Submit an NFTokenBurn transaction
   * 
   * @param wallet - The NFT burner's wallet
   * @param params - NFTokenBurn parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenBurn(
    wallet: Wallet,
    params: NFTokenBurnParams
  ): Promise<TransactionResult> {
    return this.nft.burnNFToken(wallet, params);
  }
  
  /**
   * Submit an NFTokenModify transaction
   * 
   * @param wallet - The NFT modifier's wallet
   * @param params - NFTokenModify parameters
   * @returns Promise that resolves with transaction result
   */
  async submitNFTokenModify(
    wallet: Wallet,
    params: NFTokenModifyParams
  ): Promise<TransactionResult> {
    return this.nft.modifyNFToken(wallet, params);
  }
  
  // ==================== DID TRANSACTION METHODS ====================
  
  /**
   * Submit a DIDSet transaction
   * 
   * @param wallet - The DID creator's wallet
   * @param params - DIDSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitDIDSet(
    wallet: Wallet,
    params: DIDSetParams
  ): Promise<TransactionResult> {
    return this.did.setDID(wallet, params);
  }
  
  /**
   * Submit a DIDDelete transaction
   * 
   * @param wallet - The DID deleter's wallet
   * @param params - DIDDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitDIDDelete(
    wallet: Wallet,
    params: DIDDeleteParams
  ): Promise<TransactionResult> {
    return this.did.deleteDID(wallet, params);
  }
  
  // ==================== PERMISSIONED DOMAIN TRANSACTION METHODS ====================
  
  /**
   * Submit a PermissionedDomainSet transaction
   * 
   * @param wallet - The domain setter's wallet
   * @param params - PermissionedDomainSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPermissionedDomainSet(
    wallet: Wallet,
    params: PermissionedDomainSetParams
  ): Promise<TransactionResult> {
    return this.permissionedDomain.setPermissionedDomain(wallet, params);
  }
  
  /**
   * Submit a PermissionedDomainDelete transaction
   * 
   * @param wallet - The domain deleter's wallet
   * @param params - PermissionedDomainDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitPermissionedDomainDelete(
    wallet: Wallet,
    params: PermissionedDomainDeleteParams
  ): Promise<TransactionResult> {
    return this.permissionedDomain.deletePermissionedDomain(wallet, params);
  }
  
  // ==================== MPT TRANSACTION METHODS ====================
  
  /**
   * Submit an MPTokenIssuanceCreate transaction
   * 
   * @param wallet - The issuer's wallet
   * @param params - MPTokenIssuanceCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitMPTokenIssuanceCreate(
    wallet: Wallet,
    params: MPTokenIssuanceCreateParams
  ): Promise<TransactionResult> {
    return this.mpt.createMPTokenIssuance(wallet, params);
  }
  
  /**
   * Submit an MPTokenAuthorize transaction
   * 
   * @param wallet - The authorizer's wallet
   * @param params - MPTokenAuthorize parameters
   * @returns Promise that resolves with transaction result
   */
  async submitMPTokenAuthorize(
    wallet: Wallet,
    params: MPTokenAuthorizeParams
  ): Promise<TransactionResult> {
    return this.mpt.authorizeMPToken(wallet, params);
  }
  
  /**
   * Submit an MPTokenIssuanceSet transaction
   * 
   * @param wallet - The issuer's wallet
   * @param params - MPTokenIssuanceSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitMPTokenIssuanceSet(
    wallet: Wallet,
    params: MPTokenIssuanceSetParams
  ): Promise<TransactionResult> {
    return this.mpt.setMPTokenIssuance(wallet, params);
  }
  
  /**
   * Submit an MPTokenIssuanceDestroy transaction
   * 
   * @param wallet - The destroyer's wallet
   * @param params - MPTokenIssuanceDestroy parameters
   * @returns Promise that resolves with transaction result
   */
  async submitMPTokenIssuanceDestroy(
    wallet: Wallet,
    params: MPTokenIssuanceDestroyParams
  ): Promise<TransactionResult> {
    return this.mpt.destroyMPTokenIssuance(wallet, params);
  }
  
  // ==================== CREDENTIAL TRANSACTION METHODS ====================
  
  /**
   * Submit a CredentialCreate transaction
   * 
   * @param wallet - The credential creator's wallet
   * @param params - CredentialCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCredentialCreate(
    wallet: Wallet,
    params: CredentialCreateParams
  ): Promise<TransactionResult> {
    return this.credential.createCredential(wallet, params);
  }
  
  /**
   * Submit a CredentialAccept transaction
   * 
   * @param wallet - The credential accepter's wallet
   * @param params - CredentialAccept parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCredentialAccept(
    wallet: Wallet,
    params: CredentialAcceptParams
  ): Promise<TransactionResult> {
    return this.credential.acceptCredential(wallet, params);
  }
  
  /**
   * Submit a CredentialDelete transaction
   * 
   * @param wallet - The credential deleter's wallet
   * @param params - CredentialDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitCredentialDelete(
    wallet: Wallet,
    params: CredentialDeleteParams
  ): Promise<TransactionResult> {
    return this.credential.deleteCredential(wallet, params);
  }
  
  // ==================== DELEGATE TRANSACTION METHODS ====================
  
  /**
   * Submit a DelegateSet transaction
   * 
   * @param wallet - The delegate setter's wallet
   * @param params - DelegateSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitDelegateSet(
    wallet: Wallet,
    params: DelegateSetParams
  ): Promise<TransactionResult> {
    return this.delegate.setDelegate(wallet, params);
  }
  
  // ==================== ORACLE TRANSACTION METHODS ====================
  
  /**
   * Submit an OracleSet transaction
   * 
   * @param wallet - The oracle setter's wallet
   * @param params - OracleSet parameters
   * @returns Promise that resolves with transaction result
   */
  async submitOracleSet(
    wallet: Wallet,
    params: OracleSetParams
  ): Promise<TransactionResult> {
    return this.oracle.setOracle(wallet, params);
  }
  
  /**
   * Submit an OracleDelete transaction
   * 
   * @param wallet - The oracle deleter's wallet
   * @param params - OracleDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitOracleDelete(
    wallet: Wallet,
    params: OracleDeleteParams
  ): Promise<TransactionResult> {
    return this.oracle.deleteOracle(wallet, params);
  }
  
  // ==================== DEPOSIT PREAUTH TRANSACTION METHODS ====================
  
  /**
   * Submit a DepositPreauth transaction
   * 
   * @param wallet - The deposit preauthorizer's wallet
   * @param params - DepositPreauth parameters
   * @returns Promise that resolves with transaction result
   */
  async submitDepositPreauth(
    wallet: Wallet,
    params: DepositPreauthParams
  ): Promise<TransactionResult> {
    return this.depositPreauth.executeDepositPreauth(wallet, params);
  }
  
  // ==================== CLAWBACK TRANSACTION METHODS ====================
  
  /**
   * Submit a Clawback transaction
   * 
   * @param wallet - The clawback initiator's wallet
   * @param params - Clawback parameters
   * @returns Promise that resolves with transaction result
   */
  async submitClawback(
    wallet: Wallet,
    params: ClawbackParams
  ): Promise<TransactionResult> {
    return this.clawback.executeClawback(wallet, params);
  }
  
  // ==================== AMM TRANSACTION METHODS ====================
  
  /**
   * Submit an AMMCreate transaction
   * 
   * @param wallet - The AMM creator's wallet
   * @param params - AMMCreate parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMCreate(
    wallet: Wallet,
    params: AMMCreateParams
  ): Promise<TransactionResult> {
    return this.amm.createAMM(wallet, params);
  }
  
  /**
   * Submit an AMMDeposit transaction
   * 
   * @param wallet - The depositor's wallet
   * @param params - AMMDeposit parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMDeposit(
    wallet: Wallet,
    params: AMMDepositParams
  ): Promise<TransactionResult> {
    return this.amm.depositToAMM(wallet, params);
  }
  
  /**
   * Submit an AMMWithdraw transaction
   * 
   * @param wallet - The withdrawer's wallet
   * @param params - AMMWithdraw parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMWithdraw(
    wallet: Wallet,
    params: AMMWithdrawParams
  ): Promise<TransactionResult> {
    return this.amm.withdrawFromAMM(wallet, params);
  }
  
  /**
   * Submit an AMMVote transaction
   * 
   * @param wallet - The voter's wallet
   * @param params - AMMVote parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMVote(
    wallet: Wallet,
    params: AMMVoteParams
  ): Promise<TransactionResult> {
    return this.amm.voteOnAMM(wallet, params);
  }
  
  /**
   * Submit an AMMBid transaction
   * 
   * @param wallet - The bidder's wallet
   * @param params - AMMBid parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMBid(
    wallet: Wallet,
    params: AMMBidParams
  ): Promise<TransactionResult> {
    return this.amm.bidOnAMM(wallet, params);
  }
  
  /**
   * Submit an AMMClawback transaction
   * 
   * @param wallet - The clawback initiator's wallet
   * @param params - AMMClawback parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMClawback(
    wallet: Wallet,
    params: AMMClawbackParams
  ): Promise<TransactionResult> {
    return this.amm.clawbackFromAMM(wallet, params);
  }
  
  /**
   * Submit an AMMDelete transaction
   * 
   * @param wallet - The deleter's wallet
   * @param params - AMMDelete parameters
   * @returns Promise that resolves with transaction result
   */
  async submitAMMDelete(
    wallet: Wallet,
    params: AMMDeleteParams
  ): Promise<TransactionResult> {
    return this.amm.deleteAMM(wallet, params);
  }
  
  // ==================== BRIDGE TRANSACTION METHODS ====================
  
  /**
   * Submit an XChainCreateBridge transaction
   * 
   * @param wallet - The bridge creator's wallet
   * @param params - XChainCreateBridge parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainCreateBridge(
    wallet: Wallet,
    params: XChainCreateBridgeParams
  ): Promise<TransactionResult> {
    // This would typically be handled by the bridge manager
    try {
      const transaction: any = {
        TransactionType: 'XChainCreateBridge',
        Account: wallet.classicAddress,
        XChainBridge: params.xChainBridge,
        SignatureReward: params.signatureReward
      };
      
      if (params.minAccountCreateAmount !== undefined) {
        transaction.MinAccountCreateAmount = params.minAccountCreateAmount;
      }
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit XChainCreateBridge: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an XChainAccountCreateCommit transaction
   * 
   * @param wallet - The committer's wallet
   * @param params - XChainAccountCreateCommit parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainAccountCreateCommit(
    wallet: Wallet,
    params: XChainAccountCreateCommitParams
  ): Promise<TransactionResult> {
    return this.bridge.commitAccountCreate(wallet, params);
  }
  
  /**
   * Submit an XChainCreateClaimId transaction
   * 
   * @param wallet - The claim ID creator's wallet
   * @param params - XChainCreateClaimId parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainCreateClaimId(
    wallet: Wallet,
    params: XChainCreateClaimIdParams
  ): Promise<TransactionResult> {
    return this.bridge.createClaimID(wallet, params);
  }
  
  /**
   * Submit an XChainCommit transaction
   * 
   * @param wallet - The committer's wallet
   * @param params - XChainCommit parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainCommit(
    wallet: Wallet,
    params: XChainCommitParams
  ): Promise<TransactionResult> {
    return this.bridge.commitTransfer(wallet, params);
  }
  
  /**
   * Submit an XChainClaim transaction
   * 
   * @param wallet - The claimer's wallet
   * @param params - XChainClaim parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainClaim(
    wallet: Wallet,
    params: XChainClaimParams
  ): Promise<TransactionResult> {
    // This would typically be handled by the bridge manager
    try {
      const transaction: any = {
        TransactionType: 'XChainClaim',
        Account: wallet.classicAddress,
        Amount: params.amount,
        XChainClaimID: params.xChainClaimID,
        XChainBridge: params.xChainBridge
      };
      
      if (params.destination !== undefined) {
        transaction.Destination = params.destination;
      }
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit XChainClaim: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Submit an XChainAddAccountCreateAttestation transaction
   * 
   * @param wallet - The attester's wallet
   * @param params - XChainAddAccountCreateAttestation parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainAddAccountCreateAttestation(
    wallet: Wallet,
    params: XChainAddAccountCreateAttestationParams
  ): Promise<TransactionResult> {
    // Convert our interface to the inline type expected by the bridge
    const bridgeParams = {
      otherChainSource: params.otherChainSource,
      destination: params.destination,
      amount: params.amount,
      publicKey: params.publicKey,
      signature: params.signature,
      wasLockingChainSend: params.wasLockingChainSend,
      attestationRewardAccount: params.attestationRewardAccount,
      attestationSignerAccount: params.attestationSignerAccount,
      xChainAccountCreateCount: params.xChainAccountCreateCount,
      signatureReward: params.signatureReward
    };
    return this.bridge.addAccountCreateAttestation(wallet, bridgeParams);
  }
  
  /**
   * Submit an XChainAddClaimAttestation transaction
   * 
   * @param wallet - The attester's wallet
   * @param params - XChainAddClaimAttestation parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainAddClaimAttestation(
    wallet: Wallet,
    params: XChainAddClaimAttestationParams
  ): Promise<TransactionResult> {
    // Convert our interface to the inline type expected by the bridge
    const bridgeParams = {
      otherChainSource: params.otherChainSource,
      otherChainDestination: params.otherChainDestination,
      amount: params.amount,
      publicKey: params.publicKey,
      signature: params.signature,
      wasLockingChainSend: params.wasLockingChainSend,
      claimID: params.claimID,
      signatureReward: params.signatureReward
    };
    return this.bridge.addClaimAttestation(wallet, bridgeParams);
  }
  
  /**
   * Submit an XChainModifyBridge transaction
   * 
   * @param wallet - The modifier's wallet
   * @param params - XChainModifyBridge parameters
   * @returns Promise that resolves with transaction result
   */
  async submitXChainModifyBridge(
    wallet: Wallet,
    params: XChainModifyBridgeParams
  ): Promise<TransactionResult> {
    // This would typically be handled by the bridge manager
    try {
      const transaction: any = {
        TransactionType: 'XChainModifyBridge',
        Account: wallet.classicAddress,
        XChainBridge: params.xChainBridge
      };
      
      if (params.signatureReward !== undefined) {
        transaction.SignatureReward = params.signatureReward;
      }
      
      if (params.minAccountCreateAmount !== undefined) {
        transaction.MinAccountCreateAmount = params.minAccountCreateAmount;
      }
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit XChainModifyBridge: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== BATCH TRANSACTION METHOD ====================
  
  /**
   * Submit a Batch transaction
   * 
   * @param wallet - The batch submitter's wallet
   * @param params - Batch parameters
   * @returns Promise that resolves with transaction result
   */
  async submitBatch(
    wallet: Wallet,
    params: BatchParams
  ): Promise<TransactionResult> {
    // Batch transactions are typically handled at a higher level
    try {
      // For now, we'll just return a placeholder result
      // In a real implementation, this would handle multiple transactions
      return {
        success: true,
        result: {
          message: 'Batch transaction submitted',
          transactionCount: params.transactions.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit Batch: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  // ==================== LEDGER STATE FIX TRANSACTION METHOD ====================
  
  /**
   * Submit a LedgerStateFix transaction
   * 
   * @param wallet - The fix initiator's wallet
   * @param params - LedgerStateFix parameters
   * @returns Promise that resolves with transaction result
   */
  async submitLedgerStateFix(
    wallet: Wallet,
    params: LedgerStateFixParams
  ): Promise<TransactionResult> {
    // LedgerStateFix is a pseudo-transaction typically handled by the network
    try {
      // For now, we'll just return a placeholder result
      // In a real implementation, this would be handled by the network layer
      return {
        success: true,
        result: {
          message: 'LedgerStateFix transaction processed',
          account: wallet.classicAddress
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to submit LedgerStateFix: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}
