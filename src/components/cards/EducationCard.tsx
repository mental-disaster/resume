'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Education } from '@/data/education'

export const EducationCard = ({ education }: { education: Education }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = education.icon

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
        <h3 className="text-xl font-semibold">{education.institution}</h3>
      </div>
      <p className="text-gray text-sm mb-1">{education.activity}</p>
      <p className="text-gray text-xs">{education.period}</p>
    </motion.div>
  )
}
