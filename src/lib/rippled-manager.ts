/**
 * Rippled Server Management Implementation
 * 
 * This module provides functionality for managing rippled servers, including
 * starting, stopping, and monitoring server status.
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export interface RippledConfig {
  configPath?: string;
  dataPath?: string;
  logPath?: string;
}

export interface ServerInfo {
  pubkey_validator?: string;
  server_state?: string;
  server_state_duration_us?: string;
  complete_ledgers?: string;
  validated_ledger?: {
    age?: number;
    hash?: string;
    seq?: number;
  };
  peers?: number;
  amendment_blocked?: boolean;
  state_accounting?: {
    [key: string]: {
      duration_us: string;
      transitions: number;
    };
  };
}

export interface PeerInfo {
  pubkey?: string;
  address?: string;
  port?: number;
  state?: string;
}

export interface ValidatorInfo {
  validation_public_key: string;
  manifest: string;
  domain: string;
  attestation: string;
}

/**
 * Rippled Server Manager
 * 
 * This class provides methods for managing a rippled server instance.
 */
export class RippledManager {
  private config: RippledConfig;
  private rippledPath: string;

  constructor(config?: RippledConfig, rippledPath: string = 'rippled') {
    this.config = config || {};
    this.rippledPath = rippledPath;
  }

  /**
   * Start the rippled server
   * 
   * @param standalone - Whether to run in standalone mode
   * @param importLedger - Whether to import ledger data
   * @param startWithGenesis - Whether to start with a new genesis ledger (standalone mode only)
   * @returns Promise that resolves when the server starts
   */
  async start(standalone: boolean = false, importLedger: boolean = false, startWithGenesis: boolean = false): Promise<void> {
    const args: string[] = [];
    
    if (this.config.configPath) {
      args.push('--conf', this.config.configPath);
    }
    
    if (standalone) {
      args.push('--standalone');
    }
    
    if (importLedger) {
      args.push('--import');
    }
    
    if (startWithGenesis && standalone) {
      args.push('--start');
    }
    
    return new Promise((resolve, reject) => {
      const rippledProcess = spawn(this.rippledPath, args, {
        stdio: 'inherit'
      });
      
      rippledProcess.on('error', (error) => {
        reject(new Error(`Failed to start rippled: ${error.message}`));
      });
      
      // Give some time for the process to start
      setTimeout(() => {
        if (rippledProcess.pid) {
          resolve();
        } else {
          reject(new Error('Failed to start rippled process'));
        }
      }, 2000);
    });
  }

  /**
   * Stop the rippled server
   * 
   * @returns Promise that resolves when the server stops
   */
  async stop(): Promise<void> {
    try {
      await this.runCommand('stop');
    } catch (error) {
      // If the stop command fails, try using systemctl
      try {
        await execPromise('sudo systemctl stop rippled');
      } catch (systemctlError) {
        throw new Error(`Failed to stop rippled: ${error instanceof Error ? error.message : String(error)} and ${systemctlError instanceof Error ? systemctlError.message : String(systemctlError)}`);
      }
    }
  }

  /**
   * Get server information
   * 
   * @returns Promise that resolves with server information
   */
  async getServerInfo(): Promise<ServerInfo> {
    const result = await this.runCommand('server_info');
    return result.result;
  }

  /**
   * Get peer information
   * 
   * @returns Promise that resolves with peer information
   */
  async getPeers(): Promise<PeerInfo[]> {
    const result = await this.runCommand('peers');
    return result.result.peers || [];
  }

  /**
   * Get validator information
   * 
   * @returns Promise that resolves with validator information
   */
  async getValidatorInfo(): Promise<ValidatorInfo[]> {
    const result = await this.runCommand('validator_info');
    return [result.result];
  }

