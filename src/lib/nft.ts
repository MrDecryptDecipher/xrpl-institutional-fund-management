/**
 * NFT (NFToken) Implementation
 * 
 * This module provides functionality for creating and managing NFToken transactions
 * as specified in the XRPL documentation.
 */

import { Client, Wallet } from 'xrpl';

export interface NFTConfig {
  server: string;
  network?: 'Testnet' | 'Devnet' | 'Mainnet';
}

export interface NFTokenMintParams {
  nftokenTaxon: number;
  issuer?: string;
  transferFee?: number;
  uri?: string;
  flags?: number;
}

export interface NFTokenCreateOfferParams {
  nftokenId: string;
  amount: string | { currency: string; value: string; issuer: string };
  owner?: string;
  expiration?: number;
  destination?: string;
}

export interface NFTokenAcceptOfferParams {
  nftokenBuyOffer?: string;
  nftokenSellOffer?: string;
  nftokenBrokerFee?: string | { currency: string; value: string; issuer: string };
}

export interface NFTokenCancelOfferParams {
  nftokenOffers: string[];
}

export interface NFTokenBurnParams {
  nftokenId: string;
  owner?: string;
}

export interface NFTokenModifyParams {
  nftokenId: string;
  issuer: string;
  transferFee?: number;
  flags?: number;
}

export interface NFTResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * NFT Manager
 * 
 * This class provides methods for creating and managing NFToken transactions.
 */
export class NFT {
  private client: Client;
  private config: NFTConfig;
  
  constructor(config: NFTConfig) {
    this.config = config;
    this.client = new Client(config.server);
  }
  
  /**
   * Connect to the XRPL server
   * 
   * @returns Promise that resolves when connected
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log(`Connected to XRPL server: ${this.config.server}`);
    } catch (error) {
      throw new Error(`Failed to connect to XRPL server: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Disconnect from the XRPL server
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      console.log('Disconnected from XRPL server');
    } catch (error) {
      console.error(`Error disconnecting from XRPL server: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  /**
   * Mint an NFToken
   * 
   * @param wallet - The minter's wallet
   * @param params - NFToken mint parameters
   * @returns Promise that resolves with transaction result
   */
  async mintNFToken(
    wallet: Wallet,
    params: NFTokenMintParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenMint',
        Account: wallet.classicAddress,
        NFTokenTaxon: params.nftokenTaxon
      };
      
      // Add optional parameters
      if (params.issuer !== undefined) transaction.Issuer = params.issuer;
      if (params.transferFee !== undefined) transaction.TransferFee = params.transferFee;
      if (params.uri !== undefined) transaction.URI = params.uri;
      if (params.flags !== undefined) transaction.Flags = params.flags;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to mint NFToken: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Create an NFToken offer
   * 
   * @param wallet - The offer creator's wallet
   * @param params - NFToken offer creation parameters
   * @returns Promise that resolves with transaction result
   */
  async createNFTokenOffer(
    wallet: Wallet,
    params: NFTokenCreateOfferParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenCreateOffer',
        Account: wallet.classicAddress,
        NFTokenID: params.nftokenId,
        Amount: params.amount
      };
      
      // Add optional parameters
      if (params.owner !== undefined) transaction.Owner = params.owner;
      if (params.expiration !== undefined) transaction.Expiration = params.expiration;
      if (params.destination !== undefined) transaction.Destination = params.destination;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create NFToken offer: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Accept an NFToken offer
   * 
   * @param wallet - The offer accepter's wallet
   * @param params - NFToken offer acceptance parameters
   * @returns Promise that resolves with transaction result
   */
  async acceptNFTokenOffer(
    wallet: Wallet,
    params: NFTokenAcceptOfferParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenAcceptOffer',
        Account: wallet.classicAddress
      };
      
      // Add optional parameters
      if (params.nftokenBuyOffer !== undefined) transaction.NFTokenBuyOffer = params.nftokenBuyOffer;
      if (params.nftokenSellOffer !== undefined) transaction.NFTokenSellOffer = params.nftokenSellOffer;
      if (params.nftokenBrokerFee !== undefined) transaction.NFTokenBrokerFee = params.nftokenBrokerFee;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to accept NFToken offer: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Cancel an NFToken offer
   * 
   * @param wallet - The offer canceller's wallet
   * @param params - NFToken offer cancellation parameters
   * @returns Promise that resolves with transaction result
   */
  async cancelNFTokenOffer(
    wallet: Wallet,
    params: NFTokenCancelOfferParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenCancelOffer',
        Account: wallet.classicAddress,
        NFTokenOffers: params.nftokenOffers
      };
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to cancel NFToken offer: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Burn an NFToken
   * 
   * @param wallet - The burner's wallet
   * @param params - NFToken burn parameters
   * @returns Promise that resolves with transaction result
   */
  async burnNFToken(
    wallet: Wallet,
    params: NFTokenBurnParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenBurn',
        Account: wallet.classicAddress,
        NFTokenID: params.nftokenId
      };
      
      // Add optional parameter
      if (params.owner !== undefined) transaction.Owner = params.owner;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to burn NFToken: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Modify an NFToken
   * 
   * @param wallet - The modifier's wallet
   * @param params - NFToken modify parameters
   * @returns Promise that resolves with transaction result
   */
  async modifyNFToken(
    wallet: Wallet,
    params: NFTokenModifyParams
  ): Promise<NFTResult> {
    try {
      const transaction: any = {
        TransactionType: 'NFTokenModify',
        Account: wallet.classicAddress,
        NFTokenID: params.nftokenId,
        Issuer: params.issuer
      };
      
      // Add optional parameters
      if (params.transferFee !== undefined) transaction.TransferFee = params.transferFee;
      if (params.flags !== undefined) transaction.Flags = params.flags;
      
      const result = await this.client.submitAndWait(transaction, { wallet });
      
      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to modify NFToken: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}