import { useState } from "react";
import { TransactionExecutor } from "./TransactionExecutor";
import { CompliancePermissioning } from "./CompliancePermissioning";
import { GovernanceDashboard } from "./GovernanceDashboard";
import { InstitutionalReporting } from "./InstitutionalReporting";

export function DashboardTest() {
  const [activeTab, setActiveTab] = useState<"transaction" | "compliance" | "governance" | "reporting">("transaction");
  const [xrplAccount, setXrplAccount] = useState<string | null>(null);

  // Function to simulate connecting an account
  const connectAccount = () => {
    setXrplAccount("rNCFjv8Ek5oDrNiMJ3pw6eLLuWwNMJezD9");
  };

  // Function to disconnect account
  const disconnectAccount = () => {
    setXrplAccount(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard Component Test</h1>
      
      <div className="mb-6">
        <button 
          onClick={connectAccount}
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
        >
          Connect Account
        </button>
        <button 
          onClick={disconnectAccount}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Disconnect Account
        </button>
        <p className="mt-2">Connected Account: {xrplAccount || "None"}</p>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("transaction")}
          className={`px-4 py-2 rounded ${activeTab === "transaction" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Transaction Executor
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`px-4 py-2 rounded ${activeTab === "compliance" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Compliance
        </button>
        <button
          onClick={() => setActiveTab("governance")}
          className={`px-4 py-2 rounded ${activeTab === "governance" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Governance
        </button>
        <button
          onClick={() => setActiveTab("reporting")}
          className={`px-4 py-2 rounded ${activeTab === "reporting" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Reporting
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === "transaction" && (
          <TransactionExecutor 
            xrplAccount={xrplAccount}
            onTransactionComplete={(result: any) => console.log("Transaction completed:", result)}
          />
        )}
        
        {activeTab === "compliance" && (
          <CompliancePermissioning xrplAccount={xrplAccount} />
        )}
        
        {activeTab === "governance" && (
          <GovernanceDashboard xrplAccount={xrplAccount} />
        )}
        
        {activeTab === "reporting" && (
          <InstitutionalReporting xrplAccount={xrplAccount} />
        )}
      </div>
    </div>
  );
}

export default DashboardTest;