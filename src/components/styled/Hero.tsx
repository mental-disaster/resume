'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { heroData } from '@/data/hero';

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-primary to-success">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white"
        >
          <Image src={heroData.profileImage} alt="Profile" fill className="object-cover" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-bold mb-4"
        >
          {heroData.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl mb-6"
        >
          {heroData.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl mb-8 px-4 md:px-0"
        >
          {heroData.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-x-4"
        >
          <a
            href="#contact"
            className="bg-white text-primary px-6 py-3 rounded-full hover:bg-light transition"
          >
            연락하기
          </a>
          <a
            href="#experience"
            className="border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-primary transition"
          >
            경력사항 보기
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
