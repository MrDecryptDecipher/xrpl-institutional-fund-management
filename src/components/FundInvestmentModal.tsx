import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

interface FundInvestmentModalProps {
  fundId: Id<"funds">;
  onClose: () => void;
}

export function FundInvestmentModal({ fundId, onClose }: FundInvestmentModalProps) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fund = useQuery(api.funds.management.getFund, { fundId });
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const investor = useQuery(api.investors.management.getInvestor, 
    loggedInUser ? { userId: loggedInUser._id } : "skip"
  );
  const complianceCheck = useQuery(api.investors.management.validateInvestorCompliance,
    investor && fund ? { investorId: investor._id, fundId: fundId } : "skip"
  );

  const subscribeToFund = useMutation(api.transactions.subscriptions.subscribeToFund);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!investor || !fund) return;

    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      toast.error("Please enter a valid investment amount");
      return;
    }

    if (investmentAmount < fund.complianceRules.minimumInvestment) {
      toast.error(`Minimum investment is $${fund.complianceRules.minimumInvestment.toLocaleString()}`);
      return;
    }

    if (fund.complianceRules.maximumInvestment && investmentAmount > fund.complianceRules.maximumInvestment) {
      toast.error(`Maximum investment is $${fund.complianceRules.maximumInvestment.toLocaleString()}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would involve actual XRPL transaction
      // For now, we'll simulate with a mock transaction hash
      const mockTxHash = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await subscribeToFund({
        fundId: fundId,
        amount: investmentAmount,
        xrplTxHash: mockTxHash
      });

      toast.success("Investment successful!");
      onClose();
    } catch (error) {
      console.error("Investment failed:", error);
      toast.error(error instanceof Error ? error.message : "Investment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!fund || !investor) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const shareTokens = amount ? parseFloat(amount) / fund.nav : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Invest in {fund.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Fund Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">{fund.name} ({fund.symbol})</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">NAV:</span>
                <span className="font-medium ml-2">${fund.nav.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-600">Min Investment:</span>
                <span className="font-medium ml-2">${fund.complianceRules.minimumInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Compliance Check */}
          {complianceCheck && !complianceCheck.isCompliant && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Compliance Issues</h4>
                  <ul className="text-sm text-red-700 mt-1 space-y-1">
                    {complianceCheck.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Investment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Amount (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min={fund.complianceRules.minimumInvestment}
                max={fund.complianceRules.maximumInvestment || undefined}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Min: $${fund.complianceRules.minimumInvestment.toLocaleString()}`}
                required
              />
            </div>

            {amount && shareTokens > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  You will receive approximately <strong>{shareTokens.toFixed(6)} share tokens</strong>
                </p>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Notice:</h4>
              <p className="text-sm text-yellow-700">
                This is a demo implementation. In production, this would integrate with actual XRPL 
                payment flows and compliance verification systems.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (complianceCheck && !complianceCheck.isCompliant)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Invest"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
