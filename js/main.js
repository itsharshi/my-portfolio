/* ==========================================================
   Trainer Portfolio — Harshith Geddada · AI Engineer
   Sprites loaded from PokeAPI: https://github.com/PokeAPI/sprites
   Change a Pokémon anywhere by changing its National Dex number.
   ========================================================== */
const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const art  = (id) => `${SPRITES}/other/official-artwork/${id}.png`;
const anim = (id) => `${SPRITES}/other/showdown/${id}.gif`;
const cryUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;

const EL = {
  electric:{ c:'#F4C430', soft:'#FFF4C7', name:'Electric' },
  grass:   { c:'#5DB44A', soft:'#E3F5DA', name:'Grass' },
  water:   { c:'#3F8FE0', soft:'#DDEEFD', name:'Water' },
  fire:    { c:'#F0772F', soft:'#FFE6D5', name:'Fire' },
  ghost:   { c:'#7B62C9', soft:'#ECE6FB', name:'Ghost' },
  fairy:   { c:'#E8609A', soft:'#FDE3EE', name:'Fairy' }
};
const MON_BY_EL = { electric:25, grass:1, water:7, fire:4, ghost:94, fairy:113 };
const MON_NAME = {
  1:'Bulbasaur', 4:'Charmander', 5:'Charmeleon', 6:'Charizard', 7:'Squirtle',
  25:'Pikachu', 94:'Gengar', 113:'Chansey', 133:'Eevee', 10034:'Mega Charizard X',
  143:'Snorlax', 376:'Metagross', 149:'Dragonite', 135:'Jolteon', 448:'Lucario',
  196:'Espeon', 474:'Porygon-Z', 462:'Magnezone', 233:'Porygon2', 137:'Porygon',
  468:'Togekiss', 405:'Luxray', 395:'Empoleon', 248:'Tyranitar', 445:'Garchomp',
  898:'Calyrex', 792:'Lunala', 791:'Solgaleo', 384:'Rayquaza', 150:'Mewtwo',
  493:'Arceus', 483:'Dialga', 484:'Palkia', 487:'Giratina', 249:'Lugia',
  250:'Ho-Oh', 643:'Reshiram', 644:'Zekrom', 646:'Kyurem',
  12:'Butterfree', 18:'Pidgeot', 39:'Jigglypuff', 778:'Mimikyu', 479:'Rotom',
  282:'Gardevoir', 700:'Sylveon', 471:'Glaceon', 197:'Umbreon',
  470:'Leafeon', 136:'Flareon', 134:'Vaporeon'
};

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(hover: none)').matches;
const mobile = () => innerWidth < 760;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 60) : ms));
const rnd = (a,b) => a + Math.random()*(b-a);

function fillImages(root=document){
  $$('img[data-art]', root).forEach(img => { img.src = art(img.dataset.art); img.decoding = 'async'; });
  $$('img[data-anim]', root).forEach(img => {
    img.onerror = () => { img.onerror = null; img.src = art(img.dataset.anim); };
    img.src = anim(img.dataset.anim);
  });
}

