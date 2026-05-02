import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HandScanner from './components/HandScanner';
import LaunchScreen from './components/LaunchScreen';

function App() {
  const [phase, setPhase] = useState('scan');

  return (
    <main className="digital-bg relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,229,255,0.18),transparent_45%)]" />
      <AnimatePresence mode="wait">
        {phase === 'scan' ? (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.7 }}>
            <HandScanner onComplete={() => setPhase('launch')} />
          </motion.div>
        ) : (
          <motion.div
            key="launch"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <LaunchScreen onReset={() => setPhase('scan')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
