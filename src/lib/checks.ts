/**
 * Checks Implementation
 * 
 * This module provides functionality for creating and managing checks
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface ChecksConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface CheckCreateParams {
  destination: string; // Destination address
  sendMax: string | { currency: string; value: string; issuer: string }; // Maximum amount to send
  destinationTag?: number; // Destination tag (optional)
  expiration?: number; // Expiration ledger index (optional)
  invoiceId?: string; // Invoice ID (optional)
}

export interface CheckCashParams {
  checkId: string; // Check ID
  amount?: string | { currency: string; value: string; issuer: string }; // Amount to cash (optional)
  deliverMin?: string | { currency: string; value: string; issuer: string }; // Minimum delivery amount (optional)
}

export interface CheckCancelParams {
  checkId: string; // Check ID
}

export interface CheckResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
  checkId?: string;
}

/**
 * Checks Manager
 * 
 * This class provides methods for creating and managing checks.
 */
export class Checks {
  private client: Client;
  private config: ChecksConfig;
  
  constructor(config: ChecksConfig) {
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
   * Create a check
   * 
   * @param senderWallet - The sender's wallet
   * @param params - Check creation parameters
   * @returns Promise that resolves with transaction result
   */
  async createCheck(
    senderWallet: Wallet,
    params: CheckCreateParams
  ): Promise<CheckResult> {
    try {
      // Prepare the check create transaction
      const checkCreate: any = {
        TransactionType: 'CheckCreate',
        Account: senderWallet.classicAddress,
        Destination: params.destination,
        SendMax: params.sendMax
      };
      
      // Add optional parameters
      if (params.destinationTag !== undefined) {
        checkCreate.DestinationTag = params.destinationTag;
      }
      
      if (params.expiration !== undefined) {
        checkCreate.Expiration = params.expiration;
      }
      
      if (params.invoiceId !== undefined) {
        checkCreate.InvoiceID = params.invoiceId;
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(checkCreate, {
        wallet: senderWallet
      });
      
      // Extract check ID from metadata if successful
      let checkId: string | undefined;
      if (result.result.meta?.AffectedNodes) {
        for (const node of result.result.meta.AffectedNodes) {
          if (node.CreatedNode?.LedgerEntryType === 'Check') {
            checkId = node.CreatedNode.LedgerIndex;
            break;
          }
        }
      }
      
      return {
        success: result.result.meta?.TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result,
        checkId: checkId
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create check: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Cash a check
   * 
   * @param recipientWallet - The recipient's wallet
   * @param params - Check cash parameters
   * @returns Promise that resolves with transaction result
   */
  async cashCheck(
    recipientWallet: Wallet,
    params: CheckCashParams
  ): Promise<CheckResult> {
    try {
      // Prepare the check cash transaction
      const checkCash: any = {
        TransactionType: 'CheckCash',
        Account: recipientWallet.classicAddress,
        CheckID: params.checkId
      };
      
      // Add optional parameters
      if (params.amount !== undefined) {
        checkCash.Amount = params.amount;
      }
      
      if (params.deliverMin !== undefined) {
        checkCash.DeliverMin = params.deliverMin;
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(checkCash, {
        wallet: recipientWallet
      });
      
      return {
        success: result.result.meta?.TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to cash check: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Cancel a check
   * 
   * @param senderWallet - The sender's wallet
   * @param params - Check cancel parameters
   * @returns Promise that resolves with transaction result
   */
  async cancelCheck(
    senderWallet: Wallet,
    params: CheckCancelParams
  ): Promise<CheckResult> {
    try {
      // Prepare the check cancel transaction
      const checkCancel: any = {
        TransactionType: 'CheckCancel',
        Account: senderWallet.classicAddress,
        CheckID: params.checkId
      };
      
      // Submit the transaction
      const result = await this.client.submitAndWait(checkCancel, {
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
        error: `Failed to cancel check: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get check information
   * 
   * @param checkId - The check ID
   * @returns Promise that resolves with check information
   */
  async getCheckInfo(checkId: string): Promise<any> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Request check information
      const checkInfo = await this.client.request({
        command: 'ledger_entry',
        index: checkId,
        ledger_index: 'validated'
      });
      
      return checkInfo.result;
    } catch (error) {
      throw new Error(`Failed to get check info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get account checks
   * 
   * @param address - The account address
   * @param ledgerIndex - The ledger index (optional)
   * @returns Promise that resolves with account checks
   */
  async getAccountChecks(address: string, ledgerIndex?: number | string): Promise<any> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Request account checks
      const request: any = {
        command: 'account_objects',
        account: address,
        type: 'check',
        ledger_index: ledgerIndex || 'validated'
      };
      
      const checks = await this.client.request(request);
      
      return checks.result;
    } catch (error) {
      throw new Error(`Failed to get account checks: ${error instanceof Error ? error.message : String(error)}`);
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
 * Create a new Checks instance
 * 
 * @param config - Configuration for the checks
 * @returns A new Checks instance
 */
export function createChecks(config: ChecksConfig): Checks {
  return new Checks(config);
}

/**
 * Generate sample checks configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): ChecksConfig {
  return {
    server: 'wss://s.altnet.rippletest.net:51233',
    network: 'Testnet'
  };
}