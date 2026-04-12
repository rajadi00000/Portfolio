import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal, navLinks } from '@/data/portfolio';
import useActiveSection from '@/hooks/useActiveSection';

// Derive section ids from nav links (strip leading '#')
const sectionIds = navLinks.map((l) => l.href.slice(1));

/**
 * Navbar
 *
 * Sticky top navigation bar that:
 * - Adds a frosted-glass background once the user scrolls past 20px
 * - Highlights the nav link corresponding to the visible section
 * - Collapses to a hamburger + fullscreen overlay on mobile (<768px)
 * - Smooth-scrolls to sections on link click
 */
const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const activeSection             = useActiveSection(sectionIds);

  // Track scroll position for background reveal
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /** Smooth-scroll to a section and close mobile menu */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  }, []);

  /** Smooth-scroll to top (brand click) */
  const handleBrandClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__container">
          {/* Brand / Name */}
          <button
            className="navbar__brand"
            onClick={handleBrandClick}
            aria-label="Scroll to top"
          >
            {personal.name}
          </button>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, href)}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href={`mailto:${personal.email}`}
            className="navbar__cta"
            aria-label="Send an email"
          >
            Contact
          </a>

          {/* Hamburger toggle (mobile only) */}
          <button
            className={`navbar__toggle${menuOpen ? ' navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="navbar__toggle-bar" />
            <span className="navbar__toggle-bar" />
            <span className="navbar__toggle-bar" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {navLinks.map(({ label, href }, index) => {
              const isActive = activeSection === href.slice(1);
              return (
                <motion.a
                  key={href}
                  href={href}
                  className={`navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {label}
                </motion.a>
              );
            })}
            <motion.a
              href={`mailto:${personal.email}`}
              className="navbar__mobile-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
