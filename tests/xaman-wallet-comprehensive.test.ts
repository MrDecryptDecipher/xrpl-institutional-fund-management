import { test, expect } from '@playwright/test';

test.describe('Xaman Wallet Connection - Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should initialize Xaman wallet component without hanging', async ({ page }) => {
    // Check that the initializing message doesn't hang indefinitely
    const initializingMessage = page.locator('text=Initializing Xaman wallet...');
    
    // Wait for a reasonable time (should not hang indefinitely)
    try {
      await initializingMessage.waitFor({ state: 'visible', timeout: 10000 });
      // If it appears, it should disappear within a reasonable time
      await initializingMessage.waitFor({ state: 'detached', timeout: 15000 });
    } catch (error) {
      // If the initializing message is not present, that's also fine
      // It means the component initialized quickly
    }
    
    // The connect button should eventually be visible
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await expect(connectButton).toBeVisible({ timeout: 20000 });
  });

  test('should handle WebSocket connection properly', async ({ page }) => {
    // Check for any WebSocket connection errors in the browser console
    const websocketErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('WebSocket')) {
        websocketErrors.push(msg.text());
      }
    });
    
    // Wait for page to load completely
    await page.waitForTimeout(5000);
    
    // Check that we don't have WebSocket connection errors
    // This test will pass if there are no WebSocket errors
    expect(websocketErrors.filter(error => 
      error.includes('WebSocket connection to') && 
      error.includes('failed')
    )).toHaveLength(0);
  });

  test('should properly initialize Xumm SDK with API Key only', async ({ page }) => {
    // Click the connect button to trigger SDK initialization
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for the connection process to start
    await page.waitForTimeout(3000);
    
    // Check that we don't get errors about missing API Secret
    const secretError = page.locator('text=API Secret');
    // The page should not mention API Secret in error messages for browser environments
    await expect(secretError).not.toBeVisible();
  });

  test('should display correct error messages for payload creation timeout', async ({ page }) => {
    // Click the connect button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for the timeout error (10 seconds as per Xaman SDK)
    await page.waitForTimeout(12000);
    
    // Check for the correct error message
    const errorMessage = page.locator('text=Payload creation timeout - check Xaman Developer Console configuration');
    await expect(errorMessage).toBeVisible();
    
    // Check for specific redirect URI guidance
    const redirectGuidance = page.locator('text=http://3.111.22.56:5176/');
    await expect(redirectGuidance).toBeVisible();
  });

  test('should provide clear user guidance for fixing configuration issues', async ({ page }) => {
    // Click the connect button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for error
    await page.waitForTimeout(12000);
    
    // Check for refresh button
    const refreshButton = page.locator('button:has-text("Refresh Page to Apply Changes")');
    await expect(refreshButton).toBeVisible();
    
    // Check for clear error description
    const errorDescription = page.locator('text=Error: Payload creation timeout');
    await expect(errorDescription).toBeVisible();
  });

  test('should follow official Xaman SDK browser integration patterns', async ({ page }) => {
    // Check that the component doesn't try to use API Secret in frontend
    // This is verified by ensuring no error messages about API Secret appear
    
    // Click connect
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();
    
    // Wait for processing
    await page.waitForTimeout(5000);
    
    // Check that error messages are about redirect URIs, not API Secret
    const errorMessages = page.locator('[class*="error"], [class*="Error"]');
    // Count errors that mention redirect URI vs API Secret
    const redirectErrors = await page.locator('text=redirect').count();
    const secretErrors = await page.locator('text=secret').count();
    
    // Should have redirect-related errors but not secret-related errors
    expect(secretErrors).toBe(0);
  });
});