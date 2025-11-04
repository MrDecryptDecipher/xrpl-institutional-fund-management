import "../xumm-env-setup";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QrCode, Wallet, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { getXummInstance } from "../lib/xummInstance";

// Use shared Xumm instance
const xumm = getXummInstance();

xumm.on("retrieving", () => {
  console.log("Retrieving user data");
});

xumm.on("retrieved", () => {
  console.log("User data retrieved");
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
        
        // For Xumm SDK, we don't necessarily need to wait for the ready event
        // The SDK should be ready to use immediately after initialization
        console.log("Xumm SDK should be ready immediately after initialization");
        
        // Set up component-specific event listeners
        const successHandler = async () => {
          console.log("Xamm authorization successful (component handler)");
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
          // Verify the account is still valid
          try {
            const currentAccount = await xumm.user.account;
            if (currentAccount === savedAccount) {
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
            } else {
              // Session is invalid, clear it
              clearSession();
            }
          } catch (error) {
            console.log("Saved session is invalid, clearing it");
            clearSession();
          }
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
      setQrCodeData(null);
      setPayloadUuid(null);
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
        setPayloadUuid(payload.uuid);
        setQrCodeData(payload.refs.qr_png);

        // Wait for user to sign and get user_token
        console.log("Waiting for user to scan QR and sign...");
        try {
          const result = await waitForPayloadResult(payload.uuid);

          // Check if payload was signed (txid will be present if signed)
          if (result.response && result.response.txid && result.response.account) {
            const xrplAccount = result.response.account;
            const userToken = result.application?.issued_user_token;

            console.log('Sign-in successful!', {
              account: xrplAccount,
              has_user_token: !!userToken
            });

            // Store user token in localStorage for future use
            if (userToken && xrplAccount) {
              localStorage.setItem(`xaman_user_token_${xrplAccount}`, userToken);
              console.log('✅ User token stored in localStorage for account:', xrplAccount);
            }

            // Update component state
            setAccount(xrplAccount);
            setIsConnected(true);
            setIsConnecting(false);
            setQrCodeData(null);
            setPayloadUuid(null);
            saveSession(xrplAccount);

            // Notify parent component
            const connectPayload = {
              response: {
                account: xrplAccount
              }
            };

            onConnect(connectPayload);
            toast.success("Successfully connected to Xaman wallet!");
          } else {
            throw new Error('Sign-in was rejected or expired');
          }
        } catch (pollError) {
          console.error('Error waiting for sign-in:', pollError);
          setIsConnecting(false);
          setQrCodeData(null);
          setPayloadUuid(null);
          toast.error(`Sign-in failed: ${pollError instanceof Error ? pollError.message : 'Unknown error'}`);
        }
      }
    } catch (error: any) {
      console.error("Xaman wallet connection error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Check if this is a redirect URI error
      if (error.message && (error.message.includes("access_denied") || error.message.includes("redirect"))) {
        const errorMessage = "CRITICAL CONFIGURATION ERROR: The redirect URI 'http://localhost:5176/' is not configured in your Xaman Developer Console. This cannot be fixed in code - you MUST add this URI to your app settings at https://apps.xumm.dev";
        toast.error(errorMessage);
        setInitError("Xaman Redirect URI Not Configured - Requires Manual Fix");
        console.error("Xaman OAuth Redirect URI Error: http://localhost:5176/ must be added to Origin/Redirect URIs in Xaman Developer Console");
      } else if (error.message && error.message.includes("Payload creation timeout")) {
        const errorMessage = "Payload creation timeout. This may be due to network issues, API key/secret configuration, or redirect URI issues.";
        toast.error(errorMessage);
        setInitError("Payload creation timeout");
        console.error("Xaman Payload Creation Timeout");
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
    
    // Clear session from localStorage
    clearSession();
    
    toast.success("Disconnected from Xaman wallet");
  };

  // Poll for payload result and extract user_token
  const waitForPayloadResult = async (payloadUuid: string): Promise<any> => {
    const maxAttempts = 60; // 5 minutes (5 seconds * 60)
    let attempts = 0;

    console.log('Starting to poll for payload result:', payloadUuid);

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`http://localhost:3001/api/payload-result/${payloadUuid}`);

        if (!response.ok) {
          console.log(`Attempt ${attempts + 1}: Payload not ready yet`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
          continue;
        }

        const result = await response.json();
        console.log(`Attempt ${attempts + 1}: Payload result:`, result);

        // Check if payload is resolved (resolved_at will be set when signed/rejected)
        if (result.response && result.response.resolved_at) {
          console.log('✅ Payload resolved successfully!');
          return result;
        }

        // Wait 5 seconds before next attempt
        console.log(`Attempt ${attempts + 1}: Payload not resolved yet, waiting...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
      } catch (error) {
        console.error(`Attempt ${attempts + 1}: Error polling payload result:`, error);
        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
      }
    }

    throw new Error('Timeout waiting for payload result (5 minutes)');
  };

  // Create a sign-in payload for QR code display using Xaman SDK directly
  const createSignInPayload = async () => {
    try {
      console.log("Creating sign-in payload using Xaman SDK...");

      // Create a simple SignIn transaction payload
      const payloadData = {
        txjson: {
          TransactionType: "SignIn"
        },
        options: {
          return_url: {
            app: `${window.location.origin}/callback`,
            web: `${window.location.origin}/callback?id={id}`
          },
          force_network: "TESTNET",
          submit: false,
          multisign: false
        },
        custom_meta: {
          identifier: `signin-${Date.now()}`,
          instruction: "Please sign this transaction to connect your Xaman wallet",
          blob: null
        }
      };

      const payload = await xumm.payload?.create(payloadData);
      console.log("Sign-in payload created successfully:", payload);

      // Validate payload structure
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

  // Authenticate with Xaman using the payload UUID
  const authenticateWithXaman = async (payloadUuid: string) => {
    try {
      console.log("Authenticating with Xaman using payload UUID:", payloadUuid);
      
      // In a real implementation, this would call the Convex authenticateWithXaman action
      // For now, we'll just simulate the authentication
      console.log("Xaman authentication successful");
      return {
        success: true,
        userId: payloadUuid, // Using payload UUID as user ID for demo
        xrplAccount: "rDemoAccount123456789" // Demo account
      };
    } catch (error) {
      console.error("Error authenticating with Xaman:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
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
              {initError.includes("Xaman Redirect URI Not Configured") && (
                <span>
                  <strong>REQUIRED ACTION:</strong> Add <code className="bg-red-100 px-1 rounded">http://localhost:5176/</code> to the "Origin/Redirect URIs" in your Xaman Developer Console at <a href="https://apps.xumm.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://apps.xumm.dev</a>. This is a security requirement that cannot be bypassed in code.
                </span>
              )}
            </p>
            <div className="mt-3">
              <p className="text-xs text-red-600 mb-2">Steps to fix:</p>
              <ol className="text-xs text-red-600 list-decimal list-inside space-y-1">
                <li>Go to <a href="https://apps.xumm.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://apps.xumm.dev</a> and log in</li>
                <li>Select your app with API Key: b53edeaf-0046-49a6-a100-4bb284be3682</li>
                <li>Add <code className="bg-red-100 px-1 rounded">http://localhost:5176/</code> to "Origin/Redirect URIs"</li>
                <li>Save the changes</li>
                <li>Refresh this page</li>
              </ol>
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