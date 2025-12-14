import { AnalysisResult, CharsetInfo, CrackTimeEstimates } from "../types";

export class Analyzer {
  private static readonly POOL_LOWERCASE = 26;
  private static readonly POOL_UPPERCASE = 26;
  private static readonly POOL_NUMBERS = 10;
  private static readonly POOL_SYMBOLS = 32; // Approx common symbols

  public static analyze(password: string): AnalysisResult {
    const charset = this.getCharacterSet(password);
    const entropyBits = this.calculateEntropy(
      password.length,
      charset.poolSize
    );
    const crackTimes = this.estimateCrackTime(entropyBits);
    const score = this.calculateScore(entropyBits);

    return {
      passwordLength: password.length,
      entropyBits,
      charset,
      crackTimes,
      score,
    };
  }

  private static getCharacterSet(password: string): CharsetInfo {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);

    let poolSize = 0;
    if (hasLowercase) poolSize += this.POOL_LOWERCASE;
    if (hasUppercase) poolSize += this.POOL_UPPERCASE;
    if (hasNumbers) poolSize += this.POOL_NUMBERS;
    if (hasSymbols) poolSize += this.POOL_SYMBOLS;

    // Fallback for empty or unknown char types if any
    if (poolSize === 0 && password.length > 0) poolSize = 1;

    return { hasLowercase, hasUppercase, hasNumbers, hasSymbols, poolSize };
  }

  private static calculateEntropy(length: number, poolSize: number): number {
    if (length === 0 || poolSize === 0) return 0;
    // Entropy = L * log2(N)
    const entropy = length * Math.log2(poolSize);
    return Number(entropy.toFixed(2));
  }

  private static estimateCrackTime(entropy: number): CrackTimeEstimates {
    // Guesses required is roughly 2^(entropy - 1) on average.
    // Worst case 2^entropy. Let's use 2^(entropy-1) for average time to crack.
    const guesses = Math.pow(2, entropy - 1);

    // Rates (guesses per second)
    const rateOnlineThrottled = 100 / 3600; // 100 guesses per hour (~0.027/sec)
    const rateOfflineSlow = 1e4; // 10k/sec (e.g. strong bcrypt)
    const rateOfflineFast = 1e10; // 10B/sec (e.g. fast MD5/GPU cluster)

    return {
      onlineAttackThrottled: guesses / rateOnlineThrottled,
      offlineAttackSlowHash: guesses / rateOfflineSlow,
      offlineAttackFastHash: guesses / rateOfflineFast,
    };
  }

  private static calculateScore(entropy: number): number {
    if (entropy < 28) return 0; // Very Weak
    if (entropy < 36) return 1; // Weak
    if (entropy < 60) return 2; // Reasonable
    if (entropy < 128) return 3; // Strong
    return 4; // Very Strong
  }
}
