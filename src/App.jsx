import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HandScanner from './components/HandScanner';
import LaunchScreen from './components/LaunchScreen';
import TransformationIntro from './components/TransformationIntro';

function App() {
  const [stage, setStage] = useState('scanner');

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#06172d_0%,#08213f_55%,#06172d_100%)] text-white">
      <AnimatePresence mode="wait">
        {stage === 'scanner' && (
          <motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.7 }}>
            <HandScanner onComplete={() => setStage('transformation')} />
          </motion.div>
        )}

        {stage === 'transformation' && (
          <motion.div key="transformation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
            <TransformationIntro onComplete={() => setStage('launch')} />
          </motion.div>
        )}

        {stage === 'launch' && (
          <motion.div key="launch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <LaunchScreen onReset={() => setStage('scanner')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
