"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet, Transaction } from "xrpl";
import CryptoJS from "crypto-js";

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

/**
 * Real-time Audit Logging and Compliance Reporting
 * Following PRD specifications for immutable audit trails
 * All fund operations, compliance checks, and admin changes logged on-chain
 */

export const createAuditLog = action({
  args: {
    auditorSeed: v.string(),
    logEntry: v.object({
      eventType: v.union(
        v.literal("fund_creation"),
        v.literal("investor_subscription"),
        v.literal("investor_redemption"),
        v.literal("compliance_check"),
        v.literal("nav_update"),
        v.literal("asset_allocation"),
        v.literal("key_rotation"),
        v.literal("policy_change"),
        v.literal("suspicious_activity"),
        v.literal("regulatory_report")
      ),
      fundId: v.optional(v.string()),
      actorAccount: v.string(),
      targetAccount: v.optional(v.string()),
      eventData: v.object({
        description: v.string(),
        amount: v.optional(v.string()),
        assetIds: v.optional(v.array(v.string())),
        complianceFlags: v.optional(v.array(v.string())),
        riskScore: v.optional(v.number()),
        metadata: v.optional(v.record(v.string(), v.any()))
      }),
      severity: v.union(
        v.literal("INFO"),
        v.literal("WARNING"),
        v.literal("ERROR"),
        v.literal("CRITICAL")
      ),
      jurisdiction: v.optional(v.string())
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const auditorWallet = Wallet.fromSeed(args.auditorSeed);
      
      // Create unique audit log entry with timestamp and hash
      const auditEntry = {
        ...args.logEntry,
        timestamp: new Date().toISOString(),
        auditor: auditorWallet.address,
        logId: CryptoJS.SHA256(
          JSON.stringify(args.logEntry) + Date.now().toString()
        ).toString().substring(0, 16).toUpperCase()
      };
      
      // Create immutable audit log transaction on XRPL
      const auditLogTx = {
        TransactionType: "Payment",
        Account: auditorWallet.address,
        Destination: auditorWallet.address,
        Amount: "1", // Minimal amount for audit anchoring
        Memos: [{
          Memo: {
            MemoType: Buffer.from('AuditLog', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify(auditEntry), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(auditLogTx as any);
      const signed = auditorWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Audit log creation failed");
      }
      
      return {
        success: true,
        auditLogId: auditEntry.logId,
        eventType: args.logEntry.eventType,
        severity: args.logEntry.severity,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        timestamp: auditEntry.timestamp,
        network: network
      };
      
    } catch (error) {
      console.error("Audit log creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audit log creation failed"
      };
    }
  }
});

export const generateComplianceReport = action({
  args: {
    auditorSeed: v.string(),
    reportParameters: v.object({
      fundId: v.optional(v.string()),
      startDate: v.string(),
      endDate: v.string(),
      eventTypes: v.array(v.string())
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const auditorWallet = Wallet.fromSeed(args.auditorSeed);
      
      // Create compliance report
      const reportData = {
        reportId: CryptoJS.SHA256(
          JSON.stringify(args.reportParameters) + Date.now().toString()
        ).toString().substring(0, 16).toUpperCase(),
        parameters: args.reportParameters,
        generatedBy: auditorWallet.address,
        generatedAt: new Date().toISOString()
      };
      
      // Store report on XRPL
      const reportTx = {
        TransactionType: "Payment",
        Account: auditorWallet.address,
        Destination: auditorWallet.address,
        Amount: "1",
        Memos: [{
          Memo: {
            MemoType: Buffer.from('ComplianceReport', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify(reportData), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(reportTx as any);
      const signed = auditorWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Report creation failed");
      }
      
      return {
        success: true,
        reportId: reportData.reportId,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        network: network
      };
      
    } catch (error) {
      console.error("Report generation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Report generation failed"
      };
    }
  }
});"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet, Transaction } from "xrpl";
import CryptoJS from "crypto-js";

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

/**
 * Real-time Audit Logging and Compliance Reporting
 * Following PRD specifications for immutable audit trails
 * All fund operations, compliance checks, and admin changes logged on-chain
 */

export const createAuditLog = action({
  args: {
    auditorSeed: v.string(),
    logEntry: v.object({
      eventType: v.union(
        v.literal("fund_creation"),
        v.literal("investor_subscription"),
        v.literal("investor_redemption"),
        v.literal("compliance_check"),
        v.literal("nav_update"),
        v.literal("asset_allocation"),
        v.literal("key_rotation"),
        v.literal("policy_change"),
        v.literal("suspicious_activity"),
        v.literal("regulatory_report")
      ),
      fundId: v.optional(v.string()),
      actorAccount: v.string(),
      targetAccount: v.optional(v.string()),
      eventData: v.object({
        description: v.string(),
        amount: v.optional(v.string()),
        assetIds: v.optional(v.array(v.string())),
        complianceFlags: v.optional(v.array(v.string())),
        riskScore: v.optional(v.number()),
        metadata: v.optional(v.record(v.string(), v.any()))
      }),
      severity: v.union(
        v.literal("INFO"),
        v.literal("WARNING"),
        v.literal("ERROR"),
        v.literal("CRITICAL")
      ),
      jurisdiction: v.optional(v.string())
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const auditorWallet = Wallet.fromSeed(args.auditorSeed);
      
      // Create unique audit log entry with timestamp and hash
      const auditEntry = {
        ...args.logEntry,
        timestamp: new Date().toISOString(),
        auditor: auditorWallet.address,
        logId: CryptoJS.SHA256(
          JSON.stringify(args.logEntry) + Date.now().toString()
        ).toString().substring(0, 16).toUpperCase()
      };
      
      // Create immutable audit log transaction on XRPL
      const auditLogTx = {
        TransactionType: "Payment",
        Account: auditorWallet.address,
        Destination: auditorWallet.address,
        Amount: "1", // Minimal amount for audit anchoring
        Memos: [{
          Memo: {
            MemoType: Buffer.from('AuditLog', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify(auditEntry), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(auditLogTx as any);
      const signed = auditorWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Audit log creation failed");
      }
      
      return {
        success: true,
        auditLogId: auditEntry.logId,
        eventType: args.logEntry.eventType,
        severity: args.logEntry.severity,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        timestamp: auditEntry.timestamp,
        network: network
      };
      
    } catch (error) {
      console.error("Audit log creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Audit log creation failed"
      };
    }
  }
});

export const generateComplianceReport = action({
  args: {
    auditorSeed: v.string(),
    reportParameters: v.object({
      fundId: v.optional(v.string()),
      startDate: v.string(),
      endDate: v.string(),
      eventTypes: v.array(v.string())
    }),
    network: v.optional(v.union(
      v.literal("testnet"),
      v.literal("mainnet"),
      v.literal("devnet")
    ))
  },
  handler: async (ctx, args) => {
    try {
      const network = args.network || "testnet";
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const auditorWallet = Wallet.fromSeed(args.auditorSeed);
      
      // Create compliance report
      const reportData = {
        reportId: CryptoJS.SHA256(
          JSON.stringify(args.reportParameters) + Date.now().toString()
        ).toString().substring(0, 16).toUpperCase(),
        parameters: args.reportParameters,
        generatedBy: auditorWallet.address,
        generatedAt: new Date().toISOString()
      };
      
      // Store report on XRPL
      const reportTx = {
        TransactionType: "Payment",
        Account: auditorWallet.address,
        Destination: auditorWallet.address,
        Amount: "1",
        Memos: [{
          Memo: {
            MemoType: Buffer.from('ComplianceReport', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify(reportData), 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(reportTx as any);
      const signed = auditorWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      if (!result.result.validated) {
        throw new Error("Report creation failed");
      }
      
      return {
        success: true,
        reportId: reportData.reportId,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        network: network
      };
      
    } catch (error) {
      console.error("Report generation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Report generation failed"
      };
    }
  }
});