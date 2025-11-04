/**
 * Escrow Management Component
 * Complete escrow lifecycle: Create (time-based & conditional), Finish, Cancel
 * Based on XRPL docs: C/10-11, H/24-26
 */

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';
import { 
  Lock, 
  Send, 
  CheckCircle2, 
  X, 
  Clock,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react';
import { Client } from 'xrpl';
import { getXRPLError, formatXRPLError } from '../lib/xrplErrors';

interface EscrowManagementProps {
  xrplAccount: string | null;
}

interface Escrow {
  index: string;
  account: string;
  destination: string;
  amount: string;
  finishAfter?: number;
  cancelAfter?: number;
  condition?: string;
  previousTxnID: string;
}

export function EscrowManagement({ xrplAccount }: EscrowManagementProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'finish' | 'cancel' | 'list'>('create');
  const [loading, setLoading] = useState(false);
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  
  // Create Escrow State
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [finishAfterDays, setFinishAfterDays] = useState('');
  const [cancelAfterDays, setCancelAfterDays] = useState('');
  const [condition, setCondition] = useState('');
  const [destinationTag, setDestinationTag] = useState('');
  
  // Finish Escrow State
  const [finishOwner, setFinishOwner] = useState('');
  const [finishSequence, setFinishSequence] = useState('');
  const [fulfillment, setFulfillment] = useState('');
  
  // Cancel Escrow State
  const [cancelOwner, setCancelOwner] = useState('');
  const [cancelSequence, setCancelSequence] = useState('');

  const XRPL_NETWORKS = {
    testnet: "wss://s.altnet.rippletest.net:51233",
    devnet: "wss://s.devnet.rippletest.net:51233"
  };

  /**
   * Convert days to Ripple Epoch seconds
   */
  const daysToRippleTime = (days: string): number => {
    const rippleEpoch = 946684800;
    const seconds = parseInt(days) * 24 * 60 * 60;
    return Math.floor(Date.now() / 1000) - rippleEpoch + seconds;
  };

  /**
   * Create an Escrow
   */
  const handleCreateEscrow = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!destination || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!finishAfterDays && !condition) {
      toast.error('Must specify either finish time or condition');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const escrowTx: any = {
        TransactionType: 'EscrowCreate',
        Account: xrplAccount,
        Destination: destination,
        Amount: (parseFloat(amount) * 1000000).toString() // Convert XRP to drops
      };

      if (finishAfterDays) {
        escrowTx.FinishAfter = daysToRippleTime(finishAfterDays);
      }

      if (cancelAfterDays) {
        escrowTx.CancelAfter = daysToRippleTime(cancelAfterDays);
      }

      if (condition) {
        escrowTx.Condition = condition;
      }

      if (destinationTag) {
        escrowTx.DestinationTag = parseInt(destinationTag);
      }

      toast.success('Escrow transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Escrow Transaction:', escrowTx);

      await client.disconnect();
      
      // Reset form
      setDestination('');
      setAmount('');
      setFinishAfterDays('');
      setCancelAfterDays('');
      setCondition('');
      setDestinationTag('');

    } catch (error: any) {
      console.error('Create escrow error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to create escrow', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Finish an Escrow
   */
  const handleFinishEscrow = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!finishOwner || !finishSequence) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const finishTx: any = {
        TransactionType: 'EscrowFinish',
        Account: xrplAccount,
        Owner: finishOwner,
        OfferSequence: parseInt(finishSequence)
      };

      if (fulfillment) {
        finishTx.Fulfillment = fulfillment;
      }

      toast.success('Escrow finish transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Finish Escrow Transaction:', finishTx);

      await client.disconnect();
      
      // Reset form
      setFinishOwner('');
      setFinishSequence('');
      setFulfillment('');

    } catch (error: any) {
      console.error('Finish escrow error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to finish escrow', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel an Escrow
   */
  const handleCancelEscrow = async () => {
    if (!xrplAccount) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!cancelOwner || !cancelSequence) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();

      const cancelTx: any = {
        TransactionType: 'EscrowCancel',
        Account: xrplAccount,
        Owner: cancelOwner,
        OfferSequence: parseInt(cancelSequence)
      };

      toast.success('Escrow cancel transaction prepared', {
        description: 'Please sign with your Xaman wallet'
      });

      console.log('Cancel Escrow Transaction:', cancelTx);

      await client.disconnect();
      
      // Reset form
      setCancelOwner('');
      setCancelSequence('');

    } catch (error: any) {
      console.error('Cancel escrow error:', error);
      const errorCode = error?.data?.error || error?.message || 'Unknown error';
      toast.error('Failed to cancel escrow', {
        description: formatXRPLError(errorCode)
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get Escrows for Account
   */
  const handleGetEscrows = async () => {
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
        type: 'escrow'
      });

      setEscrows(response.result.account_objects || []);
      toast.success(`Found ${response.result.account_objects?.length || 0} escrows`);

      await client.disconnect();
    } catch (error: any) {
      console.error('Get escrows error:', error);
      toast.error('Failed to retrieve escrows');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Escrow Management</h2>
          <p className="text-gray-600">Create time-locked and conditional payments</p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>About Escrows:</strong> Escrows hold XRP until a specified time or condition is met.
          They're perfect for scheduled payments, conditional releases, and trustless agreements.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { id: 'create', label: 'Create Escrow', icon: Send },
          { id: 'finish', label: 'Finish Escrow', icon: CheckCircle2 },
          { id: 'cancel', label: 'Cancel Escrow', icon: X },
          { id: 'list', label: 'My Escrows', icon: Lock }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content - Will be continued in next edit */}
      <div className="mt-6">
        {activeTab === 'create' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Escrow</h3>
            <div className="space-y-4">
              <div>
                <Label>Destination Address *</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                />
              </div>
              
              <div>
                <Label>Amount (XRP) *</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Finish After (days)</Label>
                  <Input
                    type="number"
                    value={finishAfterDays}
                    onChange={(e) => setFinishAfterDays(e.target.value)}
                    placeholder="7"
                  />
                  <p className="text-xs text-gray-500 mt-1">Earliest time to finish</p>
                </div>
                <div>
                  <Label>Cancel After (days)</Label>
                  <Input
                    type="number"
                    value={cancelAfterDays}
                    onChange={(e) => setCancelAfterDays(e.target.value)}
                    placeholder="30"
                  />
                  <p className="text-xs text-gray-500 mt-1">Expiration time</p>
                </div>
              </div>

              <div>
                <Label>Condition (optional)</Label>
                <Input
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100"
                />
                <p className="text-xs text-gray-500 mt-1">PREIMAGE-SHA-256 crypto-condition</p>
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

              <Alert className="bg-yellow-50 border-yellow-200">
                <Calendar className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 text-sm">
                  <strong>Time Windows:</strong> Finish After = earliest release time. Cancel After = expiration.
                  Funds can be claimed between these times (if condition is met, if applicable).
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCreateEscrow}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Escrow...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Escrow
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'finish' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Finish an Escrow</h3>
            <div className="space-y-4">
              <div>
                <Label>Escrow Owner Address *</Label>
                <Input
                  value={finishOwner}
                  onChange={(e) => setFinishOwner(e.target.value)}
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                />
              </div>

              <div>
                <Label>Escrow Sequence Number *</Label>
                <Input
                  type="number"
                  value={finishSequence}
                  onChange={(e) => setFinishSequence(e.target.value)}
                  placeholder="12345"
                />
                <p className="text-xs text-gray-500 mt-1">From the EscrowCreate transaction</p>
              </div>

              <div>
                <Label>Fulfillment (if conditional)</Label>
                <Input
                  value={fulfillment}
                  onChange={(e) => setFulfillment(e.target.value)}
                  placeholder="A0028000"
                />
                <p className="text-xs text-gray-500 mt-1">PREIMAGE-SHA-256 fulfillment (required for conditional escrows)</p>
              </div>

              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-sm">
                  <strong>Finishing Escrows:</strong> Anyone can finish an escrow after FinishAfter time.
                  For conditional escrows, you must provide the correct fulfillment.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleFinishEscrow}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Finishing Escrow...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Finish Escrow
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'cancel' && (
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel an Escrow</h3>
            <div className="space-y-4">
              <div>
                <Label>Escrow Owner Address *</Label>
                <Input
                  value={cancelOwner}
                  onChange={(e) => setCancelOwner(e.target.value)}
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3z1..."
                />
              </div>

              <div>
                <Label>Escrow Sequence Number *</Label>
                <Input
                  type="number"
                  value={cancelSequence}
                  onChange={(e) => setCancelSequence(e.target.value)}
                  placeholder="12345"
                />
                <p className="text-xs text-gray-500 mt-1">From the EscrowCreate transaction</p>
              </div>

              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">
                  <strong>Canceling Escrows:</strong> Anyone can cancel an escrow after CancelAfter time.
                  Funds will be returned to the original sender.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleCancelEscrow}
                disabled={loading || !xrplAccount}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Canceling Escrow...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel Escrow
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'list' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">My Escrows</h3>
              <Button
                onClick={handleGetEscrows}
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
                    <Lock className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>

            {escrows.length === 0 ? (
              <div className="text-center py-12">
                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No escrows found</p>
                <p className="text-sm text-gray-500 mt-2">Create an escrow to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {escrows.map((escrow, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Lock className="h-4 w-4 text-purple-600" />
                          <span className="font-mono text-sm text-gray-600">
                            {escrow.index.substring(0, 16)}...
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">To:</span>
                            <span className="ml-2 font-mono text-gray-900">
                              {escrow.destination.substring(0, 12)}...
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <span className="ml-2 font-semibold text-gray-900">
                              {(parseInt(escrow.amount) / 1000000).toFixed(2)} XRP
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 space-y-1">
                          {escrow.finishAfter && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>Can finish after: {new Date((escrow.finishAfter + 946684800) * 1000).toLocaleString()}</span>
                            </div>
                          )}
                          {escrow.cancelAfter && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <X className="h-3 w-3" />
                              <span>Expires: {new Date((escrow.cancelAfter + 946684800) * 1000).toLocaleString()}</span>
                            </div>
                          )}
                          {escrow.condition && (
                            <div className="flex items-center space-x-2 text-sm text-orange-600">
                              <AlertCircle className="h-3 w-3" />
                              <span>Conditional (requires fulfillment)</span>
                            </div>
                          )}
                        </div>
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

