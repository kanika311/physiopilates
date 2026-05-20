/**
 * Deletes the .next folder (build + webpack cache).
 * Stop `next dev` / `next start` first. If deletion fails with EPERM on Windows,
 * close other terminals/IDE file watchers, pause antivirus on this folder briefly, then retry.
 */
import { rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = path.join(root, ".next");

try {
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true });
    console.log("Removed", nextDir);
  } else {
    console.log("No .next folder to remove.");
  }
} catch (err) {
  console.error("Could not remove .next:", err.message);
  console.error("Close all Next/Node processes, then run this script again.");
  process.exit(1);
}
