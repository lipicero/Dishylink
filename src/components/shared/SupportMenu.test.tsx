import { afterEach, expect, test } from "vitest";
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

  expect(document.body.textContent).toContain("v1.4.0");
  expect(document.body.textContent).toContain("Changelog");
  expect(document.body.textContent).toContain("A fork by Matías Ceroleni");
  expect(document.body.textContent).not.toContain("Jobmate");
});
