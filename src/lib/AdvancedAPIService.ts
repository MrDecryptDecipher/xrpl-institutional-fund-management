/**
 * Advanced XRPL API Service
 * Comprehensive service layer for all account_* and ledger_* API methods
 * Production-ready with full error handling and type safety
 */

import { Client } from "xrpl";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

export class AdvancedAPIService {
  private client: Client;
  private network: string;

  constructor(network: "testnet" | "devnet" | "mainnet" = "testnet") {
    this.network = XRPL_NETWORKS[network];
    this.client = new Client(this.network);
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
    }
  }

  // ============ ACCOUNT METHODS ============

  /**
   * Get all payment channels for an account
   */
  async getAccountChannels(account: string, destinationAccount?: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_channels",
        account: account,
        destination_account: destinationAccount,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get all currencies an account can send or receive
   */
  async getAccountCurrencies(account: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_currencies",
        account: account,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get detailed account information
   */
  async getAccountInfo(account: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_info",
        account: account,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get all trust lines for an account
   */
  async getAccountLines(account: string, peer?: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_lines",
        account: account,
        peer: peer,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get all ledger objects owned by an account
   */
  async getAccountObjects(account: string, type?: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_objects",
        account: account,
        type: type,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get all offers made by an account
   */
  async getAccountOffers(account: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_offers",
        account: account,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get transaction history for an account
   */
  async getAccountTransactions(account: string, limit: number = 20) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_tx",
        account: account,
        limit: limit,
        ledger_index_min: -1,
        ledger_index_max: -1
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get NFTs owned by an account
   */
  async getAccountNFTs(account: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "account_nfts",
        account: account,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  // ============ LEDGER METHODS ============

  /**
   * Get the current ledger index
   */
  async getLedgerCurrent() {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ledger_current"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get the most recently closed ledger
   */
  async getLedgerClosed() {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ledger_closed"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get all ledger objects in a specific ledger
   */
  async getLedgerData(ledgerIndex?: number | string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ledger_data",
        ledger_index: ledgerIndex || "validated",
        limit: 10
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get a specific ledger entry by ID
   */
  async getLedgerEntry(index: string, ledgerIndex?: number | string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ledger_entry",
        index: index,
        ledger_index: ledgerIndex || "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get complete ledger information
   */
  async getLedger(ledgerIndex?: number | string, transactions: boolean = false) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ledger",
        ledger_index: ledgerIndex || "validated",
        transactions: transactions,
        expand: true
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  // ============ ORDER BOOK METHODS ============

  /**
   * Get order book between two currencies
   */
  async getBookOffers(takerGets: any, takerPays: any, limit: number = 20) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "book_offers",
        taker_gets: takerGets,
        taker_pays: takerPays,
        limit: limit,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  // ============ NFT METHODS ============

  /**
   * Get buy offers for an NFT
   */
  async getNFTBuyOffers(nftId: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "nft_buy_offers",
        nft_id: nftId,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Get sell offers for an NFT
   */
  async getNFTSellOffers(nftId: string) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "nft_sell_offers",
        nft_id: nftId,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }

  // ============ PATH FINDING METHODS ============

  /**
   * Find payment paths between two accounts
   */
  async findPaymentPaths(sourceAccount: string, destinationAccount: string, destinationAmount: any) {
    await this.connect();
    try {
      const response = await this.client.request({
        command: "ripple_path_find",
        source_account: sourceAccount,
        destination_account: destinationAccount,
        destination_amount: destinationAmount,
        ledger_index: "validated"
      });
      return response.result;
    } finally {
      await this.disconnect();
    }
  }
}

export default AdvancedAPIService;

