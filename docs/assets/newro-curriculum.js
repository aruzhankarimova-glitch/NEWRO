/* NEWRO curriculum, source: Newro Business Cup research, 2026-11-15,
 * sections 13–19. Planned modules are not published lessons. */
(function(){
"use strict";
const tracks={
 pm:{
  title:"AI Product Manager",
  subtitle:"Build, evaluate and launch one useful AI-enabled product feature.",
  status:"Free starter lesson available",
  modules:[
   ["PM-M00","Skills diagnostic","Identify AI vs non-AI solutions and map the skills you already have.","Skills map","Can explain value and risks of an AI feature."],
   ["PM-M01","Customer discovery","Understand ICP, conduct interviews and define a customer problem.","Problem brief and five interview notes","Uses grounded customer problems and quotes."],
   ["PM-M02","AI opportunity & feasibility","Compare user value with data, cost and feasibility constraints.","Opportunity scorecard","Considers both realistic value and limits."],
   ["PM-M03","AI PRD & user journeys","Specify journeys, agent rules, error handling and human approval.","AI PRD and state diagram","Includes stop conditions, failures and human review."],
   ["PM-M04","Vibe coding & prototype","Prototype the main user flow and test the working feature.","AI feature prototype","Demonstrates the intended core flow."],
   ["PM-M05","Evaluation, trust & safety","Design quality rubrics, evaluation data, trust and failure-case checks.","Evaluation set and test plan","Uses measurable tests and failure cases."],
   ["PM-M06","Rollout & capstone","Evaluate unit economics, launch metrics, product trade-offs and final demo.","Product case, demo and pitch deck","Includes baseline, target, risks and trade-offs."]
  ]
 },
 marketing:{
  title:"AI Marketer",
  subtitle:"Develop a research-to-reporting marketing workflow with AI.",
  status:"Full course coming soon",
  modules:[
   ["MKT-M00","Workflow diagnostic","Audit your current marketing work and useful AI support opportunities.","Marketing workflow map","Captures actual workflow, not just prompt lists."],
   ["MKT-M01","Research & audience","Explore ICP, segments, competitors and jobs to be done.","Research pack","Verifies sources and insights."],
   ["MKT-M02","Brand & messaging","Build brand context, messaging rules and reliable AI instructions.","Marketing brain","Uses verified sources and brand boundaries."],
   ["MKT-M03","Campaign engine","Create a multichannel plan with consistent messaging and evidence.","Campaign engine","Maintains unified tone and accurate claims."],
   ["MKT-M04","SEO, GEO & content quality","Design a content system and assess AI-search discoverability carefully.","Content brief and evaluation","Uses measurable criteria without visibility guarantees."],
   ["MKT-M05","Automation & reporting","Automate practical CRM and no-code reporting workflows.","Marketing reporting workflow","Delivers reproducible and accurate reports."],
   ["MKT-M06","Measurement & capstone","Test an end-to-end campaign, analyze metrics and evaluate ROI.","Campaign and dashboard","Includes metrics and quality controls."]
  ]
 }
};
const core=["LLM capabilities, limits, context and trustworthy sources",
 "Prompt workflows, structured results and quality checks",
 "Privacy, copyright and human review",
 "Choosing an AI tool for a specific task",
 "Presenting the process, result and evidence for your portfolio"];
function render(role, esc, button, completed){
 const t=tracks[role]||tracks.pm,pm=role==="pm";
 const id="nr-syllabus-"+role;
 const lesson=pm?'<div class="nr-free-entry"><span class="nf-label">FREE LESSON</span><div><h3>Prioritize a Friday release</h3><p>Learn three criteria, make a decision, review the outcome and save your decision card.</p></div>'+button(completed?"Replay free lesson →":"Start free lesson →","free-pm-lesson","nf-btn nf-primary")+'</div>':'<div class="nr-course-notice">The AI Marketer course is planned. Its learning modules cannot be opened yet. The separate free try-out is already available.</div>';
 return '<section class="nr-syllabus nf-section" aria-labelledby="'+id+'">'+
 '<header class="nr-syllabus-heading"><div><span class="nf-label">'+(pm?"AI PRODUCT MANAGER":"AI MARKETER")+' / PROGRAM</span>'+
 '<h2 id="'+id+'">'+t.title+' learning path</h2><p>'+t.subtitle+'</p><p>Six-week specialization with a starting skills diagnostic. Modules below are a preview, not live lessons.</p></div>'+
 '<span class="nr-syllabus-status">'+t.status+'</span></header>'+lesson+
 '<div class="nr-syllabus-grid">'+t.modules.map(function(m,i){
  return '<details class="nr-syllabus-module" '+(i===0?'open':'')+'><summary><span class="nr-module-num">'+m[0]+'</span><span class="nr-module-name">'+esc(m[1])+'</span><span class="nr-module-state">Coming soon</span></summary>'+
  '<div class="nr-module-description"><p>'+esc(m[2])+'</p><dl><dt>What you will create</dt><dd>'+esc(m[3])+'</dd><dt>How it will be assessed</dt><dd>'+esc(m[4])+'</dd></dl></div></details>';
 }).join("")+'</div>'+
 '<details class="nr-shared-core"><summary>AI Skills Core · shared foundations</summary><ul>'+core.map(function(s){return '<li>'+esc(s)+'</li>';}).join("")+'</ul></details>'+
 '<p class="nr-program-notice">The full program is not yet open. Completing a try-out does not mean completing these modules.</p></section>';
}
window.NEWROCurriculum={render:render,tracks:tracks,core:core,source:"Newro Business Cup research, revised 2026-11-15"};
})();