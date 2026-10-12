/** Normalize password input for analysis (trim only; never log raw secrets). */
export function normalizePasswordInput(input: string): string {
  return input.trim();
}
