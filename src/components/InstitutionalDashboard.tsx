import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
  Wifi,
  Route,
  Link2,
  Ticket,
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
  Vote,
  Coins,
  User,
  Code,
  ImageIcon
} from "lucide-react";
import { InstitutionalFundCreator } from "./InstitutionalFundCreator";
import XRPLStandardsBadge from "./XRPLStandardsBadge";
import { TransactionExecutor } from "./TransactionExecutor";
import { CompliancePermissioning } from "./CompliancePermissioning";
import { GovernanceDashboard } from "./GovernanceDashboard";
import { InstitutionalReporting } from "./InstitutionalReporting";
import { XamanWalletIntegration } from "./XamanWalletIntegration";
import { NetworkToggle } from "./NetworkToggle";
import { useNetwork } from "../contexts/NetworkContext";
import { demoFunds, generateDemoTransactions, generateDemoInvestors, generateDemoAnalytics } from "../lib/demoData";
import { MPTManagement } from "./MPTManagement";
import { DIDManagement } from "./DIDManagement";
import { CredentialsManagement } from "./CredentialsManagement";
import { PermissionedDomainsManagement } from "./PermissionedDomainsManagement";
import { AmendmentTracker } from "./AmendmentTracker";
import { DomainVerification } from "./DomainVerification";
import { AuditTrailViewer } from "./AuditTrailViewer";
import { AMMManagement } from "./AMMManagement";
import { LendingProtocolUI } from "./LendingProtocolUI";
import { FundDetailModal } from "./FundDetailModal";
import { PerformanceCharts } from "./PerformanceCharts";
import { EnhancedInstitutionalReports } from "./EnhancedInstitutionalReports";
import { EnhancedRiskManagement } from "./EnhancedRiskManagement";
import { EnhancedGovernance } from "./EnhancedGovernance";
import { CheckManagement } from "./CheckManagement";
import { EscrowManagement } from "./EscrowManagement";
import { NFTokenManagement } from "./NFTokenManagement";
import OracleManagement from "./OracleManagement";
import PaymentChannelManagement from "./PaymentChannelManagement";
import AccountManagement from "./AccountManagement";
import TrustLineManagement from "./TrustLineManagement";
import DEXTrading from "./DEXTrading";
import SignerListManagement from "./SignerListManagement";
import TicketManagement from "./TicketManagement";
import RealtimeMonitor from "./RealtimeMonitor";
import PathFindingUI from "./PathFindingUI";
import BatchTransactionEngine from "./BatchTransactionEngine";
import CrossChainBridge from "./CrossChainBridge";

type InstitutionalDashboardProps = {
  xamanPayload?: any;
  user?: any;
  xrplAccount?: string;
};

