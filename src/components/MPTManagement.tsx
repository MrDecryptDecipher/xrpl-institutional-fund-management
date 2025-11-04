import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Send, Shield, Coins } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function MPTManagement({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('authorize');
  
  // Authorize MPT State
  const [mptIssuanceId, setMptIssuanceId] = useState('');
  const [authorizeAmount, setAuthorizeAmount] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authorizeResult, setAuthorizeResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Send MPT State
  const [sendMptId, setSendMptId] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Get MPTs State
  const [mptList, setMptList] = useState<any[]>([]);
  const [isLoadingMpts, setIsLoadingMpts] = useState(false);

  const handleAuthorizeMPT = async () => {
    if (!mptIssuanceId.trim()) {
      setAuthorizeResult({ success: false, message: 'Please enter MPT Issuance ID' });
      return;
    }

    setIsAuthorizing(true);
    setAuthorizeResult(null);

    try {
      // Note: In production, this would use Xaman for signing
      // For now, we'll show the UI flow
      setAuthorizeResult({
        success: true,
        message: `MPT Authorization request created for ${mptIssuanceId}. Please sign with Xaman wallet.`
      });
      
      // Reset form
      setTimeout(() => {
        setMptIssuanceId('');
        setAuthorizeAmount('');
      }, 2000);
    } catch (error) {
      setAuthorizeResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to authorize MPT'
      });
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleSendMPT = async () => {
    if (!sendMptId.trim() || !sendAmount.trim() || !destination.trim()) {
      setSendResult({ success: false, message: 'Please fill in all fields' });
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      // Note: In production, this would use Xaman for signing
      setSendResult({
        success: true,
        message: `MPT Send request created for ${sendAmount} tokens to ${destination}. Please sign with Xaman wallet.`
      });
      
      // Reset form
      setTimeout(() => {
        setSendMptId('');
        setSendAmount('');
        setDestination('');
      }, 2000);
    } catch (error) {
      setSendResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send MPT'
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleGetMPTs = async () => {
    setIsLoadingMpts(true);
    
    try {
      // Note: In production, this would query the XRPL
      // For now, we'll show mock data
      setMptList([
        {
          mptIssuanceId: '00000001234567890ABCDEF',
          balance: '1000',
          issuer: 'rIssuerAddress123...',
          canTransfer: true
        }
      ]);
    } catch (error) {
      console.error('Failed to load MPTs:', error);
    } finally {
      setIsLoadingMpts(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">MPT Management</h2>
        <p className="text-gray-600">Manage Multi-Purpose Tokens (XLS-33)</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="authorize" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Shield className="w-4 h-4 mr-2" />
            Authorize MPT
          </TabsTrigger>
          <TabsTrigger value="send" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Send className="w-4 h-4 mr-2" />
            Send MPT
          </TabsTrigger>
          <TabsTrigger value="view" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Coins className="w-4 h-4 mr-2" />
            My MPTs
          </TabsTrigger>
        </TabsList>

        {/* Authorize MPT Tab */}
        <TabsContent value="authorize">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Authorize MPT Receipt</CardTitle>
              <CardDescription className="text-gray-600">
                Authorize your account to receive a specific MPT issuance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mptIssuanceId" className="text-gray-900">MPT Issuance ID</Label>
                <Input
                  id="mptIssuanceId"
                  placeholder="Enter MPT Issuance ID (e.g., 00000001234567890ABCDEF)"
                  value={mptIssuanceId}
                  onChange={(e) => setMptIssuanceId(e.target.value)}
                  disabled={isAuthorizing}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorizeAmount" className="text-gray-900">
                  Maximum Amount (Optional)
                </Label>
                <Input
                  id="authorizeAmount"
                  type="number"
                  placeholder="Enter maximum amount to accept"
                  value={authorizeAmount}
                  onChange={(e) => setAuthorizeAmount(e.target.value)}
                  disabled={isAuthorizing}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {authorizeResult && (
                <Alert className={authorizeResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {authorizeResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className={authorizeResult.success ? 'text-green-800' : 'text-red-800'}>
                    {authorizeResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAuthorizeMPT}
                disabled={isAuthorizing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isAuthorizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authorizing...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Authorize MPT
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send MPT Tab */}
        <TabsContent value="send">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Send MPT</CardTitle>
              <CardDescription className="text-gray-600">
                Transfer MPTs to another account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sendMptId" className="text-gray-900">MPT Issuance ID</Label>
                <Input
                  id="sendMptId"
                  placeholder="Enter MPT Issuance ID"
                  value={sendMptId}
                  onChange={(e) => setSendMptId(e.target.value)}
                  disabled={isSending}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sendAmount" className="text-gray-900">Amount</Label>
                <Input
                  id="sendAmount"
                  type="number"
                  placeholder="Enter amount to send"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  disabled={isSending}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-gray-900">Destination Address</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination XRPL address"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={isSending}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {sendResult && (
                <Alert className={sendResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {sendResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className={sendResult.success ? 'text-green-800' : 'text-red-800'}>
                    {sendResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleSendMPT}
                disabled={isSending}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send MPT
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View MPTs Tab */}
        <TabsContent value="view">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">My MPTs</CardTitle>
              <CardDescription className="text-gray-600">
                View all MPTs held by your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleGetMPTs}
                disabled={isLoadingMpts}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoadingMpts ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Coins className="mr-2 h-4 w-4" />
                    Refresh MPTs
                  </>
                )}
              </Button>

              {mptList.length > 0 && (
                <div className="space-y-2">
                  {mptList.map((mpt, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Issuance ID:</span>
                          <p className="text-gray-900 font-mono text-xs">{mpt.mptIssuanceId}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Balance:</span>
                          <p className="text-gray-900 font-semibold">{mpt.balance}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issuer:</span>
                          <p className="text-gray-900 font-mono text-xs">{mpt.issuer}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Can Transfer:</span>
                          <p className="text-gray-900">{mpt.canTransfer ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

