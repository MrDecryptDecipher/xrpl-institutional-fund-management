import { Client, Wallet } from 'xrpl';

async function testXRPLConnection() {
  console.log("Testing XRPL Testnet connection...");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  
  try {
    await client.connect();
    console.log("✅ Connected to XRPL Testnet");
    
    // Generate a test wallet
    const wallet = Wallet.generate();
    console.log(`Wallet address: ${wallet.address}`);
    
    // Fund the wallet
    console.log("Funding wallet...");
    await client.fundWallet(wallet);
    console.log("✅ Wallet funded");
    
    // Get wallet balance
    const balance = await client.getXrpBalance(wallet.address);
    console.log(`Wallet balance: ${balance} XRP`);
    
    await client.disconnect();
    console.log("✅ Disconnected from XRPL Testnet");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testXRPLConnection();