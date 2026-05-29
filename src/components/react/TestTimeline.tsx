import { useState } from 'react';
import {
  SCHOOL_YEAR_MONTHS,
  getSATCategory,
  getSATFlair,
  getGradeNum,
  gradeNumToKey,
  GRADE_LABELS,
} from '~/data/satCalendar';

const MONTHS_JAN_BASED = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const NOW = new Date();
const CURRENT_MONTH_IDX = NOW.getMonth();
const CURRENT_YEAR_NUM = NOW.getFullYear();
const CURRENT_MONTH_NUM = CURRENT_MONTH_IDX + 1;
const CURRENT_SCHOOL_YEAR_START = CURRENT_MONTH_NUM >= 8 ? CURRENT_YEAR_NUM : CURRENT_YEAR_NUM - 1;
// May–Jul: school year is winding down, current seniors are essentially done — advance to next class
const IS_LATE_SCHOOL_YEAR = CURRENT_MONTH_NUM >= 5 && CURRENT_MONTH_NUM < 8;
const SENIOR_GRAD_YEAR = CURRENT_SCHOOL_YEAR_START + 1 + (IS_LATE_SCHOOL_YEAR ? 1 : 0);
const EFFECTIVE_SCHOOL_YEAR_START = CURRENT_SCHOOL_YEAR_START + (IS_LATE_SCHOOL_YEAR ? 1 : 0);

const GRAD_YEAR_OPTIONS = [
  { year: SENIOR_GRAD_YEAR },
  { year: SENIOR_GRAD_YEAR + 1 },
  { year: SENIOR_GRAD_YEAR + 2 },
  { year: SENIOR_GRAD_YEAR + 3 },
];

const GRADE_COPY: Record<number, string> = {
  9:  "Most freshmen aren't ready for a serious SAT attempt — and that's completely normal. The best investment right now is building strong math and reading skills in class. Junior year will be your prime window, and the foundational work you do now makes that prep much easier. Advanced students can consider taking an early test in 10th grade as well.",
  10: "Some sophomores take the SAT for an early baseline. However, many students find their scores naturally improve in Junior year with an extra year of school. For students looking to be extra ready, this is a good time to start unhurried prep and get familiar with the format.",
  11: "Junior year is the prime window for most students. If schedule allows, start focused prep 3 months before your target test date — enough time to see real improvement without burning out. Fall of Junior year is a great time for a first benchmark test, and Spring of junior year is the sweet spot for aiming for your target scores. The Fall of senior year has a few test dates for last-minute improvements, but many students appreciate finishing the SAT before Senior year so they can focus on college applications.",
  12: "Seniors have 5 SAT tests in their Fall semester. October is the last date guaranteed before most Early Decision deadlines, and December is the last date for most Regular Decision deadlines. We suggest seniors to take the SAT as early as they can to get scores back in time for their applications, and to leave room for retakes if needed.",
};

interface MonthCell {
  month: string;
  shortMonth: string;
  year: number;
  isSat: boolean;
}

// Rolling 12-month window starting from the current calendar month.
const TWELVE_MONTH_WINDOW: MonthCell[] = Array.from({ length: 12 }, (_, i) => {
  const totalIdx = CURRENT_MONTH_IDX + i;
  const idx = totalIdx % 12;
  const yearOffset = Math.floor(totalIdx / 12);
  const monthName = MONTHS_JAN_BASED[idx];
  const data = SCHOOL_YEAR_MONTHS.find((m) => m.month === monthName);
  return {
    month: monthName,
    shortMonth: data?.shortMonth ?? monthName.slice(0, 3),
    year: CURRENT_YEAR_NUM + yearOffset,
    isSat: data?.sat ?? false,
  };
});

function getSchoolYearStartForDate(month: string, year: number): number {
  const idx = MONTHS_JAN_BASED.indexOf(month);
  return idx >= 7 ? year : year - 1;
}

function getGradeForDate(month: string, year: number, gradYear: number): number {
  return getGradeNum(getSchoolYearStartForDate(month, year), gradYear);
}

