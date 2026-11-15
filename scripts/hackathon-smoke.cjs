const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const site = 'http://127.0.0.1:4173/';

async function run() {
 const browser = await chromium.launch({headless:true});
 const errors=[];
 try {
  // Cursor construction starts automatically only once and exits DOWN, not onto the CTA.
  const intro=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'no-preference'});
  const welcome=await intro.newPage();
  welcome.on('pageerror',e=>errors.push(e.message));
  await welcome.goto(site,{waitUntil:'domcontentloaded'});
  await welcome.locator('.nl-sw-cursor').first().waitFor({timeout:6000});
  assert(await welcome.locator('.nl-sw-cursor').count()>=3,'3 cursors on phones');
  const wentDown=await welcome.evaluate(() => new Promise(resolve=>{
    let seen=false,steps=0;
    const id=setInterval(()=>{
      document.querySelectorAll('.nl-sw-cursor').forEach(node=>{
        if(node.getBoundingClientRect().top>window.innerHeight+8)seen=true;
      });
      if(seen||steps++>400||!document.querySelector('.nl-sw-overlay')){
        clearInterval(id);resolve(seen);
      }
    },20);
  }));
  assert(wentDown,'Builder cursors visibly exit past bottom edge');
  await welcome.locator('.nl-sw-controls').waitFor({state:'detached',timeout:5000});
  await welcome.reload({waitUntil:'domcontentloaded'});
  assert.equal(await welcome.locator('.nl-sw-overlay').count(),0,'Do not replay auto-animation within same session');
  await welcome.locator('.cs-replay').click();
  await welcome.locator('.nl-sw-cursor').first().waitFor();
  await welcome.locator('.nl-sw-skip').click();
  assert.equal(await welcome.locator('.nl-sw-overlay').count(),0,'Skip removes overlay');
  await intro.close();

  // Actual mobile taps trigger OPTIONAL short vibration, not on load.
  const phone=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await phone.addInitScript(()=>{
    window.__pulses=[];window.__shares=[];
    Object.defineProperty(navigator,'vibrate',{configurable:true,value:(pattern)=>{window.__pulses.push(pattern);return true;}});
    Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shares.push(data);}});
  });
  const page=await phone.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(site,{waitUntil:'domcontentloaded'});
  assert.equal((await page.evaluate(()=>window.__pulses)).length,0,'No vibration before interaction');
  assert.match(await page.locator('.cs-title').innerText(),/Upgrade your career by trying the real work first/i,'Reference landing headline present');
  assert.equal((await page.locator('.cs-stage').innerText()).includes('32%'),false,'No fake progress');
  await page.locator('.cs-role').first().click();
  assert((await page.evaluate(()=>window.__pulses)).length>=1,'Vibration on intentional tap');
  await page.getByRole('button',{name:'Open the brief'}).click();
  await page.getByRole('button',{name:'Review customer notes'}).click();
  await page.locator('.choice').first().click();
  assert((await page.evaluate(()=>window.__pulses)).length>=2,'Vibration on choice');
  const fixture={version:1,profile:{name:'Demo',goal:'change',time:'10 minutes a day'},preferred:'marketing',
    done:{marketing:true,pm:false},
    projects:{marketing:{step:0,answers:{},complete:false,review:''},pm:{step:0,answers:{},complete:false,review:''}},
    samples:[{id:'tryout-marketing',kind:'tryout',role:'marketing',title:'AI Marketing — first assignment',
      date:'2026-11-15T00:00:00.000Z',sections:[['Audience','People managing trial renewals'],['Headline','Know what renews next.']]}],days:[]};
  // Seed storage and set the route atomically: hashchange would otherwise persist
  // the prior in-memory empty profile over the fixture before the reload.
  await page.evaluate(d=>{
    localStorage.setItem('newro-learning-flow-v1',JSON.stringify(d));
    history.replaceState(null,'','#/profile');
  },fixture);
  await page.reload({waitUntil:'domcontentloaded'});
  const diagnostic=await page.evaluate(()=>({hash:location.hash,profile:window.NEWROFlow?.getState()?.profile,hasProfile:!!document.querySelector('#nf-profile-form'),hasOnboarding:!!document.querySelector('#nf-onboard-form'),view:document.querySelector('#app')?.textContent?.slice(0,100),hasMobile:!!window.NEWROMobile}));
  console.log('PROFILE DIAGNOSTIC',JSON.stringify(diagnostic));
  assert(diagnostic.hasProfile,'Profile route did not render: '+JSON.stringify(diagnostic));
  const toggle=page.locator('[data-nm-haptic-toggle]');
  await toggle.waitFor();
  assert.equal(await toggle.getAttribute('aria-pressed'),'true','Haptics on for supported touch device');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-pressed'),'false','Haptic preference can be disabled');
  const pulseCount=(await page.evaluate(()=>window.__pulses)).length;
  await page.locator('.nf-dock [data-flow-go=portfolio]').click();
  assert.equal((await page.evaluate(()=>window.__pulses)).length,pulseCount,'No haptics when preference is off');
  await page.locator('.nf-sample [data-flow-action=sample]').first().click();
  await page.locator('[data-flow-action=share-sample]').click();
  const shared=await page.evaluate(()=>window.__shares);
  assert.equal(shared.length,1,'Device native share action invoked');
  assert(shared[0].text.includes('Audience'),'Shares actual saved work text');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert(overflow<=2,'No horizontal overflow on mobile');

  // Unsupported devices must be honest and fully functional.
  const unsupported=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await unsupported.addInitScript(d=>{
    localStorage.setItem('newro-learning-flow-v1',JSON.stringify(d));
    Object.defineProperty(navigator,'vibrate',{configurable:true,value:undefined});
  },fixture);
  const other=await unsupported.newPage();
  other.on('pageerror',e=>errors.push(e.message));
  await other.goto(site+'#/profile',{waitUntil:'domcontentloaded'});
  const unavailable=other.locator('[data-nm-haptic-toggle]');
  await unavailable.waitFor();
  assert.equal(await unavailable.isDisabled(),true,'Unavailable feedback must not be toggleable');
  assert.equal(await unavailable.textContent(),'Unavailable');
  await other.locator('.nf-dock [data-flow-go=portfolio]').click();
  await other.locator('.nf-sample').first().waitFor();
  await unsupported.close();
  await phone.close();
  assert.deepEqual(errors,[],'No JS runtime errors');
  console.log('PASS hackathon QA: cursor exit down, no replay, touch haptics, preference off, native share, unsupported browser and no fake progress');
 } finally {await browser.close();}
}
run().catch(e=>{console.error(e.stack||e);process.exit(1);});
