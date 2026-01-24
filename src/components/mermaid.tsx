'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svg, setSvg] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const currentChartRef = useRef<string>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (currentChartRef.current === chart || !container) return;
    currentChartRef.current = chart;

    async function renderChart() {
      const { default: mermaid } = await import('mermaid');

      try {
        const isDark = resolvedTheme === 'dark';

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          fontFamily: 'inherit',
          themeCSS: `
            margin: 1.5rem auto 0;
            ${
              isDark
                ? `
              .node rect, .node circle, .node ellipse, .node polygon, .node path {
                fill: #1f2937 !important;
                stroke: #ff9c08 !important;
                stroke-width: 2px !important;
              }
              .node .label {
                color: #f3f4f6 !important;
              }
              .edgeLabel {
                background-color: #1f2937 !important;
                color: #f3f4f6 !important;
              }
              .edgePath .path {
                stroke: #ff9c08 !important;
                stroke-width: 2px !important;
              }
              .cluster rect {
                fill: #1f2937 !important;
                stroke: #ff4e32 !important;
                stroke-width: 2px !important;
              }
              .section {
                stroke: #ff4e32 !important;
              }
            `
                : ''
            }
          `,
          theme: isDark ? 'dark' : 'default'
        });
        const { svg, bindFunctions } = await mermaid.render(id, chart.replaceAll('\\n', '\n'));

        bindFunctions?.(container!);
        setSvg(svg);
      } catch (error) {
        console.error('Error while rendering mermaid', error);
      }
    }

    void renderChart();
  }, [chart, id, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
