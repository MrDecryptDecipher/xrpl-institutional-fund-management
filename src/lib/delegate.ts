/**
 * Delegate Implementation
 * 
 * This module provides functionality for creating and managing Delegate transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface DelegateConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface DelegateSetParams {
  authorize: string;
  flags?: number;
}

export interface DelegateResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * Delegate Manager
 * 
 * This class provides methods for creating and managing Delegate transactions.
 */
export class Delegate {
  private client: Client;
  private config: DelegateConfig;
  
  constructor(config: DelegateConfig) {
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
   * Set a Delegate
   * 
   * @param wallet - The delegate setter's wallet
   * @param params - Delegate set parameters
   * @returns Promise that resolves with transaction result
   */
  async setDelegate(
    wallet: Wallet,
    params: DelegateSetParams
  ): Promise<DelegateResult> {
    try {
      const transaction: any = {
        TransactionType: 'DelegateSet',
        Account: wallet.classicAddress,
        Authorize: params.authorize
      };
      
      // Add optional parameters
      if (params.flags !== undefined) transaction.Flags = params.flags;
      
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
        error: `Failed to set delegate: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}