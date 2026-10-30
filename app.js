import {pages} from './content.js';
import {renderScene} from './scenes.js';
import {icon} from './iconography.js';
import {initHubWindows} from './hub.js';
import {mountStudentJourney,applyStudentStep,resizeStudentJourney} from './journey.js?v=24';
import {applyCampaignReveal} from './campaigns.js';
import {animateTransition} from './motion.js';
import {setAtmosphere} from './background.js';
const query=s=>document.querySelector(s);
const pageNumberWords=['واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','أحد عشر'];
let campaignReveal=0;
const journeyStates={studentJourney:0};
const isStudentPage=id=>Object.prototype.hasOwnProperty.call(journeyStates,id);
let slideIndex=Math.max(0,Math.min(pages.length-1,(parseInt(location.hash.slice(1),10)||1)-1));
let reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
try{if(localStorage.getItem('surgery-motion-v3')==='reduce')reducedMotion=true;}catch{}
function fitScene(){
 const stage=query('#stage'),holder=query('.scene-holder'),scene=holder?.querySelector('.scene');if(!scene)return;
 if(scene.classList.contains('finale-scene')){holder.style.height=`${stage.clientHeight}px`;holder.dataset.scale='1';scene.style.width='100%';scene.style.height='100%';scene.style.minHeight='100%';scene.style.transform='none';return;}
 if(innerWidth<=900){holder.style.height='';scene.removeAttribute('style');return;}
 const css=getComputedStyle(stage),w=stage.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight),h=stage.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom);
 holder.style.height=`${h}px`;let low=.55,high=1,best=.55;
 for(let i=0;i<10;i++){const s=(low+high)/2;scene.style.width=`${w/s}px`;scene.style.minHeight=`${h/s}px`;scene.style.transform=`scale(${s})`;if(scene.scrollHeight*s<=h+1){best=s;low=s;}else high=s;}
 scene.style.width=`${w/best}px`;scene.style.minHeight=`${h/best}px`;scene.style.transform=`scale(${best})`;holder.dataset.scale=best.toFixed(3);
}
function paint(animate=false,back=false){
 const page=pages[slideIndex];
 document.body.classList.toggle('reduce-motion',reducedMotion);
 query('#stage').innerHTML=`<div class="scene-holder">${renderScene(slideIndex,page.id==='campaignTimeline'?campaignReveal:journeyStates[page.id]||0)}</div>`;query('#stage').dataset.page=page.id;query('#stage').scrollTop=0;setAtmosphere(page.id,slideIndex,reducedMotion,animate);fitScene();
 query('#motion').setAttribute('aria-pressed',String(reducedMotion));
 query('#page-no').textContent=String(slideIndex+1).padStart(2,'0');query('#page-word').textContent=pageNumberWords[slideIndex]||String(slideIndex+1);query('.footer-location').setAttribute('aria-label',`الشريحة ${slideIndex+1} من ${pages.length}: ${page.chapter}`);query('#chapter').textContent=page.chapter;
 query('#progress').innerHTML=pages.map((s,i)=>`<button data-goto="${i}" class="${i<slideIndex?'complete':''}" aria-label="الشريحة ${i+1}: ${s.title}" ${i===slideIndex?'aria-current="step"':''} title="${s.title}"></button>`).join('');
 query('#prev').disabled=slideIndex===0;query('#next').disabled=false;query('#next').setAttribute('aria-label',slideIndex===pages.length-1?'العودة إلى البداية':'الشريحة التالية');query('#next').classList.toggle('restart-presentation',slideIndex===pages.length-1);query('#next-label').textContent=slideIndex===pages.length-1?'من البداية':'التالي';
 query('#index-list').innerHTML=pages.map((s,i)=>`<button data-goto="${i}" class="${i===slideIndex?'current':''}"><span dir="ltr">${String(i+1).padStart(2,'0')}</span><strong>${s.title}</strong></button>`).join('');
 query('#announcer').textContent=`الشريحة ${slideIndex+1} من ${pages.length}: ${page.title}`;
 updateStudentNavigation();
 if(animate)animateTransition(query('#stage'),page.transition,reducedMotion,back);
 mountStudentJourney(query('#stage'),journeyStates[page.id]||0,reducedMotion,animate);
}
function setSlide(index){if(index<0||index>=pages.length||index===slideIndex)return;const back=index<slideIndex;slideIndex=index;history.replaceState(null,'',`#${index+1}`);if(query('#index-dialog').open)query('#index-dialog').close();paint(true,back);}
function updateStudentNavigation(){const id=pages[slideIndex].id;if(id==='campaignTimeline'){query('#next-label').textContent=campaignReveal===0?'اكتشف الحملة الأولى':campaignReveal<6?'الحملة التالية':'الحملات في لمحة';query('#next').disabled=false;return;}if(!isStudentPage(id))return;const step=journeyStates[id];query('#next-label').textContent=step===0?'ابدأ الرحلة':step<6?'المحطة التالية':'اكتشف الحملات';query('#next').disabled=false;}
function moveStudent(step){const page=pages[slideIndex],stage=query('#stage');journeyStates[page.id]=step;if(innerWidth<=900&&!reducedMotion)stage.querySelector('.journey-canvas').scrollIntoView({behavior:'smooth',block:'start'});const benefit=applyStudentStep(stage,step,reducedMotion,true);fitScene();updateStudentNavigation();query('#announcer').textContent=step?`المحطة ${step} من 6: ${benefit}`:'بداية المسار؛ اضغط التالي للمحطة الأولى.';}
function moveCampaign(count){campaignReveal=count;const name=applyCampaignReveal(query('#stage'),count,reducedMotion,true);fitScene();updateStudentNavigation();query('#announcer').textContent=count?`الحملة ${count} من 6: ${name}`:'بداية مسار الحملات.';}
function advance(){if(slideIndex===pages.length-1){campaignReveal=0;journeyStates.studentJourney=0;setSlide(0);return;}const id=pages[slideIndex].id;if(id==='campaignTimeline'&&campaignReveal<6){moveCampaign(campaignReveal+1);return;}if(isStudentPage(id)&&journeyStates[id]<6){moveStudent(journeyStates[id]+1);return;}setSlide(slideIndex+1);}function retreat(){const id=pages[slideIndex].id;if(id==='campaignTimeline'&&campaignReveal>0){moveCampaign(campaignReveal-1);return;}if(isStudentPage(id)&&journeyStates[id]>0){moveStudent(journeyStates[id]-1);return;}setSlide(slideIndex-1);}
async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{query('#announcer').textContent='ملء الشاشة غير متاح في هذا المتصفح. يمكن استخدام F11.';}}
function toggleMotion(){reducedMotion=!reducedMotion;try{localStorage.setItem('surgery-motion-v3',reducedMotion?'reduce':'full');}catch{}document.body.classList.toggle('reduce-motion',reducedMotion);query('#motion').setAttribute('aria-pressed',String(reducedMotion));if(reducedMotion){document.getAnimations().forEach(a=>a.cancel());query('#transition-layer').innerHTML='';}setAtmosphere(pages[slideIndex].id,slideIndex,reducedMotion,false);if(pages[slideIndex].id==='campaignTimeline')applyCampaignReveal(query('#stage'),campaignReveal,reducedMotion,false);if(isStudentPage(pages[slideIndex].id))applyStudentStep(query('#stage'),journeyStates[pages[slideIndex].id],reducedMotion,false);}
function openIndex(){query('#index-dialog').showModal();query('#index').setAttribute('aria-expanded','true');}
query('#index').innerHTML=icon('grid');query('#motion').innerHTML=icon('motion');query('#fullscreen').innerHTML=icon('fullscreen');query('#index-close').innerHTML=icon('close');
query('#prev').insertAdjacentHTML('afterbegin',icon('arrow'));query('#next').insertAdjacentHTML('beforeend',icon('arrow'));
query('#next').addEventListener('click',advance);query('#prev').addEventListener('click',retreat);query('#fullscreen').addEventListener('click',toggleFullscreen);query('#motion').addEventListener('click',toggleMotion);query('#index').addEventListener('click',openIndex);query('#index-close').addEventListener('click',()=>query('#index-dialog').close());
document.addEventListener('click',event=>{const target=event.target.closest('[data-goto]');if(target){const n=Number(target.dataset.goto);if(n===slideIndex&&query('#index-dialog').open)query('#index-dialog').close();else setSlide(n);}});
document.addEventListener('keydown',event=>{if(query('#hub-dialog')?.open||query('#index-dialog').open||event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;if([' ','Enter'].includes(event.key)&&event.target.closest('button,summary,a'))return;if(['ArrowLeft','ArrowDown',' '].includes(event.key)){event.preventDefault();advance();}else if(['ArrowRight','ArrowUp'].includes(event.key)){event.preventDefault();retreat();}else if(event.key==='Home'){event.preventDefault();setSlide(0);}else if(event.key==='End'){event.preventDefault();setSlide(pages.length-1);}else if(event.key.toLowerCase()==='f')toggleFullscreen();else if(event.key.toLowerCase()==='m')toggleMotion();else if(event.key.toLowerCase()==='g')openIndex();});
query('#index-dialog').addEventListener('close',()=>{query('#index').setAttribute('aria-expanded','false');query('#index').focus();});
query('#index-dialog').addEventListener('click',event=>{if(event.target!==query('#index-dialog'))return;const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();});
window.addEventListener('hashchange',()=>{const n=Number(location.hash.slice(1));if(n>=1&&n<=pages.length)setSlide(n-1);});
document.addEventListener('fullscreenchange',()=>query('#fullscreen').setAttribute('aria-label',document.fullscreenElement?'إنهاء ملء الشاشة':'ملء الشاشة'));
matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',event=>{reducedMotion=event.matches;paint();});
// Preload illustrations and wordmarks without hiding slide content while they load.
for(const name of ['academic','skills','ai','shadow','visit','robot'])for(const prefix of ['','brand-']){const image=new Image();image.src=`assets/v3/${prefix}${name}.svg`;}
initHubWindows();
paint(pages[slideIndex].id==='finale');
document.fonts.ready.then(fitScene);window.addEventListener('resize',()=>{fitScene();if(isStudentPage(pages[slideIndex].id))resizeStudentJourney(query('#stage'));});
query('#stage').addEventListener('journey:arrived',event=>{if(innerWidth<=900&&event.detail.step&&isStudentPage(pages[slideIndex].id))query('.journey-focus')?.scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'center'});});
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});


