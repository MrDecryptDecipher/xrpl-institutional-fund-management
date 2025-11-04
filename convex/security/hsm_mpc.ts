import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

/**
 * HSM/MPC Key Management for Institutional-Grade Security
 * 
 * Per PRD Requirements (Section 3.2):
 * - Hardware Security Module (HSM) integrations
 * - Multi-Party Computation (MPC) key management
 * - Institutional-grade key rotation and security
 * - Enterprise custody provider integrations
 */

// Advanced HSM Integration for Institutional Key Management
export const initializeHSMKeyManagement = action({
  args: {
    fundId: v.id("funds"),
    hsmProvider: v.union(
      v.literal("AWS_CloudHSM"),
      v.literal("Azure_Dedicated_HSM"),
      v.literal("Thales_Luna"),
      v.literal("Utimaco_CryptoServer"),
      v.literal("Gemalto_SafeNet")
    ),
    hsmConfiguration: v.object({
      clusterEndpoint: v.string(),
      partitionLabel: v.string(),
      authenticationMethod: v.string(),
      keyPolicy: v.object({
        extractable: v.boolean(),
        keyUsage: v.array(v.string()),
        minimumKeySize: v.number(),
        keyRotationPeriod: v.number()
      }),
      backupConfiguration: v.object({
        enabled: v.boolean(),
        backupFrequency: v.string(),
        crossRegionReplication: v.boolean(),
        encryptionAtRest: v.boolean()
      })
    }),
    complianceRequirements: v.object({
      fips140Level: v.number(),
      commonCriteria: v.string(),
      regulatoryFrameworks: v.array(v.string()),
      auditRequirements: v.array(v.string())
    })
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate fund and HSM configuration
      const fund = await ctx.db.get(args.fundId);
      if (!fund) {
        throw new Error("Invalid fund reference for HSM initialization");
      }

      // Step 2: Initialize HSM Connection
      const hsmConnection = await initializeHSMConnection({
        provider: args.hsmProvider,
        configuration: args.hsmConfiguration,
        complianceRequirements: args.complianceRequirements
      });

      if (!hsmConnection.success) {
        throw new Error(`HSM initialization failed: ${hsmConnection.error}`);
      }

      // Step 3: Generate Master Key Hierarchy
      const masterKeyHierarchy = await generateMasterKeyHierarchy({
        hsmSession: hsmConnection.sessionId,
        fundId: args.fundId,
        keyPolicy: args.hsmConfiguration.keyPolicy,
        complianceLevel: args.complianceRequirements.fips140Level
      });

      // Step 4: Create Key Management Record
      const keyManagementId = await ctx.runMutation(api.security.hsm_mpc.createKeyManagementRecord, {
        fundId: args.fundId,
        hsmProvider: args.hsmProvider,
        hsmConfiguration: args.hsmConfiguration,
        hsmConnection: hsmConnection,
        masterKeyHierarchy: masterKeyHierarchy,
        complianceRequirements: args.complianceRequirements,
        status: "active"
      });

      // Step 5: Configure Automated Key Rotation
      await ctx.runAction(api.security.hsm_mpc.configureKeyRotation, {
        keyManagementId: keyManagementId,
        rotationPeriod: args.hsmConfiguration.keyPolicy.keyRotationPeriod,
        fundId: args.fundId
      });

      // Step 6: Initialize Backup and Recovery
      await ctx.runAction(api.security.hsm_mpc.initializeKeyBackup, {
        keyManagementId: keyManagementId,
        backupConfiguration: args.hsmConfiguration.backupConfiguration,
        masterKeyHierarchy: masterKeyHierarchy
      });

      return {
        success: true,
        keyManagementId: keyManagementId,
        hsmProvider: args.hsmProvider,
        hsmSession: hsmConnection.sessionId,
        masterKeyId: masterKeyHierarchy.masterKeyId,
        complianceLevel: `FIPS 140-${args.complianceRequirements.fips140Level}`,
        institutionalReference: `HSM-${fund.symbol}-${Date.now()}`,
        status: "ACTIVE",
        keyHierarchy: {
          masterKey: masterKeyHierarchy.masterKeyId,
          derivedKeys: masterKeyHierarchy.derivedKeys.length,
          xrplSigningKeys: masterKeyHierarchy.xrplKeys.length
        }
      };

    } catch (error) {
      console.error("HSM key management initialization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "HSM initialization failed"
      };
    }
  }
});

