import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render } from "vitest-browser-react";
import { setLocale } from "@/lib/locale";
import { SupportMenu } from "./SupportMenu";

afterEach(cleanup);

test("keeps the credits heart and shows the app version beside its changelog", async () => {
  setLocale("en");
  const screen = await render(<SupportMenu />);
  const trigger = screen.container.querySelector("button[aria-label]");
  expect(trigger).not.toBeNull();
  (trigger as HTMLButtonElement).click();
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(document.body.textContent).toContain("v1.4.1");
  expect(document.body.textContent).toContain("Changelog");
  expect(document.body.textContent).toContain("A fork by Matías Ceroleni");
  expect(document.body.textContent).not.toContain("Jobmate");
});

test("opens the matching installer when an update is available", async () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(window, "dishlink");
  const openExternal = vi.fn();
  Object.defineProperty(window, "dishlink", {
    configurable: true,
    value: {
      platform: "win32",
      arch: "x64",
      openExternal,
      updateState: async () => ({ available: true, version: "1.5.0" }),
      onUpdateState: () => () => {},
    },
  });

  try {
    setLocale("en");
    const screen = await render(<SupportMenu />);
    const trigger = screen.container.querySelector("button[aria-label]");
    expect(trigger).not.toBeNull();
    (trigger as HTMLButtonElement).click();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const downloadButton = Array.from(document.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("1.5.0"),
    );
    expect(downloadButton).toBeDefined();
    downloadButton?.click();
    expect(openExternal).toHaveBeenCalledWith(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-x64.exe",
    );
  } finally {
    cleanup();
    if (originalDescriptor) {
      Object.defineProperty(window, "dishlink", originalDescriptor);
    } else {
      delete window.dishlink;
    }
  }
});
