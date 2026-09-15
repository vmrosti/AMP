// Po každém `astro build` prohledá všechny vygenerované HTML stránky, najde
// inline <script> tagy (Astro je tu bohužel vykresluje inline, ne jako
// externí soubory), spočítá jejich SHA-256 hash a doplní je do CSP v
// dist/client/_headers. Řeší to CSP blokaci, aniž by se musela otevírat
// díra přes 'unsafe-inline'.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const HEADERS_PATH = join(CLIENT_DIR, "_headers");

function findHtmlFiles(dir) {
  let results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) results = results.concat(findHtmlFiles(full));
    else if (entry.endsWith(".html")) results.push(full);
  }
  return results;
}

function extractInlineScripts(html) {
  const scripts = [];
  // Zachytí <script ...>obsah</script> jen tam, kde tag NEMÁ atribut src=
  // a NENÍ to application/ld+json (to CSP script-src netýká).
  const re = /<script((?:(?!src=)[^>])*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    const body = m[2];
    if (/type\s*=\s*["']application\/ld\+json["']/.test(attrs)) continue;
    if (body.trim().length === 0) continue;
    scripts.push(body);
  }
  return scripts;
}

const htmlFiles = findHtmlFiles(CLIENT_DIR);
const hashes = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf-8");
  for (const body of extractInlineScripts(html)) {
    const hash = createHash("sha256").update(body, "utf-8").digest("base64");
    hashes.add(`'sha256-${hash}'`);
  }
}

console.log(`[csp] Found ${hashes.size} unique inline script hash(es) across ${htmlFiles.length} page(s).`);

let headers = readFileSync(HEADERS_PATH, "utf-8");
const hashList = Array.from(hashes).join(" ");

headers = headers.replace(
  /script-src 'self'[^;]*/,
  `script-src 'self' ${hashList}`.trim()
);

writeFileSync(HEADERS_PATH, headers);
console.log("[csp] _headers updated with script hashes.");