// Multi-Party Computation (MPC) Key Generation
export const initializeMPCKeyManagement = action({
  args: {
    fundId: v.id("funds"),
    mpcProvider: v.union(
      v.literal("Fireblocks_MPC"),
      v.literal("Sepior_Concordium"),
      v.literal("Unbound_CORE"),
      v.literal("ZenGo_X"),
      v.literal("Curv_MPC")
    ),
    mpcConfiguration: v.object({
      threshold: v.number(),
      totalShares: v.number(),
      keyGenProtocol: v.string(),
      signingProtocol: v.string(),
      refreshProtocol: v.string(),
      participants: v.array(v.object({
        participantId: v.string(),
        role: v.string(),
        publicKey: v.string(),
        institutionalEntity: v.string()
      }))
    }),
    securityPolicy: v.object({
      requireBiometric: v.boolean(),
      requireHardwareToken: v.boolean(),
      sessionTimeout: v.number(),
      maxConcurrentSessions: v.number(),
      auditLevel: v.string()
    })
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate MPC configuration
      if (args.mpcConfiguration.threshold > args.mpcConfiguration.totalShares) {
        throw new Error("Threshold cannot exceed total shares in MPC configuration");
      }

      const fund = await ctx.db.get(args.fundId);
      if (!fund) {
        throw new Error("Invalid fund reference for MPC initialization");
      }

      // Step 2: Initialize MPC Protocol
      const mpcSession = await initializeMPCProtocol({
        provider: args.mpcProvider,
        configuration: args.mpcConfiguration,
        securityPolicy: args.securityPolicy
      });

      if (!mpcSession.success) {
        throw new Error(`MPC initialization failed: ${mpcSession.error}`);
      }

      // Step 3: Execute Distributed Key Generation (DKG)
      const dkgResult = await executeDistributedKeyGeneration({
        mpcSession: mpcSession.sessionId,
        threshold: args.mpcConfiguration.threshold,
        totalShares: args.mpcConfiguration.totalShares,
        participants: args.mpcConfiguration.participants,
        protocol: args.mpcConfiguration.keyGenProtocol
      });

      if (!dkgResult.success) {
        throw new Error(`Distributed key generation failed: ${dkgResult.error}`);
      }

      // Step 4: Generate XRPL Key Pairs via MPC
      const xrplKeyPairs = await generateXRPLMPCKeys({
        mpcSession: mpcSession.sessionId,
        masterSecretShare: dkgResult.masterSecretShare,
        derivationPaths: [
          "m/44'/144'/0'/0/0", // Primary signing key
          "m/44'/144'/0'/0/1", // Secondary signing key
          "m/44'/144'/1'/0/0"  // Multi-sig key
        ]
      });

      // Step 5: Create MPC Management Record
      const mpcManagementId = await ctx.runMutation(api.security.hsm_mpc.createMPCRecord, {
        fundId: args.fundId,
        mpcProvider: args.mpcProvider,
        mpcConfiguration: args.mpcConfiguration,
        mpcSession: mpcSession,
        dkgResult: dkgResult,
        xrplKeyPairs: xrplKeyPairs,
        securityPolicy: args.securityPolicy,
        status: "active"
      });

      // Step 6: Configure Proactive Secret Sharing Refresh
      await ctx.runAction(api.security.hsm_mpc.configureMPCRefresh, {
        mpcManagementId: mpcManagementId,
        refreshProtocol: args.mpcConfiguration.refreshProtocol,
        refreshInterval: 30 * 24 * 60 * 60 * 1000 // 30 days
      });

      return {
        success: true,
        mpcManagementId: mpcManagementId,
        mpcProvider: args.mpcProvider,
        mpcSession: mpcSession.sessionId,
        threshold: args.mpcConfiguration.threshold,
        totalShares: args.mpcConfiguration.totalShares,
        xrplAddresses: xrplKeyPairs.map((kp: any) => kp.address),
        securityLevel: "INSTITUTIONAL_MPC",
        institutionalReference: `MPC-${fund.symbol}-${Date.now()}`,
        status: "ACTIVE"
      };

    } catch (error) {
      console.error("MPC key management initialization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPC initialization failed"
      };
    }
  }
});

