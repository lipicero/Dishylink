// Pixel buckets for a time-series chart.
//
// The window slides every second, with the stat tiles. If the bucket edges
// slid with it, a burst would be averaged with a different set of neighbours
// on every tick: the tallest bucket — and the axis that follows it — jumps,
// and the whole curve stretches or squashes even though the readings did not.
// Edges are therefore a fixed grid on the clock. A sample stays in its bucket
// until a whole bucket rolls off, and the line scrolls instead of changing shape.

import type { TelemetrySample } from "@core/telemetry";

export interface BucketSeries {
  getValue: (sample: TelemetrySample) => number | null;
  bucketReduce?: "avg" | "max" | "min";
}

export interface ChartBucket {
  timestampMs: number;
  values: (number | null)[];
  /** No samples at all between the previous bucket and this one. */
  hasGapBefore: boolean;
}

function reduceBucket(values: number[], reduce: BucketSeries["bucketReduce"]): number {
  if (reduce === "max") return Math.max(...values);
  if (reduce === "min") return Math.min(...values);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function bucketSamples(
  samples: readonly TelemetrySample[],
  series: readonly BucketSeries[],
  windowStartMs: number,
  windowEndMs: number,
  plotWidth: number,
  minGapMs: number,
): { buckets: ChartBucket[]; bucketSpanMs: number } {
  // Half-open [start, end): with a frozen end, samples past the boundary would
  // otherwise clamp into the last bucket and creep its mean every second,
  // defeating the freeze. On the live clock nothing is newer than now, so this
  // excludes only a sample landing exactly on it.
  const visibleSamples = samples.filter(
    (sample) => sample.timestampMs >= windowStartMs && sample.timestampMs < windowEndMs,
  );
  if (visibleSamples.length === 0 || windowEndMs <= windowStartMs) {
    return { buckets: [], bucketSpanMs: 0 };
  }

  const bucketCount = Math.min(Math.max(Math.floor(plotWidth / 2), 30), visibleSamples.length);
  const bucketSpanMs = (windowEndMs - windowStartMs) / bucketCount;
  // The grid starts on a multiple of the span, not on the window's left edge,
  // so sliding the window by less than one bucket does not move any edge.
  const originMs = Math.floor(windowStartMs / bucketSpanMs) * bucketSpanMs;
  const lastIndex = Math.floor((windowEndMs - 1 - originMs) / bucketSpanMs);
  const grouped: TelemetrySample[][] = Array.from({ length: lastIndex + 1 }, () => []);
  for (const sample of visibleSamples) {
    const bucketIndex = Math.floor((sample.timestampMs - originMs) / bucketSpanMs);
    grouped[bucketIndex].push(sample);
  }

  const populated = grouped.flatMap((bucketSamples, bucketIndex) => {
    if (bucketSamples.length === 0) return [];
    return [
      {
        timestampMs: originMs + (bucketIndex + 0.5) * bucketSpanMs,
        values: series.map((chartSeries) => {
          const seriesValues = bucketSamples
            .map(chartSeries.getValue)
            .filter((value): value is number => value !== null && Number.isFinite(value));
          if (seriesValues.length === 0) return null;
          return reduceBucket(seriesValues, chartSeries.bucketReduce);
        }),
        hasGapBefore: false,
      },
    ];
  });

  // Empty buckets are dropped above, so a hole shows up as two neighbours
  // further apart than one bucket. Anything wider than that — and wider than
  // a dropped sample or two — is time we never measured.
  const gapThresholdMs = Math.max(bucketSpanMs * 1.5, minGapMs);
  for (let index = 1; index < populated.length; index++) {
    populated[index].hasGapBefore =
      populated[index].timestampMs - populated[index - 1].timestampMs > gapThresholdMs;
  }
  return { buckets: populated, bucketSpanMs };
}
