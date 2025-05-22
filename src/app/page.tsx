import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <div className="snap-start">
          <Hero />
        </div>
        <div className="snap-start">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </div>
    </main>
  )
}