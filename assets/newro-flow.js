/* NEWRO full local-first learning flow.
   Career try-out → onboarding → dashboard → guided project → portfolio.
   All user data remains in this browser. Mentor checks are deterministic. */
(function(){
"use strict";
var STORAGE="newro-learning-flow-v1",SIM_KEY="newro-career-tryout-v1";
var root=document.getElementById("app");
var names={marketing:"AI Marketing Specialist",pm:"Product Manager"};
var images={marketing:"./assets/illustrations/marketing-illustration.svg",pm:"./assets/illustrations/product-illustration.svg",mentor:"./assets/illustrations/mentor-illustration.svg"};
var defs={
 marketing:{
  title:"Build your first campaign",client:"Harbor · subscription reminder app",time:"15–25 min",
  description:"Turn customer evidence into a clear message and a small test plan.",
  steps:[
   {key:"audience",title:"Who is this for?",description:"Describe one specific group of people and the problem they have with renewals.",placeholder:"People who use free trials and sometimes forget the renewal date. Their problem is...",min:22,tip:"Start with the customer problem. Avoid targeting everyone."},
   {key:"message",title:"Write the core message",description:"Create a specific, credible value proposition. Harbor shows upcoming renewals but cannot prevent charges.",placeholder:"See your upcoming renewals before they happen...",min:14,tip:"No guarantees or unsupported AI claims."},
   {key:"prompt",title:"Brief your AI teammate",description:"Write instructions for an AI assistant to generate 2 campaign variants. Include audience, tone, feature and at least one limitation.",placeholder:"Create two short campaign headlines for... The tone should be... Do not promise...",min:45,tip:"A strong brief defines the goal, evidence and boundaries."},
   {key:"experiment",title:"Design a small test",description:"Explain the channel, action to measure, and what you would change if it underperforms. No invented results.",placeholder:"I would test the message on... Track the signup rate... If it performs poorly...",min:46,tip:"A real experiment needs a measurable decision, not likes alone."}
  ]
 },
 pm:{
  title:"Plan your first product release",client:"Harbor · subscription reminder app",time:"15–25 min",
  description:"Prioritize customer impact, scope, communication and a measurable outcome.",
  steps:[
   {key:"problem",title:"Define the real problem",description:"Summarize the iOS login issue, who it affects and why it matters to the release.",placeholder:"Some iOS users cannot sign in. This matters because...",min:25,tip:"Describe the user impact before proposing features."},
   {key:"scope",title:"Choose your release scope",description:"You have 24 engineering hours. State what you would ship and what you would postpone, with reasons.",placeholder:"Ship the 4-hour login fix and 8-hour reminders... Postpone the risky onboarding changes because...",min:48,tip:"Account for time, impact, and delivery risk."},
   {key:"update",title:"Write a stakeholder update",description:"Explain the release plan and trade-offs clearly to a non-technical stakeholder.",placeholder:"This Friday, the team will focus on... We are postponing... because...",min:46,tip:"Explain decisions in plain language, including what is not shipping."},
   {key:"measure",title:"Plan the follow-up",description:"Define how you would verify the release improves customer experience.",placeholder:"After releasing, I would check the login failure rate... If it remains high...",min:43,tip:"Choose a metric tied to the affected user experience."}
  ]
 }
};
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function paragraphs(x){return esc(x||"").replace(/\n/g,"<br>");}
function safeRole(x){return x==="pm"?"pm":"marketing";}
function initial(){return {version:1,profile:null,preferred:"marketing",done:{marketing:false,pm:false},projects:{marketing:{step:0,answers:{},complete:false,review:""},pm:{step:0,answers:{},complete:false,review:""}},samples:[],days:[]};}
var st=initial();
try{
 var restored=JSON.parse(localStorage.getItem(STORAGE)||"null");
 if(restored && restored.version===1){
  st=Object.assign(initial(),restored);
  st.done=Object.assign({marketing:false,pm:false},restored.done||{});
  st.projects=Object.assign(initial().projects,restored.projects||{});
  for(var key of ["marketing","pm"])st.projects[key]=Object.assign({step:0,answers:{},complete:false,review:""},st.projects[key]||{});
  st.samples=Array.isArray(restored.samples)?restored.samples:[];
  st.days=Array.isArray(restored.days)?restored.days:[];
 }
}catch(e){}
function save(){
 try{localStorage.setItem(STORAGE,JSON.stringify(st));}catch(e){console.warn("Progress could not be saved on this device",e);}
}
function markToday(){
 var d=new Date().toLocaleDateString("en-CA");
 if(st.days.indexOf(d)<0){st.days.push(d);st.days=st.days.slice(-120);}
 save();
}
function sampleText(sample){
 if(!sample)return "";
 return [sample.title,"NEWRO career practice · fictional training exercise",sample.date,"",
  ...(sample.sections||[]).flatMap(function(p){return [p[0],p[1],""];}),"Not a certificate of qualification."].join("\n");
}
function download(name,content,type){
 var b=new Blob([content],{type:type||"text/plain;charset=utf-8"}),href=URL.createObjectURL(b),link=document.createElement("a");
 link.href=href;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(href);},1500);
}
function icon(name){
 var paths={home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-6h6v6"/>',paths:'<path d="M4 5h16M4 12h16M4 19h16"/><circle cx="8" cy="5" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="19" r="2"/>',portfolio:'<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M9 7V5h6v2m-11 7h16"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',check:'<path d="m4 12 5 5L20 6"/>',download:'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>'};
 return '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]||paths.arrow)+'</svg>';
}
function navItem(page,label,iconName,active){return '<button class="nf-navitem '+(active===page?'is-active':'')+'" type="button" data-flow-go="'+page+'" aria-current="'+(active===page?'page':'false')+'">'+icon(iconName)+label+'</button>';}
function layout(title,subtitle,content,active){
 if(window.NEWROSwarm)window.NEWROSwarm.stop();
 root.innerHTML='<div class="nf-app"><header class="nf-top"><div class="nf-topinner"><button class="nf-brand" data-flow-go="home" aria-label="NEWRO Home"><span>n</span> newro.</button><nav class="nf-navdesk" aria-label="Learning navigation">'+navItem("dashboard","My learning","home",active)+navItem("paths","Career paths","paths",active)+navItem("portfolio","Portfolio","portfolio",active)+navItem("profile","Profile","profile",active)+'</nav><span class="nf-save"><i></i> Saved on this device</span></div></header><main class="nf-main"><div class="nf-heading"><div><p class="nf-kicker">NEWRO / YOUR LEARNING SPACE</p><h1 tabindex="-1" id="nf-title">'+title+'</h1><p>'+subtitle+'</p></div></div>'+content+'</main><nav class="nf-dock" aria-label="Mobile learning navigation">'+navItem("dashboard","Home","home",active)+navItem("paths","Explore","paths",active)+navItem("portfolio","My work","portfolio",active)+navItem("profile","Profile","profile",active)+'</nav></div>';
 if(window.NEWROMobile)window.NEWROMobile.enhanceLayout(active);
 window.scrollTo(0,0);
 var h=document.getElementById("nf-title");if(h)h.focus({preventScroll:true});
}
function button(label,action,cls,attr){
 return '<button type="button" class="'+(cls||"nf-btn nf-primary")+'" data-flow-action="'+action+'" '+(attr||"")+'>'+label+'</button>';
}
function art(role,extra){return '<img class="nf-art '+(extra||"")+'" src="'+images[safeRole(role)]+'" alt="" loading="lazy" width="600" height="440">';}
function readSim(){try{return JSON.parse(localStorage.getItem(SIM_KEY)||"null");}catch(e){return null;}}
function niceDate(date){try{return new Date(date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}catch(e){return "";}}
function stepsDone(role){return (st.done[role]?1:0)+(st.projects[role].complete?1:0);}
function dash(){
 if(!st.profile){onboarding(st.preferred);return;}
 var role=st.preferred,p=st.projects[role],name=st.profile.name||"Explorer",total=stepsDone(role);
 var weekday=new Date().getDay(),monday=(weekday+6)%7;
 var dates=Array.from({length:7},function(_,i){var d=new Date();d.setDate(d.getDate()-monday+i);return {key:d.toLocaleDateString("en-CA"),day:d.toLocaleDateString("en-US",{weekday:"short"}).slice(0,2),date:d.getDate()};});
 var weekly=dates.reduce(function(n,d){return n+(st.days.indexOf(d.key)>=0?1:0);},0);
 var next=st.done[role]?(p.complete?"Your next step: build on your work":"Your next step: a guided project"):"Your next step: a career try-out";
 var nextLabel=st.done[role]?(p.complete?"Explore another career":"Continue guided project"):"Start free career try-out";
 var nextAction=st.done[role]?(p.complete?'browse':'project'):'tryout';
 var mood='<section class="nf-banner"><div class="nf-banner-copy"><span class="nf-label">YOUR NEXT ASSIGNMENT</span><h2>Hey, '+esc(name)+'.<br><em>Continue where you left off.</em></h2><p>Your next assignment and saved work are below.</p>'+button(nextLabel,nextAction,"nf-btn nf-lime",'data-role="'+role+'"')+'</div><div class="nf-banner-art">'+art(role)+'</div></section>';
 var dayHtml=dates.map(function(d){return '<div class="nf-day '+(st.days.indexOf(d.key)>=0?'done':'')+'"><span>'+d.day+'</span><b>'+d.date+'</b><small>'+(st.days.indexOf(d.key)>=0?'✓':'·')+'</small></div>';}).join("");
 var milestones=[
  ['Try the role','Take a short realistic assignment.',st.done[role]?'Completed':'Start here','tryout'],
  ['Guided project','Create a deeper sample with practical prompts.',p.complete?'Completed':st.done[role]?(p.step?'In progress':'Available'):'After try-out','project'],
  ['Portfolio artifact','Save, export and revisit your work.',p.complete?'Ready':'In progress','portfolio']
 ];
 var cards=milestones.map(function(m,i){return '<button class="nf-milestone '+((i===0&&st.done[role])||(i===1&&p.complete)||(i===2&&p.complete)?'done':'')+'" data-flow-action="'+m[3]+'" data-role="'+role+'"><span class="nf-step-circle">'+((i===0&&st.done[role])||(i===1&&p.complete)||(i===2&&p.complete)?'✓':i+1)+'</span><span><b>'+m[0]+'</b><small>'+m[1]+'</small></span><span class="nf-step-status">'+m[2]+'</span></button>';}).join("");
 var body=mood+'<div class="nf-overview"><section class="nf-whitecard"><div class="nf-same"><div><h2>Your weekly rhythm</h2><p>Only your actual activity is shown.</p></div><span class="nf-counter">'+weekly+' / 7 days</span></div><div class="nf-days">'+dayHtml+'</div><p class="nf-small">Your plan: '+esc(st.profile.time||"10–15 minutes per day")+'. No streak penalties or invented points.</p></section><section class="nf-whitecard nf-stat"><div><p class="nf-label">CURRENT CAREER</p><h2>'+names[role]+'</h2><p>'+next+'</p></div><div class="nf-ring" style="--progress:'+Math.round(total/2*100)+'%"><b>'+total+'/2</b><span>milestones</span></div></section></div><section class="nf-section"><div class="nf-section-head"><h2>Your path</h2>'+button("Switch career ↗","browse","nf-linkbtn")+'</div><div class="nf-path">'+cards+'</div></section><section class="nf-section"><div class="nf-section-head"><h2>My recent work</h2>'+button("View portfolio ↗","portfolio","nf-linkbtn")+'</div><div class="nf-workgrid">'+(st.samples.length?st.samples.slice().reverse().slice(0,2).map(sampleCard).join(""):'<div class="nf-empty"><img src="'+images.mentor+'" alt="" loading="lazy"><b>No work samples saved yet.</b><p>Complete a career try-out to save a real decision card.</p></div>')+'</div></section>';
 layout("My learning","Your completed steps, next assignment and saved work.",body,"dashboard");
}
function sampleCard(s){
 return '<article class="nf-sample"><span class="nf-sample-art">'+art(s.role)+'</span><div class="nf-sample-body"><span class="nf-label">'+(s.kind==="tryout"?"CAREER TRY-OUT":"GUIDED PROJECT")+' · '+niceDate(s.date)+'</span><h3>'+esc(s.title)+'</h3><p>'+names[s.role]+'</p>'+button("Open work sample →","sample","nf-linkbtn",'data-id="'+esc(s.id)+'"')+'</div></article>';
}
function paths(){
 var cards=Object.keys(names).map(function(role){
  var d=defs[role],n=stepsDone(role),pct=n/2*100;
  return '<article class="nf-track"><div class="nf-track-art nf-track-'+role+'">'+art(role)+'</div><div class="nf-track-copy"><div class="nf-same"><span class="nf-label">CAREER EXPLORATION</span><span class="nf-pill">'+n+'/2 milestones</span></div><h2>'+names[role]+'</h2><p>'+esc(d.description)+'</p><div class="nf-trackbar"><i style="width:'+pct+'%"></i></div><div class="nf-actions">'+button(st.done[role]?"Replay try-out":"Start free try-out","tryout","nf-btn nf-secondary",'data-role="'+role+'"')+button(st.done[role]?(st.projects[role].complete?"Review project":"Guided project"):"See learning plan","project","nf-btn nf-primary",'data-role="'+role+'"')+'</div></div></article>';
 }).join("");
 layout("Explore career paths","Try the role first. Then build a guided work sample.",'<div class="nf-trackgrid">'+cards+'</div><section class="nf-notice"><img src="'+images.mentor+'" alt="" loading="lazy"><div><b>Start with a try-out. Continue with a project.</b><p>These guided exercises are free in this prototype. Accounts, subscriptions and a live AI mentor are not yet connected.</p></div></section>',"paths");
}
function portfolio(){
 var done=st.samples.slice().reverse();
 var body='<section class="nf-portfolio-banner"><div><span class="nf-label">YOUR WORK / SAVED LOCALLY</span><h2>Your completed work.</h2><p>These work samples are saved locally in your browser. Export them to keep a copy.</p></div><img src="'+images.mentor+'" alt="" loading="lazy"></section><div class="nf-section-head"><h2>'+done.length+' work sample'+(done.length===1?"":"s")+'</h2>'+button("Export all data","export","nf-linkbtn")+'</div><div class="nf-workgrid">'+(done.length?done.map(sampleCard).join(""):'<div class="nf-empty"><img src="'+images.marketing+'" alt="" loading="lazy"><h3>Nothing saved yet.</h3><p>Try a career to create your first artifact.</p>'+button("Explore careers","browse","nf-btn nf-primary")+'</div>')+'</div>';
 layout("My portfolio","Work samples from your career exercises and projects.",body,"portfolio");
}
function profile(){
 if(!st.profile){onboarding(st.preferred);return;}
 var name=esc(st.profile.name||""),goal=esc(st.profile.goal||"exploring");
 var opts=[["change","Explore a new career"],["transition","Change profession"],["confidence","Build practical skills"]];
 var body='<div class="nf-form-grid"><section class="nf-whitecard"><h2>Learning preferences</h2><form id="nf-profile-form"><label for="nf-name">Name</label><input id="nf-name" name="name" maxlength="40" value="'+name+'" placeholder="Your first name"><label for="nf-goal">Why are you exploring?</label><select id="nf-goal" name="goal">'+opts.map(function(v){return '<option value="'+v[0]+'" '+(goal===v[0]?'selected':'')+'>'+v[1]+'</option>';}).join("")+'</select><label for="nf-time">Learning rhythm</label><select id="nf-time" name="time">'+["10 minutes a day","20 minutes a day","3 times a week"].map(function(v){return '<option value="'+v+'" '+(st.profile.time===v?'selected':'')+'>'+v+'</option>';}).join("")+'</select><label for="nf-career">Current career</label><select id="nf-career" name="role"><option value="marketing" '+(st.preferred==="marketing"?"selected":"")+'>AI Marketing Specialist</option><option value="pm" '+(st.preferred==="pm"?"selected":"")+'>Product Manager</option></select><button class="nf-btn nf-primary" type="submit">Save preferences</button><p class="nf-small" role="status" id="nf-profile-status"></p></form></section><aside class="nf-whitecard nf-privacy"><img src="'+images.mentor+'" alt="" loading="lazy"><h3>Progress is saved in this browser.</h3><p>This prototype has no accounts, cloud syncing, payment processing or live AI. Clear your browser storage and progress disappears.</p>'+button("Download my data","export","nf-btn nf-secondary")+button("Reset local progress","reset","nf-linkbtn")+'</aside></div>';
 layout("My profile","A few settings to shape your learning. No account required.",body,"profile");
}
function onboarding(role){
 st.preferred=safeRole(role||st.preferred);save();
 var body='<div class="nf-onboard"><div class="nf-onboard-art"><img src="'+images.mentor+'" alt="Friendly illustrated NEWRO learning guide"></div><section class="nf-onboard-form"><span class="nf-label">YOUR SPACE · ONE-TIME SETUP</span><h2>Set up your learning space.</h2><p>A little context helps organize your learning. Everything stays in this browser.</p><form id="nf-onboard-form"><label for="nf-on-name">What should we call you? <span>optional</span></label><input name="name" id="nf-on-name" maxlength="40" placeholder="Your first name" autocomplete="given-name"><label for="nf-on-role">Start with a career</label><select name="role" id="nf-on-role"><option value="marketing" '+(st.preferred==="marketing"?"selected":"")+'>AI Marketing Specialist</option><option value="pm" '+(st.preferred==="pm"?"selected":"")+'>Product Manager</option></select><label for="nf-on-goal">What brought you here?</label><select name="goal" id="nf-on-goal"><option value="change">Explore a new career</option><option value="transition">Make a career change</option><option value="confidence">Build hands-on skills</option></select><label for="nf-on-time">A realistic rhythm</label><select name="time" id="nf-on-time"><option>10 minutes a day</option><option>20 minutes a day</option><option>3 times a week</option></select><button class="nf-btn nf-primary" type="submit">Create my learning space →</button><p class="nf-small">This creates a local profile, not an online account.</p></form></section></div>';
 layout("Welcome to NEWRO","One small step before you continue.",body,"dashboard");
}
function projectView(role){
 role=safeRole(role||st.preferred);
 if(!st.done[role]){st.preferred=role;save();window.NEWRO.start(role);return;}
 if(!st.profile){onboarding(role);return;}
 st.preferred=role;save();
 if(st.projects[role].complete){projectFinished(role);return;}
 var cfg=defs[role],p=st.projects[role],step=Math.max(0,Math.min(3,p.step||0)),task=cfg.steps[step],answer=p.answers[task.key]||"";
 var fields='<label for="nf-project-answer">Your answer</label><textarea id="nf-project-answer" class="nf-answer" maxlength="2500" placeholder="'+esc(task.placeholder)+'">'+esc(answer)+'</textarea><div class="nf-same"><span class="nf-small">Saved automatically on this device</span><span class="nf-counter" id="nf-count">'+answer.trim().length+' characters</span></div>';
 var pct=Math.round((step+1)/4*100);
 var body='<div class="nf-project-shell"><section class="nf-project-lead"><div class="nf-same"><span class="nf-label">'+esc(cfg.client)+'</span><span class="nf-pill">Step '+(step+1)+' / 4</span></div><div class="nf-meter"><i style="width:'+pct+'%"></i></div><h2>'+esc(task.title)+'</h2><p>'+esc(task.description)+'</p><div class="nf-project-illu">'+art(role)+'</div></section><section class="nf-project-form">'+fields+'<div class="nf-mentorbox"><img src="'+images.mentor+'" alt="" loading="lazy"><div><b>Mentor tip</b><p>'+esc(task.tip)+'</p><small>Guidance based on exercise rules, not a live AI response.</small></div></div><div id="nf-review">'+(p.review?'<div class="nf-feedback" role="status">'+esc(p.review)+'</div>':"")+'</div><div class="nf-project-buttons">'+button("← Back","project-back","nf-btn nf-secondary")+button("Check my draft","project-review","nf-btn nf-violet")+button(step===3?"Complete my project →":"Save & continue →","project-next","nf-btn nf-primary")+'</div><p class="nf-small">Minimum '+task.min+' characters. Your writing can be edited before completion.</p></section></div>';
 layout(cfg.title,"A guided project in the "+names[role]+" path.",body,"paths");
}
function getReview(role,step,value){
 var textValue=value.trim(),s=defs[role].steps[step],warnings=[];
 if(textValue.length<s.min)warnings.push("Add more detail so your reasoning is clear.");
 if(role==="marketing"){
  if(step===0&&!/\b(because|need|problem|renew|trial|charge|forget)\b/i.test(textValue))warnings.push("Link your audience to a concrete customer problem.");
  if(step===1&&/\b(never|guarantee|always|100%|world.s best|revolutionary)\b/i.test(textValue))warnings.push("Avoid a promise Harbor cannot verify.");
  if(step===2&&!/\b(avoid|do not|don't|without|constraint|must not|no guarantee)\b/i.test(textValue))warnings.push("Give the AI at least one constraint or forbidden claim.");
  if(step===3&&!/\b(signup|conversion|measure|click|test|metric|rate)\b/i.test(textValue))warnings.push("Name a measurable outcome, not just an activity.");
 }else{
  if(step===1&&!/\b(hour|risk|time|ship|postpone|delay)\b/i.test(textValue))warnings.push("Explain both scope and delivery trade-offs.");
  if(step===3&&!/\b(failure|error|rate|success|measure|monitor|reliab|incident)\b/i.test(textValue))warnings.push("Tie your follow-up to a measurable product outcome.");
 }
 return warnings.length?warnings.join(" "):"Good foundation. You have included useful specifics. Read it once more for unsupported assumptions before continuing.";
}
function projectNext(nextAction){
 var role=st.preferred,p=st.projects[role],step=p.step||0,task=defs[role].steps[step],input=document.getElementById("nf-project-answer");
 var textValue=input?input.value.trim():(p.answers[task.key]||"");
 p.answers[task.key]=textValue;markToday();
 if(nextAction==="review"){
   p.review=getReview(role,step,textValue);save();
   var out=document.getElementById("nf-review");if(out)out.innerHTML='<div class="nf-feedback" role="status">'+esc(p.review)+'</div>';return;
 }
 if(nextAction==="back"){if(step===0){go("dashboard");return;}p.step=Math.max(0,step-1);p.review="";save();projectView(role);return;}
 if(textValue.length<task.min){if(window.NEWROMobile)window.NEWROMobile.pulse("warning");input.focus();input.setAttribute("aria-invalid","true");var out=document.getElementById("nf-review");if(out)out.innerHTML='<div class="nf-error" role="alert">Please add at least '+task.min+' characters before continuing.</div>';return;}
 p.review="";
 if(step===3){p.complete=true;p.finishedAt=new Date().toISOString();save();
  var parts=defs[role].steps.map(function(x){return [x.title,p.answers[x.key]||""];});
  upsert({id:"project-"+role,kind:"project",role:role,title:defs[role].title,sections:parts,date:p.finishedAt});
  markToday();projectFinished(role);return;
 }
 p.step=step+1;save();projectView(role);
}
function upsert(s){
 st.samples=st.samples.filter(function(x){return x.id!==s.id;});
 st.samples.push(s);save();
}
function projectFinished(role){
 var p=st.projects[role],name=names[role];
 var body='<section class="nf-celebrate"><img src="'+images.mentor+'" alt="" loading="lazy"><span class="nf-label">PROJECT COMPLETE</span><h2>Project added to your portfolio.</h2><p>Your '+esc(name)+' work sample is now in your portfolio. Review your answers and download your work sample.</p><div class="nf-actions">'+button("Open my portfolio","portfolio","nf-btn nf-primary")+button("Explore another role","browse","nf-btn nf-secondary")+'</div></section><section class="nf-section"><h2>Your project</h2>'+defs[role].steps.map(function(t){return '<div class="nf-workrow"><b>'+esc(t.title)+'</b><p>'+paragraphs(p.answers[t.key]||"")+'</p></div>';}).join("")+'</section>';
 layout("Project complete","Your artifact is saved on this device.",body,"portfolio");
}
function detail(id){
 var sample=st.samples.find(function(s){return s.id===id;});
 if(!sample){portfolio();return;}
 var rows=(sample.sections||[]).map(function(p){return '<div class="nf-workrow"><h3>'+esc(p[0])+'</h3><p>'+paragraphs(p[1])+'</p></div>';}).join("");
 var body='<div class="nf-detail-banner">'+art(sample.role)+'<div><span class="nf-label">'+(sample.kind==="project"?"GUIDED PROJECT":"CAREER TRY-OUT")+'</span><h2>'+esc(sample.title)+'</h2><p>'+names[sample.role]+' · '+niceDate(sample.date)+'</p><div class="nf-actions">'+button("Download work sample","download-sample","nf-btn nf-primary",'data-id="'+esc(sample.id)+'"')+button("Copy text","copy-sample","nf-btn nf-secondary",'data-id="'+esc(sample.id)+'"')+button("Share","share-sample","nf-btn nf-secondary",'data-id="'+esc(sample.id)+'"')+'</div><p id="nf-copy-status" class="nf-small" role="status"></p></div></div><div class="nf-doc">'+rows+'</div><p class="nf-small">Practice scenario, not professional certification or a real client deliverable.</p>';
 layout("Work sample","Review what you produced and export it for your records.",body,"portfolio");
}
function finishTryout(role,sim){
 role=safeRole(role);
 var sections=[];
 if(role==="marketing"){
  var m=sim.marketing||{};
  sections=[["Audience",({trials:"People managing trial renewals",investors:"Individual investors",students:"Students seeking discounts"})[m.audience]||"Not selected"],["Headline",m.headline||"Not recorded"],["Experiment",[(m.channel||"No channel"),(m.metric||"No metric")].join(" · ")],["Reasoning",m.reason||"Not recorded"]];
 }else{
  var p=sim.pm||{};
  var all=["login","reminders","onboarding","household","dark","csv","referral"];
  sections=[["Selected backlog items",(p.selection||[]).join(", ")||"Not selected"],["Held items",all.filter(function(i){return (p.selection||[]).indexOf(i)<0;}).join(", ")],["Reasoning",p.reason||"Not recorded"]];
 }
 st.done[role]=true;st.preferred=role;markToday();
 upsert({id:"tryout-"+role,kind:"tryout",role:role,title:names[role]+" — first assignment",sections:sections,date:new Date().toISOString()});
 // Return to the learning flow rather than throwing away the completed session.
 if(st.profile){dashboard();}else onboarding(role);
}
function augmentLanding(root){
 if(!root)return;
 var ar=root.querySelectorAll(".cs-role-visual");
 for(var i=0;i<ar.length;i++){
  var img=document.createElement("img");img.src=images[i===0?"marketing":"pm"];img.alt="";img.loading="lazy";img.className="nf-landing-art";
  var old=ar[i].querySelector(".cs-role-graphic");if(old)old.replaceWith(img);else ar[i].appendChild(img);
 }
 var hero=root.querySelector(".cs-phone-illus");
 if(hero){hero.innerHTML='<img src="'+images.mentor+'" alt="" width="600" height="440" class="nf-hero-mentor">';}
 var top=root.querySelector(".cs-toplinks");
 if(top){var btn=document.createElement("button");btn.type="button";btn.className="nf-top-link";btn.textContent="My learning";btn.dataset.flowGo="dashboard";top.appendChild(btn);}
 var cta=root.querySelector(".cs-join");if(cta){cta.textContent="My learning ↗";cta.removeAttribute("onclick");cta.dataset.flowGo="dashboard";}
 var dock=root.querySelector(".cs-mobile-dock");
 if(dock){var buttons=dock.querySelectorAll("button");if(buttons[2]){buttons[2].disabled=false;buttons[2].removeAttribute("data-resume");buttons[2].removeAttribute("aria-label");buttons[2].innerHTML=icon("home")+"My learning";buttons[2].dataset.flowGo="dashboard";}}
 var role=root.querySelector("#careers");
 if(role){
  var section=document.createElement("section");section.className="nf-landing-bridge";section.innerHTML='<div><span class="nf-label">THE NEXT STEP</span><h2>A career path you can actually build.</h2><p>Finish a short try-out, move into a guided project, then save the work in your portfolio.</p>'+button("Open my learning space ↗","dashboard","nf-btn nf-secondary")+'</div><img src="'+images.mentor+'" alt="" loading="lazy">';
  role.after(section);
 }
}
function enhanceResult(role){
 var main=document.querySelector(".cs-player .playerMain");
 if(!main)return;
 var submit=document.getElementById("next");
 if(submit)submit.textContent="Save work & continue →";
 var hint=document.createElement("div");hint.className="nf-result-hint";hint.innerHTML='<img src="'+images.mentor+'" alt=""><div><b>What comes after this?</b><p>Save this sample to your portfolio and unlock your first guided project. Your work stays on this device.</p></div>';
 main.appendChild(hint);
}
function exportData(){download("newro-learning-data.json",JSON.stringify(st,null,2),"application/json;charset=utf-8");}
function resetConfirm(){
 layout("Reset learning progress","This deletes your local profile, work samples and all saved practice data.",'<div class="nf-whitecard"><h2>Reset everything on this device?</h2><p>This cannot be undone. Download your data before continuing.</p><div class="nf-actions">'+button("Download my data","export","nf-btn nf-secondary")+button("Yes, delete local progress","reset-confirmed","nf-btn nf-danger")+button("Cancel","profile","nf-linkbtn")+'</div></div>',"profile");
}
function go(page,arg,skipHash){
 if(page==="home"){history.replaceState(null,"",location.pathname+location.search);if(window.NEWRO){window.NEWRO.leave();}return;}
 if(!skipHash)history.replaceState(null,"","#/"+page+(arg?"/"+encodeURIComponent(arg):""));
 switch(page){
  case "dashboard":dash();break;
  case "paths":paths();break;
  case "portfolio":portfolio();break;
  case "profile":profile();break;
  case "onboarding":onboarding(arg);break;
  case "project":projectView(arg||st.preferred);break;
  case "sample":detail(arg);break;
  case "project-finished":projectFinished(arg||st.preferred);break;
  case "reset":resetConfirm();break;
  default:dash();
 }
}
document.addEventListener("click",function(event){
 var btn=event.target.closest("[data-flow-go], [data-flow-action]");
 if(!btn)return;
 var page=btn.dataset.flowGo;
 if(page){event.preventDefault();go(page);return;}
 var act=btn.dataset.flowAction,role=btn.dataset.role||st.preferred;
 if(!act)return;
 event.preventDefault();
 switch(act){
  case "dashboard":go("dashboard");break;case "portfolio":go("portfolio");break;case "browse":go("paths");break;case "profile":go("profile");break;case "reset":go("reset");break;
  case "reset-confirmed":{localStorage.removeItem(STORAGE);localStorage.removeItem(SIM_KEY);location.replace(location.pathname+location.search);break;}
  case "tryout":st.preferred=safeRole(role);save();history.replaceState(null,"",location.pathname+location.search);window.NEWRO.start(st.preferred);break;
  case "project":go("project",role);break;
  case "project-next":projectNext("next");break;case "project-back":projectNext("back");break;case "project-review":projectNext("review");break;
  case "sample":go("sample",btn.dataset.id);break;
  case "download-sample":{var sample=st.samples.find(function(s){return s.id===btn.dataset.id;});if(sample)download("newro-"+sample.id+".txt",sampleText(sample));break;}
  case "share-sample":{var item=st.samples.find(function(s){return s.id===btn.dataset.id;});if(item&&window.NEWROMobile)window.NEWROMobile.shareSample(item);break;}
  case "copy-sample":{var sample=st.samples.find(function(s){return s.id===btn.dataset.id;});if(sample&&navigator.clipboard){navigator.clipboard.writeText(sampleText(sample)).then(function(){var el=document.getElementById("nf-copy-status");if(el)el.textContent="Copied!";}).catch(function(){var el=document.getElementById("nf-copy-status");if(el)el.textContent="Copy not available. Use Download instead.";});}break;}
  case "export":exportData();break;
 }
});
document.addEventListener("input",function(e){
 if(e.target.id!=="nf-project-answer")return;
 var p=st.projects[st.preferred],task=defs[st.preferred].steps[p.step||0];
 p.answers[task.key]=e.target.value;save();
 var c=document.getElementById("nf-count");if(c)c.textContent=e.target.value.trim().length+" characters";
 e.target.removeAttribute("aria-invalid");
});
document.addEventListener("submit",function(e){
 var form=e.target;
 if(form.id!=="nf-onboard-form"&&form.id!=="nf-profile-form")return;
 e.preventDefault();
 var values=new FormData(form);
 st.profile={name:String(values.get("name")||"").trim().slice(0,40),goal:String(values.get("goal")||"change"),time:String(values.get("time")||"10 minutes a day")};
 st.preferred=safeRole(values.get("role"));markToday();
 if(form.id==="nf-profile-form"){var out=document.getElementById("nf-profile-status");if(out)out.textContent="Saved to this device.";setTimeout(function(){dash();},250);}
 else dash();
});
function restoreLocation(){
 var route=location.hash.match(/^#\/(dashboard|paths|portfolio|profile|project|sample|onboarding|project-finished)(?:\/([a-z0-9-]+))?$/);
 if(route)go(route[1],route[2]?decodeURIComponent(route[2]):null,true);
}
window.addEventListener("hashchange",restoreLocation);
window.addEventListener("DOMContentLoaded",restoreLocation);
var previousHome=window.NEWROHome;
window.NEWROHome=function(meta,target){
 if(previousHome)previousHome(meta,target);
 augmentLanding(target);
};
window.NEWROFlow={
 goto:go,
 finish:finishTryout,
 enhanceResult:enhanceResult,
 augmentLanding:augmentLanding,
 project:projectView,
 getState:function(){return JSON.parse(JSON.stringify(st));}
};
})();