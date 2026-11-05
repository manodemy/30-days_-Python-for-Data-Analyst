(function(){
const root = document.getElementById('roadmap-root');
function getCourseSvg(phase) {
  if (phase === 'SQL') {
    return `<span class="tech-logo logo-sql" title="SQL"><svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg></span>`;
  } else if (phase === 'Excel') {
    return `<span class="tech-logo logo-excel" title="Excel"><svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg></span>`;
  } else if (phase === 'Python') {
    return `<span class="tech-logo logo-python" title="Python"><svg viewBox="45.9 0 367.2 459" fill="none"><path fill="#306998" d="M229.5 0C161.4 0 122.4 15.6 122.4 53.6v34.4h107.1v15.3H122.4c-47.8 0-76.5 30.6-76.5 76.5v61.2c0 45.9 28.7 76.5 76.5 76.5h30.6v-45.9c0-51 41.3-91.8 91.8-91.8h107.1V107.1c0-53.6-47.8-107.1-122.4-107.1zM175.9 30.6c8.4 0 15.3 6.9 15.3 15.3s-6.9 15.3-15.3 15.3-15.3-6.9-15.3-15.3 6.9-15.3 15.3-15.3z" /><path fill="#FFE873" d="M229.5 459c68.1 0 107.1-15.6 107.1-53.6v-34.4H229.5v-15.3h107.1c47.8 0 76.5-30.6 76.5-76.5v-61.2c0-45.9-28.7-76.5-76.5-76.5h-30.6v45.9c0 51-41.3 91.8-91.8 91.8H122.4V351.9c0 53.6 47.8 107.1 122.4 107.1zm53.6-30.6c-8.4 0-15.3-6.9-15.3-15.3s6.9-15.3 15.3-15.3 15.3 6.9 15.3 15.3-6.9 15.3-15.3 15.3z" /></svg></span>`;
  }
  return '';
}
const DATA=[
  // SQL Phase (Days 1–18)
  {topic:"Introduction to SQL & Databases",phase:"SQL",icon:"🗄️",free:true},
  {topic:"SELECT, DISTINCT & ORDER BY",phase:"SQL",icon:"💾",free:true},
  {topic:"Filtering Data: WHERE & LIKE",phase:"SQL",icon:"🔍",free:true},
  {topic:"Operators, Expressions & Math",phase:"SQL",icon:"⚙️",free:true},
  {topic:"Aggregate Functions: COUNT & SUM",phase:"SQL",icon:"📊",free:true},
  {topic:"GROUP BY & HAVING Clauses",phase:"SQL",icon:"🗃️",free:true},
  {topic:"Scalar & String Functions",phase:"SQL",icon:"🧵",free:true},
  {topic:"Date & Time Functions",phase:"SQL",icon:"📅",free:true},
  {topic:"CASE Expressions & Logic",phase:"SQL",icon:"🔀",free:true},
  {topic:"Joins Fundamentals: INNER & LEFT",phase:"SQL",icon:"🔗",free:true},
  {topic:"Advanced Joins & Self-Joins",phase:"SQL",icon:"🔄",free:true},
  {topic:"Set Operations: UNION & INTERSECT",phase:"SQL",icon:"⛔",free:true},
  {topic:"Subqueries & Correlated Queries",phase:"SQL",icon:"🧠",free:true},
  {topic:"Common Table Expressions (CTEs)",phase:"SQL",icon:"🏗️",free:true},
  {topic:"Window Functions: ROW_NUMBER & RANK",phase:"SQL",icon:"🔢",free:true},
  {topic:"Analytic Functions: LAG & LEAD",phase:"SQL",icon:"📈",free:true},
  {topic:"DDL, DML & Schema Design",phase:"SQL",icon:"🛠️",free:true},
  {topic:"Query Optimization & Capstone",phase:"SQL",icon:"🏆",free:true},

  // Excel Phase (Days 19–30)
  {topic:"Spreadsheet Basics & Formulas",phase:"Excel",icon:"📊",free:true},
  {topic:"Formatting, Sorting & Filtering",phase:"Excel",icon:"🎨",free:true},
  {topic:"Data Cleaning & Validation",phase:"Excel",icon:"🧹",free:true},
  {topic:"Excel Tables & Structured References",phase:"Excel",icon:"📋",free:true},
  {topic:"Logic Functions: IF, AND & OR",phase:"Excel",icon:"🔀",free:true},
  {topic:"Lookup Functions: XLOOKUP & INDEX",phase:"Excel",icon:"🔍",free:true},
  {topic:"Text Functions & Dynamic Arrays",phase:"Excel",icon:"🔤",free:true},
  {topic:"Date & Time Analytics",phase:"Excel",icon:"📅",free:true},
  {topic:"Conditional Aggregations: SUMIFS",phase:"Excel",icon:"📈",free:true},
  {topic:"PivotTables: Grouping & Slicers",phase:"Excel",icon:"🗂️",free:true},
  {topic:"Advanced PivotTables & Pivot Charts",phase:"Excel",icon:"📊",free:true},
  {topic:"What-If Analysis & Corporate Capstone",phase:"Excel",icon:"🏆",free:true},

  // Python Phase (Days 31–60)
  {topic:"Data Types & Memory",phase:"Python",icon:"🔢",free:true},
  {topic:"Operators & Expressions",phase:"Python",icon:"⚙️",free:true},
  {topic:"Strings & Text Processing",phase:"Python",icon:"🔤",free:true},
  {topic:"Lists & Sequence Operations",phase:"Python",icon:"📋",free:true},
  {topic:"Tuples & Immutability",phase:"Python",icon:"🔒",free:true},
  {topic:"Sets & Mathematical Operations",phase:"Python",icon:"⭕",free:true},
  {topic:"Dictionaries & Hash Tables",phase:"Python",icon:"📖",free:true},
  {topic:"Conditionals & Branching Logic",phase:"Python",icon:"🔀",free:true},
  {topic:"Loops & Iteration Mechanics",phase:"Python",icon:"🔁",free:true},
  {topic:"Functions, Scope & Lambdas",phase:"Python",icon:"📦",free:true},
  {topic:"List & Dict Comprehensions",phase:"Python",icon:"⚡",free:true},
  {topic:"Regular Expressions (Regex)",phase:"Python",icon:"🔍",free:true},
  {topic:"Error & Exception Handling",phase:"Python",icon:"🛡️",free:true},
  {topic:"File I/O: CSV & JSON Data",phase:"Python",icon:"📁",free:true},
  {topic:"Collections & Complexity",phase:"Python",icon:"⏱️",free:true},
  {topic:"NumPy Arrays & Vectorization",phase:"Python",icon:"🔢",free:true},
  {topic:"NumPy Indexing & Slicing",phase:"Python",icon:"📐",free:true},
  {topic:"Pandas Series & DataFrames",phase:"Python",icon:"🐼",free:true},
  {topic:"Pandas Filtering: loc & iloc",phase:"Python",icon:"🎯",free:true},
  {topic:"Data Cleaning & Missing Values",phase:"Python",icon:"🧹",free:true},
  {topic:"Data Transformation & Casting",phase:"Python",icon:"🔄",free:true},
  {topic:"Pandas GroupBy & Aggregations",phase:"Python",icon:"📊",free:true},
  {topic:"Merging & Joining DataFrames",phase:"Python",icon:"🔗",free:true},
  {topic:"Reshaping: Pivot & Melt",phase:"Python",icon:"🧱",free:true},
  {topic:"Time Series & Datetime Analytics",phase:"Python",icon:"⏰",free:true},
  {topic:"Data Viz with Matplotlib",phase:"Python",icon:"📈",free:true},
  {topic:"Statistical Charts with Seaborn",phase:"Python",icon:"🎨",free:true},
  {topic:"Scikit-Learn Preprocessing",phase:"Python",icon:"🤖",free:true},
  {topic:"Classification & Clustering",phase:"Python",icon:"🌲",free:true},
  {topic:"End-to-End Analytics Capstone",phase:"Python",icon:"🏆",free:true},
];

const PC={
  SQL:    {hex:0x2dd4a7,css:'#2dd4a7'},
  Excel:  {hex:0xf5a623,css:'#f5a623'},
  Python: {hex:0x38bdf8,css:'#38bdf8'},
};
const N=60;
const ORBIT_R=6.8;

function angForIndex(i){
  return -Math.PI/2 + (i/N)*Math.PI*2;
}

const wrap = root.querySelector('#rm-dialWrap');
const canvas = root.querySelector('#c3d');

let W = wrap.clientWidth || 320;
let H = Math.min(Math.round(W*0.68), 410);
canvas.width  = W * (window.devicePixelRatio||1);
canvas.height = H * (window.devicePixelRatio||1);
canvas.style.height = H + 'px';

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false});
renderer.setPixelRatio(window.devicePixelRatio||1);
renderer.setSize(W, H);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070b11);
scene.fog = new THREE.Fog(0x070b11, 34, 58);

