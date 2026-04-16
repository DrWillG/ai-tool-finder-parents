'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const stats = [
    { value: '80%', label: 'of parents worry about AI over-reliance' },
    { value: '75%', label: 'want guidance on AI for their kids' },
    { value: '24', label: 'curated, safety-rated tools' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex flex-col items-center px-4 py-10">
      {/* Logo header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Image
          src="/logo.png"
          alt="Right Path Educational Consulting"
          width={320}
          height={100}
          priority
          className="h-20 w-auto object-contain"
        />
      </motion.div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
          style={{ backgroundColor: '#F3EDF9', color: '#6B35A0' }}
        >
          <span>🛡️</span>
          Built for parents, informed by parents
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight mb-4"
        >
          Find the right AI tools{' '}
          <span style={{ color: '#6B35A0' }}>for your child</span>
          {' '}— safely.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-500 text-center max-w-xl mb-4 leading-relaxed"
        >
          Answer 5 quick questions. Get matched to age-appropriate, safety-rated AI tools
          that build real skills — not shortcuts.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-gray-400 text-center mb-10"
        >
          Recommendations shaped by parent surveys from Blue Ridge Academy &amp; CAAASA Conference
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          onClick={onStart}
          className="px-8 py-4 text-white font-semibold text-lg rounded-2xl shadow-lg transition-all duration-200 flex items-center gap-2 mb-14"
          style={{ backgroundColor: '#C48A2A', boxShadow: '0 8px 24px rgba(196,138,42,0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a8741f')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C48A2A')}
        >
          Find tools for my child
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap gap-8 justify-center"
        >
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#6B35A0' }}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1 max-w-[140px] leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            Privacy &amp; safety first
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['COPPA Rated', 'FERPA Aware', 'Ad-Free Options', 'No Data Sold'].map((label) => (
              <span
                key={label}
                className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm"
              >
                ✓ {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tagline footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-sm italic"
          style={{ color: '#C48A2A' }}
        >
          Everyone deserves a right path!
        </motion.p>
      </div>
    </div>
  );
}