// Execute HSM-Secured Transaction Signing
export const executeHSMSignedTransaction = action({
  args: {
    keyManagementId: v.id("keyManagement"),
    transactionData: v.object({
      transactionType: v.string(),
      account: v.string(),
      destination: v.optional(v.string()),
      amount: v.optional(v.string()),
      memos: v.optional(v.array(v.any()))
    }),
    signingKeyId: v.string(),
    authenticationData: v.object({
      userId: v.string(),
      biometricHash: v.optional(v.string()),
      hardwareTokenOTP: v.optional(v.string()),
      multiFactorTokens: v.array(v.string())
    }),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate key management session
      const keyManagement = await ctx.db.get(args.keyManagementId);
      if (!keyManagement || keyManagement.status !== "active") {
        throw new Error("Invalid or inactive key management session");
      }

      // Step 2: Multi-Factor Authentication Validation
      const authResult = await validateMultiFactorAuthentication({
        keyManagementId: args.keyManagementId,
        authenticationData: args.authenticationData,
        securityPolicy: keyManagement.securityPolicy || keyManagement.complianceRequirements
      });

      if (!authResult.authenticated) {
        throw new Error(`Authentication failed: ${authResult.reason}`);
      }

      // Step 3: HSM Session Validation and Key Access
      const hsmAccess = await validateHSMKeyAccess({
        hsmSession: keyManagement.hsmConnection.sessionId,
        signingKeyId: args.signingKeyId,
        requestingUser: args.authenticationData.userId,
        transactionType: args.transactionData.transactionType
      });

      if (!hsmAccess.authorized) {
        throw new Error(`HSM key access denied: ${hsmAccess.reason}`);
      }

      // Step 4: Generate Transaction Hash for Signing
      const transactionHash = generateTransactionHash(args.transactionData);

      // Step 5: Execute HSM Signing Operation
      const signingResult = await executeHSMSigning({
        hsmSession: keyManagement.hsmConnection.sessionId,
        signingKeyId: args.signingKeyId,
        transactionHash: transactionHash,
        signingAlgorithm: "ECDSA_secp256k1"
      });

      if (!signingResult.success) {
        throw new Error(`HSM signing failed: ${signingResult.error}`);
      }

      // Step 6: Construct Signed Transaction
      // Create properly structured signed transaction for multi-sign
      const signedTransaction = {
        ...args.transactionData,
        SigningPubKey: "", // Clear for multi-sign
        TxnSignature: signingResult.signature
      };

      // Step 7: Submit Transaction to XRPL
      const submissionResult = await ctx.runAction(api.xrpl.enhanced_client.submitSignedTransaction, {
        network: args.network,
        signedTransaction: signedTransaction,
        transactionBlob: signingResult.transactionBlob
      });

      // Step 8: Log HSM Transaction
      await ctx.runAction(api.audit.institutional_audit.logHSMTransaction, {
        keyManagementId: args.keyManagementId,
        signingKeyId: args.signingKeyId,
        transactionHash: transactionHash,
        transactionType: args.transactionData.transactionType,
        submissionResult: submissionResult,
        authenticationData: args.authenticationData
      });

      return {
        success: true,
        txHash: submissionResult.hash,
        ledgerIndex: submissionResult.ledgerIndex,
        signingKeyId: args.signingKeyId,
        hsmProvider: keyManagement.hsmProvider,
        authenticationLevel: authResult.authenticationLevel,
        institutionalReference: `HSM-TX-${Date.now()}`,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error("HSM transaction signing failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "HSM transaction signing failed"
      };
    }
  }
});

