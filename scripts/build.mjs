import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');
const locales = ['en', 'id'];

const esc = (v = '') => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const pick = (value, locale) => typeof value === 'object' && value !== null && !Array.isArray(value) ? (value[locale] ?? value.en ?? '') : (value ?? '');
const template = (source, vars) => source.replace(/{{([a-zA-Z0-9]+)}}/g, (_, key) => vars[key] ?? '');

const labels = {
  en: {
    home: 'Home', work: 'Work', resume: 'Resume', language: 'Language', skip: 'Skip to content',
    viewWork: 'View work', viewResume: 'View resume', featured: 'Featured work', featuredTitle: 'Systems shaped by real operational constraints.',
    featuredCopy: 'Deployment tooling, production backend work, and active engineering research with clear contribution boundaries.',
    moreWork: 'More work', moreTitle: 'More products, prototypes, and experiments still moving forward.', proof: 'Evidence, not decorative percentages.',
    capabilities: 'Capabilities', credentials: 'Selected credentials', viewAllCredentials: 'View credentials on the resume page',
    principles: 'How I work', connectTitle: 'Building something that needs to survive outside localhost?', connectCopy: 'I am open to early-career FDE, Solutions Architecture, Backend, and DevOps roles where systems have to work across real environments.', connect: 'Connect on LinkedIn',
    workEyebrow: 'Work', workTitle: 'Systems built for real use.', workCopy: 'Deployment systems, production platforms, public products, embedded prototypes, and applied research.',
    filterProgress: 'Filter by progression', filterCapability: 'Browse by capability', all: 'All',
    researchEyebrow: 'Research & engineering studies', researchTitle: 'Research with contribution boundaries made explicit.',
    researchCopy: 'Primary research ownership and collaboration work are separated instead of being blended into one heroic paragraph.',
    contribution: 'My contribution', live: 'Open live product', articleBack: 'Back to all work', currentStatus: 'Current status', period: 'Period', role: 'Role', context: 'Context',
    nextStep: 'Next step', articleCtaTitle: 'The repository may be private. The engineering story is not.', articleCtaCopy: 'For role fit and a compact experience summary, continue to the resume or connect on LinkedIn.',
    resumeEyebrow: 'Software Engineer · Backend · Infrastructure · Field Engineering', resumeTitle: 'Wondering if we are a great match? Start with the useful evidence.',
    resumeCopy: 'A concise view of current infrastructure work, prior production backend experience, selected systems projects, research, and technical range.', downloadResume: 'Download resume', profileSnapshot: 'Profile snapshot',
    experience: 'Experience', projectExperience: 'Selected project experience', toolkit: 'Technical toolkit', education: 'Education', selectedCredentials: 'Credentials',
    resumeCtaTitle: 'If the work and the role line up, let us talk.', resumeCtaCopy: 'The fastest route is LinkedIn. The phone number stays in the CV, where it belongs.',
    openLinkedIn: 'Get in touch on LinkedIn', noResults: 'No projects match both filters. Human categorization has defeated itself again.'
  },
  id: {
    home: 'Beranda', work: 'Proyek', resume: 'Resume', language: 'Bahasa', skip: 'Lewati ke konten',
    viewWork: 'Lihat proyek', viewResume: 'Lihat resume', featured: 'Proyek unggulan', featuredTitle: 'Sistem yang dibentuk oleh constraint operasional nyata.',
    featuredCopy: 'Deployment tooling, pengalaman backend production, dan riset engineering aktif dengan batas kontribusi yang jelas.',
    moreWork: 'Proyek lainnya', moreTitle: 'Produk, prototipe, dan eksperimen lain yang terus dikembangkan.', proof: 'Bukti, bukan persentase skill dekoratif.',
    capabilities: 'Kapabilitas', credentials: 'Kredensial terpilih', viewAllCredentials: 'Lihat kredensial pada halaman resume',
    principles: 'Cara saya bekerja', connectTitle: 'Membangun sistem yang harus bertahan di luar localhost?', connectCopy: 'Saya terbuka untuk role early-career FDE, Solutions Architecture, Backend, dan DevOps yang menuntut sistem bekerja di environment nyata.', connect: 'Hubungi lewat LinkedIn',
    workEyebrow: 'Proyek', workTitle: 'Sistem yang dibangun untuk benar-benar digunakan.', workCopy: 'Deployment system, platform production, produk publik, prototipe embedded, dan riset terapan.',
    filterProgress: 'Filter berdasarkan progres', filterCapability: 'Filter berdasarkan kapabilitas', all: 'Semua',
    researchEyebrow: 'Riset & studi rekayasa', researchTitle: 'Riset dengan batas kontribusi yang dijelaskan secara eksplisit.',
    researchCopy: 'Ownership riset utama dan pekerjaan kolaborasi dipisahkan, bukan dicampur menjadi satu paragraf kepahlawanan.',
    contribution: 'Kontribusi saya', live: 'Buka produk live', articleBack: 'Kembali ke semua proyek', currentStatus: 'Status saat ini', period: 'Periode', role: 'Role', context: 'Konteks',
    nextStep: 'Langkah berikutnya', articleCtaTitle: 'Repository boleh private. Cerita engineering-nya tidak.', articleCtaCopy: 'Untuk melihat ringkasan pengalaman dan kecocokan role, lanjutkan ke resume atau hubungi lewat LinkedIn.',
    resumeEyebrow: 'Software Engineer · Backend · Infrastruktur · Field Engineering', resumeTitle: 'Penasaran apakah kita cocok? Mulai dari bukti yang berguna.',
    resumeCopy: 'Ringkasan pekerjaan infrastruktur saat ini, pengalaman backend production sebelumnya, sistem terpilih, riset, dan cakupan teknis.', downloadResume: 'Unduh resume', profileSnapshot: 'Ringkasan profil',
    experience: 'Pengalaman', projectExperience: 'Pengalaman proyek terpilih', toolkit: 'Technical toolkit', education: 'Pendidikan', selectedCredentials: 'Kredensial',
    resumeCtaTitle: 'Kalau pekerjaan dan role-nya cocok, mari terhubung.', resumeCtaCopy: 'Jalur tercepat adalah LinkedIn. Nomor telepon tetap berada di CV, tempat yang lebih waras.',
    openLinkedIn: 'Hubungi lewat LinkedIn', noResults: 'Tidak ada proyek yang cocok dengan kedua filter. Kategorisasi manusia kembali mengalahkan dirinya sendiri.'
  }
};

