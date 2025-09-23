"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from "xrpl";
import CryptoJS from "crypto-js";
import { XRPLDIDError } from "./types/errors";

// XRPL Network Configuration - Updated per September 2025 standards
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233/",
  mainnet: "wss://xrplcluster.com/",
  devnet: "wss://s.devnet.rippletest.net:51233/"
} as const;

// Define reusable type schemas to avoid deep instantiation
const DIDPublicKeySchema = v.object({
  id: v.string(),
  type: v.string(),
  controller: v.string(),
  publicKeyHex: v.string()
});

const DIDServiceSchema = v.object({
  id: v.string(),
  type: v.string(),
  serviceEndpoint: v.string()
});

const DIDDocumentSchema = v.object({
  id: v.string(),
  publicKey: v.array(DIDPublicKeySchema),
  authentication: v.array(v.string()),
  service: v.optional(v.array(DIDServiceSchema))
});

const NetworkSchema = v.optional(v.union(
  v.literal("testnet"),
  v.literal("mainnet"),
  v.literal("devnet")
));

/**
 * Real XRPL DID implementation using XLS-40 specifications
 * Implements W3C Decentralized Identifiers (DIDs) on XRPL
 * As required by the PRD for institutional-grade identity management
 */
export const createDID = action({
  args: {
    ownerPrivateKey: v.string(),
    didDocument: DIDDocumentSchema,
    uri: v.optional(v.string()),
    network: NetworkSchema
  },
  handler: async (ctx, args) => {
    try {
      const network = (args.network || "testnet") as keyof typeof XRPL_NETWORKS;
      const client = new Client(XRPL_NETWORKS[network]);
      await client.connect();
      
      const wallet = Wallet.fromSeed(args.ownerPrivateKey);
      
      // Prepare DIDSet transaction per XLS-40
      const didDocument = JSON.stringify(args.didDocument);
      const documentBuffer = Buffer.from(didDocument, 'utf8');
      
      if (documentBuffer.length > 1024) {
        throw new XRPLDIDError('DID document exceeds 1024 byte limit');
      }
      
      // Use proper XRPL transaction typing
      const didSetTransaction = {
        TransactionType: "DIDSet" as const,
        Account: wallet.address,
        DIDDocument: documentBuffer.toString('hex').toUpperCase(),
        ...(args.uri && { URI: Buffer.from(args.uri, 'utf8').toString('hex').toUpperCase() })
      };
      
      const prepared = await client.autofill(didSetTransaction as any);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      // Check if transaction was successful (validated means it succeeded)
      if (!result.result.validated) {
        throw new XRPLDIDError(
          `DID creation failed: Transaction not validated`,
          args.didDocument.id
        );
      }
      
      const documentHash = CryptoJS.SHA256(didDocument).toString();
      
      return {
        success: true,
        didId: args.didDocument.id,
        documentHash: documentHash,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        account: wallet.address,
        result: {
          Account: wallet.address,
          TransactionType: "DIDSet",
          DIDDocument: documentBuffer.toString('hex').toUpperCase(),
          hash: result.result.hash,
          meta: result.result.meta
        }
      };
    } catch (error) {
      console.error("DID creation failed:", error);
      if (error instanceof XRPLDIDError) {
        throw error;
      }
      throw new XRPLDIDError(
        error instanceof Error ? error.message : "DID creation failed",
        args.didDocument.id
      );
    }
  }
});

export const updateDID = action({
  args: {
    ownerPrivateKey: v.string(),
    didDocument: v.object({
      id: v.string(),
      publicKey: v.array(v.object({
        id: v.string(),
        type: v.string(),
        controller: v.string(),
        publicKeyHex: v.string()
      })),
      authentication: v.array(v.string()),
      service: v.optional(v.array(v.object({
        id: v.string(),
        type: v.string(),
        serviceEndpoint: v.string()
      })))
    }),
    uri: v.optional(v.string()),
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
      
      const wallet = Wallet.fromSeed(args.ownerPrivateKey);
      
      // Prepare DIDSet transaction for update (same as create in XRPL)
      const didDocument = JSON.stringify(args.didDocument);
      const documentBuffer = Buffer.from(didDocument, 'utf8');
      
      if (documentBuffer.length > 1024) {
        throw new XRPLDIDError('DID document exceeds 1024 byte limit');
      }
      
      const didSetTransaction = {
        TransactionType: "DIDSet" as const,
        Account: wallet.address,
        DIDDocument: documentBuffer.toString('hex').toUpperCase(),
        ...(args.uri && { URI: Buffer.from(args.uri, 'utf8').toString('hex').toUpperCase() })
      };
      
      const prepared = await client.autofill(didSetTransaction as any);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      // Check if transaction was successful
      if (!result.result.validated) {
        throw new XRPLDIDError(
          `DID update failed: Transaction not validated`,
          args.didDocument.id
        );
      }
      
      const documentHash = CryptoJS.SHA256(didDocument).toString();
      
      return {
        success: true,
        didId: args.didDocument.id,
        documentHash: documentHash,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        result: {
          Account: wallet.address,
          TransactionType: "DIDSet",
          hash: result.result.hash,
          meta: result.result.meta
        }
      };
    } catch (error) {
      console.error("DID update failed:", error);
      if (error instanceof XRPLDIDError) {
        throw error;
      }
      throw new XRPLDIDError(
        error instanceof Error ? error.message : "DID update failed",
        args.didDocument.id
      );
    }
  }
});

