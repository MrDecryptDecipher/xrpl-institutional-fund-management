/**
 * Payment Monitor Implementation
 * 
 * This module provides functionality for monitoring incoming payments using the WebSocket API
 * as specified in the XRPL documentation tutorial.
 */

import { WebSocketTool, createWebSocketTool } from './websocket-tool';

export interface PaymentMonitorConfig {
  server: string;
  port?: number;
  secure?: boolean;
}

export interface PaymentEvent {
  type: 'payment';
  account: string;
  amount: string;
  currency: string;
  issuer?: string;
  from: string;
  transactionHash: string;
  ledgerIndex: number;
  timestamp: number;
}

export interface PaymentHandler {
  (payment: PaymentEvent): void;
}

/**
 * Payment Monitor
 * 
 * This class provides methods for monitoring incoming payments using the WebSocket API.
 */
export class PaymentMonitor {
  private wsTool: WebSocketTool;
  private config: PaymentMonitorConfig;
  private paymentHandlers: PaymentHandler[] = [];
  private monitoredAccounts: Set<string> = new Set();
  
  constructor(config: PaymentMonitorConfig) {
    this.config = config;
    this.wsTool = createWebSocketTool({
      server: config.server,
      port: config.port,
      secure: config.secure
    });
  }
  
  /**
   * Connect to the WebSocket server
   * 
   * @returns Promise that resolves when connected
   */
  async connect(): Promise<void> {
    await this.wsTool.connect();
    console.log(`Connected to payment monitor at ${this.config.server}`);
    
    // Set up message handling for payment notifications
    // Note: This is a simplified implementation. In a real implementation,
    // we would need to intercept the WebSocket messages directly.
  }
  
  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    // Unsubscribe from all accounts before disconnecting
    for (const account of this.monitoredAccounts) {
      this.unsubscribeAccount(account).catch(console.error);
    }
    