const cryCache = {};
function playCry(id){
  try{
    const a = cryCache[id] || (cryCache[id] = new Audio(cryUrl(id)));
    a.volume = .55; a.currentTime = 0; a.play().catch(()=>{});
  }catch(e){}
}
function hop(el){ el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop'); }

/* ================= DATA ================= */
const STOPS = [
  { n:'Begin',   place:'IIIT Nagpur',        yr:'2022',    text:'Started B.Tech in CSE (AI & ML). Dived into Python, data structures and the fundamentals of machine learning.', xp:1200 },
  { n:'Train',   place:'ISRO NRSC',          yr:'2024',    text:'Built CNN change-detection models on Sentinel-2 satellite imagery for disaster monitoring at ISRO. 88.1% accuracy.', xp:3400 },
  { n:'Build',   place:'Indus AI',           yr:'2025',    text:'Created a Hinglish TTS system with Orpheus-TTS and LLaMA-3. Deployed voice-cloned models with sub-2s latency.', xp:6800 },
  { n:'Deploy',  place:'RagaAI (Intern)',     yr:'2025–26', text:'Deployed LLM scheduling agents to 7+ clinics. Built browser automation agents with 90%+ task completion.', xp:12400 },
  { n:'Lead',    place:'RagaAI (Full-Time)',  yr:'2026–',   text:'Building multimodal LLM pipelines with Claude for healthcare document validation. 98%+ accuracy across 30+ policies.', xp:18600 }
];
const BADGE_SHAPES = [
  'M30 2 L58 30 L30 58 L2 30Z',
  'M30 2 L55 16 L55 44 L30 58 L5 44 L5 16Z',
  'M30 2 L38 22 L58 23 L42 36 L48 58 L30 46 L12 58 L18 36 L2 23 L22 22Z',
  'M16 4 H44 L58 30 L44 56 H16 L2 30Z',
  'M30 2 C46 2 58 14 58 30 C58 46 46 58 30 58 C14 58 2 46 2 30 C2 14 14 2 30 2Z M30 14 L35 26 L48 30 L35 34 L30 46 L25 34 L12 30 L25 26Z',
  'M30 2 C44 12 58 18 58 30 C58 46 44 58 30 58 C16 58 2 46 2 30 C2 18 16 12 30 2Z',
  'M6 10 L30 2 L54 10 L54 34 C54 46 42 54 30 58 C18 54 6 46 6 34Z',
  'M30 2 L42 14 L58 18 L50 32 L54 50 L30 44 L6 50 L10 32 L2 18 L18 14Z'
];
const BADGE_COLORS = ['#9AA4B5','#3F8FE0','#F4A22E','#5DB44A','#E8609A','#E7B416','#E3350D','#3E9E6B'];

const SKILLS = [
  { t:'AI / LLM',     el:'electric', sub:'Production agents and pipelines',
    items:[['LLM Agents',95],['RAG Systems',90],['Claude / OpenAI API',93],['LangChain / LangGraph',88]] },
  { t:'ML / Deep Learning', el:'fire', sub:'Models trained and deployed',
    items:[['PyTorch',90],['TensorFlow / Keras',87],['Computer Vision',85],['NLP / Audio',82]] },
  { t:'Infrastructure', el:'water', sub:'Scaling AI in production',
    items:[['Docker / K8s',84],['FastAPI',88],['AWS / GCP / Azure',80],['MLflow / W&B',78]] }
];
const RADAR = [['LLM Agents',95],['Deep Learning',88],['Computer Vision',85],['NLP',82],['MLOps',84],['Systems',80]];

const HABITATS = [
  { el:'electric', title:'LLM Agents',    mon:462, text:'Building autonomous agents that reason, plan and act. Multi-agent orchestration, tool calling, and agentic workflows for healthcare and enterprise.', tags:['Claude API','LangChain','Google ADK','MCP'] },
  { el:'grass',    title:'ML Research',   mon:1,   text:'Deep learning experiments — from CNNs on satellite imagery to hybrid architectures for deepfake detection and skin disease classification.', tags:['PyTorch','EfficientNet','U-Net','ViT'] },
  { el:'water',    title:'Data & Infra',  mon:395, text:'Production ML pipelines, vector databases, experiment tracking and deployment at scale.', tags:['Docker','FastAPI','vLLM','ChromaDB'] },
  { el:'fire',     title:'Voice & NLP',   mon:4,   text:'Text-to-speech systems, audio processing and conversational AI. Hinglish TTS, voice cloning and real-time inference.', tags:['Orpheus-TTS','LiveKit','LoRA/PEFT','HuggingFace'] }
];

const PROJECTS = [
  { id:1, name:'Multimodal Doc Validator', el:'electric', mon:376, cat:'LLM Pipeline', year:2026, status:'In production', role:'AI Engineer',
    stack:['Claude 4.5','Mistral OCR','Pydantic','Python'],
    desc:'End-to-end multimodal LLM pipeline validating Prior Auth records against insurer requirements across 7 medication categories.',
    problem:'Healthcare staff manually compared prior authorization documents against 30+ insurer policies — slow, error-prone and inconsistent.',
    solution:'A Claude 4.5 + Mistral OCR pipeline that extracts, validates and cross-references documents with structured Pydantic outputs.',
    results:'98%+ accuracy in documentation matching across 30+ policies and 7 medication categories.',
    challenge:'Handling diverse document formats (scanned PDFs, faxes, handwritten notes) required robust OCR preprocessing and confidence scoring.',
    learning:'Structured outputs (Pydantic) are essential for reliable LLM pipelines — they catch hallucinations before they reach production.' },
  { id:2, name:'LLM Scheduling Agents', el:'electric', mon:448, cat:'Agentic AI', year:2025, status:'Deployed', role:'AI Engineer Intern',
    stack:['LangChain','Google ADK','FastAPI','Python'],
    desc:'Production-grade LLM scheduling agents deployed to 7+ healthcare clinics, eliminating 80–95% of manual workflows.',
    problem:'Clinic staff spent hours daily on phone calls scheduling, rescheduling and confirming patient appointments.',
    solution:'Autonomous LLM agents handling end-to-end scheduling — understanding natural language requests, checking availability, and booking.',
    results:'80–95% reduction in manual workflows. 80% increase in patient booking conversion across 7+ clinics.',
    challenge:'Each clinic had different scheduling rules, time zones and edge cases. The agent needed configurable behavior without code changes.',
    learning:'Agent reliability at scale requires extensive evaluation — LLM-as-a-Judge on 500+ test cases was key to maintaining 85%+ precision.' },
  { id:3, name:'Browser Automation Agents', el:'water', mon:474, cat:'Agent Systems', year:2025, status:'Completed', role:'AI Engineer Intern',
    stack:['Playwright','Browser-use','LLM Decision','Python'],
    desc:'Context-aware browser automation agents achieving 90%+ task completion on dynamic healthcare intake-form portals.',
    problem:'Healthcare intake forms vary wildly across portals. Manual data entry was a bottleneck for patient onboarding.',
    solution:'LLM-powered agents that understand page context, fill forms intelligently, handle dynamic elements and recover from errors.',
    results:'90%+ task completion rate on previously manual, time-consuming intake workflows.',
    challenge:'Dynamic form elements that load asynchronously and change structure based on previous inputs required an adaptive approach.',
    learning:'Browser agents need a perception-action loop, not a scripted path. LLM decision-making at each step beats brittle selectors.' },
  { id:4, name:'DeepFake Detection', el:'fire', mon:149, cat:'Deep Learning', year:2024, status:'Completed', role:'ML Engineer',
    stack:['EfficientNet-B0','BiLSTM','PyTorch','OpenCV'],
    desc:'Hybrid deep learning model combining spatial features with temporal modeling for deepfake video detection.',
    problem:'Deepfakes are increasingly convincing. Single-frame detectors miss temporal artifacts that distinguish real from fake.',
    solution:'EfficientNet-B0 extracts per-frame spatial features; BiLSTM captures temporal inconsistencies across frame sequences.',
    results:'97% accuracy and precision on the Celeb-DF v2 benchmark dataset.',
    challenge:'Balancing model complexity with inference speed — the BiLSTM layer needed to process frame sequences in near real-time.',
    learning:'Hybrid architectures (CNN + RNN) consistently outperform single-paradigm models for video analysis tasks.' },
  { id:5, name:'Border Security System', el:'ghost', mon:248, cat:'Computer Vision', year:2024, status:'Completed', role:'ML Engineer',
    stack:['YOLOv8','OSNet','Multi-Camera','Python'],
    desc:'Real-time surveillance pipeline combining weapon/person detection with re-identification and multi-camera tracking.',
    problem:'Border security requires instant detection of threats across multiple camera feeds — manual monitoring is impractical at scale.',
    solution:'YOLOv8 for weapon/person detection (90%+ precision), OSNet for re-identification, linked across multi-camera feeds with automated alerting.',
    results:'90%+ precision in weapon detection with real-time multi-camera tracking and automated alert system.',
    challenge:'Re-identifying the same person across different camera angles and lighting conditions required robust feature embeddings.',
    learning:'Multi-camera systems need a shared embedding space, not per-camera models. OSNet handled the domain gap well.' },
  { id:6, name:'Hinglish TTS', el:'fire', mon:405, cat:'Voice AI', year:2025, status:'Completed', role:'AI/ML Engineer Intern',
    stack:['Orpheus-TTS','LLaMA-3','SNAC','LiveKit'],
    desc:'End-to-end Hinglish text-to-speech system with SNAC audio tokenization and voice cloning for conversational AI.',
    problem:'Existing TTS models handle either Hindi or English well, but not the code-mixed Hinglish that most Indian users speak.',
    solution:'Fine-tuned Orpheus-TTS on a 5K+ pair dataset synthesized via ElevenLabs. LoRA/PEFT for efficient training, LiveKit for real-time serving.',
    results:'Sub-2-second latency conversational AI with natural-sounding Hinglish speech and voice cloning capability.',
    challenge:'Synthesizing a quality training dataset for code-mixed speech — solved with ElevenLabs generation and careful curation.',
    learning:'LoRA fine-tuning makes it practical to adapt large speech models with limited compute. Quality data beats quantity.' },
  { id:7, name:'Flood Detection', el:'water', mon:131, cat:'Remote Sensing', year:2024, status:'Completed', role:'ML Intern (ISRO)',
    stack:['U-Net','Sentinel-2','CNN','Python'],
    desc:'CNN-based change detection on multi-temporal Sentinel-2 satellite imagery to identify flood-affected regions.',
    problem:'Disaster response teams needed rapid assessment of flood-affected areas from satellite imagery.',
    solution:'Multi-temporal change detection using CNNs on Sentinel-2 bands. U-Net optimized for flood segmentation with class-imbalance mitigation.',
    results:'88.1% classification accuracy on complex terrain. Improved precision via class-imbalance handling.',
    challenge:'Flood water is spectrally similar to shadows and dark soil in satellite imagery — required multi-band feature engineering.',
    learning:'Class imbalance in remote sensing is severe. Focal loss + oversampling was more effective than standard cross-entropy.' },
  { id:8, name:'Skin Disease Classifier', el:'grass', mon:282, cat:'Medical AI (IEEE)', year:2024, status:'Published', role:'Researcher',
    stack:['Vision Transformer','Clinical Metadata','Multimodal','IEEE'],
    desc:'Multimodal architecture combining ViT features with clinical metadata for skin cancer diagnosis. Published in IEEE.',
    problem:'Dermoscopic image classification alone misses clinical context (patient age, lesion location, history) that dermatologists use.',
    solution:'A multimodal architecture fusing Vision Transformer image features with structured clinical metadata for ACK/BCC diagnosis.',
    results:'92.83% accuracy on dermoscopic images. Published as IEEE conference paper.',
    challenge:'Aligning two fundamentally different data modalities (image embeddings and tabular metadata) into a shared representation.',
    learning:'Clinical metadata provides complementary signal that images alone miss. The fusion architecture matters more than model size.' }
];

const MILES = [
  { yr:'2024', rank:'Starter',          mon:4,     role:'ML Intern',                   co:'ISRO — National Remote Sensing Centre',
    resp:['Built CNN change detection models on Sentinel-2 satellite imagery','Optimized U-Net for flood detection with class-imbalance mitigation','Achieved 88.1% classification accuracy on complex terrain'],
    achv:'First production ML model at a national space agency' },
  { yr:'2025', rank:'First evolution',  mon:5,     role:'AI/ML Engineer Intern',        co:'Indus AI — Voice & Conversational AI',
    resp:['Built end-to-end Hinglish TTS with Orpheus-TTS and LLaMA-3','Applied LoRA/PEFT fine-tuning on 5K+ audio-text dataset','Deployed voice-cloned models with LiveKit for sub-2s latency'],
    achv:'Shipped conversational AI with real-time voice cloning' },
  { yr:'2025–26', rank:'Final evolution',  mon:6,     role:'AI Engineer Intern',        co:'RagaAI Inc. — Healthcare AI',
    resp:['Deployed LLM scheduling agents to 7+ healthcare clinics','Evaluated agents across 500+ test cases with 85%+ precision','Built browser automation agents with 90%+ task completion'],
    achv:'Eliminated 80–95% of manual clinic workflows' },
  { yr:'2026–', rank:'Mega evolution',   mon:10034, role:'AI Engineer (Full-Time)',      co:'RagaAI Inc. — Multimodal AI',
    resp:['Building multimodal LLM pipelines with Claude 4.5 and Mistral OCR','Engineering agentic policy automation across 60+ resolvers','Enforcing Pydantic structured outputs for production reliability'],
    achv:'98%+ accuracy on multimodal document validation' }
];

const ICON = {
  electric:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  grass:'<path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z"/>',
  water:'<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>',
  fire:'<path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z"/>',
  ghost:'<path d="M6 20V11a6 6 0 0112 0v9l-2-2-2 2-2-2-2 2-2-2z"/>',
  fairy:'<path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>'
};
const typeIcon = (el) => `<i><svg viewBox="0 0 24 24" fill="${EL[el].c}">${ICON[el]}</svg></i>`;
const typeBadge = (el, label) => `<span class="type" data-type="${el}" style="--pc:${EL[el].c}">${typeIcon(el)}${label || EL[el].name}</span>`;
$$('.type[data-type]').forEach(t => { const el = t.dataset.type; t.style.setProperty('--pc', EL[el].c); t.insertAdjacentHTML('afterbegin', typeIcon(el)); });

function grassSVG(n, colors, h=120, minH=40, maxH=110){
  let paths='';
  for(let i=0;i<n;i++){
    const x=(i/n)*1440 + Math.random()*10, bh=minH+Math.random()*(maxH-minH), w=5+Math.random()*6, lean=(Math.random()-.5)*34;
    paths += `<path class="blade" style="--d:${(3+Math.random()*3).toFixed(1)}s;--dl:${(-Math.random()*5).toFixed(1)}s;--a:${(2+Math.random()*5).toFixed(1)}deg" d="M${x} ${h} Q${x+lean/2} ${h-bh/2} ${x+lean} ${h-bh} Q${x+lean/2+w} ${h-bh/2} ${x+w} ${h}Z" fill="${colors[i%colors.length]}"/>`;
  }
  return `<svg viewBox="0 0 1440 ${h}" preserveAspectRatio="none">${paths}</svg>`;
}
$('#sceneGrass').innerHTML = grassSVG(mobile()?50:90, ['#6DB844','#7CC652','#5FA83B','#88D05E']);
$('#arenaGrass').innerHTML = grassSVG(70, ['#5FA83B','#6DB844','#4F9A34','#7CC652'], 120, 50, 120);

/* ================= BUILD: BADGE CASE ================= */
$('#badgeCase').innerHTML = BADGE_SHAPES.map((d,i)=>`<svg viewBox="0 0 60 60" aria-hidden="true"><path d="${d}" fill="${BADGE_COLORS[i]}" fill-rule="evenodd" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2" transform="translate(6 6) scale(.8)"/></svg>`).join('');

/* ================= BUILD: JOURNEY ================= */
$('#stops').innerHTML = STOPS.map((s,i)=>`
  <li class="stop" data-i="${i}">
    <div class="badge">
      <svg viewBox="0 0 60 60"><path class="b-fill" d="${BADGE_SHAPES[i]}" fill="${BADGE_COLORS[(i*2+1)%8]}" fill-rule="evenodd"/><path class="b-lock" d="${BADGE_SHAPES[i]}" fill="none" stroke="rgba(31,35,64,.3)" stroke-width="1.5" stroke-dasharray="3 4"/></svg>
      <span class="b-num">${String(i+1).padStart(2,'0')}</span>
    </div>
    <h3>${s.n}</h3>
    <div class="place">${s.place} · ${s.yr}</div>
    <p>${s.text}</p>
    <span class="xp px">+${s.xp.toLocaleString()} XP</span>
  </li>`).join('');

/* ================= BUILD: SKILLS ================= */
function radarSVG(){
  const cx=150, cy=150, R=108, n=RADAR.length;
  const pt=(i,r)=>{ const a=-Math.PI/2 + i*2*Math.PI/n; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r]; };
  let grid=''; [1,.75,.5,.25].forEach((k,j)=>{ grid+=`<polygon points="${RADAR.map((_,i)=>pt(i,R*k).join(',')).join(' ')}" fill="${j%2?'#fff':'#F5F7FB'}" stroke="rgba(31,35,64,.08)"/>`; });
  const axes = RADAR.map((_,i)=>{ const [x,y]=pt(i,R); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(31,35,64,.08)"/>`; }).join('');
  const labels = RADAR.map(([l],i)=>{ const [x,y]=pt(i,R+22); return `<text x="${x}" y="${y}" fill="#4B5275" font-size="12" font-weight="600" text-anchor="middle" dominant-baseline="middle" font-family="Inter, sans-serif">${l}</text>`; }).join('');
  const zero = RADAR.map((_,i)=>pt(i,4).join(',')).join(' ');
  const full = RADAR.map(([,v],i)=>pt(i,R*v/100).join(',')).join(' ');
  return `<svg class="radar" viewBox="0 0 300 300" role="img" aria-label="Skill profile radar: ${RADAR.map(r=>r[0]+' '+r[1]).join(', ')}">${grid}${axes}<polygon class="shape" id="radarShape" data-full="${full}" points="${zero}" fill="rgba(61,125,202,.22)" stroke="#3D7DCA" stroke-width="2.5" stroke-linejoin="round"/>${labels}</svg>`;
}
$('#skillsGrid').innerHTML = `
  <div class="panel radar-panel reveal" style="--pc:#3D7DCA">
    <span class="panel-band"></span>
    <p class="px" style="margin:6px 0 0;font-size:12px;color:var(--mute)">Pokédex data</p>
    <h3 style="margin-top:4px">Stat profile</h3>
    <p class="sub">A snapshot across six core disciplines</p>
    ${radarSVG()}
    <div class="radar-legend">${RADAR.map(([l,v])=>`<span>${l}<b>${v}</b></span>`).join('')}</div>
  </div>` +
  SKILLS.map(g=>`
  <div class="panel reveal" style="--pc:${EL[g.el].c}">
    <span class="panel-band"></span>
    ${typeBadge(g.el)}
    <h3>${g.t}</h3>
    <p class="sub">${g.sub}</p>
    ${g.items.map(([n,v])=>`
      <div class="skill" data-v="${v}">
        <div class="skill-top"><span class="skill-name">${n}</span><span class="skill-lv"><span>Lv</span><b class="lvn">0</b></span></div>
        <div class="stat" role="meter" aria-label="${n} level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><i></i></div>
      </div>`).join('')}
  </div>`).join('');

/* ================= BUILD: HABITATS ================= */
const habBG = {
  electric:'radial-gradient(70% 55% at 50% 38%, #FFF6C4, transparent 70%), linear-gradient(180deg,#FFE680,#F7C948 60%,#E9A92A)',
  grass:'radial-gradient(70% 55% at 50% 40%, #F2FFE4, transparent 70%), linear-gradient(180deg,#BDE8A0,#7CC460 60%,#4E9E3E)',
  water:'radial-gradient(70% 55% at 50% 38%, #EAF7FF, transparent 70%), linear-gradient(180deg,#A6DBFA,#5AA8EC 60%,#2F74C8)',
  fire:'radial-gradient(70% 55% at 50% 50%, #FFE9C8, transparent 70%), linear-gradient(180deg,#FFC48A,#F58A46 60%,#D65A26)'
};
$('#elRow').innerHTML = HABITATS.map((h,i)=>`
  <div class="el ${i===0?'active':''}" role="tab" tabindex="${i===0?0:-1}" aria-selected="${i===0}" data-el="${h.el}" data-mon="${h.mon}" style="--pc:${EL[h.el].c}">
    <div class="el-bg" style="background:${habBG[h.el]}"></div>
    <div class="el-fx" data-fx="${h.el}"></div>
    <img class="el-mon" data-art="${h.mon}" alt="${MON_NAME[h.mon]||'Pokémon'}" loading="lazy" width="475" height="475">
    <span class="el-v" aria-hidden="true">${h.title}</span>
    <div class="el-info">
      <h3 class="el-name">${typeBadge(h.el, h.title)}<span class="px" style="font-size:12px;color:var(--mute);font-weight:500">${(MON_NAME[h.mon]||'Pokémon')}'s habitat</span></h3>
      <div class="el-detail"><p>${h.text}</p><div class="tags">${h.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
    </div>
  </div>`).join('');

function fillFx(box){
  const type = box.dataset.fx; const n = mobile()? 10 : 22; let h='';
  for(let i=0;i<n;i++){
    const L=rnd(2,98), t=rnd(4,10).toFixed(1), dl=(-rnd(0,10)).toFixed(1), x=rnd(-60,60).toFixed(0);
    if(type==='electric') h+=`<i class="p p-spark" style="left:${L}%;bottom:${rnd(0,30)}%;--t:${t}s;--dl:${dl}s;--x:${x}px"></i>`;
    if(type==='grass') h+= i%2 ? `<i class="p p-leaf" style="left:${L}%;--t:${rnd(7,13).toFixed(1)}s;--dl:${dl}s;--x:${rnd(-160,160).toFixed(0)}px"></i>` : `<i class="p p-pollen" style="left:${L}%;top:${rnd(10,90)}%;--t:${rnd(3,6).toFixed(1)}s;--dl:${dl}s;--x:${x}px"></i>`;
    if(type==='water'){ const s=rnd(6,18).toFixed(0); h+=`<i class="p p-bubble" style="left:${L}%;width:${s}px;height:${s}px;--t:${t}s;--dl:${dl}s;--x:${(x/2).toFixed(0)}px"></i>`; }
    if(type==='fire') h+= i%3 ? `<i class="p p-ember" style="left:${L}%;--t:${rnd(3,7).toFixed(1)}s;--dl:${dl}s;--x:${x}px"></i>` : `<i class="p p-ash" style="left:${L}%;--t:${rnd(8,14).toFixed(1)}s;--dl:${dl}s;--x:${x}px"></i>`;
  }
  if(type==='water') h+='<div class="water-lines"></div>';
  if(type==='fire') h+='<div class="heat"></div>';
  if(type==='electric') h+='<svg class="p p-bolt" id="habBolt" viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%"><path d="" fill="none" stroke="#fff" stroke-width="3" style="filter:drop-shadow(0 0 6px #FFB800)"/></svg>';
  box.innerHTML = h;
}
$$('.el-fx').forEach(fillFx);

/* ================= BUILD: PROJECTS ================= */
const artFor = (p) => {
  const {c, soft} = EL[p.el];
  const v = [
    `radial-gradient(70% 90% at 80% 90%, ${c}, transparent 70%), linear-gradient(135deg, ${soft}, color-mix(in srgb, ${c} 45%, #fff))`,
    `radial-gradient(circle at 15% 20%, rgba(255,255,255,.5) 0 2px, transparent 3px) 0 0/22px 22px, linear-gradient(160deg, ${soft}, ${c})`,
    `repeating-linear-gradient(135deg, rgba(255,255,255,.14) 0 12px, transparent 12px 24px), linear-gradient(200deg, color-mix(in srgb, ${c} 35%, #fff), ${c})`
  ];
  return v[p.id % 3];
};
const pid = (n) => '#' + String(n).padStart(3,'0');
const mock = (p, extra='') => `<div class="mock" aria-hidden="true" style="--pc:${EL[p.el].c};${extra}"><div class="dots"><i></i><i></i><i></i></div><div class="bar acc"></div><div class="bar" style="width:70%"></div><div class="blocks"><i></i><i></i></div></div>`;
$('#dex').innerHTML = PROJECTS.map(p=>`
  <button class="card reveal" data-id="${p.id}" data-el="${p.el}" data-mon="${p.mon}" style="--pc:${EL[p.el].c}" aria-label="Open case study: ${p.name}, ${p.cat}, ${p.year}">
    <div class="card-screen">
      <div class="card-art" style="background:${artFor(p)}"></div>
      ${mock(p)}
      <span class="card-no">${pid(p.id)}</span>
      <span class="card-yr">${p.year}</span>
      <img class="card-mon" data-art="${p.mon}" alt="" loading="lazy" width="475" height="475">
    </div>
    <div class="card-body">
      <div class="card-title"><h3>${p.name}</h3>${typeBadge(p.el)}</div>
      <p class="desc">${p.desc}</p>
      <dl class="card-stats">
        <div><dt>Type</dt><dd>${p.cat}</dd></div>
        <div><dt>Abilities</dt><dd>${p.stack.slice(0,2).join(', ')}</dd></div>
        <div><dt>Status</dt><dd><span class="status-dot ${p.status!=='Completed' && p.status!=='Deployed' && p.status!=='Published'?'wip':''}"></span>${p.status}</dd></div>
      </dl>
      <span class="card-open">View Pokédex entry <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </div>
  </button>`).join('');

const filterTypes = ['all', ...new Set(PROJECTS.map(p=>p.el))];
$('#filters').innerHTML = filterTypes.map(t=>`<button class="filter" aria-pressed="${t==='all'}" data-f="${t}" style="--fc:${t==='all'?'var(--red)':EL[t].c}"><i></i>${t==='all'?'All entries':EL[t].name}</button>`).join('');
$('#filters').addEventListener('click', e=>{
  const b = e.target.closest('.filter'); if(!b) return;
  $$('.filter').forEach(x=>x.setAttribute('aria-pressed', x===b));
  $$('.card').forEach(c=>c.classList.toggle('hide', b.dataset.f!=='all' && c.dataset.el!==b.dataset.f));
});

/* ================= BUILD: EXPERIENCE ================= */
$('#expTrack').insertAdjacentHTML('beforeend', MILES.map((m,i)=>`
  <article class="mile" data-i="${i}">
    <div class="mile-marker" aria-hidden="true"><img data-art="${m.mon}" alt="" loading="lazy"></div>
    <div class="mile-yr">${m.yr}</div>
    <div class="mile-rank">${m.rank}</div>
    <div class="mile-card">
      <h3>${m.role}</h3>
      <p class="co">${m.co}</p>
      <ul>${m.resp.map(r=>`<li>${r}</li>`).join('')}</ul>
      <div class="achv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.5 19.5l1-6.3L3 8.9 9 8z"/></svg><span>${m.achv}</span></div>
    </div>
  </article>`).join(''));
$('#evoChain').innerHTML = MILES.map((m,i)=>`${i?'<span class="arrow" aria-hidden="true">▸</span>':''}<span class="evo ${i===0?'seen now':''}" title="${MON_NAME[m.mon]}"><img data-art="${m.mon}" alt="${MON_NAME[m.mon]}" loading="lazy"></span>`).join('');

/* ================= BUILD: POKÉDEX SCANNER ================= */
const SCAN_SKILLS = [
  { name:'LLM Agents',   el:'electric', mons:[448,376,462,135,405], desc:'Multi-agent orchestration, tool calling, Claude API' },
  { name:'Deep Learning', el:'fire',     mons:[6,149,445,384,150],   desc:'PyTorch, CNNs, EfficientNet, U-Net, BiLSTM' },
  { name:'Computer Vision', el:'ghost',  mons:[94,248,487,778,197],  desc:'YOLOv8, OpenCV, satellite imagery, deepfake detection' },
  { name:'NLP & Voice',  el:'water',     mons:[131,395,249,484,134], desc:'TTS, STT, NLTK, SpaCy, audio processing' },
  { name:'RAG & Vectors', el:'grass',    mons:[1,282,470,700,468],   desc:'FAISS, ChromaDB, Pinecone, embeddings, retrieval' },
  { name:'MLOps & Infra', el:'water',    mons:[7,474,233,137,471],   desc:'Docker, K8s, FastAPI, vLLM, AWS, CI/CD' }
];
const SCAN_KEY = 'trainer-scanned';
let scanned = {};
try{ scanned = JSON.parse(localStorage.getItem(SCAN_KEY)) || {}; }catch(e){}

$('#scannerGrid').innerHTML = SCAN_SKILLS.map((sk,i)=>{
  const found = scanned[sk.name] || [];
  return `
  <div class="scan-card" data-skill="${i}" style="--pc:${EL[sk.el].c}">
    <div class="scan-top">
      ${typeBadge(sk.el, sk.name)}
      <span class="scan-count px">${found.length}/${sk.mons.length}</span>
    </div>
    <p class="scan-desc">${sk.desc}</p>
    <div class="scan-slots" id="scanSlots${i}">
      ${sk.mons.map(m => {
        const unlocked = found.includes(m);
        return `<span class="scan-slot ${unlocked?'found':''}" data-mon="${m}">
          ${unlocked ? `<img src="${art(m)}" alt="${MON_NAME[m]||''}" loading="lazy">` : '<span class="scan-q">?</span>'}
          <span class="scan-name px">${unlocked ? (MON_NAME[m]||'#'+m) : '???'}</span>
        </span>`;
      }).join('')}
    </div>
    <button class="btn primary sm scan-btn" data-skill="${i}"><span class="mini-ball"></span>Scan!</button>
  </div>`;
}).join('');

document.addEventListener('click', async e => {
  const btn = e.target.closest('.scan-btn');
  if(!btn) return;
  const idx = +btn.dataset.skill;
  const sk = SCAN_SKILLS[idx];
  const found = scanned[sk.name] || [];
  const remaining = sk.mons.filter(m => !found.includes(m));
  if(!remaining.length){ btn.textContent = 'All found!'; btn.disabled = true; return; }
  btn.disabled = true; btn.textContent = 'Scanning…';
  await wait(600 + Math.random()*600);
  const mon = remaining[Math.floor(Math.random()*remaining.length)];
  found.push(mon);
  scanned[sk.name] = found;
  try{ localStorage.setItem(SCAN_KEY, JSON.stringify(scanned)); }catch(e){}
  playCry(mon);
  const slot = $(`#scanSlots${idx} .scan-slot[data-mon="${mon}"]`);
  if(slot){
    slot.classList.add('found','just-found');
    slot.innerHTML = `<img src="${art(mon)}" alt="${MON_NAME[mon]||''}" loading="lazy"><span class="scan-name px">${MON_NAME[mon]||'#'+mon}</span>`;
    setTimeout(()=>slot.classList.remove('just-found'), 1200);
  }
  const countEl = btn.closest('.scan-card').querySelector('.scan-count');
  countEl.textContent = `${found.length}/${sk.mons.length}`;
  if(found.length === sk.mons.length){
    btn.textContent = 'All found!'; btn.disabled = true;
    btn.closest('.scan-card').classList.add('complete');
  } else {
    btn.disabled = false;
    btn.innerHTML = '<span class="mini-ball"></span>Scan again!';
  }
});

fillImages();

/* ================= INTRO ================= */
const intro = $('#intro'), pokeball = $('#pokeball'), introHint = $('#introHint');
let roamers = [], roamRaf = 0, roamPaused = false, introBusy = false;
const SEEN_KEY = 'trainer-intro-seen';
let seen = /[?&]skip-intro/.test(location.search); try{ seen = seen || sessionStorage.getItem(SEEN_KEY) === '1'; }catch(e){}

function introDecor(){
  const field = $('#introField'), w = innerWidth, h = innerHeight;
  const clump = () => `<svg width="72" height="46" viewBox="0 0 72 46"><path d="M36 46 C26 34 20 22 20 6 C28 20 34 30 38 46 Z" fill="#4f9a3a"/><path d="M36 46 C30 32 28 20 30 4 C34 20 38 30 40 46 Z" fill="#5cae44"/><path d="M36 46 C36 32 38 18 44 6 C44 22 42 34 42 46 Z" fill="#67bd4d"/><path d="M36 46 C40 34 46 24 54 14 C50 28 46 36 44 46 Z" fill="#57a63f"/><path d="M36 46 C32 34 26 26 16 18 C24 30 30 38 34 46 Z" fill="#5cae44"/></svg>`;
  let html = '';
  const count = Math.min(26, Math.round(w/60));
  for(let i=0;i<count;i++){
    const s = (.7 + Math.random()*1.1).toFixed(2);
    html += `<div class="clump" style="left:${rnd(-2,98)}%;top:${rnd(4,96)}%;scale:${s};--amp:${rnd(3,8).toFixed(1)}deg;--dur:${rnd(2.6,5).toFixed(2)}s;--delay:${(-rnd(0,3)).toFixed(2)}s">${clump()}</div>`;
  }
  for(let i=0;i<18;i++) html += `<span class="flower" style="left:${rnd(2,98)}%;top:${rnd(6,96)}%;scale:${rnd(.6,1.2).toFixed(2)}"></span>`;
  for(let i=0;i<14;i++) html += `<span class="mote" style="left:${rnd(0,100)}%;top:${rnd(30,90)}%;--dx:${rnd(-30,60).toFixed(0)}px;--dy:${rnd(-200,-80).toFixed(0)}px;--dur:${rnd(9,17).toFixed(1)}s;--delay:${(-rnd(0,10)).toFixed(1)}s"></span>`;
  field.innerHTML = html;

  const ids = mobile() ? [25,12,18,4] : [25,1,12,18,4,133,39];
  ids.forEach(id=>{
    const el = document.createElement('div'); el.className = 'roamer';
    el.innerHTML = `<span class="rshadow"></span><img alt="">`;
    const img = el.querySelector('img');
    const r = { el, img, id, x:0, y:0, tx:0, ty:0, w:70, h:70, speed:rnd(.5,1.1), pause:rnd(0,1500) };
    img.onload = () => { const k = mobile()? 1.2 : 1.6; r.w = img.naturalWidth*k; r.h = img.naturalHeight*k; img.style.width = r.w+'px'; };
    img.onerror = () => { img.onerror = null; img.src = art(id); img.style.width = '90px'; r.w = r.h = 90; };
    img.src = anim(id);
    const p = roamPoint(); r.x = p.x; r.y = p.y; const t = roamPoint(); r.tx = t.x; r.ty = t.y;
    field.appendChild(el); roamers.push(r);
  });
  roamRaf = requestAnimationFrame(roam);
}
function roamPoint(){
  const w = innerWidth, h = innerHeight, cx = w/2, cy = h/2, keep = Math.min(w,h)*.3;
  for(let k=0;k<30;k++){
    const x = rnd(w*.04, w - 110), y = rnd(h*.18, h - 130);
    if(Math.hypot(x+40-cx, (y+40-cy)*1.3) > keep) return {x,y};
  }
  return { x:rnd(0,w*.2), y:rnd(h*.2,h*.8) };
}
let lastRoam = performance.now();
function roam(t){
  const dt = Math.min(3, (t-lastRoam)/16.67); lastRoam = t;
  if(!roamPaused) roamers.forEach(r=>{
    if(r.captured) return;
    if(r.pause > 0){ r.pause -= dt*16.67; }
    else{
      const dx = r.tx-r.x, dy = r.ty-r.y, d = Math.hypot(dx,dy);
      if(d < 4){ const p = roamPoint(); r.tx=p.x; r.ty=p.y; if(Math.random()<.6) r.pause = rnd(400,2200); }
      else { r.x += dx/d*r.speed*dt; r.y += dy/d*r.speed*dt; r.el.classList.toggle('flip', dx > 0); }
    }
    r.el.style.transform = `translate(${r.x}px, ${r.y}px)`;
  });
  if(!intro.classList.contains('gone')) roamRaf = requestAnimationFrame(roam);
}

let entered = false;
function enterSite(){
  if(entered) return; entered = true;
  intro.classList.add('gone');
  document.body.classList.remove('intro-on');
  document.body.classList.add('loaded');
  cancelAnimationFrame(roamRaf);
  try{ sessionStorage.setItem(SEEN_KEY,'1'); }catch(e){}
  const h1 = $('.hero-name'); h1.setAttribute('tabindex','-1'); h1.focus({preventScroll:true});
  setTimeout(()=>{ intro.remove(); moveNavPill(); sizeSparks(); }, 700);
}

async function catchSequence(){
  if(introBusy) return; introBusy = true;
  pokeball.classList.add('busy');
  introHint.textContent = 'Go! Poké Ball!';
  const br = pokeball.getBoundingClientRect(), bx = br.left + br.width/2, by = br.top + br.height/2;
  const target = roamers.filter(r=>r.w).sort((a,b)=>Math.hypot(a.x+a.w/2-bx, a.y+a.h/2-by) - Math.hypot(b.x+b.w/2-bx, b.y+b.h/2-by))[0];
  if(target && !reduce){
    roamPaused = true; target.captured = true;
    const mx = target.x + target.w/2, my = target.y + target.h/2;
    const dist = Math.hypot(mx-bx, my-by), ang = Math.atan2(my-by, mx-bx);
    const beam = document.createElement('div'); beam.className = 'beam';
    beam.style.width = dist+'px'; beam.style.left = bx+'px'; beam.style.top = (by-8)+'px';
    beam.style.transform = `rotate(${ang}rad) scaleX(0)`;
    intro.appendChild(beam);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ beam.style.transform = `rotate(${ang}rad) scaleX(1)`; }));
    pokeball.classList.add('catching');
    playCry(target.id);
    await wait(260);
    target.el.classList.add('captured');
    target.el.style.transform = `translate(${bx - target.w/2}px, ${by - target.h/2}px) scale(.05)`;
    target.el.style.opacity = '0';
    introHint.textContent = `A wild ${MON_NAME[target.id] || 'Pokémon'} was pulled in!`;
    await wait(560);
    beam.style.opacity = '0'; setTimeout(()=>beam.remove(), 300);
    const ring = document.createElement('div'); ring.className='catch-ring'; ring.style.left=bx+'px'; ring.style.top=by+'px'; intro.appendChild(ring); setTimeout(()=>ring.remove(), 600);
    pokeball.classList.remove('catching');
    pokeball.classList.add('shake');
    introHint.textContent = '. . .';
    await wait(1700);
    pokeball.classList.remove('shake');
    for(let i=0;i<6;i++){ const s=document.createElement('i'); s.className='star-pop'; const a=-Math.PI/2 + (i-2.5)*.45; s.style.left=bx+'px'; s.style.top=(by-br.height*.4)+'px'; s.style.setProperty('--x', Math.cos(a)*90+'px'); s.style.setProperty('--y', Math.sin(a)*90+'px'); intro.appendChild(s); setTimeout(()=>s.remove(), 900); }
    introHint.textContent = 'Gotcha! Welcome, trainer!'; introHint.classList.add('got');
    await wait(800);
  }
  pokeball.classList.add('open');
  $('#flash').classList.add('go');
  await wait(480);
  enterSite();
}

