import { motion } from 'framer-motion';
import Section from '@/components/common/Section';
import Tag from '@/components/common/Tag';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { experiences } from '@/data/portfolio';

/**
 * ExperienceItem
 *
 * Renders a single work-experience entry as a timeline card.
 * Includes the timeline dot, company/role header, bullet-point highlights,
 * and a footer row of technology tags.
 *
 * @param {Object} props
 * @param {Object} props.experience - Experience object from portfolio data
 * @param {Object} props.variants   - Framer Motion item variants
 */
const ExperienceItem = ({ experience, variants }) => (
  <motion.div className="experience__item" variants={variants.item}>
    {/* Timeline dot — filled for current role */}
    <span
      className={`experience__dot${experience.current ? ' experience__dot--current' : ''}`}
      aria-hidden="true"
    />

    <div className="experience__card">
      {/* Role info & period */}
      <div className="experience__header">
        <div className="experience__role-info">
          <h3 className="experience__title">{experience.title}</h3>
          <span className="experience__company">{experience.company}</span>
        </div>

        <div className="experience__meta">
          <span className="experience__period">{experience.period}</span>
          {experience.current && (
            <span className="experience__current-badge" aria-label="Current role">
              Current
            </span>
          )}
        </div>
      </div>

      {/* Bullet point highlights */}
      <ul className="experience__highlights" aria-label="Key responsibilities">
        {experience.highlights.map((point, index) => (
          <li key={index} className="experience__highlight">
            <span className="experience__highlight-bullet" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      {/* Technology tags */}
      <div className="experience__tags" role="list" aria-label="Technologies used">
        {experience.tags.map((tag) => (
          <Tag key={tag} label={tag} variant="primary" />
        ))}
      </div>
    </div>
  </motion.div>
);

/**
 * Experience
 *
 * Vertical timeline of work history, newest first.
 * Items animate in with a stagger as the section scrolls into view.
 */
const Experience = () => {
  const { ref, isInView, variants } = useScrollAnimation({ stagger: 0.15, yOffset: 32 });

  return (
    <Section
      id="experience"
      label="Career"
      title="Work Experience"
      subtitle="My professional journey building mobile, web, and AI products."
      alt
    >
      <motion.div
        ref={ref}
        className="experience__timeline"
        variants={variants.container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="list"
        aria-label="Work experience timeline"
      >
        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} variants={variants} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Experience;