    this.wsTool.disconnect();
    console.log('Disconnected from payment monitor');
  }
  
  /**
   * Subscribe to payments for an account
   * 
   * @param account - The account to monitor for incoming payments
   * @returns Promise that resolves when subscription is complete
   */
  async subscribeAccount(account: string): Promise<void> {
    if (!this.wsTool.isConnected()) {
      throw new Error('Not connected to WebSocket server');
    }
    
    try {
      const response = await this.wsTool.sendRequest('subscribe', {
        accounts: [account]
      });
      
      if (response.status === 'success') {
        this.monitoredAccounts.add(account);
        console.log(`Subscribed to payments for account: ${account}`);
      } else {
        throw new Error(`Failed to subscribe: ${response.error_message || response.error}`);
      }
    } catch (error) {
      throw new Error(`Failed to subscribe to account ${account}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Unsubscribe from payments for an account
   * 
   * @param account - The account to stop monitoring
   * @returns Promise that resolves when unsubscription is complete
   */
  async unsubscribeAccount(account: string): Promise<void> {
    if (!this.wsTool.isConnected()) {
      throw new Error('Not connected to WebSocket server');
    }
    
    try {
      const response = await this.wsTool.sendRequest('unsubscribe', {
        accounts: [account]
      });
      
      if (response.status === 'success') {
        this.monitoredAccounts.delete(account);
        console.log(`Unsubscribed from payments for account: ${account}`);
      } else {
        throw new Error(`Failed to unsubscribe: ${response.error_message || response.error}`);
      }
    } catch (error) {
      throw new Error(`Failed to unsubscribe from account ${account}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Add a payment handler to be notified of incoming payments
   * 
   * @param handler - The function to call when a payment is received
   */
  addPaymentHandler(handler: PaymentHandler): void {
    this.paymentHandlers.push(handler);
  }
  
  /**
   * Remove a payment handler
   * 
   * @param handler - The function to remove
   */
  removePaymentHandler(handler: PaymentHandler): void {
    const index = this.paymentHandlers.indexOf(handler);
    if (index !== -1) {
      this.paymentHandlers.splice(index, 1);
    }
  }
  
  /**
   * Process a WebSocket message and extract payment information
   * 
   * @param message - The WebSocket message to process
   */
  processMessage(message: any): void {
    // This is a simplified implementation. In a real implementation,
    // we would need to intercept the WebSocket messages directly.
    
    // Check if this is a transaction notification
    if (message.type === 'transaction' && message.transaction) {
      const transaction = message.transaction;
      
      // Check if this is a payment transaction
      if (transaction.TransactionType === 'Payment') {
        // Extract payment information
        const payment: PaymentEvent = {
          type: 'payment',
          account: transaction.Destination,
          amount: this.formatAmount(transaction.Amount),
          currency: this.getCurrency(transaction.Amount),
          issuer: this.getIssuer(transaction.Amount),
          from: transaction.Account,
          transactionHash: message.transaction.hash,
          ledgerIndex: message.ledger_index,
          timestamp: Date.now()
        };
        
        // Notify all payment handlers
        for (const handler of this.paymentHandlers) {
          try {
            handler(payment);
          } catch (error) {
            console.error(`Error in payment handler: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }
    }
  }
  
  /**
   * Format an amount for display
   * 
   * @param amount - The amount to format
   * @returns Formatted amount string
   */
  private formatAmount(amount: any): string {
    if (typeof amount === 'string') {
      // XRP amount in drops
      return (parseInt(amount) / 1000000).toString();
    } else if (typeof amount === 'object' && amount.value) {
      // IOU amount
      return amount.value;
    }
    return '0';
  }
  
  /**
   * Get currency from an amount
   * 
   * @param amount - The amount object
   * @returns Currency code
   */
  private getCurrency(amount: any): string {
    if (typeof amount === 'string') {
      return 'XRP';
    } else if (typeof amount === 'object' && amount.currency) {
      return amount.currency;
    }
    return 'UNKNOWN';
  }
  
  /**
   * Get issuer from an amount
   * 
   * @param amount - The amount object
   * @returns Issuer address or undefined
   */
  private getIssuer(amount: any): string | undefined {
    if (typeof amount === 'object' && amount.issuer) {
      return amount.issuer;
    }
    return undefined;
  }
  
  /**
   * Get list of monitored accounts
   * 
   * @returns Array of monitored account addresses
   */
  getMonitoredAccounts(): string[] {
    return Array.from(this.monitoredAccounts);
  }
  
  /**
   * Check if connected to WebSocket server
   * 
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.wsTool.isConnected();
  }
}

/**
 * Create a new Payment Monitor instance
 * 
 * @param config - Configuration for the payment monitor
 * @returns A new Payment Monitor instance
 */
export function createPaymentMonitor(config: PaymentMonitorConfig): PaymentMonitor {
  return new PaymentMonitor(config);
}

/**
 * Generate sample payment monitor configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): PaymentMonitorConfig {
  return {
    server: 's.altnet.rippletest.net',
    port: 51233,
    secure: true
  };
}/**
 * Payment Monitor Implementation
 * 
 * This module provides functionality for monitoring incoming payments using the WebSocket API
 * as specified in the XRPL documentation tutorial.
 */

import { WebSocketTool, createWebSocketTool } from './websocket-tool';

export interface PaymentMonitorConfig {
  server: string;
  port?: number;
  secure?: boolean;
}

export interface PaymentEvent {
  type: 'payment';
  account: string;
  amount: string;
  currency: string;
  issuer?: string;
  from: string;
  transactionHash: string;
  ledgerIndex: number;
  timestamp: number;
}

export interface PaymentHandler {
  (payment: PaymentEvent): void;
}

/**
 * Payment Monitor
 * 
 * This class provides methods for monitoring incoming payments using the WebSocket API.
 */
export class PaymentMonitor {
  private wsTool: WebSocketTool;
  private config: PaymentMonitorConfig;
  private paymentHandlers: PaymentHandler[] = [];
  private monitoredAccounts: Set<string> = new Set();
  
  constructor(config: PaymentMonitorConfig) {
    this.config = config;
    this.wsTool = createWebSocketTool({
      server: config.server,
      port: config.port,
      secure: config.secure
    });
  }
  
  /**
   * Connect to the WebSocket server
   * 
   * @returns Promise that resolves when connected
   */
  async connect(): Promise<void> {
    await this.wsTool.connect();
    console.log(`Connected to payment monitor at ${this.config.server}`);
    
    // Set up message handling for payment notifications
    // Note: This is a simplified implementation. In a real implementation,
    // we would need to intercept the WebSocket messages directly.
  }
  
  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    // Unsubscribe from all accounts before disconnecting
    for (const account of this.monitoredAccounts) {
      this.unsubscribeAccount(account).catch(console.error);
    }
    
    this.wsTool.disconnect();
    console.log('Disconnected from payment monitor');
  }
  
  /**
   * Subscribe to payments for an account
   * 
   * @param account - The account to monitor for incoming payments
   * @returns Promise that resolves when subscription is complete
   */
  async subscribeAccount(account: string): Promise<void> {
    if (!this.wsTool.isConnected()) {
      throw new Error('Not connected to WebSocket server');
    }
    
    try {
      const response = await this.wsTool.sendRequest('subscribe', {
        accounts: [account]
      });
      
      if (response.status === 'success') {
        this.monitoredAccounts.add(account);
        console.log(`Subscribed to payments for account: ${account}`);
      } else {
        throw new Error(`Failed to subscribe: ${response.error_message || response.error}`);
      }
    } catch (error) {
      throw new Error(`Failed to subscribe to account ${account}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Unsubscribe from payments for an account
   * 
   * @param account - The account to stop monitoring
   * @returns Promise that resolves when unsubscription is complete
   */
  async unsubscribeAccount(account: string): Promise<void> {
    if (!this.wsTool.isConnected()) {
      throw new Error('Not connected to WebSocket server');
    }
    
    try {
      const response = await this.wsTool.sendRequest('unsubscribe', {
        accounts: [account]
      });
      
      if (response.status === 'success') {
        this.monitoredAccounts.delete(account);
        console.log(`Unsubscribed from payments for account: ${account}`);
      } else {
        throw new Error(`Failed to unsubscribe: ${response.error_message || response.error}`);
      }
    } catch (error) {
      throw new Error(`Failed to unsubscribe from account ${account}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Add a payment handler to be notified of incoming payments
   * 
   * @param handler - The function to call when a payment is received
   */
  addPaymentHandler(handler: PaymentHandler): void {
    this.paymentHandlers.push(handler);
  }
  
  /**
   * Remove a payment handler
   * 
   * @param handler - The function to remove
   */
  removePaymentHandler(handler: PaymentHandler): void {
    const index = this.paymentHandlers.indexOf(handler);
    if (index !== -1) {
      this.paymentHandlers.splice(index, 1);
    }
  }
  
  /**
   * Process a WebSocket message and extract payment information
   * 
   * @param message - The WebSocket message to process
   */
  processMessage(message: any): void {
    // This is a simplified implementation. In a real implementation,
    // we would need to intercept the WebSocket messages directly.
    
    // Check if this is a transaction notification
    if (message.type === 'transaction' && message.transaction) {
      const transaction = message.transaction;
      
      // Check if this is a payment transaction
      if (transaction.TransactionType === 'Payment') {
        // Extract payment information
        const payment: PaymentEvent = {
          type: 'payment',
          account: transaction.Destination,
          amount: this.formatAmount(transaction.Amount),
          currency: this.getCurrency(transaction.Amount),
          issuer: this.getIssuer(transaction.Amount),
          from: transaction.Account,
          transactionHash: message.transaction.hash,
          ledgerIndex: message.ledger_index,
          timestamp: Date.now()
        };
        
        // Notify all payment handlers
        for (const handler of this.paymentHandlers) {
          try {
            handler(payment);
          } catch (error) {
            console.error(`Error in payment handler: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }
    }
  }
  
  /**
   * Format an amount for display
   * 
   * @param amount - The amount to format
   * @returns Formatted amount string
   */
  private formatAmount(amount: any): string {
    if (typeof amount === 'string') {
      // XRP amount in drops
      return (parseInt(amount) / 1000000).toString();
    } else if (typeof amount === 'object' && amount.value) {
      // IOU amount
      return amount.value;
    }
    return '0';
  }
  
  /**
   * Get currency from an amount
   * 
   * @param amount - The amount object
   * @returns Currency code
   */
  private getCurrency(amount: any): string {
    if (typeof amount === 'string') {
      return 'XRP';
    } else if (typeof amount === 'object' && amount.currency) {
      return amount.currency;
    }
    return 'UNKNOWN';
  }
  
  /**
   * Get issuer from an amount
   * 
   * @param amount - The amount object
   * @returns Issuer address or undefined
   */
  private getIssuer(amount: any): string | undefined {
    if (typeof amount === 'object' && amount.issuer) {
      return amount.issuer;
    }
    return undefined;
  }
  
  /**
   * Get list of monitored accounts
   * 
   * @returns Array of monitored account addresses
   */
  getMonitoredAccounts(): string[] {
    return Array.from(this.monitoredAccounts);
  }
  
  /**
   * Check if connected to WebSocket server
   * 
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.wsTool.isConnected();
  }
}

/**
 * Create a new Payment Monitor instance
 * 
 * @param config - Configuration for the payment monitor
 * @returns A new Payment Monitor instance
 */
export function createPaymentMonitor(config: PaymentMonitorConfig): PaymentMonitor {
  return new PaymentMonitor(config);
}

/**
 * Generate sample payment monitor configuration
 * 
 * @returns Sample configuration
 */
export function generateSampleConfig(): PaymentMonitorConfig {
  return {
    server: 's.altnet.rippletest.net',
    port: 51233,
    secure: true
  };
}