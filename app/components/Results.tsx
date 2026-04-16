'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tool } from '@/app/data/tools';
import { Answers } from '@/app/lib/scoreTools';
import ToolCard from './ToolCard';
import { GRADE_LABELS, GOAL_LABELS } from '@/app/data/questions';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
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
          {[
            { key: 'all', label: 'All results' },
            { key: 'free', label: '💚 Free only' },
            { key: 'buildsSkills', label: '🧠 Builds skills' },
            { key: 'coppa', label: '🔒 COPPA compliant' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === f.key
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
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
              className="mt-2 text-indigo-500 hover:underline text-sm"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 font-medium text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}
