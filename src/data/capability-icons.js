// Malá knihovna technických ikon + heuristika, která podle textu položky
// (např. "Svařování oceli — MAG") vybere nejbližší vhodnou ikonu. Cílem není
// dokonalá přesnost pro každou položku, ale aby seznam přestal být řada
// stejných puntíků a každá karta měla vizuálně smysluplnou ikonu.

const icons = {
  cad: `<path d="M4 17V7l8-4 8 4v10l-8 4-8-4Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M4 7l8 4 8-4M12 11v10" stroke="currentColor" stroke-width="1.6" fill="none"/>`,
  document: `<path d="M6 3h9l4 4v14H6z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M15 3v4h4M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.6"/>`,
  frame: `<rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M4 9h16M4 15h16M9 4v16M15 4v16" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>`,
  weld: `<path d="M4 20l6-6M13 5l6 6-8 8-6-6z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M15 3l2 2M18 6l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  cnc: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.6"/>`,
  paint: `<path d="M9 3h6l1 5H8l1-5Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M8 8h8v5a4 4 0 0 1-8 0V8Z" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M12 17v4" stroke="currentColor" stroke-width="1.6"/>`,
  onsite: `<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.6" fill="none"/>`,
  machine: `<rect x="4" y="8" width="16" height="10" rx="1.5" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 8V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V8M9 12.5h6M9 15.5h3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  measure: `<path d="M3 16l5-5 3 3 7-7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 6h4v4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  fixture: `<path d="M6 4v16M18 4v16M6 8h4M14 8h4M6 16h4M14 16h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  repair: `<path d="M14.7 6.3 17.7 9.3 8 19H5v-3L14.7 6.3Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M13 8l3 3" stroke="currentColor" stroke-width="1.6"/>`,
  software: `<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  electro: `<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>`,
  optimize: `<path d="M4 19V10M10 19V5M16 19v-7M22 19H2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  drill: `<rect x="3" y="10" width="8" height="4" rx="1" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M11 11h6l3 1-3 1h-6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>`,
  overhaul: `<path d="M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  reverse: `<circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M14.5 14.5 20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  print: `<path d="M4 7l8-4 8 4-8 4-8-4Z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M4 7v10l8 4 8-4V7M12 11v10" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>`,
  check: `<path d="M5 12l5 5L20 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const rules = [
  [/3d konstruk|konstrukční návrh/i, "cad"],
  [/dokumentac/i, "document"],
  [/rámů z hliník|montovan|profil/i, "frame"],
  [/svařov|mag\b|mig\b|tig\b/i, "weld"],
  [/cnc obráběn|obráběných díl/i, "cnc"],
  [/lakován/i, "paint"],
  [/na místě|přímo na místě/i, "onsite"],
  [/jednoúčelov|výroba strojů|zařízení/i, "machine"],
  [/měřicí|kontrola|vizuální/i, "measure"],
  [/lůžk|přípravk/i, "fixture"],
  [/software/i, "software"],
  [/elektroinstalac|elektro/i, "electro"],
  [/scrap|takt|optimaliz|zefektivn/i, "optimize"],
  [/vrtání|vykružování|dír/i, "drill"],
  [/generální opra|oživování|revitalizac/i, "overhaul"],
  [/reverzní inženýrství/i, "reverse"],
  [/tisk|materiálu pla|vícebarevný|kompozitní/i, "print"],
  [/oprav/i, "repair"],
];

export function getCapabilityIcon(text) {
  for (const [pattern, key] of rules) {
    if (pattern.test(text)) return icons[key];
  }
  return icons.check;
}
