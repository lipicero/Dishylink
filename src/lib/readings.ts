// Selecting the part of the sample buffer that speaks for now: the newest
// reading, the last minute, the last ninety seconds.
//
// Every span is cut from wall-clock now. A dish that stops answering stops
// appending samples, so a span counted in readings would stand still with the
// data and go on presenting the last healthy minute as the current one — a
// figure reading 100% ping success while the dish is unreachable.

import type { TelemetrySample } from "@core/telemetry";

const RECENT_AVERAGE_MS = 60_000;
const SPARKLINE_MS = 90_000;
/** Points on a tile's spark line. The span divided by this is the bucket the
 *  clock grid is snapped to. */
const SPARKLINE_POINTS = 28;
/** The scale keeps a peak until the line has fallen clearly below it. A live
 *  reading wobbles inside that band; following it would redraw the whole
 *  spark on every refresh. */
const SPARK_SCALE_HOLD = 0.72;
const POWER_BUCKET_MEAN_MS = 5_000;
const POWER_BUCKET_FALLBACK_MS = 60_000;

/**
 * Whether the last minute holds any reading at all.
 *
 * For the tiles whose figure is inverted from what the dish reports. Ping
 * success is drawn from the drop rate, so a minute with nothing in it averages
 * to zero drops and renders as 100% answered — the most reassuring number on
 * the dashboard, shown at the moment the dish is unreachable. A figure that
 * reads healthy when it means "no data" needs the emptiness passed separately;
 * one that reads zero can be left to say zero.
 */
export function hasRecentReadings(samples: TelemetrySample[], nowMs: number): boolean {
  const newest = samples[samples.length - 1];
  return newest !== undefined && newest.timestampMs >= nowMs - RECENT_AVERAGE_MS;
}

/**
 * The last 90 seconds of a series, for the spark line on a stat tile.
 *
 * `windowEndMs` caps the newest edge: a live tile leaves it open (the default),
 * so the trace runs to the freshest sample. A tile whose figure is quantized to a
 * bucket boundary passes the boundary here too, so the trace's newest point steps
 * with the figure instead of creeping ahead of it every second.
 */
export interface SparkSample {
  timestampMs: number;
  value: number | null;
}

export function sparklineFrom(
  samples: TelemetrySample[],
  getValue: (sample: TelemetrySample) => number | null,
  nowMs: number,
  windowEndMs = Infinity,
): SparkSample[] {
  const floorMs = nowMs - SPARKLINE_MS;
  let firstVisible = samples.length;
  while (firstVisible > 0 && samples[firstVisible - 1].timestampMs >= floorMs) firstVisible--;
  let lastVisible = samples.length;
  while (lastVisible > firstVisible && samples[lastVisible - 1].timestampMs >= windowEndMs)
    lastVisible--;
  return samples.slice(firstVisible, lastVisible).map((sample) => ({
    timestampMs: sample.timestampMs,
    value: getValue(sample),
  }));
}

/**
 * The tile's spark, averaged onto a clock grid.
 *
 * Index buckets would move every time a sample arrives: the same burst gets
 * averaged with different neighbours and the line changes shape as the number
 * beside it updates. The grid is fixed to the clock, and the trace is always
 * the same number of slots, so between bucket boundaries the line holds still
 * and then steps by one point.
 */
export function sparklineBuckets(samples: readonly SparkSample[]): (number | null)[] {
  if (samples.length === 0) return [];
  let newestMs = samples[0].timestampMs;
  for (const sample of samples) {
    if (sample.timestampMs > newestMs) newestMs = sample.timestampMs;
  }
  const endMs = newestMs + 1;
  const startMs = endMs - SPARKLINE_MS;
  const bucketSpanMs = SPARKLINE_MS / SPARKLINE_POINTS;
  const originMs = Math.floor(startMs / bucketSpanMs) * bucketSpanMs;
  const lastIndex = Math.floor((endMs - 1 - originMs) / bucketSpanMs);
  const firstIndex = lastIndex - SPARKLINE_POINTS + 1;
  const sums = new Array<number>(SPARKLINE_POINTS).fill(0);
  const counts = new Array<number>(SPARKLINE_POINTS).fill(0);
  for (const sample of samples) {
    if (sample.value === null || !Number.isFinite(sample.value)) continue;
    const index = Math.floor((sample.timestampMs - originMs) / bucketSpanMs) - firstIndex;
    if (index < 0 || index >= SPARKLINE_POINTS) continue;
    sums[index] += sample.value;
    counts[index] += 1;
  }
  return counts.map((count, index) => (count === 0 ? null : sums[index] / count));
}

