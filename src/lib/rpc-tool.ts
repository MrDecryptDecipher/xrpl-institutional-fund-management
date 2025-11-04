import { createRippledManager } from './rippled-manager';

/**
 * RPC Tool Implementation
 * 
 * This module provides functionality for the RPC tool that prints raw information
 * about accounts, transactions, and ledgers as specified in the XRPL documentation.
 */

export interface AccountInfo {
  account: string;
  balance: string;
  sequence: number;
  owner_count: number;
  previous_txn_id: string;
  previous_txn_lgr_seq: number;
  account_txn_id?: string;
  domain?: string;
  email_hash?: string;
  message_key?: string;
  regular_key?: string;
  tick_size?: number;
  transfer_rate?: number;
  wallet_locator?: string;
  wallet_size?: number;
}

export interface TransactionInfo {
  hash: string;
  ledger_index: number;
  date: number;
  tx: any;
  meta: any;
}

export interface LedgerInfo {
  ledger_index: number;
  ledger_hash: string;
  parent_hash: string;
  transaction_hash: string;
  state_hash: string;
  close_time: number;
  close_time_resolution: number;
  close_flags: number;
  transactions?: any[];
  accountState?: any[];
}

/**
 * RPC Tool
 * 
 * This class provides methods for printing raw information about accounts,
 * transactions, and ledgers.
 */
export class RPCTool {
  private rippledManager: ReturnType<typeof createRippledManager>;
  
  constructor(rippledConfig?: any) {
    this.rippledManager = createRippledManager(rippledConfig);
  }
  
