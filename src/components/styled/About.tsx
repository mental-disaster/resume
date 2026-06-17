'use client';

import { motion } from 'framer-motion';
import { aboutData } from '@/data/about';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const { ref, reveal } = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 {...reveal()} className="text-3xl font-bold text-center mb-12">
          {aboutData.title}
        </motion.h2>
        <motion.div ref={ref} {...reveal({ delay: 0.2 })} className="max-w-3xl mx-auto">
          <div className="text-grey text-lg mb-6 space-y-4">
            {aboutData.description.map((paragraph, index) => (
              <p key={index} className="leading-7 break-words whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.a
              href="#education"
              {...reveal({ x: -20, y: 0, delay: 0.4 })}
              className="bg-light/30 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">교육</h3>
              <p className="text-grey">{aboutData.education.degree}</p>
              <p className="text-grey text-sm">
                {aboutData.education.school}, {aboutData.education.period}
              </p>
            </motion.a>
            <motion.a
              href="#experience"
              {...reveal({ x: 20, y: 0, delay: 0.4 })}
              className="bg-light/30 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">경력</h3>
              <p className="text-grey">{aboutData.experience.position}</p>
              <p className="text-grey text-sm">
                {aboutData.experience.company}, {aboutData.experience.period}
              </p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
