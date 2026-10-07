import { formatDistanceToNow } from 'date-fns';
import { cn } from 'lib/utils';
import { Frame, FramePanel } from '@/components/ui/frame';

export type BuildingNowRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  /** ISO time of the last push. */
  pushedAt: string;
};

type BuildingNowProps = React.ComponentProps<'section'> & {
  /** The repository pushed to most recently, when GitHub has answered. */
  repo?: BuildingNowRepo;
  /** Contributions over the trailing year, when the count is available. */
  contributions?: number;
};

const count = new Intl.NumberFormat('en');

/**
 * What is on the workbench right now, read from GitHub: the repository pushed
 * to most recently, when that push landed, and the year's contribution count.
 */
export function BuildingNow({ repo, contributions, className, ...props }: BuildingNowProps) {
  if (!repo && contributions === undefined) return null;

  return (
    <section
      aria-label="What I am building now"
      className={cn('mx-auto w-full max-w-xl', className)}
      {...props}
    >
      {/* The repository gets the full width and the two figures share the row
          under it. Whichever figure is left on its own, because the other
          has no data, takes that row to itself. */}
      <dl className="grid grid-cols-2 gap-2 text-left">
        {repo && (
          <>
            <Tile
              label="Currently building"
              className="col-span-2"
            >
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate font-cascadia font-bold text-primary underline-offset-4 hover:underline"
              >
                {repo.name}
              </a>
              {repo.description && (
                <span className="block truncate text-xs text-neutral-600 dark:text-neutral-400">
                  {repo.description}
                </span>
              )}
            </Tile>

            <Tile
              label="Last push"
              className={cn(contributions === undefined && 'col-span-2')}
            >
              <time
                dateTime={repo.pushedAt}
                className="block truncate font-semibold"
              >
                {formatDistanceToNow(new Date(repo.pushedAt), { addSuffix: true })}
              </time>
              {repo.language && (
                <span className="block truncate text-xs text-neutral-600 dark:text-neutral-400">
                  in {repo.language}
                </span>
              )}
            </Tile>
          </>
        )}

        {contributions !== undefined && (
          <Tile
            label="Past year"
            className={cn(!repo && 'col-span-2')}
          >
            <span className="block truncate font-semibold">{count.format(contributions)}</span>
            <span className="block truncate text-xs text-neutral-600 dark:text-neutral-400">
              contributions
            </span>
          </Tile>
        )}
      </dl>
    </section>
  );
}

function Tile({
  label,
  className,
  children
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Frame className={cn('bg-white/40 backdrop-blur dark:bg-neutral-900/40', className)}>
      <FramePanel className="min-w-0 space-y-0.5 px-3 py-2">
        <dt className="text-xsm font-semibold tracking-wide text-neutral-600 uppercase dark:text-neutral-400">
          {label}
        </dt>
        <dd className="min-w-0 text-sm">{children}</dd>
      </FramePanel>
    </Frame>
  );
}
