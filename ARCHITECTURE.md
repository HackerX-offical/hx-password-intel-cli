# hx-password-intel-cli architecture

```
src/
  Core/       # Analyzer (entropy, crack-time estimates), Feedback
  Utils/      # Output formatting
  types/      # Shared result types
  index.ts    # Commander CLI entry
```

## Analysis pipeline

1. `Analyzer.analyze` — charset pool, Shannon-style entropy, score band, crack-time scenarios.
2. `Feedback.getFeedback` — warnings (length, patterns) and improvement suggestions.
3. `Formatter` — human-readable durations for console output.

## Ethics

Educational estimates only. No live breach data or external API calls.
