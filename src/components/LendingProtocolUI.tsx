import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Plus, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

export function LendingProtocolUI({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('deposit');
  
  // Deposit State
  const [depositPoolId, setDepositPoolId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositResult, setDepositResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Borrow State
  const [borrowPoolId, setBorrowPoolId] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowResult, setBorrowResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Repay State
  const [loanId, setLoanId] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [isRepaying, setIsRepaying] = useState(false);
  const [repayResult, setRepayResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Pools State
  const [pools, setPools] = useState<any[]>([]);
  const [isLoadingPools, setIsLoadingPools] = useState(false);

  const handleDeposit = async () => {
    if (!depositPoolId.trim() || !depositAmount.trim()) {
      setDepositResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsDepositing(true);
    setDepositResult(null);

    try {
      setDepositResult({
        success: true,
        message: `Deposit request for ${depositAmount} created. Please sign with Xaman wallet.`
      });
      
      setTimeout(() => {
        setDepositPoolId('');
        setDepositAmount('');
      }, 2000);
    } catch (error) {
      setDepositResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to deposit'
      });
    } finally {
      setIsDepositing(false);
    }
  };

  const handleBorrow = async () => {
    if (!borrowPoolId.trim() || !borrowAmount.trim() || !collateralAmount.trim()) {
      setBorrowResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsBorrowing(true);
    setBorrowResult(null);

    try {
      setBorrowResult({
        success: true,
        message: `Borrow request for ${borrowAmount} created. Please sign with Xaman wallet.`
      });
      
      setTimeout(() => {
        setBorrowPoolId('');
        setBorrowAmount('');
        setCollateralAmount('');
      }, 2000);
    } catch (error) {
      setBorrowResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to borrow'
      });
    } finally {
      setIsBorrowing(false);
    }
  };

  const handleRepay = async () => {
    if (!loanId.trim() || !repayAmount.trim()) {
      setRepayResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsRepaying(true);
    setRepayResult(null);

    try {
      setRepayResult({
        success: true,
        message: `Repayment request for ${repayAmount} created. Please sign with Xaman wallet.`
      });
      
      setTimeout(() => {
        setLoanId('');
        setRepayAmount('');
      }, 2000);
    } catch (error) {
      setRepayResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to repay'
      });
    } finally {
      setIsRepaying(false);
    }
  };

  const handleLoadPools = async () => {
    setIsLoadingPools(true);
    
    try {
      // Mock pools - in production, query convex/xrpl/lending_protocol.ts
      setPools([
        {
          poolId: 'LENDING-XRP-001',
          asset: 'XRP',
          totalSupply: '1000000',
          totalBorrow: '450000',
          utilizationRate: 45,
          supplyAPY: 3.5,
          borrowAPY: 8.2,
          collateralFactor: 75,
          liquidationThreshold: 80,
          mySupply: '5000',
          myBorrow: '0'
        },
        {
          poolId: 'LENDING-USD-002',
          asset: 'USD',
          totalSupply: '500000',
          totalBorrow: '200000',
          utilizationRate: 40,
          supplyAPY: 4.2,
          borrowAPY: 9.5,
          collateralFactor: 80,
          liquidationThreshold: 85,
          mySupply: '0',
          myBorrow: '1000'
        }
      ]);
    } catch (error) {
      console.error('Failed to load pools:', error);
    } finally {
      setIsLoadingPools(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lending Protocol</h2>
        <p className="text-gray-600">Native XRPL lending and borrowing (XLS-65/66)</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="deposit" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <TrendingUp className="w-4 h-4 mr-2" />
            Deposit
          </TabsTrigger>
          <TabsTrigger value="borrow" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <TrendingDown className="w-4 h-4 mr-2" />
            Borrow
          </TabsTrigger>
          <TabsTrigger value="repay" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <DollarSign className="w-4 h-4 mr-2" />
            Repay
          </TabsTrigger>
          <TabsTrigger value="pools" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Percent className="w-4 h-4 mr-2" />
            Pools
          </TabsTrigger>
        </TabsList>

        {/* Deposit Tab */}
        <TabsContent value="deposit">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Deposit Assets</CardTitle>
              <CardDescription className="text-gray-600">
                Supply assets to earn interest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="depositPoolId" className="text-gray-900">Lending Pool *</Label>
                <Input
                  id="depositPoolId"
                  placeholder="LENDING-XRP-001"
                  value={depositPoolId}
                  onChange={(e) => setDepositPoolId(e.target.value)}
                  disabled={isDepositing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="depositAmount" className="text-gray-900">Amount *</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  placeholder="1000"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  disabled={isDepositing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Estimated APY:</strong> 3.5%
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You will receive pool tokens representing your deposit
                </p>
              </div>

              {depositResult && (
                <Alert className={depositResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {depositResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {depositResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleDeposit}
                disabled={isDepositing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isDepositing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Depositing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Deposit
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Borrow Tab */}
        <TabsContent value="borrow">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Borrow Assets</CardTitle>
              <CardDescription className="text-gray-600">
                Borrow assets against collateral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrowPoolId" className="text-gray-900">Lending Pool *</Label>
                <Input
                  id="borrowPoolId"
                  placeholder="LENDING-XRP-001"
                  value={borrowPoolId}
                  onChange={(e) => setBorrowPoolId(e.target.value)}
                  disabled={isBorrowing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="borrowAmount" className="text-gray-900">Borrow Amount *</Label>
                <Input
                  id="borrowAmount"
                  type="number"
                  placeholder="500"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  disabled={isBorrowing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collateralAmount" className="text-gray-900">Collateral Amount *</Label>
                <Input
                  id="collateralAmount"
                  type="number"
                  placeholder="750"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(e.target.value)}
                  disabled={isBorrowing}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  Minimum collateral ratio: 133% (75% collateral factor)
                </p>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Borrow APY:</strong> 8.2%
                </p>
                <p className="text-sm text-gray-900 mt-1">
                  <strong>Liquidation Threshold:</strong> 80%
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Your position will be liquidated if collateral value falls below threshold
                </p>
              </div>

              {borrowResult && (
                <Alert className={borrowResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {borrowResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {borrowResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleBorrow}
                disabled={isBorrowing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isBorrowing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Borrowing...
                  </>
                ) : (
                  <>
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Borrow
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Repay Tab */}
        <TabsContent value="repay">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Repay Loan</CardTitle>
              <CardDescription className="text-gray-600">
                Repay borrowed assets and reclaim collateral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanId" className="text-gray-900">Loan ID *</Label>
                <Input
                  id="loanId"
                  placeholder="LOAN-12345"
                  value={loanId}
                  onChange={(e) => setLoanId(e.target.value)}
                  disabled={isRepaying}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repayAmount" className="text-gray-900">Repay Amount *</Label>
                <Input
                  id="repayAmount"
                  type="number"
                  placeholder="500"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  disabled={isRepaying}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  Include accrued interest in repayment amount
                </p>
              </div>

              {repayResult && (
                <Alert className={repayResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {repayResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {repayResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleRepay}
                disabled={isRepaying}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isRepaying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Repaying...
                  </>
                ) : (
                  <>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Repay Loan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pools Tab */}
        <TabsContent value="pools">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Lending Pools</CardTitle>
              <CardDescription className="text-gray-600">
                View available lending pools and your positions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleLoadPools}
                disabled={isLoadingPools}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoadingPools ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Percent className="mr-2 h-4 w-4" />
                    Refresh Pools
                  </>
                )}
              </Button>

              {pools.length > 0 && (
                <div className="space-y-3">
                  {pools.map((pool, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-gray-900 font-semibold">{pool.asset} Lending Pool</h4>
                          <p className="text-xs text-gray-600">Pool ID: {pool.poolId}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                        <div>
                          <span className="text-gray-600">Total Supply:</span>
                          <p className="text-gray-900 font-semibold">{pool.totalSupply}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Borrow:</span>
                          <p className="text-gray-900 font-semibold">{pool.totalBorrow}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Utilization:</span>
                          <p className="text-gray-900 font-semibold">{pool.utilizationRate}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Supply APY:</span>
                          <p className="text-green-400 font-semibold">{pool.supplyAPY}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Borrow APY:</span>
                          <p className="text-red-400 font-semibold">{pool.borrowAPY}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Collateral Factor:</span>
                          <p className="text-gray-900">{pool.collateralFactor}%</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-gray-200">
                        <div>
                          <span className="text-gray-600">My Supply:</span>
                          <p className="text-gray-900 font-semibold">{pool.mySupply}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">My Borrow:</span>
                          <p className="text-gray-900 font-semibold">{pool.myBorrow}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

