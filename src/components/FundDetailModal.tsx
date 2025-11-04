import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  X,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  RefreshCw,
  Download,
  Edit,
  Save,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface FundDetailModalProps {
  fund: any;
  isOpen: boolean;
  onClose: () => void;
  xrplAccount?: string;
}

export function FundDetailModal({ fund, isOpen, onClose, xrplAccount }: FundDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFund, setEditedFund] = useState(fund);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!fund) return null;

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRebalance = () => {
    alert('Rebalance functionality will trigger XRPL transactions via Xaman');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold gradient-text">
                {fund.name}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Fund Type: {fund.fundType} • Status: {fund.status || 'active'}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {saveSuccess && (
          <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl p-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800 font-medium">Changes saved successfully!</span>
          </div>
        )}

        <div className="space-y-6 mt-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Total AUM</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(fund.aum || fund.AUM || 0)}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">YTD Performance</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatPercentage(fund.ytdPerformance || fund.YTD || 0)}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Investors</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {fund.investorCount || fund.investors || 0}
              </p>
            </div>
          </div>

          {/* Fund Details */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Fund Details</h3>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    disabled={isSaving}
                    className="flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundName">Fund Name</Label>
                <Input
                  id="fundName"
                  value={isEditing ? editedFund.name : fund.name}
                  onChange={(e) => setEditedFund({ ...editedFund, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="fundType">Fund Type</Label>
                <Input
                  id="fundType"
                  value={isEditing ? editedFund.fundType : fund.fundType}
                  onChange={(e) => setEditedFund({ ...editedFund, fundType: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="managementFee">Management Fee (%)</Label>
                <Input
                  id="managementFee"
                  type="number"
                  step="0.01"
                  value={isEditing ? editedFund.managementFee || 2.0 : fund.managementFee || 2.0}
                  onChange={(e) => setEditedFund({ ...editedFund, managementFee: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="performanceFee">Performance Fee (%)</Label>
                <Input
                  id="performanceFee"
                  type="number"
                  step="0.01"
                  value={isEditing ? editedFund.performanceFee || 20.0 : fund.performanceFee || 20.0}
                  onChange={(e) => setEditedFund({ ...editedFund, performanceFee: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={handleRebalance}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
              >
                <RefreshCw className="w-4 h-4" />
                Rebalance Portfolio
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* XRPL Integration */}
          {xrplAccount && (
            <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 mb-1">XRPL Integration</p>
                  <p className="text-xs text-blue-800 mb-2">
                    This fund is connected to XRPL account: {xrplAccount.slice(0, 8)}...{xrplAccount.slice(-6)}
                  </p>
                  <a
                    href={`https://testnet.xrpl.org/accounts/${xrplAccount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View on XRPL Explorer
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

