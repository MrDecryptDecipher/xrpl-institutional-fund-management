import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Award, UserCheck, Shield, XCircle } from 'lucide-react';

export function CredentialsManagement({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('issue');
  
  // Issue Credential State
  const [subject, setSubject] = useState('');
  const [credentialType, setCredentialType] = useState('');
  const [credentialData, setCredentialData] = useState('');
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueResult, setIssueResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Accept Credential State
  const [credentialHash, setCredentialHash] = useState('');
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptResult, setAcceptResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // View Credentials State
  const [credentials, setCredentials] = useState<any[]>([]);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);
  
  // Verify Credential State
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleIssueCredential = async () => {
    if (!subject.trim() || !credentialType.trim()) {
      setIssueResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsIssuing(true);
    setIssueResult(null);

    try {
      // Create credential hash
      const credentialObj = {
        issuer: xrplAccount,
        subject: subject,
        type: credentialType,
        data: credentialData,
        issuedAt: new Date().toISOString()
      };
      
      const credentialHashValue = Buffer.from(JSON.stringify(credentialObj)).toString('hex').substring(0, 64);

      setIssueResult({
        success: true,
        message: `Credential issued successfully! Hash: ${credentialHashValue}. Please sign with Xaman wallet.`
      });
      
      // Reset form
      setTimeout(() => {
        setSubject('');
        setCredentialType('');
        setCredentialData('');
      }, 2000);
    } catch (error) {
      setIssueResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to issue credential'
      });
    } finally {
      setIsIssuing(false);
    }
  };

  const handleAcceptCredential = async () => {
    if (!credentialHash.trim()) {
      setAcceptResult({ success: false, message: 'Please enter credential hash' });
      return;
    }

    setIsAccepting(true);
    setAcceptResult(null);

    try {
      setAcceptResult({
        success: true,
        message: 'Credential acceptance request created. Please sign with Xaman wallet.'
      });
      
      // Reset form
      setTimeout(() => {
        setCredentialHash('');
      }, 2000);
    } catch (error) {
      setAcceptResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to accept credential'
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const handleLoadCredentials = async () => {
    setIsLoadingCredentials(true);
    
    try {
      // Mock credentials - in production, query XRPL
      setCredentials([
        {
          hash: '1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF',
          issuer: 'rIssuerAddress123...',
          subject: xrplAccount,
          type: 'KYC',
          status: 'Active',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          hash: 'FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321FEDCBA0987654321',
          issuer: 'rAMLProvider456...',
          subject: xrplAccount,
          type: 'AML',
          status: 'Active',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
    } catch (error) {
      console.error('Failed to load credentials:', error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  const handleVerifyCredential = async () => {
    if (!verifyHash.trim()) {
      setVerifyResult({ success: false, message: 'Please enter credential hash' });
      return;
    }

    setIsVerifying(true);
    setVerifyResult(null);

    try {
      // Mock verification - in production, query XRPL
      setVerifyResult({
        success: true,
        valid: true,
        credential: {
          hash: verifyHash,
          issuer: 'rIssuerAddress123...',
          subject: 'rSubjectAddress456...',
          type: 'KYC',
          status: 'Active',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        },
        message: 'Credential is valid and active'
      });
    } catch (error) {
      setVerifyResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to verify credential'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRevokeCredential = async (hash: string) => {
    if (!confirm('Are you sure you want to revoke this credential?')) {
      return;
    }

    try {
      setIssueResult({
        success: true,
        message: 'Credential revocation request created. Please sign with Xaman wallet.'
      });
    } catch (error) {
      setIssueResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to revoke credential'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Credentials Management</h2>
        <p className="text-gray-600">Issue, accept, and verify credentials for compliance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="issue" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Award className="w-4 h-4 mr-2" />
            Issue
          </TabsTrigger>
          <TabsTrigger value="accept" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <UserCheck className="w-4 h-4 mr-2" />
            Accept
          </TabsTrigger>
          <TabsTrigger value="view" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Shield className="w-4 h-4 mr-2" />
            My Credentials
          </TabsTrigger>
          <TabsTrigger value="verify" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Verify
          </TabsTrigger>
        </TabsList>

        {/* Issue Credential Tab */}
        <TabsContent value="issue">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Issue Credential</CardTitle>
              <CardDescription className="text-gray-600">
                Issue a credential to another account (KYC, AML, FATF, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-900">Subject Account *</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject XRPL address (e.g., rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isIssuing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialType" className="text-gray-900">Credential Type *</Label>
                <Input
                  id="credentialType"
                  placeholder="e.g., KYC, AML, FATF, Accredited Investor"
                  value={credentialType}
                  onChange={(e) => setCredentialType(e.target.value)}
                  disabled={isIssuing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialData" className="text-gray-900">Credential Data (Optional)</Label>
                <Input
                  id="credentialData"
                  placeholder="Additional credential information (max 256 bytes)"
                  value={credentialData}
                  onChange={(e) => setCredentialData(e.target.value)}
                  disabled={isIssuing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Issuer:</strong> {xrplAccount}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You are issuing this credential as the issuer
                </p>
              </div>

              {issueResult && (
                <Alert className={issueResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {issueResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {issueResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleIssueCredential}
                disabled={isIssuing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isIssuing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Issuing...
                  </>
                ) : (
                  <>
                    <Award className="mr-2 h-4 w-4" />
                    Issue Credential
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accept Credential Tab */}
        <TabsContent value="accept">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Accept Credential</CardTitle>
              <CardDescription className="text-gray-600">
                Accept a credential that has been issued to you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="credentialHash" className="text-gray-900">Credential Hash</Label>
                <Input
                  id="credentialHash"
                  placeholder="Enter credential hash (64 hex characters)"
                  value={credentialHash}
                  onChange={(e) => setCredentialHash(e.target.value)}
                  disabled={isAccepting}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 font-mono text-sm"
                />
              </div>

              {acceptResult && (
                <Alert className={acceptResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {acceptResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {acceptResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAcceptCredential}
                disabled={isAccepting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Accept Credential
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View Credentials Tab */}
        <TabsContent value="view">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">My Credentials</CardTitle>
              <CardDescription className="text-gray-600">
                View all credentials issued to or by you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLoadCredentials}
                disabled={isLoadingCredentials}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoadingCredentials ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Refresh Credentials
                  </>
                )}
              </Button>

              {credentials.length > 0 && (
                <div className="space-y-3">
                  {credentials.map((cred, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-gray-900 font-semibold">{cred.type}</h4>
                          <p className="text-xs text-gray-600">Status: <span className="text-green-400">{cred.status}</span></p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRevokeCredential(cred.hash)}
                          className="bg-red-500/80 hover:bg-red-600"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Revoke
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Hash:</span>
                          <p className="text-gray-900 font-mono text-[10px] break-all">{cred.hash}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issuer:</span>
                          <p className="text-gray-900 font-mono text-[10px]">{cred.issuer}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issued:</span>
                          <p className="text-gray-900">{new Date(cred.issuedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Expires:</span>
                          <p className="text-gray-900">{new Date(cred.expiresAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify Credential Tab */}
        <TabsContent value="verify">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Verify Credential</CardTitle>
              <CardDescription className="text-gray-600">
                Verify the authenticity and status of a credential
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verifyHash" className="text-gray-900">Credential Hash</Label>
                <Input
                  id="verifyHash"
                  placeholder="Enter credential hash to verify"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                  disabled={isVerifying}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleVerifyCredential}
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify Credential
                  </>
                )}
              </Button>

              {verifyResult && (
                <div>
                  <Alert className={verifyResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    {verifyResult.valid ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                    <AlertDescription className="text-green-800">
                      {verifyResult.message}
                    </AlertDescription>
                  </Alert>

                  {verifyResult.valid && verifyResult.credential && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-gray-900 font-semibold mb-3">Credential Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <p className="text-gray-900 font-semibold">{verifyResult.credential.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <p className="text-green-400">{verifyResult.credential.status}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issuer:</span>
                          <p className="text-gray-900 font-mono text-xs">{verifyResult.credential.issuer}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Subject:</span>
                          <p className="text-gray-900 font-mono text-xs">{verifyResult.credential.subject}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issued:</span>
                          <p className="text-gray-900">{new Date(verifyResult.credential.issuedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Expires:</span>
                          <p className="text-gray-900">{new Date(verifyResult.credential.expiresAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

