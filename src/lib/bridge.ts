import { Client, Wallet, xrpToDrops } from 'xrpl';
import { WebSocketTool } from './websocket-tool';

/**
 * Configuration for bridge operations
 */
export interface BridgeConfig {
  lockingChainUrl: string;
  issuingChainUrl: string;
  lockingChainDoor: string;
  issuingChainDoor: string;
  lockingChainIssue: {
    currency: string;
    issuer?: string;
  };
  issuingChainIssue: {
    currency: string;
    issuer?: string;
  };
}

/**
 * Parameters for creating a bridge
 */
export interface BridgeCreateParams {
  signatureReward?: string;
  minAccountCreateAmount?: string;
}

/**
 * Parameters for account creation commit
 */
export interface AccountCreateCommitParams {
  destination: string;
  amount: string;
  signatureReward?: string;
}

/**
 * Parameters for claim ID creation
 */
export interface CreateClaimIDParams {
  otherChainSource: string;
  signatureReward?: string;
}

/**
 * Parameters for cross-chain commit
 */
export interface XChainCommitParams {
  otherChainDestination: string;
  amount: string;
  xChainClaimID: string;
}

/**
 * Result of bridge operations
 */
export interface BridgeResult {
  success: boolean;
  transactionHash?: string;
  result?: any;
  error?: string;
}

/**
 * Bridge functionality for cross-chain operations
 * Implements XRP-XRP and IOU-IOU bridge operations according to XRPL standards
 */
export class Bridge {
  private lockingChainClient: Client;
  private issuingChainClient: Client;
  private config: BridgeConfig;

  /**
   * Initialize the Bridge class with configuration
   * @param config Bridge configuration
   */
  constructor(config: BridgeConfig) {
    this.config = config;
    this.lockingChainClient = new Client(config.lockingChainUrl);
    this.issuingChainClient = new Client(config.issuingChainUrl);
  }

  /**
   * Connect to both chains
   */
  async connect(): Promise<void> {
    await Promise.all([
      this.lockingChainClient.connect(),
      this.issuingChainClient.connect()
    ]);
  }

  /**
   * Disconnect from both chains
   */
  async disconnect(): Promise<void> {
    await Promise.all([
      this.lockingChainClient.disconnect(),
      this.issuingChainClient.disconnect()
    ]);
  }

