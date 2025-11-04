/**
 * WebSocket API Tool Implementation
 * 
 * This module provides functionality for the WebSocket API tool that allows
 * interaction with the XRPL WebSocket API as specified in the XRPL documentation.
 */

// Type definitions for WebSocket
interface WebSocketEventMap {
  "close": CloseEvent;
  "error": Event;
  "message": MessageEvent;
  "open": Event;
}

interface WebSocket extends EventTarget {
  binaryType: BinaryType;
  readonly bufferedAmount: number;
  readonly extensions: string;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror: ((this: WebSocket, ev: Event) => any) | null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen: ((this: WebSocket, ev: Event) => any) | null;
  readonly protocol: string;
  readonly readyState: number;
  readonly url: string;
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
  addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare const WebSocket: {
  prototype: WebSocket;
  new(url: string | URL, protocols?: string | string[]): WebSocket;
  readonly CLOSED: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly OPEN: number;
};

export interface WebSocketConfig {
  server: string;
  port?: number;
  secure?: boolean;
}

export interface WebSocketRequest {
  id: number;
  command: string;
  [key: string]: any;
}

export interface WebSocketResponse {
  id: number;
  status: string;
  type: string;
  result?: any;
  error?: string;
  error_message?: string;
  warning?: string;
}

/**
 * WebSocket API Tool
 * 
 * This class provides methods for interacting with the XRPL WebSocket API.
 */
export class WebSocketTool {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private requestId: number = 1;
  private pendingRequests: Map<number, { resolve: Function, reject: Function }> = new Map();
  
  constructor(config: WebSocketConfig) {
    this.config = config;
  }
  
  /**
   * Connect to the WebSocket server
   * 
   * @returns Promise that resolves when connected
   */
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const protocol = this.config.secure ? 'wss' : 'ws';
      const port = this.config.port || (this.config.secure ? 51233 : 51232);
      const url = `${protocol}://${this.config.server}:${port}`;
      
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log(`Connected to WebSocket server at ${url}`);
        resolve();
      };
      
      this.ws.onerror = (error: Event) => {
        console.error(`WebSocket connection error`);
        reject(new Error('WebSocket connection error'));
      };
      
      this.ws.onmessage = (event: MessageEvent) => {
        this.handleMessage(event.data.toString());
      };
      
      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        this.ws = null;
      };
    });
  }
  
  /**
   * Disconnect from the WebSocket server
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  
  /**
   * Send a request to the WebSocket server
   * 
   * @param command - The command to send
   * @param params - Additional parameters for the command
   * @returns Promise that resolves with the response
   */
  async sendRequest(command: string, params: Record<string, any> = {}): Promise<WebSocketResponse> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    
    const requestId = this.requestId++;
    const request: WebSocketRequest = {
      id: requestId,
      command: command,
      ...params
    };
    
    return new Promise((resolve, reject) => {
      // Store the resolve and reject functions for later use
      this.pendingRequests.set(requestId, { resolve, reject });
      
      // Send the request
      this.ws!.send(JSON.stringify(request));
      
      // Set a timeout for the request
      setTimeout(() => {
        if (this.pendingRequests.has(requestId)) {
          this.pendingRequests.delete(requestId);
          reject(new Error(`Request ${requestId} timed out`));
        }
      }, 10000); // 10 second timeout
    });
  }
  
  /**
   * Handle incoming WebSocket messages
   * 
   * @param message - The incoming message
   */
  private handleMessage(message: string): void {
    try {
      const response: WebSocketResponse = JSON.parse(message);
      
      // Check if this is a response to a pending request
      if (response.id && this.pendingRequests.has(response.id)) {
        const { resolve, reject } = this.pendingRequests.get(response.id)!;
        this.pendingRequests.delete(response.id);
        
        if (response.status === 'error') {
          reject(new Error(response.error_message || response.error || 'Unknown error'));
        } else {
          resolve(response);
        }
      } else if (response.type) {
        // This is a subscription message
        console.log(`Subscription message: ${response.type}`);
        // Handle subscription messages as needed
      }
    } catch (error) {
      console.error(`Error parsing WebSocket message: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Subscribe to account changes
   * 
   * @param account - The account to subscribe to
   * @returns Promise that resolves with the subscription response
   */
  async subscribeAccount(account: string): Promise<WebSocketResponse> {
    return this.sendRequest('subscribe', {
      accounts: [account]
    });
  }
  
  /**
   * Subscribe to ledger changes
   * 
   * @returns Promise that resolves with the subscription response
   */
  async subscribeLedger(): Promise<WebSocketResponse> {
    return this.sendRequest('subscribe', {
      streams: ['ledger']
    });
  }
  
  /**
   * Unsubscribe from account changes
   * 
   * @param account - The account to unsubscribe from
   * @returns Promise that resolves with the unsubscribe response
   */
  async unsubscribeAccount(account: string): Promise<WebSocketResponse> {
    return this.sendRequest('unsubscribe', {
      accounts: [account]
    });
  }
  
  /**
   * Unsubscribe from ledger changes
   * 
   * @returns Promise that resolves with the unsubscribe response
   */
  async unsubscribeLedger(): Promise<WebSocketResponse> {
    return this.sendRequest('unsubscribe', {
      streams: ['ledger']
    });
  }
  
  /**
   * Get account information via WebSocket
   * 
   * @param account - The account address
   * @param ledgerIndex - The ledger index (optional)
   * @returns Promise that resolves with account information
   */
  async getAccountInfo(account: string, ledgerIndex?: number | string): Promise<WebSocketResponse> {
    const params: any = { account: account };
    
    if (ledgerIndex !== undefined) {
      params.ledger_index = ledgerIndex;
    }
    
    return this.sendRequest('account_info', params);
  }
  
  /**
   * Get server information
   * 
   * @returns Promise that resolves with server information
   */
  async getServerInfo(): Promise<WebSocketResponse> {
    return this.sendRequest('server_info');
  }
  
  /**
   * Get ledger information
   * 
   * @param ledgerIndex - The ledger index or identifier
   * @returns Promise that resolves with ledger information
   */
  async getLedger(ledgerIndex?: number | string): Promise<WebSocketResponse> {
    const params: any = {};
    
    if (ledgerIndex !== undefined) {
      params.ledger_index = ledgerIndex;
    }
    
    return this.sendRequest('ledger', params);
  }
  
  /**
   * Get transaction information
   * 
   * @param transaction - The transaction hash
   * @returns Promise that resolves with transaction information
   */
  async getTransaction(transaction: string): Promise<WebSocketResponse> {
    return this.sendRequest('tx', { transaction: transaction });
  }
  
  /**
   * Submit a transaction
   * 
   * @param txBlob - The transaction blob
   * @returns Promise that resolves with submission result
   */
  async submitTransaction(txBlob: string): Promise<WebSocketResponse> {
    return this.sendRequest('submit', { tx_blob: txBlob });
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
  ): Promise<WebSocketResponse> {
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
    
    return this.sendRequest('account_tx', params);
  }
  
  /**
   * Ping the server
   * 
   * @returns Promise that resolves with ping response
   */
  async ping(): Promise<WebSocketResponse> {
    return this.sendRequest('ping');
  }
  
  /**
   * Check if connected to WebSocket server
   * 
   * @returns True if connected, false otherwise
   */
  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

/**
 * Create a new WebSocket Tool instance
 * 
 * @param config - Configuration for the WebSocket connection
 * @returns A new WebSocket Tool instance
 */
export function createWebSocketTool(config: WebSocketConfig): WebSocketTool {
  return new WebSocketTool(config);
}