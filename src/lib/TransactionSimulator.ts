/**
 * Transaction Simulation Service
 * Pre-flight validation using XRPL simulate API
 * Production-ready with comprehensive error handling
 */

import { Client } from "xrpl";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

export interface SimulationResult {
  success: boolean;
  engineResult: string;
  engineResultCode: number;
  engineResultMessage: string;
  ledgerIndex?: number;
  meta?: any;
  txJson?: any;
  estimatedFee?: string;
}

export class TransactionSimulator {
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

  /**
   * Simulate a transaction without submitting it to the network
   * @param txJson - Unsigned transaction JSON
   * @param binary - Return binary format (default: false)
   */
  async simulate(txJson: any, binary: boolean = false): Promise<SimulationResult> {
    await this.connect();

    try {
      // Ensure transaction is unsigned
      const unsignedTx = { ...txJson };
      delete unsignedTx.TxnSignature;
      delete unsignedTx.Signers;
      
      // Make sure SigningPubKey is empty for simulation
      if (!unsignedTx.SigningPubKey) {
        unsignedTx.SigningPubKey = "";
      }

      const response = await this.client.request({
        command: "simulate",
        tx_json: unsignedTx,
        binary: binary
      });

      const result: SimulationResult = {
        success: response.result.engine_result === "tesSUCCESS",
        engineResult: response.result.engine_result || "unknown",
        engineResultCode: response.result.engine_result_code || -1,
        engineResultMessage: response.result.engine_result_message || "Unknown error",
        ledgerIndex: response.result.ledger_index,
        meta: response.result.meta,
        txJson: response.result.tx_json,
        estimatedFee: response.result.tx_json?.Fee
      };

      return result;

    } catch (error: any) {
      return {
        success: false,
        engineResult: "tefFAILURE",
        engineResultCode: -1,
        engineResultMessage: error.message || "Simulation failed"
      };
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Validate transaction before submission
   * Returns detailed validation results
   */
  async validateTransaction(txJson: any): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
    simulation?: SimulationResult;
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    if (!txJson.TransactionType) {
      errors.push("Missing TransactionType");
    }

    if (!txJson.Account) {
      errors.push("Missing Account field");
    }

    // Simulate transaction
    let simulation: SimulationResult | undefined;
    try {
      simulation = await this.simulate(txJson);
      
      if (!simulation.success) {
        errors.push(`Simulation failed: ${simulation.engineResultMessage}`);
      }

      // Check for warnings
      if (simulation.engineResult?.startsWith("tec")) {
        warnings.push(`Transaction would be included in ledger but would fail: ${simulation.engineResultMessage}`);
      }

    } catch (error: any) {
      errors.push(`Simulation error: ${error.message}`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      simulation
    };
  }

  /**
   * Estimate transaction cost
   */
  async estimateCost(txJson: any): Promise<{
    estimatedFee: string;
    reserveRequirement?: string;
    totalCost: string;
  }> {
    const simulation = await this.simulate(txJson);

    const estimatedFee = simulation.estimatedFee || "12";
    const reserveRequirement = this.calculateReserveRequirement(txJson);
    const totalCost = (parseInt(estimatedFee) + parseInt(reserveRequirement || "0")).toString();

    return {
      estimatedFee,
      reserveRequirement,
      totalCost
    };
  }

  /**
   * Calculate reserve requirement for transaction
   */
  private calculateReserveRequirement(txJson: any): string | undefined {
    // Base reserve: 10 XRP (10,000,000 drops)
    // Owner reserve: 2 XRP (2,000,000 drops) per object
    
    const baseReserve = 10000000;
    const ownerReserve = 2000000;

    switch (txJson.TransactionType) {
      case "AccountSet":
        return undefined; // No reserve change
      
      case "TrustSet":
        return ownerReserve.toString(); // +1 trust line
      
      case "OfferCreate":
        return ownerReserve.toString(); // +1 offer
      
      case "SignerListSet":
        if (txJson.SignerQuorum === 0) {
          return undefined; // Deleting signer list
        }
        return ownerReserve.toString(); // +1 signer list
      
      case "TicketCreate":
        const ticketCount = txJson.TicketCount || 0;
        return (ownerReserve * ticketCount).toString();
      
      case "PaymentChannelCreate":
        return ownerReserve.toString(); // +1 payment channel
      
      case "EscrowCreate":
        return ownerReserve.toString(); // +1 escrow
      
      case "NFTokenMint":
        return ownerReserve.toString(); // +1 NFT page (approximate)
      
      default:
        return undefined;
    }
  }

  /**
   * Batch simulate multiple transactions
   */
  async simulateBatch(transactions: any[]): Promise<SimulationResult[]> {
    const results: SimulationResult[] = [];

    for (const tx of transactions) {
      const result = await this.simulate(tx);
      results.push(result);
    }

    return results;
  }

  /**
   * Check if transaction would succeed
   */
  async wouldSucceed(txJson: any): Promise<boolean> {
    const simulation = await this.simulate(txJson);
    return simulation.success;
  }

  /**
   * Get detailed simulation report
   */
  async getDetailedReport(txJson: any): Promise<string> {
    const simulation = await this.simulate(txJson);
    const cost = await this.estimateCost(txJson);

    let report = `Transaction Simulation Report\n`;
    report += `================================\n\n`;
    report += `Transaction Type: ${txJson.TransactionType}\n`;
    report += `Account: ${txJson.Account}\n\n`;
    report += `Simulation Result:\n`;
    report += `  Status: ${simulation.success ? "SUCCESS" : "FAILURE"}\n`;
    report += `  Engine Result: ${simulation.engineResult}\n`;
    report += `  Result Code: ${simulation.engineResultCode}\n`;
    report += `  Message: ${simulation.engineResultMessage}\n\n`;
    report += `Cost Estimation:\n`;
    report += `  Transaction Fee: ${cost.estimatedFee} drops\n`;
    if (cost.reserveRequirement) {
      report += `  Reserve Requirement: ${cost.reserveRequirement} drops\n`;
    }
    report += `  Total Cost: ${cost.totalCost} drops\n\n`;

    if (simulation.meta) {
      report += `Metadata Available: Yes\n`;
      report += `Ledger Index: ${simulation.ledgerIndex}\n`;
    }

    return report;
  }
}

export default TransactionSimulator;