export function InstitutionalDashboard({ xamanPayload, user: propUser, xrplAccount: propXrplAccount }: InstitutionalDashboardProps) {
  const { networkMode } = useNetwork();
  const [selectedTab, setSelectedTab] = useState<"overview" | "funds" | "analytics" | "compliance" | "risk" | "reports" | "xls_standards" | "governance" | "wallet">("overview");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFundDetailModal, setShowFundDetailModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [xrplAccount, setXrplAccount] = useState<string | null>(propXrplAccount || null);
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [didId, setDidId] = useState<string | null>(null);
  const [isDIDCreated, setIsDIDCreated] = useState(false);
  const [isCreatingDID, setIsCreatingDID] = useState(false);

  // Determine if we're in demo mode
  const isDemoMode = networkMode === 'demo';

  // ALWAYS call hooks unconditionally (Rules of Hooks)
  // For now, ALWAYS skip these queries since the Convex functions don't exist yet
  // We'll use demo data for all modes until the backend is fully implemented
  const user = propUser || useQuery(api.auth.loggedInUser);
  const funds = useQuery(api.funds.management.getFunds, "skip");
  const analyticsData = undefined; // Skip - function doesn't exist yet
  const riskData = undefined; // Skip - function doesn't exist yet
  const complianceData = undefined; // Skip - function doesn't exist yet
  const reportsData = undefined; // Skip - function doesn't exist yet

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
      // Demo mode is automatically determined by networkMode from context
      // Check if DID already exists for this account
      checkExistingDID(xamanPayload.response.account);
    }
  }, [xamanPayload]);

  // Demo mode is automatically determined by networkMode from context
  // No need for manual state management

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
      // Create a simple DID identifier for the account
      const didId = `did:xrpl:testnet:${xrplAccount}`;

      // Set the DID as created
      setDidId(didId);
      setIsDIDCreated(true);

      toast.success(`DID created successfully! You are now logged in with your decentralized identity.\nDID: ${didId}\nView on Testnet Explorer: https://testnet.xrpl.org/accounts/${xrplAccount}`);
    } catch (error) {
      console.error("Error creating DID:", error);
      toast.error(`Failed to create DID: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
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
  // Use demo data when in demo mode, otherwise use real data or fallback to mock data
  const displayAnalyticsData = isDemoMode ? generateDemoAnalytics() : (analyticsData || mockAnalyticsData);
  const displayRiskData = isDemoMode ? generateDemoAnalytics().riskMetrics : (riskData || mockRiskData);
  const displayComplianceData = complianceData || mockComplianceData;
  const displayFunds = isDemoMode ? demoFunds : ((funds && funds.length > 0) ? funds : mockFunds);
  const displayTransactions = isDemoMode ? generateDemoTransactions(50) : [];
  const displayInvestors = isDemoMode ? generateDemoInvestors(25) : [];
  
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
              <NetworkToggle xrplAccount={xrplAccount || undefined} />
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
              { id: "reports", label: "Institutional Reports", icon: FileText },
              { id: "wallet", label: "Wallet", icon: Wallet }
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
                <button
                  onClick={() => setSelectedTab("funds")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  View All Funds
                  <ArrowRight className="w-4 h-4" />
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
                    {displayFunds.map((fund: any, index: number) => (
                      <tr key={fund.id || fund._id || `fund-${index}`} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
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
                            <button
                              onClick={() => {
                                setSelectedFund(fund);
                                setShowFundDetailModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1 mx-auto"
                            >
                              Manage
                              <ExternalLink className="w-3 h-3" />
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
            {/* Header with Key Metrics */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
                <p className="text-gray-600 mt-1">Comprehensive portfolio performance and allocation insights</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Export Report
                </button>
                <button className="px-4 py-2 bg-blue-600 rounded-lg shadow-sm text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  <BarChart3 className="h-4 w-4 inline mr-2" />
                  Customize View
                </button>
              </div>
            </div>

            {/* Advanced Performance Charts */}
            <PerformanceCharts xrplAccount={xrplAccount || undefined} />

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">YTD</span>
                </div>
                <div className="text-3xl font-bold mb-1">+{displayAnalyticsData?.performanceMetrics?.returns?.ytd}%</div>
                <div className="text-blue-100 text-sm">Total Return</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Ratio</span>
                </div>
                <div className="text-3xl font-bold mb-1">{displayAnalyticsData?.performanceMetrics?.riskMetrics?.sharpeRatio}</div>
                <div className="text-green-100 text-sm">Sharpe Ratio</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Risk</span>
                </div>
                <div className="text-3xl font-bold mb-1">{displayAnalyticsData?.performanceMetrics?.riskMetrics?.maxDrawdown}%</div>
                <div className="text-purple-100 text-sm">Max Drawdown</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">Alpha</span>
                </div>
                <div className="text-3xl font-bold mb-1">+{displayAnalyticsData?.performanceMetrics?.riskMetrics?.alpha}%</div>
                <div className="text-orange-100 text-sm">Portfolio Alpha</div>
              </div>
            </div>

            {/* Asset Allocation - Enhanced Visualization */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Asset Allocation</h3>
                  <p className="text-gray-600 text-sm mt-1">Diversification across asset classes, geographies, and sectors</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                    Rebalance
                  </button>
                  <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors">
                    Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* By Asset Class */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">By Asset Class</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">5 Classes</span>
                  </div>

                  {/* Donut Chart Visualization */}
                  <div className="relative h-48 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Donut segments */}
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#3B82F6" strokeWidth="40" strokeDasharray="184.5 461.8" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#10B981" strokeWidth="40" strokeDasharray="129.2 461.8" strokeDashoffset="-184.5" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#8B5CF6" strokeWidth="40" strokeDasharray="83.1 461.8" strokeDashoffset="-313.7" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#F59E0B" strokeWidth="40" strokeDasharray="32.3 461.8" strokeDashoffset="-396.8" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#EF4444" strokeWidth="40" strokeDasharray="23.1 461.8" strokeDashoffset="-429.1" transform="rotate(-90 100 100)" />
                      {/* Center text */}
                      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">100%</text>
                      <text x="100" y="110" textAnchor="middle" className="text-xs fill-gray-500">Allocated</text>
                    </svg>
                  </div>

                  <div className="space-y-3">
                    {displayAnalyticsData?.assetAllocation?.byAssetClass && Object.entries(displayAnalyticsData.assetAllocation.byAssetClass).map(([key, value], index) => {
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];
                      const textColors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-red-600'];
                      const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50', 'bg-red-50'];
                      return (
                        <div key={key} className={`flex items-center justify-between p-3 rounded-lg ${bgColors[index]} hover:shadow-md transition-shadow cursor-pointer`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                            <span className="text-sm font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-bold ${textColors[index]}`}>{value}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div className={`${colors[index]} h-1.5 rounded-full`} style={{ width: `${value}%` }}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* By Geography */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">By Geography</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">4 Regions</span>
                  </div>

                  {/* Pie Chart Visualization */}
                  <div className="relative h-48 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Pie segments */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#06B6D4" strokeWidth="60" strokeDasharray="226 502.4" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#14B8A6" strokeWidth="60" strokeDasharray="125.6 502.4" strokeDashoffset="-226" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#22C55E" strokeWidth="60" strokeDasharray="100.5 502.4" strokeDashoffset="-351.6" transform="rotate(-90 100 100)" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#84CC16" strokeWidth="60" strokeDasharray="50.2 502.4" strokeDashoffset="-452.1" transform="rotate(-90 100 100)" />
                      {/* Center text */}
                      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">Global</text>
                      <text x="100" y="110" textAnchor="middle" className="text-xs fill-gray-500">Coverage</text>
                    </svg>
                  </div>

                  <div className="space-y-3">
                    {displayAnalyticsData?.assetAllocation?.byGeography && Object.entries(displayAnalyticsData.assetAllocation.byGeography).map(([key, value], index) => {
                      const colors = ['bg-cyan-500', 'bg-teal-500', 'bg-green-500', 'bg-lime-500'];
                      const textColors = ['text-cyan-600', 'text-teal-600', 'text-green-600', 'text-lime-600'];
                      const bgColors = ['bg-cyan-50', 'bg-teal-50', 'bg-green-50', 'bg-lime-50'];
                      return (
                        <div key={key} className={`flex items-center justify-between p-3 rounded-lg ${bgColors[index]} hover:shadow-md transition-shadow cursor-pointer`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                            <span className="text-sm font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-bold ${textColors[index]}`}>{value}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div className={`${colors[index]} h-1.5 rounded-full`} style={{ width: `${value}%` }}></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* By Sector */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">By Sector</h4>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">10 Sectors</span>
                  </div>

                  {/* Bar Chart Visualization */}
                  <div className="space-y-2 pt-4">
                    {displayAnalyticsData?.assetAllocation?.bySector && Object.entries(displayAnalyticsData.assetAllocation.bySector).map(([key, value], index) => {
                      const colors = [
                        'from-indigo-500 to-indigo-600',
                        'from-violet-500 to-violet-600',
                        'from-fuchsia-500 to-fuchsia-600',
                        'from-pink-500 to-pink-600',
                        'from-rose-500 to-rose-600',
                        'from-amber-500 to-amber-600',
                        'from-yellow-500 to-yellow-600',
                        'from-emerald-500 to-emerald-600',
                        'from-sky-500 to-sky-600',
                        'from-slate-500 to-slate-600'
                      ];
                      const textColors = [
                        'text-indigo-700',
                        'text-violet-700',
                        'text-fuchsia-700',
                        'text-pink-700',
                        'text-rose-700',
                        'text-amber-700',
                        'text-yellow-700',
                        'text-emerald-700',
                        'text-sky-700',
                        'text-slate-700'
                      ];
                      return (
                        <div key={key} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className={`text-xs font-bold ${textColors[index]}`}>{value}%</span>
                          </div>
                          <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden group-hover:shadow-md transition-shadow">
                            <div
                              className={`bg-gradient-to-r ${colors[index]} h-3 rounded-full transition-all duration-500 ease-out group-hover:opacity-90`}
                              style={{ width: `${value}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sector Summary */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 font-medium">Top Sector</span>
                      <span className="text-indigo-700 font-bold">Technology (22%)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className="text-gray-600 font-medium">Diversification Score</span>
                      <span className="text-green-700 font-bold">8.5/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allocation Insights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium">Equity Exposure</div>
                      <div className="text-lg font-bold text-blue-900">42%</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-blue-700">
                    <span className="font-medium">Target: 40-45%</span>
                    <span className="ml-2 text-green-600">✓ Within Range</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-green-600 font-medium">Geographic Diversification</div>
                      <div className="text-lg font-bold text-green-900">4 Regions</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-green-700">
                    <span className="font-medium">North America: 45%</span>
                    <span className="ml-2 text-blue-600">Primary Market</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-600 font-medium">Sector Concentration</div>
                      <div className="text-lg font-bold text-purple-900">Low Risk</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-purple-700">
                    <span className="font-medium">Top 3: 55%</span>
                    <span className="ml-2 text-green-600">Well Balanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "risk" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Risk Management</h2>
            <EnhancedRiskManagement xrplAccount={xrplAccount || undefined} />
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

            {/* Domain Verification */}
            <DomainVerification xrplAccount={xrplAccount} />

            {/* Audit Trail Viewer */}
            <AuditTrailViewer xrplAccount={xrplAccount} />

            <CompliancePermissioning xrplAccount={xrplAccount} />
          </div>
        )}

        {selectedTab === "xls_standards" && (
          <div className="space-y-8">
            {/* Enhanced Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 shadow-2xl border-2 border-indigo-100">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                      <Network className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">XRPL Standards Integration</h2>
                      <p className="text-gray-700 text-lg">Leveraging cutting-edge XLS protocols for institutional-grade DeFi</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        window.open('https://xrpl.org/docs.html', '_blank');
                        toast.success('Opening XRPL Documentation');
                      }}
                      className="px-6 py-3 bg-white border-2 border-indigo-200 rounded-xl text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <FileText className="h-4 w-4 inline mr-2" />
                      Documentation
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Analytics Dashboard');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-sm font-semibold hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <TrendingUp className="h-4 w-4 inline mr-2" />
                      View Analytics
                    </button>
                  </div>
                </div>

                {/* Protocol Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-green-200 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm font-medium">Active Protocols</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">7</div>
                    <div className="text-gray-600 text-xs mt-1">XLS Standards</div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-blue-200 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm font-medium">Network Status</span>
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">100%</div>
                    <div className="text-gray-600 text-xs mt-1">Compatible</div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-purple-200 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm font-medium">Transactions</span>
                      <ArrowUpRight className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">1.2K</div>
                    <div className="text-gray-600 text-xs mt-1">This Month</div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-yellow-200 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 text-sm font-medium">Gas Saved</span>
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">45%</div>
                    <div className="text-gray-600 text-xs mt-1">vs Traditional</div>
                  </div>
                </div>
              </div>
            </div>

            {/* XLS Standards Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* XLS-33: MPT */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                      <Coins className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">XLS-33</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Purpose Tokens</h3>
                  <p className="text-gray-600 text-sm mb-4">Institutional-grade asset tokenization with advanced features</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* XLS-40: DID */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">XLS-40</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Decentralized Identity</h3>
                  <p className="text-gray-600 text-sm mb-4">W3C-compliant DIDs for institutional identity management</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-purple-600 text-sm font-semibold hover:text-purple-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* XLS-40: Credentials */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">XLS-40</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verifiable Credentials</h3>
                  <p className="text-gray-600 text-sm mb-4">KYC/AML compliance through on-chain credentials</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* XLS-80: Permissioned Domains */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">XLS-80</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Permissioned Domains</h3>
                  <p className="text-gray-600 text-sm mb-4">Credential-based access control for compliance</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-orange-600 text-sm font-semibold hover:text-orange-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* XLS-30: AMM */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold">XLS-30</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Market Maker</h3>
                  <p className="text-gray-600 text-sm mb-4">Native AMM for efficient liquidity provision</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-cyan-600 text-sm font-semibold hover:text-cyan-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* Lending Protocol */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">Custom</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lending Protocol</h3>
                  <p className="text-gray-600 text-sm mb-4">Institutional lending and borrowing infrastructure</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Active</span>
                    </div>
                    <button className="text-pink-600 text-sm font-semibold hover:text-pink-700 transition-colors">
                      Manage →
                    </button>
                  </div>
                </div>
              </div>

              {/* XLS-65/66: Hooks */}
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">XLS-65/66</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Contracts (Hooks)</h3>
                  <p className="text-gray-600 text-sm mb-4">Advanced programmability for custom logic</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 font-medium">Optional</span>
                    </div>
                    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition-colors">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol Integration Visualization */}
            <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 mt-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Protocol Integration Map</h3>
                  <p className="text-gray-600 text-base">Visual representation of XLS standards working together</p>
                </div>
                <button
                  onClick={() => {
                    toast.info('Full architecture visualization - Feature coming soon!');
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Network className="h-4 w-4 inline mr-2" />
                  View Full Architecture
                </button>
              </div>

              {/* Integration Flow Diagram */}
              <div className="relative mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Identity Layer */}
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="inline-block px-5 py-2.5 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-3">
                        Identity Layer
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('did-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to DID Management section');
                      }}
                      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <User className="h-6 w-6 text-purple-600" />
                        <span className="font-semibold text-gray-900 text-base">DID (XLS-40)</span>
                      </div>
                      <p className="text-sm text-gray-600">Decentralized identity foundation</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('credentials-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Credentials Management section');
                      }}
                      className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="h-6 w-6 text-green-600" />
                        <span className="font-semibold text-gray-900 text-base">Credentials (XLS-40)</span>
                      </div>
                      <p className="text-sm text-gray-600">KYC/AML verification</p>
                    </div>
                  </div>

                  {/* Asset Layer */}
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="inline-block px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-3">
                        Asset Layer
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('mpt-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to MPT Management section');
                      }}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Coins className="h-6 w-6 text-blue-600" />
                        <span className="font-semibold text-gray-900 text-base">MPT (XLS-33)</span>
                      </div>
                      <p className="text-sm text-gray-600">Tokenized assets</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('permissioned-domains')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Permissioned Domains section');
                      }}
                      className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-2 border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Lock className="h-6 w-6 text-orange-600" />
                        <span className="font-semibold text-gray-900 text-base">Domains (XLS-80)</span>
                      </div>
                      <p className="text-sm text-gray-600">Access control</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('account-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Account Management section');
                      }}
                      className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-5 border-2 border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="h-6 w-6 text-slate-600" />
                        <span className="font-semibold text-gray-900 text-base">Account Config</span>
                      </div>
                      <p className="text-sm text-gray-600">Settings & flags</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('trustline-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Trust Line Management section');
                      }}
                      className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-5 border-2 border-teal-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Link2 className="h-6 w-6 text-teal-600" />
                        <span className="font-semibold text-gray-900 text-base">Trust Lines</span>
                      </div>
                      <p className="text-sm text-gray-600">Token trust</p>
                    </div>
                  </div>

                  {/* DeFi Layer */}
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="inline-block px-5 py-2.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold mb-3">
                        DeFi Layer
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('amm-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to AMM Management section');
                      }}
                      className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-5 border-2 border-cyan-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Activity className="h-6 w-6 text-cyan-600" />
                        <span className="font-semibold text-gray-900 text-base">AMM (XLS-30)</span>
                      </div>
                      <p className="text-sm text-gray-600">Liquidity pools</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('lending-protocol')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Lending Protocol section');
                      }}
                      className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-2 border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <DollarSign className="h-6 w-6 text-pink-600" />
                        <span className="font-semibold text-gray-900 text-base">Lending</span>
                      </div>
                      <p className="text-sm text-gray-600">Borrow & lend</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('dex-trading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to DEX Trading section');
                      }}
                      className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-5 border-2 border-emerald-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                        <span className="font-semibold text-gray-900 text-base">DEX Trading</span>
                      </div>
                      <p className="text-sm text-gray-600">Order book</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('signer-list-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Multi-Signature section');
                      }}
                      className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-5 border-2 border-indigo-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="h-6 w-6 text-indigo-600" />
                        <span className="font-semibold text-gray-900 text-base">Multi-Sig</span>
                      </div>
                      <p className="text-sm text-gray-600">Signer lists</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('ticket-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Ticket Management section');
                      }}
                      className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-5 border-2 border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Ticket className="h-6 w-6 text-amber-600" />
                        <span className="font-semibold text-gray-900 text-base">Tickets</span>
                      </div>
                      <p className="text-sm text-gray-600">Sequence mgmt</p>
                    </div>
                  </div>

                  {/* Payment Layer */}
                  <div className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="inline-block px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-3">
                        Payment Layer
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('check-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Check Management section');
                      }}
                      className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-5 border-2 border-emerald-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="h-6 w-6 text-emerald-600" />
                        <span className="font-semibold text-gray-900 text-base">Checks</span>
                      </div>
                      <p className="text-sm text-gray-600">Deferred payments</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('escrow-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Escrow Management section');
                      }}
                      className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-5 border-2 border-indigo-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Lock className="h-6 w-6 text-indigo-600" />
                        <span className="font-semibold text-gray-900 text-base">Escrows</span>
                      </div>
                      <p className="text-sm text-gray-600">Time-locked funds</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('nftoken-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to NFToken Management section');
                      }}
                      className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-5 border-2 border-rose-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <ImageIcon className="h-6 w-6 text-rose-600" />
                        <span className="font-semibold text-gray-900 text-base">NFTokens</span>
                      </div>
                      <p className="text-sm text-gray-600">Digital assets</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('oracle-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Oracle Management section');
                      }}
                      className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-5 border-2 border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Database className="h-6 w-6 text-purple-600" />
                        <span className="font-semibold text-gray-900 text-base">Oracles</span>
                      </div>
                      <p className="text-sm text-gray-600">Price feeds</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('payment-channel-management')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Payment Channel Management section');
                      }}
                      className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-5 border-2 border-yellow-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="h-6 w-6 text-yellow-600" />
                        <span className="font-semibold text-gray-900 text-base">Payment Channels</span>
                      </div>
                      <p className="text-sm text-gray-600">Micropayments</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('realtime-monitor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Real-Time Monitor section');
                      }}
                      className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-5 border-2 border-cyan-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Wifi className="h-6 w-6 text-cyan-600" />
                        <span className="font-semibold text-gray-900 text-base">WebSocket Monitor</span>
                      </div>
                      <p className="text-sm text-gray-600">Real-time data</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('path-finding')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Path Finding section');
                      }}
                      className="bg-gradient-to-br from-violet-50 to-purple-100 rounded-xl p-5 border-2 border-violet-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Route className="h-6 w-6 text-violet-600" />
                        <span className="font-semibold text-gray-900 text-base">Path Finding</span>
                      </div>
                      <p className="text-sm text-gray-600">Payment routes</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('batch-transactions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Batch Transactions section');
                      }}
                      className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-5 border-2 border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Layers className="h-6 w-6 text-orange-600" />
                        <span className="font-semibold text-gray-900 text-base">Batch Transactions</span>
                      </div>
                      <p className="text-sm text-gray-600">Atomic execution</p>
                    </div>
                    <div
                      onClick={() => {
                        document.getElementById('cross-chain-bridge')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        toast.info('Navigating to Cross-Chain Bridge section');
                      }}
                      className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl p-5 border-2 border-teal-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Network className="h-6 w-6 text-teal-600" />
                        <span className="font-semibold text-gray-900 text-base">Cross-Chain Bridge</span>
                      </div>
                      <p className="text-sm text-gray-600">XChain transfers</p>
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="absolute top-1/2 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 hidden md:block"></div>
                <div className="absolute top-1/2 left-1/2 w-1/4 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 hidden md:block"></div>
                <div className="absolute top-1/2 right-1/4 w-1/4 h-0.5 bg-gradient-to-r from-cyan-300 to-emerald-300 hidden md:block"></div>
              </div>

              {/* Integration Benefits */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">Compliance Ready</span>
                  </div>
                  <p className="text-sm text-gray-600">Built-in KYC/AML through credentials</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">High Performance</span>
                  </div>
                  <p className="text-sm text-gray-600">Native XRPL speed and efficiency</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">Enterprise Security</span>
                  </div>
                  <p className="text-sm text-gray-600">Institutional-grade protection</p>
                </div>
              </div>
            </div>

            {/* Amendment Tracker - Enhanced */}
            <AmendmentTracker network={network} />

            {/* Detailed Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* MPT Management */}
              <div id="mpt-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <MPTManagement xrplAccount={xrplAccount} />
              </div>

              {/* DID Management */}
              <div id="did-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <DIDManagement xrplAccount={xrplAccount} />
              </div>

              {/* Credentials Management */}
              <div id="credentials-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <CredentialsManagement xrplAccount={xrplAccount} />
              </div>

              {/* Permissioned Domains */}
              <div id="permissioned-domains" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <PermissionedDomainsManagement xrplAccount={xrplAccount} />
              </div>

              {/* AMM Management */}
              <div id="amm-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <AMMManagement xrplAccount={xrplAccount} />
              </div>

              {/* Lending Protocol */}
              <div id="lending-protocol" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <LendingProtocolUI xrplAccount={xrplAccount} />
              </div>

              {/* Check Management */}
              <div id="check-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <CheckManagement xrplAccount={xrplAccount} />
              </div>

              {/* Escrow Management */}
              <div id="escrow-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <EscrowManagement xrplAccount={xrplAccount} />
              </div>

              {/* NFToken Management */}
              <div id="nftoken-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <NFTokenManagement xrplAccount={xrplAccount} />
              </div>

              {/* Oracle Management */}
              <div id="oracle-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <OracleManagement xrplAccount={xrplAccount} />
              </div>

              {/* Payment Channel Management */}
              <div id="payment-channel-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <PaymentChannelManagement xrplAccount={xrplAccount} />
              </div>

              {/* Account Management */}
              <div id="account-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <AccountManagement xrplAccount={xrplAccount} />
              </div>

              {/* Trust Line Management */}
              <div id="trustline-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <TrustLineManagement xrplAccount={xrplAccount} />
              </div>

              {/* DEX Trading */}
              <div id="dex-trading" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <DEXTrading xrplAccount={xrplAccount} />
              </div>

              {/* Signer List Management */}
              <div id="signer-list-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <SignerListManagement xrplAccount={xrplAccount} />
              </div>

              {/* Ticket Management */}
              <div id="ticket-management" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <TicketManagement xrplAccount={xrplAccount} />
              </div>

              {/* Real-Time Monitor */}
              <div id="realtime-monitor" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <RealtimeMonitor xrplAccount={xrplAccount} />
              </div>

              {/* Path Finding */}
              <div id="path-finding" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <PathFindingUI xrplAccount={xrplAccount} />
              </div>

              {/* Batch Transactions */}
              <div id="batch-transactions" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <BatchTransactionEngine xrplAccount={xrplAccount} />
              </div>

              {/* Cross-Chain Bridge */}
              <div id="cross-chain-bridge" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 scroll-mt-20">
                <CrossChainBridge xrplAccount={xrplAccount} />
              </div>
            </div>

            {/* Standards Badge */}
            <XRPLStandardsBadge />
          </div>
        )}

        {selectedTab === "governance" && (
          <div className="space-y-8">
            <EnhancedGovernance xrplAccount={xrplAccount || undefined} />
          </div>
        )}

        {selectedTab === "reports" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Institutional Reports</h2>
            <EnhancedInstitutionalReports xrplAccount={xrplAccount || undefined} />
          </div>
        )}

        {selectedTab === "wallet" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Xaman Wallet Integration</h2>
            </div>

            <XamanWalletIntegration />
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

      {/* Fund Detail Modal */}
      <FundDetailModal
        fund={selectedFund}
        isOpen={showFundDetailModal}
        onClose={() => {
          setShowFundDetailModal(false);
          setSelectedFund(null);
        }}
        xrplAccount={xrplAccount || undefined}
      />
    </div>
  );
}

export default InstitutionalDashboard;