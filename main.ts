// Entry for the make.fun sponsored X-post bounty (Node 22, standard library only).
// The post itself is the entry: the meme image is posted on X from a public
// account, and this program hands the house the post's address by writing
// POST.json to /output. Nothing else this program writes is scored — the house
// reads the post's likes, reposts and quotes from X itself.
//
// Local run: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(BOT_DIR, 'POST.json');
if (!existsSync(postPath)) {
  console.error(`POST.json not found in ${BOT_DIR}`);
  process.exit(1);
}

const raw = readFileSync(postPath, 'utf8');
const parsed: unknown = JSON.parse(raw);
if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('POST.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'POST.json'), raw);
console.log(`POST.json written to ${OUTPUT_DIR}`);
