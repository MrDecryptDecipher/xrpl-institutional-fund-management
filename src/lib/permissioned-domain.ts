/**
 * Permissioned Domain Implementation
 * 
 * This module provides functionality for creating and managing Permissioned Domain transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface PermissionedDomainConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface PermissionedDomainSetParams {
  domain: string;
  flags?: number;
  expireTime?: number;
}

export interface PermissionedDomainDeleteParams {
  domain: string;
}

export interface PermissionedDomainResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * Permissioned Domain Manager
 * 
 * This class provides methods for creating and managing Permissioned Domain transactions.
 */
export class PermissionedDomain {
  private client: Client;
  private config: PermissionedDomainConfig;
  
  constructor(config: PermissionedDomainConfig) {
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
   * Set a Permissioned Domain
   * 
   * @param wallet - The domain setter's wallet
   * @param params - Permissioned domain set parameters
   * @returns Promise that resolves with transaction result
   */
  async setPermissionedDomain(
    wallet: Wallet,
    params: PermissionedDomainSetParams
  ): Promise<PermissionedDomainResult> {
    try {
      const transaction: any = {
        TransactionType: 'PermissionedDomainSet',
        Account: wallet.classicAddress,
        Domain: params.domain
      };
      
      // Add optional parameters
      if (params.flags !== undefined) transaction.Flags = params.flags;
      if (params.expireTime !== undefined) transaction.ExpireTime = params.expireTime;
      
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
        error: `Failed to set permissioned domain: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Delete a Permissioned Domain
   * 
   * @param wallet - The domain deleter's wallet
   * @param params - Permissioned domain delete parameters
   * @returns Promise that resolves with transaction result
   */
  async deletePermissionedDomain(
    wallet: Wallet,
    params: PermissionedDomainDeleteParams
  ): Promise<PermissionedDomainResult> {
    try {
      const transaction: any = {
        TransactionType: 'PermissionedDomainDelete',
        Account: wallet.classicAddress,
        Domain: params.domain
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
        error: `Failed to delete permissioned domain: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}