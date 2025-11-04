import { test, expect } from '@playwright/test';

test.describe('Xaman Wallet Connection - Verification Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('http://3.111.22.56:5002/');
    await page.waitForLoadState('networkidle');
  });

  test('should successfully create Xaman payload through proxy', async ({ page }) => {
    // Mock the API response to simulate successful payload creation
    await page.route('**/api/create-xaman-payload', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          uuid: 'test-uuid-123',
          refs: {
            qr_png: 'https://xumm.app/sign/test-uuid-123_q.png',
            qr_matrix: 'https://xumm.app/sign/test-uuid-123_q.json',
            qr_uri_quality_opts: ['m', 'q', 'h'],
            websocket_status: 'wss://xumm.app/sign/test-uuid-123'
          },
          pushed: false,
          next: {
            always: 'https://xumm.app/sign/test-uuid-123'
          }
        })
      });
    });

    // Click the connect button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();

    // Wait for QR code to appear (indicates successful payload creation)
    const qrCode = page.locator('img[alt="Xaman QR Code"]');
    await expect(qrCode).toBeVisible({ timeout: 15000 });

    // Verify the QR code has the correct source
    await expect(qrCode).toHaveAttribute('src', 'https://xumm.app/sign/test-uuid-123_q.png');

    // Verify payload ID is displayed
    const payloadId = page.locator('text=Payload ID: test-uuid-123');
    await expect(payloadId).toBeVisible();
  });

  test('should display proper error when API is unreachable', async ({ page }) => {
    // Mock a network error
    await page.route('**/api/create-xaman-payload', async route => {
      await route.fulfill({
        status: 502,
        contentType: 'text/plain',
        body: 'Bad Gateway'
      });
    });

    // Click the connect button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();

    // Wait for error message
    await page.waitForTimeout(5000);

    // Check for error message
    const errorMessage = page.locator('text=Failed to connect to Xaman wallet');
    await expect(errorMessage).toBeVisible();
  });

  test('should properly handle proxy configuration', async ({ page }) => {
    // Check that API calls are made to the correct endpoint (proxy)
    let apiCalled = false;
    page.on('request', request => {
      if (request.url().includes('/api/create-xaman-payload')) {
        apiCalled = true;
        // Verify it's using the proxy URL, not direct Xaman API
        expect(request.url()).toBe('http://3.111.22.56:5002/api/create-xaman-payload');
      }
    });

    // Click the connect button
    const connectButton = page.locator('button:has-text("Connect with Xaman")');
    await connectButton.click();

    // Wait for request to be made
    await page.waitForTimeout(3000);

    // Verify the API was called through the proxy
    expect(apiCalled).toBe(true);
  });

  test('should display Xaman component without initialization errors', async ({ page }) => {
    // Check that the Xaman wallet component is visible
    const xamanComponent = page.locator('div:has-text("Connect Xaman Wallet")');
    await expect(xamanComponent).toBeVisible({ timeout: 10000 });

    // Check that there are no initialization errors
    const initError = page.locator('text=Error:');
    // Count visible error messages
    const errorCount = await initError.count();
    
    // Allow for redirect URI configuration error (which is expected until configured)
    // But ensure no other initialization errors
    for (let i = 0; i < errorCount; i++) {
      const errorText = await initError.nth(i).textContent();
      // Should only have redirect URI errors, not other initialization errors
      expect(errorText).toContain('Xaman Redirect URI Not Configured');
    }
  });

  test('should properly bind to public IP for external access', async ({ page }) => {
    // This test verifies that the frontend is accessible from the public IP
    // We're already accessing it through the public IP in beforeEach
    const title = page.locator('h3:has-text("Connect Xaman Wallet")');
    await expect(title).toBeVisible({ timeout: 10000 });
  });
});