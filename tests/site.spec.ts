import { test, expect, type Page } from '@playwright/test';

function trackPageDiagnostics(page: Page) {
  const consoleErrors: string[] = [];
  const requestFailures: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });
  page.on('requestfailed', (request) => {
    requestFailures.push(
      `${request.method()} ${request.url()} => ${request.failure()?.errorText ?? 'unknown'}`
    );
  });

  return { consoleErrors, requestFailures, pageErrors };
}

function expectNoClientErrors(diagnostics: ReturnType<typeof trackPageDiagnostics>) {
  expect(
    diagnostics.consoleErrors,
    `Console errors:\n${diagnostics.consoleErrors.join('\n')}`
  ).toEqual([]);
  expect(
    diagnostics.pageErrors,
    `Unhandled page errors:\n${diagnostics.pageErrors.join('\n')}`
  ).toEqual([]);
  expect(
    diagnostics.requestFailures,
    `Request failures:\n${diagnostics.requestFailures.join('\n')}`
  ).toEqual([]);
}

// Helper: start the quiz from the hero page (ensures hydration before clicking)
async function startQuiz(page: Page) {
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: /find tools for my child/i }).click();
  await expect(page.getByText('What grade is your child in?')).toBeVisible({ timeout: 8000 });
}

test.describe('Right Path Parent AI Guide — live site checks', () => {

  test('homepage loads and shows hero content', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // Logo visible
    await expect(page.locator('img[alt="Right Path Educational Consulting"]').first()).toBeVisible();

    // Headline
    await expect(page.getByText('Find the right AI tools')).toBeVisible();

    // CTA button
    await expect(page.getByRole('button', { name: /find tools for my child/i })).toBeVisible();

    // Stats
    await expect(page.getByText('80%')).toBeVisible();

    // Tagline
    await expect(page.getByText('Everyone deserves a right path!')).toBeVisible();

    await page.screenshot({ path: 'test-results/01-hero.png', fullPage: true });
    expectNoClientErrors(diagnostics);
  });

  test('quiz flow — completes all 5 steps and shows results', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await startQuiz(page);
    await page.screenshot({ path: 'test-results/02-quiz-step1.png', fullPage: true });

    // Step 1: Grade
    await page.getByRole('button', { name: /6th – 8th/i }).click();

    // Step 2: Subject
    await expect(page.getByText('What do you most want to support?')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test-results/02-quiz-step2.png', fullPage: true });
    await page.locator('button').filter({ hasText: 'Math' }).first().click();

    // Step 3: Goal
    await expect(page.getByText("What's your main goal?")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test-results/02-quiz-step3.png', fullPage: true });
    await page.getByRole('button', { name: /extra tutoring/i }).click();

    // Step 4: Concern
    await expect(page.getByText("What's your biggest concern")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test-results/02-quiz-step4.png', fullPage: true });
    await page.getByRole('button', { name: /over-reliance/i }).click();

    // Step 5: Budget
    await expect(page.getByText("What's your budget?")).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'test-results/02-quiz-step5.png', fullPage: true });
    await page.locator('button').filter({ hasText: 'Free only' }).first().click();

    // Loading state appears
    await expect(page.getByText('Finding your matches')).toBeVisible({ timeout: 5000 });

    // Results appear
    await expect(page.getByText('Your personalized recommendations')).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'test-results/02-results.png', fullPage: true });

    // At least one tool card
    const cards = page.locator('a:has-text("Try it")');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✓ ${count} tool cards rendered`);
    expectNoClientErrors(diagnostics);
  });

  test('results page — filter chips work', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await startQuiz(page);

    await page.getByRole('button', { name: /3rd – 5th/i }).click();
    await expect(page.getByText('What do you most want to support?')).toBeVisible({ timeout: 5000 });

    await page.locator('button').filter({ hasText: 'Reading' }).first().click();
    await expect(page.getByText("What's your main goal?")).toBeVisible({ timeout: 5000 });

    await page.locator('button').filter({ hasText: 'tutoring' }).first().click();
    await expect(page.getByText("What's your biggest concern")).toBeVisible({ timeout: 5000 });

    await page.locator('button').filter({ hasText: 'Privacy' }).first().click();
    await expect(page.getByText("What's your budget?")).toBeVisible({ timeout: 5000 });

    await page.locator('button').filter({ hasText: 'Free only' }).first().click();
    await expect(page.getByText('Your personalized recommendations')).toBeVisible({ timeout: 10000 });

    // Test "Builds skills" filter
    await page.getByRole('button', { name: /builds skills/i }).click();
    const count = await page.locator('a:has-text("Try it")').count();
    console.log(`✓ "Builds skills" filter: ${count} results`);

    await page.screenshot({ path: 'test-results/03-filter-chips.png', fullPage: true });

    // Switch back to all
    await page.getByRole('button', { name: /all results/i }).click();
    const allCount = await page.locator('a:has-text("Try it")').count();
    expect(allCount).toBeGreaterThanOrEqual(count);
    expectNoClientErrors(diagnostics);
  });

  test('branding — purple and gold colors applied', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await page.goto('./');
    await page.waitForLoadState('networkidle');

    // CTA button gold: #C48A2A = rgb(196, 138, 42)
    const ctaButton = page.getByRole('button', { name: /find tools for my child/i });
    const bgColor = await ctaButton.evaluate((el) => getComputedStyle(el).backgroundColor);
    console.log('CTA button color:', bgColor);
    expect(bgColor).toBe('rgb(196, 138, 42)');

    // Tagline in gold
    await expect(page.getByText('Everyone deserves a right path!')).toBeVisible();

    // Logo present
    await expect(page.locator('img[alt="Right Path Educational Consulting"]').first()).toBeVisible();

    await page.screenshot({ path: 'test-results/04-branding.png', fullPage: true });
    expectNoClientErrors(diagnostics);
  });

  test('back button navigation works in quiz', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await startQuiz(page);

    // Go to step 2
    await page.getByRole('button', { name: /9th – 12th/i }).click();
    await expect(page.getByText('What do you most want to support?')).toBeVisible({ timeout: 5000 });

    // Go back to step 1
    await page.getByRole('button', { name: /back/i }).click();
    await expect(page.getByText('What grade is your child in?')).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/05-back-nav.png', fullPage: true });
    expectNoClientErrors(diagnostics);
  });

  test('start over resets to hero', async ({ page }) => {
    const diagnostics = trackPageDiagnostics(page);

    await startQuiz(page);

    await page.getByRole('button', { name: /6th – 8th/i }).click();
    await expect(page.getByText('What do you most want to support?')).toBeVisible({ timeout: 5000 });
    await page.locator('button').filter({ hasText: 'Math' }).first().click();
    await expect(page.getByText("What's your main goal?")).toBeVisible({ timeout: 5000 });
    await page.locator('button').filter({ hasText: 'tutoring' }).first().click();
    await expect(page.getByText("What's your biggest concern")).toBeVisible({ timeout: 5000 });
    await page.locator('button').filter({ hasText: 'over-reliance' }).first().click();
    await expect(page.getByText("What's your budget?")).toBeVisible({ timeout: 5000 });
    await page.locator('button').filter({ hasText: 'Free only' }).first().click();

    await expect(page.getByText('Your personalized recommendations')).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: /start over/i }).click();
    await expect(page.getByText('Find the right AI tools')).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/06-reset.png', fullPage: true });
    expectNoClientErrors(diagnostics);
  });

});
