import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/common/Section';
import Tag from '@/components/common/Tag';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { projects } from '@/data/portfolio';

// ─── Derive categories from data ─────────────────────────────────────────────

const ALL_LABEL = 'All';

/**
 * ProjectCard
 *
 * Displays a single project with category badge, title, description,
 * key highlights, and technology tags.
 *
 * @param {Object} props
 * @param {Object} props.project - Project object from portfolio data
 */
const ProjectCard = ({ project }) => (
  <article className="project-card" aria-label={project.title}>
    {/* Category badge */}
    <span className="project-card__category-badge">{project.category}</span>

    {/* Title */}
    <h3 className="project-card__title">{project.title}</h3>

    {/* Description */}
    <p className="project-card__description">{project.description}</p>

    {/* Key highlights */}
    <ul className="project-card__highlights" aria-label="Key highlights">
      {project.highlights.map((point, i) => (
        <li key={i} className="project-card__highlight">
          {point}
        </li>
      ))}
    </ul>

    {/* Tech tags */}
    <div className="project-card__tags" role="list" aria-label="Technologies used">
      {project.tags.map((tag) => (
        <Tag key={tag} label={tag} variant="default" />
      ))}
    </div>
  </article>
);

/**
 * Projects
 *
 * Filterable project grid. The category filter buttons animate to
 * their active state, and the grid uses AnimatePresence so cards
 * smoothly exit/enter on filter change.
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState(ALL_LABEL);
  const { ref, isInView, variants } = useScrollAnimation({ stagger: 0.06 });

  // Derive unique categories from data — keep order stable
  const categories = useMemo(
    () => [ALL_LABEL, ...new Set(projects.map((p) => p.category))],
    []
  );

  // Memoize filtered list — recomputes only when activeFilter changes
  const filtered = useMemo(
    () =>
      activeFilter === ALL_LABEL
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <Section
      id="projects"
      label="Portfolio"
      title="Projects"
      subtitle="A selection of products and features I've built across mobile, web, and AI."
    >
      {/* Category filter buttons */}
      <motion.div
        ref={ref}
        className="projects__filters"
        variants={variants.container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`projects__filter-btn${activeFilter === cat ? ' projects__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
            variants={variants.item}
            aria-pressed={activeFilter === cat}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Project grid with animated filter transitions */}
      <motion.div
        className="projects__grid"
        layout
        role="list"
        aria-label="Project list"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};

export default Projects;
