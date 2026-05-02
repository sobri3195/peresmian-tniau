import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HandScanner from './components/HandScanner';
import LaunchScreen from './components/LaunchScreen';

function App() {
  const [phase, setPhase] = useState('scan');

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#06172d_0%,#08213f_55%,#06172d_100%)] text-white">
      <AnimatePresence mode="wait">
        {phase === 'scan' ? (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.7 }}>
            <HandScanner onComplete={() => setPhase('launch')} />
          </motion.div>
        ) : (
          <motion.div key="launch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <LaunchScreen onReset={() => setPhase('scan')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
