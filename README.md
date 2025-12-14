# hx-password-intel-cli

An educational CLI tool for analyzing password strength using entropy mathematics.

> [!WARNING] > **ETHICAL DISCLAIMER**
> This tool is strictly for **educational and defensive purposes**. It is designed to help users understand password complexity and entropy.
>
> - **DO NOT** use this tool to analyze passwords that do not belong to you or for which you do not have explicit permission.
> - **DO NOT** use the passwords analyzed here in production systems if they have been exposed in plain text logs or screen history (though this tool runs locally, safety first).
> - This tool creates **estimates** based on mathematical models. Real-world cracking performance varies wildly based on hardware and attacker resources.

## Features

- **Entropy Calculation**: Calculates the information entropy in bits.
- **Crack Time Estimation**: Estimates time to crack under various attacker scenarios (Online, Offline Fast, Offline Slow).
- **Character Set Analysis**: Identifies usage of lowercase, uppercase, numbers, and symbols.
- **Improvement Suggestions**: Provides actionable feedback to strengthen passwords.

## Installation

```bash
npm install
```

## Usage

**Interactive Mode:**

```bash
npm start
```

**One-off Analysis:**

```bash
npm start -- "MySecretPassword123!"
```

## How it works

The tool uses the formula $E = L \times \log_2(N)$ where:

- $L$ is the password length.
- $N$ is the size of the character pool (e.g., 26 for just lowercase, 62 for alphanumeric).

It then estimates crack time by assuming an attacker can guess $2^{E-1}$ passwords on average.
