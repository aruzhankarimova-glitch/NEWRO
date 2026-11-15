/* Topic worksheets with local drafts and portfolio exports. */
(function(){'use strict';
var tasks={
'PM-M00':['List three decisions you already make in your work.','Choose one that could benefit from AI and one that should stay with a person. Explain why.','Name a skill you need to practice and a small task you can use to practice it.'],
'PM-M01':['Choose a user group for a subscription reminder app and describe one problem.','Write five interview questions about recent behavior. Do not invent interview answers.','Explain what evidence would make you change your problem statement.'],
'PM-M02':['Propose one AI feature for Harbor and describe its benefit.','Compare it with a simpler non-AI solution. Consider data, latency, cost and failure cases.','Choose an approach and name the evidence needed before building.'],
'PM-M03':['Write the user problem, scope and acceptance criteria for an AI subscription assistant.','Describe the normal flow, an error state and when the assistant must ask for approval.','Name two tasks the assistant must not perform and explain how to enforce that limit.'],
'PM-M04':['Sketch the screens and actions for the feature you specified.','Write a build brief with sample inputs, expected outputs and an error state.','Build a small prototype with your preferred tool, then record the link and what you tested.'],
'PM-M05':['Write five sample inputs, including two difficult or unsafe requests.','For each, describe an acceptable output and a clear failure condition.','Define a review rubric and decide what needs a person to check it.'],
'PM-M06':['Define a small launch audience and a rollout plan with a rollback trigger.','Estimate costs using explicit assumptions, and choose a useful success metric.','Write a case summary: problem, decision, evidence, result and remaining questions.'],
'MKT-M00':['List your current research, writing and reporting tasks.','Choose one task to support with AI and describe the inputs and human review.','Define a before-and-after measure, such as time spent or corrections needed.'],
'MKT-M01':['Choose a customer group for Harbor and list three research questions.','Create a research plan with sources you would consult and what each can show.','Separate what you know from assumptions. Do not invent quotes or findings.'],
'MKT-M02':['Describe the audience, product facts, tone and claims you can support.','Write two message variations and a short instruction brief for an AI assistant.','List forbidden claims and a checklist for reviewing every draft.'],
'MKT-M03':['Choose one campaign goal and two channels for the same audience.','Write a message and call to action for each channel, adapting the format.','Define the test budget, duration and the outcome that will guide your next decision.'],
'MKT-M04':['Choose a customer question and create an article outline that answers it directly.','List the sources and product facts needed to support the answer.','Describe how you would check accuracy, readability and search visibility.'],
'MKT-M05':['Map a lead from a form submission to a CRM record and follow-up task.','Specify the fields, consent checks, duplicates and error handling.','Write a reporting plan that names the data source and checks for missing records.'],
'MKT-M06':['Combine your audience, message and channel decisions into one campaign brief.','Define costs, conversion metrics and a stopping or adjustment rule.','Write the final case with evidence. Label any untested figures as assumptions.']
};
function escape(v){return String(v||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function show(role,index){
 var track=window.NEWROCurriculum&&window.NEWROCurriculum.tracks[role],m=track&&track.modules[index];if(!m||!window.NEWROFlow)return;
 var key='newro-practice-'+m[0],draft='';try{draft=localStorage.getItem(key)||''}catch(e){}
 var body='<section class="nf-whitecard nr-practice"><span class="nf-label">'+escape(track.title)+' / EXERCISE '+(index+1)+'</span><h2>'+escape(m[1])+'</h2><p>'+escape(m[2])+'</p><div class="panel"><h3>Your task</h3><ol>'+tasks[m[0]].map(function(x){return '<li>'+escape(x)+'</li>'}).join('')+'</ol></div><p><b>Work sample:</b> '+escape(m[3])+'</p><label class="field" for="nr-practice-answer">Your response</label><textarea id="nr-practice-answer" class="nf-answer" rows="10" maxlength="5000">'+escape(draft)+'</textarea><p id="nr-practice-status" role="status" class="nf-small">Drafts are saved on this device.</p><div class="nf-mentorbox"><div><b>Review your work</b><p>'+escape(m[4])+'</p></div></div><p id="nr-practice-review" role="status"></p><div class="nf-actions"><button type="button" class="nf-btn nf-secondary" id="nr-practice-check">Review draft</button><button type="button" class="nf-btn nf-primary" id="nr-practice-save">Save work sample</button><button type="button" class="nf-linkbtn" data-flow-go="paths">Back to topics</button></div></section>';
 window.NEWROFlow.layout(m[1],'Read the task, write your response and keep your work.',body,'paths');
 var input=document.getElementById('nr-practice-answer'),status=document.getElementById('nr-practice-status'),review=document.getElementById('nr-practice-review');
 input.addEventListener('input',function(){try{localStorage.setItem(key,input.value);status.textContent='Draft saved on this device.'}catch(e){status.textContent='This browser could not save the draft. Copy your response before leaving.'}});
 document.getElementById('nr-practice-check').onclick=function(){review.textContent=input.value.trim().length<100?'Add more detail. Address each of the three task prompts.':'Review each task prompt, check your assumptions and use the criterion above before saving.'};
 document.getElementById('nr-practice-save').onclick=function(){if(input.value.trim().length<100){review.textContent='Write at least 100 characters before saving.';input.focus();return}var id=window.NEWROFlow.savePractice(role,m,input.value);if(id)window.NEWROFlow.goto('sample',id)};
}
function route(){var match=location.hash.match(/^#\/practice\/(pm|marketing)\/(\d+)$/);if(match)show(match[1],Number(match[2]))}
document.addEventListener('click',function(e){var b=e.target.closest('[data-practice-role]');if(!b)return;e.preventDefault();var hash='#/practice/'+b.dataset.practiceRole+'/'+b.dataset.practiceIndex;if(location.hash===hash)route();else location.hash=hash});
window.addEventListener('hashchange',route);window.addEventListener('DOMContentLoaded',route);
})();
