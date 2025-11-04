import { useState } from "react";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Users, 
  FileText, 
  Clock,
  Lock,
  Unlock,
  Key,
  Globe,
  QrCode,
  Loader2
} from "lucide-react";

interface CompliancePermissioningProps {
  xrplAccount: string | null;
}

export function CompliancePermissioning({ xrplAccount }: CompliancePermissioningProps) {
  const [activeTab, setActiveTab] = useState<"compliance" | "permissioning">("compliance");
  const [domainName, setDomainName] = useState("");
  const [isCreatingDomain, setIsCreatingDomain] = useState(false);
  const [domainCreated, setDomainCreated] = useState(false);
  const [domainId, setDomainId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [payloadUuid, setPayloadUuid] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);
  
  // Mock compliance data
  const complianceData = {
    kycStatus: { approved: 823, pending: 18, rejected: 4, expired: 2 },
    amlAlerts: { high: 2, medium: 8, low: 15 },
    regulatoryReporting: { completed: 95, pending: 3, overdue: 0 },
    jurisdictionCompliance: { compliant: 12, partiallyCompliant: 2, nonCompliant: 0 }
  };

  const createPermissionedDomain = async () => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }

    if (!domainName) {
      setError("Please enter a domain name");
      return;
    }

    setIsCreatingDomain(true);
    setError(null);
    setIsWaitingForSignature(false);
    setPayloadUuid(null);
    setQrCodeUrl(null);
    
    try {
      // Call the backend to create the permissioned domain
      const response = await fetch('/api/create-permissioned-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: xrplAccount,
          domainName: domainName
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show QR code for signing
        setPayloadUuid(result.uuid);
        setQrCodeUrl(result.qrCodeUrl);
        setIsWaitingForSignature(true);
        
        // Poll for transaction completion
        pollForTransactionCompletion(result.uuid, 'domain');
      } else {
        throw new Error(result.error || 'Failed to create permissioned domain');
      }
    } catch (error) {
      console.error("Failed to create permissioned domain:", error);
      setError(`Failed to create permissioned domain: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCreatingDomain(false);
    }
  };

  const pollForTransactionCompletion = async (uuid: string, type: 'domain' | 'proposal' | 'vote') => {
    try {
      // Poll our backend for payload status
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/payload-status/${uuid}`);
          const payload = await response.json();
          
          if (payload.meta && payload.meta.resolved) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            
            if (payload.response && payload.response.txid) {
              // Transaction was successful
              if (type === 'domain') {
                const domainId = `domain_${Date.now()}`;
                setDomainId(domainId);
                setDomainCreated(true);
                setError(null);
              }
            } else {
              // Transaction was rejected or failed
              setError("Transaction was rejected or failed. Please try again.");
            }
          } else if (payload.meta && payload.meta.cancelled) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            setError("Transaction was cancelled. Please try again.");
          }
        } catch (err) {
          console.error("Error polling for transaction status:", err);
        }
      }, 2000); // Poll every 2 seconds
    } catch (err) {
      console.error("Error starting transaction polling:", err);
      setIsWaitingForSignature(false);
      setError(`Failed to monitor transaction: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const resetDomainCreation = () => {
    setDomainCreated(false);
    setDomainName("");
    setDomainId("");
    setPayloadUuid(null);
    setQrCodeUrl(null);
    setIsWaitingForSignature(false);
    setError(null);
  };

  const cancelTransaction = () => {
    resetDomainCreation();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Compliance & Permissioning</h3>
        <div className="flex items-center space-x-2">
          {xrplAccount && (
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "compliance"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Shield className="h-4 w-4 mr-2" />
          Compliance
        </button>
        <button
          onClick={() => setActiveTab("permissioning")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "permissioning"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Lock className="h-4 w-4 mr-2" />
          Permissioning
        </button>
      </div>

      {activeTab === "compliance" ? (
        <div className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-900">KYC Approved</h4>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-700">{complianceData.kycStatus.approved}</p>
              <p className="text-xs text-blue-600 mt-1">Investors verified</p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-yellow-900">Pending KYC</h4>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-700">{complianceData.kycStatus.pending}</p>
              <p className="text-xs text-yellow-600 mt-1">Awaiting review</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-green-900">AML Cleared</h4>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-700">
                {complianceData.amlAlerts.low + complianceData.amlAlerts.medium + complianceData.amlAlerts.high}
              </p>
              <p className="text-xs text-green-600 mt-1">Screenings completed</p>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-red-900">AML Alerts</h4>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-red-700">{complianceData.amlAlerts.high}</p>
              <p className="text-xs text-red-600 mt-1">High risk cases</p>
            </div>
          </div>
          
          {/* Compliance Details */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-3">Regulatory Compliance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Globe className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Jurisdictions</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {complianceData.jurisdictionCompliance.compliant}
                </p>
                <p className="text-xs text-green-600">Fully compliant</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Reports Filed</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {complianceData.regulatoryReporting.completed}
                </p>
                <p className="text-xs text-purple-600">This quarter</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Key className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Credentials</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {complianceData.kycStatus.approved + complianceData.kycStatus.pending}
                </p>
                <p className="text-xs text-orange-600">Active</p>
              </div>
            </div>
          </div>
        </div>
      ) : isWaitingForSignature && qrCodeUrl ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Sign Domain Creation</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-700 mb-4">
              Scan the QR code with your Xaman wallet to sign and submit the domain creation transaction.
            </p>
            
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="Xaman QR Code" className="w-48 h-48" />
            </div>
            
            <p className="text-xs text-blue-600 text-center">
              Waiting for signature... This window will update automatically once signed.
            </p>
          </div>
          
          <button
            onClick={cancelTransaction}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel Transaction
          </button>
        </div>
      ) : domainCreated ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Domain Created Successfully</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Domain Name</p>
                <p className="font-medium text-gray-900">{domainName}</p>
              </div>
              <div>
                <p className="text-gray-500">Domain ID</p>
                <p className="font-mono text-gray-900 truncate">{domainId}</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={resetDomainCreation}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Another Domain
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name *
            </label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter domain name (e.g., institutional-fund-access)"
            />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Permissioning Rules</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>KYC/AML credentials required for access</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Jurisdiction-based access control</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Authorized credential issuers only</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={createPermissionedDomain}
            disabled={isCreatingDomain || !xrplAccount}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingDomain ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Creating Domain...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                <span>Create Permissioned Domain</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}