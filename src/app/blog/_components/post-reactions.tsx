import { HiHeart, HiOutlineEye, HiOutlineHeart } from 'react-icons/hi';
import { cn } from 'lib/utils';

type PostReactionsProps = React.ComponentProps<'aside'> & {
  views: number;
  likes: number;
  /** Whether this reader has liked the post. */
  liked: boolean;
  /** True while a like is on its way to the store. */
  pending?: boolean;
  onToggleLike: () => void;
};

const count = new Intl.NumberFormat('en', { notation: 'compact' });

/** How many people read the post, and a heart to leave behind. */
export function PostReactions({
  views,
  likes,
  liked,
  pending = false,
  onToggleLike,
  className,
  ...props
}: PostReactionsProps) {
  return (
    <aside
      aria-label="Post reactions"
      className={cn('flex items-center gap-3', className)}
      {...props}
    >
      <p className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
        <HiOutlineEye
          aria-hidden
          className="size-4"
        />
        <span>
          {count.format(views)} <span className="sr-only sm:not-sr-only">views</span>
        </span>
      </p>

      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? 'Remove your like' : 'Like this post'}
        disabled={pending}
        onClick={onToggleLike}
        className={cn(
          'group flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600 transition-[color,border-color,scale] duration-150 ease-out active:scale-[0.97] dark:border-neutral-800 dark:text-neutral-400',
          'hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          liked && 'border-primary text-primary dark:border-primary dark:text-primary'
        )}
      >
        {liked ? (
          <HiHeart
            aria-hidden
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out starting:scale-50"
          />
        ) : (
          <HiOutlineHeart
            aria-hidden
            className="size-4"
          />
        )}
        <span>{count.format(likes)}</span>
      </button>
    </aside>
  );
}
