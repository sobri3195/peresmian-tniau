import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';

function HandScanner({ onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);
        if (next === 100) {
          clearInterval(timer);
          setSuccess(true);
          setTimeout(onComplete, 1700);
        }
        return next;
      });
    }, 55);
    return () => clearInterval(timer);
  }, [scanning, onComplete]);

  const status = useMemo(() => {
    if (progress <= 35) return 'Memindai Akses Peresmian...';
    if (progress <= 70) return 'Verifikasi Sistem...';
    if (progress <= 99) return 'Menyiapkan Portal Digital...';
    return 'SCAN BERHASIL';
  }, [progress]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_40%)]" />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.h1 initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-10 max-w-3xl text-3xl font-extrabold text-cyan-100 drop-shadow-[0_0_14px_rgba(34,211,238,0.55)] md:text-5xl">
          Mohon izin Kapuskesau meletakkan tangan untuk memulai
        </motion.h1>

        <motion.div whileHover={{ scale: 1.02 }} onClick={() => !scanning && setScanning(true)} className="scanner-shell relative mx-auto flex h-[19rem] w-[19rem] cursor-pointer items-center justify-center rounded-full md:h-[26rem] md:w-[26rem]">
          <div className="absolute inset-0 rounded-full border border-cyan-300/60 shadow-[0_0_45px_rgba(34,211,238,0.45)]" />
          <div className="absolute inset-6 rounded-full border border-cyan-300/30" />
          <div className="absolute inset-12 rounded-full border border-amber-300/50" />
          <motion.div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-300/45" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
          <div className="absolute inset-0 rounded-full animate-hologram-flicker" />

          {imageError ? (
            <svg viewBox="0 0 180 220" className="relative z-20 h-48 w-40 fill-none stroke-cyan-200/90 stroke-[4] drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] md:h-64 md:w-52">
              <path d="M55 78c0-9 8-15 15-15s13 5 13 15v52"/><path d="M75 65V38c0-10 8-18 16-18s16 8 16 18v70"/><path d="M107 80V52c0-9 7-15 14-15s14 6 14 15v62c0 36-24 70-58 70-38 0-67-28-67-62V95c0-8 6-14 14-14s14 6 14 14v38"/>
            </svg>
          ) : (
            <motion.img src='/src/assets/hand-scan.png' onError={() => setImageError(true)} alt="Hand scanner" className="relative z-20 h-48 w-40 animate-float object-contain drop-shadow-[0_0_28px_rgba(34,211,238,0.85)] md:h-64 md:w-52" animate={{ opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.6 }} />
          )}

          {scanning && <motion.div className="absolute left-8 right-8 z-30 h-1 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(34,211,238,1)]" initial={{ top: '16%' }} animate={{ top: ['16%', '84%', '16%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} />}
        </motion.div>

        {!scanning ? (
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setScanning(true)} className="mt-8 rounded-xl border border-amber-300/80 bg-white/10 px-8 py-3 text-lg font-semibold text-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.28)]">
            Mulai Scan
          </motion.button>
        ) : (
          <div className="mx-auto mt-8 max-w-xl">
            <p className="mb-3 text-cyan-100">{status}</p>
            <div className="h-3 overflow-hidden rounded-full bg-slate-900/80">
              <motion.div className="h-full rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)]" animate={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-cyan-200">{progress}%</p>
          </div>
        )}

        {success && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto mt-6 max-w-md rounded-2xl border border-cyan-200/60 bg-cyan-200/10 px-6 py-4">
          <p className="text-4xl text-cyan-200">✓</p><p className="text-2xl font-extrabold text-white">SCAN BERHASIL</p><p className="text-cyan-100">Peresmian Portal Digital Dimulai</p>
        </motion.div>}
      </div>
    </section>
  );
}

export default HandScanner;
