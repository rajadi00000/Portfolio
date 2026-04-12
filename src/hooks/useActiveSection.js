import { useState, useEffect, useCallback } from 'react';

/**
 * useActiveSection
 *
 * Tracks which section is currently visible in the viewport using
 * IntersectionObserver. Returns the `id` of the section that is
 * most prominently in view, enabling navbar active-link highlighting.
 *
 * @param {string[]} sectionIds - Array of element `id` values to observe
 * @param {Object}   [options]
 * @param {number}   [options.threshold=0.25] - Visibility ratio to trigger
 * @returns {string} - The id of the currently active section
 *
 * @example
 * const activeSection = useActiveSection(['about', 'skills', 'experience']);
 */
const useActiveSection = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState('');

  const handleIntersect = useCallback(
    (entries) => {
      // Find entries that are intersecting and pick the most visible one
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length === 0) return;

      // Sort by intersection ratio to pick the most prominent section
      const [mostVisible] = visible.sort(
        (a, b) => b.intersectionRatio - a.intersectionRatio
      );
      setActiveSection(mostVisible.target.id);
    },
    []
  );

  useEffect(() => {
    const threshold = options.threshold ?? 0.25;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin: '-72px 0px -40% 0px', // account for navbar height
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, handleIntersect, options.threshold]);

  return activeSection;
};

export default useActiveSection;
