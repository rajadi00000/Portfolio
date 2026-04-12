import { motion } from 'framer-motion';
import Section from '@/components/common/Section';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { accomplishments } from '@/data/portfolio';
import type { Accomplishment, AnimationVariants } from '@/types';

interface AccomplishmentCardProps {
  item: Accomplishment;
  variants: AnimationVariants;
}

/**
 * AccomplishmentCard
 *
 * Displays a single recognition or achievement with an emoji icon, title,
 * and description. A top-border gradient is revealed on hover via CSS.
 */
const AccomplishmentCard: React.FC<AccomplishmentCardProps> = ({ item, variants }) => (
  <motion.article
    className="accomplishment-card"
    variants={variants.item}
    aria-label={item.title}
  >
    <span className="accomplishment-card__icon" aria-hidden="true" role="img">
      {item.icon}
    </span>
    <h3 className="accomplishment-card__title">{item.title}</h3>
    <p className="accomplishment-card__description">{item.description}</p>
  </motion.article>
);

/**
 * Accomplishments
 *
 * Grid of key achievements, awards, and recognitions.
 * Cards stagger in when the section scrolls into view.
 */
const Accomplishments: React.FC = () => {
  const { ref, isInView, variants } = useScrollAnimation({ stagger: 0.1, delay: 0.05 });

  return (
    <Section
      id="accomplishments"
      label="Recognition"
      title="Key Accomplishments"
      subtitle="Highlights from my time at Adidas India Tech Hub."
      alt
    >
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="accomplishments__grid"
        variants={variants.container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="list"
        aria-label="Accomplishments"
      >
        {accomplishments.map((item) => (
          <AccomplishmentCard key={item.id} item={item} variants={variants} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Accomplishments;
