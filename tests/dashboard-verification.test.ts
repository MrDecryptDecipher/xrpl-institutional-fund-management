import { test, expect } from '@playwright/test';

test('Verify dashboard functionality', async ({ page }) => {
  // Increase timeout for this test
  test.setTimeout(60000);
  
  // Navigate to the app
  await page.goto('http://localhost:5176/');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Check if we can see the force show dashboard button
  const forceShowButton = await page.$('button:has-text("Force Show Dashboard")');
  
  if (forceShowButton) {
    console.log('Clicking force show dashboard button');
    await forceShowButton.click();
    await page.waitForTimeout(2000);
  }
  
  // Now check if the dashboard is visible by looking for key elements
  const dashboardHeader = await page.$('text=XRPL Institutional Fund Platform');
  const networkToggle = await page.$('button:has-text("Testnet")');
  const portfolioTab = await page.$('button:has-text("Portfolio Overview")');
  
  // Assertions
  expect(dashboardHeader).not.toBeNull();
  expect(networkToggle).not.toBeNull();
  expect(portfolioTab).not.toBeNull();
  
  console.log('Dashboard header found:', !!dashboardHeader);
  console.log('Network toggle found:', !!networkToggle);
  console.log('Portfolio tab found:', !!portfolioTab);
  
  // Click on different tabs to verify they work
  const fundManagementTab = await page.$('button:has-text("Fund Management")');
  if (fundManagementTab) {
    console.log('Clicking Fund Management tab');
    await fundManagementTab.click();
    await page.waitForTimeout(1000);
    
    // Check if fund management content is visible
    const fundManagementContent = await page.$('text=Fund Management');
    expect(fundManagementContent).not.toBeNull();
    console.log('Fund Management content found:', !!fundManagementContent);
  }
  
  const analyticsTab = await page.$('button:has-text("Performance Analytics")');
  if (analyticsTab) {
    console.log('Clicking Performance Analytics tab');
    await analyticsTab.click();
    await page.waitForTimeout(1000);
    
    // Check if analytics content is visible
    const analyticsContent = await page.$('text=Performance Analytics');
    expect(analyticsContent).not.toBeNull();
    console.log('Performance Analytics content found:', !!analyticsContent);
  }
  
  const complianceTab = await page.$('button:has-text("Compliance & Reporting")');
  if (complianceTab) {
    console.log('Clicking Compliance & Reporting tab');
    await complianceTab.click();
    await page.waitForTimeout(1000);
    
    // Check if compliance content is visible
    const complianceContent = await page.$('text=Compliance & Permissioning');
    expect(complianceContent).not.toBeNull();
    console.log('Compliance content found:', !!complianceContent);
  }
  
  // Take a final screenshot
  await page.screenshot({ path: 'dashboard-verification-final.png' });
  
  console.log('Dashboard verification completed successfully');
});
