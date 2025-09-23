import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export function XRPLStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const initializeClient = useAction(api.xrpl.client.initializeXRPLClient);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await initializeClient({});
        if (result.success) {
          setStatus("connected");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    checkConnection();
  }, [initializeClient]);

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader className="h-4 w-4 animate-spin text-yellow-500" />;
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Connecting to XRPL...";
      case "connected":
        return "XRPL Connected";
      case "error":
        return "XRPL Connection Error";
    }
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      {getStatusIcon()}
      <span className={`font-medium ${
        status === "connected" ? "text-green-700" : 
        status === "error" ? "text-red-700" : "text-yellow-700"
      }`}>
        {getStatusText()}
      </span>
    </div>
  );
}
