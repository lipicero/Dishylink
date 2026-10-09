import { describe, expect, it } from "vitest";
import { starlinkGeneration } from "./starlinkGeneration";

/** A line 1 with the international designator in columns 10–14. */
function line1(year: number, launch: number): string {
  const yy = String(year % 100).padStart(2, "0");
  const nnn = String(launch).padStart(3, "0");
  return `1 44714U ${yy}${nnn}A   25280.50000000  .00000000  00000-0  00000-0 0  9990`;
}

describe("starlinkGeneration", () => {
  it("reads the block from the launch, including the months the two generations overlapped", () => {
    expect(starlinkGeneration(line1(2019, 29))).toBe("v0.9");
    expect(starlinkGeneration(line1(2019, 74))).toBe("v1.0");
    expect(starlinkGeneration(line1(2021, 44))).toBe("v1.0");
    expect(starlinkGeneration(line1(2021, 59))).toBe("v1.5");
    expect(starlinkGeneration(line1(2021, 82))).toBe("v1.5");
    // Group 5-4, still v1.5, the launch before the first v2 Mini.
    expect(starlinkGeneration(line1(2023, 20))).toBe("v1.5");
    expect(starlinkGeneration(line1(2023, 26))).toBe("v2 Mini");
    // Group 5-5 flew a month after the first v2 Mini and is still v1.5.
    expect(starlinkGeneration(line1(2023, 42))).toBe("v1.5");
    expect(starlinkGeneration(line1(2023, 99))).toBe("v1.5");
    expect(starlinkGeneration(line1(2023, 102))).toBe("v2 Mini");
    expect(starlinkGeneration(line1(2024, 2))).toBe("v2 Mini");
    // Falcon launch the day before the first orbital v3 batch.
    expect(starlinkGeneration(line1(2026, 224))).toBe("v2 Mini");
    expect(starlinkGeneration(line1(2026, 225))).toBe("v3");
    expect(starlinkGeneration(line1(2026, 230))).toBe("v2 Mini");
  });

  it("stays quiet when the line does not carry a launch", () => {
    expect(starlinkGeneration("")).toBeNull();
    expect(starlinkGeneration("1 44714U ")).toBeNull();
    expect(starlinkGeneration(line1(2018, 20))).toBeNull();
  });
});
