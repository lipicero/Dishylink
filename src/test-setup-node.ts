// Node tests assert the English wording the components were written in. The app
// itself defaults to Spanish; pin English here so those assertions keep passing.
import { beforeEach } from "vitest";
import { setLocale } from "./lib/locale";

setLocale("en");
beforeEach(() => setLocale("en"));
