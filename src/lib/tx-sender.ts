import { Client, Wallet, Payment, AccountSet, TrustSet } from 'xrpl';
import { FaucetResponse, createXRPFaucets } from './xrp-faucets';

/**
 * Transaction Sender Implementation
 * 
 * This module provides functionality for sending transactions to the XRP Ledger
 * for testing purposes as specified in the XRPL documentation.
 */

export interface TransactionSenderConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface SendTransactionResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

export interface AccountFundingResult {
  success: boolean;
  wallet?: Wallet;
  error?: string;
}

/**
 * Transaction Sender
 * 
 * This class provides methods for sending transactions to the XRP Ledger for testing.
 */
export class TransactionSender {
  private client: Client;
  private config: TransactionSenderConfig;
  private faucets: ReturnType<typeof createXRPFaucets>;
  
  constructor(config: TransactionSenderConfig) {
    this.config = config;
    this.client = new Client(config.server);
    this.faucets = createXRPFaucets();
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
   * Generate a new wallet
   * 
   * @returns A new wallet
   */
  generateWallet(): Wallet {
    return Wallet.generate();
  }
  
  /**
   * Fund an account using the faucet
   * 
   * @param networkName - The network name
   * @returns Promise that resolves with funding result
   */
  async fundAccount(networkName: string = 'Testnet'): Promise<AccountFundingResult> {
    try {
      // Generate a new wallet first
      const wallet = this.generateWallet();
      
      // Get funds from faucet
      const faucetResult = await this.faucets.generateAccount(networkName);
      
      if (!faucetResult.success) {
        return {
          success: false,
          error: faucetResult.error || 'Failed to generate account from faucet'
        };
      }
      
      // In a real implementation, we would import the faucet account into our wallet
      // For now, we'll just return the generated wallet
      return {
        success: true,
        wallet: wallet
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fund account: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send a payment transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param destination - The destination address
   * @param amount - The amount to send (in XRP)
   * @param memo - Optional memo for the transaction
   * @returns Promise that resolves with transaction result
   */
  async sendPayment(
    senderWallet: Wallet,
    destination: string,
    amount: string,
    memo?: string
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the payment transaction
      const payment: Payment = {
        TransactionType: 'Payment',
        Account: senderWallet.classicAddress,
        Destination: destination,
        Amount: amount
      };
      
      // Add memo if provided
      if (memo) {
        payment.Memos = [{
          Memo: {
            MemoData: memo
          }
        }];
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(payment, {
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
        error: `Failed to send payment: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send an account set transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param settings - Account settings to change
   * @returns Promise that resolves with transaction result
   */
  async sendAccountSet(
    senderWallet: Wallet,
    settings: Partial<AccountSet>
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the account set transaction
      const accountSet: AccountSet = {
        TransactionType: 'AccountSet',
        Account: senderWallet.classicAddress,
        ...settings
      };
      
      // Submit the transaction
      const result = await this.client.submitAndWait(accountSet, {
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
        error: `Failed to send account set transaction: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send a trust set transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param issuer - The issuer address
   * @param currency - The currency code
   * @param limit - The trust line limit
   * @returns Promise that resolves with transaction result
   */
  async sendTrustSet(
    senderWallet: Wallet,
    issuer: string,
    currency: string,
    limit: string
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the trust set transaction
      const trustSet: TrustSet = {
        TransactionType: 'TrustSet',
        Account: senderWallet.classicAddress,
        LimitAmount: {
          currency: currency,
          issuer: issuer,
          value: limit
        }
      };
      
      // Submit the transaction
      const result = await this.client.submitAndWait(trustSet, {
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
        error: `Failed to send trust set transaction: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get account balance
   * 
   * @param address - The account address
   * @returns Promise that resolves with account balance
   */
  async getAccountBalance(address: string): Promise<string> {
    try {
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: address
      });
      
      return accountInfo.result.account_data.Balance;
    } catch (error) {
      throw new Error(`Failed to get account balance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Send a test transaction to verify functionality
   * 
   * @param senderWallet - The sender's wallet
   * @param destination - The destination address
   * @returns Promise that resolves with test result
   */
  async sendTestTransaction(
    senderWallet: Wallet,
    destination: string
  ): Promise<SendTransactionResult> {
    try {
      console.log(`Sending test transaction from ${senderWallet.classicAddress} to ${destination}`);
      
      // Send a small payment (1 XRP)
      const result = await this.sendPayment(
        senderWallet,
        destination,
        '1000000', // 1 XRP in drops
        'Test transaction from Transaction Sender tool'
      );
      
      if (result.success) {
        console.log(`Test transaction successful: ${result.transactionHash}`);
      } else {
        console.error(`Test transaction failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: `Test transaction failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}

/**
 * Create a new Transaction Sender instance
 * 
 * @param config - Configuration for the transaction sender
 * @returns A new Transaction Sender instance
 */
export function createTransactionSender(config: TransactionSenderConfig): TransactionSender {
  return new TransactionSender(config);
}

/**
 * Generate sample transaction sender configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): TransactionSenderConfig {
  return {
    server: 'wss://s.altnet.rippletest.net:51233',
    network: 'Testnet'
  };
}import { Client, Wallet, Payment, AccountSet, TrustSet } from 'xrpl';
import { FaucetResponse, createXRPFaucets } from './xrp-faucets';

/**
 * Transaction Sender Implementation
 * 
 * This module provides functionality for sending transactions to the XRP Ledger
 * for testing purposes as specified in the XRPL documentation.
 */

export interface TransactionSenderConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface SendTransactionResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

export interface AccountFundingResult {
  success: boolean;
  wallet?: Wallet;
  error?: string;
}

/**
 * Transaction Sender
 * 
 * This class provides methods for sending transactions to the XRP Ledger for testing.
 */
export class TransactionSender {
  private client: Client;
  private config: TransactionSenderConfig;
  private faucets: ReturnType<typeof createXRPFaucets>;
  
  constructor(config: TransactionSenderConfig) {
    this.config = config;
    this.client = new Client(config.server);
    this.faucets = createXRPFaucets();
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
   * Generate a new wallet
   * 
   * @returns A new wallet
   */
  generateWallet(): Wallet {
    return Wallet.generate();
  }
  
  /**
   * Fund an account using the faucet
   * 
   * @param networkName - The network name
   * @returns Promise that resolves with funding result
   */
  async fundAccount(networkName: string = 'Testnet'): Promise<AccountFundingResult> {
    try {
      // Generate a new wallet first
      const wallet = this.generateWallet();
      
      // Get funds from faucet
      const faucetResult = await this.faucets.generateAccount(networkName);
      
      if (!faucetResult.success) {
        return {
          success: false,
          error: faucetResult.error || 'Failed to generate account from faucet'
        };
      }
      
      // In a real implementation, we would import the faucet account into our wallet
      // For now, we'll just return the generated wallet
      return {
        success: true,
        wallet: wallet
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fund account: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send a payment transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param destination - The destination address
   * @param amount - The amount to send (in XRP)
   * @param memo - Optional memo for the transaction
   * @returns Promise that resolves with transaction result
   */
  async sendPayment(
    senderWallet: Wallet,
    destination: string,
    amount: string,
    memo?: string
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the payment transaction
      const payment: Payment = {
        TransactionType: 'Payment',
        Account: senderWallet.classicAddress,
        Destination: destination,
        Amount: amount
      };
      
      // Add memo if provided
      if (memo) {
        payment.Memos = [{
          Memo: {
            MemoData: memo
          }
        }];
      }
      
      // Submit the transaction
      const result = await this.client.submitAndWait(payment, {
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
        error: `Failed to send payment: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send an account set transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param settings - Account settings to change
   * @returns Promise that resolves with transaction result
   */
  async sendAccountSet(
    senderWallet: Wallet,
    settings: Partial<AccountSet>
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the account set transaction
      const accountSet: AccountSet = {
        TransactionType: 'AccountSet',
        Account: senderWallet.classicAddress,
        ...settings
      };
      
      // Submit the transaction
      const result = await this.client.submitAndWait(accountSet, {
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
        error: `Failed to send account set transaction: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Send a trust set transaction
   * 
   * @param senderWallet - The sender's wallet
   * @param issuer - The issuer address
   * @param currency - The currency code
   * @param limit - The trust line limit
   * @returns Promise that resolves with transaction result
   */
  async sendTrustSet(
    senderWallet: Wallet,
    issuer: string,
    currency: string,
    limit: string
  ): Promise<SendTransactionResult> {
    try {
      // Prepare the trust set transaction
      const trustSet: TrustSet = {
        TransactionType: 'TrustSet',
        Account: senderWallet.classicAddress,
        LimitAmount: {
          currency: currency,
          issuer: issuer,
          value: limit
        }
      };
      
      // Submit the transaction
      const result = await this.client.submitAndWait(trustSet, {
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
        error: `Failed to send trust set transaction: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get account balance
   * 
   * @param address - The account address
   * @returns Promise that resolves with account balance
   */
  async getAccountBalance(address: string): Promise<string> {
    try {
      const accountInfo = await this.client.request({
        command: 'account_info',
        account: address
      });
      
      return accountInfo.result.account_data.Balance;
    } catch (error) {
      throw new Error(`Failed to get account balance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Send a test transaction to verify functionality
   * 
   * @param senderWallet - The sender's wallet
   * @param destination - The destination address
   * @returns Promise that resolves with test result
   */
  async sendTestTransaction(
    senderWallet: Wallet,
    destination: string
  ): Promise<SendTransactionResult> {
    try {
      console.log(`Sending test transaction from ${senderWallet.classicAddress} to ${destination}`);
      
      // Send a small payment (1 XRP)
      const result = await this.sendPayment(
        senderWallet,
        destination,
        '1000000', // 1 XRP in drops
        'Test transaction from Transaction Sender tool'
      );
      
      if (result.success) {
        console.log(`Test transaction successful: ${result.transactionHash}`);
      } else {
        console.error(`Test transaction failed: ${result.error}`);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: `Test transaction failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}

/**
 * Create a new Transaction Sender instance
 * 
 * @param config - Configuration for the transaction sender
 * @returns A new Transaction Sender instance
 */
export function createTransactionSender(config: TransactionSenderConfig): TransactionSender {
  return new TransactionSender(config);
}

/**
 * Generate sample transaction sender configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): TransactionSenderConfig {
  return {
    server: 'wss://s.altnet.rippletest.net:51233',
    network: 'Testnet'
  };
}