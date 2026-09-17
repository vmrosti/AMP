// Case studies — datový model připravený na budoucí Git-based CMS (Decap/TinaCMS).
// Pole odpovídají navrženému modelu: title, slug, shortDescription, industry,
// service, technologies, problem, solution, result, parameters, images, video,
// mainImage, imageAlt, seoTitle, seoDescription, publishedAt, status.
//
// STATUS: "draft" | "published" | "archived"
// Jen "published" realizace se generují jako veřejné stránky, jdou do sitemapy
// a zobrazují se ve výpisech — viz getPublished() níže, používá se všude
// místo přímého importu `caseStudies`.

export const caseStudies = [
  {
    slug: "priklad-realizace",
    status: "draft", // šablona/ukázka struktury — dokud nemá reálný obsah, NENÍ veřejná
    title: "[DOPLNIT — název realizace]",
    shortDescription: "[DOPLNIT — jedna věta o realizaci]",
    industry: "[DOPLNIT — obor]",
    service: null, // slug související služby, např. "jednoucelove-stroje"
    technologies: "[DOPLNIT]",
    problem: "[DOPLNIT — jaká operace/situace bránila zákazníkovi ve výrobě]",
    zadani: "[DOPLNIT — takt, díl, prostorové omezení, termín]",
    reseni: "[DOPLNIT — jak AMP problém vyřešil a proč právě takto]",
    parametry: {
      takt: "[DOPLNIT]",
      rozmery: "[DOPLNIT]",
      obsluha: "[DOPLNIT]",
      rok: "[DOPLNIT]",
    },
    vysledek: "[DOPLNIT — fakticky doložitelný přínos pro zákazníka]",
    video: null,
    fotografie: [], // tvar: [{ src: "/images/...", alt: "popis" }]
    mainImage: null,
    imageAlt: "",
    seoTitle: null,
    seoDescription: null,
    publishedAt: null,
  },
];

/** Jen publikované realizace — jediný zdroj pravdy pro veřejné stránky. */
export function getPublished() {
  return caseStudies.filter((c) => c.status === "published");
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((c) => c.slug === slug && c.status === "published");
}

/** Realizace propojené se stejnou službou (pro "Související realizace"). */
export function getRelatedByService(serviceSlug, excludeSlug) {
  return getPublished().filter(
    (c) => c.service === serviceSlug && c.slug !== excludeSlug
  );
}

/** Podobné realizace podle oboru, s fallbackem na další publikované. */
export function getRelatedProjects(current, max = 3) {
  const published = getPublished().filter((c) => c.slug !== current.slug);
  const sameIndustry = published.filter((c) => c.industry === current.industry);
  const sameService = published.filter(
    (c) => c.service === current.service && !sameIndustry.includes(c)
  );
  const rest = published.filter(
    (c) => !sameIndustry.includes(c) && !sameService.includes(c)
  );
  return [...sameIndustry, ...sameService, ...rest].slice(0, max);
}
