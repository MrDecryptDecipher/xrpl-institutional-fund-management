import { useState } from 'react';
import { useNetwork, NetworkMode } from '../contexts/NetworkContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface NetworkToggleProps {
  xrplAccount?: string;
}

export function NetworkToggle({ xrplAccount }: NetworkToggleProps) {
  const { networkMode, requestNetworkChange, isChangingNetwork } = useNetwork();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [xamanPayload, setXamanPayload] = useState<{
    qrCode: string;
    deepLink: string;
  } | null>(null);

  const handleNetworkChange = async (newMode: NetworkMode) => {
    if (newMode === networkMode) return;

    setApprovalError(null);
    setXamanPayload(null);

    // If switching to demo, no approval needed
    if (newMode === 'demo') {
      try {
        await requestNetworkChange(newMode, xrplAccount);
      } catch (error) {
        console.error('Failed to switch to demo mode:', error);
      }
      return;
    }

    // For testnet/mainnet, show approval modal
    setShowApprovalModal(true);

    // Start checking for payload immediately
    const payloadCheckInterval = setInterval(() => {
      const payload = (window as any).__xamanNetworkPayload;
      if (payload && !xamanPayload) {
        console.log('✅ QR code payload detected, displaying in modal:', payload);
        setXamanPayload({
          qrCode: payload.qrCode,
          deepLink: payload.deepLink,
        });
      }
    }, 100); // Check every 100ms

    try {
      await requestNetworkChange(newMode, xrplAccount);

      // Stop checking for payload
      clearInterval(payloadCheckInterval);

      // Success - close modal after short delay
      setTimeout(() => {
        setShowApprovalModal(false);
        setXamanPayload(null);
        delete (window as any).__xamanNetworkPayload;
      }, 2000);
    } catch (error) {
      clearInterval(payloadCheckInterval);
      setApprovalError(error instanceof Error ? error.message : 'Failed to change network');
      setTimeout(() => {
        setShowApprovalModal(false);
        setXamanPayload(null);
        setApprovalError(null);
      }, 3000);
    }
  };

  const getNetworkBadgeVariant = (mode: NetworkMode) => {
    if (mode === networkMode) {
      return mode === 'demo' ? 'secondary' : mode === 'testnet' ? 'default' : 'destructive';
    }
    return 'outline';
  };

  const getNetworkIcon = (mode: NetworkMode) => {
    if (mode === networkMode) {
      return <CheckCircle2 className="w-3 h-3" />;
    }
    return null;
  };

  return (
    <>
      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-2xl p-2 border border-white/30 shadow-lg">
        <Button
          onClick={() => handleNetworkChange('demo')}
          variant={networkMode === 'demo' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-xl transition-all duration-200 ${
            networkMode === 'demo'
              ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-md'
              : 'hover:bg-gray-100'
          }`}
          disabled={isChangingNetwork}
        >
          {getNetworkIcon('demo')}
          <span className="ml-1">Demo</span>
        </Button>

        <Button
          onClick={() => handleNetworkChange('testnet')}
          variant={networkMode === 'testnet' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-xl transition-all duration-200 ${
            networkMode === 'testnet'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
              : 'hover:bg-blue-50'
          }`}
          disabled={isChangingNetwork}
        >
          {getNetworkIcon('testnet')}
          <span className="ml-1">Testnet</span>
        </Button>

        <Button
          onClick={() => handleNetworkChange('mainnet')}
          variant={networkMode === 'mainnet' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-xl transition-all duration-200 ${
            networkMode === 'mainnet'
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
              : 'hover:bg-green-50'
          }`}
          disabled={isChangingNetwork}
        >
          {getNetworkIcon('mainnet')}
          <span className="ml-1">Mainnet</span>
        </Button>

        {isChangingNetwork && (
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        )}
      </div>

      {/* Network Change Approval Modal */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="sm:max-w-md glass-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold gradient-text">
              Network Change Approval
            </DialogTitle>
            <DialogDescription>
              {approvalError
                ? 'Network change failed'
                : xamanPayload
                ? 'Scan QR code with Xaman to approve network change'
                : 'Waiting for approval...'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {approvalError ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <p className="text-sm text-red-600 text-center">{approvalError}</p>
              </div>
            ) : xamanPayload ? (
              <div className="space-y-4">
                {/* QR Code */}
                <div className="flex justify-center p-4 bg-white rounded-xl">
                  <img
                    src={xamanPayload.qrCode}
                    alt="Xaman Approval QR Code"
                    className="w-48 h-48 rounded-lg"
                  />
                </div>

                {/* Instructions */}
                <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-3">
                  <p className="text-sm font-medium text-blue-900 mb-2">Instructions:</p>
                  <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Open Xaman app on your mobile device</li>
                    <li>Scan the QR code above</li>
                    <li>Approve the network change request</li>
                  </ol>
                </div>

                {/* Mobile Deep Link */}
                <div className="text-center">
                  <a
                    href={xamanPayload.deepLink}
                    className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Open in Xaman App (Mobile)
                  </a>
                </div>

                {/* Loading */}
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Waiting for approval...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-6">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                <p className="text-sm text-gray-600">Generating approval request...</p>
              </div>
            )}

            {/* Warning for Mainnet */}
            {networkMode !== 'mainnet' && !approvalError && (
              <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-800">
                  <p className="font-medium mb-1">Important:</p>
                  <p>
                    Switching to {networkMode === 'demo' ? 'Testnet' : 'Mainnet'} will connect to the real XRPL blockchain.
                    All transactions will be {networkMode === 'demo' ? 'on testnet' : 'REAL and irreversible'}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

