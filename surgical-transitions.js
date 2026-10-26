import {playFinaleEntrance} from './finale.js';
// Original metal instruments and motion geometry; never substitutes slide content.
const metalDefs=`<defs><linearGradient id="surgical-steel" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f4f7f7"/><stop offset=".22" stop-color="#99abb7"/><stop offset=".46" stop-color="#e9f2f5"/><stop offset=".57" stop-color="#5b7181"/><stop offset=".8" stop-color="#a9bac6"/><stop offset="1" stop-color="#344859"/></linearGradient><linearGradient id="surgical-blade"><stop stop-color="#fff"/><stop offset=".5" stop-color="#b7d2e0"/><stop offset="1" stop-color="#456375"/></linearGradient></defs>`;
let instrumentSequence=0;
function instrument(kind){const drawings={
 scalpel:`<path d="M88 49 302 26q16-1 17 12l2 10q0 8-14 10L95 72Z" fill="url(#surgical-steel)" stroke="#344452"/><path d="M13 72q-9-20 9-27L93 35l19 12-20 25-58 6q-15 1-21-6Z" fill="url(#surgical-blade)" stroke="#cbdce6" stroke-width=".7"/><path d="M17 70q36 3 75-10" stroke="#fff" opacity=".85"/><path d="m117 50 151-16m-148 22 151-16" stroke="#405e71" stroke-width="1.5"/>${Array.from({length:12},(_,i)=>`<path d="m${125+i*10} 47-2 12" stroke="#456474" stroke-width="1" opacity=".5"/>`).join('')}`,
 needle:`<path d="M35 23C-5 60 34 124 96 93c33-17 51-55 44-76" fill="none" stroke="url(#surgical-steel)" stroke-width="5"/><path d="m140 17-2 20 7-15Z" fill="#f5f3ed"/><path d="M35 23C-50 48-90 10-170 39" fill="none" stroke="#e0b79a" stroke-width="2"/>`,
 retractor:`<path d="M145 15h45l-9 43-15 13v148l-23 14-9-20V78l-17-18-3-33Z" fill="url(#surgical-steel)" stroke="#314657"/><path d="M134 80h32m-23 27h13m-13 8h13m-13 8h13m-13 8h13" fill="none" stroke="#577082" stroke-width="2"/><path d="M114 27h76" stroke="#eef6fb" stroke-width="2"/>`,
 scissors:`<g class="scissor-part-a"><ellipse cx="262" cy="89" rx="33" ry="20" fill="none" stroke="url(#surgical-steel)" stroke-width="9"/><path d="M230 86 135 61 18 18q-9-5-11 1l117 59 107 22" fill="url(#surgical-steel)"/></g><g class="scissor-part-b"><ellipse cx="264" cy="35" rx="33" ry="20" fill="none" stroke="url(#surgical-steel)" stroke-width="9"/><path d="M232 35 136 59 19 105q-9 5-12-1l118-60 108-22" fill="url(#surgical-steel)"/></g><circle cx="136" cy="60" r="7" fill="#4d6d7b" stroke="#c2d8e4" stroke-width="2"/><path d="m132 60h8" stroke="#e2f2f8"/>`,
 clamp:`<g class="clamp-half"><ellipse cx="260" cy="80" rx="29" ry="19" fill="none" stroke="url(#surgical-steel)" stroke-width="8"/><path d="M230 77 140 58 30 26q-11-3-11 5l119 41 91 18" fill="url(#surgical-steel)"/></g><g class="clamp-half"><ellipse cx="260" cy="34" rx="29" ry="19" fill="none" stroke="url(#surgical-steel)" stroke-width="8"/><path d="M231 36 140 58 30 86q-11 3-11-5l119-37 92-20" fill="url(#surgical-steel)"/></g><circle cx="140" cy="58" r="7" fill="#587684" stroke="#dce8ed"/><path d="M30 30 78 47m-48 34 48-16" stroke="#233c4b" stroke-width="2"/>`
 };return `<svg class="surgical-tool surgical-${kind}" viewBox="0 0 ${kind==='needle'?'180 130':kind==='retractor'?'320 250':'340 120'}" fill="none" aria-hidden="true">${metalDefs}${drawings[kind]}</svg>`.replaceAll('surgical-steel',`surgical-steel-${++instrumentSequence}`).replaceAll('surgical-blade',`surgical-blade-${instrumentSequence}`);}
