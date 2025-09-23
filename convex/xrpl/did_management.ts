import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Decentralized Identity (DID) Management (XLS-40)
// W3C DID compliant implementation with XRPL anchoring

export const createDIDDocument = action({
  args: {
    userId: v.optional(v.id("users")),
    investorId: v.optional(v.id("investors")),
    xrplAccount: v.string(),
    network: v.string(),
    verificationMethods: v.array(v.object({
      id: v.string(),
      type: v.string(),
      controller: v.string(),
      publicKeyMultibase: v.string()
    })),
    services: v.array(v.object({
      id: v.string(),
      type: v.string(),
      serviceEndpoint: v.string()
    })),
    credentials: v.array(v.object({
      type: v.array(v.string()),
      issuer: v.string(),
      issuanceDate: v.string(),
      expirationDate: v.optional(v.string()),
      credentialSubject: v.object({
        id: v.string(),
        type: v.string(),
        claims: v.record(v.string(), v.string())
      }),
      proof: v.object({
        type: v.string(),
        created: v.string(),
        verificationMethod: v.string(),
        proofPurpose: v.string(),
        jws: v.string()
      })
    }))
  },
  handler: async (ctx, args) => {
    try {
      // Generate DID
      const did = `did:xrpl:${args.network}:${args.xrplAccount}`;
      
      // Create W3C compliant DID document
      const didDocument = {
        "@context": [
          "https://www.w3.org/ns/did/v1",
          "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        id: did,
        verificationMethod: args.verificationMethods.map(vm => ({
          ...vm,
          controller: did
        })),
        authentication: args.verificationMethods.map(vm => vm.id),
        assertionMethod: args.verificationMethods.map(vm => vm.id),
        service: args.services
      };

      // Create anchor transaction on XRPL
      const anchorHash = Buffer.from(JSON.stringify(didDocument)).toString('sha256');
      
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: args.xrplAccount,
        destination: args.xrplAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            did,
            documentHash: anchorHash,
            action: "did_create",
            version: 1
          })).toString('hex').toUpperCase(),
          type: Buffer.from("did_document").toString('hex').toUpperCase(),
          format: Buffer.from("application/json").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`DID anchoring failed: ${txResult.error}`);
      }

      // Store DID document
      await ctx.runMutation(api.xrpl.did_management.storeDIDDocument, {
        did,
        userId: args.userId,
        investorId: args.investorId,
        document: didDocument,
        verifiableCredentials: args.credentials,
        xrplAccount: args.xrplAccount,
        anchorLedger: txResult.ledgerIndex,
        anchorHash: txResult.hash,
        status: "active",
        version: 1
      });

      return {
        success: true,
        did,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        document: didDocument
      };
    } catch (error) {
      console.error("DID creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "DID creation failed"
      };
    }
  }
});

export const storeDIDDocument = mutation({
  args: {
    did: v.string(),
    userId: v.optional(v.id("users")),
    investorId: v.optional(v.id("investors")),
    document: v.object({
      context: v.array(v.string()),
      id: v.string(),
      verificationMethod: v.array(v.object({
        id: v.string(),
        type: v.string(),
        controller: v.string(),
        publicKeyMultibase: v.string()
      })),
      authentication: v.array(v.string()),
      assertionMethod: v.array(v.string()),
      service: v.array(v.object({
        id: v.string(),
        type: v.string(),
        serviceEndpoint: v.string()
      }))
    }),
    verifiableCredentials: v.array(v.object({
      id: v.string(),
      type: v.array(v.string()),
      issuer: v.string(),
      issuanceDate: v.string(),
      expirationDate: v.optional(v.string()),
      credentialSubject: v.object({
        id: v.string(),
        type: v.string(),
        claims: v.record(v.string(), v.string())
      }),
      proof: v.object({
        type: v.string(),
        created: v.string(),
        verificationMethod: v.string(),
        proofPurpose: v.string(),
        jws: v.string()
      })
    })),
    xrplAccount: v.string(),
    anchorLedger: v.number(),
    anchorHash: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("revoked"),
      v.literal("expired")
    ),
    version: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("didDocuments", {
      did: args.did,
      userId: args.userId,
      investorId: args.investorId,
      document: args.document,
      verifiableCredentials: args.verifiableCredentials.map(cred => ({
        ...cred,
        id: cred.id || `${args.did}#credential-${Date.now()}`
      })),
      xrplAccount: args.xrplAccount,
      anchorLedger: args.anchorLedger,
      anchorHash: args.anchorHash,
      status: args.status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: args.version
    });
  }
});

