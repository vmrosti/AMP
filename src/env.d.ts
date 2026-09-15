/// <reference types="astro/client" />

interface Window {
  trackEvent?: (name: string, props?: Record<string, unknown>) => void;
  plausible?: (name: string, options?: { props?: Record<string, unknown> }) => void;
}