const camera = new THREE.PerspectiveCamera(52, W/H, 0.1, 100);

let camAngle = 0;
let camAngleTarget = 0;
const camRadius = 1.5;
const camHeight = 16;
const camLookY  = 0;
let autoRotate = true;
const AUTO_ROTATE_SPEED = 0.035;
const AUTO_ROTATE_RANGE = 0.5;

function updateCameraPosition(){
  camera.position.set(
    Math.sin(camAngle)*camRadius,
    camHeight,
    Math.cos(camAngle)*camRadius
  );
  camera.lookAt(0, camLookY, 0.3);
}
updateCameraPosition();

const clockGroup = new THREE.Group();
clockGroup.rotation.x = 0;
clockGroup.position.y = 0;
scene.add(clockGroup);

scene.add(new THREE.AmbientLight(0x16263a, 3.5));
const ptCenter = new THREE.PointLight(0x2d6ecc, 5, 20);
ptCenter.position.set(0, 6, 0);
scene.add(ptCenter);
const sun = new THREE.DirectionalLight(0x88a4cc, 0.7);
sun.position.set(4, 18, 6);
sun.castShadow = true;
scene.add(sun);

const gMat = new THREE.MeshStandardMaterial({color:0x0a1018, metalness:0.9, roughness:0.15});
const ground = new THREE.Mesh(new THREE.CircleGeometry(24,128), gMat);
ground.rotation.x = -Math.PI/2;
ground.position.y = -0.1;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(28,70,0x16263a,0x0a121e);
grid.position.y = -0.08;
scene.add(grid);

