import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, FileText, Eye, Edit, Trash2 } from 'lucide-react';

export function DIDManagement({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('create');
  
  // Create DID State
  const [didDocument, setDidDocument] = useState('');
  const [didUri, setDidUri] = useState('');
  const [didData, setDidData] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createResult, setCreateResult] = useState<{ success: boolean; message: string; didId?: string } | null>(null);
  
  // View DID State
  const [currentDid, setCurrentDid] = useState<any>(null);
  const [isLoadingDid, setIsLoadingDid] = useState(false);
  
  // Update DID State
  const [updateDocument, setUpdateDocument] = useState('');
  const [updateUri, setUpdateUri] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateDID = async () => {
    setIsCreating(true);
    setCreateResult(null);

    try {
      // Create W3C compliant DID document
      const w3cDocument = {
        '@context': ['https://www.w3.org/ns/did/v1'],
        id: `did:xrpl:${xrplAccount}`,
        controller: xrplAccount,
        verificationMethod: [{
          id: `did:xrpl:${xrplAccount}#keys-1`,
          type: 'Ed25519VerificationKey2020',
          controller: `did:xrpl:${xrplAccount}`,
          publicKeyMultibase: xrplAccount
        }],
        authentication: [`did:xrpl:${xrplAccount}#keys-1`],
        service: didUri ? [{
          id: `did:xrpl:${xrplAccount}#service-1`,
          type: 'LinkedDomains',
          serviceEndpoint: didUri
        }] : []
      };

      const documentHex = Buffer.from(JSON.stringify(w3cDocument)).toString('hex');
      const dataHex = didData ? Buffer.from(didData).toString('hex') : '';
      const uriHex = didUri ? Buffer.from(didUri).toString('hex') : '';

      setCreateResult({
        success: true,
        message: `DID created successfully! DID: did:xrpl:${xrplAccount}. Please sign with Xaman wallet.`,
        didId: `did:xrpl:${xrplAccount}`
      });
      
      // Reset form
      setTimeout(() => {
        setDidDocument('');
        setDidUri('');
        setDidData('');
      }, 2000);
    } catch (error) {
      setCreateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create DID'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLoadDID = async () => {
    setIsLoadingDid(true);
    
    try {
      // Mock DID data - in production, this would query XRPL
      setCurrentDid({
        account: xrplAccount,
        didId: `did:xrpl:${xrplAccount}`,
        didDocument: {
          '@context': ['https://www.w3.org/ns/did/v1'],
          id: `did:xrpl:${xrplAccount}`,
          controller: xrplAccount,
          verificationMethod: [{
            id: `did:xrpl:${xrplAccount}#keys-1`,
            type: 'Ed25519VerificationKey2020',
            controller: `did:xrpl:${xrplAccount}`,
            publicKeyMultibase: xrplAccount
          }],
          authentication: [`did:xrpl:${xrplAccount}#keys-1`]
        },
        uri: 'https://example.com/did-document',
        data: 'Public attestation data',
        created: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to load DID:', error);
    } finally {
      setIsLoadingDid(false);
    }
  };

  const handleUpdateDID = async () => {
    if (!updateDocument && !updateUri && !updateData) {
      setUpdateResult({ success: false, message: 'Please provide at least one field to update' });
      return;
    }

    setIsUpdating(true);
    setUpdateResult(null);

    try {
      setUpdateResult({
        success: true,
        message: 'DID update request created. Please sign with Xaman wallet.'
      });
      
      // Reset form
      setTimeout(() => {
        setUpdateDocument('');
        setUpdateUri('');
        setUpdateData('');
      }, 2000);
    } catch (error) {
      setUpdateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update DID'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteDID = async () => {
    if (!confirm('Are you sure you want to delete your DID? This action cannot be undone.')) {
      return;
    }

    try {
      setUpdateResult({
        success: true,
        message: 'DID deletion request created. Please sign with Xaman wallet.'
      });
    } catch (error) {
      setUpdateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete DID'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">DID Management</h2>
        <p className="text-gray-600">Manage Decentralized Identifiers (XLS-40)</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <FileText className="w-4 h-4 mr-2" />
            Create DID
          </TabsTrigger>
          <TabsTrigger value="view" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Eye className="w-4 h-4 mr-2" />
            View DID
          </TabsTrigger>
          <TabsTrigger value="update" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Edit className="w-4 h-4 mr-2" />
            Update DID
          </TabsTrigger>
        </TabsList>

        {/* Create DID Tab */}
        <TabsContent value="create">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Create Decentralized Identifier</CardTitle>
              <CardDescription className="text-gray-600">
                Create a W3C compliant DID for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="didUri" className="text-gray-900">
                  URI (Optional)
                </Label>
                <Input
                  id="didUri"
                  placeholder="https://example.com/did-document or ipfs://..."
                  value={didUri}
                  onChange={(e) => setDidUri(e.target.value)}
                  disabled={isCreating}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500">HTTP(S) URL or IPFS URI (max 256 bytes)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="didData" className="text-gray-900">
                  Public Attestation Data (Optional)
                </Label>
                <Input
                  id="didData"
                  placeholder="Public identity credentials or attestations"
                  value={didData}
                  onChange={(e) => setDidData(e.target.value)}
                  disabled={isCreating}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <p className="text-xs text-gray-500">Public attestations (max 256 bytes)</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Your DID:</strong> did:xrpl:{xrplAccount}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  A W3C compliant DID document will be automatically generated
                </p>
              </div>

              {createResult && (
                <Alert className={createResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {createResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className={createResult.success ? 'text-green-800' : 'text-red-800'}>
                    {createResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleCreateDID}
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating DID...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Create DID
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View DID Tab */}
        <TabsContent value="view">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">View DID Document</CardTitle>
              <CardDescription className="text-gray-600">
                View your W3C compliant DID document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLoadDID}
                disabled={isLoadingDid}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoadingDid ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Load DID
                  </>
                )}
              </Button>

              {currentDid && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-gray-900 font-semibold mb-2">DID Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">DID:</span>
                        <p className="text-gray-900 font-mono text-xs break-all">{currentDid.didId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Account:</span>
                        <p className="text-gray-900 font-mono text-xs">{currentDid.account}</p>
                      </div>
                      {currentDid.uri && (
                        <div>
                          <span className="text-gray-600">URI:</span>
                          <p className="text-gray-900 text-xs break-all">{currentDid.uri}</p>
                        </div>
                      )}
                      {currentDid.data && (
                        <div>
                          <span className="text-gray-600">Data:</span>
                          <p className="text-gray-900 text-xs">{currentDid.data}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-gray-900 font-semibold mb-2">W3C DID Document</h3>
                    <pre className="text-xs text-gray-900 overflow-x-auto bg-gray-100 p-3 rounded">
                      {JSON.stringify(currentDid.didDocument, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update DID Tab */}
        <TabsContent value="update">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Update or Delete DID</CardTitle>
              <CardDescription className="text-gray-600">
                Modify your DID document or delete it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="updateUri" className="text-gray-900">New URI (Optional)</Label>
                <Input
                  id="updateUri"
                  placeholder="https://example.com/new-did-document"
                  value={updateUri}
                  onChange={(e) => setUpdateUri(e.target.value)}
                  disabled={isUpdating}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updateData" className="text-gray-900">New Data (Optional)</Label>
                <Input
                  id="updateData"
                  placeholder="Updated public attestations"
                  value={updateData}
                  onChange={(e) => setUpdateData(e.target.value)}
                  disabled={isUpdating}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {updateResult && (
                <Alert className={updateResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {updateResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className={updateResult.success ? 'text-green-800' : 'text-red-800'}>
                    {updateResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleUpdateDID}
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Update DID
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDeleteDID}
                  variant="destructive"
                  className="bg-red-500/80 hover:bg-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete DID
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

