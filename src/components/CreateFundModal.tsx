import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X } from "lucide-react";
import { toast } from "sonner";

interface CreateFundModalProps {
  onClose: () => void;
}

export function CreateFundModal({ onClose }: CreateFundModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    fundType: "securities" as const,
    jurisdiction: "US",
    totalSupply: 1000000,
    minimumInvestment: 10000,
    maximumInvestment: "",
    kycRequired: true,
    amlRequired: true,
    accreditedOnly: false,
    jurisdictionRestrictions: [] as string[],
    prospectusHash: "",
    isin: "",
    custodian: "",
    auditor: ""
  });

  const createFund = useMutation(api.funds.management.createFund);
  const createXRPLAccount = useAction(api.xrpl.client.createXRPLAccount);
  const createMPT = useAction(api.xrpl.mpt.createMPT);
  const updateFundStatus = useMutation(api.funds.management.updateFundStatus);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create fund record
      const fundId = await createFund({
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        fundType: formData.fundType,
        jurisdiction: formData.jurisdiction,
        totalSupply: formData.totalSupply,
        complianceRules: {
          kycRequired: formData.kycRequired,
          amlRequired: formData.amlRequired,
          accreditedOnly: formData.accreditedOnly,
          jurisdictionRestrictions: formData.jurisdictionRestrictions,
          minimumInvestment: formData.minimumInvestment,
          maximumInvestment: formData.maximumInvestment ? parseFloat(formData.maximumInvestment) : undefined
        },
        metadata: {
          prospectusHash: formData.prospectusHash,
          isin: formData.isin || undefined,
          custodian: formData.custodian,
          auditor: formData.auditor
        }
      });

      // 2. Create XRPL account for the fund
      const accountResult = await createXRPLAccount({ fundWallet: true });
      
      if (!accountResult.success) {
        throw new Error("Failed to create XRPL account");
      }

      // 3. Create MPT token for fund shares
      const mptResult = await createMPT({
        issuerPrivateKey: accountResult.account?.privateKey || "",
        metadata: {
          name: formData.name,
          symbol: formData.symbol,
          description: formData.description,
          totalSupply: formData.totalSupply,
          decimals: 6
        },
        flags: {
          transferable: true,
          burnable: true,
          onlyXRP: false,
          trustLine: true,
          requireAuth: true
        }
      });

      if (!mptResult.success) {
        throw new Error("Failed to create MPT token");
      }

      // 4. Update fund with XRPL details and activate
      await updateFundStatus({
        fundId: fundId,
        status: "active",
        xrplAccount: accountResult.account?.address || "",
        mptTokenId: mptResult.mptId
      });

      toast.success("Fund created successfully!");
      onClose();
    } catch (error) {
      console.error("Fund creation failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create fund");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Fund</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fund Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Global Tech Fund"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symbol *
                </label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., GTF"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the fund's investment strategy and objectives"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fund Type *
                </label>
                <select
                  value={formData.fundType}
                  onChange={(e) => setFormData({ ...formData, fundType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="securities">Securities</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="money_market">Money Market</option>
                  <option value="structured_credit">Structured Credit</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurisdiction *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., US, EU, SG"
                />
              </div>
            </div>
          </div>

          {/* Token Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Token Configuration</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Supply *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.totalSupply}
                onChange={(e) => setFormData({ ...formData, totalSupply: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Compliance Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Compliance Rules</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Investment *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.minimumInvestment}
                  onChange={(e) => setFormData({ ...formData, minimumInvestment: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Investment
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maximumInvestment}
                  onChange={(e) => setFormData({ ...formData, maximumInvestment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="kycRequired"
                  checked={formData.kycRequired}
                  onChange={(e) => setFormData({ ...formData, kycRequired: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="kycRequired" className="ml-2 text-sm text-gray-700">
                  KYC Required
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amlRequired"
                  checked={formData.amlRequired}
                  onChange={(e) => setFormData({ ...formData, amlRequired: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="amlRequired" className="ml-2 text-sm text-gray-700">
                  AML Required
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accreditedOnly"
                  checked={formData.accreditedOnly}
                  onChange={(e) => setFormData({ ...formData, accreditedOnly: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="accreditedOnly" className="ml-2 text-sm text-gray-700">
                  Accredited Investors Only
                </label>
              </div>
            </div>
          </div>

          {/* Fund Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Fund Metadata</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custodian *
                </label>
                <input
                  type="text"
                  required
                  value={formData.custodian}
                  onChange={(e) => setFormData({ ...formData, custodian: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bank of New York Mellon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auditor *
                </label>
                <input
                  type="text"
                  required
                  value={formData.auditor}
                  onChange={(e) => setFormData({ ...formData, auditor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PwC"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prospectus Hash *
              </label>
              <input
                type="text"
                required
                value={formData.prospectusHash}
                onChange={(e) => setFormData({ ...formData, prospectusHash: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SHA-256 hash of the fund prospectus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISIN (Optional)
              </label>
              <input
                type="text"
                value={formData.isin}
                onChange={(e) => setFormData({ ...formData, isin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., US1234567890"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Fund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
