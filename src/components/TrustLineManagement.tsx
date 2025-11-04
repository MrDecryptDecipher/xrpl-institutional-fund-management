"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Link2, List, Shield } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError, formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

// TrustSet Flags
const TRUST_FLAGS = {
  tfSetfAuth: 0x00010000,        // 65536
  tfSetNoRipple: 0x00020000,     // 131072
  tfClearNoRipple: 0x00040000,   // 262144
  tfSetFreeze: 0x00100000,       // 1048576
  tfClearFreeze: 0x00200000,     // 2097152
};

interface TrustLineManagementProps {
  xrplAccount: string;
}

export default function TrustLineManagement({ xrplAccount }: TrustLineManagementProps) {
  // Create/Modify Trust Line State
  const [currency, setCurrency] = useState("");
  const [issuer, setIssuer] = useState("");
  const [limit, setLimit] = useState("");
  const [qualityIn, setQualityIn] = useState("");
  const [qualityOut, setQualityOut] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<number[]>([]);
  const [createLoading, setCreateLoading] = useState(false);

  // List Trust Lines State
  const [trustLines, setTrustLines] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // Handle flag selection
  const toggleFlag = (flag: number) => {
    setSelectedFlags(prev => 
      prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
    );
  };

  // Handle TrustSet
  const handleTrustSet = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!currency || !issuer || !limit) {
      toast.error("Currency, Issuer, and Limit are required");
      return;
    }

    if (currency.toUpperCase() === "XRP") {
      toast.error("Cannot create trust line for XRP");
      return;
    }

    setCreateLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const trustSetTx: any = {
        TransactionType: "TrustSet",
        Account: xrplAccount,
        LimitAmount: {
          currency: currency.length === 3 ? currency.toUpperCase() : currency,
          issuer: issuer,
          value: limit
        }
      };

      // Add optional fields
      if (qualityIn) {
        trustSetTx.QualityIn = parseInt(qualityIn);
      }

      if (qualityOut) {
        trustSetTx.QualityOut = parseInt(qualityOut);
      }

      // Combine flags
      if (selectedFlags.length > 0) {
        trustSetTx.Flags = selectedFlags.reduce((acc, flag) => acc | flag, 0);
      }

      toast.info("Preparing TrustSet transaction...");

      const prepared = await client.autofill(trustSetTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting TrustSet transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Trust line created/modified successfully!");
          // Reset form
          setCurrency("");
          setIssuer("");
          setLimit("");
          setQualityIn("");
          setQualityOut("");
          setSelectedFlags([]);
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("TrustSet error:", error);
      toast.error(error.message || "Failed to create/modify trust line");
    } finally {
      await client.disconnect();
      setCreateLoading(false);
    }
  };

  // List Trust Lines
  const handleListTrustLines = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    setListLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      
      const response = await client.request({
        command: "account_lines",
        account: xrplAccount,
        ledger_index: "validated"
      });

      setTrustLines(response.result.lines || []);
      toast.success(`Found ${response.result.lines?.length || 0} trust line(s)`);

    } catch (error: any) {
      console.error("List trust lines error:", error);
      toast.error(error.message || "Failed to list trust lines");
    } finally {
      await client.disconnect();
      setListLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Link2 className="h-8 w-8 text-teal-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trust Line Management</h2>
          <p className="text-sm text-gray-600">Manage token trust relationships</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create/Modify Trust Line</TabsTrigger>
          <TabsTrigger value="list">List Trust Lines</TabsTrigger>
        </TabsList>

        {/* Create/Modify Trust Line Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span>Create or Modify Trust Line</span>
              </CardTitle>
              <CardDescription>
                Establish trust to hold tokens from an issuer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency Code *</Label>
                  <Input
                    id="currency"
                    placeholder="USD or 160-bit hex"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">3-letter ISO 4217 or hex format</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer Address *</Label>
                  <Input
                    id="issuer"
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit">Trust Limit *</Label>
                <Input
                  id="limit"
                  placeholder="1000000"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
                <p className="text-xs text-gray-500">Maximum amount you trust this issuer for (0 to remove trust line)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualityIn">Quality In (optional)</Label>
                  <Input
                    id="qualityIn"
                    type="number"
                    placeholder="1000000000"
                    value={qualityIn}
                    onChange={(e) => setQualityIn(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Ratio per 1B units (0 = face value)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualityOut">Quality Out (optional)</Label>
                  <Input
                    id="qualityOut"
                    type="number"
                    placeholder="1000000000"
                    value={qualityOut}
                    onChange={(e) => setQualityOut(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Ratio per 1B units (0 = face value)</p>
                </div>
              </div>

              {/* Trust Line Flags */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-3">Trust Line Flags</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(TRUST_FLAGS.tfSetfAuth)}
                      onChange={() => toggleFlag(TRUST_FLAGS.tfSetfAuth)}
                      className="rounded"
                    />
                    <span className="text-sm">Authorize (tfSetfAuth) - Pre-authorize trust line</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(TRUST_FLAGS.tfSetNoRipple)}
                      onChange={() => toggleFlag(TRUST_FLAGS.tfSetNoRipple)}
                      className="rounded"
                    />
                    <span className="text-sm">Set No Ripple (tfSetNoRipple) - Block rippling</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(TRUST_FLAGS.tfClearNoRipple)}
                      onChange={() => toggleFlag(TRUST_FLAGS.tfClearNoRipple)}
                      className="rounded"
                    />
                    <span className="text-sm">Clear No Ripple (tfClearNoRipple) - Allow rippling</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(TRUST_FLAGS.tfSetFreeze)}
                      onChange={() => toggleFlag(TRUST_FLAGS.tfSetFreeze)}
                      className="rounded"
                    />
                    <span className="text-sm">Freeze (tfSetFreeze) - Freeze trust line</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(TRUST_FLAGS.tfClearFreeze)}
                      onChange={() => toggleFlag(TRUST_FLAGS.tfClearFreeze)}
                      className="rounded"
                    />
                    <span className="text-sm">Unfreeze (tfClearFreeze) - Unfreeze trust line</span>
                  </label>
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Setting limit to "0" removes the trust line. 
                  No Ripple prevents this trust line from being used in payment paths.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleTrustSet}
                disabled={createLoading}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                {createLoading ? "Processing..." : "Create/Modify Trust Line"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List Trust Lines Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <List className="h-5 w-5 text-purple-600" />
                <span>Your Trust Lines</span>
              </CardTitle>
              <CardDescription>
                View all trust lines for this account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleListTrustLines}
                disabled={listLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {listLoading ? "Loading Trust Lines..." : "Refresh Trust Line List"}
              </Button>

              {trustLines.length > 0 ? (
                <div className="space-y-3">
                  {trustLines.map((line, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            {line.currency}
                          </span>
                          <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                            {parseFloat(line.balance) === 0 ? "Unused" : "Active"}
                          </span>
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="font-mono break-all">
                            <strong>Issuer:</strong> {line.account}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <p>
                              <strong>Balance:</strong> {line.balance}
                            </p>
                            <p>
                              <strong>Limit:</strong> {line.limit}
                            </p>
                            {line.limit_peer && (
                              <p>
                                <strong>Peer Limit:</strong> {line.limit_peer}
                              </p>
                            )}
                            {line.quality_in && (
                              <p>
                                <strong>Quality In:</strong> {line.quality_in}
                              </p>
                            )}
                            {line.quality_out && (
                              <p>
                                <strong>Quality Out:</strong> {line.quality_out}
                              </p>
                            )}
                          </div>

                          {/* Flags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {line.no_ripple && (
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                No Ripple
                              </span>
                            )}
                            {line.no_ripple_peer && (
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                No Ripple (Peer)
                              </span>
                            )}
                            {line.freeze && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                Frozen
                              </span>
                            )}
                            {line.freeze_peer && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                Frozen (Peer)
                              </span>
                            )}
                            {line.authorized && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                                Authorized
                              </span>
                            )}
                            {line.peer_authorized && (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                                Peer Authorized
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    No trust lines found. Create one using the "Create/Modify Trust Line" tab.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

