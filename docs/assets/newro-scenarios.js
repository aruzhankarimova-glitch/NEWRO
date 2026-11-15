/* NEWRO original inline vector scenes: fictional product-team and advertising practice. */
(function(){
"use strict";
var ads={
 product:{name:"Product-first",format:"Square static ad",note:"Product interface and next renewal dates",short:"Product UI"},
 lifestyle:{name:"Everyday moment",format:"Lifestyle concept",note:"A relatable moment with a clear benefit",short:"Lifestyle"},
 story:{name:"Creator-style story",format:"Vertical storyboard",note:"A social-first hook designed for a mobile feed",short:"UGC storyboard"}
};
function e(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function human(x,y,color,hair){
 return '<g transform="translate('+x+' '+y+')"><ellipse cx="43" cy="125" rx="47" ry="9" fill="#474092" opacity=".12"/>'+
 '<path d="M22 80 Q12 99 15 122 L36 122 42 99 49 122 70 122 Q69 94 61 80Z" fill="#28274c"/>'+
 '<path d="M15 58 Q28 41 54 52 Q76 55 73 91 L10 91 Q8 67 15 58Z" fill="'+color+'"/>'+
 '<path d="M17 68 L5 91 12 98 31 78 M66 66 L85 80 81 91 60 79" stroke="'+color+'" stroke-width="13" stroke-linecap="round" fill="none"/>'+
 '<circle cx="43" cy="30" r="22" fill="#f3bc95"/><path d="M22 28 Q18 4 39 4 Q61 3 64 27 Q49 23 39 14 Q34 27 22 28Z" fill="'+(hair||"#302952")+'"/>'+
 '<circle cx="36" cy="33" r="2" fill="#332640"/><circle cx="50" cy="33" r="2" fill="#332640"/><path d="M39 42 Q44 45 49 41" stroke="#b97164" stroke-width="2" fill="none" stroke-linecap="round"/></g>';
}
function sceneArt(kind){
 var common='<rect width="760" height="240" rx="22" fill="#eeeafd"/><circle cx="685" cy="-9" r="130" fill="#d4cafb"/>'+
 '<circle cx="60" cy="220" r="94" fill="#d8f4e2"/><path d="M0 200 H760" stroke="#d9d1ee" stroke-width="2"/>'+
 '<g opacity=".24" fill="#6a5dca"><circle cx="44" cy="43" r="3"/><circle cx="60" cy="43" r="3"/><circle cx="76" cy="43" r="3"/></g>';
 var board='';
 if(kind==="discovery"){board='<rect x="236" y="26" width="318" height="178" rx="16" fill="#fff" stroke="#d2cbed" stroke-width="2"/>'+
 '<rect x="255" y="43" width="120" height="21" rx="7" fill="#e8e4fe"/><text x="268" y="57" font-size="11" font-weight="800" fill="#6151c8">CUSTOMER SIGNALS</text>'+
 '<rect x="255" y="79" width="82" height="45" rx="9" fill="#fff0b8"/><path d="M269 95h52M269 106h38" stroke="#b38a23" stroke-width="4" stroke-linecap="round"/>'+
 '<rect x="348" y="79" width="84" height="45" rx="9" fill="#e6f6ed"/><path d="M362 95h55M362 106h38" stroke="#68a983" stroke-width="4" stroke-linecap="round"/>'+
 '<rect x="445" y="79" width="88" height="45" rx="9" fill="#f3e8ff"/><path d="M458 95h58M458 106h42" stroke="#aa85c7" stroke-width="4" stroke-linecap="round"/>'+
 '<path d="M273 151 H516" stroke="#e5e3ec" stroke-width="4" stroke-linecap="round"/>'+
 '<circle cx="296" cy="166" r="9" fill="#22bb75"/><path d="m291 166 4 4 7-9" stroke="white" stroke-width="2.5" fill="none"/>'+
 '<text x="315" y="170" font-size="12" font-weight="750" fill="#403a61">Which problem matters first?</text>';
 }else if(kind==="build"){board='<rect x="235" y="24" width="324" height="183" rx="16" fill="#fff" stroke="#d2cbed" stroke-width="2"/>'+
 '<text x="255" y="49" font-size="12" font-weight="800" fill="#5e51ba">SPRINT BOARD</text>'+
 '<rect x="255" y="61" width="88" height="118" rx="9" fill="#f4f1ff"/><rect x="353" y="61" width="88" height="118" rx="9" fill="#f1f7fd"/><rect x="451" y="61" width="88" height="118" rx="9" fill="#effaf1"/>'+
 '<text x="269" y="79" font-size="10" font-weight="800" fill="#777096">BACKLOG</text>'+
 '<text x="370" y="79" font-size="10" font-weight="800" fill="#6781ad">IN PROGRESS</text>'+
 '<text x="472" y="79" font-size="10" font-weight="800" fill="#4a9d72">QA / READY</text>'+
 '<rect x="265" y="91" width="68" height="37" rx="7" fill="#fff" stroke="#ded9f0"/><path d="M274 102h40M274 111h30" stroke="#b4a8df" stroke-width="4" stroke-linecap="round"/>'+
 '<rect x="363" y="91" width="68" height="57" rx="7" fill="#fff" stroke="#dde6f5"/><rect x="370" y="100" width="19" height="19" rx="6" fill="#7163dc"/><path d="M395 104h27M395 113h19M372 128h49" stroke="#b6b8d4" stroke-width="3" stroke-linecap="round"/>'+
 '<rect x="461" y="91" width="68" height="37" rx="7" fill="#fff" stroke="#dcebdc"/><circle cx="473" cy="109" r="7" fill="#26bf7a"/><path d="m469 109 3 3 5-6" stroke="#fff" stroke-width="2" fill="none"/><path d="M486 104h31M486 113h23" stroke="#aecfc0" stroke-width="3" stroke-linecap="round"/>';
 }else{board='<rect x="236" y="24" width="320" height="183" rx="16" fill="#fff" stroke="#d2cbed" stroke-width="2"/>'+
 '<text x="255" y="50" font-size="12" font-weight="850" fill="#6254b9">FRIDAY RELEASE / QA</text>'+
 '<rect x="255" y="67" width="173" height="112" rx="11" fill="#f6f5ff"/>'+
 '<path d="M273 154 L298 135 319 143 343 104 365 116 399 86" fill="none" stroke="#7263dc" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<path d="M272 88H407M272 115H407M272 142H407" stroke="#dfdceb" stroke-dasharray="4 6"/>'+
 '<rect x="440" y="68" width="97" height="112" rx="11" fill="#ecf8f0"/>'+
 '<circle cx="460" cy="91" r="8" fill="#20af6c"/><path d="m456 91 3 3 6-7" stroke="white" stroke-width="2" fill="none"/>'+
 '<path d="M477 90h40M454 116h65M454 134h52M454 152h59" stroke="#9bc9ae" stroke-width="5" stroke-linecap="round"/>';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 240" aria-hidden="true" focusable="false">'+common+
 '<rect x="116" y="168" width="525" height="12" rx="6" fill="#a39bd7"/><rect x="140" y="175" width="16" height="53" rx="6" fill="#8b84bd"/><rect x="610" y="175" width="16" height="53" rx="6" fill="#8b84bd"/>'+
 board+human(96,83,"#705df0","#3c3167")+human(570,83,"#20bd85","#584167")+
 '<g transform="translate(25 112)"><rect width="86" height="54" rx="10" fill="#fff" stroke="#c6bde5"/><path d="M14 15h47M14 27h56M14 39h35" stroke="#bbb3d8" stroke-width="5" stroke-linecap="round"/></g>'+
 '<g transform="translate(657 115)"><rect width="64" height="49" rx="11" fill="#fff" stroke="#c6bde5"/><rect x="14" y="12" width="35" height="24" rx="6" fill="#dff8eb"/><path d="m22 24 6 6 13-14" stroke="#23af75" stroke-width="3" fill="none"/></g>'+
 '</svg>';
}
function productScene(step){
 var kind=step<=1?"discovery":step===2?"build":"release";
 var captions={
 discovery:["DISCOVERY / TEAM HUDDLE","Your designer, engineer and support lead review customer signals before deciding what matters."],
 build:["SPRINT ROOM / FEATURE IN PROGRESS","The team is working through the backlog. You own the scope of Friday's release."],
 release:["RELEASE ROOM / QUALITY CHECK","The team reviews risk, customer impact and what can actually ship."]
 };
 var v=captions[kind];
 return '<figure class="nr-product-scene" aria-label="'+e(v[1])+'"><div class="nr-product-scene-art">'+sceneArt(kind)+'</div><figcaption><b>'+e(v[0])+'</b><span>'+e(v[1])+'</span></figcaption></figure>';
}
function adArt(kind){
 var root='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 235" aria-hidden="true" focusable="false">';
 if(kind==="product")return root+'<rect width="360" height="235" rx="15" fill="#ded7ff"/><circle cx="325" cy="22" r="82" fill="#b8acfc"/>'+
 '<rect x="25" y="26" width="156" height="183" rx="14" fill="#6753d8"/><text x="42" y="51" font-size="13" fill="#fff" font-weight="800">harbor.</text>'+
 '<text x="42" y="82" font-size="19" fill="#fff" font-weight="850">Know what</text><text x="42" y="105" font-size="19" fill="#fff" font-weight="850">renews next.</text>'+
 '<rect x="42" y="126" width="108" height="24" rx="12" fill="#cdf4d5"/><text x="58" y="143" font-size="10" font-weight="850" fill="#226d45">See dates →</text>'+
 '<rect x="201" y="17" width="137" height="207" rx="22" fill="#272044"/><rect x="207" y="24" width="125" height="191" rx="17" fill="#fff"/>'+
 '<rect x="244" y="31" width="50" height="7" rx="4" fill="#292345"/><text x="221" y="65" font-size="14" font-weight="850" fill="#5143bc">Upcoming</text>'+
 '<rect x="219" y="80" width="101" height="37" rx="9" fill="#f0edff"/><circle cx="231" cy="98" r="7" fill="#745cf0"/><text x="244" y="94" font-size="10" fill="#302e54">Music plan</text><text x="244" y="107" font-size="9" fill="#847e97">Nov 24</text>'+
 '<rect x="219" y="124" width="101" height="37" rx="9" fill="#eff9f3"/><circle cx="231" cy="142" r="7" fill="#26ba80"/><text x="244" y="138" font-size="10" fill="#302e54">Cloud plan</text><text x="244" y="150" font-size="9" fill="#847e97">Nov 28</text>'+
 '<path d="M219 177h102M219 187h77" stroke="#d5d4e7" stroke-width="5" stroke-linecap="round"/></svg>';
 if(kind==="lifestyle")return root+'<rect width="360" height="235" rx="15" fill="#ffe3ae"/><circle cx="302" cy="50" r="95" fill="#ffd07b"/>'+
 '<rect x="16" y="19" width="199" height="69" rx="14" fill="#fff8e8"/><text x="31" y="45" font-size="15" font-weight="900" fill="#433554">Trial ends</text><text x="31" y="66" font-size="19" font-weight="900" fill="#433554">this Friday?</text>'+
 '<ellipse cx="188" cy="219" rx="134" ry="10" fill="#b17d4f" opacity=".19"/>'+
 '<path d="M115 190L91 233M170 190l24 43" stroke="#806180" stroke-width="13" stroke-linecap="round"/>'+
 '<path d="M111 146q40-27 69 10l6 49-92 0z" fill="#6850d0"/><circle cx="146" cy="121" r="28" fill="#f4b88f"/>'+
 '<path d="M119 117q2-45 38-31 17 5 17 25l-17-9q-21 20-38 15z" fill="#433553"/>'+
 '<rect x="176" y="164" width="100" height="11" rx="5" fill="#9b7793"/><path d="M231 175v52M192 175l-12 52" stroke="#94718c" stroke-width="8"/>'+
 '<path d="M199 106h107q13 0 13 13v58h-132v-58q0-13 12-13z" fill="#fff"/>'+
 '<rect x="201" y="121" width="104" height="40" rx="7" fill="#e8e3ff"/><text x="208" y="137" font-size="12" fill="#6c56d3" font-weight="900">HARBOR</text><text x="208" y="152" font-size="10" fill="#635b80">Check dates</text>'+
 '<rect x="232" y="24" width="107" height="37" rx="15" fill="#4939a1"/><text x="246" y="47" font-size="11" font-weight="800" fill="#fff">Stay informed</text></svg>';
 return root+'<rect width="360" height="235" rx="15" fill="#f5cced"/><path d="M-5 162 206-32 391 170 147 268Z" fill="#e6a8d6"/>'+
 '<rect x="32" y="13" width="133" height="210" rx="23" fill="#362747"/><rect x="38" y="20" width="121" height="197" rx="18" fill="#fff4fb"/>'+
 '<rect x="49" y="35" width="99" height="126" rx="13" fill="#f9d4df"/><circle cx="98" cy="80" r="27" fill="#f1b18b"/>'+
 '<path d="M74 70q-1-25 22-24 23 0 28 23l-19-7-15 17z" fill="#392749"/>'+
 '<path d="M54 143q15-37 43-33 33 1 46 33z" fill="#6850dc"/>'+
 '<rect x="52" y="169" width="93" height="27" rx="11" fill="#eae4ff"/><text x="62" y="186" font-size="10" font-weight="900" fill="#5e4ccb">harbor.</text>'+
 '<rect x="185" y="30" width="155" height="61" rx="13" fill="#392847"/><text x="198" y="54" font-size="14" fill="#fff" font-weight="850">POV: your trial</text><text x="198" y="76" font-size="17" fill="#fff" font-weight="850">ends tomorrow.</text>'+
 '<rect x="185" y="105" width="154" height="102" rx="13" fill="#fff"/><text x="199" y="126" font-size="11" font-weight="850" fill="#6851cc">STORY SEQUENCE</text>'+
 '<circle cx="208" cy="148" r="11" fill="#eac6f1"/><text x="229" y="152" font-size="11" font-weight="750" fill="#392e50">The problem</text>'+
 '<circle cx="208" cy="179" r="11" fill="#c5f0dc"/><text x="229" y="184" font-size="11" font-weight="750" fill="#392e50">Show renewal list</text></svg>';
}
function creativePicker(chosen){
 var items=[
 ["product","A","Show the product"],["lifestyle","B","Show the moment"],["story","C","Tell a short story"]
 ];
 return '<section class="nr-creative-picker" aria-labelledby="nr-creative-title">'+
 '<div class="nr-creative-heading"><span class="nr-creative-overline">CREATIVE STUDIO / 03 OPTIONS</span><h2 id="nr-creative-title">Choose an ad creative</h2><p>Your job is to select the visual direction you would test first for Harbor. All three are original fictional concepts, not measured advertisements.</p></div>'+
 '<div class="nr-ad-grid" role="group" aria-label="Select one advertising concept">'+items.map(function(item){
 var x=ads[item[0]],active=chosen===item[0];
 return '<button type="button" class="nr-ad-card '+(active?'is-selected':'')+'" data-choice-group="creative" data-choice-id="'+item[0]+'" aria-pressed="'+active+'" onclick="NEWRO.choose(\'creative\',\''+item[0]+'\')">'+
 '<div class="nr-ad-art">'+adArt(item[0])+'</div><div class="nr-ad-copy"><span class="nr-ad-index">OPTION '+item[1]+' · '+e(x.format)+'</span><strong>'+e(item[2])+'</strong><small>'+e(x.note)+'</small>'+
 '<span class="nr-ad-select">'+(active?'✓ Selected':'Select concept ↗')+'</span></div></button>';
 }).join('')+'</div><p class="nr-ad-scrollhint">← Swipe to compare all three concepts →</p>'+
 '<p class="nr-ad-tip" role="status">'+(chosen?"Selected: "+e(ads[chosen]?.name||"")+". Explain your choice in the next step.":"Choose one visual direction to continue. There is no single guaranteed winning creative.")+'</p></section>';
}
function simulatedReview(selected){
 var rows=[
 {id:"product",label:"A · Product-first",ctr:"1.8%",signups:22,bar:61},
 {id:"lifestyle",label:"B · Everyday moment",ctr:"2.6%",signups:18,bar:50},
 {id:"story",label:"C · Creator-style story",ctr:"2.4%",signups:36,bar:100}
 ];
 return '<section class="nr-test-results"><div class="nr-creative-heading"><span class="nr-creative-overline">LAB NOTES / FICTIONAL EXAMPLE</span><h2>What if the first test looked like this?</h2><p>Illustrative results for equal 10,000-impression tests. CTR is clicks ÷ impressions; signups count completed registrations. These figures were invented for learning and do not predict performance.</p></div>'+
 '<div class="nr-test-table" role="table" aria-label="Fictional creative performance comparison">'+
 '<div class="nr-test-row nr-test-head" role="row"><span role="columnheader">Creative</span><span role="columnheader">CTR</span><span role="columnheader">Signups</span></div>'+
 rows.map(function(x){return '<div class="nr-test-row '+(selected===x.id?'is-picked':'')+'" role="row"><span role="cell">'+e(x.label)+(selected===x.id?'<b class="nr-picked-tag">YOUR PICK</b>':'')+'</span><span role="cell">'+x.ctr+'</span><span role="cell"><strong>'+x.signups+'</strong><i class="nr-test-bar"><i style="width:'+x.bar+'%"></i></i></span></div>'}).join('')+'</div>'+
 '<p class="nr-test-explain">The highest click-through rate did not produce the most signups in this invented example. Which concept would you test next, and what would you investigate?</p></section>';
}
window.NEWROScenes={product:productScene,creativePicker:creativePicker,simulatedReview:simulatedReview,creativeName:function(id){return ads[id]?ads[id].name:"Not selected"}};
})();