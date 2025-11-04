/// <reference types="vite/client" />

// Add Buffer to Window interface for browser environment
interface Window {
  Buffer: typeof import('buffer').Buffer;
}
