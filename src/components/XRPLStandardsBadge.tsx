import React from 'react';
import { Network, Shield, UserCheck, Lock, Zap } from 'lucide-react';

/**
 * XRPL Standards Compliance Badge Component
 * Displays compliance with XRPL standards (XLS-33, XLS-40, XLS-80)
 */
const XRPLStandardsBadge: React.FC = () => {
  const standards = [
    { 
      name: 'XLS-33', 
      description: 'Multi-Purpose Tokens (MPT)', 
      status: 'Compliant',
      icon: Zap
    },
    { 
      name: 'XLS-40', 
      description: 'Decentralized Identifiers (DID)', 
      status: 'Compliant',
      icon: UserCheck
    },
    { 
      name: 'XLS-80', 
      description: 'Permissioned Domains', 
      status: 'Compliant',
      icon: Lock
    },
    { 
      name: 'XLS-65/66', 
      description: 'Native Lending Protocol', 
      status: 'Compliant',
      icon: Shield
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">XRPL Standards Integration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {standards.map((standard) => {
          const Icon = standard.icon;
          return (
            <div 
              key={standard.name} 
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900">{standard.name}</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {standard.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{standard.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 rounded-xl p-6 text-white text-center">
        <div className="flex items-center justify-center mb-3">
          <Network className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Institutional Grade Implementation</span>
        </div>
        <p className="text-blue-200">
          Full compliance with XRPL standards ensuring zero vendor lock-in and complete ledger-side validation
        </p>
      </div>
    </div>
  );
};

export default XRPLStandardsBadge;