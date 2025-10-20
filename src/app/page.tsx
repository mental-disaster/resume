'use client';

import About from '@/components/none-styled/About';
import Experience from '@/components/none-styled/Experience';
import Projects from '@/components/none-styled/Projects';
import Achievements from '@/components/none-styled/Achievements';
import Education from '@/components/none-styled/Education';
import Header from '@/components/none-styled/Header';
import Skills from '@/components/none-styled/Skills';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto bg-white md:shadow-lg">
        <div className="p-4 sm:p-6 md:p-8">
          <Header />

          <main className="space-y-8 sm:space-y-10">
            <About />
            <Experience />
            <Projects />
            <Achievements />
            <Education />
            <Skills />
          </main>
        </div>
      </div>
    </div>
  );
}
