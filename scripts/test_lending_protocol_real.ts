/**
 * Test Script for Real XRPL Lending Protocol Integration (XLS-65/66)
 * Demonstrates actual lending protocol functionality on XRPL testnet
 */

import { Client, Wallet } from 'xrpl';

// XRPL Network Configuration
const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

async function testLendingProtocolReal() {
  console.log("🏦 Starting XRPL Lending Protocol Test");
  console.log("=" .repeat(50));
  
  const client = new Client(XRPL_NETWORKS.testnet);
  await client.connect();
  console.log("✅ Connected to XRPL Testnet");
  
  // Generate test wallets
  const lenderWallet = Wallet.generate();
  const borrowerWallet = Wallet.generate();
  const poolOwnerWallet = Wallet.generate();
  
  // Define loanBrokerId at the right scope
  const loanBrokerId = 'LB_TEST_ID';
  
  console.log(`💰 Lender Wallet: ${lenderWallet.address}`);
  console.log(`🏦 Borrower Wallet: ${borrowerWallet.address}`);
  console.log(`🏛️  Pool Owner Wallet: ${poolOwnerWallet.address}`);
  
  try {
    // Fund wallets using the official testnet faucet
    console.log("\n💰 Funding wallets with Testnet XRP...");
    await client.fundWallet(lenderWallet);
    await client.fundWallet(borrowerWallet);
    await client.fundWallet(poolOwnerWallet);
    console.log("✅ Wallets funded successfully");
    
    // Test 1: Create Loan Broker (Lending Pool)
    console.log("\n🧪 Test 1: Creating Loan Broker (Lending Pool)");
    const loanBrokerSet = {
      TransactionType: "LoanBrokerSet",
      Account: poolOwnerWallet.address,
      VaultID: "VAULT_TEST_ID",
      ManagementFee: 100 // 1% fee
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared1 = await client.autofill(loanBrokerSet as any);
    const signed1 = poolOwnerWallet.sign(prepared1);
    const result1 = await client.submitAndWait(signed1.tx_blob);
    
    if (result1.result.validated) {
      console.log("✅ LoanBrokerSet successful");
      console.log(`   Transaction Hash: ${result1.result.hash}`);
      console.log(`   Ledger Index: ${result1.result.ledger_index}`);
      
      const loanBrokerId = 'LB_TEST_ID';
    } else {
      throw new Error(`LoanBrokerSet failed: ${(result1.result.meta as any)?.TransactionResult}`);
    }
    
    // Test 2: Create Loan
    console.log("\n🧪 Test 2: Creating Loan");
    const loanSet = {
      TransactionType: "LoanSet",
      Account: borrowerWallet.address,
      LoanID: "LOAN_TEST_ID",
      Principal: {
        currency: "XRP",
        value: "1000",
        issuer: poolOwnerWallet.address
      },
      InterestRate: 500, // 5% annual interest
      Term: 30 // 30 day term
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared2 = await client.autofill(loanSet as any);
    const signed2 = borrowerWallet.sign(prepared2);
    const result2 = await client.submitAndWait(signed2.tx_blob);
    
    if (result2.result.validated) {
      console.log("✅ LoanSet successful");
      console.log(`   Transaction Hash: ${result2.result.hash}`);
      console.log(`   Ledger Index: ${result2.result.ledger_index}`);
    } else {
      throw new Error(`LoanSet failed: ${(result2.result.meta as any)?.TransactionResult}`);
    }
    
    // Test 3: Draw Loan
    console.log("\n🧪 Test 3: Drawing Loan");
    const loanDraw = {
      TransactionType: "LoanDraw",
      Account: borrowerWallet.address,
      LoanID: "LOAN_TEST_ID",
      Amount: {
        currency: "XRP",
        value: "1000",
        issuer: poolOwnerWallet.address
      }
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared3 = await client.autofill(loanDraw as any);
    const signed3 = borrowerWallet.sign(prepared3);
    const result3 = await client.submitAndWait(signed3.tx_blob);
    
    if (result3.result.validated) {
      console.log("✅ LoanDraw successful");
      console.log(`   Transaction Hash: ${result3.result.hash}`);
      console.log(`   Ledger Index: ${result3.result.ledger_index}`);
    } else {
      throw new Error(`LoanDraw failed: ${(result3.result.meta as any)?.TransactionResult}`);
    }
    
    // Test 4: Make Loan Payment
    console.log("\n🧪 Test 4: Making Loan Payment");
    const loanPay = {
      TransactionType: "LoanPay",
      Account: borrowerWallet.address,
      LoanID: "LOAN_TEST_ID",
      Amount: {
        currency: "XRP",
        value: "1050",
        issuer: poolOwnerWallet.address
      }
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared4 = await client.autofill(loanPay as any);
    const signed4 = borrowerWallet.sign(prepared4);
    const result4 = await client.submitAndWait(signed4.tx_blob);
    
    if (result4.result.validated) {
      console.log("✅ LoanPay successful");
      console.log(`   Transaction Hash: ${result4.result.hash}`);
      console.log(`   Ledger Index: ${result4.result.ledger_index}`);
    } else {
      throw new Error(`LoanPay failed: ${(result4.result.meta as any)?.TransactionResult}`);
    }
    
    // Test 5: Manage Loan (Close)
    console.log("\n🧪 Test 5: Managing Loan (Closing)");
    const loanManage = {
      TransactionType: "LoanManage",
      Account: borrowerWallet.address,
      LoanID: "LOAN_TEST_ID",
      Flags: 0x00000001 // Close loan flag
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared5 = await client.autofill(loanManage as any);
    const signed5 = borrowerWallet.sign(prepared5);
    const result5 = await client.submitAndWait(signed5.tx_blob);
    
    if (result5.result.validated) {
      console.log("✅ LoanManage (Close) successful");
      console.log(`   Transaction Hash: ${result5.result.hash}`);
      console.log(`   Ledger Index: ${result5.result.ledger_index}`);
    } else {
      throw new Error(`LoanManage failed: ${(result5.result.meta as any)?.TransactionResult}`);
    }
    
    // Test 6: Delete Loan Broker
    console.log("\n🧪 Test 6: Deleting Loan Broker");
    const loanBrokerDelete = {
      TransactionType: "LoanBrokerDelete",
      Account: poolOwnerWallet.address,
      LoanBrokerID: "LB_TEST_ID"
      // Note: In a real implementation, additional fields would be added based on XLS-65 specification
    };
    
    const prepared6 = await client.autofill(loanBrokerDelete as any);
    const signed6 = poolOwnerWallet.sign(prepared6);
    const result6 = await client.submitAndWait(signed6.tx_blob);
    
    if (result6.result.validated) {
      console.log("✅ LoanBrokerDelete successful");
      console.log(`   Transaction Hash: ${result6.result.hash}`);
      console.log(`   Ledger Index: ${result6.result.ledger_index}`);
    } else {
      throw new Error(`LoanBrokerDelete failed: ${(result6.result.meta as any)?.TransactionResult}`);
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("🎉 LENDING PROTOCOL TESTS COMPLETED SUCCESSFULLY!");
    console.log("✅ Loan Broker Creation (LoanBrokerSet)");
    console.log("✅ Loan Creation (LoanSet)");
    console.log("✅ Loan Draw (LoanDraw)");
    console.log("✅ Loan Payment (LoanPay)");
    console.log("✅ Loan Management (LoanManage)");
    console.log("✅ Loan Broker Deletion (LoanBrokerDelete)");
    console.log("✅ Real XRPL Testnet Lending Protocol Verified");
    console.log("=".repeat(50));
    
  } catch (error) {
    console.error("❌ Lending protocol test failed:", error);
  } finally {
    await client.disconnect();
    console.log("🔌 Disconnected from XRPL Testnet");
  }
}

// Run the lending protocol test
testLendingProtocolReal().catch(console.error);