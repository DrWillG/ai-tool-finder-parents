'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_STEPS } from '@/app/data/questions';
import { Answers } from '@/app/lib/scoreTools';

interface QuizProps {
  onComplete: (answers: Answers) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});

  const currentStep = QUIZ_STEPS[step];
  const totalSteps = QUIZ_STEPS.length;

  const handleSelect = (value: string) => {
    const key = currentStep.id as keyof Answers;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        onComplete(newAnswers as Answers);
      }
    }, 200);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex flex-col items-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Right Path Educational Consulting"
          width={220}
          height={70}
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Progress */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-sm text-gray-400">
            {step + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <motion.div
            className="h-1.5 rounded-full"
            style={{ backgroundColor: '#6B35A0' }}
            initial={false}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {currentStep.question}
            </h2>
            <p className="text-gray-500 text-base">{currentStep.subtext}</p>
          </div>

          <div className="grid gap-3">
            {currentStep.options.map((option) => {
              const isSelected = answers[currentStep.id as keyof Answers] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-center gap-4 group bg-white hover:shadow-sm"
                  style={isSelected
                    ? { borderColor: '#6B35A0', backgroundColor: '#F3EDF9' }
                    : { borderColor: '#e5e7eb' }
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#b89fd4';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-base" style={isSelected ? { color: '#6B35A0' } : { color: '#1f2937' }}>
                      {option.label}
                    </p>
                    <p className="text-sm mt-0.5" style={isSelected ? { color: '#9B6BC4' } : { color: '#6b7280' }}>
                      {option.description}
                    </p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                    style={isSelected
                      ? { borderColor: '#6B35A0', backgroundColor: '#6B35A0' }
                      : { borderColor: '#d1d5db' }
                    }
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
