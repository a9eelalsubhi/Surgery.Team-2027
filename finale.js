export function renderFinale(){return `<article class="scene finale-scene" aria-labelledby="finale-title" data-entrance="complete"><img class="finale-case-art" src="assets/finale-surgical-case-v1.webp" alt="علبة أدوات جراحية برغندية بمنظور داخلي، يتوسطها ماسك إبرة معدني وخيط جراحي"><div class="finale-vignette" aria-hidden="true"></div><svg class="finale-texture" aria-hidden="true"><filter id="finale-grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#finale-grain)"/></svg><div class="finale-top-label" dir="ltr">SURGERY TEAM / 2027</div><h1 id="finale-title" aria-label="خطوات قليلة، لصناعة شيء جديد."><span class="finale-title-top"><span class="finale-word" data-finale-word="1">خطوات</span> <span class="finale-word" data-finale-word="2">قليلة،</span></span><span class="finale-title-bottom"><span class="finale-word" data-finale-word="3">لصناعة</span> <strong class="finale-word" data-finale-word="4">شيء جديد.</strong></span></h1><div class="finale-seal" aria-label="فريق الجراحة 2027"><span>فريق الجراحة</span><img src="assets/team-monogram.png" alt="رمز الفريق TS"><b dir="ltr">2027</b></div><aside class="finale-receipt" aria-label="من الفكرة إلى الأثر"><p>من الفكرة إلى الأثر</p><ol><li><bdi>01</bdi><span>فضولٌ يبدأ.</span></li><li><bdi>02</bdi><span>تجربةٌ تُعلّم.</span></li><li><bdi>03</bdi><span>أثرٌ يستمر.</span></li></ol><span class="finale-receipt-rule"></span></aside><div class="finale-thanks"><p>شكرًا لحسن استماعكم.</p><span dir="ltr">SURGERY TEAM · UQU</span></div></article>`;}
// The poster is fully visible at rest; entry is a single automatic sequence.
export function playFinaleEntrance(stage,layer,scissors){
 const scene=stage.querySelector('.finale-scene');if(!scene)return 1150;
 scene.dataset.entrance='playing';const runs=[];
 const animate=(element,frames,options)=>{if(!element)return;const a=element.animate(frames,{easing:'cubic-bezier(.18,.72,.2,1)',fill:'backwards',...options});runs.push(a);return a;};
 layer.innerHTML=`<i class="case-unfold-flap top"></i><i class="case-unfold-flap bottom"></i><div class="finale-scissor-cue">${scissors}</div>`;
 animate(layer.querySelector('.top'),[{transform:'perspective(1000px) rotateX(0)',opacity:.88},{transform:'perspective(1000px) rotateX(95deg)',opacity:0}],{duration:650,fill:'forwards'});
 animate(layer.querySelector('.bottom'),[{transform:'perspective(1000px) rotateX(0)',opacity:.88},{transform:'perspective(1000px) rotateX(-95deg)',opacity:0}],{duration:650,fill:'forwards'});
 const cue=layer.querySelector('.finale-scissor-cue');
 animate(cue,[{top:'-28%',right:'31%',transform:'rotate(125deg) scale(.88)',opacity:0},{top:'33%',right:'35%',transform:'rotate(155deg) scale(1)',opacity:.96,offset:.46},{top:'42%',right:'37%',transform:'rotate(155deg) scale(1)',opacity:.96,offset:.68},{top:'68%',right:'55%',transform:'rotate(162deg) scale(.9)',opacity:0}],{duration:1450,fill:'forwards'});
 cue.querySelectorAll('[class^="scissor-part"]').forEach((g,i)=>{g.style.transformOrigin='136px 60px';animate(g,[{transform:`rotate(${i?12:-12}deg)`},{transform:`rotate(${i?-3:3}deg)`,offset:.65},{transform:'rotate(0)'}],{duration:410,delay:480,fill:'forwards'});});
 const art=scene.querySelector('.finale-case-art'),artBase=getComputedStyle(art).transform,artTransform=artBase==='none'?'':artBase;
 animate(art,[{transform:`${artTransform} translateY(-18px) scale(1.055)`,opacity:.5},{transform:artBase,opacity:1}],{duration:1100});
 const delays=[590,800,1100,1310];
 scene.querySelectorAll('[data-finale-word]').forEach((word,i)=>animate(word,[{opacity:0,transform:`translateY(${i<2?-28:28}px) rotate(${i%2?2:-2}deg)`,filter:'blur(3px)'},{opacity:1,transform:'translateY(0) rotate(0)',filter:'blur(0)'}],{duration:660,delay:delays[i]}));
 const seal=scene.querySelector('.finale-seal'),sealBase=getComputedStyle(seal).transform;
 animate(seal,[{opacity:0,transform:`${sealBase} translateY(-14px) scale(1.18)`,filter:'brightness(1.6)'},{opacity:1,transform:sealBase,filter:'brightness(1)'}],{duration:650,delay:990});
 animate(scene.querySelector('.finale-receipt'),[{opacity:0,translate:'10px 0'},{opacity:1,translate:'0 0'}],{duration:560,delay:1280});
 animate(scene.querySelector('.finale-top-label'),[{opacity:0},{opacity:.7}],{duration:450,delay:1200});
 animate(scene.querySelector('.finale-thanks'),[{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:560,delay:1770});
 Promise.all(runs.map(a=>a.finished)).then(()=>{if(scene.isConnected)scene.dataset.entrance='complete';}).catch(()=>{if(scene.isConnected)scene.dataset.entrance='complete';});
 return 2500;
}