export const getDID = action({
  args: {
    account: v.string(),
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
      
      // Get DID object from XRPL ledger
      const didInfo = await client.request({
        command: "ledger_entry",
        did: args.account,
        ledger_index: "validated"
      });
      
      await client.disconnect();
      
      if (!didInfo.result.node) {
        throw new XRPLDIDError(`DID not found for account: ${args.account}`, `did:xrpl:${args.account}`);
      }
      
      const didData = didInfo.result.node as any;
      let didDocument = null;
      
      if (didData.DIDDocument) {
        try {
          const documentHex = didData.DIDDocument;
          const documentBuffer = Buffer.from(documentHex, 'hex');
          didDocument = JSON.parse(documentBuffer.toString('utf8'));
        } catch (parseError) {
          console.warn("Failed to parse DID document:", parseError);
        }
      }
      
      return {
        success: true,
        didId: `did:xrpl:${args.account}`,
        didDocument: didDocument || {
          id: `did:xrpl:${args.account}`,
          publicKey: [],
          authentication: [],
          service: []
        },
        account: args.account,
        flags: didData.Flags,
        ownerNode: didData.OwnerNode,
        previousTxnID: didData.PreviousTxnID
      };
    } catch (error) {
      console.error("Failed to get DID:", error);
      if (error instanceof XRPLDIDError) {
        throw error;
      }
      throw new XRPLDIDError(
        error instanceof Error ? error.message : "Failed to get DID",
        `did:xrpl:${args.account}`
      );
    }
  }
});

/**
 * Issue a W3C Verifiable Credential on XRPL
 * Stores credential as memo in Payment transaction for institutional compliance
 */
export const issueCredential = action({
  args: {
    issuerPrivateKey: v.string(),
    subjectDid: v.string(),
    credentialType: v.string(),
    claims: v.object({
      kyc: v.optional(v.object({
        verified: v.boolean(),
        level: v.string(),
        verificationDate: v.number()
      })),
      aml: v.optional(v.object({
        cleared: v.boolean(),
        riskLevel: v.string(),
        checkDate: v.number()
      })),
      accreditation: v.optional(v.object({
        status: v.string(),
        jurisdiction: v.string(),
        validUntil: v.number()
      }))
    }),
    expiryDate: v.optional(v.number()),
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
      
      const issuerWallet = Wallet.fromSeed(args.issuerPrivateKey);
      
      // Create W3C Verifiable Credential
      const credential = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", args.credentialType],
        issuer: `did:xrpl:${issuerWallet.address}`,
        subject: args.subjectDid,
        issuanceDate: new Date().toISOString(),
        ...(args.expiryDate && { expirationDate: new Date(args.expiryDate).toISOString() }),
        credentialSubject: {
          id: args.subjectDid,
          ...args.claims
        }
      };
      
      const credentialJson = JSON.stringify(credential);
      const credentialHash = CryptoJS.SHA256(credentialJson).toString();
      
      // Store credential as XRPL Payment transaction with memo (institutional audit trail)
      const credentialTransaction = {
        TransactionType: "Payment" as const,
        Account: issuerWallet.address,
        Destination: args.subjectDid.replace('did:xrpl:', ''), // Extract XRPL address from DID
        Amount: "1", // Minimal amount for credential anchoring
        Memos: [{
          Memo: {
            MemoType: Buffer.from('VerifiableCredential', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(credentialJson, 'utf8').toString('hex').toUpperCase(),
            MemoFormat: Buffer.from('application/json', 'utf8').toString('hex').toUpperCase()
          }
        }]
      };
      
      const prepared = await client.autofill(credentialTransaction as any);
      const signed = issuerWallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      await client.disconnect();
      
      // Check if transaction was successful
      if (!result.result.validated) {
        throw new XRPLDIDError(
          `Credential issuance failed: Transaction not validated`
        );
      }
      
      return {
        success: true,
        credential: credential,
        credentialHash: credentialHash,
        txHash: result.result.hash,
        ledgerIndex: result.result.ledger_index,
        issuer: issuerWallet.address,
        result: {
          Account: issuerWallet.address,
          TransactionType: "Payment",
          hash: result.result.hash,
          meta: result.result.meta
        }
      };
    } catch (error) {
      console.error("Credential issuance failed:", error);
      if (error instanceof XRPLDIDError) {
        throw error;
      }
      throw new XRPLDIDError(
        error instanceof Error ? error.message : "Credential issuance failed"
      );
    }
  }
});