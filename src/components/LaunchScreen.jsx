import { motion } from 'framer-motion';
import WebsiteCard from './WebsiteCard';

const websites = [
  {
    name: 'SILARAS',
    url: 'https://silaras.puskesau.com',
    preview: '/src/assets/silaras-preview.png',
    fallbackPreview: '/images/silaras.svg',
    description:
      'Sistem layanan digital PUSKESAU untuk mendukung kemudahan akses, integrasi data, dan peningkatan mutu pelayanan.',
  },
  {
    name: 'SIMON',
    url: 'https://simon.puskesau.com',
    preview: '/src/assets/simon-preview.png',
    fallbackPreview: '/images/simon.svg',
    description:
      'Sistem monitoring digital PUSKESAU untuk mendukung pemantauan, evaluasi, dan transformasi layanan secara modern.',
  },
];

function LaunchScreen({ onReset }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-10 lg:px-12">
      <div className="mb-8 flex items-center justify-between">
        <img src="/src/assets/logo-puskesau.png" alt="Logo PUSKESAU" className="h-16 w-16 rounded-full bg-white/10 p-1 md:h-24 md:w-24" />
        <img src="/src/assets/logo-transformasi.png" alt="Logo Transformasi" className="h-16 w-16 rounded-full bg-white/10 p-1 md:h-24 md:w-24" />
      </div>

      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-white md:text-5xl xl:text-6xl">PERESMIAN PORTAL DIGITAL PUSKESAU</h1>
        <p className="mx-auto mt-4 max-w-4xl text-sm text-cyan-100 md:text-xl">
          Menuju Layanan Digital yang Modern, Terintegrasi, dan Transformasional
        </p>
      </motion.header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {websites.map((site, i) => (
          <WebsiteCard key={site.name} {...site} index={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button onClick={onReset} className="rounded-xl border border-cyan-300/70 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-500/20">
          Ulangi Scan
        </button>
      </div>
    </section>
  );
}

export default LaunchScreen;
