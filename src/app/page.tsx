import About from '@/components/none-styled/About';
import Experience from '@/components/none-styled/Experience';
import Achievements from '@/components/none-styled/Achievements';
import Education from '@/components/none-styled/Education';
import Header from '@/components/none-styled/Header';
import Skills from '@/components/none-styled/Skills';

export default function Home() {
  return (
    <div className="min-h-screen bg-white py-5 text-slate-900 sm:bg-slate-100 sm:py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl bg-white sm:border sm:border-slate-200 print:border-0">
        <div className="px-5 py-6 sm:px-8 sm:py-9 print:p-0">
          <Header />

          <main className="space-y-7 sm:space-y-8">
            <About />
            <Skills />
            <Experience />
            <Education />
            <Achievements />
          </main>
        </div>
      </div>
    </div>
  );
}
