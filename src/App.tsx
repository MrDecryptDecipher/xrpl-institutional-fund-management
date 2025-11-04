import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import LoginPageNew from "./components/LoginPageNew";
import { InstitutionalDashboard } from "./components/InstitutionalDashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import { NetworkProvider } from "./contexts/NetworkContext";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const xrplAccount = localStorage.getItem('xrpl_account');

  if (!xrplAccount) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Dashboard Wrapper with User Data
function DashboardWrapper() {
  const xrplAccount = localStorage.getItem('xrpl_account');

  const user = useQuery(
    api.users.getUserProfile,
    xrplAccount ? { xrplAccount } : "skip"
  );

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('xrpl_account');
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <NetworkProvider xrplAccount={xrplAccount!}>
      <div className="min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign Out
          </button>
        </div>
        <ErrorBoundary fallback={<div className="p-8 text-red-600">Something went wrong with the dashboard. Please try refreshing the page.</div>}>
          <InstitutionalDashboard user={user} xrplAccount={xrplAccount!} />
        </ErrorBoundary>
      </div>
    </NetworkProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPageNew />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
