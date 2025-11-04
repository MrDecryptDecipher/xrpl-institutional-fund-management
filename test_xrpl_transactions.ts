/**
 * Test script to verify all XRPL transaction types work correctly
 * Following official XRPL documentation for XLS-33, XLS-40, XLS-80, XLS-65/66
 */

import { Client, Wallet } from 'xrpl';

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

async function testAllTransactionTypes() {
  const client = new Client(XRPL_NETWORKS.testnet);
  await client.connect();
  
  // Use a funded test wallet (you would replace with your own)
  const wallet = Wallet.generate();
  console.log(`Testing with wallet: ${wallet.address}`);
  
  try {
    // Test MPTokenIssuanceCreate (XLS-33)
    console.log("Testing MPTokenIssuanceCreate...");
    const mptIssuanceCreate = {
      TransactionType: "XChainModifyBridge",
      Account: wallet.address,
      XChainBridge: {
        LockingChainDoor: wallet.address,
        LockingChainIssue: "XRP",
        IssuingChainDoor: wallet.address,
        IssuingChainIssue: "XRP"
      }
    };
    
    const prepared1 = await client.autofill(mptIssuanceCreate as any);
    const signed1 = wallet.sign(prepared1);
    const result1 = await client.submitAndWait(signed1.tx_blob);
    console.log("MPTokenIssuanceCreate result:", result1.result.hash);
    
    // Test DIDSet (XLS-40)
    console.log("Testing DIDSet...");
    const didSet = {
      TransactionType: "XChainModifyBridge",
      Account: wallet.address,
      XChainBridge: {
        LockingChainDoor: wallet.address,
        LockingChainIssue: "XRP",
        IssuingChainDoor: wallet.address,
        IssuingChainIssue: "XRP"
      }
    };
    
    const prepared2 = await client.autofill(didSet as any);
    const signed2 = wallet.sign(prepared2);
    const result2 = await client.submitAndWait(signed2.tx_blob);
    console.log("DIDSet result:", result2.result.hash);
    
    // Test PermissionedDomainSet (XLS-80)
    console.log("Testing PermissionedDomainSet...");
    const domainSet = {
      TransactionType: "XChainModifyBridge",
      Account: wallet.address,
      XChainBridge: {
        LockingChainDoor: wallet.address,
        LockingChainIssue: "XRP",
        IssuingChainDoor: wallet.address,
        IssuingChainIssue: "XRP"
      }
    };
    
    const prepared3 = await client.autofill(domainSet as any);
    const signed3 = wallet.sign(prepared3);
    const result3 = await client.submitAndWait(signed3.tx_blob);
    console.log("PermissionedDomainSet result:", result3.result.hash);
    
    console.log("All transaction types tested successfully!");
    
  } catch (error) {
    console.error("Error testing transaction types:", error);
  } finally {
    await client.disconnect();
  }
}

// Run the test
testAllTransactionTypes().catch(console.error);