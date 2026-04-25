import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Accomplishments from '@/components/sections/Accomplishments';
import Education from '@/components/sections/Education';

const TECH = [
  'Swift', 'UIKit', 'SwiftUI', 'React', 'TypeScript', 'CSS3', 'SCSS',
  'iOS Development', 'AI / LLMs', 'Docker', 'Figma', 'Git', 'REST APIs', 'Xcode',
  'Generative AI', 'Multi-Agent Systems', 'ReactJS', 'Node.js', 'BLE Integration',
];

/**
 * App — Root component.
 *
 * Composes the full portfolio page in narrative order:
 * Navbar → Hero → TechMarquee → About → Skills → Experience → Projects → Accomplishments → Education → Footer
 */
const App: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  /** Track mouse position as CSS custom properties for the cursor spotlight */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /** Show scroll-to-top button after scrolling 500px */
  useEffect(() => {
    const check = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Duplicate for seamless marquee loop
  const marqueeItems = [...TECH, ...TECH];

  return (
    <>
      {/* Pointer-tracking spotlight glow */}
      <div className="cursor-spotlight" aria-hidden="true" />
      {/* Subtle noise / grain texture */}
      <div className="noise-overlay" aria-hidden="true" />
      {/* Ambient aurora beams — fixed, decorative, behind all content */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora__beam aurora__beam--1" />
        <div className="aurora__beam aurora__beam--2" />
        <div className="aurora__beam aurora__beam--3" />
      </div>

      <Navbar />

      <main id="main-content">
        <Hero />

        {/* ── Scrolling tech stack marquee ── */}
        <div className="marquee-section" aria-hidden="true">
          <div className="marquee__track">
            {marqueeItems.map((item, i) => (
              <span key={i} className="marquee__item">
                <span className="marquee__sep" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <About />
        <Skills />
        <Experience />
        <Projects />
        <Accomplishments />
        <Education />
      </main>

      <Footer />

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
