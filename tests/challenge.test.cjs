const test=require('node:test');
const assert=require('node:assert/strict');
const challenge=require('../assets/newro-challenge.js');

test('both role previews have distinct, contextual choices and feedback',()=>{
  for(const role of ['marketing','pm']){
    const item=challenge.previews[role];
    assert.equal(item.choices.length,2);
    assert.equal(item.choices.filter(x=>x.fit).length,1);
    for(const choice of item.choices) assert.ok(choice.label && choice.feedback);
  }
  assert.notEqual(challenge.previews.pm.question,challenge.previews.marketing.question);
});

test('sharing links to career selection without carrying personal query data',()=>{
  assert.equal(challenge.shareUrl('https://example.com/NEWRO/?name=private#/profile'),'https://example.com/NEWRO/#careers');
});

test('role switching resets the decision and opens the selected assignment',()=>{
  const handlers=new Map();
  function element(dataset={}) { return {dataset,attrs:{},textContent:'',hidden:false,classList:{toggle(){},remove(){}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,fn){handlers.set(this,fn)}}; }
  const opts=[element({quickChoice:'0'}),element({quickChoice:'1'})];
  const switches=[element({previewRole:'marketing'}),element({previewRole:'pm'})];
  const quiz=element();quiz.querySelectorAll=()=>opts;quiz.contains=b=>opts.includes(b);
  const feedback=element(),question=element(),brief=element(),next=element();
  const map={'.nm-quick-choices':quiz,'.nm-quick-feedback':feedback,'.cs-phone-title':question,'.cs-phone-task':brief,'.cs-phone-cta':next};
  const shell={querySelector:s=>map[s]||null,querySelectorAll:()=>switches};
  challenge.mount(shell);
  assert.match(question.textContent,/ship first/);
  handlers.get(switches[1])();
  assert.match(question.textContent,/ship first/);
  assert.equal(switches[1].attrs['aria-pressed'],'true');
  const target={closest:()=>opts[0]}; handlers.get(quiz)({target});
  assert.match(feedback.textContent,/people need access/);
  assert.equal(feedback.hidden,false);
  handlers.get(switches[0])();
  assert.equal(feedback.hidden,true);
  assert.equal(opts[0].attrs['aria-pressed'],'false');
  let started;global.NEWRO={start:r=>started=r};
  handlers.get(switches[1])();next.onclick();
  assert.equal(started,'pm');delete global.NEWRO;
});

test('share falls back to a selectable clean link when sharing is unavailable',async()=>{
  const events=new Map();
  function el(dataset={}){return {dataset,hidden:true,textContent:'',value:'',classList:{remove(){},toggle(){}},setAttribute(){},addEventListener(k,fn){events.set(this,fn)}}}
  const choices=[el(),el()], roles=[el({previewRole:'marketing'}),el({previewRole:'pm'})], quiz=el();quiz.querySelectorAll=()=>choices;
  const share=el(),status=el(),fallback=el(),input=el();input.focus=()=>{};input.select=()=>{input.selected=true};
  const map={'.nm-quick-choices':quiz,'.nm-quick-feedback':el(),'.cs-phone-title':el(),'.cs-phone-task':el(),'.cs-phone-cta':el(),'[data-share-challenge]':share,'[data-share-status]':status,'[data-share-fallback]':fallback,'[data-share-link]':input};
  global.location={href:'https://example.com/NEWRO/?private=value#/profile'};
  challenge.mount({querySelector:s=>map[s],querySelectorAll:()=>roles});
  await events.get(share)();
  assert.equal(input.value,'https://example.com/NEWRO/#careers');
  assert.equal(fallback.hidden,false);assert.equal(input.selected,true);
  assert.match(status.textContent,/Copy/);
  delete global.location;
});

test('reference landing retains working career links and honest product availability',()=>{
  const fs=require('node:fs');
  const source=fs.readFileSync('assets/newro-landing-reference.js','utf8');
  for(const phrase of ['WHY TRY NEWRO','Frequently asked questions','planned','data-flow-go']) assert.ok(source.includes(phrase),phrase);
  assert.ok(!source.includes('Someone using AI will'));
});
