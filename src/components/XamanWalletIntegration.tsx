import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Wallet, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertCircle,
  Send,
  FileText
} from "lucide-react";
import { XamanWalletConnect } from "./XamanWalletConnect";

export function XamanWalletIntegration() {
  const [activeTab, setActiveTab] = useState<'connect' | 'transactions' | 'info'>('connect');
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedAccount = localStorage.getItem('xamanAccount');
    if (savedAccount) {
      console.log("Found existing Xaman session:", savedAccount);
      setIsConnected(true);
      setAccount(savedAccount);
      setXrplAccount(savedAccount);
    }
  }, []);

  const handleConnect = (payload: any) => {
    console.log("Xaman wallet connected:", payload);
    setIsConnected(true);
    setAccount(payload.response?.account || null);
    setXrplAccount(payload.response?.account || null);
    toast.success("Xaman wallet connected successfully!");
  };

  const handleDisconnect = () => {
    console.log("Xaman wallet disconnected");
    setIsConnected(false);
    setAccount(null);
    setXrplAccount(null);
    toast.info("Xaman wallet disconnected");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl mb-4 shadow-xl">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
            Xaman Wallet Integration
          </h1>
          <p className="text-gray-600">
            Connect your Xaman wallet to interact with the XRPL Institutional Fund Platform
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('connect')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'connect'
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-md"
            }`}
          >
            <Wallet className="h-4 w-4" />
            <span>Wallet Connection</span>
          </button>
          
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'transactions'
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-md"
            }`}
          >
            <Send className="h-4 w-4" />
            <span>Transactions</span>
          </button>
          
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'info'
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-md"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Wallet Info</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          {activeTab === 'connect' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect Your Wallet
                </h2>
                
                <XamanWalletConnect 
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Status</h2>
                
                {isConnected ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium mb-2">Wallet Connected</p>
                    <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg mb-4">
                      {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>XRPL Account:</strong> {xrplAccount}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No wallet connected</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Connect your Xaman wallet using the button above
                    </p>
                  </div>
                )}
                
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    <li>Click "Connect with Xaman" to start the connection process</li>
                    <li>Scan the QR code with your Xaman mobile app</li>
                    <li>Approve the connection in your Xaman app</li>
                    <li>Your wallet will be connected to the platform</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="text-center py-12">
              <Send className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Management</h3>
              <p className="text-gray-600 mb-6">
                Transaction functionality will be available here once your wallet is connected
              </p>
              
              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-yellow-800">
                    <strong>Wallet not connected:</strong> Please connect your Xaman wallet first to access transaction features.
                  </p>
                </div>
              )}
              
              {isConnected && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
                  <button
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                    disabled
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Payment
                  </button>
                  
                  <button
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200"
                    disabled
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Create Payment Request
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Wallet Information</h2>
                
                {isConnected ? (
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">XRPL Account</p>
                        <p className="text-xs font-mono text-gray-600 break-all">{account}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Connection Status</p>
                        <p className="text-xs text-green-600">Connected</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No wallet information available</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Connect your Xaman wallet to view account information
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Xaman Wallet</h2>
                <div className="space-y-4 text-sm text-gray-600">
                  <p>
                    Xaman is a secure wallet application for the XRP Ledger that allows you to 
                    manage your digital assets and interact with XRPL-based applications.
                  </p>
                  <p>
                    By connecting your Xaman wallet, you can:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Sign transactions securely</li>
                    <li>Manage your XRPL account</li>
                    <li>Interact with institutional funds</li>
                    <li>Access advanced financial features</li>
                  </ul>
                  <p className="pt-2">
                    Your private keys remain secure in your Xaman app and are never shared with this platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default XamanWalletIntegration;