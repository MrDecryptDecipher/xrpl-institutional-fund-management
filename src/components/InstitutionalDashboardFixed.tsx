import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
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
  Code,
  UserCheck,
  Loader2,
  Vote
} from "lucide-react";
import { InstitutionalFundCreator } from "./InstitutionalFundCreator";
import XRPLStandardsBadge from "./XRPLStandardsBadge";
import { TransactionExecutor } from "./TransactionExecutor";
import { CompliancePermissioning } from "./CompliancePermissioning";
import { GovernanceDashboard } from "./GovernanceDashboard";
import { InstitutionalReporting } from "./InstitutionalReporting";

type InstitutionalDashboardProps = {
  xamanPayload?: any;
};

export function InstitutionalDashboardFixed({ xamanPayload }: InstitutionalDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<"overview" | "funds" | "analytics" | "compliance" | "risk" | "reports" | "xls_standards" | "governance">("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [didId, setDidId] = useState<string | null>(null);
  const [isDIDCreated, setIsDIDCreated] = useState(false);
  const [isCreatingDID, setIsCreatingDID] = useState(false);

  // Enable real backend data fetching
  const user = useQuery(api.auth.loggedInUser);
  const funds = useQuery(api.funds.management.getFunds, 
    user ? { managerId: user._id } : "skip"
  );
  // Using any type to bypass TypeScript errors with Convex API
  const analyticsData = useQuery((api as any).analytics.reporting.getInstitutionalAnalytics, 
    user ? {} : "skip"
  );
  const riskData = useQuery((api as any).analytics.enhanced_reporting.getRiskManagementData,
    user ? {} : "skip"
  );
  const complianceData = useQuery((api as any).compliance.institutional_compliance.getComplianceOverview,
    user ? {} : "skip"
  );
  const reportsData = useQuery((api as any).analytics.enhanced_reporting.getInstitutionalReports,
    user ? {} : "skip"
  );

  // Mock sophisticated institutional data for demo mode
  const mockFunds = [
    {
      id: 'fund_1',
      name: 'Global Equity Fund',
      aum: 5000000000,
      investors: 250,
      status: 'active',
      fundType: 'securities',
      nav: 10.25,
      performance: {
        ytd: 19.2,
        "1m": 3.1,
        "3m": 9.5,
        "6m": 13.2,
        "1y": 19.2,
        "3y": 44.1,
        "5y": 78.6
      },
      risk: {
        sharpeRatio: 2.45,
        sortino: 2.98,
        maxDrawdown: -4.3,
        alpha: 5.8,
        beta: 0.9,
        informationRatio: 1.7,
        trackingError: 3.3,
        var95: 2.9,
        var99: 4.2,
        leverageRatio: 1.9,
        concentrationRisk: 8.4
      },
      riskMetrics: {
        sharpeRatio: 2.45,
        maxDrawdown: -4.3,
        beta: 0.9,
        var95: 2.9,
        leverageRatio: 1.9,
        concentrationRisk: 8.4
      }
    },
    {
      id: 'fund_2',
      name: 'Fixed Income Fund',
      aum: 4000000000,
      investors: 200,
      status: 'active',
      fundType: 'securities',
      nav: 12.75,
      performance: {
        ytd: 17.8,
        "1m": 2.9,
        "3m": 8.4,
        "6m": 11.9,
        "1y": 17.8,
        "3y": 41.4,
        "5y": 75.9
      },
      risk: {
        sharpeRatio: 2.3,
        sortino: 2.8,
        maxDrawdown: -4.1,
        alpha: 5.6,
        beta: 0.88,
        informationRatio: 1.65,
        trackingError: 3.1,
        var95: 2.7,
        var99: 4,
        leverageRatio: 1.8,
        concentrationRisk: 8.2
      },
      riskMetrics: {
        sharpeRatio: 2.3,
        maxDrawdown: -4.1,
        beta: 0.88,
        var95: 2.7,
        leverageRatio: 1.8,
        concentrationRisk: 8.2
      }
    },
    {
      id: 'fund_3',
      name: 'Alternative Fund',
      aum: 3000000000,
      investors: 150,
      status: 'active',
      fundType: 'hybrid',
      nav: 15.30,
      performance: {
        ytd: 16.4,
        "1m": 2.7,
        "3m": 8,
        "6m": 11.4,
        "1y": 16.4,
        "3y": 40.2,
        "5y": 74.4
      },
      risk: {
        sharpeRatio: 2.2,
        sortino: 2.7,
        maxDrawdown: -4,
        alpha: 5.5,
        beta: 0.87,
        informationRatio: 1.6,
        trackingError: 3,
        var95: 2.6,
        var99: 3.9,
        leverageRatio: 1.7,
        concentrationRisk: 8.1
      },
      riskMetrics: {
        sharpeRatio: 2.2,
        maxDrawdown: -4,
        beta: 0.87,
        var95: 2.6,
        leverageRatio: 1.7,
        concentrationRisk: 8.1
      }
    },
    {
      id: 'fund_4',
      name: 'Cash Fund',
      aum: 2000000000,
      investors: 100,
      status: 'active',
      fundType: 'money_market',
      nav: 1.02,
      performance: {
        ytd: 15,
        "1m": 2.5,
        "3m": 7.6,
        "6m": 10.9,
        "1y": 15,
        "3y": 39,
        "5y": 73.2
      },
      risk: {
        sharpeRatio: 2.1,
        sortino: 2.6,
        maxDrawdown: -3.9,
        alpha: 5.4,
        beta: 0.86,
        informationRatio: 1.55,
        trackingError: 2.9,
        var95: 2.5,
        var99: 3.8,
        leverageRatio: 1.6,
        concentrationRisk: 8
      },
      riskMetrics: {
        sharpeRatio: 2.1,
        maxDrawdown: -3.9,
        beta: 0.86,
        var95: 2.5,
        leverageRatio: 1.6,
        concentrationRisk: 8
      }
    },
    {
      id: 'fund_5',
      name: 'Commodity Fund',
      aum: 1000000000,
      investors: 50,
      status: 'active',
      fundType: 'securities',
      nav: 8.45,
      performance: {
        ytd: 13.6,
        "1m": 2.3,
        "3m": 7.2,
        "6m": 10.4,
        "1y": 13.6,
        "3y": 37.8,
        "5y": 72.4
      },
      risk: {
        sharpeRatio: 2,
        sortino: 2.5,
        maxDrawdown: -3.8,
        alpha: 5.3,
        beta: 0.85,
        informationRatio: 1.5,
        trackingError: 2.8,
        var95: 2.4,
        var99: 3.7,
        leverageRatio: 1.5,
        concentrationRisk: 7.9
      },
      riskMetrics: {
        sharpeRatio: 2,
        maxDrawdown: -3.8,
        beta: 0.85,
        var95: 2.4,
        leverageRatio: 1.5,
        concentrationRisk: 7.9
      }
    }
  ];

  // Mock analytics data to replace backend calls
  const mockAnalyticsData = {
    performanceMetrics: {
      aum: 15750000000,
      returns: {
        ytd: 18.4,
        "1m": 2.7,
        "3m": 8.9,
        "6m": 12.3,
        "1y": 18.4,
        "3y": 42.8,
        "5y": 76.5
      },
      riskMetrics: {
        sharpeRatio: 2.34,
        sortino: 2.87,
        maxDrawdown: -4.2,
        alpha: 5.7,
        beta: 0.89,
        informationRatio: 1.67,
        trackingError: 3.2,
        var95: 2.8,
        var99: 4.1,
        leverageRatio: 1.85,
        concentrationRisk: 8.3
      }
    },
    assetAllocation: {
      byAssetClass: {
        equity: 42,
        fixedIncome: 28,
        alternatives: 18,
        cash: 7,
        commodities: 5
      },
      byGeography: {
        northAmerica: 45,
        europe: 25,
        asiaPacific: 20,
        emergingMarkets: 10
      },
      bySector: {
        technology: 22,
        financials: 18,
        healthcare: 15,
        consumerDiscretionary: 12,
        industrials: 10,
        communication: 8,
        utilities: 5,
        materials: 5,
        energy: 3,
        consumerStaples: 2
      }
    }
  };

  // Mock risk data
  const mockRiskData = {
    portfolioRisk: {
      var95: 2.8,
      var99: 4.1,
      expectedShortfall: 5.2,
      stressTestResults: [
        { scenario: "Market Crash 2008", impact: -35.2 },
        { scenario: "COVID-19 Crisis", impact: -28.7 },
        { scenario: "Interest Rate Shock", impact: -15.3 },
        { scenario: "Credit Crisis", impact: -22.1 }
      ]
    },
    riskExposures: {
      marketRisk: 65,
      creditRisk: 25,
      liquidityRisk: 15,
      operationalRisk: 8,
      counterpartyRisk: 12
    },
    riskAlerts: [
      { description: "Portfolio concentration in tech sector elevated", severity: "medium", timestamp: "2024-01-15T10:30:00Z" },
      { description: "VaR approaching 95% threshold", severity: "low", timestamp: "2024-01-15T09:15:00Z" }
    ]
  };

  // Mock compliance data
  const mockComplianceData = {
    totalInvestors: 862,
    approvedInvestors: 782,
    pendingInvestors: 43,
    rejectedInvestors: 22,
    expiringCredentials: 15,
    totalScreenings: 42,
    clearedScreenings: 42,
    flaggedScreenings: 0,
    averageRiskScore: 0,
    highRiskInvestors: 0,
    totalTransactions: 0,
    flaggedTransactions: 0,
    suspiciousActivityReports: 0,
    averageTransactionSize: 0,
    filingPeriod: "Q1-2024",
    jurisdiction: "GLOBAL",
    fundDetails: {},
    investorSummary: {},
    transactionSummary: {},
    totalEvents: 0,
    eventsByType: {},
    complianceEvents: 0,
    systemEvents: 0,
    kycStatus: { approved: 823, pending: 18, rejected: 4, expired: 2 },
    amlAlerts: { high: 2, medium: 8, low: 15 },
    regulatoryReporting: { completed: 95, pending: 3, overdue: 0 },
    jurisdictionCompliance: { compliant: 12, partiallyCompliant: 2, nonCompliant: 0 }
  };

  // Effect to handle Xaman payload
  useEffect(() => {
    if (xamanPayload?.response?.account) {
      setXrplAccount(xamanPayload.response.account);
      setIsDemoMode(false);
      // Check if DID already exists for this account
      checkExistingDID(xamanPayload.response.account);
    }
  }, [xamanPayload]);

  // Effect to update demo mode when account changes
  useEffect(() => {
    setIsDemoMode(!xrplAccount);
  }, [xrplAccount]);

  // Function to check if DID already exists for the account
  const checkExistingDID = async (account: string) => {
    try {
      // In a real implementation, this would check if a DID exists for the account
      // For now, we'll just set a mock DID
      setDidId(`did:xrpl:testnet:${account}`);
      setIsDIDCreated(true);
    } catch (error) {
      console.error("Error checking DID:", error);
    }
  };

  // Function to create DID for the connected account
  const createDID = async () => {
    if (!xrplAccount) return;
    
    setIsCreatingDID(true);
    try {
      // Call the backend to prepare a DID using the XRPL DIDSet transaction
      const response = await fetch('/api/create-did', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: xrplAccount
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Set the DID as created
        setDidId(result.didId);
        setIsDIDCreated(true);
        
        // If we have a QR code, display it for the user to scan
        if (result.qrCodeUrl) {
          alert(`Please scan the QR code with your Xaman wallet to complete DID creation.\nDID: ${result.didId}\nView on Testnet Explorer: ${result.explorerUrl || `https://testnet.xrpl.org/accounts/${xrplAccount}`}`);
        } else {
          alert(`DID created successfully! You are now logged in with your decentralized identity.\nDID: ${result.didId}\nView on Testnet Explorer: ${result.explorerUrl || `https://testnet.xrpl.org/accounts/${xrplAccount}`}`);
        }
      } else {
        throw new Error(result.error || 'Failed to create DID');
      }
    } catch (error) {
      console.error("Error creating DID:", error);
      alert(`Failed to create DID: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCreatingDID(false);
    }
  };

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

  // Use real data when available, fallback to mock data
  const displayAnalyticsData = analyticsData || mockAnalyticsData;
  const displayRiskData = riskData || mockRiskData;
  const displayComplianceData = complianceData || mockComplianceData;
  const displayFunds = (funds && funds.length > 0) ? funds : mockFunds;
  
  // Calculate institutional metrics from real data
  const institutionalMetrics = {
    totalAUM: displayAnalyticsData?.performanceMetrics?.aum || 0,
    totalFunds: displayFunds?.length || 0,
    totalInvestors: displayComplianceData?.totalInvestors || 0,
    complianceScore: displayComplianceData?.complianceScore || 0,
    activeFunds: displayFunds?.filter((fund: any) => fund.status === 'active')?.length || 0,
    pendingApprovals: displayComplianceData?.pendingInvestors || 0,
    riskScore: displayRiskData?.portfolioRisk?.var95 || 0,
    performanceYTD: displayAnalyticsData?.performanceMetrics?.returns?.ytd || 0,
    sharpeRatio: displayAnalyticsData?.performanceMetrics?.riskMetrics?.sharpeRatio || 0,
    maxDrawdown: displayAnalyticsData?.performanceMetrics?.riskMetrics?.maxDrawdown || 0,
    alpha: displayAnalyticsData?.performanceMetrics?.riskMetrics?.alpha || 0,
    beta: displayAnalyticsData?.performanceMetrics?.riskMetrics?.beta || 0,
    informationRatio: displayAnalyticsData?.performanceMetrics?.riskMetrics?.informationRatio || 0,
    trackingError: displayAnalyticsData?.performanceMetrics?.riskMetrics?.trackingError || 0,
    var95: displayRiskData?.portfolioRisk?.var95 || 0,
    var99: displayRiskData?.portfolioRisk?.var99 || 0,
    leverageRatio: displayAnalyticsData?.performanceMetrics?.riskMetrics?.leverageRatio || 0,
    concentrationRisk: displayAnalyticsData?.performanceMetrics?.riskMetrics?.concentrationRisk || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
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
              
              {/* Network Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-gray-600">Network:</span>
                <button
                  onClick={() => {
                    setNetwork("testnet");
                    if (xrplAccount) {
                      setIsDemoMode(false);
                    }
                  }}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    network === "testnet" 
                      ? "bg-blue-500 text-white" 
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Testnet
                </button>
                <button
                  onClick={() => {
                    setNetwork("mainnet");
                    if (xrplAccount) {
                      setIsDemoMode(false);
                    }
                  }}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    network === "mainnet" 
                      ? "bg-green-500 text-white" 
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Mainnet
                </button>
                {isDemoMode && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                    Demo Mode
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Show wallet connection status */}
              {xrplAccount && (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">
                    Connected: {xrplAccount.substring(0, 6)}...{xrplAccount.substring(xrplAccount.length - 4)}
                  </span>
                </div>
              )}
              
              {/* Show DID status */}
              {isDIDCreated ? (
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  <UserCheck className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">DID Active</span>
                </div>
              ) : xrplAccount ? (
                <button
                  onClick={createDID}
                  disabled={isCreatingDID}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md text-xs disabled:opacity-50"
                >
                  {isCreatingDID ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                  <span>{isCreatingDID ? "Creating DID..." : "Login with DID"}</span>
                </button>
              ) : null}
              
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
            {[
              { id: "overview", label: "Portfolio Overview", icon: BarChart3 },
              { id: "funds", label: "Fund Management", icon: Building2 },
              { id: "analytics", label: "Performance Analytics", icon: TrendingUp },
              { id: "xls_standards", label: "XLS Standards", icon: Network },
              { id: "risk", label: "Risk Management", icon: AlertTriangle },
              { id: "compliance", label: "Compliance & Reporting", icon: Shield },
              { id: "governance", label: "Governance", icon: Vote },
              { id: "reports", label: "Institutional Reports", icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
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
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
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
                      <div className="flex items-center text-sm font-medium text-green-600">
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
            
            {/* Transaction Executor */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Execute Transactions</h3>
              <TransactionExecutor 
                xrplAccount={xrplAccount}
                onTransactionComplete={(result: any) => console.log("Transaction completed:", result)}
              />
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
                    {displayFunds.map((fund: any) => (
                      <tr key={fund.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{fund.name}</p>
                            <p className="text-sm text-gray-500">{fund.fundType}</p>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {formatCurrency(fund.aum || fund.AUM)}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          ${fund.nav ? fund.nav.toFixed(2) : '0.00'}
                        </td>
                        <td className={`text-right py-4 px-4 font-medium ${fund.performance?.ytd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(fund.performance?.ytd || 0)}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {fund.riskMetrics?.sharpeRatio ? fund.riskMetrics.sharpeRatio.toFixed(2) : '0.00'}
                        </td>
                        <td className="text-right py-4 px-4 font-medium text-gray-900">
                          {fund.investors || 0}
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-200">
                            {fund.status || 'active'}
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
            
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              {displayFunds && displayFunds.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Fund</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">AUM</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayFunds.map((fund: any) => (
                        <tr key={fund._id || fund.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{fund.name}</p>
                              <p className="text-sm text-gray-500">{fund.fundType}</p>
                            </div>
                          </td>
                          <td className="text-right py-4 px-4 font-medium text-gray-900">
                            {formatCurrency(fund.aum || fund.AUM || 0)}
                          </td>
                          <td className="text-right py-4 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-200">
                              {fund.status || 'active'}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Funds Found</h3>
                  <p className="text-gray-500">Create your first institutional fund to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
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
            
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              {displayAnalyticsData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">AUM</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(displayAnalyticsData.performanceMetrics?.aum || 0)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">YTD Return</p>
                        <p className="text-xl font-bold text-green-600">{formatPercentage(displayAnalyticsData.performanceMetrics?.returns?.ytd || 0)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Sharpe Ratio</p>
                        <p className="text-xl font-bold text-gray-900">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.sharpeRatio || 0).toFixed(2)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Max Drawdown</p>
                        <p className="text-xl font-bold text-red-600">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.maxDrawdown || 0).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analytics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">VaR 95%</p>
                        <p className="text-xl font-bold text-red-600">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.var95 || 0).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Beta</p>
                        <p className="text-xl font-bold text-gray-900">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.beta || 0).toFixed(2)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Alpha</p>
                        <p className="text-xl font-bold text-green-600">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.alpha || 0).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Tracking Error</p>
                        <p className="text-xl font-bold text-gray-900">{(displayAnalyticsData.performanceMetrics?.riskMetrics?.trackingError || 0).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Analytics Data Loading</h3>
                  <p className="text-gray-500">Performance analytics data will be displayed here once available.</p>
                </div>
              )}
            </div>
            
            {/* Asset Allocation Visualization */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">By Asset Class</h4>
                  <div className="space-y-2">
                    {displayAnalyticsData?.assetAllocation?.byAssetClass && Object.entries(displayAnalyticsData.assetAllocation.byAssetClass).map(([key, value]) => (
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
                    {displayAnalyticsData?.assetAllocation?.byGeography && Object.entries(displayAnalyticsData.assetAllocation.byGeography).map(([key, value]) => (
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
                    {displayAnalyticsData?.assetAllocation?.bySector && Object.entries(displayAnalyticsData.assetAllocation.bySector).slice(0, 5).map(([key, value]) => (
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

        {selectedTab === "risk" && (
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
            
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              {displayRiskData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Risk</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">VaR 95%</p>
                        <p className="text-xl font-bold text-red-600">{(displayRiskData.portfolioRisk?.var95 || 0).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">VaR 99%</p>
                        <p className="text-xl font-bold text-red-600">{(displayRiskData.portfolioRisk?.var99 || 0).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Expected Shortfall</p>
                        <p className="text-xl font-bold text-orange-600">{(displayRiskData.portfolioRisk?.expectedShortfall || 0).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Leverage Ratio</p>
                        <p className="text-xl font-bold text-gray-900">{(displayRiskData.portfolioRisk?.leverageRatio || 0).toFixed(1)}x</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Alerts</h3>
                    {displayRiskData.riskAlerts && displayRiskData.riskAlerts.length > 0 ? (
                      <div className="space-y-3">
                        {displayRiskData.riskAlerts.slice(0, 3).map((alert: any, index: number) => (
                          <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-gray-900">{alert.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(alert.timestamp).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-600">No active risk alerts</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <AlertTriangle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Risk Data Loading</h3>
                  <p className="text-gray-500">Risk management data will be displayed here once available.</p>
                </div>
              )}
            </div>
            
            {/* Stress Test Visualization */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stress Test Results</h3>
              
              {displayRiskData?.portfolioRisk?.stressTestResults ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {displayRiskData.portfolioRisk.stressTestResults.map((test: any, index: number) => (
                    <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{test.scenario}</h4>
                      <p className="text-2xl font-bold text-red-600">{test.impact.toFixed(1)}%</p>
                      <p className="text-xs text-gray-600 mt-1">Portfolio Impact</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No stress test results available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === "compliance" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Compliance & Permissioning</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Run Compliance Check
                </button>
              </div>
            </div>
            
            <CompliancePermissioning xrplAccount={xrplAccount} />
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
            
            <XRPLStandardsBadge />
          </div>
        )}

        {selectedTab === "governance" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Governance</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white rounded-lg shadow text-gray-700 text-sm font-medium hover:bg-gray-50">
                  <Vote className="h-4 w-4 inline mr-1" />
                  New Proposal
                </button>
              </div>
            </div>
            
            <GovernanceDashboard xrplAccount={xrplAccount} />
          </div>
        )}

        {selectedTab === "reports" && (
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
            
            <InstitutionalReporting xrplAccount={xrplAccount} />
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
          xrplAccount={xrplAccount}
        />
      )}
    </div>
  );
}

export default InstitutionalDashboardFixed;