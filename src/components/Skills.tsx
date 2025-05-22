'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '@/data/skills'
import { SkillCard } from './cards/SkillCard'

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 })

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          기술 스택
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, data], i) => (
            <SkillCard key={category} category={category} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
