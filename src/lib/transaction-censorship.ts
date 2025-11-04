/**
 * Transaction Censorship Detection Implementation for XRP Ledger
 * 
 * This module provides functionality for detecting potential transaction censorship
 * in the XRP Ledger network.
 */

export interface TrackedTransaction {
  transactionHash: string;
  initialProposalLedger: number;
  firstWarningLedger?: number;
  warningCount: number;
  status: 'tracking' | 'warning' | 'error' | 'included' | 'expired';
  lastChecked: Date;
}

export interface CensorshipAlert {
  transactionHash: string;
  alertType: 'warning' | 'error';
  message: string;
  ledgerRange: {
    start: number;
    end: number;
  };
  timestamp: Date;
}

export interface CensorshipDetectionConfig {
  maxWarnings?: number;
  checkInterval?: number; // in ledgers
  alertThreshold?: number; // in ledgers
}

/**
 * Transaction Censorship Detector
 * 
 * This class provides methods for detecting potential transaction censorship
 * by tracking transactions through the consensus process.
 */
export class TransactionCensorshipDetector {
  private config: CensorshipDetectionConfig;
  private trackedTransactions: Map<string, TrackedTransaction> = new Map();
  private alerts: CensorshipAlert[] = [];
  private currentLedgerIndex: number = 0;
  private onAlertCallback?: (alert: CensorshipAlert) => void;

  constructor(config?: CensorshipDetectionConfig) {
    this.config = {
      maxWarnings: 5,
      checkInterval: 1,
      alertThreshold: 15,
      ...config
    };
  }

  /**
   * Add a transaction to track for censorship
   * 
   * @param transactionHash - Hash of the transaction to track
   * @param ledgerIndex - Ledger index when transaction was first proposed
   */
  addTransactionToTrack(transactionHash: string, ledgerIndex: number): void {
    const trackedTx: TrackedTransaction = {
      transactionHash,
      initialProposalLedger: ledgerIndex,
      warningCount: 0,
      status: 'tracking',
      lastChecked: new Date()
    };
    
    this.trackedTransactions.set(transactionHash, trackedTx);
    console.log(`Started tracking transaction ${transactionHash} from ledger ${ledgerIndex}`);
  }

  /**
   * Mark a transaction as included in a validated ledger
   * 
   * @param transactionHash - Hash of the transaction that was included
   * @param ledgerIndex - Ledger index where transaction was included
   */
  markTransactionIncluded(transactionHash: string, ledgerIndex: number): void {
    const trackedTx = this.trackedTransactions.get(transactionHash);
    if (trackedTx) {
      trackedTx.status = 'included';
      this.trackedTransactions.delete(transactionHash);
      console.log(`Transaction ${transactionHash} included in ledger ${ledgerIndex}`);
    }
  }

  /**
   * Update the current ledger index
   * 
   * @param ledgerIndex - Current ledger index
   */
  updateCurrentLedger(ledgerIndex: number): void {
    this.currentLedgerIndex = ledgerIndex;
    this.checkTrackedTransactions();
  }

