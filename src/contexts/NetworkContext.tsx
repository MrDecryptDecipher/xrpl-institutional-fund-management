import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export type NetworkMode = 'demo' | 'testnet' | 'mainnet';

interface NetworkContextType {
  networkMode: NetworkMode;
  setNetworkMode: (mode: NetworkMode) => void;
  isChangingNetwork: boolean;
  requestNetworkChange: (newMode: NetworkMode, xrplAccount?: string) => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: ReactNode;
  xrplAccount?: string;
}

export function NetworkProvider({ children, xrplAccount }: NetworkProviderProps) {
  const [networkMode, setNetworkModeState] = useState<NetworkMode>('demo');
  const [isChangingNetwork, setIsChangingNetwork] = useState(false);
  
  const updateNetworkPreference = useMutation(api.users.updateNetworkPreference);

  // Load network preference from localStorage on mount
  useEffect(() => {
    const storedNetwork = localStorage.getItem('network_mode') as NetworkMode;
    if (storedNetwork && ['demo', 'testnet', 'mainnet'].includes(storedNetwork)) {
      setNetworkModeState(storedNetwork);
    }
  }, []);

  // Sync network mode to localStorage
  const setNetworkMode = (mode: NetworkMode) => {
    setNetworkModeState(mode);
    localStorage.setItem('network_mode', mode);
  };

  // Request network change with Xaman approval for testnet/mainnet
  const requestNetworkChange = async (newMode: NetworkMode, account?: string) => {
    setIsChangingNetwork(true);

    try {
      // If switching to demo, no approval needed
      if (newMode === 'demo') {
        setNetworkMode(newMode);

        // Update in Convex if account is available
        if (account) {
          await updateNetworkPreference({
            xrplAccount: account,
            networkPreference: newMode,
          });
        }

        setIsChangingNetwork(false);
        return;
      }

      // For testnet/mainnet, require Xaman approval via backend API
      if (!account) {
        throw new Error('Please connect your Xaman wallet first');
      }

      console.log('Creating network change payload via backend API...');

      // Create a SignIn payload for network change approval via backend
      const payloadData = {
        xrplAccount: account, // For user token lookup
        transactionType: 'SignIn',
        transactionData: {
          Memos: [{
            Memo: {
              MemoType: Buffer.from('network_change', 'utf8').toString('hex').toUpperCase(),
              MemoData: Buffer.from(newMode, 'utf8').toString('hex').toUpperCase()
            }
          }]
        }
      };

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
      console.log('Network change payload created:', payload);

      if (!payload || !payload.uuid || !payload.refs || !payload.refs.qr_png) {
        throw new Error('Invalid payload response from backend');
      }

      // Store payload info for modal display
      (window as any).__xamanNetworkPayload = {
        qrCode: payload.refs.qr_png,
        deepLink: payload.next.always,
        uuid: payload.uuid,
      };

      // Log push notification status
      if (payload.pushed) {
        console.log('✅ PUSH NOTIFICATION SENT for network change!');
      } else {
        console.log('ℹ️ No push notification - user must scan QR code');
      }

      // Poll for user approval
      console.log('Polling for network change approval...');
      const maxAttempts = 60; // 5 minutes
      let attempts = 0;
      let result: any = null;

      while (attempts < maxAttempts) {
        try {
          console.log(`Network change polling attempt ${attempts + 1}/${maxAttempts}...`);
          const statusResponse = await fetch(`http://3.111.22.56:3001/api/payload-result/${payload.uuid}`);

          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log('Network change payload status:', {
              has_response: !!statusData.response,
              resolved_at: statusData.response?.resolved_at,
              account: statusData.response?.account
            });

            // Check if payload is resolved
            if (statusData.response && statusData.response.resolved_at) {
              console.log('✅ Network change payload resolved!');
              result = statusData;
              break;
            }
          }

          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
        } catch (pollError) {
          console.error(`Polling attempt ${attempts + 1} error:`, pollError);
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
        }
      }

      if (!result) {
        throw new Error('Network change approval timed out after 5 minutes');
      }

      console.log('Network change result:', result);

      // Check if approved (account will be present if signed)
      if (result.response && result.response.account) {
        console.log('✅ Network change approved!');
        // Approval granted
        setNetworkMode(newMode);

        // Update in Convex
        if (account) {
          await updateNetworkPreference({
            xrplAccount: account,
            networkPreference: newMode,
          });
        }

        setIsChangingNetwork(false);
      } else {
        // Rejected or expired
        console.log('❌ Network change rejected or expired');
        setIsChangingNetwork(false);
        throw new Error('Network change was rejected or expired');
      }
    } catch (error) {
      setIsChangingNetwork(false);
      console.error('Network change error:', error);
      throw error;
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        networkMode,
        setNetworkMode,
        isChangingNetwork,
        requestNetworkChange,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}

