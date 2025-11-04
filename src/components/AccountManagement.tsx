"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Settings, Trash2, Shield } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { getXRPLError, formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

// AccountSet Flags (asf)
const ACCOUNT_FLAGS = {
  asfRequireDest: 1,
  asfRequireAuth: 2,
  asfDisallowXRP: 3,
  asfDisableMaster: 4,
  asfAccountTxnID: 5,
  asfNoFreeze: 6,
  asfGlobalFreeze: 7,
  asfDefaultRipple: 8,
  asfDepositAuth: 9,
  asfAuthorizedNFTokenMinter: 10,
  asfDisallowIncomingNFTokenOffer: 12,
  asfDisallowIncomingCheck: 13,
  asfDisallowIncomingPayChan: 14,
  asfDisallowIncomingTrustline: 15,
  asfAllowTrustLineClawback: 16
};

interface AccountManagementProps {
  xrplAccount: string;
}

export default function AccountManagement({ xrplAccount }: AccountManagementProps) {
  // AccountSet State
  const [domain, setDomain] = useState("");
  const [emailHash, setEmailHash] = useState("");
  const [messageKey, setMessageKey] = useState("");
  const [nftokenMinter, setNftokenMinter] = useState("");
  const [transferRate, setTransferRate] = useState("");
  const [tickSize, setTickSize] = useState("");
  const [walletLocator, setWalletLocator] = useState("");
  const [selectedSetFlag, setSelectedSetFlag] = useState("");
  const [selectedClearFlag, setSelectedClearFlag] = useState("");
  const [setLoading, setSetLoading] = useState(false);

  // AccountDelete State
  const [deleteDestination, setDeleteDestination] = useState("");
  const [deleteDestinationTag, setDeleteDestinationTag] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Helper: Convert string to hex
  const stringToHex = (str: string): string => {
    return Buffer.from(str, 'utf8').toString('hex').toUpperCase();
  };

  // Handle AccountSet
  const handleAccountSet = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    // Validate at least one field is set
    if (!domain && !emailHash && !messageKey && !nftokenMinter && !transferRate && 
        !tickSize && !walletLocator && !selectedSetFlag && !selectedClearFlag) {
      toast.error("Please set at least one account property");
      return;
    }

    setSetLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const accountSetTx: any = {
        TransactionType: "AccountSet",
        Account: xrplAccount
      };

      // Add optional fields
      if (domain) {
        accountSetTx.Domain = stringToHex(domain.toLowerCase());
      }

      if (emailHash) {
        accountSetTx.EmailHash = emailHash;
      }

      if (messageKey) {
        accountSetTx.MessageKey = messageKey;
      }

      if (nftokenMinter) {
        accountSetTx.NFTokenMinter = nftokenMinter;
      }

      if (transferRate) {
        const rate = parseInt(transferRate);
        if (rate !== 0 && (rate < 1000000000 || rate > 2000000000)) {
          toast.error("TransferRate must be 0 or between 1000000000 and 2000000000");
          return;
        }
        accountSetTx.TransferRate = rate;
      }

      if (tickSize) {
        const size = parseInt(tickSize);
        if (size !== 0 && (size < 3 || size > 15)) {
          toast.error("TickSize must be 0 or between 3 and 15");
          return;
        }
        accountSetTx.TickSize = size;
      }

      if (walletLocator) {
        accountSetTx.WalletLocator = walletLocator;
      }

      if (selectedSetFlag) {
        accountSetTx.SetFlag = parseInt(selectedSetFlag);
      }

      if (selectedClearFlag) {
        accountSetTx.ClearFlag = parseInt(selectedClearFlag);
      }

      toast.info("Preparing AccountSet transaction...");

      const prepared = await client.autofill(accountSetTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting AccountSet transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Account settings updated successfully!");
          // Reset form
          setDomain("");
          setEmailHash("");
          setMessageKey("");
          setNftokenMinter("");
          setTransferRate("");
          setTickSize("");
          setWalletLocator("");
          setSelectedSetFlag("");
          setSelectedClearFlag("");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("AccountSet error:", error);
      toast.error(error.message || "Failed to update account settings");
    } finally {
      await client.disconnect();
      setSetLoading(false);
    }
  };

  // Handle AccountDelete
  const handleAccountDelete = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!deleteDestination) {
      toast.error("Destination address is required");
      return;
    }

    if (deleteDestination === xrplAccount) {
      toast.error("Destination cannot be the same as the account being deleted");
      return;
    }

    const confirmed = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and send remaining XRP to the destination. " +
      "This action CANNOT be undone. Are you absolutely sure?"
    );

    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const deleteTx: any = {
        TransactionType: "AccountDelete",
        Account: xrplAccount,
        Destination: deleteDestination,
        Fee: "2000000" // 2 XRP (owner reserve)
      };

      if (deleteDestinationTag) {
        deleteTx.DestinationTag = parseInt(deleteDestinationTag);
      }

      toast.info("Preparing AccountDelete transaction...");

      const prepared = await client.autofill(deleteTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      toast.info("Submitting AccountDelete transaction...");
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success("Account deleted successfully!");
          setDeleteDestination("");
          setDeleteDestinationTag("");
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("AccountDelete error:", error);
      toast.error(error.message || "Failed to delete account");
    } finally {
      await client.disconnect();
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
          <p className="text-sm text-gray-600">Configure account settings and properties</p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="delete">Delete Account</TabsTrigger>
        </TabsList>

        {/* Account Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Configure Account Properties</span>
              </CardTitle>
              <CardDescription>
                Modify account settings, flags, and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain (e.g., example.com)</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Will be converted to hex automatically</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailHash">Email Hash (MD5, 128-bit)</Label>
                  <Input
                    id="emailHash"
                    placeholder="5E33..."
                    value={emailHash}
                    onChange={(e) => setEmailHash(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">For Gravatar display</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageKey">Message Key (33 bytes hex)</Label>
                <Input
                  id="messageKey"
                  placeholder="02/03 for secp256k1, ED for Ed25519"
                  value={messageKey}
                  onChange={(e) => setMessageKey(e.target.value)}
                />
                <p className="text-xs text-gray-500">Public key for encrypted messages</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nftokenMinter">NFToken Minter Address</Label>
                  <Input
                    id="nftokenMinter"
                    placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    value={nftokenMinter}
                    onChange={(e) => setNftokenMinter(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Account authorized to mint NFTs for you</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transferRate">Transfer Rate (billionths)</Label>
                  <Input
                    id="transferRate"
                    type="number"
                    placeholder="1000000000 - 2000000000 or 0"
                    value={transferRate}
                    onChange={(e) => setTransferRate(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Fee for token transfers (0 = no fee)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tickSize">Tick Size (3-15 or 0)</Label>
                  <Input
                    id="tickSize"
                    type="number"
                    placeholder="0-15"
                    value={tickSize}
                    onChange={(e) => setTickSize(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Significant digits for offers (0 = disable)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletLocator">Wallet Locator (256-bit hex)</Label>
                  <Input
                    id="walletLocator"
                    placeholder="0x..."
                    value={walletLocator}
                    onChange={(e) => setWalletLocator(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Arbitrary 256-bit value</p>
                </div>
              </div>

              {/* Account Flags */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-3">Account Flags</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="setFlag">Enable Flag</Label>
                    <select
                      id="setFlag"
                      value={selectedSetFlag}
                      onChange={(e) => setSelectedSetFlag(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">-- Select Flag to Enable --</option>
                      <option value={ACCOUNT_FLAGS.asfRequireDest}>Require Destination Tag (1)</option>
                      <option value={ACCOUNT_FLAGS.asfRequireAuth}>Require Authorization (2)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowXRP}>Disallow XRP (3)</option>
                      <option value={ACCOUNT_FLAGS.asfDisableMaster}>Disable Master Key (4)</option>
                      <option value={ACCOUNT_FLAGS.asfAccountTxnID}>Track Account TxnID (5)</option>
                      <option value={ACCOUNT_FLAGS.asfNoFreeze}>No Freeze (6)</option>
                      <option value={ACCOUNT_FLAGS.asfGlobalFreeze}>Global Freeze (7)</option>
                      <option value={ACCOUNT_FLAGS.asfDefaultRipple}>Default Ripple (8)</option>
                      <option value={ACCOUNT_FLAGS.asfDepositAuth}>Deposit Authorization (9)</option>
                      <option value={ACCOUNT_FLAGS.asfAuthorizedNFTokenMinter}>Authorized NFToken Minter (10)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingNFTokenOffer}>Block NFToken Offers (12)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingCheck}>Block Checks (13)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingPayChan}>Block Payment Channels (14)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingTrustline}>Block Trust Lines (15)</option>
                      <option value={ACCOUNT_FLAGS.asfAllowTrustLineClawback}>Allow Clawback (16)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clearFlag">Disable Flag</Label>
                    <select
                      id="clearFlag"
                      value={selectedClearFlag}
                      onChange={(e) => setSelectedClearFlag(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">-- Select Flag to Disable --</option>
                      <option value={ACCOUNT_FLAGS.asfRequireDest}>Require Destination Tag (1)</option>
                      <option value={ACCOUNT_FLAGS.asfRequireAuth}>Require Authorization (2)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowXRP}>Disallow XRP (3)</option>
                      <option value={ACCOUNT_FLAGS.asfDisableMaster}>Disable Master Key (4)</option>
                      <option value={ACCOUNT_FLAGS.asfAccountTxnID}>Track Account TxnID (5)</option>
                      <option value={ACCOUNT_FLAGS.asfGlobalFreeze}>Global Freeze (7)</option>
                      <option value={ACCOUNT_FLAGS.asfDefaultRipple}>Default Ripple (8)</option>
                      <option value={ACCOUNT_FLAGS.asfDepositAuth}>Deposit Authorization (9)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingNFTokenOffer}>Block NFToken Offers (12)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingCheck}>Block Checks (13)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingPayChan}>Block Payment Channels (14)</option>
                      <option value={ACCOUNT_FLAGS.asfDisallowIncomingTrustline}>Block Trust Lines (15)</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Note:</strong> Some flags like asfNoFreeze and asfAllowTrustLineClawback cannot be disabled once enabled.
                  asfDisableMaster requires another signing method configured first.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAccountSet}
                disabled={setLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {setLoading ? "Updating Account..." : "Update Account Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delete Account Tab */}
        <TabsContent value="delete" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <span>Delete Account</span>
              </CardTitle>
              <CardDescription className="text-red-600">
                ⚠️ DANGER ZONE: Permanently delete this account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-sm text-red-800">
                  <strong>WARNING:</strong> Account deletion is PERMANENT and IRREVERSIBLE. Requirements:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Account must have no owned objects (trust lines, offers, escrows, etc.)</li>
                    <li>Sequence number + 256 must be less than current ledger index</li>
                    <li>Transaction cost is 2 XRP (owner reserve) - NOT refundable</li>
                    <li>Remaining XRP will be sent to destination address</li>
                    <li>Account cannot be the same as destination</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="deleteDestination">Destination Address *</Label>
                <Input
                  id="deleteDestination"
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={deleteDestination}
                  onChange={(e) => setDeleteDestination(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Funded account to receive remaining XRP (cannot be this account)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deleteDestinationTag">Destination Tag (optional)</Label>
                <Input
                  id="deleteDestinationTag"
                  type="number"
                  placeholder="12345"
                  value={deleteDestinationTag}
                  onChange={(e) => setDeleteDestinationTag(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Required if destination account requires destination tags
                </p>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <AlertDescription className="text-sm text-orange-800">
                  <strong>Common Errors:</strong>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li><strong>tecHAS_OBLIGATIONS:</strong> Account has objects that cannot be deleted</li>
                    <li><strong>tecTOO_SOON:</strong> Sequence number too high (wait for more ledgers)</li>
                    <li><strong>tefTOO_BIG:</strong> Account linked to 1000+ objects (delete some first)</li>
                    <li><strong>tecNO_PERMISSION:</strong> Destination requires deposit authorization</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAccountDelete}
                disabled={deleteLoading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? "Deleting Account..." : "⚠️ DELETE ACCOUNT PERMANENTLY"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

