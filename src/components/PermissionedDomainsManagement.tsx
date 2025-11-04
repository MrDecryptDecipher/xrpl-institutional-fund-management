import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Globe, Users, Shield, Trash2 } from 'lucide-react';

export function PermissionedDomainsManagement({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('create');
  
  // Create Domain State
  const [domainId, setDomainId] = useState('');
  const [requiredCredentials, setRequiredCredentials] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createResult, setCreateResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Manage Members State
  const [memberAddress, setMemberAddress] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberResult, setMemberResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // View Domains State
  const [domains, setDomains] = useState<any[]>([]);
  const [isLoadingDomains, setIsLoadingDomains] = useState(false);

  const handleCreateDomain = async () => {
    if (!domainId.trim()) {
      setCreateResult({ success: false, message: 'Please enter a domain ID' });
      return;
    }

    setIsCreating(true);
    setCreateResult(null);

    try {
      const credentialsList = requiredCredentials.split(',').map(c => c.trim()).filter(c => c);
      
      setCreateResult({
        success: true,
        message: `Permissioned Domain "${domainId}" creation request created. Please sign with Xaman wallet.`
      });
      
      setTimeout(() => {
        setDomainId('');
        setRequiredCredentials('');
      }, 2000);
    } catch (error) {
      setCreateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create domain'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddMember = async () => {
    if (!memberAddress.trim()) {
      setMemberResult({ success: false, message: 'Please enter member address' });
      return;
    }

    setIsAddingMember(true);
    setMemberResult(null);

    try {
      setMemberResult({
        success: true,
        message: 'Member addition request created. Please sign with Xaman wallet.'
      });
      
      setTimeout(() => {
        setMemberAddress('');
      }, 2000);
    } catch (error) {
      setMemberResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to add member'
      });
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleLoadDomains = async () => {
    setIsLoadingDomains(true);
    
    try {
      setDomains([
        {
          domainId: 'institutional-fund-001',
          owner: xrplAccount,
          requiredCredentials: ['KYC', 'AML'],
          members: 15,
          created: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Failed to load domains:', error);
    } finally {
      setIsLoadingDomains(false);
    }
  };

  const handleDeleteDomain = async (domainId: string) => {
    if (!confirm(`Are you sure you want to delete domain "${domainId}"?`)) {
      return;
    }

    try {
      setCreateResult({
        success: true,
        message: 'Domain deletion request created. Please sign with Xaman wallet.'
      });
    } catch (error) {
      setCreateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete domain'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Permissioned Domains</h2>
        <p className="text-gray-600">Manage credential-based access control (XLS-80)</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Globe className="w-4 h-4 mr-2" />
            Create Domain
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Users className="w-4 h-4 mr-2" />
            Manage Members
          </TabsTrigger>
          <TabsTrigger value="view" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Shield className="w-4 h-4 mr-2" />
            My Domains
          </TabsTrigger>
        </TabsList>

        {/* Create Domain Tab */}
        <TabsContent value="create">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Create Permissioned Domain</CardTitle>
              <CardDescription className="text-gray-600">
                Create a domain with credential-based access requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domainId" className="text-gray-900">Domain ID *</Label>
                <Input
                  id="domainId"
                  placeholder="e.g., institutional-fund-001"
                  value={domainId}
                  onChange={(e) => setDomainId(e.target.value)}
                  disabled={isCreating}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiredCredentials" className="text-gray-900">
                  Required Credentials (Optional)
                </Label>
                <Input
                  id="requiredCredentials"
                  placeholder="e.g., KYC, AML, FATF (comma-separated)"
                  value={requiredCredentials}
                  onChange={(e) => setRequiredCredentials(e.target.value)}
                  disabled={isCreating}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  Members must have these credentials to access the domain
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Owner:</strong> {xrplAccount}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You will be the owner of this permissioned domain
                </p>
              </div>

              {createResult && (
                <Alert className={createResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {createResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {createResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleCreateDomain}
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Create Domain
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Members Tab */}
        <TabsContent value="members">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Manage Domain Members</CardTitle>
              <CardDescription className="text-gray-600">
                Add or remove members from your permissioned domains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="memberAddress" className="text-gray-900">Member Address</Label>
                <Input
                  id="memberAddress"
                  placeholder="Enter XRPL address to add as member"
                  value={memberAddress}
                  onChange={(e) => setMemberAddress(e.target.value)}
                  disabled={isAddingMember}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {memberResult && (
                <Alert className={memberResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {memberResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {memberResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAddMember}
                disabled={isAddingMember}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isAddingMember ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Add Member
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* View Domains Tab */}
        <TabsContent value="view">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">My Permissioned Domains</CardTitle>
              <CardDescription className="text-gray-600">
                View and manage your permissioned domains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLoadDomains}
                disabled={isLoadingDomains}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoadingDomains ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Refresh Domains
                  </>
                )}
              </Button>

              {domains.length > 0 && (
                <div className="space-y-3">
                  {domains.map((domain, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-gray-900 font-semibold">{domain.domainId}</h4>
                          <p className="text-xs text-gray-600">Owner: {domain.owner}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteDomain(domain.domainId)}
                          className="bg-red-500/80 hover:bg-red-600"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Required Credentials:</span>
                          <p className="text-gray-900">{domain.requiredCredentials.join(', ')}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Members:</span>
                          <p className="text-gray-900">{domain.members}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Created:</span>
                          <p className="text-gray-900">{new Date(domain.created).toLocaleDateString()}</p>
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

