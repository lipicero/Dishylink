import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { DashboardSkeleton } from "./DashboardSkeleton";

test("shows metric and chart placeholders without a spinner", async () => {
  const screen = await render(<DashboardSkeleton />);

  expect(screen.container.querySelector("main")?.getAttribute("aria-busy")).toBe("true");
  expect(screen.container.querySelector("[data-slot='loading']")).toBeNull();
  expect(screen.container.querySelectorAll("[data-slot='skeleton']").length).toBeGreaterThan(30);
});