  /**
   * Get raw account information
   * 
   * @param account - The account address
   * @param ledgerIndex - The ledger index (optional)
   * @returns Promise that resolves with account information
   */
  async getAccountInfo(account: string, ledgerIndex?: number | string): Promise<AccountInfo> {
    try {
      const params: any = { account: account };
      
      if (ledgerIndex !== undefined) {
        params.ledger_index = ledgerIndex;
      }
      
      const result = await this.rippledManager.runCommand('account_info', params);
      return result.result.account_data;
    } catch (error) {
      throw new Error(`Failed to get account info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get raw transaction information
   * 
   * @param transactionHash - The transaction hash
   * @param binary - Whether to return binary format (optional)
   * @returns Promise that resolves with transaction information
   */
  async getTransactionInfo(transactionHash: string, binary: boolean = false): Promise<TransactionInfo> {
    try {
      const params: any = { 
        transaction: transactionHash,
        binary: binary
      };
      
      const result = await this.rippledManager.runCommand('tx', params);
      return {
        hash: result.result.hash,
        ledger_index: result.result.ledger_index,
        date: result.result.date,
        tx: result.result,
        meta: result.result.meta
      };
    } catch (error) {
      throw new Error(`Failed to get transaction info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get raw ledger information
   * 
   * @param ledgerIndex - The ledger index or identifier
   * @param transactions - Whether to include transactions (optional)
   * @param expand - Whether to expand transactions (optional)
   * @param accounts - Whether to include account state (optional)
   * @returns Promise that resolves with ledger information
   */
  async getLedgerInfo(
    ledgerIndex: number | string, 
    transactions: boolean = false, 
    expand: boolean = false, 
    accounts: boolean = false
  ): Promise<LedgerInfo> {
    try {
      const params: any = { 
        ledger_index: ledgerIndex,
        transactions: transactions,
        expand: expand,
        accounts: accounts
      };
      
      const result = await this.rippledManager.runCommand('ledger', params);
      return result.result.ledger;
    } catch (error) {
      throw new Error(`Failed to get ledger info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Print formatted account information
   * 
   * @param account - The account address
   * @param ledgerIndex - The ledger index (optional)
   * @returns Promise that resolves with formatted account information
   */
  async printAccountInfo(account: string, ledgerIndex?: number | string): Promise<string> {
    try {
      const accountInfo = await this.getAccountInfo(account, ledgerIndex);
      
      let output = `Account Information for ${account}\n`;
      output += `=====================================\n`;
      output += `Balance: ${accountInfo.balance}\n`;
      output += `Sequence: ${accountInfo.sequence}\n`;
      output += `Owner Count: ${accountInfo.owner_count}\n`;
      output += `Previous Transaction ID: ${accountInfo.previous_txn_id}\n`;
      output += `Previous Transaction Ledger Sequence: ${accountInfo.previous_txn_lgr_seq}\n`;
      
      if (accountInfo.domain) {
        output += `Domain: ${accountInfo.domain}\n`;
      }
      
      if (accountInfo.regular_key) {
        output += `Regular Key: ${accountInfo.regular_key}\n`;
      }
      
      return output;
    } catch (error) {
      throw new Error(`Failed to print account info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Print formatted transaction information
   * 
   * @param transactionHash - The transaction hash
   * @returns Promise that resolves with formatted transaction information
   */
  async printTransactionInfo(transactionHash: string): Promise<string> {
    try {
      const txInfo = await this.getTransactionInfo(transactionHash);
      
      let output = `Transaction Information for ${transactionHash}\n`;
      output += `===============================================\n`;
      output += `Ledger Index: ${txInfo.ledger_index}\n`;
      output += `Date: ${new Date(txInfo.date * 1000).toISOString()}\n`;
      output += `Transaction Type: ${txInfo.tx.TransactionType}\n`;
      output += `Account: ${txInfo.tx.Account}\n`;
      
      if (txInfo.tx.Amount) {
        output += `Amount: ${txInfo.tx.Amount}\n`;
      }
      
      if (txInfo.tx.Destination) {
        output += `Destination: ${txInfo.tx.Destination}\n`;
      }
      
      output += `Fee: ${txInfo.tx.Fee}\n`;
      output += `Sequence: ${txInfo.tx.Sequence}\n`;
      
      return output;
    } catch (error) {
      throw new Error(`Failed to print transaction info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Print formatted ledger information
   * 
   * @param ledgerIndex - The ledger index or identifier
   * @returns Promise that resolves with formatted ledger information
   */
  async printLedgerInfo(ledgerIndex: number | string): Promise<string> {
    try {
      const ledgerInfo = await this.getLedgerInfo(ledgerIndex);
      
      let output = `Ledger Information for ${ledgerIndex}\n`;
      output += `==================================\n`;
      output += `Ledger Hash: ${ledgerInfo.ledger_hash}\n`;
      output += `Parent Hash: ${ledgerInfo.parent_hash}\n`;
      output += `Transaction Hash: ${ledgerInfo.transaction_hash}\n`;
      output += `State Hash: ${ledgerInfo.state_hash}\n`;
      output += `Close Time: ${new Date(ledgerInfo.close_time * 1000).toISOString()}\n`;
      output += `Close Time Resolution: ${ledgerInfo.close_time_resolution}\n`;
      output += `Close Flags: ${ledgerInfo.close_flags}\n`;
      
      if (ledgerInfo.transactions) {
        output += `Transaction Count: ${ledgerInfo.transactions.length}\n`;
      }
      
      if (ledgerInfo.accountState) {
        output += `Account State Objects: ${ledgerInfo.accountState.length}\n`;
      }
      
      return output;
    } catch (error) {
      throw new Error(`Failed to print ledger info: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get account transactions
   * 
   * @param account - The account address
   * @param ledgerIndexMin - Minimum ledger index (optional)
   * @param ledgerIndexMax - Maximum ledger index (optional)
   * @param limit - Maximum number of transactions to return (optional)
   * @returns Promise that resolves with account transactions
   */
  async getAccountTransactions(
    account: string, 
    ledgerIndexMin?: number, 
    ledgerIndexMax?: number, 
    limit?: number
  ): Promise<any[]> {
    try {
      const params: any = { account: account };
      
      if (ledgerIndexMin !== undefined) {
        params.ledger_index_min = ledgerIndexMin;
      }
      
      if (ledgerIndexMax !== undefined) {
        params.ledger_index_max = ledgerIndexMax;
      }
      
      if (limit !== undefined) {
        params.limit = limit;
      }
      
      const result = await this.rippledManager.runCommand('account_tx', params);
      return result.result.transactions || [];
    } catch (error) {
      throw new Error(`Failed to get account transactions: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Get ledger entry
   * 
   * @param index - The ledger entry index
   * @param ledgerIndex - The ledger index (optional)
   * @returns Promise that resolves with ledger entry
   */
  async getLedgerEntry(index: string, ledgerIndex?: number | string): Promise<any> {
    try {
      const params: any = { index: index };
      
      if (ledgerIndex !== undefined) {
        params.ledger_index = ledgerIndex;
      }
      
      const result = await this.rippledManager.runCommand('ledger_entry', params);
      return result.result.node;
    } catch (error) {
      throw new Error(`Failed to get ledger entry: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create a new RPC Tool instance
 * 
 * @param rippledConfig - Configuration for the rippled server
 * @returns A new RPC Tool instance
 */
export function createRPCTool(rippledConfig?: any): RPCTool {
  return new RPCTool(rippledConfig);
}