import assert from 'node:assert/strict';
import {stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {pages,parkedPages,members} from './docs/content.js';
import {renderScene} from './docs/scenes.js';
import {campaignPlan} from './docs/campaigns.js';
import {studentJourney,journeyPositions,journeyStops} from './docs/journey.js';
assert.deepEqual(pages.map(p=>p.id),['intro','team','studentJourney','campaignTimeline','campaignOverview','hub','hubExplore','supportSystem','interdisciplinary','documentationSystem','finale']);
assert.equal(parkedPages.length,18);assert.equal(new Set(pages.map(p=>p.transition)).size,11);
assert.deepEqual(members,['أصيل الصبحي','طه الصافي','شهد العوفي','سارة حلواني']);
assert.deepEqual(studentJourney.map(j=>j.stages.length),[3,3]);assert.equal(journeyPositions.length,7);assert.ok(journeyPositions.every((n,i)=>i===0||n>journeyPositions[i-1]));
for(let i=0;i<pages.length;i++){const html=renderScene(i);assert.ok(html.includes('<h1'));if(!['hub','hubExplore'].includes(pages[i].id))assert.ok(!html.includes('<button'));}
const cover=renderScene(0);assert.ok(cover.includes('intro-word'));assert.ok(cover.includes('2027'));assert.ok(!cover.includes('cover-promises'));assert.ok(!cover.includes('cover-lead'));
assert.equal(journeyStops.length,6);assert.ok(!renderScene(2).includes('student-benefits'));assert.ok(!renderScene(2).includes('data-benefit='));for(let step=1;step<=6;step++){const html=renderScene(2,step);assert.equal((html.match(/data-benefit=/g)||[]).length,1);assert.ok(html.includes(journeyStops[step-1].gain));}
for(const id of ['timeline','passport','invitation'])assert.ok(renderScene(5).includes(`data-hub-open="${id}"`));for(const id of ['compass','caselab'])assert.ok(renderScene(6).includes(`data-hub-open="${id}"`));
for(const file of ['content.js','iconography.js','visuals.js','hub.js','student-graphic.js','journey.js','campaign-logos.js','campaigns.js','finale.js','operations-art.js','operations.js','scenes.js','background.js','surgical-transitions.js','motion.js','app.js','sw.js'])execFileSync(process.execPath,['--check',`docs/${file}`]);
for(const file of ['assets/thmanyah-display-bold.woff2','assets/team-monogram.png','assets/club-logo.png','assets/team/student-graphic-v3.svg','assets/finale-surgical-case-v1.webp'])assert.ok((await stat(`docs/${file}`)).size>100);
assert.equal(campaignPlan.length,6);assert.equal(new Set(campaignPlan.map(c=>c.name)).size,6);
assert.equal((renderScene(3,0).match(/is-visible/g)||[]).length,0);assert.equal((renderScene(3,6).match(/is-visible/g)||[]).length,6);assert.equal((renderScene(4).match(/class="identity-card /g)||[]).length,6);for(const c of campaignPlan)assert.ok(renderScene(4).includes(c.summary));
assert.ok(renderScene(10).includes('خطوات قليلة،'));assert.ok(renderScene(10).includes('شيء جديد.'));assert.ok(renderScene(10).includes('شكرًا لحسن استماعكم.'));
console.log('Verified: 11 active slides; 18-slide structure preserved; minimal Thmanyah cover; one student path with 6 stages and only the current arrival card; five Hub windows; JavaScript syntax and required assets.');


assert.ok(renderScene(7).includes('العلاقات العامة لفريق الجراحة'));assert.ok(renderScene(8).includes('الشريعة والدراسات الإسلامية'));assert.ok(renderScene(9).includes('ISO 15489'));assert.ok(renderScene(9).includes('بُرهان'));assert.ok(!renderScene(9).includes('ST27–EVT–001'));assert.equal((renderScene(9).match(/class="doc-route-step doc-route-step-/g)||[]).length,6);

for(let i=0;i<pages.length;i++)assert.ok(!/class="(?:ops-note|scene-note|campaign-plan-note)/.test(renderScene(i)));
