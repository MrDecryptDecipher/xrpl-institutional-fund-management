declare module 'ws' {
  export default class WebSocket {
    static readonly CONNECTING: number;
    static readonly OPEN: number;
    static readonly CLOSING: number;
    static readonly CLOSED: number;
    
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
    
    readonly url: string;
    readonly readyState: number;
    readonly bufferedAmount: number;
    readonly extensions: string;
    readonly protocol: string;
    
    onopen: ((event: WebSocket.Event) => void) | null;
    onerror: ((event: WebSocket.ErrorEvent) => void) | null;
    onclose: ((event: WebSocket.CloseEvent) => void) | null;
    onmessage: ((event: WebSocket.MessageEvent) => void) | null;
    
    binaryType: string;
    
    constructor(address: string | URL, options?: WebSocket.ClientOptions);
    constructor(address: string | URL, protocols?: string | string[], options?: WebSocket.ClientOptions);
    
    close(code?: number, data?: string): void;
    send(data: any, cb?: (err?: Error) => void): void;
    send(data: any, options: { compress?: boolean; binary?: boolean; mask?: boolean; fin?: boolean }, cb?: (err?: Error) => void): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    terminate(): void;
    
    on(event: 'open', cb: (this: WebSocket) => void): this;
    on(event: 'error', cb: (this: WebSocket, err: Error) => void): this;
    on(event: 'close', cb: (this: WebSocket, code: number, reason: Buffer) => void): this;
    on(event: 'message', cb: (this: WebSocket, data: WebSocket.Data) => void): this;
    on(event: 'ping' | 'pong', cb: (this: WebSocket, data: Buffer) => void): this;
    on(event: 'unexpected-response', cb: (this: WebSocket, request: any, response: any) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
    
    addListener(event: 'open', cb: (this: WebSocket) => void): this;
    addListener(event: 'error', cb: (this: WebSocket, err: Error) => void): this;
    addListener(event: 'close', cb: (this: WebSocket, code: number, reason: Buffer) => void): this;
    addListener(event: 'message', cb: (this: WebSocket, data: WebSocket.Data) => void): this;
    addListener(event: 'ping' | 'pong', cb: (this: WebSocket, data: Buffer) => void): this;
    addListener(event: 'unexpected-response', cb: (this: WebSocket, request: any, response: any) => void): this;
    addListener(event: string, listener: (...args: any[]) => void): this;
    
    removeListener(event: 'open', cb: (this: WebSocket) => void): this;
    removeListener(event: 'error', cb: (this: WebSocket, err: Error) => void): this;
    removeListener(event: 'close', cb: (this: WebSocket, code: number, reason: Buffer) => void): this;
    removeListener(event: 'message', cb: (this: WebSocket, data: WebSocket.Data) => void): this;
    removeListener(event: 'ping' | 'pong', cb: (this: WebSocket, data: Buffer) => void): this;
    removeListener(event: 'unexpected-response', cb: (this: WebSocket, request: any, response: any) => void): this;
    removeListener(event: string, listener: (...args: any[]) => void): this;
  }
  
  namespace WebSocket {
    function createWebSocketStream(websocket: WebSocket, options?: DuplexOptions): Duplex;
    
    interface ClientOptions {
      protocol?: string;
      followRedirects?: boolean;
      handshakeTimeout?: number;
      maxRedirects?: number;
      perMessageDeflate?: boolean | PerMessageDeflateOptions;
      localAddress?: string;
      protocolVersion?: number;
      origin?: string;
      headers?: { [key: string]: string };
      rejectUnauthorized?: boolean;
      maxPayload?: number;
    }
    
    interface PerMessageDeflateOptions {
      serverNoContextTakeover?: boolean;
      clientNoContextTakeover?: boolean;
      serverMaxWindowBits?: number;
      clientMaxWindowBits?: number;
      zlibDeflateOptions?: {
        chunkSize?: number;
        windowBits?: number;
        level?: number;
        memLevel?: number;
        strategy?: number;
        dictionary?: Buffer | Buffer[] | DataView;
      };
      zlibInflateOptions?: {
        chunkSize?: number;
        windowBits?: number;
        level?: number;
        memLevel?: number;
        strategy?: number;
        dictionary?: Buffer | Buffer[] | DataView;
      };
    }
    
    interface Event {
      type: string;
      target: WebSocket;
    }
    
    interface ErrorEvent {
      error: any;
      message: string;
      type: string;
      target: WebSocket;
    }
    
    interface CloseEvent {
      wasClean: boolean;
      code: number;
      reason: string;
      type: string;
      target: WebSocket;
    }
    
    interface MessageEvent {
      data: Data;
      type: string;
      target: WebSocket;
    }
    
    type Data = string | Buffer | ArrayBuffer | Buffer[];
    
    interface DuplexOptions {
      allowHalfOpen?: boolean;
      readableObjectMode?: boolean;
      writableObjectMode?: boolean;
      readableHighWaterMark?: number;
      writableHighWaterMark?: number;
      read?(this: Duplex, size: number): void;
      write?(this: Duplex, chunk: any, encoding: string, callback: (error?: Error | null) => void): void;
      writev?(this: Duplex, chunks: Array<{ chunk: any, encoding: string }>, callback: (error?: Error | null) => void): void;
      final?(this: Duplex, callback: (error?: Error | null) => void): void;
      destroy?(this: Duplex, error: Error | null, callback: (error: Error | null) => void): void;
      readableObjectMode?: boolean;
      writableObjectMode?: boolean;
    }
    
    interface Duplex extends NodeJS.ReadWriteStream {
      closed: boolean;
      destroyed: boolean;
      readable: boolean;
      writable: boolean;
      
      end(): void;
      end(chunk: any, cb?: () => void): void;
      end(chunk: any, encoding?: string, cb?: () => void): void;
      
      cork(): void;
      uncork(): void;
      
      write(chunk: any, cb?: (error: Error | null | undefined) => void): boolean;
      write(chunk: any, encoding: string, cb?: (error: Error | null | undefined) => void): boolean;
    }
  }
  
  export = WebSocket;
}