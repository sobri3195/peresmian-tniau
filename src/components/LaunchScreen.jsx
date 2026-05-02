import { motion } from 'framer-motion';
import AnimatedGrid from './AnimatedGrid';
import ParticleBackground from './ParticleBackground';
import WebsiteCard from './WebsiteCard';

const websites = [
  {
    name: 'SILARAS',
    url: 'https://silaras.puskesau.com',
    preview: '/src/assets/silaras-preview.png',
    description:
      'Sistem layanan digital PUSKESAU untuk mendukung kemudahan akses, integrasi data, dan peningkatan mutu pelayanan.',
  },
  {
    name: 'SIMON',
    url: 'https://simon.puskesau.com',
    preview: '/src/assets/simon-preview.png',
    description:
      'Sistem monitoring digital PUSKESAU untuk mendukung pemantauan, evaluasi, dan penguatan layanan secara modern.',
  },
];

function LaunchScreen({ onReset }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-8">
      <AnimatedGrid />
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_42%)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 flex justify-center">
          <img src="/src/assets/logo-puskesau.png" alt="Logo PUSKESAU" className="h-20 w-20 rounded-full bg-white/10 p-2 shadow-[0_0_24px_rgba(34,211,238,0.45)] md:h-24 md:w-24" />
        </motion.div>

        <motion.header initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-center">
          <h1 className="title-sweep text-3xl font-black tracking-wide text-white md:text-5xl xl:text-6xl">PERESMIAN PORTAL DIGITAL PUSKESAU</h1>
          <p className="mx-auto mt-4 max-w-4xl text-base text-cyan-100 md:text-xl">Menuju Layanan Digital yang Modern, Terintegrasi, dan Profesional</p>
        </motion.header>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {websites.map((site, i) => (
            <WebsiteCard key={site.name} {...site} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={onReset} className="rounded-lg border border-cyan-200/70 bg-cyan-300/10 px-6 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20">
            Ulangi Scan
          </button>
        </div>
      </div>
    </section>
  );
}

export default LaunchScreen;
