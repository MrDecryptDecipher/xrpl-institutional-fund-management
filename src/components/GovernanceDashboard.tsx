import { useState } from "react";
import { 
  Vote, 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  BarChart3,
  AlertCircle,
  QrCode,
  Loader2
} from "lucide-react";

interface GovernanceDashboardProps {
  xrplAccount: string | null;
}

export function GovernanceDashboard({ xrplAccount }: GovernanceDashboardProps) {
  const [activeTab, setActiveTab] = useState<"proposals" | "voting" | "results">("proposals");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [votingPeriod, setVotingPeriod] = useState(7);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [proposalCreated, setProposalCreated] = useState(false);
  const [proposalId, setProposalId] = useState("");
  const [payloadUuid, setPayloadUuid] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock governance data
  const proposals = [
    {
      id: "prop_1",
      title: "Increase Management Fee to 2.5%",
      description: "Proposal to increase the annual management fee from 2.0% to 2.5% to cover increased operational costs",
      status: "active",
      creator: "rNCFjv8Ek5oDrNiMJ3pw6eLLuWwNMJezD9",
      created: "2024-01-10",
      votingEnds: "2024-01-24",
      votes: {
        yes: 65,
        no: 23,
        abstain: 12
      },
      quorum: 75,
      threshold: 66.7
    },
    {
      id: "prop_2",
      title: "Add New Investment Strategy",
      description: "Proposal to add cryptocurrency investments as a new strategy allocation up to 10% of portfolio",
      status: "pending",
      creator: "rNCFjv8Ek5oDrNiMJ3pw6eLLuWwNMJezD9",
      created: "2024-01-12",
      votingEnds: "2024-01-26",
      votes: {
        yes: 0,
        no: 0,
        abstain: 0
      },
      quorum: 75,
      threshold: 66.7
    },
    {
      id: "prop_3",
      title: "Change Custodian",
      description: "Proposal to change the fund custodian from Current Custodian to New Elite Custodian",
      status: "completed",
      creator: "rNCFjv8Ek5oDrNiMJ3pw6eLLuWwNMJezD9",
      created: "2023-12-15",
      votingEnds: "2023-12-29",
      votes: {
        yes: 82,
        no: 12,
        abstain: 6
      },
      quorum: 75,
      threshold: 66.7,
      result: "approved"
    }
  ];

  const createGovernanceProposal = async () => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }

    if (!proposalTitle || !proposalDescription) {
      setError("Please fill in all required fields");
      return;
    }

    setIsCreatingProposal(true);
    setError(null);
    setIsWaitingForSignature(false);
    setPayloadUuid(null);
    setQrCodeUrl(null);
    
    try {
      // Call the backend to create the governance proposal
      const response = await fetch('/api/create-governance-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creator: xrplAccount,
          title: proposalTitle,
          description: proposalDescription,
          votingPeriod: votingPeriod
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show QR code for signing
        setPayloadUuid(result.uuid);
        setQrCodeUrl(result.qrCodeUrl);
        setIsWaitingForSignature(true);
        
        // Poll for transaction completion
        pollForTransactionCompletion(result.uuid, 'proposal');
      } else {
        throw new Error(result.error || 'Failed to create governance proposal');
      }
    } catch (error) {
      console.error("Failed to create governance proposal:", error);
      setError(`Failed to create governance proposal: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCreatingProposal(false);
    }
  };

  const pollForTransactionCompletion = async (uuid: string, type: 'proposal' | 'vote') => {
    try {
      // Poll our backend for payload status
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/payload-status/${uuid}`);
          const payload = await response.json();
          
          if (payload.meta && payload.meta.resolved) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            
            if (payload.response && payload.response.txid) {
              // Transaction was successful
              if (type === 'proposal') {
                const proposalId = `proposal_${Date.now()}`;
                setProposalId(proposalId);
                setProposalCreated(true);
                setError(null);
              }
            } else {
              // Transaction was rejected or failed
              setError("Transaction was rejected or failed. Please try again.");
            }
          } else if (payload.meta && payload.meta.cancelled) {
            clearInterval(interval);
            setIsWaitingForSignature(false);
            setError("Transaction was cancelled. Please try again.");
          }
        } catch (err) {
          console.error("Error polling for transaction status:", err);
        }
      }, 2000); // Poll every 2 seconds
    } catch (err) {
      console.error("Error starting transaction polling:", err);
      setIsWaitingForSignature(false);
      setError(`Failed to monitor transaction: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const resetProposalCreation = () => {
    setProposalCreated(false);
    setProposalTitle("");
    setProposalDescription("");
    setProposalId("");
    setPayloadUuid(null);
    setQrCodeUrl(null);
    setIsWaitingForSignature(false);
    setError(null);
  };

  const cancelTransaction = () => {
    resetProposalCreation();
  };

  const voteOnProposal = async (proposalId: string, vote: "yes" | "no" | "abstain") => {
    if (!xrplAccount) {
      setError("Please connect your Xaman wallet first");
      return;
    }
    
    try {
      // Call the backend to submit the vote
      const response = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voter: xrplAccount,
          proposalId: proposalId,
          vote: vote
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show QR code for signing
        setPayloadUuid(result.uuid);
        setQrCodeUrl(result.qrCodeUrl);
        setIsWaitingForSignature(true);
        
        // Poll for transaction completion
        pollForTransactionCompletion(result.uuid, 'vote');
      } else {
        throw new Error(result.error || 'Failed to submit vote');
      }
    } catch (error) {
      console.error("Failed to submit vote:", error);
      setError(`Failed to submit vote: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Governance Dashboard</h3>
        <div className="flex items-center space-x-2">
          {xrplAccount && (
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("proposals")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "proposals"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FileText className="h-4 w-4 mr-2" />
          Proposals
        </button>
        <button
          onClick={() => setActiveTab("voting")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "voting"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Vote className="h-4 w-4 mr-2" />
          Vote
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "results"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Results
        </button>
      </div>

      {isWaitingForSignature && qrCodeUrl ? (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Sign Proposal</span>
              </div>
            </div>
            
            <p className="text-sm text-blue-700 mb-4">
              Scan the QR code with your Xaman wallet to sign and submit the proposal.
            </p>
            
            <div className="flex justify-center mb-4">
              <img src={qrCodeUrl} alt="Xaman QR Code" className="w-48 h-48" />
            </div>
            
            <p className="text-xs text-blue-600 text-center">
              Waiting for signature... This window will update automatically once signed.
            </p>
          </div>
          
          <button
            onClick={cancelTransaction}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel Transaction
          </button>
        </div>
      ) : proposalCreated ? (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Proposal Created Successfully</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Proposal Title</p>
                <p className="font-medium text-gray-900">{proposalTitle}</p>
              </div>
              <div>
                <p className="text-gray-500">Proposal ID</p>
                <p className="font-mono text-gray-900 truncate">{proposalId}</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={resetProposalCreation}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Another Proposal
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === "proposals" ? (
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposal Title *
            </label>
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter proposal title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed proposal description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voting Period (days) *
            </label>
            <select
              value={votingPeriod}
              onChange={(e) => setVotingPeriod(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={21}>21 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Governance Rules</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Quorum requirement: 75% of eligible voters</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>Approval threshold: 66.7% of votes</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                <span>All votes are final and recorded on-chain</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={createGovernanceProposal}
            disabled={isCreatingProposal || !xrplAccount}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingProposal ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Creating Proposal...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                <span>Create Governance Proposal</span>
              </>
            )}
          </button>
          
          {/* Active Proposals */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-4">Active Proposals</h4>
            <div className="space-y-4">
              {proposals.filter(p => p.status === "active").map(proposal => (
                <div key={proposal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{proposal.title}</h5>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Voting ends: {proposal.votingEnds}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => voteOnProposal(proposal.id, "yes")}
                      className="flex-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => voteOnProposal(proposal.id, "no")}
                      className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                    >
                      No
                    </button>
                    <button
                      onClick={() => voteOnProposal(proposal.id, "abstain")}
                      className="flex-1 px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Abstain
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "voting" ? (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900">Pending Votes</h4>
          <div className="space-y-4">
            {proposals.filter(p => p.status === "pending").map(proposal => (
              <div key={proposal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{proposal.title}</h5>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Pending
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Voting ends: {proposal.votingEnds}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => voteOnProposal(proposal.id, "yes")}
                    className="flex-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => voteOnProposal(proposal.id, "no")}
                    className="flex-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    No
                  </button>
                  <button
                    onClick={() => voteOnProposal(proposal.id, "abstain")}
                    className="flex-1 px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Abstain
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900">Voting Results</h4>
          <div className="space-y-4">
            {proposals.filter(p => p.status === "completed").map(proposal => (
              <div key={proposal.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{proposal.title}</h5>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    proposal.result === "approved" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {proposal.result === "approved" ? "Approved" : "Rejected"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Yes</p>
                    <p className="text-lg font-bold text-green-700">{proposal.votes.yes}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">No</p>
                    <p className="text-lg font-bold text-red-700">{proposal.votes.no}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500">Abstain</p>
                    <p className="text-lg font-bold text-gray-700">{proposal.votes.abstain}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Quorum: {proposal.quorum}%</span>
                  <span>Threshold: {proposal.threshold}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}