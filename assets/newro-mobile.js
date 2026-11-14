/* NEWRO phone interactions. Progressive enhancement only.
 * Web Vibration, Web Share and PWA install prompts depend on browser support.
 * Never simulate a haptic response or claim that a vibration happened. */
(function () {
 "use strict";
 var KEY="newro-haptics-v1",last=0,installEvent=null;
 var patterns={tap:7,choice:12,advance:9,success:[15,50,18],warning:24};
 function available(){return typeof navigator.vibrate==="function";}
 function touch(){return window.matchMedia && window.matchMedia("(pointer: coarse)").matches;}
 function enabled(){
   if(!available()||!touch())return false;
   try{return localStorage.getItem(KEY)!=="off";}catch(e){return true;}
 }
 function pulse(kind){
   if(!enabled()||document.visibilityState==="hidden")return false;
   var now=Date.now();
   if(now-last<85)return false;
   last=now;
   try{return navigator.vibrate(patterns[kind]||patterns.tap)===true;}catch(e){return false;}
 }
 function setEnabled(on){
   try{localStorage.setItem(KEY,on?"on":"off");}catch(e){}
   if(!on&&available()){try{navigator.vibrate(0);}catch(e){}}
 }
 // Respond to intentional actions, never auto-vibrate during an autoplay animation.
 document.addEventListener("click",function(event){
   if(!event.isTrusted)return;
   var target=event.target.closest("button, a, [role=button], .choice");
   if(!target || target.disabled)return;
   if(target.hasAttribute("data-nm-haptic-toggle"))return;
   var kind="tap";
   if(target.matches(".choice,[data-flow-action='project-review']"))kind="choice";
   else if(target.matches("[data-flow-action='project-next'], #next, .nf-primary, .nl-bigcta"))kind="advance";
   else if(target.matches("[data-flow-action='reset-confirmed']"))kind="warning";
   else if(target.matches("[data-flow-action='download-sample']"))kind="success";
   pulse(kind);
 }, {capture:true,passive:true});
 async function shareSample(sample){
   if(!sample)return;
   var entries=(sample.sections||[]).map(function(p){return p[0]+": "+p[1];}).join("\n\n");
   var content=sample.title+"\n\n"+entries+"\n\nPractice work sample · NEWRO, not a certificate.";
   var status=document.getElementById("nf-copy-status");
   if(navigator.share){
     try{await navigator.share({title:sample.title,text:content.slice(0,18000)});pulse("success");if(status)status.textContent="Shared from your device.";return;}
     catch(e){if(e.name==="AbortError")return;}
   }
   if(navigator.clipboard && navigator.clipboard.writeText){
     try{await navigator.clipboard.writeText(content);pulse("success");if(status)status.textContent="Sharing is not available here. Work sample copied instead.";return;}
     catch(e){}
   }
   if(status)status.textContent="Sharing is unavailable. Use Download work sample.";
 }
 function hapticsControl(){
   var block=document.querySelector(".nf-privacy");
   if(!block || block.querySelector("[data-nm-haptic-toggle]"))return;
   var panel=document.createElement("section");
   panel.className="nm-device-setting";
   panel.innerHTML='<div><strong>Touch feedback</strong><p>Short vibration on key decisions. Only when your phone supports it.</p></div><button type="button" data-nm-haptic-toggle class="nf-btn nf-secondary" aria-pressed="false">Off</button>';
   block.appendChild(panel);
   var button=panel.querySelector("button");
   function refresh(){
     var can=available()&&touch();
     button.disabled=!can;button.setAttribute("aria-pressed",String(enabled()));
     button.textContent=can?(enabled()?"On":"Off"):"Unavailable";
     button.setAttribute("aria-label",can?"Toggle vibration feedback":"Vibration is not supported by this device and browser");
   }
   button.addEventListener("click",function(){
     setEnabled(!enabled());refresh();pulse("choice");
   });
   refresh();
 }
 function installButton(){
   var block=document.querySelector(".nf-privacy");
   if(!block||!installEvent||block.querySelector("[data-nm-install]"))return;
   var btn=document.createElement("button");
   btn.type="button";btn.className="nf-btn nf-secondary";btn.dataset.nmInstall="true";
   btn.textContent="Install NEWRO on this device";
   btn.addEventListener("click",async function(){
     if(!installEvent)return;
     var e=installEvent;installEvent=null;
     try{await e.prompt();}catch(err){}
     btn.remove();
   });
   block.appendChild(btn);
 }
 function enhanceLayout(active){
   if(active==="profile"){hapticsControl();installButton();}
 }
 window.addEventListener("beforeinstallprompt",function(e){
   e.preventDefault();installEvent=e;installButton();
 });
 window.addEventListener("appinstalled",function(){installEvent=null;});
 window.NEWROMobile={pulse:pulse,enabled:enabled,available:available,touch:touch,shareSample:shareSample,enhanceLayout:enhanceLayout};
})();