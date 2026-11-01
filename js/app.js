const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let idx=0,sel=-1,timer=null,hl=-1;
const mode=()=>document.body.dataset.mode;
const tbl=(h,r)=>`<div class="tw"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(a=>`<tr>${a.map((v,i)=>i?`<td>${v}</td>`:`<th>${v}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const chip=c=>`<span class="chip" style="background:${COL[c]}"></span>`;
function paint(){
 $$('#viz .stack').forEach(st=>{const m=MODELS[+st.dataset.m];st.querySelectorAll('.ly').forEach(ly=>{const i=+ly.dataset.i,c=idx===1?'c':m.codes[i];ly.querySelector('rect').style.fill=COL[c];ly.classList.toggle('dk','cgT'.includes(c));ly.querySelector('.lo').textContent=idx===1?'You':owner(m,i)})});
 $$('#viz .ly').forEach(l=>l.classList.toggle('sel',+l.dataset.i===sel))}
function showLayer(){
 const el=$('#layerInfo');
 if(sel<0){el.innerHTML='<h3>Layer explorer</h3><p>Click any layer in the diagram to see who manages it.</p>';return}
 const L=LAYERS[sel];
 el.innerHTML=`<h3>${sel+1}. ${L[0]}</h3><p>${mode()==='beginner'?`${L[1]} <em>Analogy: ${L[3]}.</em>`:L[2]}</p><ul class="own">${MODELS.map(m=>`<li>${chip(m.codes[sel])}<b>${m.n}</b>: ${owner(m,sel)} manages it</li>`).join('')}</ul>`}
function showModel(k){
 const m=MODELS[k],nm=o=>LAYERS.filter((_,i)=>owner(m,i)===o).map(l=>l[0]).join(', ');
 $('#models').innerHTML=`<h3>Explore the models</h3><div class="tabs" role="tablist">${MODELS.map((x,i)=>`<button role="tab" aria-selected="${i===k}" data-k="${i}">${x.n}</button>`).join('')}</div><h4>${m.n}: ${m.f}</h4><p>${m.story}</p><dl><dt>Provider manages</dt><dd>${nm('Provider')}</dd><dt>You manage</dt><dd>${nm('You')}${m.k==='saas'?', plus account security, permissions and settings':''}</dd><dt>Advantages</dt><dd>${m.pros}</dd><dt>Limitations</dt><dd>${m.cons}</dd><dt>Business use cases</dt><dd>${m.use}</dd><dt>Examples</dt><dd>${m.ex}</dd></dl>`}
function go(i){
 idx=i;const s=STEPS[i];
 $$('#nav button').forEach((b,j)=>{b.classList.toggle('done',j<i);b.classList.toggle('cur',j===i);j===i?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current')});
 $('#prog i').style.width=(i+1)/9*100+'%';$('#progTxt').textContent=`Step ${i+1} of 9`;$('#prog').setAttribute('aria-valuenow',i+1);
 $('#cT').textContent=`${i+1}. ${s.t}`;$('#cP').textContent=s.plain;$('#cX').textContent=s.tech;$('#cW').textContent=s.watch;$('#cap').textContent=s.cap;
 $$('.rv').forEach(e=>e.classList.toggle('on',i>=+e.dataset.s||(e.classList.contains('stack')&&i===1)));
 paint();if(i>=2&&i<=4)showModel(i-2);Anim.set(i)}
function play(){clearInterval(timer);timer=setInterval(()=>idx<8?go(idx+1):stop(),5000);$('#play').setAttribute('aria-pressed','true')}
function stop(){clearInterval(timer);timer=null;$('#play').setAttribute('aria-pressed','false')}
function pick(i){sel=i;paint();showLayer()}
function init(){
 let t;try{t=localStorage.getItem('csmv-theme')}catch(e){}
 document.documentElement.dataset.theme=t||(mm('(prefers-color-scheme: dark)')?'dark':'light');
 $('#vizwrap').innerHTML=buildSVG();Anim.init($('#viz'));
 $('#nav').innerHTML=STEPS.map((s,i)=>`<button data-i="${i}"><b>${i+1}</b><span><strong>${s.t}</strong><small>${s.sub}</small></span></button>`).join('');
 $('#matrix').innerHTML='<h3>Architecture summary: 3 models × 9 layers</h3>'+tbl(['Layer',...MODELS.map(m=>m.n)],LAYERS.map((l,i)=>[`${i+1}. ${l[0]}`,...MODELS.map(m=>chip(m.codes[i])+owner(m,i))]))+'<p>Customers always own their data and access control.</p>';
 $('#examples').innerHTML='<h3>Real-world examples</h3>'+tbl(['Cloud',...MODELS.map(m=>m.n)],CLOUDS);
 $('#compare').innerHTML='<h3>Compare the models</h3><div class="tabs">'+['All',...MODELS.map(m=>m.n)].map((n,i)=>`<button data-h="${i-1}" aria-pressed="${i===0}">${n}</button>`).join('')+'</div>'+tbl(['',...MODELS.map(m=>m.n)],CMP);
 $('#tools').innerHTML=`<h3>Scenario simulator</h3><label for="sc">Ravi's situation: </label><select id="sc"><option value="-1">Choose a scenario</option>${SCEN.map((s,i)=>`<option value="${i}">${s[0]}</option>`).join('')}</select><p id="scOut" aria-live="polite"></p><h3>Glossary</h3><input id="gq" type="search" placeholder="Search terms" aria-label="Search glossary"><dl id="gl"></dl>`;
 const gl=q=>$('#gl').innerHTML=GLOSS.filter(g=>(g[0]+g[1]).toLowerCase().includes(q.toLowerCase())).map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join('')||'<dd>No match. Try another word.</dd>';gl('');
 $('#gq').oninput=e=>gl(e.target.value);
 $('#sc').onchange=e=>{const s=SCEN[+e.target.value];$('#scOut').innerHTML=s?`Best fit: <b>${s[1]}</b>. ${s[2]}`:'';if(s)showModel(MODELS.findIndex(m=>m.n===s[1]))};
 Quiz.mount($('#quizBox'));showLayer();
 $('#nav').onclick=e=>{const b=e.target.closest('button');if(b){go(+b.dataset.i);if(timer)play()}};
 $('#play').onclick=()=>{if(idx>=8)go(0);play()};$('#pause').onclick=stop;
 $('#reset').onclick=()=>{stop();Quiz.reset();sel=-1;showLayer();go(0)};
 $('#models').onclick=e=>{const b=e.target.closest('[data-k]');if(b)showModel(+b.dataset.k)};
 $('#compare').onclick=e=>{const b=e.target.closest('[data-h]');if(!b)return;hl=+b.dataset.h;$$('#compare [data-h]').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('#compare tr').forEach(r=>[...r.cells].forEach((c,j)=>c.classList.toggle('dim',hl>=0&&j>0&&j-1!==hl)))};
 $('#vizwrap').addEventListener('click',e=>{const l=e.target.closest('.ly');if(l)pick(+l.dataset.i)});
 $('#vizwrap').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const l=e.target.closest('.ly');if(l){e.preventDefault();pick(+l.dataset.i)}}});
 $('#modeBtn').onclick=()=>{const tech=mode()==='beginner';document.body.dataset.mode=tech?'technical':'beginner';$('#modeBtn').textContent='Mode: '+(tech?'Technical':'Beginner');$('#modeBtn').setAttribute('aria-pressed',tech);showLayer()};
 $('#themeBtn').onclick=()=>{const d=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=d;try{localStorage.setItem('csmv-theme',d)}catch(e){}};
 go(0)}
init();
