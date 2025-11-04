import { useState } from "react";
import { Wallet } from "lucide-react";
import { XamanWalletConnect } from "./XamanWalletConnect";
import { toast } from "sonner";

export function XamanWalletConnectButton() {
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = (payload: any) => {
    console.log("Xaman wallet connected:", payload);
    setIsConnected(true);
    setAccount(payload.response?.account || null);
    setShowWalletConnect(false);
    toast.success("Xaman wallet connected successfully!");
  };

  const handleDisconnect = () => {
    console.log("Xaman wallet disconnected");
    setIsConnected(false);
    setAccount(null);
    toast.info("Xaman wallet disconnected");
  };

  return (
    <>
      <button 
        onClick={() => setShowWalletConnect(true)}
        className="p-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white/80 transition-all duration-200 flex items-center"
      >
        <Wallet className="h-5 w-5" />
        {isConnected && account && (
          <span className="ml-2 text-xs font-medium">
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
          </span>
        )}
      </button>

      {showWalletConnect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Connect Xaman Wallet</h3>
              <button 
                onClick={() => setShowWalletConnect(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <XamanWalletConnect 
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowWalletConnect(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}