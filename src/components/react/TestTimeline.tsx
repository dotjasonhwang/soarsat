import { useState } from 'react';
import {
  MONTHS_JAN_BASED,
  getMonthData,
  getSATFlair,
  getGradeNum,
  getGradeForDate,
  getSchoolYearStartFromGrade,
  gradeNumToKey,
  GRADE_LABELS,
} from '~/data/satCalendar';

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
  10: "Some sophomores take the SAT for an early baseline. However, many students find their scores naturally improve in Junior year with an extra year of school. The bottom line is that taking the SAT in 10th grade is not necessary, but can often be helpful. This is a chance to get familiar with the test format and identify areas of improvement early.",
  11: "Junior year is the prime window for most students. If schedule allows, start focused prep 3 months before your target test date — enough time to see real improvement without burning out. Fall of Junior year is a great time for a first benchmark test, and Spring of junior year is the sweet spot for aiming for your target scores. The Fall of senior year has a few test dates for last-minute improvements, but many students appreciate finishing the SAT before Senior year so they can focus on college applications.",
  12: "Seniors have 5 SAT tests in their Fall semester. October is the last date guaranteed before most Early Decision deadlines, and December is the last date for most Regular Decision deadlines. We suggest seniors to take the SAT as early as they can to get scores back in time for their applications, and to leave room for retakes if needed.",
};

interface MonthCell {
  month: string;
  shortMonth: string;
  year: number;
  isSat: boolean;
}

// Rolling 12-month window starting the month AFTER the current calendar month.
const TWELVE_MONTH_WINDOW: MonthCell[] = Array.from({ length: 12 }, (_, i) => {
  const totalIdx = CURRENT_MONTH_IDX + 1 + i;
  const idx = totalIdx % 12;
  const yearOffset = Math.floor(totalIdx / 12);
  const monthName = MONTHS_JAN_BASED[idx];
  const data = getMonthData(monthName);
  return {
    month: monthName,
    shortMonth: data?.shortMonth ?? monthName.slice(0, 3),
    year: CURRENT_YEAR_NUM + yearOffset,
    isSat: data?.sat ?? false,
  };
});

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
    const data = getMonthData(name);
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
  const [selectedTest, setSelectedTest] = useState<{ month: string; year: number; flair: ReturnType<typeof getSATFlair>; isPastSenior: boolean } | null>(null);

  function handleGradYearChange(year: number) {
    setGradYear(year);
    setSelectedTest(null);
  }

  const currentGrade = Math.min(12, Math.max(9, getGradeNum(EFFECTIVE_SCHOOL_YEAR_START, gradYear)));
  const schoolYearStart = getSchoolYearStartFromGrade(gradYear, currentGrade);
  const yearRangeLabel = `${schoolYearStart}–${String(schoolYearStart + 1).slice(2)}`;
  const gradeKey = gradeNumToKey(currentGrade);
  const gradeLabel = gradeKey ? GRADE_LABELS[gradeKey] : '';

  // SAT month cards from the 12-month window, with per-card grade context for flair/clickability.
  const satCards = TWELVE_MONTH_WINDOW.filter((m) => m.isSat).map((card) => {
    const cardGrade = getGradeForDate(card.month, card.year, gradYear);
    const flair = getSATFlair(card.month, cardGrade);
    // Grade 12 Jan–Jul = past senior testing window (still clickable to explain); grade >12 = post-grad (hide).
    const isPastSenior = cardGrade === 12 && !['August', 'September', 'October', 'November', 'December'].includes(card.month);
    const isClickable = cardGrade <= 12;
    return { ...card, cardGrade, flair, isClickable, isPastSenior };
  });

  const prepMonths = selectedTest ? getPrepMonths(selectedTest.month, selectedTest.year) : [];
  const firstPrepMonth = prepMonths[0];

  const selectedTestGrade = selectedTest
    ? getGradeForDate(selectedTest.month, selectedTest.year, gradYear)
    : null;
  const selectedNote = (() => {
    if (!selectedTest || selectedTest.isPastSenior || selectedTestGrade === null) return null;
    const key = gradeNumToKey(selectedTestGrade);
    if (!key) return null;
    return getMonthData(selectedTest.month)?.notes[key] ?? null;
  })();

  function handleCardClick(month: string, year: number, flair: ReturnType<typeof getSATFlair>, isPastSenior: boolean) {
    if (selectedTest?.month === month && selectedTest?.year === year) {
      setSelectedTest(null);
    } else {
      setSelectedTest({ month, year, flair, isPastSenior });
    }
  }

  return (
    <div className="w-full">
      {/* Grad year selector */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex flex-col items-center gap-3 px-6 py-4 rounded-2xl border border-border/40 bg-surface-elevated/50">
          <span className="text-sm font-semibold text-muted/70 uppercase tracking-widest">
            I graduate in
          </span>
          <div className="flex flex-nowrap justify-center gap-1.5 sm:gap-2">
            {GRAD_YEAR_OPTIONS.map(({ year }) => (
              <button
                key={year}
                onClick={() => handleGradYearChange(year)}
                className={`px-2.5 py-1 sm:px-3 md:px-4 md:py-1.5 rounded-full font-bold text-base sm:text-xl md:text-2xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  gradYear === year
                    ? 'bg-primary text-on-primary shadow-md'
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
                onClick={() => handleCardClick(card.month, card.year, card.flair, card.isPastSenior)}
                className={`relative h-16 rounded-lg flex flex-col items-center justify-center transition-all select-none ${cardClass(isSelected, card.isClickable)}`}
              >
                <span className="text-xs font-bold leading-none">{card.shortMonth.toUpperCase()}</span>
                <span className="text-[10px] opacity-60 leading-none mt-1">{card.year}</span>
                {card.flair && card.isClickable && (
                  <span
                    className={`absolute -top-2.5 -right-2.5 text-xs font-bold leading-none px-2.5 py-1.5 rounded-full text-white ${
                      card.flair === 'ed_deadline' ? 'bg-amber-700' : 'bg-rose-700'
                    }`}
                  >
                    {card.flair === 'ed_deadline' ? 'ED' : 'RD'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result view: unified detail panel */}
      {selectedTest && (
        <div className="mt-6 p-5 rounded-xl border border-border/30 bg-surface-elevated">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
            {selectedTest.month} {selectedTest.year}
          </h3>
          <p className="text-base text-muted leading-relaxed">
            {selectedTest.isPastSenior ? (
              <>These dates are past the application window for students applying to college for {gradYear}.</>
            ) : currentGrade === 9 ? (
              <>This is very early for the SAT — most freshmen aren't ready yet.</>
            ) : firstPrepMonth ? (
              <>Start prepping in <span className="font-semibold text-foreground">{firstPrepMonth.month} {firstPrepMonth.year}</span> for this test date.</>
            ) : (
              <>This is the next available test date.</>
            )}
          </p>
          {selectedTest.flair && !selectedTest.isPastSenior && (
            <p
              className={`mt-3 text-sm leading-relaxed italic ${
                selectedTest.flair === 'ed_deadline'
                  ? 'text-amber-700 dark:text-amber-300'
                  : 'text-rose-700 dark:text-rose-300'
              }`}
            >
              For most schools, this is the last month to take and get results in time for {selectedTest.flair === 'ed_deadline' ? 'Early Decision' : 'Regular Decision'} applications.
            </p>
          )}
          {selectedNote && (
            <p className="mt-3 text-sm text-muted/80 leading-relaxed italic">
              {selectedNote}
            </p>
          )}
        </div>
      )}

        <p className="mt-4 text-sm text-muted/60">
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
  );
}
