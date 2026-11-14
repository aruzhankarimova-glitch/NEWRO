/* NEWRO interaction layer, 2026-11
 * Purposeful motion only: a playable job-task preview, depth cues, scroll context.
 * Progressive enhancement: all navigation and controls work without this file.
 */
(function(){
"use strict";
var mql=window.matchMedia("(prefers-reduced-motion: reduce)");
var fine=window.matchMedia("(hover: hover) and (pointer: fine)");
var currentHome=null,scrollFrame=0,cleanupScroll=null,revealObserver=null;
function reduced(){return mql.matches;}
function home(shell){
  if(!shell||!shell.isConnected||shell.dataset.nmPremium==="1")return;
  shell.dataset.nmPremium="1";
  if(cleanupScroll){cleanupScroll();cleanupScroll=null;}
  if(revealObserver){revealObserver.disconnect();revealObserver=null;}
  currentHome=shell;
  setupQuickTask(shell);
  setupDepth(shell);
  setupScroll(shell);
  setupReveal(shell);
}
function setupQuickTask(shell){
  var quiz=shell.querySelector(".nm-quick-choices");
  if(!quiz)return;
  var feedback=shell.querySelector(".nm-quick-feedback");
  var next=shell.querySelector(".cs-phone-cta");
  quiz.addEventListener("click",function(event){
    var b=event.target.closest("[data-quick-choice]");
    if(!b || !quiz.contains(b))return;
    var right=b.dataset.quickChoice==="trials";
    quiz.querySelectorAll("[data-quick-choice]").forEach(function(choice){
      choice.setAttribute("aria-pressed",String(choice===b));
      choice.classList.toggle("nm-selected",choice===b);
    });
    if(feedback){
      feedback.textContent=right
        ?"Matches the brief: Harbor tracks upcoming renewals."
        :"Harbor doesn't analyze stocks. Try the other audience.";
      feedback.dataset.result=right?"right":"try-again";
      feedback.hidden=false;
    }
    if(next)next.textContent=right?"Continue to the full assignment →":"Open the full assignment →";
    if(window.NEWROMobile)window.NEWROMobile.pulse(right?"success":"choice");
  });
}
function setupDepth(shell){
 if(!fine.matches||reduced())return;
 var targets=Array.from(shell.querySelectorAll(".cs-role-visual, .cs-stage"));
 targets.forEach(function(el){
  var frame=0,last=null;
  el.addEventListener("pointermove",function(event){
   last=event;
   if(frame)return;
   frame=requestAnimationFrame(function(){
    frame=0;
    if(!el.isConnected||!last)return;
    var r=el.getBoundingClientRect();
    if(!r.width||!r.height)return;
    var x=Math.max(0,Math.min(1,(last.clientX-r.left)/r.width));
    var y=Math.max(0,Math.min(1,(last.clientY-r.top)/r.height));
    el.style.setProperty("--nm-x",Math.round(x*100)+"%");
    el.style.setProperty("--nm-y",Math.round(y*100)+"%");
    el.style.setProperty("--nm-tilt-x",(y-.5)*-6+"deg");
    el.style.setProperty("--nm-tilt-y",(x-.5)*6+"deg");
   });
  },{passive:true});
  function reset(){
   if(frame)cancelAnimationFrame(frame);
   frame=0;last=null;
   el.style.removeProperty("--nm-tilt-x");
   el.style.removeProperty("--nm-tilt-y");
   el.style.removeProperty("--nm-x");
   el.style.removeProperty("--nm-y");
  }
  el.addEventListener("pointerleave",reset);
  window.addEventListener("blur",reset,{once:true});
 });
}
function setupScroll(shell){
 var bar=shell.querySelector(".nm-page-progress");
 if(!bar)return;
 var anchors=Array.from(shell.querySelectorAll(".cs-toplinks a[href^='#']"));
 var nav=Array.from(shell.querySelectorAll(".cs-mobile-dock [data-scroll]"));
 function update(){
  scrollFrame=0;
  if(!shell.isConnected)return;
  var all=document.documentElement.scrollHeight-window.innerHeight;
  var ratio=all>0?Math.max(0,Math.min(1,window.scrollY/all)):0;
  bar.style.transform="scaleX("+ratio.toFixed(4)+")";
  var current=window.scrollY+window.innerHeight*.35;
  var sections=["top","careers","how"];
  var active="top";
  sections.forEach(function(id){
    var node=document.getElementById(id);
    if(node && node.getBoundingClientRect().top+window.scrollY<=current)active=id;
  });
  anchors.forEach(function(a){
    if(a.getAttribute("href")==="#"+active)a.setAttribute("aria-current","location");
    else a.removeAttribute("aria-current");
  });
  nav.forEach(function(button){
    button.classList.toggle("active",button.dataset.scroll===active);
    if(button.dataset.scroll===active)button.setAttribute("aria-current","location");
    else button.removeAttribute("aria-current");
  });
 }
 function schedule(){
  if(!scrollFrame)scrollFrame=requestAnimationFrame(update);
 }
 window.addEventListener("scroll",schedule,{passive:true});
 window.addEventListener("resize",schedule,{passive:true});
 cleanupScroll=function(){
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",schedule);
   if(scrollFrame)cancelAnimationFrame(scrollFrame);
   scrollFrame=0;
 };
 update();
}
function setupReveal(shell){
 if(reduced()||typeof IntersectionObserver==="undefined")return;
 var nodes=Array.from(shell.querySelectorAll(".cs-role, .cs-step, .nf-landing-bridge, .cs-section-heading"));
 var io=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting)return;
    io.unobserve(entry.target);
    if(!entry.target.isConnected||shell.classList.contains("nl-sw-running"))return;
    var el=entry.target;
    var distance=el.matches(".cs-role")?17:10;
    try{el.animate([{transform:"translateY("+distance+"px)",opacity:.78},{transform:"translateY(0)",opacity:1}],{duration:460,easing:"cubic-bezier(.22,.75,.27,1)",fill:"none"});}catch(e){}
  });
 },{threshold:.1,rootMargin:"0px 0px -28px 0px"});
 revealObserver=io;
 nodes.forEach(function(el){io.observe(el);});
}
function flowView(active){
 var app=document.querySelector(".nf-app");
 if(!app)return;
 app.classList.add("nm-enhanced");
 // One initial, state-related motion on route changes, not looping decoration.
 if(!reduced()){
  var heading=app.querySelector(".nf-heading");
  if(heading){try{heading.animate([{transform:"translateY(9px)",opacity:.65},{transform:"none",opacity:1}],{duration:330,easing:"ease-out"});}catch(e){}}
 }
}
function lesson(){
 var player=document.querySelector(".cs-player");
 if(!player||reduced())return;
 var progress=player.querySelector(".cs-course-meta");
 if(progress){try{progress.animate([{opacity:.72,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:260,easing:"ease-out"});}catch(e){}}
}
window.NEWROPremium={home:home,flowView:flowView,lesson:lesson};
})();