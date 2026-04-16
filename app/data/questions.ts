export interface QuizOption {
  value: string;
  label: string;
  description: string;
  emoji: string;
}

export interface QuizStep {
  id: string;
  question: string;
  subtext: string;
  options: QuizOption[];
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'grade',
    question: "What grade is your child in?",
    subtext: "We'll match tools to their age and skill level.",
    options: [
      { value: 'tk2', label: 'TK – 2nd', description: 'Ages 5–8', emoji: '🌱' },
      { value: '35', label: '3rd – 5th', description: 'Ages 8–11', emoji: '📚' },
      { value: '68', label: '6th – 8th', description: 'Ages 11–14', emoji: '🔬' },
      { value: '912', label: '9th – 12th', description: 'Ages 14–18', emoji: '🎓' },
    ],
  },
  {
    id: 'subject',
    question: "What do you most want to support?",
    subtext: "Pick the area where your child needs the most help or enrichment.",
    options: [
      { value: 'math', label: 'Math', description: 'Arithmetic, algebra, geometry, and beyond', emoji: '➕' },
      { value: 'reading', label: 'Reading & Writing', description: 'Comprehension, vocabulary, and writing skills', emoji: '📖' },
      { value: 'science', label: 'Science & Research', description: 'STEM concepts and research skills', emoji: '🔭' },
      { value: 'creative', label: 'Creative & Future Skills', description: 'Coding, design, music, and career readiness', emoji: '🎨' },
    ],
  },
  {
    id: 'goal',
    question: "What's your main goal?",
    subtext: "Be honest — there's no wrong answer here.",
    options: [
      { value: 'tutoring', label: 'Extra tutoring & homework help', description: 'My child struggles and needs support outside of school', emoji: '🤝' },
      { value: 'career', label: 'Building future-ready skills', description: 'I want my child prepared for tomorrow\'s jobs and technology', emoji: '🚀' },
      { value: 'creative', label: 'Creative enrichment', description: 'My child learns best through making things', emoji: '✨' },
      { value: 'safety', label: 'Keeping my child safe with AI', description: 'I want to monitor usage and find age-appropriate tools', emoji: '🛡️' },
    ],
  },
  {
    id: 'concern',
    question: "What's your biggest concern about AI?",
    subtext: "This helps us prioritize tools that address what worries you most.",
    options: [
      { value: 'overreliance', label: 'Over-reliance / not doing own work', description: 'I worry AI will do the thinking for my child', emoji: '🧠' },
      { value: 'integrity', label: 'Academic integrity / cheating', description: 'I don\'t want AI to do homework or write essays for them', emoji: '✏️' },
      { value: 'privacy', label: 'Privacy & data security', description: 'I\'m concerned about what data these apps collect', emoji: '🔒' },
      { value: 'content', label: 'Inappropriate content', description: 'I worry about what my child might encounter', emoji: '🚧' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    subtext: "Many excellent tools are completely free.",
    options: [
      { value: 'free', label: 'Free only', description: 'Show me the best free tools available', emoji: '💚' },
      { value: 'low', label: 'Under $15/month', description: 'I\'m open to affordable subscriptions', emoji: '💛' },
      { value: 'premium', label: 'Premium is fine', description: 'I\'ll invest in the right tool for my child', emoji: '⭐' },
    ],
  },
];

export const GRADE_LABELS: Record<string, string> = {
  tk2: 'TK–2nd Grade',
  '35': '3rd–5th Grade',
  '68': '6th–8th Grade',
  '912': '9th–12th Grade',
};

export const SUBJECT_LABELS: Record<string, string> = {
  math: 'Math',
  reading: 'Reading & Writing',
  science: 'Science',
  creative: 'Creative & Future Skills',
  all: 'All Subjects',
};

export const GOAL_LABELS: Record<string, string> = {
  tutoring: 'Homework Help & Tutoring',
  career: 'Future-Ready Skills',
  creative: 'Creative Enrichment',
  safety: 'Safety & Monitoring',
};
