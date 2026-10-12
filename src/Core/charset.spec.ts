import { analyzeCharset } from './charset';

describe('analyzeCharset', () => {
  test('detects mixed classes', () => {
    const c = analyzeCharset('Aa1!');
    expect(c.poolSize).toBeGreaterThan(26);
  });
});
