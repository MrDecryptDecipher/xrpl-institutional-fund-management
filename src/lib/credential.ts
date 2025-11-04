/**
 * Credential Implementation
 * 
 * This module provides functionality for creating and managing Credential transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface CredentialConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

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

export interface CredentialResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * Credential Manager
 * 
 * This class provides methods for creating and managing Credential transactions.
 */
export class Credential {
  private client: Client;
  private config: CredentialConfig;
  
  constructor(config: CredentialConfig) {
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
   * Create a Credential
   * 
   * @param wallet - The credential creator's wallet
   * @param params - Credential creation parameters
   * @returns Promise that resolves with transaction result
   */
  async createCredential(
    wallet: Wallet,
    params: CredentialCreateParams
  ): Promise<CredentialResult> {
    try {
      const transaction: any = {
        TransactionType: 'CredentialCreate',
        Account: wallet.classicAddress,
        Subject: params.subject,
        CredentialType: params.credentialType
      };
      
      // Add optional parameters
      if (params.issuer !== undefined) transaction.Issuer = params.issuer;
      if (params.expireTime !== undefined) transaction.ExpireTime = params.expireTime;
      if (params.metadata !== undefined) transaction.Metadata = params.metadata;
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
        error: `Failed to create credential: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Accept a Credential
   * 
   * @param wallet - The credential accepter's wallet
   * @param params - Credential acceptance parameters
   * @returns Promise that resolves with transaction result
   */
  async acceptCredential(
    wallet: Wallet,
    params: CredentialAcceptParams
  ): Promise<CredentialResult> {
    try {
      const transaction: any = {
        TransactionType: 'CredentialAccept',
        Account: wallet.classicAddress,
        CredentialID: params.credentialId,
        CredentialType: params.credentialType
      };
      
      // Add optional parameters
      if (params.issuer !== undefined) transaction.Issuer = params.issuer;
      if (params.subject !== undefined) transaction.Subject = params.subject;
      
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
        error: `Failed to accept credential: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Delete a Credential
   * 
   * @param wallet - The credential deleter's wallet
   * @param params - Credential deletion parameters
   * @returns Promise that resolves with transaction result
   */
  async deleteCredential(
    wallet: Wallet,
    params: CredentialDeleteParams
  ): Promise<CredentialResult> {
    try {
      const transaction: any = {
        TransactionType: 'CredentialDelete',
        Account: wallet.classicAddress,
        CredentialID: params.credentialId
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
        error: `Failed to delete credential: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}