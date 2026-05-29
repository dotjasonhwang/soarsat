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
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11: 'This is a great test for students who have prepped over the summer.',
      grade12: 'Key test date for Seniors who prepped over the summer and want to get their goal scores.',
    },
  },
  {
    month: 'September',
    shortMonth: 'Sep',
    sat: true,
    psat: false,
    notes: {
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11: 'This is a great test for students who have prepped over the summer.',
      grade12: 'Key test date for Seniors who prepped over the summer and want to get their goal scores.',
    },
  },
  {
    month: 'October',
    shortMonth: 'Oct',
    sat: true,
    psat: true,
    notes: {
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11:
        'Schools administer the PSAT this month. If you have the bandwidth, you can definitely take both the PSAT and the SAT this month.',
    },
  },
  {
    month: 'November',
    shortMonth: 'Nov',
    sat: true,
    psat: false,
    notes: {
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11:
        'Good test month, especially if you completed Algebra 2 in 10th grade or earlier. Otherwise, a few math concepts may be challenging for current Algebra 2 students.',
      grade12: 'One of the last tests seniors can take before Regular Decision applications.',
    },
  },
  {
    month: 'December',
    shortMonth: 'Dec',
    sat: true,
    psat: false,
    notes: {
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11:
        'Good test month, especially if you completed Algebra 2 in 10th grade or earlier. Otherwise, a few math concepts may be challenging for current Algebra 2 students.',
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
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11: 'Prime testing window for Juniors, after finishing core concepts in school.',
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
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11: 'Prime testing window for Juniors, after finishing core concepts in school.',
    },
  },
  {
    month: 'June',
    shortMonth: 'Jun',
    sat: true,
    psat: false,
    notes: {
      grade10:
        'Most students find that performance for the SAT peaks in Junior & Senior year. Therefore, Sophomores can take the SAT with less pressure and get a head start in prep.',
      grade11: 'Prime testing window for Juniors, after finishing core concepts in school.',
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

// Calendar month order (January = 0).
export const MONTHS_JAN_BASED: readonly string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_DATA_BY_NAME: Map<string, MonthData> = new Map(SCHOOL_YEAR_MONTHS.map((m) => [m.month, m]));

export function getMonthData(name: string): MonthData | undefined {
  return MONTH_DATA_BY_NAME.get(name);
}

// Aug–Dec → school year starts in `year`; Jan–Jul → starts in `year - 1`.
export function getSchoolYearStartForDate(month: string, year: number): number {
  const idx = MONTHS_JAN_BASED.indexOf(month);
  return idx >= 7 ? year : year - 1;
}

export function getGradeForDate(month: string, year: number, gradYear: number): number {
  return getGradeNum(getSchoolYearStartForDate(month, year), gradYear);
}

// Returns the actual grade number (e.g. 9, 10, 11, 12, 13) for a student in a given school year.
// Values outside 10–12 are handled by getSATCategory ('too_early' or 'past').
export function getGradeNum(schoolYearStart: number, gradYear: number): number {
  return 12 - (gradYear - (schoolYearStart + 1));
}

// Inverse of getGradeNum: given a student's grad year and current grade, returns the school-year start.
export function getSchoolYearStartFromGrade(gradYear: number, grade: number): number {
  return gradYear + grade - 13;
}

export function gradeNumToKey(gradeNum: number): GradeKey | null {
  if (gradeNum === 9) return 'grade9';
  if (gradeNum === 10) return 'grade10';
  if (gradeNum === 11) return 'grade11';
  if (gradeNum === 12) return 'grade12';
  return null;
}
