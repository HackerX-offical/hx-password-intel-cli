import { AnalysisResult } from '../types';

export function analysisToJson(result: AnalysisResult): string {
  return JSON.stringify(result, null, 2);
}
