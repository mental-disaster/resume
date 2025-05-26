"use client"

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Experience } from '@/data/experience'
import Image from 'next/image'
import { ExperienceModal } from '@/components/modals/ExperienceModal'
import { PrimaryBadge } from '@/components/badges/PrimaryBadge'
import { SuccessBadge } from '@/components/badges/SuccessBadge'
import { Utils } from '@/components/common/Utils'

export const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isModalOpen, setModalOpen] = useState(false);
  const Icon = exp.icon
  
  return (
    <>
      <motion.div
        onClick={() => setModalOpen(true)}
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group relative cursor-pointer"
      >
        <div className="absolute rounded-xl inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <Image 
            src={"/images/tedious_and_pedantic.png"} 
            alt={'지루하고 현학적임'} 
            fill
            className='opacity-20'
          />
          <span className="text-accent text-3xl font-bold text-center z-20"
            style={{
              textShadow: '-1px -1px 0 #106FC7, 1px -1px 0 #106FC7, -1px 1px 0 #106FC7, 1px 1px 0 #106FC7',
            }}>
            지루하고 현학적인<br/>상세보기
          </span>
        </div>

        <div className="relative z-0 group-hover:opacity-30">
          <div className="text-4xl mb-4">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            {exp.company}
            {exp.endedAt ?  '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            <SuccessBadge className="ml-1 text-dark" label={Utils.formatDuration(exp.startedAt, exp.endedAt)} />
          </h3>
          <p className="text-dark text-lg font-semibold mb-2">{exp.position}</p>
          <p className="text-gray/50 mb-4">{exp.startedAt} - {exp.endedAt ? exp.endedAt : '현재'}</p>
          <p className="leading-relaxed">{exp.description}</p>
        </div>
      </motion.div>

      {isModalOpen && (
        <ExperienceModal exp={exp} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
} 