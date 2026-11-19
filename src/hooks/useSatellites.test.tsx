import { afterEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { useSatellites } from "./useSatellites";

afterEach(() => vi.restoreAllMocks());

function SatelliteFeedProbe() {
  const feed = useSatellites(
    { latitudeDeg: 0, longitudeDeg: 0, altitudeM: 0 },
    null,
    "unknown",
    0,
    false,
  );
  return <span data-testid='feed-state'>{feed.feedState}</span>;
}

test("when the sky view is closed, should: defer loading satellite ephemerides", async () => {
  const fetch = vi.spyOn(globalThis, "fetch");
  await render(<SatelliteFeedProbe />);
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(document.querySelector("[data-testid=feed-state]")?.textContent).toBe("loading");
  expect(fetch).not.toHaveBeenCalled();
});
