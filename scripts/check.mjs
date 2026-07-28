import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const src=path.join(root,'src');const issues=[];
const site=JSON.parse(await fs.readFile(path.join(src,'data','site.json'),'utf8'));const projects=JSON.parse(await fs.readFile(path.join(src,'data','projects.json'),'utf8'));
for(const field of ['name','email','linkedin','resume']) if(!site[field])issues.push(`site.json missing ${field}`);
if(!/^https:\/\//.test(site.linkedin))issues.push('LinkedIn must be HTTPS');
for(const p of projects){for(const field of ['slug','title','year','progression','cover','summary','contribution','cardCta'])if(!p[field])issues.push(`${p.slug||'project'} missing ${field}`);for(const locale of ['en','id']){for(const field of ['summary','contribution','cardCta','role','period','progressionLabel'])if(!p[field]?.[locale])issues.push(`${p.slug} missing ${field}.${locale}`);try{await fs.access(path.join(src,'portfolio',p.slug,`${locale}.md`))}catch{issues.push(`${p.slug} missing ${locale}.md`)}}if(p.cover.startsWith('/assets/images/')){try{await fs.access(path.join(src,'images',p.cover.replace('/assets/images/','')))}catch{issues.push(`${p.slug} cover missing`)}}}
try{await fs.access(path.join(root,'public','resume.pdf'))}catch{issues.push('public/resume.pdf missing')}
if(issues.length){console.error(`Found ${issues.length} issue(s):`);for(const i of issues)console.error(`- ${i}`);process.exit(1)}console.log(`Content check passed for ${projects.length} bilingual projects.`)
