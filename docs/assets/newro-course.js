/* NEWRO — responsive course-led homepage & lesson UX layer.
 * Own implementation. Existing career simulations and rule-based feedback are retained.
 */
(function(){
"use strict";
function text(x){return String(x==null?"":x).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]})}
function icon(name){
  var paths={
   explore:'<path d="M12 3 14.6 9.4 21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6z"/>',
   roles:'<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6m-11 7h16"/>',
   path:'<path d="M5 4v5m0 0h5M5 9l6-5m8 16v-6m0 0h-5m5 0-6 6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/>'
  };
  return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]||paths.explore)+'</svg>';
}
function home(meta,root){
  if(window.NEWROSwarm)window.NEWROSwarm.stop();
  var saved=!!(meta&&meta.resume),role=meta&&meta.role==="marketing"?"AI Marketing Specialist":"Product Manager";
  root.innerHTML=
  '<div id="nl-shell" class="nl-shell cs-shell">' +
    '<header id="top" class="cs-top"><div class="cs-topin">' +
      '<a class="nl-brand" href="#top" data-build="brand"><span class="nl-brand-icon">n</span>newro<span class="nl-brand-dot">.</span></a>' +
      '<nav class="cs-toplinks" aria-label="Site navigation"><a href="#careers">Explore roles</a><a href="#how">How it works</a></nav>' +
      (saved?'<button class="cs-sign" onclick="NEWRO.resume()" type="button">Resume your session</button>':'') +
      '<button class="cs-join" onclick="NEWRO.start(\'marketing\')" type="button">Start free try-out ↗</button>' +
    '</div></header>' +
    '<main><div class="nl-wrap"><section class="cs-hero" aria-label="Explore careers">' +
      '<div class="cs-hero-text">' +
        '<p class="cs-eyebrow" data-build="eyebrow"><span class="cs-eyebrow-dot"></span>REAL WORK. SMALL STEPS. YOUR FUTURE.</p>' +
        '<h1 class="cs-title" data-build="heading">Find your next <em>big thing.</em></h1>' +
        '<p class="cs-lede" data-build="description">Wondering what a new career feels like? Try the actual decisions, work with a mentor, and see if the work clicks.</p>' +
        '<div class="cs-hero-buttons" data-build="actions"><button class="nl-bigcta" type="button" onclick="NEWRO.start(\'marketing\')">Start my first task<span class="cs-button-arrow">↗</span></button><button class="cs-linkbtn" type="button" data-scroll="how">How it works ↘</button></div>' +
        '<div class="cs-chips" data-build="proof"><span class="cs-chip"><b>✓</b> Free to try</span><span class="cs-chip">◷ ~10 min</span><span class="cs-chip">✦ Learn by doing</span></div>' +
        (saved?'<div class="cs-resume" data-build="saved"><div><b>Welcome back</b><small>'+text(role)+' · your progress is saved</small></div><button type="button" data-resume>Resume →</button></div>':'') +
      '</div>' +
      '<div class="nl-stage cs-stage" data-build="stage">' +
        '<div class="cs-orbit" aria-hidden="true"></div><div class="cs-orbit two" aria-hidden="true"></div>' +
        '<div class="cs-stage-top"><span class="cs-stage-live">LIVE LEARNING PREVIEW</span><button class="cs-replay" type="button" data-replay>↺ Replay</button></div>' +
        '<div class="cs-card-device">' +
          '<div class="cs-phone-status"><span>NEWRO · DAY ONE</span><span>✦ 32%</span></div>' +
          '<div class="cs-phone-bar"><i></i></div>' +
          '<p class="cs-phone-head" data-build="board-eyebrow">YOUR FIRST REAL ASSIGNMENT</p>' +
          '<h2 class="cs-phone-title" data-build="board-heading">Make your first marketing decision.</h2>' +
          '<div class="cs-phone-illus" aria-hidden="true"><span class="cs-illus-blob"></span><span class="cs-illus-person"><span class="cs-illus-head"></span><span class="cs-illus-body"></span></span><span class="cs-illus-card">✳</span></div>' +
          '<p class="cs-phone-task" data-build="board-copy">Who would you reach first?</p>' +
          '<div class="cs-phone-question" data-build="board-card">People who forget free-trial renewals</div>' +
          '<button class="cs-phone-cta" type="button" onclick="NEWRO.start(\'marketing\')" aria-label="Try this marketing assignment">Continue →</button>' +
        '</div>' +
        '<div class="cs-float top" data-build="board-mentor"><strong>✦ YOUR MENTOR</strong>Start with the customer problem.</div>' +
        '<div class="cs-float bottom green">✓ A real decision, not a quiz</div>' +
        '<div class="cs-sparks" aria-hidden="true">✦</div>' +
      '</div>' +
    '</section></div>' +
    '<section class="cs-role-section" id="careers"><div class="nl-wrap">' +
      '<div class="cs-section-heading"><h2 data-build="careers-heading">Pick a profession.<br>Try a real task.</h2><p>Learn how the work feels before committing to a long course.</p></div>' +
      '<div class="cs-roles">' +
        '<button class="cs-role" data-build="career-one" type="button" onclick="NEWRO.start(\'marketing\')">' +
          '<div class="cs-role-visual"><span class="cs-role-badge">FREE TRY-OUT</span><div class="cs-role-graphic"><span class="cs-role-symbol">✳</span></div></div>' +
          '<div class="cs-role-body"><span class="cs-role-small">CAREER 01 · CREATIVE + ANALYTICAL</span><h3>AI Marketing<br>Specialist</h3><p>Understand your audience, direct AI, and design an experiment that makes sense.</p><div class="cs-role-footer"><span class="cs-role-tag">◷ About 10 minutes</span><span class="cs-role-play">Play now ↗</span></div></div>' +
        '</button>' +
        '<button class="cs-role" data-build="career-two" type="button" onclick="NEWRO.start(\'pm\')">' +
          '<div class="cs-role-visual"><span class="cs-role-badge">FREE TRY-OUT</span><div class="cs-role-graphic"><span class="cs-role-symbol">▤</span></div></div>' +
          '<div class="cs-role-body"><span class="cs-role-small">CAREER 02 · STRATEGY + PRODUCT</span><h3>Product<br>Manager</h3><p>Make a release decision, balance trade-offs, and defend your priorities.</p><div class="cs-role-footer"><span class="cs-role-tag">◷ Short exercise</span><span class="cs-role-play">Play now ↗</span></div></div>' +
        '</button>' +
      '</div>' +
    '</div></section>' +
    '<section class="cs-steps" id="how"><div class="nl-wrap cs-steps-grid"><h2>Try it.<br>Learn it.<br>Own it.</h2>' +
      '<div class="cs-step"><span class="cs-step-number">01</span><h3>Enter the scenario</h3><p>Get a short brief that feels like a task from a real workplace.</p></div>' +
      '<div class="cs-step"><span class="cs-step-number">02</span><h3>Make the decisions</h3><p>Answer questions, improve work, and get feedback on your reasoning.</p></div>' +
      '<div class="cs-step"><span class="cs-step-number">03</span><h3>Keep your result</h3><p>Leave with a work sample and decide what you want to explore next.</p></div>' +
    '</div></section></main>' +
    '<footer class="cs-bottom nl-wrap"><span>NEWRO · Career exploration prototype</span><span>Fictional clients and tasks. Mentor feedback is rule-based, not a live AI service.</span></footer>' +
    '<nav class="nl-mobile-dock cs-mobile-dock" aria-label="Mobile navigation">' +
      '<button class="active" type="button" data-scroll="top">'+icon("explore")+'Explore</button>' +
      '<button type="button" data-scroll="careers">'+icon("roles")+'Try-outs</button>' +
      '<button type="button" '+(saved?'data-resume':'disabled aria-label="No saved career try-out"')+'>'+icon("path")+'Resume</button>' +
    '</nav>' +
  '</div>';

  var shell=document.getElementById("nl-shell");
  shell.querySelectorAll("[data-scroll]").forEach(function(btn){
    btn.addEventListener("click",function(){
      if(window.NEWROSwarm)window.NEWROSwarm.stop();
      var target=document.getElementById(btn.getAttribute("data-scroll"));
      if(target)target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
      shell.querySelectorAll(".cs-mobile-dock button").forEach(function(el){el.classList.toggle("active",el===btn);});
    });
  });
  shell.querySelectorAll("[data-resume]").forEach(function(btn){btn.addEventListener("click",function(){if(window.NEWRO)window.NEWRO.resume();});});
  shell.querySelectorAll("[data-replay]").forEach(function(btn){btn.addEventListener("click",function(){if(window.NEWROSwarm)window.NEWROSwarm.start(shell,true);});});
  if(window.NEWROSwarm && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)window.NEWROSwarm.start(shell,false);
}
var tracks={
 marketing:[
  "Your first day","Meet the client","Customer signals","Choose an audience","Make a promise",
  "Direct the AI","Edit the draft","Plan an experiment","Mentor challenge","Skill reflection","Your work sample"
 ],
 pm:[
  "Your first day","Friday brief","Choose your release","Review trade-offs",
  "Practice reasoning","Explain your choices","Decision card"
 ]
};
function enhance(o){
 var player=document.querySelector(".player");
 if(!player)return;
 player.classList.add("cs-player");
 var main=player.querySelector(".playerMain"),header=player.querySelector(".headerInner");
 if(!main||!header)return;
 var total=(o.max||0)+1,step=o.step||0,role=o.role==="pm"?"Product Manager":"AI Marketing Specialist";
 var meta=document.createElement("div");
 meta.className="cs-course-meta";
 meta.innerHTML='<span class="cs-course-icon" aria-hidden="true">'+(o.role==="pm"?"▤":"✳")+'</span><span class="cs-course-meta-text"><b>'+text(role)+'</b><small>Your career try-out · Short interactive practice</small></span><span class="cs-stage-pill">'+(step+1)+' / '+total+'</span>';
 main.insertBefore(meta,main.firstChild);
 var pathButton=document.createElement("button");
 pathButton.type="button";pathButton.className="cs-pathbtn";
 pathButton.textContent="View path";pathButton.setAttribute("aria-label","View your learning path");
 var progressText=header.querySelector(".mini");
 if(progressText)header.insertBefore(pathButton,progressText);
 else header.appendChild(pathButton);
 var list=(tracks[o.role]||tracks.marketing);
 var dlg=document.createElement("dialog");dlg.className="cs-path-dialog";dlg.setAttribute("aria-label","Career learning path");
 var rows=list.map(function(name,i){
   var status=i<step?"done":i===step?"current":"upcoming";
   return '<li class="cs-path-item '+status+'"><span class="cs-path-node">'+(i<step?"✓":i===step?"▶":"◇")+'</span><span><b>'+text(name)+'</b><p>'+(i<step?"Completed · Tap to revisit":i===step?"You are here":"Coming next")+'</p></span>'+(i<step?'<button type="button" data-stage="'+i+'" aria-label="Return to '+text(name)+'">↶</button>':"")+'</li>';
 }).join("");
 dlg.innerHTML='<div class="cs-path-inner"><div class="cs-path-head"><div><small>NEWRO / CAREER PATH</small><h2>Your learning path</h2></div><button type="button" class="cs-path-close" aria-label="Close learning path">×</button></div><ol class="cs-path-list">'+rows+'</ol><div class="cs-path-summary">Each stage is a small real-world decision. Progress reflects completed steps, not professional qualification.</div></div>';
 main.appendChild(dlg);
 pathButton.addEventListener("click",function(){if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");});
 dlg.querySelector(".cs-path-close").addEventListener("click",function(){if(dlg.close)dlg.close();else dlg.removeAttribute("open");});
 dlg.addEventListener("click",function(e){if(e.target===dlg && dlg.close)dlg.close();});
 dlg.querySelectorAll("[data-stage]").forEach(function(btn){btn.addEventListener("click",function(){if(dlg.close)dlg.close();if(window.NEWRO&&typeof window.NEWRO.jump==="function")window.NEWRO.jump(Number(btn.dataset.stage));});});
 if(step===o.max){
   var celebration=document.createElement("div");celebration.className="cs-celebrate";
   celebration.innerHTML='<span class="cs-celebrate-icon" aria-hidden="true">🏆</span><b>You did the work.</b><p>Explore what you decided, keep your work sample and choose your next step.</p>';
   main.insertBefore(celebration,meta.nextSibling);
 }
}
window.NEWROHome=home;
window.NEWROCourseUI={enhance:enhance};
})();
