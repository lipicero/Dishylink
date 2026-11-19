// The release-notes popup is staged before importing the component. Rating and
// donation asks must not appear later, even after a focus change.

import { afterAll, afterEach, expect, test, vi } from "vitest";
import { render, cleanup } from "vitest-browser-react";

const DAY_MS = 24 * 60 * 60 * 1000;
const STAGED = [
  "dishylink-theme",
  "dishylink-whats-new-seen",
  "dishylink-installed-at",
  "dishylink-prompt-donation",
  "dishylink-prompt-rating",
];

STAGED.forEach((key) => localStorage.removeItem(key));
localStorage.setItem("dishylink-theme", "dark");
localStorage.setItem("dishylink-whats-new-seen", "1.3.1");
localStorage.setItem("dishylink-installed-at", String(Date.now() - 2 * DAY_MS));
// Every build can rate now, and the rating ask outranks the donation one.
localStorage.setItem("dishylink-prompt-rating", "retired");

const { AppPrompts } = await import("./AppPrompts");

const text = () => document.body.textContent ?? "";
const settle = () => new Promise((resolve) => setTimeout(resolve, 120));

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});
afterAll(() => STAGED.forEach((key) => localStorage.removeItem(key)));

test("never shows rating or donation asks", async () => {
  render(<AppPrompts />);
  await settle();
  expect(text()).not.toContain("Enjoying Dishylink?");
  expect(text()).not.toContain("Help keep Dishylink going");
  window.dispatchEvent(new Event("focus"));
  await settle();
  expect(text()).not.toContain("Enjoying Dishylink?");
  expect(text()).not.toContain("Help keep Dishylink going");
});
