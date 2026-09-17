// Sdílené schema.org objekty — jeden zdroj pravdy, aby se LocalBusiness (NAP
// údaje) nikdy nezapomnělo, i když stránka přidává vlastní schema (Service,
// FAQPage, BreadcrumbList...). Vždy skládat jako pole: [localBusinessSchema, ...].
export function getLocalBusinessSchema(site) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site}#organization`,
    name: "AMP-stroje, s.r.o.",
    url: site?.toString(),
    telephone: "+420777911077",
    email: "info@amp-stroje.cz",
    image: new URL("/images/services/automatizace.jpg", site).toString(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pražákova 1008/69",
      addressLocality: "Brno",
      postalCode: "639 00",
      addressCountry: "CZ",
    },
  };
}

export function getWebsiteSchema(site) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AMP-stroje",
    url: site?.toString(),
  };
}

export function getBreadcrumbSchema(site, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: new URL(path, site).toString(),
    })),
  };
}
