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
  status:"Free try-out available",
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
function render(role,esc,button,completed){
 const t=tracks[role]||tracks.pm,pm=role==="pm";
 const id="nr-syllabus-"+role;
 const freeTitle=pm?"Friday release · starter lesson":"AI Marketing · free try-out";
 const freeDescription=pm?"Make a release decision, receive feedback and save a work sample.":"Make campaign decisions in your first career simulation.";
 const freeAction=pm?"free-pm-lesson":"free-marketing-tryout";
 const freeLabel=pm?(completed?"Replay free lesson →":"Start free lesson →"):"Start free try-out →";
 const journey='<div class="nr-syllabus-grid nr-journey" aria-label="Practice topics">'+
 '<div class="nr-journey-step free"><span class="nr-journey-state">START HERE</span><strong>'+freeTitle+'</strong><p>'+freeDescription+'</p>'+button(freeLabel,freeAction,"nr-journey-free-button")+'</div>'+
 t.modules.map(function(m,i){return '<button type="button" class="nr-journey-step practice" data-practice-role="'+role+'" data-practice-index="'+i+'"><span class="nr-journey-state">'+String(i+1).padStart(2,"0")+' / PRACTICE</span><strong>'+esc(m[1])+'</strong><p>'+esc(m[2])+'</p><span class="nr-step-action">Open exercise →</span></button>';}).join("")+'</div>';
 return '<section class="nr-syllabus nf-section" aria-labelledby="'+id+'"><header class="nr-syllabus-heading"><div><span class="nf-label">'+(pm?"AI PRODUCT MANAGER":"AI MARKETER")+' / PRACTICE</span><h2 id="'+id+'">Choose your next exercise</h2><p>'+t.subtitle+'</p></div><span class="nr-syllabus-status">Practice at your pace</span></header><p class="nr-journey-hint">Choose a topic, write your response and save it to your portfolio. Scroll sideways to see all topics.</p>'+journey+'<details class="nr-shared-core"><summary>AI skills foundations</summary><ul>'+core.map(function(x){return "<li>"+esc(x)+"</li>";}).join("")+'</ul></details></section>';
}
document.addEventListener("click",function(event){var target=event.target.closest('[data-flow-action="free-marketing-tryout"]');if(!target)return;event.preventDefault();if(window.NEWROFlow){history.replaceState(null,"",location.pathname+location.search);window.NEWRO.start("marketing");}});
window.NEWROCurriculum={render:render,tracks:tracks,core:core,source:"Newro Business Cup research, revised 2026-11-15"};
})();