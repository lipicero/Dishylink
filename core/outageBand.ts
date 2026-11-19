import { canonicalCause, outageEventKind, type OutageEvent } from "./telemetry";

export type OutageFamily = "sky" | "thermal" | "satellites" | "router";

const FAMILY_RANK: Record<OutageFamily, number> = {
  thermal: 0,
  sky: 1,
  satellites: 2,
  router: 3,
};

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

export function isChartOutage(cause: string): boolean {
  return outageEventKind(cause) === "outage" || causeFamily(cause) === "thermal";
}

function eventTouches(outage: OutageEvent, event: OutageEvent): boolean {
  const slack = event.durationMs <= 0 ? CAUSE_SLACK_MS : 0;
  const outageEnd = outage.startMs + outage.durationMs;
  const eventEnd = event.startMs + Math.max(event.durationMs, 0);
  return eventEnd >= outage.startMs - slack && event.startMs <= outageEnd + slack;
}

export function outageBandFamily(
  outage: OutageEvent,
  events: readonly OutageEvent[],
): OutageFamily | null {
  const ownFamily = causeFamily(outage.cause);
  if (ownFamily) return ownFamily;

  let best: OutageFamily | null = null;
  for (const event of events) {
    if (event.startMs === outage.startMs && event.cause === outage.cause) continue;
    if (!eventTouches(outage, event)) continue;
    const family = causeFamily(event.cause);
    if (family && (best === null || FAMILY_RANK[family] < FAMILY_RANK[best])) best = family;
  }
  return best;
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

export function estimateOutageLabelWidth(label: string): number {
  return Math.ceil(label.length * 6.6 + 12);
}

export function placeOutageLabels(
  bands: readonly OutageBandInput[],
  plotLeft: number,
  plotWidth: number,
): PlacedOutageBand[] {
  const occupied: { left: number; right: number }[] = [];
  const labels = new Map<string | number, { labelX: number; labelWidth: number }>();
  const candidates = bands.slice().sort((a, b) => {
    if (a.ongoing !== b.ongoing) return a.ongoing ? -1 : 1;
    return b.durationMs - a.durationMs || a.x - b.x;
  });

  for (const band of candidates) {
    const labelWidth = estimateOutageLabelWidth(band.label);
    if (labelWidth > plotWidth) continue;
    const center = band.x + band.width / 2;
    const labelX = Math.min(
      Math.max(plotLeft, center - labelWidth / 2),
      plotLeft + plotWidth - labelWidth,
    );
    const right = labelX + labelWidth;
    if (occupied.some((slot) => right > slot.left && labelX < slot.right)) continue;
    occupied.push({ left: labelX, right });
    labels.set(band.key, { labelX, labelWidth });
  }

  return bands.map((band) => {
    const label = labels.get(band.key);
    return label ? { ...band, ...label } : { key: band.key, x: band.x, width: band.width };
  });
}