function inlineMarkdown(text) {
  let out = esc(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_m, label, url, title) => {
    const external = /^https?:/.test(url) ? ' target="_blank" rel="noreferrer"' : '';
    return `<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''}${external}>${label}</a>`;
  });
  return out;
}

function markdown(raw) {
  const lines = raw.replaceAll('\r\n', '\n').split('\n');
  const out = [];
  let para = [], list = null;
  const flush = () => { if (para.length) { out.push(`<p>${inlineMarkdown(para.join(' '))}</p>`); para = []; } };
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const sourceLine of lines) {
    const line = sourceLine.trimEnd();
    if (!line.trim()) { flush(); closeList(); continue; }
    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (image) { flush(); closeList(); out.push(`<figure class="article-figure"><img src="${esc(image[2])}" alt="${esc(image[1])}" loading="lazy" decoding="async">${image[3] ? `<figcaption>${inlineMarkdown(image[3])}</figcaption>` : ''}</figure>`); continue; }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) { flush(); closeList(); const level = heading[1].length; const text = heading[2]; const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-'); out.push(`<h${level} id="${esc(id)}">${inlineMarkdown(text)}</h${level}>`); continue; }
    const quote = line.match(/^>\s?(.*)$/);
    if (quote) { flush(); closeList(); out.push(`<blockquote><p>${inlineMarkdown(quote[1])}</p></blockquote>`); continue; }
    const ul = line.match(/^[-*]\s+(.+)$/); const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul || ol) { flush(); const wanted = ul ? 'ul' : 'ol'; if (list !== wanted) { closeList(); list = wanted; out.push(`<${list}>`); } out.push(`<li>${inlineMarkdown((ul || ol)[1])}</li>`); continue; }
    para.push(line.trim());
  }
  flush(); closeList(); return out.join('\n');
}

