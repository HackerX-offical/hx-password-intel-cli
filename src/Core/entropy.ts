export function calculateEntropyBits(length: number, poolSize: number): number {
  if (length === 0 || poolSize === 0) return 0;
  return Number((length * Math.log2(poolSize)).toFixed(2));
}
