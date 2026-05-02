import { ArrowRight, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'RSAU/RUMKIT/RSGM PNBP', value: '19', suffix: 'Fasilitas' },
  { label: 'RSAU BLU', value: '3', suffix: 'Fasilitas' },
  { label: 'FKTP JAJARAN TNI AU', value: '58', suffix: 'Fasilitas' },
  { label: 'TOTAL FASILITAS', value: '80', suffix: 'Terintegrasi' },
];

function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0b3b75] text-white">♡</div>
            <div>
              <p className="text-3xl font-extrabold leading-none tracking-wide text-[#223041]">SILARAS</p>
              <p className="text-xs font-semibold tracking-[0.28em] text-slate-400">TNI ANGKATAN UDARA</p>
            </div>
          </div>

          <nav className="hidden items-center gap-9 text-xl font-semibold text-slate-500 md:flex">
            <a href="#">Fitur</a>
            <a href="#">Dokumen</a>
            <a href="#">FAQ</a>
            <a href="#">Tentang</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-2xl font-semibold text-slate-700">Login</button>
            <button className="rounded-xl bg-[#0b2f63] px-6 py-3 text-xl font-bold text-white">Masuk Dashboard</button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-[#00214a] via-[#032652] to-[#1d2c3f]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-white">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c8a24d]/40 px-5 py-2 text-sm font-bold tracking-[0.16em] text-[#e0b856]">
              ✈ RESMI PUSKESAU TNI AU
            </span>
            <h1 className="mt-8 text-6xl font-black leading-[1.1]">
              Sistem Laporan Terintegrasi
              <br />
              <span className="text-[#e0b856]">RSAU & FKTP</span> Jajaran TNI AU
            </h1>
            <p className="mt-8 max-w-3xl text-3xl leading-relaxed text-slate-200">
              SILARAS TNI AU mengintegrasikan pelaporan kesehatan dari seluruh RSAU, Rumkit, RSGM, dan FKTP
              secara digital — terstruktur, cepat, akurat, dan mudah diverifikasi oleh Puskesau.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-3 rounded-xl bg-[#d9ab43] px-8 py-4 text-2xl font-bold text-[#2a2a2a]">
                Masuk Dashboard <ArrowRight className="h-6 w-6" />
              </button>
              <button className="rounded-xl border border-white/40 px-8 py-4 text-2xl font-semibold text-white">Login Personel</button>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-lg text-slate-300">
              <ShieldCheck className="h-5 w-5 text-[#e0b856]" />
              Akses terbatas untuk personel berwenang. Seluruh aktivitas tercatat dalam audit trail.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold tracking-wider text-slate-500">{item.label}</p>
            <p className="mt-3 text-6xl font-black text-[#08376d]">{item.value}</p>
            <p className="text-3xl text-slate-500">{item.suffix}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