export const addVerifiableCredential = action({
  args: {
    did: v.string(),
    credential: v.object({
      type: v.array(v.string()),
      issuer: v.string(),
      issuanceDate: v.string(),
      expirationDate: v.optional(v.string()),
      credentialSubject: v.object({
        id: v.string(),
        type: v.string(),
        claims: v.record(v.string(), v.string())
      }),
      proof: v.object({
        type: v.string(),
        created: v.string(),
        verificationMethod: v.string(),
        proofPurpose: v.string(),
        jws: v.string()
      })
    }),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const didDoc = await ctx.db
        .query("didDocuments")
        .filter(q => q.eq(q.field("did"), args.did))
        .unique();

      if (!didDoc) {
        throw new Error("DID document not found");
      }

      // Generate credential ID
      const credentialId = `${args.did}#credential-${Date.now()}`;
      const credentialWithId = {
        ...args.credential,
        id: credentialId
      };

      // Create credential addition transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: didDoc.xrplAccount,
        destination: didDoc.xrplAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            did: args.did,
            action: "credential_add",
            credentialId,
            credentialType: args.credential.type,
            issuer: args.credential.issuer
          })).toString('hex').toUpperCase(),
          type: Buffer.from("credential_update").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Credential addition failed: ${txResult.error}`);
      }

      // Update DID document
      const updatedCredentials = [...didDoc.verifiableCredentials, credentialWithId];
      
      await ctx.db.patch(didDoc._id, {
        verifiableCredentials: updatedCredentials,
        updatedAt: Date.now(),
        version: didDoc.version + 1
      });

      return {
        success: true,
        credentialId,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Credential addition failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Credential addition failed"
      };
    }
  }
});

export const revokeVerifiableCredential = action({
  args: {
    did: v.string(),
    credentialId: v.string(),
    network: v.string(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const didDoc = await ctx.db
        .query("didDocuments")
        .filter(q => q.eq(q.field("did"), args.did))
        .unique();

      if (!didDoc) {
        throw new Error("DID document not found");
      }

      // Create credential revocation transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: didDoc.xrplAccount,
        destination: didDoc.xrplAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            did: args.did,
            action: "credential_revoke",
            credentialId: args.credentialId,
            reason: args.reason,
            revokedAt: new Date().toISOString()
          })).toString('hex').toUpperCase(),
          type: Buffer.from("credential_revocation").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Credential revocation failed: ${txResult.error}`);
      }

      // Remove credential from DID document
      const updatedCredentials = didDoc.verifiableCredentials.filter(
        cred => cred.id !== args.credentialId
      );
      
      await ctx.db.patch(didDoc._id, {
        verifiableCredentials: updatedCredentials,
        updatedAt: Date.now(),
        version: didDoc.version + 1
      });

      // Log revocation event
      await ctx.runMutation(api.xrpl.did_management.logCredentialRevocation, {
        did: args.did,
        credentialId: args.credentialId,
        reason: args.reason,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Credential revocation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Credential revocation failed"
      };
    }
  }
});

