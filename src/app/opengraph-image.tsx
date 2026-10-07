import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { siteConfig } from '@/config/site';

export const alt = 'Braswell Jr';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The card every page shares unless it brings its own, as blog posts do. */
export default function Image() {
  return new ImageResponse(
    <DefaultImage
      title="Braswell Jr"
      description={siteConfig.description}
      site="braswelljr.engineer"
    />,
    size
  );
}
