"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { experiences } from '@/data/experience'
import { ExperienceCard } from '@/components/cards/ExperienceCard'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          경력 사항
        </motion.h2>
        <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}