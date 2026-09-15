// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: nahradit reálnou doménou před nasazením (potřeba pro sitemap a canonical URL)
  site: 'https://www.amp-stroje.cz',
  integrations: [sitemap()],
  // Kód nikde nepoužívá Astro.session — bez tohoto vypnutí by @astrojs/cloudflare
  // i tak automaticky vyžadoval KV namespace "SESSION" a Cloudflare Pages by se
  // ho při každém nasazení pokoušelo znovu vytvořit (odtud chyba
  // "a namespace with this account ID and title already exists").
  session: false,
  // Zbytek webu zůstává statický (prerender), jen /api/kontakt běží on-demand
  // (viz `export const prerender = false` v tom souboru) — proto Cloudflare
  // adapter, ne kompletní přechod na server rendering.
  adapter: cloudflare({ imageService: 'passthrough' }),
});
