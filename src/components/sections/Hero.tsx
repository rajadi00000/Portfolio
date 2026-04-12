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

// ─── Terminal code card ───────────────────────────────────────────────────────

/**
 * TerminalCard
 *
 * Decorative code-editor card shown on the right side of the Hero.
 * Syntax highlighting is achieved with CSS classes — no external library.
 */
const TerminalCard: React.FC = () => (
  <div className="terminal-card" role="img" aria-label="Code snippet about the developer">
    {/* macOS window chrome */}
    <div className="terminal-card__topbar">
      <span className="terminal-card__dot terminal-card__dot--red"    aria-hidden="true" />
      <span className="terminal-card__dot terminal-card__dot--yellow" aria-hidden="true" />
      <span className="terminal-card__dot terminal-card__dot--green"  aria-hidden="true" />
      <span className="terminal-card__filename">developer.ts</span>
    </div>

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
          <span className="code-bracket">[</span>
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
          <span className="code-string">"3.5+ years"</span>
          <span className="code-bracket">,</span>
        </span>
        <span className="code-line">
          {'  '}<span className="code-key">awards</span>
          <span className="code-colon">:</span>{' '}
          <span className="code-bracket">[</span>
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
 * Full-viewport landing section with staggered text animations,
 * social icon links, a floating terminal card, and a scroll indicator.
 */
const Hero: React.FC = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
            <motion.div className="hero__eyebrow" variants={itemVariants}>
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Available for opportunities
            </motion.div>

            <motion.h1 className="hero__name" variants={itemVariants}>
              {personal.name}
            </motion.h1>

            <motion.p className="hero__title" variants={itemVariants}>
              {personal.title}
            </motion.p>

            <motion.p className="hero__summary" variants={itemVariants}>
              {personal.summary}
            </motion.p>

            <motion.span className="hero__location" variants={itemVariants}>
              <FiMapPin aria-hidden="true" />
              {personal.location}
            </motion.span>

            <motion.div className="hero__actions" variants={itemVariants}>
              <button className="btn btn--primary" onClick={scrollTo('projects')}>
                View My Work
                <FiArrowRight aria-hidden="true" />
              </button>
              <a href={`mailto:${personal.email}`} className="btn btn--outline">
                <FiMail aria-hidden="true" />
                Get in Touch
              </a>
            </motion.div>

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

      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-arrow" />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default Hero;
