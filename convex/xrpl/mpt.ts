import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from 'xrpl';

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

export const authorizeMPT = internalAction({
  args: {
    accountSeed: v.string(),
    mptIssuanceId: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    transactionHash: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Create MPT authorization transaction
        const authTx = {
          "TransactionType": "MPTokenAuthorize",
          "Account": wallet.address,
          "MPTokenIssuanceID": args.mptIssuanceId,
        };

        const prepared = await client.autofill(authTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          return {
            success: true,
            transactionHash: result.result.hash
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const sendMPT = internalAction({
  args: {
    accountSeed: v.string(),
    mptIssuanceId: v.string(),
    amount: v.string(),
    destination: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    transactionHash: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Create MPT payment transaction
        const sendTx = {
          "TransactionType": "Payment",
          "Account": wallet.address,
          "Amount": {
            "mpt_issuance_id": args.mptIssuanceId,
            "value": args.amount,
          },
          "Destination": args.destination,
        };

        const prepared = await client.autofill(sendTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          return {
            success: true,
            transactionHash: result.result.hash
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const getMPTs = internalAction({
  args: {
    accountSeed: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    mpts: v.optional(v.array(v.any())),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.accountSeed);

        // Get MPT objects for the account
        const mpts = await client.request({
          command: "account_objects",
          account: wallet.address,
          ledger_index: "validated",
          type: "mptoken"
        });

        await client.disconnect();

        return {
          success: true,
          mpts: mpts.result.account_objects
        };
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});