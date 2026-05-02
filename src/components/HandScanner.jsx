import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';

function HandScanner({ onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);
        if (next === 100) {
          clearInterval(timer);
          setSuccess(true);
          setTimeout(onComplete, 1500);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [scanning, onComplete]);

  const status = useMemo(() => {
    if (progress <= 35) return 'Memindai Akses Peresmian...';
    if (progress <= 70) return 'Verifikasi Sistem...';
    if (progress <= 99) return 'Menyiapkan Portal Digital...';
    return 'SCAN BERHASIL';
  }, [progress]);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.24),transparent_45%)]" />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-10 max-w-4xl text-2xl font-extrabold text-cyan-100 drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] md:text-5xl"
        >
          Mohon izin Kapuskesau meletakkan tangan untuk memulai
        </motion.h1>

        <motion.div
          onClick={startScan}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative mx-auto flex h-[22rem] w-[22rem] cursor-pointer items-center justify-center md:h-[34rem] md:w-[34rem]"
        >
          <motion.div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-xl" animate={{ scale: scanning ? [1, 1.15, 1] : [1, 1.06, 1], opacity: scanning ? [0.45, 0.95, 0.45] : [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: scanning ? 1.2 : 2.8 }} />
          <div className="absolute inset-4 rounded-full border border-cyan-200/40 shadow-[0_0_60px_rgba(34,211,238,0.55)]" />
          <div className="absolute inset-12 rounded-full border border-amber-300/55" />
          <motion.div className="absolute inset-6 rounded-full border border-cyan-200/65" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute inset-16 rounded-full border-2 border-dashed border-cyan-100/40" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />

          {scanning && (
            <>
              <motion.div className="absolute inset-0 rounded-full border border-cyan-100/70" initial={{ scale: 0.8, opacity: 0.55 }} animate={{ scale: 1.15, opacity: 0 }} transition={{ duration: 1.3, repeat: Infinity }} />
              <motion.div className="absolute inset-0 rounded-full border border-cyan-100/50" initial={{ scale: 0.9, opacity: 0.45 }} animate={{ scale: 1.22, opacity: 0 }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.3 }} />
            </>
          )}

          <motion.div
            className="relative z-20"
            animate={scanning ? { x: [0, 1.5, -1.5, 0], y: [0, -1, 1, 0] } : { y: [0, -8, 0] }}
            transition={scanning ? { duration: 0.22, repeat: Infinity } : { duration: 3.2, repeat: Infinity }}
          >
            <motion.img
              src="/images/handscanner-logo.svg"
              alt="Hand scanner logo"
              className="w-[240px] object-contain opacity-100 drop-shadow-[0_0_28px_rgba(34,211,238,0.95)] md:w-[300px] lg:w-[420px]"
              animate={{ opacity: [0.95, 1, 0.95], scale: scanning ? [1, 1.02, 1] : [1, 1.01, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />

            <motion.div
              className="pointer-events-none absolute inset-y-2 left-1/2 w-[60%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-100/25 to-transparent"
              animate={{ x: ['-130%', '130%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <p className="pointer-events-none absolute z-30 rounded-full border border-cyan-100/50 bg-slate-900/55 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-cyan-100">
            TAP TO SCAN
          </p>

          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.span
              key={deg}
              className="absolute z-10 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.95)]"
              style={{ transform: `rotate(${deg}deg) translateY(-13rem)` }}
              animate={{ opacity: scanning ? [0.3, 1, 0.3] : [0.4, 0.8, 0.4], scale: scanning ? [1, 1.6, 1] : [1, 1.2, 1] }}
              transition={{ duration: 1.1 + i * 0.2, repeat: Infinity }}
            />
          ))}

          {scanning && (
            <motion.div
              className="absolute left-12 right-12 z-40 h-1 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(34,211,238,1)]"
              initial={{ top: '14%' }}
              animate={{ top: ['14%', '86%'] }}
              transition={{ duration: 1.25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
            />
          )}
        </motion.div>

        {!scanning ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={startScan}
            className="mt-8 rounded-xl border border-amber-300/80 bg-white/10 px-9 py-3 text-lg font-semibold text-amber-300 shadow-[0_0_24px_rgba(250,204,21,0.28)]"
          >
            Mulai Scan
          </motion.button>
        ) : (
          <div className="mx-auto mt-8 max-w-xl">
            <p className="mb-3 text-cyan-100">{status}</p>
            <div className="h-3 overflow-hidden rounded-full border border-cyan-200/40 bg-slate-950/80">
              <motion.div className="h-full rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]" animate={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-cyan-200">{progress}%</p>
          </div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto mt-6 max-w-md rounded-2xl border border-cyan-200/60 bg-cyan-200/10 px-6 py-4 shadow-[0_0_38px_rgba(34,211,238,0.5)]">
            <p className="text-4xl text-cyan-100">✓</p>
            <p className="text-2xl font-extrabold text-white">SCAN BERHASIL</p>
            <p className="text-amber-200">Akses Peresmian Diberikan</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default HandScanner;
