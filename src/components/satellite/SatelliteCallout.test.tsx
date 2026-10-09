// The tapped-satellite card is the only place the hardware block is shown.
// The block comes from the launch, not the name, so a DTC craft still keeps
// its own tag beside it.

import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { SatelliteCallout } from "./SatelliteCallout";
import type { SatelliteSky } from "../../lib/satellites";

const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

const SKY: SatelliteSky = {
  name: "STARLINK-30050 [DTC]",
  generation: "v2 Mini",
  azimuthDeg: 120,
  elevationDeg: 44,
  rangeKm: 786,
  altitudeKm: 550,
  speedKmS: 7.6,
};

test("a tapped satellite shows its generation beside the DTC tag", async () => {
  render(<SatelliteCallout selected={{ sky: SKY, isServing: true }} onClose={() => {}} />);
  await settle();
  const text = document.body.textContent ?? "";
  expect(text).toContain("STARLINK-30050");
  expect(text).not.toContain("[DTC]");
  expect(text).toContain("v2 Mini");
  expect(text).toContain("DTC");
});
