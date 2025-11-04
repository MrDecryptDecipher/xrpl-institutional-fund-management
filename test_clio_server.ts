/**
 * Test file for Clio server implementation
 */

import { createClioServerManager, ClioConfig } from './src/lib/clio-server';

async function testClioServer() {
  console.log('Testing Clio Server Implementation...\n');

  // Create Clio server configuration
  const clioConfig: ClioConfig = {
    host: 'localhost',
    port: 51234,
    rippledServer: 'wss://s1.ripple.com',
    database: {
      type: 'cassandra',
      hosts: ['127.0.0.1:9042'],
      keyspace: 'clio_keyspace'
    },
    cache: {
      enabled: true,
      maxSize: 10000
    },
    loadBalancing: {
      enabled: true,
      servers: ['clio1.local:51234', 'clio2.local:51234']
    }
  };

  // Create Clio server manager
  const clioServer = createClioServerManager(clioConfig);

  try {
    // Test getting initial server info
    console.log('1. Testing initial server info retrieval...');
    const initialInfo = clioServer.getServerInfo();
    console.log('Initial server info:', JSON.stringify(initialInfo, null, 2));
    console.log();

    // Test starting the server
    console.log('2. Testing server startup...');
    await clioServer.start();
    console.log('Server started successfully\n');

    // Test getting server info after startup
    console.log('3. Testing server info after startup...');
    const startedInfo = clioServer.getServerInfo();
    console.log('Server info after startup:', JSON.stringify(startedInfo, null, 2));
    console.log();

    // Test handling requests
    console.log('4. Testing request handling...');
    
    // Test a local request
    const localRequest = {
      id: 'req1',
      method: 'account_info',
      params: {
        account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh'
      },
      timestamp: new Date()
    };
    
    const localResponse = await clioServer.handleRequest(localRequest);
    console.log('Local request response:', JSON.stringify(localResponse, null, 2));
    console.log();

    // Test a forwarded request
    const forwardedRequest = {
      id: 'req2',
      method: 'submit',
      params: {
        tx_blob: '1234567890ABCDEF'
      },
      timestamp: new Date()
    };
    
    const forwardedResponse = await clioServer.handleRequest(forwardedRequest);
    console.log('Forwarded request response:', JSON.stringify(forwardedResponse, null, 2));
    console.log();

    // Test handling multiple requests
    console.log('5. Testing multiple request handling...');
    const requests = [
      { id: 'req3', method: 'ledger', params: { ledger_index: 'validated' }, timestamp: new Date() },
      { id: 'req4', method: 'server_info', params: {}, timestamp: new Date() },
      { id: 'req5', method: 'account_lines', params: { account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh' }, timestamp: new Date() }
    ];
    
    for (const request of requests) {
      const response = await clioServer.handleRequest(request);
      console.log(`Request ${request.id} (${request.method}) handled in ${response.responseTime}ms`);
    }
    console.log();

    // Test request history
    console.log('6. Testing request history retrieval...');
    const requestHistory = clioServer.getRequestHistory(3);
    console.log(`Recent requests: ${requestHistory.length}`);
    requestHistory.forEach(req => {
      console.log(`  - ${req.id}: ${req.method}`);
    });
    console.log();

    // Test response history
    console.log('7. Testing response history retrieval...');
    const responseHistory = clioServer.getResponseHistory(3);
    console.log(`Recent responses: ${responseHistory.length}`);
    responseHistory.forEach(res => {
      console.log(`  - ${res.id}: ${res.forwarded ? 'forwarded' : 'local'} (${res.responseTime}ms)`);
    });
    console.log();

    // Test adding client connections
    console.log('8. Testing client connection management...');
    clioServer.addClientConnection();
    clioServer.addClientConnection();
    clioServer.addClientConnection();
    
    // Check server info with clients
    const infoWithClients = clioServer.getServerInfo();
    console.log(`Connected clients: ${infoWithClients.connectedClients}\n`);

    // Test removing client connections
    clioServer.removeClientConnection();
    clioServer.removeClientConnection();
    
    // Check server info after removing clients
    const infoAfterRemoval = clioServer.getServerInfo();
    console.log(`Connected clients after removal: ${infoAfterRemoval.connectedClients}\n`);

    // Test getting server statistics
    console.log('9. Testing server statistics retrieval...');
    const stats = clioServer.getStatistics();
    console.log('Server statistics:', JSON.stringify(stats, null, 2));
    console.log();

    // Test resetting statistics
    console.log('10. Testing statistics reset...');
    clioServer.resetStatistics();
    console.log('Statistics reset\n');

    // Test getting updated statistics
    console.log('11. Testing updated statistics retrieval...');
    const updatedStats = clioServer.getStatistics();
    console.log('Updated statistics:', JSON.stringify(updatedStats, null, 2));
    console.log();

    console.log('All Clio server tests passed!');
  } catch (error) {
    console.error('Clio server test failed:', error);
  } finally {
    // Test stopping the server
    console.log('12. Testing server shutdown...');
    try {
      await clioServer.stop();
      console.log('Server stopped successfully\n');
    } catch (error) {
      console.error('Failed to stop server:', error);
    }
  }
}

// Run the test
testClioServer().catch(console.error);