if(seen){ intro.remove(); document.body.classList.remove('intro-on'); requestAnimationFrame(()=>document.body.classList.add('loaded')); }
else{
  introDecor();
  pokeball.addEventListener('click', catchSequence);
  $('#introSkip').addEventListener('click', enterSite);
  addEventListener('keydown', function esc(e){ if(e.key==='Escape' && document.body.classList.contains('intro-on')){ enterSite(); removeEventListener('keydown', esc); } });
}

/* ================= AMBIENT PARTICLE FIELD ================= */
const fieldCanvas = $('#field'), fctx = fieldCanvas.getContext('2d');
let FW, FH, DPR = Math.min(devicePixelRatio||1, 2);
let mode = 'electric', parts = [], mouse = { x:-9999, y:-9999 };
function sizeField(){ FW=innerWidth; FH=innerHeight; fieldCanvas.width=FW*DPR; fieldCanvas.height=FH*DPR; fctx.setTransform(DPR,0,0,DPR,0,0); }
sizeField();
function spawn(p, init){
  p.mode = mode; p.life = 0; p.fade = p.fade ?? 1; p.dying = false;
  p.x = rnd(0,FW); p.y = init? rnd(0,FH) : FH+10;
  p.r = rnd(1,2.6); p.rot = rnd(0,6.28); p.vr = rnd(-.02,.02);
  if(mode==='electric'){ p.vx=rnd(-.15,.15); p.vy=rnd(-.45,-.12); p.r=rnd(2.5,5); }
  if(mode==='grass'){ p.leaf = Math.random()<.5; p.vx=rnd(.25,.8); p.vy=rnd(-.1,.35); p.r = p.leaf? rnd(5,8) : rnd(1.5,2.5); if(!init){ p.x=-10; p.y=rnd(0,FH); } }
  if(mode==='water'){ p.vx=0; p.vy=rnd(-.8,-.3); p.r=rnd(3,8); p.wob=rnd(0,6); }
  if(mode==='fire'){ p.ash = Math.random()<.25; p.vx=rnd(-.3,.3); p.vy=p.ash? rnd(-.6,-.2) : rnd(-1.4,-.5); p.r=p.ash? rnd(1,2) : rnd(1.5,3); }
  if(mode==='fairy' || mode==='ghost'){ p.vx=rnd(-.3,.3); p.vy=rnd(.2,.6); p.r=rnd(4,7); if(!init) p.y=-10; }
  return p;
}
function initParts(){ const n = reduce? 18 : (mobile()? 26 : 60); parts = Array.from({length:n}, ()=>spawn({}, true)); }
initParts();
function setMode(m){ if(m===mode || !EL[m]) return; mode=m; parts.forEach(p=>{ p.dying=true; }); }
function star4(x,y,r){ fctx.beginPath(); for(let i=0;i<8;i++){ const a=i*Math.PI/4, rr = i%2? r*.35 : r; fctx.lineTo(x+Math.cos(a)*rr, y+Math.sin(a)*rr); } fctx.closePath(); fctx.fill(); }
let t0 = performance.now();
function drawField(t){
  const dt = Math.min(2, (t - t0)/16.67); t0 = t;
  fctx.clearRect(0,0,FW,FH);
  for(const p of parts){
    const m = p.mode;
    if(p.dying){ p.fade -= .03*dt; if(p.fade<=0){ p.fade=0; spawn(p, true); p.grow=true; } }
    else if(p.grow){ p.fade = Math.min(1, p.fade + .02*dt); if(p.fade>=1) p.grow=false; }
    const dx=p.x-mouse.x, dy=p.y-mouse.y, d2=dx*dx+dy*dy;
    if(d2<14400){ const f=(1-d2/14400)*.6, d=Math.sqrt(d2+1); p.x+=dx/d*f*dt*2; p.y+=dy/d*f*dt*2; }
    p.life += dt;
    if(m==='water') p.x += Math.sin(p.life*.04 + p.wob)*.4*dt;
    if(m==='grass' || m==='fairy' || m==='ghost'){ p.vy += Math.sin(p.life*.02)*.004; p.rot += p.vr*dt; }
    p.x += p.vx*dt; p.y += p.vy*dt;
    if(p.y < -20 || p.x > FW+20 || p.x < -30 || p.y > FH+30){ spawn(p,false); continue; }
    const a = p.fade;
    fctx.globalAlpha = a;
    if(m==='electric'){
      const fl = .5 + .5*Math.sin(p.life*.12 + p.x);
      fctx.globalAlpha = a*(.35+.55*fl); fctx.fillStyle = '#F4C430'; star4(p.x,p.y,p.r);
      fctx.fillStyle = '#fff'; star4(p.x,p.y,p.r*.45);
    } else if(m==='grass'){
      if(p.leaf){ fctx.save(); fctx.translate(p.x,p.y); fctx.rotate(p.rot); fctx.fillStyle = 'rgba(93,180,74,.6)'; fctx.beginPath(); fctx.ellipse(0,0,p.r,p.r*.45,0,0,6.28); fctx.fill(); fctx.restore(); }
      else { fctx.fillStyle = '#fff'; fctx.globalAlpha=a*.8; fctx.beginPath(); fctx.arc(p.x,p.y,p.r,0,6.28); fctx.fill(); }
    } else if(m==='water'){
      fctx.strokeStyle = 'rgba(63,143,224,.45)'; fctx.lineWidth=1.4;
      fctx.beginPath(); fctx.arc(p.x,p.y,p.r,0,6.28); fctx.stroke();
      fctx.fillStyle='rgba(255,255,255,.9)'; fctx.beginPath(); fctx.arc(p.x-p.r*.35,p.y-p.r*.35,p.r*.28,0,6.28); fctx.fill();
    } else if(m==='fire'){
      if(p.ash){ fctx.fillStyle='rgba(120,90,80,.35)'; fctx.fillRect(p.x,p.y,p.r,p.r); }
      else { const life = Math.max(0, 1 - (FH - p.y)/FH); fctx.fillStyle='#FF8A3D'; fctx.globalAlpha=a*(.25+.6*life); fctx.beginPath(); fctx.arc(p.x,p.y,p.r,0,6.28); fctx.fill(); }
    } else {
      fctx.save(); fctx.translate(p.x,p.y); fctx.rotate(p.rot); fctx.fillStyle = m==='ghost' ? 'rgba(123,98,201,.4)' : 'rgba(240,120,170,.5)';
      fctx.beginPath(); fctx.ellipse(0,0,p.r,p.r*.6,0,0,6.28); fctx.fill(); fctx.restore();
    }
  }
  fctx.globalAlpha = 1;
  if(!reduce) requestAnimationFrame(drawField);
}
requestAnimationFrame(drawField);

