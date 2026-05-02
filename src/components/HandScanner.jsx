import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const messages = ['Memindai Akses Peresmian...', 'Verifikasi Sistem...', 'Menyiapkan Portal Digital...'];

function HandScanner({ onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const message = useMemo(() => messages[Math.floor((progress / 100) * messages.length)] || messages[messages.length - 1], [progress]);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [scanning, onComplete]);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
      <h2 className="mb-8 text-2xl font-bold tracking-wide text-cyan-100 md:text-4xl">Silakan Letakkan Tangan untuk Memulai</h2>

      <div
        onClick={() => !scanning && setScanning(true)}
        className="relative flex h-72 w-72 cursor-pointer items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/10 shadow-glow md:h-96 md:w-96"
      >
        <div className="absolute h-56 w-56 animate-pulse-slow rounded-full border-2 border-cyan-200/40 md:h-72 md:w-72" />
        <div className="absolute h-40 w-40 rounded-full border border-gold/50 md:h-56 md:w-56" />
        <span className="z-10 text-sm tracking-widest text-cyan-100/90 md:text-base">TAP TO SCAN</span>

        {scanning && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-cyan-200 shadow-[0_0_24px_#42e5ff]"
            initial={{ top: '6%' }}
            animate={{ top: '90%' }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />
        )}
      </div>

      <button
        onClick={() => !scanning && setScanning(true)}
        className="mt-8 rounded-xl border border-gold/60 bg-gold/20 px-6 py-3 font-semibold text-gold hover:bg-gold/30"
      >
        Mulai Scan
      </button>

      {scanning && (
        <div className="mt-8 w-full max-w-xl">
          <p className="mb-3 text-cyan-100">{message}</p>
          <div className="h-4 overflow-hidden rounded-full bg-slate-900/70">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 to-gold"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-right text-sm text-cyan-200">{progress}%</p>

          {progress >= 100 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-xl border border-emerald-300/50 bg-emerald-500/15 p-4">
              <p className="text-2xl font-bold text-emerald-200">SCAN BERHASIL</p>
              <p className="text-emerald-100">Peresmian Portal Digital Dimulai</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}

export default HandScanner;
