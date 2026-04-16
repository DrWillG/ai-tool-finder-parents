'use client';

interface SafetyBadgeProps {
  coppa: boolean;
  adFree: boolean;
  ageMin: number;
  buildsSkills: boolean;
  compact?: boolean;
}

export default function SafetyBadge({
  coppa,
  adFree,
  ageMin,
  buildsSkills,
  compact = false,
}: SafetyBadgeProps) {
  const badges = [];

  if (buildsSkills) {
    badges.push({
      label: 'Builds Skills',
      color: 'bg-emerald-100 text-emerald-800',
      icon: '🧠',
    });
  }
  if (coppa) {
    badges.push({
      label: 'COPPA Compliant',
      color: 'bg-blue-100 text-blue-800',
      icon: '🔒',
    });
  }
  if (adFree) {
    badges.push({
      label: 'Ad-Free',
      color: 'bg-purple-100 text-purple-800',
      icon: '✓',
    });
  }
  if (ageMin > 0) {
    badges.push({
      label: `Ages ${ageMin}+`,
      color: 'bg-gray-100 text-gray-700',
      icon: '👤',
    });
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {badges.slice(0, 2).map((b) => (
          <span
            key={b.label}
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${b.color}`}
          >
            <span className="text-[10px]">{b.icon}</span>
            {b.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${b.color}`}
        >
          <span>{b.icon}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}