export const logCredentialRevocation = mutation({
  args: {
    did: v.string(),
    credentialId: v.string(),
    reason: v.string(),
    txHash: v.string(),
    ledgerIndex: v.number()
  },
  handler: async (ctx, args) => {
    const eventId = `credential_revocation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return await ctx.db.insert("auditLogs", {
      eventId,
      eventType: "credential_revocation",
      entityType: "didDocument",
      entityId: args.did,
      action: "revoke_credential",
      actor: "system",
      timestamp: Date.now(),
      changes: {
        credentialId: args.credentialId,
        reason: args.reason
      },
      xrplTxHash: args.txHash,
      xrplLedgerIndex: args.ledgerIndex,
      complianceRules: ["credential_management"],
      jurisdictions: [],
      hash: Buffer.from(`${eventId}_${args.txHash}_${Date.now()}`).toString('hex')
    });
  }
});

export const verifyCredential = query({
  args: {
    credentialId: v.string(),
    issuerDid: v.string()
  },
  handler: async (ctx, args) => {
    // Find the credential in any DID document
    const didDocs = await ctx.db.query("didDocuments").collect();
    
    let credential = null;
    let holderDid = null;
    
    for (const doc of didDocs) {
      const foundCredential = doc.verifiableCredentials.find(
        cred => cred.id === args.credentialId
      );
      if (foundCredential) {
        credential = foundCredential;
        holderDid = doc.did;
        break;
      }
    }

    if (!credential) {
      return {
        valid: false,
        reason: "Credential not found"
      };
    }

    // Verify issuer
    if (credential.issuer !== args.issuerDid) {
      return {
        valid: false,
        reason: "Issuer mismatch"
      };
    }

    // Check expiration
    if (credential.expirationDate) {
      const expiryDate = new Date(credential.expirationDate);
      if (expiryDate < new Date()) {
        return {
          valid: false,
          reason: "Credential expired"
        };
      }
    }

    // Verify proof (simplified - in production, verify cryptographic signature)
    if (!credential.proof || !credential.proof.jws) {
      return {
        valid: false,
        reason: "Invalid or missing proof"
      };
    }

    return {
      valid: true,
      credential,
      holderDid,
      verifiedAt: Date.now()
    };
  }
});

export const getDIDDocument = query({
  args: {
    did: v.string()
  },
  handler: async (ctx, args) => {
    const didDoc = await ctx.db
      .query("didDocuments")
      .filter(q => q.eq(q.field("did"), args.did))
      .unique();

    if (!didDoc) {
      return null;
    }

    return {
      ...didDoc.document,
      verifiableCredentials: didDoc.verifiableCredentials,
      status: didDoc.status,
      version: didDoc.version,
      createdAt: didDoc.createdAt,
      updatedAt: didDoc.updatedAt
    };
  }
});

export const resolveDID = query({
  args: {
    did: v.string()
  },
  handler: async (ctx, args) => {
    const didDoc = await ctx.db
      .query("didDocuments")
      .filter(q => q.eq(q.field("did"), args.did))
      .unique();

    if (!didDoc || didDoc.status !== "active") {
      return {
        didDocument: null,
        didResolutionMetadata: {
          error: didDoc ? "deactivated" : "notFound",
          errorMessage: didDoc ? "DID document is deactivated" : "DID not found"
        },
        didDocumentMetadata: {}
      };
    }

    return {
      didDocument: didDoc.document,
      didResolutionMetadata: {
        contentType: "application/did+ld+json"
      },
      didDocumentMetadata: {
        created: new Date(didDoc.createdAt).toISOString(),
        updated: new Date(didDoc.updatedAt).toISOString(),
        versionId: didDoc.version.toString(),
        nextUpdate: null,
        nextVersionId: null
      }
    };
  }
});

export const updateDIDDocument = action({
  args: {
    did: v.string(),
    updates: v.object({
      verificationMethod: v.optional(v.array(v.object({
        id: v.string(),
        type: v.string(),
        controller: v.string(),
        publicKeyMultibase: v.string()
      }))),
      service: v.optional(v.array(v.object({
        id: v.string(),
        type: v.string(),
        serviceEndpoint: v.string()
      })))
    }),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const didDoc = await ctx.db
        .query("didDocuments")
        .filter(q => q.eq(q.field("did"), args.did))
        .unique();

      if (!didDoc) {
        throw new Error("DID document not found");
      }

      // Create updated document
      const updatedDocument = {
        ...didDoc.document,
        ...(args.updates.verificationMethod && {
          verificationMethod: args.updates.verificationMethod,
          authentication: args.updates.verificationMethod.map(vm => vm.id),
          assertionMethod: args.updates.verificationMethod.map(vm => vm.id)
        }),
        ...(args.updates.service && { service: args.updates.service })
      };

      // Create update transaction
      const updateHash = Buffer.from(JSON.stringify(updatedDocument)).toString('sha256');
      
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: didDoc.xrplAccount,
        destination: didDoc.xrplAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            did: args.did,
            action: "did_update",
            documentHash: updateHash,
            version: didDoc.version + 1
          })).toString('hex').toUpperCase(),
          type: Buffer.from("did_update").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`DID update failed: ${txResult.error}`);
      }

      // Update database record
      await ctx.db.patch(didDoc._id, {
        document: updatedDocument,
        updatedAt: Date.now(),
        version: didDoc.version + 1
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex,
        version: didDoc.version + 1
      };
    } catch (error) {
      console.error("DID update failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "DID update failed"
      };
    }
  }
});

export const deactivateDID = action({
  args: {
    did: v.string(),
    network: v.string(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const didDoc = await ctx.db
        .query("didDocuments")
        .filter(q => q.eq(q.field("did"), args.did))
        .unique();

      if (!didDoc) {
        throw new Error("DID document not found");
      }

      // Create deactivation transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "Payment",
        account: didDoc.xrplAccount,
        destination: didDoc.xrplAccount,
        amount: "1",
        memos: [{
          data: Buffer.from(JSON.stringify({
            did: args.did,
            action: "did_deactivate",
            reason: args.reason,
            deactivatedAt: new Date().toISOString()
          })).toString('hex').toUpperCase(),
          type: Buffer.from("did_deactivation").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`DID deactivation failed: ${txResult.error}`);
      }

      // Update status
      await ctx.db.patch(didDoc._id, {
        status: "revoked",
        updatedAt: Date.now()
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("DID deactivation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "DID deactivation failed"
      };
    }
  }
});
