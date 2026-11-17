/**
 * Driver shared by Node and the browser: wraps a v86 emulator whose guest runs
 * `control-agent` on its second serial port.
 *
 * - ttyS0 is the learner's terminal: `learnerText()` reads it, `type()` writes to it.
 * - ttyS1 is the control channel: `exec()` runs a command there and returns its exit code
 *   and output, without writing anything to the learner's terminal.
 */

const MB = 1024 * 1024;
const MARK = '\x1e';

export const CMDLINE = {
  alpine:
    'rw root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose modules=virtio_pci ' +
    'console=ttyS0 tsc=reliable init_on_free=on',
  debian:
    'rw init=/bin/systemd root=host9p console=ttyS0 spectre_v2=off pti=off init_on_free=on ' +
    'systemd.hostname=localhost',
};

/** v86 options common to every run. `files` gives the location of each resource. */
export function machineOptions({ image, memoryMb, files, initialState }) {
  return {
    wasm_path: files.wasm,
    bios: { url: files.bios },
    vga_bios: { url: files.vgaBios },
    autostart: true,
    memory_size: memoryMb * MB,
    vga_memory_size: 2 * MB,
    filesystem: { baseurl: files.rootfs, basefs: files.fsJson },
    uart1: true,
    disable_keyboard: true,
    disable_mouse: true,
    disable_speaker: true,
    // A saved state already holds the booted kernel: the kernel image is only read on a cold boot.
    ...(initialState
      ? { initial_state: { url: initialState } }
      : { bzimage_initrd_from_filesystem: true, cmdline: CMDLINE[image] }),
  };
}

export function drive(emulator) {
  let learner = '';
  let control = '';
  let nextId = 0;
  const pending = new Map();
  const encoder = new TextEncoder();

  emulator.add_listener('serial0-output-byte', (byte) => {
    learner += String.fromCharCode(byte);
  });

  // A reply is framed as MARK <id> ':' <exit code> MARK, after the command output.
  emulator.add_listener('serial1-output-byte', (byte) => {
    control += String.fromCharCode(byte);
    const match = /\x1e(\d+):(\d+)\x1e$/.exec(control);
    if (!match) return;
    const output = control.slice(0, match.index);
    control = '';
    const resolve = pending.get(Number(match[1]));
    pending.delete(Number(match[1]));
    resolve?.({ code: Number(match[2]), output });
  });

  /** Runs a shell command on the control channel. Rejects after `timeoutMs`. */
  const exec = (command, timeoutMs = 60_000) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`sans réponse après ${timeoutMs} ms : ${command}`));
      }, timeoutMs);
      pending.set(id, (result) => {
        clearTimeout(timer);
        resolve(result);
      });
      const line = `( ${command} ) 2>&1; printf '\\036%s:%s\\036' ${id} "$?"\n`;
      emulator.serial_send_bytes(1, encoder.encode(line));
    });

  /** Resolves once the control agent answers; probes are repeated until then. */
  const ready = async (timeoutMs) => {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        await exec('true', 2_000);
        return;
      } catch {
        // The guest is still booting: try again.
      }
    }
    throw new Error(`machine non prête après ${timeoutMs} ms`);
  };

  return {
    exec,
    ready,
    learnerText: () => learner,
    type: (text) => emulator.serial0_send(text),
    /** Drops what the control channel has buffered (stale replies after a restore). */
    resetControl: () => {
      control = '';
      pending.clear();
    },
  };
}

/** True when the learner's terminal shows a shell prompt. */
export const atPrompt = (text) => /[#$] $/.test(text);
