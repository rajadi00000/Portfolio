import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/common/Section';
import Tag from '@/components/common/Tag';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

const ALL_LABEL = 'All';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard
 *
 * Displays a single project with a category badge, title, description,
 * key highlights, and technology tags.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article className="project-card" aria-label={project.title}>
    <span className="project-card__category-badge">{project.category}</span>

    <h3 className="project-card__title">{project.title}</h3>

    <p className="project-card__description">{project.description}</p>

    <ul className="project-card__highlights" aria-label="Key highlights">
      {project.highlights.map((point, i) => (
        <li key={i} className="project-card__highlight">
          {point}
        </li>
      ))}
    </ul>

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
 * Filterable grid of projects. Category filter buttons animate to their
 * active state, and cards smoothly enter/exit on filter change via
 * Framer Motion's `AnimatePresence`.
 */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_LABEL);
  const { ref, isInView, variants } = useScrollAnimation({ stagger: 0.06 });

  // Derive unique category labels — keeps insertion order
  const categories = useMemo<string[]>(
    () => [ALL_LABEL, ...new Set(projects.map((p) => p.category))],
    []
  );

  // Memoised filtered list — recomputes only when activeFilter changes
  const filtered = useMemo<Project[]>(
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
      subtitle="A selection of products and features built across mobile, web, and AI."
    >
      {/* Filter buttons */}
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
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

      {/* Project grid */}
      <motion.div className="projects__grid" layout role="list" aria-label="Project list">
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
