import { normalizePasswordInput } from './normalize';

describe('normalizePasswordInput', () => {
  test('trims whitespace', () => {
    expect(normalizePasswordInput('  secret  ')).toBe('secret');
  });
});