/* ================= HERO: partner + lightning ================= */
const scene = $('#scene'), sparkC = $('#sparks'), sctx = sparkC.getContext('2d'), partner = $('#partner');
let SW, SH, energy = .3, arcs = [], waves = [], heroVisible = true, nextArc = 0;
function sizeSparks(){ const r = sparkC.getBoundingClientRect(); SW=r.width; SH=r.height; sparkC.width=SW*DPR; sparkC.height=SH*DPR; sctx.setTransform(DPR,0,0,DPR,0,0); }
sizeSparks();
function bolt(x1,y1,x2,y2,disp,out){
  if(disp < 3){ out.push([x2,y2]); return; }
  const mx=(x1+x2)/2 + (Math.random()-.5)*disp, my=(y1+y2)/2 + (Math.random()-.5)*disp;
  bolt(x1,y1,mx,my,disp/2,out); bolt(mx,my,x2,y2,disp/2,out);
}
function partnerCenter(){ const s = scene.getBoundingClientRect(), p = partner.getBoundingClientRect(); return { x:p.left-s.left+p.width/2, y:p.top-s.top+p.height*.5, R:p.width*.36 }; }
function makeArc(){
  const {x:cx, y:cy, R} = partnerCenter();
  const a=Math.random()*6.28, len=R*(.35+Math.random()*.55);
  const x1=cx+Math.cos(a)*R, y1=cy+Math.sin(a)*R;
  const a2=a+(Math.random()-.5)*1.2;
  const x2=cx+Math.cos(a2)*(R+len), y2=cy+Math.sin(a2)*(R+len);
  const pts=[[x1,y1]]; bolt(x1,y1,x2,y2,len*.5,pts);
  arcs.push({ pts, life:1, w:1.6+Math.random()*1.6 });
}
function drawSparks(t){
  sctx.clearRect(0,0,SW,SH);
  if(heroVisible){
    if(t > nextArc){ makeArc(); if(Math.random()<energy) makeArc(); nextArc = t + (1700 - energy*1400)*(0.5+Math.random()); }
    energy = Math.max(.25, energy - .003);
  }
  for(let i=arcs.length-1;i>=0;i--){
    const a=arcs[i]; a.life -= .06;
    if(a.life<=0){ arcs.splice(i,1); continue; }
    sctx.globalAlpha = a.life; sctx.lineJoin='round';
    sctx.beginPath(); a.pts.forEach(([x,y],j)=> j? sctx.lineTo(x,y) : sctx.moveTo(x,y));
    sctx.strokeStyle = '#F4B400'; sctx.lineWidth = a.w+3; sctx.shadowColor = '#FFD84A'; sctx.shadowBlur = 14; sctx.stroke();
    sctx.strokeStyle = '#FFFBE0'; sctx.lineWidth = a.w; sctx.shadowBlur = 0; sctx.stroke();
  }
  const {x:cx, y:cy} = partnerCenter();
  for(let i=waves.length-1;i>=0;i--){
    const w=waves[i]; w.r += 3; w.life -= .025;
    if(w.life<=0){ waves.splice(i,1); continue; }
    sctx.strokeStyle = '#F4C430'; sctx.lineWidth=3; sctx.globalAlpha=w.life*.8;
    sctx.beginPath(); sctx.arc(cx,cy,w.r,0,6.28); sctx.stroke();
  }
  sctx.globalAlpha=1; sctx.shadowBlur=0;
  const pct = Math.round(energy*100);
  $('#energyVal').textContent = pct + '%'; $('#energyBar').style.width = pct + '%';
  if(!reduce) requestAnimationFrame(drawSparks);
}
if(!reduce) requestAnimationFrame(drawSparks);
scene.addEventListener('pointerenter', ()=>{ waves.push({r:partnerCenter().R,life:1}); energy=Math.min(1,energy+.2); });
partner.addEventListener('click', ()=>{
  const R = partnerCenter().R; waves.push({r:R*.6,life:1}); waves.push({r:R*.3,life:1});
  for(let i=0;i<5;i++) makeArc(); energy=1;
  hop(partner); playCry(25); $('#tapHint').classList.add('done');
});
$$('.mon-btn').forEach(b=>b.addEventListener('click', ()=>{ hop(b); playCry(+b.dataset.cry); }));