function icon(key) {
  const common = 'viewBox="0 0 64 64" aria-hidden="true"';
  if (key === 'backend' || key === 'api' || key === 'code') return `<svg ${common}><path d="M12 21 23 12m-11 9 11 9M52 21 41 12m11 9-11 9M25 48h14M32 33v22"/></svg>`;
  if (key === 'infra' || key === 'container') return `<svg ${common}><rect x="10" y="14" width="44" height="36" rx="6"/><path d="M10 26h44M21 14v36M29 34h15M29 41h10"/></svg>`;
  if (key === 'data' || key === 'brain') return `<svg ${common}><ellipse cx="32" cy="16" rx="18" ry="8"/><path d="M14 16v15c0 4 8 8 18 8s18-4 18-8V16M14 31v15c0 4 8 8 18 8s18-4 18-8V31"/></svg>`;
  if (key === 'embedded' || key === 'chip') return `<svg ${common}><rect x="18" y="12" width="28" height="40" rx="5"/><path d="M25 22h14M25 30h14M27 42h10M18 22h-7M53 22h-7M18 40h-7M53 40h-7"/></svg>`;
  return `<svg ${common}><circle cx="32" cy="32" r="20"/><path d="m22 33 7 7 14-17"/></svg>`;
}

function header(site, locale, active, currentPath) {
  const L = labels[locale];
  const other = locale === 'en' ? 'id' : 'en';
  const alternatePath = currentPath.replace(`/${locale}/`, `/${other}/`);
  const nav = (key, label, href) => `<a href="/${locale}/${href}"${active === key ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
  return `<header class="site-header"><nav class="nav" aria-label="Primary navigation"><a class="brand" href="/${locale}/"><span class="brand-mark">&lt;/&gt;</span><span>${esc(site.shortName)}</span></a><div class="nav-links">${nav('home',L.home,'')}${nav('work',L.work,'work/')}${nav('resume',L.resume,'resume/')}<a class="language-switch" data-locale-choice="${other}" href="${esc(alternatePath)}" aria-label="${esc(L.language)}"><span class="language-current">${locale.toUpperCase()}</span><span aria-hidden="true">/</span><span>${other.toUpperCase()}</span></a></div></nav></header>`;
}

function footer(site, locale) {
  return `<footer class="site-footer"><div><span>© ${new Date().getFullYear()} ${esc(site.name)}</span><span class="footer-note">${locale === 'en' ? 'Built as static, bilingual, and deliberately maintainable.' : 'Dibangun static, bilingual, dan sengaja mudah dirawat.'}</span></div><div class="footer-links"><a href="mailto:${esc(site.email)}">Email</a><a href="${esc(site.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a></div></footer>`;
}

function localizedProject(p, locale) {
  return {...p, roleText: pick(p.role,locale), periodText: pick(p.period,locale), progressionText: pick(p.progressionLabel,locale), summaryText: pick(p.summary,locale), contributionText: pick(p.contribution,locale), cardCtaText: pick(p.cardCta,locale), liveLabelText: pick(p.liveLabel,locale), waitlistLabelText: pick(p.waitlistLabel,locale)};
}

