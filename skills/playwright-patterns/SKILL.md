---
name: playwright-patterns
description: "Use when writing Playwright tests or browser automation scripts. Invoke for Playwright API patterns, Page Object Model, selectors, mobile testing, visual testing, network mocking, and advanced Playwright techniques."
source: lackeyjb/playwright-skill (adapted)
---

# Playwright Patterns

Advanced Playwright patterns and techniques. Complements the `webapp-testing` skill (which covers MCP integration, server lifecycle, and reconnaissance-then-action workflow) with deep API patterns, test architecture, and specialized testing techniques.

**When to use this skill vs webapp-testing:**
- **webapp-testing** -- MCP-driven browser control, dev server management, quick interactive testing
- **playwright-patterns** -- Writing robust test suites, POM architecture, network mocking, CI/CD integration, advanced selectors

## Playwright Config

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    const button = page.locator('button[data-testid="submit"]');
    await button.click();
    await expect(page).toHaveURL('/success');
    await expect(page.locator('.message')).toHaveText('Success!');
  });
});
```

## Selector Strategy (Priority Order)

```javascript
// 1. BEST: data-testid attributes (most stable)
page.locator('[data-testid="submit-button"]')

// 2. GOOD: Role-based selectors (accessible)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('heading', { level: 1 })

// 3. GOOD: Text content (for unique text)
page.getByText('Sign in')
page.getByText(/welcome back/i)

// 4. OK: Semantic HTML attributes
page.locator('button[type="submit"]')
page.locator('input[name="email"]')

// 5. AVOID: Classes and IDs (fragile)
page.locator('.btn-primary')  // avoid
page.locator('#submit')       // avoid
```

### Advanced Locator Patterns

```javascript
// Filter rows by text, then act on child
const row = page.locator('tr').filter({ hasText: 'John Doe' });
await row.locator('button').click();

// Nth element
await page.locator('button').nth(2).click();

// Combine conditions
await page.locator('button').and(page.locator('[disabled]')).count();

// Navigate to parent
const cell = page.locator('td').filter({ hasText: 'Active' });
await cell.locator('..').locator('button.edit').click();
```

## Page Object Model (POM)

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

// Usage in test
test('login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});
```

## Network Mocking and Interception

```javascript
// Mock API responses
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ])
  });
});

// Modify request headers
await page.route('**/api/**', route => {
  route.continue({
    headers: { ...route.request().headers(), 'X-Custom': 'value' }
  });
});

// Block resources (speed up tests)
await page.route('**/*.{png,jpg,jpeg,gif}', route => route.abort());

// Wait for specific API response
const responsePromise = page.waitForResponse('**/api/users');
await page.click('button#load-users');
const response = await responsePromise;
const data = await response.json();
```

## Assertions Reference

```javascript
// Page-level
await expect(page).toHaveTitle('My App');
await expect(page).toHaveURL(/.*dashboard/);

// Visibility and state
await expect(page.locator('.message')).toBeVisible();
await expect(page.locator('.spinner')).toBeHidden();
await expect(page.locator('button')).toBeEnabled();
await expect(page.locator('input')).toBeDisabled();

// Text
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('.msg')).toContainText('success');

// Attributes and CSS
await expect(page.locator('button')).toHaveAttribute('type', 'submit');
await expect(page.locator('.error')).toHaveCSS('color', 'rgb(255, 0, 0)');

// Count and value
await expect(page.locator('.item')).toHaveCount(5);
await expect(page.locator('input')).toHaveValue('test@example.com');
await expect(page.locator('input[type="checkbox"]')).toBeChecked();
```

## Waiting Strategies

```javascript
// Element states
await page.locator('button').waitFor({ state: 'visible' });
await page.locator('.spinner').waitFor({ state: 'hidden' });

// URL changes
await page.waitForURL('**/success');
await page.waitForURL(url => url.pathname === '/dashboard');

// Network
await page.waitForLoadState('networkidle');

// Custom conditions
await page.waitForFunction(() => document.querySelector('.loaded'));
await page.waitForFunction(
  text => document.body.innerText.includes(text),
  'Content loaded'
);

// Wait for request/response
await page.waitForRequest(req =>
  req.url().includes('/api/') && req.method() === 'POST'
);
```