/* ================= POINTER ================= */
addEventListener('pointermove', e=>{
  if(e.pointerType !== 'mouse') return;
  const sp = Math.hypot(e.movementX||0, e.movementY||0);
  mouse.x=e.clientX; mouse.y=e.clientY;
  energy = Math.min(1, energy + sp*.0005);
}, {passive:true});
document.addEventListener('pointerleave', ()=>{ mouse.x=-9999; });
const companion = $('#companion'), compBody = $('#compBody'), compImg = $('#compImg');
const interactiveSel = 'a, button:not(.companion), .el, .card, input, textarea';
document.addEventListener('pointerover', e=>{ if(e.target.closest(interactiveSel)) companion.classList.add('excited'); });
document.addEventListener('pointerout', e=>{ if(e.target.closest(interactiveSel) && !e.relatedTarget?.closest?.(interactiveSel)) companion.classList.remove('excited'); });

const tcard = $('#tcard');
if(!touch && !reduce){
  tcard.addEventListener('pointermove', e=>{ const r=tcard.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; tcard.style.transform=`perspective(1200px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`; tcard.style.setProperty('--shine', (x+.5)*100+'%'); });
  tcard.addEventListener('pointerleave', ()=>{ tcard.style.transform=''; });
}
if(!touch && !reduce) $$('.magnetic').forEach(b=>{
  b.addEventListener('pointermove', e=>{ const r=b.getBoundingClientRect(); b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px, ${(e.clientY-r.top-r.height/2)*.3}px)`; });
  b.addEventListener('pointerleave', ()=>{ b.style.transform=''; });
});
$$('.panel').forEach(p=>p.addEventListener('pointermove', e=>{ const r=p.getBoundingClientRect(); p.style.setProperty('--mx', (e.clientX-r.left)+'px'); p.style.setProperty('--my', (e.clientY-r.top)+'px'); }));

/* ================= CARDS ================= */
let cardHover = null;
$$('.card').forEach(card=>{
  card.addEventListener('pointermove', e=>{
    if(touch || reduce) return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform = `rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
  });
  card.addEventListener('pointerenter', ()=>{
    cardHover = card; applyElement(card.dataset.el, +card.dataset.mon, pid(+card.dataset.id) + ' ' + PROJECTS.find(p=>p.id==card.dataset.id).name);
    if(reduce) return;
    const scr = card.querySelector('.card-screen');
    for(let i=0;i<10;i++){ const s=document.createElement('i'); s.className='burst'; const a=Math.random()*6.28, d=40+Math.random()*80; s.style.left='72%'; s.style.top='62%'; s.style.setProperty('--x', Math.cos(a)*d+'px'); s.style.setProperty('--y', Math.sin(a)*d+'px'); scr.appendChild(s); setTimeout(()=>s.remove(), 900); }
  });
  card.addEventListener('pointerleave', ()=>{ card.style.transform=''; cardHover=null; updateSection(true, true); });
  card.addEventListener('click', e=>openCase(+card.dataset.id, e));
});

