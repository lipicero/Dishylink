import { describe, expect, it } from "vitest";
import { setLocale } from "../lib/locale";
import { t, translate } from "./translate";

describe("translate", () => {
  it("returns Spanish for a known string and leaves unknown English in place", () => {
    expect(translate("es", "Settings")).toBe("Ajustes");
    expect(translate("es", "Not a real label")).toBe("Not a real label");
  });

  it("keeps the English string when that language is selected", () => {
    expect(translate("en", "Settings")).toBe("Settings");
  });

  it("fills placeholders after choosing the language", () => {
    expect(translate("es", "{count} active alerts", { count: 3 })).toBe("3 alertas activas");
    expect(translate("en", "{count} active alerts", { count: 3 })).toBe("3 active alerts");
    expect(translate("es", "Active", undefined, "status")).toBe("Activo");
    expect(translate("es", "Active")).toBe("Activas");
    expect(translate("en", "Active", undefined, "status")).toBe("Active");
  });

  it("follows the active language", () => {
    setLocale("es");
    expect(t("Network")).toBe("Red");
    setLocale("en");
    expect(t("Network")).toBe("Network");
  });
});
