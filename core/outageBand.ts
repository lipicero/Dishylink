// What a red band on the chart is allowed to say. The event log keeps the dish's
// own wording ("Ping Network Interruption", "Starlink booting"). The band is
// what someone opens when the internet just died, so it answers with one of the
// four things they can actually do something about — the sky, heat, no
// satellites overhead, or the router — and only falls back to a shorter word
// when none of those explain it.

import { canonicalCause, outageEventKind, type OutageEvent } from "./telemetry";

export type OutageFamily = "sky" | "thermal" | "satellites" | "router";

const FAMILY_LABEL: Record<OutageFamily, string> = {
  sky: "Sky blocked",
  thermal: "Thermal",
  satellites: "No satellites",
  router: "Router",
};

/** Lower wins when two explanations overlap one cut. Heat and a blocked sky
 *  are facts about the dish; "the router" is what we say when a reboot or a
 *  dead cable is the thing that lines up with an otherwise unnamed drop. */
const FAMILY_RANK: Record<OutageFamily, number> = {
  thermal: 0,
  sky: 1,
  satellites: 2,
  router: 3,
};

const SHORT_LABEL: Record<string, string> = {
  NO_PINGS: "No traffic",
  NO_DOWNLINK: "No signal",
  NO_SCHEDULE: "No schedule",
  UNKNOWN: "Unknown",
  BOOTING: "Rebooting",
  RAIN_SNR_PERSISTENTLY_LOW: "Weather",
  WEAK_SIGNAL_FROM_WEATHER: "Weather",
  ACTUATOR_ACTIVITY: "Moving",
  STOWED: "Stowed",
  SLEEPING: "Sleep",
  CABLE_TEST: "Cable test",
  INHIBIT_RF: "Paused",
};

/** A power cycle is a point in the log. The dish's boot outage starts a few
 *  seconds later — long enough that a strict overlap would miss it, short
 *  enough that 15s does not glue an unrelated cut to an old reboot. */
export const CAUSE_SLACK_MS = 15_000;

function causeToken(cause: string): string {
  return canonicalCause(cause).replace(/_\(ONGOING\)$/, "");
}

function causeFamily(cause: string): OutageFamily | null {
  switch (causeToken(cause)) {
    case "OBSTRUCTED":
      return "sky";
    case "THERMAL_SHUTDOWN":
      return "thermal";
    case "NO_SATS":
    case "SKY_SEARCH":
      return "satellites";
    case "ETH_NO_LINK":
    case "ROUTER_POWER_CYCLE":
    case "ROUTER_SOFTWARE_UPDATE":
    case "ROUTER_REBOOT":
      return "router";
    default:
      return null;
  }
}

/** Real loss of service, including a thermal shutdown the historian phrased
 *  as a sentence ("thermal shutdown (ongoing)") rather than an OUTAGE_* enum.
 *  A throttle is heat without a drop, so it stays off the red bands. */
export function isChartOutage(cause: string): boolean {
  return outageEventKind(cause) === "outage" || causeFamily(cause) === "thermal";
}

function eventTouches(outage: OutageEvent, event: OutageEvent): boolean {
  const slack = event.durationMs <= 0 ? CAUSE_SLACK_MS : 0;
  const outageEnd = outage.startMs + outage.durationMs;
  const eventEnd = event.startMs + Math.max(event.durationMs, 0);
  return eventEnd >= outage.startMs - slack && event.startMs <= outageEnd + slack;
}

/** The word drawn on one red band. */
export function explainOutageBand(outage: OutageEvent, events: readonly OutageEvent[]): string {
  const own = causeFamily(outage.cause);
  if (own) return FAMILY_LABEL[own];

  let best: OutageFamily | null = null;
  for (const event of events) {
    if (event.startMs === outage.startMs && event.cause === outage.cause) continue;
    if (!eventTouches(outage, event)) continue;
    const family = causeFamily(event.cause);
    if (!family) continue;
    if (best === null || FAMILY_RANK[family] < FAMILY_RANK[best]) best = family;
  }
  if (best) return FAMILY_LABEL[best];
  return SHORT_LABEL[causeToken(outage.cause)] ?? "Outage";
}

export interface OutageBandInput {
  key: string | number;
  x: number;
  width: number;
  label: string;
  durationMs: number;
  ongoing: boolean;
}

export interface PlacedOutageBand {
  key: string | number;
  x: number;
  width: number;
  label?: string;
  labelX?: number;
  labelWidth?: number;
}

/** IBM Plex Mono at 10px, plus a little air so the chip holds the word. */
export function estimateLabelWidth(label: string): number {
  return Math.ceil(label.length * 6.6 + 12);
}

/**
 * Puts a label on each cut worth reading, centered on its band and allowed to
 * be wider than the band — a two-pixel hairline still has to say "Router".
 * Longer cuts win when two labels would land on the same stretch; the live
 * cut wins over all of them.
 */
export function placeOutageLabels(
  bands: readonly OutageBandInput[],
  plotLeft: number,
  plotWidth: number,
): PlacedOutageBand[] {
  const placed: { x0: number; x1: number }[] = [];
  const labelByKey = new Map<string | number, { labelX: number; labelWidth: number }>();

  const candidates = bands.slice().sort((a, b) => {
      if (a.ongoing !== b.ongoing) return a.ongoing ? -1 : 1;
      return b.durationMs - a.durationMs || a.x - b.x;
    });

  for (const band of candidates) {
    const labelWidth = estimateLabelWidth(band.label);
    if (labelWidth > plotWidth) continue;
    const center = band.x + band.width / 2;
    const labelX = Math.min(
      Math.max(plotLeft, center - labelWidth / 2),
      plotLeft + plotWidth - labelWidth,
    );
    const x0 = labelX;
    const x1 = labelX + labelWidth;
    if (placed.some((slot) => x1 > slot.x0 && x0 < slot.x1)) continue;
    placed.push({ x0, x1 });
    labelByKey.set(band.key, { labelX, labelWidth });
  }

  return bands.map((band) => {
    const label = labelByKey.get(band.key);
    if (!label) return { key: band.key, x: band.x, width: band.width };
    return { key: band.key, x: band.x, width: band.width, label: band.label, ...label };
  });
}
