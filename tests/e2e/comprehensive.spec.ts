import { test, expect } from '@playwright/test';

const BASE_URL = 'http://3.111.22.56:5002';

test.describe('XRPL Institutional Fund Management - Comprehensive E2E Tests', () => {
  
  test.describe('Authentication & Routing', () => {
    test('should load login page', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page).toHaveURL(`${BASE_URL}/login`);
      await expect(page.locator('h3')).toContainText('Welcome to XRPL Fund Management');
    });

    test('should have Xaman login button', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      const loginButton = page.locator('button:has-text("Continue with Xaman")');
      await expect(loginButton).toBeVisible();
    });

    test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
      await page.goto(`${BASE_URL}/dashboard`);
      await expect(page).toHaveURL(`${BASE_URL}/login`);
    });
  });

  test.describe('Dashboard Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authentication
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
    });

    test('should load dashboard after authentication', async ({ page }) => {
      await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
    });

    test('should have all navigation tabs', async ({ page }) => {
      const tabs = [
        'Overview',
        'Funds',
        'Analytics',
        'Compliance',
        'Risk',
        'Reports',
        'XLS Standards',
        'Governance',
        'Wallet'
      ];

      for (const tab of tabs) {
        await expect(page.locator(`text=${tab}`).first()).toBeVisible();
      }
    });

    test('should have sign out button', async ({ page }) => {
      await expect(page.locator('button:has-text("Sign Out")')).toBeVisible();
    });
  });

  test.describe('XLS Standards Tab - Core XRPL Primitives', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
      await page.click('text=XLS Standards');
      await page.waitForTimeout(1000);
    });

    test('should display Amendment Tracker', async ({ page }) => {
      await expect(page.locator('h2:has-text("Amendment Tracker")')).toBeVisible();
      await expect(page.locator('text=Network Compatibility')).toBeVisible();
    });

    test('should display MPT Management', async ({ page }) => {
      await expect(page.locator('h2:has-text("MPT Management")')).toBeVisible();
      await expect(page.locator('text=Authorize MPT')).toBeVisible();
      await expect(page.locator('text=Send MPT')).toBeVisible();
      await expect(page.locator('text=View MPTs')).toBeVisible();
    });

    test('should display DID Management', async ({ page }) => {
      await expect(page.locator('h2:has-text("DID Management")')).toBeVisible();
      await expect(page.locator('text=Create DID')).toBeVisible();
      await expect(page.locator('text=View DID')).toBeVisible();
      await expect(page.locator('text=Update DID')).toBeVisible();
    });

    test('should display Credentials Management', async ({ page }) => {
      await expect(page.locator('h2:has-text("Credentials Management")')).toBeVisible();
      await expect(page.locator('text=Issue')).toBeVisible();
      await expect(page.locator('text=Accept')).toBeVisible();
      await expect(page.locator('text=My Credentials')).toBeVisible();
      await expect(page.locator('text=Verify')).toBeVisible();
    });

    test('should display Permissioned Domains Management', async ({ page }) => {
      await expect(page.locator('h2:has-text("Permissioned Domains")')).toBeVisible();
      await expect(page.locator('text=Create Domain')).toBeVisible();
      await expect(page.locator('text=Manage Members')).toBeVisible();
      await expect(page.locator('text=My Domains')).toBeVisible();
    });

    test('should display AMM Management', async ({ page }) => {
      await expect(page.locator('h2:has-text("AMM Management")')).toBeVisible();
      await expect(page.locator('text=Create AMM')).toBeVisible();
      await expect(page.locator('text=Add Liquidity')).toBeVisible();
      await expect(page.locator('text=My Pools')).toBeVisible();
      await expect(page.locator('text=Vote Fee')).toBeVisible();
    });

    test('should display Lending Protocol', async ({ page }) => {
      await expect(page.locator('h2:has-text("Lending Protocol")')).toBeVisible();
      await expect(page.locator('text=Deposit')).toBeVisible();
      await expect(page.locator('text=Borrow')).toBeVisible();
      await expect(page.locator('text=Repay')).toBeVisible();
      await expect(page.locator('text=Pools')).toBeVisible();
    });
  });

  test.describe('Compliance Tab - Domain Verification & Audit', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
      await page.click('text=Compliance');
      await page.waitForTimeout(1000);
    });

    test('should display Domain Verification', async ({ page }) => {
      await expect(page.locator('h2:has-text("Domain Verification")')).toBeVisible();
      await expect(page.locator('text=Generate TOML')).toBeVisible();
      await expect(page.locator('text=Link Domain')).toBeVisible();
      await expect(page.locator('text=Verify Domain')).toBeVisible();
    });

    test('should display Audit Trail Viewer', async ({ page }) => {
      await expect(page.locator('h2:has-text("Audit Trail Viewer")')).toBeVisible();
      await expect(page.locator('text=Audit Logs')).toBeVisible();
    });
  });

  test.describe('Component Interactions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
    });

    test('MPT Management - should switch between tabs', async ({ page }) => {
      await page.click('text=XLS Standards');
      await page.waitForTimeout(500);
      
      // Click Authorize MPT tab
      await page.locator('button:has-text("Authorize MPT")').first().click();
      await expect(page.locator('text=MPT Issuance ID')).toBeVisible();
      
      // Click Send MPT tab
      await page.locator('button:has-text("Send MPT")').first().click();
      await expect(page.locator('text=Destination')).toBeVisible();
      
      // Click View MPTs tab
      await page.locator('button:has-text("View MPTs")').first().click();
      await expect(page.locator('button:has-text("Refresh MPTs")')).toBeVisible();
    });

    test('DID Management - should switch between tabs', async ({ page }) => {
      await page.click('text=XLS Standards');
      await page.waitForTimeout(500);
      
      // Scroll to DID Management
      await page.locator('h2:has-text("DID Management")').scrollIntoViewIfNeeded();
      
      // Click Create DID tab
      await page.locator('button:has-text("Create DID")').nth(1).click();
      await expect(page.locator('text=URI (Optional)')).toBeVisible();
      
      // Click View DID tab
      await page.locator('button:has-text("View DID")').nth(1).click();
      await expect(page.locator('button:has-text("Load DID")')).toBeVisible();
    });

    test('Domain Verification - should generate TOML file', async ({ page }) => {
      await page.click('text=Compliance');
      await page.waitForTimeout(500);
      
      // Fill in domain verification form
      await page.fill('input[placeholder="example.com"]', 'test-institution.com');
      await page.fill('input[placeholder="Acme Institutional Fund"]', 'Test Institution');
      
      // Click Generate TOML
      await page.click('button:has-text("Generate TOML File")');
      
      // Should show generated TOML
      await expect(page.locator('text=Generated xrp-ledger.toml')).toBeVisible();
      await expect(page.locator('button:has-text("Download")')).toBeVisible();
    });

    test('Audit Trail Viewer - should load audit logs', async ({ page }) => {
      await page.click('text=Compliance');
      await page.waitForTimeout(500);
      
      // Scroll to Audit Trail Viewer
      await page.locator('h2:has-text("Audit Trail Viewer")').scrollIntoViewIfNeeded();
      
      // Click Load Audit Logs
      await page.click('button:has-text("Load Audit Logs")');
      await page.waitForTimeout(1000);
      
      // Should show logs
      await expect(page.locator('text=Showing')).toBeVisible();
    });

    test('AMM Management - should display create AMM form', async ({ page }) => {
      await page.click('text=XLS Standards');
      await page.waitForTimeout(500);
      
      // Scroll to AMM Management
      await page.locator('h2:has-text("AMM Management")').scrollIntoViewIfNeeded();
      
      // Should show create AMM form
      await expect(page.locator('text=Asset 1')).toBeVisible();
      await expect(page.locator('text=Asset 2')).toBeVisible();
      await expect(page.locator('text=Trading Fee')).toBeVisible();
    });

    test('Lending Protocol - should display deposit form', async ({ page }) => {
      await page.click('text=XLS Standards');
      await page.waitForTimeout(500);
      
      // Scroll to Lending Protocol
      await page.locator('h2:has-text("Lending Protocol")').scrollIntoViewIfNeeded();
      
      // Should show deposit form
      await expect(page.locator('text=Lending Pool')).toBeVisible();
      await expect(page.locator('button:has-text("Deposit")')).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
    });

    test('MPT Management - should validate required fields', async ({ page }) => {
      await page.click('text=XLS Standards');
      await page.waitForTimeout(500);
      
      // Try to authorize without filling fields
      await page.locator('button:has-text("Authorize MPT")').first().click();
      await page.click('button:has-text("Authorize MPT Receipt")');
      
      // Should show validation error
      await expect(page.locator('text=Please fill in all required fields')).toBeVisible();
    });

    test('Domain Verification - should validate required fields', async ({ page }) => {
      await page.click('text=Compliance');
      await page.waitForTimeout(500);
      
      // Try to generate TOML without filling fields
      await page.click('button:has-text("Generate TOML File")');
      
      // Button should be disabled
      const button = page.locator('button:has-text("Generate TOML File")');
      await expect(button).toBeDisabled();
    });
  });

  test.describe('Performance & Responsiveness', () => {
    test('should load dashboard within 3 seconds', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      
      const startTime = Date.now();
      await page.goto(`${BASE_URL}/dashboard`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(3000);
    });

    test('should not have console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(`${BASE_URL}/login`);
      await page.evaluate(() => {
        localStorage.setItem('xrpl_account', 'rN7n7otQDd6FczFgLdlqtyMVrn3LNU8rgc');
      });
      await page.goto(`${BASE_URL}/dashboard`);
      await page.waitForTimeout(2000);
      
      // Filter out expected errors (like network requests to mock endpoints)
      const criticalErrors = errors.filter(err => 
        !err.includes('Failed to fetch') && 
        !err.includes('NetworkError')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  });
});

