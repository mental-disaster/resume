'use client';

import { motion } from 'framer-motion';
import { achievements } from '@/data/achievements';
import { AchievementCard } from '@/components/cards/AchievementCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Achievements() {
  const { ref, reveal } = useScrollReveal();

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 {...reveal()} className="text-3xl font-bold text-center mb-12">
          기타
        </motion.h2>
        <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}
