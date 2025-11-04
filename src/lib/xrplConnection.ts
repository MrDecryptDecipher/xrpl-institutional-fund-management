/**
 * XRPL WebSocket Connection Manager
 * Handles real-time connections to XRPL networks (Testnet/Mainnet)
 */

import { Client, Wallet } from 'xrpl';
import { NetworkMode } from '../contexts/NetworkContext';

// Network configurations
const NETWORK_CONFIGS = {
  testnet: {
    server: 'wss://s.altnet.rippletest.net:51233',
    explorerBase: 'https://testnet.xrpl.org',
  },
  mainnet: {
    server: 'wss://xrplcluster.com',
    explorerBase: 'https://livenet.xrpl.org',
  },
};

export class XRPLConnectionManager {
  private client: Client | null = null;
  private networkMode: NetworkMode = 'demo';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second

  constructor(networkMode: NetworkMode) {
    this.networkMode = networkMode;
  }

  /**
   * Connect to XRPL network
   */
  async connect(): Promise<void> {
    if (this.networkMode === 'demo') {
      console.log('Demo mode - no real connection needed');
      return;
    }

    const config = NETWORK_CONFIGS[this.networkMode];
    if (!config) {
      throw new Error(`Invalid network mode: ${this.networkMode}`);
    }

    try {
      this.client = new Client(config.server);
      
      // Set up event listeners
      this.client.on('connected', () => {
        console.log(`Connected to XRPL ${this.networkMode}`);
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
      });

      this.client.on('disconnected', (code) => {
        console.log(`Disconnected from XRPL ${this.networkMode} (code: ${code})`);
        this.handleReconnect();
      });

      this.client.on('error', (error) => {
        console.error('XRPL connection error:', error);
      });

      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect to XRPL:', error);
      throw error;
    }
  }

  /**
   * Handle reconnection with exponential backoff
   */
  private async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(async () => {
      try {
        await this.connect();
      } catch (error) {
        console.error('Reconnection failed:', error);
      }
    }, delay);
  }

  /**
   * Disconnect from XRPL network
   */
  async disconnect(): Promise<void> {
    if (this.client && this.client.isConnected()) {
      await this.client.disconnect();
      this.client = null;
    }
  }

  /**
   * Get account info
   */
  async getAccountInfo(address: string): Promise<any> {
    if (this.networkMode === 'demo') {
      // Return mock data for demo mode
      return {
        account_data: {
          Account: address,
          Balance: '10000000000', // 10,000 XRP
          Sequence: 1,
        },
      };
    }

    if (!this.client || !this.client.isConnected()) {
      throw new Error('Not connected to XRPL network');
    }

    try {
      const response = await this.client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated',
      });

      return response.result;
    } catch (error) {
      console.error('Failed to get account info:', error);
      throw error;
    }
  }

  /**
   * Get account transactions
   */
  async getAccountTransactions(address: string, limit: number = 20): Promise<any[]> {
    if (this.networkMode === 'demo') {
      // Return empty array for demo mode
      return [];
    }

    if (!this.client || !this.client.isConnected()) {
      throw new Error('Not connected to XRPL network');
    }

    try {
      const response = await this.client.request({
        command: 'account_tx',
        account: address,
        limit,
        ledger_index_min: -1,
        ledger_index_max: -1,
      });

      return response.result.transactions || [];
    } catch (error) {
      console.error('Failed to get account transactions:', error);
      throw error;
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<any> {
    if (this.networkMode === 'demo') {
      // Return mock data for demo mode
      return {
        hash: txHash,
        validated: true,
      };
    }

    if (!this.client || !this.client.isConnected()) {
      throw new Error('Not connected to XRPL network');
    }

    try {
      const response = await this.client.request({
        command: 'tx',
        transaction: txHash,
      });

      return response.result;
    } catch (error) {
      console.error('Failed to get transaction:', error);
      throw error;
    }
  }

  /**
   * Subscribe to account updates
   */
  async subscribeToAccount(address: string, callback: (data: any) => void): Promise<void> {
    if (this.networkMode === 'demo') {
      console.log('Demo mode - no real subscription');
      return;
    }

    if (!this.client || !this.client.isConnected()) {
      throw new Error('Not connected to XRPL network');
    }

    try {
      await this.client.request({
        command: 'subscribe',
        accounts: [address],
      });

      this.client.on('transaction', (tx) => {
        if (tx.transaction && 
            (tx.transaction.Account === address || tx.transaction.Destination === address)) {
          callback(tx);
        }
      });
    } catch (error) {
      console.error('Failed to subscribe to account:', error);
      throw error;
    }
  }

  /**
   * Get explorer URL for transaction
   */
  getExplorerUrl(txHash: string): string {
    if (this.networkMode === 'demo') {
      return '#'; // No explorer for demo mode
    }

    const config = NETWORK_CONFIGS[this.networkMode];
    return `${config.explorerBase}/transactions/${txHash}`;
  }

  /**
   * Get explorer URL for account
   */
  getAccountExplorerUrl(address: string): string {
    if (this.networkMode === 'demo') {
      return '#'; // No explorer for demo mode
    }

    const config = NETWORK_CONFIGS[this.networkMode];
    return `${config.explorerBase}/accounts/${address}`;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.client?.isConnected() || false;
  }

  /**
   * Get current network mode
   */
  getNetworkMode(): NetworkMode {
    return this.networkMode;
  }

  /**
   * Switch network
   */
  async switchNetwork(newMode: NetworkMode): Promise<void> {
    if (newMode === this.networkMode) {
      return;
    }

    // Disconnect from current network
    await this.disconnect();

    // Update network mode
    this.networkMode = newMode;

    // Connect to new network (if not demo)
    if (newMode !== 'demo') {
      await this.connect();
    }
  }
}

// Singleton instance
let connectionManager: XRPLConnectionManager | null = null;

/**
 * Get or create XRPL connection manager instance
 */
export function getXRPLConnection(networkMode: NetworkMode = 'demo'): XRPLConnectionManager {
  if (!connectionManager || connectionManager.getNetworkMode() !== networkMode) {
    connectionManager = new XRPLConnectionManager(networkMode);
  }
  return connectionManager;
}

/**
 * Format XRP amount from drops
 */
export function dropsToXRP(drops: string | number): number {
  return Number(drops) / 1000000;
}

/**
 * Format XRP amount to drops
 */
export function xrpToDrops(xrp: number): string {
  return String(Math.floor(xrp * 1000000));
}

