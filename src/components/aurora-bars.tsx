import * as React from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { useTheme } from 'next-themes';

export interface AuroraBarsProps {
  /** @default 24 */
  barCount?: number;
  /** gradient color stops, bottom to top — @default ["#ffd6eb", "#ff9acb", "#ff5aa6", "#ff2d78", "#00000000"] */
  colors?: string[];
  /** max bar height as fraction of container height — @default 0.92 */
  maxHeightRatio?: number;
  /** min bar height as fraction of container height — @default 0.18 */
  minHeightRatio?: number;
  /** undulation speed — @default 0.5 */
  speed?: number;
  /** @default 3 */
  gap?: number;
  /** px blur per bar, creates soft glow — @default 0 */
  blur?: number;
  /** @default "transparent" */
  background?: string;
  className?: string;
}

/** two sine waves per bar for organic movement */
function barHeight(
  index: number,
  total: number,
  time: number,
  minH: number,
  maxH: number,
): number {
  // Arch envelope: tallest in the centre, shorter on edges
  const norm = index / (total - 1 || 1);
  const arch = Math.sin(norm * Math.PI);

  const phase1 = (index / total) * Math.PI * 2;
  const phase2 = (index / total) * Math.PI * 5.3;

  const wave =
    0.5 +
    0.25 * Math.sin(time * 1.1 + phase1) +
    0.25 * Math.sin(time * 0.7 + phase2);

  const blended = arch * 0.65 + wave * 0.35;

  return minH + blended * (maxH - minH);
}

export function AuroraBars({
  barCount = 24,
  colors = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#00000000'],
  maxHeightRatio = 0.92,
  minHeightRatio = 0.18,
  speed = 0.5,
  gap = 3,
  blur = 0,
  background = 'transparent',
  className,
}: AuroraBarsProps) {
  const { theme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [heights, setHeights] = React.useState<number[]>(() =>
    Array.from({ length: barCount }, (_, i) =>
      barHeight(i, barCount, 0, minHeightRatio, maxHeightRatio),
    ),
  );

  const timeRef = React.useRef(0);

  useAnimationFrame((_, delta) => {
    timeRef.current += (delta / 1000) * speed;
    const t = timeRef.current;
    setHeights(
      Array.from({ length: barCount }, (_, i) =>
        barHeight(i, barCount, t, minHeightRatio, maxHeightRatio),
      ),
    );
  });

  const gradientStop = colors
    .map((c, i) => `${c} ${Math.round((i / (colors.length - 1 || 1)) * 100)}%`)
    .join(', ');
  const gradient = `linear-gradient(to top, ${gradientStop})`;

  // Determine vignette background based on current theme to blend smoothly
  // We'll fallback to a dark vignette if theme is undefined initially
  const vignetteBackground =
    theme === 'light'
      ? 'radial-gradient(ellipse 95% 85% at 50% 100%, transparent 20%, #ffffff 100%)'
      : 'radial-gradient(ellipse 95% 85% at 50% 100%, transparent 20%, #09090b 100%)';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      style={{ background }}
    >
      <div className="absolute inset-0 flex items-end">
        {Array.from({ length: barCount }).map((_, i) => {
          const heightFraction = heights[i] ?? maxHeightRatio;
          return (
            <div
              key={i}
              className="flex-1"
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                padding: `0 ${gap / 2}px`,
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: `${heightFraction * 100}%`,
                  background: gradient,
                  borderRadius: '9999px 9999px 0 0',
                  filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  opacity: 0.75,
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: vignetteBackground,
        }}
      />
    </div>
  );
}
