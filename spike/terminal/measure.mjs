#!/usr/bin/env node
/**
 * Node measurements for one image: cold boot, control channel, saved state, reset.
 * Usage: V86_ROOT=<clone of copy/v86> node measure.mjs <alpine|debian>
 * Writes out/<image>/state-<memory>.bin.zst and out/<image>/results-node.json.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { V86 } from 'v86';
import { atPrompt, drive, machineOptions, printed } from './machine.mjs';

const image = process.argv[2];
const here = import.meta.dirname;
const out = path.join(here, 'out', image);
const v86Root = process.env.V86_ROOT;
const MEMORY_SIZES = [128, 256];
const BOOT_TIMEOUT_MS = 10 * 60_000;

const files = {
  wasm: path.join(here, '../../node_modules/v86/build/v86.wasm'),
  bios: path.join(v86Root, 'bios/seabios.bin'),
  vgaBios: path.join(v86Root, 'bios/vgabios.bin'),
  rootfs: path.join(out, 'rootfs-flat') + '/',
  fsJson: path.join(out, 'fs.json'),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const seconds = (since) => Math.round((performance.now() - since) / 100) / 10;
const megabytes = (bytes) => Math.round((bytes / 1024 / 1024) * 10) / 10;

async function waitFor(condition, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  while (!condition()) {
    if (Date.now() > deadline) throw new Error(`délai dépassé : ${label}`);
    await sleep(100);
  }
}

function rootfsStats() {
  const flat = fs.readdirSync(files.rootfs);
  return {
    rootfsTarMb: megabytes(fs.statSync(path.join(out, 'rootfs.tar')).size),
    rootfsFlatMb: megabytes(
      flat.reduce((sum, name) => sum + fs.statSync(path.join(files.rootfs, name)).size, 0),
    ),
    rootfsFiles: flat.length,
    fsJsonMb: megabytes(fs.statSync(files.fsJson).size),
  };
}

async function measureSteps(memoryMb, live) {
  const result = { memoryMb };
  const statePath = path.join(out, `state-${memoryMb}.bin`);

  // 1. Cold boot, until the control agent answers and the learner sees a prompt.
  let start = performance.now();
  let emulator = new V86(machineOptions({ image, memoryMb, files }));
  let machine = drive(emulator);
  Object.assign(live, { emulator, machine });
  // Boot timeline: the last console line every 30 s, to see where a slow boot spends its time.
  const lastLine = () => machine.learnerText().trimEnd().split('\n').at(-1)?.slice(-110) ?? '';
  const heartbeat = setInterval(() => console.log(`[${seconds(start)} s] ${lastLine()}`), 30_000);
  try {
    await machine.ready(BOOT_TIMEOUT_MS);
    await waitFor(() => atPrompt(machine.learnerText()), 120_000, 'invite du terminal');
  } finally {
    clearInterval(heartbeat);
  }
  result.coldBootS = seconds(start);

  // 2. Control channel: exit code and output come back, the learner's terminal stays untouched.
  const before = machine.learnerText().length;
  const failing = await machine.exec('exit 3');
  const echo = await machine.exec('echo bonjour');
  result.controlExitCode = failing.code;
  result.controlOutput = echo.output.trim();
  result.learnerBytesDuringControl = machine.learnerText().length - before;

  // 3. The learner's terminal works on its own.
  machine.type('echo $((6*7))\n');
  await waitFor(() => printed(machine.learnerText(), '42'), 30_000, 'écho du terminal');

  result.memory = (await machine.exec('free -m | awk \'NR==2 {print $3 "/" $2}\'')).output.trim();
  result.manFr = (
    await machine.exec('ls /usr/share/man/fr/man1 2>/dev/null | wc -l')
  ).output.trim();

  // 4. Saved state, taken on a quiet machine with empty caches.
  await machine.exec('dmesg -n 1; sync; echo 3 > /proc/sys/vm/drop_caches');
  await sleep(5_000);
  const state = await emulator.save_state();
  fs.writeFileSync(statePath, new Uint8Array(state));
  execFileSync('zstd', ['-19', '-q', '-f', statePath]);
  result.stateMb = megabytes(state.byteLength);
  result.stateZstMb = megabytes(fs.statSync(`${statePath}.zst`).size);
  fs.rmSync(statePath);

  // 5. Reset in place: a file created after the state must be gone after the restore.
  await machine.exec('touch /root/trace-apprenant');
  start = performance.now();
  await emulator.restore_state(state);
  machine.resetControl();
  await machine.ready(60_000);
  result.restoreS = seconds(start);
  result.resetClean = (await machine.exec('test -e /root/trace-apprenant')).code === 1;
  await emulator.destroy();

  // 6. Fresh machine started from the compressed state, as a visitor's browser would.
  start = performance.now();
  emulator = new V86(machineOptions({ image, memoryMb, files, initialState: `${statePath}.zst` }));
  machine = drive(emulator);
  Object.assign(live, { emulator, machine });
  try {
    await machine.ready(120_000);
    result.warmStartS = seconds(start);
  } catch (error) {
    result.warmStartError = error.message;
  }
  await emulator.destroy();
  return result;
}

/** Runs the steps; on any failure, shows the end of the console and stops the emulator. */
async function measure(memoryMb) {
  const live = {};
  try {
    return await measureSteps(memoryMb, live);
  } catch (error) {
    const text = JSON.stringify(live.machine?.learnerText().slice(-1500) ?? '');
    console.log(`--- fin de la console (${memoryMb} Mo), caractères de contrôle visibles ---`);
    console.log(text);
    await live.emulator?.destroy();
    return { memoryMb, error: error.message };
  }
}

const results = { image, ...rootfsStats(), runs: [] };
for (const memoryMb of MEMORY_SIZES) {
  console.log(`\n=== ${image}, ${memoryMb} Mo ===`);
  const run = await measure(memoryMb);
  console.log(JSON.stringify(run, null, 2));
  results.runs.push(run);
}

fs.writeFileSync(path.join(out, 'results-node.json'), JSON.stringify(results, null, 2));

const rows = [
  `### ${image} — mesures sous Node`,
  '',
  `Racine : ${results.rootfsTarMb} Mo en archive, ${results.rootfsFlatMb} Mo compressée en ${results.rootfsFiles} fichiers ; index ${results.fsJsonMb} Mo.`,
  '',
  '| Mémoire | Démarrage à froid | Code de `exit 3` | Octets sur le terminal | Instantané brut | Instantané zstd | Remise à zéro | Trace effacée | Départ depuis l’instantané | Mémoire utilisée | Pages fr |',
  '|---|---|---|---|---|---|---|---|---|---|---|',
  ...results.runs.map((r) =>
    r.error
      ? `| ${r.memoryMb} Mo | échec : ${r.error} |||||||||||`
      : `| ${r.memoryMb} Mo | ${r.coldBootS} s | ${r.controlExitCode} | ${r.learnerBytesDuringControl} | ${r.stateMb} Mo | ${r.stateZstMb} Mo | ${r.restoreS} s | ${r.resetClean} | ${r.warmStartS ?? r.warmStartError} s | ${r.memory} Mo | ${r.manFr} |`,
  ),
  '',
].join('\n');
console.log(rows);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, rows);

// v86 keeps timers alive: leave explicitly. A failed run fails the job after the report.
process.exit(results.runs.some((r) => r.error) ? 1 : 0);
