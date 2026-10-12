import { calculateEntropyBits } from './entropy';

describe('calculateEntropyBits', () => {
  test('returns zero for empty input dimensions', () => {
    expect(calculateEntropyBits(0, 62)).toBe(0);
  });

  test('grows with length and pool', () => {
    expect(calculateEntropyBits(12, 62)).toBeGreaterThan(calculateEntropyBits(8, 26));
  });
});
