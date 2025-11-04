import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getXummInstance } from '../lib/xummInstance';

export default function LoginPageNew() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUserProfile = useMutation(api.users.createUserProfile);

  useEffect(() => {
    // Check if user is already authenticated
    const existingAccount = localStorage.getItem('xrpl_account');
    if (existingAccount) {
      console.log('User already authenticated, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignIn = async () => {
    // Validate form
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Get shared Xumm instance
      const xumm = getXummInstance();

      console.log('Calling xumm.authorize()...');

      // Trigger the authorize flow - this will show QR code automatically
      const result = await xumm.authorize();

      console.log('Authorize result:', result);

      // Extract account from the result
      let account = null;

      if (result && typeof result === 'object' && !(result instanceof Error)) {
        // Check if result has 'me' object with account
        const resultAny = result as any;
        if (resultAny.me && resultAny.me.account) {
          account = resultAny.me.account;
        } else if (resultAny.me && resultAny.me.sub) {
          // Sometimes the account is in 'sub' field
          account = resultAny.me.sub;
        }
      }

      // If not in result, try to get from xumm.user.account
      if (!account) {
        try {
          account = await xumm.user.account;
        } catch (err) {
          console.error('Error getting account from xumm.user:', err);
        }
      }

      if (account) {
        console.log('Got account:', account);
        setSuccess(true);

        // Create user profile
        await createUserProfile({
          fullName: fullName.trim(),
          email: email.trim(),
          xrplAccount: account,
        });

        // Store account
        localStorage.setItem('xrpl_account', account);

        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        console.error('Full authorize result:', JSON.stringify(result, null, 2));
        throw new Error('No account returned after authorization. Please check console for details.');
      }

    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      setIsLoading(false);
    }
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
          {/* Form Fields */}
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
                disabled={isLoading || success}
                className="h-12 bg-white border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
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
                disabled={isLoading || success}
                className="h-12 bg-white border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="bg-red-50 border-2 border-red-200 rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="bg-green-50 border-2 border-green-200 rounded-xl">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Authentication successful! Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          )}

          {/* Sign In Button */}
          <Button
            onClick={handleSignIn}
            disabled={isLoading || success}
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting to Xaman Wallet...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Authenticated Successfully!
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-5 w-5" />
                Continue with Xaman Wallet
              </>
            )}
          </Button>

          {/* Help Text */}
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

