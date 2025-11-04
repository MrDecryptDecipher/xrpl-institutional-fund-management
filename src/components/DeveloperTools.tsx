import { useState } from "react";
import { Network, BarChart3, Wrench, Code } from "lucide-react";
import { PayloadTest } from "./PayloadTest";
import { DashboardTest } from "./DashboardTest";

interface DeveloperToolsProps {
  onForceShowDashboard: () => void;
}

export function DeveloperTools({ onForceShowDashboard }: DeveloperToolsProps) {
  const [showPayloadTest, setShowPayloadTest] = useState(false);
  const [showDashboardTest, setShowDashboardTest] = useState(false);

  // Handle navigation back to main developer tools
  const handleShowMain = () => {
    setShowPayloadTest(false);
    setShowDashboardTest(false);
  };

  // If showing payload test page, render it
  if (showPayloadTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="mb-6">
            <button 
              onClick={handleShowMain}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
            >
              ← Back to Developer Tools
            </button>
          </div>
          <PayloadTest />
        </div>
      </div>
    );
  }

  // If showing dashboard test page, render it
  if (showDashboardTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="mb-6">
            <button 
              onClick={handleShowMain}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
            >
              ← Back to Developer Tools
            </button>
          </div>
          <DashboardTest />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wrench className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Tools</h2>
        <p className="text-gray-600">Advanced testing and debugging utilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payload Test Card */}
        <div 
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setShowPayloadTest(true)}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Network className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 ml-3">Payload Test</h3>
          </div>
          <p className="text-sm text-gray-600">
            Test Xaman payload creation and QR code generation
          </p>
        </div>

        {/* Dashboard Test Card */}
        <div 
          className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border border-green-100 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setShowDashboardTest(true)}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 ml-3">Dashboard Test</h3>
          </div>
          <p className="text-sm text-gray-600">
            Test dashboard components and data visualization
          </p>
        </div>

        {/* Force Show Dashboard Card */}
        <div 
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 hover:shadow-lg transition-shadow cursor-pointer md:col-span-2"
          onClick={onForceShowDashboard}
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Code className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 ml-3">Force Show Dashboard</h3>
          </div>
          <p className="text-sm text-gray-600">
            Demo mode - bypass authentication to view dashboard (development only)
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These tools are for development and testing purposes only. 
          Some features may require proper Xaman wallet configuration.
        </p>
      </div>
    </div>
  );
}