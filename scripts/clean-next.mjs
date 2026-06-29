/**
 * Deletes the .next folder (build + webpack cache).
 * Stop `next dev` / `next start` first. If deletion fails with EPERM on Windows,
 * close other terminals/IDE file watchers, pause antivirus on this folder briefly, then retry.
 */
import { rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirs = [path.join(root, ".next"), path.join(root, ".next-dev")];

for (const dir of dirs) {
  try {
    if (existsSync(dir)) {
      rmSync(dir, { recursive: true, force: true });
      console.log("Removed", dir);
    } else {
      console.log("Nothing to remove at", dir);
    }
  } catch (err) {
    console.error(`Could not remove ${dir}:`, err.message);
    console.error("Close all Next/Node processes, then run this script again.");
    process.exit(1);
  }
}