const faceMat = new THREE.MeshStandardMaterial({color:0x0c1420, metalness:0.7, roughness:0.35});
const facePlate = new THREE.Mesh(new THREE.CylinderGeometry(ORBIT_R+0.55, ORBIT_R+0.55, 0.12, 96), faceMat);
facePlate.position.y = -0.06;
facePlate.receiveShadow = true;
clockGroup.add(facePlate);

const bezelMat = new THREE.MeshStandardMaterial({color:0x121f33, metalness:0.95, roughness:0.18});
const bezel = new THREE.Mesh(new THREE.TorusGeometry(ORBIT_R+0.55, 0.18, 16, 128), bezelMat);
bezel.rotation.x = Math.PI/2;
bezel.position.y = 0.0;
clockGroup.add(bezel);

// Tick marks
{
  const minuteTickMat = new THREE.MeshBasicMaterial({color:0x2c3f56});
  const hourTickMat = new THREE.MeshStandardMaterial({color:0xdcebf7, emissive:0x3a5a78, emissiveIntensity:0.6, metalness:0.4, roughness:0.3});
  for(let i=0;i<60;i++){
    const isHour = i%5===0;
    const a = angForIndex(i);
    const len = isHour ? 0.42 : 0.2;
    const w = isHour ? 0.07 : 0.035;
    const geo = new THREE.BoxGeometry(w, 0.08, len);
    const mesh = new THREE.Mesh(geo, isHour?hourTickMat:minuteTickMat);
    const r = ORBIT_R + 0.55 - len/2 - 0.06;
    mesh.position.set(Math.cos(a)*r, 0.04, Math.sin(a)*r);
    mesh.rotation.y = Math.PI/2 - a;
    clockGroup.add(mesh);
  }
}

// Day numerals
for(let i=0;i<60;i+=5){
  const label = String(i+1);
  const size = 256;
  const cnv2 = document.createElement('canvas');
  cnv2.width = size; cnv2.height = size;
  const ctx2 = cnv2.getContext('2d');
  ctx2.clearRect(0,0,size,size);
  ctx2.font = 'bold 120px Inter, system-ui, sans-serif';
  ctx2.fillStyle = '#e4f0fa';
  ctx2.textAlign = 'center';
  ctx2.textBaseline = 'middle';
  ctx2.shadowColor='rgba(56,189,248,0.85)';
  ctx2.shadowBlur=12;
  ctx2.fillText(label, size/2, size/2+4);
  const tex2 = new THREE.CanvasTexture(cnv2);
  tex2.minFilter = THREE.LinearFilter;
  tex2.generateMipmaps = false;
  tex2.needsUpdate = true;
  const mat2 = new THREE.SpriteMaterial({map:tex2, transparent:true, depthWrite:false});
  const sprite2 = new THREE.Sprite(mat2);
  sprite2.scale.set(0.95, 0.95, 1);
  const a = angForIndex(i);
  const r = ORBIT_R - 1.25;
  sprite2.position.set(Math.cos(a)*r, 0.5, Math.sin(a)*r);
  clockGroup.add(sprite2);
}

