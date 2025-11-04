/**
 * WebSocket Manager for XRPL Real-Time Subscriptions
 * Production-ready with persistent connection, auto-reconnect, and comprehensive stream management
 * Implements subscribe/unsubscribe per XRPL documentation
 */

import { Client } from "xrpl";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

export type StreamType = "ledger" | "transactions" | "transactions_proposed" | "validations" | "consensus" | "server" | "book_changes";

export interface BookSubscription {
  taker_gets: {
    currency: string;
    issuer?: string;
  };
  taker_pays: {
    currency: string;
    issuer?: string;
  };
  both?: boolean;
  snapshot?: boolean;
}

export interface SubscriptionConfig {
  streams?: StreamType[];
  accounts?: string[];
  accounts_proposed?: string[];
  books?: BookSubscription[];
}

export type MessageHandler = (message: any) => void;

export class WebSocketManager {
  private client: Client;
  private network: string;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 10;
  private reconnectDelay: number = 1000; // Start with 1 second
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();
  private activeSubscriptions: SubscriptionConfig = {
    streams: [],
    accounts: [],
    accounts_proposed: [],
    books: []
  };

  constructor(network: "testnet" | "devnet" | "mainnet" = "testnet") {
    this.network = XRPL_NETWORKS[network];
    this.client = new Client(this.network);
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.client.on("connected", () => {
      console.log("WebSocket connected to XRPL");
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
      
      // Resubscribe to all active subscriptions
      this.resubscribeAll();
    });

    this.client.on("disconnected", (code: number) => {
      console.log(`WebSocket disconnected with code: ${code}`);
      this.isConnected = false;
      this.handleReconnect();
    });

    this.client.on("error", (error: any) => {
      console.error("WebSocket error:", error);
    });

    // Handle incoming messages
    this.client.on("ledgerClosed", (ledger: any) => {
      this.notifyHandlers("ledger", ledger);
    });

    this.client.on("transaction", (tx: any) => {
      this.notifyHandlers("transaction", tx);
    });

    this.client.on("validationReceived", (validation: any) => {
      this.notifyHandlers("validation", validation);
    });

    this.client.on("consensusPhase", (consensus: any) => {
      this.notifyHandlers("consensus", consensus);
    });

    this.client.on("peerStatusChange", (status: any) => {
      this.notifyHandlers("peerStatus", status);
    });

    this.client.on("bookChanges", (changes: any) => {
      this.notifyHandlers("bookChanges", changes);
    });
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 30000);
    
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    setTimeout(async () => {
      try {
        await this.connect();
      } catch (error) {
        console.error("Reconnection failed:", error);
        this.handleReconnect();
      }
    }, delay);
  }

  private async resubscribeAll(): Promise<void> {
    if (this.activeSubscriptions.streams?.length || 
        this.activeSubscriptions.accounts?.length ||
        this.activeSubscriptions.accounts_proposed?.length ||
        this.activeSubscriptions.books?.length) {
      
      try {
        await this.subscribe(this.activeSubscriptions);
        console.log("Resubscribed to all active subscriptions");
      } catch (error) {
        console.error("Failed to resubscribe:", error);
      }
    }
  }

  private notifyHandlers(type: string, message: any): void {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error(`Error in message handler for ${type}:`, error);
        }
      });
    }
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }

  /**
   * Subscribe to XRPL streams, accounts, and order books
   */
  async subscribe(config: SubscriptionConfig): Promise<void> {
    await this.connect();

    const request: any = {
      command: "subscribe"
    };

    if (config.streams && config.streams.length > 0) {
      request.streams = config.streams;
      this.activeSubscriptions.streams = [
        ...(this.activeSubscriptions.streams || []),
        ...config.streams
      ];
    }

    if (config.accounts && config.accounts.length > 0) {
      request.accounts = config.accounts;
      this.activeSubscriptions.accounts = [
        ...(this.activeSubscriptions.accounts || []),
        ...config.accounts
      ];
    }

    if (config.accounts_proposed && config.accounts_proposed.length > 0) {
      request.accounts_proposed = config.accounts_proposed;
      this.activeSubscriptions.accounts_proposed = [
        ...(this.activeSubscriptions.accounts_proposed || []),
        ...config.accounts_proposed
      ];
    }

    if (config.books && config.books.length > 0) {
      request.books = config.books;
      this.activeSubscriptions.books = [
        ...(this.activeSubscriptions.books || []),
        ...config.books
      ];
    }

    try {
      const response = await this.client.request(request);
      console.log("Subscription successful:", response);
    } catch (error: any) {
      console.error("Subscription failed:", error);
      throw error;
    }
  }

  /**
   * Unsubscribe from XRPL streams, accounts, and order books
   */
  async unsubscribe(config: SubscriptionConfig): Promise<void> {
    if (!this.isConnected) {
      throw new Error("WebSocket not connected");
    }

    const request: any = {
      command: "unsubscribe"
    };

    if (config.streams && config.streams.length > 0) {
      request.streams = config.streams;
      this.activeSubscriptions.streams = this.activeSubscriptions.streams?.filter(
        s => !config.streams!.includes(s)
      );
    }

    if (config.accounts && config.accounts.length > 0) {
      request.accounts = config.accounts;
      this.activeSubscriptions.accounts = this.activeSubscriptions.accounts?.filter(
        a => !config.accounts!.includes(a)
      );
    }

    if (config.accounts_proposed && config.accounts_proposed.length > 0) {
      request.accounts_proposed = config.accounts_proposed;
      this.activeSubscriptions.accounts_proposed = this.activeSubscriptions.accounts_proposed?.filter(
        a => !config.accounts_proposed!.includes(a)
      );
    }

    if (config.books && config.books.length > 0) {
      request.books = config.books;
      // Remove matching books
      this.activeSubscriptions.books = this.activeSubscriptions.books?.filter(
        book => !config.books!.some(b => 
          b.taker_gets.currency === book.taker_gets.currency &&
          b.taker_pays.currency === book.taker_pays.currency
        )
      );
    }

    try {
      const response = await this.client.request(request);
      console.log("Unsubscription successful:", response);
    } catch (error: any) {
      console.error("Unsubscription failed:", error);
      throw error;
    }
  }

  /**
   * Register a message handler for specific message types
   */
  on(type: string, handler: MessageHandler): void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);
  }

  /**
   * Remove a message handler
   */
  off(type: string, handler: MessageHandler): void {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.messageHandlers.delete(type);
      }
    }
  }

  /**
   * Get current connection status
   */
  getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    activeSubscriptions: SubscriptionConfig;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      activeSubscriptions: this.activeSubscriptions
    };
  }

  /**
   * Clear all subscriptions
   */
  async clearAllSubscriptions(): Promise<void> {
    if (this.activeSubscriptions.streams?.length ||
        this.activeSubscriptions.accounts?.length ||
        this.activeSubscriptions.accounts_proposed?.length ||
        this.activeSubscriptions.books?.length) {
      
      await this.unsubscribe(this.activeSubscriptions);
      this.activeSubscriptions = {
        streams: [],
        accounts: [],
        accounts_proposed: [],
        books: []
      };
    }
  }
}

export default WebSocketManager;

