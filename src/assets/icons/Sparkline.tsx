// The inline trend line that runs beside a stat's big number.
//
// It stretches to whatever width it is given (preserveAspectRatio="none") and
// keeps its stroke crisp through that stretch with vectorEffect, so the tile can
// size it without the line going wedge-shaped.

const WIDTH = 120;
const HEIGHT = 30;

function niceCeiling(rawMax: number): number {
  if (rawMax <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(rawMax));
  for (const multiplier of [1, 1.5, 2, 2.5, 4, 5, 8, 10]) {
    if (magnitude * multiplier >= rawMax) return magnitude * multiplier;
  }
  return magnitude * 10;
}

function buildPath(values: (number | null)[]): string {
  const points = values;
  const finiteValues = points.filter((value): value is number => value !== null);
  if (finiteValues.length < 2) return "";
  const maxValue = niceCeiling(Math.max(...finiteValues) * 1.08);
  const stepX = WIDTH / (points.length - 1);
  let path = "";
  let pathOpen = false;
  points.forEach((value, pointIndex) => {
    if (value === null) {
      pathOpen = false;
      return;
    }
    const x = pointIndex * stepX;
    const y = HEIGHT - 3 - (value / maxValue) * (HEIGHT - 6);
    path += `${pathOpen ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    pathOpen = true;
  });
  return path;
}

// `values` is also an SVG animation attribute (a string), so it is dropped from
// the passthrough props rather than fought with.
interface SparklineProps extends Omit<React.ComponentProps<"svg">, "values"> {
  values: (number | null)[];
  /** CSS custom property naming the stroke, e.g. "--series-down". */
  colorVar?: string;
}

/** Renders nothing when there are too few samples to make a line. */
export function Sparkline({ values, colorVar = "--chart-ink", ...props }: SparklineProps) {
  const path = buildPath(values);
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
