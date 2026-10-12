import { CrackTimeEstimates } from '../types';

export function estimateCrackTime(entropy: number): CrackTimeEstimates {
  const guesses = Math.pow(2, entropy - 1);
  const rateOnlineThrottled = 100 / 3600;
  const rateOfflineSlow = 1e4;
  const rateOfflineFast = 1e10;

  return {
    onlineAttackThrottled: guesses / rateOnlineThrottled,
    offlineAttackSlowHash: guesses / rateOfflineSlow,
    offlineAttackFastHash: guesses / rateOfflineFast,
  };
}
