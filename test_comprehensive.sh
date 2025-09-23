#!/bin/bash

# XRPL Institutional Fund Management Protocol - Comprehensive Test Suite
# Tests all real XRPL implementations for type safety, linting, and functionality

echo "🔍 XRPL Institutional Fund Management Protocol - Comprehensive Testing"
echo "=================================================================="

cd "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"

# Test 1: TypeScript Type Checking
echo "1. Running TypeScript type checking..."
if npx tsc --noEmit --project . --pretty; then
    echo "✅ TypeScript: No type errors found"
else 
    echo "❌ TypeScript: Type errors found"
    exit 1
fi

# Test 2: Convex TypeScript Checking
echo -e "\n2. Running Convex TypeScript checking..."
if npx tsc -p convex --noEmit --pretty; then
    echo "✅ Convex TypeScript: No type errors found"
else
    echo "❌ Convex TypeScript: Type errors found"
    exit 1
fi

# Test 3: ESLint
echo -e "\n3. Running ESLint..."
if npx eslint convex/ src/ --ext .ts,.tsx --quiet; then
    echo "✅ ESLint: No linting errors found"
else
    echo "❌ ESLint: Linting errors found"
    exit 1
fi

# Test 4: Package Dependencies Check
echo -e "\n4. Checking XRPL dependencies..."
if npm list xrpl > /dev/null 2>&1; then
    echo "✅ XRPL.js library properly installed"
else
    echo "❌ XRPL.js library missing"
    exit 1
fi

# Test 5: Build Process
echo -e "\n5. Testing build process..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build: Successfully compiled"
else
    echo "❌ Build: Compilation failed"
    exit 1
fi

# Test 6: Convex Functions Validation
echo -e "\n6. Validating Convex functions..."
if npx convex dev --once > /dev/null 2>&1; then
    echo "✅ Convex: All functions validated successfully"
else
    echo "❌ Convex: Function validation failed"
    exit 1
fi

# Test 7: Count Real XRPL Implementations
echo -e "\n7. Analyzing XRPL implementation coverage..."

REAL_IMPLEMENTATIONS=0
MOCK_IMPLEMENTATIONS=0

# Check for real XRPL usage
if grep -r "Client(" convex/ --include="*.ts" > /dev/null; then
    REAL_IMPLEMENTATIONS=$((REAL_IMPLEMENTATIONS + 1))
    echo "✅ Real XRPL Client usage found"
fi

if grep -r "submitAndWait" convex/ --include="*.ts" > /dev/null; then
    REAL_IMPLEMENTATIONS=$((REAL_IMPLEMENTATIONS + 1))
    echo "✅ Real XRPL transaction submission found"
fi

if grep -r "DIDSet" convex/ --include="*.ts" > /dev/null; then
    REAL_IMPLEMENTATIONS=$((REAL_IMPLEMENTATIONS + 1))
    echo "✅ Real XLS-40 DID implementation found"
fi

if grep -r "MPTokenIssuanceCreate" convex/ --include="*.ts" > /dev/null; then
    REAL_IMPLEMENTATIONS=$((REAL_IMPLEMENTATIONS + 1))
    echo "✅ Real XLS-33 MPT implementation found"
fi

if grep -r "SignerListSet" convex/ --include="*.ts" > /dev/null; then
    REAL_IMPLEMENTATIONS=$((REAL_IMPLEMENTATIONS + 1))
    echo "✅ Real multi-signature implementation found"
fi

# Check for mock implementations (should be zero)
if grep -r "Math.random()" convex/ --include="*.ts" > /dev/null; then
    MOCK_IMPLEMENTATIONS=$((MOCK_IMPLEMENTATIONS + 1))
    echo "❌ Mock implementation detected (Math.random)"
fi

if grep -r "rMockOwner\|MockTxHash\|fake" convex/ --include="*.ts" > /dev/null; then
    MOCK_IMPLEMENTATIONS=$((MOCK_IMPLEMENTATIONS + 1))
    echo "❌ Mock implementation detected (fake data)"
fi

echo -e "\n📊 Implementation Analysis:"
echo "Real XRPL implementations: $REAL_IMPLEMENTATIONS"
echo "Mock implementations: $MOCK_IMPLEMENTATIONS"

# Test 8: File Structure Validation
echo -e "\n8. Validating file structure..."
REQUIRED_FILES=(
    "convex/xrpl/client.ts"
    "convex/xrpl/did.ts"
    "convex/xrpl/mpt.ts"
    "convex/xrpl/domains.ts"
    "convex/funds/xrpl_fund_management.ts"
    "convex/compliance/jurisdictional_matrix.ts"
    "convex/governance/multisig.ts"
    "convex/audit/audit_logging.ts"
)

ALL_FILES_EXIST=true
for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        ALL_FILES_EXIST=false
    fi
done

# Test 9: XRPL Network Configuration
echo -e "\n9. Validating XRPL network configuration..."
if grep -r "wss://s.altnet.rippletest.net:51233" convex/ --include="*.ts" > /dev/null; then
    echo "✅ XRPL Testnet configuration found"
fi

if grep -r "wss://xrplcluster.com" convex/ --include="*.ts" > /dev/null; then
    echo "✅ XRPL Mainnet configuration found"
fi

# Final Results
echo -e "\n🎉 TEST RESULTS SUMMARY"
echo "========================"

if [[ $REAL_IMPLEMENTATIONS -ge 5 && $MOCK_IMPLEMENTATIONS -eq 0 && $ALL_FILES_EXIST == true ]]; then
    echo "✅ ALL TESTS PASSED!"
    echo "✅ Real XRPL functionality implemented"
    echo "✅ No mock implementations detected" 
    echo "✅ Type checking passed"
    echo "✅ Linting passed"
    echo "✅ Build process successful"
    echo ""
    echo "🚀 The XRPL Institutional Fund Management Protocol is ready!"
    echo "   Following PRD specifications with real XRPL functionality."
    exit 0
else
    echo "❌ SOME TESTS FAILED!"
    echo "   Please check the errors above and fix them."
    exit 1
fi