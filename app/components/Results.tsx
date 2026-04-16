'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tool } from '@/app/data/tools';
import { Answers } from '@/app/lib/scoreTools';
import ToolCard from './ToolCard';
import { GRADE_LABELS, GOAL_LABELS } from '@/app/data/questions';
import { BASE_PATH } from '@/app/lib/basePath';

interface ResultsProps {
  tools: Tool[];
  answers: Answers;
  onReset: () => void;
}

export default function Results({ tools, answers, onReset }: ResultsProps) {
  const [filter, setFilter] = useState<'all' | 'free' | 'buildsSkills' | 'coppa'>('all');

  const filtered = tools.filter((t) => {
    if (filter === 'free') return t.pt === 'free';
    if (filter === 'buildsSkills') return t.safety.buildsSkills;
    if (filter === 'coppa') return t.safety.coppa;
    return true;
  });

  const grade = GRADE_LABELS[answers.grade] ?? answers.grade;
  const goal = GOAL_LABELS[answers.goal] ?? answers.goal;

  const filters = [
    { key: 'all', label: 'All results' },
    { key: 'free', label: '💚 Free only' },
    { key: 'buildsSkills', label: '🧠 Builds skills' },
    { key: 'coppa', label: '🔒 COPPA compliant' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src={`${BASE_PATH}/logo.png`}
            alt="Right Path Educational Consulting"
            width={220}
            height={70}
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: '#F3EDF9', color: '#6B35A0' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tools.length} tools matched for your child
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Your personalized recommendations
          </h1>
          <p className="text-gray-500 text-lg">
            {grade} · {goal}
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
              style={filter === f.key
                ? { backgroundColor: '#6B35A0', color: 'white', borderColor: '#6B35A0' }
                : { backgroundColor: 'white', color: '#4b5563', borderColor: '#e5e7eb' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {filtered.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No tools match that filter.</p>
            <button
              onClick={() => setFilter('all')}
              className="mt-2 hover:underline text-sm"
              style={{ color: '#6B35A0' }}
            >
              Show all results
            </button>
          </div>
        )}

        {/* Survey credit note */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span>📊</span> Informed by real parent feedback
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            These recommendations are shaped by parent surveys from Blue Ridge Academy and the CAAASA Conference.
            The #1 concern parents shared: <strong>over-reliance on AI</strong> (80% of respondents).
            That&apos;s why we highlight tools that build real skills — not shortcuts.
          </p>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 font-medium text-sm hover:border-gray-300 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start over
          </button>
        </div>

        {/* Branded footer */}
        <div className="text-center mt-10 pt-8 border-t border-gray-100">
          <Image
            src={`${BASE_PATH}/logo.png`}
            alt="Right Path Educational Consulting"
            width={160}
            height={50}
            className="h-10 w-auto object-contain mx-auto mb-2 opacity-70"
          />
          <p className="text-xs italic" style={{ color: '#C48A2A' }}>Everyone deserves a right path!</p>
        </div>
      </div>
    </div>
  );
}