function statusClass(p) { return `status-${p.progression}${p.waitlist ? ' has-waitlist' : ''}`; }
function tags(p, count=6) { return `<div class="tags">${p.tags.slice(0,count).map(t=>`<span>${esc(t)}</span>`).join('')}</div>`; }
function projectCard(p, locale, compact=false) {
  const href = `/${locale}/work/${p.slug}/`;
  const live = p.liveUrl ? `<a class="card-live" href="${esc(p.liveUrl)}" target="_blank" rel="noreferrer">${esc(p.liveLabelText)} <span>↗</span></a>` : '';
  const wait = p.waitlist ? `<span class="waitlist-disabled" aria-disabled="true">${esc(p.waitlistLabelText)}</span>` : '';
  return `<article class="project-card ${compact?'compact-card':''}" data-project-card data-progression="${esc(p.progression)}" data-categories="${esc(p.categories.join(' '))}" data-waitlist="${p.waitlist?'true':'false'}"><a class="project-visual" href="${href}" aria-label="${esc(p.cardCtaText)}"><img src="${esc(p.cover)}" alt="${esc(p.title)} project narrative illustration" loading="lazy" decoding="async"><span class="status-pill ${statusClass(p)}">${esc(p.progressionText)}</span>${wait}</a><div class="project-body"><div><h3><a href="${href}">${esc(p.title)}</a></h3><p>${esc(p.summaryText)}</p></div>${compact?'':`<div class="contribution-mini"><span>${labels[locale].contribution}</span><p>${esc(p.contributionText)}</p></div>`}${tags(p, compact?4:6)}<div class="card-actions"><a class="card-primary" href="${href}">${esc(p.cardCtaText)} <span>→</span></a>${live}</div></div></article>`;
}

function capabilityCards(site, locale) { return site.capabilities.map(c=>`<article class="capability-card"><span class="line-icon">${icon(c.key)}</span><h3>${esc(pick(c.title,locale))}</h3><p>${esc(pick(c.description,locale))}</p></article>`).join(''); }
function proofStrip(site, locale) { return `<section class="proof-strip" aria-label="${esc(labels[locale].proof)}">${site.proof.map(x=>`<article><strong>${esc(x.value)}</strong><span>${esc(x[locale])}</span></article>`).join('')}</section>`; }

function home(site, projects, locale) {
  const L=labels[locale], profile=site.profile, featured=projects.filter(p=>p.featured).sort((a,b)=>a.homeOrder-b.homeOrder).map(p=>localizedProject(p,locale));
  const more=projects.filter(p=>['eventalpha','fingerprint-attendance','magangradar'].includes(p.slug)).map(p=>localizedProject(p,locale));
  const credentialItems=site.credentials.slice(0,4).map(c=>`<a class="credential-card" href="${esc(c.url)}" target="_blank"><span class="credential-mark">✓</span><span><strong>${esc(c.title)}</strong><small>${esc(c.issuer)} · ${esc(c.year)}</small></span><span>↗</span></a>`).join('');
  return `<div class="page-shell"><section class="hero"><div class="hero-copy"><p class="eyebrow">${esc(pick(profile.role,locale))}</p><h1>${esc(pick(profile.headline,locale))}</h1><p class="hero-lede">${esc(pick(profile.summary,locale))}</p><div class="cta-row"><a class="button" href="/${locale}/work/">${L.viewWork}<span>→</span></a><a class="button secondary" href="/${locale}/resume/">${L.viewResume}<span>↓</span></a></div><div class="availability-status"><span class="status-dot"></span><span>${esc(pick(profile.availability,locale))}</span></div></div><aside class="hero-project-map"><p class="panel-label">${locale==='en'?'What I build':'Yang saya bangun'}</p><div class="hero-map-grid"><div><span class="line-icon">${icon('infra')}</span><strong>${locale==='en'?'Deployment systems':'Deployment system'}</strong><small>Deployee</small></div><div><span class="line-icon">${icon('backend')}</span><strong>${locale==='en'?'Production backend':'Backend production'}</strong><small>FACETRO</small></div><div><span class="line-icon">${icon('data')}</span><strong>${locale==='en'?'Applied research & AI':'Riset terapan & AI'}</strong><small>ACC · EventAlpha</small></div><div><span class="line-icon">${icon('embedded')}</span><strong>${locale==='en'?'System integration':'Integrasi sistem'}</strong><small>Fingerprint · edge devices</small></div></div></aside></section>${proofStrip(site,locale)}<section class="section"><div class="section-header"><div><p class="eyebrow">${L.featured}</p><h2>${L.featuredTitle}</h2></div><p>${L.featuredCopy}</p></div><div class="project-grid featured-grid">${featured.map(p=>projectCard(p,locale)).join('')}</div></section><section class="section compact-section"><div class="section-header"><div><p class="eyebrow">${L.moreWork}</p><h2>${L.moreTitle}</h2></div><a class="text-link" href="/${locale}/work/">${L.viewWork}<span>→</span></a></div><div class="project-grid compact-grid">${more.map(p=>projectCard(p,locale,true)).join('')}</div></section><section class="section"><div class="section-header"><div><p class="eyebrow">${L.capabilities}</p><h2>${locale==='en'?'Broad enough to cross boundaries, focused enough to own the system.':'Cukup luas untuk lintas boundary, cukup fokus untuk memiliki sistemnya.'}</h2></div><p>${locale==='en'?'Backend and infrastructure are the center; integration, operations, and applied research extend the range.':'Backend dan infrastruktur adalah pusatnya; integrasi, operasi, dan riset terapan memperluas jangkauannya.'}</p></div><div class="capability-grid">${capabilityCards(site,locale)}</div></section><section class="principle-band"><div><p class="eyebrow">${L.principles}</p></div>${site.principles.map((p,i)=>`<article><span>0${i+1}</span><h3>${esc(pick(p.title,locale))}</h3><p>${esc(pick(p.description,locale))}</p></article>`).join('')}</section><section class="section credentials-preview"><div class="section-header"><div><p class="eyebrow">${L.credentials}</p><h2>${locale==='en'?'Useful signals, kept in proportion.':'Sinyal pendukung, tetap pada porsinya.'}</h2></div><a class="text-link" href="/${locale}/resume/#credentials">${L.viewAllCredentials}<span>→</span></a></div><div class="credential-grid">${credentialItems}</div></section>${closingCta(site,locale,L.connectTitle,L.connectCopy,L.connect)}</div>`;
}

