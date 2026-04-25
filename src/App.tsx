import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Accomplishments from '@/components/sections/Accomplishments';
import Education from '@/components/sections/Education';

/**
 * App — Root component.
 *
 * Composes the full portfolio page in narrative order:
 * Navbar → Hero → About → Skills → Experience → Projects → Accomplishments → Education → Footer
 *
 * All section `id` values must match the `href` values in `data/portfolio.ts` (navLinks).
 */
const App: React.FC = () => (
  <>
    {/* Ambient aurora beams — fixed, decorative, behind all content */}
    <div className="aurora" aria-hidden="true">
      <div className="aurora__beam aurora__beam--1" />
      <div className="aurora__beam aurora__beam--2" />
      <div className="aurora__beam aurora__beam--3" />
    </div>
    <Navbar />
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Accomplishments />
      <Education />
    </main>
    <Footer />
  </>
);

export default App;
