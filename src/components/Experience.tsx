"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/data/experience'

export default function Experience() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { amount: 0.3 })

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white via-sub/10 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          경력 사항
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => {
            const cardRef = useRef(null)
            const cardInView = useInView(cardRef, { amount: 0.3 })
            
            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={cardInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
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
          })}
        </div>
      </div>
    </section>
  )
}