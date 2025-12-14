export interface CharsetInfo {
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  poolSize: number;
}

export interface CrackTimeEstimates {
  onlineAttackThrottled: number; // Seconds
  offlineAttackSlowHash: number; // Seconds (e.g. bcrypt)
  offlineAttackFastHash: number; // Seconds (e.g. MD5)
}

export interface AnalysisResult {
  passwordLength: number;
  entropyBits: number;
  charset: CharsetInfo;
  crackTimes: CrackTimeEstimates;
  score: number; // 0-4
}

export interface FeedbackResult {
  warning: string | null;
  suggestions: string[];
}