function filterButton(label, type, value, active=false) { return `<button type="button" class="filter-button${active?' active':''}" data-filter-${type}="${esc(value)}" aria-pressed="${active?'true':'false'}">${esc(label)}</button>`; }
function work(site, projects, locale) {
  const L=labels[locale]; const eng=projects.filter(p=>p.progression!=='research').map(p=>localizedProject(p,locale)); const research=projects.filter(p=>p.progression==='research').map(p=>localizedProject(p,locale));
  const progression=[['all',L.all],['production',locale==='en'?'Production':'Production'],['public',locale==='en'?'Public Product':'Produk Publik'],['prototype',locale==='en'?'Installed Prototype':'Prototipe Terpasang'],['development',locale==='en'?'In Development':'Dalam Pengembangan'],['waitlist',locale==='en'?'Open Waitlist':'Open Waitlist'],['research',locale==='en'?'Research':'Riset']];
  const capability=[['all',L.all],['backend',locale==='en'?'Backend Systems':'Sistem Backend'],['infra',locale==='en'?'Infrastructure & DevOps':'Infrastruktur & DevOps'],['data','Data & Applied AI'],['embedded',locale==='en'?'Embedded Systems':'Sistem Embedded'],['research',locale==='en'?'Research':'Riset']];
  return `<div class="page-shell"><section class="work-hero"><p class="eyebrow">${L.workEyebrow}</p><div><h1>${L.workTitle}</h1><p>${L.workCopy}</p></div></section><section class="filter-panel" data-filter-panel><div><span>${L.filterProgress}</span><div class="filter-buttons">${progression.map(([v,l],i)=>filterButton(l,'progression',v,i===0)).join('')}</div></div><div><span>${L.filterCapability}</span><div class="filter-buttons">${capability.map(([v,l],i)=>filterButton(l,'capability',v,i===0)).join('')}</div></div></section><p class="filter-empty" data-filter-empty hidden>${L.noResults}</p><section class="work-group" data-project-group><div class="work-group-head"><p class="eyebrow">${locale==='en'?'Products & systems':'Produk & sistem'}</p><h2>${locale==='en'?'From production deployments to focused public tools.':'Dari deployment production hingga public tools yang fokus.'}</h2></div><div class="project-grid work-grid">${eng.map(p=>projectCard(p,locale)).join('')}</div></section><section class="work-group research-group" data-project-group><div class="work-group-head"><p class="eyebrow">${L.researchEyebrow}</p><h2>${L.researchTitle}</h2><p>${L.researchCopy}</p></div><div class="project-grid research-grid">${research.map(p=>projectCard(p,locale)).join('')}</div></section>${closingCta(site,locale,locale==='en'?'The next useful system could be yours.':'Sistem berguna berikutnya bisa jadi milik timmu.',locale==='en'?'I am looking for early-career FDE, Solutions Architecture, Backend, and DevOps work with real operational constraints.':'Saya mencari role early-career FDE, Solutions Architecture, Backend, dan DevOps dengan constraint operasional nyata.',L.connect)}</div>`;
}

