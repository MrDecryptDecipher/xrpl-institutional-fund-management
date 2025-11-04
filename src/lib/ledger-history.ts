/**
 * Ledger History Implementation for XRP Ledger
 * 
 * This module provides functionality for managing and querying ledger history
 * in rippled servers.
 */

import { RippledManager, ServerInfo } from './rippled-manager';

export interface LedgerRange {
  minLedger: number;
  maxLedger: number;
  completeLedgers: string;
}

export interface LedgerHistoryConfig {
  maxLedgersToKeep?: number;
  fullHistory?: boolean;
  backfillHistory?: boolean;
  onlineDeletion?: boolean;
}

export interface LedgerInfo {
  ledgerIndex: number;
  ledgerHash: string;
  parentHash: string;
  transactionCount: number;
  closeTime: Date;
  totalCoins: string;
}

export interface HistoricalTransaction {
  transactionHash: string;
  ledgerIndex: number;
  transaction: any;
  meta: any;
}

/**
 * Ledger History Manager
 * 
 * This class provides methods for managing and querying ledger history.
 */
export class LedgerHistoryManager {
  private config: LedgerHistoryConfig;
  private rippledManager: RippledManager;
  private ledgerStore: Map<number, LedgerInfo> = new Map();
  private transactionStore: Map<string, HistoricalTransaction> = new Map();

  constructor(rippledManager: RippledManager, config?: LedgerHistoryConfig) {
    this.rippledManager = rippledManager;
    this.config = {
      maxLedgersToKeep: 1000,
      fullHistory: false,
      backfillHistory: true,
      onlineDeletion: true,
      ...config
    };
  }

  /**
   * Get the available ledger range
   * 
   * @returns Promise that resolves with the ledger range
   */
  async getLedgerRange(): Promise<LedgerRange> {
    try {
      const serverInfo = await this.rippledManager.getServerInfo();
      
      if (serverInfo.complete_ledgers) {
        // Parse the complete_ledgers string to get min and max
        const ranges = serverInfo.complete_ledgers.split(',');
        let minLedger = Infinity;
        let maxLedger = 0;
        
        for (const range of ranges) {
          if (range.includes('-')) {
            const [min, max] = range.split('-').map(Number);
            minLedger = Math.min(minLedger, min);
            maxLedger = Math.max(maxLedger, max);
          } else {
            const ledger = Number(range);
            minLedger = Math.min(minLedger, ledger);
            maxLedger = Math.max(maxLedger, ledger);
          }
        }
        
        return {
          minLedger,
          maxLedger,
          completeLedgers: serverInfo.complete_ledgers
        };
      }
      
      return {
        minLedger: 0,
        maxLedger: 0,
        completeLedgers: ''
      };
    } catch (error) {
      throw new Error(`Failed to get ledger range: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get ledger information
   * 
   * @param ledgerIndex - Index of the ledger to retrieve
   * @returns Promise that resolves with ledger information
   */
  async getLedger(ledgerIndex: number): Promise<LedgerInfo | null> {
    // Check if we have it in our local store
    if (this.ledgerStore.has(ledgerIndex)) {
      return this.ledgerStore.get(ledgerIndex) || null;
    }
    
    try {
      // Fetch from rippled
      const result = await this.rippledManager.runCommand('ledger', {
        ledger_index: ledgerIndex,
        transactions: false,
        expand: false
      });
      
      if (result.result && result.result.ledger) {
        const ledger = result.result.ledger;
        const ledgerInfo: LedgerInfo = {
          ledgerIndex: ledger.ledger_index,
          ledgerHash: ledger.hash,
          parentHash: ledger.parent_hash,
          transactionCount: ledger.transactions ? ledger.transactions.length : 0,
          closeTime: new Date(ledger.close_time_human),
          totalCoins: ledger.total_coins
        };
        
        // Store in local cache
        this.ledgerStore.set(ledgerIndex, ledgerInfo);
        
        // Clean up old entries if we have too many
        this.cleanupLedgerStore();
        
        return ledgerInfo;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to get ledger ${ledgerIndex}:`, error);
      return null;
    }
  }

