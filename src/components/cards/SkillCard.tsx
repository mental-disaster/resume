'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SkillCardProps {
  category: string
  data: {
    icon: string
    items: string[]
  }
  index: number
}

export function SkillCard({ category, data, index }: SkillCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-4">{data.icon}</div>
      <h3 className="text-2xl font-bold mb-6 capitalize">{category}</h3>
      <div className="flex flex-wrap gap-3">
        {data.items.map((skill) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3 }}
            className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
