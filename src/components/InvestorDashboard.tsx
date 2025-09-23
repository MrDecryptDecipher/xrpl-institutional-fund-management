import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { User, Shield, TrendingUp, Wallet, Plus } from "lucide-react";
import { InvestorRegistrationModal } from "./InvestorRegistrationModal";
import { FundInvestmentModal } from "./FundInvestmentModal";
import { Id } from "../../convex/_generated/dataModel";

export function InvestorDashboard() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState<Id<"funds"> | null>(null);

  const loggedInUser = useQuery(api.auth.loggedInUser);
  const investor = useQuery(api.investors.management.getInvestor, 
    loggedInUser ? { userId: loggedInUser._id } : "skip"
  );
  const holdings = useQuery(api.transactions.subscriptions.getInvestorHoldings, {});
  const activeFunds = useQuery(api.funds.management.getFunds, { status: "active" });

  const totalInvestment = holdings?.reduce((sum, holding) => sum + holding.totalInvested, 0) || 0;
  const currentValue = holdings?.reduce((sum, holding) => sum + holding.currentValue, 0) || 0;
  const totalReturn = currentValue - totalInvestment;
  const returnPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;

  const handleInvestInFund = (fundId: Id<"funds">) => {
    setSelectedFund(fundId);
    setShowInvestmentModal(true);
  };

  if (!investor) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Complete Investor Registration
        </h3>
        <p className="text-gray-600 mb-6">
          Register as an investor to access tokenized funds and manage your portfolio.
        </p>
        <button
          onClick={() => setShowRegistrationModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Register as Investor
        </button>

        {showRegistrationModal && (
          <InvestorRegistrationModal onClose={() => setShowRegistrationModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Investor Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Investor Status</h3>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">Verified Investor</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">KYC Status</p>
            <p className={`font-semibold ${
              investor.kycStatus === "verified" ? "text-green-600" : 
              investor.kycStatus === "pending" ? "text-yellow-600" : "text-red-600"
            }`}>
              {investor.kycStatus.toUpperCase()}
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">AML Status</p>
            <p className={`font-semibold ${
              investor.amlStatus === "cleared" ? "text-green-600" : 
              investor.amlStatus === "pending" ? "text-yellow-600" : "text-red-600"
            }`}>
              {investor.amlStatus.toUpperCase()}
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Accreditation</p>
            <p className="font-semibold text-gray-900">
              {investor.accreditationStatus.replace("_", " ").toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Invested</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalInvestment.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${currentValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${totalReturn >= 0 ? "bg-green-100" : "bg-red-100"}`}>
              <TrendingUp className={`h-6 w-6 ${totalReturn >= 0 ? "text-green-600" : "text-red-600"}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Return</p>
              <p className={`text-2xl font-semibold ${totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${totalReturn.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${returnPercentage >= 0 ? "bg-green-100" : "bg-red-100"}`}>
              <TrendingUp className={`h-6 w-6 ${returnPercentage >= 0 ? "text-green-600" : "text-red-600"}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Return %</p>
              <p className={`text-2xl font-semibold ${returnPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                {returnPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Holdings</h3>
        </div>
        <div className="p-6">
          {holdings && holdings.length > 0 ? (
            <div className="space-y-4">
              {holdings.map((holding) => (
                <div key={holding._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{holding.fund?.name}</h4>
                    <p className="text-sm text-gray-600">{holding.fund?.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{holding.shareTokens.toLocaleString()} shares</p>
                    <p className="text-sm text-gray-600">${holding.currentValue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No holdings yet. Start investing in funds below.</p>
            </div>
          )}
        </div>
      </div>

      {/* Available Funds */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Funds</h3>
        </div>
        <div className="p-6">
          {activeFunds && activeFunds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeFunds.map((fund) => (
                <div key={fund._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{fund.name}</h4>
                      <p className="text-sm text-gray-600">{fund.symbol}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{fund.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">NAV:</span>
                      <span className="font-medium">${fund.nav.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Min Investment:</span>
                      <span className="font-medium">${fund.complianceRules.minimumInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleInvestInFund(fund._id)}
                    className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Invest
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No active funds available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showInvestmentModal && selectedFund && (
        <FundInvestmentModal 
          fundId={selectedFund}
          onClose={() => {
            setShowInvestmentModal(false);
            setSelectedFund(null);
          }} 
        />
      )}
    </div>
  );
}
