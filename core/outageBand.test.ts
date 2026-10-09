import { describe, expect, it } from "vitest";
import {
  explainOutageBand,
  isChartOutage,
  placeOutageLabels,
  type OutageBandInput,
} from "./outageBand";
import type { OutageEvent } from "./telemetry";

function event(
  startMs: number,
  durationMs: number,
  cause: string,
  severity: OutageEvent["severity"] = "warning",
): OutageEvent {
  return { startMs, durationMs, cause, severity };
}

describe("explainOutageBand", () => {
  it("names the four reasons a person looks up when the link drops", () => {
    expect(explainOutageBand(event(0, 10_000, "OBSTRUCTED"), [])).toBe("Sky blocked");
    expect(explainOutageBand(event(0, 10_000, "EVENT_REASON_OUTAGE_THERMAL_SHUTDOWN"), [])).toBe(
      "Thermal",
    );
    expect(explainOutageBand(event(0, 10_000, "thermal shutdown (ongoing)"), [])).toBe("Thermal");
    expect(explainOutageBand(event(0, 10_000, "OUTAGE_NO_SATS"), [])).toBe("No satellites");
    expect(explainOutageBand(event(0, 10_000, "OUTAGE_SKY_SEARCH"), [])).toBe("No satellites");
    expect(explainOutageBand(event(0, 10_000, "EVENT_REASON_ETH_NO_LINK"), [])).toBe("Router");
  });

  it("calls a boot outage the router when a power cycle landed a few seconds earlier", () => {
    // This dish: power cycle at T, then a 50s "booting" outage 8s later.
    const boot = event(8_000, 49_801, "EVENT_REASON_OUTAGE_BOOTING", "advisory");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(explainOutageBand(boot, [powerCycle, boot])).toBe("Router");
  });

  it("keeps the dish's own reason when it is already one of the four", () => {
    const blocked = event(0, 20_000, "OBSTRUCTED");
    const powerCycle = event(1_000, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(explainOutageBand(blocked, [blocked, powerCycle])).toBe("Sky blocked");
  });

  it("does not blame the router for a keepalive ping the traffic rode through", () => {
    const drop = event(0, 800, "EVENT_REASON_OUTAGE_NO_PINGS");
    const keepalive = event(0, 20_000, "EVENT_REASON_ROUTER_POP_IPV4_PING_DROP", "warning");
    expect(explainOutageBand(drop, [drop, keepalive])).toBe("No traffic");
  });

  it("does not reach back to a reboot that finished well before the cut", () => {
    const drop = event(60_000, 5_000, "EVENT_REASON_OUTAGE_NO_PINGS");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(explainOutageBand(drop, [drop, powerCycle])).toBe("No traffic");
  });

  it("prefers heat over a router event when both touch the same cut", () => {
    const drop = event(0, 30_000, "EVENT_REASON_OUTAGE_NO_PINGS");
    const heat = event(1_000, 20_000, "thermal shutdown");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(explainOutageBand(drop, [drop, heat, powerCycle])).toBe("Thermal");
  });
});

describe("isChartOutage", () => {
  it("bands a thermal shutdown the historian wrote as a sentence", () => {
    expect(isChartOutage("thermal shutdown (ongoing)")).toBe(true);
    expect(isChartOutage("thermal throttle (ongoing)")).toBe(false);
  });

  it("still refuses the router's keepalive drops", () => {
    expect(isChartOutage("EVENT_REASON_ROUTER_POP_IPV4_PING_DROP")).toBe(false);
    expect(isChartOutage("EVENT_REASON_ROUTER_POWER_CYCLE")).toBe(false);
  });
});

describe("placeOutageLabels", () => {
  const plotLeft = 46;
  const plotWidth = 500;

  function band(partial: Partial<OutageBandInput> & Pick<OutageBandInput, "key">): OutageBandInput {
    return {
      x: 100,
      width: 4,
      label: "Router",
      durationMs: 10_000,
      ongoing: false,
      ...partial,
    };
  }

  it("names a hairline, because the word can be wider than the band", () => {
    const [placed] = placeOutageLabels([band({ key: "a", x: 200, width: 2 })], plotLeft, plotWidth);
    expect(placed.label).toBe("Router");
    expect(placed.labelWidth).toBeGreaterThan(placed.width);
  });

  it("names a sub-second blip, because that hairline is the cut someone opens", () => {
    const [placed] = placeOutageLabels(
      [band({ key: "a", durationMs: 800, label: "No signal" })],
      plotLeft,
      plotWidth,
    );
    expect(placed.label).toBe("No signal");
  });

  it("names the cut that is still going even when it is still short", () => {
    const [placed] = placeOutageLabels(
      [band({ key: "now", durationMs: 500, ongoing: true, label: "Sky blocked" })],
      plotLeft,
      plotWidth,
    );
    expect(placed.label).toBe("Sky blocked");
  });

  it("keeps the longer cut's word when two labels would overlap", () => {
    const placed = placeOutageLabels(
      [
        band({ key: "short", x: 200, width: 8, durationMs: 4_000, label: "Router" }),
        band({ key: "long", x: 210, width: 40, durationMs: 40_000, label: "Sky blocked" }),
      ],
      plotLeft,
      plotWidth,
    );
    const labeled = placed.filter((band) => band.label);
    expect(labeled).toHaveLength(1);
    expect(labeled[0].key).toBe("long");
  });

  it("lets the live cut take the words even from a longer one beside it", () => {
    const placed = placeOutageLabels(
      [
        band({ key: "old", x: 200, width: 80, durationMs: 120_000, label: "Rebooting" }),
        band({ key: "now", x: 220, width: 6, durationMs: 2_000, ongoing: true, label: "Thermal" }),
      ],
      plotLeft,
      plotWidth,
    );
    const labeled = placed.filter((band) => band.label);
    expect(labeled.map((band) => band.key)).toEqual(["now"]);
  });
});
