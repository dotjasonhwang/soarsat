import { describe, it, expect } from 'vitest';
import { getCurrentYear, formatDate } from './utils';

describe('Utils Functions', () => {
  describe('getCurrentYear', () => {
    it('should return current year as number', () => {
      const year = getCurrentYear();
      expect(typeof year).toBe('number');
      expect(year).toBeGreaterThan(2020);
      expect(year).toBeLessThan(3000);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toBe('Dec 25, 2023');
    });

    it('should handle string date input', () => {
      const formatted = formatDate('2023-01-01');
      expect(formatted).toBe('Jan 1, 2023');
    });

    it('should handle different date formats', () => {
      expect(formatDate('2023-06-15')).toBe('Jun 15, 2023');
      expect(formatDate('2023-12-31')).toBe('Dec 31, 2023');
    });
  });
});
