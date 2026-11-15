const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [390,768,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
   await page.locator('#career-paths').waitFor();
   assert.equal(await page.locator('.nr-reference').count(),7,'All reference sections render');
   assert.match(await page.locator('.cs-phone-title').innerText(),/ship first/i);
   await page.locator('[data-quick-choice="login"]').click();
   assert.match(await page.locator('.nm-quick-feedback').innerText(),/need access/i);
   await page.locator('[data-preview-role="marketing"]').click();
   await page.locator('[data-quick-choice="trials"]').click();
   assert.match(await page.locator('.nm-quick-feedback').innerText(),/matches the brief/i);
   const faq=page.locator('#faq details').first();await faq.locator('summary').click();
   assert(await faq.evaluate(el=>el.open),'FAQ opens');
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))<=2,'No horizontal overflow at '+width);
   await page.locator('#career-paths a[href="#careers"]').first().click();
   await page.getByText('Your first day as an AI Product Manager').waitFor();
   assert.deepEqual(errors,[]);await page.close();
   console.log('PASS landing reference',width);
  }
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
