import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const [rawSlug, ...titleParts] = process.argv.slice(2);

if (!rawSlug) {
  console.error('Usage: npm run new -- project-slug "Project Title"');
  process.exit(1);
}

const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
if (!slug) {
  console.error('The project slug must contain letters or numbers. Humanity survives another validation error.');
  process.exit(1);
}

const title = titleParts.join(' ').trim() || slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
const mark = title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
const portfolioPath = path.join(root, 'src', 'portfolio', `${slug}.md`);
const coverPath = path.join(root, 'src', 'images', 'projects', `${slug}.svg`);
const demoPath = path.join(root, 'src', 'images', 'projects', `${slug}-demo-frame.svg`);

for (const target of [portfolioPath, coverPath, demoPath]) {
  try {
    await fs.access(target);
    console.error(`Refusing to overwrite existing file: ${path.relative(root, target)}`);
    process.exit(1);
  } catch {
    // Expected: file does not exist.
  }
}

const markdown = `---
title: ${title}
slug: ${slug}
summary: Explain what a user can accomplish in one sentence.
status: Prototype
role: Backend and software engineering
year: ${new Date().getFullYear()}
readTime: 4 min
featured: false
cover: /assets/images/projects/${slug}.svg
tags: Backend, API, Deployment
primaryCtaLabel: View demo
primaryCtaUrl: #demo
secondaryCtaLabel: Read case study
source: Private
mark: ${mark}
---

A direct opening sentence explaining why this project exists.

![${title} usage frame](/assets/images/projects/${slug}-demo-frame.svg "Replace this illustrated frame with sanitized screenshots or a short recording when available.")

## The problem

Describe the operational problem in one or two short paragraphs.

## How it is used

1. Explain the user's input.
2. Explain the primary system action.
3. Explain the useful output.

## My contribution

State the components, decisions, and responsibilities you personally handled.

## Key technical decisions

### 1. First decision

Explain the trade-off and why the decision mattered.

### 2. Second decision

Explain the failure mode or maintenance benefit.

## Outcome

Describe the real operational result without inventing metrics.

## Source availability

The source code is private. This case study documents the workflow, engineering responsibilities, and technical decisions.
`;

const cover = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="t d">
<title id="t">${title} workflow</title><desc id="d">A simple three-step placeholder diagram for ${title}.</desc>
<rect width="1200" height="675" rx="32" fill="#151917"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <rect x="90" y="190" width="270" height="220" rx="28" stroke="#d6b27b" stroke-width="5"/>
  <path d="M145 255h160m-160 55h110m-110 55h140" stroke="#e7e0d5" stroke-width="4"/>
  <text x="225" y="456" text-anchor="middle" font-family="ui-monospace, monospace" font-size="21" fill="#d6b27b">input</text>

  <rect x="465" y="190" width="270" height="220" rx="28" stroke="#e36f43" stroke-width="5"/>
  <circle cx="600" cy="300" r="58" stroke="#e7e0d5" stroke-width="4"/>
  <text x="600" y="315" text-anchor="middle" font-family="ui-monospace, monospace" font-size="34" font-weight="700" fill="#e36f43">${mark}</text>
  <text x="600" y="456" text-anchor="middle" font-family="ui-monospace, monospace" font-size="21" fill="#e36f43">system action</text>

  <rect x="840" y="190" width="270" height="220" rx="28" stroke="#9eae86" stroke-width="5"/>
  <path d="M900 345V285m55 60v-94m55 94v-125m55 125H890" stroke="#e7e0d5" stroke-width="4"/>
  <text x="975" y="456" text-anchor="middle" font-family="ui-monospace, monospace" font-size="21" fill="#9eae86">useful output</text>

  <path d="M360 300h105m270 0h105" stroke="#cfc7bc" stroke-width="4"/>
  <path d="m448 286 17 14-17 14m375-28 17 14-17 14" stroke="#cfc7bc" stroke-width="4"/>
</g>
</svg>`;

const demo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="img" aria-labelledby="t d">
<title id="t">${title} demo frame</title><desc id="d">A dark product frame showing input, system action, and output.</desc>
<rect width="1200" height="760" rx="32" fill="#151917"/>
<rect x="70" y="70" width="1060" height="620" rx="28" fill="#101311" stroke="#71695f" stroke-width="5"/>
<path d="M70 155h1060" stroke="#343a35" stroke-width="4"/>
<circle cx="120" cy="112" r="9" fill="#e36f43"/><circle cx="153" cy="112" r="9" fill="#d6b27b"/><circle cx="186" cy="112" r="9" fill="#9eae86"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
  <rect x="130" y="235" width="260" height="300" rx="20" stroke="#343a35" stroke-width="4"/>
  <path d="M175 300h170m-170 55h120m-120 55h150" stroke="#e7e0d5" stroke-width="4"/>
  <text x="260" y="585" text-anchor="middle" font-family="ui-monospace, monospace" font-size="20" fill="#d6b27b">input</text>

  <rect x="470" y="235" width="260" height="300" rx="20" stroke="#e36f43" stroke-width="4"/>
  <circle cx="600" cy="370" r="64" stroke="#e7e0d5" stroke-width="4"/>
  <text x="600" y="386" text-anchor="middle" font-family="ui-monospace, monospace" font-size="38" font-weight="700" fill="#e36f43">${mark}</text>
  <text x="600" y="585" text-anchor="middle" font-family="ui-monospace, monospace" font-size="20" fill="#e36f43">process</text>

  <rect x="810" y="235" width="260" height="300" rx="20" stroke="#343a35" stroke-width="4"/>
  <path d="M870 445V365m55 80V335m55 110V295m55 150H850" stroke="#9eae86" stroke-width="4"/>
  <text x="940" y="585" text-anchor="middle" font-family="ui-monospace, monospace" font-size="20" fill="#9eae86">output</text>

  <path d="M390 385h80m260 0h80" stroke="#cfc7bc" stroke-width="4" stroke-dasharray="8 9"/>
  <path d="m453 371 17 14-17 14m340-28 17 14-17 14" stroke="#cfc7bc" stroke-width="4"/>
</g>
</svg>`;

await fs.mkdir(path.dirname(portfolioPath), { recursive: true });
await fs.mkdir(path.dirname(coverPath), { recursive: true });
await Promise.all([
  fs.writeFile(portfolioPath, markdown),
  fs.writeFile(coverPath, cover),
  fs.writeFile(demoPath, demo),
]);

console.log(`Created:\n- ${path.relative(root, portfolioPath)}\n- ${path.relative(root, coverPath)}\n- ${path.relative(root, demoPath)}`);
console.log('Next: edit the Markdown, run npm run dev, and replace the diagrams only when real media is safe to publish.');
