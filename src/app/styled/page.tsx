import Hero from '@/components/styled/Hero';
import About from '@/components/styled/About';
import Experience from '@/components/styled/Experience';
import Projects from '@/components/styled/Projects';
import Skills from '@/components/styled/Skills';
import Achievements from '@/components/styled/Achievements';
import Contact from '@/components/styled/Contact';
import Education from '@/components/styled/Education';

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
    </main>
  );
}