function toolkitCards(site,locale) { return site.toolkit.map(t=>`<article class="toolkit-card"><span class="line-icon large">${icon(t.icon)}</span><div><h3>${esc(pick(t.title,locale))}</h3><p>${esc(t.items)}</p></div></article>`).join(''); }
function credentials(site) { return site.credentials.map(c=>`<a class="credential-card" href="${esc(c.url)}" target="_blank"><span class="credential-mark">✓</span><span><strong>${esc(c.title)}</strong><small>${esc(c.issuer)} · ${esc(c.year)}</small></span><span>↗</span></a>`).join(''); }
function resume(site, projects, locale) {
  const L=labels[locale], prof=site.profile; const selected=['deployee','facetro','adaptive-cruise-control','eventalpha'].map(s=>localizedProject(projects.find(p=>p.slug===s),locale));
  return `<div class="page-shell"><section class="resume-hero"><div><p class="eyebrow">${L.resumeEyebrow}</p><h1>${L.resumeTitle}</h1><p class="hero-lede">${L.resumeCopy}</p><div class="cta-row"><a class="button" href="${esc(site.resume)}" target="_blank">${L.downloadResume}<span>↓</span></a><a class="button secondary" href="/${locale}/work/">${L.viewWork}<span>→</span></a></div><div class="availability-status"><span class="status-dot"></span><span>${esc(pick(prof.availability,locale))}</span></div></div><aside class="profile-card"><p class="panel-label">${L.profileSnapshot}</p><h2>${esc(site.name)}</h2><p class="profile-role">${esc(pick(prof.role,locale))}</p><dl><div><dt>${locale==='en'?'Location':'Lokasi'}</dt><dd>${esc(pick(prof.location,locale))}</dd></div><div><dt>${L.education}</dt><dd>${esc(pick(prof.education,locale))}</dd></div><div><dt>Email</dt><dd><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></dd></div><div><dt>LinkedIn</dt><dd><a href="${esc(site.linkedin)}" target="_blank">linkedin.com/in/mkfauz</a></dd></div></dl></aside></section><section class="section"><div class="section-header"><div><p class="eyebrow">${L.toolkit}</p><h2>${locale==='en'?'Tools grouped by the systems work they support.':'Tool dikelompokkan berdasarkan pekerjaan sistem yang didukung.'}</h2></div></div><div class="toolkit-grid">${toolkitCards(site,locale)}</div></section><section class="resume-experience"><div class="experience-main"><p class="eyebrow">${L.experience}</p><div class="experience-entry"><h2>${locale==='en'?'Software / Infrastructure Intern':'Software / Infrastructure Intern'}</h2><p class="experience-meta">PT Sakura System Solutions · ${locale==='en'?'August 2026 – Present':'Agustus 2026 – Sekarang'}</p><p>${locale==='en'?'Working across deployment engineering, infrastructure, and internal operational tooling. Deployee is the main systems project: a server-agent framework focused on repeatable deployment, target visibility, exposure configuration, logs, and recovery behavior.':'Bekerja pada deployment engineering, infrastruktur, dan tooling operasional internal. Deployee menjadi proyek sistem utama: framework server-agent yang berfokus pada deployment repeatable, target visibility, exposure configuration, log, dan recovery behavior.'}</p><a class="text-link" href="/${locale}/work/deployee/">${locale==='en'?'Explore Deployee':'Jelajahi Deployee'}<span>→</span></a></div><div class="experience-divider"></div><div class="experience-entry previous"><h3>Backend Engineer Intern</h3><p class="experience-meta">PT Global Data Inspirasi · ${locale==='en'?'September 2024 – July 2025':'September 2024 – Juli 2025'}</p><p>${locale==='en'?'Built and operated FACETRO for Universitas Negeri Semarang across backend modularization, APIs, SSO, storage, reporting, deployment automation, and edge migration.':'Membangun dan mengoperasikan FACETRO untuk Universitas Negeri Semarang melalui modularisasi backend, API, SSO, storage, reporting, deployment automation, dan edge migration.'}</p><a class="text-link" href="/${locale}/work/facetro/">${locale==='en'?'Explore FACETRO':'Jelajahi FACETRO'}<span>→</span></a></div></div><div class="experience-projects"><p class="eyebrow">${L.projectExperience}</p>${selected.map(p=>`<a href="/${locale}/work/${p.slug}/"><span><strong>${esc(p.title)}</strong><small>${esc(p.roleText)} · ${esc(p.progressionText)}</small></span><span>→</span></a>`).join('')}</div></section><section class="section" id="credentials"><div class="section-header"><div><p class="eyebrow">${L.selectedCredentials}</p><h2>${locale==='en'?'Supporting credentials, not substitutes for the work.':'Kredensial pendukung, bukan pengganti pengalaman.'}</h2></div></div><div class="credential-grid">${credentials(site)}</div></section>${closingCta(site,locale,L.resumeCtaTitle,L.resumeCtaCopy,L.openLinkedIn,true)}</div>`;
}

