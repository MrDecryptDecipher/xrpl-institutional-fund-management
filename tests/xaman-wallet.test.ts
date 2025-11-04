import { test, expect } from '@playwright/test';

test.describe('Xaman Wallet Connection', () => {
  test('should display Xaman wallet connection button', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://3.111.22.56:5002/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the Xaman wallet connection button is visible
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await expect(connectButton).toBeVisible();
  });

  test('should show error message for misconfigured redirect URIs', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://3.111.22.56:5002/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click the Xaman wallet connection button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for error message to appear
    await page.waitForTimeout(5000);
    
    // Check if error message is displayed
    const errorMessage = page.locator('text=Error: Xaman Redirect URI Not Configured');
    await expect(errorMessage).toBeVisible();
  });

  test('should display proper redirect URI configuration instructions', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://3.111.22.56:5002/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click the Xaman wallet connection button to trigger error
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for error message to appear
    await page.waitForTimeout(5000);
    
    // Check if redirect URI configuration instructions are displayed
    const redirectInstructions = page.locator('text=REQUIRED ACTION: Add http://localhost:5177/ to the "Origin/Redirect URIs"');
    await expect(redirectInstructions).toBeVisible();
  });

  test('should have proper Xaman Developer Console link', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://3.111.22.56:5002/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click the Xaman wallet connection button to trigger error
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for error message to appear
    await page.waitForTimeout(5000);
    
    // Check if Xaman Developer Console link is visible
    const developerConsoleLink = page.locator('a:has-text("https://apps.xumm.dev")');
    await expect(developerConsoleLink).toBeVisible();
  });
});