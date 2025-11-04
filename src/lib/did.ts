/**
 * DID (Decentralized Identity) Implementation
 * 
 * This module provides functionality for creating and managing DID transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface DIDConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface DIDSetParams {
  didDocument?: string;
  uri?: string;
  data?: string;
}

export interface DIDDeleteParams {
  // No specific parameters needed
}

export interface DIDResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * DID Manager
 * 
 * This class provides methods for creating and managing DID transactions.
 */
export class DID {
  private client: Client;
  private config: DIDConfig;
  
  constructor(config: DIDConfig) {
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
   * Set a DID
   * 
   * @param wallet - The DID creator's wallet
   * @param params - DID set parameters
   * @returns Promise that resolves with transaction result
   */
  async setDID(
    wallet: Wallet,
    params: DIDSetParams
  ): Promise<DIDResult> {
    try {
      const transaction: any = {
        TransactionType: 'DIDSet',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.didDocument !== undefined) transaction.DIDDocument = params.didDocument;
      if (params.uri !== undefined) transaction.URI = params.uri;
      if (params.data !== undefined) transaction.Data = params.data;
      
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
        error: `Failed to set DID: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Delete a DID
   * 
   * @param wallet - The DID deleter's wallet
   * @param params - DID delete parameters
   * @returns Promise that resolves with transaction result
   */
  async deleteDID(
    wallet: Wallet,
    params: DIDDeleteParams
  ): Promise<DIDResult> {
    try {
      const transaction: any = {
        TransactionType: 'DIDDelete',
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
        error: `Failed to delete DID: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}