'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Skill } from '@/data/skills'

export function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = skill.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">{skill.category}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skill.tech.map((tech) => (
          <motion.span
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3 }}
            className="bg-white px-4 py-2 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1"
          >
            {tech.icon && <tech.icon className="w-4 h-4" />} {tech.name}
          </motion.span>

        ))}
      </div>
    </motion.div>
  )
}
