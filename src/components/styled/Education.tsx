'use client';

import { motion } from 'framer-motion';
import { education } from '@/data/education';
import { EducationCard } from '@/components/cards/EducationCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Education() {
  const { ref, reveal } = useScrollReveal();

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 {...reveal()} className="text-3xl font-bold text-center mb-12">
          교육/활동
        </motion.h2>
        <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
