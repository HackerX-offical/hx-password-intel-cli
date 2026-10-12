import { Analyzer } from './Analyzer';

describe('Analyzer', () => {
  it('scores empty password as very weak', () => {
    const r = Analyzer.analyze('');
    expect(r.entropyBits).toBe(0);
    expect(r.score).toBe(0);
  });

  it('increases entropy with charset diversity', () => {
    const simple = Analyzer.analyze('aaaaaa');
    const mixed = Analyzer.analyze('Aa1!Aa1!');
    expect(mixed.entropyBits).toBeGreaterThan(simple.entropyBits);
  });

  it('estimates crack times monotonically with entropy', () => {
    const weak = Analyzer.analyze('abc');
    const strong = Analyzer.analyze('Tr0ub4dor&3!');
    expect(strong.crackTimes.offlineAttackFastHash).toBeGreaterThan(
      weak.crackTimes.offlineAttackFastHash,
    );
  });
});
