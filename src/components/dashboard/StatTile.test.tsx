import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { StatTile } from "./StatTile";

test("keeps a throughput sparkline the same width when its value gains a digit", async () => {
  render(
    <div className='flex gap-4'>
      {["20", "200"].map((value) => (
        <div key={value} style={{ width: 240 }}>
          <StatTile
            label='Download'
            value={value}
            valueClassName='min-w-[3ch] tabular-nums'
            unit='kbps'
            sparkValues={[10, 20, 30, 40]}
          />
        </div>
      ))}
    </div>,
  );

  const deadline = Date.now() + 2_000;
  while (document.querySelectorAll("svg").length < 2) {
    if (Date.now() > deadline) throw new Error("timed out waiting for the stat tile sparklines");
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  const widths = [...document.querySelectorAll("svg")].map(
    (svg) => svg.getBoundingClientRect().width,
  );
  expect(widths[0]).toBeCloseTo(widths[1], 1);
});
