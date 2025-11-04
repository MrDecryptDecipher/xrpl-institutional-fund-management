import { useState } from "react";
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  QrCode,
  Loader2
} from "lucide-react";

interface InstitutionalReportingProps {
  xrplAccount: string | null;
}

export function InstitutionalReporting({ xrplAccount }: InstitutionalReportingProps) {
  const [activeTab, setActiveTab] = useState<"reports" | "analytics" | "compliance">("reports");
  const [reportType, setReportType] = useState("performance");
  const [reportPeriod, setReportPeriod] = useState("quarterly");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportId, setReportId] = useState("");
  const [payloadUuid, setPayloadUuid] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock reporting data
  const reports = [
    {
      id: "rep_1",
      title: "Q4 2023 Performance Report",
      type: "performance",
      date: "2024-01-15",
      status: "published",
      fileSize: "2.4 MB"
    },
    {
      id: "rep_2",
      title: "Annual Compliance Summary",
      type: "compliance",
      date: "2024-01-10",
      status: "published",
      fileSize: "1.8 MB"
    },
    {
      id: "rep_3",
      title: "Risk Analysis Q4",
      type: "risk",
      date: "2024-01-08",
      status: "published",
      fileSize: "3.1 MB"
    },
    {
      id: "rep_4",
      title: "Q1 2024 Forecast",
      type: "performance",
      date: "2024-01-20",
      status: "draft",
      fileSize: "1.2 MB"
    }
  ];

  const generateReport = async () => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }

    setIsGeneratingReport(true);
    setError(null);
    setIsWaitingForSignature(false);
    setPayloadUuid(null);
    setQrCodeUrl(null);
    
    try {
      // Call the backend to generate the report
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requester: xrplAccount,
          reportType: reportType,
          reportPeriod: reportPeriod
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show QR code for signing
        setPayloadUuid(result.uuid);
        setQrCodeUrl(result.qrCodeUrl);
        setIsWaitingForSignature(true);
        
        // Poll for transaction completion
        pollForTransactionCompletion(result.uuid);
      } else {
        throw new Error(result.error || 'Failed to generate report');
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
      setError(`Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const pollForTransactionCompletion = async (uuid: string) => {
    try {
      // Poll our backend for payload status
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/payload-status/${uuid}`);
          const payload = await response.json();
          
          if (payload.meta && payload.meta.resolved) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            
            if (payload.response && payload.response.txid) {
              // Transaction was successful
              const reportId = `report_${Date.now()}`;
              setReportId(reportId);
              setReportGenerated(true);
              setError(null);
            } else {
              // Transaction was rejected or failed
              setError("Transaction was rejected or failed. Please try again.");
            }
          } else if (payload.meta && payload.meta.cancelled) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            setError("Transaction was cancelled. Please try again.");
          }
        } catch (err) {
          console.error("Error polling for transaction status:", err);
        }
      }, 2000); // Poll every 2 seconds
    } catch (err) {
      console.error("Error starting transaction polling:", err);
      setIsWaitingForSignature(false);
      setError(`Failed to monitor transaction: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const resetReportGeneration = () => {
    setReportGenerated(false);
    setReportId("");
    setPayloadUuid(null);
    setQrCodeUrl(null);
    setIsWaitingForSignature(false);
    setError(null);
  };

  const cancelTransaction = () => {
    resetReportGeneration();
  };

  const downloadReport = async (reportId: string) => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }
    
    try {
      // Call the backend to download the report
      const response = await fetch(`/api/download-report/${reportId}`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        alert(`Report downloaded successfully!\nReport ID: ${reportId}`);
      } else {
        throw new Error('Failed to download report');
      }
    } catch (error) {
      console.error("Failed to download report:", error);
      setError(`Failed to download report: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Institutional Reporting</h3>
        <div className="flex items-center space-x-2">
          {xrplAccount && (
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("reports")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "reports"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FileText className="h-4 w-4 mr-2" />
          Reports
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "analytics"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "compliance"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Compliance
        </button>
      </div>

      {isWaitingForSignature && qrCodeUrl ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Sign Report Generation</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-700 mb-4">
              Scan the QR code with your Xaman wallet to sign and submit the report generation request.
            </p>
            
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="Xaman QR Code" className="w-48 h-48" />
            </div>
            
            <p className="text-xs text-blue-600 text-center">
              Waiting for signature... This window will update automatically once signed.
            </p>
          </div>
          
          <button
            onClick={cancelTransaction}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel Transaction
          </button>
        </div>
      ) : reportGenerated ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Report Generated Successfully</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Report Type</p>
                <p className="font-medium text-gray-900 capitalize">{reportType}</p>
              </div>
              <div>
                <p className="text-gray-500">Report ID</p>
                <p className="font-mono text-gray-900 truncate">{reportId}</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={resetReportGeneration}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Another Report
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === "reports" ? (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type *
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="performance">Performance Report</option>
              <option value="compliance">Compliance Report</option>
              <option value="risk">Risk Analysis Report</option>
              <option value="audit">Audit Report</option>
              <option value="financial">Financial Statement</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period *
            </label>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi_annual">Semi-Annual</option>
              <option value="annual">Annual</option>
              <option value="custom">Custom Period</option>
            </select>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Report Generation</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>All reports are generated with real-time XRPL data</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Reports are cryptographically signed and stored on-chain</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Compliance with all relevant regulatory frameworks</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={generateReport}
            disabled={isGeneratingReport || !xrplAccount}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingReport ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                <span>Generate Report</span>
              </>
            )}
          </button>
          
          {/* Recent Reports */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-4">Recent Reports</h4>
            <div className="space-y-4">
              {reports.map(report => (
                <div key={report.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{report.title}</h5>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{report.date}</span>
                    <span className="mx-2">•</span>
                    <span>{report.fileSize}</span>
                  </div>
                  <button
                    onClick={() => downloadReport(report.id)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "analytics" ? (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 mb-4">Performance Analytics</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-blue-900">Portfolio Performance</h5>
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div className="h-48 flex items-center justify-center bg-white rounded-lg border border-blue-200">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-700">Performance Chart</p>
                  <p className="text-xs text-blue-600 mt-1">Real-time XRPL data visualization</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-purple-900">Asset Allocation</h5>
                <PieChart className="h-5 w-5 text-purple-500" />
              </div>
              <div className="h-48 flex items-center justify-center bg-white rounded-lg border border-purple-200">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-purple-700">Allocation Pie Chart</p>
                  <p className="text-xs text-purple-600 mt-1">Real-time XRPL data visualization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-3">Key Metrics</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Total AUM</p>
                <p className="text-lg font-bold text-gray-900">$15.75B</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">YTD Return</p>
                <p className="text-lg font-bold text-green-600">+18.4%</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sharpe Ratio</p>
                <p className="text-lg font-bold text-gray-900">2.34</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Max Drawdown</p>
                <p className="text-lg font-bold text-red-600">-4.2%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 mb-4">Compliance Dashboard</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-green-900">KYC Approved</h5>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-700">823</p>
              <p className="text-xs text-green-600 mt-1">Investors verified</p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-yellow-900">Pending KYC</h5>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-700">18</p>
              <p className="text-xs text-yellow-600 mt-1">Awaiting review</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-blue-900">AML Cleared</h5>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-700">25</p>
              <p className="text-xs text-blue-600 mt-1">Screenings completed</p>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-red-900">AML Alerts</h5>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-red-700">2</p>
              <p className="text-xs text-red-600 mt-1">High risk cases</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h5 className="font-medium text-gray-900 mb-3">Regulatory Compliance</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Jurisdictions</span>
                </div>
                <p className="text-lg font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600">Fully compliant</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Reports Filed</span>
                </div>
                <p className="text-lg font-bold text-gray-900">95</p>
                <p className="text-xs text-purple-600">This quarter</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Next Filing</span>
                </div>
                <p className="text-lg font-bold text-gray-900">Feb 15</p>
                <p className="text-xs text-orange-600">SEC 13F Report</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}