  /**
   * Check tracked transactions for potential censorship
   */
  private checkTrackedTransactions(): void {
    for (const [txHash, trackedTx] of this.trackedTransactions.entries()) {
      // Skip if already in error state
      if (trackedTx.status === 'error') {
        continue;
      }
      
      // Calculate how many ledgers since initial proposal
      const ledgersSinceProposal = this.currentLedgerIndex - trackedTx.initialProposalLedger;
      
      // If transaction has been tracked for more than alert threshold
      if (ledgersSinceProposal >= (this.config.alertThreshold || 15)) {
        // Check if we've already issued a warning
        if (!trackedTx.firstWarningLedger) {
          // First warning
          trackedTx.firstWarningLedger = this.currentLedgerIndex;
          trackedTx.warningCount = 1;
          trackedTx.status = 'warning';
          
          const alert: CensorshipAlert = {
            transactionHash: txHash,
            alertType: 'warning',
            message: `Potential Censorship: Eligible tx ${txHash}, which we are tracking since ledger ${trackedTx.initialProposalLedger} has not been included as of ledger ${this.currentLedgerIndex}.`,
            ledgerRange: {
              start: trackedTx.initialProposalLedger,
              end: this.currentLedgerIndex
            },
            timestamp: new Date()
          };
          
          this.alerts.push(alert);
          this.onAlertCallback?.(alert);
          
          console.warn(alert.message);
        } else {
          // Check if it's time for another warning (every alertThreshold ledgers)
          const ledgersSinceFirstWarning = this.currentLedgerIndex - trackedTx.firstWarningLedger;
          const expectedWarningCount = Math.floor(ledgersSinceFirstWarning / (this.config.alertThreshold || 15));
          
          if (expectedWarningCount > trackedTx.warningCount) {
            trackedTx.warningCount = expectedWarningCount;
            
            if (trackedTx.warningCount >= (this.config.maxWarnings || 5)) {
              // Final error
              trackedTx.status = 'error';
              
              const alert: CensorshipAlert = {
                transactionHash: txHash,
                alertType: 'error',
                message: `Potential Censorship: Eligible tx ${txHash}, which we are tracking since ledger ${trackedTx.initialProposalLedger} has not been included as of ledger ${this.currentLedgerIndex}. Additional warnings suppressed.`,
                ledgerRange: {
                  start: trackedTx.initialProposalLedger,
                  end: this.currentLedgerIndex
                },
                timestamp: new Date()
              };
              
              this.alerts.push(alert);
              this.onAlertCallback?.(alert);
              
              console.error(alert.message);
            } else {
              // Additional warning
              const alert: CensorshipAlert = {
                transactionHash: txHash,
                alertType: 'warning',
                message: `Potential Censorship: Eligible tx ${txHash}, which we are tracking since ledger ${trackedTx.initialProposalLedger} has not been included as of ledger ${this.currentLedgerIndex}.`,
                ledgerRange: {
                  start: trackedTx.initialProposalLedger,
                  end: this.currentLedgerIndex
                },
                timestamp: new Date()
              };
              
              this.alerts.push(alert);
              this.onAlertCallback?.(alert);
              
              console.warn(alert.message);
            }
          }
        }
      }
      
      // Update last checked time
      trackedTx.lastChecked = new Date();
    }
  }

  /**
   * Remove expired transactions (older than 200 ledgers)
   */
  private removeExpiredTransactions(): void {
    const expirationThreshold = 200;
    
    for (const [txHash, trackedTx] of this.trackedTransactions.entries()) {
      const ledgersSinceProposal = this.currentLedgerIndex - trackedTx.initialProposalLedger;
      
      if (ledgersSinceProposal > expirationThreshold) {
        trackedTx.status = 'expired';
        this.trackedTransactions.delete(txHash);
        console.log(`Stopped tracking expired transaction ${txHash}`);
      }
    }
  }

  /**
   * Get all tracked transactions
   * 
   * @returns Array of tracked transactions
   */
  getTrackedTransactions(): TrackedTransaction[] {
    return Array.from(this.trackedTransactions.values());
  }

  /**
   * Get all alerts
   * 
   * @returns Array of alerts
   */
  getAlerts(): CensorshipAlert[] {
    return this.alerts;
  }

  /**
   * Clear alerts
   */
  clearAlerts(): void {
    this.alerts = [];
  }

  /**
   * Set alert callback function
   * 
   * @param callback - Function to call when alerts are generated
   */
  setAlertCallback(callback: (alert: CensorshipAlert) => void): void {
    this.onAlertCallback = callback;
  }

  /**
   * Get statistics about censorship detection
   * 
   * @returns Object with statistics
   */
  getStatistics(): any {
    const trackingCount = Array.from(this.trackedTransactions.values()).filter(tx => tx.status === 'tracking').length;
    const warningCount = Array.from(this.trackedTransactions.values()).filter(tx => tx.status === 'warning').length;
    const errorCount = Array.from(this.trackedTransactions.values()).filter(tx => tx.status === 'error').length;
    const includedCount = Array.from(this.trackedTransactions.values()).filter(tx => tx.status === 'included').length;
    const expiredCount = Array.from(this.trackedTransactions.values()).filter(tx => tx.status === 'expired').length;
    
    return {
      currentLedgerIndex: this.currentLedgerIndex,
      totalTracked: this.trackedTransactions.size,
      tracking: trackingCount,
      warning: warningCount,
      error: errorCount,
      included: includedCount,
      expired: expiredCount,
      alerts: this.alerts.length
    };
  }

  /**
   * Reset the detector
   */
  reset(): void {
    this.trackedTransactions.clear();
    this.alerts = [];
    this.currentLedgerIndex = 0;
    console.log('Transaction censorship detector reset');
  }
}

/**
 * Create a new TransactionCensorshipDetector instance
 * 
 * @param config - Configuration for the censorship detector
 * @returns A new TransactionCensorshipDetector instance
 */
export function createTransactionCensorshipDetector(config?: CensorshipDetectionConfig): TransactionCensorshipDetector {
  return new TransactionCensorshipDetector(config);
}