function closingCta(site,locale,title,copy,buttonLabel,strong=false) { return `<section class="closing-cta${strong?' strong':''}"><div><p class="eyebrow">${labels[locale].nextStep}</p><h2>${esc(title)}</h2><p>${esc(copy)}</p></div><a class="button" href="${esc(site.linkedin)}" target="_blank" rel="noreferrer">${esc(buttonLabel)}<span>↗</span></a></section>`; }

function article(site, p, body, locale) {
  const L=labels[locale]; const live=p.liveUrl?`<a class="button" href="${esc(p.liveUrl)}" target="_blank" rel="noreferrer">${esc(p.liveLabelText)}<span>↗</span></a>`:''; const wait=p.waitlist?`<button class="button disabled" disabled>${esc(p.waitlistLabelText)}</button>`:'';
  return `<article class="article-shell"><header class="article-header"><div class="article-title"><p class="eyebrow">${esc(p.progressionText)} · ${esc(p.year)}</p><h1>${esc(p.title)}</h1><p class="article-deck">${esc(p.summaryText)}</p></div><div class="article-meta"><div><span>${L.role}</span><strong>${esc(p.roleText)}</strong></div><div><span>${L.period}</span><strong>${esc(p.periodText)}</strong></div><div><span>${L.context}</span><strong>${esc(p.organization)}</strong></div><div><span>${L.currentStatus}</span><strong>${esc(p.progressionText)}</strong></div></div><div class="article-actions">${live}${wait}<a class="button secondary" href="/${locale}/work/">${L.articleBack}<span>←</span></a></div><figure class="article-cover"><img src="${esc(p.cover)}" alt="${esc(p.title)} narrative illustration"></figure><aside class="contribution-callout"><span>${L.contribution}</span><p>${esc(p.contributionText)}</p></aside></header><div class="prose">${body}</div>${closingCta(site,locale,L.articleCtaTitle,L.articleCtaCopy,L.connect)}</article>`;
}

async function copyDir(from,to){await fs.mkdir(to,{recursive:true});for(const e of await fs.readdir(from,{withFileTypes:true})){const a=path.join(from,e.name),b=path.join(to,e.name);e.isDirectory()?await copyDir(a,b):await fs.copyFile(a,b)}}
async function write(rel, content){const target=path.join(dist,rel);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,content)}

