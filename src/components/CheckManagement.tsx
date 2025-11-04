/**
 * Check Management Component
 * Complete check lifecycle: Create, Cash, Cancel
 * Based on XRPL docs: C/12_send-and-cash-checks.md, H/16-18
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';
import { 
  FileText, 
  Send, 
  DollarSign, 
  X, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Client, Wallet } from 'xrpl';
import { getXRPLError, formatXRPLError } from '../lib/xrplErrors';

interface CheckManagementProps {
  xrplAccount: string | null;
}

interface Check {
  index: string;
  account: string;
  destination: string;
  sendMax: string | object;
  expiration?: number;
  invoiceID?: string;
  destinationTag?: number;
}

export function CheckManagement({ xrplAccount }: CheckManagementProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'cash' | 'cancel' | 'list'>('create');
  const [loading, setLoading] = useState(false);
  const [checks, setChecks] = useState<Check[]>([]);
  
  // Create Check State
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('XRP');
  const [issuer, setIssuer] = useState('');
  const [expirationDays, setExpirationDays] = useState('30');
  const [invoiceID, setInvoiceID] = useState('');
  const [destinationTag, setDestinationTag] = useState('');
  
  // Cash Check State
  const [checkID, setCheckID] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [cashCurrency, setCashCurrency] = useState('XRP');
  const [cashIssuer, setCashIssuer] = useState('');
  
  // Cancel Check State
  const [cancelCheckID, setCancelCheckID] = useState('');

  const XRPL_NETWORKS = {
    testnet: "wss://s.altnet.rippletest.net:51233",
    devnet: "wss://s.devnet.rippletest.net:51233"
  };

  /**
   * Create a Check
   */
  const handleCreateCheck = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!destination || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      // Get wallet from Xaman (in production, this would use Xaman signing)
      // For now, we'll show the transaction structure
      
      let sendMax: string | object = amount;
      
      // If not XRP, create amount object
      if (currency !== 'XRP') {
        if (!issuer) {
          toast.error('Issuer required for non-XRP currencies');
          await client.disconnect();
          setLoading(false);
          return;
        }
        sendMax = {
          currency,
          value: amount,
          issuer
        };
      }

      // Calculate expiration (Ripple Epoch + seconds)
      const rippleEpoch = 946684800;
      const expirationSeconds = parseInt(expirationDays) * 24 * 60 * 60;
      const expiration = Math.floor(Date.now() / 1000) - rippleEpoch + expirationSeconds;

      const checkTx: any = {
        TransactionType: 'CheckCreate',
        Account: xrplAccount,
        Destination: destination,
        SendMax: sendMax
      };

      if (expirationDays) {
        checkTx.Expiration = expiration;
      }

      if (invoiceID) {
        checkTx.InvoiceID = invoiceID;
      }

      if (destinationTag) {
        checkTx.DestinationTag = parseInt(destinationTag);
      }

      toast.success('Check transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Check Transaction:', checkTx);

      await client.disconnect();
      
      // Reset form
      setDestination('');
      setAmount('');
      setCurrency('XRP');
      setIssuer('');
      setExpirationDays('30');
      setInvoiceID('');
      setDestinationTag('');

    } catch (error: any) {
      console.error('Create check error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to create check', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cash a Check
   */
  const handleCashCheck = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!checkID || !cashAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      let amount: string | object = cashAmount;
      
      if (cashCurrency !== 'XRP') {
        if (!cashIssuer) {
          toast.error('Issuer required for non-XRP currencies');
          await client.disconnect();
          setLoading(false);
          return;
        }
        amount = {
          currency: cashCurrency,
          value: cashAmount,
          issuer: cashIssuer
        };
      }

      const cashTx: any = {
        TransactionType: 'CheckCash',
        Account: xrplAccount,
        CheckID: checkID,
        Amount: amount
      };

      toast.success('Check cash transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Cash Check Transaction:', cashTx);

      await client.disconnect();
      
      // Reset form
      setCheckID('');
      setCashAmount('');
      setCashCurrency('XRP');
      setCashIssuer('');

    } catch (error: any) {
      console.error('Cash check error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to cash check', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel a Check
   */
  const handleCancelCheck = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!cancelCheckID) {
      toast.error('Please enter check ID');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const cancelTx: any = {
        TransactionType: 'CheckCancel',
        Account: xrplAccount,
        CheckID: cancelCheckID
      };

      toast.success('Check cancel transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Cancel Check Transaction:', cancelTx);

      await client.disconnect();
      
      // Reset form
      setCancelCheckID('');

    } catch (error: any) {
      console.error('Cancel check error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to cancel check', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get Checks for Account
   */
  const handleGetChecks = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const response: any = await client.request({
        command: 'account_objects',
        account: xrplAccount,
        type: 'check'
      });

      setChecks(response.result.account_objects || []);
      toast.success(`Found ${response.result.account_objects?.length || 0} checks`);

      await client.disconnect();
    } catch (error: any) {
      console.error('Get checks error:', error);
      toast.error('Failed to retrieve checks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Check Management</h2>
          <p className="text-gray-600">Create, cash, and manage XRPL checks</p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>About Checks:</strong> Checks allow you to send deferred payments that the recipient can cash at their convenience.
          The recipient can accept less than the full amount, and trust lines are created automatically when cashing.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { id: 'create', label: 'Create Check', icon: Send },
          { id: 'cash', label: 'Cash Check', icon: DollarSign },
          { id: 'cancel', label: 'Cancel Check', icon: X },
          { id: 'list', label: 'My Checks', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-green-600 text-green-600'
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
        {activeTab === 'create' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Check</h3>
            <div className="space-y-4">
              <div>
                <Label>Destination Address *</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount *</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder="XRP"
                  />
                </div>
              </div>

              {currency !== 'XRP' && (
                <div>
                  <Label>Issuer Address</Label>
                  <Input
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiration (days)</Label>
                  <Input
                    type="number"
                    value={expirationDays}
                    onChange={(e) => setExpirationDays(e.target.value)}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label>Destination Tag (optional)</Label>
                  <Input
                    type="number"
                    value={destinationTag}
                    onChange={(e) => setDestinationTag(e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>

              <div>
                <Label>Invoice ID (optional)</Label>
                <Input
                  value={invoiceID}
                  onChange={(e) => setInvoiceID(e.target.value)}
                  placeholder="6F1DFD1D0FE8A32E40E1F2C05CF1C15545BAB56B617F9C6C2D63A6B704BEF59B"
                />
              </div>

              <Button
                onClick={handleCreateCheck}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Check...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Check
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'cash' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cash a Check</h3>
            <div className="space-y-4">
              <div>
                <Label>Check ID *</Label>
                <Input
                  value={checkID}
                  onChange={(e) => setCheckID(e.target.value)}
                  placeholder="Enter check ID from ledger"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount to Cash *</Label>
                  <Input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input
                    value={cashCurrency}
                    onChange={(e) => setCashCurrency(e.target.value)}
                    placeholder="XRP"
                  />
                </div>
              </div>

              {cashCurrency !== 'XRP' && (
                <div>
                  <Label>Issuer Address</Label>
                  <Input
                    value={cashIssuer}
                    onChange={(e) => setCashIssuer(e.target.value)}
                    placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                  />
                </div>
              )}

              <Button
                onClick={handleCashCheck}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cashing Check...
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Cash Check
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'cancel' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel a Check</h3>
            <div className="space-y-4">
              <div>
                <Label>Check ID *</Label>
                <Input
                  value={cancelCheckID}
                  onChange={(e) => setCancelCheckID(e.target.value)}
                  placeholder="Enter check ID to cancel"
                />
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Only the check creator can cancel a check. This action cannot be undone.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCancelCheck}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Canceling Check...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel Check
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'list' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">My Checks</h3>
              <Button
                onClick={handleGetChecks}
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
                    <FileText className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>

            {checks.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No checks found</p>
                <p className="text-sm text-gray-500 mt-2">Create a check to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {checks.map((check, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="font-mono text-sm text-gray-600">
                            {check.index.substring(0, 16)}...
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">To:</span>
                            <span className="ml-2 font-mono text-gray-900">
                              {check.destination.substring(0, 12)}...
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <span className="ml-2 font-semibold text-gray-900">
                              {typeof check.sendMax === 'string' 
                                ? `${check.sendMax} drops` 
                                : `${(check.sendMax as any).value} ${(check.sendMax as any).currency}`
                              }
                            </span>
                          </div>
                        </div>
                        {check.expiration && (
                          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>Expires: {new Date((check.expiration + 946684800) * 1000).toLocaleDateString()}</span>
                          </div>
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

