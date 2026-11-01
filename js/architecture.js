/* Layer and model data plus the main SVG builder. */
const LAYERS=[
['Networking','The roads connecting everything.','Virtual networks, subnets, firewalls and load balancers.','Roads'],
['Storage','The warehouse for files and data.','Block, file and object storage.','Warehouse'],
['Servers','The computers doing the work.','Physical hosts in provider data centres.','Computers'],
['Virtualization','One big computer split into many.','A hypervisor creates isolated virtual machines.','Flats in one building'],
['Operating System','The foundation everything stands on.','Linux or Windows: patches, users, drivers.','Foundation environment'],
['Middleware','Helper software between OS and app.','Web servers, queues, caches, message brokers.','Kitchen utilities'],
['Runtime','Where your code actually runs.','Language runtime such as Node.js, Python or the JVM.','Application execution environment'],
['Applications','The product people actually use.','Your code, or the vendor\'s software in SaaS.','The meal'],
['Data','Ravi\'s customers, orders and files.','Always the customer\'s responsibility.','The recipe book']];
/* p provider, c customer, l platform service, T application, g managed/ready service */
const COL={p:'#3b82f6',c:'#f5b83d',l:'#8b5cf6',T:'#14b8a6',g:'#22c55e'};
const LEG=[['p','Provider managed'],['c','Customer managed'],['l','Platform services'],['T','Applications'],['g','Managed / ready service']];
const MODELS=[
{k:'iaas',n:'IaaS',f:'Infrastructure as a Service',codes:'ppppcccTc',x:60,ex:'Amazon EC2 · Azure VMs · Compute Engine',you:'OS → Data',story:'Ravi rents an empty apartment: the building is provided, he furnishes it.',pros:'Maximum control, flexible, good for migrating existing systems.',cons:'You patch and secure the OS; needs more skills and effort.',use:'Custom servers, legacy apps, test labs.'},
{k:'paas',n:'PaaS',f:'Platform as a Service',codes:'pppppllTc',x:500,ex:'Elastic Beanstalk · App Engine · App Service',you:'Apps + Data',story:'Ravi cooks in a fully equipped kitchen: he brings only the recipe.',pros:'Just push code, built-in scaling, faster delivery.',cons:'Less control, platform limits, vendor lock-in.',use:'Web apps, APIs, rapid development.'},
{k:'saas',n:'SaaS',f:'Software as a Service',codes:'ggggggggc',x:940,ex:'Gmail · Microsoft 365 · Salesforce',you:'Data, access, settings',story:'Ravi eats at a restaurant: the meal is ready, he just enjoys it.',pros:'Zero setup, always updated, pay per user.',cons:'Least control, limited customisation, data held by vendor.',use:'Email, CRM, collaboration, Google Workspace.'}];
const owner=(m,i)=>'pgl'.includes(m.codes[i])?'Provider':'You';
function buildSVG(){
 const Y0=235,G=52,dots=(id,c)=>[0,1,2].map(i=>`<circle r="7" fill="${c}"><animateMotion dur="3s" begin="${i}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`).join('');
 const pod=(s,x,l,i)=>`<g class="rv" data-s="${s}" transform="translate(${x},125)">${i}<text y="58" text-anchor="middle" class="lb">${l}</text></g>`;
 const IC={
  cloud:'<g fill="#dbe8ff"><circle cx="-30" r="22"/><circle cy="-14" r="28"/><circle cx="32" r="22"/><rect x="-30" width="62" height="22"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="4s" repeatCount="indefinite"/></g>',
  srv:'<g fill="#9db8e8"><rect x="-32" y="-26" width="64" height="16" rx="3"/><rect x="-32" y="-6" width="64" height="16" rx="3"/><rect x="-32" y="14" width="64" height="16" rx="3"/></g><g fill="#3b82f6"><circle cx="-22" cy="-18" r="3"/><circle cx="-22" cy="2" r="3"/><circle cx="-22" cy="22" r="3"/></g>',
  dev:'<rect x="-34" y="-26" width="68" height="44" rx="5" fill="#9db8e8"/><rect x="-28" y="-20" width="56" height="32" rx="2" fill="#0b1b3a"/><text y="3" text-anchor="middle" font-size="16" fill="#14b8a6">&lt;/&gt;</text><rect x="-44" y="22" width="88" height="6" rx="3" fill="#9db8e8"/>',
  usr:'<circle cy="-14" r="14" fill="#9db8e8"/><path d="M-30 28a30 26 0 0 1 60 0z" fill="#9db8e8"/>'};
 let s=`<svg id="viz" viewBox="0 0 1400 850" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IaaS, PaaS and SaaS stacks with nine layers each, coloured by who manages them"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d2149"/><stop offset="1" stop-color="#050c1d"/></linearGradient><radialGradient id="gl" cx=".5" cy="0" r=".8"><stop offset="0" stop-color="#3b82f6" stop-opacity=".25"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></radialGradient><path id="pI1" d="M650,75 C520,75 330,70 262,98"/><path id="pI2" d="M228,140 H42 V466"/><path id="pI3" d="M228,140 H42 V310"/><path id="pP1" d="M656,135 H482 V310"/><path id="pS1" d="M922,310 V135 H1104"/></defs><rect width="1400" height="850" rx="18" fill="url(#bg)"/><rect width="1400" height="850" rx="18" fill="url(#gl)"/><text id="cap" x="40" y="45" class="cap"></text><g transform="translate(700,50)">${IC.cloud}</g><text x="775" y="56" class="lb">Cloud provider</text>`;
 MODELS.forEach((m,mi)=>{
  s+=`<g class="stack rv" data-s="${mi+2}" data-m="${mi}"><text x="${m.x+200}" y="218" text-anchor="middle" class="st">${m.n}</text>`;
  LAYERS.forEach((L,i)=>{const y=Y0+(8-i)*G;
   s+=`<g class="ly" data-i="${i}" tabindex="0" role="button" aria-label="${L[0]} layer in ${m.n}"><rect class="lr" x="${m.x}" y="${y}" width="400" height="46" rx="10"/><text x="${m.x+18}" y="${y+30}" class="ln">${L[0]}</text><text x="${m.x+384}" y="${y+30}" text-anchor="end" class="lo"></text></g>`});
  s+=`</g><text x="${m.x+200}" y="730" text-anchor="middle" class="mf rv" data-s="${mi+2}">${m.f}</text><text x="${m.x+200}" y="758" text-anchor="middle" class="lb rv" data-s="6">${m.ex}</text><text x="${m.x+200}" y="786" text-anchor="middle" class="lb rv" data-s="5">You manage: ${m.you}</text>`});
 s+=LEG.map((l,i)=>`<g transform="translate(${70+i*265},810)"><rect width="22" height="22" rx="5" fill="${COL[l[0]]}"/><text x="32" y="17" class="lb">${l[1]}</text></g>`).join('');
 s+=pod(2,260,'Server',IC.srv)+pod(3,700,'Developer',IC.dev)+pod(4,1140,'User',IC.usr);
 s+=`<g class="dots">${dots('pI1','#60a5fa')}${dots('pI2','#f5b83d')}${dots('pI3','#14b8a6')}</g><g class="dots">${dots('pP1','#14b8a6')}</g><g class="dots">${dots('pS1','#22c55e')}</g></svg>`;
 return s}