/* ================= HABITATS ================= */
function activateHab(el){
  $$('.el').forEach(x=>{ const on = x===el; x.classList.toggle('active', on); x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
  applyElement(el.dataset.el, +el.dataset.mon, EL[el.dataset.el].name + ' habitat');
}
$$('.el').forEach(el=>{
  el.addEventListener('click', ()=>activateHab(el));
  el.addEventListener('pointerenter', ()=>{ if(!touch && innerWidth>1024) activateHab(el); });
  el.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ e.preventDefault(); activateHab(el); }
    if(e.key==='ArrowRight' || e.key==='ArrowLeft' || e.key==='ArrowDown' || e.key==='ArrowUp'){ e.preventDefault(); const all=$$('.el'); const i=all.indexOf(el); const n=all[(i + (e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1) + all.length)%all.length]; n.focus(); activateHab(n); }
  });
});
setInterval(()=>{
  const path = $('#habBolt path'); if(!path || reduce) return;
  const pts=[[50+Math.random()*20-10,0]]; bolt(pts[0][0],0,50+Math.random()*30-15,70,40,pts);
  path.setAttribute('d', 'M'+pts.map(p=>p.join(' ')).join(' L')); path.parentNode.style.opacity=1;
  setTimeout(()=>path.parentNode.style.opacity=0,140);
}, 2200);

