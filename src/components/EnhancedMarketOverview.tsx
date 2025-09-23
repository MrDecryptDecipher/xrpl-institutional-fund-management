import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Globe,
  Zap,
  Eye,
  Filter
} from "lucide-react";

export function EnhancedMarketOverview() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("7d");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const marketData = useQuery(api.analytics.reporting.getMarketOverview);
  const marketIntelligence = useQuery(api.analytics.enhanced_reporting.getMarketIntelligence, {
    includeForecasts: true,
    includeSentiment: true
  });

  if (!marketData) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 h-32 border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-700/90 backdrop-blur-xl border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 border border-white/30">
            <Globe className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Global Market Intelligence
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Real-time insights into the tokenized fund ecosystem with advanced analytics and predictive intelligence
          </p>
          
          {/* Timeframe Selector */}
          <div className="flex justify-center mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20">
              {(["24h", "7d", "30d", "90d"] as const).map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedTimeframe === timeframe
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total AUM</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(marketData.totalAUM)}
              </p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+8.3%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Funds</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(marketData.totalFunds)}
              </p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+15.7%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Investors</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(marketData.totalInvestors)}
              </p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-red-600 font-medium">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>-2.1%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average NAV</p>
              <p className="text-3xl font-bold text-gray-900">
                ${marketData.averageNAV.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence Dashboard */}
      {marketIntelligence && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Sentiment */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Market Sentiment</h3>
                <Activity className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  marketIntelligence.sentiment?.overall === "bullish" 
                    ? "bg-green-100 text-green-800" 
                    : marketIntelligence.sentiment?.overall === "bearish"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {marketIntelligence.sentiment?.overall?.toUpperCase() || "NEUTRAL"}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {((marketIntelligence.sentiment?.confidence || 0.75) * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">Confidence Level</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Key Factors:</h4>
                {marketIntelligence.sentiment?.factors?.map((factor, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Rankings */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Funds</h3>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {marketIntelligence.rankings?.slice(0, 5).map((fund, index) => (
                  <div key={fund.symbol} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-transparent hover:from-blue-50/50 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                        index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                        index === 1 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                        index === 2 ? "bg-gradient-to-r from-orange-400 to-orange-500" :
                        "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{fund.name}</p>
                        <p className="text-sm text-gray-500">{fund.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(fund.aum)}
                      </p>
                      <p className={`text-sm font-medium ${
                        fund.performance > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {fund.performance > 0 ? "+" : ""}{fund.performance.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fund Distribution */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Asset Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {marketData.fundsByType.map((item, index) => {
              const colors = [
                "from-blue-500 to-blue-600",
                "from-green-500 to-green-600", 
                "from-purple-500 to-purple-600",
                "from-orange-500 to-orange-600",
                "from-red-500 to-red-600"
              ];
              
              const percentage = marketData.totalAUM > 0 ? (item.aum / marketData.totalAUM) * 100 : 0;
              
              return (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-lg bg-gradient-to-r ${colors[index % colors.length]}`}></div>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {item.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item.aum)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Forecasts */}
        {marketIntelligence?.forecasts && (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Market Forecasts</h3>
              <Zap className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Next Quarter</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3">
                    <p className="text-xs text-blue-600 font-medium">AUM Growth</p>
                    <p className="text-lg font-bold text-blue-900">{marketIntelligence.forecasts.nextQuarter.aumGrowth}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3">
                    <p className="text-xs text-green-600 font-medium">New Funds</p>
                    <p className="text-lg font-bold text-green-900">{marketIntelligence.forecasts.nextQuarter.newFunds}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Next Year</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3">
                    <p className="text-xs text-purple-600 font-medium">AUM Growth</p>
                    <p className="text-lg font-bold text-purple-900">{marketIntelligence.forecasts.nextYear.aumGrowth}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3">
                    <p className="text-xs text-orange-600 font-medium">Investor Growth</p>
                    <p className="text-lg font-bold text-orange-900">{marketIntelligence.forecasts.nextYear.investorGrowth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Analytics Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl text-sm font-medium text-gray-700 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showAdvanced ? "Hide" : "Show"} Advanced Analytics
        </button>
      </div>

      {/* Market Insights with Enhanced Design */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Market Intelligence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Exponential Growth</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              The tokenized fund market is experiencing unprecedented growth with institutional adoption accelerating globally.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Regulatory Excellence</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              All funds maintain full regulatory compliance across multiple jurisdictions with real-time monitoring.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Institutional Grade</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional fund management with institutional-grade infrastructure, security, and performance analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
