import { describe, expect, it } from "vitest";
import type { TelemetrySample } from "@core/telemetry";
import { bucketSamples } from "./chartBuckets";

function sample(timestampMs: number, downlinkBps: number): TelemetrySample {
  return {
    timestampMs,
    latencyMs: 30,
    dropRate: 0,
    downlinkBps,
    uplinkBps: 0,
    powerW: 20,
    routerLatencyMs: null,
    routerPingSuccessPercent: null,
  };
}

const series = [{ getValue: (reading: TelemetrySample) => reading.downlinkBps }];

describe("bucketSamples", () => {
  it("keeps a burst in the same bucket when the window slides by a second", () => {
    // 120 one-second readings, one of them a spike. The chart asks for 40
    // buckets, so three seconds share a bucket. Sliding the window the way the
    // live clock does must not average that spike with a new set of neighbours.
    const readings = Array.from({ length: 120 }, (_, index) =>
      sample(index * 1_000, index === 60 ? 40_000_000 : 1_000_000),
    );

    const first = bucketSamples(readings, series, 0, 120_000, 80, 30_000);
    const slid = bucketSamples(readings, series, 1_000, 121_000, 80, 30_000);

    const peak = (buckets: { values: (number | null)[] }[]) =>
      Math.max(...buckets.map((bucket) => bucket.values[0] ?? 0));

    expect(peak(slid.buckets)).toBe(peak(first.buckets));
    expect(peak(first.buckets)).toBeGreaterThan(1_000_000);
  });

  it("does not call a continuous series a hole", () => {
    const readings = Array.from({ length: 60 }, (_, index) => sample(index * 1_000, 1_000_000));
    const { buckets } = bucketSamples(readings, series, 0, 60_000, 200, 30_000);
    expect(buckets.some((bucket) => bucket.hasGapBefore)).toBe(false);
  });
});
