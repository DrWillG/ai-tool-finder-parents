'use client';

import { motion } from 'framer-motion';
import { Tool } from '@/app/data/tools';
import { TOOL_COLORS } from '@/app/data/tools';
import SafetyBadge from './SafetyBadge';

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const color = TOOL_COLORS[tool.id] ?? '#6366f1';

  const ptLabel: Record<string, string> = {
    free: 'Free',
    freemium: 'Free to start',
    paid: 'Paid',
  };

  const ptColor: Record<string, string> = {
    free: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    freemium: 'bg-amber-50 text-amber-700 border-amber-200',
    paid: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {tool.i}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-base leading-tight">
                {tool.n}
              </h3>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${ptColor[tool.pt]}`}
              >
                {ptLabel[tool.pt]}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{tool.c}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
          {tool.d}
        </p>

        {/* Safety badges */}
        <div className="mb-4">
          <SafetyBadge
            coppa={tool.safety.coppa}
            adFree={tool.safety.adFree}
            ageMin={tool.safety.ageMin}
            buildsSkills={tool.safety.buildsSkills}
            compact
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Pricing</p>
            <p className="text-sm font-medium text-gray-700">{tool.p}</p>
          </div>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            Try it
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Review */}
        {tool.rv.quote && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < Math.round(tool.rv.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 ml-1">{tool.rv.source}</span>
            </div>
            <p className="text-xs text-gray-500 italic leading-relaxed">
              &ldquo;{tool.rv.quote}&rdquo;
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