// Returns prep months from max(today, testMonth - 3) up to the month before the test.
function getPrepMonths(testMonth: string, testYear: number) {
  const testIdx = MONTHS_JAN_BASED.indexOf(testMonth);
  const testAbs = testYear * 12 + testIdx;
  const threeBeforeAbs = testAbs - 3;
  const todayAbs = CURRENT_YEAR_NUM * 12 + CURRENT_MONTH_IDX;
  const startAbs = Math.max(threeBeforeAbs, todayAbs);
  const months: { month: string; year: number; shortMonth: string }[] = [];
  for (let abs = startAbs; abs < testAbs; abs++) {
    const idx = ((abs % 12) + 12) % 12;
    const year = Math.floor(abs / 12);
    const name = MONTHS_JAN_BASED[idx];
    const data = SCHOOL_YEAR_MONTHS.find((m) => m.month === name);
    months.push({ month: name, year, shortMonth: data?.shortMonth ?? name.slice(0, 3) });
  }
  return months;
}

function cardClass(isSelected: boolean, isClickable: boolean): string {
  if (isSelected) return 'bg-emerald-500 text-white border-2 border-emerald-500 shadow-md cursor-pointer';
  if (isClickable) return 'border-2 border-emerald-500/30 text-foreground cursor-pointer hover:border-emerald-500/70 hover:bg-emerald-500/5';
  return 'border border-border/20 text-muted/40';
}

