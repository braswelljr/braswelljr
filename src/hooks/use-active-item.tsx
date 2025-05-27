'use client';

import { useEffect, useState } from 'react';

export function useActiveItem(itemIds: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id || '');
        });
      },
      { rootMargin: `0% 0% -80% 0%`, ...options }
    );

    itemIds?.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      itemIds?.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [itemIds, options]);

  return activeId;
}
