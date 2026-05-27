import { useEffect, RefObject } from 'react';
import analytics from '../utils/analytics';

export function useSectionView(ref: RefObject<HTMLElement | null>, sectionId: string, options?: { threshold?: number }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!fired && entry.isIntersecting && entry.intersectionRatio >= (options?.threshold ?? 0.25)) {
            analytics.trackEvent('section_view', { section_id: sectionId });
            fired = true;
          }
        });
      },
      { threshold: options?.threshold ?? 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, sectionId, options?.threshold]);
}