export default function TestTimeline() {
  const [gradYear, setGradYear] = useState(GRAD_YEAR_OPTIONS[0].year);
  const [selectedTest, setSelectedTest] = useState<{ month: string; year: number; flair: ReturnType<typeof getSATFlair> } | null>(null);

  function handleGradYearChange(year: number) {
    setGradYear(year);
    setSelectedTest(null);
  }

  const currentGrade = Math.min(12, Math.max(9, getGradeNum(EFFECTIVE_SCHOOL_YEAR_START, gradYear)));
  const schoolYearStart = gradYear - (13 - currentGrade);
  const yearRangeLabel = `${schoolYearStart}–${String(schoolYearStart + 1).slice(2)}`;
  const gradeKey = gradeNumToKey(currentGrade);
  const gradeLabel = gradeKey ? GRADE_LABELS[gradeKey] : '';

  // SAT month cards from the 12-month window, with per-card grade context for flair/clickability.
  const satCards = TWELVE_MONTH_WINDOW.filter((m) => m.isSat).map((card) => {
    const cardGrade = getGradeForDate(card.month, card.year, gradYear);
    const category = getSATCategory(card.month, cardGrade);
    const flair = getSATFlair(card.month, cardGrade);
    const isClickable = category !== 'past';
    return { ...card, cardGrade, category, flair, isClickable };
  });

  const prepMonths = selectedTest ? getPrepMonths(selectedTest.month, selectedTest.year) : [];
  const firstPrepMonth = prepMonths[0];

  function handleCardClick(month: string, year: number, flair: ReturnType<typeof getSATFlair>) {
    if (selectedTest?.month === month && selectedTest?.year === year) {
      setSelectedTest(null);
    } else {
      setSelectedTest({ month, year, flair });
    }
  }

  // Result-view timeline strip: 12 cells with prep span tinted and test month bold.
  const timelineCells = TWELVE_MONTH_WINDOW.map((cell) => {
    const isTest = !!(selectedTest && selectedTest.month === cell.month && selectedTest.year === cell.year);
    const isPrep = prepMonths.some((p) => p.month === cell.month && p.year === cell.year);
    return { ...cell, isTest, isPrep };
  });

  return (
    <div className="w-full">
      {/* Grad year selector */}
      <div className="mb-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-3xl font-medium text-muted">I graduate in</span>
          <div className="flex flex-wrap justify-center gap-2">
            {GRAD_YEAR_OPTIONS.map(({ year }) => (
              <button
                key={year}
                onClick={() => handleGradYearChange(year)}
                className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-base md:text-lg transition-all duration-200 cursor-pointer ${
                  gradYear === year
                    ? 'bg-primary text-on-primary'
                    : 'border border-border text-muted/60 hover:border-primary/50 hover:text-muted'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grade label + copy */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-2">
          {gradeLabel} in {yearRangeLabel}
        </p>
        <p className="text-base text-muted leading-relaxed">{GRADE_COPY[currentGrade]}</p>
      </div>

      {/* SAT month cards (selection) */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground mb-3">Upcoming Test Dates</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {satCards.map((card) => {
            const isSelected =
              selectedTest?.month === card.month && selectedTest?.year === card.year;
            return (
              <button
                key={`${card.month}-${card.year}`}
                disabled={!card.isClickable}
                onClick={() => handleCardClick(card.month, card.year, card.flair)}
                className={`relative h-16 rounded-lg flex flex-col items-center justify-center transition-all select-none ${cardClass(isSelected, card.isClickable)}`}
              >
                <span className="text-xs font-bold leading-none">{card.shortMonth.toUpperCase()}</span>
                <span className="text-[10px] opacity-60 leading-none mt-1">{card.year}</span>
                {card.flair && card.isClickable && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold leading-none px-2 py-1 rounded-full bg-amber-400 text-black">
                    {card.flair === 'ed_deadline' ? 'ED' : 'RD'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result view: timeline visualization (or grade-9 message) */}
      {selectedTest && (
        currentGrade === 9 ? (
          <div className="mt-5 p-5 rounded-xl border border-border/30 bg-surface-elevated">
            <p className="text-sm text-muted leading-relaxed">
              We suggest most 9th graders to focus on building a strong foundation. So this is the year to focus on school or start some introductory prep. Most students take their first official test in 10th or 11th grade.
            </p>
          </div>
        ) : (
          <div className="mt-6 p-5 rounded-xl border border-border/30 bg-surface-elevated">
            <p className="text-[10px] font-semibold text-muted/60 uppercase tracking-widest mb-4">
              Your prep window
            </p>

            {/* 12-month timeline strip — prep span tinted, test month bold */}
            <div className="grid grid-cols-12 gap-0.5 mb-2">
              {timelineCells.map((cell, i) => {
                const prev = timelineCells[i - 1];
                const next = timelineCells[i + 1];
                const prepLeftConnects = cell.isPrep && prev?.isPrep;
                const prepRightConnects = cell.isPrep && (next?.isPrep || next?.isTest);
                let bg = 'bg-border/5 text-muted/40';
                if (cell.isTest) bg = 'bg-emerald-500 text-white font-bold shadow-sm';
                else if (cell.isPrep) bg = 'bg-emerald-500/20 text-foreground';
                let rounded = 'rounded-md';
                if (cell.isPrep && !cell.isTest) {
                  rounded = `${prepLeftConnects ? '' : 'rounded-l-md'} ${prepRightConnects ? '' : 'rounded-r-md'}`;
                }
                return (
                  <div
                    key={`${cell.month}-${cell.year}`}
                    className={`h-11 flex flex-col items-center justify-center text-[9px] leading-none transition-all ${bg} ${rounded}`}
                  >
                    <span className="font-bold">{cell.shortMonth.toUpperCase()}</span>
                    <span className="opacity-60 mt-0.5 text-[8px]">{String(cell.year).slice(2)}</span>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
                              {selectedTest.flair && (
                <> For most schools, this is the last month to take and get results in time for {selectedTest.flair === 'ed_deadline' ? 'Early Decision' : 'Regular Decision'} applications.</>
              )}
              {firstPrepMonth ? (
                <>Start prepping in <span className="font-semibold text-foreground">{firstPrepMonth.month} {firstPrepMonth.year}</span> ahead of the test in <span className="font-semibold text-foreground">{selectedTest.month} {selectedTest.year}</span>.</>
              ) : (
                <>Your test is in <span className="font-semibold text-foreground">{selectedTest.month} {selectedTest.year}</span>.</>
              )}
              
            </p>
          </div>
        )
      )}

      {/* CTA */}
      <div className="mt-6 flex flex-col items-center gap-3 text-center">
        <p className="text-base text-muted">
          {selectedTest && currentGrade >= 10
            ? `Ready to start prep for ${selectedTest.month} ${selectedTest.year}?`
            : 'Want expert guidance on your SAT prep?'}
        </p>
        <a
          href="tel:8329009422"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base transition-all ${
            selectedTest && currentGrade >= 10
              ? 'bg-primary text-on-primary hover:opacity-90'
              : 'border border-primary text-primary hover:bg-primary hover:text-on-primary'
          }`}
        >
          Call Today
        </a>
        <p className="text-sm text-muted/60">
          Exact test dates vary year to year.{' '}
          <a
            href="https://satsuite.collegeboard.org/sat/dates-deadlines"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted"
          >
            View official dates on College Board
          </a>
        </p>
      </div>
    </div>
  );
}