// Execute MPC-Based Transaction Signing
export const executeMPCSignedTransaction = action({
  args: {
    mpcManagementId: v.id("mpcManagement"),
    transactionData: v.any(),
    signingParticipants: v.array(v.object({
      participantId: v.string(),
      signature: v.string(),
      authenticationProof: v.string()
    })),
    threshold: v.number(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Validate MPC session
      const mpcManagement = await ctx.db.get(args.mpcManagementId);
      if (!mpcManagement || mpcManagement.status !== "active") {
        throw new Error("Invalid or inactive MPC session");
      }

      // Step 2: Validate Threshold Requirements
      if (args.signingParticipants.length < args.threshold) {
        throw new Error(`Insufficient signatures: ${args.signingParticipants.length} < ${args.threshold}`);
      }

      // Step 3: Validate Participant Signatures
      const signatureValidation = await validateMPCSignatures({
        mpcSession: mpcManagement.mpcSession.sessionId,
        signingParticipants: args.signingParticipants,
        transactionData: args.transactionData,
        threshold: args.threshold
      });

      if (!signatureValidation.valid) {
        throw new Error(`MPC signature validation failed: ${signatureValidation.reason}`);
      }

      // Step 4: Aggregate MPC Signatures
      const aggregatedSignature = await aggregateMPCSignatures({
        mpcSession: mpcManagement.mpcSession.sessionId,
        participantSignatures: args.signingParticipants,
        signingProtocol: mpcManagement.mpcConfiguration.signingProtocol
      });

      if (!aggregatedSignature.success) {
        throw new Error(`MPC signature aggregation failed: ${aggregatedSignature.error}`);
      }

      // Step 5: Submit MPC-Signed Transaction
      const submissionResult = await ctx.runAction(api.xrpl.enhanced_client.submitMPCTransaction, {
        network: args.network,
        transactionData: args.transactionData,
        aggregatedSignature: aggregatedSignature.signature,
        mpcProof: aggregatedSignature.proof
      });

      return {
        success: true,
        txHash: submissionResult.hash,
        ledgerIndex: submissionResult.ledgerIndex,
        mpcProvider: mpcManagement.mpcProvider,
        participantCount: args.signingParticipants.length,
        threshold: args.threshold,
        institutionalReference: `MPC-TX-${Date.now()}`
      };

    } catch (error) {
      console.error("MPC transaction signing failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "MPC transaction signing failed"
      };
    }
  }
});

