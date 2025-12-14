import { AnalysisResult, FeedbackResult } from "../types";

export class Feedback {
  public static getFeedback(result: AnalysisResult): FeedbackResult {
    const suggestions: string[] = [];
    let warning: string | null = null;

    if (result.score === 0)
      warning =
        "This password is very weak and vulnerable to instant cracking.";
    if (result.score === 1)
      warning = "This password is weak and could be cracked quickly.";

    if (result.passwordLength < 12) {
      suggestions.push("Increase the length to at least 12 characters.");
    }

    if (result.charset.poolSize < 50) {
      if (!result.charset.hasUppercase)
        suggestions.push("Add uppercase letters.");
      if (!result.charset.hasLowercase)
        suggestions.push("Add lowercase letters.");
      if (!result.charset.hasNumbers) suggestions.push("Add numbers.");
      if (!result.charset.hasSymbols)
        suggestions.push("Add special symbols (e.g. @, #, $).");
    }

    if (result.entropyBits < 50 && result.passwordLength >= 12) {
      suggestions.push(
        "Avoid common patterns or words. Use a passphrase with random words."
      );
    }

    return { warning, suggestions };
  }
}
