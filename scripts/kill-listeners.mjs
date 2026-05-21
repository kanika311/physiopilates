/**
 * Frees common Next.js dev ports so only one server owns `.next/` (avoids EPERM on `.next/trace`).
 * Windows: netstat + taskkill. macOS/Linux: lsof + kill (best-effort).
 */
import { execSync } from "node:child_process";
import process from "node:process";

const DEFAULT_PORTS = [3000, 3001];

function parsePorts(argv) {
  const raw = argv.slice(2).map(Number).filter((n) => n > 0 && n < 65536);
  return raw.length ? raw : DEFAULT_PORTS;
}

function killPidWindows(pid) {
  try {
    execSync(`taskkill /F /PID ${pid}`, { stdio: "pipe" });
    console.log(`Stopped process ${pid} (Windows)`);
  } catch {
    /* ignore — already exited or needs elevation */
  }
}

/** @param {string} output */
function pidsListeningOnPort(output, port) {
  const pids = new Set();
  const portSuffix = `:${port}`;
  for (const line of output.split(/\r?\n/)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 5) continue;
    const local = parts[1];
    const state = parts[3];
    const pid = parts[parts.length - 1];
    if (state !== "LISTENING") continue;
    if (!local.endsWith(portSuffix)) continue;
    if (/^\d+$/.test(pid) && pid !== String(process.pid)) pids.add(pid);
  }
  return [...pids];
}

function killPortsWindows(ports) {
  let netstat = "";
  try {
    netstat = execSync("netstat -ano", { encoding: "utf8" });
  } catch {
    console.warn("Could not run netstat — skip port cleanup.");
    return;
  }
  for (const port of ports) {
    const pids = pidsListeningOnPort(netstat, port);
    for (const pid of pids) killPidWindows(pid);
  }
}

function killPortsUnix(ports) {
  for (const port of ports) {
    try {
      const out = execSync(`lsof -ti:${port}`, { encoding: "utf8" }).trim();
      if (!out) continue;
      const pids = out.split(/\n/).filter(Boolean);
      for (const pid of pids) {
        if (pid === String(process.pid)) continue;
        execSync(`kill -9 ${pid}`, { stdio: "pipe" });
        console.log(`Stopped process ${pid} (unix)`);
      }
    } catch {
      /* nothing listening */
    }
  }
}

const ports = parsePorts(process.argv);
if (process.platform === "win32") killPortsWindows(ports);
else killPortsUnix(ports);