## Form Interactions

```javascript
// Labels and placeholders
await page.getByLabel('Email').fill('user@example.com');
await page.getByPlaceholder('Enter name').fill('John');

// Select dropdowns
await page.selectOption('select#country', 'usa');
await page.selectOption('select#country', { label: 'United States' });

// Multi-select
await page.selectOption('select#colors', ['red', 'blue', 'green']);

// File upload
await page.setInputFiles('input[type="file"]', 'path/to/file.pdf');
await page.setInputFiles('input[type="file"]', ['file1.pdf', 'file2.pdf']);

// Checkbox and radio
await page.getByLabel('I agree').check();
await page.getByLabel('Subscribe').uncheck();
```

## Mouse and Keyboard

```javascript
// Mouse
await page.click('button', { button: 'right' });
await page.dblclick('button');
await page.hover('.menu-item');
await page.dragAndDrop('#source', '#target');

// Keyboard
await page.keyboard.type('Hello', { delay: 100 });
await page.keyboard.press('Control+A');
await page.keyboard.press('Enter');
await page.keyboard.press('Escape');
```

## Visual Testing

```javascript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Element screenshot
await page.locator('.chart').screenshot({ path: 'chart.png' });

// Visual comparison (requires baseline)
await expect(page).toHaveScreenshot('homepage.png');
```

## Mobile Device Emulation

```javascript
const { devices } = require('playwright');
const iPhone = devices['iPhone 12'];

const context = await browser.newContext({
  ...iPhone,
  locale: 'en-US',
  permissions: ['geolocation'],
  geolocation: { latitude: 37.7749, longitude: -122.4194 }
});

const page = await context.newPage();
// Page now behaves as iPhone 12 with touch events, viewport, UA string
```

## Data-Driven Testing

```javascript
const testData = [
  { username: 'user1', password: 'pass1', expected: 'Welcome user1' },
  { username: 'user2', password: 'pass2', expected: 'Welcome user2' },
];

testData.forEach(({ username, password, expected }) => {
  test(`login with ${username}`, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('.message')).toHaveText(expected);
  });
});
```

## Accessibility Testing

```javascript
import { injectAxe, checkA11y } from 'axe-playwright';

test('accessibility check', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

## Handling Special Cases

### Popups

```javascript
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('button.open-popup')
]);
await popup.waitForLoadState();
```

### File Downloads

```javascript
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('button.download')
]);
await download.saveAs(`./downloads/${download.suggestedFilename()}`);
```

### iFrames

```javascript
const frame = page.frameLocator('#my-iframe');
await frame.locator('button').click();
```

### Infinite Scroll

```javascript
async function scrollToBottom(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
}
```

## Parallel Execution

```javascript
test.describe.parallel('Parallel suite', () => {
  test('test 1', async ({ page }) => { /* ... */ });
  test('test 2', async ({ page }) => { /* ... */ });
});
```

## CI/CD Integration (GitHub Actions)

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

## Debugging

```bash
npx playwright test --debug        # Inspector
npx playwright test --headed       # See browser
npx playwright codegen example.com # Generate code from actions
npx playwright show-report         # View HTML report
```

```javascript
// In-code debugging
await page.pause();  // Opens inspector

// Capture browser console
page.on('console', msg => console.log('Browser:', msg.text()));
page.on('pageerror', error => console.log('Error:', error));
```

## Best Practices

1. **Selectors** -- Prefer data-testid, then role-based, then semantic HTML. Avoid CSS classes.
2. **Waiting** -- Use Playwright auto-waiting. Never use hard-coded `waitForTimeout` in production tests.
3. **Isolation** -- Each test should be independent. Use `beforeEach` for setup.
4. **POM** -- Use Page Object Model for tests spanning multiple pages.
5. **Mocking** -- Mock external APIs to avoid flaky tests from network issues.
6. **Parallelism** -- Run tests in parallel. Design tests to not share state.
7. **CI screenshots** -- Configure `screenshot: 'only-on-failure'` for debugging CI failures.
8. **Traces** -- Use `trace: 'on-first-retry'` to debug flaky tests with full replay.
