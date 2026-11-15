const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  {
   const returning=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
   await returning.addInitScript(()=>localStorage.setItem('newro-career-tryout-v1',JSON.stringify({role:'marketing',step:2,marketing:{},pm:{selection:[],answers:{}}})));
   await returning.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
   assert(await returning.locator('.cs-title').isVisible(),'Root URL opens the homepage even with saved progress');
   await returning.locator('.cs-resume [data-resume]').click();
   await returning.getByText('Find the strongest signal').waitFor();
   await returning.close();
  }
  for(const width of [390,768,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded'});
   await page.locator('#careers.nr-tracks').waitFor();
   assert.equal(await page.locator('.nr-reference').count(),7,'All reference sections render');
   assert.equal((await page.locator('body').innerText()).includes('—'),false,'Landing contains no em dashes');
   assert.equal((await page.locator('body').innerText()).includes('Someone using AI will'),false,'Landing avoids unsupported job predictions');
   assert.match(await page.locator('.cs-phone-title').innerText(),/ships Friday/i);
   assert.match(await page.locator('.cs-phone-task').innerText(),/12 \/ 24/);
   await page.locator('[data-quick-choice="household"]').click();
   assert.match(await page.locator('.cs-phone-task').innerText(),/28 \/ 24/);
   assert.match(await page.locator('.nm-quick-feedback').innerText(),/over the 24-hour budget/i);
   await page.locator('[data-preview-role="marketing"]').click();
   assert.match(await page.locator('.cs-stage-live').innerText(),/MARKETING/);
   await page.locator('[data-quick-choice="trials"]').click();
   assert.match(await page.locator('.nm-quick-feedback').innerText(),/matches the brief/i);
   const faq=page.locator('#faq details').first();await faq.locator('summary').click();
   assert(await faq.evaluate(el=>el.open),'FAQ opens');
   assert((await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))<=2,'No horizontal overflow at '+width);
   await page.getByRole('button',{name:'Try the PM simulation'}).click();
   await page.getByText('Your first day as an AI Product Manager').waitFor();
   assert.deepEqual(errors,[]);await page.close();
   console.log('PASS landing reference',width);
  }
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
