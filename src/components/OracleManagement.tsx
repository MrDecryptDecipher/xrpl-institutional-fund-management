"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Database, Trash2, TrendingUp, Plus, X } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError, formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

interface PriceDataEntry {
  BaseAsset: string;
  QuoteAsset: string;
  AssetPrice?: string;
  Scale?: number;
}

interface OracleManagementProps {
  xrplAccount: string;
}

export default function OracleManagement({ xrplAccount }: OracleManagementProps) {
  // OracleSet State
  const [oracleDocumentID, setOracleDocumentID] = useState("");
  const [provider, setProvider] = useState("");
  const [uri, setUri] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [priceDataSeries, setPriceDataSeries] = useState<PriceDataEntry[]>([
    { BaseAsset: "", QuoteAsset: "", AssetPrice: "", Scale: 3 }
  ]);
  const [loading, setLoading] = useState(false);

  // OracleDelete State
  const [deleteDocumentID, setDeleteDocumentID] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // List State
  const [oracles, setOracles] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // Helper: Convert string to hex
  const stringToHex = (str: string): string => {
    return Buffer.from(str, 'utf8').toString('hex').toUpperCase();
  };

  // Helper: Get current time in seconds since UNIX Epoch
  const getCurrentUnixTime = (): number => {
    return Math.floor(Date.now() / 1000);
  };

  // Add new price data entry
  const addPriceDataEntry = () => {
    if (priceDataSeries.length >= 10) {
      toast.error("Maximum 10 price data entries allowed");
      return;
    }
    setPriceDataSeries([...priceDataSeries, { BaseAsset: "", QuoteAsset: "", AssetPrice: "", Scale: 3 }]);
  };

  // Remove price data entry
  const removePriceDataEntry = (index: number) => {
    if (priceDataSeries.length === 1) {
      toast.error("At least one price data entry required");
      return;
    }
    setPriceDataSeries(priceDataSeries.filter((_, i) => i !== index));
  };

  // Update price data entry
  const updatePriceDataEntry = (index: number, field: keyof PriceDataEntry, value: any) => {
    const updated = [...priceDataSeries];
    updated[index] = { ...updated[index], [field]: value };
    setPriceDataSeries(updated);
  };

  // Handle OracleSet Transaction
  const handleSetOracle = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!oracleDocumentID || !assetClass) {
      toast.error("Oracle Document ID and Asset Class are required");
      return;
    }

    // Validate price data series
    const validPriceData = priceDataSeries.filter(pd => pd.BaseAsset && pd.QuoteAsset);
    if (validPriceData.length === 0) {
      toast.error("At least one valid price data entry required (BaseAsset and QuoteAsset)");
      return;
    }

    setLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      // Build PriceDataSeries array
      const priceDataArray = validPriceData.map(pd => {
        const priceData: any = {
          PriceData: {
            BaseAsset: pd.BaseAsset,
            QuoteAsset: pd.QuoteAsset
          }
        };

        // Only include AssetPrice and Scale if AssetPrice is provided
        if (pd.AssetPrice && pd.AssetPrice.trim() !== "") {
          priceData.PriceData.AssetPrice = pd.AssetPrice;
          priceData.PriceData.Scale = pd.Scale || 0;
        }

        return priceData;
      });

      // Build OracleSet transaction
      const oracleTx: any = {
        TransactionType: "OracleSet",
        Account: xrplAccount,
        OracleDocumentID: parseInt(oracleDocumentID),
        LastUpdateTime: getCurrentUnixTime(),
        AssetClass: stringToHex(assetClass),
        PriceDataSeries: priceDataArray
      };

      // Add optional fields
      if (provider && provider.trim() !== "") {
        oracleTx.Provider = stringToHex(provider);
      }

      if (uri && uri.trim() !== "") {
        oracleTx.URI = stringToHex(uri);
      }

      toast.info("Preparing OracleSet transaction...");

      const prepared = await client.autofill(oracleTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting OracleSet transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success(`Oracle ${oracleDocumentID} set successfully!`);
          // Reset form
          setOracleDocumentID("");
          setProvider("");
          setUri("");
          setAssetClass("");
          setPriceDataSeries([{ BaseAsset: "", QuoteAsset: "", AssetPrice: "", Scale: 3 }]);
        } else {
          const error = getXRPLError(txResult);
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("OracleSet error:", error);
      toast.error(error.message || "Failed to set oracle");
    } finally {
      await client.disconnect();
      setLoading(false);
    }
  };

  // Handle OracleDelete Transaction
  const handleDeleteOracle = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!deleteDocumentID) {
      toast.error("Oracle Document ID is required");
      return;
    }

    setDeleteLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const deleteTx: any = {
        TransactionType: "OracleDelete",
        Account: xrplAccount,
        OracleDocumentID: parseInt(deleteDocumentID)
      };

      toast.info("Preparing OracleDelete transaction...");

      const prepared = await client.autofill(deleteTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting OracleDelete transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success(`Oracle ${deleteDocumentID} deleted successfully!`);
          setDeleteDocumentID("");
        } else {
          const error = getXRPLError(txResult);
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("OracleDelete error:", error);
      toast.error(error.message || "Failed to delete oracle");
    } finally {
      await client.disconnect();
      setDeleteLoading(false);
    }
  };

  // List Oracles
  const handleListOracles = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    setListLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      
      const response = await client.request({
        command: "account_objects",
        account: xrplAccount,
        type: "oracle"
      });

      setOracles(response.result.account_objects || []);
      toast.success(`Found ${response.result.account_objects?.length || 0} oracle(s)`);

    } catch (error: any) {
      console.error("List oracles error:", error);
      toast.error(error.message || "Failed to list oracles");
    } finally {
      await client.disconnect();
      setListLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Database className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Oracle Management</h2>
          <p className="text-sm text-gray-600">Manage price feeds and external data oracles</p>
        </div>
      </div>

      <Tabs defaultValue="set" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="set">Set Oracle</TabsTrigger>
          <TabsTrigger value="delete">Delete Oracle</TabsTrigger>
          <TabsTrigger value="list">List Oracles</TabsTrigger>
        </TabsList>

        {/* Set Oracle Tab */}
        <TabsContent value="set" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Create/Update Oracle</span>
              </CardTitle>
              <CardDescription>
                Set price data for token pairs. Supports up to 10 price data entries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oracleDocumentID">Oracle Document ID *</Label>
                  <Input
                    id="oracleDocumentID"
                    type="number"
                    placeholder="e.g., 34"
                    value={oracleDocumentID}
                    onChange={(e) => setOracleDocumentID(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetClass">Asset Class * (e.g., currency)</Label>
                  <Input
                    id="assetClass"
                    placeholder="currency, commodity, index"
                    value={assetClass}
                    onChange={(e) => setAssetClass(e.target.value)}
                    maxLength={16}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider (optional)</Label>
                  <Input
                    id="provider"
                    placeholder="e.g., Chainlink, Band, DIA"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    maxLength={256}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uri">URI (optional)</Label>
                  <Input
                    id="uri"
                    placeholder="https://example.com/price-data"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    maxLength={256}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Price Data Series ({priceDataSeries.length}/10)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPriceDataEntry}
                    disabled={priceDataSeries.length >= 10}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Entry
                  </Button>
                </div>

                {priceDataSeries.map((entry, index) => (
                  <Card key={index} className="p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">Entry {index + 1}</span>
                      {priceDataSeries.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePriceDataEntry(index)}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Base Asset *</Label>
                        <Input
                          placeholder="e.g., XRP, BTC"
                          value={entry.BaseAsset}
                          onChange={(e) => updatePriceDataEntry(index, 'BaseAsset', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quote Asset *</Label>
                        <Input
                          placeholder="e.g., USD, EUR"
                          value={entry.QuoteAsset}
                          onChange={(e) => updatePriceDataEntry(index, 'QuoteAsset', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Asset Price (optional)</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 740"
                          value={entry.AssetPrice}
                          onChange={(e) => updatePriceDataEntry(index, 'AssetPrice', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Scale (0-10)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="3"
                          value={entry.Scale}
                          onChange={(e) => updatePriceDataEntry(index, 'Scale', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> LastUpdateTime is automatically set to current time. 
                  Scale determines precision (e.g., Scale=3 means 0.740 becomes 740).
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSetOracle}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading ? "Setting Oracle..." : "Set Oracle"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delete Oracle Tab */}
        <TabsContent value="delete" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <span>Delete Oracle</span>
              </CardTitle>
              <CardDescription>
                Remove an oracle ledger entry. Account must match the oracle owner.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deleteDocumentID">Oracle Document ID</Label>
                <Input
                  id="deleteDocumentID"
                  type="number"
                  placeholder="e.g., 34"
                  value={deleteDocumentID}
                  onChange={(e) => setDeleteDocumentID(e.target.value)}
                />
              </div>

              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-sm text-red-800">
                  <strong>Warning:</strong> This action is irreversible. The oracle and all its price data will be permanently deleted.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleDeleteOracle}
                disabled={deleteLoading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? "Deleting Oracle..." : "Delete Oracle"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List Oracles Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Oracles</CardTitle>
              <CardDescription>
                View all oracle entries owned by your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleListOracles}
                disabled={listLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {listLoading ? "Loading Oracles..." : "Refresh Oracle List"}
              </Button>

              {oracles.length > 0 ? (
                <div className="space-y-3">
                  {oracles.map((oracle, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Oracle #{oracle.OracleDocumentID}
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                            {oracle.AssetClass ? Buffer.from(oracle.AssetClass, 'hex').toString('utf8') : 'N/A'}
                          </span>
                        </div>

                        {oracle.Provider && (
                          <p className="text-sm text-gray-600">
                            <strong>Provider:</strong> {Buffer.from(oracle.Provider, 'hex').toString('utf8')}
                          </p>
                        )}

                        {oracle.LastUpdateTime && (
                          <p className="text-sm text-gray-600">
                            <strong>Last Update:</strong> {new Date((oracle.LastUpdateTime + 946684800) * 1000).toLocaleString()}
                          </p>
                        )}

                        {oracle.PriceDataSeries && oracle.PriceDataSeries.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-semibold text-gray-700">Price Data:</p>
                            {oracle.PriceDataSeries.map((pd: any, pdIndex: number) => (
                              <div key={pdIndex} className="text-xs bg-white p-2 rounded border border-purple-100">
                                <div className="grid grid-cols-2 gap-2">
                                  <span><strong>Pair:</strong> {pd.PriceData.BaseAsset}/{pd.PriceData.QuoteAsset}</span>
                                  {pd.PriceData.AssetPrice && (
                                    <span><strong>Price:</strong> {pd.PriceData.AssetPrice} (Scale: {pd.PriceData.Scale || 0})</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    No oracles found. Create one using the "Set Oracle" tab.
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

