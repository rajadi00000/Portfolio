import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal } from '@/data/portfolio';

const currentYear = new Date().getFullYear();

/**
 * Footer
 *
 * Simple site footer with brand name, social icon links, and copyright.
 * Social links open in a new tab with rel="noopener noreferrer" for security.
 */
const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <span className="footer__brand">{personal.name}</span>

          {/* Social links */}
          <nav className="footer__socials" aria-label="Social links">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub profile"
            >
              <FiGithub />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn profile"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="footer__social-link"
              aria-label="Send email"
            >
              <FiMail />
            </a>
          </nav>

          {/* Copyright */}
          <p className="footer__copy">
            &copy; {currentYear} {personal.name} &mdash; Built with React &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