function phaseRange(ph){
  if(ph==='SQL') return {s:0,e:17};
  if(ph==='Excel') return {s:18,e:29};
  return {s:30,e:59};
}
const phaseTubes = {};
['SQL','Excel','Python'].forEach(ph=>{
  const {s,e} = phaseRange(ph);
  const pc = PC[ph];
  const pts=[];
  for(let i=s;i<=e;i+=0.25){
    const a=angForIndex(Math.min(i,e));
    pts.push(new THREE.Vector3(Math.cos(a)*ORBIT_R, 0.04, Math.sin(a)*ORBIT_R));
  }
  const curve=new THREE.CatmullRomCurve3(pts);
  const tubeGeo=new THREE.TubeGeometry(curve,Math.max(pts.length*2,8),0.08,12,false);
  const tubeMat=new THREE.MeshStandardMaterial({
    color:pc.hex, emissive:pc.hex, emissiveIntensity:1.8,
    metalness:0.1, roughness:0.05,
  });
  const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
  clockGroup.add(tubeMesh);
  phaseTubes[ph]=tubeMesh;

  const mid=Math.floor((s+e)/2);
  const ma=angForIndex(mid);
  const pl=new THREE.PointLight(pc.hex, 2.0, 12);
  pl.position.set(Math.cos(ma)*ORBIT_R, 1.5, Math.sin(ma)*ORBIT_R);
  clockGroup.add(pl);
});

const discMat=new THREE.MeshStandardMaterial({
  color:0x070d18, metalness:0.9, roughness:0.2, transparent:true, opacity:0.9,
});
const disc=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,0.08,64), discMat);
disc.position.y=0.04;
clockGroup.add(disc);

const holoRingMat=new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,opacity:0.5});
const holoRing=new THREE.Mesh(new THREE.TorusGeometry(2.18,0.03,8,64), holoRingMat);
holoRing.rotation.x=Math.PI/2;
holoRing.position.y=0.08;
clockGroup.add(holoRing);

const scanRingMat=new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,opacity:0.7});
const scanRing=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.025,8,64), scanRingMat);
scanRing.rotation.x=Math.PI/2;
clockGroup.add(scanRing);

const sphereGeo=new THREE.SphereGeometry(0.18,32,24);
const spheres=[], sphereMats=[], baseY=[];
const SPHERE_R = ORBIT_R - 0.15;
for(let i=0;i<N;i++){
  const d=DATA[i];
  const pc=PC[d.phase];
  const mat=new THREE.MeshPhysicalMaterial({
    color:pc.hex, emissive:pc.hex, emissiveIntensity:0.2,
    metalness:0.1, roughness:0.25,
    clearcoat:1.0, clearcoatRoughness:0.1,
    transparent:true, opacity:0.95,
  });
  sphereMats.push(mat);
  const mesh=new THREE.Mesh(sphereGeo, mat);
  const ang=angForIndex(i);
  const y=0.28;
  mesh.position.set(Math.cos(ang)*SPHERE_R, y, Math.sin(ang)*SPHERE_R);
  mesh.castShadow=true;
  mesh.userData={day:i,ang};
  clockGroup.add(mesh);
  spheres.push(mesh);
  baseY.push(y);
}

[0,17,29,59].forEach(idx=>{
  const d=DATA[idx];
  const pc=PC[d.phase];
  const mat=new THREE.MeshStandardMaterial({
    color:pc.hex, emissive:pc.hex, emissiveIntensity:2.5,
    metalness:0.3, roughness:0.1,
  });
  const halo=new THREE.Mesh(new THREE.TorusGeometry(0.34,0.045,16,64), mat);
  const ang=angForIndex(idx);
  halo.position.set(Math.cos(ang)*SPHERE_R, 0.30, Math.sin(ang)*SPHERE_R);
  halo.rotation.x=Math.PI/2;
  clockGroup.add(halo);
});

