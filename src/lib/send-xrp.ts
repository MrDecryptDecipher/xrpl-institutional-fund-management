import { Client, Wallet } from 'xrpl';

/**
 * Send XRP Implementation
 * 
 * This module provides functionality for creating accounts and sending XRP
 * as specified in the XRPL JavaScript tutorials.
 */

export interface SendXRPConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface AccountInfo {
  address: string;
  seed: string;
  name?: string;
}

export interface SendXRPResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
  balanceChanges?: {
    [address: string]: string;
  };
}

/**
 * Send XRP Manager
 * 
 * This class provides methods for creating accounts and sending XRP as specified
 * in the XRPL JavaScript tutorials.
 */
export class SendXRP {
  private client: Client;
  private config: SendXRPConfig;
  
  constructor(config: SendXRPConfig) {
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
   * Get account from seed
   * 
   * @param seed - The seed to derive the account from
   * @returns The account information
   */
  getAccountFromSeed(seed: string): AccountInfo {
    try {
      const wallet = Wallet.fromSeed(seed);
      return {
        address: wallet.classicAddress,
        seed: seed
      };
    } catch (error) {
      throw new Error(`Failed to get account from seed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Create a new account using the faucet
   * 
   * @returns Promise that resolves with account information
   */
  async createAccount(): Promise<AccountInfo> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Request a new wallet funded with play-money XRP for experimentation
      const fundedWallet = await this.client.fundWallet();
      
      return {
        address: fundedWallet.wallet.classicAddress,
        seed: fundedWallet.wallet.seed || ''
      };
    } catch (error) {
      throw new Error(`Failed to create account: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Send XRP from one account to another
   * 
   * @param senderSeed - The seed of the sender's account
   * @param destinationAddress - The destination account address
   * @param amount - The amount of XRP to send (in XRP, not drops)
   * @returns Promise that resolves with transaction result
   */
  async sendXRP(
    senderSeed: string,
    destinationAddress: string,
    amount: number
  ): Promise<SendXRPResult> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Create wallet from seed
      const senderWallet = Wallet.fromSeed(senderSeed);
      
      // Convert amount from XRP to drops (1 XRP = 1,000,000 drops)
      const amountInDrops = Math.floor(amount * 1000000).toString();
      
      // Prepare the payment transaction
      const payment: any = {
        TransactionType: 'Payment',
        Account: senderWallet.classicAddress,
        Destination: destinationAddress,
        Amount: amountInDrops
      };
      
      // Submit the transaction and wait for validation
      const result = await this.client.submitAndWait(payment, {
        wallet: senderWallet
      });
      
      // Check if transaction was successful
      const isSuccess = (result.result as any).meta?.TransactionResult === 'tesSUCCESS';
      
      return {
        success: isSuccess,
        transactionHash: result.result.hash,
        result: result.result,
        balanceChanges: isSuccess ? this.extractBalanceChanges((result.result as any).meta) : undefined
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to send XRP: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get XRP balance for an account
   * 
   * @param address - The account address
   * @returns Promise that resolves with account balance in XRP
   */
  async getXRPBalance(address: string): Promise<number> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Get account balance
      const balance = await this.client.getXrpBalance(address);
      
      return balance;
    } catch (error) {
      throw new Error(`Failed to get XRP balance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get token balances for an account
   * 
   * @param address - The account address
   * @returns Promise that resolves with token balances
   */
  async getTokenBalances(address: string): Promise<any> {
    try {
      // Connect to client if not already connected
      if (!this.client.isConnected()) {
        await this.connect();
      }
      
      // Request gateway balances
      const balances = await this.client.request({
        command: 'gateway_balances',
        account: address,
        ledger_index: 'validated'
      });
      
      return balances.result;
    } catch (error) {
      throw new Error(`Failed to get token balances: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Extract balance changes from transaction metadata
   * 
   * @param meta - Transaction metadata
   * @returns Balance changes object
   */
  private extractBalanceChanges(meta: any): { [address: string]: string } | undefined {
    if (!meta || !meta.AffectedNodes) {
      return undefined;
    }
    
    const balanceChanges: { [address: string]: string } = {};
    
    // Look for account root modifications
    for (const node of meta.AffectedNodes) {
      if (node.ModifiedNode && node.ModifiedNode.LedgerEntryType === 'AccountRoot') {
        const address = node.ModifiedNode.FinalFields?.Account;
        const finalBalance = node.ModifiedNode.FinalFields?.Balance;
        const previousBalance = node.ModifiedNode.PreviousFields?.Balance;
        
        if (address && finalBalance !== undefined && previousBalance !== undefined) {
          const change = (BigInt(finalBalance) - BigInt(previousBalance)).toString();
          balanceChanges[address] = change;
        }
      }
    }
    
    return Object.keys(balanceChanges).length > 0 ? balanceChanges : undefined;
  }
}

/**
 * Create a new Send XRP instance
 * 
 * @param config - Configuration for the send XRP functionality
 * @returns A new Send XRP instance
 */
export function createSendXRP(config: SendXRPConfig): SendXRP {
  return new SendXRP(config);
}

/**
 * Generate sample send XRP configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): SendXRPConfig {
  return {
    server: 'wss://s.altnet.rippletest.net:51233',
    network: 'Testnet'
  };
}
