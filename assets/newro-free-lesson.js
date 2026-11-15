/* NEWRO PM starter lesson. Source: NEWRO Business Cup research, 2026-11-15.
   User choice is reviewed against fixed criteria, not by a live AI tutor. */
(function(){
"use strict";
var draft={choice:"",reason:""};
var choiceNames={safe:"Ship the iOS fix and reminders (12h)",new:"Ship household sharing (20h)",all:"Attempt all features (32h)"};
function frame(html){
 window.NEWROFlow.goto("paths");
 var title=document.getElementById("nr-syllabus-pm");
 var section=title&&title.closest(".nr-syllabus");
 if(!section)return;
 section.innerHTML=html;
 section.scrollIntoView({block:"start",behavior:"instant"});
}
function lesson(){
 var body='<div class="nr-pm-lesson"><div class="nr-lesson-heading"><span class="nf-label">FREE LESSON · AI PRODUCT MANAGER</span>'+
 '<h2>Prioritize features before a Friday release</h2>'+
 '<p>Product managers decide what to build using <b>user impact</b>, <b>delivery risk</b> and <b>time available</b>. Learn how to make one decision before trying a full course.</p></div>'+
 '<section class="nr-lesson-brief"><span class="nf-label">01 / UNDERSTAND</span><h3>Harbor has 24 engineering hours</h3>'+
 '<p>On Friday, the team must choose what to release. Some iOS users cannot sign in. A new sharing feature is popular but untested. This is a fictional training case.</p>'+
 '<div class="nr-backlog" role="table" aria-label="Release options"><div role="row"><b role="columnheader">Feature</b><b role="columnheader">Time</b><b role="columnheader">Risk</b></div>'+
 '<div role="row"><span role="cell">iOS sign-in fix</span><span role="cell">4h</span><span role="cell">Low</span></div>'+
 '<div role="row"><span role="cell">Renewal reminders</span><span role="cell">8h</span><span role="cell">Low</span></div>'+
 '<div role="row"><span role="cell">Household sharing</span><span role="cell">20h</span><span role="cell">High</span></div></div>'+
 '<p class="nr-example"><b>Worked example:</b> A sign-in failure blocks existing customers. Fixing the failure may be more urgent than shipping an exciting new feature.</p></section>'+
 '<form id="nr-pm-free-form"><fieldset><legend>02 / MAKE YOUR DECISION</legend>'+
 '<label class="nr-choice"><input type="radio" name="release" value="safe" required '+(draft.choice==="safe"?"checked":"")+'><span><strong>Ship login fix + reminders</strong><small>12h; postpone sharing for testing.</small></span></label>'+
 '<label class="nr-choice"><input type="radio" name="release" value="new" '+(draft.choice==="new"?"checked":"")+'><span><strong>Ship household sharing</strong><small>20h; leave the login issue unfixed.</small></span></label>'+
 '<label class="nr-choice"><input type="radio" name="release" value="all" '+(draft.choice==="all"?"checked":"")+'><span><strong>Ship all features</strong><small>32h of work; 24h available.</small></span></label></fieldset>'+
 '<label for="nr-pm-explain">Why did you choose this plan?</label><p id="nr-pm-guidance">Think about users, risk and team time. Write at least 20 characters.</p>'+
 '<textarea id="nr-pm-explain" name="reason" required minlength="20" maxlength="1000" aria-describedby="nr-pm-guidance" placeholder="I would ship... because..."></textarea>'+
 '<div class="nf-actions"><button class="nf-btn nf-primary" type="submit">Review my decision →</button><button type="button" class="nf-btn nf-secondary" data-pm-lesson-back>Back to course overview</button></div></form></div>';
 frame(body);
 var box=document.getElementById("nr-pm-explain");if(box)box.value=draft.reason||"";
}
function review(){
 var text=draft.choice==="safe"?
   "The login fix directly unblocks users. Reminders also fit within 24 hours, while the higher-risk sharing feature can be tested separately.":
   draft.choice==="all"?
   "This plan needs 32 hours, which exceeds the 24-hour budget by eight hours. A product manager must decide which work to postpone.":
   "Sharing could help some users, but the sign-in problem prevents current users from accessing the app. Compare customer impact before shipping a risky new feature.";
 var body='<div class="nr-pm-lesson nr-pm-review"><span class="nf-label">03 / REVIEW</span><h2>Your release decision</h2><p>'+text+'</p>'+
 '<div class="nr-rubric"><h3>Three criteria to check</h3>'+
 '<p><b>Customer value:</b> Does your decision solve a real customer problem?</p>'+
 '<p><b>Delivery risk:</b> Could a rushed feature create new failures?</p>'+
 '<p><b>Team time:</b> Can the team finish within the 24-hour budget?</p></div>'+
 '<h3>Why you chose it</h3><p class="nr-user-reason"></p>'+
 '<p class="nr-review-caveat">Feedback is based on the selected plan and predefined criteria. Your written reasoning is not automatically graded.</p>'+
 '<div class="nf-actions"><button class="nf-btn nf-primary" type="button" data-pm-lesson-save>Save decision card</button><button class="nf-btn nf-secondary" type="button" data-pm-lesson-retry>Try another choice</button></div></div>';
 frame(body);
 var el=document.querySelector(".nr-user-reason");if(el)el.textContent=draft.reason;
}
document.addEventListener("click",function(event){
 var start=event.target.closest('[data-flow-action="free-pm-lesson"]');
 if(start){event.preventDefault();lesson();return;}
 if(event.target.closest("[data-pm-lesson-back]")){event.preventDefault();window.NEWROFlow.goto("paths");return;}
 if(event.target.closest("[data-pm-lesson-retry]")){event.preventDefault();lesson();return;}
 if(event.target.closest("[data-pm-lesson-save]")){
  event.preventDefault();
  var id=window.NEWROFlow.savePmLesson(draft.choice,draft.reason);
  if(id)window.NEWROFlow.goto("sample",id);
 }
});
document.addEventListener("submit",function(event){
 if(event.target.id!=="nr-pm-free-form")return;
 event.preventDefault();
 var data=new FormData(event.target),choice=String(data.get("release")||""),
     reason=String(data.get("reason")||"").trim();
 if(!["safe","new","all"].includes(choice)||reason.length<20)return;
 draft={choice:choice,reason:reason};review();
});
window.NEWROFreeLesson={open:lesson};
})();