const actMat=new THREE.MeshPhysicalMaterial({
  color:0xffffff, emissive:0xffffff, emissiveIntensity:2.0,
  metalness:0, roughness:0.1, clearcoat:1.0,
  transparent:true, opacity:0.98,
});
const actSphere=new THREE.Mesh(new THREE.SphereGeometry(0.34,32,24), actMat);
actSphere.visible=false;
clockGroup.add(actSphere);
const actLight=new THREE.PointLight(0xffffff, 5, 6);
clockGroup.add(actLight);

const handGroup = new THREE.Group();
const handMat = new THREE.MeshStandardMaterial({color:0xffffff, emissive:0xffffff, emissiveIntensity:1.2, metalness:0.5, roughness:0.2});
const handGeo = new THREE.BoxGeometry(0.06, 0.08, SPHERE_R*0.92);
const hand = new THREE.Mesh(handGeo, handMat);
hand.position.z = SPHERE_R*0.46;
handGroup.add(hand);
const handTip = new THREE.Mesh(new THREE.ConeGeometry(0.1,0.28,16), handMat);
handTip.rotation.x = Math.PI/2;
handTip.position.z = SPHERE_R*0.92;
handGroup.add(handTip);
const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.12,24), handMat);
hub.rotation.x = Math.PI/2;
handGroup.add(hub);
handGroup.position.y = 0.35;
clockGroup.add(handGroup);

function pointHandAt(idx){
  const a = angForIndex(idx);
  handGroup.rotation.y = Math.PI/2 - a;
}

const PCOUNT=160;
const pGeo=new THREE.BufferGeometry();
const pPos=new Float32Array(PCOUNT*3);
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
const pMat=new THREE.PointsMaterial({
  color:0x38bdf8, size:0.12, transparent:true, opacity:0.9,
  blending:THREE.AdditiveBlending, depthWrite:false,
});
const pSystem=new THREE.Points(pGeo,pMat);
clockGroup.add(pSystem);
const pData=Array.from({length:PCOUNT},()=>({active:false,ang:0,r:0,y:0,dy:0,life:0,maxLife:0,trail:false}));

function burst(idx){
  const ang=angForIndex(idx);
  let n=0;
  pData.forEach(p=>{
    if(p.trail) return;
    if(n>=35||p.active) return;
    p.active=true; p.ang=ang+(Math.random()-.5)*0.5;
    p.r=SPHERE_R; p.y=0.3+Math.random()*0.4;
    p.dy=0.01+Math.random()*0.02;
    p.life=0; p.maxLife=35+Math.random()*25; n++;
  });
}

const TRAIL_COUNT=20;
for(let i=PCOUNT-TRAIL_COUNT;i<PCOUNT;i++){ pData[i].trail=true; }
let trailCursor=PCOUNT-TRAIL_COUNT;
let lastTrailEmit=0;

function emitTrail(idx,t){
  if(t-lastTrailEmit<0.05) return;
  lastTrailEmit=t;
  const sp=spheres[idx];
  const p=pData[trailCursor];
  p.active=true;
  p.ang=Math.atan2(sp.position.z,sp.position.x)+(Math.random()-.5)*0.06;
  p.r=SPHERE_R+(Math.random()-.5)*0.05;
  p.y=sp.position.y+(Math.random()-.5)*0.05;
  p.dy=-0.002-Math.random()*0.004;
  p.life=0; p.maxLife=22+Math.random()*10;
  trailCursor++;
  if(trailCursor>=PCOUNT) trailCursor=PCOUNT-TRAIL_COUNT;
}

function tickParticles(){
  pData.forEach((p,i)=>{
    if(!p.active){pPos[i*3]=9999;return;}
    p.life++;
    if(p.trail){ p.r+=0.004; p.y+=p.dy; }
    else { p.r+=0.05; p.y+=p.dy; }
    pPos[i*3]=Math.cos(p.ang)*p.r;
    pPos[i*3+1]=p.y;
    pPos[i*3+2]=Math.sin(p.ang)*p.r;
    if(p.life>=p.maxLife){p.active=false;pPos[i*3]=9999;}
  });
  pGeo.attributes.position.needsUpdate=true;
}

let currentDay=0, autoPlay=true, autoTimer=null, activeFilter=null;
const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2(-999,-999);
let hoveredDay=null;

const clockCenter3D = new THREE.Vector3(0, 0, 0);
const dayCard = root.querySelector('#rm-dayCard');
const activeNumEl = root.querySelector('#rm-activeNum');

