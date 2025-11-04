import { Client } from 'xrpl';

async function testRealConnection() {
  console.log("Testing real XRPL testnet connection...");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233/");
  
  try {
    await client.connect();
    console.log("✅ Successfully connected to XRPL Testnet");
    
    const serverInfo = await client.request({ command: 'server_info' });
    console.log("✅ Server info retrieved:");
    console.log(`   - Network: ${serverInfo.result.info.network_id}`);
    console.log(`   - Ledger Index: ${serverInfo.result.info.validated_ledger?.seq}`);
    console.log(`   - Server Version: ${serverInfo.result.info.build_version}`);
    
    await client.disconnect();
    console.log("✅ Disconnected from XRPL Testnet");
    console.log("\n🎉 REAL XRPL TESTNET CONNECTION VERIFIED!");
    
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

testRealConnection();