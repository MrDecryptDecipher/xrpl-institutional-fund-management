/**
 * Test file for XRPL domain verification functionality
 * 
 * This file tests the domain verification functionality using real xrp-ledger.toml files.
 */

import { 
  verifyValidatorDomain, 
  verifyAccountDomain,
  fetchXRPLToml
} from './src/lib/xrpl-toml';

async function testDomainVerification() {
  console.log('Testing XRPL domain verification functionality...');
  
  // Test 1: Fetch and examine ripple.com's xrp-ledger.toml
  console.log('\n1. Examining ripple.com xrp-ledger.toml:');
  try {
    const tomlData = await fetchXRPLToml('ripple.com');
    console.log('Successfully fetched xrp-ledger.toml from ripple.com');
    
    // Display some information from the TOML file
    console.log(`Metadata modified: ${tomlData.METADATA?.modified || 'Not specified'}`);
    console.log(`Number of validators: ${tomlData.VALIDATORS?.length || 0}`);
    console.log(`Number of accounts: ${tomlData.ACCOUNTS?.length || 0}`);
    console.log(`Number of servers: ${tomlData.SERVERS?.length || 0}`);
    
    // Show first validator if available
    if (tomlData.VALIDATORS && tomlData.VALIDATORS.length > 0) {
      console.log(`First validator public key: ${tomlData.VALIDATORS[0].public_key}`);
    }
    
    // Show first account if available
    if (tomlData.ACCOUNTS && tomlData.ACCOUNTS.length > 0) {
      console.log(`First account address: ${tomlData.ACCOUNTS[0].address}`);
    }
  } catch (error) {
    console.error(`Error fetching ripple.com xrp-ledger.toml: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  // Test 2: Verify a known validator from ripple.com
  console.log('\n2. Testing validator domain verification:');
  try {
    // Using a known validator public key from ripple.com
    const knownValidatorKey = 'n9KJb7NMxGy5WF4xBb8G25ME5f4M2Urcz7AfVv463ZCTzf6jvsHP';
    const isValidatorClaimed = await verifyValidatorDomain('ripple.com', knownValidatorKey);
    console.log(`Validator ${knownValidatorKey} claimed by ripple.com: ${isValidatorClaimed}`);
  } catch (error) {
    console.error(`Error verifying validator domain: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  // Test 3: Verify a known account from ripple.com
  console.log('\n3. Testing account domain verification:');
  try {
    // Using a known account address from ripple.com
    const knownAccountAddress = 'r9NpyVfLfUG8hatuCCHKzosyDtKnBdsEN3';
    const isAccountClaimed = await verifyAccountDomain('ripple.com', knownAccountAddress);
    console.log(`Account ${knownAccountAddress} claimed by ripple.com: ${isAccountClaimed}`);
  } catch (error) {
    console.error(`Error verifying account domain: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  // Test 4: Test with a domain that likely doesn't have an xrp-ledger.toml
  console.log('\n4. Testing with a domain that likely has no xrp-ledger.toml:');
  try {
    const isValidatorClaimed = await verifyValidatorDomain('google.com', 'n9KJb7NMxGy5WF4xBb8G25ME5f4M2Urcz7AfVv463ZCTzf6jvsHP');
    console.log(`Validator claimed by google.com: ${isValidatorClaimed}`);
  } catch (error) {
    console.log(`Expected error when fetching from google.com: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  console.log('\nDomain verification tests completed.');
}

// Run the tests
testDomainVerification().catch(console.error);