function projectToScreen(vec3){
  const v = vec3.clone().project(camera);
  const r = canvas.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  return {
    x: (v.x * 0.5 + 0.5) * r.width + (r.left - wrapRect.left),
    y: (-v.y * 0.5 + 0.5) * r.height + (r.top - wrapRect.top),
  };
}

function updateCardPosition(){
  const p = projectToScreen(clockCenter3D);
  dayCard.style.left = p.x + 'px';
  dayCard.style.top  = p.y + 'px';
}

function updateActiveNumPosition(){
  const p = projectToScreen(actSphere.position);
  activeNumEl.style.left = p.x + 'px';
  activeNumEl.style.top  = p.y + 'px';
}

function updateHUD(idx){
  const d=DATA[idx];
  const pc=PC[d.phase];
  
  const statDay = root.querySelector('#rm-statDay');
  const statPct = root.querySelector('#rm-statPct');
  const headerGlow = root.querySelector('#rm-headerGlow');

  if (statDay) {
    statDay.textContent = `Day ${idx+1}`;
    statDay.style.color = pc.css;
    statDay.style.textShadow = `0 0 12px ${pc.css}60`;
  }
  if (statPct) {
    statPct.textContent = `${Math.round((idx+1)/N*100)}%`;
    statPct.style.color = pc.css;
    statPct.style.textShadow = `0 0 12px ${pc.css}60`;
  }
  if (headerGlow) {
    headerGlow.style.background = `linear-gradient(90deg, transparent, ${pc.css}, transparent)`;
  }

  const pillTitle = root.querySelector('#rm-cardPillTitle');
  if (pillTitle) {
    pillTitle.style.background = pc.css + '16'; // ~9% opacity themed background
    pillTitle.style.borderColor = pc.css + '40'; // 25% opacity themed border
    pillTitle.style.color = pc.css;
    pillTitle.style.boxShadow = `0 0 12px ${pc.css}10`;
  }

  const phaseGlow = root.querySelector('#rm-headerPhaseGlow');
  if (phaseGlow) {
    phaseGlow.style.background = `radial-gradient(circle, ${pc.css}16 0%, transparent 70%)`;
  }

  const cardDayEl = root.querySelector('#rm-cardDay');
  const cardIconEl = root.querySelector('#rm-cardIcon');
  const cardTopicEl = root.querySelector('#rm-cardTopic');
  const pill = root.querySelector('#rm-cardPill');
  const progBar = root.querySelector('#rm-cardProgBar');
  const progLabel = root.querySelector('#rm-cardProgLabel');

  if(idx === 59) {
    cardDayEl.textContent = "Day 60";
    cardIconEl.innerHTML = "🏆";
    cardTopicEl.textContent = d.topic;
    
    pill.textContent = "GRADUATION · CERTIFICATE";
    pill.style.color = "#f5a623";
    pill.style.borderColor = "#f5a62380";
    pill.style.background = "#f5a62322";
    
    progBar.style.width = "100%";
    progBar.style.background = "linear-gradient(90deg, #f5a623, #ffb020)";
    progLabel.textContent = "60 / 60";
  } else {
    cardDayEl.textContent = `Day ${idx+1}`;
    cardIconEl.innerHTML = getCourseSvg(d.phase);
    cardTopicEl.textContent = d.topic;
    
    pill.textContent = `${d.phase} · ${d.free?'FREE':'PREMIUM'}`;
    pill.style.color = pc.css;
    pill.style.borderColor = pc.css+'80';
    pill.style.background = pc.css+'22';
    
    const pct = ((idx+1)/N*100).toFixed(1);
    progBar.style.width = pct+'%';
    progBar.style.background = `linear-gradient(90deg, var(--sql), var(--py))`;
    progLabel.textContent = `${idx+1} / ${N}`;
  }

  activeNumEl.textContent = idx+1;
  activeNumEl.style.background = pc.css;
  activeNumEl.style.boxShadow = `0 0 12px ${pc.css}, 0 0 4px ${pc.css}`;
}

function setDay(i, doBurst=true, isUserGesture=false){
  currentDay=((i%N)+N)%N;
  if(doBurst && clockInViewport) {
    playMechanicalTick(isUserGesture);
  }
  updateHUD(currentDay);
  if(doBurst) {
    burst(currentDay);
    if(currentDay === 59) {
      setTimeout(() => burst(0), 150);
      setTimeout(() => burst(18), 300);
      setTimeout(() => burst(30), 450);
    }
  }
  actMat.color.setHex(PC[DATA[currentDay].phase].hex);
  actMat.emissive.setHex(PC[DATA[currentDay].phase].hex);
  actLight.color.setHex(PC[DATA[currentDay].phase].hex);
  pointHandAt(currentDay);
}

