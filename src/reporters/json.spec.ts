import { Analyzer } from '../Core/Analyzer';
import { analysisToJson } from './json';

describe('analysisToJson', () => {
  test('serializes analyzer output', () => {
    const json = analysisToJson(Analyzer.analyze('test-pass-1234'));
    expect(JSON.parse(json).entropyBits).toBeGreaterThan(0);
  });
});
