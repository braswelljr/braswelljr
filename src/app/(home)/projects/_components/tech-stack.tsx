'use client';

import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FaAws, FaSlack } from 'react-icons/fa';
import { HiOutlineCode, HiOutlineSparkles, HiOutlineTranslate } from 'react-icons/hi';
import {
  SiC,
  SiCmake,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiLaravel,
  SiMdx,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostcss,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiRuby,
  SiSass,
  SiSentry,
  SiSqlite,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs
} from 'react-icons/si';
import { cn } from 'lib/utils';
import { useLanguagesQuery, type GithubLanguage } from '@/api';
import { cardVariants, containerVariants, safeVariants } from '@/components/shared/motion';
import { Skeleton } from '@/components/ui/skeleton';
import { skills } from '@/config/data';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** How many languages to show. The tail is a long list of one-file languages
 *  that say nothing about how the time was spent. */
const TOP_LANGUAGES = 10;

/**
 * Logos for the languages GitHub reports, keyed by its own names.
 *
 * Not exhaustive on purpose: anything unmapped falls back to a generic glyph
 * rather than being hidden, so the list stays honest about what is there.
 */
const LANGUAGE_ICONS: Record<string, Icon> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Go: SiGo,
  PHP: SiPhp,
  MDX: SiMdx,
  CSS: SiCss,
  Vue: SiVuedotjs,
  HTML: SiHtml5,
  Dart: SiDart,
  'C++': SiCplusplus,
  C: SiC,
  CMake: SiCmake,
  Shell: SiGnubash,
  Java: SiOpenjdk,
  Blade: SiLaravel,
  Dockerfile: SiDocker,
  Swift: SiSwift,
  Ruby: SiRuby,
  Kotlin: SiKotlin
};

/**
 * Logos for the résumé's skill list.
 *
 * Keyed on the plain name, so an entry that carries detail in brackets
 * ("React (Next.js, Remix, Gatsby)") resolves on "React". Several tools have no
 * mark of their own (Zustand, Jotai, Riverpod, REST, gRPC), so anything
 * unmapped falls back to its group's glyph rather than being left bare.
 */
const SKILL_ICONS: Record<string, Icon> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Go: SiGo,
  Dart: SiDart,
  PHP: SiPhp,
  React: SiReact,
  'React Native': SiReact,
  Vue: SiVuedotjs,
  Flutter: SiFlutter,
  'Node.js': SiNodedotjs,
  TailwindCSS: SiTailwindcss,
  SASS: SiSass,
  PostCSS: SiPostcss,
  Motion: SiFramer,
  GSAP: SiGreensock,
  Redux: SiRedux,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  GraphQL: SiGraphql,
  Slack: FaSlack,
  Jira: SiJira,
  Docker: SiDocker,
  AWS: FaAws,
  GCP: SiGooglecloud,
  'GitHub Actions': SiGithubactions,
  Grafana: SiGrafana,
  Sentry: SiSentry
};

/** What an unmapped skill borrows, so the fallback still says something. */
const GROUP_ICONS: Record<string, Icon> = {
  'Styling & Animation': HiOutlineSparkles,
  'State Management': HiOutlineSparkles,
  'Spoken Languages': HiOutlineTranslate
};

function skillIcon(name: string, group: string): Icon {
  const base = name.split('(')[0].trim();
  return SKILL_ICONS[base] ?? GROUP_ICONS[group] ?? HiOutlineCode;
}

type Tool = {
  name: string;
  Icon: Icon;
  /** The official brand colour. */
  light: string;
  /** Its counterpart for a dark surface, where several brands go invisible
   *  (Next.js is black) or the light-mode choice loses contrast. */
  dark: string;
};

/**
 * Frameworks, runtimes and services.
 *
 * These cannot come from the languages endpoint, because GitHub counts bytes of
 * source, so it has no idea a TypeScript repo is a Next.js app. Brand colours
 * are third-party constants rather than theme tokens, so they live here once
 * instead of as hex literals scattered through JSX.
 */
const TOOLS: Tool[] = [
  { name: 'React', Icon: SiReact, light: '#087EA4', dark: '#61DAFB' },
  { name: 'React Native', Icon: SiReact, light: '#087EA4', dark: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, light: '#000000', dark: '#FFFFFF' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, light: '#06A5C2', dark: '#38BDF8' },
  { name: 'Flutter', Icon: SiFlutter, light: '#0468A0', dark: '#47C5FB' },
  { name: 'Node.js', Icon: SiNodedotjs, light: '#4B8B3B', dark: '#7DC46A' },
  { name: 'Go', Icon: SiGo, light: '#0089A6', dark: '#00ADD8' },
  { name: 'PHP', Icon: SiPhp, light: '#5B60A0', dark: '#9AA0DC' },
  { name: 'GraphQL', Icon: SiGraphql, light: '#E10098', dark: '#FF5CC8' },
  { name: 'PostgreSQL', Icon: SiPostgresql, light: '#3B5FBF', dark: '#7C9BF0' },
  { name: 'MongoDB', Icon: SiMongodb, light: '#3B8B3B', dark: '#5FCF6A' },
  { name: 'Supabase', Icon: SiSupabase, light: '#1F9A67', dark: '#3FCF8E' },
  { name: 'Firebase', Icon: SiFirebase, light: '#C97A00', dark: '#FFCA28' }
];

