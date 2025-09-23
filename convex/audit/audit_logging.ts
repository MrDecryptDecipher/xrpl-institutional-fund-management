"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from "xrpl";
import CryptoJS from "crypto-js";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com", 
  devnet: "wss://s.devnet.rippletest.net:51233"
};

export const createInstitutionalAuditLog = action({
  args: {
    auditorSeed: v.string(),
    auditData: v.any(),
    network: v.string()
  },
  handler: async (ctx: any, args: any) => {
    try {
      const network = args.network || "testnet";
      const networkUrl = XRPL_NETWORKS[network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet;
      const client = new Client(networkUrl);
      await client.connect();
      
      const auditorWallet = Wallet.fromSeed(args.auditorSeed);
      
      const auditEntry = {
        auditId: `AUDIT_${CryptoJS.SHA256(JSON.stringify(args) + Date.now()).toString().substring(0, 16).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        auditor: auditorWallet.address,
        eventType: args.auditData.eventType || "GENERAL_AUDIT",
        fundId: args.auditData.fundId,
        severity: args.auditData.severity || "MEDIUM"
      };
      
      const auditLogTx = {
        TransactionType: "Payment",
        Account: auditorWallet.address,
        Destination: auditorWallet.address,
        Amount: "100",
        Memos: [{
          Memo: {
            MemoType: Buffer.from('InstitutionalAuditLog', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify(auditEntry), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(auditLogTx as any);
      const signed = auditorWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      return {
        success: true,
        auditId: auditEntry.auditId,
        txHash: result.result.hash,
        network: network
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audit log creation failed"
      };
    }
  }
});