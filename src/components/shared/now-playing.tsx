import { cn } from 'lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type NowPlayingTrack = {
  name: string;
  href: string;
  image?: string;
  artists: Array<{ id: string; name: string }>;
};

/** Each bar starts partway through the shared loop, so they never move as one. */
const EQUALIZER_BARS = [
  { id: 'low', className: '[animation-delay:-0.2s]' },
  { id: 'mid', className: '[animation-delay:-0.7s]' },
  { id: 'high', className: '[animation-delay:-0.45s]' }
];

/** Three bars that bounce while a song is on. Decoration, so it is hidden from
 *  assistive technology and stops with the rest of `data-ember` motion. */
export function Equalizer({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-ember
      className={cn('inline-flex h-3 items-end gap-0.5', className)}
      {...props}
    >
      {EQUALIZER_BARS.map((bar) => (
        <span
          key={bar.id}
          className={cn(
            'h-full w-0.5 origin-bottom animate-ember-bar rounded-full bg-current',
            bar.className
          )}
        />
      ))}
    </span>
  );
}

/**
 * Cover art cut into a record that turns while `spinning`.
 *
 * Pausing holds the angle instead of resetting it, so a paused song looks like
 * a stopped record and not a new one. Decoration: name the song next to it.
 */
export function SpinningRecord({
  image,
  spinning = true,
  className,
  ...props
}: React.ComponentProps<'span'> & { image?: string; spinning?: boolean }) {
  return (
    <span
      data-ember
      className={cn('relative block shrink-0', className)}
      {...props}
    >
      <Avatar
        className={cn(
          'size-full animate-ember-drift rounded-full',
          !spinning && '[animation-play-state:paused]'
        )}
      >
        <AvatarImage
          src={image}
          alt=""
        />
        <AvatarFallback className="bg-linear-to-l from-secondary to-primary dark:to-primary" />
      </Avatar>
      {/* The spindle hole that makes a square cover read as a record. */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 size-1/5 -translate-1/2 rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
      />
    </span>
  );
}

/**
 * A small record that spins while something is playing, with the track beside
 * it. The whole pill is one button: press it to listen along.
 */
export function NowPlaying({
  track,
  className,
  ...props
}: React.ComponentProps<'button'> & { track: NowPlayingTrack }) {
  return (
    <button
      type="button"
      data-ember
      className={cn(
        'group flex max-w-64 items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50/90 p-1.5 text-left shadow-lg backdrop-blur transition-transform duration-200 ease-out active:scale-[0.97] sm:pr-4 dark:border-neutral-800 dark:bg-neutral-950/90',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className
      )}
      {...props}
    >
      <SpinningRecord
        image={track.image}
        className="size-10"
      />

      {/* On a phone the record alone marks the corner. The words stay for a
          screen reader, since they are the button's name. */}
      <span className="min-w-0 max-sm:sr-only">
        <span className="flex items-center gap-1.5 text-xsm font-semibold tracking-wide text-primary uppercase">
          <Equalizer />
          Now playing
          <span className="sr-only">. Listen along:</span>
        </span>
        <span className="block truncate text-sm font-semibold text-neutral-900 group-hover:underline dark:text-neutral-100">
          {track.name}
        </span>
        <span className="block truncate text-xs text-neutral-600 dark:text-neutral-400">
          {track.artists.map((artist) => artist.name).join(', ')}
        </span>
      </span>
    </button>
  );
}
