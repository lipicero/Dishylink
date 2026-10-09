// Hardware generation of a Starlink satellite, read from the launch identity
// already sitting in TLE line 1. CelesTrak names the craft "STARLINK-1234"
// and never says which block it is; the block is a property of the launch.
//
// Ranges follow the public launch list. v1.5 and v2 Mini flew in the same
// months of 2023, so a single cutoff would mislabel one or the other. v3 is
// an explicit list: Falcon 9 kept launching v2 Mini after the first Starship
// batch, and a "newer than" rule would call those v3.

export type StarlinkGeneration = "v0.9" | "v1.0" | "v1.5" | "v2 Mini" | "v3";

/** year × 1000 + launch-of-year, so 2023-026 compares as 2023026. */
function launchKey(line1: string): number | null {
  const yearDigits = line1.slice(9, 11);
  const launchDigits = line1.slice(11, 14);
  if (!/^\d{2}$/.test(yearDigits) || !/^\d{3}$/.test(launchDigits)) return null;
  const year2 = Number(yearDigits);
  const year = year2 < 57 ? 2000 + year2 : 1900 + year2;
  return year * 1000 + Number(launchDigits);
}

// Last v1.0 is 2021-044. The next Starlink launch, 2021-059, is the first v1.5.
const FIRST_V1_0 = 2019074;
const FIRST_V1_5 = 2021059;
const FIRST_V2_MINI = 2023026;

// v1.5 launches that flew after FIRST_V2_MINI, through Group 5-15, the last v1.5.
const V1_5_AFTER_V2_MINI = new Set<number>([
  2023028, 2023037, 2023042, 2023046, 2023058, 2023061, 2023064, 2023065, 2023078, 2023083, 2023088,
  2023090, 2023094, 2023099,
]);

// Operational v3 batches. Add a Starship launch here; do not widen this into
// "anything newer", or the next Falcon flight gets called v3.
const V3_LAUNCHES = new Set<number>([
  2026225, // Group 31-1, 28 Sep 2026
]);

/** Generation for the satellite whose TLE line 1 this is, or null if the launch is unknown. */
export function starlinkGeneration(line1: string): StarlinkGeneration | null {
  const key = launchKey(line1);
  if (key === null) return null;
  if (V3_LAUNCHES.has(key)) return "v3";
  if (key === 2019029) return "v0.9";
  if (key >= FIRST_V1_0 && key < FIRST_V1_5) return "v1.0";
  if ((key >= FIRST_V1_5 && key < FIRST_V2_MINI) || V1_5_AFTER_V2_MINI.has(key)) return "v1.5";
  if (key >= FIRST_V2_MINI) return "v2 Mini";
  return null;
}
