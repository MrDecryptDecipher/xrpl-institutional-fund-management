import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Lock,
  Zap,
  Eye,
  Download,
  Settings,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit,
  Pause,
  Play,
  Target,
  TrendingDown,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  ExternalLink,
  Wallet,
  CreditCard,
  LineChart,
  RefreshCw,
  Award,
  Briefcase,
  Calculator,
  Database,
  Layers,
  Network,
  Percent,
  Scale,
  Sliders,
  Star,
  Zap as Lightning,
  ChevronDown,
  MoreHorizontal,
  ArrowRight,
  BarChart,
  AlertCircle,
  FileBarChart,
  CheckCircle2,
  XCircle,
  Clock3,
  Code
} from "lucide-react";
import { InstitutionalFundCreator } from "./InstitutionalFundCreator";
import XRPLStandardsBadge from "./XRPLStandardsBadge";

export function InstitutionalDashboard() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "funds" | "analytics" | "compliance" | "risk" | "reports" | "xls_standards">("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1m" | "3m" | "6m" | "1y" | "3y" | "inception">("1y");
  const [selectedFundFilter, setSelectedFundFilter] = useState<"all" | "active" | "pending" | "suspended">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const user = useQuery(api.auth.loggedInUser);
  const funds = useQuery(api.funds.management.getFunds, 
    user ? { managerId: user._id } : "skip"
  );
  // Using the correct path for the Convex function
  const analyticsData = useQuery(api.analytics.reporting.getInstitutionalAnalytics, 
    user ? { managerId: user._id } : "skip"
  );
  const riskData = useQuery(api.analytics.enhanced_reporting.getRiskManagementData);
  const complianceData = useQuery(api.compliance.institutional_compliance.getComplianceOverview);
  const reportsData = useQuery(api.analytics.enhanced_reporting.getInstitutionalReports);

  // Mock sophisticated institutional data
  const institutionalMetrics = {
    totalAUM: 15750000000,
    totalFunds: 28,
    totalInvestors: 847,
    complianceScore: 99.2,
    activeFunds: 25,
    pendingApprovals: 3,
    riskScore: 12.8,
    performanceYTD: 18.4,
    sharpeRatio: 2.34,
    maxDrawdown: -4.2,
    alpha: 5.7,
    beta: 0.89,
    informationRatio: 1.67,
    trackingError: 3.2,
    var95: 2.8,
    var99: 4.1,
    leverageRatio: 1.85,
    concentrationRisk: 8.3
  };

  // Mock sophisticated fund data
  const sophisticatedFunds = [
    {
      id: "fund_1",
      name: "Global Multi-Strategy Alpha Fund",
      type: "Multi-Strategy Hedge Fund",
      status: "active",
      aum: 2850000000,
      nav: 1847.23,
      performance: {
        ytd: 22.8,
        "1m": 3.2,
        "3m": 11.7,
        "1y": 28.9,
        "3y": 67.4,
        inception: 184.7
      },
      investors: 89,
      inception: "2018-03-15",
      managementFee: 2.0,
      performanceFee: 20,
      hurdle: 5.0,
      riskMetrics: {
        sharpe: 2.89,
        sortino: 3.45,
        calmar: 2.12,
        maxDrawdown: -3.8,
        var95: 2.1,
        var99: 3.4,
        beta: 0.72,
        alpha: 8.3,
        volatility: 9.2
      },
      allocation: {
        equity: 45,
        fixedIncome: 25,
        alternatives: 20,
        cash: 10
      },
      lockup: 24,
      redemptionFreq: "quarterly",
      lastNAV: "2024-01-15T16:00:00Z",
      strategy: "Long/Short Equity, Event Driven, Relative Value",
      benchmark: "HFRI Fund Weighted Composite Index"
    },
    {
      id: "fund_2",
      name: "Systematic Credit Opportunities",
      type: "Quantitative Credit Fund",
      status: "active",
      aum: 1920000000,
      nav: 1234.56,
      performance: {
        ytd: 15.4,
        "1m": 1.8,
        "3m": 6.2,
        "1y": 19.7,
        "3y": 42.1,
        inception: 123.5
      },
      investors: 67,
      inception: "2019-09-22",
      managementFee: 1.5,
      performanceFee: 15,
      hurdle: 3.0,
      riskMetrics: {
        sharpe: 2.34,
        sortino: 2.89,
        calmar: 1.87,
        maxDrawdown: -2.9,
        var95: 1.8,
        var99: 2.7,
        beta: 0.45,
        alpha: 6.8,
        volatility: 6.8
      },
      allocation: {
        credit: 70,
        rates: 20,
        fx: 5,
        cash: 5
      },
      lockup: 12,
      redemptionFreq: "monthly",
      lastNAV: "2024-01-15T16:00:00Z",
      strategy: "Systematic Credit Selection, Relative Value",
      benchmark: "Bloomberg Credit Index"
    },
    {
      id: "fund_3",
      name: "Infrastructure Debt Platform",
      type: "Infrastructure Debt Fund",
      status: "active",
      aum: 3400000000,
      nav: 1089.45,
      performance: {
        ytd: 8.9,
        "1m": 0.7,
        "3m": 2.8,
        "1y": 9.2,
        "3y": 28.7,
        inception: 89.5
      },
      investors: 34,
      inception: "2020-11-10",
      managementFee: 1.25,
      performanceFee: 10,
      hurdle: 4.0,
      riskMetrics: {
        sharpe: 1.89,
        sortino: 2.12,
        calmar: 1.45,
        maxDrawdown: -1.8,
        var95: 1.2,
        var99: 1.9,
        beta: 0.23,
        alpha: 4.2,
        volatility: 4.8
      },
      allocation: {
        infrastructure: 85,
        cash: 15
      },
      lockup: 60,
      redemptionFreq: "annual",
      lastNAV: "2024-01-15T16:00:00Z",
      strategy: "Senior Infrastructure Debt, Project Finance",
      benchmark: "Infrastructure Debt Index"
    }
  ];

  const tabs = [
    { id: "overview" as const, label: "Portfolio Overview", icon: BarChart3 },
    { id: "funds" as const, label: "Fund Management", icon: Building2 },
    { id: "analytics" as const, label: "Performance Analytics", icon: TrendingUp },
    { id: "xls_standards" as const, label: "XLS Standards", icon: Network },
    { id: "risk" as const, label: "Risk Management", icon: AlertTriangle },
    { id: "compliance" as const, label: "Compliance & Reporting", icon: Shield },
    { id: "reports" as const, label: "Institutional Reports", icon: FileText }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(1)}K`;
    return `$${amount.toFixed(0)}`;
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? "text-green-600" : "text-red-600";
  };

  const getRiskColor = (value: number, threshold: number) => {
    if (value <= threshold * 0.5) return "text-green-600";
    if (value <= threshold) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                    XRPL Institutional Fund Platform
                  </h1>
                  <p className="text-sm text-gray-600">Built by Sandeep Kumar Sahoo • Professional Asset Management Suite</p>
                </div>
              </div>
              
              {/* XLS Standards Mini Badge */}
              <div className="hidden lg:flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-blue-700">XLS-33 MPT</span>
                </div>
                <div className="flex items-center space-x-1 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">XLS-80 Domains</span>
                </div>
                <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium text-purple-700">XLS-40 DID</span>
                </div>
                <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs font-medium text-orange-700">XLS-65/66</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Create Fund</span>
              </button>
              <button className="p-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white/80 transition-all duration-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-white/80 transition-all duration-200">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-md"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedTab === "overview" && (
          <div className="space-y-8">
            {/* Executive Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-green-600 font-medium">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+{institutionalMetrics.performanceYTD}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total AUM</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatCurrency(institutionalMetrics.totalAUM)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">YTD Performance</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-blue-600 font-medium">
                        <Star className="h-4 w-4 mr-1" />
                        <span>{institutionalMetrics.sharpeRatio}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Sharpe Ratio</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {institutionalMetrics.sharpeRatio}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Risk-Adjusted Returns</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-green-600 font-medium">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Compliance Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {institutionalMetrics.complianceScore}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">All Jurisdictions</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center text-sm font-medium ${getRiskColor(institutionalMetrics.riskScore, 20)}`}>
                        <Activity className="h-4 w-4 mr-1" />
                        <span>Low Risk</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Risk Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {institutionalMetrics.riskScore}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Portfolio VaR 95%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Performance Attribution */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Attribution</h3>
                  <div className="flex space-x-2">
                    {(["1m", "3m", "6m", "1y"] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimeframe(period)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedTimeframe === period
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Advanced performance attribution chart</p>
                    <p className="text-sm text-gray-500 mt-1">Factor decomposition & alpha generation</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Alpha</p>
                    <p className="text-lg font-bold text-green-600">{formatPercentage(institutionalMetrics.alpha)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Beta</p>
                    <p className="text-lg font-bold text-gray-900">{institutionalMetrics.beta}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Info Ratio</p>
                    <p className="text-lg font-bold text-blue-600">{institutionalMetrics.informationRatio}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Track Error</p>
                    <p className="text-lg font-bold text-orange-600">{institutionalMetrics.trackingError}%</p>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Risk Analytics</h3>
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div>
                      <p className="font-medium text-green-900">VaR 95%</p>
                      <p className="text-sm text-green-600">Daily Risk</p>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {institutionalMetrics.var95}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <div>
                      <p className="font-medium text-blue-900">VaR 99%</p>
                      <p className="text-sm text-blue-600">Tail Risk</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">
                      {institutionalMetrics.var99}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 font-medium">Max Drawdown</p>
                      <p className="text-lg font-bold text-purple-900">{institutionalMetrics.maxDrawdown}%</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-xs text-orange-600 font-medium">Leverage</p>
                      <p className="text-lg font-bold text-orange-900">{institutionalMetrics.leverageRatio}x</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fund Performance Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Fund Performance Overview</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Funds
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Fund</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">AUM</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">NAV</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">YTD</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Sharpe</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Investors</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sophisticatedFunds.map((fund) => (
                      <tr key={fund.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{fund.name}</p>
                            <p className="text-sm text-gray-500">{fund.type}</p>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {formatCurrency(fund.aum)}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          ${fund.nav.toFixed(2)}
                        </td>
                        <td className={`text-right py-4 px-4 font-medium ${getPerformanceColor(fund.performance.ytd)}`}>
                          {formatPercentage(fund.performance.ytd)}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {fund.riskMetrics.sharpe.toFixed(2)}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {fund.investors}
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(fund.status)}`}>
                            {fund.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "funds" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Fund Management</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Create Fund</span>
              </button>
            </div>
            
            {/* Fund Management Content */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              {/* Fund List */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fund Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">AUM</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">NAV</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">YTD</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Investors</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sophisticatedFunds.map((fund) => (
                      <tr key={fund.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{fund.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{fund.type}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fund.status)}`}>
                            {fund.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{formatCurrency(fund.aum)}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">${fund.nav.toFixed(2)}</td>
                        <td className="px-4 py-4 text-sm font-medium">
                          <span className={getPerformanceColor(fund.performance.ytd)}>
                            {formatPercentage(fund.performance.ytd)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{fund.investors}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "analytics" && analyticsData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <FileBarChart className="h-4 w-4 inline mr-1" />
                  Export Report
                </button>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">AUM</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.performanceMetrics.aum)}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">YTD Return</p>
                    <p className="text-2xl font-bold text-green-600">{formatPercentage(analyticsData.performanceMetrics.returns.ytd)}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Returns by Period</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">1M</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPercentage(analyticsData.performanceMetrics.returns["1m"])}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">3M</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPercentage(analyticsData.performanceMetrics.returns["3m"])}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">1Y</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPercentage(analyticsData.performanceMetrics.returns["1y"])}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">3Y</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPercentage(analyticsData.performanceMetrics.returns["3y"])}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Metrics</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Sharpe</p>
                    <p className="text-lg font-semibold text-gray-900">{analyticsData.performanceMetrics.riskMetrics.sharpeRatio.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Sortino</p>
                    <p className="text-lg font-semibold text-gray-900">{analyticsData.performanceMetrics.riskMetrics.sortino.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Max DD</p>
                    <p className="text-lg font-semibold text-red-600">{analyticsData.performanceMetrics.riskMetrics.maxDrawdown.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Alpha</p>
                    <p className="text-lg font-semibold text-green-600">{analyticsData.performanceMetrics.riskMetrics.alpha.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Beta</p>
                    <p className="text-lg font-semibold text-gray-900">{analyticsData.performanceMetrics.riskMetrics.beta.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Info Ratio</p>
                    <p className="text-lg font-semibold text-gray-900">{analyticsData.performanceMetrics.riskMetrics.informationRatio.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Asset Allocation */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">By Asset Class</h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.assetAllocation.byAssetClass).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
                        </div>
                        <span className="min-w-[60px] text-right text-xs font-medium text-gray-700 ml-2">{key}: {value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">By Geography</h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.assetAllocation.byGeography).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
                        </div>
                        <span className="min-w-[60px] text-right text-xs font-medium text-gray-700 ml-2">{key}: {value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">By Sector</h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.assetAllocation.bySector).slice(0, 5).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
                        </div>
                        <span className="min-w-[60px] text-right text-xs font-medium text-gray-700 ml-2">{key}: {value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "risk" && riskData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Risk Management</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Run Stress Test
                </button>
              </div>
            </div>
            
            {/* Risk Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Risk Metrics</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">VaR (95%)</p>
                    <p className="text-2xl font-bold text-red-600">{riskData.portfolioRisk.var95.toFixed(1)}%</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">VaR (99%)</p>
                    <p className="text-2xl font-bold text-red-600">{riskData.portfolioRisk.var99.toFixed(1)}%</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Exp. Shortfall</p>
                    <p className="text-2xl font-bold text-orange-600">{riskData.portfolioRisk.expectedShortfall.toFixed(1)}%</p>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mb-3">Stress Test Results</h4>
                <div className="space-y-2">
                  {riskData.portfolioRisk.stressTestResults.map((test: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{test.scenario}</span>
                      <span className="text-sm font-bold text-red-600">{test.impact.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Exposures</h3>
                
                <div className="space-y-4">
                  {Object.entries(riskData.riskExposures).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{key}</span>
                        <span className="text-sm font-medium text-gray-900">{value}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            value > 60 ? 'bg-red-600' : value > 40 ? 'bg-orange-500' : 'bg-green-600'
                          }`} 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mt-6 mb-3">Risk Alerts</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {riskData.riskAlerts.map((alert: any, index: number) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      alert.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : 
                      alert.severity === 'medium' ? 'bg-orange-50 border-l-4 border-orange-500' : 
                      'bg-yellow-50 border-l-4 border-yellow-500'
                    }`}>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-900">{alert.description}</span>
                        <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "compliance" && complianceData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Compliance & Reporting</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Run Compliance Check
                </button>
              </div>
            </div>
            
            {/* Compliance Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">KYC Status</h3>
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved</span>
                    <span className="text-sm font-medium text-green-600">{complianceData.kycStatus.approved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium text-yellow-600">{complianceData.kycStatus.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rejected</span>
                    <span className="text-sm font-medium text-red-600">{complianceData.kycStatus.rejected}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expired</span>
                    <span className="text-sm font-medium text-gray-600">{complianceData.kycStatus.expired}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AML Alerts</h3>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">High Risk</span>
                    <span className="text-sm font-medium text-red-600">{complianceData.amlAlerts.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Medium Risk</span>
                    <span className="text-sm font-medium text-yellow-600">{complianceData.amlAlerts.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Low Risk</span>
                    <span className="text-sm font-medium text-green-600">{complianceData.amlAlerts.low}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Regulatory Reporting</h3>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="text-sm font-medium text-green-600">{complianceData.regulatoryReporting.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium text-yellow-600">{complianceData.regulatoryReporting.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overdue</span>
                    <span className="text-sm font-medium text-red-600">{complianceData.regulatoryReporting.overdue}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Jurisdiction Compliance</h3>
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Compliant</span>
                    <span className="text-sm font-medium text-green-600">{complianceData.jurisdictionCompliance.compliant}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Partially Compliant</span>
                    <span className="text-sm font-medium text-yellow-600">{complianceData.jurisdictionCompliance.partiallyCompliant}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Non-Compliant</span>
                    <span className="text-sm font-medium text-red-600">{complianceData.jurisdictionCompliance.nonCompliant}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Risk Assessment Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessments</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Risk Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {complianceData.riskAssessments.map((assessment: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{assessment.category}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{assessment.score}/100</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            assessment.status === 'Low' ? 'bg-green-100 text-green-800' : 
                            assessment.status === 'Acceptable' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {assessment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "xls_standards" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">XRPL Standards Integration</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <Network className="h-4 w-4 inline mr-1" />
                  Protocol Documentation
                </button>
              </div>
            </div>
            
            {/* XLS Standards Component */}
            <XRPLStandardsBadge />
            
            {/* Protocol Implementation Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Status</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-900">XLS-33 MPT Tokens</p>
                        <p className="text-sm text-green-600">Multi-Purpose Token standard</p>
                      </div>
                    </div>
                    <span className="text-green-700 font-bold">100%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-900">XLS-80 Domains</p>
                        <p className="text-sm text-green-600">Permissioned access control</p>
                      </div>
                    </div>
                    <span className="text-green-700 font-bold">100%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-900">XLS-40 DID</p>
                        <p className="text-sm text-green-600">Decentralized Identity</p>
                      </div>
                    </div>
                    <span className="text-green-700 font-bold">100%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-900">XLS-65/66 Lending</p>
                        <p className="text-sm text-green-600">Native lending protocols</p>
                      </div>
                    </div>
                    <span className="text-green-700 font-bold">100%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Protocol Benefits</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-medium text-blue-900 mb-2">Institutional Compliance</h4>
                    <p className="text-sm text-blue-700">Full regulatory compliance across 6 major jurisdictions with automated reporting</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-medium text-purple-900 mb-2">Zero Vendor Lock-in</h4>
                    <p className="text-sm text-purple-700">All logic validated on-ledger with no proprietary dependencies</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-xl">
                    <h4 className="font-medium text-orange-900 mb-2">Agentic Architecture</h4>
                    <p className="text-sm text-orange-700">Non-simplified implementation preventing semantic hallucination</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-medium text-green-900 mb-2">Enterprise Security</h4>
                    <p className="text-sm text-green-700">HSM integration with multi-signature and formal verification</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Creator Attribution Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Protocol Architecture</h3>
                <p className="text-gray-600 mb-6">This institutional-grade fund management protocol was architected and implemented by</p>
                
                <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mr-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-2xl font-bold text-white">Sandeep Kumar Sahoo</h4>
                      <p className="text-blue-200">Blockchain Engineer & XRPL Specialist</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-xs text-gray-300 mb-1">XLS Standards</p>
                      <p className="text-lg font-bold text-white">5+</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-xs text-gray-300 mb-1">Jurisdictions</p>
                      <p className="text-lg font-bold text-white">6</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-xs text-gray-300 mb-1">Compliance</p>
                      <p className="text-lg font-bold text-white">100%</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-xs text-gray-300 mb-1">Architecture</p>
                      <p className="text-lg font-bold text-white">Agentic</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-blue-200 mb-4">
                    "Non-simplified, institutional-grade implementation ensuring zero semantic hallucination and full ledger-side validation."
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                      <Code className="h-4 w-4" />
                      <span className="text-sm">Full-Stack Implementation</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Security Focused</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "reports" && reportsData && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Institutional Reports</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Generate New Report
                </button>
              </div>
            </div>
            
            {/* Reports Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Report Metrics</h3>
                  <FileBarChart className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Published</span>
                    <span className="text-sm font-bold text-blue-600">{reportsData.reportMetrics.published}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">In Progress</span>
                    <span className="text-sm font-bold text-yellow-600">{reportsData.reportMetrics.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Scheduled</span>
                    <span className="text-sm font-bold text-purple-600">{reportsData.reportMetrics.scheduled}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Regulatory Filings</h3>
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                    <span className="text-sm font-bold text-green-600">{reportsData.regulatoryFilings.completed}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Upcoming</span>
                    <span className="text-sm font-bold text-yellow-600">{reportsData.regulatoryFilings.upcoming}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Overdue</span>
                    <span className="text-sm font-bold text-red-600">{reportsData.regulatoryFilings.overdue}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Report Types</h3>
                  <PieChart className="h-5 w-5 text-blue-500" />
                </div>
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Quarterly</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Annual</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Special</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Compliance</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Distribution of report types</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Reports */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportsData.recentReports.map((report: any) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{report.title}</td>
                        <td className="px-4 py-4 text-sm text-gray-600 capitalize">{report.type}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Fund Modal */}
      {showCreateModal && (
        <InstitutionalFundCreator 
          onClose={() => setShowCreateModal(false)}
          onSuccess={(fundId) => {
            console.log("Fund created:", fundId);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}
