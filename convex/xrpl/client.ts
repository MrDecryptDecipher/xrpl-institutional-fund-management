"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet, xrpToDrops, dropsToXrp, Transaction, TxResponse } from "xrpl";
import { XRPLNetworkError, XRPLAccountError, XRPLTransactionError } from "./types/errors";

// XRPL Network Configuration - Updated per September 2025 standards
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233/",
  mainnet: "wss://xrplcluster.com/",
  devnet: "wss://s.devnet.rippletest.net:51233/"
} as const;

export const initializeXRPLClient = action({
  args: {
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
    try {
      const client = new Client(XRPL_NETWORKS[network]);
      
      // Connect using latest standards - async/await pattern as per September 2025 docs
      await client.connect();
      console.log(`Connected to ${network.toUpperCase()}`);
      
      const serverInfo = await client.request({
        command: "server_info"
      });
      
      // Always disconnect after operations per best practices
      await client.disconnect();
      console.log('Disconnected from XRPL');
      
      return {
        success: true,
        network: network,
        serverInfo: {
          ledgerIndex: serverInfo.result.info.validated_ledger?.seq,
          networkId: serverInfo.result.info.network_id,
          serverVersion: serverInfo.result.info.build_version,
          networkID: serverInfo.result.info.network_id
        }
      };
    } catch (error) {
      console.error("XRPL connection failed:", error);
      throw new XRPLNetworkError(
        error instanceof Error ? error.message : "XRPL connection failed",
        network,
        XRPL_NETWORKS[network]
      );
    }
  }
});

export const createXRPLAccount = action({
  args: {
    fundWallet: v.optional(v.boolean()),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
      
      // Generate wallet using latest standards
      const wallet = Wallet.generate();
      console.log(`Wallet generated: ${wallet.address}`);
      
      // For testnet, fund the wallet using official pattern
      if (network === "testnet" && (args.fundWallet !== false)) {
        const client = new Client(XRPL_NETWORKS[network]);
        await client.connect();
        console.log("Connected to Testnet");
        
        try {
          console.log("Funding wallet with Testnet XRP...");
          const fundResult = await client.fundWallet(wallet);
          console.log(`Funded wallet with ${fundResult.balance} XRP`);
        } catch (fundError) {
          console.warn("Wallet funding failed, continuing with unfunded wallet:", fundError);
        }
        
        await client.disconnect();
        console.log("Disconnected from Testnet");
      }
      
      return {
        success: true,
        account: {
          address: wallet.address,
          publicKey: wallet.publicKey,
          privateKey: wallet.privateKey,
          seed: wallet.seed
        },
        network: network,
        explorerUrl: network === "testnet" 
          ? `https://testnet.xrpl.org/accounts/${wallet.address}`
          : `https://livenet.xrpl.org/accounts/${wallet.address}`
      };
    } catch (error) {
      console.error("Account creation failed:", error);
      throw new XRPLAccountError(
        error instanceof Error ? error.message : "Account creation failed",
        undefined
      );
    }
  }
});

export const getAccountInfo = action({
  args: {
    address: v.string(),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      console.log(`Connected to ${network.toUpperCase()}`);
      
      console.log("Getting account info...");
      const accountInfo = await client.request({
        command: "account_info",
        account: args.address,
        ledger_index: "validated"
      });
      
      const accountLines = await client.request({
        command: "account_lines",
        account: args.address,
        ledger_index: "validated"
      });
      
      await client.disconnect();
      console.log("Disconnected from XRPL");
      
      return {
        success: true,
        accountInfo: {
          address: accountInfo.result.account_data.Account,
          balance: dropsToXrp(accountInfo.result.account_data.Balance),
          sequence: accountInfo.result.account_data.Sequence,
          ownerCount: accountInfo.result.account_data.OwnerCount,
          previousTxnID: accountInfo.result.account_data.PreviousTxnID,
          flags: accountInfo.result.account_data.Flags
        },
        trustLines: accountLines.result.lines,
        ledgerIndex: accountInfo.result.ledger_index,
        validated: accountInfo.result.validated
      };
    } catch (error) {
      console.error("Failed to get account info:", error);
      throw new XRPLAccountError(
        error instanceof Error ? error.message : "Failed to get account info",
        args.address
      );
    }
  }
});

export const submitTransaction = action({
  args: {
    transaction: v.object({
      TransactionType: v.string(),
      Account: v.string(),
      Destination: v.optional(v.string()),
      Amount: v.optional(v.union(v.string(), v.object({
        currency: v.string(),
        value: v.string(),
        issuer: v.string()
      }))),
      Fee: v.optional(v.string()),
      Sequence: v.optional(v.number()),
      LastLedgerSequence: v.optional(v.number())
    }),
    privateKey: v.string(),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      console.log(`Connected to ${network.toUpperCase()}`);
      
      // Create wallet from seed - following latest standards
      const wallet = Wallet.fromSeed(args.privateKey);
      
      // Use autofill to prepare transaction - official pattern
      console.log("Preparing transaction...");
      const prepared = await client.autofill(args.transaction as any);
      
      // Sign transaction
      console.log("Signing transaction...");
      const signed = wallet.sign(prepared);
      
      // Submit and wait for validation - official best practice
      console.log("Submitting and waiting for validation...");
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      console.log("Disconnected from XRPL");
      
      if (!result.result.validated) {
        throw new XRPLTransactionError(
          `Transaction failed validation: ${(result.result.meta as any)?.TransactionResult}`,
          result.result.hash,
          "VALIDATION_FAILED"
        );
      }
      
      return {
        success: true,
        result: {
          hash: result.result.hash,
          ledgerIndex: result.result.ledger_index,
          validated: result.result.validated,
          meta: result.result.meta,
          fee: (result.result as any).Fee,
          sequence: (result.result as any).Sequence
        }
      };
    } catch (error) {
      console.error("Transaction submission failed:", error);
      throw new XRPLTransactionError(
        error instanceof Error ? error.message : "Transaction failed",
        undefined,
        "SUBMISSION_ERROR"
      );
    }
  }
});

export const getTransactionHistory = action({
  args: {
    address: v.string(),
    limit: v.optional(v.number()),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      console.log(`Connected to ${network.toUpperCase()}`);
      
      console.log("Getting transaction history...");
      const transactions = await client.request({
        command: "account_tx",
        account: args.address,
        limit: args.limit || 20,
        ledger_index_min: -1,
        ledger_index_max: -1
      });
      
      await client.disconnect();
      console.log("Disconnected from XRPL");
      
      return {
        success: true,
        transactions: transactions.result.transactions,
        account: args.address,
        marker: transactions.result.marker
      };
    } catch (error) {
      console.error("Failed to get transaction history:", error);
      throw new XRPLAccountError(
        error instanceof Error ? error.message : "Failed to get transaction history",
        args.address
      );
    }
  }
});
