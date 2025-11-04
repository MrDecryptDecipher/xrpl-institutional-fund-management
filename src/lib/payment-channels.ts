/**
 * Payment Channels Implementation
 * 
 * This module provides functionality for creating and managing payment channels
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface PaymentChannelConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface PaymentChannelCreateParams {
  amount: string; // Amount in drops
  destination: string; // Destination address
  settleDelay: number; // Settle delay in seconds
  publicKey: string; // Public key in hex format
  cancelAfter?: number; // Cancel after ledger index (optional)
  destinationTag?: number; // Destination tag (optional)
  sourceTag?: number; // Source tag (optional)
}

export interface PaymentChannelFundParams {
  channel: string; // Channel ID
  amount: string; // Amount in drops
  expiration?: number; // Expiration ledger index (optional)
}

export interface PaymentChannelClaimParams {
  channel: string; // Channel ID
  amount: string; // Amount in drops
  signature?: string; // Signature (optional)
  publicKey?: string; // Public key (optional)
}

export interface PaymentChannelResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
  channelId?: string;
}

/**
 * Payment Channels Manager
 * 
 * This class provides methods for creating and managing payment channels.
 */
export class PaymentChannels {
  private client: Client;
  private config: PaymentChannelConfig;
  
  constructor(config: PaymentChannelConfig) {
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
  
  /**
   * Create a payment channel
   * 
   * @param senderWallet - The sender's wallet
   * @param params - Payment channel creation parameters
   * @returns Promise that resolves with transaction result
   */
  async createChannel(
    senderWallet: Wallet,
    params: PaymentChannelCreateParams
  ): Promise<PaymentChannelResult> {
    try {
      // Prepare the payment channel create transaction
      const channelCreate: any = {
        TransactionType: 'PaymentChannelCreate',
        Account: senderWallet.classicAddress,
        Amount: params.amount,
        Destination: params.destination,
        SettleDelay: params.settleDelay,
        PublicKey: params.publicKey
      };
      
      // Add optional parameters
      if (params.cancelAfter !== undefined) {
        channelCreate.CancelAfter = params.cancelAfter;
      }
      
      if (params.destinationTag !== undefined) {
        channelCreate.DestinationTag = params.destinationTag;
      }
      
      if (params.sourceTag !== undefined) {
        channelCreate.SourceTag = params.sourceTag;
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(channelCreate, {
        wallet: senderWallet
      });
      
      // Extract channel ID from metadata if successful
      let channelId: string | undefined;
      if (result.result.meta?.AffectedNodes) {
        for (const node of result.result.meta.AffectedNodes) {
          if (node.CreatedNode?.LedgerEntryType === 'PayChannel') {
            channelId = node.CreatedNode.LedgerIndex;
            break;
          }
        }
      }
      
      return {
        success: result.result.meta?.TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result,
        channelId: channelId
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create payment channel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Fund an existing payment channel
   * 
   * @param senderWallet - The sender's wallet
   * @param params - Payment channel funding parameters
   * @returns Promise that resolves with transaction result
   */
  async fundChannel(
    senderWallet: Wallet,
    params: PaymentChannelFundParams
  ): Promise<PaymentChannelResult> {
    try {
      // Prepare the payment channel fund transaction
      const channelFund: any = {
        TransactionType: 'PaymentChannelFund',
        Account: senderWallet.classicAddress,
        Channel: params.channel,
        Amount: params.amount
      };
      
      // Add optional parameters
      if (params.expiration !== undefined) {
        channelFund.Expiration = params.expiration;
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(channelFund, {
        wallet: senderWallet
      });
      
      return {
        success: result.result.meta?.TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fund payment channel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Claim funds from a payment channel
   * 
   * @param senderWallet - The sender's wallet
   * @param params - Payment channel claim parameters
   * @returns Promise that resolves with transaction result
   */
  async claimChannel(
    senderWallet: Wallet,
    params: PaymentChannelClaimParams
  ): Promise<PaymentChannelResult> {
    try {
      // Prepare the payment channel claim transaction
      const channelClaim: any = {
        TransactionType: 'PaymentChannelClaim',
        Account: senderWallet.classicAddress,
        Channel: params.channel,
        Balance: params.amount
      };
      
      // Add optional parameters
      if (params.signature !== undefined) {
        channelClaim.Signature = params.signature;
      }
      
      if (params.publicKey !== undefined) {
        channelClaim.PublicKey = params.publicKey;
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(channelClaim, {
        wallet: senderWallet
      });
      
      return {
        success: result.result.meta?.TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to claim payment channel: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get payment channel information
   * 
   * @param channelId - The channel ID
   * @returns Promise that resolves with channel information
   */
  async getChannelInfo(channelId: string): Promise<any> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Request channel information
      const channelInfo = await this.client.request({
        command: 'ledger_entry',
        index: channelId,
        ledger_index: 'validated'
      });
      
      return channelInfo.result;
    } catch (error) {
      throw new Error(`Failed to get payment channel info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Check if connected to XRPL server
   * 
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.client.isConnected();
  }
}

/**
 * Create a new Payment Channels instance
 * 
 * @param config - Configuration for the payment channels
 * @returns A new Payment Channels instance
 */
export function createPaymentChannels(config: PaymentChannelConfig): PaymentChannels {
  return new PaymentChannels(config);
}

/**
 * Generate sample payment channel configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): PaymentChannelConfig {
  return {
    server: 'wss://s.altnet.rippletest.net:51233',
    network: 'Testnet'
  };
}