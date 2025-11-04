import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { 
  Building2, 
  Shield, 
  TrendingUp, 
  Settings, 
  FileText, 
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Minus,
  Info,
  Wallet,
  Coins
} from "lucide-react";

interface InstitutionalFundCreatorProps {
  onClose: () => void;
  onSuccess?: (fundId: string) => void;
  xrplAccount?: string | null;
}

export function InstitutionalFundCreator({ onClose, onSuccess, xrplAccount }: InstitutionalFundCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    symbol: "",
    description: "",
    fundType: "hedge_fund" as const,
    
    // Strategy
    strategy: {
      primary: "",
      secondary: "",
      benchmark: "",
      targetReturn: 0,
      riskBudget: 0
    },
    
    // Structure
    structure: {
      domicile: "",
      legalStructure: "limited_partnership" as const,
      masterFeeder: false,
      sidePockets: false
    },
    
    // Terms
    terms: {
      minimumInvestment: 1000000,
      managementFee: 2.0,
      performanceFee: 20.0,
      hurdle: 0,
      highWaterMark: true,
      lockupPeriod: 12,
      redemptionFrequency: "quarterly" as const,
      noticePeriod: 90,
      gatePeriod: 0
    },
    
    // Compliance
    compliance: {
      regulatoryFramework: [] as string[],
      investorRestrictions: {
        maxInvestors: 100,
        accreditedOnly: true,
        institutionalOnly: false,
        geographicRestrictions: [] as string[]
      },
      reportingRequirements: [] as string[],
      auditRequirements: {
        auditor: "",
        frequency: "annual",
        standards: [] as string[]
      }
    },
    
    // Risk Management
    riskManagement: {
      var95: 5.0,
      var99: 8.0,
      maxDrawdown: 15.0,
      leverageLimit: 3.0,
      concentrationLimits: {
        singlePosition: 10.0,
        sector: 25.0,
        geography: 40.0
      },
      stressTestScenarios: [] as string[]
    },
    
    // Operational Setup
    operationalSetup: {
      administrator: "",
      custodian: "",
      primebroker: "",
      legalCounsel: "",
      complianceOfficer: ""
    },
    
    // MPT Token Settings
    mptSettings: {
      totalSupply: "1000000000", // 1 billion tokens
      decimals: 6,
      transferFee: 0,
      flags: {
        canLock: false,
        requireAuth: true,
        canEscrow: true,
        canTrade: true,
        transferable: true,
        canClawback: true
      }
    }
  });

  const createFund = useMutation(api.funds.institutional_management.createInstitutionalFund);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingMPT, setIsCreatingMPT] = useState(false);
  const [mptId, setMptId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const steps = [
    { id: 1, title: "Basic Information", icon: Building2 },
    { id: 2, title: "Strategy & Structure", icon: TrendingUp },
    { id: 3, title: "Terms & Fees", icon: FileText },
    { id: 4, title: "Compliance", icon: Shield },
    { id: 5, title: "Risk Management", icon: AlertTriangle },
    { id: 6, title: "Operational Setup", icon: Settings },
    { id: 7, title: "Token Settings", icon: Coins }
  ];

  const fundTypes = [
    { value: "hedge_fund", label: "Hedge Fund" },
    { value: "private_equity", label: "Private Equity" },
    { value: "real_estate", label: "Real Estate" },
    { value: "structured_credit", label: "Structured Credit" },
    { value: "multi_strategy", label: "Multi-Strategy" },
    { value: "quantitative", label: "Quantitative" },
    { value: "distressed_debt", label: "Distressed Debt" },
    { value: "infrastructure", label: "Infrastructure" }
  ];

  const legalStructures = [
    { value: "limited_partnership", label: "Limited Partnership" },
    { value: "corporation", label: "Corporation" },
    { value: "trust", label: "Trust" },
    { value: "llc", label: "LLC" }
  ];

  const redemptionFrequencies = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "semi_annual", label: "Semi-Annual" },
    { value: "annual", label: "Annual" }
  ];

  const jurisdictions = [
    "United States", "United Kingdom", "Switzerland", "Luxembourg", 
    "Singapore", "Hong Kong", "Cayman Islands", "British Virgin Islands",
    "Ireland", "Netherlands", "Germany", "France", "Canada", "Australia"
  ];

  const regulatoryFrameworks = [
    "SEC (US)", "FCA (UK)", "FINMA (Switzerland)", "MAS (Singapore)",
    "SFC (Hong Kong)", "CSSF (Luxembourg)", "ESMA (EU)", "ASIC (Australia)"
  ];

  const auditStandards = [
    "US GAAP", "IFRS", "AIFMD", "UCITS", "Sarbanes-Oxley", "Basel III"
  ];

  // Function to create MPT token on XRPL Testnet
  const createMPTToken = async () => {
    if (!xrplAccount) {
      alert("Please connect your Xaman wallet first");
      return;
    }
    
    setIsCreatingMPT(true);
    try {
      // Call the backend to prepare the MPT token creation
      const response = await fetch('/api/create-mpt-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issuerSeed: "YOUR_ISSUER_SEED", // In a real implementation, this would be securely provided
          metadata: {
            name: formData.name,
            symbol: formData.symbol,
            description: formData.description,
            totalSupply: formData.mptSettings.totalSupply,
            decimals: formData.mptSettings.decimals,
            uri: `https://institutionalfund.xrpl.org/token/${formData.symbol}`
          },
          transferFee: formData.mptSettings.transferFee,
          flags: formData.mptSettings.flags
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMptId(result.mptId);
        setTxHash(result.txHash);
        
        alert(`MPT Token created successfully!\nToken ID: ${result.mptId}\nTransaction Hash: ${result.txHash}\nView on Testnet Explorer: ${result.explorerUrl}`);
      } else {
        throw new Error(result.error || 'Failed to create MPT token');
      }
    } catch (error) {
      console.error("Failed to create MPT token:", error);
      alert(`Failed to create MPT token: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCreatingMPT(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const fundId = await createFund(formData);
      onSuccess?.(fundId);
      onClose();
    } catch (error) {
      console.error("Failed to create fund:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToArray = (path: string, value: string) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const finalKey = keys[keys.length - 1];
    if (!current[finalKey].includes(value)) {
      current[finalKey] = [...current[finalKey], value];
      setFormData(newData);
    }
  };

  const removeFromArray = (path: string, value: string) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const finalKey = keys[keys.length - 1];
    current[finalKey] = current[finalKey].filter((item: string) => item !== value);
    setFormData(newData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fund Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Global Opportunities Fund"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fund Symbol *
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., GOF"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fund Type *
              </label>
              <select
                value={formData.fundType}
                onChange={(e) => setFormData({ ...formData, fundType: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fundTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the fund's investment strategy and objectives..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Strategy *
                </label>
                <input
                  type="text"
                  value={formData.strategy.primary}
                  onChange={(e) => setFormData({
                    ...formData,
                    strategy: { ...formData.strategy, primary: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Long/Short Equity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Strategy
                </label>
                <input
                  type="text"
                  value={formData.strategy.secondary || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    strategy: { ...formData.strategy, secondary: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Event Driven"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benchmark *
                </label>
                <input
                  type="text"
                  value={formData.strategy.benchmark}
                  onChange={(e) => setFormData({
                    ...formData,
                    strategy: { ...formData.strategy, benchmark: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., S&P 500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Return (% annually) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.strategy.targetReturn}
                  onChange={(e) => setFormData({
                    ...formData,
                    strategy: { ...formData.strategy, targetReturn: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Fund Structure</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domicile *
                  </label>
                  <select
                    value={formData.structure.domicile}
                    onChange={(e) => setFormData({
                      ...formData,
                      structure: { ...formData.structure, domicile: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select domicile</option>
                    {jurisdictions.map(jurisdiction => (
                      <option key={jurisdiction} value={jurisdiction}>
                        {jurisdiction}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Structure *
                  </label>
                  <select
                    value={formData.structure.legalStructure}
                    onChange={(e) => setFormData({
                      ...formData,
                      structure: { ...formData.structure, legalStructure: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {legalStructures.map(structure => (
                      <option key={structure.value} value={structure.value}>
                        {structure.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="masterFeeder"
                    checked={formData.structure.masterFeeder}
                    onChange={(e) => setFormData({
                      ...formData,
                      structure: { ...formData.structure, masterFeeder: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="masterFeeder" className="ml-2 text-sm text-gray-700">
                    Master-Feeder Structure
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sidePockets"
                    checked={formData.structure.sidePockets}
                    onChange={(e) => setFormData({
                      ...formData,
                      structure: { ...formData.structure, sidePockets: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sidePockets" className="ml-2 text-sm text-gray-700">
                    Side Pockets Allowed
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Investment (USD) *
                </label>
                <input
                  type="number"
                  value={formData.terms.minimumInvestment}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, minimumInvestment: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lockup Period (months) *
                </label>
                <input
                  type="number"
                  value={formData.terms.lockupPeriod}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, lockupPeriod: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Management Fee (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.terms.managementFee}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, managementFee: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Performance Fee (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.terms.performanceFee}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, performanceFee: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hurdle Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.terms.hurdle || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, hurdle: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redemption Frequency *
                </label>
                <select
                  value={formData.terms.redemptionFrequency}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, redemptionFrequency: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {redemptionFrequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Period (days) *
                </label>
                <input
                  type="number"
                  value={formData.terms.noticePeriod}
                  onChange={(e) => setFormData({
                    ...formData,
                    terms: { ...formData.terms, noticePeriod: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="highWaterMark"
                checked={formData.terms.highWaterMark}
                onChange={(e) => setFormData({
                  ...formData,
                  terms: { ...formData.terms, highWaterMark: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="highWaterMark" className="ml-2 text-sm text-gray-700">
                High Water Mark
              </label>
              <Info className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regulatory Framework
              </label>
              <div className="space-y-2">
                {regulatoryFrameworks.map(framework => (
                  <div key={framework} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{framework}</span>
                    {formData.compliance.regulatoryFramework.includes(framework) ? (
                      <button
                        type="button"
                        onClick={() => removeFromArray('compliance.regulatoryFramework', framework)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToArray('compliance.regulatoryFramework', framework)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Investors *
                </label>
                <input
                  type="number"
                  value={formData.compliance.investorRestrictions.maxInvestors}
                  onChange={(e) => setFormData({
                    ...formData,
                    compliance: {
                      ...formData.compliance,
                      investorRestrictions: {
                        ...formData.compliance.investorRestrictions,
                        maxInvestors: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auditor *
                </label>
                <input
                  type="text"
                  value={formData.compliance.auditRequirements.auditor}
                  onChange={(e) => setFormData({
                    ...formData,
                    compliance: {
                      ...formData.compliance,
                      auditRequirements: {
                        ...formData.compliance.auditRequirements,
                        auditor: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., PwC, Deloitte, KPMG"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accreditedOnly"
                  checked={formData.compliance.investorRestrictions.accreditedOnly}
                  onChange={(e) => setFormData({
                    ...formData,
                    compliance: {
                      ...formData.compliance,
                      investorRestrictions: {
                        ...formData.compliance.investorRestrictions,
                        accreditedOnly: e.target.checked
                      }
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="accreditedOnly" className="ml-2 text-sm text-gray-700">
                  Accredited Investors Only
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="institutionalOnly"
                  checked={formData.compliance.investorRestrictions.institutionalOnly}
                  onChange={(e) => setFormData({
                    ...formData,
                    compliance: {
                      ...formData.compliance,
                      investorRestrictions: {
                        ...formData.compliance.investorRestrictions,
                        institutionalOnly: e.target.checked
                      }
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="institutionalOnly" className="ml-2 text-sm text-gray-700">
                  Institutional Investors Only
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VaR 95% (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.riskManagement.var95}
                  onChange={(e) => setFormData({
                    ...formData,
                    riskManagement: { ...formData.riskManagement, var95: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VaR 99% (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.riskManagement.var99}
                  onChange={(e) => setFormData({
                    ...formData,
                    riskManagement: { ...formData.riskManagement, var99: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Drawdown (%) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.riskManagement.maxDrawdown}
                  onChange={(e) => setFormData({
                    ...formData,
                    riskManagement: { ...formData.riskManagement, maxDrawdown: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leverage Limit (x) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.riskManagement.leverageLimit}
                  onChange={(e) => setFormData({
                    ...formData,
                    riskManagement: { ...formData.riskManagement, leverageLimit: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Concentration Limits (%)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Single Position *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.riskManagement.concentrationLimits.singlePosition}
                    onChange={(e) => setFormData({
                      ...formData,
                      riskManagement: {
                        ...formData.riskManagement,
                        concentrationLimits: {
                          ...formData.riskManagement.concentrationLimits,
                          singlePosition: parseFloat(e.target.value) || 0
                        }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sector *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.riskManagement.concentrationLimits.sector}
                    onChange={(e) => setFormData({
                      ...formData,
                      riskManagement: {
                        ...formData.riskManagement,
                        concentrationLimits: {
                          ...formData.riskManagement.concentrationLimits,
                          sector: parseFloat(e.target.value) || 0
                        }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geography *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.riskManagement.concentrationLimits.geography}
                    onChange={(e) => setFormData({
                      ...formData,
                      riskManagement: {
                        ...formData.riskManagement,
                        concentrationLimits: {
                          ...formData.riskManagement.concentrationLimits,
                          geography: parseFloat(e.target.value) || 0
                        }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrator *
                </label>
                <input
                  type="text"
                  value={formData.operationalSetup.administrator}
                  onChange={(e) => setFormData({
                    ...formData,
                    operationalSetup: { ...formData.operationalSetup, administrator: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., SS&C, BNY Mellon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custodian *
                </label>
                <input
                  type="text"
                  value={formData.operationalSetup.custodian}
                  onChange={(e) => setFormData({
                    ...formData,
                    operationalSetup: { ...formData.operationalSetup, custodian: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., JPMorgan, Goldman Sachs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prime Broker
                </label>
                <input
                  type="text"
                  value={formData.operationalSetup.primebroker || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    operationalSetup: { ...formData.operationalSetup, primebroker: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Morgan Stanley, Credit Suisse"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Counsel *
                </label>
                <input
                  type="text"
                  value={formData.operationalSetup.legalCounsel}
                  onChange={(e) => setFormData({
                    ...formData,
                    operationalSetup: { ...formData.operationalSetup, legalCounsel: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Clifford Chance, Skadden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Officer *
              </label>
              <input
                type="text"
                value={formData.operationalSetup.complianceOfficer}
                onChange={(e) => setFormData({
                  ...formData,
                  operationalSetup: { ...formData.operationalSetup, complianceOfficer: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name of designated compliance officer"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Supply *
                </label>
                <input
                  type="number"
                  value={formData.mptSettings.totalSupply}
                  onChange={(e) => setFormData({
                    ...formData,
                    mptSettings: { ...formData.mptSettings, totalSupply: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1000000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimals *
                </label>
                <input
                  type="number"
                  value={formData.mptSettings.decimals}
                  onChange={(e) => setFormData({
                    ...formData,
                    mptSettings: { ...formData.mptSettings, decimals: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 6"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transfer Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.mptSettings.transferFee}
                  onChange={(e) => setFormData({
                    ...formData,
                    mptSettings: { ...formData.mptSettings, transferFee: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Token Flags</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="canLock"
                    checked={formData.mptSettings.flags.canLock}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          canLock: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="canLock" className="ml-2 text-sm text-gray-700">
                    Can Lock
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireAuth"
                    checked={formData.mptSettings.flags.requireAuth}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          requireAuth: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requireAuth" className="ml-2 text-sm text-gray-700">
                    Require Auth
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="canEscrow"
                    checked={formData.mptSettings.flags.canEscrow}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          canEscrow: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="canEscrow" className="ml-2 text-sm text-gray-700">
                    Can Escrow
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="canTrade"
                    checked={formData.mptSettings.flags.canTrade}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          canTrade: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="canTrade" className="ml-2 text-sm text-gray-700">
                    Can Trade
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="transferable"
                    checked={formData.mptSettings.flags.transferable}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          transferable: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="transferable" className="ml-2 text-sm text-gray-700">
                    Transferable
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="canClawback"
                    checked={formData.mptSettings.flags.canClawback}
                    onChange={(e) => setFormData({
                      ...formData,
                      mptSettings: {
                        ...formData.mptSettings,
                        flags: {
                          ...formData.mptSettings.flags,
                          canClawback: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="canClawback" className="ml-2 text-sm text-gray-700">
                    Can Clawback
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                onClick={createMPTToken}
                disabled={isCreatingMPT}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isCreatingMPT ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Token...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span>Create MPT Token</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.symbol && formData.description && formData.fundType;
      case 2:
        return formData.strategy.primary && formData.strategy.benchmark && formData.structure.domicile;
      case 3:
        return formData.terms.minimumInvestment > 0 && formData.terms.managementFee >= 0 && formData.terms.performanceFee >= 0;
      case 4:
        return formData.compliance.auditRequirements.auditor;
      case 5:
        return formData.riskManagement.var95 > 0 && formData.riskManagement.maxDrawdown > 0;
      case 6:
        return formData.operationalSetup.administrator && formData.operationalSetup.custodian && formData.operationalSetup.legalCounsel && formData.operationalSetup.complianceOfficer;
      case 7:
        return parseInt(formData.mptSettings.totalSupply) > 0 && formData.mptSettings.decimals >= 0;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Create Institutional Fund</h2>
              <p className="text-blue-100 mt-1">Professional-grade fund setup with comprehensive compliance</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[60vh]">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-3">
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Fund...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Create Fund</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
