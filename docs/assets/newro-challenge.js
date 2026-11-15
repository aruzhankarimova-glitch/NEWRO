/* Playable mini-assignment, independent from the full career try-outs. */
(function(global){
 'use strict';
 var previews={
  marketing:{question:'Who would you target?',brief:'Harbor tracks subscription renewals. Which audience fits?',choices:[
   {id:'trials',label:'People managing free trials',fit:true,feedback:'Matches the brief: Harbor tracks upcoming renewals.'},
   {id:'stocks',label:'People analyzing stocks',fit:false,feedback:"Harbor doesn't analyze stocks. Try the other audience."}],action:'Try the marketing assignment →'},
  pm:{question:'It’s Wednesday. Two engineers, 24 hours. What ships Friday?',choices:[
   {id:'login',label:'Fix the iOS login crash · 4 h',hours:4,fit:true},
   {id:'reminders',label:'Renewal reminders · 8 h',hours:8,fit:true},
   {id:'household',label:'Shared household plans · 16 h',hours:16,fit:false}],action:'Try the PM simulation →'}
 };
 function totalHours(selected){return previews.pm.choices.reduce(function(sum,item){return sum+(selected.indexOf(item.id)!==-1?item.hours:0)},0)}
 function shareUrl(value){var url=new URL(value);url.search='';url.hash='careers';return url.toString()}
 function mount(shell){
  var quiz=shell.querySelector('.nm-quick-choices'),feedback=shell.querySelector('.nm-quick-feedback'),question=shell.querySelector('.cs-phone-title'),brief=shell.querySelector('.cs-phone-task'),next=shell.querySelector('.cs-phone-cta'),capacity=shell.querySelector('.nr-capacity-track');
  var switches=shell.querySelectorAll('[data-preview-role]');if(!quiz||!feedback||!question||!brief||!next)return;
  var role='pm',selected=['login','reminders'];
  function pmStatus(){
   var hours=totalHours(selected);brief.textContent=hours+' / 24 hours chosen';
   if(capacity){capacity.hidden=false;capacity.setAttribute('aria-valuenow',String(Math.min(hours,24)));capacity.setAttribute('aria-valuetext',hours+' of 24 hours chosen'+(hours>24?', over capacity':''));var fill=capacity.querySelector('span');if(fill)fill.style.width=Math.min(100,hours/24*100)+'%';capacity.classList.toggle('nr-over',hours>24);}
   feedback.hidden=false;feedback.dataset.result=hours>24?'try-again':'right';
   feedback.textContent=hours>24?'Practice coach: You are over the 24-hour budget. Which task could wait?':selected.indexOf('household')===-1&&selected.indexOf('login')!==-1&&selected.indexOf('reminders')!==-1?'Practice coach: You kept time for surprises. Can you explain why household plans wait two weeks?':'Practice coach: Consider customer impact, delivery risk and time before deciding what waits.';
  }
  function chooseRole(value){
   if(!previews[value])return;role=value;var item=previews[role];question.textContent=item.question;var stageLabel=shell.querySelector('.cs-stage-live'),stageBadge=shell.querySelector('.nr-friday-badge');if(stageLabel)stageLabel.textContent=role==='pm'?'SIMULATION · AI PRODUCT MANAGER':'SIMULATION · AI MARKETING SPECIALIST';if(stageBadge)stageBadge.textContent=role==='pm'?'Friday release':'Audience';quiz.setAttribute('aria-label',role==='pm'?'Try the product decision':'Try the marketing decision');
   switches.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.previewRole===role));});
   quiz.querySelectorAll('[data-quick-choice]').forEach(function(b,i){var choice=item.choices[i];b.hidden=!choice;if(!choice)return;b.textContent=choice.label;b.dataset.quickChoice=choice.id;var checked=role==='pm'&&selected.indexOf(choice.id)!==-1;b.setAttribute('aria-pressed',String(checked));b.classList.toggle('nm-selected',checked);});
   if(role==='pm')pmStatus();else{brief.textContent=item.brief;if(capacity)capacity.hidden=true;feedback.hidden=true;feedback.textContent='';}
   next.textContent=item.action;next.setAttribute('aria-label',item.action.replace(' →',''));
  }
  switches.forEach(function(b){b.addEventListener('click',function(){chooseRole(b.dataset.previewRole)})});
  quiz.addEventListener('click',function(e){var b=e.target.closest('[data-quick-choice]');if(!b||!quiz.contains(b))return;var choice=previews[role].choices.find(function(x){return x.id===b.dataset.quickChoice});if(!choice)return;
   if(role==='pm'){selected=selected.indexOf(choice.id)===-1?selected.concat([choice.id]):selected.filter(function(x){return x!==choice.id});b.setAttribute('aria-pressed',String(selected.indexOf(choice.id)!==-1));b.classList.toggle('nm-selected',selected.indexOf(choice.id)!==-1);pmStatus();}
   else{quiz.querySelectorAll('[data-quick-choice]').forEach(function(item){item.setAttribute('aria-pressed',String(item===b));item.classList.toggle('nm-selected',item===b)});feedback.textContent=choice.feedback;feedback.dataset.result=choice.fit?'right':'try-again';feedback.hidden=false;}
   if(global.NEWROMobile)global.NEWROMobile.pulse('choice');
  });
  next.onclick=function(){if(global.NEWRO)global.NEWRO.start(role)};chooseRole(role);
  var share=shell.querySelector('[data-share-challenge]'),status=shell.querySelector('[data-share-status]'),fallback=shell.querySelector('[data-share-fallback]'),input=shell.querySelector('[data-share-link]');if(!share||!status||!fallback||!input)return;
  share.addEventListener('click',async function(){var url=shareUrl(global.location.href);if(global.navigator.share){try{await global.navigator.share({title:'Try a career with NEWRO',text:'Would you rather try marketing or product? Pick a task on NEWRO.',url:url});return}catch(error){if(error&&error.name==='AbortError')return}}
   if(global.navigator.clipboard&&global.navigator.clipboard.writeText){try{await global.navigator.clipboard.writeText(url);status.textContent='Link copied. Send it to a friend.';return}catch(_){}}
   input.value=url;fallback.hidden=false;input.focus();input.select();status.textContent='Copy the selected link and send it to a friend.';
  });
 }
 var api={previews:previews,totalHours:totalHours,shareUrl:shareUrl,mount:mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;if(global)global.NEWROChallenge=api;
})(typeof window==='undefined'?globalThis:window);
