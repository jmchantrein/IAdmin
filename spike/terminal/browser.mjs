#!/usr/bin/env node
/**
 * Browser measurements for one image: time until the machine answers, and bytes downloaded,
 * on a page served without any special header (as GitHub Pages would).
 * Usage: V86_ROOT=<clone of copy/v86> node browser.mjs <alpine|debian>
 * Needs the states written by measure.mjs.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const image = process.argv[2];
const here = import.meta.dirname;
const out = path.join(here, 'out', image);
const PORT = 4400;

const ROOTS = {
  '/page/': path.join(here, 'page'),
  '/spike/': here,
  '/out/': out,
  '/v86/': path.join(here, '../../node_modules/v86/build'),
  '/bios/': path.join(process.env.V86_ROOT, 'bios'),
};
const TYPES = {
  '.html': 'text/html',
  '.mjs': 'text/javascript',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const prefix = Object.keys(ROOTS).find((p) => url.pathname.startsWith(p));
  const file =
    prefix && path.join(ROOTS[prefix], path.normalize(url.pathname.slice(prefix.length)));
  if (
    !file ||
    !file.startsWith(ROOTS[prefix]) ||
    !fs.existsSync(file) ||
    fs.statSync(file).isDirectory()
  ) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Content-Length': fs.statSync(file).size,
  });
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(PORT, resolve));

const megabytes = (bytes) => Math.round((bytes / 1024 / 1024) * 10) / 10;
const browser = await chromium.launch();
const runs = [];

for (const memoryMb of [128, 256]) {
  if (!fs.existsSync(path.join(out, `state-${memoryMb}.bin.zst`))) {
    runs.push({ memoryMb, error: 'instantané absent' });
    continue;
  }
  const page = await browser.newPage();
  const problems = [];
  page.on('pageerror', (error) => problems.push(error.message));
  page.on('response', (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));

  // Bytes actually transferred, as counted by the browser's network stack.
  let bytes = 0;
  let requests = 0;
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  cdp.on('Network.loadingFinished', (event) => {
    bytes += event.encodedDataLength;
    requests += 1;
  });

  const run = { memoryMb };
  try {
    await page.goto(`http://localhost:${PORT}/page/index.html?image=${image}&mem=${memoryMb}`);
    run.readyS = (await page.evaluate(() => window.ready)) / 1000;
    run.readyMb = megabytes(bytes);
    run.readyRequests = requests;

    // On-demand downloads: each command pulls the files it reads from the 9p filesystem.
    const commands = {
      ls: 'ls /usr/bin | wc -l',
      man: 'MANPAGER=cat man ls | head -5',
      grep: 'grep -c root /etc/passwd',
    };
    for (const [name, command] of Object.entries(commands)) {
      const beforeBytes = bytes;
      const started = Date.now();
      const result = await page.evaluate((c) => window.machine.exec(c, 120_000), command);
      run[name] = {
        code: result.code,
        seconds: (Date.now() - started) / 1000,
        megabytes: megabytes(bytes - beforeBytes),
        output: result.output.trim().slice(0, 200),
      };
    }

    // The learner's terminal answers too.
    await page.evaluate(() => window.machine.type('echo $((6*7))\n'));
    await page.waitForFunction(() => /\n42\r?\n/.test(window.machine.learnerText()), null, {
      timeout: 30_000,
    });
    run.learnerTerminal = true;
    run.totalMb = megabytes(bytes);
  } catch (error) {
    run.error = error.message.split('\n')[0];
  }
  if (problems.length > 0) run.problems = problems.slice(0, 5);
  console.log(JSON.stringify(run, null, 2));
  runs.push(run);
  await page.close();
}

await browser.close();
server.close();
fs.writeFileSync(path.join(out, 'results-browser.json'), JSON.stringify({ image, runs }, null, 2));

const cell = (c) => (c ? `${c.seconds} s, ${c.megabytes} Mo, code ${c.code}` : '—');
const rows = [
  `### ${image} — mesures dans Chromium`,
  '',
  '| Mémoire | Délai jusqu’à la machine prête | Téléchargé avant | Requêtes | `ls` | `man ls` | `grep` | Terminal | Total |',
  '|---|---|---|---|---|---|---|---|---|',
  ...runs.map((r) =>
    r.error && !r.readyS
      ? `| ${r.memoryMb} Mo | échec : ${r.error} ||||||||`
      : `| ${r.memoryMb} Mo | ${r.readyS} s | ${r.readyMb} Mo | ${r.readyRequests} | ${cell(r.ls)} | ${cell(r.man)} | ${cell(r.grep)} | ${r.learnerTerminal ?? r.error} | ${r.totalMb ?? '—'} Mo |`,
  ),
  '',
].join('\n');
console.log(rows);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, rows);
process.exit(runs.some((r) => r.error) ? 1 : 0);
