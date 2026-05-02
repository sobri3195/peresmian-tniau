import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HandScanner from './components/HandScanner';
import LaunchScreen from './components/LaunchScreen';

function App() {
  const [phase, setPhase] = useState('scan');

  return (
    <main className="futuristic-bg grid-overlay relative flex h-screen w-screen items-center justify-center overflow-hidden text-white">
      <AnimatePresence mode="wait">
        {phase === 'scan' ? (
          <motion.div
            key="scan"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <HandScanner onComplete={() => setPhase('launch')} />
          </motion.div>
        ) : (
          <motion.div
            key="launch"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <LaunchScreen onReset={() => setPhase('scan')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
