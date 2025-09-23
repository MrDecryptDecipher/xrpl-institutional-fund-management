import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { 
  Wifi, 
  WifiOff, 
  Activity, 
  Server, 
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

export function EnhancedXRPLStatus() {
  const [network, setNetwork] = useState<"testnet" | "mainnet" | "devnet">("testnet");
  const [isConnecting, setIsConnecting] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const connectToXRPL = useAction(api.xrpl.enhanced_client.connectToXRPL);

  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    network?: string;
    connection?: any;
    error?: string;
  } | null>(null);

  const checkConnection = async () => {
    setIsConnecting(true);
    try {
      const result = await connectToXRPL({ network });
      setConnectionStatus(result);
      setLastUpdate(new Date());
    } catch (error) {
      setConnectionStatus({
        success: false,
        error: error instanceof Error ? error.message : "Connection failed"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [network]);

  const getStatusColor = () => {
    if (isConnecting) return "from-yellow-400 to-yellow-500";
    if (connectionStatus?.success) return "from-green-400 to-green-500";
    return "from-red-400 to-red-500";
  };

  const getStatusIcon = () => {
    if (isConnecting) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (connectionStatus?.success) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (isConnecting) return "Connecting...";
    if (connectionStatus?.success) return "Connected";
    return "Disconnected";
  };

  return (
    <div className="relative">
      {/* Main Status Indicator */}
      <div className="flex items-center space-x-3">
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusColor()} text-white text-sm font-medium shadow-lg`}>
          {getStatusIcon()}
          <span>XRPL {getStatusText()}</span>
        </div>

        {/* Network Selector */}
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value as "testnet" | "mainnet" | "devnet")}
          className="text-xs bg-white/70 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="testnet">Testnet</option>
          <option value="mainnet">Mainnet</option>
          <option value="devnet">Devnet</option>
        </select>

        {/* Refresh Button */}
        <button
          onClick={checkConnection}
          disabled={isConnecting}
          className="p-1.5 bg-white/70 backdrop-blur-md border border-white/20 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/80 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isConnecting ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Detailed Status Panel (appears on hover) */}
      <div className="absolute top-full right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl opacity-0 invisible hover:opacity-100 hover:visible transition-all duration-300 z-50 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">XRPL Network Status</h3>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor()}`}></div>
          </div>

          {connectionStatus?.success && connectionStatus.connection && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50/50 rounded-lg p-2">
                  <p className="text-blue-600 font-medium">Network</p>
                  <p className="text-gray-900 capitalize">{connectionStatus.network}</p>
                </div>
                <div className="bg-green-50/50 rounded-lg p-2">
                  <p className="text-green-600 font-medium">Ledger</p>
                  <p className="text-gray-900">#{connectionStatus.connection.ledgerIndex}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network ID:</span>
                  <span className="font-mono text-gray-900">{connectionStatus.connection.networkId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Server Version:</span>
                  <span className="font-mono text-gray-900">{connectionStatus.connection.serverVersion}</span>
                </div>
                {connectionStatus.connection.reserveBase && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reserve Base:</span>
                    <span className="font-mono text-gray-900">{connectionStatus.connection.reserveBase} XRP</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {connectionStatus?.error && (
            <div className="bg-red-50/50 border border-red-200/50 rounded-lg p-3">
              <p className="text-red-800 text-sm font-medium">Connection Error</p>
              <p className="text-red-600 text-xs mt-1">{connectionStatus.error}</p>
            </div>
          )}

          {lastUpdate && (
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/50">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Last updated</span>
              </div>
              <span>{lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
