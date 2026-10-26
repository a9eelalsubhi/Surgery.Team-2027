// A continuous surgical thread joins seventeen original, topic-specific background drawings.
// All geometry is decorative; it carries no clinical or quantitative information.
const svg=(body)=>`<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">${body}</svg>`;
const seam=(x,y,rotation=0)=>`<g transform="translate(${x} ${y}) rotate(${rotation})"><path class="bg-structure" d="M-60 0H590"/><g class="bg-stitches">${Array.from({length:7},(_,i)=>`<path d="m${i*72} -28 34 56m-34-56q-18 26 34 56"/>`).join('')}</g><path class="bg-flow" d="M-40 0H580"/></g>`;
const paper=(x,y,r)=>`<g class="bg-paper" transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0h290l45 45v350H0Z"/><path d="M290 0v45h45M45 82h180M45 115h215M45 150h170M45 200h215M45 235h190M45 270h215M45 305h140"/><path class="bg-secondary" d="M45 350h215"/></g>`;
const motifs={
 hubExplore:svg(`<g class="bg-fine"><circle cx="200" cy="600" r="230"/><circle cx="200" cy="600" r="180"/><path d="M200 300v600M-100 600h600m-170-130-260 260m260 0L70 470M1370 50v200h200"/></g><path class="bg-flow" d="M-30 650h450q150 0 150-150V200h1000"/>`),
 hub:svg(`<g class="bg-fine"><rect x="-70" y="100" width="460" height="320" rx="20"/><path d="M-70 145h460M-30 120h8m12 0h8m12 0h8M1400 50v260h170"/><rect x="120" y="490" width="390" height="270" rx="15"/><path d="M120 530h390M-30 810h1600"/></g><g class="bg-flow-group">${[0,1,2,3,4].map(i=>`<path class="${i%2?'bg-secondary':'bg-structure'}" d="M-40 ${480+i*55}h${500+i*60}q100 0 100-100v-160q0-100 100-100h850"/>`).join('')}</g>`),
 intro:svg(`<g class="bg-fine"><path d="M40 150 500 82l135 560L175 710Z"/><path d="M61 171 487 108l119 508-422 66Z"/></g>${seam(45,710,-12)}<path class="bg-needle bg-float" d="M1320 35c-110 0-145 130-70 175 45 28 100-10 105-55l-18 12m18-12-13-13"/><path class="bg-secondary" d="M1330 40h190v170"/>`),
 team:svg(`<g class="bg-flow-group">${[110,180,250,320].map((y,i)=>`<path class="${i%2?'bg-secondary':'bg-structure'}" d="M-80 ${y}H${180+i*35}Q${340+i*20} ${y} ${410+i*20} 405T900 840"/>`).join('')}</g><path class="bg-fine" d="M1130 30h375v350m-350-325h325v310"/>${seam(1070,805,0)}`),
 experience:svg(`<g class="bg-fine"><path d="M-30 730h230V620h270V505h270V390h270V275h410"/><path d="M-30 765h265V655h270V540h270V425h270V310h375"/></g><path class="bg-flow" d="M-30 730h230V620h270V505h270V390h270V275h410"/><g class="bg-secondary"><path d="M160 670v-30m270-85v-30m270-85v-30m270-85v-30"/></g>`),
 agenda:svg(`<g class="bg-fine"><path d="M-30 120H1630M-30 153H1630M-30 747H1630M-30 780H1630"/>${Array.from({length:29},(_,i)=>`<path d="M${i*60} 120v${i%4?14:25}M${i*60} 780v-${i%4?14:25}"/>`).join('')}</g><path class="bg-flow" d="M1600 147H0"/><path class="bg-secondary" d="M0 755H1600"/>`),
 academic:svg(`${paper(-120,170,-13)}${paper(140,110,9)}<path class="bg-flow" d="M20 770h450c120 0 100-135 210-135h145"/><g class="bg-secondary"><path d="M1295 40h200v105M1330 65h140v55"/></g>`),
 skills:svg(`${seam(-90,330,28)}${seam(1210,775,-12)}<g class="bg-needle bg-float"><path d="M275 65c-105 8-176 87-145 152 24 51 119 57 159-12l-21 6m21-6-1 22"/><path class="bg-secondary" d="M143 171c21 123 194 161 161 261S119 525 44 648"/></g>`),
 ai:svg(`<g class="bg-circuit"><path d="M-30 130h230l80 80v180l100 100H560M-30 190h180l70 70v170l100 100h240M-30 250h120l70 70v180l80 80h320M-30 310h60l70 70v180l60 60h400"/><path d="M1440 0v150l-70 70v170m130-390v180l-70 70v140"/><rect x="550" y="475" width="26" height="26"/><rect x="550" y="517" width="26" height="26"/><rect x="550" y="567" width="26" height="26"/><rect x="550" y="607" width="26" height="26"/></g><path class="bg-flow" d="M-30 190h180l70 70v170l100 100h240"/><g class="bg-secondary"><path d="M70 780h265v-110h145m920 110h130V520"/></g>`),
 shadow:svg(`<g class="bg-fine"><path d="M-50 75h200v180h170v190h190v230h180M-50 105h170v180h170v190h190v230h210"/><path d="M1330 65v170h210M1370 65v130h170"/></g><g class="bg-scalpel-outline bg-float" transform="translate(100 360) rotate(-24)"><path d="M0 90 345 52l50 32L40 139Z"/><path d="m345 52 132-15q46-4 64 3c-31 35-88 47-146 44Z"/><path d="m60 100 250-29m-240 45 250-29"/></g>`),
 visit:svg(`<g class="bg-door"><path d="M-80 830V110h480v720M-20 830V160h360v670M55 830V225h210v605M120 830V290h85v540"/><path class="bg-secondary" d="M-80 830H660M-10 830l300-150 330 150M340 160l-75 65M400 110l-60 50"/></g><path class="bg-flow" d="M-20 830V160h360v670"/><path class="bg-fine" d="M1420 20v260h220"/>`),
 robot:svg(`<g class="bg-joint" transform="translate(220 610)"><circle r="155"/><circle r="118"/><path d="M-200 0h400M0-200v400M-110-110l220 220M-110 110l220-220"/><g class="bg-turn"><path class="bg-secondary" d="M-155 0A155 155 0 0 1 0-155M155 0A155 155 0 0 1 0 155"/></g></g><g class="bg-fine"><path d="m220 610 230-190-90-235 145-100m-285 525 260-175-88-253 145-100"/><circle cx="450" cy="420" r="45"/><circle cx="360" cy="185" r="30"/></g><path class="bg-flow" d="m220 610 230-190-90-235 145-100"/>`),
 collaboration:svg(`<g class="bg-flow-group">${[110,180,250,320].map((y,i)=>`<path class="${i%2?'bg-secondary':'bg-structure'}" d="M-80 ${y}H${150+i*45}Q400 ${y} 400 460Q400 650 650 650H1550"/>`).join('')}</g><path class="bg-fine" d="M80 820h1440M1250 45h245v300"/>`),
 execution:svg(`<g class="bg-fine">${[0,1,2,3].map(i=>`<path d="M${i*390-30} 750h300V${650-i*145}h90"/>`).join('')}<path d="M-20 805H1590M-20 825H1590"/></g><path class="bg-flow" d="M-20 750h290V650h390V505h390V360h390V215h180"/><g class="bg-secondary"><path d="M50 75h360m-330 25h300"/></g>`),
 operations:svg(`<g class="bg-fine"><rect x="-80" y="130" width="400" height="260" rx="14"/><rect x="50" y="330" width="400" height="260" rx="14"/><rect x="180" y="530" width="400" height="260" rx="14"/><path d="M-80 175h400M50 375h400M180 575h400"/><path d="M1360-20v250h200v300h-170v240"/></g><path class="bg-flow" d="M0 440h105v200h130v200h130"/><g class="bg-secondary"><path d="M1420 80h125m-125 25h85"/></g>`),
 resources:svg(`<g class="bg-fine"><path d="M-60 160h450l60 60-60 60H-60M-60 330h360l60 60-60 60H-60M-60 500h270l60 60-60 60H-60"/><path d="M1290 30v720h300m-270-690v660h270"/></g><path class="bg-flow" d="M-60 160h450l60 60-60 60H-60"/><path class="bg-secondary" d="M-60 500h270l60 60-60 60H-60"/>`),
 impact:svg(`<g class="bg-fine"><path d="M0 590h190l45-40 55 100 65-190 60 170 45-40h1140M0 640h155M490 640h1110"/>${paper(-60,80,-12)}</g><path class="bg-flow" d="M0 590h190l45-40 55 100 65-190 60 170 45-40h1140"/><path class="bg-secondary" d="M1200 790h330V530"/>`),
 close:svg(`<path class="bg-needle bg-float" d="M-40 580C40 200 550 100 570 380s-490 240-400 20c70-170 370 250 550 350s430-70 480-195"/>${seam(1020,820,-5)}<g class="bg-fine"><path d="M1420 20h100v280M1390 20h100v250"/></g>`)
};
const palettes={hubExplore:['#59bcb3','#aa94dd'],hub:['#b0284d','#a894dc'],intro:['#bb153e','#e93d45'],team:['#ad1234','#56bcb3'],experience:['#b31b38','#e6b954'],agenda:['#b31639','#da4448'],academic:['#4fbfb4','#b52646'],skills:['#d1364c','#e2af5c'],ai:['#a390e4','#50bfb7'],shadow:['#b72a42','#d5a04d'],visit:['#53ba93','#b51d39'],robot:['#67a6e5','#c82143'],collaboration:['#55b8b2','#bf2142'],execution:['#c42542','#e3b451'],operations:['#57b9b0','#c62143'],resources:['#bb2941','#e3b655'],impact:['#ca304e','#5fc3af'],close:['#ba1b3e','#e3484e']};
// Same count of control anchors: every background can continue from the preceding route.
const routes={
 hubExplore:[[1660,790],[1430,730],[1240,810],[1030,770],[810,820],[610,740],[410,800],[190,720],[-50,780]],
 hub:[[1660,140],[1430,100],[1240,160],[1030,90],[810,150],[610,110],[410,180],[190,90],[-50,180]],
 intro:[[1660,110],[1430,95],[1250,40],[990,80],[860,140],[675,105],[410,65],[160,150],[-50,310]],
 team:[[1660,180],[1420,150],[1220,70],[1010,95],[815,200],[620,220],[410,100],[170,160],[-50,350]],
 experience:[[1660,250],[1430,230],[1250,150],[1030,210],[820,150],[600,220],[415,300],[170,250],[-50,440]],
 agenda:[[1660,100],[1430,100],[1230,100],[1020,100],[800,100],[590,100],[390,100],[180,100],[-50,100]],
 academic:[[1660,140],[1420,90],[1230,50],[1020,85],[830,180],[600,240],[410,230],[180,145],[-50,180]],
 skills:[[1660,720],[1420,760],[1250,820],[1020,750],[800,780],[610,730],[430,770],[180,680],[-50,650]],
 ai:[[1660,110],[1460,150],[1270,70],[1060,90],[830,165],[600,130],[420,90],[190,160],[-50,100]],
 shadow:[[1660,760],[1420,790],[1260,750],[1040,820],[815,770],[610,700],[430,740],[190,770],[-50,690]],
 visit:[[1660,100],[1440,70],[1250,115],[1040,60],[800,150],[600,110],[400,50],[170,150],[-50,90]],
 robot:[[1660,780],[1420,750],[1230,830],[1040,790],[800,820],[610,750],[420,720],[190,760],[-50,690]],
 collaboration:[[1660,90],[1450,70],[1250,125],[1030,95],[800,140],[600,210],[410,120],[190,95],[-50,180]],
 execution:[[1660,800],[1430,800],[1230,780],[1030,820],[800,770],[600,815],[420,770],[190,750],[-50,810]],
 operations:[[1660,95],[1440,60],[1240,120],[1030,90],[800,145],[600,95],[400,150],[190,70],[-50,140]],
 resources:[[1660,800],[1430,760],[1240,820],[1040,780],[800,825],[600,780],[410,810],[190,750],[-50,780]],
 impact:[[1660,105],[1430,75],[1220,130],[1020,65],[800,140],[600,85],[410,145],[180,65],[-50,100]],
 close:[[1660,780],[1420,805],[1220,740],[1010,780],[800,820],[600,740],[390,790],[180,710],[-50,755]]
};
motifs.studentJourney=motifs.experience;motifs.studentOutcomes=motifs.impact;palettes.studentJourney=['#b37478','#d9b77b'];palettes.studentOutcomes=['#61aba9','#b68ac0'];routes.studentJourney=routes.experience;routes.studentOutcomes=routes.impact;
motifs.campaignTimeline=motifs.agenda;motifs.campaignOverview=motifs.academic;palettes.campaignTimeline=['#ab5168','#ae87a3'];palettes.campaignOverview=['#8a3d53','#709f9a'];routes.campaignTimeline=routes.agenda;routes.campaignOverview=routes.academic;
// Quiet edge contours frame the opening wordmark without crossing its lettering.
motifs.intro=svg(`<g class="intro-orbit-lines"><path d="M-170 620C65 395 300 560 250 775S-40 1010-160 925"/><path d="M-190 657C48 438 264 579 220 781S-56 978-174 902"/><path d="M-210 694C34 481 228 598 190 787S-72 946-188 879"/></g><g class="intro-orbit-lines intro-orbit-right"><path d="M1190-90C1340 20 1240 190 1420 243S1680 126 1740 80"/><path d="M1225-114C1375-4 1275 166 1455 219S1715 102 1775 56"/></g><path class="intro-orbit-dashes" d="M-40 760C40 580 170 580 242 637M1400 80C1310 145 1390 253 1630 228"/><g class="intro-orbit-points"><circle cx="242" cy="637" r="4"/><circle cx="1400" cy="80" r="3"/><path d="M100 390v16m-8-8h16M1450 460v12m-6-6h12"/></g>`);
motifs.intro=motifs.intro.replace('xMidYMid slice','none');
const smoothPath=points=>{
 let d=`M${points[0][0]} ${points[0][1]}`;
 for(let i=0;i<points.length-1;i++){const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],e=points[Math.min(points.length-1,i+2)];d+=` C${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6} ${c[1]-(e[1]-b[1])/6} ${c[0]} ${c[1]}`;}return d;
};
let activePoints=null,morphFrame=0,activeSlot=0,backgroundEpoch=0,bridgeEpoch=0;
function ensureBackground(){
 let root=document.getElementById('scene-atmosphere');if(root)return root;
 root=document.createElement('div');root.id='scene-atmosphere';root.setAttribute('aria-hidden','true');
 root.innerHTML=`<div class="atmosphere-wash"></div><div class="atmosphere-slot"></div><div class="atmosphere-slot"></div><svg class="atmosphere-thread" viewBox="0 0 1600 900" preserveAspectRatio="none"><defs><linearGradient id="thread-colors"><stop stop-color="var(--scene-secondary)"/><stop offset=".45" stop-color="var(--scene-tone)"/><stop offset="1" stop-color="#cc2543"/></linearGradient><path id="continuous-thread"/></defs><use class="thread-light" href="#continuous-thread"/><use class="thread-run" href="#continuous-thread"/></svg><div class="atmosphere-corner"><i></i><i></i><i></i></div>`;
 document.body.prepend(root);root.classList.toggle('is-paused',document.hidden);document.addEventListener('visibilitychange',()=>root.classList.toggle('is-paused',document.hidden));return root;
}
export function setAtmosphere(pageId,index,reduced=false,animate=true){
 const root=ensureBackground(),epoch=++backgroundEpoch;const palette=palettes[pageId]||palettes.intro;
 root.dataset.scene=pageId;root.style.setProperty('--scene-tone',palette[0]);root.style.setProperty('--scene-secondary',palette[1]);
 document.body.dataset.atmosphere=pageId;
 const slots=root.querySelectorAll('.atmosphere-slot');const nextSlot=1-activeSlot;const slot=slots[nextSlot];
 slot.innerHTML=motifs[pageId]||motifs.intro;slot.dataset.motif=pageId;slot.style.setProperty('--motif-tone',palette[0]);slot.style.setProperty('--motif-secondary',palette[1]);
 slots[activeSlot].classList.remove('is-current');slot.classList.add('is-current');activeSlot=nextSlot;
 root.dataset.phase=String(index%4);
 const target=routes[pageId]||routes.intro,from=activePoints||target;cancelAnimationFrame(morphFrame);
 const path=root.querySelector('#continuous-thread');
 if(reduced||!animate||!activePoints){activePoints=target.map(p=>p.slice());path.setAttribute('d',smoothPath(activePoints));}
 else{const start=performance.now();const tick=now=>{if(epoch!==backgroundEpoch)return;const t=Math.min(1,(now-start)/850),ease=1-Math.pow(1-t,3);activePoints=target.map((p,i)=>p.map((v,k)=>from[i][k]+(v-from[i][k])*ease));path.setAttribute('d',smoothPath(activePoints));if(t<1)morphFrame=requestAnimationFrame(tick);};morphFrame=requestAnimationFrame(tick);}
 root.classList.toggle('still',reduced);
}
export function bridgeAtmosphere(type,reduced,back=false){
 const root=document.getElementById('scene-atmosphere');if(!root||reduced)return;
 const epoch=++bridgeEpoch;root.dataset.bridge=type;root.classList.add('is-linking');
 const run=root.querySelector('.thread-run');run.getAnimations().forEach(a=>a.cancel());
 run.animate([{strokeDashoffset:back?0:1600,opacity:.7},{strokeDashoffset:back?1600:0,opacity:.9,offset:.65},{strokeDashoffset:back?1600:0,opacity:.35}],{duration:1000,easing:'cubic-bezier(.2,.6,.2,1)'});
 window.setTimeout(()=>{if(epoch===bridgeEpoch)root.classList.remove('is-linking');},1050);
}
