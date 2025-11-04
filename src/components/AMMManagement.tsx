import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle2, AlertCircle, Plus, Droplet, Coins, TrendingUp, Vote } from 'lucide-react';

export function AMMManagement({ xrplAccount }: { xrplAccount: string }) {
  const [activeTab, setActiveTab] = useState('create');
  
  // Create AMM State
  const [asset1, setAsset1] = useState('XRP');
  const [asset2, setAsset2] = useState('');
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [tradingFee, setTradingFee] = useState('0.3');
  const [isCreating, setIsCreating] = useState(false);
  const [createResult, setCreateResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Add Liquidity State
  const [poolId, setPoolId] = useState('');
  const [liquidityAmount1, setLiquidityAmount1] = useState('');
  const [liquidityAmount2, setLiquidityAmount2] = useState('');
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);
  const [liquidityResult, setLiquidityResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // My Pools State
  const [pools, setPools] = useState<any[]>([]);
  const [isLoadingPools, setIsLoadingPools] = useState(false);
  
  // Vote State
  const [votePoolId, setVotePoolId] = useState('');
  const [voteFee, setVoteFee] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const [voteResult, setVoteResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateAMM = async () => {
    if (!asset2.trim() || !amount1.trim() || !amount2.trim()) {
      setCreateResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsCreating(true);
    setCreateResult(null);

    try {
      setCreateResult({
        success: true,
        message: `AMM pool creation request for ${asset1}/${asset2} created. Please sign with Xaman wallet.`
      });
      
      setTimeout(() => {
        setAsset2('');
        setAmount1('');
        setAmount2('');
      }, 2000);
    } catch (error) {
      setCreateResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create AMM'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddLiquidity = async () => {
    if (!poolId.trim() || !liquidityAmount1.trim() || !liquidityAmount2.trim()) {
      setLiquidityResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsAddingLiquidity(true);
    setLiquidityResult(null);

    try {
      setLiquidityResult({
        success: true,
        message: 'Liquidity addition request created. Please sign with Xaman wallet.'
      });
      
      setTimeout(() => {
        setPoolId('');
        setLiquidityAmount1('');
        setLiquidityAmount2('');
      }, 2000);
    } catch (error) {
      setLiquidityResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to add liquidity'
      });
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  const handleLoadPools = async () => {
    setIsLoadingPools(true);
    
    try {
      // Mock pools - in production, query convex/xrpl/amm_integration.ts
      setPools([
        {
          poolId: 'AMM-XRP-USD-001',
          asset1: 'XRP',
          asset2: 'USD',
          liquidity1: '10000',
          liquidity2: '5000',
          lpTokens: '7071.07',
          tradingFee: '0.3',
          myShare: '15.5'
        }
      ]);
    } catch (error) {
      console.error('Failed to load pools:', error);
    } finally {
      setIsLoadingPools(false);
    }
  };

  const handleVote = async () => {
    if (!votePoolId.trim() || !voteFee.trim()) {
      setVoteResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsVoting(true);
    setVoteResult(null);

    try {
      setVoteResult({
        success: true,
        message: 'Trading fee vote request created. Please sign with Xaman wallet.'
      });
      
      setTimeout(() => {
        setVotePoolId('');
        setVoteFee('');
      }, 2000);
    } catch (error) {
      setVoteResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to vote'
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AMM Management</h2>
        <p className="text-gray-600">Automated Market Maker pools and liquidity (XLS-30)</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="create" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Plus className="w-4 h-4 mr-2" />
            Create AMM
          </TabsTrigger>
          <TabsTrigger value="liquidity" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Droplet className="w-4 h-4 mr-2" />
            Add Liquidity
          </TabsTrigger>
          <TabsTrigger value="pools" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Coins className="w-4 h-4 mr-2" />
            My Pools
          </TabsTrigger>
          <TabsTrigger value="vote" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            <Vote className="w-4 h-4 mr-2" />
            Vote Fee
          </TabsTrigger>
        </TabsList>

        {/* Create AMM Tab */}
        <TabsContent value="create">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Create AMM Pool</CardTitle>
              <CardDescription className="text-gray-600">
                Create a new automated market maker pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="asset1" className="text-gray-900">Asset 1 *</Label>
                  <Input
                    id="asset1"
                    value={asset1}
                    disabled
                    className="bg-gray-100 border-gray-300 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset2" className="text-gray-900">Asset 2 *</Label>
                  <Input
                    id="asset2"
                    placeholder="e.g., USD, EUR, BTC"
                    value={asset2}
                    onChange={(e) => setAsset2(e.target.value)}
                    disabled={isCreating}
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount1" className="text-gray-900">Amount {asset1} *</Label>
                  <Input
                    id="amount1"
                    type="number"
                    placeholder="1000"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    disabled={isCreating}
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount2" className="text-gray-900">Amount {asset2 || 'Asset 2'} *</Label>
                  <Input
                    id="amount2"
                    type="number"
                    placeholder="500"
                    value={amount2}
                    onChange={(e) => setAmount2(e.target.value)}
                    disabled={isCreating}
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradingFee" className="text-gray-900">Trading Fee (%)</Label>
                <Input
                  id="tradingFee"
                  type="number"
                  step="0.01"
                  value={tradingFee}
                  onChange={(e) => setTradingFee(e.target.value)}
                  disabled={isCreating}
                  className="bg-gray-100 border-gray-300 text-gray-900"
                />
                <p className="text-xs text-gray-500">Default: 0.3% (can be changed via voting)</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-900">
                  <strong>Initial Price:</strong> {amount1 && amount2 ? (parseFloat(amount2) / parseFloat(amount1)).toFixed(6) : 'N/A'} {asset2}/{asset1}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  You will receive LP tokens representing your share of the pool
                </p>
              </div>

              {createResult && (
                <Alert className={createResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {createResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {createResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleCreateAMM}
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create AMM Pool
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Liquidity Tab */}
        <TabsContent value="liquidity">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Add Liquidity</CardTitle>
              <CardDescription className="text-gray-600">
                Provide liquidity to an existing AMM pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="poolId" className="text-gray-900">Pool ID *</Label>
                <Input
                  id="poolId"
                  placeholder="AMM-XRP-USD-001"
                  value={poolId}
                  onChange={(e) => setPoolId(e.target.value)}
                  disabled={isAddingLiquidity}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liquidityAmount1" className="text-gray-900">Amount Asset 1 *</Label>
                  <Input
                    id="liquidityAmount1"
                    type="number"
                    placeholder="100"
                    value={liquidityAmount1}
                    onChange={(e) => setLiquidityAmount1(e.target.value)}
                    disabled={isAddingLiquidity}
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquidityAmount2" className="text-gray-900">Amount Asset 2 *</Label>
                  <Input
                    id="liquidityAmount2"
                    type="number"
                    placeholder="50"
                    value={liquidityAmount2}
                    onChange={(e) => setLiquidityAmount2(e.target.value)}
                    disabled={isAddingLiquidity}
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {liquidityResult && (
                <Alert className={liquidityResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {liquidityResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {liquidityResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAddLiquidity}
                disabled={isAddingLiquidity}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isAddingLiquidity ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Droplet className="mr-2 h-4 w-4" />
                    Add Liquidity
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Pools Tab */}
        <TabsContent value="pools">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">My AMM Pools</CardTitle>
              <CardDescription className="text-gray-600">
                View your liquidity positions
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
                    <Coins className="mr-2 h-4 w-4" />
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
                          <h4 className="text-gray-900 font-semibold">{pool.asset1}/{pool.asset2}</h4>
                          <p className="text-xs text-gray-600">Pool ID: {pool.poolId}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Liquidity {pool.asset1}:</span>
                          <p className="text-gray-900 font-semibold">{pool.liquidity1}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Liquidity {pool.asset2}:</span>
                          <p className="text-gray-900 font-semibold">{pool.liquidity2}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">LP Tokens:</span>
                          <p className="text-gray-900 font-semibold">{pool.lpTokens}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Trading Fee:</span>
                          <p className="text-gray-900">{pool.tradingFee}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">My Share:</span>
                          <p className="text-gray-900">{pool.myShare}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vote Fee Tab */}
        <TabsContent value="vote">
          <Card className="bg-gray-100 border-gray-300">
            <CardHeader>
              <CardTitle className="text-gray-900">Vote on Trading Fee</CardTitle>
              <CardDescription className="text-gray-600">
                LP token holders can vote to change the trading fee
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="votePoolId" className="text-gray-900">Pool ID *</Label>
                <Input
                  id="votePoolId"
                  placeholder="AMM-XRP-USD-001"
                  value={votePoolId}
                  onChange={(e) => setVotePoolId(e.target.value)}
                  disabled={isVoting}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voteFee" className="text-gray-900">New Trading Fee (%) *</Label>
                <Input
                  id="voteFee"
                  type="number"
                  step="0.01"
                  placeholder="0.25"
                  value={voteFee}
                  onChange={(e) => setVoteFee(e.target.value)}
                  disabled={isVoting}
                  className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">Range: 0% - 1%</p>
              </div>

              {voteResult && (
                <Alert className={voteResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                  {voteResult.success ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
                  <AlertDescription className="text-green-800">
                    {voteResult.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleVote}
                disabled={isVoting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isVoting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Voting...
                  </>
                ) : (
                  <>
                    <Vote className="mr-2 h-4 w-4" />
                    Submit Vote
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

