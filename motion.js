import {playForwardSurgery} from './surgical-transitions.js';
import {scalpelArt} from './iconography.js';
import {bridgeAtmosphere} from './background.js';
let motionRun=0;
const effects={
 campaignReel:[{clipPath:'inset(0 0 0 100%)',filter:'brightness(1.5)'},{clipPath:'inset(0 0 0 0)',filter:'brightness(1)'}],
 campaignGallery:[{transform:'translateY(24px) scale(.98)',opacity:.6},{transform:'translateY(0) scale(1)',opacity:1}],
 journeyWalk:[{transform:'translateY(24px)',opacity:.7},{transform:'translateY(0)',opacity:1}],
 journeyContinue:[{transform:'translateY(45px) scale(1.025)',opacity:.7},{transform:'translateY(0) scale(1)',opacity:1}],
 orbit:[{transform:'perspective(1200px) rotateY(3deg) translateX(-15px)'},{transform:'perspective(1200px) rotateY(0) translateX(0)'}],
 portal:[{transform:'perspective(1400px) translateZ(-90px) rotateX(4deg)',filter:'brightness(1.3)'},{transform:'perspective(1400px) translateZ(0) rotateX(0)',filter:'brightness(1)'}],
 blade:[{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0)'}],
 split:[{transform:'translateX(4%) scale(.97)'},{transform:'translateX(0) scale(1)'}],
 thread:[{transform:'translateY(16px)'},{transform:'translateY(0)'}],
 ruler:[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],
 paper:[{transform:'perspective(1300px) rotateY(-6deg)',transformOrigin:'right center'},{transform:'perspective(1300px) rotateY(0)',transformOrigin:'right center'}],
 stitch:[{clipPath:'polygon(0 0,100% 0,100% 5%,0 30%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],
 circuit:[{transform:'translateX(-28px)',filter:'brightness(1.45)'},{transform:'translateX(0)',filter:'brightness(1)'}],
 focus:[{transform:'scale(1.06)',filter:'blur(3px)'},{transform:'scale(1)',filter:'blur(0)'}],
 door:[{clipPath:'inset(0 48% 0 48%)'},{clipPath:'inset(0 0 0 0)'}],
 arm:[{transform:'rotate(-2deg) translateY(15px)',transformOrigin:'left bottom'},{transform:'rotate(0) translateY(0)',transformOrigin:'left bottom'}],
 join:[{transform:'scaleX(.92)',transformOrigin:'center'},{transform:'scaleX(1)',transformOrigin:'center'}],
 steps:[{clipPath:'polygon(0 0,20% 0,20% 25%,40% 25%,40% 50%,65% 50%,65% 75%,100% 75%,100% 100%,0 100%)'},{clipPath:'polygon(0 0,100% 0,100% 25%,100% 25%,100% 50%,100% 50%,100% 75%,100% 75%,100% 100%,0 100%)'}],
 scan:[{clipPath:'inset(50% 0 50% 0)'},{clipPath:'inset(0 0 0 0)'}],
 balance:[{transform:'perspective(1300px) rotateX(5deg) scale(.98)'},{transform:'perspective(1300px) rotateX(0) scale(1)'}],
 pulse:[{transform:'scale(.97)',filter:'brightness(1.25)'},{transform:'scale(1)',filter:'brightness(1)'}],
 signature:[{clipPath:'polygon(100% 0,100% 0,100% 100%,100% 100%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}]
};
export function animateTransition(stage,type,reduced,back=false){
 const run=++motionRun;
 const layer=document.getElementById('transition-layer');
 layer.getAnimations({subtree:true}).forEach(a=>a.cancel());stage.getAnimations({subtree:true}).forEach(a=>a.cancel());layer.innerHTML='';delete layer.dataset.surgery;
 if(reduced)return;
 bridgeAtmosphere(type,reduced,back);
 if(!back){const duration=playForwardSurgery(stage,layer,type)||1150;window.setTimeout(()=>{if(run===motionRun){layer.innerHTML='';delete layer.dataset.surgery;}},duration);return;}
 const scene=stage.querySelector('.scene-holder');
 scene?.animate(effects[type]||effects.thread,{duration:590,easing:'cubic-bezier(.2,.7,.2,1)'});
 if(['journeyWalk','journeyContinue','campaignReel','campaignGallery'].includes(type)){
   layer.innerHTML='';
 }else if(type==='portal'){
   layer.innerHTML='<i class="motion-portal"></i>';
   layer.querySelector('.motion-portal').animate([{transform:'scale(.82)',opacity:.75},{transform:'scale(1.13)',opacity:0}],{duration:720,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
 }else if(type==='blade'||type==='stitch'){
   layer.innerHTML=`<i class="motion-slit"></i>${scalpelArt()}`;
   layer.querySelector('.transition-scalpel').animate([{right:'-330px',transform:'rotate(-9deg)'},{right:'110%',transform:'rotate(-9deg)'}],{duration:760,easing:'cubic-bezier(.3,.7,.3,1)'});
   layer.querySelector('.motion-slit').animate([{transform:'scaleX(0)',opacity:1},{transform:'scaleX(1)',opacity:.8,offset:.7},{transform:'scaleX(1)',opacity:0}],{duration:760,fill:'forwards'});
 }else if(['thread','signature','pulse'].includes(type)){
   const path=type==='pulse'?'M0 180H350l25-20 35 65 35-110 45 105 35-40H1500':'M1500 220C1100 120 1050 300 800 220S400 120 0 220';
   layer.innerHTML=`<svg class="motion-thread" viewBox="0 0 1500 440" preserveAspectRatio="none"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
   layer.querySelector('path').animate([{strokeDashoffset:1500,opacity:.8},{strokeDashoffset:0,opacity:.8,offset:.7},{strokeDashoffset:0,opacity:0}],{duration:780});
 }else if(['door','split','balance'].includes(type)){
   layer.innerHTML='<i class="motion-panel a"></i><i class="motion-panel b"></i>';
   layer.querySelector('.a').animate([{transform:'translateX(0)',opacity:.9},{transform:'translateX(105%)',opacity:0}],{duration:600,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
   layer.querySelector('.b').animate([{transform:'translateX(0)',opacity:.9},{transform:'translateX(-105%)',opacity:0}],{duration:600,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});
 }else if(['scan','ruler','focus'].includes(type)){
   layer.innerHTML='<i class="motion-scan"></i>';
   layer.querySelector('.motion-scan').animate([{top:'-40px',opacity:.8},{top:'110%',opacity:0}],{duration:700,easing:'ease-out'});
 }else{
   layer.innerHTML=Array.from({length:4},(_,i)=>`<i class="motion-block" style="right:${i*25}%"></i>`).join('');
   layer.querySelectorAll('.motion-block').forEach((b,i)=>b.animate([{transform:'translateY(0)',opacity:.45},{transform:`translateY(${back?'':'-'}110%)`,opacity:0}],{duration:450,delay:i*45,easing:'ease-out',fill:'both'}));
 }
 window.setTimeout(()=>{if(run===motionRun)layer.innerHTML='';},1000);
}
