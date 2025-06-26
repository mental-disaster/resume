'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { aboutData } from '@/data/about';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          {aboutData.title}
        </motion.h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-gray text-lg mb-6 space-y-4">
            {aboutData.description.map((paragraph, index) => (
              <p key={index} className="leading-7 break-words">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.a
              href="#education"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-light/30 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">교육</h3>
              <p className="text-gray">{aboutData.education.degree}</p>
              <p className="text-gray text-sm">
                {aboutData.education.school}, {aboutData.education.period}
              </p>
            </motion.a>
            <motion.a
              href="#experience"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-light/30 p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">경력</h3>
              <p className="text-gray">{aboutData.experience.position}</p>
              <p className="text-gray text-sm">
                {aboutData.experience.company}, {aboutData.experience.period}
              </p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
