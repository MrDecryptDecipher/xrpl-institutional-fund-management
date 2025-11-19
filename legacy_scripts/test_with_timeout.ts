import { Client, Wallet } from 'xrpl';

async function testXRPLWithTimeout() {
  console.log("Testing XRPL Testnet connection with timeout...");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  
  try {
    await client.connect();
    console.log("✅ Connected to XRPL Testnet");
    
    // Generate a test wallet
    const wallet = Wallet.generate();
    console.log(`Wallet address: ${wallet.address}`);
    
    // Set a timeout for funding
    const fundingPromise = client.fundWallet(wallet);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Funding timeout")), 30000);
    });
    
    console.log("Funding wallet (with 30s timeout)...");
    await Promise.race([fundingPromise, timeoutPromise]);
    console.log("✅ Wallet funded");
    
    // Get wallet balance
    const balance = await client.getXrpBalance(wallet.address);
    console.log(`Wallet balance: ${balance} XRP`);
    
    await client.disconnect();
    console.log("✅ Disconnected from XRPL Testnet");
  } catch (error) {
    console.error("❌ Error:", error);
    
    try {
      await client.disconnect();
    } catch (disconnectError) {
      console.error("❌ Error disconnecting:", disconnectError);
    }
  }
}

testXRPLWithTimeout();