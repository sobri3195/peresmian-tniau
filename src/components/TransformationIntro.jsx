import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';

function TransformationIntro({ onComplete }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      await controls.start({ opacity: 1, scale: 1, transition: { duration: 1 } });
      await controls.start({ scale: 1.03, transition: { duration: 1.2 } });
      if (mounted) onComplete();
    };

    const timer = setTimeout(run, 300);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [controls, onComplete]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),transparent_46%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        className="relative z-10"
      >
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-8 h-[2px] w-64 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.85)]"
        />

        <motion.h2
          initial={{ opacity: 0, y: 24, letterSpacing: '0.25em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
          transition={{ duration: 1 }}
          className="text-2xl font-black uppercase text-cyan-50 drop-shadow-[0_0_24px_rgba(34,211,238,0.65)] md:text-5xl"
        >
          Transformasi TNI AU
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 36, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="title-sweep mt-2 text-6xl font-black uppercase tracking-[0.18em] drop-shadow-[0_0_38px_rgba(34,211,238,0.85)] md:text-8xl"
        >
          AMPUH
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-sm uppercase tracking-[0.2em] text-amber-200/90 md:text-base"
        >
          Peresmian Portal Digital PUSKESAU
        </motion.p>
      </motion.div>
    </section>
  );
}

export default TransformationIntro;
