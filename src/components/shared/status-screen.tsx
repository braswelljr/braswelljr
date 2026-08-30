'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from 'lib/utils';
import { EmberField } from '@/components/shared/ember';
import { EASE_OUT, MotionLink } from '@/components/shared/motion';

export type StatusAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type StatusScreenProps = {
  /** The oversized numerals or word carrying the gradient: "404", "500". */
  code: string;
  /** Small uppercase kicker above the code. */
  kicker: string;
  title: string;
  description: string;
  actions: StatusAction[];
  /**
   * Next's error digest. Worth surfacing rather than hiding: in production the
   * message is deliberately generic, and this hash is the only handle that
   * matches the entry in the server logs.
   */
  digest?: string;
  className?: string;
};

/**
 * The shared shell behind 404 and the error boundaries.
 *
 * One composition for both so a broken route and a missing route read as the
 * same product rather than two different apps: ember field, gradient code, and
 * a staggered reveal that lands the actions last.
 */
export function StatusScreen({
  code,
  kicker,
  title,
  description,
  actions,
  digest,
  className
}: StatusScreenProps) {
  const isReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: isReduced ? 0 : 0.08, delayChildren: 0.05 } }
  };
  const item: Variants = isReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.01 } } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } }
      };

  return (
    <section
      className={cn(
        'relative grid h-full min-h-[85dvh] w-full place-items-center overflow-hidden px-6 py-24',
        className
      )}
    >
      <EmberField />

      <motion.div
        className="relative flex max-w-xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-[0.7rem] font-semibold tracking-[0.4em] text-ember-coral uppercase dark:text-ember-amber"
        >
          {kicker}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 ember-text text-[clamp(5rem,22vw,11rem)] leading-[0.82] font-black tracking-tighter tabular-nums drop-shadow-[0_8px_40px_color-mix(in_oklab,var(--color-ember-coral)_35%,transparent)]"
        >
          {code}
        </motion.h1>

        {/* Hairline that picks the gradient back up, tying the code to the copy. */}
        <motion.span
          variants={item}
          aria-hidden
          className="mt-8 h-px w-32 ember-rule"
        />

        <motion.h2
          variants={item}
          className="mt-8 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-100"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-3 text-sm text-neutral-600 dark:text-neutral-400"
        >
          {description}
        </motion.p>

        {digest && (
          <motion.p
            variants={item}
            className="mt-5 rounded-sm border border-neutral-300/70 bg-white/60 px-3 py-1.5 font-mono text-[0.7rem] text-neutral-600 backdrop-blur-sm dark:border-neutral-700/70 dark:bg-neutral-900/60 dark:text-neutral-400"
          >
            <span className="text-neutral-400 dark:text-neutral-500">digest </span>
            {digest}
          </motion.p>
        )}

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {actions.map((action, i) =>
            action.href ? (
              <ActionLink
                key={action.label}
                action={action}
                primary={i === 0}
                isReduced={isReduced}
              />
            ) : (
              <ActionButton
                key={action.label}
                action={action}
                primary={i === 0}
                isReduced={isReduced}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

/** The lead action carries the brand gradient; the rest stay quiet outlines. */
function styles(primary: boolean) {
  return cn(
    'inline-flex cursor-pointer items-center justify-center rounded-sm px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900',
    primary
      ? 'ember-action text-white shadow-lg shadow-ember-coral/35'
      : 'border border-neutral-300 text-neutral-800 hover:border-ember-coral hover:text-ember-coral dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-ember-amber dark:hover:text-ember-amber'
  );
}

const hover = { scale: 1.04 };
const tap = { scale: 0.96 };

function ActionLink({
  action,
  primary,
  isReduced
}: {
  action: StatusAction;
  primary: boolean;
  isReduced: boolean | null;
}) {
  return (
    <MotionLink
      href={action.href ?? '/'}
      className={styles(primary)}
      whileHover={isReduced ? undefined : hover}
      whileTap={isReduced ? undefined : tap}
      transition={{ duration: 0.15 }}
    >
      {action.label}
    </MotionLink>
  );
}

function ActionButton({
  action,
  primary,
  isReduced
}: {
  action: StatusAction;
  primary: boolean;
  isReduced: boolean | null;
}) {
  return (
    <motion.button
      type="button"
      onClick={action.onClick}
      className={styles(primary)}
      whileHover={isReduced ? undefined : hover}
      whileTap={isReduced ? undefined : tap}
      transition={{ duration: 0.15 }}
    >
      {action.label}
    </motion.button>
  );
}
