export function scoreFromEntropy(entropy: number): number {
  if (entropy < 28) return 0;
  if (entropy < 36) return 1;
  if (entropy < 60) return 2;
  if (entropy < 128) return 3;
  return 4;
}

export const SCORE_LABELS = ['Very Weak', 'Weak', 'Reasonable', 'Strong', 'Very Strong'] as const;

export function labelForScore(score: number): string {
  return SCORE_LABELS[Math.min(Math.max(score, 0), 4)] ?? 'Unknown';
}
