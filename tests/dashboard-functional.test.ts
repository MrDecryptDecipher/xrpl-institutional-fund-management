import { test, expect } from '@playwright/test';

test('Dashboard functionality test', async ({ page }) => {
  // Increase timeout for this test
  test.setTimeout(60000);
  
  // Navigate to the app
  await page.goto('http://localhost:5176/');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Check if we can see the force show dashboard button (which indicates we're not authenticated)
  const forceShowButton = await page.$('button:has-text("Force Show Dashboard")');
  
  if (forceShowButton) {
    console.log('Clicking force show dashboard button');
    await forceShowButton.click();
    await page.waitForTimeout(2000);
  }
  
  // Now check if the dashboard is visible
  const dashboardContainer = await page.$('.dashboard-container, .institutional-dashboard, [data-testid="dashboard"]');
  if (dashboardContainer) {
    console.log('Dashboard container found');
    
    // Check for key dashboard elements
    const networkToggle = await page.$('button:has-text("Testnet")');
    const transactionExecutor = await page.$('button:has-text("Execute Transaction")');
    const fundManagementSection = await page.$('text=Fund Management');
    const analyticsSection = await page.$('text=Performance Analytics');
    
    console.log('Network toggle found:', !!networkToggle);
    console.log('Transaction executor found:', !!transactionExecutor);
    console.log('Fund management section found:', !!fundManagementSection);
    console.log('Analytics section found:', !!analyticsSection);
    
    // Try to interact with the network toggle
    if (networkToggle) {
      console.log('Clicking network toggle');
      await networkToggle.click();
      await page.waitForTimeout(1000);
      
      // Check if we can toggle between networks
      const mainnetOption = await page.$('button:has-text("Mainnet")');
      if (mainnetOption) {
        console.log('Mainnet option found, clicking');
        await mainnetOption.click();
        await page.waitForTimeout(1000);
      }
    }
    
    // Try to interact with transaction executor
    if (transactionExecutor) {
      console.log('Clicking execute transaction button');
      await transactionExecutor.click();
      await page.waitForTimeout(1000);
      
      // Check for transaction modal or response
      const transactionModal = await page.$('text=Transaction');
      console.log('Transaction modal/response found:', !!transactionModal);
    }
  } else {
    console.log('Dashboard container not found');
    // Take a screenshot to see what's actually being displayed
    await page.screenshot({ path: 'dashboard-not-found.png' });
  }
  
  // Take a final screenshot
  await page.screenshot({ path: 'final-dashboard-state.png' });
});