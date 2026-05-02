import { motion } from 'framer-motion';

function WebsiteCard({ name, url, description, preview, fallbackPreview, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.18, duration: 0.7 }}
      className="group overflow-hidden rounded-2xl border border-cyan-300/30 bg-white/10 shadow-glow backdrop-blur-md"
    >
      <img
        src={preview}
        alt={`Preview ${name}`}
        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = fallbackPreview;
        }}
      />
      <div className="p-6">
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
      </div>
    </motion.article>
  );
}

export default WebsiteCard;
