/**
 * Demo Data Generator for XRPL Institutional Fund Management Protocol
 * Generates realistic mock data for demo mode
 */

export interface DemoFund {
  _id: string;
  name: string;
  symbol: string;
  description: string;
  fundType: string;
  status: string;
  aum: number;
  nav: number;
  sharePrice: number;
  totalShares: number;
  minimumInvestment: number;
  managementFee: number;
  performanceFee: number;
  xrplAccount: string;
  mptTokenId?: string;
  riskProfile: string;
  inceptionDate: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
    ytd: number;
  };
}

export interface DemoTransaction {
  _id: string;
  fundId: string;
  type: string;
  amount: number;
  status: string;
  timestamp: number;
  txHash: string;
  explorerUrl: string;
  from: string;
  to: string;
}

export interface DemoInvestor {
  _id: string;
  name: string;
  email: string;
  xrplAccount: string;
  totalInvested: number;
  currentValue: number;
  returns: number;
  kycStatus: string;
  joinedDate: number;
}

// Generate realistic XRPL addresses
function generateXRPLAddress(): string {
  const chars = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
  let address = 'r';
  for (let i = 0; i < 33; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

// Generate realistic transaction hash
function generateTxHash(): string {
  const chars = '0123456789ABCDEF';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}

// Demo Funds
export const demoFunds: DemoFund[] = [
  {
    _id: 'demo_fund_1',
    name: 'Global Equity Growth Fund',
    symbol: 'GEGF',
    description: 'Diversified global equity portfolio focusing on growth stocks',
    fundType: 'equity',
    status: 'active',
    aum: 125000000,
    nav: 128500000,
    sharePrice: 1285.50,
    totalShares: 100000,
    minimumInvestment: 100000,
    managementFee: 1.5,
    performanceFee: 20,
    xrplAccount: generateXRPLAddress(),
    mptTokenId: '00000001' + generateTxHash().substring(0, 56),
    riskProfile: 'moderate',
    inceptionDate: Date.now() - (365 * 24 * 60 * 60 * 1000 * 3), // 3 years ago
    performance: {
      daily: 0.45,
      weekly: 2.1,
      monthly: 5.8,
      yearly: 18.5,
      ytd: 12.3,
    },
  },
  {
    _id: 'demo_fund_2',
    name: 'Fixed Income Stability Fund',
    symbol: 'FISF',
    description: 'Conservative fixed income portfolio with focus on capital preservation',
    fundType: 'fixed_income',
    status: 'active',
    aum: 85000000,
    nav: 86200000,
    sharePrice: 1024.75,
    totalShares: 84000,
    minimumInvestment: 50000,
    managementFee: 0.75,
    performanceFee: 10,
    xrplAccount: generateXRPLAddress(),
    mptTokenId: '00000002' + generateTxHash().substring(0, 56),
    riskProfile: 'conservative',
    inceptionDate: Date.now() - (365 * 24 * 60 * 60 * 1000 * 5), // 5 years ago
    performance: {
      daily: 0.12,
      weekly: 0.45,
      monthly: 1.8,
      yearly: 6.2,
      ytd: 4.1,
    },
  },
  {
    _id: 'demo_fund_3',
    name: 'Digital Assets Hedge Fund',
    symbol: 'DAHF',
    description: 'Actively managed cryptocurrency and digital asset portfolio',
    fundType: 'crypto',
    status: 'active',
    aum: 45000000,
    nav: 52300000,
    sharePrice: 1568.20,
    totalShares: 33333,
    minimumInvestment: 250000,
    managementFee: 2.0,
    performanceFee: 25,
    xrplAccount: generateXRPLAddress(),
    mptTokenId: '00000003' + generateTxHash().substring(0, 56),
    riskProfile: 'aggressive',
    inceptionDate: Date.now() - (365 * 24 * 60 * 60 * 1000 * 2), // 2 years ago
    performance: {
      daily: 1.85,
      weekly: 8.2,
      monthly: 22.5,
      yearly: 156.2,
      ytd: 98.7,
    },
  },
  {
    _id: 'demo_fund_4',
    name: 'Real Estate Investment Trust',
    symbol: 'REIT',
    description: 'Diversified commercial and residential real estate portfolio',
    fundType: 'real_estate',
    status: 'active',
    aum: 210000000,
    nav: 218400000,
    sharePrice: 2184.00,
    totalShares: 100000,
    minimumInvestment: 500000,
    managementFee: 1.25,
    performanceFee: 15,
    xrplAccount: generateXRPLAddress(),
    mptTokenId: '00000004' + generateTxHash().substring(0, 56),
    riskProfile: 'moderate',
    inceptionDate: Date.now() - (365 * 24 * 60 * 60 * 1000 * 7), // 7 years ago
    performance: {
      daily: 0.25,
      weekly: 1.2,
      monthly: 3.5,
      yearly: 12.8,
      ytd: 8.9,
    },
  },
  {
    _id: 'demo_fund_5',
    name: 'Multi-Strategy Absolute Return',
    symbol: 'MSAR',
    description: 'Quantitative multi-strategy fund targeting absolute returns',
    fundType: 'multi_strategy',
    status: 'active',
    aum: 175000000,
    nav: 182000000,
    sharePrice: 1456.80,
    totalShares: 125000,
    minimumInvestment: 1000000,
    managementFee: 2.5,
    performanceFee: 30,
    xrplAccount: generateXRPLAddress(),
    mptTokenId: '00000005' + generateTxHash().substring(0, 56),
    riskProfile: 'aggressive',
    inceptionDate: Date.now() - (365 * 24 * 60 * 60 * 1000 * 4), // 4 years ago
    performance: {
      daily: 0.68,
      weekly: 3.2,
      monthly: 8.9,
      yearly: 42.5,
      ytd: 28.3,
    },
  },
];

// Demo Transactions
export function generateDemoTransactions(count: number = 50): DemoTransaction[] {
  const transactions: DemoTransaction[] = [];
  const types = ['subscription', 'redemption', 'dividend', 'fee', 'rebalance'];
  const statuses = ['completed', 'pending', 'failed'];
  const networks = ['testnet', 'mainnet'];

  for (let i = 0; i < count; i++) {
    const txHash = generateTxHash();
    const network = networks[Math.floor(Math.random() * networks.length)];
    const explorerBase = network === 'testnet' 
      ? 'https://testnet.xrpl.org/transactions/'
      : 'https://livenet.xrpl.org/transactions/';

    transactions.push({
      _id: `demo_tx_${i + 1}`,
      fundId: demoFunds[Math.floor(Math.random() * demoFunds.length)]._id,
      type: types[Math.floor(Math.random() * types.length)],
      amount: Math.floor(Math.random() * 1000000) + 10000,
      status: i < 45 ? 'completed' : statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
      txHash,
      explorerUrl: explorerBase + txHash,
      from: generateXRPLAddress(),
      to: generateXRPLAddress(),
    });
  }

  return transactions.sort((a, b) => b.timestamp - a.timestamp);
}

// Demo Investors
export function generateDemoInvestors(count: number = 25): DemoInvestor[] {
  const investors: DemoInvestor[] = [];
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const kycStatuses = ['verified', 'pending', 'rejected'];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const totalInvested = Math.floor(Math.random() * 5000000) + 100000;
    const returnsPercent = (Math.random() * 40) - 10; // -10% to +30%
    const currentValue = totalInvested * (1 + returnsPercent / 100);

    investors.push({
      _id: `demo_investor_${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      xrplAccount: generateXRPLAddress(),
      totalInvested,
      currentValue,
      returns: returnsPercent,
      kycStatus: i < 20 ? 'verified' : kycStatuses[Math.floor(Math.random() * kycStatuses.length)],
      joinedDate: Date.now() - (Math.random() * 365 * 24 * 60 * 60 * 1000 * 3), // Last 3 years
    });
  }

  return investors.sort((a, b) => b.currentValue - a.currentValue);
}

// Analytics Data
export interface DemoAnalytics {
  totalAUM: number;
  totalInvestors: number;
  averageReturn: number;
  totalTransactions: number;
  performanceHistory: Array<{ date: number; value: number }>;
  assetAllocation: Array<{ name: string; value: number }>;
  riskMetrics: {
    var95: number;
    sharpeRatio: number;
    maxDrawdown: number;
    volatility: number;
  };
}

export function generateDemoAnalytics(): DemoAnalytics {
  const totalAUM = demoFunds.reduce((sum, fund) => sum + fund.aum, 0);
  const performanceHistory = [];
  
  // Generate 90 days of performance history
  for (let i = 90; i >= 0; i--) {
    const date = Date.now() - (i * 24 * 60 * 60 * 1000);
    const value = totalAUM * (0.85 + (Math.random() * 0.3)); // Fluctuate between 85% and 115%
    performanceHistory.push({ date, value });
  }

  return {
    totalAUM,
    totalInvestors: 247,
    averageReturn: 24.5,
    totalTransactions: 1523,
    performanceHistory,
    assetAllocation: [
      { name: 'Equities', value: 45 },
      { name: 'Fixed Income', value: 25 },
      { name: 'Real Estate', value: 15 },
      { name: 'Crypto', value: 10 },
      { name: 'Cash', value: 5 },
    ],
    riskMetrics: {
      var95: 2.5,
      sharpeRatio: 1.85,
      maxDrawdown: -12.3,
      volatility: 15.2,
    },
  };
}

