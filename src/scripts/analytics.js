// Jednotné volání pro konverzní eventy. Dokud není nasazený žádný analytics
// nástroj, `trackEvent` bezpečně neudělá nic (žádná chyba v konzoli).
// Jakmile AMP zvolí nástroj (doporučeno: Plausible, viz report), stačí do
// <head> přidat jeho skript, který definuje `window.plausible` — tato vrstva
// se nemusí měnit.
window.trackEvent = function trackEvent(name, props) {
  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
  // Bezpečný fallback pro ověření za vývoje / než je analytics zapojený:
  if (window.location.hostname === "localhost") {
    console.info("[trackEvent]", name, props || "");
  }
};

// Delegovaný listener — funguje i pro prvky přidané později do DOM.
document.addEventListener("click", (e) => {
  const target = e.target instanceof Element ? e.target.closest("[data-event]") : null;
  if (!target) return;
  const eventName = target.getAttribute("data-event");
  if (eventName) window.trackEvent(eventName);
});
