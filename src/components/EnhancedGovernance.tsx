import { useState } from 'react';
import { Vote, Plus, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { getXummInstance } from '../lib/xummInstance';

interface EnhancedGovernanceProps {
  xrplAccount?: string;
}

export function EnhancedGovernance({ xrplAccount }: EnhancedGovernanceProps) {
  const [activeTab, setActiveTab] = useState<'proposals' | 'vote' | 'results'>('proposals');
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votingProposalId, setVotingProposalId] = useState<number | null>(null);

  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Increase Management Fee to 2.5%',
      description: 'Proposal to increase the management fee from 2.0% to 2.5% to cover increased operational costs and enhanced risk management systems.',
      proposer: 'Fund Manager',
      status: 'Active',
      votesFor: 425,
      votesAgainst: 122,
      totalVotes: 547,
      quorum: 500,
      deadline: '2025-01-15',
      created: '2024-12-20',
    },
    {
      id: 2,
      title: 'Add Cryptocurrency Allocation',
      description: 'Proposal to allocate up to 20% of portfolio to cryptocurrency assets including Bitcoin and Ethereum.',
      proposer: 'Investment Committee',
      status: 'Active',
      votesFor: 389,
      votesAgainst: 201,
      totalVotes: 590,
      quorum: 500,
      deadline: '2025-01-20',
      created: '2024-12-22',
    },
    {
      id: 3,
      title: 'Implement ESG Investment Criteria',
      description: 'Proposal to implement Environmental, Social, and Governance (ESG) criteria for all new investments.',
      proposer: 'Sustainability Committee',
      status: 'Passed',
      votesFor: 678,
      votesAgainst: 89,
      totalVotes: 767,
      quorum: 500,
      deadline: '2024-12-31',
      created: '2024-12-01',
    },
    {
      id: 4,
      title: 'Reduce Minimum Investment to $500K',
      description: 'Proposal to reduce the minimum investment requirement from $1M to $500K to attract more institutional investors.',
      proposer: 'Business Development',
      status: 'Rejected',
      votesFor: 234,
      votesAgainst: 512,
      totalVotes: 746,
      quorum: 500,
      deadline: '2024-12-25',
      created: '2024-12-05',
    },
  ]);

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
  });

  const handleVote = async (proposalId: number, vote: 'for' | 'against') => {
    if (!xrplAccount) {
      alert('Please connect your XRPL account to vote');
      return;
    }

    setIsVoting(true);
    setVotingProposalId(proposalId);

    try {
      const xumm = getXummInstance();
      
      // Create a SignIn payload with voting memo
      const payload = await xumm.payload.create({
        TransactionType: 'SignIn',
        Memos: [{
          Memo: {
            MemoType: Buffer.from('governance_vote', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify({
              proposalId,
              vote,
              timestamp: new Date().toISOString(),
            }), 'utf8').toString('hex').toUpperCase(),
          }
        }]
      });

      // Show QR code in a modal
      const qrCodeUrl = payload.refs.qr_png;
      const confirmed = window.confirm(
        `Please scan the QR code in your Xaman wallet to sign your vote.\n\nProposal: ${proposals.find(p => p.id === proposalId)?.title}\nVote: ${vote.toUpperCase()}\n\nQR Code: ${qrCodeUrl}`
      );

      if (confirmed) {
        // Wait for signing
        const result = await payload.resolved;
        
        if (result.signed) {
          // Update proposal votes
          setProposals(prev => prev.map(p => {
            if (p.id === proposalId) {
              return {
                ...p,
                votesFor: vote === 'for' ? p.votesFor + 1 : p.votesFor,
                votesAgainst: vote === 'against' ? p.votesAgainst + 1 : p.votesAgainst,
                totalVotes: p.totalVotes + 1,
              };
            }
            return p;
          }));

          alert(`Vote recorded successfully!\nTransaction ID: ${result.txid}`);
        } else {
          alert('Vote was cancelled or rejected');
        }
      }
    } catch (error) {
      console.error('Voting error:', error);
      alert('Failed to record vote. Please try again.');
    } finally {
      setIsVoting(false);
      setVotingProposalId(null);
    }
  };

  const handleCreateProposal = async () => {
    if (!xrplAccount) {
      alert('Please connect your XRPL account to create a proposal');
      return;
    }

    if (!newProposal.title || !newProposal.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const xumm = getXummInstance();
      
      // Create a SignIn payload with proposal memo
      const payload = await xumm.payload.create({
        TransactionType: 'SignIn',
        Memos: [{
          Memo: {
            MemoType: Buffer.from('governance_proposal', 'utf8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify({
              title: newProposal.title,
              description: newProposal.description,
              proposer: xrplAccount,
              timestamp: new Date().toISOString(),
            }), 'utf8').toString('hex').toUpperCase(),
          }
        }]
      });

      const qrCodeUrl = payload.refs.qr_png;
      const confirmed = window.confirm(
        `Please scan the QR code in your Xaman wallet to sign your proposal.\n\nQR Code: ${qrCodeUrl}`
      );

      if (confirmed) {
        const result = await payload.resolved;
        
        if (result.signed) {
          // Add new proposal
          const newProposalObj = {
            id: proposals.length + 1,
            title: newProposal.title,
            description: newProposal.description,
            proposer: xrplAccount.slice(0, 8) + '...' + xrplAccount.slice(-6),
            status: 'Active',
            votesFor: 0,
            votesAgainst: 0,
            totalVotes: 0,
            quorum: 500,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            created: new Date().toISOString().split('T')[0],
          };

          setProposals(prev => [newProposalObj, ...prev]);
          setNewProposal({ title: '', description: '' });
          setShowNewProposalModal(false);
          alert(`Proposal created successfully!\nTransaction ID: ${result.txid}`);
        }
      }
    } catch (error) {
      console.error('Proposal creation error:', error);
      alert('Failed to create proposal. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const activeProposals = proposals.filter(p => p.status === 'Active');
  const completedProposals = proposals.filter(p => p.status !== 'Active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Governance</h2>
        <button
          onClick={() => setShowNewProposalModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          New Proposal
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/30 backdrop-blur-md rounded-xl p-1 border border-white/40">
        {(['proposals', 'vote', 'results'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-white/40'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Proposals */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Proposals</h3>
          {activeProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{proposal.title}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Proposed by: {proposal.proposer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Deadline: {proposal.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Voting Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Voting Progress</span>
                  <span className="font-medium text-gray-900">{proposal.totalVotes} / {proposal.quorum} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((proposal.totalVotes / proposal.quorum) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600">For: {proposal.votesFor} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)</span>
                  <span className="text-red-600">Against: {proposal.votesAgainst} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)</span>
                </div>
              </div>

              {/* Vote Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote(proposal.id, 'for')}
                  disabled={isVoting && votingProposalId === proposal.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Vote For
                </button>
                <button
                  onClick={() => handleVote(proposal.id, 'against')}
                  disabled={isVoting && votingProposalId === proposal.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Vote Against
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vote Tab */}
      {activeTab === 'vote' && (
        <div className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cast Your Vote</h3>
          <p className="text-gray-600 mb-4">Select a proposal from the Proposals tab to cast your vote.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProposals.slice(0, 4).map((proposal) => (
              <div key={proposal.id} className="bg-white/30 backdrop-blur-md rounded-xl p-4 border border-white/40">
                <h4 className="font-semibold text-gray-900 mb-2">{proposal.title}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVote(proposal.id, 'for')}
                    className="flex-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                  >
                    For
                  </button>
                  <button
                    onClick={() => handleVote(proposal.id, 'against')}
                    className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                  >
                    Against
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Completed Proposals</h3>
          {completedProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{proposal.title}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Votes:</span>
                      <p className="font-semibold text-gray-900">{proposal.totalVotes}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">For:</span>
                      <p className="font-semibold text-green-600">{proposal.votesFor} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Against:</span>
                      <p className="font-semibold text-red-600">{proposal.votesAgainst} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Proposal Modal */}
      {showNewProposalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-2xl max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Proposal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Title</label>
                <input
                  type="text"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter proposal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Describe your proposal in detail"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewProposalModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProposal}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700"
                >
                  Create Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

