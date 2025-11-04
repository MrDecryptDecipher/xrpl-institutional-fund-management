/**
 * MPT (MPToken) Implementation
 * 
 * This module provides functionality for creating and managing MPToken transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface MPTConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

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

export interface MPTResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * MPT Manager
 * 
 * This class provides methods for creating and managing MPToken transactions.
 */
export class MPT {
  private client: Client;
  private config: MPTConfig;
  
  constructor(config: MPTConfig) {
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
   * Create an MPToken issuance
   * 
   * @param wallet - The issuer's wallet
   * @param params - MPToken issuance creation parameters
   * @returns Promise that resolves with transaction result
   */
  async createMPTokenIssuance(
    wallet: Wallet,
    params: MPTokenIssuanceCreateParams
  ): Promise<MPTResult> {
    try {
      const transaction: any = {
        TransactionType: 'MPTokenIssuanceCreate',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.maximumAmount !== undefined) transaction.MaximumAmount = params.maximumAmount;
      if (params.minimumTransferAmount !== undefined) transaction.MinimumTransferAmount = params.minimumTransferAmount;
      if (params.mptokenMetadata !== undefined) transaction.MPTokenMetadata = params.mptokenMetadata;
      if (params.transferFee !== undefined) transaction.TransferFee = params.transferFee;
      if (params.flags !== undefined) transaction.Flags = params.flags;
      if (params.assetScale !== undefined) transaction.AssetScale = params.assetScale;
      
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
        error: `Failed to create MPToken issuance: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Authorize an MPToken
   * 
   * @param wallet - The authorizer's wallet
   * @param params - MPToken authorization parameters
   * @returns Promise that resolves with transaction result
   */
  async authorizeMPToken(
    wallet: Wallet,
    params: MPTokenAuthorizeParams
  ): Promise<MPTResult> {
    try {
      const transaction: any = {
        TransactionType: 'MPTokenAuthorize',
        Account: wallet.classicAddress,
        MPTokenAuthAccount: params.account
      };
      
      // Add optional parameters
      if (params.authorize !== undefined) transaction.Authorize = params.authorize;
      if (params.holdAmount !== undefined) transaction.HoldAmount = params.holdAmount;
      
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
        error: `Failed to authorize MPToken: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Set MPToken issuance parameters
   * 
   * @param wallet - The issuer's wallet
   * @param params - MPToken issuance set parameters
   * @returns Promise that resolves with transaction result
   */
  async setMPTokenIssuance(
    wallet: Wallet,
    params: MPTokenIssuanceSetParams
  ): Promise<MPTResult> {
    try {
      const transaction: any = {
        TransactionType: 'MPTokenIssuanceSet',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.flags !== undefined) transaction.Flags = params.flags;
      if (params.transferFee !== undefined) transaction.TransferFee = params.transferFee;
      if (params.minimumTransferAmount !== undefined) transaction.MinimumTransferAmount = params.minimumTransferAmount;
      if (params.mptokenMetadata !== undefined) transaction.MPTokenMetadata = params.mptokenMetadata;
      
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
        error: `Failed to set MPToken issuance: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Destroy an MPToken issuance
   * 
   * @param wallet - The destroyer's wallet
   * @param params - MPToken issuance destroy parameters
   * @returns Promise that resolves with transaction result
   */
  async destroyMPTokenIssuance(
    wallet: Wallet,
    params: MPTokenIssuanceDestroyParams
  ): Promise<MPTResult> {
    try {
      const transaction: any = {
        TransactionType: 'MPTokenIssuanceDestroy',
        Account: wallet.classicAddress
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
        error: `Failed to destroy MPToken issuance: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}