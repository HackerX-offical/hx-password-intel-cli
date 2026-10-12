import { labelForScore, scoreFromEntropy } from './scoring';

describe('scoring', () => {
  test('maps entropy to score buckets', () => {
    expect(scoreFromEntropy(10)).toBe(0);
    expect(scoreFromEntropy(80)).toBe(3);
  });

  test('labels scores', () => {
    expect(labelForScore(0)).toBe('Very Weak');
  });
});
