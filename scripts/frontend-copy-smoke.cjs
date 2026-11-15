const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const root="docs";
const privateDocs=["EVALUATION_EVIDENCE.md","HACKATHON_AUDIT.md","anti-slop-checklist.md","design-stack.md","evaluation.json","ux-first-simulation.md","workflow.md"];
for(const name of privateDocs){
 assert(!fs.existsSync(root+"/"+name),"Internal documentation must not be in the published web root: "+name);
 assert(fs.existsSync("project-notes/"+name),"Internal documentation should remain available for maintainers: "+name);
}
const html=fs.readFileSync("docs/index.html","utf8");
const sw=fs.readFileSync("docs/sw.js","utf8");
assert(!html.includes("./evaluation.json"),"Evaluation instructions must not be linked on public frontend");
assert(!sw.includes("./evaluation.json")&&!sw.includes("./EVALUATION_EVIDENCE.md"),"PWA cache must exclude internal documents");
assert(html.includes('application/ld+json'),"Keep factual structured product metadata");
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors=[];
  const page=await context.newPage();
  page.on("pageerror",error=>errors.push(error.message));
  await page.goto("http://127.0.0.1:4173/",{waitUntil:"domcontentloaded"});
  await page.locator(".cs-shell").waitFor();
  const landing=await page.locator(".cs-shell").innerText();
  for(const technical of ["rule-based","language model","career exploration prototype","automated evaluation","scoring instructions"]){
   assert(!landing.toLowerCase().includes(technical.toLowerCase()),"Technical explanation leaked to homepage: "+technical);
  }
  assert(/cases use fictional companies/i.test(landing),"Keep concise explanation of sample-data use");
  await page.locator(".cs-role").first().click();
  const mentor=page.locator(".playerMain .mentor b").first();
  await mentor.waitFor();
  assert.equal(await mentor.textContent(),"Practice coach");
  const exercise=await page.locator(".playerMain").innerText();
  assert(!exercise.includes("rule-based feedback"),"Learner should see clear coaching copy, not AI implementation details");
  await page.goto("http://127.0.0.1:4173/#/paths",{waitUntil:"domcontentloaded"});
  await page.locator(".nf-trackgrid").waitFor();
  const careerCopy=await page.locator(".nf-app").innerText();
  assert(!careerCopy.includes("not yet connected"),"No internal roadmap instructions in career paths");
  await context.close();
  assert.deepEqual(errors,[],"No JavaScript errors after copy cleanup");
  console.log("PASS: user-facing copy, internal document isolation, mentor labeling and core role routing");
 }finally{await browser.close();}
})().catch(error=>{console.error(error.stack||error);process.exit(1);});