/**
 * What the work is built with: the tools chosen by hand, and the languages
 * actually written, counted from every public non-fork repository.
 *
 * This replaced nine hand-written gradients inside one sentence, several of
 * which had drifted onto the same blue. Golang, PostgreSQL and GraphQL were
 * indistinguishable, and none of them carried an icon. Reading the languages
 * off GitHub also means the list cannot quietly go out of date.
 */
export function TechStack({ className }: { className?: string }) {
  const isReduced = useReducedMotion();
  const { data: languages = [], isPending } = useLanguagesQuery();

  return (
    <div className={cn('space-y-8', className)}>
      <section
        className="space-y-4"
        aria-labelledby="tech-stack-tools"
      >
        <SectionLabel id="tech-stack-tools">I prefer to work with</SectionLabel>

        <ChipList isReduced={isReduced}>
          {TOOLS.map(({ name, Icon, light, dark }) => (
            <Chip
              key={name}
              name={name}
              Icon={Icon}
              light={light}
              dark={dark}
            />
          ))}
        </ChipList>
      </section>

      <section
        className="space-y-4"
        aria-labelledby="tech-stack-skills"
      >
        <SectionLabel id="tech-stack-skills">
          Technical skills{' '}
          <span className="text-neutral-400 normal-case dark:text-neutral-500">
            as they read on the résumé
          </span>
        </SectionLabel>

        <motion.dl
          className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
          variants={safeVariants(containerVariants, isReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
        >
          {skills.map(({ group, items }) => (
            <motion.div
              key={group}
              variants={safeVariants(cardVariants, isReduced)}
              className="space-y-2"
            >
              <dt className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                {group}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((item) => {
                    const Icon = skillIcon(item, group);

                    return (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                      >
                        {/* Neutral, unlike the branded row above: colour there
                            marks the tools actually reached for, and repeating
                            it here would flatten that distinction. */}
                        <Icon
                          aria-hidden
                          className="size-3.5 shrink-0 text-neutral-500 dark:text-neutral-400"
                        />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      <section
        className="space-y-4"
        aria-labelledby="tech-stack-languages"
      >
        <SectionLabel id="tech-stack-languages">
          Most written{' '}
          <span className="text-neutral-400 normal-case dark:text-neutral-500">
            across every public repository
          </span>
        </SectionLabel>

        {isPending ? (
          <LanguageSkeleton />
        ) : languages.length < 1 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Language usage could not be loaded.
          </p>
        ) : (
          <ChipList isReduced={isReduced}>
            {languages.slice(0, TOP_LANGUAGES).map((language) => (
              <LanguageChip
                key={language.name}
                language={language}
              />
            ))}
          </ChipList>
        )}
      </section>
    </div>
  );
}

function SectionLabel({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-sm font-semibold tracking-tight text-neutral-500 uppercase dark:text-neutral-400"
    >
      {children}
    </h2>
  );
}

function ChipList({
  children,
  isReduced
}: {
  children: React.ReactNode;
  isReduced: boolean | null;
}) {
  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      variants={safeVariants(containerVariants, isReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-60px' }}
    >
      {children}
    </motion.ul>
  );
}

/** Shared chip shell. The brand colour arrives as a custom property because the
 *  Tailwind compiler scans source text and cannot generate a class from a value
 *  that lives in an array or comes back from GitHub. */
function Chip({
  name,
  Icon,
  light,
  dark,
  meta
}: {
  name: string;
  Icon: Icon;
  light: string;
  dark: string;
  meta?: string;
}) {
  return (
    <motion.li
      variants={cardVariants}
      style={{ '--brand': light, '--brand-dark': dark } as CSSProperties}
      className="inline-flex items-center gap-2 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-1.5 transition-colors duration-200 ease-out dark:border-neutral-800 dark:bg-neutral-900 hocus:border-(--brand)/40 hocus:bg-(--brand)/5 dark:hocus:border-(--brand-dark)/40 dark:hocus:bg-(--brand-dark)/10"
    >
      <Icon
        aria-hidden
        className="size-4 shrink-0 text-(--brand) dark:text-(--brand-dark)"
      />
      <span className="text-xs font-semibold tracking-tight text-neutral-700 uppercase dark:text-neutral-300">
        {name}
      </span>
      {meta && (
        <span className="text-xs font-medium text-neutral-400 tabular-nums dark:text-neutral-500">
          {meta}
        </span>
      )}
    </motion.li>
  );
}

/** A language chip, coloured by GitHub's own value for that language and
 *  labelled with its share of everything written. */
function LanguageChip({ language }: { language: GithubLanguage }) {
  const colour = language.color ?? 'var(--color-primary)';
  const percent = language.share * 100;

  return (
    <Chip
      name={language.name}
      Icon={LANGUAGE_ICONS[language.name] ?? HiOutlineCode}
      light={colour}
      dark={colour}
      meta={`${percent < 1 ? '<1' : Math.round(percent)}%`}
    />
  );
}

function LanguageSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading language usage"
      className="space-y-3"
    >
      <div className="flex flex-wrap gap-2">
        {/* Uneven widths, because a row of identical bars does not read as a
            row of chips waiting to arrive. */}
        {[7, 6.5, 4.5, 5.5, 6, 5, 7.5, 4].map((w, i) => (
          <Skeleton
            key={i}
            style={{ width: `${w}rem` } as CSSProperties}
            className="h-[2.125rem] rounded-sm"
          />
        ))}
      </div>
      <p
        aria-hidden
        className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        Reading languages from GitHub &hellip;
      </p>
    </div>
  );
}
