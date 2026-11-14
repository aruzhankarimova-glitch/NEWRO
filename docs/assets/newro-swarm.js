/* NEWRO Career Studio · self-contained original DOM construction animation.
   Inspired by the page-building interaction of Swarm / Swarm Rebuild.
   This file contains no code or artwork from those unlicensed projects. */
(function () {
  "use strict";
  var current = null;
  var palette = ["#6553E8", "#219268", "#EA8064", "#8A6AD9", "#2C8DAB"];
  var people = ["mentor", "strategist", "builder", "you", "designer"];
  var K = [
    "brand","eyebrow","heading","description","actions","proof","stage",
    "board-eyebrow","board-heading","board-copy","board-card","board-mentor",
    "saved","careers-heading","career-one","career-two"
  ];
  var special = {brand:"type",eyebrow:"type",heading:"type",description:"type",
    actions:"box",proof:"type",stage:"box", "board-eyebrow":"type","board-heading":"type",
    "board-copy":"type","board-card":"box","board-mentor":"box",
    saved:"box","careers-heading":"type","career-one":"box","career-two":"duplicate"};
  var reduce = function () { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; };

  function sleep(ms,s) { return new Promise(function (done) {
    var timer=setTimeout(done,ms);
    if(s) s.timers.push(timer);
  });}
  function viewportRect(node) { return node.getBoundingClientRect(); }
  function show(node) {
    if(!node) return;
    node.classList.add("nl-built");
    node.style.removeProperty("clip-path");
    node.style.removeProperty("opacity");
  }
  function clear(s) {
    if(!s) return;
    s.dead = true;
    s.timers.forEach(clearTimeout);
    if(s.observer) s.observer.disconnect();
    if(s.overlay) s.overlay.remove();
    if(s.skip) s.skip.remove();
    if(s.shell && s.shell.isConnected) {
      s.shell.classList.add("nl-sw-skip-instant");
      s.shell.querySelectorAll("[data-build]").forEach(function(node){
        if(node.getAnimations)node.getAnimations().forEach(function(a){a.cancel();});
        show(node);
      });
      window.setTimeout(function(){if(s.shell && s.shell.isConnected)s.shell.classList.remove("nl-sw-skip-instant");},500);
      s.shell.classList.remove("nl-sw-running");
      var status=s.shell.querySelector("[data-build-progress]");
      if(status) status.textContent="STUDIO READY";
    }
    if(current===s)current=null;
  }
  function stop(){clear(current);}
  function make(tag,cls,parent) {
    var el=document.createElement(tag);
    if(cls) el.className=cls;
    if(parent) parent.appendChild(el);
    return el;
  }
  function syncActor(actor) {
    actor.el.style.transform="translate3d("+actor.x+"px,"+actor.y+"px,0)";
  }
  function move(actor,x,y,ms,s,curve) {
    return new Promise(function(resolve){
      if(s.dead){resolve();return;}
      var sx=actor.x,sy=actor.y,begin=performance.now();
      ms=Math.max(60,ms);
      function tick(t) {
        if(s.dead){resolve();return;}
        var progress=Math.min(1,(t-begin)/ms),ease=1-Math.pow(1-progress,3);
        var arc=(curve||0)*Math.sin(progress*Math.PI);
        actor.x=sx+(x-sx)*ease+arc;
        actor.y=sy+(y-sy)*ease-arc*.6;
        syncActor(actor);
        if(progress<1) requestAnimationFrame(tick); else resolve();
      }
      requestAnimationFrame(tick);
    });
  }
  function makeCursor(id,s) {
    var el=make("div","nl-sw-cursor",s.overlay);
    el.style.setProperty("--cursor-color",palette[id%palette.length]);
    var pointer=make("span","nl-sw-arrow",el);
    var pill=make("span","nl-sw-cursor-label",el);
    pill.textContent=people[id%people.length];
    el.setAttribute("aria-hidden","true");
    return {el:el,x:0,y:0};
  }
  function intoView(node) {
    var r=viewportRect(node);
    return r.top<window.innerHeight+80 && r.bottom > -60 && r.width>0 && r.height>0;
  }
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function drawLabel(x,y,word,s,ms) {
    var el=make("div","nl-sw-measure",s.overlay);
    el.textContent=word;
    el.style.left=clamp(x,8,window.innerWidth-84)+"px";
    el.style.top=clamp(y,12,window.innerHeight-25)+"px";
    el.style.opacity="1";
    s.timers.push(setTimeout(function(){el.remove()},ms||430));
    return el;
  }
  function sound(s,isTyping) {
    if(!s.audio || !s.soundOn) return;
    try {
      var ctx=s.audio;
      if(ctx.state==="suspended") ctx.resume();
      var oscillator=ctx.createOscillator();
      var gain=ctx.createGain(),now=ctx.currentTime;
      oscillator.type=isTyping?"triangle":"sine";
      oscillator.frequency.setValueAtTime(isTyping?450:320,now);
      oscillator.frequency.exponentialRampToValueAtTime(isTyping?280:240,now+.055);
      gain.gain.setValueAtTime(.009,now);
      gain.gain.exponentialRampToValueAtTime(.0001,now+.065);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now);oscillator.stop(now+.07);
    } catch(e){}
  }
  function drawGuide(rect,s,actor){
    if(s.dead)return;
    var guide=make("div","nl-sw-guide",s.overlay);
    var top=clamp(rect.top-12,8,window.innerHeight-18);
    guide.style.top=top+"px";
    guide.style.left="0";
    guide.style.width="100vw";
    guide.style.setProperty("--guide-color",palette[actor%palette.length]);
    guide.style.animation="nl-sw-guides-in .19s ease-out both";
    drawLabel(rect.left-5,top+4,"X "+Math.round(rect.left)+" / Y "+Math.round(rect.top),s,360);
    s.timers.push(setTimeout(function(){guide.remove()},430));
  }
  function outlineRect(rect,s,actor) {
    var border=make("div","nl-sw-outline",s.overlay);
    border.style.left=(rect.left-4)+"px";
    border.style.top=(rect.top-4)+"px";
    border.style.width=(rect.width+8)+"px";
    border.style.height=(rect.height+8)+"px";
    border.style.setProperty("--draw-color",palette[actor%palette.length]);
    return border;
  }
  async function boxTask(node,actor,s,index) {
    var r=viewportRect(node);
    if(!intoView(node)){show(node);return;}
    var lx=clamp(r.left,8,window.innerWidth-58),ty=clamp(r.top,12,window.innerHeight-49);
    await move(actor,lx,ty,125,s,index%2?13:-13);
    if(s.dead) return;
    drawGuide(r,s,index%palette.length);
    var rect=outlineRect(r,s,index%palette.length);
    var rx=clamp(r.right-8,10,window.innerWidth-35),by=clamp(r.bottom-8,12,window.innerHeight-36);
    var tween=rect.animate([{clipPath:"inset(0 100% 100% 0)",opacity:0.9},{clipPath:"inset(0 0 0 0)",opacity:1}],{duration:275,easing:"cubic-bezier(.22,1,.36,1)",fill:"forwards"});
    await move(actor,rx,by,275,s,0);
    if(s.dead){rect.remove();return;}
    show(node);
    sound(s,false);
    drawLabel(clamp(r.left+r.width/2,10,window.innerWidth-85),clamp(r.bottom+6,10,window.innerHeight-26),Math.round(r.width)+" × "+Math.round(r.height),s,450);
    rect.style.opacity="0";
    s.timers.push(setTimeout(function(){rect.remove()},240));
  }
  async function typingTask(node,actor,s,index) {
    var r=viewportRect(node);
    if(!intoView(node)){show(node);return;}
    var left=clamp(r.left,9,window.innerWidth-48),y=clamp(r.top+Math.min(r.height/2,28),10,window.innerHeight-38);
    await move(actor,left,y,110,s,index%2?-10:10);
    if(s.dead)return;
    show(node);
    var caret=make("div","nl-sw-caret",s.overlay);
    caret.style.left=left+"px";caret.style.top=(y-15)+"px";
    caret.style.height=(r.height>100?"34":"25")+"px";
    caret.style.background=palette[index%palette.length];
    var clip=null;
    try { clip=node.animate([{clipPath:"inset(0 100% 0 0)",opacity:1},{clipPath:"inset(0 0 0 0)",opacity:1}],{
      duration:Math.min(450,Math.max(180,((node.textContent||"").length)*7)),
      easing:"steps("+Math.min(30,Math.max(8,(node.textContent||"").length))+ ", end)",fill:"forwards"
    }); } catch(e){}
    var duration=Math.min(450,Math.max(180,((node.textContent||"").length)*7));
    await move(actor,clamp(r.left+Math.min(r.width,Math.max(r.width*.68,82)),12,window.innerWidth-42),y,duration,s,0);
    if(clip)clip.cancel(); // Native text remains visible after clipping animation
    caret.remove();
    if(s.dead)return;
    sound(s,true);
  }
  async function duplicateTask(node,actor,s,index) {
    var first=s.shell.querySelector('[data-build="career-one"]');
    if(first && intoView(first) && intoView(node)){
      var from=viewportRect(first),to=viewportRect(node);
      var ghost=make("div","nl-sw-duplicate",s.overlay);
      ghost.style.left=from.left+"px";ghost.style.top=from.top+"px";
      ghost.style.width=from.width+"px";ghost.style.height=from.height+"px";
      ghost.style.borderColor=palette[index%palette.length];
      drawLabel(clamp(to.left,8,window.innerWidth-85),clamp(to.top,12,window.innerHeight-40),"ALT + DRAG",s,560);
      var animation=ghost.animate([
        {transform:"translate(0px,0px) scale(.98)",opacity:.85},
        {transform:"translate("+(to.left-from.left)+"px,"+(to.top-from.top)+"px) scale(1)",opacity:.22}
      ],{duration:330,easing:"cubic-bezier(.3,0,.2,1)",fill:"forwards"});
      await move(actor,clamp(to.left+35,8,window.innerWidth-35),clamp(to.top+22,8,window.innerHeight-36),330,s);
      animation.cancel();ghost.remove();
    }
    if(s.dead)return;
    await boxTask(node,actor,s,index);
  }
  function placeOrbit(s) {
    var brand=s.shell.querySelector(".nl-brand");
    var r=brand&&brand.getBoundingClientRect();
    var centerX=window.innerWidth/2;
    var centerY=window.innerHeight*.43;
    s.cursors.forEach(function(a,i){
      var angle=2*Math.PI*i/s.cursors.length;
      a.x=clamp(centerX+Math.cos(angle)*65,10,window.innerWidth-90);
      a.y=clamp(centerY+Math.sin(angle)*55,18,window.innerHeight-50);
      a.el.style.opacity="1";
      syncActor(a);
    });
    return [centerX,centerY];
  }
  async function introduction(s) {
    var scrim=make("div","nl-sw-scrim",s.overlay);
    var mark=make("div","nl-sw-intro-logo",scrim);
    mark.innerHTML='<span class="nl-sw-intro-mark">n</span><span>NEWRO / BUILDING YOUR NEXT STEP</span>';
    var orbit=placeOrbit(s);
    s.cursors.forEach(function(cursor,i) {
      move(cursor,clamp(orbit[0]+Math.cos((i+.55)*Math.PI*2/s.cursors.length)*Math.min(120,window.innerWidth*.31),6,window.innerWidth-95),
        clamp(orbit[1]+Math.sin((i+.55)*Math.PI*2/s.cursors.length)*Math.min(70,window.innerHeight*.14),6,window.innerHeight-50),265,s,i%2?15:-15);
    });
    await sleep(320,s);
    if(s.dead)return;
    scrim.classList.add("nl-sw-scrim-out");
    s.timers.push(setTimeout(function(){scrim.remove()},180));
  }
  function addControl(s) {
    var dock=make("div","nl-sw-controls");
    s.skip=dock;
    var count=make("span","nl-sw-count",dock);
    count.textContent="NEWRO / BUILDING";
    s.count=count;
    var soundButton=make("button","nl-sw-sound",dock);
    soundButton.type="button";soundButton.setAttribute("aria-label","Enable construction sound");
    soundButton.textContent="Sound off";
    soundButton.addEventListener("click",function(){
      if(!s.audio){
        try {s.audio=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}
      }
      s.soundOn=!s.soundOn;
      soundButton.textContent=s.soundOn?"Sound on":"Sound off";
      soundButton.setAttribute("aria-label",s.soundOn?"Mute construction sound":"Enable construction sound");
    });
    var skipButton=make("button","nl-sw-skip",dock);
    skipButton.textContent="Skip ↗";skipButton.type="button";
    skipButton.addEventListener("click",function(){clear(s);});
    document.body.appendChild(dock);
  }
  // Work is distributed across all cursors in parallel, not one cursor at a time.
  function pump(s) {
    if(s.dead||!s.introDone||s.finishing)return;
    s.queue.sort(function(a,b){return a.index-b.index;});
    while(s.queue.length && s.busy.size<s.cursors.length) {
      var task=s.queue.shift(), n=task.node;
      if(!n||!n.isConnected||s.done.has(n))continue;
      if(task.index>7&&!intoView(n)){s.queued.delete(n);continue;}
      var slot=-1;
      for(var i=0;i<s.cursors.length;i++)if(!s.busy.has(i)){slot=i;break;}
      if(slot<0)break;
      s.busy.add(slot);
      var actor=s.cursors[slot];
      actor.el.dataset.working="true";
      (async function(node,cursor,cursorIndex,index){
        try {
          var type=special[node.dataset.build]||"box";
          if(type==="type")await typingTask(node,cursor,s,index);
          else if(type==="duplicate")await duplicateTask(node,cursor,s,index);
          else await boxTask(node,cursor,s,index);
        } catch(e) {
          // Animation errors never block the actual UI.
          if(window.console)console.warn("NEWRO visual effect skipped",e);
        } finally {
          if(!s.dead){
            show(node);
            s.done.add(node);
            s.completed++;
            if(s.count)s.count.textContent="BUILDING "+Math.round(100*s.completed/s.nodes.length)+"%";
            var label=s.shell.querySelector("[data-build-progress]");
            if(label)label.textContent="ASSEMBLING "+Math.round(100*s.completed/s.nodes.length)+"%";
          }
          delete cursor.el.dataset.working;
          s.busy.delete(cursorIndex);
          pump(s);
        }
      })(n,actor,slot,task.index);
    }
    // Do not wait for off-screen sections before showing a usable page.
    if(!s.queue.length&&!s.busy.size&&!s.finishing)finale(s);
  }
  function queue(s,node){
    if(s.dead||s.finishing||s.done.has(node)||s.queued.has(node))return;
    s.queued.add(node);
    s.queue.push({node:node,index:s.nodes.indexOf(node)});
    pump(s);
  }
  async function finale(s) {
    if(s.finishing||s.dead)return;
    s.finishing=true;
    if(s.count)s.count.textContent="READY TO EXPLORE ✓";
    var center=s.shell.querySelector(".nl-bigcta");
    if(center && center.isConnected) {
      var r=center.getBoundingClientRect();
      s.cursors.forEach(function(a,i){
        var angle=2*Math.PI*i/s.cursors.length;
        move(a,clamp(r.left+r.width/2+Math.cos(angle)*65,8,window.innerWidth-90),
          clamp(r.top+r.height/2+Math.sin(angle)*48,8,window.innerHeight-42),235,s,i%2?7:-7);
      });
    }
    await sleep(420,s);
    if(!s.dead)clear(s);
  }
  function start(shell,replay){
    stop();
    if(!shell||!shell.isConnected)return;
    if(reduce()){
      shell.querySelectorAll("[data-build]").forEach(show);
      return;
    }
    var s={shell:shell,dead:false,introDone:false,timers:[],busy:new Set(),done:new Set(),
      queued:new Set(),queue:[],completed:0,cursors:[],overlay:null,skip:null,
      nodes:K.map(function(k){return shell.querySelector('[data-build="'+k+'"]');}).filter(Boolean),
      observer:null,soundOn:false,audio:null,finishing:false};
    current=s;
    s.nodes.forEach(function(n){n.classList.remove("nl-built");});
    shell.classList.add("nl-sw-running");
    s.overlay=make("div","nl-sw-overlay",document.body);
    s.overlay.setAttribute("aria-hidden","true");
    s.cursors=(window.innerWidth<=760?people.slice(0,3):people).map(function(_,i){return makeCursor(i,s);});
    addControl(s);
    s.observer=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting)queue(s,en.target);});
    },{root:null,rootMargin:"80px 0px 80px 0px",threshold:0.01});
    s.nodes.forEach(function(n){s.observer.observe(n);});
    introduction(s).then(function(){
      if(s.dead)return;
      s.introDone=true;
      // All cursors start constructing visible elements at the same time.
      s.nodes.forEach(function(n){if(intoView(n))queue(s,n);});
      pump(s);
    });
  }
  window.NEWROSwarm={start:start,stop:stop};
  document.addEventListener("visibilitychange",function(){if(document.hidden)stop();});
  window.addEventListener("pagehide",stop);
  window.addEventListener("resize",function(){if(current)stop();});
})();
