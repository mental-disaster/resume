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
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { amount: 0.3 })
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={cardInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      <div className="text-4xl mb-4">{exp.icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-gray-800">{exp.title}</h3>
      <p className="text-blue-600 text-lg font-semibold mb-2">{exp.company}</p>
      <p className="text-gray-500 mb-4">{exp.period}</p>
      <p className="text-gray-600 leading-relaxed">{exp.description}</p>
    </motion.div>
  )
} 