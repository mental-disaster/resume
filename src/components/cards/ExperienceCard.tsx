'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Experience } from '@/data/experience';
import { ExperienceModal } from '@/components/modals/ExperienceModal';
import { PrimaryBadge } from '@/components/badges/PrimaryBadge';
import { SuccessBadge } from '@/components/badges/SuccessBadge';
import { Utils } from '@/components/common/Utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ExperienceCard = ({ exp, now }: { exp: Experience; now?: Date | null }) => {
  const { ref, reveal } = useScrollReveal(0.3);
  const [isModalOpen, setModalOpen] = useState(false);
  const Icon = exp.icon;
  const duration = Utils.formatDuration(exp.startedAt, exp.endedAt, now);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <motion.div
        ref={ref}
        onClick={openModal}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${exp.company} 경력 상세 보기`}
        {...reveal({ y: 40, duration: 0.6 })}
        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="absolute rounded-xl inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <Image
            src={'/images/tedious_and_pedantic.png'}
            alt={'지루하고 현학적임'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="opacity-20"
          />
          <span
            className="text-accent text-3xl font-bold text-center z-20"
            style={{
              textShadow:
                '-1px -1px 0 #106FC7, 1px -1px 0 #106FC7, -1px 1px 0 #106FC7, 1px 1px 0 #106FC7',
            }}
          >
            지루하고 현학적인
            <br />
            상세보기
          </span>
        </div>

        <div className="relative z-0 group-hover:opacity-30">
          <div className="text-4xl mb-4">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            {exp.company}
            {exp.endedAt ? '' : <PrimaryBadge className="ml-1" label={'재직중'} />}
            {duration && <SuccessBadge className="ml-1 text-dark" label={duration} />}
          </h3>
          <p className="text-dark text-lg font-semibold mb-2">{exp.position}</p>
          <p className="text-grey/50 mb-4">
            {exp.startedAt} - {exp.endedAt ? exp.endedAt : '현재'}
          </p>
          <p className="leading-relaxed">{exp.description}</p>
        </div>
      </motion.div>

      {isModalOpen && <ExperienceModal exp={exp} now={now} onClose={() => setModalOpen(false)} />}
    </>
  );
};