  /**
   * Create a bridge on the locking chain
   * @param doorWallet Wallet of the door account on locking chain
   * @param params Bridge creation parameters
   * @returns Bridge creation result
   */
  async createBridgeOnLockingChain(
    doorWallet: Wallet,
    params: BridgeCreateParams
  ): Promise<BridgeResult> {
    try {
      const bridgeTx: any = {
        TransactionType: 'XChainCreateBridge',
        Account: doorWallet.classicAddress,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        },
        SignatureReward: params.signatureReward || '200'
      };

      // Add MinAccountCreateAmount if provided (for XRP bridges)
      if (params.minAccountCreateAmount) {
        bridgeTx.MinAccountCreateAmount = params.minAccountCreateAmount;
      }

      const result = await this.lockingChainClient.submitAndWait(bridgeTx, {
        wallet: doorWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Create a bridge on the issuing chain
   * @param doorWallet Wallet of the door account on issuing chain
   * @param params Bridge creation parameters
   * @returns Bridge creation result
   */
  async createBridgeOnIssuingChain(
    doorWallet: Wallet,
    params: BridgeCreateParams
  ): Promise<BridgeResult> {
    try {
      const bridgeTx: any = {
        TransactionType: 'XChainCreateBridge',
        Account: doorWallet.classicAddress,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        },
        SignatureReward: params.signatureReward || '200'
      };

      // Add MinAccountCreateAmount if provided (for XRP bridges)
      if (params.minAccountCreateAmount) {
        bridgeTx.MinAccountCreateAmount = params.minAccountCreateAmount;
      }

      const result = await this.issuingChainClient.submitAndWait(bridgeTx, {
        wallet: doorWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Set up signer list on locking chain door account
   * @param doorWallet Wallet of the door account on locking chain
   * @param signerEntries Signer entries for witness servers
   * @param signerQuorum Required quorum for signatures
   * @returns Signer list set result
   */
  async setSignerListOnLockingChain(
    doorWallet: Wallet,
    signerEntries: Array<{ account: string; signerWeight: number }>,
    signerQuorum: number
  ): Promise<BridgeResult> {
    try {
      const signerListTx: any = {
        TransactionType: 'SignerListSet',
        Account: doorWallet.classicAddress,
        SignerQuorum: signerQuorum,
        SignerEntries: signerEntries.map(entry => ({
          SignerEntry: {
            Account: entry.account,
            SignerWeight: entry.signerWeight
          }
        }))
      };

      const result = await this.lockingChainClient.submitAndWait(signerListTx, {
        wallet: doorWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Set up signer list on issuing chain door account
   * @param doorWallet Wallet of the door account on issuing chain
   * @param signerEntries Signer entries for witness servers
   * @param signerQuorum Required quorum for signatures
   * @returns Signer list set result
   */
  async setSignerListOnIssuingChain(
    doorWallet: Wallet,
    signerEntries: Array<{ account: string; signerWeight: number }>,
    signerQuorum: number
  ): Promise<BridgeResult> {
    try {
      const signerListTx: any = {
        TransactionType: 'SignerListSet',
        Account: doorWallet.classicAddress,
        SignerQuorum: signerQuorum,
        SignerEntries: signerEntries.map(entry => ({
          SignerEntry: {
            Account: entry.account,
            SignerWeight: entry.signerWeight
          }
        }))
      };

      const result = await this.issuingChainClient.submitAndWait(signerListTx, {
        wallet: doorWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Disable master key on an account
   * @param client XRPL client
   * @param wallet Wallet to disable master key for
   * @returns Account set result
   */
  private async disableMasterKey(
    client: Client,
    wallet: Wallet
  ): Promise<BridgeResult> {
    try {
      const accountSetTx: any = {
        TransactionType: 'AccountSet',
        Account: wallet.classicAddress,
        SetFlag: 4 // Disable master key
      };

      const result = await client.submitAndWait(accountSetTx, {
        wallet: wallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Disable master key on locking chain door account
   * @param doorWallet Wallet of the door account on locking chain
   * @returns Account set result
   */
  async disableMasterKeyOnLockingChain(doorWallet: Wallet): Promise<BridgeResult> {
    return this.disableMasterKey(this.lockingChainClient, doorWallet);
  }

  /**
   * Disable master key on issuing chain door account
   * @param doorWallet Wallet of the door account on issuing chain
   * @returns Account set result
   */
  async disableMasterKeyOnIssuingChain(doorWallet: Wallet): Promise<BridgeResult> {
    return this.disableMasterKey(this.issuingChainClient, doorWallet);
  }

  /**
   * Commit account creation on locking chain
   * @param wallet Wallet to submit transaction from
   * @param params Account creation commit parameters
   * @returns Account creation commit result
   */
  async commitAccountCreate(
    wallet: Wallet,
    params: AccountCreateCommitParams
  ): Promise<BridgeResult> {
    try {
      const commitTx: any = {
        TransactionType: 'XChainAccountCreateCommit',
        Account: wallet.classicAddress,
        Destination: params.destination,
        Amount: params.amount,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        }
      };

      // Add signature reward if provided
      if (params.signatureReward) {
        commitTx.SignatureReward = params.signatureReward;
      }

      const result = await this.lockingChainClient.submitAndWait(commitTx, {
        wallet: wallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Create claim ID on issuing chain
   * @param wallet Wallet to submit transaction from
   * @param params Claim ID creation parameters
   * @returns Claim ID creation result
   */
  async createClaimID(
    wallet: Wallet,
    params: CreateClaimIDParams
  ): Promise<BridgeResult & { claimID?: string }> {
    try {
      const claimTx: any = {
        TransactionType: 'XChainCreateClaimID',
        Account: wallet.classicAddress,
        OtherChainSource: params.otherChainSource,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        }
      };

      // Add signature reward if provided
      if (params.signatureReward) {
        claimTx.SignatureReward = params.signatureReward;
      }

      const result = await this.issuingChainClient.submitAndWait(claimTx, {
        wallet: wallet
      });

      // Extract claim ID from metadata if successful
      let claimID: string | undefined;
      if (typeof result.result.meta === 'object' && result.result.meta !== null && 
          (result.result.meta as any).TransactionResult === 'tesSUCCESS' && 
          (result.result.meta as any).AffectedNodes) {
        for (const node of (result.result.meta as any).AffectedNodes) {
          if (node.CreatedNode?.LedgerEntryType === 'XChainOwnedClaimID') {
            claimID = node.CreatedNode.NewFields?.XChainClaimID;
            break;
          }
        }
      }

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && 
                 (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result,
        claimID: claimID
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Commit cross-chain transfer on locking chain
   * @param wallet Wallet to submit transaction from
   * @param params Cross-chain commit parameters
   * @returns Cross-chain commit result
   */
  async commitTransfer(
    wallet: Wallet,
    params: XChainCommitParams
  ): Promise<BridgeResult> {
    try {
      const commitTx: any = {
        TransactionType: 'XChainCommit',
        Account: wallet.classicAddress,
        OtherChainDestination: params.otherChainDestination,
        Amount: params.amount,
        XChainClaimID: params.xChainClaimID,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        }
      };

      const result = await this.lockingChainClient.submitAndWait(commitTx, {
        wallet: wallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Add account creation attestation on issuing chain
   * @param witnessWallet Wallet of the witness submitting the attestation
   * @param params Attestation parameters
   * @returns Attestation result
   */
  async addAccountCreateAttestation(
    witnessWallet: Wallet,
    params: {
      otherChainSource: string;
      destination: string;
      amount: string;
      publicKey: string;
      signature: string;
      wasLockingChainSend: number;
      attestationRewardAccount: string;
      attestationSignerAccount: string;
      xChainAccountCreateCount: string;
      signatureReward: string;
    }
  ): Promise<BridgeResult> {
    try {
      const attestationTx: any = {
        TransactionType: 'XChainAddAccountCreateAttestation',
        Account: witnessWallet.classicAddress,
        OtherChainSource: params.otherChainSource,
        Destination: params.destination,
        Amount: params.amount,
        PublicKey: params.publicKey,
        Signature: params.signature,
        WasLockingChainSend: params.wasLockingChainSend,
        AttestationRewardAccount: params.attestationRewardAccount,
        AttestationSignerAccount: params.attestationSignerAccount,
        XChainAccountCreateCount: params.xChainAccountCreateCount,
        SignatureReward: params.signatureReward,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        }
      };

      const result = await this.issuingChainClient.submitAndWait(attestationTx, {
        wallet: witnessWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Add claim attestation on issuing chain
   * @param witnessWallet Wallet of the witness submitting the attestation
   * @param params Attestation parameters
   * @returns Attestation result
   */
  async addClaimAttestation(
    witnessWallet: Wallet,
    params: {
      otherChainSource: string;
      otherChainDestination: string;
      amount: string;
      publicKey: string;
      signature: string;
      wasLockingChainSend: number;
      claimID: string;
      signatureReward: string;
    }
  ): Promise<BridgeResult> {
    try {
      const attestationTx: any = {
        TransactionType: 'XChainAddClaimAttestation',
        Account: witnessWallet.classicAddress,
        OtherChainSource: params.otherChainSource,
        OtherChainDestination: params.otherChainDestination,
        Amount: params.amount,
        PublicKey: params.publicKey,
        Signature: params.signature,
        WasLockingChainSend: params.wasLockingChainSend,
        XChainClaimID: params.claimID,
        SignatureReward: params.signatureReward,
        XChainBridge: {
          LockingChainDoor: this.config.lockingChainDoor,
          LockingChainIssue: this.config.lockingChainIssue,
          IssuingChainDoor: this.config.issuingChainDoor,
          IssuingChainIssue: this.config.issuingChainIssue
        }
      };

      const result = await this.issuingChainClient.submitAndWait(attestationTx, {
        wallet: witnessWallet
      });

      return {
        success: typeof result.result.meta === 'object' && result.result.meta !== null && (result.result.meta as any).TransactionResult === 'tesSUCCESS',
        transactionHash: result.result.hash,
        result: result.result
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}