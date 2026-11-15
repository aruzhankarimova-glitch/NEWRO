const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const URL = 'http://127.0.0.1:4173/';
fs.mkdirSync('test-results', {recursive:true});

async function choose(page, text) {
  const item = page.locator('.choice').filter({hasText:text}).first();
  await item.click();
}
async function next(page) {
  const btn=page.locator('#next');
  assert(await btn.isEnabled(), 'Simulation next button must be enabled');
  await btn.click();
}
async function tryout(page, role) {
  await page.locator('.cs-role').nth(role==='marketing'?0:1).click();
  await next(page); await next(page);
  if(role==='marketing') {
    await choose(page,'I forget when free trials');
    await next(page);
    await choose(page,'People managing free trials');
    await next(page);
    await choose(page,'See upcoming renewals before you are charged.');
    await next(page);
    await choose(page,'Calm and practical');
    await next(page);
    await choose(page,'Know what renews next.');
    await next(page);
    await choose(page,'Small paid social test');
    await choose(page,'Landing-page signup rate');
    await page.locator('.nr-ad-card[data-choice-id="story"]').click();
    assert.equal(await page.locator('.nr-ad-card[aria-pressed="true"]').count(),1,'Exactly one creative is selected');
    await page.screenshot({path:'test-results/newro-marketing-creative-choice.png',fullPage:true});
    await next(page);
    await page.locator('.nr-test-results').waitFor();
    assert.match(await page.locator('.nr-test-results').innerText(),/invented for learning/);
    await page.locator('#field-reason').fill('I would check whether the landing page matches the ad, then adjust the audience or message before raising the budget.');
    await next(page); await next(page);
  } else {
    await choose(page,'Fix the iOS login crash');
    await choose(page,'Renewal reminders');
    await next(page); await next(page);
    const groups=page.locator('.cards');
    await groups.nth(0).locator('.choice').nth(0).click();
    await groups.nth(1).locator('.choice').nth(1).click();
    await groups.nth(2).locator('.choice').nth(2).click();
    await next(page);
    await page.locator('#field-pmreason').fill('I would prioritize the iOS login fix to unblock customers, then build renewal reminders within the remaining hours.');
    await next(page);
  }
  await page.getByRole('button',{name:'Save work & continue →'}).waitFor();
  await page.getByRole('button',{name:'Save work & continue →'}).click();
  await page.locator('.nf-first-result').waitFor();
  assert.equal(await page.locator('#nf-onboard-form').count(),0,'Show actual work before asking for onboarding');
  const firstResult=await page.evaluate(()=>window.NEWROFlow.getState());
  assert.equal(firstResult.samples.length,1,'First result stored');
  const earlyDownload=page.waitForEvent('download');
  await page.getByRole('button',{name:'Download my work'}).click();
  assert((await earlyDownload).suggestedFilename().includes('newro-tryout'),'Work downloadable before onboarding');
  await page.getByRole('button',{name:'Continue learning'}).click();
  await page.locator('#nf-onboard-form').waitFor();
}
const answers={
 marketing:[
  'People who rely on free trials and forget about upcoming renewal dates need an easy way to see their subscriptions before they are charged.',
  'See your upcoming subscription renewals and plan what to keep before you are billed.',
  'Create two short headlines for customers juggling free trials. Use a calm, practical tone. Highlight upcoming renewal visibility. Avoid guarantees or unsupported AI claims.',
  'Run a seven-day paid social test with a small budget. Measure landing-page signup rate. If signups are low, check message clarity and audience fit before expanding.'
 ],
 pm:[
  'The iOS login failure blocks users from accessing their subscriptions, which makes the service unreliable at the moment they need it.',
  'Ship the four-hour login fix and the eight-hour renewal reminders work. Postpone the risky onboarding changes and household permissions until testing is complete. Keep time for QA.',
  'This Friday our team will resolve the login issue and deliver renewal reminders. We are postponing household sharing because the permissions model is not ready and would increase release risk.',
  'After deployment, monitor the login failure rate and customer support incidents. Compare with the pre-release baseline and watch whether reminders are used without new errors.'
 ]
};
async function runCase(browser,role,device) {
  const context=await browser.newContext({viewport:device.viewport,reducedMotion:'reduce',acceptDownloads:true});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  try{
    await page.goto(URL,{waitUntil:'domcontentloaded'});
    await page.locator('.cs-role').first().waitFor();
    const imgs=await page.locator('.nf-landing-art').evaluateAll(nodes=>nodes.map(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.getAttribute('src')})));
    assert.equal(imgs.length,2,'Landing role illustrations');
    assert(imgs.every(x=>x.loaded),'Role images load');
    await page.screenshot({path:'test-results/newro-full-home-'+device.name+'.png',fullPage:true});
    await tryout(page,role);
    await page.locator('#nf-on-name').fill(role==='marketing'?'Alex':'Jordan');
    await page.locator('#nf-on-goal').selectOption('transition');
    await page.locator('#nf-on-time').selectOption('20 minutes a day');
    await page.locator('#nf-onboard-form button[type=submit]').click();
    await page.locator('.nf-banner').waitFor();
    assert(await page.getByText('My learning',{exact:true}).count()>=1,'Dashboard rendered');
    const state=await page.evaluate(()=>window.NEWROFlow.getState());
    assert.equal(state.done[role],true,'Try-out completion persisted');
    assert.equal(state.samples.filter(x=>x.kind==='tryout').length,1,'Try-out saved to portfolio');
    await page.screenshot({path:'test-results/newro-dashboard-'+device.name+'.png',fullPage:true});
    await page.locator('.nf-milestone[data-flow-action=project]').click();
    await page.locator('#nr-paywall [role=dialog]').waitFor();
    assert.match(await page.locator('#nr-paywall').innerText(), /Ready for the next chapter/, 'Guided project is gated');
    await page.locator('[data-nr-close]').last().click();
    await page.evaluate(()=>window.NEWROFlow.goto('portfolio'));
    await page.locator('.nf-sample').first().waitFor();
    assert.equal(await page.locator('.nf-sample').count(),1,'Free try-out retained in portfolio');
    await page.locator('.nf-sample').first().getByRole('button',{name:/Open work sample/}).click();
    const item=page.locator('.nf-detail-banner');
    await item.waitFor();
    const downloadPromise=page.waitForEvent('download');
    await page.locator('[data-flow-action=download-sample]').click();
    const download=await downloadPromise;
    assert(download.suggestedFilename().includes('newro-tryout'),'Download is a real free artifact');
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.nf-detail-banner').waitFor();
    await page.locator(device.name==='mobile'?'.nf-dock .nf-navitem[data-flow-go=profile]':'.nf-navdesk .nf-navitem[data-flow-go=profile]').click();
    await page.locator('#nf-profile-form').waitFor();
    await page.locator('#nf-name').fill('Test Learner');
    await page.locator('#nf-profile-form button[type=submit]').click();
    await page.locator('.nf-banner').waitFor();
    const saved=await page.evaluate(()=>window.NEWROFlow.getState());
    assert.equal(saved.profile.name,'Test Learner');
    assert.equal(saved.projects[role].complete,false,'Guided project stays locked');
    assert.equal(saved.samples.length,1);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert(overflow<=2,'No horizontal overflow: '+overflow);
    assert.deepEqual(errors,[],'No JavaScript exceptions');
    console.log('PASS full flow:',role,device.name);
  }finally{await context.close();}
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  await runCase(browser,'marketing',{name:'mobile',viewport:{width:390,height:844}});
  await runCase(browser,'pm',{name:'desktop',viewport:{width:1440,height:900}});
 }finally{await browser.close();}
})().catch(e=>{console.error(e.stack||e);process.exit(1);});
