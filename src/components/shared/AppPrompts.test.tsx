// The what's-new check runs when its module loads, so this file stages an upgraded
// profile before importing the prompts. localStorage is shared by every file in the
// browser project, so whatever is staged here is taken back out afterwards.

import { afterAll, afterEach, beforeEach, describe, expect, test } from "vitest";
import { render, cleanup } from "vitest-browser-react";
import { setLocale } from "@/lib/locale";

const STAGED = ["dishylink-theme", "dishylink-whats-new-seen", "dishylink-installed-at"];

STAGED.forEach((key) => localStorage.removeItem(key));
localStorage.setItem("dishylink-theme", "dark");
localStorage.setItem("dishylink-whats-new-seen", "1.3.1");

const { AppPrompts } = await import("./AppPrompts");

const text = () => document.body.textContent ?? "";

async function waitForText(substring: string, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (text().includes(substring)) return;
    if (Date.now() > deadline) throw new Error(`timed out waiting for text: ${substring}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

function button(label: string): HTMLButtonElement {
  const found = [...document.querySelectorAll("button")].find(
    (element) => element.textContent?.trim() === label,
  );
  if (!found) throw new Error(`no button labelled: ${label}`);
  return found as HTMLButtonElement;
}

afterEach(cleanup);
afterAll(() => STAGED.forEach((key) => localStorage.removeItem(key)));
beforeEach(() => {
  setLocale("en");
  localStorage.setItem("dishylink-whats-new-seen", "1.3.1");
});

describe("what's new after an update", () => {
  test("speaks the app's language", async () => {
    setLocale("es");
    render(<AppPrompts />);
    await waitForText("Novedades de Dishylink 1.4.0");
    expect(text()).toContain("Paquete Debian para Linux.");
    expect(text()).not.toContain("Jobmate");
    button("Entendido").click();
  });

  test("shows release notes without promotions or solicitation popups", async () => {
    render(<AppPrompts />);
    await waitForText("Debian package for Linux.");
    expect(text()).not.toContain("Jobmate");
    expect(text()).not.toContain("Enjoying Dishylink?");
    expect(text()).not.toContain("Help keep Dishylink going");
    expect(text()).toContain("Full release notes");
  });

  test("shows once, and stays gone after Got it", async () => {
    render(<AppPrompts />);
    await waitForText("What’s new in Dishylink 1.4.0");
    expect(text()).toContain("Full release notes");

    button("Got it").click();
    await new Promise((resolve) => setTimeout(resolve, 120));
    expect(text()).not.toContain("What’s new");

    cleanup();
    render(<AppPrompts />);
    await new Promise((resolve) => setTimeout(resolve, 120));
    expect(text()).not.toContain("What’s new");
  });
});