/* ================= SECTION / ELEMENT SYSTEM ================= */
const sections = $$('main > section');
let curSec = null, curMon = 25, envTimer;
function applyElement(el, mon, envLabel){
  if(el) { document.documentElement.dataset.el = el; setMode(el); }
  if(mon && mon !== curMon){
    curMon = mon;
    companion.classList.add('swap');
    setTimeout(()=>{ compImg.dataset.anim = mon; fillImages(companion); companion.classList.remove('swap'); }, 300);
  }
  if(envLabel){ $('#compEnv').textContent = envLabel; companion.classList.add('announce'); clearTimeout(envTimer); envTimer = setTimeout(()=>companion.classList.remove('announce'), 1900); }
}
function updateSection(force, quiet){
  const mid = innerHeight*.45; let found = sections[0];
  for(const s of sections){ const r=s.getBoundingClientRect(); if(r.top<=mid && r.bottom>mid){ found=s; break; } }
  if(cardHover && !force) return;
  if(found !== curSec || force){
    const changed = found !== curSec;
    curSec = found;
    const activeHab = found.id==='elements' ? $('.el.active') : null;
    const el = activeHab ? activeHab.dataset.el : found.dataset.el;
    const mon = +(activeHab ? activeHab.dataset.mon : found.dataset.mon);
    applyElement(el, mon, changed && !quiet ? (activeHab ? EL[el].name + ' habitat' : found.dataset.env) : null);
    const navId = found.id==='elements' ? 'skills' : found.id==='catch' ? 'contact' : found.id==='scanner' ? 'projects' : found.id;
    $$('.nav-links a').forEach(a=>a.classList.toggle('active', a.dataset.sec===navId));
    moveNavPill();
  }
}
function moveNavPill(){
  const a = $('.nav-links a.active'), pill = $('#navPill'); if(!a || innerWidth<=900) return;
  pill.style.width = a.offsetWidth+'px'; pill.style.height = a.offsetHeight+'px';
  pill.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
}
companion.addEventListener('click', ()=>{ playCry(curMon > 10000 ? 6 : curMon); compBody.animate?.([{transform:'translateY(0)'},{transform:'translateY(-18px)'},{transform:'translateY(0)'}], {duration:450, easing:'ease-out'}); });

/* ================= SCROLL-DRIVEN ================= */
const nav = $('#nav'), route = $('#route'), routeFill = $('#routeFill'), stopEls = $$('.stop');
const expTrack = $('#expTrack'), expLine = $('#expLine'), miles = $$('.mile'), expMon = $('#expMon'), evoMsg = $('#evoMsg');
let curMile = 0, evoTimer;
function progress(el, start=.8, end=.3){ const r=el.getBoundingClientRect(); const a=innerHeight*start - r.top, b=r.height + innerHeight*(start-end); return Math.max(0, Math.min(1, a/b)); }
function evolveTo(idx){
  const prev = curMile; curMile = idx; const m = MILES[idx];
  $('#expRank').textContent = m.rank; $('#expYear').textContent = m.yr;
  $$('.evo', $('#evoChain')).forEach((e,i)=>{ e.classList.toggle('seen', i<=idx); e.classList.toggle('now', i===idx); });
  clearTimeout(evoTimer);
  const swap = () => { expMon.dataset.art = m.mon; expMon.src = art(m.mon); expMon.alt = MON_NAME[m.mon]; };
  if(idx > prev && !reduce){
    evoMsg.textContent = `What? ${MON_NAME[MILES[prev].mon]} is evolving!`; evoMsg.classList.add('show');
    expMon.classList.remove('evolving'); void expMon.offsetWidth; expMon.classList.add('evolving');
    evoTimer = setTimeout(()=>{ swap(); evoMsg.textContent = `It evolved into ${MON_NAME[m.mon]}!`;
      evoTimer = setTimeout(()=>{ evoMsg.classList.remove('show'); expMon.classList.remove('evolving'); }, 1500); }, 550);
  } else { swap(); evoMsg.classList.remove('show'); }
}
function onScroll(){
  nav.classList.toggle('scrolled', scrollY > 30);
  heroVisible = scrollY < innerHeight*1.1;
  updateSection();
  const jp = progress(route, .85, .5);
  routeFill.style.strokeDashoffset = 1 - jp;
  let xp = 0;
  stopEls.forEach((s,i)=>{
    const on = jp >= i/(STOPS.length-1) - .02;
    if(on && !s.classList.contains('unlocked')){ s.classList.add('unlocked','pop'); setTimeout(()=>s.classList.remove('pop'),700); }
    if(!on) s.classList.remove('unlocked');
    if(on) xp += STOPS[i].xp;
  });
  const total = STOPS.reduce((a,s)=>a+s.xp,0);
  $('#xpFill').style.width = (xp/total*100)+'%';
  $('#xpNow').textContent = xp.toLocaleString() + ' XP';
  $('#lvNum').textContent = Math.max(1, Math.round(xp/total*42));
  const ep = progress(expTrack, .6, .45);
  expLine.style.height = (ep*100)+'%';
  $('#expRing').style.strokeDashoffset = 1 - ep;
  $('#expBar').style.width = (ep*100)+'%';
  let idx = 0;
  miles.forEach((m,i)=>{ const on = m.getBoundingClientRect().top < innerHeight*.6; m.classList.toggle('on', on); if(on) idx=i; });
  if(idx !== curMile) evolveTo(idx);
}
addEventListener('scroll', onScroll, {passive:true});

const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('.skill', en.target).forEach((sk,k)=>{
      const v = +sk.dataset.v, bar = $('.stat i', sk), lvn = $('.lvn', sk);
      setTimeout(()=>{ bar.style.width = v+'%'; }, reduce? 0 : k*140);
      if(reduce){ lvn.textContent=v; return; }
      const st = performance.now() + k*140;
      (function tick(t){ const p=Math.max(0,Math.min(1,(t-st)/1100)); lvn.textContent=Math.round(v*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); })(st);
    });
    const rs = $('#radarShape', en.target); if(rs) rs.setAttribute('points', rs.dataset.full);
    io.unobserve(en.target);
  });
}, { threshold:.15 });
$$('.reveal').forEach(el=>io.observe(el));

