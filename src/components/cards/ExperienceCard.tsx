"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface Experience {
  icon: string
  title: string
  company: string
  period: string
  description: string
}

export const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-4">{exp.icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{exp.title}</h3>
      <p className="text-blue-600 text-lg font-semibold mb-2">{exp.company}</p>
      <p className="text-gray-500 mb-4">{exp.period}</p>
      <p className="text-gray-600 leading-relaxed">{exp.description}</p>
    </motion.div>
  )
} 