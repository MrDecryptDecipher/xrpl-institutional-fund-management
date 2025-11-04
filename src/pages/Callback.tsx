import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface CallbackResult {
  success: boolean;
  txid?: string;
  id?: string;
  error?: string;
}

export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<CallbackResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const txid = searchParams.get('txid');
        const id = searchParams.get('id');
        
        if (!id) {
          throw new Error('Missing payload ID');
        }

        // Verify the payload status
        const response = await fetch('/xaman/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid: id })
        });

        const verifyResult = await response.json();
        
        if (verifyResult.success) {
          const { meta } = verifyResult;
          
          if (meta.signed) {
            setResult({
              success: true,
              txid: txid || 'Unknown',
              id: id
            });
          } else if (meta.cancelled) {
            setResult({
              success: false,
              error: 'Transaction was cancelled'
            });
          } else if (meta.expired) {
            setResult({
              success: false,
              error: 'Transaction expired'
            });
          } else {
            setResult({
              success: false,
              error: 'Transaction is still pending'
            });
          }
        } else {
          throw new Error(verifyResult.error || 'Failed to verify transaction');
        }
      } catch (error) {
        setResult({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams]);

  const handleContinue = () => {
    // Navigate back to the main application
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying transaction...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl">❌</div>
          <p className="mt-4 text-gray-600">Unable to process callback</p>
          <button
            onClick={handleContinue}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          {result.success ? (
            <>
              <div className="text-green-600 text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Transaction Successful!
              </h1>
              <p className="text-gray-600 mb-4">
                Your transaction has been signed and submitted to the XRP Ledger.
              </p>
              
              {result.txid && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-500 mb-1">Transaction Hash:</p>
                  <p className="font-mono text-sm break-all text-gray-900">
                    {result.txid}
                  </p>
                  <a
                    href={`https://testnet.xrpl.org/transactions/${result.txid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    View on XRPL Explorer →
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-red-600 text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Transaction Failed
              </h1>
              <p className="text-gray-600 mb-4">
                {result.error || 'An error occurred while processing your transaction.'}
              </p>
            </>
          )}
          
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue to Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Callback;

