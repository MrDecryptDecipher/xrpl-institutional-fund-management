/**
 * Cross-Chain Bridge Component
 * Comprehensive implementation of all 8 XChain transactions
 * Production-ready bridge management with door accounts and witness integration
 */

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Network, ArrowLeftRight, Lock, Unlock, Plus, Send } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

interface XChainBridgeConfig {
  LockingChainDoor: string;
  LockingChainIssue: {
    currency: string;
    issuer?: string;
  };
  IssuingChainDoor: string;
  IssuingChainIssue: {
    currency: string;
    issuer?: string;
  };
}

interface CrossChainBridgeProps {
  xrplAccount: string;
}

const CrossChainBridge: React.FC<CrossChainBridgeProps> = ({ xrplAccount }) => {
  const [client] = useState(() => new Client(XRPL_NETWORKS.testnet));
  const [loading, setLoading] = useState(false);

  // XChainCreateBridge
  const [lockingChainDoor, setLockingChainDoor] = useState(xrplAccount);
  const [lockingCurrency, setLockingCurrency] = useState("XRP");
  const [lockingIssuer, setLockingIssuer] = useState("");
  const [issuingChainDoor, setIssuingChainDoor] = useState("");
  const [issuingCurrency, setIssuingCurrency] = useState("XRP");
  const [issuingIssuer, setIssuingIssuer] = useState("");
  const [signatureReward, setSignatureReward] = useState("200");
  const [minAccountCreateAmount, setMinAccountCreateAmount] = useState("1000000");

  // XChainModifyBridge
  const [modifySignatureReward, setModifySignatureReward] = useState("");
  const [modifyMinAccountCreate, setModifyMinAccountCreate] = useState("");

  // XChainCommit
  const [commitAmount, setCommitAmount] = useState("");
  const [commitClaimID, setCommitClaimID] = useState("");
  const [commitOtherChainDest, setCommitOtherChainDest] = useState("");

  // XChainClaim
  const [claimAmount, setClaimAmount] = useState("");
  const [claimID, setClaimID] = useState("");
  const [claimDestination, setClaimDestination] = useState("");
  const [claimDestTag, setClaimDestTag] = useState("");

  // XChainCreateClaimID
  const [createClaimOtherChainSource, setCreateClaimOtherChainSource] = useState("");
  const [createClaimSignatureReward, setCreateClaimSignatureReward] = useState("200");

  // XChainAccountCreateCommit
  const [accountCreateAmount, setAccountCreateAmount] = useState("");
  const [accountCreateOtherChainDest, setAccountCreateOtherChainDest] = useState("");
  const [accountCreateSignatureReward, setAccountCreateSignatureReward] = useState("200");

  // Attestation
  const [attestationClaimID, setAttestationClaimID] = useState("");
  const [attestationAmount, setAttestationAmount] = useState("");
  const [attestationPublicKey, setAttestationPublicKey] = useState("");
  const [attestationSignature, setAttestationSignature] = useState("");
  const [attestationOtherChainSource, setAttestationOtherChainSource] = useState("");

  const buildBridgeObject = (): XChainBridgeConfig => {
    return {
      LockingChainDoor: lockingChainDoor,
      LockingChainIssue: lockingCurrency === "XRP" 
        ? { currency: "XRP" }
        : { currency: lockingCurrency, issuer: lockingIssuer },
      IssuingChainDoor: issuingChainDoor,
      IssuingChainIssue: issuingCurrency === "XRP"
        ? { currency: "XRP" }
        : { currency: issuingCurrency, issuer: issuingIssuer }
    };
  };

  const executeTransaction = async (txType: string, txData: any) => {
    const walletSeed = prompt("Enter your wallet seed to sign the transaction:");
    if (!walletSeed) {
      toast.error("Wallet seed required");
      return;
    }

    setLoading(true);
    try {
      await client.connect();
      const wallet = Wallet.fromSeed(walletSeed);

      const tx: any = {
        TransactionType: txType,
        Account: xrplAccount,
        ...txData
      };

      const prepared = await client.autofill(tx);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta.TransactionResult === "tesSUCCESS") {
        toast.success(`${txType} executed successfully!`);
      } else {
        toast.error(`Transaction failed: ${result.result.meta.TransactionResult}`);
      }

      console.log("Transaction result:", result);
    } catch (error: any) {
      const xrplError = getXRPLError(error.message || error.toString());
      toast.error(`Transaction failed: ${xrplError.message}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
      await client.disconnect();
    }
  };

  const handleCreateBridge = async () => {
    if (!lockingChainDoor || !issuingChainDoor) {
      toast.error("Please specify both door accounts");
      return;
    }

    const txData = {
      XChainBridge: buildBridgeObject(),
      SignatureReward: signatureReward
    };

    if (lockingCurrency === "XRP" && issuingCurrency === "XRP") {
      txData["MinAccountCreateAmount"] = minAccountCreateAmount;
    }

    await executeTransaction("XChainCreateBridge", txData);
  };

  const handleModifyBridge = async () => {
    const txData: any = {
      XChainBridge: buildBridgeObject()
    };

    if (modifySignatureReward) {
      txData.SignatureReward = modifySignatureReward;
    }

    if (modifyMinAccountCreate) {
      txData.MinAccountCreateAmount = modifyMinAccountCreate;
    }

    await executeTransaction("XChainModifyBridge", txData);
  };

  const handleCommit = async () => {
    if (!commitAmount || !commitClaimID) {
      toast.error("Please specify amount and claim ID");
      return;
    }

    const txData: any = {
      XChainBridge: buildBridgeObject(),
      Amount: commitAmount,
      XChainClaimID: commitClaimID
    };

    if (commitOtherChainDest) {
      txData.OtherChainDestination = commitOtherChainDest;
    }

    await executeTransaction("XChainCommit", txData);
  };

  const handleClaim = async () => {
    if (!claimAmount || !claimID || !claimDestination) {
      toast.error("Please fill in all required fields");
      return;
    }

    const txData: any = {
      XChainBridge: buildBridgeObject(),
      Amount: claimAmount,
      XChainClaimID: claimID,
      Destination: claimDestination
    };

    if (claimDestTag) {
      txData.DestinationTag = parseInt(claimDestTag);
    }

    await executeTransaction("XChainClaim", txData);
  };

  const handleCreateClaimID = async () => {
    if (!createClaimOtherChainSource) {
      toast.error("Please specify other chain source account");
      return;
    }

    const txData = {
      XChainBridge: buildBridgeObject(),
      SignatureReward: createClaimSignatureReward,
      OtherChainSource: createClaimOtherChainSource
    };

    await executeTransaction("XChainCreateClaimID", txData);
  };

  const handleAccountCreateCommit = async () => {
    if (!accountCreateAmount || !accountCreateOtherChainDest) {
      toast.error("Please fill in all required fields");
      return;
    }

    const txData = {
      XChainBridge: buildBridgeObject(),
      Amount: accountCreateAmount,
      OtherChainDestination: accountCreateOtherChainDest,
      SignatureReward: accountCreateSignatureReward
    };

    await executeTransaction("XChainAccountCreateCommit", txData);
  };

  const handleAddAccountCreateAttestation = async () => {
    if (!attestationAmount || !attestationPublicKey || !attestationSignature || !attestationOtherChainSource) {
      toast.error("Please fill in all required fields");
      return;
    }

    const txData = {
      XChainBridge: buildBridgeObject(),
      Amount: attestationAmount,
      PublicKey: attestationPublicKey,
      Signature: attestationSignature,
      OtherChainSource: attestationOtherChainSource,
      WasLockingChainSend: 1
    };

    await executeTransaction("XChainAddAccountCreateAttestation", txData);
  };

  const handleAddClaimAttestation = async () => {
    if (!attestationClaimID || !attestationAmount || !attestationPublicKey || !attestationSignature) {
      toast.error("Please fill in all required fields");
      return;
    }

    const txData = {
      XChainBridge: buildBridgeObject(),
      XChainClaimID: attestationClaimID,
      Amount: attestationAmount,
      PublicKey: attestationPublicKey,
      Signature: attestationSignature,
      WasLockingChainSend: 1
    };

    if (attestationOtherChainSource) {
      txData["Destination"] = attestationOtherChainSource;
    }

    await executeTransaction("XChainAddClaimAttestation", txData);
  };

  return (
    <Card className="w-full border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
      <CardHeader className="border-b-2 border-teal-200 bg-gradient-to-r from-teal-100 to-cyan-100">
        <div className="flex items-center gap-3">
          <Network className="h-8 w-8 text-teal-600" />
          <div>
            <CardTitle className="text-2xl text-teal-900">Cross-Chain Bridge</CardTitle>
            <CardDescription className="text-teal-700">
              Complete XChain bridge management with 8 transaction types
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Create Bridge</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="claim">Claim</TabsTrigger>
            <TabsTrigger value="attestation">Attestation</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Bridge Configuration
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Locking Chain Door</Label>
                  <Input
                    value={lockingChainDoor}
                    onChange={(e) => setLockingChainDoor(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Locking Currency</Label>
                  <Input
                    value={lockingCurrency}
                    onChange={(e) => setLockingCurrency(e.target.value)}
                    placeholder="XRP or USD"
                  />
                </div>
                {lockingCurrency !== "XRP" && (
                  <div className="col-span-2">
                    <Label>Locking Issuer</Label>
                    <Input
                      value={lockingIssuer}
                      onChange={(e) => setLockingIssuer(e.target.value)}
                      placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    />
                  </div>
                )}
                <div>
                  <Label>Issuing Chain Door</Label>
                  <Input
                    value={issuingChainDoor}
                    onChange={(e) => setIssuingChainDoor(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Issuing Currency</Label>
                  <Input
                    value={issuingCurrency}
                    onChange={(e) => setIssuingCurrency(e.target.value)}
                    placeholder="XRP or USD"
                  />
                </div>
                {issuingCurrency !== "XRP" && (
                  <div className="col-span-2">
                    <Label>Issuing Issuer</Label>
                    <Input
                      value={issuingIssuer}
                      onChange={(e) => setIssuingIssuer(e.target.value)}
                      placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    />
                  </div>
                )}
                <div>
                  <Label>Signature Reward (drops)</Label>
                  <Input
                    value={signatureReward}
                    onChange={(e) => setSignatureReward(e.target.value)}
                    placeholder="200"
                  />
                </div>
                {lockingCurrency === "XRP" && issuingCurrency === "XRP" && (
                  <div>
                    <Label>Min Account Create Amount (drops)</Label>
                    <Input
                      value={minAccountCreateAmount}
                      onChange={(e) => setMinAccountCreateAmount(e.target.value)}
                      placeholder="1000000"
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleCreateBridge} disabled={loading} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Creating..." : "Create Bridge"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold text-lg">Modify Bridge</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>New Signature Reward (optional)</Label>
                  <Input
                    value={modifySignatureReward}
                    onChange={(e) => setModifySignatureReward(e.target.value)}
                    placeholder="300"
                  />
                </div>
                <div>
                  <Label>New Min Account Create (optional)</Label>
                  <Input
                    value={modifyMinAccountCreate}
                    onChange={(e) => setModifyMinAccountCreate(e.target.value)}
                    placeholder="2000000"
                  />
                </div>
              </div>
              <Button onClick={handleModifyBridge} disabled={loading} variant="outline" className="w-full">
                Modify Bridge
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5" />
                XChainCommit - Lock/Burn Assets
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount (drops or value)</Label>
                  <Input
                    value={commitAmount}
                    onChange={(e) => setCommitAmount(e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <Label>XChain Claim ID</Label>
                  <Input
                    value={commitClaimID}
                    onChange={(e) => setCommitClaimID(e.target.value)}
                    placeholder="13f"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Other Chain Destination (optional)</Label>
                  <Input
                    value={commitOtherChainDest}
                    onChange={(e) => setCommitOtherChainDest(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
              <Button onClick={handleCommit} disabled={loading} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Committing..." : "Commit Transfer"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold text-lg">XChainAccountCreateCommit</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount (drops)</Label>
                  <Input
                    value={accountCreateAmount}
                    onChange={(e) => setAccountCreateAmount(e.target.value)}
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <Label>Signature Reward</Label>
                  <Input
                    value={accountCreateSignatureReward}
                    onChange={(e) => setAccountCreateSignatureReward(e.target.value)}
                    placeholder="200"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Other Chain Destination</Label>
                  <Input
                    value={accountCreateOtherChainDest}
                    onChange={(e) => setAccountCreateOtherChainDest(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
              <Button onClick={handleAccountCreateCommit} disabled={loading} variant="outline" className="w-full">
                Account Create Commit
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="claim" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Unlock className="h-5 w-5" />
                XChainClaim - Claim Assets
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount (drops or value)</Label>
                  <Input
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <Label>XChain Claim ID</Label>
                  <Input
                    value={claimID}
                    onChange={(e) => setClaimID(e.target.value)}
                    placeholder="13f"
                  />
                </div>
                <div>
                  <Label>Destination Account</Label>
                  <Input
                    value={claimDestination}
                    onChange={(e) => setClaimDestination(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Destination Tag (optional)</Label>
                  <Input
                    value={claimDestTag}
                    onChange={(e) => setClaimDestTag(e.target.value)}
                    placeholder="12345"
                    type="number"
                  />
                </div>
              </div>
              <Button onClick={handleClaim} disabled={loading} className="w-full">
                <Unlock className="h-4 w-4 mr-2" />
                {loading ? "Claiming..." : "Claim Assets"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold text-lg">XChainCreateClaimID</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Other Chain Source</Label>
                  <Input
                    value={createClaimOtherChainSource}
                    onChange={(e) => setCreateClaimOtherChainSource(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Signature Reward</Label>
                  <Input
                    value={createClaimSignatureReward}
                    onChange={(e) => setCreateClaimSignatureReward(e.target.value)}
                    placeholder="200"
                  />
                </div>
              </div>
              <Button onClick={handleCreateClaimID} disabled={loading} variant="outline" className="w-full">
                Create Claim ID
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="attestation" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">XChainAddClaimAttestation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>XChain Claim ID</Label>
                  <Input
                    value={attestationClaimID}
                    onChange={(e) => setAttestationClaimID(e.target.value)}
                    placeholder="13f"
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    value={attestationAmount}
                    onChange={(e) => setAttestationAmount(e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <div>
                  <Label>Public Key</Label>
                  <Input
                    value={attestationPublicKey}
                    onChange={(e) => setAttestationPublicKey(e.target.value)}
                    placeholder="03XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Signature</Label>
                  <Input
                    value={attestationSignature}
                    onChange={(e) => setAttestationSignature(e.target.value)}
                    placeholder="30XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Other Chain Source (optional)</Label>
                  <Input
                    value={attestationOtherChainSource}
                    onChange={(e) => setAttestationOtherChainSource(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
              <Button onClick={handleAddClaimAttestation} disabled={loading} className="w-full">
                Add Claim Attestation
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold text-lg">XChainAddAccountCreateAttestation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    value={attestationAmount}
                    onChange={(e) => setAttestationAmount(e.target.value)}
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <Label>Other Chain Source</Label>
                  <Input
                    value={attestationOtherChainSource}
                    onChange={(e) => setAttestationOtherChainSource(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Public Key</Label>
                  <Input
                    value={attestationPublicKey}
                    onChange={(e) => setAttestationPublicKey(e.target.value)}
                    placeholder="03XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label>Signature</Label>
                  <Input
                    value={attestationSignature}
                    onChange={(e) => setAttestationSignature(e.target.value)}
                    placeholder="30XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
              </div>
              <Button onClick={handleAddAccountCreateAttestation} disabled={loading} variant="outline" className="w-full">
                Add Account Create Attestation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CrossChainBridge;

