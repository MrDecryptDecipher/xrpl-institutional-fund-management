/**
 * Batch Transaction Engine Component
 * Atomic execution of up to 8 transactions with 4 execution modes
 * Implements Batch transaction per XRPL documentation
 */

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Layers, Plus, Trash2, Send, AlertCircle } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

// Batch Flags
const BATCH_FLAGS = {
  tfAllOrNothing: 0x00010000,  // 65536 - All succeed or all fail
  tfOnlyOne: 0x00020000,       // 131072 - Only first success
  tfUntilFailure: 0x00040000,  // 262144 - Until first failure
  tfIndependent: 0x00080000,   // 524288 - All execute independently
};

const TF_INNER_BATCH_TXN = 0x40000000; // 1073741824

interface InnerTransaction {
  id: string;
  transactionType: string;
  account: string;
  sequence: number;
  data: any;
}

interface BatchSigner {
  account: string;
  signingPubKey: string;
  txnSignature: string;
}

interface BatchTransactionEngineProps {
  xrplAccount: string;
}

const BatchTransactionEngine: React.FC<BatchTransactionEngineProps> = ({ xrplAccount }) => {
  const [client] = useState(() => new Client(XRPL_NETWORKS.testnet));
  
  // Batch configuration
  const [batchMode, setBatchMode] = useState<"tfAllOrNothing" | "tfOnlyOne" | "tfUntilFailure" | "tfIndependent">("tfAllOrNothing");
  const [innerTransactions, setInnerTransactions] = useState<InnerTransaction[]>([]);
  const [batchSigners, setBatchSigners] = useState<BatchSigner[]>([]);
  
  // New transaction form
  const [newTxType, setNewTxType] = useState("Payment");
  const [newTxAccount, setNewTxAccount] = useState(xrplAccount);
  const [newTxSequence, setNewTxSequence] = useState(1);
  const [newTxData, setNewTxData] = useState("{}");
  
  // Execution
  const [loading, setLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const addInnerTransaction = () => {
    if (innerTransactions.length >= 8) {
      toast.error("Maximum 8 transactions allowed in a batch");
      return;
    }

    try {
      const data = JSON.parse(newTxData);
      
      const newTx: InnerTransaction = {
        id: `tx-${Date.now()}`,
        transactionType: newTxType,
        account: newTxAccount,
        sequence: newTxSequence,
        data
      };

      setInnerTransactions(prev => [...prev, newTx]);
      toast.success("Transaction added to batch");
      
      // Reset form
      setNewTxSequence(prev => prev + 1);
      setNewTxData("{}");
    } catch (error) {
      toast.error("Invalid JSON data");
    }
  };

  const removeInnerTransaction = (id: string) => {
    setInnerTransactions(prev => prev.filter(tx => tx.id !== id));
    toast.success("Transaction removed from batch");
  };

  const addBatchSigner = () => {
    const newSigner: BatchSigner = {
      account: "",
      signingPubKey: "",
      txnSignature: ""
    };
    setBatchSigners(prev => [...prev, newSigner]);
  };

  const updateBatchSigner = (index: number, field: keyof BatchSigner, value: string) => {
    setBatchSigners(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeBatchSigner = (index: number) => {
    setBatchSigners(prev => prev.filter((_, i) => i !== index));
  };

  const executeBatch = async () => {
    if (innerTransactions.length === 0) {
      toast.error("Add at least one transaction to the batch");
      return;
    }

    const walletSeed = prompt("Enter your wallet seed to sign the batch transaction:");
    if (!walletSeed) {
      toast.error("Wallet seed required");
      return;
    }

    setLoading(true);
    try {
      await client.connect();
      const wallet = Wallet.fromSeed(walletSeed);

      // Build RawTransactions array
      const rawTransactions = innerTransactions.map(tx => {
        const innerTx: any = {
          TransactionType: tx.transactionType,
          Account: tx.account,
          Sequence: tx.sequence,
          Fee: "0",
          SigningPubKey: "",
          Flags: TF_INNER_BATCH_TXN,
          ...tx.data
        };

        return { RawTransaction: innerTx };
      });

      // Build Batch transaction
      const batchTx: any = {
        TransactionType: "Batch",
        Account: xrplAccount,
        Flags: BATCH_FLAGS[batchMode],
        RawTransactions: rawTransactions
      };

      // Add BatchSigners if multiple accounts
      const uniqueAccounts = new Set(innerTransactions.map(tx => tx.account));
      if (uniqueAccounts.size > 1 && batchSigners.length > 0) {
        batchTx.BatchSigners = batchSigners.map(signer => ({
          BatchSigner: {
            Account: signer.account,
            SigningPubKey: signer.signingPubKey,
            TxnSignature: signer.txnSignature
          }
        }));
      }

      // Autofill, sign, and submit
      const prepared = await client.autofill(batchTx);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);

      setExecutionResult(result);

      if (result.result.meta.TransactionResult === "tesSUCCESS") {
        toast.success("Batch transaction executed successfully!");
      } else {
        toast.error(`Batch failed: ${result.result.meta.TransactionResult}`);
      }

    } catch (error: any) {
      const xrplError = getXRPLError(error.message || error.toString());
      toast.error(`Batch execution failed: ${xrplError.message}`);
      console.error("Batch error:", error);
    } finally {
      setLoading(false);
      await client.disconnect();
    }
  };

  const clearBatch = () => {
    setInnerTransactions([]);
    setBatchSigners([]);
    setExecutionResult(null);
    toast.success("Batch cleared");
  };

  const getBatchModeDescription = (mode: string): string => {
    switch (mode) {
      case "tfAllOrNothing":
        return "All transactions must succeed or the entire batch fails";
      case "tfOnlyOne":
        return "Only the first successful transaction is applied";
      case "tfUntilFailure":
        return "Transactions are applied until the first failure";
      case "tfIndependent":
        return "All transactions execute independently regardless of failures";
      default:
        return "";
    }
  };

  const transactionTypes = [
    "Payment",
    "OfferCreate",
    "OfferCancel",
    "TrustSet",
    "AccountSet",
    "SignerListSet",
    "EscrowCreate",
    "EscrowFinish",
    "EscrowCancel",
    "PaymentChannelCreate",
    "PaymentChannelFund",
    "PaymentChannelClaim"
  ];

  return (
    <Card className="w-full border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
      <CardHeader className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="h-8 w-8 text-orange-600" />
            <div>
              <CardTitle className="text-2xl text-orange-900">Batch Transaction Engine</CardTitle>
              <CardDescription className="text-orange-700">
                Atomic execution of up to 8 transactions
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-orange-500">
            {innerTransactions.length}/8 Transactions
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="transactions">Transactions ({innerTransactions.length})</TabsTrigger>
            <TabsTrigger value="signers">Signers ({batchSigners.length})</TabsTrigger>
            <TabsTrigger value="execute">Execute</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-4">
            <div>
              <Label>Batch Execution Mode</Label>
              <select
                value={batchMode}
                onChange={(e) => setBatchMode(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="tfAllOrNothing">All or Nothing (65536)</option>
                <option value="tfOnlyOne">Only One (131072)</option>
                <option value="tfUntilFailure">Until Failure (262144)</option>
                <option value="tfIndependent">Independent (524288)</option>
              </select>
              <p className="text-sm text-gray-600 mt-2">
                {getBatchModeDescription(batchMode)}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Batch Transaction Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Maximum 8 inner transactions</li>
                    <li>Each inner transaction must have Fee="0"</li>
                    <li>Inner transactions must have tfInnerBatchTxn flag (1073741824)</li>
                    <li>Inner transactions must not be signed (empty SigningPubKey)</li>
                    <li>Multi-account batches require BatchSigners</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Transaction Type</Label>
                <select
                  value={newTxType}
                  onChange={(e) => setNewTxType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {transactionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Account</Label>
                <Input
                  value={newTxAccount}
                  onChange={(e) => setNewTxAccount(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Sequence</Label>
                <Input
                  type="number"
                  value={newTxSequence}
                  onChange={(e) => setNewTxSequence(parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addInnerTransaction} className="w-full" disabled={innerTransactions.length >= 8}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </div>
            </div>

            <div>
              <Label>Transaction Data (JSON)</Label>
              <textarea
                value={newTxData}
                onChange={(e) => setNewTxData(e.target.value)}
                className="w-full h-32 p-2 border rounded-md font-mono text-sm"
                placeholder='{"Destination": "rXXX...", "Amount": "1000000"}'
              />
            </div>

            <div className="space-y-2">
              <Label>Inner Transactions ({innerTransactions.length}/8)</Label>
              <div className="h-[300px] border overflow-y-auto rounded-md p-2">
                {innerTransactions.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No transactions added yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {innerTransactions.map((tx, index) => (
                      <Card key={tx.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">#{index + 1}</Badge>
                              <Badge className="bg-blue-500">{tx.transactionType}</Badge>
                              <span className="text-xs text-gray-500">Seq: {tx.sequence}</span>
                            </div>
                            <p className="text-xs font-mono text-gray-600 mb-1">
                              Account: {tx.account.slice(0, 20)}...
                            </p>
                            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                              {JSON.stringify(tx.data, null, 2)}
                            </pre>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInnerTransaction(tx.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signers" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Batch Signers (for multi-account batches)</Label>
              <Button onClick={addBatchSigner} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Signer
              </Button>
            </div>

            <div className="h-[400px] overflow-y-auto">
              {batchSigners.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No additional signers. Required only for multi-account batches.
                </div>
              ) : (
                <div className="space-y-4">
                  {batchSigners.map((signer, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge>Signer {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBatchSigner(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div>
                          <Label>Account</Label>
                          <Input
                            value={signer.account}
                            onChange={(e) => updateBatchSigner(index, "account", e.target.value)}
                            placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                          />
                        </div>
                        <div>
                          <Label>Signing Public Key</Label>
                          <Input
                            value={signer.signingPubKey}
                            onChange={(e) => updateBatchSigner(index, "signingPubKey", e.target.value)}
                            placeholder="03XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                          />
                        </div>
                        <div>
                          <Label>Transaction Signature</Label>
                          <Input
                            value={signer.txnSignature}
                            onChange={(e) => updateBatchSigner(index, "txnSignature", e.target.value)}
                            placeholder="30XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="execute" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-900">
                  <p className="font-semibold mb-1">Execution Summary:</p>
                  <ul className="space-y-1">
                    <li>• Mode: <strong>{batchMode}</strong> ({BATCH_FLAGS[batchMode]})</li>
                    <li>• Transactions: <strong>{innerTransactions.length}/8</strong></li>
                    <li>• Signers: <strong>{batchSigners.length}</strong></li>
                    <li>• Unique Accounts: <strong>{new Set(innerTransactions.map(tx => tx.account)).size}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={executeBatch} disabled={loading || innerTransactions.length === 0} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Executing..." : "Execute Batch"}
              </Button>
              <Button onClick={clearBatch} variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {executionResult && (
              <div className="space-y-2">
                <Label>Execution Result</Label>
                <div className="h-[300px] border overflow-y-auto rounded-md p-4">
                  <pre className="text-xs">
                    {JSON.stringify(executionResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BatchTransactionEngine;

