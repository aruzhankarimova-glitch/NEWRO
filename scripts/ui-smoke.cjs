const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const site = 'http://127.0.0.1:4173/';
fs.mkdirSync('test-results', { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const contexts = [];
  try {
    for (const device of [
      { name: 'desktop', width: 1440, height: 900, reducedMotion: 'no-preference' },
      { name: 'mobile', width: 390, height: 844, reducedMotion: 'reduce' },
      { name: 'small-mobile', width: 360, height: 800, reducedMotion: 'reduce' },
      { name: 'tablet', width: 768, height: 1024, reducedMotion: 'reduce' }
    ]) {
      const ctx = await browser.newContext({ viewport: { width: device.width, height: device.height }, reducedMotion: device.reducedMotion });
      contexts.push(ctx);
      const page = await ctx.newPage();
      page.on('pageerror', error => errors.push(device.name + ': ' + error.message));
      await page.goto(site, { waitUntil: 'domcontentloaded' });
      if (device.name === 'desktop') {
        // Capture animation before waiting for content lower on the page.
        await page.locator('.nl-sw-controls').waitFor({ timeout: 5000 });
        await page.screenshot({ path: 'test-results/newro-desktop-swarm.png', fullPage: false });
        await page.locator('.nl-sw-skip').click();
        assert.equal(await page.locator('.cs-title').evaluate(el => getComputedStyle(el).opacity), '1', 'skip instantly reveals hero');
      }
      await page.locator('.cs-title').waitFor();
      await page.locator('.cs-role').first().waitFor();
      assert.equal(await page.locator('.cs-role').count(), 2, device.name + ': role cards');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert(overflow <= 2, device.name + ': overflow ' + overflow + 'px');
      if (device.width <= 760) {
        assert(await page.locator('.nl-mobile-dock').isVisible(), device.name + ': app dock');
        assert.equal(await page.locator('#nl-build-overlay').count(), 0, device.name + ': no heavy animation on mobile');
      }
      if (device.name !== 'tablet') {
        await page.screenshot({ path: 'test-results/newro-' + device.name + '.png', fullPage: true });
      }

      if (device.name === 'mobile') {
        await page.locator('.cs-role').first().click();
        await page.getByText('Your first day in AI marketing.').waitFor();
        assert(await page.locator('.cs-player .cs-course-meta').count() === 1, 'learning meta displayed');
        await page.getByRole('button', { name: 'View your learning path' }).click();
        await page.getByRole('dialog', { name: 'Career learning path' }).waitFor();
        await page.getByRole('button', { name: 'Close learning path' }).click();
        await page.screenshot({ path: 'test-results/newro-mobile-player.png', fullPage: true });
        await page.getByRole('button', { name: 'Open the brief' }).click();
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.getByText('Meet your client, Harbor').waitFor();
        await page.getByRole('button', { name: 'Exit to careers (progress is saved)' }).click();
        await page.getByRole('button', { name: 'Browse careers' }).click();
        assert(await page.getByRole('button', { name: 'Resume', exact: true }).count() >= 1, 'resume action');
      }
      if (device.name === 'desktop') {
        await page.locator('.cs-role').nth(1).click();
        await page.getByText('Your first day as a Product Manager').waitFor();
        await page.getByRole('button', { name: 'Open the release brief' }).click();
        await page.getByRole('button', { name: 'Choose what ships' }).click();
        await page.getByRole('button', { name: /Fix the iOS login crash/ }).click();
        await page.getByRole('button', { name: /Renewal reminders/ }).click();
        await page.getByRole('button', { name: 'Review my trade-offs' }).click();
        await page.getByText('Every release makes trade-offs').waitFor();
      }
      await ctx.close();
    }
    // Motion must also run on phones: verify multiple cursors, replay and skip.
    const animated = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
    contexts.push(animated);
    const phone = await animated.newPage();
    phone.on('pageerror', error => errors.push('mobile-animation: ' + error.message));
    await phone.goto(site, { waitUntil: 'domcontentloaded' });
    await phone.locator('.nl-sw-controls').waitFor({ timeout: 8000 });
    assert(await phone.locator('.nl-sw-cursor').count() >= 3, 'three or more animated mobile cursors');
    await phone.waitForFunction(() => document.querySelectorAll('.nl-sw-cursor[data-working="true"]').length >= 2, null, { timeout: 3000 });
    await phone.waitForTimeout(450);
    await phone.screenshot({ path: 'test-results/newro-mobile-swarm.png', fullPage: false });
    await phone.locator('.nl-sw-skip').click();
    assert(await phone.locator('.nl-sw-controls').count() === 0, 'mobile skip ends construction');
    await phone.locator('.cs-replay').click();
    await phone.locator('.nl-sw-controls').waitFor({ timeout: 5000 });
    await phone.locator('.nl-sw-skip').click();
    await phone.locator('.cs-role').first().click();
    await phone.getByText('Your first day in AI marketing.').waitFor();
    await animated.close();

    assert.deepEqual(errors, [], 'No page exceptions');
    console.log('PASS: desktop, tablet, mobile, persistence, PM flow, a11y entrypoints, no overflow, no JS errors');
  } finally {
    await browser.close();
  }
}
run().catch(e => { console.error(e.stack || e); process.exit(1); });