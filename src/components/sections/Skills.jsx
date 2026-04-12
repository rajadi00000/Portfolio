import { motion } from 'framer-motion';
import Section from '@/components/common/Section';
import Tag from '@/components/common/Tag';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { skills } from '@/data/portfolio';

/**
 * SkillCategoryCard
 *
 * Renders a single skill category with a coloured dot, category name,
 * and a wrapped list of Tag components.
 *
 * @param {Object} props
 * @param {Object} props.category - Skill category object from portfolio data
 * @param {Object} props.variants - Framer Motion variants for entry animation
 */
const SkillCategoryCard = ({ category, variants }) => (
  <motion.div className="skills__category-card" variants={variants.item}>
    <div className="skills__category-header">
      <span
        className={`skills__category-dot skills__category-dot--${category.color}`}
        aria-hidden="true"
      />
      <h3 className="skills__category-name">{category.category}</h3>
    </div>
    <ul className="skills__tag-list" role="list" aria-label={`${category.category} skills`}>
      {category.items.map((skill) => (
        <li key={skill}>
          <Tag label={skill} variant={category.color} />
        </li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Skills
 *
 * Displays all skill categories in a responsive auto-fill grid.
 * Each card animates into view using a staggered scroll effect.
 */
const Skills = () => {
  const { ref, isInView, variants } = useScrollAnimation({ stagger: 0.08, delay: 0.1 });

  return (
    <Section
      id="skills"
      label="Capabilities"
      title="Skills & Technologies"
      subtitle="A categorized overview of the technologies, tools, and practices I work with daily."
    >
      <motion.div
        ref={ref}
        className="skills__grid"
        variants={variants.container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="list"
        aria-label="Skill categories"
      >
        {skills.map((category) => (
          <SkillCategoryCard
            key={category.category}
            category={category}
            variants={variants}
          />
        ))}
      </motion.div>
    </Section>
  );
};

export default Skills;
