'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Answers, scoreTools } from './lib/scoreTools';
import { Tool } from './data/tools';

type Phase = 'hero' | 'quiz' | 'loading' | 'results';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('hero');
  const [results, setResults] = useState<Tool[]>([]);
  const [answers, setAnswers] = useState<Answers | null>(null);

  const handleStart = () => setPhase('quiz');

  const handleComplete = (ans: Answers) => {
    setAnswers(ans);
    setPhase('loading');
    setTimeout(() => {
      const scored = scoreTools(ans);
      setResults(scored);
      setPhase('results');
    }, 1600);
  };

  const handleReset = () => {
    setPhase('hero');
    setResults([]);
    setAnswers(null);
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {phase === 'hero' && (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onStart={handleStart} />
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Quiz onComplete={handleComplete} />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative w-16 h-16">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-100" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Finding your matches…</p>
              <p className="text-sm text-gray-400 mt-1">Checking safety ratings and age-appropriateness</p>
            </div>
          </motion.div>
        )}

        {phase === 'results' && answers && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Results tools={results} answers={answers} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
