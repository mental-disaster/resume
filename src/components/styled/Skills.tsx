'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { SkillCard } from '@/components/cards/SkillCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Skills() {
  const { ref, reveal } = useScrollReveal();

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 ref={ref} {...reveal()} className="text-3xl font-bold text-center mb-6">
          기술 스택
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
