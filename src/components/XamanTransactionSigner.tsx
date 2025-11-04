import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QrCode, CheckCircle, XCircle, Loader2, Wallet } from "lucide-react";
import { getXummInstance } from "../lib/xummInstance";

// Use shared Xumm instance
const xumm = getXummInstance();

interface XamanTransactionSignerProps {
  transaction: any;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  onQrCodeReady?: (qrUrl: string) => void;
  isVisible: boolean;
}

export function XamanTransactionSigner({ 
  transaction, 
  onSuccess, 
  onError, 
  onCancel,
  onQrCodeReady,
  isVisible 
}: XamanTransactionSignerProps) {
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'creating' | 'waiting' | 'success' | 'error' | 'cancelled'>('idle');

  // Create payload when transaction is provided
  useEffect(() => {
    if (transaction && isVisible && status === 'idle') {
      createPayload();
    }
  }, [transaction, isVisible]);

  // Poll for payload status
  useEffect(() => {
    if (payload?.uuid && status === 'waiting') {
      const interval = setInterval(async () => {
        try {
          const status = await xumm.payload?.get(payload.uuid);
          if (status) {
            if (status.meta?.resolved) {
              clearInterval(interval);
              if (status.meta?.cancelled) {
                setStatus('cancelled');
                onCancel?.();
              } else if (status.response?.txid) {
                setStatus('success');
                onSuccess?.(status.response);
              } else {
                setStatus('error');
                onError?.('Transaction failed');
              }
            }
          }
        } catch (err) {
          console.error('Error polling payload status:', err);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [payload?.uuid, status]);

  const createPayload = async () => {
    if (!transaction) return;

    setLoading(true);
    setError(null);
    setStatus('creating');

    try {
      const payloadData = {
        txjson: transaction,
        options: {
          return_url: {
            app: `${window.location.origin}/callback`,
            web: `${window.location.origin}/callback?id={id}`
          },
          force_network: "TESTNET",
          submit: true,
          multisign: false
        },
        custom_meta: {
          identifier: `transaction-${Date.now()}`,
          instruction: "Please sign this transaction to proceed",
          blob: null
        }
      };

      const newPayload = await xumm.payload?.create(payloadData);
      
      if (newPayload?.uuid) {
        setPayload(newPayload);
        setStatus('waiting');
        setLoading(false);
        
        // Notify parent component about QR code
        if (newPayload.refs?.qr_png && onQrCodeReady) {
          onQrCodeReady(newPayload.refs.qr_png);
        }
      } else {
        throw new Error('Failed to create payload');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setStatus('error');
      setLoading(false);
      onError?.(errorMessage);
    }
  };

  const handleCancel = () => {
    setStatus('cancelled');
    onCancel?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Sign Transaction with Xaman
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            Scan the QR code with your Xaman mobile app to sign this transaction
          </p>

          {loading && (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Creating transaction...</p>
            </div>
          )}

          {status === 'waiting' && payload?.refs?.qr_png && (
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <img 
                  src={payload.refs.qr_png} 
                  alt="Xaman QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scan with Xaman app to sign
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Payload ID: {payload.uuid?.substring(0, 8)}...
              </p>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-green-600 font-medium mb-4">
                Transaction signed successfully!
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 font-medium mb-2">
                Transaction failed
              </p>
              {error && (
                <p className="text-sm text-gray-600 mb-4">
                  {error}
                </p>
              )}
            </div>
          )}

          {status === 'cancelled' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full mb-4">
                <XCircle className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-600 font-medium mb-4">
                Transaction cancelled
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default XamanTransactionSigner;

