import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
// import { InstitutionalDashboard } from "./components/InstitutionalDashboard";
// import XRPLStandardsBadge from "./components/XRPLStandardsBadge.tsx";
// import CreatorAttribution from "./components/CreatorAttribution.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { Shield, Network, Key, Coins, BarChart3 } from "lucide-react";

export default function App() {
  const user = useQuery(api.auth.loggedInUser);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
              XRPL Institutional Fund Management Protocol
            </h1>
            <p className="text-gray-600 text-lg mb-6">Advanced Institutional-Grade Implementation</p>
            
            {/* Key Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg">
                <Coins className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">MPT Tokens</p>
                <p className="text-xs text-gray-500">XLS-33</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg">
                <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">Permissioned</p>
                <p className="text-xs text-gray-500">XLS-80</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg">
                <Key className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">DID Identity</p>
                <p className="text-xs text-gray-500">XLS-40</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg">
                <BarChart3 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">Lending</p>
                <p className="text-xs text-gray-500">XLS-65/66</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            <SignInForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <SignOutButton />
      </div>
      <ErrorBoundary>
        <div className="p-8">
          <h1>XRPL Institutional Fund Management Protocol</h1>
          <p>Advanced institutional-grade implementation with comprehensive regulatory compliance.</p>
        </div>
      </ErrorBoundary>
    </div>
  );
}
