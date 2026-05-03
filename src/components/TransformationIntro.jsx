import { motion } from 'framer-motion';
import { useEffect } from 'react';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';

function TransformationIntro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.26),transparent_46%)]" />

      <motion.div className="absolute h-[28rem] w-[28rem] rounded-full border border-cyan-200/30" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: [0.2, 0.6, 0.25], scale: [0.8, 1.05, 0.95] }} transition={{ duration: 2.6, repeat: Infinity }} />

      <motion.div className="relative z-10" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <motion.h2 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="text-3xl font-black tracking-[0.16em] text-cyan-50 drop-shadow-[0_0_22px_rgba(34,211,238,0.65)] md:text-6xl">
          Transformasi PUSKESAU
        </motion.h2>

        <motion.h1 initial={{ opacity: 0, y: 28, scale: 0.84 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 1.1 }} className="mt-3 bg-gradient-to-r from-amber-200 via-cyan-100 to-amber-200 bg-clip-text text-5xl font-black tracking-[0.2em] text-transparent drop-shadow-[0_0_44px_rgba(34,211,238,0.9)] md:text-7xl">
          TNI AU - AMPUH
        </motion.h1>

        <motion.div className="mx-auto mt-6 h-[3px] w-72 bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.95)]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.9 }} />
      </motion.div>
    </section>
  );
}

export default TransformationIntro;