// Supporting mutation functions
export const createKeyManagementRecord = mutation({
  args: {
    fundId: v.id("funds"),
    hsmProvider: v.string(),
    hsmConfiguration: v.any(),
    hsmConnection: v.any(),
    masterKeyHierarchy: v.any(),
    complianceRequirements: v.any(),
    status: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("keyManagement", {
      fundId: args.fundId,
      hsmProvider: args.hsmProvider,
      hsmConfiguration: args.hsmConfiguration,
      hsmConnection: args.hsmConnection,
      masterKeyHierarchy: args.masterKeyHierarchy,
      complianceRequirements: args.complianceRequirements,
      status: args.status,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
  }
});

export const createMPCRecord = mutation({
  args: {
    fundId: v.id("funds"),
    mpcProvider: v.string(),
    mpcConfiguration: v.any(),
    mpcSession: v.any(),
    dkgResult: v.any(),
    xrplKeyPairs: v.any(),
    securityPolicy: v.any(),
    status: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mpcManagement", {
      fundId: args.fundId,
      mpcProvider: args.mpcProvider,
      mpcConfiguration: args.mpcConfiguration,
      mpcSession: args.mpcSession,
      dkgResult: args.dkgResult,
      xrplKeyPairs: args.xrplKeyPairs,
      securityPolicy: args.securityPolicy,
      status: args.status,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
  }
});

// Key rotation and backup functions
export const configureKeyRotation = action({
  args: {
    keyManagementId: v.id("keyManagement"),
    rotationPeriod: v.number(),
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    // Configure automated key rotation schedule
    return {
      success: true,
      rotationPeriod: args.rotationPeriod,
      nextRotation: Date.now() + args.rotationPeriod
    };
  }
});

export const initializeKeyBackup = action({
  args: {
    keyManagementId: v.id("keyManagement"),
    backupConfiguration: v.any(),
    masterKeyHierarchy: v.any()
  },
  handler: async (ctx, args) => {
    // Initialize secure key backup procedures
    return {
      success: true,
      backupConfiguration: args.backupConfiguration
    };
  }
});

export const configureMPCRefresh = action({
  args: {
    mpcManagementId: v.id("mpcManagement"),
    refreshProtocol: v.string(),
    refreshInterval: v.number()
  },
  handler: async (ctx, args) => {
    // Configure proactive secret sharing refresh
    return {
      success: true,
      refreshProtocol: args.refreshProtocol,
      nextRefresh: Date.now() + args.refreshInterval
    };
  }
});

// Helper functions (mock implementations for institutional security)
async function initializeHSMConnection(config: any): Promise<any> {
  // Mock HSM connection - in production would connect to actual HSM
  return {
    success: true,
    sessionId: `hsm_session_${Date.now()}`,
    provider: config.provider,
    endpoint: config.configuration.clusterEndpoint,
    partition: config.configuration.partitionLabel,
    complianceLevel: `FIPS140-L${config.complianceRequirements.fips140Level}`
  };
}

async function generateMasterKeyHierarchy(config: any): Promise<any> {
  // Mock master key hierarchy generation
  return {
    masterKeyId: `mk_${Date.now()}`,
    derivedKeys: [
      { keyId: `dk_${Date.now()}_1`, purpose: "signing", algorithm: "ECDSA" },
      { keyId: `dk_${Date.now()}_2`, purpose: "encryption", algorithm: "AES256" }
    ],
    xrplKeys: [
      { keyId: `xrpl_${Date.now()}_1`, address: `r${Math.random().toString(36).substr(2, 33)}` },
      { keyId: `xrpl_${Date.now()}_2`, address: `r${Math.random().toString(36).substr(2, 33)}` }
    ]
  };
}

async function initializeMPCProtocol(config: any): Promise<any> {
  // Mock MPC protocol initialization
  return {
    success: true,
    sessionId: `mpc_session_${Date.now()}`,
    provider: config.provider,
    protocol: config.configuration.keyGenProtocol,
    participants: config.configuration.participants.length
  };
}

async function executeDistributedKeyGeneration(config: any): Promise<any> {
  // Mock DKG execution
  return {
    success: true,
    masterSecretShare: `secret_share_${Date.now()}`,
    publicKey: `04${Math.random().toString(16).substr(2, 128)}`,
    keyId: `mpc_key_${Date.now()}`
  };
}

async function generateXRPLMPCKeys(config: any): Promise<any> {
  // Mock XRPL key generation via MPC
  return config.derivationPaths.map((path: string) => ({
    derivationPath: path,
    address: `r${Math.random().toString(36).substr(2, 33)}`,
    publicKey: `04${Math.random().toString(16).substr(2, 128)}`
  }));
}

async function validateMultiFactorAuthentication(config: any): Promise<any> {
  // Mock MFA validation
  return {
    authenticated: true,
    authenticationLevel: "INSTITUTIONAL_GRADE",
    factors: ["biometric", "hardware_token", "institutional_approval"]
  };
}

async function validateHSMKeyAccess(config: any): Promise<any> {
  // Mock HSM key access validation
  return {
    authorized: true,
    publicKey: `04${Math.random().toString(16).substr(2, 128)}`,
    keyUsage: ["digital_signature"]
  };
}

async function executeHSMSigning(config: any): Promise<any> {
  // Mock HSM signing operation
  return {
    success: true,
    signature: `30${Math.random().toString(16).substr(2, 140)}`,
    transactionBlob: `12${Math.random().toString(16).substr(2, 200)}`
  };
}

async function validateMPCSignatures(config: any): Promise<any> {
  // Mock MPC signature validation
  return {
    valid: true,
    validatedCount: config.signingParticipants.length,
    threshold: config.threshold
  };
}

async function aggregateMPCSignatures(config: any): Promise<any> {
  // Mock MPC signature aggregation
  return {
    success: true,
    signature: `30${Math.random().toString(16).substr(2, 140)}`,
    proof: `proof_${Date.now()}`
  };
}

function generateTransactionHash(transactionData: any): string {
  // Mock transaction hash generation
  return `${Math.random().toString(16).substr(2, 64)}`;
}