const surgicalModes={supportLink:'suture',collaborationWeave:'clamp',documentationScan:'scope',split:'scalpel',journeyWalk:'suture',campaignReel:'clamp',campaignGallery:'retractors',portal:'scope',orbit:'scissors',finale:'unpack'};
export function playForwardSurgery(stage,layer,type){const mode=surgicalModes[type]||'scalpel';layer.dataset.surgery=mode;const scene=stage.querySelector('.scene-holder'),timing={duration:860,easing:'cubic-bezier(.18,.7,.2,1)',fill:'both'};
 if(mode==='unpack'){
  return playFinaleEntrance(stage,layer,instrument('scissors'));
 }else if(mode==='scalpel'){
  layer.innerHTML=`<div class="surgical-cut-beam"></div>${instrument('scalpel')}`;
  layer.querySelector('.surgical-tool').animate([{right:'-350px',top:'57%',transform:'rotate(-13deg)',opacity:0},{right:'10%',top:'54%',transform:'rotate(-10deg)',opacity:1,offset:.2},{right:'110%',top:'43%',transform:'rotate(-7deg)',opacity:1}],timing);
  layer.querySelector('.surgical-cut-beam').animate([{transform:'scaleX(0) rotate(-3deg)',opacity:0},{transform:'scaleX(1) rotate(-3deg)',opacity:.9,offset:.6},{transform:'scaleX(1) rotate(-3deg)',opacity:0}],timing);
  scene.animate([{clipPath:'inset(0 0 0 100%)',opacity:.8},{clipPath:'inset(0 0 0 0)',opacity:1}],timing);
 }else if(mode==='suture'){
  const thread='M1650 530C1250 350 1100 560 850 450S300 350-50 490';
  layer.innerHTML=`<svg class="surgical-thread-field" viewBox="0 0 1600 900" preserveAspectRatio="none"><path class="surgical-running-thread" d="${thread}"/>${Array.from({length:9},(_,i)=>`<path class="surgical-mini-stitch" d="m${210+i*145} 445-20-34m20 34 20 34"/>`).join('')}</svg>${instrument('needle')}`;
  layer.querySelector('.surgical-running-thread').animate([{strokeDashoffset:2000,opacity:0},{strokeDashoffset:0,opacity:.8,offset:.75},{strokeDashoffset:0,opacity:0}],{...timing,duration:1000});
  layer.querySelectorAll('.surgical-mini-stitch').forEach((p,i)=>p.animate([{strokeDashoffset:100,opacity:0},{strokeDashoffset:0,opacity:.6},{strokeDashoffset:0,opacity:0}],{...timing,duration:650,delay:(8-i)*35}));
  layer.querySelector('.surgical-tool').animate([{right:'-180px',top:'49%',transform:'rotate(-20deg)',opacity:0},{right:'25%',top:'44%',transform:'rotate(-45deg)',opacity:1,offset:.35},{right:'110%',top:'47%',transform:'rotate(-60deg)',opacity:0}],{...timing,duration:1000});
  scene.animate([{transform:'translateY(22px)',opacity:.6},{transform:'translateY(0)',opacity:1}],timing);
 }else if(mode==='retractors'){
  layer.innerHTML=`<div class="retractor-pair right">${instrument('retractor')}</div><div class="retractor-pair left">${instrument('retractor')}</div>`;
  for(const side of ['right','left'])layer.querySelector(`.${side}`).animate([{transform:'translateX(0)',opacity:0},{transform:`translateX(${side==='right'?'':'-'}20vw)`,opacity:.85,offset:.4},{transform:`translateX(${side==='right'?'':'-'}70vw)`,opacity:0}],timing);
  scene.animate([{clipPath:'inset(0 49% 0 49%)',opacity:.6},{clipPath:'inset(0 0 0 0)',opacity:1}],timing);
 }else if(mode==='scope'){
  layer.innerHTML='<svg class="surgical-scope" viewBox="0 0 600 600" fill="none"><circle cx="300" cy="300" r="235" stroke="#192c35" stroke-width="28"/><circle cx="300" cy="300" r="235" stroke="#96b7c5" stroke-width="1.5"/><circle cx="300" cy="300" r="215" stroke="#6ca89f" stroke-width="1" stroke-dasharray="4 12"/><path d="M300 55v45m0 400v45M55 300h45m400 0h45" stroke="#b7ced5" stroke-width="2"/></svg>';
  layer.querySelector('.surgical-scope').animate([{transform:'translate(-50%,-50%) scale(.25)',opacity:0},{transform:'translate(-50%,-50%) scale(.8)',opacity:.75,offset:.35},{transform:'translate(-50%,-50%) scale(1.8)',opacity:0}],timing);
  scene.animate([{transform:'scale(1.055)',filter:'blur(2px)',opacity:.6},{transform:'scale(1)',filter:'blur(0)',opacity:1}],timing);
 }else{
  const kind=mode==='clamp'?'clamp':'scissors';layer.innerHTML=instrument(kind);const tool=layer.querySelector('.surgical-tool');
  tool.animate([{right:'35%',top:'46%',transform:'rotate(-10deg) scale(.8)',opacity:0},{right:'43%',top:'44%',transform:'rotate(0) scale(1)',opacity:.9,offset:.35},{right:'65%',top:'32%',transform:'rotate(12deg) scale(1.1)',opacity:0}],timing);
  tool.querySelectorAll(kind==='clamp'?'.clamp-half':'[class^="scissor-part"]').forEach((g,i)=>{g.style.transformOrigin='140px 60px';g.animate([{transform:`rotate(${i?10:-10}deg)`},{transform:'rotate(0)',offset:.5},{transform:`rotate(${i?-5:5}deg)`}],timing);});
  scene.animate([{transform:'translateX(22px)',clipPath:'inset(0 0 0 50%)',opacity:.65},{transform:'translateX(0)',clipPath:'inset(0 0 0 0)',opacity:1}],timing);
 }
}
