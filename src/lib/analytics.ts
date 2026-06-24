/**
 * Minimal, pluggable analytics. Sends a page-view beacon to an endpoint when
 * `VITE_ANALYTICS_ENDPOINT` is configured; otherwise it's a no-op. Swap in
 * Plausible/Umami/GA by pointing the endpoint at their collector (or replace
 * this implementation).
 */
export function trackPageView(path: string): void {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  if (!endpoint) return;
  try {
    const payload = JSON.stringify({
      path,
      referrer: document.referrer,
      ts: Date.now(),
    });
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(endpoint, payload);
    } else {
      void fetch(endpoint, {
        method: 'POST',
        body: payload,
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    /* analytics must never break the app */
  }
}
