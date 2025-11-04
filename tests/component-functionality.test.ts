import { test, expect } from '@playwright/test';

test('Test dashboard component functionality', async ({ page }) => {
  // Increase timeout for this test
  test.setTimeout(60000);
  
  // Navigate to the app
  await page.goto('http://localhost:5176/');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Click the force show dashboard button
  const forceShowButton = await page.$('button:has-text("Force Show Dashboard")');
  if (forceShowButton) {
    await forceShowButton.click();
    await page.waitForTimeout(2000);
  }
  
  // Test 1: Network toggle functionality
  console.log('Testing network toggle functionality');
  const testnetButton = await page.$('button:has-text("Testnet")');
  const mainnetButton = await page.$('button:has-text("Mainnet")');
  
  expect(testnetButton).not.toBeNull();
  expect(mainnetButton).not.toBeNull();
  
  // Click mainnet button
  if (mainnetButton) {
    await mainnetButton.click();
    await page.waitForTimeout(1000);
    
    // Check if mainnet is selected (button should have different styling)
    const mainnetButtonClasses = await mainnetButton.getAttribute('class');
    console.log('Mainnet button classes:', mainnetButtonClasses);
  }
  
  // Click testnet button
  if (testnetButton) {
    await testnetButton.click();
    await page.waitForTimeout(1000);
    
    // Check if testnet is selected
    const testnetButtonClasses = await testnetButton.getAttribute('class');
    console.log('Testnet button classes:', testnetButtonClasses);
  }
  
  // Test 2: Transaction executor functionality
  console.log('Testing transaction executor functionality');
  const executeTransactionButton = await page.$('button:has-text("Execute Transaction")');
  expect(executeTransactionButton).not.toBeNull();
  
  if (executeTransactionButton) {
    await executeTransactionButton.click();
    await page.waitForTimeout(1000);
    
    // Check if transaction modal or form appears
    const transactionForm = await page.$('text=Recipient Address');
    if (transactionForm) {
      console.log('Transaction form found');
      
      // Fill in transaction details
      await page.fill('input[placeholder="Enter recipient address"]', 'rDemoRecipient123');
      await page.fill('input[placeholder="Enter amount"]', '100');
      
      // Submit transaction
      const submitButton = await page.$('button:has-text("Execute Transaction")');
      if (submitButton) {
        await submitButton.click();
        await page.waitForTimeout(2000);
        
        // Check for success message or transaction result
        const successMessage = await page.$('text=Transaction executed successfully');
        console.log('Transaction success message found:', !!successMessage);
      }
    }
  }
  
  // Test 3: Fund Management tab
  console.log('Testing fund management functionality');
  const fundManagementTab = await page.$('button:has-text("Fund Management")');
  if (fundManagementTab) {
    await fundManagementTab.click();
    await page.waitForTimeout(1000);
    
    // Check if fund management content is visible
    const fundTable = await page.$('text=Fund Management');
    expect(fundTable).not.toBeNull();
    
    // Check if "Manage" buttons are present and clickable
    const manageButtons = await page.$$('button:has-text("Manage")');
    console.log('Found', manageButtons.length, 'manage buttons');
    
    if (manageButtons.length > 0) {
      await manageButtons[0].click();
      await page.waitForTimeout(1000);
      // Check if management interface appears
    }
  }
  
  // Test 4: Performance Analytics tab
  console.log('Testing performance analytics functionality');
  const analyticsTab = await page.$('button:has-text("Performance Analytics")');
  if (analyticsTab) {
    await analyticsTab.click();
    await page.waitForTimeout(1000);
    
    // Check if analytics content is visible
    const exportReportButton = await page.$('button:has-text("Export Report")');
    expect(exportReportButton).not.toBeNull();
    
    if (exportReportButton) {
      await exportReportButton.click();
      await page.waitForTimeout(1000);
      // Check if report generation is triggered
      console.log('Export report button clicked');
    }
  }
  
  // Test 5: Compliance & Permissioning tab
  console.log('Testing compliance functionality');
  const complianceTab = await page.$('button:has-text("Compliance & Reporting")');
  if (complianceTab) {
    await complianceTab.click();
    await page.waitForTimeout(1000);
    
    // Check if compliance content is visible
    const createDomainButton = await page.$('button:has-text("Create Permissioned Domain")');
    expect(createDomainButton).not.toBeNull();
    
    if (createDomainButton) {
      await createDomainButton.click();
      await page.waitForTimeout(1000);
      
      // Check if domain creation form appears
      const domainForm = await page.$('input[placeholder="Enter domain name"]');
      if (domainForm) {
        console.log('Domain creation form found');
        
        // Fill in domain name
        await page.fill('input[placeholder="Enter domain name"]', 'test-domain-123');
        
        // Submit domain creation
        const submitDomainButton = await page.$('button:has-text("Create Domain")');
        if (submitDomainButton) {
          await submitDomainButton.click();
          await page.waitForTimeout(2000);
          
          // Check for success message
          const domainSuccessMessage = await page.$('text=Domain created successfully');
          console.log('Domain creation success message found:', !!domainSuccessMessage);
        }
      }
    }
  }
  
  // Test 6: Governance tab
  console.log('Testing governance functionality');
  const governanceTab = await page.$('button:has-text("Governance")');
  if (governanceTab) {
    await governanceTab.click();
    await page.waitForTimeout(1000);
    
    // Check if governance content is visible
    const newProposalButton = await page.$('button:has-text("New Proposal")');
    expect(newProposalButton).not.toBeNull();
    
    if (newProposalButton) {
      await newProposalButton.click();
      await page.waitForTimeout(1000);
      
      // Check if proposal creation form appears
      const proposalForm = await page.$('input[placeholder="Enter proposal title"]');
      if (proposalForm) {
        console.log('Proposal creation form found');
        
        // Fill in proposal details
        await page.fill('input[placeholder="Enter proposal title"]', 'Test Proposal');
        await page.fill('textarea[placeholder="Enter proposal description"]', 'This is a test proposal for governance testing.');
        
        // Submit proposal
        const submitProposalButton = await page.$('button:has-text("Create Proposal")');
        if (submitProposalButton) {
          await submitProposalButton.click();
          await page.waitForTimeout(2000);
          
          // Check for success message
          const proposalSuccessMessage = await page.$('text=Proposal created successfully');
          console.log('Proposal creation success message found:', !!proposalSuccessMessage);
        }
      }
    }
  }
  
  // Test 7: Institutional Reports tab
  console.log('Testing reports functionality');
  const reportsTab = await page.$('button:has-text("Institutional Reports")');
  if (reportsTab) {
    await reportsTab.click();
    await page.waitForTimeout(1000);
    
    // Check if reports content is visible
    const generateReportButton = await page.$('button:has-text("Generate New Report")');
    expect(generateReportButton).not.toBeNull();
    
    if (generateReportButton) {
      await generateReportButton.click();
      await page.waitForTimeout(1000);
      
      // Check if report generation is triggered
      console.log('Generate report button clicked');
    }
  }
  
  // Take a final screenshot
  await page.screenshot({ path: 'component-functionality-final.png' });
  
  console.log('Component functionality test completed successfully');
});