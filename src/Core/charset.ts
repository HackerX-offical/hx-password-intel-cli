import { CharsetInfo } from '../types';

const POOL_LOWERCASE = 26;
const POOL_UPPERCASE = 26;
const POOL_NUMBERS = 10;
const POOL_SYMBOLS = 32;

export function analyzeCharset(password: string): CharsetInfo {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let poolSize = 0;
  if (hasLowercase) poolSize += POOL_LOWERCASE;
  if (hasUppercase) poolSize += POOL_UPPERCASE;
  if (hasNumbers) poolSize += POOL_NUMBERS;
  if (hasSymbols) poolSize += POOL_SYMBOLS;
  if (poolSize === 0 && password.length > 0) poolSize = 1;

  return { hasLowercase, hasUppercase, hasNumbers, hasSymbols, poolSize };
}
