// Data-driven obsah služeb — jeden zdroj pravdy pro homepage karty i detailní stránky.
// Texty schváleny v content dokumentu; [DOPLNIT] označuje místa čekající na reálný vstup od AMP.

export const services = [
  {
    slug: "jednoucelove-stroje",
    title: "Jednoúčelové stroje",
    short: "Stroj navržený přesně na váš díl a takt, ne upravený univerzální základ.",
    reseni: "Stroj navržený přesně na váš díl a takt, ne upravený univerzální základ.",
    co_resi:
      "Operaci, pro kterou neexistuje univerzální stroj — díl, takt nebo prostorové uspořádání jsou natolik specifické, že standardní zařízení nesedí.",
    pro_koho:
      "Výrobní firmy, které potřebují stroj na konkrétní díl nebo operaci, obvykle v sériové nebo velkosériové výrobě.",
    jak_pracujeme:
      "Začínáme u konkrétního dílu a taktu, ne u katalogu komponent. Navrhneme mechanické řešení, ověříme ho na vzorcích nebo prototypu klíčových částí, teprve pak stavíme celý stroj.",
    technologie: "[DOPLNIT — konkrétní technologie, které AMP reálně používá]",
    vysledek:
      "Stroj, který zvládá váš takt a je pro obsluhu srozumitelný bez zdlouhavého zaškolení.",
    cta: "Potřebujete stroj na konkrétní operaci?",
    seo: {
      title: "Jednoúčelové stroje na míru | AMP-stroje",
      description:
        "Navrhujeme a vyrábíme jednoúčelové stroje pro konkrétní díl a takt. Mechanický návrh ověřený na prototypu dřív, než stavíme celý stroj.",
    },
  },
  {
    slug: "automatizace-vyroby",
    title: "Automatizace výroby",
    short: "Ruční operace nahrazená mechanizmem tam, kde se to provozu vyplatí.",
    reseni: "Ruční operace nahrazená mechanizmem tam, kde se to provozu vyplatí.",
    co_resi:
      "Ruční operaci, která zpomaluje linku, je fyzicky náročná pro obsluhu nebo má vysokou chybovost kvůli lidskému faktoru.",
    pro_koho:
      "Provozy, kde manuální krok brání zvýšení kapacity nebo způsobuje opakované reklamace.",
    jak_pracujeme:
      "Nejdřív se podíváme, jestli se automatizace té konkrétní operaci vůbec vyplatí — objem, takt a variabilita dílu rozhodují víc než touha „mít to automatické“. Pak navrhneme mechanizmus odpovídající skutečné potřebě, ne nejsložitější možné řešení.",
    technologie: "[DOPLNIT]",
    vysledek:
      "Nižší chybovost a uvolněná kapacita obsluhy pro práci, kde má smysl člověk.",
    cta: "Potřebujete automatizovat ruční operaci?",
    seo: {
      title: "Automatizace výroby a ručních operací | AMP-stroje",
      description:
        "Nahrazujeme ruční operace, které brzdí výrobu nebo mají vysokou chybovost. Automatizace jen tam, kde se skutečně vyplatí.",
    },
  },
  {
    slug: "optimalizace-procesu",
    title: "Optimalizace procesů",
    short: "Úprava stávající linky nebo pracoviště bez nutnosti stavět nové zařízení.",
    reseni: "Úprava stávající linky nebo pracoviště bez nutnosti stavět nové zařízení.",
    co_resi:
      "Stávající pracoviště nebo linku, která nedosahuje svého potenciálu — úzké hrdlo, zbytečné manipulace, špatně rozvržený tok materiálu.",
    pro_koho:
      "Firmy, které nechtějí investovat do nového stroje, ale potřebují zvýšit výkon nebo spolehlivost toho, co už mají.",
    jak_pracujeme:
      "Projdeme proces na místě, identifikujeme, kde se ztrácí čas nebo vzniká chyba, a navrhneme úpravu — často jde o menší mechanický nebo organizační zásah, ne o novou investici.",
    technologie: "[DOPLNIT]",
    vysledek: "Vyšší výkon stávajícího zařízení bez nutnosti kupovat nový stroj.",
    cta: "Chcete zjistit, jestli má váš proces potenciál pro optimalizaci?",
    seo: {
      title: "Optimalizace výrobních procesů | AMP-stroje",
      description:
        "Zvýšíme výkon stávající linky nebo pracoviště bez nutnosti investovat do nového stroje.",
    },
  },
  {
    slug: "studie-proveditelnosti",
    title: "Studie proveditelnosti",
    short: "Ověření, jestli má vaše automatizace technický a ekonomický smysl.",
    reseni: "Ověření, jestli má vaše automatizace technický a ekonomický smysl, dřív než padne rozhodnutí.",
    co_resi:
      "Nejistotu, jestli se automatizace nebo nový stroj vůbec vyplatí, dřív než padne investiční rozhodnutí.",
    pro_koho:
      "Vedení výroby a technické ředitele, kteří potřebují podklad pro rozhodnutí — ne prodejní nabídku.",
    jak_pracujeme:
      "Posoudíme technickou proveditelnost (jde to vůbec takhle vyřešit) a hrubý ekonomický rámec (dává to smysl při vašem objemu). Výstupem je jasné doporučení, i kdyby znělo „nevyplatí se“.",
    technologie: null,
    vysledek:
      "Podklad pro rozhodnutí založený na reálných číslech vašeho provozu, ne na odhadu.",
    cta: "Chcete ověřit potenciál automatizace, než do ní investujete?",
    seo: {
      title: "Studie proveditelnosti automatizace | AMP-stroje",
      description:
        "Ověříme technickou a ekonomickou proveditelnost automatizace dřív, než padne investiční rozhodnutí.",
    },
  },
  {
    slug: "servis-a-modernizace",
    title: "Servis a modernizace",
    short: "Udržujeme stroje v provozu a upravujeme starší zařízení na dnešní nároky.",
    reseni: "Údržba, opravy a přestavba stávajících strojů na nové nároky výroby.",
    co_resi:
      "Stárnoucí zařízení, které ještě funguje, ale nezvládá dnešní požadavky na takt, kvalitu nebo dostupnost náhradních dílů.",
    pro_koho:
      "Provozy s existujícím strojním parkem, kde výměna za nový stroj není ekonomicky ani provozně nutná.",
    jak_pracujeme:
      "Zhodnotíme stav stroje, navrhneme, co má smysl opravit, upravit nebo přestavět, a co už je za hranicí návratnosti.",
    technologie: "[DOPLNIT]",
    vysledek:
      "Prodloužená životnost zařízení za zlomek ceny nového stroje — nebo jasné doporučení, kdy se to už nevyplatí.",
    cta: "Potřebujete modernizovat nebo opravit stávající stroj?",
    seo: {
      title: "Servis a modernizace strojů | AMP-stroje",
      description:
        "Servis, opravy a přestavba stávajících strojů na dnešní nároky výroby.",
    },
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
