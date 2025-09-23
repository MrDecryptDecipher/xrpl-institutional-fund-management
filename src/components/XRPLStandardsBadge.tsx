import React from 'react';
import { Shield, Coins, Key, BarChart3, Network, Zap } from 'lucide-react';

export function XRPLStandardsBadge() {
  const xlsStandards = [
    {
      standard: "XLS-33",
      name: "Multi-Purpose Tokens (MPT)",
      description: "Configurable token issuance with transfer fees, authorized holders, and compliance controls",
      icon: Coins,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200"
    },
    {
      standard: "XLS-80",
      name: "Permissioned Domains",
      description: "Credential-gated access control with privacy-preserving verification",
      icon: Shield,
      color: "from-green-500 to-green-600",
      borderColor: "border-green-200"
    },
    {
      standard: "XLS-40",
      name: "Decentralized Identity (DID)",
      description: "W3C compliant identity with verifiable credentials for universal portability",
      icon: Key,
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200"
    },
    {
      standard: "XLS-65/66",
      name: "Native Lending Protocols",
      description: "On-chain lending with first-loss protection and automated interest computation",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-200"
    },
    {
      standard: "XLS-30",
      name: "AMM Integration",
      description: "Automated Market Making with liquidity provisioning and oracle integration",
      icon: Network,
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <Zap className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Built on Latest XRPL Standards</h3>
        </div>
        <p className="text-sm text-gray-600">Leveraging cutting-edge XRP Ledger primitives for institutional compliance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {xlsStandards.map((standard, index) => {
          const Icon = standard.icon;
          return (
            <div
              key={index}
              className={`relative group bg-gradient-to-r ${standard.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                      {standard.standard}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {standard.name}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2">
                    {standard.description}
                  </p>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Protocol implements all amendments according to latest XRPL specifications with zero semantic simplification
        </p>
      </div>
    </div>
  );
}