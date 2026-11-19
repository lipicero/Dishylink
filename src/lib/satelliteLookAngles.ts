import type { TopocentricState } from "./satellites";

/**
 * Advance look angles from the sample they were taken at by `dtSeconds`, using
 * the topocentric velocity. SGP4 is throttled to ~10 Hz; a renderer calls this
 * every frame so satellites move smoothly between samples instead of stepping.
 */
export function advanceLookAngles(
  topocentric: TopocentricState,
  dtSeconds: number,
): { azimuthDeg: number; elevationDeg: number; rangeKm: number } {
  const { position, velocity } = topocentric;
  const e = position[0] + velocity[0] * dtSeconds;
  const n = position[1] + velocity[1] * dtSeconds;
  const u = position[2] + velocity[2] * dtSeconds;
  const range = Math.hypot(e, n, u) || 1;
  let azimuth = Math.atan2(e, n);
  if (azimuth < 0) azimuth += Math.PI * 2;
  return {
    azimuthDeg: (azimuth * 180) / Math.PI,
    elevationDeg: (Math.asin(u / range) * 180) / Math.PI,
    rangeKm: range,
  };
}
