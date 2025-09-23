import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";

interface FundCardProps {
  fund: Doc<"funds">;
}

export function FundCard({ fund }: FundCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFundTypeLabel = (type: string) => {
    switch (type) {
      case "money_market":
        return "Money Market";
      case "real_estate":
        return "Real Estate";
      case "structured_credit":
        return "Structured Credit";
      case "hybrid":
        return "Hybrid";
      case "securities":
        return "Securities";
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{fund.name}</h3>
          <p className="text-sm text-gray-600">{fund.symbol}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fund.status)}`}>
          {fund.status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{fund.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Fund Type</span>
          <span className="text-sm font-medium text-gray-900">{getFundTypeLabel(fund.fundType)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Jurisdiction</span>
          <span className="text-sm font-medium text-gray-900">{fund.jurisdiction}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">NAV</span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">${fund.nav.toFixed(2)}</span>
            {fund.nav >= 1 ? (
              <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">AUM</span>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm font-medium text-gray-900">${fund.aum.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Supply</span>
          <span className="text-sm font-medium text-gray-900">{fund.totalSupply.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Created {new Date(fund.metadata.inceptionDate).toLocaleDateString()}</span>
          {fund.xrplAccount && (
            <span className="truncate ml-2" title={fund.xrplAccount}>
              XRPL: {fund.xrplAccount.slice(0, 8)}...
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View Details
        </button>
        <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Manage
        </button>
      </div>
    </div>
  );
}
