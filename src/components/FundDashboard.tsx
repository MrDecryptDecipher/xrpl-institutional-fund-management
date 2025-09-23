import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Plus, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { CreateFundModal } from "./CreateFundModal";
import { FundCard } from "./FundCard";

export function FundDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const funds = useQuery(api.funds.management.getFunds, 
    loggedInUser ? { managerId: loggedInUser._id } : "skip"
  );

  const activeFunds = funds?.filter(fund => fund.status === "active") || [];
  const totalAUM = activeFunds.reduce((sum, fund) => sum + fund.aum, 0);
  const totalFunds = funds?.length || 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Funds</p>
              <p className="text-2xl font-semibold text-gray-900">{totalFunds}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total AUM</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${totalAUM.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Funds</p>
              <p className="text-2xl font-semibold text-gray-900">{activeFunds.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg NAV</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${activeFunds.length > 0 ? 
                  (activeFunds.reduce((sum, fund) => sum + fund.nav, 0) / activeFunds.length).toFixed(2) : 
                  "0.00"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Management Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Fund Portfolio</h3>
          <p className="text-sm text-gray-600">Manage your tokenized funds on XRPL</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Fund
        </button>
      </div>

      {/* Funds Grid */}
      {funds && funds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funds.map((fund) => (
            <FundCard key={fund._id} fund={fund} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No funds yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first tokenized fund.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Fund
            </button>
          </div>
        </div>
      )}

      {/* Create Fund Modal */}
      {showCreateModal && (
        <CreateFundModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
