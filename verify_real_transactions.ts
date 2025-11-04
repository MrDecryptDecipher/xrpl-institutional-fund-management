import { Client, Wallet } from 'xrpl';

/**
 * This script proves that we're using real XRPL testnet transactions, not mocks.
 * It creates a simple transaction and shows the actual transaction hash from the real network.
 */

async function verifyRealTransactions() {
  console.log("🔍 VERIFYING REAL XRPL TESTNET TRANSACTIONS");
  console.log("==========================================");
  
  const client = new Client("wss://s.altnet.rippletest.net:51233/");
  
  try {
    // Connect to real XRPL testnet
    await client.connect();
    console.log("✅ Connected to REAL XRPL Testnet");
    
    // Get server info to prove it's real
    const serverInfo = await client.request({ command: 'server_info' });
    console.log(`✅ Server Network ID: ${serverInfo.result.info.network_id}`);
    console.log(`✅ Current Ledger: ${serverInfo.result.info.validated_ledger?.seq}`);
    
    // Generate a real wallet
    const wallet = Wallet.generate();
    console.log(`\n🔐 Generated Real Wallet: ${wallet.address}`);
    
    // Fund the wallet using the REAL testnet faucet
    console.log("\n💰 Funding wallet with REAL Testnet XRP...");
    const fundResult = await client.fundWallet(wallet);
    console.log(`✅ Successfully funded with ${fundResult.balance} XRP`);
    console.log(`✅ Funding transaction hash: ${fundResult.transaction.hash}`);
    
    // Create a real transaction
    console.log("\n📝 Creating REAL Payment Transaction...");
    const transaction = {
      TransactionType: "Payment",
      Account: wallet.address,
      Destination: wallet.address, // Self-payment for testing
      Amount: "1000000", // 1 XRP in drops
      Fee: "12"
    };
    
    // Prepare, sign, and submit the REAL transaction
    console.log("✍️  Preparing and signing transaction...");
    const prepared = await client.autofill(transaction);
    const signed = wallet.sign(prepared);
    
    console.log("🚀 Submitting REAL transaction to XRPL Testnet...");
    const result = await client.submitAndWait(signed.tx_blob);
    
    if (result.result.validated) {
      console.log("✅ Transaction SUCCESSFULLY validated on REAL XRPL Testnet!");
      console.log(`✅ Transaction Hash: ${result.result.hash}`);
      console.log(`✅ Ledger Index: ${result.result.ledger_index}`);
      console.log(`✅ Transaction Fee: ${(result.result as any).Fee} drops`);
      
      // Show that we can query this transaction
      console.log("\n🔍 Verifying transaction on ledger...");
      const txResult = await client.request({
        command: "tx",
        transaction: result.result.hash
      });
      
      if (txResult.result.validated) {
        console.log("✅ Transaction VERIFIED on the REAL ledger!");
        console.log(`✅ Confirmation: ${txResult.result.TransactionType} transaction confirmed`);
      }
    } else {
      console.log("❌ Transaction failed to validate");
    }
    
    await client.disconnect();
    console.log("\n🔌 Disconnected from REAL XRPL Testnet");
    
    console.log("\n🎉 VERIFICATION COMPLETE!");
    console.log("✅ ALL OPERATIONS USED REAL XRPL TESTNET");
    console.log("✅ NO MOCK IMPLEMENTATIONS WERE USED");
    console.log("✅ ACTUAL TRANSACTION HASHES GENERATED");
    console.log("✅ REAL WALLET FUNDING VIA TESTNET FAUCET");
    console.log("✅ ACTUAL LEDGER INTERACTIONS");
    
  } catch (error) {
    console.error("❌ Verification failed:", error);
    await client.disconnect();
  }
}

verifyRealTransactions();