/* ================= CASE STUDY ================= */
const caseEl = $('#case'), caseBody = $('#caseBody');
let lastFocus = null;
const CASE_SECTIONS = ['Overview','Problem','Solution','Architecture','Technologies','Results','Challenges','Learnings'];
function openCase(id, e){
  const p = PROJECTS.find(x=>x.id===id); const i = PROJECTS.indexOf(p); const next = PROJECTS[(i+1)%PROJECTS.length];
  if(!caseEl.classList.contains('open')) lastFocus = document.activeElement;
  if(e && e.clientX){ caseEl.style.setProperty('--cx', e.clientX+'px'); caseEl.style.setProperty('--cy', e.clientY+'px'); }
  caseEl.style.setProperty('--acc', EL[p.el].c);
  $('#caseNum').textContent = pid(p.id) + '  ' + p.name;
  $('#caseRail').innerHTML = CASE_SECTIONS.map((s,k)=>`<li><a href="#cs-${k}" data-k="${k}"><span>${String(k+1).padStart(2,'0')}</span>${s}</a></li>`).join('');
  const block = (k, inner) => `<section class="case-block" id="cs-${k}"><h2>${CASE_SECTIONS[k]}</h2>${inner}</section>`;
  const githubLink = p.stack.includes('IEEE') ? `<a class="btn ghost" href="https://github.com/itsharshi" rel="noopener" target="_blank">GitHub Profile</a>` : `<a class="btn ghost" href="https://github.com/itsharshi" rel="noopener" target="_blank">GitHub</a>`;
  caseBody.innerHTML = `
    ${typeBadge(p.el)}
    <h1 id="caseTitle" style="margin-top:20px">${p.name}</h1>
    <p class="case-lede">${p.desc}</p>
    <dl class="case-meta">
      <div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Year</dt><dd>${p.year}</dd></div>
      <div><dt>Type</dt><dd>${p.cat}</dd></div><div><dt>Status</dt><dd>${p.status}</dd></div>
    </dl>
    <div class="case-hero"><div class="card-art" style="background:${artFor(p)}"></div>
      ${mock(p)}
      <img class="card-mon" data-art="${p.mon}" alt="" width="475" height="475">
    </div>
    <div class="case-actions">
      ${githubLink}
    </div>
    ${block(0, `<p>${p.desc} I worked as ${p.role.toLowerCase()} on this project.</p>`)}
    ${block(1, `<p>${p.problem}</p>`)}
    ${block(2, `<p>${p.solution}</p>`)}
    ${block(3, `<div class="process">${[['Research','Literature review, data analysis and problem framing.'],['Design','Architecture decisions, model selection and pipeline design.'],['Build','Implementation, training, testing and iteration.'],['Deploy','Production deployment, monitoring and optimization.']].map((s,k)=>`<div><b>Step ${k+1}</b><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}</div>`)}
    ${block(4, `<div class="tags">${p.stack.map(s=>`<span class="tag" style="--pc:${EL[p.el].c};font-size:14px;padding:8px 14px">${s}</span>`).join('')}</div>`)}
    ${block(5, `<p>${p.results}</p>`)}
    ${block(6, `<p>${p.challenge}</p>`)}
    ${block(7, `<p>${p.learning}</p>`)}
    <button class="case-next" data-next="${next.id}"><img data-art="${next.mon}" alt=""><span class="grow"><small>Next entry ${pid(next.id)}</small><strong>${next.name}</strong></span><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`;
  fillImages(caseBody);
  $('.case-next', caseBody).addEventListener('click', ()=>{ caseEl.scrollTo({top:0}); openCase(next.id); });
  caseEl.scrollTop = 0;
  caseEl.classList.add('open'); document.body.classList.add('case-on');
  setTimeout(()=>$('#caseClose').focus(), 50);
  railObs();
}
function closeCase(){ caseEl.classList.remove('open'); document.body.classList.remove('case-on'); lastFocus && lastFocus.focus(); }
$('#caseClose').addEventListener('click', closeCase);
addEventListener('keydown', e=>{
  if(!caseEl.classList.contains('open')) return;
  if(e.key==='Escape') closeCase();
  if(e.key==='Tab'){ const f=$$('button, a[href], [tabindex]:not([tabindex="-1"])', caseEl).filter(x=>x.offsetParent); const first=f[0], last=f[f.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
});
$('#caseRail').addEventListener('click', e=>{ const a=e.target.closest('a'); if(!a) return; e.preventDefault(); const t=$('#cs-'+a.dataset.k); caseEl.scrollTo({ top: t.offsetTop - 100, behavior: reduce?'auto':'smooth' }); });
function railObs(){
  const blocks = $$('.case-block', caseEl);
  caseEl.onscroll = ()=>{ let k=0; blocks.forEach((b,i)=>{ if(b.getBoundingClientRect().top < innerHeight*.4) k=i; }); $$('#caseRail a').forEach(a=>a.classList.toggle('on', +a.dataset.k===k)); };
  caseEl.onscroll();
}

/* ================= CONTACT FORM ================= */
const form = $('#form');
form.addEventListener('submit', e=>{
  e.preventDefault(); let ok = true;
  const checks = [
    ['#fName', v=>v.trim().length>1, 'Enter your name so I know who to reply to.'],
    ['#fEmail', v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter an email like you@company.com.'],
    ['#fMsg', v=>v.trim().length>9, 'Add a few words about your project (10+ characters).']
  ];
  checks.forEach(([s,fn,msg])=>{ const inp=$(s), f=inp.closest('.field'), bad=!fn(inp.value); f.classList.toggle('invalid', bad); $('.err', f).textContent = bad? msg : ''; inp.setAttribute('aria-invalid', bad); if(bad && ok){ inp.focus(); ok=false; } });
  if(!ok) return;
  const body = encodeURIComponent(`${$('#fMsg').value}\n\n— ${$('#fName').value} (${$('#fEmail').value})`);
  location.href = `mailto:harshith9189@gmail.com?subject=${encodeURIComponent('New project from '+$('#fName').value)}&body=${body}`;
  form.classList.add('done');
});
$('#againBtn').addEventListener('click', ()=>{ form.reset(); form.classList.remove('done'); $('#fName').focus(); });

/* ================= CATCH GAME ================= */
const BOX_KEY = 'trainer-box';
let box = { total:0, mons:[] };
try{ const s = JSON.parse(localStorage.getItem(BOX_KEY)); if(s && Array.isArray(s.mons)) box = s; }catch(e){}
const arena = $('#arena'), wild = $('#wild'), wildImg = $('#wildImg'), thrown = $('#thrown'), catchStatus = $('#catchStatus'), throwBtn = $('#throwBtn');
let catching = false;
function renderBox(){
  $('#boxCount').textContent = box.total;
  if(!box.mons.length) return;
  $('#boxGrid').innerHTML = box.mons.slice(-12).reverse().map(m=>`<span class="slot" data-name="${m.name}"><img src="${anim(m.id)}" alt="${m.name}" onerror="this.onerror=null;this.src='${art(m.id)}'"></span>`).join('');
}
renderBox();
async function monName(id){
  try{
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const d = await r.json();
    return (d.names.find(n=>n.language.name==='en') || {}).name || d.name;
  }catch(e){ return 'Pokémon #' + id; }
}
function loadImg(img, id){
  return new Promise(res=>{
    img.onload = () => res(); img.onerror = () => { img.onerror = () => res(); img.src = art(id); };
    img.src = anim(id);
  });
}
throwBtn.addEventListener('click', async ()=>{
  if(catching) return; catching = true; throwBtn.disabled = true;
  wild.className = 'wild'; thrown.className = 'thrown'; $('#catchStars').classList.remove('go');
  const id = 1 + Math.floor(Math.random()*1025);
  catchStatus.textContent = 'The tall grass is rustling…';
  arena.classList.add('rustle');
  const [name] = await Promise.all([monName(id), loadImg(wildImg, id), wait(1100)]);
  arena.classList.remove('rustle');
  wildImg.alt = name;
  wild.classList.add('show');
  catchStatus.textContent = `A wild ${name} appeared!`;
  await wait(900);
  const a2 = arena.getBoundingClientRect(), t2 = thrown.getBoundingClientRect(), w2 = wild.getBoundingClientRect();
  thrown.style.setProperty('--tx', (w2.left + w2.width/2 - (t2.left + t2.width/2)) + 'px');
  thrown.style.setProperty('--ty', (w2.bottom - 26 - (t2.top + t2.height/2)) + 'px');
  catchStatus.textContent = 'Go! Poké Ball!';
  thrown.classList.add('fly');
  await wait(700);
  thrown.classList.remove('fly'); thrown.classList.add('land');
  wild.classList.add('absorb');
  await wait(450);
  thrown.classList.add('wobble'); catchStatus.textContent = '. . .';
  await wait(1850);
  thrown.classList.remove('wobble');
  if(Math.random() < .8){
    $('#catchStars').classList.add('go');
    catchStatus.textContent = `Gotcha! ${name} was caught!`;
    box.total++; box.mons.push({ id, name }); box.mons = box.mons.slice(-24);
    try{ localStorage.setItem(BOX_KEY, JSON.stringify(box)); }catch(e){}
    renderBox();
    await wait(900);
    thrown.className = 'thrown';
  } else {
    thrown.className = 'thrown';
    wild.classList.remove('absorb');
    catchStatus.textContent = `Oh no! ${name} broke free!`;
    await wait(1000);
    wild.classList.add('flee');
    catchStatus.textContent = `${name} fled back into the grass.`;
    await wait(700);
  }
  throwBtn.lastChild.textContent = 'Throw another';
  throwBtn.disabled = false; catching = false;
});

/* ================= NAV MOBILE ================= */
$('#menuBtn').addEventListener('click', ()=>{ const o = nav.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', o); $('#menuBtn').setAttribute('aria-label', o?'Close menu':'Open menu'); });
$$('.nav-links a').forEach(a=>a.addEventListener('click', ()=>{ nav.classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', false); }));

/* ================= INIT ================= */
addEventListener('resize', ()=>{ sizeField(); sizeSparks(); moveNavPill(); });
addEventListener('load', ()=>{ sizeSparks(); moveNavPill(); });
document.fonts?.ready.then(moveNavPill);
onScroll(); updateSection(true, true);
if(reduce){ drawField(performance.now()); }
