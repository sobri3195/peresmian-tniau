import { motion } from 'framer-motion';

function WebsiteCard({ name, url, description, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
      className="group rounded-2xl border border-cyan-300/35 bg-white/10 p-6 shadow-glow backdrop-blur-md"
    >
      <h3 className="mb-3 text-3xl font-bold tracking-wide text-cyan-200">{name}</h3>
      <p className="mb-6 text-sm leading-relaxed text-slate-100/90">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-lg border border-gold/70 bg-gold/20 px-5 py-3 font-semibold text-gold transition hover:scale-105 hover:bg-gold/30"
      >
        {`Buka ${name}`}
      </a>
    </motion.article>
  );
}

export default WebsiteCard;
