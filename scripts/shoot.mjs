#!/usr/bin/env node
// Screenshots a URL at four widths and reports horizontal overflow, console errors,
// failed requests and images without alt. Usage: node scripts/shoot.mjs <url> [--out dir]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright'); // local or global install

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'shots';
if (!url) { console.error('usage: shoot.mjs <url> [--out dir]'); process.exit(2); }
mkdirSync(out, { recursive: true });

const sizes = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'wide-1440', width: 1440, height: 900 },
];
const browser = await chromium.launch();
let problems = 0;
for (const s of sizes) {
  const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const issues = [];
  page.on('console', (m) => { if (m.type() === 'error') issues.push(`console error: ${m.text()}`); });
  page.on('pageerror', (e) => issues.push(`page error: ${e.message}`));
  page.on('requestfailed', (r) => issues.push(`request failed: ${r.url()}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
    tooSmallTargets: [...document.querySelectorAll('a,button,input,select,textarea,[role=button]')]
      .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 24 || r.height < 24); }).length,
  }));
  if (info.overflow > 0) issues.push(`horizontal overflow: ${info.overflow}px`);
  if (info.noAlt) issues.push(`${info.noAlt} image(s) without alt attribute`);
  if (info.tooSmallTargets) issues.push(`${info.tooSmallTargets} interactive element(s) under 24x24px`);
  await page.screenshot({ path: `${out}/${s.name}.png`, fullPage: true });
  console.log(`${s.name}: ${issues.length ? 'ISSUES' : 'ok'}`);
  issues.forEach((i) => console.log(`  - ${i}`));
  problems += issues.length;
  await ctx.close();
}
await browser.close();
console.log(problems ? `\n${problems} issue(s). Screenshots in ${out}/ (view them; this script cannot judge design).` : `\nNo mechanical issues. Screenshots in ${out}/ (still view them).`);
process.exit(problems ? 1 : 0);
