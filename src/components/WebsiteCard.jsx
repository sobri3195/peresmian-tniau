import { motion } from 'framer-motion';

function WebsiteCard({ name, url, description, preview, fallbackPreview, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35 + index * 0.2, duration: 0.7 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group overflow-hidden rounded-3xl border border-cyan-300/30 bg-white/10 p-4 shadow-[0_0_30px_rgba(34,211,238,0.25)] backdrop-blur-xl"
    >
      <div className="rounded-2xl border border-amber-300/30 p-1">
        <img
          src={preview}
          alt={`Preview ${name}`}
          className="h-52 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackPreview;
          }}
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="text-3xl font-extrabold tracking-wider text-cyan-200">{name}</h3>
        <p className="mt-3 min-h-24 text-sm leading-relaxed text-slate-100/90">{description}</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(url, '_blank')}
          className="mt-4 rounded-xl border border-amber-300/80 bg-amber-300/10 px-5 py-3 font-semibold text-amber-300 shadow-[0_0_16px_rgba(250,204,21,0.35)]"
        >
          {`Buka ${name}`}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default WebsiteCard;
