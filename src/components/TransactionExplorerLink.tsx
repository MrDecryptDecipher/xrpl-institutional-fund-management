import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useNetwork } from '../contexts/NetworkContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TransactionExplorerLinkProps {
  txHash: string;
  showCopy?: boolean;
  showBadge?: boolean;
  className?: string;
}

export function TransactionExplorerLink({
  txHash,
  showCopy = true,
  showBadge = true,
  className = '',
}: TransactionExplorerLinkProps) {
  const { networkMode } = useNetwork();
  const [copied, setCopied] = useState(false);

  // Get explorer URL based on network mode
  const getExplorerUrl = () => {
    if (networkMode === 'demo') {
      return '#';
    }

    const explorerBase =
      networkMode === 'testnet'
        ? 'https://testnet.xrpl.org/transactions/'
        : 'https://livenet.xrpl.org/transactions/';

    return explorerBase + txHash;
  };

  // Truncate hash for display
  const truncateHash = (hash: string) => {
    if (hash.length <= 16) return hash;
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const explorerUrl = getExplorerUrl();
  const isDemo = networkMode === 'demo';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && (
        <Badge
          variant={networkMode === 'mainnet' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {networkMode}
        </Badge>
      )}

      <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
        {truncateHash(txHash)}
      </code>

      {showCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 w-6 p-0"
          title="Copy transaction hash"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      )}

      {!isDemo && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          title="View on XRPL Explorer"
        >
          <ExternalLink className="h-3 w-3" />
          <span className="text-xs">Explorer</span>
        </a>
      )}

      {isDemo && (
        <span className="text-xs text-gray-400 italic">Demo Mode</span>
      )}
    </div>
  );
}

interface AccountExplorerLinkProps {
  address: string;
  showCopy?: boolean;
  className?: string;
}

export function AccountExplorerLink({
  address,
  showCopy = true,
  className = '',
}: AccountExplorerLinkProps) {
  const { networkMode } = useNetwork();
  const [copied, setCopied] = useState(false);

  // Get explorer URL based on network mode
  const getExplorerUrl = () => {
    if (networkMode === 'demo') {
      return '#';
    }

    const explorerBase =
      networkMode === 'testnet'
        ? 'https://testnet.xrpl.org/accounts/'
        : 'https://livenet.xrpl.org/accounts/';

    return explorerBase + address;
  };

  // Truncate address for display
  const truncateAddress = (addr: string) => {
    if (addr.length <= 16) return addr;
    return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const explorerUrl = getExplorerUrl();
  const isDemo = networkMode === 'demo';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
        {truncateAddress(address)}
      </code>

      {showCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 w-6 p-0"
          title="Copy address"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      )}

      {!isDemo && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          title="View on XRPL Explorer"
        >
          <ExternalLink className="h-3 w-3" />
          <span className="text-xs">Explorer</span>
        </a>
      )}
    </div>
  );
}

