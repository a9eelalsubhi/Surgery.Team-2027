import {campaignLogo} from './campaign-logos.js';

// A proposed sequence, not an announced calendar. Clinical access is conditional.
export const campaignPlan=[
 {id:'academic',name:'بُرهان',topic:'الحالات والنقاش العلمي',color:'#78cbd4',phase:'نؤسّس المعرفة',status:'تأسيسية',summary:'نقرأ حالة جراحية أو ورقة علمية، ونناقش السؤال والدليل مع مُيسّر مختص؛ لنربط المعرفة بالتفكير السريري.',detail:'محتوى مُراجع · حالات منزوعة الهوية'},
 {id:'skills',name:'مِران',topic:'المهارات الجراحية الأساسية',color:'#f16b86',phase:'نجرّب المهارة',status:'تأسيسية',summary:'ورش عملية للخياطة والعُقد والتعرّف على الأدوات، على نماذج تدريبية وبإشراف مدرّب؛ مع ملاحظات تساعد الطالب على التحسّن.',detail:'تدريب على نماذج · بحسب المواد والإشراف'},
 {id:'ai',name:'وَصل',topic:'الجراحة والذكاء الاصطناعي',color:'#b597e9',phase:'نوسّع الأفق',status:'تأسيسية',summary:'لقاء يجمع الطب والتقنية لشرح تطبيقات الذكاء الاصطناعي في الجراحة بأمثلة تعليمية، مع مناقشة حدودها والتحيّز والخصوصية.',detail:'فهم التقنية ونقدها · أمثلة تعليمية'},
 {id:'shadow',name:'خُطى جرّاح',topic:'استكشاف يوم الجرّاح',color:'#e8ba78',phase:'نقترب من المهنة',status:'مرتبطة بالموافقات',summary:'نتعرّف على يوم الجرّاح وأدواره ومساره مع أحد المختصين؛ ويمكن إضافة ملاحظة سريرية منظمة إذا توفّرت الموافقات والإشراف.',detail:'البديل: لقاء خبير داخل الكلية'},
 {id:'visit',name:'رِواق',topic:'الزيارات التعليمية',color:'#80cfac',phase:'نستكشف الميدان',status:'مرتبطة بالموافقات',summary:'زيارة تعليمية للأقسام ومسارات العمل في منشأة صحية، ضمن مناطق يحدّدها المضيف؛ لفهم بيئة الفريق الجراحي والتكامل بين أدواره.',detail:'موافقة المضيف · نطاق وخصوصية واضحان'},
 {id:'robot',name:'دقّة',topic:'الجراحة الروبوتية والمحاكاة',color:'#94b9dc',phase:'نستشرف القادم',status:'طموح مستقبلي',summary:'نستكشف آلية الجراحة الروبوتية ودور الجرّاح عبر لقاء خبير وعرض تعليمي؛ وتُدرس المحاكاة المتقدمة عند توفر الجهاز والدعم والإشراف.',detail:'نبدأ بعرض تعليمي · التجربة المتقدمة مشروطة'}
];
const campaignHeading=(eyebrow,title,subtitle)=>`<header class="section-heading"><div class="eyebrow"><span></span>${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></header>`;
export function renderCampaignTimeline(count=0){
 const visible=Math.max(0,Math.min(6,count));
 return `<article class="scene campaign-reel-scene">${campaignHeading('خطة الحملات · 2027','ست هويات. مسار واحد.','من المعرفة والمهارة إلى استكشاف عالم الجراحة.')}<div class="campaign-reel" data-revealed="${visible}" aria-label="تايملاين الحملات من اليمين إلى اليسار"><div class="reel-phases"><span>معرفة ومهارة</span><span>حوار واستكشاف</span><span>ميدان وتقنية</span></div><div class="reel-axis" aria-hidden="true"><i style="--reel-progress:${visible/6*100}%"></i><b>2027</b></div><ol class="reel-events">${campaignPlan.map((c,i)=>`<li class="reel-event ${i%2?'below':'above'} ${i<visible?'is-visible':''} ${i+1===visible?'is-current':''}" data-campaign="${c.id}" data-order="${i+1}" style="--campaign-color:${c.color}"><span class="reel-ordinal" aria-label="الحملة ${i+1}">${String(i+1).padStart(2,'0')}</span><div class="reel-stem" aria-hidden="true"></div><div class="reel-placeholder" ${i<visible?'hidden':''}>${c.phase}</div><div class="reel-identity" aria-hidden="${i>=visible}">${campaignLogo(c.id,`timeline-${i}`)}<h2>${c.topic}</h2><span class="reel-status">${c.status}</span></div></li>`).join('')}</ol></div><div class="reel-caption"><p><span class="reel-light"></span><span data-reel-caption>${visible?`${campaignPlan[visible-1].name} — ${campaignPlan[visible-1].topic}`:'اضغط «اكتشف الحملة الأولى» لتبدأ الرحلة.'}</span></p><span class="reel-counter"><b data-reel-count>${String(visible).padStart(2,'0')}</b><span dir="ltr">/ 06</span></span></div></article>`;
}
export function renderCampaignOverview(){return `<article class="scene campaign-overview-scene">${campaignHeading('الحملات في لمحة','لكل حملة فكرة، ولكل تجربة قيمة.','ست مبادرات تجمع التعلّم والممارسة والاستكشاف، ضمن خطة واحدة.')}<div class="campaign-identity-grid">${campaignPlan.map((c,i)=>`<section class="identity-card identity-${c.id}" style="--campaign-color:${c.color}"><div class="identity-card-meta"><span>${String(i+1).padStart(2,'0')}</span><span>${c.status}</span></div><div class="identity-art">${campaignLogo(c.id,`overview-${i}`)}</div><div class="identity-copy"><h2>${c.topic}</h2><p>${c.summary}</p><small>${c.detail}</small></div></section>`).join('')}</div></article>`;}

export function applyCampaignReveal(stage,count,reduced=false,animate=false){
 const reel=stage.querySelector('.campaign-reel');if(!reel)return;
 reel.dataset.revealed=String(count);reel.querySelector('.reel-axis i').style.setProperty('--reel-progress',`${count/6*100}%`);
 reel.querySelectorAll('.reel-event').forEach((event,i)=>{event.classList.toggle('is-visible',i<count);event.classList.toggle('is-current',i+1===count);event.classList.remove('is-revealing');event.querySelector('.reel-placeholder').hidden=i<count;event.querySelector('.reel-identity').setAttribute('aria-hidden',String(i>=count));});
 const current=reel.querySelector(`[data-order="${count}"]`);
 if(current&&animate&&!reduced){void current.offsetWidth;current.classList.add('is-revealing');}
 stage.querySelector('[data-reel-count]').textContent=String(count).padStart(2,'0');
 stage.querySelector('[data-reel-caption]').textContent=count?`${campaignPlan[count-1].name} — ${campaignPlan[count-1].topic}`:'اضغط «اكتشف الحملة الأولى» لتبدأ الرحلة.';
 if(current&&animate&&innerWidth<=900)current.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});
 return count?campaignPlan[count-1].name:'';
}
