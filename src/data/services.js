// Data-driven obsah služeb — jeden zdroj pravdy pro homepage dlaždice i detailní
// stránky. Nová nabídka (2026 redesign) nahrazuje původní taxonomii.
// `items` = konkrétní dílčí kompetence zobrazené jako seznam na detailu služby.

export const services = [
  {
    slug: "zakazkova-vyroba",
    number: "01",
    title: "Zakázková výroba",
    short: "Od 3D konstrukce po hotový svařovaný nebo CNC obráběný díl.",
    lead: "Konstrukční data, výrobní dokumentace a samotná výroba rámů a dílů pod jednou střechou — bez ztráty přesnosti mezi jednotlivými kroky.",
    items: [
      "Tvorba 3D konstrukčních návrhů a dat",
      "Tvorba výrobních dokumentací",
      "Výroba rámů z hliníkových a kovových montovaných profilů",
      "Výroba svařovaných rámů včetně lakování",
      "Výroba CNC obráběných dílů z oceli a nerezové oceli",
      "Výroba CNC obráběných dílů z lehkých a drahých kovů",
      "Svařování oceli — MAG",
      "Svařování nerezi — MIG",
      "Svařování nerezi — TIG",
      "Svařování hliníku — TIG",
      "Úpravy původních rámů a konstrukcí a změny přímo na místě",
    ],
    technologie: "[DOPLNIT — konkrétní stroje a vybavení dílny]",
    cta: "Poptat zakázkovou výrobu",
    seo: {
      title: "Zakázková výroba — konstrukce a CNC obrábění | AMP",
      description:
        "3D konstrukční návrhy, výrobní dokumentace, svařované i CNC obráběné díly z oceli, nerezi a lehkých kovů na zakázku.",
    },
  },
  {
    slug: "automatizace",
    number: "02",
    title: "Automatizace",
    short: "Jednoúčelové stroje a automatizační celky navržené na míru operaci.",
    lead: "Stavíme jednoúčelové stroje a zařízení i dílčí prvky do větších automatizačních linek — včetně měřicích a svařovacích přípravků.",
    items: [
      "Výroba jednoúčelových strojů a zařízení",
      "Výroba výměnných prvků a doplňků do větších automatizačních celků",
      "Výroba měřicích přípravků",
      "Výroba svařovacích a speciálních lůžek",
    ],
    technologie: "[DOPLNIT — konkrétní technologie/komponenty používané v automatizaci]",
    cta: "Poptat automatizaci",
    seo: {
      title: "Automatizace — jednoúčelové stroje | AMP",
      description:
        "Jednoúčelové stroje, výměnné prvky do automatizačních celků, měřicí a svařovací přípravky na míru vaší výrobě.",
    },
  },
  {
    slug: "servis",
    number: "03",
    title: "Servis",
    short: "Opravy, optimalizace a snižování zmetkovitosti přímo na provoze.",
    lead: "Řešíme mechanické, softwarové i elektro poruchy strojů a zařízení a hledáme rezervy v taktu a zmetkovitosti stávajících linek.",
    items: [
      "Opravy mechanických prvků a částí strojů a zařízení",
      "Opravy softwaru stávajících strojů a zařízení",
      "Opravy elektroinstalací a řídicích prvků strojů a zařízení",
      "Optimalizace a zefektivnění funkčnosti mechanických částí strojů a zařízení",
      "Optimalizace a zefektivnění funkčnosti softwarových částí strojů a zařízení",
      "Snižování Scrap a Pseudoscrap rate výrobních zařízení",
      "Optimalizace a snižování taktu výrobních zařízení",
      "Magnetické vrtání konstrukcí a prvků přímo na místě",
      "Vykružování nadměrných děr do hliníkových a kovových základových desek",
    ],
    technologie: null,
    cta: "Poptat servis",
    seo: {
      title: "Servis strojů a zařízení | AMP",
      description:
        "Mechanické, softwarové a elektro opravy strojů, optimalizace taktu a snižování zmetkovitosti výrobních zařízení.",
    },
  },
  {
    slug: "repase",
    number: "04",
    title: "Repase a generální opravy strojů",
    short: "Vrátíme do provozu i stroje, které už nikdo jiný neopraví.",
    lead: "Generální opravy jednoúčelových strojů, oživování nefunkčních zařízení a reverzní inženýrství tam, kde chybí dokumentace.",
    items: [
      "Generální opravy jednoúčelových výrobních strojů a zařízení",
      "Oživování nefunkčních zařízení a jejich revitalizace",
      "Reverzní inženýrství",
    ],
    technologie: null,
    cta: "Poptat repasi stroje",
    seo: {
      title: "Repase a generální opravy strojů | AMP",
      description:
        "Generální opravy a revitalizace jednoúčelových strojů, oživování nefunkčních zařízení, reverzní inženýrství.",
    },
  },
  {
    slug: "3d-tisk",
    number: "05",
    title: "3D tisk",
    short: "Zakázkový a kompozitní 3D tisk na Prusa XL a Prusa Core One.",
    lead: "Tiskneme prototypy, přípravky i funkční díly v širokém výběru materiálů, včetně vícebarevných a kompozitních kombinací.",
    items: [
      "Zakázkový tisk: PLA, PETG, TPU, PC, ABS, ASA a další materiály",
      "Vícebarevný tisk",
      "Kompozitní tisk kombinací materiálů (např. PLA + TPU, PETG + TPU)",
    ],
    technologie: "Prusa XL, Prusa Core One",
    cta: "Poptat 3D tisk",
    seo: {
      title: "3D tisk na zakázku — Prusa XL, Prusa Core One | AMP",
      description:
        "Zakázkový a kompozitní 3D tisk (PLA, PETG, TPU, PC, ABS, ASA) na tiskárnách Prusa XL a Prusa Core One.",
    },
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
