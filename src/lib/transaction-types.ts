import { Client, Wallet } from 'xrpl';

/**
 * Comprehensive Transaction Types Implementation
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
  amount?: string;
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
  xChainClaimId: string;
}

export interface XChainClaimParams {
  xChainBridge: any;
  amount: string;
  xChainClaimId: string;
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
  xChainClaimId: string;
  signatureReward: string;
}

export interface XChainModifyBridgeParams {
  xChainBridge: any;
  signatureReward?: string;
  minAccountCreateAmount?: string;
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
  
  constructor(config: TransactionManagerConfig) {
    this.config = config;
    this.client = new Client(config.server);
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
    try {
      const transaction: any = {
        TransactionType: 'CheckCreate',
        Account: wallet.classicAddress,
        Destination: params.destination,
        SendMax: params.sendMax
      };
      
      // Add optional parameters
      if (params.destinationTag !== undefined) transaction.DestinationTag = params.destinationTag;
      if (params.expiration !== undefined) transaction.Expiration = params.expiration;
      if (params.invoiceId !== undefined) transaction.InvoiceID = params.invoiceId;
      
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
        error: `Failed to submit CheckCreate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
    try {
      const transaction: any = {
        TransactionType: 'CheckCash',
        Account: wallet.classicAddress,
        CheckID: params.checkId
      };
      
      // Add optional parameters
      if (params.amount !== undefined) transaction.Amount = params.amount;
      if (params.deliverMin !== undefined) transaction.DeliverMin = params.deliverMin;
      
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
        error: `Failed to submit CheckCash: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
    try {
      const transaction: any = {
        TransactionType: 'CheckCancel',
        Account: wallet.classicAddress,
        CheckID: params.checkId
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
        error: `Failed to submit CheckCancel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
    try {
      const transaction: any = {
        TransactionType: 'PaymentChannelCreate',
        Account: wallet.classicAddress,
        Amount: params.amount,
        Destination: params.destination,
        SettleDelay: params.settleDelay,
        PublicKey: params.publicKey
      };
      
      // Add optional parameters
      if (params.cancelAfter !== undefined) transaction.CancelAfter = params.cancelAfter;
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
        error: `Failed to submit PaymentChannelCreate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
    try {
      const transaction: any = {
        TransactionType: 'PaymentChannelFund',
        Account: wallet.classicAddress,
        Channel: params.channel,
        Amount: params.amount
      };
      
      // Add optional parameters
      if (params.expiration !== undefined) transaction.Expiration = params.expiration;
      
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
        error: `Failed to submit PaymentChannelFund: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
    try {
      const transaction: any = {
        TransactionType: 'PaymentChannelClaim',
        Account: wallet.classicAddress,
        Channel: params.channel
      };
      
      // Add optional parameters
      if (params.balance !== undefined) transaction.Balance = params.balance;
      if (params.amount !== undefined) transaction.Amount = params.amount;
      if (params.signature !== undefined) transaction.Signature = params.signature;
      if (params.publicKey !== undefined) transaction.PublicKey = params.publicKey;
      
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
        error: `Failed to submit PaymentChannelClaim: ${error instanceof Error ? error.message : String(error)}`
      };
    }
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
   * @param wallet - The account owner's wallet
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
        Account