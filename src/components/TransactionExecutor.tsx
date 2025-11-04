import { useState } from "react";
import {
  Send,
  Wallet,
  Coins,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  QrCode,
  Loader2
} from "lucide-react";
import { xrpToDrops } from "xrpl";
import { XamanTransactionSigner } from "./XamanTransactionSigner";
import { getXummInstance } from "../lib/xummInstance";

interface TransactionExecutorProps {
  xrplAccount: string | null;
  network?: "testnet" | "mainnet";
  onTransactionComplete: (result: any) => void;
}

export function TransactionExecutor({ xrplAccount, network = "testnet", onTransactionComplete }: TransactionExecutorProps) {
  const [transactionType, setTransactionType] = useState<"subscription" | "redemption" | "transfer">("subscription");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showXamanSigner, setShowXamanSigner] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<any>(null);
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [payloadUuid, setPayloadUuid] = useState<string | null>(null);

  const executeTransaction = async () => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }

    if (!amount || (transactionType !== "subscription" && !recipient)) {
      setError("Please fill in all required fields");
      return;
    }

    setIsExecuting(true);
    setError(null);
    setIsWaitingForSignature(false);
    setPayloadUuid(null);
    setQrCodeUrl(null);

    try {
      // Use Xaman SDK directly (no backend needed)
      const xumm = getXummInstance();

      // Determine destination based on transaction type
      let destination = recipient;
      if (transactionType === "subscription") {
        destination = "rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY"; // Fund pool address (valid XRPL address)
      }

      // Create payment transaction via backend API
      console.log('Creating Xaman payload via backend API...');

      const payloadData = {
        xrplAccount: xrplAccount, // ✅ Pass XRPL account for user token lookup
        transactionType: 'Payment',
        transactionData: {
          // Account field is omitted - will be filled by Xaman when user signs
          Destination: destination,
          Amount: xrpToDrops(amount),
          Memos: [{
            Memo: {
              MemoType: Buffer.from('transaction_type', 'utf8').toString('hex').toUpperCase(),
              MemoData: Buffer.from(transactionType, 'utf8').toString('hex').toUpperCase()
            }
          }]
        }
      };

      console.log('Payload data:', payloadData);
      console.log('🔑 XRPL Account for user token lookup:', xrplAccount);

      // Call backend API to create payload
      const response = await fetch('http://3.111.22.56:3001/api/create-xaman-payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend API error: ${errorData.error || response.statusText}`);
      }

      const payload = await response.json();
      console.log('Payload created:', payload);

      // Log push notification status
      if (payload.pushed) {
        console.log('✅ PUSH NOTIFICATION SENT! User will receive notification on mobile device.');
      } else {
        console.log('ℹ️ No push notification sent. User must scan QR code.');
      }

      if (!payload || !payload.uuid || !payload.refs || !payload.refs.qr_png) {
        throw new Error('Invalid payload response from backend');
      }

      // Show QR code for signing
      setPayloadUuid(payload.uuid);
      setQrCodeUrl(payload.refs.qr_png);
      setIsWaitingForSignature(true);

      // Wait for user to sign by polling the backend
      console.log('Waiting for user to sign...');
      console.log('Payload UUID:', payload.uuid);
      console.log('QR Code URL:', payload.refs.qr_png);

      const maxAttempts = 60; // 5 minutes (5 seconds * 60)
      let attempts = 0;
      let result: any = null;

      while (attempts < maxAttempts) {
        try {
          console.log(`Polling attempt ${attempts + 1}/${maxAttempts}...`);
          const statusResponse = await fetch(`http://3.111.22.56:3001/api/payload-result/${payload.uuid}`);

          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log('Payload status:', {
              has_response: !!statusData.response,
              resolved_at: statusData.response?.resolved_at,
              txid: statusData.response?.txid,
              account: statusData.response?.account
            });

            // Check if payload is resolved (resolved_at will be set when signed/rejected)
            if (statusData.response && statusData.response.resolved_at) {
              console.log('✅ Payload resolved!');
              result = statusData;
              break;
            }
          } else {
            console.error('Status response not OK:', statusResponse.status, statusResponse.statusText);
          }

          // Wait 5 seconds before next attempt
          console.log(`Waiting 5 seconds before next attempt...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
        } catch (pollError) {
          console.error(`Attempt ${attempts + 1}: Error polling:`, pollError);
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
        }
      }

      if (!result) {
        throw new Error('Transaction signing timed out after 5 minutes');
      }

      console.log('Final transaction result:', result);

      // Check if transaction was signed (txid will be present if signed)
      if (result.response && result.response.txid) {
        console.log('✅ Transaction was signed successfully!');
        console.log('Transaction ID:', result.response.txid);
        console.log('Ledger Index:', result.response.ledger_index);

        // Transaction was signed and submitted
        handleTransactionSuccess({
          txid: result.response.txid,
          ledger: result.response.ledger_index,
          signed: true
        });
      } else {
        console.log('❌ Transaction was rejected or expired');
        // Transaction was rejected or expired
        throw new Error('Transaction was rejected or expired');
      }

    } catch (err) {
      console.error("Transaction preparation failed:", err);
      setError(`Failed to prepare transaction: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`);
      setIsWaitingForSignature(false);
      setQrCodeUrl(null);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleTransactionSuccess = (result: any) => {
    const transactionResult = {
      success: true,
      txHash: result.txid,
      ledgerIndex: result.ledger,
      amount: amount,
      transactionType: transactionType,
      explorerUrl: network === "mainnet" 
        ? `https://livenet.xrpl.org/transactions/${result.txid}`
        : `https://testnet.xrpl.org/transactions/${result.txid}`
    };
    
    setTransactionResult(transactionResult);
    onTransactionComplete(transactionResult);
    setShowXamanSigner(false);
    setPendingTransaction(null);
    setIsWaitingForSignature(false);
    setQrCodeUrl(null);
  };

  const handleTransactionError = (error: string) => {
    setError(error);
    setShowXamanSigner(false);
    setPendingTransaction(null);
    setIsWaitingForSignature(false);
    setQrCodeUrl(null);
  };

  const handleTransactionCancel = () => {
    setShowXamanSigner(false);
    setPendingTransaction(null);
    setIsWaitingForSignature(false);
    setQrCodeUrl(null);
  };

  const resetForm = () => {
    setTransactionResult(null);
    setError(null);
    setAmount("");
    setRecipient("");
    setShowXamanSigner(false);
    setPendingTransaction(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Execute Transaction</h3>
        <div className="flex items-center space-x-2">
          {xrplAccount && (
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Connected</span>
            </div>
          )}
        </div>
      </div>

      {isWaitingForSignature && qrCodeUrl ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Sign Transaction</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-700 mb-4">
              Scan the QR code with your Xaman wallet to sign and submit the transaction.
            </p>
            
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="Xaman QR Code" className="w-48 h-48" />
            </div>
            
            <p className="text-xs text-blue-600 text-center">
              Waiting for signature... This window will update automatically once signed.
            </p>
          </div>
          
          <button
            onClick={resetForm}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel Transaction
          </button>
        </div>
      ) : transactionResult ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Transaction Successful</span>
              </div>
              <a 
                href={transactionResult.explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Transaction Hash</p>
                <p className="font-mono text-gray-900 truncate">{transactionResult.txHash}</p>
              </div>
              <div>
                <p className="text-gray-500">Ledger Index</p>
                <p className="font-mono text-gray-900">{transactionResult.ledgerIndex}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-medium text-gray-900">{transactionResult.amount} XRP</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium text-gray-900 capitalize">{transactionResult.transactionType}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={resetForm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Execute Another Transaction
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTransactionType("subscription")}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                transactionType === "subscription"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowUpDown className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Subscribe</span>
            </button>
            
            <button
              onClick={() => setTransactionType("redemption")}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                transactionType === "redemption"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowUpDown className="h-5 w-5 mb-1 rotate-180" />
              <span className="text-xs font-medium">Redeem</span>
            </button>
            
            <button
              onClick={() => setTransactionType("transfer")}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                transactionType === "transfer"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Send className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Transfer</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (XRP) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
                <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {transactionType !== "subscription" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {transactionType === "redemption" ? "Redemption Address" : "Recipient Address"} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter XRPL address"
                  />
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={executeTransaction}
            disabled={isExecuting || !xrplAccount}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Preparing Transaction...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                <span>Execute Transaction</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Xaman Transaction Signer Modal */}
      <XamanTransactionSigner
        transaction={pendingTransaction}
        isVisible={showXamanSigner}
        onSuccess={handleTransactionSuccess}
        onError={handleTransactionError}
        onCancel={handleTransactionCancel}
        onQrCodeReady={(qrUrl) => {
          setQrCodeUrl(qrUrl);
          setIsWaitingForSignature(true);
        }}
      />
    </div>
  );
}