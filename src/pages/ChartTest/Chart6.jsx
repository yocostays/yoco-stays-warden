import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';

// Static data
const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  
];

const verticalMargin = 120;

// accessors
const getLetter = (d) => d.letter;
const getLetterFrequency = (d) => Number(d.frequency) * 100;

export default function Chart6({ width, height, events = false }) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
