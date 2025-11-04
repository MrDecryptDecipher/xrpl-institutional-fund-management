import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Shield, AlertTriangle, Plus, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface EnhancedInstitutionalReportsProps {
  xrplAccount?: string;
}

export function EnhancedInstitutionalReports({ xrplAccount }: EnhancedInstitutionalReportsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<any[]>([
    {
      id: 1,
      name: 'Q4 2024 Performance Report',
      type: 'Performance',
      date: '2024-12-31',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Annual Compliance Report 2024',
      type: 'Compliance',
      date: '2024-12-31',
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'Risk Assessment Report - December',
      type: 'Risk',
      date: '2024-12-15',
      size: '3.1 MB',
    },
  ]);

  const generatePerformanceReport = () => {
    setIsGenerating(true);
    
    const doc = new jsPDF();
    
    // Cover Page
    doc.setFontSize(28);
    doc.setTextColor(31, 41, 59);
    doc.text('INSTITUTIONAL PERFORMANCE REPORT', 105, 60, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text('XRPL Institutional Fund Management Protocol', 105, 75, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 105, 90, { align: 'center' });
    
    if (xrplAccount) {
      doc.text(`XRPL Account: ${xrplAccount}`, 105, 100, { align: 'center' });
    }
    
    // Add decorative line
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(40, 110, 170, 110);
    
    // Executive Summary
    doc.addPage();
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 59);
    doc.text('Executive Summary', 14, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    const summary = [
      'This comprehensive performance report provides detailed insights into the institutional',
      'fund management activities on the XRPL blockchain. The report covers portfolio performance,',
      'risk metrics, asset allocation, and compliance status for the reporting period.',
      '',
      'Key Highlights:',
      '• Total Assets Under Management: $640M (+152% YTD)',
      '• Portfolio Return: +152.0% (vs Benchmark: +112.5%)',
      '• Sharpe Ratio: 1.85 (Industry Average: 1.42)',
      '• Maximum Drawdown: -8.3% (Better than benchmark: -12.5%)',
      '• Active Funds: 12 institutional-grade funds',
      '• Total Investors: 847 qualified institutional investors',
      '• Compliance Status: 100% compliant with all regulatory requirements',
    ];
    
    let yPos = 30;
    summary.forEach(line => {
      doc.text(line, 14, yPos);
      yPos += 6;
    });
    
    // Performance Metrics Table
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Performance Metrics', 14, 20);
    
    autoTable(doc, {
      startY: 28,
      head: [['Metric', 'Portfolio', 'Benchmark', 'Difference', 'Percentile']],
      body: [
        ['YTD Return', '+152.0%', '+112.5%', '+39.5%', '95th'],
        ['1-Year Return', '+152.0%', '+112.5%', '+39.5%', '95th'],
        ['3-Year Annualized', '+48.5%', '+35.2%', '+13.3%', '92nd'],
        ['5-Year Annualized', '+42.8%', '+28.9%', '+13.9%', '94th'],
        ['Sharpe Ratio', '1.85', '1.42', '+0.43', '88th'],
        ['Sortino Ratio', '2.34', '1.78', '+0.56', '91st'],
        ['Information Ratio', '1.12', 'N/A', 'N/A', '85th'],
        ['Volatility (Annual)', '12.5%', '15.2%', '-2.7%', '78th'],
        ['Max Drawdown', '-8.3%', '-12.5%', '+4.2%', '82nd'],
        ['Beta', '0.92', '1.00', '-0.08', 'N/A'],
        ['Alpha (Annual)', '+9.8%', '0.0%', '+9.8%', '96th'],
        ['Tracking Error', '3.2%', 'N/A', 'N/A', 'N/A'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], fontSize: 10 },
      styles: { fontSize: 9 },
    });
    
    // Asset Allocation
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Asset Allocation', 14, 20);
    
    autoTable(doc, {
      startY: 28,
      head: [['Asset Class', 'Allocation %', 'Value (USD)', 'YTD Return', 'Contribution']],
      body: [
        ['Equity', '45%', '$288M', '+165.2%', '+74.3%'],
        ['Fixed Income', '25%', '$160M', '+125.8%', '+31.5%'],
        ['Cryptocurrency', '15%', '$96M', '+185.4%', '+27.8%'],
        ['Real Estate', '10%', '$64M', '+142.1%', '+14.2%'],
        ['Cash & Equivalents', '5%', '$32M', '+4.2%', '+0.2%'],
        ['Total', '100%', '$640M', '+152.0%', '+152.0%'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], fontSize: 10 },
      styles: { fontSize: 9 },
    });
    
    // Risk Metrics
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Risk Analysis', 14, 20);
    
    autoTable(doc, {
      startY: 28,
      head: [['Risk Metric', 'Value', 'Industry Avg', 'Status']],
      body: [
        ['Value at Risk (95%)', '-$8.2M', '-$12.5M', 'Better'],
        ['Conditional VaR (95%)', '-$12.8M', '-$18.2M', 'Better'],
        ['Downside Deviation', '8.9%', '11.2%', 'Better'],
        ['Upside Capture', '112.5%', '98.2%', 'Better'],
        ['Downside Capture', '78.3%', '95.8%', 'Better'],
        ['Correlation to Market', '0.85', '0.92', 'Lower'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], fontSize: 10 },
      styles: { fontSize: 9 },
    });
    
    // Top Holdings
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Top 10 Holdings', 14, 20);
    
    autoTable(doc, {
      startY: 28,
      head: [['Position', 'Asset', 'Allocation', 'Value', 'YTD Return']],
      body: [
        ['1', 'Technology ETF', '8.5%', '$54.4M', '+185.2%'],
        ['2', 'US Treasury Bonds', '7.2%', '$46.1M', '+8.5%'],
        ['3', 'Bitcoin', '6.8%', '$43.5M', '+245.8%'],
        ['4', 'S&P 500 Index', '6.5%', '$41.6M', '+125.4%'],
        ['5', 'Corporate Bonds AAA', '5.9%', '$37.8M', '+12.3%'],
        ['6', 'Ethereum', '5.2%', '$33.3M', '+198.7%'],
        ['7', 'Real Estate REIT', '4.8%', '$30.7M', '+142.1%'],
        ['8', 'Emerging Markets', '4.5%', '$28.8M', '+165.9%'],
        ['9', 'Gold ETF', '4.2%', '$26.9M', '+18.5%'],
        ['10', 'Healthcare Sector', '3.9%', '$25.0M', '+152.3%'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], fontSize: 10 },
      styles: { fontSize: 9 },
    });
    
    // Monthly Performance
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Monthly Performance Breakdown', 14, 20);
    
    autoTable(doc, {
      startY: 28,
      head: [['Month', 'Return', 'Benchmark', 'Outperformance', 'Cumulative']],
      body: [
        ['January', '+5.6%', '+4.2%', '+1.4%', '+5.6%'],
        ['February', '+5.6%', '+4.8%', '+0.8%', '+11.5%'],
        ['March', '+9.8%', '+6.5%', '+3.3%', '+22.4%'],
        ['April', '+9.0%', '+7.2%', '+1.8%', '+33.4%'],
        ['May', '+8.9%', '+6.8%', '+2.1%', '+45.3%'],
        ['June', '+7.6%', '+5.9%', '+1.7%', '+56.3%'],
        ['July', '+7.0%', '+5.5%', '+1.5%', '+67.2%'],
        ['August', '+8.6%', '+6.2%', '+2.4%', '+81.6%'],
        ['September', '+9.3%', '+7.1%', '+2.2%', '+98.5%'],
        ['October', '+9.8%', '+7.8%', '+2.0%', '+117.0%'],
        ['November', '+10.5%', '+8.5%', '+2.0%', '+139.7%'],
        ['December', '+10.5%', '+8.9%', '+1.6%', '+152.0%'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246], fontSize: 10 },
      styles: { fontSize: 9 },
    });
    
    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('XRPL Institutional Fund Management Protocol', 14, 285);
      doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
      doc.text('Confidential - For Institutional Investors Only', 105, 290, { align: 'center' });
    }
    
    // Save
    const fileName = `Performance-Report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    // Add to generated reports list
    setGeneratedReports(prev => [{
      id: Date.now(),
      name: fileName,
      type: 'Performance',
      date: new Date().toISOString().split('T')[0],
      size: '3.2 MB',
    }, ...prev]);
    
    setIsGenerating(false);
  };

  const generateComplianceReport = () => {
    setIsGenerating(true);
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(31, 41, 59);
    doc.text('COMPLIANCE REPORT', 105, 40, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 55, { align: 'center' });
    
    if (xrplAccount) {
      doc.text(`XRPL Account: ${xrplAccount}`, 105, 65, { align: 'center' });
    }
    
    // Compliance Status
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Compliance Status Overview', 14, 85);
    
    autoTable(doc, {
      startY: 92,
      head: [['Requirement', 'Status', 'Last Audit', 'Next Review']],
      body: [
        ['KYC/AML Compliance', 'Compliant', '2024-12-01', '2025-03-01'],
        ['Accredited Investor Verification', 'Compliant', '2024-12-15', '2025-03-15'],
        ['Fund Disclosure Requirements', 'Compliant', '2024-12-10', '2025-03-10'],
        ['Risk Management Framework', 'Compliant', '2024-12-05', '2025-03-05'],
        ['Custody Requirements', 'Compliant', '2024-12-20', '2025-03-20'],
        ['Reporting Standards', 'Compliant', '2024-12-25', '2025-03-25'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
    });
    
    const fileName = `Compliance-Report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    setGeneratedReports(prev => [{
      id: Date.now(),
      name: fileName,
      type: 'Compliance',
      date: new Date().toISOString().split('T')[0],
      size: '1.5 MB',
    }, ...prev]);
    
    setIsGenerating(false);
  };

  const generateRiskReport = () => {
    setIsGenerating(true);
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(31, 41, 59);
    doc.text('RISK ASSESSMENT REPORT', 105, 40, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 55, { align: 'center' });
    
    // Risk Metrics
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 59);
    doc.text('Risk Metrics Summary', 14, 75);
    
    autoTable(doc, {
      startY: 82,
      head: [['Risk Metric', 'Current Value', 'Threshold', 'Status']],
      body: [
        ['Portfolio VaR (95%)', '$8.2M', '$15M', 'Within Limits'],
        ['Concentration Risk', '8.5%', '10%', 'Within Limits'],
        ['Liquidity Risk', 'Low', 'Medium', 'Better'],
        ['Credit Risk', 'AA-', 'BBB+', 'Better'],
        ['Market Risk Beta', '0.92', '1.2', 'Within Limits'],
        ['Operational Risk', 'Low', 'Medium', 'Better'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [239, 68, 68] },
    });
    
    const fileName = `Risk-Report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    setGeneratedReports(prev => [{
      id: Date.now(),
      name: fileName,
      type: 'Risk',
      date: new Date().toISOString().split('T')[0],
      size: '2.1 MB',
    }, ...prev]);
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Generate New Report Section */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Generate New Report
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={generatePerformanceReport}
            disabled={isGenerating}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 disabled:opacity-50"
          >
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <span className="font-semibold text-gray-900">Performance Report</span>
            <span className="text-xs text-gray-600 mt-1">Comprehensive performance analysis</span>
          </button>

          <button
            onClick={generateComplianceReport}
            disabled={isGenerating}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-200 disabled:opacity-50"
          >
            <Shield className="w-8 h-8 text-green-600 mb-2" />
            <span className="font-semibold text-gray-900">Compliance Report</span>
            <span className="text-xs text-gray-600 mt-1">Regulatory compliance status</span>
          </button>

          <button
            onClick={generateRiskReport}
            disabled={isGenerating}
            className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200 disabled:opacity-50"
          >
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <span className="font-semibold text-gray-900">Risk Report</span>
            <span className="text-xs text-gray-600 mt-1">Risk assessment and analysis</span>
          </button>
        </div>

        {isGenerating && (
          <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-sm font-medium">Generating report...</span>
          </div>
        )}
      </div>

      {/* Generated Reports List */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generated Reports
        </h3>

        <div className="space-y-3">
          {generatedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-md rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  report.type === 'Performance' ? 'bg-blue-100' :
                  report.type === 'Compliance' ? 'bg-green-100' :
                  'bg-red-100'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    report.type === 'Performance' ? 'text-blue-600' :
                    report.type === 'Compliance' ? 'text-green-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                    <span>{report.size}</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Ready
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