  /**
   * Run a rippled command
   * 
   * @param command - The command to run
   * @param params - Additional parameters for the command
   * @returns Promise that resolves with the command result
   */
  public async runCommand(command: string, params?: Record<string, any>): Promise<any> {
    const args: string[] = [];
    
    if (this.config.configPath) {
      args.push('--conf', this.config.configPath);
    }
    
    args.push('--', command);
    
    if (params) {
      // Add parameters to the command
      Object.keys(params).forEach(key => {
        args.push(key, params[key]);
      });
    }
    
    return new Promise((resolve, reject) => {
      const rippledProcess = spawn(this.rippledPath, args, {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      let stdout = '';
      let stderr = '';
      
      rippledProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      rippledProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      rippledProcess.on('close', (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (parseError) {
            reject(new Error(`Failed to parse rippled output: ${parseError instanceof Error ? parseError.message : String(parseError)}\nOutput: ${stdout}`));
          }
        } else {
          reject(new Error(`rippled command failed with code ${code}: ${stderr}`));
        }
      });
      
      rippledProcess.on('error', (error) => {
        reject(new Error(`Failed to run rippled command: ${error.message}`));
      });
    });
  }

  /**
   * Check if the server is synced with the network
   * 
   * @returns Promise that resolves with sync status
   */
  async isSynced(): Promise<boolean> {
    try {
      const info = await this.getServerInfo();
      
      // Check if server is in a proposing or validated state
      const syncedStates = ['proposing', 'validating', 'full'];
      const isStateSynced = info.server_state ? syncedStates.includes(info.server_state) : false;
      
      // Check if ledger age is reasonable (less than 10 seconds old)
      const isLedgerRecent = info.validated_ledger?.age !== undefined ? info.validated_ledger.age < 10 : false;
      
      return isStateSynced && isLedgerRecent;
    } catch (error) {
      console.error(`Error checking sync status: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  /**
   * Get the server version
   * 
   * @returns Promise that resolves with the server version
   */
  async getVersion(): Promise<string> {
    try {
      const result = await this.runCommand('--version');
      return result.toString().trim();
    } catch (error) {
      // Try alternative method
      try {
        const result = await this.runCommand('server_info');
        return result.result.build_version || 'Unknown';
      } catch (innerError) {
        throw new Error(`Failed to get rippled version: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }

  /**
   * Create a validator token
   * 
   * @param keyfilePath - Path to the validator keys file
   * @returns Promise that resolves with the validator token
   */
  async createValidatorToken(keyfilePath: string): Promise<string> {
    try {
      // This would typically be done with the validator-keys tool
      // For now, we'll simulate the command
      const command = `validator-keys create_token --keyfile ${keyfilePath}`;
      const { stdout } = await execPromise(command);
      return stdout;
    } catch (error) {
      throw new Error(`Failed to create validator token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Set domain for validator
   * 
   * @param domain - The domain to set
   * @param keyfilePath - Path to the validator keys file
   * @returns Promise that resolves when the domain is set
   */
  async setValidatorDomain(domain: string, keyfilePath: string): Promise<string> {
    try {
      // This would typically be done with the validator-keys tool
      // For now, we'll simulate the command
      const command = `validator-keys set_domain ${domain} --keyfile ${keyfilePath}`;
      const { stdout } = await execPromise(command);
      return stdout;
    } catch (error) {
      throw new Error(`Failed to set validator domain: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Advance the ledger in stand-alone mode
   * 
   * @returns Promise that resolves when the ledger is advanced
   */
  async advanceLedger(): Promise<void> {
    // In stand-alone mode, we need to manually advance the ledger
    await this.runCommand('ledger_accept');
  }

  /**
   * Start a new genesis ledger in stand-alone mode
   * 
   * @returns Promise that resolves when the server starts with a new genesis ledger
   */
  async startWithGenesisLedger(): Promise<void> {
    return this.start(true, false, true);
  }

  /**
   * Get genesis account information
   * 
   * @returns Object containing genesis account address and secret
   */
  getGenesisAccount(): { address: string; secret: string } {
    return {
      address: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
      secret: 'snoPBrXtMeMyMHUVTgbuqAfg1SUTb' // "masterpassphrase"
    };
  }

  /**
   * Load a saved ledger in stand-alone mode
   * 
   * @param ledgerFile - Path to the ledger file to load
   * @returns Promise that resolves when the ledger is loaded
   */
  async loadLedger(ledgerFile: string): Promise<void> {
    // This would typically be done by starting rippled with --ledgerfile option
    // For now, we'll just simulate the process
    console.log(`Loading ledger from file: ${ledgerFile}`);
    // In a real implementation, this would involve starting rippled with specific options
  }

  /**
   * Run tests in stand-alone mode
   * 
   * @param testFunction - Function to run for testing
   * @returns Promise that resolves with test results
   */
  async runStandaloneTest(testFunction: () => Promise<any>): Promise<any> {
    try {
      // Start server in standalone mode with genesis ledger
      await this.startWithGenesisLedger();
      
      // Wait for server to be ready
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Run the test function
      const result = await testFunction();
      
      // Stop the server
      await this.stop();
      
      return result;
    } catch (error) {
      // Make sure to stop the server even if tests fail
      try {
        await this.stop();
      } catch (stopError) {
        // Ignore stop errors
      }
      throw error;
    }
  }

  /**
   * Analyze server state for diagnostic purposes
   * 
   * @returns Promise that resolves with diagnostic information
   */
  async analyzeServerState(): Promise<any> {
    try {
      const serverInfo = await this.getServerInfo();
      const peers = await this.getPeers();
      const validatorInfo = await this.getValidatorInfo();
      
      const diagnostics = {
        serverState: serverInfo.server_state,
        serverStateDuration: serverInfo.server_state_duration_us,
        isConnected: serverInfo.server_state !== 'disconnected',
        isSynced: await this.isSynced(),
        ledgerRange: serverInfo.complete_ledgers,
        peerCount: peers.length,
        peers: peers,
        validatorInfo: validatorInfo,
        amendmentBlocked: serverInfo.amendment_blocked || false,
        uptime: serverInfo.server_state_duration_us,
        stateAccounting: serverInfo.state_accounting
      };
      
      return diagnostics;
    } catch (error) {
      throw new Error(`Failed to analyze server state: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check for common sync issues
   * 
   * @returns Promise that resolves with sync issue analysis
   */
  async checkSyncIssues(): Promise<any> {
    try {
      const serverInfo = await this.getServerInfo();
      const diagnostics = await this.analyzeServerState();
      
      const issues = {
        isConnected: serverInfo.server_state !== 'disconnected',
        isSyncing: serverInfo.server_state === 'syncing',
        isFullySynced: serverInfo.server_state === 'full' || serverInfo.server_state === 'proposing',
        hasMultipleTransitions: false,
        syncDurationIssues: false,
        peerIssues: false,
        ledgerGaps: false,
        amendmentBlocked: serverInfo.amendment_blocked || false
      };
      
      // Check for multiple state transitions
      if (serverInfo.state_accounting) {
        for (const state in serverInfo.state_accounting) {
          if (serverInfo.state_accounting[state].transitions > 1) {
            issues.hasMultipleTransitions = true;
            break;
          }
        }
      }
      
      // Check sync duration
      if (serverInfo.server_state_duration_us) {
        const totalUptime = parseInt(serverInfo.server_state_duration_us);
        if (serverInfo.state_accounting && serverInfo.state_accounting.connected) {
          const connectedTime = parseInt(serverInfo.state_accounting.connected.duration_us);
          // If more than 10% of uptime is spent connected (not synced), that's an issue
          if (connectedTime / totalUptime > 0.1) {
            issues.syncDurationIssues = true;
          }
        }
      }
      
      // Check peer issues
      if (diagnostics.peerCount === 0) {
        issues.peerIssues = true;
      } else if (diagnostics.peerCount === 10) {
        // Exactly 10 peers might indicate NAT issues
        issues.peerIssues = true;
      }
      
      // Check for ledger gaps
      if (serverInfo.complete_ledgers && serverInfo.complete_ledgers.includes(',')) {
        issues.ledgerGaps = true;
      }
      
      return {
        issues,
        serverInfo,
        diagnostics
      };
    } catch (error) {
      throw new Error(`Failed to check sync issues: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get server logs
   * 
   * @param lines - Number of lines to retrieve (default: 100)
   * @returns Promise that resolves with log content
   */
  async getServerLogs(lines: number = 100): Promise<string> {
    try {
      // Default log path
      const logPath = this.config.logPath || '/var/log/rippled/debug.log';
      
      // Use exec to tail the log file
      const command = `tail -n ${lines} ${logPath}`;
      const { stdout } = await execPromise(command);
      return stdout;
    } catch (error) {
      throw new Error(`Failed to retrieve server logs: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Set log level
   * 
   * @param level - Log level to set (trace, debug, info, warning, error)
   * @returns Promise that resolves when log level is set
   */
  async setLogLevel(level: string): Promise<void> {
    try {
      await this.runCommand('log_level', { severity: level });
    } catch (error) {
      throw new Error(`Failed to set log level: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check for common diagnostic issues
   * 
   * @returns Promise that resolves with diagnostic results
   */
  async runDiagnostics(): Promise<any> {
    try {
      console.log('Running rippled diagnostics...');
      
      // 1. Check server state
      console.log('1. Checking server state...');
      const serverInfo = await this.getServerInfo();
      
      // 2. Check connectivity
      console.log('2. Checking connectivity...');
      const peers = await this.getPeers();
      
      // 3. Check sync status
      console.log('3. Checking sync status...');
      const isSynced = await this.isSynced();
      
      // 4. Check for common issues
      console.log('4. Checking for common issues...');
      const syncIssues = await this.checkSyncIssues();
      
      // 5. Get recent logs
      console.log('5. Retrieving recent logs...');
      const logs = await this.getServerLogs(50);
      
      return {
        serverInfo,
        peers: peers.length,
        isSynced,
        syncIssues,
        recentLogs: logs,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Diagnostics failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate diagnostic report
   * 
   * @returns Promise that resolves with diagnostic report
   */
  async generateDiagnosticReport(): Promise<string> {
    try {
      const diagnostics = await this.runDiagnostics();
      
      let report = `# rippled Diagnostic Report\n`;
      report += `Generated: ${diagnostics.timestamp}\n\n`;
      
      report += `## Server Information\n`;
      report += `- State: ${diagnostics.serverInfo.server_state}\n`;
      report += `- Synced: ${diagnostics.isSynced}\n`;
      report += `- Peers: ${diagnostics.peers}\n`;
      report += `- Ledger Range: ${diagnostics.serverInfo.complete_ledgers}\n\n`;
      
      report += `## Sync Issues\n`;
      report += `- Connected: ${diagnostics.syncIssues.issues.isConnected}\n`;
      report += `- Syncing: ${diagnostics.syncIssues.issues.isSyncing}\n`;
      report += `- Fully Synced: ${diagnostics.syncIssues.issues.isFullySynced}\n`;
      report += `- Multiple Transitions: ${diagnostics.syncIssues.issues.hasMultipleTransitions}\n`;
      report += `- Sync Duration Issues: ${diagnostics.syncIssues.issues.syncDurationIssues}\n`;
      report += `- Peer Issues: ${diagnostics.syncIssues.issues.peerIssues}\n`;
      report += `- Ledger Gaps: ${diagnostics.syncIssues.issues.ledgerGaps}\n`;
      report += `- Amendment Blocked: ${diagnostics.syncIssues.issues.amendmentBlocked}\n\n`;
      
      report += `## Recent Logs (last 50 lines)\n`;
      report += `\`\`\`\n${diagnostics.recentLogs}\`\`\`\n`;
      
      return report;
    } catch (error) {
      throw new Error(`Failed to generate diagnostic report: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create a new RippledManager instance
 * 
 * @param config - Configuration for the rippled server
 * @param rippledPath - Path to the rippled executable
 * @returns A new RippledManager instance
 */
export function createRippledManager(config?: RippledConfig, rippledPath?: string): RippledManager {
  return new RippledManager(config, rippledPath);
}

/**
 * Generate a sample rippled configuration
 * 
 * @returns Sample rippled configuration as a string
 */
export function generateSampleConfig(): string {
  return `[server]
port_rpc_admin_local
port_peer
port_ws_admin_local
port_ws_public

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 51235
ip = 0.0.0.0
protocol = peer

[port_ws_admin_local]
port = 6006
ip = 127.0.0.1
admin = 127.0.0.1
protocol = ws

[port_ws_public]
port = 51233
ip = 0.0.0.0
protocol = wss

[node_size]
medium

[database_path]
/var/lib/rippled/db

[debug_logfile]
/var/log/rippled/debug.log

[sntp_servers]
time.windows.com
time.apple.com
time.nist.gov
pool.ntp.org

[rpc_startup]
{ "command": "log_level", "severity": "warning" }

[ssl_verify]
1

[validators]
n949f75evCHwgyP4fPVgaHqNHxUVN15PsJEZ3B3HnXPcPjcZAoy7
n9MD5h24qrQqiyBC8aeqqCWvpiBiYQ3jxSr91uiDvmrkyHRdYLUj
n9L81uNCaPgt`;
}