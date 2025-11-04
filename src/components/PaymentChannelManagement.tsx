"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Zap, Plus, DollarSign, List } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError, formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

interface PaymentChannelManagementProps {
  xrplAccount: string;
}

export default function PaymentChannelManagement({ xrplAccount }: PaymentChannelManagementProps) {
  // Create Channel State
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [settleDelay, setSettleDelay] = useState("86400"); // 1 day default
  const [publicKey, setPublicKey] = useState("");
  const [cancelAfterDays, setCancelAfterDays] = useState("");
  const [destinationTag, setDestinationTag] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  // Claim Channel State
  const [claimChannelID, setClaimChannelID] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimBalance, setClaimBalance] = useState("");
  const [claimSignature, setClaimSignature] = useState("");
  const [claimPublicKey, setClaimPublicKey] = useState("");
  const [closeChannel, setCloseChannel] = useState(false);
  const [renewChannel, setRenewChannel] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  // Fund Channel State
  const [fundChannelID, setFundChannelID] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundExpirationDays, setFundExpirationDays] = useState("");
  const [fundLoading, setFundLoading] = useState(false);

  // List State
  const [channels, setChannels] = useState<any[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // Helper: Convert days to Ripple time
  const daysToRippleTime = (days: string): number => {
    const rippleEpoch = 946684800; // January 1, 2000 00:00 UTC
    const daysInSeconds = parseInt(days) * 24 * 60 * 60;
    return Math.floor(Date.now() / 1000) - rippleEpoch + daysInSeconds;
  };

  // Handle PaymentChannelCreate
  const handleCreateChannel = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!destination || !amount || !settleDelay || !publicKey) {
      toast.error("Destination, Amount, Settle Delay, and Public Key are required");
      return;
    }

    setCreateLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const channelTx: any = {
        TransactionType: "PaymentChannelCreate",
        Account: xrplAccount,
        Destination: destination,
        Amount: (parseFloat(amount) * 1000000).toString(), // Convert XRP to drops
        SettleDelay: parseInt(settleDelay),
        PublicKey: publicKey
      };

      if (cancelAfterDays) {
        channelTx.CancelAfter = daysToRippleTime(cancelAfterDays);
      }

      if (destinationTag) {
        channelTx.DestinationTag = parseInt(destinationTag);
      }

      toast.info("Preparing PaymentChannelCreate transaction...");

      const prepared = await client.autofill(channelTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting PaymentChannelCreate transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          // Extract Channel ID from metadata
          const meta = result.result.meta as any;
          const createdNode = meta.AffectedNodes?.find((node: any) => 
            node.CreatedNode?.LedgerEntryType === "PayChannel"
          );
          const channelID = createdNode?.CreatedNode?.LedgerIndex;
          
          toast.success(`Payment channel created! Channel ID: ${channelID}`);
          // Reset form
          setDestination("");
          setAmount("");
          setSettleDelay("86400");
          setPublicKey("");
          setCancelAfterDays("");
          setDestinationTag("");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("PaymentChannelCreate error:", error);
      toast.error(error.message || "Failed to create payment channel");
    } finally {
      await client.disconnect();
      setCreateLoading(false);
    }
  };

  // Handle PaymentChannelClaim
  const handleClaimChannel = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!claimChannelID) {
      toast.error("Channel ID is required");
      return;
    }

    setClaimLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const claimTx: any = {
        TransactionType: "PaymentChannelClaim",
        Account: xrplAccount,
        Channel: claimChannelID
      };

      // Add optional fields
      if (claimAmount) {
        claimTx.Amount = (parseFloat(claimAmount) * 1000000).toString();
      }

      if (claimBalance) {
        claimTx.Balance = (parseFloat(claimBalance) * 1000000).toString();
      }

      if (claimSignature) {
        claimTx.Signature = claimSignature;
      }

      if (claimPublicKey) {
        claimTx.PublicKey = claimPublicKey;
      }

      // Set flags
      let flags = 0;
      if (closeChannel) flags |= 0x00020000; // tfClose
      if (renewChannel) flags |= 0x00010000; // tfRenew
      if (flags > 0) claimTx.Flags = flags;

      toast.info("Preparing PaymentChannelClaim transaction...");

      const prepared = await client.autofill(claimTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting PaymentChannelClaim transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Payment channel claim successful!");
          // Reset form
          setClaimChannelID("");
          setClaimAmount("");
          setClaimBalance("");
          setClaimSignature("");
          setClaimPublicKey("");
          setCloseChannel(false);
          setRenewChannel(false);
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("PaymentChannelClaim error:", error);
      toast.error(error.message || "Failed to claim from payment channel");
    } finally {
      await client.disconnect();
      setClaimLoading(false);
    }
  };

  // Handle PaymentChannelFund
  const handleFundChannel = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!fundChannelID || !fundAmount) {
      toast.error("Channel ID and Amount are required");
      return;
    }

    setFundLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const fundTx: any = {
        TransactionType: "PaymentChannelFund",
        Account: xrplAccount,
        Channel: fundChannelID,
        Amount: (parseFloat(fundAmount) * 1000000).toString()
      };

      if (fundExpirationDays) {
        fundTx.Expiration = daysToRippleTime(fundExpirationDays);
      }

      toast.info("Preparing PaymentChannelFund transaction...");

      const prepared = await client.autofill(fundTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting PaymentChannelFund transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Payment channel funded successfully!");
          // Reset form
          setFundChannelID("");
          setFundAmount("");
          setFundExpirationDays("");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("PaymentChannelFund error:", error);
      toast.error(error.message || "Failed to fund payment channel");
    } finally {
      await client.disconnect();
      setFundLoading(false);
    }
  };

  // List Payment Channels
  const handleListChannels = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    setListLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      
      const response = await client.request({
        command: "account_channels",
        account: xrplAccount,
        ledger_index: "validated"
      });

      setChannels(response.result.channels || []);
      toast.success(`Found ${response.result.channels?.length || 0} payment channel(s)`);

    } catch (error: any) {
      console.error("List channels error:", error);
      toast.error(error.message || "Failed to list payment channels");
    } finally {
      await client.disconnect();
      setListLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Zap className="h-8 w-8 text-yellow-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Channel Management</h2>
          <p className="text-sm text-gray-600">Micropayments with off-ledger claims</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Channel</TabsTrigger>
          <TabsTrigger value="claim">Claim</TabsTrigger>
          <TabsTrigger value="fund">Fund</TabsTrigger>
          <TabsTrigger value="list">List Channels</TabsTrigger>
        </TabsList>

        {/* Create Channel Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-yellow-600" />
                <span>Create Payment Channel</span>
              </CardTitle>
              <CardDescription>
                Set up a payment channel for micropayments with off-ledger claims
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Address *</Label>
                  <Input
                    id="destination"
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (XRP) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="settleDelay">Settle Delay (seconds) *</Label>
                  <Input
                    id="settleDelay"
                    type="number"
                    placeholder="86400 (1 day)"
                    value={settleDelay}
                    onChange={(e) => setSettleDelay(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicKey">Public Key (hex) *</Label>
                  <Input
                    id="publicKey"
                    placeholder="023693F15967AE357D0327974AD46FE3C127113B..."
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cancelAfterDays">Cancel After (days, optional)</Label>
                  <Input
                    id="cancelAfterDays"
                    type="number"
                    placeholder="30"
                    value={cancelAfterDays}
                    onChange={(e) => setCancelAfterDays(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationTag">Destination Tag (optional)</Label>
                  <Input
                    id="destinationTag"
                    type="number"
                    placeholder="12345"
                    value={destinationTag}
                    onChange={(e) => setDestinationTag(e.target.value)}
                  />
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Payment channels enable fast, off-ledger micropayments.
                  The settle delay gives the payee time to redeem claims before channel closure.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCreateChannel}
                disabled={createLoading}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                {createLoading ? "Creating Channel..." : "Create Payment Channel"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claim Channel Tab */}
        <TabsContent value="claim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Claim from Channel</span>
              </CardTitle>
              <CardDescription>
                Redeem XRP from a payment channel using signed claims
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="claimChannelID">Channel ID *</Label>
                <Input
                  id="claimChannelID"
                  placeholder="5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3"
                  value={claimChannelID}
                  onChange={(e) => setClaimChannelID(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="claimAmount">Amount (XRP, optional)</Label>
                  <Input
                    id="claimAmount"
                    type="number"
                    placeholder="1.0"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claimBalance">Balance (XRP, optional)</Label>
                  <Input
                    id="claimBalance"
                    type="number"
                    placeholder="1.0"
                    value={claimBalance}
                    onChange={(e) => setClaimBalance(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimSignature">Signature (optional)</Label>
                <Input
                  id="claimSignature"
                  placeholder="304402204EF0AFB78AC23ED1C472E74F4299C0C21F1B21D07EFC0A3838A420F76D783A400220..."
                  value={claimSignature}
                  onChange={(e) => setClaimSignature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimPublicKey">Public Key (optional)</Label>
                <Input
                  id="claimPublicKey"
                  placeholder="023693F15967AE357D0327974AD46FE3C127113B1110D6044FD41E723689F81CC6"
                  value={claimPublicKey}
                  onChange={(e) => setClaimPublicKey(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={closeChannel}
                    onChange={(e) => setCloseChannel(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Close Channel (tfClose)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={renewChannel}
                    onChange={(e) => setRenewChannel(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Renew Channel (tfRenew)</span>
                </label>
              </div>

              <Button
                onClick={handleClaimChannel}
                disabled={claimLoading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {claimLoading ? "Claiming..." : "Claim from Channel"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fund Channel Tab */}
        <TabsContent value="fund" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Fund Payment Channel</span>
              </CardTitle>
              <CardDescription>
                Add more XRP to an existing payment channel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fundChannelID">Channel ID *</Label>
                <Input
                  id="fundChannelID"
                  placeholder="5DB01B7FFED6B67E6B0414DED11E051D2EE2B7619CE0EAA6286D67A3A4D5BDB3"
                  value={fundChannelID}
                  onChange={(e) => setFundChannelID(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fundAmount">Amount (XRP) *</Label>
                  <Input
                    id="fundAmount"
                    type="number"
                    placeholder="50"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundExpirationDays">New Expiration (days, optional)</Label>
                  <Input
                    id="fundExpirationDays"
                    type="number"
                    placeholder="30"
                    value={fundExpirationDays}
                    onChange={(e) => setFundExpirationDays(e.target.value)}
                  />
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Only the source address can fund a channel.
                  Expiration must be later than current time + settle delay.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleFundChannel}
                disabled={fundLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {fundLoading ? "Funding Channel..." : "Fund Payment Channel"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List Channels Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <List className="h-5 w-5 text-purple-600" />
                <span>Your Payment Channels</span>
              </CardTitle>
              <CardDescription>
                View all payment channels where you are the source
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleListChannels}
                disabled={listLoading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {listLoading ? "Loading Channels..." : "Refresh Channel List"}
              </Button>

              {channels.length > 0 ? (
                <div className="space-y-3">
                  {channels.map((channel, index) => (
                    <Card key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 text-sm">
                            Channel #{index + 1}
                          </span>
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                            {channel.balance === "0" ? "Unused" : "Active"}
                          </span>
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="font-mono break-all">
                            <strong>ID:</strong> {channel.channel_id}
                          </p>
                          <p>
                            <strong>Destination:</strong> {channel.destination_account}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <p>
                              <strong>Amount:</strong> {(parseInt(channel.amount) / 1000000).toFixed(6)} XRP
                            </p>
                            <p>
                              <strong>Balance:</strong> {(parseInt(channel.balance) / 1000000).toFixed(6)} XRP
                            </p>
                            <p>
                              <strong>Available:</strong> {((parseInt(channel.amount) - parseInt(channel.balance)) / 1000000).toFixed(6)} XRP
                            </p>
                            <p>
                              <strong>Settle Delay:</strong> {channel.settle_delay}s
                            </p>
                          </div>

                          {channel.expiration && (
                            <p className="text-orange-700">
                              <strong>Expiration:</strong> {new Date((channel.expiration + 946684800) * 1000).toLocaleString()}
                            </p>
                          )}

                          {channel.cancel_after && (
                            <p className="text-red-700">
                              <strong>Cancel After:</strong> {new Date((channel.cancel_after + 946684800) * 1000).toLocaleString()}
                            </p>
                          )}

                          {channel.destination_tag && (
                            <p>
                              <strong>Destination Tag:</strong> {channel.destination_tag}
                            </p>
                          )}

                          <p className="font-mono break-all">
                            <strong>Public Key:</strong> {channel.public_key_hex}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    No payment channels found. Create one using the "Create Channel" tab.
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

