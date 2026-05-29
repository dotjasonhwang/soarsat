export type SATCategory = 'prime' | 'senior_prime' | 'early_bird' | 'too_early' | 'past';
export type SATFlair = 'ed_deadline' | 'rd_deadline';
export type GradeKey = 'grade9' | 'grade10' | 'grade11' | 'grade12';

export interface MonthData {
  month: string;
  shortMonth: string;
  sat: boolean;
  psat: boolean; // PSAT/NMSQT also offered this month (currently October only)
  notes: Partial<Record<GradeKey, string>>;
}

// Grade 12 SAT scores only arrive in time for applications through December
const SENIOR_SAT_PRIME = new Set(['August', 'September', 'October', 'November', 'December']);

export function getSATCategory(month: string, gradeNum: number): SATCategory {
  if (gradeNum > 12) return 'past';
  if (gradeNum < 10) return 'too_early';
  if (gradeNum === 10) return 'early_bird';
  if (gradeNum === 11) return 'prime';
  return SENIOR_SAT_PRIME.has(month) ? 'senior_prime' : 'past';
}

export function getSATFlair(month: string, gradeNum: number): SATFlair | null {
  if (gradeNum !== 12) return null;
  if (month === 'October') return 'ed_deadline';
  if (month === 'December') return 'rd_deadline';
  return null;
}

export const SAT_CATEGORY_LABELS: Record<SATCategory, string> = {
  prime: 'Prime Testing Window',
  senior_prime: 'Senior Testing Window',
  early_bird: 'Early Testing',
  too_early: 'Too Early',
  past: 'After Application Deadlines',
};

export const SAT_FLAIR_LABELS: Record<SATFlair, string> = {
  ed_deadline: 'Last date for Early Decision/Action scores',
  rd_deadline: 'Last date for Regular Decision scores',
};

export const GRADE_LABELS: Record<GradeKey, string> = {
  grade9: '9th Grade',
  grade10: '10th Grade',
  grade11: '11th Grade',
  grade12: '12th Grade',
};

export const SCHOOL_YEAR_MONTHS: MonthData[] = [
  {
    month: 'August',
    shortMonth: 'Aug',
    sat: true,
    psat: false,
    notes: {
      grade11: 'Rising juniors trying to finish testing early.',
      grade12: 'Rising seniors trying to boost scores before applications open.',
    },
  },
  {
    month: 'September',
    shortMonth: 'Sep',
    sat: true,
    psat: false,
    notes: {
      grade11: "Very early in junior year — most students aren't ready yet.",
      grade12: "Good early shot for seniors who didn't test over the summer.",
    },
  },
  {
    month: 'October',
    shortMonth: 'Oct',
    sat: true,
    psat: true,
    notes: {
      grade11: 'PSAT/NMSQT is this month — most juniors prioritize it over the SAT.',
    },
  },
  {
    month: 'November',
    shortMonth: 'Nov',
    sat: true,
    psat: false,
    notes: {
      grade11: 'Early in the junior year curriculum for most students.',
      grade12: 'Results arrive in time for Regular Decision.',
    },
  },
  {
    month: 'December',
    shortMonth: 'Dec',
    sat: true,
    psat: false,
    notes: {
      grade11: 'Good starting point for highly prepared juniors.',
    },
  },
  {
    month: 'January',
    shortMonth: 'Jan',
    sat: false,
    psat: false,
    notes: {},
  },
  {
    month: 'February',
    shortMonth: 'Feb',
    sat: false,
    psat: false,
    notes: {},
  },
  {
    month: 'March',
    shortMonth: 'Mar',
    sat: true,
    psat: false,
    notes: {
      grade10: 'Only for advanced students tracking early.',
      grade11: 'The premier spot for a first official attempt.',
    },
  },
  {
    month: 'April',
    shortMonth: 'Apr',
    sat: false,
    psat: false,
    notes: {},
  },
  {
    month: 'May',
    shortMonth: 'May',
    sat: true,
    psat: false,
    notes: {
      grade10: 'Only for advanced students wanting an early jump.',
      grade11: 'Prime spot for a first attempt or second retake.',
    },
  },
  {
    month: 'June',
    shortMonth: 'Jun',
    sat: true,
    psat: false,
    notes: {
      grade11: 'Excellent final chance before summer break.',
    },
  },
  {
    month: 'July',
    shortMonth: 'Jul',
    sat: false,
    psat: false,
    notes: {},
  },
];

export function getCalendarYear(month: string, startYear: number): number {
  const fallMonths = ['August', 'September', 'October', 'November', 'December'];
  return fallMonths.includes(month) ? startYear : startYear + 1;
}

// Returns the actual grade number (e.g. 9, 10, 11, 12, 13) for a student in a given school year.
// Values outside 10–12 are handled by getSATCategory ('too_early' or 'past').
export function getGradeNum(schoolYearStart: number, gradYear: number): number {
  return 12 - (gradYear - (schoolYearStart + 1));
}

export function gradeNumToKey(gradeNum: number): GradeKey | null {
  if (gradeNum === 9) return 'grade9';
  if (gradeNum === 10) return 'grade10';
  if (gradeNum === 11) return 'grade11';
  if (gradeNum === 12) return 'grade12';
  return null;
}
