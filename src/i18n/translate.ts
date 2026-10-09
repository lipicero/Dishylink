import { readLocale, type Locale } from "../lib/locale";
import { es } from "./es";

export function translate(
  locale: Locale,
  message: string,
  vars?: Record<string, string | number>,
  context?: string,
): string {
  const template = lookup(locale, message, context);
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

function lookup(locale: Locale, message: string, context?: string): string {
  switch (locale) {
    case "es": {
      // The same English word can need a different Spanish word in another
      // screen ("Active" is "Activas" on the alerts tab and "Activo" on a badge).
      if (context) {
        const specific = es[`${message}@@${context}`];
        if (specific) return specific;
      }
      return es[message] ?? message;
    }
    case "en":
      return message;
    default: {
      const unreachable: never = locale;
      return unreachable;
    }
  }
}

/** The English string as written in the component, in the active language.
 *  `context` picks a more specific Spanish entry when one word is used two ways. */
export function t(
  message: string,
  vars?: Record<string, string | number>,
  context?: string,
): string {
  return translate(readLocale(), message, vars, context);
}
