import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { personal } from '@/data/portfolio';

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

// ─── Terminal code card content ───────────────────────────────────────────────

/**
 * TerminalCard
 *
 * Decorative code-editor-style card shown on the right side of the Hero.
 * Uses semantic <code> and <span> elements with CSS classes for syntax
 * highlighting — no external library required.
 */
const TerminalCard = () => (
  <div className="terminal-card" role="img" aria-label="Code snippet about the developer">
    {/* macOS-style window chrome */}
    <div className="terminal-card__topbar">
      <span className="terminal-card__dot terminal-card__dot--red"   aria-hidden="true" />
      <span className="terminal-card__dot terminal-card__dot--yellow" aria-hidden="true" />
      <span className="terminal-card__dot terminal-card__dot--green"  aria-hidden="true" />
      <span className="terminal-card__filename">developer.js</span>
    </div>

    {/* Pseudo-highlighted code body */}
    <div className="terminal-card__body">
      <code>
        <span className="code-line">
          <span className="code-keyword">const</span>{' '}
          <span className="code-var">developer</span>{' '}
          <span className="code-bracket">= {'{'}</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">name</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-string">"{personal.name}"</span>
          <span className="code-bracket">,</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">role</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-string">"{personal.title}"</span>
          <span className="code-bracket">,</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">focus</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-bracket">['</span>
          <span className="code-string">"iOS"</span>
          <span className="code-bracket">, </span>
          <span className="code-string">"Web"</span>
          <span className="code-bracket">, </span>
          <span className="code-string">"AI"</span>
          <span className="code-bracket">],</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">company</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-string">"Adidas"</span>
          <span className="code-bracket">,</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">experience</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-string">"3+ years"</span>
          <span className="code-bracket">,</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">awards</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-bracket">['</span>
          <span className="code-string">"Q-Superstar"</span>
          <span className="code-bracket">],</span>
        </span>

        <span className="code-line">
          {'  '}<span className="code-key">passion</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-string">"Build things that matter"</span>
          <span className="code-bracket">,</span>
        </span>

        <span className="code-line">
          <span className="code-bracket">{'}'}</span>
          <span className="code-bracket">;</span>
        </span>

        {/* Simulated cursor */}
        <span className="code-line">
          <span className="code-cursor" aria-hidden="true" />
        </span>
      </code>
    </div>
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

/**
 * Hero
 *
 * Full-viewport landing section with:
 * - Staggered text animation (eyebrow → name → title → summary → actions)
 * - Social icon links
 * - Animated terminal code card decoration
 * - Scroll-down indicator
 */
const Hero = () => {
  const handleContactClick = (e) => {
    e.preventDefault();
    const section = document.getElementById('about');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    const section = document.getElementById('projects');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="container hero__container">
        <div className="hero__inner">
          {/* ── Left: Text content ── */}
          <motion.div
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability eyebrow */}
            <motion.div className="hero__eyebrow" variants={itemVariants}>
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1 className="hero__name" variants={itemVariants}>
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.p className="hero__title" variants={itemVariants}>
              {personal.title}
            </motion.p>

            {/* Tagline / summary */}
            <motion.p className="hero__summary" variants={itemVariants}>
              {personal.summary}
            </motion.p>

            {/* Location */}
            <motion.span className="hero__location" variants={itemVariants}>
              <FiMapPin aria-hidden="true" />
              {personal.location}
            </motion.span>

            {/* CTA buttons */}
            <motion.div className="hero__actions" variants={itemVariants}>
              <button className="btn btn--primary" onClick={handleProjectsClick}>
                View My Work
                <FiArrowRight aria-hidden="true" />
              </button>
              <a
                href={`mailto:${personal.email}`}
                className="btn btn--outline"
              >
                <FiMail aria-hidden="true" />
                Get in Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.nav
              className="hero__socials"
              variants={itemVariants}
              aria-label="Social profiles"
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="hero__social-link"
                aria-label="Email"
              >
                <FiMail />
              </a>
            </motion.nav>
          </motion.div>

          {/* ── Right: Visual decoration ── */}
          <motion.div
            className="hero__visual"
            variants={visualVariants}
            initial="hidden"
            animate="visible"
          >
            <TerminalCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-arrow" />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default Hero;
