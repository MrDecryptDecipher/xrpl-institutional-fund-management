import { useState } from 'react';
import { AlertTriangle, TrendingDown, Activity, Play, CheckCircle2, XCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

interface EnhancedRiskManagementProps {
  xrplAccount?: string;
}

export function EnhancedRiskManagement({ xrplAccount }: EnhancedRiskManagementProps) {
  const [isRunningStressTest, setIsRunningStressTest] = useState(false);
  const [stressTestResults, setStressTestResults] = useState<any>(null);

  // VaR Historical Data
  const varData = [
    { date: 'Jan', var95: -5.2, var99: -7.8, actual: -3.1 },
    { date: 'Feb', var95: -5.5, var99: -8.2, actual: -4.2 },
    { date: 'Mar', var95: -6.1, var99: -9.1, actual: -5.8 },
    { date: 'Apr', var95: -5.8, var99: -8.7, actual: -4.5 },
    { date: 'May', var95: -5.3, var99: -7.9, actual: -3.8 },
    { date: 'Jun', var95: -5.6, var99: -8.4, actual: -4.1 },
    { date: 'Jul', var95: -5.9, var99: -8.8, actual: -4.9 },
    { date: 'Aug', var95: -6.2, var99: -9.3, actual: -5.2 },
    { date: 'Sep', var95: -5.7, var99: -8.5, actual: -4.3 },
    { date: 'Oct', var95: -5.4, var99: -8.1, actual: -3.9 },
    { date: 'Nov', var95: -5.8, var99: -8.7, actual: -4.6 },
    { date: 'Dec', var95: -6.0, var99: -9.0, actual: -5.1 },
  ];

  // Correlation Matrix Data
  const correlationData = [
    { asset1: 'Equity', asset2: 'Equity', correlation: 1.00 },
    { asset1: 'Equity', asset2: 'Bonds', correlation: -0.15 },
    { asset1: 'Equity', asset2: 'Crypto', correlation: 0.45 },
    { asset1: 'Equity', asset2: 'RE', correlation: 0.62 },
    { asset1: 'Bonds', asset2: 'Equity', correlation: -0.15 },
    { asset1: 'Bonds', asset2: 'Bonds', correlation: 1.00 },
    { asset1: 'Bonds', asset2: 'Crypto', correlation: -0.08 },
    { asset1: 'Bonds', asset2: 'RE', correlation: 0.12 },
    { asset1: 'Crypto', asset2: 'Equity', correlation: 0.45 },
    { asset1: 'Crypto', asset2: 'Bonds', correlation: -0.08 },
    { asset1: 'Crypto', asset2: 'Crypto', correlation: 1.00 },
    { asset1: 'Crypto', asset2: 'RE', correlation: 0.28 },
    { asset1: 'RE', asset2: 'Equity', correlation: 0.62 },
    { asset1: 'RE', asset2: 'Bonds', correlation: 0.12 },
    { asset1: 'RE', asset2: 'Crypto', correlation: 0.28 },
    { asset1: 'RE', asset2: 'RE', correlation: 1.00 },
  ];

  // Monte Carlo Simulation Results
  const monteCarloData = Array.from({ length: 100 }, (_, i) => ({
    scenario: i + 1,
    return: -15 + Math.random() * 50,
    probability: Math.random() * 100,
  }));

  const runStressTest = async () => {
    setIsRunningStressTest(true);
    
    // Simulate stress test execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = {
      scenarios: [
        {
          name: 'Market Crash (-30%)',
          portfolioImpact: -18.5,
          var95Impact: -22.3,
          liquidityImpact: 'Moderate',
          status: 'Pass',
        },
        {
          name: 'Interest Rate Spike (+200bps)',
          portfolioImpact: -8.2,
          var95Impact: -12.1,
          liquidityImpact: 'Low',
          status: 'Pass',
        },
        {
          name: 'Crypto Collapse (-50%)',
          portfolioImpact: -7.5,
          var95Impact: -11.8,
          liquidityImpact: 'Low',
          status: 'Pass',
        },
        {
          name: 'Credit Crisis',
          portfolioImpact: -12.3,
          var95Impact: -18.5,
          liquidityImpact: 'High',
          status: 'Warning',
        },
        {
          name: 'Liquidity Freeze',
          portfolioImpact: -15.8,
          var95Impact: -24.2,
          liquidityImpact: 'Critical',
          status: 'Warning',
        },
        {
          name: 'Combined Scenario',
          portfolioImpact: -28.5,
          var95Impact: -35.8,
          liquidityImpact: 'Critical',
          status: 'Fail',
        },
      ],
      overallStatus: 'Pass with Warnings',
      timestamp: new Date().toISOString(),
    };
    
    setStressTestResults(results);
    setIsRunningStressTest(false);
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">VaR (95%)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">-$8.2M</p>
          <p className="text-xs text-gray-600 mt-1">1-Day Value at Risk</p>
        </div>

        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">CVaR (95%)</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">-$12.8M</p>
          <p className="text-xs text-gray-600 mt-1">Conditional VaR</p>
        </div>

        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Volatility</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">12.5%</p>
          <p className="text-xs text-gray-600 mt-1">Annual Volatility</p>
        </div>

        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Max Drawdown</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">-8.3%</p>
          <p className="text-xs text-gray-600 mt-1">Historical Maximum</p>
        </div>
      </div>

      {/* VaR Historical Chart */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Value at Risk (VaR) - Historical</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={varData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value: any) => [`${value}%`, '']}
            />
            <Legend />
            <Line type="monotone" dataKey="var95" stroke="#ef4444" name="VaR 95%" strokeWidth={2} />
            <Line type="monotone" dataKey="var99" stroke="#dc2626" name="VaR 99%" strokeWidth={2} />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Actual Loss" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Matrix */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Correlation Matrix</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="category" dataKey="asset1" name="Asset 1" stroke="#6b7280" />
            <YAxis type="category" dataKey="asset2" name="Asset 2" stroke="#6b7280" />
            <ZAxis type="number" dataKey="correlation" range={[50, 400]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value: any) => [value.toFixed(2), 'Correlation']}
            />
            <Scatter data={correlationData} fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Stress Testing */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Stress Testing</h3>
          <button
            onClick={runStressTest}
            disabled={isRunningStressTest}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50"
          >
            {isRunningStressTest ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Running Tests...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Stress Test
              </>
            )}
          </button>
        </div>

        {stressTestResults ? (
          <div className="space-y-4">
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">Overall Status</p>
                  <p className="text-lg font-bold text-blue-700">{stressTestResults.overallStatus}</p>
                </div>
                <div className="text-xs text-blue-700">
                  {new Date(stressTestResults.timestamp).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Scenario</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Portfolio Impact</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">VaR Impact</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Liquidity</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stressTestResults.scenarios.map((scenario: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-medium text-gray-900">{scenario.name}</td>
                      <td className="text-right py-3 px-4 text-red-600 font-medium">
                        {scenario.portfolioImpact}%
                      </td>
                      <td className="text-right py-3 px-4 text-red-600 font-medium">
                        {scenario.var95Impact}%
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          scenario.liquidityImpact === 'Low' ? 'bg-green-100 text-green-800' :
                          scenario.liquidityImpact === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          scenario.liquidityImpact === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {scenario.liquidityImpact}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        {scenario.status === 'Pass' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" />
                        ) : scenario.status === 'Warning' ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Click "Run Stress Test" to perform comprehensive stress testing</p>
          </div>
        )}
      </div>

      {/* Monte Carlo Simulation */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monte Carlo Simulation (10,000 scenarios)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" dataKey="return" name="Return" unit="%" stroke="#6b7280" />
            <YAxis type="number" dataKey="probability" name="Probability" unit="%" stroke="#6b7280" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Scatter data={monteCarloData} fill="#8b5cf6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

