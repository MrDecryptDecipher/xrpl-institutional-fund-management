import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

interface Amendment {
  name: string;
  xls: string;
  required: boolean;
  enabled: boolean;
  description: string;
}

export function AmendmentTracker({ network }: { network: 'testnet' | 'mainnet' }) {
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [networkCompatible, setNetworkCompatible] = useState<boolean | null>(null);

  const requiredAmendments: Amendment[] = [
    {
      name: 'MPToken',
      xls: 'XLS-33',
      required: true,
      enabled: true, // Mock - in production, query XRPL
      description: 'Multi-Purpose Tokens for institutional asset tokenization'
    },
    {
      name: 'PermissionedDomains',
      xls: 'XLS-80',
      required: true,
      enabled: true,
      description: 'Credential-based access control for compliance'
    },
    {
      name: 'DID',
      xls: 'XLS-40',
      required: true,
      enabled: true,
      description: 'Decentralized Identifiers for institutional identity'
    },
    {
      name: 'Credentials',
      xls: 'XLS-40',
      required: true,
      enabled: true,
      description: 'Credential issuance and verification for KYC/AML'
    },
    {
      name: 'AMM',
      xls: 'XLS-30',
      required: true,
      enabled: true,
      description: 'Automated Market Maker for liquidity provision'
    },
    {
      name: 'Hooks',
      xls: 'XLS-65/66',
      required: false,
      enabled: false,
      description: 'Smart contract functionality (optional)'
    }
  ];

  const checkAmendments = async () => {
    setIsLoading(true);
    
    try {
      // In production, this would query the XRPL network
      // For now, using mock data
      setAmendments(requiredAmendments);
      
      // Check if all required amendments are enabled
      const allRequiredEnabled = requiredAmendments
        .filter(a => a.required)
        .every(a => a.enabled);
      
      setNetworkCompatible(allRequiredEnabled);
    } catch (error) {
      console.error('Failed to check amendments:', error);
      setNetworkCompatible(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAmendments();
  }, [network]);

  return (
    <div className="space-y-6 mt-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Amendment Tracker</h2>
        <p className="text-gray-600 text-base">Verify network compatibility with required XRPL amendments</p>
      </div>

      <Card className="bg-white border-gray-200 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-gray-900 text-xl">Network: {network.toUpperCase()}</CardTitle>
              <CardDescription className="text-gray-600 text-base mt-1">
                Required amendments for institutional fund management
              </CardDescription>
            </div>
            <Button
              onClick={checkAmendments}
              disabled={isLoading}
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg text-white transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {networkCompatible !== null && (
            <Alert className={networkCompatible ? 'bg-green-50 border-green-200 border-2' : 'bg-red-50 border-red-200 border-2'}>
              {networkCompatible ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
              <AlertDescription className={networkCompatible ? 'text-green-800 font-semibold' : 'text-red-800 font-semibold'}>
                {networkCompatible
                  ? 'Network is compatible! All required amendments are enabled.'
                  : 'WARNING: Some required amendments are not enabled on this network.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {amendments.map((amendment, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                  amendment.enabled
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                    : amendment.required
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
                    : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-gray-900 font-bold text-lg">{amendment.name}</h4>
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        {amendment.xls}
                      </span>
                      {amendment.required && (
                        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold">
                          REQUIRED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{amendment.description}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {amendment.enabled ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Status:</span>
                    <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
                      amendment.enabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {amendment.enabled ? 'Enabled' : 'Not Enabled'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
            <h4 className="text-gray-900 font-bold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              About Amendments
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              XRPL amendments are protocol-level features that must be enabled by validator consensus.
              This application requires specific amendments to function correctly. If any required
              amendments are not enabled, some features may not work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

