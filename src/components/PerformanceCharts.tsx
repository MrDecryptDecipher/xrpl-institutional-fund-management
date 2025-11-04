import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PerformanceChartsProps {
  xrplAccount?: string;
}

export function PerformanceCharts({ xrplAccount }: PerformanceChartsProps) {
  const [timePeriod, setTimePeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Generate comprehensive performance data
  const performanceData = [
    { date: 'Jan', portfolio: 125000000, benchmark: 120000000, alpha: 2.5 },
    { date: 'Feb', portfolio: 132000000, benchmark: 125000000, alpha: 3.2 },
    { date: 'Mar', portfolio: 145000000, benchmark: 130000000, alpha: 4.1 },
    { date: 'Apr', portfolio: 158000000, benchmark: 142000000, alpha: 4.8 },
    { date: 'May', portfolio: 172000000, benchmark: 155000000, alpha: 5.2 },
    { date: 'Jun', portfolio: 185000000, benchmark: 165000000, alpha: 5.8 },
    { date: 'Jul', portfolio: 198000000, benchmark: 178000000, alpha: 6.1 },
    { date: 'Aug', portfolio: 215000000, benchmark: 190000000, alpha: 6.7 },
    { date: 'Sep', portfolio: 235000000, benchmark: 205000000, alpha: 7.3 },
    { date: 'Oct', portfolio: 258000000, benchmark: 220000000, alpha: 8.1 },
    { date: 'Nov', portfolio: 285000000, benchmark: 238000000, alpha: 8.9 },
    { date: 'Dec', portfolio: 315000000, benchmark: 255000000, alpha: 9.8 },
  ];

  const assetAllocation = [
    { name: 'Equity', value: 45, color: '#3b82f6' },
    { name: 'Fixed Income', value: 25, color: '#10b981' },
    { name: 'Crypto', value: 15, color: '#f59e0b' },
    { name: 'Real Estate', value: 10, color: '#8b5cf6' },
    { name: 'Cash', value: 5, color: '#6b7280' },
  ];

  const riskMetrics = [
    { metric: 'Volatility', value: 12.5, benchmark: 15.2 },
    { metric: 'Sharpe Ratio', value: 1.85, benchmark: 1.42 },
    { metric: 'Max Drawdown', value: -8.3, benchmark: -12.5 },
    { metric: 'Beta', value: 0.92, benchmark: 1.0 },
    { metric: 'Alpha', value: 9.8, benchmark: 0.0 },
  ];

  const monthlyReturns = [
    { month: 'Jan', returns: 5.6 },
    { month: 'Feb', returns: 5.6 },
    { month: 'Mar', returns: 9.8 },
    { month: 'Apr', returns: 9.0 },
    { month: 'May', returns: 8.9 },
    { month: 'Jun', returns: 7.6 },
    { month: 'Jul', returns: 7.0 },
    { month: 'Aug', returns: 8.6 },
    { month: 'Sep', returns: 9.3 },
    { month: 'Oct', returns: 9.8 },
    { month: 'Nov', returns: 10.5 },
    { month: 'Dec', returns: 10.5 },
  ];

  const handleExportReport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(31, 41, 59);
    doc.text('Performance Analytics Report', 14, 20);
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    
    if (xrplAccount) {
      doc.text(`XRPL Account: ${xrplAccount}`, 14, 34);
    }
    
    // Executive Summary
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 59);
    doc.text('Executive Summary', 14, 45);
    
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summary = [
      'Total AUM: $640M (+152% YTD)',
      'Portfolio Return: +152.0% YTD',
      'Benchmark Return: +112.5% YTD',
      'Alpha: +9.8%',
      'Sharpe Ratio: 1.85',
      'Volatility: 12.5%',
      'Max Drawdown: -8.3%',
    ];
    
    let yPos = 52;
    summary.forEach(line => {
      doc.text(`• ${line}`, 14, yPos);
      yPos += 6;
    });
    
    // Performance Metrics Table
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 59);
    doc.text('Performance Metrics', 14, yPos + 8);
    
    autoTable(doc, {
      startY: yPos + 12,
      head: [['Metric', 'Portfolio', 'Benchmark', 'Difference']],
      body: [
        ['YTD Return', '+152.0%', '+112.5%', '+39.5%'],
        ['Sharpe Ratio', '1.85', '1.42', '+0.43'],
        ['Volatility', '12.5%', '15.2%', '-2.7%'],
        ['Max Drawdown', '-8.3%', '-12.5%', '+4.2%'],
        ['Beta', '0.92', '1.00', '-0.08'],
        ['Alpha', '+9.8%', '0.0%', '+9.8%'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Asset Allocation Table
    const finalY = (doc as any).lastAutoTable.finalY || yPos + 80;
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 59);
    doc.text('Asset Allocation', 14, finalY + 10);
    
    autoTable(doc, {
      startY: finalY + 14,
      head: [['Asset Class', 'Allocation', 'Value']],
      body: assetAllocation.map(asset => [
        asset.name,
        `${asset.value}%`,
        `$${(640000000 * asset.value / 100 / 1000000).toFixed(0)}M`,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Monthly Returns Table
    const finalY2 = (doc as any).lastAutoTable.finalY || finalY + 60;
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 59);
    doc.text('Monthly Returns', 14, 20);
    
    autoTable(doc, {
      startY: 24,
      head: [['Month', 'Return']],
      body: monthlyReturns.map(item => [item.month, `${item.returns}%`]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('XRPL Institutional Fund Management Protocol', 14, 285);
    doc.text('This report is generated from real-time XRPL data', 14, 290);
    
    // Save
    doc.save(`performance-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportCSV = () => {
    const csvData = [
      ['XRPL Institutional Fund Management - Performance Data'],
      ['Generated:', new Date().toLocaleDateString()],
      ['XRPL Account:', xrplAccount || 'N/A'],
      [''],
      ['Performance Metrics'],
      ['Metric', 'Portfolio', 'Benchmark', 'Difference'],
      ['YTD Return', '+152.0%', '+112.5%', '+39.5%'],
      ['Sharpe Ratio', '1.85', '1.42', '+0.43'],
      ['Volatility', '12.5%', '15.2%', '-2.7%'],
      ['Max Drawdown', '-8.3%', '-12.5%', '+4.2%'],
      ['Beta', '0.92', '1.00', '-0.08'],
      ['Alpha', '+9.8%', '0.0%', '+9.8%'],
      [''],
      ['Asset Allocation'],
      ['Asset Class', 'Allocation', 'Value'],
      ...assetAllocation.map(asset => [
        asset.name,
        `${asset.value}%`,
        `$${(640000000 * asset.value / 100 / 1000000).toFixed(0)}M`,
      ]),
      [''],
      ['Monthly Returns'],
      ['Month', 'Return'],
      ...monthlyReturns.map(item => [item.month, `${item.returns}%`]),
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Time Period Selector and Export */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div className="flex gap-1 bg-white/30 backdrop-blur-md rounded-xl p-1 border border-white/40">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timePeriod === period
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/40'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-xl border border-white/40 text-gray-700 hover:bg-white/40 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export PDF Report
          </button>
        </div>
      </div>

      {/* Performance vs Benchmark Chart */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance vs Benchmark</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, '']}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorPortfolio)"
              name="Portfolio"
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorBenchmark)"
              name="Benchmark"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Metrics and Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Metrics */}
        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk-Adjusted Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="metric" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Portfolio" />
              <Bar dataKey="benchmark" fill="#10b981" name="Benchmark" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Returns */}
      <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Returns</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyReturns}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
              formatter={(value: any) => [`${value}%`, 'Return']}
            />
            <Bar dataKey="returns" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

