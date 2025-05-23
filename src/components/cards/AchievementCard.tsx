'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Achievement } from '@/data/achievements'
import Image from 'next/image'

export const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const Icon = achievement.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow group relative"
    >
      {achievement.image && (
        <div className="absolute rounded-xl inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <Image
            src={achievement.image}
            alt={achievement.title}
            className="w-auto h-full object-cover mx-auto"
            height={100}
            width={100}
          />
        </div>
      )}

      <div className={`${achievement.image ? 'relative z-0 group-hover:opacity-30 duration-300' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">{achievement.title}</h3>
        </div>
        <p className="text-gray text-sm mb-1">{achievement.detail}</p>
        <p className="text-gray text-xs">{achievement.date}</p>
      </div>
    </motion.div>
  )
}
