import { describe, expect, it } from "vitest";
import {
  isChartOutage,
  outageBandFamily,
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

describe("outageBandFamily", () => {
  it("classifies dish and router causes", () => {
    expect(outageBandFamily(event(0, 10_000, "OBSTRUCTED"), [])).toBe("sky");
    expect(outageBandFamily(event(0, 10_000, "thermal shutdown (ongoing)"), [])).toBe("thermal");
    expect(outageBandFamily(event(0, 10_000, "OUTAGE_NO_SATS"), [])).toBe("satellites");
    expect(outageBandFamily(event(0, 10_000, "EVENT_REASON_ETH_NO_LINK"), [])).toBe("router");
  });

  it("connects a boot outage to a nearby router power cycle", () => {
    const boot = event(8_000, 49_801, "EVENT_REASON_OUTAGE_BOOTING", "advisory");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(outageBandFamily(boot, [powerCycle, boot])).toBe("router");
  });

  it("does not attribute an outage to a distant event", () => {
    const outage = event(60_000, 5_000, "EVENT_REASON_OUTAGE_NO_PINGS");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(outageBandFamily(outage, [powerCycle])).toBeNull();
  });

  it("prefers thermal and keeps an outage's own cause over overlapping events", () => {
    const outage = event(0, 30_000, "EVENT_REASON_OUTAGE_NO_PINGS");
    const thermal = event(1_000, 20_000, "thermal shutdown");
    const powerCycle = event(0, 0, "EVENT_REASON_ROUTER_POWER_CYCLE", "advisory");
    expect(outageBandFamily(outage, [outage, thermal, powerCycle])).toBe("thermal");
    expect(outageBandFamily(event(0, 20_000, "OBSTRUCTED"), [powerCycle])).toBe("sky");
  });
});

describe("isChartOutage", () => {
  it("includes thermal shutdowns but not throttles or router keepalive events", () => {
    expect(isChartOutage("thermal shutdown (ongoing)")).toBe(true);
    expect(isChartOutage("thermal throttle (ongoing)")).toBe(false);
    expect(isChartOutage("EVENT_REASON_ROUTER_POP_IPV4_PING_DROP")).toBe(false);
    expect(isChartOutage("EVENT_REASON_ROUTER_POWER_CYCLE")).toBe(false);
  });
});

describe("placeOutageLabels", () => {
  const band = (
    partial: Partial<OutageBandInput> & Pick<OutageBandInput, "key">,
  ): OutageBandInput => ({
    x: 100,
    width: 4,
    label: "Router",
    durationMs: 10_000,
    ongoing: false,
    ...partial,
  });

  it("can label a narrow band and keeps labels inside the plot", () => {
    const [placed] = placeOutageLabels([band({ key: "cut", x: 200, width: 2 })], 46, 500);
    expect(placed.label).toBe("Router");
    expect(placed.labelWidth).toBeGreaterThan(placed.width);
    expect(placed.labelX).toBeGreaterThanOrEqual(46);
    expect(placed.labelX! + placed.labelWidth!).toBeLessThanOrEqual(546);
  });

  it("prioritizes the ongoing cut and avoids overlapping labels", () => {
    const placed = placeOutageLabels(
      [
        band({ key: "old", x: 200, width: 80, durationMs: 120_000, label: "Rebooting" }),
        band({ key: "now", x: 220, width: 6, durationMs: 2_000, ongoing: true, label: "Thermal" }),
      ],
      46,
      500,
    );
    expect(placed.find((item) => item.key === "now")?.label).toBe("Thermal");
    expect(placed.find((item) => item.key === "old")?.label).toBeUndefined();
  });
});
