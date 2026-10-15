# hx-password-intel-cli

Educational CLI for password entropy, charset analysis, and crack-time estimates.

## Why this exists

Defenders and students need local, math-first password feedback without sending secrets
to the cloud.

## Features

- Entropy and crack-time engines with Jest coverage
- JSON reporter for scripting
- Interactive and one-shot CLI modes

## Install

```bash
git clone https://github.com/HackerX-official/hx-password-intel-cli.git
cd hx-password-intel-cli
npm install
```

## Quick start

```bash
npm start -- "MySecretPassword123!"
```

## Output

Stdout tables; optional JSON via reporter flags.

## Develop

```bash
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
