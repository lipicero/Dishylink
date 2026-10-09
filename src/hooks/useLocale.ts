import { useSyncExternalStore } from "react";
import { readLocale, subscribeToLocale, type Locale } from "../lib/locale";

/** The active language. Reading it here re-renders when it changes, which is
 *  what carries a switch in Settings through the rest of the tree. */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribeToLocale, readLocale, readLocale);
}
