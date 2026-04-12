import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * useScrollAnimation
 *
 * Returns a `ref` to attach to a container element and a set of Framer Motion
 * `variants` for staggered child animations that trigger once the container
 * enters the viewport.
 *
 * @param {Object} options
 * @param {string}  [options.margin='-60px']   - rootMargin for IntersectionObserver
 * @param {number}  [options.stagger=0.12]     - Delay between each child animation
 * @param {number}  [options.delay=0]          - Initial delay before first child
 * @param {number}  [options.yOffset=28]       - Vertical distance (px) for slide-up
 * @param {number}  [options.duration=0.55]    - Animation duration per child (s)
 *
 * @returns {{ ref, isInView, variants }}
 *
 * @example
 * const { ref, isInView, variants } = useScrollAnimation();
 * <motion.ul ref={ref} variants={variants.container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
 *   {items.map(item => <motion.li key={item.id} variants={variants.item}>{item.name}</motion.li>)}
 * </motion.ul>
 */
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: options.margin ?? '-60px',
  });

  const variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: options.stagger ?? 0.12,
          delayChildren: options.delay ?? 0,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: options.yOffset ?? 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: options.duration ?? 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  };

  return { ref, isInView, variants };
};

export default useScrollAnimation;
