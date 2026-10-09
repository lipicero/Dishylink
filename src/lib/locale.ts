// The language the interface is written in. An app-local display choice, like the
// toolbar style: localStorage, with a tiny store so a control and the screens
// that read it stay in step without a prop drilled through the tree.
//
// Spanish is the default. English is an explicit choice, stored the same way.

export type Locale = "es" | "en";

export const LOCALE_STORAGE_KEY = "dishylink-locale";

const listeners = new Set<() => void>();

let current: Locale | null = null;

function storedLocale(): Locale | null {
  try {
    const stored = globalThis.localStorage?.getItem(LOCALE_STORAGE_KEY);
    return stored === "en" || stored === "es" ? stored : null;
  } catch {
    return null;
  }
}

export function readLocale(): Locale {
  if (current) return current;
  current = storedLocale() ?? "es";
  return current;
}

export function isSpanish(): boolean {
  return readLocale() === "es";
}

/** BCP 47 tag for Intl formatters. English stays en-US so times keep the 12-hour clock. */
export function intlTag(): string {
  return isSpanish() ? "es" : "en-US";
}

export function setLocale(locale: Locale): void {
  current = locale;
  try {
    globalThis.localStorage?.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // A private window that blocks storage still switches for this session.
  }
  if (typeof document !== "undefined") document.documentElement.lang = locale;
  for (const listener of listeners) listener();
}

export function subscribeToLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
