// POST /api/kontakt — jediný dynamický route v jinak statickém webu.
// `prerender = false` říká Astru, ať tuto stránku negeneruje staticky, ale
// nechá ji běžet on-demand přes Cloudflare adapter (Cloudflare Pages Function).
export const prerender = false;

const RECIPIENT_EMAIL = "info@amp-stroje.cz";
const SENDER_EMAIL = "web@amp-stroje.cz"; // musí být na doméně kryté MailChannels DNS zápisem, viz EXTERNAL ACTION v reportu
const MIN_FILL_TIME_MS = 1500; // rychlejší vyplnění než 1,5 s je téměř jistě bot

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function textResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Bez JavaScriptu odešle prohlížeč formulář jako běžný POST a čeká HTML
// stránku, ne syrový JSON text (to by uživatel bez JS jinak reálně uviděl —
// prázdná/rozbitá "chybová obrazovka"). Podle Accept hlavičky pozná, jestli
// šlo o fetch() z ContactForm.astro (JSON) nebo nativní odeslání formuláře
// (přesměruje zpět na /kontakt/ s výsledkem v query parametru).
function wantsJson(request) {
  return (request.headers.get("accept") || "").includes("application/json");
}

function respond(request, refererUrl, body, status) {
  if (wantsJson(request)) return textResponse(body, status);
  const redirectUrl = new URL("/kontakt/", refererUrl);
  redirectUrl.searchParams.set("stav", body.ok ? "ok" : "chyba");
  return Response.redirect(redirectUrl.toString(), 303);
}

export async function POST({ request }) {
  // Základní CSRF/origin ochrana — formulář je same-origin, žádný request
  // z jiné domény by sem neměl legitimně chodit.
  const origin = request.headers.get("origin") || "";
  const url = new URL(request.url);
  if (origin && new URL(origin).host !== url.host) {
    return respond(request, url, { ok: false, error: "invalid_origin" }, 403);
  }

  let data;
  try {
    data = await request.formData();
  } catch {
    return respond(request, url, { ok: false, error: "invalid_payload" }, 400);
  }

  // Honeypot — neviditelné pole pro lidi, boti ho často vyplní.
  if (data.get("predmet")) {
    // Tichý "úspěch" — bot se nesmí dozvědět, že byl odhalen.
    return respond(request, url, { ok: true }, 200);
  }

  // Časová past — formulář nese timestamp vykreslení, kontrolujeme dobu vyplnění.
  const renderedAt = Number(data.get("renderedAt"));
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return respond(request, url, { ok: true }, 200); // tichý zásah, stejný princip jako honeypot
  }

  const jmeno = String(data.get("jmeno") || "").trim();
  const firma = String(data.get("firma") || "").trim();
  const email = String(data.get("email") || "").trim();
  const telefon = String(data.get("telefon") || "").trim();
  const zprava = String(data.get("zprava") || "").trim();
  const souhlas = data.get("souhlas");

  // Server-side validace — klientská validace se nikdy nepovažuje za dostatečnou.
  const errors = {};
  if (!jmeno) errors.jmeno = "Vyplňte jméno.";
  if (!email || !isValidEmail(email)) errors.email = "Zadejte platný e-mail.";
  if (!zprava || zprava.length < 10) errors.zprava = "Popište prosím problém alespoň jednou větou.";
  if (!souhlas) errors.souhlas = "Je nutné odsouhlasit zpracování osobních údajů.";
  if (jmeno.length > 200 || firma.length > 200 || zprava.length > 5000) {
    errors.general = "Některé pole je příliš dlouhé.";
  }

  if (Object.keys(errors).length > 0) {
    return respond(request, url, { ok: false, errors }, 422);
  }

  const emailBody = [
    `Nová poptávka z webu amp-stroje.cz`,
    ``,
    `Jméno: ${jmeno}`,
    firma ? `Firma: ${firma}` : null,
    `E-mail: ${email}`,
    telefon ? `Telefon: ${telefon}` : null,
    ``,
    `Zpráva:`,
    zprava,
  ]
    .filter(Boolean)
    .join("\n");

  // MailChannels — bezplatné odesílání e-mailů z Cloudflare Workers/Pages
  // Functions bez nutnosti platit za transakční e-mailovou službu.
  // VYŽADUJE DNS "domain lockdown" TXT záznam na doméně odesílatele — viz
  // EXTERNAL ACTION v závěrečném reportu. Bez něj MailChannels požadavek odmítne.
  try {
    const mcResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: RECIPIENT_EMAIL, name: "AMP-stroje" }] }],
        from: { email: SENDER_EMAIL, name: "AMP-stroje web" },
        reply_to: { email, name: jmeno },
        subject: `Nová poptávka od ${jmeno}${firma ? ` (${firma})` : ""}`,
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });

    if (!mcResponse.ok) {
      const detail = await mcResponse.text().catch(() => "");
      console.error("MailChannels error", mcResponse.status, detail);
      return respond(request, url, { ok: false, error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("Kontaktní formulář — chyba odesílání e-mailu:", err);
    return respond(request, url, { ok: false, error: "send_failed" }, 502);
  }

  return respond(request, url, { ok: true }, 200);
}
