"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { TrendingUp, X, BookOpen, RefreshCw } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError, formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

// OfferCreate Flags
const OFFER_FLAGS = {
  tfPassive: 0x00010000,           // 65536
  tfImmediateOrCancel: 0x00020000, // 131072
  tfFillOrKill: 0x00040000,        // 262144
  tfSell: 0x00080000,              // 524288
};

interface DEXTradingProps {
  xrplAccount: string;
}

export default function DEXTrading({ xrplAccount }: DEXTradingProps) {
  // Create Offer State
  const [takerGetsCurrency, setTakerGetsCurrency] = useState("XRP");
  const [takerGetsIssuer, setTakerGetsIssuer] = useState("");
  const [takerGetsValue, setTakerGetsValue] = useState("");
  const [takerPaysCurrency, setTakerPaysCurrency] = useState("");
  const [takerPaysIssuer, setTakerPaysIssuer] = useState("");
  const [takerPaysValue, setTakerPaysValue] = useState("");
  const [expiration, setExpiration] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<number[]>([]);
  const [createLoading, setCreateLoading] = useState(false);

  // Cancel Offer State
  const [offerSequence, setOfferSequence] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  // Order Book State
  const [orderBook, setOrderBook] = useState<any[]>([]);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookTakerGetsCurrency, setBookTakerGetsCurrency] = useState("XRP");
  const [bookTakerGetsIssuer, setBookTakerGetsIssuer] = useState("");
  const [bookTakerPaysCurrency, setBookTakerPaysCurrency] = useState("USD");
  const [bookTakerPaysIssuer, setBookTakerPaysIssuer] = useState("rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B");

  // My Offers State
  const [myOffers, setMyOffers] = useState<any[]>([]);
  const [myOffersLoading, setMyOffersLoading] = useState(false);

  // Handle flag selection
  const toggleFlag = (flag: number) => {
    setSelectedFlags(prev => 
      prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
    );
  };

  // Handle OfferCreate
  const handleOfferCreate = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!takerGetsValue || !takerPaysValue) {
      toast.error("TakerGets and TakerPays amounts are required");
      return;
    }

    setCreateLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      // Build TakerGets
      const takerGets: any = takerGetsCurrency === "XRP" 
        ? takerGetsValue 
        : {
            currency: takerGetsCurrency,
            issuer: takerGetsIssuer,
            value: takerGetsValue
          };

      // Build TakerPays
      const takerPays: any = takerPaysCurrency === "XRP"
        ? takerPaysValue
        : {
            currency: takerPaysCurrency,
            issuer: takerPaysIssuer,
            value: takerPaysValue
          };

      const offerTx: any = {
        TransactionType: "OfferCreate",
        Account: xrplAccount,
        TakerGets: takerGets,
        TakerPays: takerPays
      };

      // Add optional fields
      if (expiration) {
        // Convert to Ripple Epoch (seconds since Jan 1, 2000)
        const rippleEpoch = Math.floor(new Date(expiration).getTime() / 1000) - 946684800;
        offerTx.Expiration = rippleEpoch;
      }

      // Combine flags
      if (selectedFlags.length > 0) {
        offerTx.Flags = selectedFlags.reduce((acc, flag) => acc | flag, 0);
      }

      toast.info("Preparing OfferCreate transaction...");

      const prepared = await client.autofill(offerTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting OfferCreate transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Offer created successfully!");
          // Reset form
          setTakerGetsValue("");
          setTakerPaysValue("");
          setExpiration("");
          setSelectedFlags([]);
          // Refresh my offers
          handleListMyOffers();
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("OfferCreate error:", error);
      toast.error(error.message || "Failed to create offer");
    } finally {
      await client.disconnect();
      setCreateLoading(false);
    }
  };

  // Handle OfferCancel
  const handleOfferCancel = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!offerSequence) {
      toast.error("Offer Sequence is required");
      return;
    }

    setCancelLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      
      const cancelTx: any = {
        TransactionType: "OfferCancel",
        Account: xrplAccount,
        OfferSequence: parseInt(offerSequence)
      };

      toast.info("Preparing OfferCancel transaction...");

      const prepared = await client.autofill(cancelTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting OfferCancel transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Offer cancelled successfully!");
          setOfferSequence("");
          // Refresh my offers
          handleListMyOffers();
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("OfferCancel error:", error);
      toast.error(error.message || "Failed to cancel offer");
    } finally {
      await client.disconnect();
      setCancelLoading(false);
    }
  };

  // Fetch Order Book
  const handleFetchOrderBook = async () => {
    setBookLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();

      const takerGets: any = bookTakerGetsCurrency === "XRP"
        ? { currency: "XRP" }
        : { currency: bookTakerGetsCurrency, issuer: bookTakerGetsIssuer };

      const takerPays: any = bookTakerPaysCurrency === "XRP"
        ? { currency: "XRP" }
        : { currency: bookTakerPaysCurrency, issuer: bookTakerPaysIssuer };

      const response = await client.request({
        command: "book_offers",
        taker_gets: takerGets,
        taker_pays: takerPays,
        limit: 20,
        ledger_index: "validated"
      });

      setOrderBook(response.result.offers || []);
      toast.success(`Found ${response.result.offers?.length || 0} offer(s) in order book`);

    } catch (error: any) {
      console.error("Fetch order book error:", error);
      toast.error(error.message || "Failed to fetch order book");
    } finally {
      await client.disconnect();
      setBookLoading(false);
    }
  };

  // List My Offers
  const handleListMyOffers = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    setMyOffersLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      
      const response = await client.request({
        command: "account_offers",
        account: xrplAccount,
        ledger_index: "validated"
      });

      setMyOffers(response.result.offers || []);
      toast.success(`Found ${response.result.offers?.length || 0} active offer(s)`);

    } catch (error: any) {
      console.error("List my offers error:", error);
      toast.error(error.message || "Failed to list offers");
    } finally {
      await client.disconnect();
      setMyOffersLoading(false);
    }
  };

  // Auto-load my offers on mount
  useEffect(() => {
    if (xrplAccount) {
      handleListMyOffers();
    }
  }, [xrplAccount]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="h-8 w-8 text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">DEX Trading</h2>
          <p className="text-sm text-gray-600">Decentralized exchange order management</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Offer</TabsTrigger>
          <TabsTrigger value="cancel">Cancel Offer</TabsTrigger>
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="myoffers">My Offers</TabsTrigger>
        </TabsList>

        {/* Create Offer Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span>Create DEX Offer</span>
              </CardTitle>
              <CardDescription>
                Place an offer on the decentralized exchange
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TakerGets (What you're selling) */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Taker Gets (You Sell)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input
                      placeholder="XRP or USD"
                      value={takerGetsCurrency}
                      onChange={(e) => setTakerGetsCurrency(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer (if not XRP)</Label>
                    <Input
                      placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      value={takerGetsIssuer}
                      onChange={(e) => setTakerGetsIssuer(e.target.value)}
                      disabled={takerGetsCurrency === "XRP"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount *</Label>
                    <Input
                      placeholder="1000"
                      value={takerGetsValue}
                      onChange={(e) => setTakerGetsValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* TakerPays (What you're buying) */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Taker Pays (You Buy)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Input
                      placeholder="XRP or USD"
                      value={takerPaysCurrency}
                      onChange={(e) => setTakerPaysCurrency(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer (if not XRP)</Label>
                    <Input
                      placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      value={takerPaysIssuer}
                      onChange={(e) => setTakerPaysIssuer(e.target.value)}
                      disabled={takerPaysCurrency === "XRP"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount *</Label>
                    <Input
                      placeholder="50"
                      value={takerPaysValue}
                      onChange={(e) => setTakerPaysValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="space-y-2">
                <Label>Expiration (optional)</Label>
                <Input
                  type="datetime-local"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                />
                <p className="text-xs text-gray-500">Offer expires after this time</p>
              </div>

              {/* Offer Flags */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Offer Flags</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(OFFER_FLAGS.tfPassive)}
                      onChange={() => toggleFlag(OFFER_FLAGS.tfPassive)}
                      className="rounded"
                    />
                    <span className="text-sm">Passive - Don't consume exact matches</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(OFFER_FLAGS.tfImmediateOrCancel)}
                      onChange={() => toggleFlag(OFFER_FLAGS.tfImmediateOrCancel)}
                      className="rounded"
                    />
                    <span className="text-sm">Immediate or Cancel - Execute immediately or cancel</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(OFFER_FLAGS.tfFillOrKill)}
                      onChange={() => toggleFlag(OFFER_FLAGS.tfFillOrKill)}
                      className="rounded"
                    />
                    <span className="text-sm">Fill or Kill - Must fill completely or cancel</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(OFFER_FLAGS.tfSell)}
                      onChange={() => toggleFlag(OFFER_FLAGS.tfSell)}
                      className="rounded"
                    />
                    <span className="text-sm">Sell - Exchange entire TakerGets amount</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleOfferCreate}
                disabled={createLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {createLoading ? "Creating Offer..." : "Create Offer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cancel Offer Tab */}
        <TabsContent value="cancel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <X className="h-5 w-5 text-red-600" />
                <span>Cancel Offer</span>
              </CardTitle>
              <CardDescription>Remove an offer from the order book</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Offer Sequence Number *</Label>
                <Input
                  type="number"
                  placeholder="Enter sequence number"
                  value={offerSequence}
                  onChange={(e) => setOfferSequence(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Find sequence numbers in "My Offers" tab
                </p>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Returns tesSUCCESS even if offer doesn't exist.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleOfferCancel}
                disabled={cancelLoading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {cancelLoading ? "Cancelling..." : "Cancel Offer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Book Tab */}
        <TabsContent value="orderbook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Order Book</span>
              </CardTitle>
              <CardDescription>View offers between two currencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Taker Gets Currency</Label>
                  <Input
                    value={bookTakerGetsCurrency}
                    onChange={(e) => setBookTakerGetsCurrency(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Taker Gets Issuer</Label>
                  <Input
                    value={bookTakerGetsIssuer}
                    onChange={(e) => setBookTakerGetsIssuer(e.target.value)}
                    disabled={bookTakerGetsCurrency === "XRP"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Taker Pays Currency</Label>
                  <Input
                    value={bookTakerPaysCurrency}
                    onChange={(e) => setBookTakerPaysCurrency(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Taker Pays Issuer</Label>
                  <Input
                    value={bookTakerPaysIssuer}
                    onChange={(e) => setBookTakerPaysIssuer(e.target.value)}
                    disabled={bookTakerPaysCurrency === "XRP"}
                  />
                </div>
              </div>

              <Button
                onClick={handleFetchOrderBook}
                disabled={bookLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {bookLoading ? "Loading..." : "Fetch Order Book"}
              </Button>

              {orderBook.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {orderBook.map((offer, index) => (
                    <Card key={index} className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <div className="text-xs space-y-1">
                        <p className="font-mono"><strong>Account:</strong> {offer.Account}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <p><strong>Gets:</strong> {typeof offer.TakerGets === 'string' ? `${offer.TakerGets} drops` : `${offer.TakerGets.value} ${offer.TakerGets.currency}`}</p>
                          <p><strong>Pays:</strong> {typeof offer.TakerPays === 'string' ? `${offer.TakerPays} drops` : `${offer.TakerPays.value} ${offer.TakerPays.currency}`}</p>
                          <p><strong>Sequence:</strong> {offer.Sequence}</p>
                          <p><strong>Quality:</strong> {offer.quality || 'N/A'}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Offers Tab */}
        <TabsContent value="myoffers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <span>My Active Offers</span>
              </CardTitle>
              <CardDescription>Your current offers on the DEX</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleListMyOffers}
                disabled={myOffersLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {myOffersLoading ? "Loading..." : "Refresh My Offers"}
              </Button>

              {myOffers.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {myOffers.map((offer, index) => (
                    <Card key={index} className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Sequence: {offer.seq}</span>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setOfferSequence(offer.seq.toString());
                              handleOfferCancel();
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p><strong>Gets:</strong> {typeof offer.taker_gets === 'string' ? `${offer.taker_gets} drops` : `${offer.taker_gets.value} ${offer.taker_gets.currency}`}</p>
                          <p><strong>Pays:</strong> {typeof offer.taker_pays === 'string' ? `${offer.taker_pays} drops` : `${offer.taker_pays.value} ${offer.taker_pays.currency}`}</p>
                          {offer.expiration && <p><strong>Expires:</strong> {new Date((offer.expiration + 946684800) * 1000).toLocaleString()}</p>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>No active offers found.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

