import { useState } from "react";
import { toast } from "sonner";
import { 
  Wallet, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  QrCode,
  Loader2,
  ArrowRight,
  TestTube
} from "lucide-react";
import { XamanWalletConnect } from "./XamanWalletConnect";
import { XamanTransactionSigner } from "./XamanTransactionSigner";

export function XamanIntegrationTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [showTransactionSigner, setShowTransactionSigner] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [testStep, setTestStep] = useState<'connect' | 'transaction' | 'complete'>('connect');

  const handleXamanConnect = (payload: any) => {
    console.log("Xaman connected:", payload);
    setIsConnected(true);
    setAccount(payload.response?.account || "Unknown");
    setTestStep('transaction');
    toast.success("Xaman wallet connected successfully!");
  };

  const handleXamanDisconnect = () => {
    console.log("Xaman disconnected");
    setIsConnected(false);
    setAccount(null);
    setTestStep('connect');
    setTransactionResult(null);
    toast.info("Xaman wallet disconnected");
  };

  const createTestTransaction = () => {
    if (!account) {
      toast.error("Please connect your Xaman wallet first");
      return;
    }

    // Create a simple test transaction
    const transaction = {
      TransactionType: "Payment",
      Account: account,
      Amount: "1000000", // 1 XRP in drops
      Destination: "rTestDestination123456789", // Test destination
      Fee: "12",
      Flags: 0,
      Sequence: 0,
      Memos: [{
        Memo: {
          MemoData: "Xaman Integration Test Transaction"
        }
      }]
    };

    setPendingTransaction(transaction);
    setShowTransactionSigner(true);
  };

  const handleTransactionSuccess = (result: any) => {
    console.log("Transaction successful:", result);
    setTransactionResult({
      success: true,
      txid: result.txid,
      ledger: result.ledger,
      account: result.account
    });
    setShowTransactionSigner(false);
    setTestStep('complete');
    toast.success("Transaction signed successfully!");
  };

  const handleTransactionError = (error: string) => {
    console.error("Transaction error:", error);
    setShowTransactionSigner(false);
    toast.error(`Transaction failed: ${error}`);
  };

  const handleTransactionCancel = () => {
    console.log("Transaction cancelled");
    setShowTransactionSigner(false);
    toast.info("Transaction cancelled");
  };

  const resetTest = () => {
    setTestStep('connect');
    setTransactionResult(null);
    setPendingTransaction(null);
    setShowTransactionSigner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl mb-4 shadow-xl">
            <TestTube className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
            Xaman Integration Test
          </h1>
          <p className="text-gray-600">
            Test the complete Xaman wallet integration flow
          </p>
        </div>

        {/* Test Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-4 rounded-xl border-2 transition-all ${
            testStep === 'connect' 
              ? 'border-blue-500 bg-blue-50' 
              : isConnected 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                testStep === 'connect' 
                  ? 'bg-blue-500 text-white' 
                  : isConnected 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {isConnected ? <CheckCircle className="h-4 w-4" /> : '1'}
              </div>
              <h3 className="font-semibold">Connect Wallet</h3>
            </div>
            <p className="text-sm text-gray-600">
              Connect your Xaman wallet using QR code
            </p>
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all ${
            testStep === 'transaction' 
              ? 'border-blue-500 bg-blue-50' 
              : transactionResult 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                testStep === 'transaction' 
                  ? 'bg-blue-500 text-white' 
                  : transactionResult 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {transactionResult ? <CheckCircle className="h-4 w-4" /> : '2'}
              </div>
              <h3 className="font-semibold">Sign Transaction</h3>
            </div>
            <p className="text-sm text-gray-600">
              Sign a test transaction with Xaman
            </p>
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all ${
            testStep === 'complete' 
              ? 'border-blue-500 bg-blue-50' 
              : transactionResult 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                testStep === 'complete' 
                  ? 'bg-blue-500 text-white' 
                  : transactionResult 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {transactionResult ? <CheckCircle className="h-4 w-4" /> : '3'}
              </div>
              <h3 className="font-semibold">Complete</h3>
            </div>
            <p className="text-sm text-gray-600">
              Integration test completed
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Connection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              Wallet Connection
            </h2>
            
            {!isConnected ? (
              <XamanWalletConnect 
                onConnect={handleXamanConnect}
                onDisconnect={handleXamanDisconnect}
              />
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-green-600 font-medium mb-2">Wallet Connected</p>
                <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg mb-4">
                  {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                </p>
                <button
                  onClick={handleXamanDisconnect}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {/* Transaction Testing */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Send className="h-5 w-5 mr-2" />
              Transaction Testing
            </h2>
            
            {!isConnected ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Please connect your wallet first</p>
              </div>
            ) : !transactionResult ? (
              <div className="text-center">
                <div className="mb-4">
                  <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-4">
                    Click the button below to create a test transaction that will require signing with your Xaman wallet.
                  </p>
                </div>
                <button
                  onClick={createTestTransaction}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Create Test Transaction
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-green-600 font-medium mb-2">Transaction Successful!</p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4 text-left">
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Transaction ID:</strong> {transactionResult.txid?.substring(0, 16)}...
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Account:</strong> {transactionResult.account?.substring(0, 8)}...
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Ledger:</strong> {transactionResult.ledger}
                  </p>
                </div>
                <button
                  onClick={resetTest}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset Test
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Test Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Connect with Xaman" to start the wallet connection process</li>
            <li>Scan the QR code with your Xaman mobile app</li>
            <li>Approve the connection in your Xaman app</li>
            <li>Once connected, click "Create Test Transaction"</li>
            <li>Scan the new QR code to sign the test transaction</li>
            <li>Approve the transaction in your Xaman app</li>
            <li>Verify the transaction was successful</li>
          </ol>
        </div>

        {/* Xaman Transaction Signer Modal */}
        <XamanTransactionSigner
          transaction={pendingTransaction}
          isVisible={showTransactionSigner}
          onSuccess={handleTransactionSuccess}
          onError={handleTransactionError}
          onCancel={handleTransactionCancel}
        />
      </div>
    </div>
  );
}

export default XamanIntegrationTest;

