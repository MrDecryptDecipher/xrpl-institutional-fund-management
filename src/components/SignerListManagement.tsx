"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Shield, Plus, Trash2 } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
};

interface SignerEntry {
  account: string;
  weight: number;
}

interface SignerListManagementProps {
  xrplAccount: string;
}

export default function SignerListManagement({ xrplAccount }: SignerListManagementProps) {
  const [signerQuorum, setSignerQuorum] = useState("");
  const [signers, setSigners] = useState<SignerEntry[]>([{ account: "", weight: 1 }]);
  const [loading, setLoading] = useState(false);

  const addSigner = () => {
    if (signers.length >= 32) {
      toast.error("Maximum 32 signers allowed");
      return;
    }
    setSigners([...signers, { account: "", weight: 1 }]);
  };

  const removeSigner = (index: number) => {
    if (signers.length <= 1) {
      toast.error("At least one signer required");
      return;
    }
    setSigners(signers.filter((_, i) => i !== index));
  };

  const updateSigner = (index: number, field: 'account' | 'weight', value: string | number) => {
    const updated = [...signers];
    updated[index] = { ...updated[index], [field]: value };
    setSigners(updated);
  };

  const handleCreateSignerList = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!signerQuorum) {
      toast.error("Signer Quorum is required");
      return;
    }

    const quorum = parseInt(signerQuorum);
    const totalWeight = signers.reduce((sum, s) => sum + s.weight, 0);

    if (quorum <= 0 || quorum > totalWeight) {
      toast.error(`Quorum must be between 1 and ${totalWeight} (total weight)`);
      return;
    }

    // Validate signers
    for (const signer of signers) {
      if (!signer.account || signer.account === xrplAccount) {
        toast.error("Invalid signer address or account cannot sign for itself");
        return;
      }
    }

    setLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const signerListTx: any = {
        TransactionType: "SignerListSet",
        Account: xrplAccount,
        SignerQuorum: quorum,
        SignerEntries: signers.map(s => ({
          SignerEntry: {
            Account: s.account,
            SignerWeight: s.weight
          }
        }))
      };

      toast.info("Preparing SignerListSet transaction...");

      const prepared = await client.autofill(signerListTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting SignerListSet transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Signer list created successfully!");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("SignerListSet error:", error);
      toast.error(error.message || "Failed to create signer list");
    } finally {
      await client.disconnect();
      setLoading(false);
    }
  };

  const handleDeleteSignerList = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    setLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();

      const deleteTx: any = {
        TransactionType: "SignerListSet",
        Account: xrplAccount,
        SignerQuorum: 0
      };

      const prepared = await client.autofill(deleteTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Signer list deleted successfully!");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("Delete signer list error:", error);
      toast.error(error.message || "Failed to delete signer list");
    } finally {
      await client.disconnect();
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-indigo-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Multi-Signature Security</h2>
          <p className="text-sm text-gray-600">Configure signer lists for multi-sig transactions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Signer List</CardTitle>
          <CardDescription>
            Set up multi-signature authorization (1-32 signers)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Signer Quorum *</Label>
            <Input
              type="number"
              placeholder="Minimum total weight required"
              value={signerQuorum}
              onChange={(e) => setSignerQuorum(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Sum of signer weights must meet or exceed this value
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Signers ({signers.length}/32)</h3>
              <Button
                size="sm"
                onClick={addSigner}
                disabled={signers.length >= 32}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Signer
              </Button>
            </div>

            <div className="space-y-3">
              {signers.map((signer, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Account Address</Label>
                    <Input
                      placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      value={signer.account}
                      onChange={(e) => updateSigner(index, 'account', e.target.value)}
                    />
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Weight</Label>
                    <Input
                      type="number"
                      min="1"
                      value={signer.weight}
                      onChange={(e) => updateSigner(index, 'weight', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeSigner(index)}
                    disabled={signers.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-3 p-3 bg-gray-50 rounded">
              <p className="text-sm">
                <strong>Total Weight:</strong> {signers.reduce((sum, s) => sum + s.weight, 0)}
              </p>
            </div>
          </div>

          <Alert>
            <AlertDescription className="text-sm">
              <strong>Important:</strong> Cannot remove last signing method. Ensure master key or regular key is available before deleting signer list.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button
              onClick={handleCreateSignerList}
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? "Processing..." : "Create/Update Signer List"}
            </Button>
            <Button
              onClick={handleDeleteSignerList}
              disabled={loading}
              variant="destructive"
            >
              Delete List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

