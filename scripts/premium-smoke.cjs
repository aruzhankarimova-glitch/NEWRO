const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const site = "http://127.0.0.1:4173/";
fs.mkdirSync("test-results",{recursive:true});
async function open(browser,device) {
 const ctx=await browser.newContext({viewport:{width:device.width,height:device.height},
   reducedMotion:device.reduced?"reduce":"no-preference",hasTouch:!!device.touch,isMobile:!!device.touch});
 const page=await ctx.newPage();
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto(site,{waitUntil:"domcontentloaded"});
 if(!device.reduced){
  await page.locator(".nl-sw-controls").waitFor({timeout:8000});
  await page.locator(".nl-sw-skip").click();
 }
 await page.locator(".nm-quick-choices").waitFor();
 return {ctx,page,errors};
}
async function main(){
 const browser=await chromium.launch({headless:true});
 try{
  for(const d of [
    {name:"desktop",width:1440,height:900,reduced:false,touch:false},
    {name:"tablet",width:768,height:1024,reduced:true,touch:false},
    {name:"mobile",width:390,height:844,reduced:true,touch:true},
    {name:"small",width:360,height:800,reduced:true,touch:true}
  ]){
   const {ctx,page,errors}=await open(browser,d);
   try{
    assert.equal(await page.getByText("Saved on this device",{exact:true}).count(),0,"No redundant storage indicator");
    assert.equal(await page.locator(".cs-top .cs-join").count(),0,"Only one primary landing CTA");
    assert.equal(await page.locator(".nl-bigcta").count(),1,"One hero start action");
    assert.equal(await page.locator(".nm-quick-choice").count(),2,"Playable preview");
    assert.equal(await page.locator(".nm-page-progress").count(),1,"Page progress");
    if(d.width<=760){
      assert.equal(await page.locator(".cs-topin").evaluate(x=>getComputedStyle(x,"::after").content),"none","No duplicate pseudo-label");
    }
    assert.match(await page.locator(".cs-phone-title").innerText(), /ship first/i, "Product preview appears first");
    await page.locator('[data-preview-role="marketing"]').click();
    await page.locator('[data-quick-choice="stocks"]').click();
    const answer=page.locator(".nm-quick-feedback");
    assert.match(await answer.textContent(),/doesn't analyze stocks/i,"Unsupported role receives explanatory feedback");
    assert.equal(await page.locator('[data-quick-choice="stocks"]').getAttribute("aria-pressed"),"true");
    await page.locator('[data-quick-choice="trials"]').click();
    assert.match(await answer.textContent(),/matches the brief/i,"Correct role receives real explanation");
    assert.equal(await page.locator('[data-quick-choice="trials"]').getAttribute("aria-pressed"),"true");
    assert.equal(await page.locator('[data-quick-choice="stocks"]').getAttribute("aria-pressed"),"false");
    await page.screenshot({path:"test-results/newro-premium-"+d.name+".png",fullPage:true});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    assert(overflow<=2,d.name+" horizontal overflow: "+overflow);
    await page.locator(".cs-phone-cta").click();
    await page.locator(".cs-player .cs-course-meta").waitFor();
    assert.equal(await page.locator(".cs-player .playerMain > .step").count(),0,"No duplicate role title in lesson");
    assert.equal(await page.locator(".cs-player .headerInner > .mini").count(),0,"No duplicate progress numbers");
    assert.equal(await page.getByRole("button",{name:"View your learning path"}).count(),1,"Learning map still accessible");
    await page.getByRole("button",{name:"View your learning path"}).click();
    await page.getByRole("dialog",{name:"Career learning path"}).waitFor();
    await page.getByRole("button",{name:"Close learning path"}).click();
    assert.deepEqual(errors,[],"No runtime errors");
    console.log("PASS premium UX",d.name);
   }finally{await ctx.close();}
  }
  const fixture={version:1,profile:{name:"Jordan",goal:"change",time:"10 minutes a day"},preferred:"marketing",
   done:{marketing:true,pm:false},projects:{marketing:{step:0,answers:{},complete:false,review:""},pm:{step:0,answers:{},complete:false,review:""}},
   samples:[],days:[]};
  const ctx=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:"reduce"});
  await ctx.addInitScript(d=>{localStorage.setItem("newro-learning-flow-v1",JSON.stringify(d));},fixture);
  const page=await ctx.newPage();
  await page.goto(site+"#/dashboard",{waitUntil:"domcontentloaded"});
  await page.locator(".nf-banner").waitFor();
  assert.equal(await page.getByText("Saved on this device",{exact:true}).count(),0);
  assert.equal(await page.locator(".nf-navdesk").getByRole("button",{name:"Overview"}).count(),1,"Non-duplicated nav title");
  assert.equal(await page.locator(".nf-heading h1").textContent(),"My learning","Heading exists");
  assert.equal(await page.locator(".nf-kicker").count(),0,"Redundant generic heading prefix removed");
  await page.screenshot({path:"test-results/newro-premium-dashboard.png",fullPage:true});
  await ctx.close();
  console.log("PASS dashboard deduplication");
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e.stack||e);process.exit(1);});