async function main(){
 const site=JSON.parse(await fs.readFile(path.join(src,'data','site.json'),'utf8')); const projects=JSON.parse(await fs.readFile(path.join(src,'data','projects.json'),'utf8')); const base=await fs.readFile(path.join(src,'templates','base.html'),'utf8');
 await fs.rm(dist,{recursive:true,force:true}); await fs.mkdir(dist,{recursive:true}); await copyDir(path.join(root,'public'),dist); await fs.mkdir(path.join(dist,'assets'),{recursive:true}); await fs.copyFile(path.join(src,'styles','global.css'),path.join(dist,'assets','global.css')); await fs.copyFile(path.join(root,'public','site.js'),path.join(dist,'assets','site.js')); await copyDir(path.join(src,'images'),path.join(dist,'assets','images'));
 const renderPage=async(locale,rel,active,title,description,content,og)=>{const currentPath=`/${locale}/${rel}`.replace(/\/+/g,'/');const en=currentPath.replace(`/${locale}/`,'/en/'),id=currentPath.replace(`/${locale}/`,'/id/');const seoLinks=site.siteUrl?`<meta property="og:url" content="${esc(site.siteUrl+currentPath)}"><meta property="og:image" content="${esc(site.siteUrl+og)}"><link rel="canonical" href="${esc(site.siteUrl+currentPath)}"><link rel="alternate" hreflang="en" href="${esc(site.siteUrl+en)}"><link rel="alternate" hreflang="id" href="${esc(site.siteUrl+id)}">`:'';const html=template(base,{locale,title:esc(title),description:esc(description),seoLinks,skipLabel:labels[locale].skip,header:header(site,locale,active,currentPath),content,footer:footer(site,locale)});await write(path.join(locale,rel,'index.html'),html)};
 for(const locale of locales){
  await renderPage(locale,'','home',`${site.name} | ${pick(site.profile.role,locale)}`,pick(site.profile.summary,locale),home(site,projects,locale),'/assets/images/projects/deployee/cover.svg');
  await renderPage(locale,'work/','work',`${labels[locale].work} | ${site.name}`,labels[locale].workCopy,work(site,projects,locale),'/assets/images/projects/deployee/cover.svg');
  await renderPage(locale,'resume/','resume',`${labels[locale].resume} | ${site.name}`,labels[locale].resumeCopy,resume(site,projects,locale),'/assets/images/projects/deployee/cover.svg');
  for(const raw of projects){const p=localizedProject(raw,locale);const bodyRaw=await fs.readFile(path.join(src,'portfolio',raw.slug,`${locale}.md`),'utf8');await renderPage(locale,`work/${raw.slug}/`,'work',`${raw.title} | ${site.name}`,p.summaryText,article(site,p,markdown(bodyRaw),locale),raw.cover)}
 }
 await write('index.html',`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(site.name)}</title><script>const l=localStorage.getItem('portfolio-locale');location.replace(l==='id'?'/id/':'/en/')</script><noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript></head><body><a href="/en/">English</a> · <a href="/id/">Indonesia</a></body></html>`);
 await write('404.html',`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/assets/global.css"><title>404 | ${esc(site.name)}</title></head><body><main class="page-shell"><section class="error-page"><p class="eyebrow">404</p><h1>That route does not exist.</h1><p>The failure state is at least honest.</p><a class="button" href="/en/">Go home</a></section></main></body></html>`);
 if(site.siteUrl){const urls=[];for(const locale of locales){urls.push(`${site.siteUrl}/${locale}/`,`${site.siteUrl}/${locale}/work/`,`${site.siteUrl}/${locale}/resume/`,...projects.map(p=>`${site.siteUrl}/${locale}/work/${p.slug}/`))}await fs.writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${esc(u)}</loc></url>`).join('')}</urlset>`)}
 console.log(`Built ${projects.length} projects in ${locales.length} locales.`);
}
main().catch(e=>{console.error(e.stack||e);process.exit(1)});
