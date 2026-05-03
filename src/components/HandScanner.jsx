import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import handScannerLogo from '../assets/hand-scanner-logo.svg';
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
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_58%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-12 max-w-[900px] text-2xl font-extrabold leading-tight text-cyan-100 drop-shadow-[0_0_16px_rgba(34,211,238,0.38)] sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Mohon izin Kapuskesau meletakkan tangan untuk memulai
        </motion.h1>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="pointer-events-none absolute h-[86%] w-[86%] rounded-full border border-cyan-200/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="pointer-events-none absolute h-[95%] w-[95%] rounded-full bg-cyan-300/10 blur-2xl"
            animate={{ opacity: scanning ? [0.2, 0.45, 0.2] : [0.15, 0.3, 0.15], scale: scanning ? [1, 1.06, 1] : [1, 1.03, 1] }}
            transition={{ duration: scanning ? 1.5 : 3, repeat: Infinity }}
          />

          <motion.div
            className="relative z-20"
            animate={{ y: scanning ? [0, -2, 2, 0] : [0, -8, 0] }}
            transition={{ duration: scanning ? 0.35 : 3.4, repeat: Infinity }}
          >
            <div className="relative mx-auto w-[340px] max-w-[80vw] overflow-hidden rounded-[32px] border border-cyan-300/30 bg-white/5 shadow-[0_0_60px_rgba(34,211,238,0.35)] backdrop-blur-sm md:w-[400px] lg:w-[430px]">
              <img
                src={handScannerLogo}
                alt="Hand scanner"
                className="w-full object-contain"
              />

              {scanning && (
                <>
                  <motion.div
                    className="pointer-events-none absolute left-[8%] right-[8%] h-[3px] rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.95)]"
                    initial={{ top: '12%' }}
                    animate={{ top: ['12%', '88%'] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent"
                    animate={{ x: ['-120%', '120%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  />
                </>
              )}
            </div>
          </motion.div>

          {scanning && (
            <motion.div
              className="pointer-events-none absolute h-[102%] w-[102%] rounded-full border border-cyan-200/45"
              initial={{ scale: 0.92, opacity: 0.5 }}
              animate={{ scale: 1.06, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
        </div>

        {!scanning ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={startScan}
            className="mt-9 rounded-2xl border border-amber-300/80 bg-white/5 px-8 py-3 text-lg font-semibold text-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.22)] transition-shadow hover:shadow-[0_0_30px_rgba(250,204,21,0.36)]"
          >
            Mulai Scan
          </motion.button>
        ) : (
          <div className="mx-auto mt-9 w-[360px] max-w-[80vw]">
            <p className="mb-3 text-cyan-100">{status}</p>
            <div className="h-3 overflow-hidden rounded-full border border-cyan-200/35 bg-slate-950/85">
              <motion.div
                className="h-full rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.95)]"
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-cyan-200">{progress}%</p>
          </div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-6 max-w-md rounded-2xl border border-cyan-200/55 bg-cyan-200/10 px-6 py-4 shadow-[0_0_34px_rgba(34,211,238,0.45)]"
          >
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
