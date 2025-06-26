'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { achievements } from '@/data/achievements';
import { AchievementCard } from '@/components/cards/AchievementCard';

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
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
