/**
 * DepositPreauth Implementation
 * 
 * This module provides functionality for creating and managing DepositPreauth transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface DepositPreauthConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface DepositPreauthParams {
  authorize?: string;
  unauthorize?: string;
}

export interface DepositPreauthResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * DepositPreauth Manager
 * 
 * This class provides methods for creating and managing DepositPreauth transactions.
 */
export class DepositPreauthManager {
  private client: Client;
  private config: DepositPreauthConfig;
  
  constructor(config: DepositPreauthConfig) {
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
   * Execute a DepositPreauth
   * 
   * @param wallet - The deposit preauthorizer's wallet
   * @param params - DepositPreauth parameters
   * @returns Promise that resolves with transaction result
   */
  async executeDepositPreauth(
    wallet: Wallet,
    params: DepositPreauthParams
  ): Promise<DepositPreauthResult> {
    try {
      const transaction: any = {
        TransactionType: 'DepositPreauth',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.authorize !== undefined) transaction.Authorize = params.authorize;
      if (params.unauthorize !== undefined) transaction.Unauthorize = params.unauthorize;
      
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
        error: `Failed to execute deposit preauth: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}