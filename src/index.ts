#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import * as readline from "readline";
import { Analyzer } from "./Core/Analyzer";
import { Feedback } from "./Core/Feedback";
import { Formatter } from "./Utils/Formatter";
import { AnalysisResult, FeedbackResult } from "./types";

const program = new Command();

program
  .name("hx-password-intel")
  .description("Educational Password Strength Analyzer CLI")
  .version("1.0.0")
  .argument("[password]", "Password to analyze")
  .option("-i, --interactive", "Run in interactive mode")
  .action((password, options) => {
    if (password) {
      analyzeAndPrint(password);
    } else {
      // Interactive mode strictly if no arg provided
      runInteractive();
    }
  });

function runInteractive() {
  console.log(
    chalk.cyan("Starting hx-password-intel-cli (Interactive Mode)...")
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = () => {
    rl.question(
      chalk.yellow('\nEnter password to analyze (or "exit" to quit): '),
      (input) => {
        if (input.trim().toLowerCase() === "exit") {
          rl.close();
          return;
        }
        if (input.length === 0) {
          console.log(chalk.red("Please enter a password."));
          ask();
          return;
        }
        analyzeAndPrint(input);
        ask();
      }
    );
  };

  ask();
}

function analyzeAndPrint(password: string) {
  const result: AnalysisResult = Analyzer.analyze(password);
  const feedback: FeedbackResult = Feedback.getFeedback(result);

  console.log(chalk.bold("\n--- Analysis Report ---"));

  // Basic Info
  console.log(`Length: ${chalk.white(result.passwordLength)} chars`);
  console.log(`Entropy: ${chalk.blue(result.entropyBits)} bits`);

  // Score
  let scoreColor = chalk.red;
  let scoreText = "Very Weak";
  if (result.score === 1) {
    scoreColor = chalk.redBright;
    scoreText = "Weak";
  }
  if (result.score === 2) {
    scoreColor = chalk.yellow;
    scoreText = "Reasonable";
  }
  if (result.score === 3) {
    scoreColor = chalk.green;
    scoreText = "Strong";
  }
  if (result.score === 4) {
    scoreColor = chalk.greenBright;
    scoreText = "Very Strong";
  }

  console.log(`Strength: ${scoreColor(scoreText)}`);

  // Crack Times
  console.log(chalk.bold("\n--- Estimated Crack Times (Scenario based) ---"));
  console.log(
    `Online Attack (100/hr):    ${Formatter.formatDuration(
      result.crackTimes.onlineAttackThrottled
    )}`
  );
  console.log(
    `Offline Fast Hash (MD5):   ${Formatter.formatDuration(
      result.crackTimes.offlineAttackFastHash
    )}`
  );
  console.log(
    `Offline Slow Hash (Bcrypt):${Formatter.formatDuration(
      result.crackTimes.offlineAttackSlowHash
    )}`
  );

  // Feedback
  if (feedback.warning) {
    console.log(chalk.bold.red(`\nWARNING: ${feedback.warning}`));
  }

  if (feedback.suggestions.length > 0) {
    console.log(chalk.bold("\nSuggestions:"));
    feedback.suggestions.forEach((s) => console.log(`- ${s}`));
  }

  // Ethical Disclaimer
  console.log(
    chalk.dim("\n-----------------------------------------------------------")
  );
  console.log(
    chalk.dim("DISCLAIMER: This tool is for educational purposes only.")
  );
  console.log(
    chalk.dim("Values are estimates. Do not use these passwords in production.")
  );
  console.log(
    chalk.dim("-----------------------------------------------------------")
  );
}

program.parse(process.argv);
