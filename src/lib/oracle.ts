/**
 * Oracle Implementation
 * 
 * This module provides functionality for creating and managing Oracle transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface OracleConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

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

export interface OracleResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * Oracle Manager
 * 
 * This class provides methods for creating and managing Oracle transactions.
 */
export class Oracle {
  private client: Client;
  private config: OracleConfig;
  
  constructor(config: OracleConfig) {
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
   * Set an Oracle
   * 
   * @param wallet - The oracle setter's wallet
   * @param params - Oracle set parameters
   * @returns Promise that resolves with transaction result
   */
  async setOracle(
    wallet: Wallet,
    params: OracleSetParams
  ): Promise<OracleResult> {
    try {
      const transaction: any = {
        TransactionType: 'OracleSet',
        Account: wallet.classicAddress,
        AssetClass: params.assetClass,
        Provider: params.provider,
        LastUpdateTime: params.lastUpdateTime,
        PriceDataSeries: params.priceDataSeries
      };
      
      // Add optional parameters
      if (params.uri !== undefined) transaction.URI = params.uri;
      
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
        error: `Failed to set oracle: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Delete an Oracle
   * 
   * @param wallet - The oracle deleter's wallet
   * @param params - Oracle delete parameters
   * @returns Promise that resolves with transaction result
   */
  async deleteOracle(
    wallet: Wallet,
    params: OracleDeleteParams
  ): Promise<OracleResult> {
    try {
      const transaction: any = {
        TransactionType: 'OracleDelete',
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
        error: `Failed to delete oracle: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}