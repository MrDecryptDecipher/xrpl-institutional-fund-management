import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

interface XamanPayload {
  uuid: string;
  refs: {
    qr_png: string;
    qr_matrix: string;
    qr_uri_quality_opts: string[];
    websocket_status: string;
  };
  next: {
    always: string;
    no_push_msg_received: string;
  };
  pushed: boolean;
  custom_meta: {
    identifier: string;
    instruction: string;
  };
}

interface XamanIntegrationProps {
  transaction: any;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

export const XamanIntegration: React.FC<XamanIntegrationProps> = ({
  transaction,
  onSuccess,
  onError,
  onCancel
}) => {
  const [payload, setPayload] = useState<XamanPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'signed' | 'cancelled' | 'expired'>('idle');

  // Create payload when component mounts or transaction changes
  useEffect(() => {
    if (transaction) {
      createPayload();
    }
  }, [transaction]);

  const createPayload = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/xaman/payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction,
          returnUrl: {
            app: `${window.location.origin}/callback`,
            web: `${window.location.origin}/callback?id={id}&txid={txid}`
          },
          network: 'TESTNET',
          identifier: `fund-${Date.now()}`,
          instruction: 'Please sign this transaction to proceed with the fund management operation'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setPayload(result.payload);
        setStatus('pending');
        // Start polling for status updates
        pollPayloadStatus(result.payload.uuid);
      } else {
        throw new Error(result.error || 'Failed to create payload');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const pollPayloadStatus = async (uuid: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/xaman/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid })
        });

        const result = await response.json();
        
        if (result.success) {
          const { meta } = result;
          
          if (meta.signed) {
            setStatus('signed');
            clearInterval(pollInterval);
            onSuccess?.(result);
          } else if (meta.cancelled) {
            setStatus('cancelled');
            clearInterval(pollInterval);
            onCancel?.();
          } else if (meta.expired) {
            setStatus('expired');
            clearInterval(pollInterval);
            onError?.('Transaction expired');
          }
        }
      } catch (err) {
        console.error('Error polling payload status:', err);
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      if (status === 'pending') {
        setStatus('expired');
        onError?.('Transaction timed out');
      }
    }, 300000);
  };

  const openXamanApp = () => {
    if (payload?.next?.always) {
      window.open(payload.next.always, '_blank');
    }
  };

  const openQRCode = () => {
    if (payload?.refs?.qr_png) {
      window.open(payload.refs.qr_png, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Creating transaction...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={createPayload}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!payload) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sign Transaction with Xaman
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {payload.custom_meta.instruction}
        </p>
        
        {/* QR Code */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
            <QRCode
              value={payload.next.always}
              size={200}
              level="M"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mb-4">
          {status === 'pending' && (
            <div className="flex items-center justify-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm">Waiting for signature...</span>
            </div>
          )}
          {status === 'signed' && (
            <div className="flex items-center justify-center text-green-600">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Transaction signed successfully!</span>
            </div>
          )}
          {status === 'cancelled' && (
            <div className="flex items-center justify-center text-red-600">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Transaction cancelled</span>
            </div>
          )}
          {status === 'expired' && (
            <div className="flex items-center justify-center text-orange-600">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Transaction expired</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={openXamanApp}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Open in Xaman App
          </button>
          
          <button
            onClick={openQRCode}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            View QR Code
          </button>
          
          {status === 'pending' && (
            <button
              onClick={onCancel}
              className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
            >
              Cancel Transaction
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-xs text-gray-500">
          <p>1. Scan the QR code with your Xaman mobile app</p>
          <p>2. Review the transaction details</p>
          <p>3. Sign the transaction to complete the operation</p>
        </div>
      </div>
    </div>
  );
};

export default XamanIntegration;

