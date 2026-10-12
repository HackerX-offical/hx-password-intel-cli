import { AnalysisResult } from '../types';
import { analyzeCharset } from './charset';
import { calculateEntropyBits } from './entropy';
import { estimateCrackTime } from './crack-time';
import { scoreFromEntropy } from './scoring';

export class Analyzer {
  public static analyze(password: string): AnalysisResult {
    const charset = analyzeCharset(password);
    const entropyBits = calculateEntropyBits(password.length, charset.poolSize);
    const crackTimes = estimateCrackTime(entropyBits);
    const score = scoreFromEntropy(entropyBits);

    return {
      passwordLength: password.length,
      entropyBits,
      charset,
      crackTimes,
      score,
    };
  }
}
