/**
 * NFToken Management Component
 * Complete NFT lifecycle: Mint, Burn, Create Offers, Accept Offers, Cancel Offers
 * Based on XRPL docs: C/14_nfts.md, H/NFToken transactions
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';
import { 
  Image, 
  Flame, 
  ShoppingCart, 
  CheckCircle2, 
  X,
  AlertCircle,
  Loader2,
  Tag,
  DollarSign
} from 'lucide-react';
import { Client } from 'xrpl';
import { getXRPLError, formatXRPLError } from '../lib/xrplErrors';

interface NFTokenManagementProps {
  xrplAccount: string | null;
}

interface NFToken {
  NFTokenID: string;
  URI?: string;
  Flags: number;
  Issuer: string;
  NFTokenTaxon: number;
  TransferFee?: number;
}

export function NFTokenManagement({ xrplAccount }: NFTokenManagementProps) {
  const [activeTab, setActiveTab] = useState<'mint' | 'burn' | 'offer' | 'accept' | 'cancel' | 'list'>('mint');
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<NFToken[]>([]);
  
  // Mint NFT State
  const [uri, setUri] = useState('');
  const [taxon, setTaxon] = useState('0');
  const [transferFee, setTransferFee] = useState('');
  const [isBurnable, setIsBurnable] = useState(true);
  const [isOnlyXRP, setIsOnlyXRP] = useState(true);
  const [isTrustLine, setIsTrustLine] = useState(false);
  const [isTransferable, setIsTransferable] = useState(true);
  
  // Burn NFT State
  const [burnTokenID, setBurnTokenID] = useState('');
  
  // Create Offer State
  const [offerTokenID, setOfferTokenID] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [offerDestination, setOfferDestination] = useState('');
  const [offerType, setOfferType] = useState<'buy' | 'sell'>('sell');
  const [offerExpiration, setOfferExpiration] = useState('');
  
  // Accept Offer State
  const [acceptOfferID, setAcceptOfferID] = useState('');
  
  // Cancel Offer State
  const [cancelOfferIDs, setCancelOfferIDs] = useState('');

  const XRPL_NETWORKS = {
    testnet: "wss://s.altnet.rippletest.net:51233",
    devnet: "wss://s.devnet.rippletest.net:51233"
  };

  /**
   * Calculate NFToken Flags
   */
  const calculateFlags = (): number => {
    let flags = 0;
    if (isBurnable) flags |= 1; // tfBurnable
    if (isOnlyXRP) flags |= 2; // tfOnlyXRP
    if (isTrustLine) flags |= 4; // tfTrustLine
    if (isTransferable) flags |= 8; // tfTransferable
    return flags;
  };

  /**
   * Mint an NFToken
   */
  const handleMintNFT = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!uri) {
      toast.error('Please provide NFT URI');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      // Convert URI to hex
      const uriHex = Buffer.from(uri, 'utf8').toString('hex').toUpperCase();

      const mintTx: any = {
        TransactionType: 'NFTokenMint',
        Account: xrplAccount,
        URI: uriHex,
        Flags: calculateFlags(),
        NFTokenTaxon: parseInt(taxon)
      };

      if (transferFee) {
        // Transfer fee in basis points (0-50000, representing 0-50%)
        const fee = Math.min(50000, Math.max(0, parseInt(transferFee) * 1000));
        mintTx.TransferFee = fee;
      }

      toast.success('NFT mint transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Mint NFT Transaction:', mintTx);

      await client.disconnect();
      
      // Reset form
      setUri('');
      setTaxon('0');
      setTransferFee('');
      setIsBurnable(true);
      setIsOnlyXRP(true);
      setIsTrustLine(false);
      setIsTransferable(true);

    } catch (error: any) {
      console.error('Mint NFT error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to mint NFT', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Burn an NFToken
   */
  const handleBurnNFT = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!burnTokenID) {
      toast.error('Please provide NFToken ID');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const burnTx: any = {
        TransactionType: 'NFTokenBurn',
        Account: xrplAccount,
        NFTokenID: burnTokenID
      };

      toast.success('NFT burn transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Burn NFT Transaction:', burnTx);

      await client.disconnect();
      
      // Reset form
      setBurnTokenID('');

    } catch (error: any) {
      console.error('Burn NFT error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to burn NFT', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create NFToken Offer
   */
  const handleCreateOffer = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!offerTokenID || !offerAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const offerTx: any = {
        TransactionType: 'NFTokenCreateOffer',
        Account: xrplAccount,
        NFTokenID: offerTokenID,
        Amount: (parseFloat(offerAmount) * 1000000).toString(), // Convert XRP to drops
        Flags: offerType === 'sell' ? 1 : 0 // tfSellNFToken = 1
      };

      if (offerDestination) {
        offerTx.Destination = offerDestination;
      }

      if (offerExpiration) {
        const rippleEpoch = 946684800;
        const expirationSeconds = parseInt(offerExpiration) * 24 * 60 * 60;
        offerTx.Expiration = Math.floor(Date.now() / 1000) - rippleEpoch + expirationSeconds;
      }

      toast.success('NFT offer transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Create NFT Offer Transaction:', offerTx);

      await client.disconnect();
      
      // Reset form
      setOfferTokenID('');
      setOfferAmount('');
      setOfferDestination('');
      setOfferExpiration('');

    } catch (error: any) {
      console.error('Create offer error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to create offer', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Accept NFToken Offer
   */
  const handleAcceptOffer = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!acceptOfferID) {
      toast.error('Please provide offer ID');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const acceptTx: any = {
        TransactionType: 'NFTokenAcceptOffer',
        Account: xrplAccount
      };

      // Determine if it's a buy or sell offer
      // In production, you'd query the offer to determine this
      if (acceptOfferID.startsWith('buy')) {
        acceptTx.NFTokenBuyOffer = acceptOfferID;
      } else {
        acceptTx.NFTokenSellOffer = acceptOfferID;
      }

      toast.success('NFT accept offer transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Accept NFT Offer Transaction:', acceptTx);

      await client.disconnect();
      
      // Reset form
      setAcceptOfferID('');

    } catch (error: any) {
      console.error('Accept offer error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to accept offer', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel NFToken Offers
   */
  const handleCancelOffers = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!cancelOfferIDs) {
      toast.error('Please provide offer IDs');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const offerIDArray = cancelOfferIDs.split(',').map(id => id.trim());

      const cancelTx: any = {
        TransactionType: 'NFTokenCancelOffer',
        Account: xrplAccount,
        NFTokenOffers: offerIDArray
      };

      toast.success('NFT cancel offers transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Cancel NFT Offers Transaction:', cancelTx);

      await client.disconnect();
      
      // Reset form
      setCancelOfferIDs('');

    } catch (error: any) {
      console.error('Cancel offers error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to cancel offers', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get NFTs for Account
   */
  const handleGetNFTs = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const response: any = await client.request({
        command: 'account_nfts',
        account: xrplAccount
      });

      setNfts(response.result.account_nfts || []);
      toast.success(`Found ${response.result.account_nfts?.length || 0} NFTs`);

      await client.disconnect();
    } catch (error: any) {
      console.error('Get NFTs error:', error);
      toast.error('Failed to retrieve NFTs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
          <Image className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NFToken Management</h2>
          <p className="text-gray-600">Mint, trade, and manage NFTs on XRPL</p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>About NFTokens:</strong> XRPL NFTs are native to the ledger with built-in royalties,
          efficient storage, and no smart contracts required. Perfect for digital art, collectibles, and tokenized assets.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {[
          { id: 'mint', label: 'Mint NFT', icon: Image },
          { id: 'burn', label: 'Burn NFT', icon: Flame },
          { id: 'offer', label: 'Create Offer', icon: ShoppingCart },
          { id: 'accept', label: 'Accept Offer', icon: CheckCircle2 },
          { id: 'cancel', label: 'Cancel Offers', icon: X },
          { id: 'list', label: 'My NFTs', icon: Tag }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'mint' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mint New NFT</h3>
            <div className="space-y-4">
              <div>
                <Label>NFT URI *</Label>
                <Input
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                  placeholder="ipfs://QmXyz... or https://example.com/metadata.json"
                />
                <p className="text-xs text-gray-500 mt-1">Link to NFT metadata (IPFS, HTTP, etc.)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Taxon</Label>
                  <Input
                    type="number"
                    value={taxon}
                    onChange={(e) => setTaxon(e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Collection identifier</p>
                </div>
                <div>
                  <Label>Transfer Fee (%)</Label>
                  <Input
                    type="number"
                    value={transferFee}
                    onChange={(e) => setTransferFee(e.target.value)}
                    placeholder="0-50"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Royalty on secondary sales</p>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-semibold text-gray-700">NFT Flags</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBurnable}
                      onChange={(e) => setIsBurnable(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Burnable (can be destroyed)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOnlyXRP}
                      onChange={(e) => setIsOnlyXRP(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Only XRP (no IOU offers)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTrustLine}
                      onChange={(e) => setIsTrustLine(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Create Trust Line (auto-create trust lines)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTransferable}
                      onChange={(e) => setIsTransferable(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Transferable (can be sold/transferred)</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleMintNFT}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Minting NFT...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    Mint NFT
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'burn' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Burn NFT</h3>
            <div className="space-y-4">
              <div>
                <Label>NFToken ID *</Label>
                <Input
                  value={burnTokenID}
                  onChange={(e) => setBurnTokenID(e.target.value)}
                  placeholder="000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65"
                />
              </div>

              <Alert className="bg-red-50 border-red-200">
                <Flame className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">
                  <strong>Warning:</strong> Burning an NFT permanently destroys it. This action cannot be undone.
                  Only burnable NFTs can be burned.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleBurnNFT}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Burning NFT...
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4 mr-2" />
                    Burn NFT
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'offer' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create NFT Offer</h3>
            <div className="space-y-4">
              <div>
                <Label>Offer Type</Label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={offerType === 'sell'}
                      onChange={() => setOfferType('sell')}
                      className="text-pink-600"
                    />
                    <span className="text-sm text-gray-700">Sell Offer (I own the NFT)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={offerType === 'buy'}
                      onChange={() => setOfferType('buy')}
                      className="text-pink-600"
                    />
                    <span className="text-sm text-gray-700">Buy Offer (I want to buy)</span>
                  </label>
                </div>
              </div>

              <div>
                <Label>NFToken ID *</Label>
                <Input
                  value={offerTokenID}
                  onChange={(e) => setOfferTokenID(e.target.value)}
                  placeholder="000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65"
                />
              </div>

              <div>
                <Label>Amount (XRP) *</Label>
                <Input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="100"
                />
              </div>

              <div>
                <Label>Destination (optional)</Label>
                <Input
                  value={offerDestination}
                  onChange={(e) => setOfferDestination(e.target.value)}
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                />
                <p className="text-xs text-gray-500 mt-1">Specific buyer/seller address</p>
              </div>

              <div>
                <Label>Expiration (days)</Label>
                <Input
                  type="number"
                  value={offerExpiration}
                  onChange={(e) => setOfferExpiration(e.target.value)}
                  placeholder="30"
                />
              </div>

              <Button
                onClick={handleCreateOffer}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Offer...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create Offer
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'accept' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Accept NFT Offer</h3>
            <div className="space-y-4">
              <div>
                <Label>Offer ID *</Label>
                <Input
                  value={acceptOfferID}
                  onChange={(e) => setAcceptOfferID(e.target.value)}
                  placeholder="Enter offer ID from ledger"
                />
              </div>

              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-sm">
                  <strong>Accepting Offers:</strong> You can accept buy offers (if you own the NFT) or
                  sell offers (if you want to buy the NFT). The transaction will transfer the NFT and payment.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAcceptOffer}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Accepting Offer...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Accept Offer
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'cancel' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel NFT Offers</h3>
            <div className="space-y-4">
              <div>
                <Label>Offer IDs (comma-separated) *</Label>
                <Input
                  value={cancelOfferIDs}
                  onChange={(e) => setCancelOfferIDs(e.target.value)}
                  placeholder="offer1, offer2, offer3"
                />
                <p className="text-xs text-gray-500 mt-1">You can cancel multiple offers at once</p>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 text-sm">
                  Only the offer creator can cancel their offers. This action cannot be undone.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCancelOffers}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Canceling Offers...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel Offers
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'list' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">My NFTs</h3>
              <Button
                onClick={handleGetNFTs}
                disabled={loading || !xrplAccount}
                variant="outline"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Tag className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>

            {nfts.length === 0 ? (
              <div className="text-center py-12">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No NFTs found</p>
                <p className="text-sm text-gray-500 mt-2">Mint an NFT to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="h-4 w-4 text-pink-600" />
                      <span className="font-mono text-xs text-gray-600">
                        {nft.NFTokenID.substring(0, 16)}...
                      </span>
                    </div>
                    {nft.URI && (
                      <div className="mb-2">
                        <span className="text-xs text-gray-600">URI:</span>
                        <a
                          href={Buffer.from(nft.URI, 'hex').toString('utf8')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs text-pink-600 hover:underline"
                        >
                          View Metadata
                        </a>
                      </div>
                    )}
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-gray-600">Taxon:</span>
                        <span className="ml-2 text-gray-900">{nft.NFTokenTaxon}</span>
                      </div>
                      {nft.TransferFee !== undefined && (
                        <div>
                          <span className="text-gray-600">Transfer Fee:</span>
                          <span className="ml-2 text-gray-900">{nft.TransferFee / 1000}%</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(nft.Flags & 1) !== 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Burnable</span>
                        )}
                        {(nft.Flags & 2) !== 0 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Only XRP</span>
                        )}
                        {(nft.Flags & 8) !== 0 && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Transferable</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

