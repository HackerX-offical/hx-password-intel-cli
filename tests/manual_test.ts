import { Analyzer } from "../src/Core/Analyzer";
import { Feedback } from "../src/Core/Feedback";
import { Formatter } from "../src/Utils/Formatter";

const testCases = [
  "123456",
  "password",
  "CorrectHorseBatteryStaple",
  "Tr0ub4dor&3",
  "myverysecurepasswordwithlots0fch@racters!",
];

console.log("Running Manual Verification Tests...\n");

testCases.forEach((pw) => {
  const result = Analyzer.analyze(pw);
  const feedback = Feedback.getFeedback(result);

  console.log(`Password: "${pw}"`);
  console.log(`Entropy: ${result.entropyBits} bits`);
  console.log(`Score: ${result.score}`);
  console.log(
    `Crack Time (Fast): ${Formatter.formatDuration(
      result.crackTimes.offlineAttackFastHash
    )}`
  );
  console.log(`Suggestions: ${feedback.suggestions.length}`);
  console.log("-----------------------------------");
});
