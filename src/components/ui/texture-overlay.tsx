import { ComponentProps } from 'react';
import { cn } from 'lib/utils';

export type TextureType =
  | 'dots'
  | 'grid'
  | 'noise'
  | 'crosshatch'
  | 'diagonal'
  | 'scatteredDots'
  | 'halftone'
  | 'triangular'
  | 'chevron'
  | 'paperGrain'
  | 'horizontalLines'
  | 'verticalLines'
  | 'none';

type TextureOverlayProps = ComponentProps<'div'> & {
  texture: TextureType;
  opacity?: number;
};

const texturePatterns: Record<TextureType, string> = {
  dots: 'bg-[radial-gradient(circle_at_1px_1px,var(--texture-color)_1px,transparent_0)] bg-size-[8px_8px]',

  grid: 'bg-[linear-gradient(var(--texture-color)_1px,transparent_1px),linear-gradient(90deg,var(--texture-color)_1px,transparent_1px)] bg-size-[12px_12px]',

  noise:
    'bg-[radial-gradient(circle_at_2px_2px,var(--texture-color)_1px,transparent_0)] bg-size-[6px_6px]',

  crosshatch:
    'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,var(--texture-color)_2px,var(--texture-color)_4px),repeating-linear-gradient(-45deg,transparent,transparent_2px,var(--texture-color)_2px,var(--texture-color)_4px)]',

  diagonal:
    'bg-[repeating-linear-gradient(-45deg,var(--texture-color),var(--texture-color)_1px,transparent_1px,transparent_6px)]',

  scatteredDots:
    'bg-[radial-gradient(circle_at_3px_7px,var(--texture-color)_1px,transparent_0),radial-gradient(circle_at_11px_2px,var(--texture-color)_1px,transparent_0),radial-gradient(circle_at_7px_12px,var(--texture-color)_1px,transparent_0)] bg-size-[16px_16px]',

  halftone:
    'bg-[radial-gradient(circle,var(--texture-color)_25%,transparent_25%)] bg-size-[10px_10px] bg-position-[0_0,5px_5px]',

  triangular:
    'bg-[conic-gradient(from_0deg_at_50%_50%,var(--texture-color)_0deg_120deg,transparent_120deg_240deg,var(--texture-color)_240deg_360deg)] bg-size-[8px_8px] bg-position-[0_0,4px_4px]',

  chevron:
    'bg-[repeating-linear-gradient(45deg,var(--texture-color)_0px,var(--texture-color)_2px,transparent_2px,transparent_8px),repeating-linear-gradient(-45deg,var(--texture-color)_0px,var(--texture-color)_2px,transparent_2px,transparent_8px)]',

  paperGrain:
    'bg-[repeating-linear-gradient(0deg,var(--texture-color)_0px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,var(--texture-color)_0px,transparent_1px,transparent_4px),repeating-linear-gradient(45deg,var(--texture-color)_0px,transparent_1px,transparent_5px)]',

  horizontalLines:
    'bg-[repeating-linear-gradient(0deg,var(--texture-color)_0px,var(--texture-color)_1px,transparent_1px,transparent_4px)]',

  verticalLines:
    'bg-[repeating-linear-gradient(90deg,var(--texture-color)_0px,var(--texture-color)_1px,transparent_1px,transparent_4px)]',

  none: ''
};

const defaultOpacities: Record<TextureType, number> = {
  dots: 1,
  grid: 1,
  noise: 1,
  crosshatch: 1,
  diagonal: 1,

  scatteredDots: 1,
  halftone: 1,
  triangular: 1,
  chevron: 1,
  paperGrain: 1,
  horizontalLines: 1,
  verticalLines: 1,
  none: 0
};

export function TextureOverlay({ texture, opacity, className, ...props }: TextureOverlayProps) {
  if (texture === 'none') return null;

  const finalOpacity = opacity ?? defaultOpacities[texture];
  const pattern = texturePatterns[texture];

  return (
    <div
      {...props}
      className={cn('pointer-events-none absolute inset-0 -z-1', pattern, className)}
      style={
        {
          opacity: finalOpacity,
          // primary as main color, zinc-500 as fallback
          '--texture-color': 'var(--color-secondary, var(--color-neutral-500))',
          ...props.style
        } as React.CSSProperties
      }
    />
  );
}
