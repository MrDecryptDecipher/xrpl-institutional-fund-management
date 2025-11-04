import "../xumm-env-setup";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QrCode, Wallet, CheckCircle, XCircle, Loader2 } from "lucide-react";

// Xumm SDK instance - following official React demo pattern
import { Xumm } from "xumm";
const apiKey = import.meta.env.VITE_XUMM_API_KEY;
const xumm = new Xumm(apiKey);

// Set up event listeners at module level (following official React demo pattern)
xumm.on("error", (error: any) => {
  console.error("Xumm SDK error:", error);
  toast.error("Xaman SDK error: " + (error.message || "Unknown error"));
});

xumm.on("success", () => {
  console.log("Xumm authorization successful");
});

xumm.on("logout", () => {
  console.log("User logged out from Xaman");
});

xumm.on("ready", () => {
  console.log("Xumm SDK ready");
});

interface XamanWalletConnectProps {
  onConnect: (payload: any) => void;
  onDisconnect: () => void;
}

export function XamanWalletConnect({ onConnect, onDisconnect }: XamanWalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [initError, setInitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [payloadUuid, setPayloadUuid] = useState<string | null>(null);

  // Initialize component
  useEffect(() => {
    console.log("XamanWalletConnect useEffect running");
    let isMounted = true;

    const initializeComponent = async () => {
      try {
        console.log("Initializing component...");
        
        // Wait for SDK to be ready (with timeout)
        await new Promise((resolve, reject) => {
          let ready = false;
          
          const readyHandler = () => {
            console.log("Xumm SDK ready event received");
            ready = true;
            resolve(true);
          };
          
          xumm.on("ready", readyHandler);
          
          // Check if already ready
          setTimeout(() => {
            if (!ready) {
              console.log("Xumm SDK ready check timeout");
              xumm.off("ready", readyHandler);
              resolve(true); // Continue anyway
            }
          }, 3000);
        });
        
        if (!isMounted) return;
        
        // Set up component-specific event listeners
        const successHandler = async () => {
          console.log("Xumm authorization successful (component handler)");
          try {
            console.log("Getting user account...");
            const account = await xumm.user.account;
            console.log("User account result:", account);
            if (account && isMounted) {
              console.log("Account retrieved:", account);
              setAccount(account);
              setIsConnected(true);
              setIsConnecting(false);
              setIsLoading(false);
              
              // Save session
              saveSession(account);
              
              // Create a payload object to pass to onConnect
              const payload = {
                response: {
                  account: account
                }
              };
              
              onConnect(payload);
              toast.success("Successfully connected to Xaman wallet!");
            } else if (isMounted) {
              // If no account but authorized, still mark as connected
              console.log("Authorization successful but no account found");
              setIsConnected(true);
              setIsConnecting(false);
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error getting user account:", error);
            if (isMounted) {
              setInitError("Failed to get user account: " + (error instanceof Error ? error.message : "Unknown error"));
              setIsConnecting(false);
              setIsLoading(false);
            }
          }
        };
        
        const logoutHandler = () => {
          console.log("User logged out from Xaman (component handler)");
          if (isMounted) {
            setIsConnected(false);
            setAccount("");
            setQrCodeData(null);
            setPayloadUuid(null);
            clearSession();
            onDisconnect();
          }
        };
        
        console.log("Adding event listeners...");
        xumm.on("success", successHandler);
        xumm.on("logout", logoutHandler);
        console.log("Event listeners added");
        
        // Check for existing connection
        console.log("Checking for existing connection...");
        const savedAccount = loadSession();
        if (savedAccount) {
          console.log("Found saved session:", savedAccount);
          setAccount(savedAccount);
          setIsConnected(true);
          setIsLoading(false);
          
          // Create a payload object to pass to onConnect
          const payload = {
            response: {
              account: savedAccount
            }
          };
          
          onConnect(payload);
          return;
        }
        
        // Check if already connected
        console.log("Checking xumm.user.account...");
        // Add timeout to prevent hanging
        const accountPromise = xumm.user.account;
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Account check timeout')), 5000)
        );
        
        try {
          const existingAccount = await Promise.race([accountPromise, timeoutPromise]) as string;
          console.log("xumm.user.account result:", existingAccount);
          if (existingAccount && isMounted) {
            console.log("Already connected with account:", existingAccount);
            setAccount(existingAccount);
            setIsConnected(true);
            setIsLoading(false);
            
            // Save session
            saveSession(existingAccount);
            
            // Create a payload object to pass to onConnect
            const payload = {
              response: {
                account: existingAccount
              }
            };
            
            onConnect(payload);
          } else if (isMounted) {
            // Not connected, but initialization complete
            console.log("No existing connection found, initialization complete");
            setIsLoading(false);
          }
        } catch (error) {
          console.log("Account check timeout or error, proceeding with normal initialization", error);
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } catch (error: any) {
        console.error("Component initialization error:", error);
        if (isMounted) {
          setInitError("Failed to initialize Xaman SDK: " + (error.message || "Unknown error"));
          setIsLoading(false);
        }
      }
    };

    // Add a timeout to prevent indefinite loading
    const initTimeout = setTimeout(() => {
      if (isLoading && isMounted) {
        console.log("Initialization timeout, clearing loading state");
        setIsLoading(false);
        setInitError("Xaman SDK initialization timeout. Please refresh the page and try again.");
      }
    }, 15000);

    initializeComponent().finally(() => {
      clearTimeout(initTimeout);
    });

    // Clean up event listeners
    return () => {
      console.log("useEffect cleanup");
      isMounted = false;
      clearTimeout(initTimeout);
      // Note: We're not removing the module-level event listeners as they're needed for the SDK to function
      // Only remove component-specific handlers if needed
    };
  }, []);

  const connectWallet = async () => {
    if (initError) {
      toast.error(`Xaman wallet error: ${initError}`);
      return;
    }

    try {
      setIsConnecting(true);
      console.log("Triggering Xumm authorization flow...");
      
      // Set a timeout to clear the connecting state if something goes wrong
      const timeout = setTimeout(() => {
        console.log("Connection timeout, clearing connecting state");
        setIsConnecting(false);
        toast.error("Connection timeout. Please try again.");
      }, 30000); // 30 second timeout
      
      // Differentiate between mobile and desktop
      if (isMobile()) {
        // Use the authorize method for mobile browser flow
        console.log("Using mobile authorization flow");
        const result = await xumm.authorize();
        console.log("Authorization result:", result);
        clearTimeout(timeout); // Clear timeout if successful
        // For mobile, the success event handler will handle the connection flow
      } else {
        // Create a sign-in payload for QR code display on desktop
        console.log("Using desktop QR code flow");
        const payload = await createSignInPayload();
        console.log("Created payload:", payload);
        clearTimeout(timeout); // Clear timeout if successful
        // @ts-ignore
        setPayloadUuid(payload.uuid);
        // @ts-ignore
        setQrCodeData(payload.refs.qr_png);
      }
    } catch (error: any) {
      console.error("Xaman wallet connection error:", error);
      
      // Check if this is a redirect URI error
      if (error.message && (error.message.includes("access_denied") || error.message.includes("redirect"))) {
        const errorMessage = "Redirect URI not configured. Please ensure http://3.111.22.56:5002/ is added to your Xaman app settings in the Developer Console.";
        toast.error(errorMessage);
        setInitError("Redirect URI not configured in Xaman Developer Console");
        console.error("Xaman OAuth Redirect URI Error: Please configure redirect URIs in Xaman Developer Console");
      } else if (error.message && error.message.includes("Payload creation timeout")) {
        const errorMessage = "Payload creation timeout. This may be due to network issues or API key configuration. Please check your Xaman Developer Console settings and ensure http://3.111.22.56:5002/ is added to the 'Origin/Redirect URIs'.";
        toast.error(errorMessage);
        setInitError("Payload creation timeout - check Xaman Developer Console configuration");
        console.error("Xaman Payload Creation Timeout: Please verify redirect URIs in Xaman Developer Console");
      } else {
        toast.error(`Failed to connect to Xaman wallet: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
      
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount("");
    setQrCodeData(null);
    setPayloadUuid(null);
    onDisconnect();
    
    // Logout from Xumm
    xumm.logout().catch(console.error);
    
    toast.success("Disconnected from Xaman wallet");
  };

  // Create a sign-in payload for QR code display with enhanced debugging
  const createSignInPayload = async () => {
    try {
      console.log("Creating sign-in payload...");
      
      // Log SDK state
      console.log("Xumm instance:", xumm);
      console.log("Xumm payload object:", xumm.payload);
      
      // Add timeout to payload creation
      console.log("Creating payload promise...");
      // @ts-ignore
      const payloadPromise = xumm.payload.create({
        TransactionType: 'SignIn',
      });
      
      console.log("Payload promise created, setting up timeout...");
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => {
          console.error("Payload creation timed out after 10 seconds");
          reject(new Error('Payload creation timeout after 10 seconds'));
        }, 10000)
      );
      
      console.log("Waiting for payload creation or timeout...");
      const payload: any = await Promise.race([payloadPromise, timeoutPromise]);
      console.log("Sign-in payload created successfully:", payload);
      
      // Validate payload structure
      // @ts-ignore
      if (!payload || !payload.uuid || !payload.refs || !payload.refs.qr_png) {
        console.error("Payload validation failed:", payload);
        throw new Error("Payload missing required properties");
      }
      
      return payload;
    } catch (error) {
      console.error("Error creating sign-in payload:", error);
      console.error("Error details:", {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name
      });
      throw error;
    }
  };

  // Check if device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Save session to localStorage
  const saveSession = (account: string) => {
    localStorage.setItem('xamanAccount', account);
  };

  // Load session from localStorage
  const loadSession = () => {
    return localStorage.getItem('xamanAccount');
  };

  // Clear session from localStorage
  const clearSession = () => {
    localStorage.removeItem('xamanAccount');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4">
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Xaman Wallet</h3>
        <p className="text-sm text-gray-600 mb-6">
          Scan the QR code with your Xaman mobile app to connect your XRPL wallet
        </p>

        {initError && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">
              Error: {initError}
            </p>
            <p className="text-sm text-red-700 mt-2">
              {initError.includes("Redirect URI") && (
                <span>
                  Please add <strong>http://3.111.22.56:5002/</strong> to the "Origin/Redirect URIs" in your Xaman Developer Console.
                </span>
              )}
              {initError.includes("Payload creation timeout") && (
                <span>
                  Please verify your Xaman Developer Console settings and ensure <strong>http://3.111.22.56:5002/</strong> is added to the "Origin/Redirect URIs".
                </span>
              )}
            </p>
            <div className="mt-3">
              <p className="text-xs text-red-600 mb-2">After configuring redirect URIs in Xaman Developer Console:</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Refresh Page to Apply Changes
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Initializing Xaman wallet...</p>
            <p className="text-xs text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        )}

        {isConnecting && !isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Preparing connection...</p>
            {qrCodeData && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Scan QR code with Xaman app</p>
                <img src={qrCodeData} alt="Xaman QR Code" className="w-48 h-48 mx-auto" />
                <p className="text-xs text-gray-500 mt-2">Payload ID: {payloadUuid?.substring(0, 8)}...</p>
              </div>
            )}
          </div>
        )}

        {isConnected && account && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Connected to Xaman Wallet</p>
            <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg mb-4">
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </p>
            <button
              onClick={disconnectWallet}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Disconnect Wallet
            </button>
          </div>
        )}

        {!isLoading && !isConnecting && !isConnected && (
          <button
            onClick={connectWallet}
            disabled={isConnecting || !!initError}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <QrCode className="w-5 h-5 mr-2" />
            {initError ? "Connection Error" : "Connect with Xaman"}
          </button>
        )}
      </div>
    </div>
  );
}

export default XamanWalletConnect;