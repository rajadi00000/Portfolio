import { motion } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/**
 * Section
 *
 * Reusable section wrapper that provides:
 * - Consistent vertical padding and layout
 * - Optional alternate background stripe
 * - Animated section header (label → title → subtitle)
 * - Scroll-triggered fade-up reveal for the header
 *
 * @param {Object}  props
 * @param {string}  props.id          - HTML id for anchor navigation
 * @param {string}  [props.label]     - Small mono uppercase label above title
 * @param {string}  [props.title]     - Main section heading
 * @param {string}  [props.subtitle]  - Optional subtitle paragraph
 * @param {boolean} [props.alt=false] - Use alternate background colour
 * @param {string}  [props.className] - Extra className for the section element
 * @param {React.ReactNode} props.children - Section body content
 */
const Section = ({ id, label, title, subtitle, alt = false, className = '', children }) => {
  const { ref, isInView, variants } = useScrollAnimation({ delay: 0, stagger: 0.1 });

  const sectionClass = ['section', alt ? 'section--alt' : '', className]
    .filter(Boolean)
    .join(' ');

  const hasHeader = label || title || subtitle;

  return (
    <section id={id} className={sectionClass}>
      <div className="container">
        {hasHeader && (
          <motion.div
            ref={ref}
            className="section__header"
            variants={variants.container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {label && (
              <motion.span className="section__label" variants={variants.item}>
                {label}
              </motion.span>
            )}
            {title && (
              <motion.h2 className="section__title" variants={variants.item}>
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p className="section__subtitle" variants={variants.item}>
                {subtitle}
              </motion.p>
            )}
            {title && <motion.div className="section__divider" variants={variants.item} />}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
};

export default Section;
