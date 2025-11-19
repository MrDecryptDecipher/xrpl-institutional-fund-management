import { Client } from 'xrpl';

async function testXRPLConnectionOnly() {
  console.log("Testing XRPL Testnet connection only...");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  
  try {
    await client.connect();
    console.log("✅ Connected to XRPL Testnet");
    
    // Get server info
    const serverInfo = await client.request({ command: 'server_info' });
    console.log("Server info:", JSON.stringify(serverInfo.result.info, null, 2));
    
    // Get ledger info
    const ledger = await client.request({ command: 'ledger_current' });
    console.log(`Current ledger index: ${ledger.result.ledger_current_index}`);
    
    await client.disconnect();
    console.log("✅ Disconnected from XRPL Testnet");
    
    console.log("🎉 XRPL connection test completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    
    try {
      await client.disconnect();
    } catch (disconnectError) {
      console.error("❌ Error disconnecting:", disconnectError);
    }
  }
}

testXRPLConnectionOnly();