function advanceDay() {
  if (currentDay === 59) {
    setDay(0);
    clearInterval(autoTimer);
    autoTimer = setInterval(advanceDay, 1000);
  } else {
    const next = currentDay + 1;
    setDay(next);
    if (next === 59) {
      clearInterval(autoTimer);
      autoTimer = setInterval(advanceDay, 3200);
    }
  }
}

function startAuto(){
  clearInterval(autoTimer);
  const delay = currentDay === 59 ? 3200 : 1000;
  autoTimer = setInterval(advanceDay, delay);
}

function stopAuto(){ clearInterval(autoTimer); }
function stopAutoUI(){ stopAuto(); autoPlay=false; root.querySelector('#btnAuto').innerHTML='▶ &nbsp;Auto-play'; }

root.querySelector('#btnNext').onclick=()=>{stopAutoUI();unlockAudio();setDay(currentDay+1, true, true);};
root.querySelector('#btnPrev').onclick=()=>{stopAutoUI();unlockAudio();setDay(currentDay-1, true, true);};
root.querySelector('#btnAuto').onclick=()=>{
  unlockAudio();
  autoPlay=!autoPlay;
  root.querySelector('#btnAuto').innerHTML=autoPlay?'⏸ &nbsp;Auto-play':'▶ &nbsp;Auto-play';
  if(autoPlay) startAuto(); else stopAuto();
};
const btnVol = root.querySelector('#btnVolume');
if (btnVol) {
  btnVol.onclick = (e) => {
    e.stopPropagation();
    if (!audioCtx) {
      unlockAudio();
      soundEnabled = true;
    } else if (audioCtx.state === 'suspended') {
      unlockAudio();
      soundEnabled = true;
    } else {
      soundEnabled = !soundEnabled;
      if (soundEnabled && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }
    updateVolumeUI();
    if (soundEnabled) {
      playMechanicalTick(true);
    }
  };
}

function applyFilter(phase){
  activeFilter = (activeFilter===phase) ? null : phase;
  root.querySelectorAll('.rm-legendBtn').forEach(b=>{
    b.setAttribute('data-active', b.getAttribute('data-phase')===activeFilter ? 'true':'false');
  });
  spheres.forEach((s,i)=>{
    const dim = activeFilter && DATA[i].phase!==activeFilter;
    sphereMats[i].opacity = dim ? 0.25 : 0.95;
  });
  Object.entries(phaseTubes).forEach(([ph,mesh])=>{
    const dim = activeFilter && ph!==activeFilter;
    mesh.material.emissiveIntensity = dim ? 0.4 : 1.8;
    mesh.material.opacity = dim?0.4:1; mesh.material.transparent = !!dim;
  });
}
root.querySelectorAll('.rm-legendBtn').forEach(btn=>{
  btn.addEventListener('click', () => {
    const phase = btn.getAttribute('data-phase');
    if (window.ManodemyRoadmap && window.ManodemyRoadmap.jumpToPhase) {
      window.ManodemyRoadmap.jumpToPhase(phase);
    } else {
      applyFilter(phase);
    }
  });
});

function setMouseFromEvent(e){
  const r=canvas.getBoundingClientRect();
  const cx=(e.touches?e.touches[0].clientX:e.clientX);
  const cy=(e.touches?e.touches[0].clientY:e.clientY);
  mouse.x=((cx-r.left)/r.width)*2-1;
  mouse.y=-((cy-r.top)/r.height)*2+1;
}

canvas.addEventListener('mousemove',e=>{
  setMouseFromEvent(e);
});
canvas.addEventListener('mouseleave',()=>{mouse.set(-999,-999);hoveredDay=null;});

canvas.addEventListener('click',()=>{
  if(hoveredDay!=null){
    stopAutoUI();
    unlockAudio();
    setDay(hoveredDay, true, true);
  }
});

canvas.addEventListener('touchstart',e=>{
  setMouseFromEvent(e);
},{passive:true});
canvas.addEventListener('touchmove',e=>{
  setMouseFromEvent(e);
},{passive:true});
canvas.addEventListener('touchend',()=>{
  if(hoveredDay!=null){
    stopAutoUI();
    unlockAudio();
    setDay(hoveredDay, true, true);
  }
  mouse.set(-999,-999); hoveredDay=null;
});

function handleResize(){
  W = wrap.clientWidth || 320;
  H = Math.min(Math.round(W*0.68), 410);
  renderer.setSize(W, H);
  canvas.style.height = H + 'px';
  camera.aspect = W/H;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', handleResize);
if(window.ResizeObserver){
  new ResizeObserver(handleResize).observe(wrap);
}

const clock3=new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const t=clock3.getElapsedTime();
  const dt=clock3.getDelta();

  if(autoRotate) camAngleTarget = Math.sin(t*AUTO_ROTATE_SPEED)*AUTO_ROTATE_RANGE;
  camAngle += (camAngleTarget-camAngle)*Math.min(1, dt*4);
  updateCameraPosition();
  updateCardPosition();

  scanRing.position.y=0.25+Math.sin(t*0.9)*0.8+0.8;
  scanRingMat.opacity=0.45+0.35*Math.sin(t*2.2);

  holoRingMat.opacity=0.4+0.2*Math.sin(t*3.1);
  ptCenter.intensity=4+Math.sin(t*1.4)*1.2;

  raycaster.setFromCamera(mouse, camera);
  const hits=raycaster.intersectObjects(spheres);
  hoveredDay=hits.length>0?hits[0].object.userData.day:null;
  canvas.style.cursor = (hoveredDay!=null) ? 'pointer' : 'default';

  spheres.forEach((s,i)=>{
    const mat=sphereMats[i];
    const isAct=i===currentDay, isHov=i===hoveredDay, isPast=i<currentDay;
    const by=baseY[i];
    const dim = activeFilter && DATA[i].phase!==activeFilter;
    if(isAct){
      mat.emissiveIntensity=0.95+Math.sin(t*3)*0.25;
      s.scale.setScalar(2.0+Math.sin(t*3)*0.07);
      s.position.y = by + 0.32 + Math.sin(t*1.6)*0.02;
    } else if(isHov){
      mat.emissiveIntensity=0.65; s.scale.setScalar(1.5);
      s.position.y = by + 0.08;
    } else if(isPast){
      mat.emissiveIntensity=dim?0.1:0.3; s.scale.setScalar(1.0);
      s.position.y = by;
    } else {
      mat.emissiveIntensity=dim?0.02:0.06; s.scale.setScalar(0.78);
      s.position.y = by;
    }
  });

  const sp=spheres[currentDay];
  actSphere.position.copy(sp.position);
  actSphere.scale.setScalar(sp.scale.x);
  actSphere.visible=true;
  actLight.position.copy(sp.position).y+=0.5;
  updateActiveNumPosition();

  emitTrail(currentDay, t);
  tickParticles();
  renderer.render(scene, camera);
}

  // ── MECHANICAL TICK SYNTHESIZER (DISABLED TO PREVENT NARRATION INTERFERENCE) ─────────────
  let audioCtx = null;
  let compressor = null;
  let clockInViewport = false;
  let noiseBuffer = null;
  let soundEnabled = false; // Disabled by default

  function updateVolumeUI() {
    const btn = root.querySelector('#btnVolume');
    if (btn) btn.style.display = 'none';
  }

  function getNoiseBuffer() {
    return null;
  }

  function playMechanicalTick(isUserGesture = false) {
    return;
  }

  function unlockAudio() {
    return;
  }

  // Clock Viewport Visibility Observer
  if (window.IntersectionObserver && wrap) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        clockInViewport = entry.isIntersecting;
      });
    }, { threshold: 0.15 });
    observer.observe(wrap);
  } else {
    clockInViewport = true;
  }

setDay(0,false);
updateHUD(0);
updateVolumeUI();
startAuto();
animate();
root.classList.add('loaded');

// Global API for narration speech sync & manual browse mode
window.ManodemyRoadmap = {
  setDay: function(i, doBurst=true, isUserGesture=false) {
    setDay(i, doBurst, isUserGesture);
  },
  jumpToPhase: function(phase) {
    var dayIdx = 0;
    if (phase === 'SQL') dayIdx = 0;
    else if (phase === 'Excel') dayIdx = 18;
    else if (phase === 'Python') dayIdx = 30;
    
    applyFilter(phase);
    setDay(dayIdx, true, false);
    if (!autoPlay) {
      autoPlay = true;
      var autoBtn = root.querySelector('#btnAuto');
      if (autoBtn) autoBtn.innerHTML = '⏸ &nbsp;Auto-play';
    }
    startAuto();
  }
};
})();
