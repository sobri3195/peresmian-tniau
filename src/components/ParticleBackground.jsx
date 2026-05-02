import { motion } from 'framer-motion';

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: (i % 4) + 2,
  left: `${(i * 13) % 100}%`,
  top: `${(i * 19) % 100}%`,
  duration: 7 + (i % 6),
}));

function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-200/70"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.id * 0.1 }}
        />
      ))}
    </div>
  );
}

export default ParticleBackground;
