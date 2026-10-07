import { cn } from 'lib/utils';

/**
 * Spotify's own player for one track.
 *
 * It plays a preview for a visitor who is not signed in to Spotify and the full
 * song for one who is. The Web API no longer hands out preview clips, so this
 * embed is the only way to let someone hear a track without leaving the page.
 */
export function SpotifyEmbed({
  trackId,
  name,
  className,
  ...props
}: Omit<React.ComponentProps<'iframe'>, 'src' | 'title'> & { trackId: string; name: string }) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      title={`Spotify player for ${name}`}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className={cn('h-20 w-full rounded-xl', className)}
      {...props}
    />
  );
}
