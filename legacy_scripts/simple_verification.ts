import { Client, Wallet } from 'xrpl';

/**
 * Simple verification that we're connecting to real XRPL testnet
 */

async function simpleVerification() {
  console.log("🔍 SIMPLE XRPL TESTNET VERIFICATION");
  console.log("====================================");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233/");
  
  try {
    // Connect to real XRPL testnet
    await client.connect();
    console.log("✅ Connected to REAL XRPL Testnet");
    
    // Get server info to prove it's real
    const serverInfo = await client.request({ command: 'server_info' });
    console.log(`✅ Server Network ID: ${serverInfo.result.info.network_id}`);
    console.log(`✅ Current Ledger: ${serverInfo.result.info.validated_ledger?.seq}`);
    console.log(`✅ Server Version: ${serverInfo.result.info.build_version}`);
    
    // Generate a real wallet
    const wallet = Wallet.generate();
    console.log(`\n🔐 Generated Real Wallet: ${wallet.address}`);
    
    // Fund the wallet using the REAL testnet faucet
    console.log("\n💰 Funding wallet with REAL Testnet XRP...");
    const fundResult = await client.fundWallet(wallet);
    console.log(`✅ Successfully funded wallet`);
    console.log(`✅ Balance: ${fundResult.balance} XRP`);
    
    await client.disconnect();
    console.log("\n🔌 Disconnected from REAL XRPL Testnet");
    
    console.log("\n🎉 VERIFICATION COMPLETE!");
    console.log("✅ CONFIRMED: Connecting to REAL XRPL Testnet");
    console.log("✅ CONFIRMED: Real wallet generation");
    console.log("✅ CONFIRMED: Real wallet funding via testnet faucet");
    
  } catch (error) {
    console.error("❌ Verification failed:", error);
    try {
      await client.disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
  }
}

simpleVerification();