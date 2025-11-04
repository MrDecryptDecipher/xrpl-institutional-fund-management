/**
 * Payment Path Finding UI Component
 * Comprehensive path discovery with real-time updates and cost visualization
 * Implements path_find and ripple_path_find per XRPL documentation
 */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Route, TrendingUp, ArrowRight, DollarSign } from "lucide-react";
import { Client } from "xrpl";
import AdvancedAPIService from "@/lib/AdvancedAPIService";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com"
};

interface PathFindingUIProps {
  xrplAccount: string;
}

interface PathAlternative {
  paths_computed: any[];
  source_amount: string | any;
}

interface PathFindResult {
  alternatives: PathAlternative[];
  destination_account: string;
  destination_currencies: string[];
}

const PathFindingUI: React.FC<PathFindingUIProps> = ({ xrplAccount }) => {
  const [apiService] = useState(() => new AdvancedAPIService("testnet"));
  const [client] = useState(() => new Client(XRPL_NETWORKS.testnet));
  
  // Simple path finding (ripple_path_find)
  const [sourceAccount, setSourceAccount] = useState(xrplAccount);
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationAmount, setDestinationAmount] = useState("");
  const [destinationCurrency, setDestinationCurrency] = useState("XRP");
  const [destinationIssuer, setDestinationIssuer] = useState("");
  const [sourceCurrencies, setSourceCurrencies] = useState<string[]>(["XRP"]);
  const [newSourceCurrency, setNewSourceCurrency] = useState("");
  
  // Advanced path finding (path_find with WebSocket)
  const [pathFindActive, setPathFindActive] = useState(false);
  const [pathFindId, setPathFindId] = useState<string | null>(null);
  
  // Results
  const [pathResults, setPathResults] = useState<PathFindResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  useEffect(() => {
    setSourceAccount(xrplAccount);
  }, [xrplAccount]);

  const handleSimplePathFind = async () => {
    if (!sourceAccount || !destinationAccount || !destinationAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const destAmount = destinationCurrency === "XRP" 
        ? destinationAmount 
        : {
            value: destinationAmount,
            currency: destinationCurrency,
            issuer: destinationIssuer
          };

      const sourceCurrs = sourceCurrencies.map(curr => {
        if (curr === "XRP") {
          return { currency: "XRP" };
        }
        const [currency, issuer] = curr.split(":");
        return { currency, issuer };
      });

      const result = await apiService.findPaymentPaths(
        sourceAccount,
        destinationAccount,
        destAmount,
        sourceCurrs
      );

      setPathResults(result);
      toast.success(`Found ${result.alternatives.length} payment paths`);
    } catch (error: any) {
      toast.error(`Path finding failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedPathFind = async (action: "create" | "close" | "status") => {
    try {
      await client.connect();

      if (action === "create") {
        if (!sourceAccount || !destinationAccount || !destinationAmount) {
          toast.error("Please fill in all required fields");
          return;
        }

        const destAmount = destinationCurrency === "XRP" 
          ? destinationAmount 
          : {
              value: destinationAmount,
              currency: destinationCurrency,
              issuer: destinationIssuer
            };

        const sourceCurrs = sourceCurrencies.map(curr => {
          if (curr === "XRP") {
            return { currency: "XRP" };
          }
          const [currency, issuer] = curr.split(":");
          return { currency, issuer };
        });

        const response = await client.request({
          command: "path_find",
          subcommand: "create",
          source_account: sourceAccount,
          destination_account: destinationAccount,
          destination_amount: destAmount,
          source_currencies: sourceCurrs
        });

        setPathFindActive(true);
        setPathFindId(response.id);
        toast.success("Path finding session created");

        // Setup listener for path updates
        client.on("path_find", (data: any) => {
          if (data.alternatives) {
            setPathResults({
              alternatives: data.alternatives,
              destination_account: destinationAccount,
              destination_currencies: data.destination_currencies || []
            });
          }
        });

      } else if (action === "close") {
        await client.request({
          command: "path_find",
          subcommand: "close"
        });

        setPathFindActive(false);
        setPathFindId(null);
        toast.success("Path finding session closed");

      } else if (action === "status") {
        const response = await client.request({
          command: "path_find",
          subcommand: "status"
        });

        toast.success(`Path finding status: ${JSON.stringify(response)}`);
      }

    } catch (error: any) {
      toast.error(`Advanced path finding failed: ${error.message}`);
    }
  };

  const addSourceCurrency = () => {
    if (!newSourceCurrency.trim()) {
      toast.error("Please enter a currency");
      return;
    }

    if (sourceCurrencies.length >= 18) {
      toast.error("Maximum 18 source currencies allowed");
      return;
    }

    setSourceCurrencies(prev => [...prev, newSourceCurrency]);
    setNewSourceCurrency("");
    toast.success("Source currency added");
  };

  const removeSourceCurrency = (index: number) => {
    setSourceCurrencies(prev => prev.filter((_, i) => i !== index));
  };

  const formatAmount = (amount: string | any): string => {
    if (typeof amount === "string") {
      return `${(parseInt(amount) / 1000000).toFixed(6)} XRP`;
    }
    return `${amount.value} ${amount.currency}`;
  };

  const renderPath = (path: any[], index: number) => {
    return (
      <div key={index} className="flex items-center gap-2 flex-wrap">
        {path.map((step, stepIndex) => (
          <React.Fragment key={stepIndex}>
            {stepIndex > 0 && <ArrowRight className="h-4 w-4 text-gray-400" />}
            <Badge variant="outline" className="text-xs">
              {step.account ? `Account: ${step.account.slice(0, 8)}...` : 
               step.currency ? `${step.currency}${step.issuer ? ` (${step.issuer.slice(0, 8)}...)` : ''}` :
               'Unknown'}
            </Badge>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader className="border-b-2 border-violet-200 bg-gradient-to-r from-violet-100 to-purple-100">
        <div className="flex items-center gap-3">
          <Route className="h-8 w-8 text-violet-600" />
          <div>
            <CardTitle className="text-2xl text-violet-900">Payment Path Finding</CardTitle>
            <CardDescription className="text-violet-700">
              Discover optimal payment routes across currencies
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simple">Simple Path Find</TabsTrigger>
            <TabsTrigger value="advanced">Advanced (WebSocket)</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Source Account</Label>
                <Input
                  value={sourceAccount}
                  onChange={(e) => setSourceAccount(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Destination Account</Label>
                <Input
                  value={destinationAccount}
                  onChange={(e) => setDestinationAccount(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Destination Amount</Label>
                <Input
                  value={destinationAmount}
                  onChange={(e) => setDestinationAmount(e.target.value)}
                  placeholder="100"
                  type="number"
                />
              </div>
              <div>
                <Label>Destination Currency</Label>
                <Input
                  value={destinationCurrency}
                  onChange={(e) => setDestinationCurrency(e.target.value)}
                  placeholder="XRP or USD"
                />
              </div>
              {destinationCurrency !== "XRP" && (
                <div className="col-span-2">
                  <Label>Destination Issuer</Label>
                  <Input
                    value={destinationIssuer}
                    onChange={(e) => setDestinationIssuer(e.target.value)}
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Source Currencies ({sourceCurrencies.length}/18)</Label>
              <div className="flex gap-2">
                <Input
                  value={newSourceCurrency}
                  onChange={(e) => setNewSourceCurrency(e.target.value)}
                  placeholder="XRP or USD:rIssuer..."
                  className="flex-1"
                />
                <Button onClick={addSourceCurrency}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sourceCurrencies.map((curr, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSourceCurrency(index)}>
                    {curr} ✕
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={handleSimplePathFind} disabled={loading} className="w-full">
              {loading ? "Finding Paths..." : "Find Payment Paths"}
            </Button>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Source Account</Label>
                <Input
                  value={sourceAccount}
                  onChange={(e) => setSourceAccount(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Destination Account</Label>
                <Input
                  value={destinationAccount}
                  onChange={(e) => setDestinationAccount(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Destination Amount</Label>
                <Input
                  value={destinationAmount}
                  onChange={(e) => setDestinationAmount(e.target.value)}
                  placeholder="100"
                  type="number"
                />
              </div>
              <div>
                <Label>Destination Currency</Label>
                <Input
                  value={destinationCurrency}
                  onChange={(e) => setDestinationCurrency(e.target.value)}
                  placeholder="XRP or USD"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleAdvancedPathFind("create")} 
                disabled={pathFindActive}
                className="flex-1"
              >
                Create Session
              </Button>
              <Button 
                onClick={() => handleAdvancedPathFind("status")} 
                disabled={!pathFindActive}
                variant="outline"
                className="flex-1"
              >
                Check Status
              </Button>
              <Button 
                onClick={() => handleAdvancedPathFind("close")} 
                disabled={!pathFindActive}
                variant="destructive"
                className="flex-1"
              >
                Close Session
              </Button>
            </div>

            {pathFindActive && (
              <Badge className="bg-green-500">
                Active Session (ID: {pathFindId})
              </Badge>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {!pathResults ? (
              <div className="text-center text-gray-500 py-8">
                No path results yet. Run a path finding query first.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Found {pathResults.alternatives.length} Alternative Paths
                  </h3>
                  <Badge variant="outline">
                    To: {pathResults.destination_account.slice(0, 12)}...
                  </Badge>
                </div>

                <div className="h-[400px]">
                  <div className="space-y-3">
                    {pathResults.alternatives.map((alt, index) => (
                      <Card 
                        key={index} 
                        className={`cursor-pointer transition-all ${selectedPath === index ? 'border-violet-500 border-2' : ''}`}
                        onClick={() => setSelectedPath(index)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              Path {index + 1}
                            </CardTitle>
                            <Badge className="bg-violet-500 flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {formatAmount(alt.source_amount)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {alt.paths_computed.map((path, pathIndex) => (
                            <div key={pathIndex} className="p-2 bg-gray-50 rounded">
                              <div className="text-xs text-gray-500 mb-1">Route {pathIndex + 1}</div>
                              {renderPath(path, pathIndex)}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {pathResults.destination_currencies.length > 0 && (
                  <div>
                    <Label>Destination Accepts:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pathResults.destination_currencies.map((curr, index) => (
                        <Badge key={index} variant="secondary">
                          {curr}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PathFindingUI;

