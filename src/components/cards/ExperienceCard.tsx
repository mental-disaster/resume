"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Experience } from '@/data/experience'

export const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = exp.icon
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group relative cursor-pointer"
    >
      <div className="absolute rounded-xl inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">
          상세보기
        </span>
      </div>

      <div className="relative z-0">
        <div className="text-4xl mb-4">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{exp.title}</h3>
        <p className="text-dark text-lg font-semibold mb-2">{exp.company}</p>
        <p className="text-gray/50 mb-4">{exp.period}</p>
        <p className="leading-relaxed">{exp.description}</p>
      </div>
    </motion.div>
  )
} 