import http from 'node:http';
import { promises as fs, watch } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT || 4173);
let building = false;
let pending = false;

function build() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  const child = spawn(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });
  child.on('exit', () => {
    building = false;
    if (pending) {
      pending = false;
      build();
    }
  });
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const safePath = (urlPath) => path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.(\/|\\|$))+/, '');

const server = http.createServer(async (req, res) => {
  try {
    const requestPath = safePath(new URL(req.url, `http://${req.headers.host}`).pathname);
    let target = path.join(dist, requestPath);
    let stat = await fs.stat(target).catch(() => null);
    if (stat?.isDirectory()) target = path.join(target, 'index.html');
    if (!stat && !path.extname(target)) target = path.join(target, 'index.html');
    let status = 200;
    let data;
    try {
      data = await fs.readFile(target);
    } catch {
      status = 404;
      target = path.join(dist, '404.html');
      data = await fs.readFile(target);
    }
    res.writeHead(status, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(error.message);
  }
});

build();
for (const directory of ['src', 'public']) {
  watch(path.join(root, directory), { recursive: true }, () => build());
}
server.listen(port, () => console.log(`Development server: http://localhost:${port}`));
