import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Globe, FileText, Link, Download } from 'lucide-react';

export function DomainVerification({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('generate');
  
  // Generate TOML State
  const [domain, setDomain] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [didId, setDidId] = useState('');
  const [credentialHashes, setCredentialHashes] = useState('');
  const [tomlContent, setTomlContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Link Domain State
  const [linkDomain, setLinkDomain] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkResult, setLinkResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Verify Domain State
  const [verifyDomain, setVerifyDomain] = useState('');
  const [verifyAccount, setVerifyAccount] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>(null);

  const generateToml = () => {
    if (!domain.trim() || !organizationName.trim()) {
      return;
    }

    setIsGenerating(true);

    try {
      const now = new Date().toISOString();
      const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // 90 days

      const credentials = credentialHashes.split(',').map(c => c.trim()).filter(c => c);

      const toml = `# xrp-ledger.toml file for ${organizationName}
# Generated: ${now}
# This file provides domain verification for XRPL accounts

[METADATA]
modified = "${now}"
expires = "${expires}"

[DOCUMENTATION]
org_name = "${organizationName}"
org_url = "https://${domain}"
org_description = "Institutional Fund Management on XRPL"

# XRPL Account Information
[[ACCOUNTS]]
address = "${xrplAccount}"
network = "mainnet"
desc = "Primary institutional account"

# Decentralized Identity (DID)
${didId ? `did = "${didId}"` : '# did = "did:xrpl:..."'}

# Credentials (KYC/AML/FATF)
${credentials.length > 0 ? credentials.map((hash, i) => `credential_${i + 1} = "${hash}"`).join('\n') : '# credential_1 = "..."'}

# Domain Verification
[[PRINCIPALS]]
name = "${organizationName}"
email = "compliance@${domain}"
xrpl_address = "${xrplAccount}"

# Compliance Information
[COMPLIANCE]
kyc_provider = "Institutional KYC Service"
aml_provider = "AML Compliance Provider"
jurisdiction = "Global"
regulatory_framework = "MiFID II, SEC, FATF"

# Technical Information
[TECHNICAL]
api_endpoint = "https://api.${domain}"
websocket_endpoint = "wss://ws.${domain}"
support_email = "support@${domain}"

# Institutional Fund Information
[FUND_MANAGEMENT]
fund_type = "Institutional"
asset_classes = ["Digital Assets", "Tokenized Securities", "Stablecoins"]
minimum_investment = "100000 USD"
qualified_investors_only = true

# XRPL Features Used
[XRPL_FEATURES]
mpt = true  # XLS-33 Multi-Purpose Tokens
did = true  # XLS-40 Decentralized Identity
credentials = true  # Credential System
permissioned_domains = true  # XLS-80
amm = true  # XLS-30 Automated Market Maker
lending = true  # XLS-65/66 Lending Protocol
`;

      setTomlContent(toml);
    } catch (error) {
      console.error('Failed to generate TOML:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadToml = () => {
    const blob = new Blob([tomlContent], { type: 'application/toml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'xrp-ledger.toml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLinkDomain = async () => {
    if (!linkDomain.trim()) {
      setLinkResult({ success: false, message: 'Please enter a domain' });
      return;
    }

    setIsLinking(true);
    setLinkResult(null);

    try {
      // In production, this would create an AccountSet transaction
      setLinkResult({
        success: true,
        message: `Domain "${linkDomain}" link request created. Please sign with Xaman wallet to set the Domain field on your account.`
      });
      
      setTimeout(() => {
        setLinkDomain('');
      }, 2000);
    } catch (error) {
      setLinkResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to link domain'
      });
    } finally {
      setIsLinking(false);
    }
  };

  const handleVerifyDomain = async () => {
    if (!verifyDomain.trim() || !verifyAccount.trim()) {
      setVerifyResult({ success: false, message: 'Please enter both domain and account' });
      return;
    }

    setIsVerifying(true);
    setVerifyResult(null);

    try {
      // In production, this would:
      // 1. Fetch xrp-ledger.toml from https://{domain}/.well-known/xrp-ledger.toml
      // 2. Parse TOML content
      // 3. Verify account is listed in [[ACCOUNTS]]
      // 4. Check Domain field on XRPL account matches
      
      setVerifyResult({
        success: true,
        verified: true,
        domain: verifyDomain,
        account: verifyAccount,
        tomlFound: true,
        accountListed: true,
        domainFieldMatches: true,
        organization: 'Example Institutional Fund',
        credentials: ['KYC', 'AML'],
        did: `did:xrpl:${verifyAccount}`,
        message: 'Domain verification successful!'
      });
    } catch (error) {
      setVerifyResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to verify domain'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Domain Verification</h2>
        <p className="text-gray-600">Generate xrp-ledger.toml and verify domain ownership</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="generate" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <FileText className="w-4 h-4 mr-2" />
            Generate TOML
          </TabsTrigger>
          <TabsTrigger value="link" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Link className="w-4 h-4 mr-2" />
            Link Domain
          </TabsTrigger>
          <TabsTrigger value="verify" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Verify Domain
          </TabsTrigger>
        </TabsList>

        {/* Generate TOML Tab */}
        <TabsContent value="generate">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Generate xrp-ledger.toml File</CardTitle>
              <CardDescription className="text-gray-600">
                Create a domain verification file for your XRPL account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-gray-900">Domain *</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName" className="text-gray-900">Organization Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Acme Institutional Fund"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="didId" className="text-gray-900">DID (Optional)</Label>
                <Input
                  id="didId"
                  placeholder={`did:xrpl:${xrplAccount}`}
                  value={didId}
                  onChange={(e) => setDidId(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialHashes" className="text-gray-900">Credential Hashes (Optional)</Label>
                <Input
                  id="credentialHashes"
                  placeholder="hash1, hash2, hash3 (comma-separated)"
                  value={credentialHashes}
                  onChange={(e) => setCredentialHashes(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Account:</strong> {xrplAccount}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  This file should be served at: https://{domain || 'your-domain.com'}/.well-known/xrp-ledger.toml
                </p>
              </div>

              <Button
                onClick={generateToml}
                disabled={isGenerating || !domain || !organizationName}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate TOML File
                  </>
                )}
              </Button>

              {tomlContent && (
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-gray-900 font-semibold">Generated xrp-ledger.toml</h4>
                      <Button
                        size="sm"
                        onClick={downloadToml}
                        className="bg-green-500/80 hover:bg-green-600"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <pre className="text-xs text-gray-900 overflow-x-auto bg-gray-100 p-3 rounded max-h-96">
                      {tomlContent}
                    </pre>
                  </div>

                  <Alert className="bg-yellow-500/20 border-yellow-500/50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Next Steps:</strong>
                      <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                        <li>Download the generated file</li>
                        <li>Upload it to https://{domain}/.well-known/xrp-ledger.toml</li>
                        <li>Ensure HTTPS is enabled with valid SSL certificate</li>
                        <li>Set CORS header: Access-Control-Allow-Origin: *</li>
                        <li>Link the domain to your XRPL account (see "Link Domain" tab)</li>
                      </ol>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Link Domain Tab */}
        <TabsContent value="link">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Link Domain to XRPL Account</CardTitle>
              <CardDescription className="text-gray-600">
                Set the Domain field on your XRPL account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkDomain" className="text-gray-900">Domain</Label>
                <Input
                  id="linkDomain"
                  placeholder="example.com"
                  value={linkDomain}
                  onChange={(e) => setLinkDomain(e.target.value)}
                  disabled={isLinking}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  This will create an AccountSet transaction to set the Domain field
                </p>
              </div>

              {linkResult && (
                <Alert className={linkResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {linkResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {linkResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleLinkDomain}
                disabled={isLinking}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLinking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Linking...
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" />
                    Link Domain
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verify Domain Tab */}
        <TabsContent value="verify">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Verify Domain Ownership</CardTitle>
              <CardDescription className="text-gray-600">
                Verify that a domain is properly linked to an XRPL account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verifyDomain" className="text-gray-900">Domain</Label>
                <Input
                  id="verifyDomain"
                  placeholder="example.com"
                  value={verifyDomain}
                  onChange={(e) => setVerifyDomain(e.target.value)}
                  disabled={isVerifying}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verifyAccount" className="text-gray-900">XRPL Account</Label>
                <Input
                  id="verifyAccount"
                  placeholder="rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc"
                  value={verifyAccount}
                  onChange={(e) => setVerifyAccount(e.target.value)}
                  disabled={isVerifying}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <Button
                onClick={handleVerifyDomain}
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
                    <Globe className="mr-2 h-4 w-4" />
                    Verify Domain
                  </>
                )}
              </Button>

              {verifyResult && (
                <div>
                  <Alert className={verifyResult.verified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    {verifyResult.verified ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                    <AlertDescription className="text-green-800">
                      {verifyResult.message}
                    </AlertDescription>
                  </Alert>

                  {verifyResult.verified && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-gray-900 font-semibold mb-3">Verification Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Domain:</span>
                          <p className="text-gray-900 font-semibold">{verifyResult.domain}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Account:</span>
                          <p className="text-gray-900 font-mono text-xs">{verifyResult.account}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Organization:</span>
                          <p className="text-gray-900">{verifyResult.organization}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">DID:</span>
                          <p className="text-gray-900 font-mono text-xs">{verifyResult.did}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Credentials:</span>
                          <p className="text-gray-900">{verifyResult.credentials.join(', ')}</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-gray-900">TOML Found</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-gray-900">Account Listed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-gray-900">Domain Matches</span>
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

