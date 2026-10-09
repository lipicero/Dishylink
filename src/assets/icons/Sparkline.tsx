// The inline trend line that runs beside a stat's big number.
//
// It stretches to whatever width it is given (preserveAspectRatio="none") and
// keeps its stroke crisp through that stretch with vectorEffect, so the tile can
// size it without the line going wedge-shaped. The width itself has to stay
// fixed: these tiles sit in a row with the big number, and a value going from
// "8" to "1,024" would otherwise steal width and squash the line.

import { useState } from "react";
import { nextSparkScale } from "../../lib/readings";

const WIDTH = 120;
const HEIGHT = 30;

function buildPath(values: readonly (number | null)[], scale: number): string {
  if (values.length < 2) return "";
  const stepX = WIDTH / (values.length - 1);
  let path = "";
  let pathOpen = false;
  values.forEach((value, pointIndex) => {
    if (value === null) {
      pathOpen = false;
      return;
    }
    const x = pointIndex * stepX;
    const y = HEIGHT - 3 - (value / scale) * (HEIGHT - 6);
    path += `${pathOpen ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    pathOpen = true;
  });
  return path;
}

// `values` is also an SVG animation attribute (a string), so it is dropped from
// the passthrough props rather than fought with.
interface SparklineProps extends Omit<React.ComponentProps<"svg">, "values"> {
  values: readonly (number | null)[];
  /** CSS custom property naming the stroke, e.g. "--series-down". */
  colorVar?: string;
}

/** Renders nothing when there are too few samples to make a line. */
export function Sparkline({ values, colorVar = "--chart-ink", ...props }: SparklineProps) {
  const finiteValues = values.filter(
    (value): value is number => value !== null && Number.isFinite(value),
  );
  const observed = finiteValues.length === 0 ? 0 : Math.max(...finiteValues);
  const [scale, setScale] = useState(observed);
  const used = nextSparkScale(scale, observed);
  if (used !== scale) setScale(used);

  const path = buildPath(values, Math.max(used, 1e-9));
  if (!path) return null;

  return (
    <svg height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio='none' {...props}>
      <path
        d={path}
        fill='none'
        stroke={`var(${colorVar})`}
        strokeWidth={1.5}
        strokeLinejoin='round'
        strokeLinecap='round'
        vectorEffect='non-scaling-stroke'
      />
    </svg>
  );
}
