import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wallet, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface XamanAuthState {
  qrCodeUrl: string | null;
  deepLink: string | null;
  payloadUuid: string | null;
  status: 'idle' | 'generating' | 'waiting' | 'success' | 'rejected' | 'expired' | 'error';
  errorMessage?: string;
  userAccount?: string;
}

export function LoginPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [xamanAuth, setXamanAuth] = useState<XamanAuthState>({
    qrCodeUrl: null,
    deepLink: null,
    payloadUuid: null,
    status: 'idle',
  });

  const createUserProfile = useMutation(api.users.createUserProfile);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.name = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate Xaman QR code for authentication
  const handleGenerateQR = async () => {
    if (!validateForm()) return;

    setXamanAuth({ ...xamanAuth, status: 'generating' });

    try {
      // Call backend to create Xaman payload
      const response = await fetch('http://localhost:3001/api/create-xaman-payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionType: 'SignIn',
          transactionData: {},
        }),
      });

      const data = await response.json();

      if (data.success && data.uuid) {
        setXamanAuth({
          qrCodeUrl: data.refs.qr_png,
          deepLink: data.next.always,
          payloadUuid: data.uuid,
          status: 'waiting',
        });

        // Start polling for payload status
        pollPayloadStatus(data.uuid);
      } else {
        throw new Error(data.error || 'Failed to create Xaman payload');
      }
    } catch (error) {
      console.error('Xaman QR generation error:', error);
      setXamanAuth({
        ...xamanAuth,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Failed to generate QR code',
      });
    }
  };

  // Poll Xaman payload status
  const pollPayloadStatus = async (uuid: string) => {
    const maxAttempts = 60; // 5 minutes (5 seconds interval)
    let attempts = 0;

    const poll = async () => {
      try {
        // Call backend to check payload status
        const response = await fetch(`http://localhost:3001/api/payload-status/${uuid}`);
        const status = await response.json();

        if (status.meta?.signed === true) {
          // Authentication successful
          const userAccount = status.response?.account;

          if (userAccount) {
            setXamanAuth(prev => ({
              ...prev,
              status: 'success',
              userAccount,
            }));

            // Create user profile in Convex
            await createUserProfile({
              fullName: fullName.trim(),
              email: email.trim(),
              xrplAccount: userAccount,
            });

            // Store XRPL account in localStorage
            localStorage.setItem('xrpl_account', userAccount);

            // Reload page to trigger App.tsx re-render
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } else if (status.meta?.signed === false) {
          // User rejected
          setXamanAuth(prev => ({
            ...prev,
            status: 'rejected',
            errorMessage: 'Authentication was rejected in Xaman app',
          }));
        } else if (status.meta?.expired === true) {
          // Payload expired
          setXamanAuth(prev => ({
            ...prev,
            status: 'expired',
            errorMessage: 'QR code expired. Please generate a new one.',
          }));
        } else if (attempts < maxAttempts) {
          // Continue polling
          attempts++;
          setTimeout(poll, 5000); // Poll every 5 seconds
        } else {
          // Timeout
          setXamanAuth(prev => ({
            ...prev,
            status: 'expired',
            errorMessage: 'Authentication timeout. Please try again.',
          }));
        }
      } catch (error) {
        console.error('Polling error:', error);
        setXamanAuth(prev => ({
          ...prev,
          status: 'error',
          errorMessage: 'Failed to check authentication status',
        }));
      }
    };

    poll();
  };

  // Reset authentication flow
  const handleReset = () => {
    setXamanAuth({
      qrCodeUrl: null,
      deepLink: null,
      payloadUuid: null,
      status: 'idle',
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        <CardHeader className="space-y-3 text-center pb-6 pt-8">
          {/* Logo/Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Wallet className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            XRPL Fund Management
          </CardTitle>

          {/* Subtitle */}
          <CardDescription className="text-base text-gray-600 px-4">
            Institutional-grade blockchain fund management powered by XRP Ledger
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {xamanAuth.status === 'idle' || xamanAuth.status === 'error' || xamanAuth.status === 'rejected' || xamanAuth.status === 'expired' ? (
            <>
              {/* User Information Form */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-800">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`h-12 bg-white border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200`}
                    disabled={xamanAuth.status === 'generating'}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-800">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-12 bg-white border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200`}
                    disabled={xamanAuth.status === 'generating'}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1.5 mt-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Error/Rejected/Expired Messages */}
              {(xamanAuth.status === 'error' || xamanAuth.status === 'rejected' || xamanAuth.status === 'expired') && (
                <Alert variant="destructive" className="bg-red-50 border-2 border-red-200 rounded-xl">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-800 font-medium">{xamanAuth.errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Generate QR Button */}
              <Button
                onClick={handleGenerateQR}
                disabled={xamanAuth.status === 'generating'}
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {xamanAuth.status === 'generating' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating QR Code...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Continue with Xaman Wallet
                  </>
                )}
              </Button>
            </>
          ) : null}

          {/* QR Code Display */}
          {xamanAuth.status === 'waiting' && xamanAuth.qrCodeUrl && (
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Scan QR Code
                </h3>
                <p className="text-sm text-gray-600">
                  Open your Xaman mobile app and scan this code
                </p>
              </div>

              {/* QR Code Image with enhanced styling */}
              <div className="flex justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 shadow-inner">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <img
                    src={xamanAuth.qrCodeUrl}
                    alt="Xaman Authentication QR Code"
                    className="w-56 h-56 rounded-lg"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 space-y-3">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">i</span>
                  How to authenticate:
                </p>
                <ol className="text-sm text-blue-800 space-y-2 ml-8 list-decimal">
                  <li className="font-medium">Open the Xaman app on your mobile device</li>
                  <li className="font-medium">Tap the scan icon to activate the QR scanner</li>
                  <li className="font-medium">Point your camera at the QR code above</li>
                  <li className="font-medium">Approve the sign-in request in the app</li>
                </ol>
              </div>

              {/* Mobile Deep Link */}
              <div className="text-center">
                <a
                  href={xamanAuth.deepLink || '#'}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  Open in Xaman App (Mobile)
                </a>
              </div>

              {/* Loading Indicator */}
              <div className="flex items-center justify-center gap-3 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Waiting for approval...</span>
              </div>

              {/* Cancel Button */}
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all"
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Success State */}
          {xamanAuth.status === 'success' && (
            <div className="space-y-5 animate-in fade-in text-center py-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  Authentication Successful!
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  Redirecting to dashboard...
                </p>
                {xamanAuth.userAccount && (
                  <div className="mt-4 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
                    <p className="text-xs text-gray-500 font-semibold mb-2">Your XRPL Account:</p>
                    <p className="text-xs text-gray-800 font-mono bg-white px-3 py-2 rounded-lg border border-gray-200 break-all">
                      {xamanAuth.userAccount}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600 font-medium">Loading your dashboard...</span>
              </div>
            </div>
          )}

          {/* Help Text */}
          {xamanAuth.status === 'idle' && (
            <div className="text-center pt-6 border-t-2 border-gray-100">
              <p className="text-sm text-gray-600">
                Don't have Xaman?{' '}
                <a
                  href="https://xaman.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all"
                >
                  Download here
                </a>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Secure blockchain wallet for XRP Ledger
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-white/80 font-medium">
          Powered by <span className="font-bold">XRP Ledger</span>
        </p>
        <p className="text-xs text-white/60 mt-1">
          Enterprise-grade blockchain infrastructure
        </p>
      </div>
    </div>
  );
}

