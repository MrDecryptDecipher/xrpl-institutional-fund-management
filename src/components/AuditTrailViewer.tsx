import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, Download, Filter, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  resource: string;
  status: 'success' | 'failed' | 'pending';
  details: string;
  txHash?: string;
}

export function AuditTrailViewer({ xrplAccount }: { xrplAccount: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Mock audit logs - in production, fetch from convex/audit/audit_logging.ts
  const mockLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      action: 'MPT_AUTHORIZE',
      actor: xrplAccount,
      resource: 'MPT-12345',
      status: 'success',
      details: 'Authorized MPT issuance ID: 12345',
      txHash: 'ABC123...'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: 'DID_CREATE',
      actor: xrplAccount,
      resource: `did:xrpl:${xrplAccount}`,
      status: 'success',
      details: 'Created W3C compliant DID',
      txHash: 'DEF456...'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      action: 'CREDENTIAL_ISSUE',
      actor: xrplAccount,
      resource: 'CRED-KYC-789',
      status: 'success',
      details: 'Issued KYC credential to rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc',
      txHash: 'GHI789...'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      action: 'DOMAIN_CREATE',
      actor: xrplAccount,
      resource: 'institutional-fund-001',
      status: 'success',
      details: 'Created permissioned domain with KYC/AML requirements',
      txHash: 'JKL012...'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      action: 'AMM_CREATE',
      actor: xrplAccount,
      resource: 'AMM-POOL-345',
      status: 'pending',
      details: 'Creating AMM pool for XRP/USD',
      txHash: undefined
    }
  ];

  const handleLoadLogs = async () => {
    setIsLoading(true);
    
    try {
      // In production, query convex/audit/audit_logging.ts
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuditLogs(mockLogs);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = filterAction === 'all' || log.action.includes(filterAction.toUpperCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Action', 'Actor', 'Resource', 'Status', 'Details', 'TX Hash'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.action,
        log.actor,
        log.resource,
        log.status,
        `"${log.details}"`,
        log.txHash || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-400';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Audit Trail Viewer</h2>
        <p className="text-gray-600">View and export comprehensive audit logs</p>
      </div>

      <Card className="bg-gray-100 border-gray-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-gray-900">Audit Logs</CardTitle>
              <CardDescription className="text-gray-600">
                Complete audit trail of all XRPL operations
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleLoadLogs}
                disabled={isLoading}
                size="sm"
                className="bg-gray-100 hover:bg-white/20"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
              </Button>
              <Button
                onClick={exportLogs}
                disabled={filteredLogs.length === 0}
                size="sm"
                className="bg-green-500/80 hover:bg-green-600"
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-gray-900">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterAction" className="text-gray-900">Action Type</Label>
              <select
                id="filterAction"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="all">All Actions</option>
                <option value="mpt">MPT Operations</option>
                <option value="did">DID Operations</option>
                <option value="credential">Credential Operations</option>
                <option value="domain">Domain Operations</option>
                <option value="amm">AMM Operations</option>
                <option value="lending">Lending Operations</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterStatus" className="text-gray-900">Status</Label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Load Logs Button */}
          {auditLogs.length === 0 && (
            <Button
              onClick={handleLoadLogs}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading Audit Logs...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Load Audit Logs
                </>
              )}
            </Button>
          )}

          {/* Audit Logs List */}
          {filteredLogs.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Showing {filteredLogs.length} of {auditLogs.length} logs
                </p>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <h4 className="text-gray-900 font-semibold">{log.action.replace(/_/g, ' ')}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(log.status)}`}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <span className="text-gray-600">Resource:</span>
                        <p className="text-gray-900 font-mono text-xs">{log.resource}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Timestamp:</span>
                        <p className="text-gray-900 text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm mb-2">
                      <span className="text-gray-600">Details:</span>
                      <p className="text-gray-900 text-xs">{log.details}</p>
                    </div>

                    {log.txHash && (
                      <div className="text-sm">
                        <span className="text-gray-600">TX Hash:</span>
                        <p className="text-gray-900 font-mono text-xs">{log.txHash}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {auditLogs.length > 0 && filteredLogs.length === 0 && (
            <Alert className="bg-yellow-500/20 border-yellow-500/50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-green-800">
                No logs match your search criteria. Try adjusting your filters.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