  /**
   * Get transaction information
   * 
   * @param transactionHash - Hash of the transaction to retrieve
   * @param ledgerIndex - Optional ledger index to search in
   * @returns Promise that resolves with transaction information
   */
  async getTransaction(transactionHash: string, ledgerIndex?: number): Promise<HistoricalTransaction | null> {
    // Check if we have it in our local store
    if (this.transactionStore.has(transactionHash)) {
      return this.transactionStore.get(transactionHash) || null;
    }
    
    try {
      // Fetch from rippled
      const params: any = {
        transaction: transactionHash
      };
      
      if (ledgerIndex !== undefined) {
        params.ledger_index = ledgerIndex;
      }
      
      const result = await this.rippledManager.runCommand('tx', params);
      
      if (result.result) {
        const historicalTx: HistoricalTransaction = {
          transactionHash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          transaction: result.result,
          meta: result.result.meta
        };
        
        // Store in local cache
        this.transactionStore.set(transactionHash, historicalTx);
        
        // Clean up old entries if we have too many
        this.cleanupTransactionStore();
        
        return historicalTx;
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to get transaction ${transactionHash}:`, error);
      return null;
    }
  }

  /**
   * Get transactions for a specific ledger
   * 
   * @param ledgerIndex - Index of the ledger to retrieve transactions for
   * @returns Promise that resolves with array of transactions
   */
  async getLedgerTransactions(ledgerIndex: number): Promise<HistoricalTransaction[]> {
    try {
      const result = await this.rippledManager.runCommand('ledger', {
        ledger_index: ledgerIndex,
        transactions: true,
        expand: true
      });
      
      if (result.result && result.result.ledger && result.result.ledger.transactions) {
        const transactions: HistoricalTransaction[] = [];
        
        for (const tx of result.result.ledger.transactions) {
          const historicalTx: HistoricalTransaction = {
            transactionHash: tx.hash,
            ledgerIndex: ledgerIndex,
            transaction: tx,
            meta: tx.meta
          };
          
          transactions.push(historicalTx);
          
          // Store in local cache
          this.transactionStore.set(tx.hash, historicalTx);
        }
        
        // Clean up old entries if we have too many
        this.cleanupTransactionStore();
        
        return transactions;
      }
      
      return [];
    } catch (error) {
      throw new Error(`Failed to get ledger transactions: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Backfill ledger history
   * 
   * @param startLedger - Starting ledger index
   * @param endLedger - Ending ledger index
   * @returns Promise that resolves when backfilling is complete
   */
  async backfillHistory(startLedger: number, endLedger: number): Promise<void> {
    if (!this.config.backfillHistory) {
      console.log('Backfilling is disabled');
      return;
    }
    
    console.log(`Backfilling ledger history from ${startLedger} to ${endLedger}`);
    
    // In a real implementation, this would download and store ledger history
    // For now, we'll just simulate the process
    for (let i = startLedger; i <= endLedger; i++) {
      try {
        await this.getLedger(i);
        console.log(`Downloaded ledger ${i}`);
      } catch (error) {
        console.error(`Failed to download ledger ${i}:`, error);
      }
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Backfilling complete');
  }

  /**
   * Configure full history mode
   * 
   * @param enable - Whether to enable full history
   * @returns Promise that resolves when configuration is complete
   */
  async configureFullHistory(enable: boolean): Promise<void> {
    this.config.fullHistory = enable;
    console.log(`Full history mode ${enable ? 'enabled' : 'disabled'}`);
    
    // In a real implementation, this would modify the rippled configuration
    // For now, we'll just update our local config
  }

  /**
   * Configure online deletion
   * 
   * @param enable - Whether to enable online deletion
   * @returns Promise that resolves when configuration is complete
   */
  async configureOnlineDeletion(enable: boolean): Promise<void> {
    this.config.onlineDeletion = enable;
    console.log(`Online deletion ${enable ? 'enabled' : 'disabled'}`);
    
    // In a real implementation, this would modify the rippled configuration
    // For now, we'll just update our local config
  }

  /**
   * Get ledger history statistics
   * 
   * @returns Promise that resolves with history statistics
   */
  async getHistoryStats(): Promise<any> {
    const ledgerRange = await this.getLedgerRange();
    
    return {
      ledgerRange,
      cachedLedgers: this.ledgerStore.size,
      cachedTransactions: this.transactionStore.size,
      fullHistory: this.config.fullHistory,
      onlineDeletion: this.config.onlineDeletion
    };
  }

  /**
   * Clean up old ledger entries
   */
  private cleanupLedgerStore(): void {
    if (this.ledgerStore.size <= (this.config.maxLedgersToKeep || 1000)) {
      return;
    }
    
    // Remove the oldest entries
    const sortedLedgers = Array.from(this.ledgerStore.keys()).sort((a, b) => a - b);
    const ledgersToRemove = sortedLedgers.length - (this.config.maxLedgersToKeep || 1000);
    
    for (let i = 0; i < ledgersToRemove; i++) {
      this.ledgerStore.delete(sortedLedgers[i]);
    }
  }

  /**
   * Clean up old transaction entries
   */
  private cleanupTransactionStore(): void {
    if (this.transactionStore.size <= (this.config.maxLedgersToKeep || 1000)) {
      return;
    }
    
    // Remove the oldest entries
    const sortedTransactions = Array.from(this.transactionStore.keys()).slice(0, this.transactionStore.size - (this.config.maxLedgersToKeep || 1000));
    
    for (const txHash of sortedTransactions) {
      this.transactionStore.delete(txHash);
    }
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.ledgerStore.clear();
    this.transactionStore.clear();
    console.log('Ledger history cache cleared');
  }

  /**
   * Check if server has full history
   * 
   * @returns Promise that resolves with whether server has full history
   */
  async hasFullHistory(): Promise<boolean> {
    try {
      const serverInfo = await this.rippledManager.getServerInfo();
      
      // Check if this is a full history server
      // In a real implementation, we would check specific indicators
      // For now, we'll use our config setting
      return this.config.fullHistory || false;
    } catch (error) {
      console.error('Failed to check full history status:', error);
      return false;
    }
  }
}

/**
 * Create a new LedgerHistoryManager instance
 * 
 * @param rippledManager - Rippled manager instance
 * @param config - Configuration for the ledger history manager
 * @returns A new LedgerHistoryManager instance
 */
export function createLedgerHistoryManager(rippledManager: RippledManager, config?: LedgerHistoryConfig): LedgerHistoryManager {
  return new LedgerHistoryManager(rippledManager, config);
}