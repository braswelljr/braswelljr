'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { usePostStatsQuery, useRecordPostStatMutation } from '@/api';
import { PostReactions } from './post-reactions';

/** Fired after this tab changes a like, since `storage` only reaches other tabs. */
const LIKE_EVENT = 'post-like-change';

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(LIKE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(LIKE_EVENT, onChange);
  };
}

/**
 * Views and likes for a post, wired to the store.
 *
 * A like is remembered in this browser, and a view is counted once per tab
 * session, so a reload does not inflate either. Both are honest-visitor
 * measures: there are no accounts here to tie them to. When the store is not
 * configured the query fails and this renders nothing.
 */
export function PostStats({ slug, className }: { slug: string; className?: string }) {
  const likeKey = `liked:${slug}`;
  const { data: stats } = usePostStatsQuery(slug);
  const { mutate, isPending } = useRecordPostStatMutation(slug);

  const liked = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(likeKey) === '1',
    () => false
  );

  const available = Boolean(stats);

  useEffect(() => {
    if (!available) return;
    const viewKey = `viewed:${slug}`;
    if (sessionStorage.getItem(viewKey)) return;

    sessionStorage.setItem(viewKey, '1');
    mutate('view');
  }, [available, slug, mutate]);

  if (!stats) return null;

  const toggleLike = () => {
    if (liked) localStorage.removeItem(likeKey);
    else localStorage.setItem(likeKey, '1');
    window.dispatchEvent(new Event(LIKE_EVENT));

    mutate(liked ? 'unlike' : 'like');
  };

  return (
    <PostReactions
      views={stats.views}
      likes={stats.likes}
      liked={liked}
      pending={isPending}
      onToggleLike={toggleLike}
      className={className}
    />
  );
}
