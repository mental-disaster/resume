'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { Utils } from '@/components/common/Utils';
import { ShadowBadge } from '@/components/badges/ShadowBadge';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useNow } from '@/hooks/useNow';

export default function Experience() {
  const { ref, reveal } = useScrollReveal();
  // 카드/합계 표시가 같은 기준 시점을 쓰도록 마운트 후 한 번만 계산해 주입한다.
  const now = useNow();
  const totalDuration = Utils.getTotalCareerDuration(experience, now);

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 {...reveal()} className="text-3xl font-bold text-center mb-2">
          경력 사항
        </motion.h2>
        <motion.div {...reveal()} className="text-center mb-12">
          {totalDuration && <ShadowBadge label={`총 ${totalDuration}`} />}
        </motion.div>
        <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} now={now} />
          ))}
        </div>
      </div>
    </section>
  );
}
