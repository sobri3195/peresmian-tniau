import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import handScannerImage from '../../WhatsApp Image 2026-05-03 at 07.12.11.jpeg';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';

function HandScanner({ onComplete }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const audioContextRef = useRef(null);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    clickAudioRef.current = new Audio('/Hand Scanner - Sound Effect.mp3');
    clickAudioRef.current.preload = 'auto';
  }, []);

  const playFallbackTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const context = audioContextRef.current;
      if (context.state === 'suspended') {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(660, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.12);

      gainNode.gain.setValueAtTime(0.0001, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.15);
    } catch (error) {
      console.warn('Klik suara gagal diputar:', error);
    }
  };

  const playClickSound = async () => {
    const clickAudio = clickAudioRef.current;

    if (clickAudio) {
      try {
        clickAudio.currentTime = 0;
        await clickAudio.play();
        return;
      } catch (error) {
        console.warn('Gagal memutar file MP3, menggunakan suara cadangan:', error);
      }
    }

    playFallbackTone();
  };

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
    playClickSound();
    setScanning(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 text-center">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_58%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-12 max-w-[960px] text-2xl font-extrabold leading-tight text-cyan-100 drop-shadow-[0_0_16px_rgba(34,211,238,0.38)] sm:text-3xl md:mb-14 md:text-4xl lg:text-5xl"
        >
          Mohon izin Kapuskesau meletakkan tangan untuk memulai
        </motion.h1>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="pointer-events-none absolute h-[95%] w-[95%] rounded-full border border-cyan-200/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="pointer-events-none absolute h-[108%] w-[108%] rounded-full bg-cyan-300/10 blur-2xl"
            animate={{ opacity: scanning ? [0.2, 0.55, 0.2] : [0.15, 0.35, 0.15], scale: scanning ? [1, 1.06, 1] : [1, 1.03, 1] }}
            transition={{ duration: scanning ? 1.5 : 3, repeat: Infinity }}
          />

          <motion.div
            className="pointer-events-none absolute h-[120%] w-[120%] rounded-full border border-cyan-200/20"
            animate={{ scale: [0.95, 1.04, 0.95], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.button
            type="button"
            onClick={startScan}
            className="group relative z-20 cursor-pointer"
            animate={{ y: scanning ? [0, -2, 2, 0] : [0, -7, 0], scale: scanning ? [1, 1.01, 1] : [1, 1.02, 1] }}
            transition={{ duration: scanning ? 0.45 : 3.4, repeat: Infinity }}
          >
            <div className={`relative rounded-[32px] overflow-hidden border border-cyan-300/30 bg-white/5 shadow-[0_0_60px_rgba(34,211,238,0.35)] backdrop-blur-sm transition-all ${scanning ? 'shadow-[0_0_90px_rgba(34,211,238,0.62)]' : ''}`}>
              <img
                src={handScannerImage}
                alt="Hand scanner"
                className="w-[280px] max-w-[80vw] rounded-3xl object-contain md:w-[350px] lg:w-[430px]"
              />

              {scanning && (
                <>
                  <motion.div
                    className="pointer-events-none absolute left-[8%] right-[8%] h-[3px] rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.95)]"
                    initial={{ top: '8%' }}
                    animate={{ top: ['8%', '88%'] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="pointer-events-none absolute left-[8%] right-[8%] h-10 bg-gradient-to-b from-cyan-200/25 via-cyan-200/10 to-transparent"
                    initial={{ top: '8%' }}
                    animate={{ top: ['8%', '88%'] }}
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
          </motion.button>

          {scanning && (
            <motion.div
              className="pointer-events-none absolute h-[102%] w-[102%] rounded-full border border-cyan-200/45"
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.08, opacity: 0 }}
              transition={{ duration: 1.3, repeat: Infinity }}
            />
          )}
        </div>

        {!scanning ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={startScan}
            className="mt-10 rounded-2xl border border-amber-300/80 bg-white/5 px-8 py-3 text-lg font-semibold text-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.22)] transition-shadow hover:shadow-[0_0_30px_rgba(250,204,21,0.36)]"
          >
            Mulai Scan
          </motion.button>
        ) : (
          <div className="mx-auto mt-10 w-[360px] max-w-[80vw]">
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