/** Vertical scale for a spark. Rises with a new peak immediately, and only
 *  falls once the line has dropped clearly below the scale it is holding, so
 *  a refresh does not squash the trace. */
export function nextSparkScale(held: number, observed: number): number {
  if (!(held > 0)) return observed;
  if (observed > held) return observed;
  if (observed < held * SPARK_SCALE_HOLD) return observed;
  return held;
}

/**
 * The end of the latest completed 5-second bucket: the wall-clock boundary the
 * power figure, its spark line, and its charts all settle on, so they step in
 * lockstep every 5s rather than each drifting on its own clock. Equivalently the
 * start of the still-open bucket, which is why samples at or after it are excluded
 * everywhere this anchors — that bucket is not done.
 */
export function powerBucketEndMs(nowMs: number, bucketMs = POWER_BUCKET_MEAN_MS): number {
  return Math.floor(nowMs / bucketMs) * bucketMs;
}

/**
 * Mean of the positive draws in the half-open window `[startMs, endMs)`, or
 * `null` when the window holds no real reading. A dropped ring entry decodes as 0
 * (decodeHistoryWindow), so non-positive samples are skipped rather than dragging
 * the mean down; a window with only those, or none at all, reads as empty.
 */
function powerMeanInWindow(
  samples: TelemetrySample[],
  startMs: number,
  endMs: number,
): number | null {
  let sum = 0;
  let count = 0;
  for (let index = samples.length - 1; index >= 0; index--) {
    const sample = samples[index];
    if (sample.timestampMs < startMs) break;
    if (sample.timestampMs >= endMs) continue;
    const powerW = sample.powerW;
    if (powerW !== null && powerW > 0) {
      sum += powerW;
      count++;
    }
  }
  return count === 0 ? null : sum / count;
}

/**
 * The settled current draw: the mean of the last completed 5-second bucket,
 * aligned to wall-clock boundaries.
 *
 * The per-second draw is spiky as the dish heats itself and shifts load, so the
 * figure is bucketed — held steady across each 5s window and stepped at the
 * boundary. The cut is aligned to the clock rather than a trailing 5s from now,
 * so the value stays fixed within a bucket instead of re-averaging every second.
 *
 * When the latest completed bucket holds nothing — as in the few seconds after
 * the dish returns from a gap, its first fresh sample still sitting in the open
 * bucket — the figure reaches back through earlier completed buckets to the most
 * recent one that has a reading, so it holds the last real draw instead of
 * flashing 0 W. The reach is bounded: once nothing in the last minute has a
 * reading, the dish is genuinely quiet and the figure settles to 0.
 */
export function powerBucketMean(
  samples: TelemetrySample[],
  nowMs: number,
  bucketMs = POWER_BUCKET_MEAN_MS,
): number {
  const latestBucketEndMs = powerBucketEndMs(nowMs, bucketMs);
  const oldestBucketEndMs = latestBucketEndMs - POWER_BUCKET_FALLBACK_MS;
  for (
    let bucketEndMs = latestBucketEndMs;
    bucketEndMs > oldestBucketEndMs;
    bucketEndMs -= bucketMs
  ) {
    const mean = powerMeanInWindow(samples, bucketEndMs - bucketMs, bucketEndMs);
    if (mean !== null) return mean;
  }
  return 0;
}

/**
 * Mean over the last minute of clock.
 *
 * The cut is by timestamp because a silent dish stops appending: a fixed count
 * of trailing samples would keep re-averaging the last minute before the dish
 * went quiet and report it as the current one, holding a tile at its final
 * healthy reading for as long as the outage runs. An empty minute averages to
 * zero, which on these tiles is the honest reading — no throughput moved, no
 * ping came back.
 */
export function recentAverage(
  samples: TelemetrySample[],
  getValue: (sample: TelemetrySample) => number | null,
  nowMs: number,
): number {
  const floorMs = nowMs - RECENT_AVERAGE_MS;
  const recentValues: number[] = [];
  for (let index = samples.length - 1; index >= 0; index--) {
    const sample = samples[index];
    if (sample.timestampMs < floorMs) break;
    const value = getValue(sample);
    if (value !== null) recentValues.push(value);
  }
  if (recentValues.length === 0) return 0;
  return recentValues.reduce((sum, value) => sum + value, 0) / recentValues.length;
}
