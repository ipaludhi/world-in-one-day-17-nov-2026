// The World in One Day — 17 November 2026 (news-image-20261117, Node 22).
// The entry is one image: a poster that sums up Tuesday 17 November 2026's
// world news — six stories across regions and fields, plus three more in the
// "Also today" strip. The image is drawn at build time (poster.html rendered
// to entry.png) and this program copies it to /output/entry.png, byte for byte,
// so both graded runs write identical bytes. Standard library only, no network.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Guard: the copy must be complete — a truncated image would fail the gate.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is incomplete');
}
