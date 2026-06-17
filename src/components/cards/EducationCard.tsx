'use client';

import { motion } from 'framer-motion';
import { Education } from '@/data/education';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const EducationCard = ({ education }: { education: Education }) => {
  const { ref, reveal } = useScrollReveal(0.3);
  const Icon = education.icon;

  const CardContent = (
    <motion.div
      ref={ref}
      {...reveal({ duration: 0.6 })}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">{education.institution}</h3>
      </div>
      <p className="text-grey text-sm mb-1">{education.activity}</p>
      <p className="text-grey text-xs">{education.period}</p>
    </motion.div>
  );

  return education.link ? (
    <a href={education.link} target="_blank" rel="noopener noreferrer">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
};
