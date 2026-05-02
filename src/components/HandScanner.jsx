import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const messages = ['Memindai Akses Peresmian...', 'Verifikasi Sistem...', 'Menyiapkan Portal Digital...'];

function HandScanner({ onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [handLoaded, setHandLoaded] = useState(true);

  const message = useMemo(() => messages[Math.min(messages.length - 1, Math.floor((progress / 100) * messages.length))], [progress]);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 2, 100);
        if (next >= 100) {
          clearInterval(timer);
          setShowSuccess(true);
          setTimeout(onComplete, 2200);
        }
        return next;
      });
    }, 90);
    return () => clearInterval(timer);
  }, [scanning, onComplete]);

  const startScan = () => !scanning && setScanning(true);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-10 text-center">
      <h1 className="mb-10 max-w-4xl text-3xl font-bold leading-tight tracking-wide text-cyan-100 md:text-5xl">
        Mohon izin Kapuskesau meletakkan tangan untuk memulai
      </h1>

      <div onClick={startScan} className="relative flex h-72 w-72 cursor-pointer items-center justify-center md:h-[26rem] md:w-[26rem]">
        <div className="absolute inset-0 rounded-full border border-cyan-200/30" />
        <div className="absolute inset-5 animate-pulse-slow rounded-full border border-cyan-300/40 shadow-glow" />
        <div className="absolute inset-10 rounded-full border border-gold/40" />

        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-300/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
        />

        {handLoaded ? (
          <img
            src="/src/assets/hand-scan.png"
            alt="Ilustrasi scan telapak tangan"
            className="relative z-10 h-44 w-44 object-contain opacity-95 drop-shadow-[0_0_30px_rgba(66,229,255,0.8)] md:h-60 md:w-60"
            onError={() => setHandLoaded(false)}
          />
        ) : (
          <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-3xl border border-cyan-300/50 bg-cyan-300/10 text-7xl drop-shadow-[0_0_30px_rgba(66,229,255,0.8)] md:h-60 md:w-60">
            🖐️
          </div>
        )}

        {scanning && (
          <motion.div
            className="absolute left-9 right-9 z-20 h-1 rounded-full bg-cyan-100 shadow-[0_0_22px_#42e5ff]"
            initial={{ top: '18%' }}
            animate={{ top: ['18%', '82%', '18%'] }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
          />
        )}
      </div>

      <button onClick={startScan} className="mt-10 rounded-xl border border-gold/60 bg-gold/20 px-8 py-3 text-lg font-semibold text-gold hover:bg-gold/30">
        Mulai Scan
      </button>

      {scanning && (
        <div className="mt-8 w-full max-w-xl">
          <p className="mb-3 text-cyan-100">{message}</p>
          <div className="h-3 overflow-hidden rounded-full bg-slate-900/70">
            <motion.div className="h-full bg-gradient-to-r from-cyan-300 to-gold" animate={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-right text-sm text-cyan-200">{progress}%</p>
        </div>
      )}

      {showSuccess && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-xl border border-emerald-300/50 bg-emerald-500/10 px-6 py-4">
          <p className="text-2xl font-extrabold text-emerald-200">SCAN BERHASIL</p>
          <p className="text-emerald-100">Peresmian Portal Digital Dimulai</p>
        </motion.div>
      )}
    </section>
  );
}

export default HandScanner;
