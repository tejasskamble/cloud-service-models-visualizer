const QUIZ=[
{q:'Which model lets the customer control the operating system?',o:['SaaS','PaaS','IaaS','None of them'],a:2,e:'In IaaS you rent virtual machines and manage the OS yourself.'},
{q:'Ravi wants to upload code and never touch servers. Which fits best?',o:['IaaS','PaaS','On-premises','Colocation'],a:1,e:'PaaS manages the OS and runtime; you bring code and data.'},
{q:'Who patches the operating system in PaaS?',o:['The customer','The cloud provider','The end user','Nobody'],a:1,e:'In PaaS the provider manages everything up to the runtime.'},
{q:'Which is a SaaS example?',o:['Amazon EC2','Google App Engine','Gmail','Azure Virtual Machines'],a:2,e:'Gmail is a finished app used through a browser.'},
{q:'In SaaS, what does the customer still manage?',o:['Servers','Virtualization','Runtime','Data, access and settings'],a:3,e:'Customers keep responsibility for data, accounts, permissions and configuration.'}];
const Quiz={
 mount(el){this.el=el;el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-o'))this.pick(+b.dataset.o);else if(b.hasAttribute('data-n')){this.i++;this.draw()}else if(b.hasAttribute('data-r'))this.reset()});this.reset()},
 reset(){this.i=0;this.s=0;this.draw()},
 pick(n){if(this.done)return;this.done=true;const q=QUIZ[this.i],ok=n===q.a;if(ok)this.s++;
  this.el.querySelectorAll('[data-o]').forEach((b,j)=>{b.disabled=true;b.classList.toggle('ok',j===q.a);b.classList.toggle('bad',j===n&&!ok)});
  this.el.querySelector('.fb').innerHTML=`<b>${ok?'Correct.':'Not quite.'}</b> ${q.e} <button data-n class="btn">${this.i<QUIZ.length-1?'Next question':'See score'}</button>`;
  this.el.querySelector('.sc').textContent=`Score: ${this.s}`},
 draw(){this.done=false;const el=this.el;
  if(this.i>=QUIZ.length){el.innerHTML=`<h3>Quiz complete</h3><p class="big">${this.s} / ${QUIZ.length}</p><p>${this.s>=4?'Cloud pro!':this.s>=2?'Good start. Review the steps and try again.':'Replay the steps, then try again.'}</p><button data-r class="btn">Restart quiz</button>`;return}
  const q=QUIZ[this.i];
  el.innerHTML=`<h3>Knowledge quiz: question ${this.i+1} of ${QUIZ.length} · <span class="sc">Score: ${this.s}</span></h3><p><b>${q.q}</b></p><div class="opts">${q.o.map((t,j)=>`<button data-o="${j}">${t}</button>`).join('')}</div><p class="fb" aria-live="polite"></p>`}
};
