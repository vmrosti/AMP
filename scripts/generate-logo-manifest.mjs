// Běží PŘED `astro build` (viz "prebuild" v package.json). Cloudflare
// adaptér při prerenderingu spouští komponenty v izolovaném prostředí
// (/bundle), kde běžná kontrola existence souboru na disku (fs.existsSync)
// nefunguje — proto se seznam existujících log musí zjistit tady, v
// normálním Node.js běhu, a uložit jako obyčejná data, která si komponenta
// jen přečte (žádný runtime fs přístup potřeba).
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function listFiles(dir, extensions) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => extensions.test(f));
}

const manifest = {
  partners: listFiles(join(publicDir, "images", "partners"), /\.(svg|png|jpg|jpeg|webp)$/i),
  customers: listFiles(join(publicDir, "images", "customers"), /\.(svg|png|jpg|jpeg|webp)$/i),
  videos: listFiles(join(publicDir, "videos"), /\.(mp4|webm)$/i),
};

const outPath = join(__dirname, "..", "src", "data", "logo-manifest.json");
writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(
  `[manifest] partners: ${manifest.partners.length}, customers: ${manifest.customers.length}, videos: ${manifest.videos.length} -> ${outPath}`
);
