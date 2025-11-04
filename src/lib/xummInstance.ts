/**
 * Shared Xumm SDK Instance
 * 
 * This module provides a single, shared instance of the Xumm SDK
 * to prevent multiple instances from being created across the application.
 * 
 * IMPORTANT: Only ONE Xumm instance should exist in the entire application.
 */

import { Xumm } from 'xumm';

// Get API key from environment
const apiKey = import.meta.env.VITE_XUMM_API_KEY;

if (!apiKey) {
  console.error('VITE_XUMM_API_KEY is not defined in environment variables');
}

// Create single shared instance
let xummInstance: Xumm | null = null;

/**
 * Get the shared Xumm instance
 * Creates the instance on first call, returns existing instance on subsequent calls
 */
export function getXummInstance(): Xumm {
  if (!xummInstance) {
    if (!apiKey) {
      throw new Error('VITE_XUMM_API_KEY is not defined. Please check your .env file.');
    }

    console.log('Creating shared Xumm instance with API key:', apiKey.substring(0, 8) + '...');

    try {
      xummInstance = new Xumm(apiKey);
      console.log('Xumm instance created successfully');

      // Set up global event listeners
      xummInstance.on('ready', () => {
        console.log('Xumm SDK ready');
      });

      xummInstance.on('error', (error: any) => {
        console.error('Xumm SDK error:', error);
      });

      xummInstance.on('success', () => {
        console.log('Xumm authorization successful');
      });

      xummInstance.on('logout', () => {
        console.log('User logged out from Xaman');
      });
    } catch (error) {
      console.error('Failed to create Xumm instance:', error);
      throw new Error(`Failed to initialize Xaman SDK: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return xummInstance;
}

/**
 * Reset the Xumm instance (for testing purposes only)
 */
export function resetXummInstance(): void {
  xummInstance = null;
}

// Export the instance getter as default
export default getXummInstance;

