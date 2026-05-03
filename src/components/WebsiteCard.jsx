import { motion } from 'framer-motion';

function WebsiteCard({ title, url, description, image, buttonText, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35 + index * 0.2, duration: 0.7 }}
      whileHover={{ y: -10, scale: 1.015 }}
      className="group overflow-hidden rounded-3xl border border-cyan-300/35 bg-white/10 p-4 shadow-[0_0_35px_rgba(34,211,238,0.26)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_52px_rgba(34,211,238,0.45)]"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/60">
        <motion.img
          src={image}
          alt={`Preview ${title}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172d]/50 via-transparent to-transparent" />
      </div>

      <div className="px-2 pb-2 pt-5">
        <h3 className="text-3xl font-extrabold tracking-wider text-cyan-200">{title}</h3>
        <p className="mt-3 min-h-24 text-sm leading-relaxed text-slate-100/90">{description}</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(url, '_blank')}
          className="mt-4 rounded-xl border border-amber-300/80 bg-amber-300/10 px-5 py-3 font-semibold text-amber-300 shadow-[0_0_16px_rgba(250,204,21,0.35)]"
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default WebsiteCard;
