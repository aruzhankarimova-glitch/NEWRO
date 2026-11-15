const {chromium} = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const site="http://127.0.0.1:4173/";
fs.mkdirSync("test-results",{recursive:true});
const sizes=[320,360,375,390,430,768,820,1024,1280,1366,1440,1920];
function contrast(rgb1,rgb2){
 const luminance=c=>{
  const a=c.match(/\d+(\.\d+)?/g).slice(0,3).map(Number).map(v=>{
   v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);
  });
  return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722;
 };
 const a=luminance(rgb1),b=luminance(rgb2);
 return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}
const fixture={
 version:1,profile:{name:"Taylor",goal:"transition",time:"20 minutes a day"},
 preferred:"marketing",done:{marketing:true,pm:false},
 projects:{marketing:{step:0,answers:{},complete:false,review:""},pm:{step:0,answers:{},complete:false,review:""}},
 samples:[],days:[]
};
async function viewportCheck(browser,width){
 const ctx=await browser.newContext({viewport:{width,height:width<=430?790:900},isMobile:width<=430,hasTouch:width<=430,reducedMotion:"reduce"});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 try{
  await page.goto(site,{waitUntil:"domcontentloaded"});
  const preview=page.locator(".nm-quick-choices");
  await preview.waitFor();
  const details=await page.evaluate(()=>{
   const q=document.querySelector(".nm-quick-choice"),cta=document.querySelector(".cs-phone-cta"),
    stage=document.querySelector(".cs-stage"),big=document.querySelector(".nl-bigcta");
   const rect=el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom,height:el.getBoundingClientRect().height});
   return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    font:parseFloat(getComputedStyle(q).fontSize),q:rect(q),cta:rect(cta),stage:rect(stage),
    contrastColors:[getComputedStyle(big).color,getComputedStyle(big).backgroundColor],
    grid:getComputedStyle(document.querySelector(".cs-hero")).gridTemplateColumns,
    fixedStage:getComputedStyle(stage).height,
    dockHidden:document.querySelector(".cs-mobile-dock")?.classList.contains("nm-dock-hidden")};
  });
  assert(details.overflow<=2,"Horizontal overflow at "+width+"px: "+JSON.stringify(details));
  assert(details.font>=13.5,"Too small interactive preview text at "+width+"px: "+details.font);
  assert(details.q.height>=44,"Small answer target at "+width+"px: "+details.q.height);
  assert(details.cta.height>=44,"Small continue target at "+width+"px: "+details.cta.height);
  assert(details.cta.bottom<=details.stage.bottom+3,"Continue button outside task card at "+width+"px");
  assert(contrast(...details.contrastColors)>=4.5,"Main CTA fails WCAG AA contrast at "+width+"px");
  if(width>=761&&width<=1023){
   assert(details.grid.trim().split(/\s+/).length===1,"Tablet hero should be one column at "+width+"px");
  }
  if([320,390,768,1440].includes(width))
   await page.screenshot({path:"test-results/newro-responsive-"+width+".png",fullPage:true});
  assert.deepEqual(errors,[],"JavaScript errors at "+width+"px");
  console.log("PASS responsive viewport",width,"px");
 }finally{await ctx.close()}
}
async function resultAndHistory(browser){
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce",acceptDownloads:true,isMobile:true,hasTouch:true});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 try{
  await page.goto(site,{waitUntil:"domcontentloaded"});
  const sample={marketing:{audience:"trials",headline:"Know what renews next.",channel:"paid-social",metric:"signups",reason:"Review the test before expanding the campaign."}};
  await page.evaluate(x=>window.NEWROFlow.finish("marketing",x),sample);
  await page.locator(".nf-first-result").waitFor();
  assert.equal(await page.locator("#nf-onboard-form").count(),0,"Result must precede onboarding");
  const download=page.waitForEvent("download");
  await page.getByRole("button",{name:"Download my work"}).click();
  assert((await download).suggestedFilename().includes("newro-tryout"),"Early export works");
  let first=await page.evaluate(()=>window.NEWROFlow.getState());
  assert.equal(first.samples.length,1);
  assert.equal(first.done.marketing,true);
  await page.evaluate(x=>window.NEWROFlow.finish("marketing",x),sample);
  const after=await page.evaluate(()=>window.NEWROFlow.getState());
  assert.equal(after.samples.length,2,"Second attempt must not overwrite the first");
  assert.equal(new Set(after.samples.map(s=>s.id)).size,2,"Attempts have unique identifiers");
  await page.getByRole("button",{name:"Continue learning"}).click();
  await page.locator("#nf-onboard-form").waitFor();
  await page.locator("#nf-on-name").fill("Taylor");
  await page.locator("#nf-onboard-form button[type=submit]").click();
  await page.locator(".nf-banner").waitFor();
  assert.equal(await page.locator(".nf-milestone").count(),2,"Progress numerator and milestones must agree");
  const indicator=await page.locator(".nf-ring").innerText();
  assert(indicator.includes("1/2"),"Single completed try-out is one of two milestones");
  const primary=page.locator(".nf-banner .nf-btn").first();
  const color=await primary.evaluate(el=>[getComputedStyle(el).color,getComputedStyle(el).backgroundColor]);
  // The lime button has dark text, and uses a different token than green CTAs.
  assert(contrast(...color)>=4.5,"Dashboard action contrast");
  await page.locator(".nf-navitem[data-flow-go=portfolio]").last().click();
  assert.equal(await page.locator(".nf-sample").count(),2,"Both attempts visible in portfolio");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".nf-sample").first().waitFor();
  assert.equal(await page.locator(".nf-sample").count(),2,"Attempt history persists");
  assert.deepEqual(errors,[],"No JavaScript exceptions in history flow");
  console.log("PASS result-before-onboarding, attempt history, truthful two-step progress and persistence");
 }finally{await ctx.close()}
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of sizes)await viewportCheck(browser,width);
  await resultAndHistory(browser);
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1;});
