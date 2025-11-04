import axios from 'axios';

/**
 * XRP Faucets Implementation
 * 
 * This module provides functionality for interacting with XRP Ledger testnet faucets
 * as specified in the XRPL documentation.
 */

export interface FaucetNetwork {
  name: string;
  description: string;
  faucetUrl: string;
  explorerUrl: string;
  websocketUrl: string;
  jsonRpcUrl: string;
}

export interface FaucetAccount {
  account: {
    xAddress: string;
    classicAddress: string;
    secret: string;
  };
  balance: number;
  sequence: number;
}

export interface FaucetResponse {
  success: boolean;
  account?: FaucetAccount;
  error?: string;
}

/**
 * XRP Faucets Manager
 * 
 * This class provides methods for interacting with XRP Ledger testnet faucets.
 */
export class XRPFaucets {
  private networks: FaucetNetwork[];
  
  constructor() {
    this.networks = [
      {
        name: 'Testnet',
        description: 'Parallel XRP Ledger test network for testing changes',
        faucetUrl: 'https://faucet.altnet.rippletest.net/accounts',
        explorerUrl: 'https://testnet.xrpl.org',
        websocketUrl: 'wss://s.altnet.rippletest.net:51233',
        jsonRpcUrl: 'https://s.altnet.rippletest.net:51234'
      },
      {
        name: 'Devnet',
        description: 'Development network for testing changes to the XRP Ledger',
        faucetUrl: 'https://faucet.devnet.rippletest.net/accounts',
        explorerUrl: 'https://devnet.xrpl.org',
        websocketUrl: 'wss://s.devnet.rippletest.net:51233',
        jsonRpcUrl: 'https://s.devnet.rippletest.net:51234'
      }
    ];
  }
  
  /**
   * Get available faucet networks
   * 
   * @returns Array of available faucet networks
   */
  getNetworks(): FaucetNetwork[] {
    return this.networks;
  }
  
  /**
   * Get a specific network by name
   * 
   * @param name - The network name
   * @returns The faucet network or undefined if not found
   */
  getNetwork(name: string): FaucetNetwork | undefined {
    return this.networks.find(network => network.name.toLowerCase() === name.toLowerCase());
  }
  
  /**
   * Generate a new account with XRP from the faucet
   * 
   * @param networkName - The network name (Testnet or Devnet)
   * @returns Promise that resolves with faucet response
   */
  async generateAccount(networkName: string = 'Testnet'): Promise<FaucetResponse> {
    try {
      const network = this.getNetwork(networkName);
      if (!network) {
        return {
          success: false,
          error: `Network ${networkName} not found`
        };
      }
      
      console.log(`Generating account on ${networkName}...`);
      
      // Make request to faucet
      const response = await axios.post(network.faucetUrl, {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });
      
      if (response.status === 200 && response.data) {
        // Parse the response
        const accountData = response.data;
        
        return {
          success: true,
          account: {
            account: {
              xAddress: accountData.account.xAddress,
              classicAddress: accountData.account.classicAddress,
              secret: accountData.account.secret
            },
            balance: accountData.balance,
            sequence: accountData.sequence
          }
        };
      } else {
        return {
          success: false,
          error: `Faucet request failed with status ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate account: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Top up an existing account with XRP from the faucet
   * 
   * @param address - The account address to top up
   * @param networkName - The network name (Testnet or Devnet)
   * @returns Promise that resolves with faucet response
   */
  async topUpAccount(address: string, networkName: string = 'Testnet'): Promise<FaucetResponse> {
    try {
      const network = this.getNetwork(networkName);
      if (!network) {
        return {
          success: false,
          error: `Network ${networkName} not found`
        };
      }
      
      console.log(`Topping up account ${address} on ${networkName}...`);
      
      // Make request to faucet with address
      const response = await axios.post(network.faucetUrl, {
        address: address
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });
      
      if (response.status === 200 && response.data) {
        // Parse the response
        const accountData = response.data;
        
        return {
          success: true,
          account: {
            account: {
              xAddress: accountData.account?.xAddress || '',
              classicAddress: accountData.account?.classicAddress || address,
              secret: accountData.account?.secret || ''
            },
            balance: accountData.balance,
            sequence: accountData.sequence
          }
        };
      } else {
        return {
          success: false,
          error: `Faucet request failed with status ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to top up account: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Get faucet status
   * 
   * @param networkName - The network name (Testnet or Devnet)
   * @returns Promise that resolves with faucet status
   */
  async getFaucetStatus(networkName: string = 'Testnet'): Promise<any> {
    try {
      const network = this.getNetwork(networkName);
      if (!network) {
        throw new Error(`Network ${networkName} not found`);
      }
      
      // Try to get faucet info
      const response = await axios.get(network.faucetUrl, {
        timeout: 10000 // 10 second timeout
      });
      
      return {
        network: networkName,
        status: 'available',
        url: network.faucetUrl,
        response: response.status
      };
    } catch (error) {
      return {
        network: networkName,
        status: 'unavailable',
        url: network?.faucetUrl || '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Get network information
   * 
   * @param networkName - The network name
   * @returns Network information
   */
  getNetworkInfo(networkName: string): any {
    const network = this.getNetwork(networkName);
    if (!network) {
      return null;
    }
    
    return {
      name: network.name,
      description: network.description,
      explorer: network.explorerUrl,
      websocket: network.websocketUrl,
      jsonRpc: network.jsonRpcUrl,
      faucet: network.faucetUrl
    };
  }
}

/**
 * Create a new XRP Faucets instance
 * 
 * @returns A new XRP Faucets instance
 */
export function createXRPFaucets(): XRPFaucets {
  return new XRPFaucets();
}

/**
 * Generate a sample faucet account for testing
 * 
 * @returns Sample faucet account
 */
export function generateSampleFaucetAccount(): FaucetAccount {
  return {
    account: {
      xAddress: 'T7wkHQa8f9fXyUEa3sJszi9we7m67N3d4d6rji4kBa4yWJ3TP',
      classicAddress: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
      secret: 'ss06ravRnGY3E551ThXGDTKgCqbC3'
    },
    balance: 1000000000, // 1000 XRP in drops
    sequence: 1
  };
}