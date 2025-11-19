/**
 * Comprehensive Test Runner for All XRPL Primitives
 * Executes all test scripts and provides a consolidated summary
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function runTestScript(scriptName: string): Promise<{ success: boolean; output: string; error?: string }> {
  try {
    console.log(`\n🚀 Running ${scriptName}...`);
    const { stdout, stderr } = await execPromise(`npx tsx ${scriptName}`, {
      cwd: process.cwd(),
      timeout: 60000 // 60 second timeout
    });

    const output = stdout + stderr;
    console.log(`✅ ${scriptName} completed`);
    return { success: true, output };
  } catch (error: any) {
    console.log(`❌ ${scriptName} failed`);
    return { success: false, output: error.stdout || '', error: error.stderr || error.message };
  }
}

async function runAllTests() {
  console.log("🧪 XRPL INSTITUTIONAL FUND MANAGEMENT PROTOCOL - COMPREHENSIVE TEST SUITE");
  console.log("=".repeat(80));

  const testScripts = [
    'scripts/test_real_xrpl_integration.ts',
    'scripts/test_lending_protocol_real.ts',
    'scripts/test_permissioned_domains_real.ts'
  ];

  const results: Array<{ name: string; success: boolean; error?: string }> = [];

  for (const script of testScripts) {
    try {
      const result = await runTestScript(script);
      results.push({
        name: script,
        success: result.success,
        error: result.error
      });

      // Add a small delay between tests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      results.push({
        name: script,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=".repeat(80));

  let passedTests = 0;
  let failedTests = 0;

  for (const result of results) {
    if (result.success) {
      console.log(`✅ ${result.name}: PASSED`);
      passedTests++;
    } else {
      console.log(`❌ ${result.name}: FAILED`);
      console.log(`   Error: ${result.error}`);
      failedTests++;
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log(`📈 FINAL RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log("=".repeat(80));

  if (failedTests === 0) {
    console.log("🎉 ALL TESTS PASSED! XRPL INSTITUTIONAL FUND MANAGEMENT PROTOCOL IS WORKING CORRECTLY");
    console.log("\n✅ MPT (XLS-33) - Multi-Purpose Tokens");
    console.log("✅ DID (XLS-40) - Decentralized Identity");
    console.log("✅ Permissioned Domains (XLS-80) - Access Control");
    console.log("✅ Lending Protocol (XLS-65/66) - Native Lending");
    console.log("✅ Real XRPL Testnet Integration Verified");
  } else {
    console.log("⚠️  SOME TESTS FAILED. PLEASE REVIEW THE ERRORS ABOVE.");
  }
}

// Run all tests
runAllTests().catch(console.error);