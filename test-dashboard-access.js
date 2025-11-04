import { chromium } from 'playwright';

async function takeDashboardScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the dashboard
  await page.goto('http://localhost:5176/');
  await page.waitForTimeout(3000);
  
  // Take screenshot of the initial page
  await page.screenshot({ path: 'dashboard-initial.png' });
  console.log('Taken screenshot of initial dashboard page');
  
  // Click the "Force Show Dashboard" button
  const forceShowButton = await page.$('button:has-text("Force Show Dashboard")');
  if (forceShowButton) {
    await forceShowButton.click();
    await page.waitForTimeout(3000);
    
    // Take screenshot of the forced dashboard
    await page.screenshot({ path: 'dashboard-forced-show.png' });
    console.log('Taken screenshot of forced dashboard');
    
    // Click on a few tabs to show they work
    const fundManagementTab = await page.$('button:has-text("Fund Management")');
    if (fundManagementTab) {
      await fundManagementTab.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'dashboard-fund-management.png' });
      console.log('Taken screenshot of fund management tab');
    }
    
    const analyticsTab = await page.$('button:has-text("Performance Analytics")');
    if (analyticsTab) {
      await analyticsTab.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'dashboard-analytics.png' });
      console.log('Taken screenshot of analytics tab');
    }
  }
  
  await browser.close();
  console.log('All screenshots taken successfully!');
}

takeDashboardScreenshots().catch(console.error);